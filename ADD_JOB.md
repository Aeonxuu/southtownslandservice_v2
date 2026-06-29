# Add a Job / Project — Automation Reference

This document is the complete instructions for adding a new job or project to the Southtowns Land Service website. After following the **prep steps**, share this doc and say _"add the job"_ — Claude will execute every step with no further input needed.

---

## How the site stores jobs

- All job metadata lives in [`southtownslandservice/src/data/siteData.js`](southtownslandservice/src/data/siteData.js)
- Each job uses `buildJob(id, title, description, imageCount, extension)`
- Images are served from `southtownslandservice/public/media/jobs/{id}/`
- The site currently has **47 jobs** (IDs 1–47). Each new job gets the next sequential ID.
- **Featured jobs** appear in the top "Featured jobs" grid on the Jobs page. Currently IDs 42–47.
- **Regular jobs** appear in the "Other Projects" grid below. Both sections sort newest-first (highest ID = top).

---

## Your prep checklist (do this before asking Claude)

### 1 — Drop images into the staging folder

**Folder:** `raw_data/project/`

| File name | Rule |
|-----------|------|
| `cover.jpg` **or** `cover.png` | Required. This is the card thumbnail shown in the grid. |
| `1.jpg`, `2.jpg`, … `N.jpg` **or** `1.png`, `2.png`, … `N.png` | Required. Numbered gallery images shown inside the detail modal. Start at 1, no gaps. |

> All images in one project must share the same extension (all `.jpg` **or** all `.png`). The cover and gallery images must use the same extension.

### 2 — Fill in `raw_data/project/info.txt`

Create (or overwrite) a plain text file named **`info.txt`** inside `raw_data/project/` with exactly this format:

```
title: Your Project Title Here
description: Full description of the job. One paragraph. No line breaks inside the description.
featured: yes
```

or for a regular (non-featured) job:

```
title: Your Project Title Here
description: Full description of the job. One paragraph. No line breaks inside the description.
featured: no
```

**Field rules:**
- `title` — Plain text, no quotes needed. Use `&` for ampersands (e.g., `Driveway, Drainage & Pavilion Site Prep`).
- `description` — Plain text, one line, no quotes. Write it as a complete sentence or two describing the work done.
- `featured` — Either `yes` or `no`. Use `yes` for large, multi-image showcase jobs. Use `no` for smaller service examples.

### 3 — Confirm the folder looks right

Before asking Claude to run the automation, the `raw_data/project/` folder should contain:

```
raw_data/project/
├── cover.jpg       ← (or cover.png)
├── 1.jpg           ← (or .png)
├── 2.jpg
├── ...
├── N.jpg           ← last numbered image
└── info.txt        ← title, description, featured
```

---

## What Claude will do (automation steps)

When you say _"add the job"_, Claude executes the following steps in order:

### Step 1 — Read `info.txt`
Parse `raw_data/project/info.txt` to extract:
- `title`
- `description`
- `featured` flag (`yes` / `no`)

### Step 2 — Detect image extension and count
- Check whether `cover.jpg` or `cover.png` exists to determine the extension.
- Count all sequentially numbered files (`1.ext`, `2.ext`, … `N.ext`) to get `imageCount`. Stop counting at the first gap.

### Step 3 — Determine the new job ID
- Read `southtownslandservice/src/data/siteData.js`
- Find the highest existing job ID
- New ID = highest ID + 1

### Step 4 — Copy images to the public media folder
Copy every file from `raw_data/project/` (except `info.txt`) into:
```
southtownslandservice/public/media/jobs/{newId}/
```
Create the folder if it doesn't exist. Files keep their exact names (`cover.jpg`, `1.jpg`, etc.).

### Step 5 — Add the job entry to `siteData.js`
Append a new `buildJob(...)` call as the **last item** in the `jobs` array, immediately before the closing `];`:

```js
buildJob(48, 'Your Title Here', 'Your description here.', 15, 'jpg')
```

The trailing comma on the previous last entry must be present; the new last entry has no trailing comma.

### Step 6 — Update `featuredJobs` (only if `featured: yes`)
If the job is featured, update the `featuredJobs` filter on the last line of `siteData.js` to include the new ID:

**Before:**
```js
export const featuredJobs = jobs.filter((job) => job.id === 42 || ... || job.id === 47);
```

**After (example for new ID 48):**
```js
export const featuredJobs = jobs.filter((job) => job.id === 42 || ... || job.id === 47 || job.id === 48);
```

### Step 7 — Clean up the staging folder
Delete every `.jpg` and `.png` file inside `raw_data/project/` (cover image + all numbered images). Also delete `info.txt`. The folder must be completely empty after this step — verify with a directory listing before reporting done.

### Step 8 — Verify
- Confirm `siteData.js` parses cleanly (check for missing commas, unclosed brackets)
- Confirm all image files exist at the new media path
- Report back: new job ID, title, imageCount, extension, featured status

---

## Reference: `buildJob` signature

```js
buildJob(id, title, description, imageCount, extension = 'png')
```

| Param | Type | Notes |
|-------|------|-------|
| `id` | number | Sequential, no gaps |
| `title` | string | Quoted string |
| `description` | string | Quoted string |
| `imageCount` | number | Count of numbered images only (not cover) |
| `extension` | string | `'jpg'` or `'png'` (default `'png'`) |

---

## Reference: key file paths

| Purpose | Path |
|---------|------|
| Job data (titles, descriptions) | `southtownslandservice/src/data/siteData.js` |
| Deployed images | `southtownslandservice/public/media/jobs/{id}/` |
| Staging folder (your uploads) | `raw_data/project/` |
| Job metadata input | `raw_data/project/info.txt` |

---

## Example `info.txt`

```
title: New Cabin Utility & Driveway Completion
description: We installed the final electrical and water service lines for a new cabin and completed the driveway. Next, we move into the drainage and septic phases.
featured: yes
```
