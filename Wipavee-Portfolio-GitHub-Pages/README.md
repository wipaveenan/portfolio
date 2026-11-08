# Wipavee Pinyamuksapong — Portfolio Website

A responsive, bilingual (English / Thai) portfolio built with plain HTML, CSS and JavaScript. No framework, build step, database or paid plugin is required.

## Files

- `index.html` — page structure, page metadata and Person structured data
- `styles.css` — layout, responsive styles, typography and accessibility states
- `script.js` — language switcher, mobile navigation and project filters
- `assets/` — profile photo, selected work samples and favicon

## Run locally

1. Download and unzip the project.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or install the **Live Server** extension in VS Code and select **Open with Live Server**.

The site is static and can also be opened directly from `index.html`.

## Publish for free with GitHub Pages

1. Create or sign in to a GitHub account.
2. Create a **public** repository named exactly `YOUR-USERNAME.github.io`.
3. Upload all files and folders inside this project (upload the contents, not the outer folder).
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Your site will be available at `https://YOUR-USERNAME.github.io` after GitHub Pages finishes publishing.

GitHub Pages on GitHub Free requires a public repository. Do not upload private client files, passwords, unpublished work or personal documents. This project includes selected portfolio images supplied in the resume; review that you are comfortable making them public before publishing.

## Before publishing

- Check that each external project link still points to the intended live website.
- Confirm you want your phone number and email address displayed publicly.
- Replace or remove any project images and descriptions that you do not have permission to publish.
- If you later use a custom domain, add the canonical URL and absolute Open Graph image URL to `index.html`, then configure the domain in GitHub Pages.
- Review age and years of experience when the site is next updated.

## Edit the content

- Update headings and descriptions in `index.html`.
- Each bilingual text element has `data-en` and `data-th` values. Keep both values when changing a label or paragraph.
- Add project images to `assets/`, then add or duplicate a `.project-card` in the `#project-grid` section. Use `data-category="uxui"`, `"website"` or `"graphic"` for the filters.
- Update contact details in the contact section and the structured data block if they change.

## SEO included

- Descriptive title and meta description
- Mobile viewport and theme metadata
- Open Graph title and description
- `index, follow` robots directive
- Semantic page headings and descriptive image alt text
- Person JSON-LD structured data
- Responsive layout and lightweight static assets

The site currently has no canonical URL because the final hosting address has not yet been assigned.
