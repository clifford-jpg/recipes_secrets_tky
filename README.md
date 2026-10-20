# Secret Recipes Restaurant — Website

A simple, mobile-friendly, 5-page static website built with plain HTML5, CSS3 and vanilla JavaScript. No build step, no frameworks, no backend.

## File structure

```
recipes_website/
├── index.html
├── about.html
├── specials.html
├── reservation.html
├── contact.html
├── favicon.svg
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## Preview locally

No build tools are required — these are static files. Pick any one of the following:

1. **Just open the file**: double-click `index.html`, or open it directly in your browser.
2. **VS Code Live Server**: install the "Live Server" extension, right-click `index.html` → "Open with Live Server".
3. **Python's built-in server** (from inside the `recipes_website` folder):
   ```
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

All links in the site are relative, so it will also work correctly if the folder is hosted from a subpath (e.g. `yoursite.com/recipes_website/`).

## Setting up Formspree (for the Reservation and Contact forms)

Both forms submit to [Formspree](https://formspree.io) via JavaScript (`fetch`), so visitors see an inline success/error message without leaving the page.

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
3. In **both** `reservation.html` and `contact.html`, find the line:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   and replace `YOUR_FORM_ID` with your real form ID (you can use the same form for both, or create two separate Formspree forms to keep reservations and general messages apart).
4. In your Formspree dashboard, confirm the sender email address the first time a test submission comes in — Formspree requires this before forwarding messages.

No other code changes are needed; `js/main.js` already submits via `fetch` with `Accept: application/json`, which is what makes the inline success message work with Formspree's AJAX response.

## Updating the weekly Specials

Open `js/main.js` and edit the `SPECIALS` array near the top of the file. Each entry looks like:

```js
{
  category: "starters", // one of: "starters", "mains", "desserts"
  name: "Roasted Beet & Goat Cheese Salad",
  description: "Heirloom beets, whipped goat cheese, candied walnuts and a citrus vinaigrette.",
  price: "$12",
},
```

Add, remove or edit entries as needed and save the file — `specials.html` automatically renders the three category grids (Starters / Mains / Desserts) from this array, so no HTML edits are required.

## Before going live

- Replace the placeholder business details (`[ADDRESS]`, `[PHONE]`, `[EMAIL]`, opening hours) in the footer of every page and on `contact.html`.
- Replace the Unsplash placeholder images (marked with `<!-- PLACEHOLDER IMAGE -->` comments) with real photos.
- Replace `favicon.svg` with your real logo/icon.
- Replace the Google Maps iframe `src` on `contact.html` with an embed URL for your real address (Google Maps → Share → Embed a map → copy the `src` from the generated `<iframe>`).
- Replace the placeholder social media links in the footer with your real profile URLs.
- Set up your real Formspree endpoint(s) as described above.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push the contents of `recipes_website/` to it (the HTML files should be at the repo root, or in a subfolder — both work since all links are relative).
2. In the repository, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Choose the branch (e.g. `main`) and the folder (`/root` or `/recipes_website` depending on your layout), then **Save**.
5. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Deploying to Netlify

**Option A — drag and drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the `recipes_website` folder onto the page.
3. Netlify will instantly deploy it and give you a live URL.

**Option B — Git-based deploy:**
1. Push the project to a GitHub/GitLab/Bitbucket repository.
2. In Netlify, click **Add new site → Import an existing project** and connect your repository.
3. Leave the build command empty and set the publish directory to `recipes_website` (or `/` if the files are at the repo root).
4. Click **Deploy site**. Netlify will give you a live URL and redeploy automatically on every push.

## Deploying to Cloudflare Pages

1. Push the project to a Git repository (GitHub/GitLab).
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository, leave the build command empty, and set the output/publish directory to `recipes_website` (or `/` if the files are at the repo root).
4. Click **Save and Deploy**.
