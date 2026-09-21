# cloud-computing-project

A small mock blog — "The Deploy Log" — built with plain HTML, CSS and JavaScript and
intended to be hosted as a static site on [Netlify](https://www.netlify.com).

## Structure

```
.
├── index.html                       # Post list, with search + tag filters
├── about.html                       # About page
├── 404.html                         # Custom not-found page
├── netlify.toml                     # Publish dir, cache + security headers
├── assets/
│   ├── css/style.css                # All styling
│   └── js/main.js                   # Theme toggle, progress bar, filtering
└── posts/
    ├── deploying-static-sites.html
    ├── what-happens-when-you-visit.html
    ├── small-deploy-checklist.html
    └── custom-domain-and-https.html
```

## Run it locally

There is no build step. Either open `index.html` directly in a browser, or serve the
folder so that absolute paths like `/assets/...` resolve:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to Netlify

### Option A — drag and drop (fastest)

1. Go to <https://app.netlify.com/drop>.
2. Drag this project folder onto the page.
3. Netlify uploads the files and gives you a live URL in a few seconds.

> **Heads up:** drag-and-drop uploads the folder exactly as it is on disk, including
> the hidden `.git` directory. That publishes your commit history as static files.
> Either use Option B, or copy the site files to a clean folder first:
>
> ```bash
> mkdir -p ../deploy && rsync -av --exclude '.git' ./ ../deploy/
> ```

### Option B — connect a Git repository (auto-deploys on every push)

1. Push this repository to GitHub, GitLab or Bitbucket.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Select the repository, then set:
   - **Build command:** leave empty
   - **Publish directory:** `.`
4. Click **Deploy**. Every push to the default branch republishes the site, and
   every pull request gets its own preview URL.

`netlify.toml` already contains the publish directory and header rules, so Netlify
pre-fills these values for you.

### Rolling back

Open the **Deploys** tab, select the last deploy that worked, and choose
**Publish deploy**. No rebuild required.

## Adding a post

1. Copy any file in `posts/` and rename it, e.g. `posts/my-new-post.html`.
2. Edit the `<title>`, the `<time>` element and the body.
3. Add a matching card to `index.html`, including the `data-tags`, `data-title` and
   `data-excerpt` attributes used by the search and filter controls:

```html
<li class="post-card"
    data-tags="cloud"
    data-title="my new post"
    data-excerpt="a short summary for the search box">
  <a href="posts/my-new-post.html">
    <div class="post-meta">
      <time datetime="2026-10-01">Oct 1, 2026</time>
      <span class="dot">•</span>
      <span>3 min read</span>
    </div>
    <h2>My new post</h2>
    <p>A short summary for the card.</p>
    <div class="tags">
      <span class="tag tag-cloud">Cloud</span>
    </div>
  </a>
</li>
```

Available tag classes are `tag-netlify`, `tag-cloud` and `tag-tooling`.

## Notes

- Post filtering runs entirely in the browser, so there is no backend and no database.
- Fonts load from Google Fonts. Remove the `<link>` tags and the `--font-sans` /
  `--font-serif` variables in `style.css` to use system fonts instead.
- File names are case sensitive on Netlify. A link to `Posts.html` will not find
  `posts.html`, even though it works on macOS.
