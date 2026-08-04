#!/usr/bin/env node
/**
 * Upload one staged project to Cloudinary, verify it, and archive the originals.
 *
 *   node scripts/upload-job.mjs <jobId> [--dry-run] [--force]
 *
 * Reads photos from raw_data/project/ and needs CLOUDINARY_API_KEY and
 * CLOUDINARY_API_SECRET in .env (gitignored).
 *
 * Cloudinary public IDs are flat and extension-less, matching buildJob() in
 * src/data/siteData.js:  southtowns/jobs/<id>-cover, southtowns/jobs/<id>-1, ...
 */

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STAGING = path.join(ROOT, 'raw_data', 'project');
const ARCHIVE = path.join(ROOT, 'raw_data', 'archive');
const CLOUD_NAME = 'fzwunkn3';
const FOLDER = 'southtowns/jobs';
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic']);

const die = (msg) => { console.error(`\n  ERROR  ${msg}\n`); process.exit(1); };
const ok = (msg) => console.log(`  ok     ${msg}`);

// ---------------------------------------------------------------- env
function loadEnv() {
  const file = path.join(ROOT, '.env');
  if (!existsSync(file)) die('.env not found. Copy .env.example and fill in your Cloudinary credentials.');
  const env = {};
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  for (const key of ['CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET']) {
    if (!env[key]) die(`${key} missing from .env`);
  }
  return env;
}

// ---------------------------------------------------------------- staging
/** Collect cover + numbered photos, refusing anything ambiguous. */
function readStaging() {
  if (!existsSync(STAGING)) die(`staging folder not found: ${path.relative(ROOT, STAGING)}`);

  // .txt files are handled by findInfoFile(), so they're never "strays" here.
  const files = readdirSync(STAGING).filter((f) => !f.startsWith('.') && !f.toLowerCase().endsWith('.txt'));
  const images = files.filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()));
  const strays = files.filter((f) => !images.includes(f));
  if (strays.length) die(`unrecognised file(s) in staging: ${strays.join(', ')}`);
  if (!images.length) die('no images found in staging folder');

  const covers = images.filter((f) => path.parse(f).name.toLowerCase() === 'cover');
  if (covers.length === 0) die('no cover.* file found — the grid thumbnail is required');
  if (covers.length > 1) die(`multiple cover files: ${covers.join(', ')}`);

  const numbered = new Map();
  for (const f of images) {
    if (f === covers[0]) continue;
    const name = path.parse(f).name;
    if (!/^\d+$/.test(name)) die(`unexpected filename "${f}" — expected cover.* or a number like 3.jpg`);
    const n = Number(name);
    if (numbered.has(n)) die(`duplicate image number ${n}`);
    numbered.set(n, f);
  }

  // Gaps are the failure that silently breaks the gallery, so reject them outright.
  const count = numbered.size;
  const missing = [];
  for (let i = 1; i <= count; i++) if (!numbered.has(i)) missing.push(i);
  if (missing.length) die(`gallery numbering has gaps — missing ${missing.join(', ')} (found ${[...numbered.keys()].sort((a, b) => a - b).join(', ')})`);

  return {
    cover: covers[0],
    gallery: Array.from({ length: count }, (_, i) => numbered.get(i + 1)),
    count
  };
}

/**
 * Locate the metadata file. Accepts any .txt in the staging folder or one level
 * up in raw_data/ — the name is not worth having to remember, so don't enforce one.
 */
function findInfoFile() {
  const found = [];
  for (const dir of [STAGING, path.join(ROOT, 'raw_data')]) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (!f.startsWith('.') && f.toLowerCase().endsWith('.txt')) found.push(path.join(dir, f));
    }
  }
  if (found.length === 0) return null;
  if (found.length > 1) {
    die(`found more than one .txt file, so I can't tell which holds the job details:\n           ${found.map((f) => path.relative(ROOT, f)).join('\n           ')}`);
  }
  return found[0];
}

function readInfo(file) {
  if (!file) return null;
  const info = {};
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*(title|description|featured)\s*:\s*(.*)$/i);
    if (m) info[m[1].toLowerCase()] = m[2].trim();
  }
  return info;
}

// ---------------------------------------------------------------- cloudinary
/** Cloudinary signs the alphabetically sorted param string with the API secret. */
function sign(params, secret) {
  const payload = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&');
  return createHash('sha1').update(payload + secret).digest('hex');
}

async function alreadyUsed(id, env) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload?prefix=${FOLDER}/${id}-&max_results=1`;
  const auth = Buffer.from(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`).toString('base64');
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) return false; // don't block the upload on a failed pre-check
  const body = await res.json();
  return (body.resources || []).length > 0;
}

async function upload(localPath, targetName, signed, env) {
  const form = new FormData();
  form.append('file', new Blob([readFileSync(localPath)]), targetName);
  form.append('api_key', env.CLOUDINARY_API_KEY);
  form.append('signature', signed.signature);
  for (const [k, v] of Object.entries(signed.params)) form.append(k, String(v));

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: form });
  const body = await res.json();
  if (!body.public_id) throw new Error(body.error?.message || `upload failed (HTTP ${res.status})`);
  return body;
}

// ---------------------------------------------------------------- main
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const id = Number(args.find((a) => /^\d+$/.test(a)));

if (!id) die('usage: node scripts/upload-job.mjs <jobId> [--dry-run] [--force]');

// Validate the staging folder before touching credentials, so --dry-run works
// without a configured .env.
const { cover, gallery, count } = readStaging();
const infoFile = findInfoFile();
const info = readInfo(infoFile);

console.log(`\n  job id     ${id}`);
console.log(`  cover      ${cover}`);
console.log(`  gallery    ${count} image(s)`);
if (info?.title) console.log(`  title      ${info.title}`);
if (info?.featured) console.log(`  featured   ${info.featured}`);
console.log('');

// cover is index 0 so it lines up with buildJob()'s paths array
const plan = [
  { file: cover, target: `${id}-cover${path.extname(cover)}`, publicId: `${FOLDER}/${id}-cover` },
  ...gallery.map((f, i) => ({ file: f, target: `${id}-${i + 1}${path.extname(f)}`, publicId: `${FOLDER}/${id}-${i + 1}` }))
];

if (dryRun) {
  for (const p of plan) console.log(`  would upload  ${p.file}  ->  ${p.publicId}`);
  console.log('\n  dry run — nothing uploaded\n');
  process.exit(0);
}

const env = loadEnv();

if (!force && await alreadyUsed(id, env)) {
  die(`job ${id} already has assets on Cloudinary. Use a fresh id, or pass --force to overwrite.`);
}

const params = {
  folder: FOLDER,
  overwrite: 'true',
  timestamp: Math.floor(Date.now() / 1000),
  unique_filename: 'false',
  use_filename: 'true'
};
const signed = { params, signature: sign(params, env.CLOUDINARY_API_SECRET) };

const uploaded = [];
for (const p of plan) {
  let res;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try { res = await upload(path.join(STAGING, p.file), p.target, signed, env); break; }
    catch (err) {
      if (attempt === 3) die(`${p.file}: ${err.message}`);
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
  // The whole point of the check: a public_id we didn't intend means a broken gallery.
  if (res.public_id !== p.publicId) die(`${p.file} landed at "${res.public_id}", expected "${p.publicId}"`);
  ok(`${p.file.padEnd(14)} -> ${res.public_id}`);
  uploaded.push(res.public_id);
}

// ---------------------------------------------------------------- verify
console.log('\n  verifying delivery...');
for (const publicId of [`${FOLDER}/${id}-cover`, `${FOLDER}/${id}-${count}`]) {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_800/${publicId}`;
  const res = await fetch(url);
  if (!res.ok) die(`${publicId} did not deliver (HTTP ${res.status})`);
  ok(`${publicId} -> ${res.status} ${res.headers.get('content-type')}`);
}

// ---------------------------------------------------------------- archive
const dest = path.join(ARCHIVE, String(id));
mkdirSync(dest, { recursive: true });
for (const f of plan.map((p) => p.file)) {
  const from = path.join(STAGING, f);
  if (existsSync(from)) renameSync(from, path.join(dest, f));
}
// Archive the metadata under a canonical name, wherever it was found.
if (infoFile && existsSync(infoFile)) renameSync(infoFile, path.join(dest, 'info.txt'));
console.log(`\n  archived originals -> ${path.relative(ROOT, dest)}/`);

// ---------------------------------------------------------------- next step
const esc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
console.log(`\n  add this to the jobs array in southtownslandservice/src/data/siteData.js:\n`);
console.log(`  buildJob(${id}, '${esc(info?.title) || 'TITLE'}', '${esc(info?.description) || 'DESCRIPTION'}', ${count}, ['CATEGORY'])`);
if (info?.featured?.toLowerCase() === 'yes') {
  console.log(`\n  featured: yes — also add "|| job.id === ${id}" to the featuredJobs filter`);
}
console.log('');
