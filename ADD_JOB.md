# Add a Job / Project — Automation Reference

Drop your photos in `raw_data/project/`, write the job details in a `.txt` file, then say _"add the job"_. Claude runs the rest.

---

## One-time setup

You only do this once. Skip if `.env` already exists.

1. Copy the template: `cp .env.example .env`
2. In the Cloudinary console, go to **Settings → API Keys** and copy the key **and** its secret from the **same row** into `.env`.
3. Confirm the pair actually works before relying on it:

   ```bash
   set -a; . ./.env; set +a
   curl -s -u "$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET" \
     https://api.cloudinary.com/v1_1/fzwunkn3/ping
   ```

   `{"status":"ok"}` means you're good. `restricted api_key` means that key is a scoped
   integration key (the Cloudinary MCP connector uses one) and can't sign uploads on its
   own — use a full key pair instead. Anything else means the key and secret don't match.

`.env` is gitignored, so the secret never leaves your machine. The cloud name (`fzwunkn3`) is public — it appears in every image URL — and is hardcoded in the upload script.

---

## How the site stores jobs

- Job metadata lives in [`southtownslandservice/src/data/siteData.js`](southtownslandservice/src/data/siteData.js), one `buildJob(...)` call per project.
- **Photos live on Cloudinary, never in this repo.** Public IDs are flat and extension-less:
  - Cover: `southtowns/jobs/{id}-cover`
  - Gallery: `southtowns/jobs/{id}-1`, `southtowns/jobs/{id}-2`, …
- `buildJob` derives every URL from the job ID, so adding a job means adding one line — no paths to type.
- The site currently has **51 jobs** (IDs 1–51). Each new job takes the next number.
- **Featured jobs** appear in the top grid on the Jobs page. Currently IDs 42–47 and 49.
- `categories` is an **array** — a job shows up under every matching filter. The first one is shown on the card; the modal shows all. Use: `Excavation`, `Driveway`, `Drainage & Utilities`, `Grading & Leveling`, `Brush Hogging`, `Forestry Mulching`, `Stump Removal`, `Snow Management`.

### Why photos aren't in the repo

Serving them from Netlify's CDN was the largest line item on the Netlify bill — 224 of 242 credits. They now come from Cloudinary with `f_auto,q_auto`, which cut a typical visit by roughly 82%. **Never add image files to `southtownslandservice/public/media/` — that's what caused the problem.**

---

## Your prep checklist

### 1 — Drop images into `raw_data/project/`

| File name | Rule |
|-----------|------|
| `cover.jpg` (or `.png`) | Required. The card thumbnail in the grid. |
| `1.jpg`, `2.jpg`, … `N.jpg` | Required. Gallery images in the detail modal. **Start at 1, no gaps.** |

> Extensions don't need to match — mix `.jpg` and `.png` freely. Cloudinary serves the right format per browser regardless of what you upload.

The upload script refuses to run if the cover is missing, if there are two covers, if the numbering has a gap, or if there's an unrecognised file in the folder. Those are the mistakes that silently break a gallery, so it's better to be stopped early.

### 2 — Write the job details in a `.txt` file

```
title: Your Project Title Here
description: Full description of the job. One paragraph, no line breaks.
featured: yes
```

**The filename doesn't matter.** Any `.txt` file works, either inside `raw_data/project/` or one level up in `raw_data/`. `info.txt`, `job.txt`, `notes.txt` — all fine. The only rule is that there be exactly one; if the script finds two it stops and shows you both rather than guessing.

- `title` — plain text, no quotes. Use `&` freely.
- `description` — plain text, one line, no quotes. Apostrophes are fine.
- `featured` — `yes` or `no`. Use `yes` for large multi-image showcase jobs.

### 3 — Say "add the job"

That's all. Everything below is what Claude does.

---

## What Claude does

### Step 1 — Read and validate
Read the job details, count the numbered images, and confirm a cover exists. Determine the new ID by finding the highest existing job in `siteData.js` and adding 1.

Preview without uploading anything:

```bash
node scripts/upload-job.mjs <newId> --dry-run
```

### Step 2 — Upload
```bash
node scripts/upload-job.mjs <newId>
```

The script signs the request locally with your API secret, uploads every file to the right public ID, and:

- **refuses to overwrite** an existing job's photos unless you pass `--force`
- **retries** each file up to 3 times
- **aborts** if any file lands at an unexpected public ID
- **verifies** the cover and last gallery image actually deliver over HTTP
- **archives** the originals to `raw_data/archive/{id}/` and clears the staging folder

It finishes by printing the exact `buildJob(...)` line to add.

### Step 3 — Add the job to `siteData.js`
Append the printed line as the **last** item in the `jobs` array, filling in the categories:

```js
buildJob(50, 'Your Title Here', 'Your description here.', 15, ['Driveway', 'Grading & Leveling'])
```

Make sure the previous last entry now ends with a comma.

### Step 4 — Update `featuredJobs` (only if `featured: yes`)
Add the new ID to the filter on the last line of `siteData.js`:

```js
export const featuredJobs = jobs.filter((job) => job.id === 42 || ... || job.id === 50);
```

### Step 5 — Verify
```bash
npm --prefix southtownslandservice run build
```

Then confirm the new job renders and report back: ID, title, image count, featured status, and the public IDs created.

---

## Reference

### `buildJob` signature

```js
buildJob(id, title, description, imageCount, categories = [])
```

| Param | Type | Notes |
|-------|------|-------|
| `id` | number | Sequential, no gaps |
| `title` | string | Quoted string |
| `description` | string | Quoted string |
| `imageCount` | number | Numbered images only — **not** the cover |
| `categories` | string[] | Primary first |

Each job exposes three URL sets, all generated from the ID:

| Field | Transform | Used by |
|-------|-----------|---------|
| `cover` | `f_auto,q_auto,w_800` | Job card in the grid |
| `images[]` | `f_auto,q_auto,w_1600` | Main image in the detail modal |
| `thumbnails[]` | `f_auto,q_auto,w_200` | Thumbnail strip in the detail modal |

The thumbnail strip has its own size on purpose — pointing it at `images` would pull full-size photos to render 80px squares.

### Key paths

| Purpose | Path |
|---------|------|
| Job data | `southtownslandservice/src/data/siteData.js` |
| Upload script | `scripts/upload-job.mjs` |
| Credentials | `.env` (gitignored) |
| Staging folder | `raw_data/project/` (gitignored) |
| Photo archive | `raw_data/archive/{id}/` (gitignored) |
| Job photos | Cloudinary `southtowns/jobs/`, cloud name `fzwunkn3` |
| Still local | `southtownslandservice/public/media/icons/`, `.../fonts/` |

### Example job details file

```
title: New Cabin Utility & Driveway Completion
description: We installed the final electrical and water service lines for a new cabin and completed the driveway. Next, we move into the drainage and septic phases.
featured: yes
```

---

## Things worth knowing

**`raw_data/archive/` is your only local copy.** Photos are removed from the repo after upload, so the archive folder and Cloudinary are the two places a project photo exists. It's gitignored, which means it is *not* backed up by pushing to GitHub — include it in whatever backs up your machine.

**Cloudinary's free tier is 25 credits/month**, shared across storage, bandwidth, and transformations. Current usage is well under that, but if traffic grows, check **Settings → Usage** in the console. If storage becomes the pinch, originals can be capped on upload (we currently store them at full resolution so the archive and the cloud copy match).

**Watch the video.** The 36 MB hero background is now 9.9 MB via Cloudinary, but it's still the single largest thing a homepage visitor downloads — larger than the entire jobs grid. Dropping it to `w_1280` (6.0 MB) or replacing autoplay with a poster image and click-to-play would save more than the whole photo migration did.
