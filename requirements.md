# Recipes Secrets Website Requirements

Build a simple, mobile-friendly website for "Secret Recipes Restaurant".

## Tech constraints
- Plain HTML5, CSS3 and minimal vanilla JavaScript. No frameworks, no build step, no npm.
- It must be deployable as static files to a free host (GitHub Pages, Netlify or Cloudflare Pages). All links must be relative so the site works from a subfolder.
- One shared stylesheet (css/styles.css) and one shared script (js/main.js).
- No backend. Forms submit to Formspree (use a placeholder endpoint like https://formspree.io/f/YOUR_FORM_ID and add a comment showing where to replace it).

## Pages (exactly 5)
1. index.html – Home: hero section with restaurant name, tagline and a "Book a Table" button; short intro; 3 featured dishes; opening hours; call-to-action to Specials.
2. about.html – About: our story, chef/team section (2–3 placeholder profiles), our philosophy on food.
3. specials.html – Specials: this week's specials as cards (name, short description, price), split into Starters / Mains / Desserts. Keep the data in a JS array at the top of js/main.js or in a simple data/specials.json so it's easy to update weekly.
4. reservation.html – Reservation form: name, email, phone, date, time, number of guests (1–12), special requests. Client-side validation: no past dates, time only within opening hours, required fields. Show a success message after submit.
5. contact.html – Address, phone, email, opening hours, embedded Google Map iframe (placeholder address), and a simple contact form (name, email, message).

## Shared layout
- Same header on every page: logo/text name + nav links to all 5 pages, with the current page highlighted.
- Hamburger menu on mobile (under 768px).
- Footer: address, phone, hours, social media icon links (placeholder URLs) and © year.

## Design
- Warm, inviting restaurant look: a dark or earthy palette with one accent colour, defined as CSS variables so it's easy to change.
- Google Fonts: one serif for headings (e.g. Playfair Display), one sans-serif for body text (e.g. Inter).
- Use placeholder images from Unsplash URLs with descriptive alt text; mark them clearly so I can swap in real photos.
- Responsive layout using Flexbox/Grid that works on mobile, tablet and desktop.

## Quality
- Semantic HTML, accessible labels on all form fields, good colour contrast, keyboard-navigable menu.
- A unique <title> and meta description on each page, plus a favicon placeholder.
- No console errors and no broken links.

## Placeholder business details (I will replace these)
- Address: [ADDRESS]
- Phone: [PHONE]
- Email: [EMAIL]
- Hours: [e.g. Tue–Sun 11:30am–10pm, closed Mon]

## Deliverables
1. The full file structure, with all files created.
2. A README.md covering: how to preview locally, how to set up Formspree, how to update the Specials, and step-by-step deployment to GitHub Pages and Netlify.

Before writing code, show me the planned file structure and colour palette and wait for my OK.