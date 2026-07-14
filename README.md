# FourNineEight Apartment Specifications

A searchable online specification schedule for Apartment 1 at FourNineEight. The interface keeps the structure of the original specification PDF while adding category filters, larger reference images, print support, and an accessible item lightbox.

## Live site

[View the FourNineEight Apartment Specifications on GitHub Pages](https://makersco-22.github.io/fournineeight-specifications/)

The Pages deployment is published automatically from the `main` branch by GitHub Actions.

## Features

- 70-item interior specification schedule
- Search by item, location, or specification
- Category filters
- Enlarged material and product thumbnails
- Item lightbox with complete details and previous/next navigation
- Keyboard navigation with Left Arrow, Right Arrow, and Escape
- Print layout and original PDF download
- Responsive layout for desktop, tablet, and mobile

## Requirements

- Node.js 22.13 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Validation

```bash
npm test
```

This creates a production build and runs the server-rendering smoke tests.

## Production build

```bash
npm run build
npm start
```

## Project structure

```text
app/
  page.tsx       Specification data and interface
  globals.css    Layout, table, lightbox, and print styles
  layout.tsx     Site metadata and document shell
public/
  specs/         Material and product reference images
  fournineeight-apartment-1-specifications.pdf
```

The project uses [vinext](https://github.com/cloudflare/vinext) and produces a Cloudflare Worker-compatible build. `.openai/hosting.json` contains optional Sites hosting bindings; the GitHub export leaves its project identifier unset.

## Updating specifications

Specification rows are stored in the `rows` array near the top of `app/page.tsx`. Reference images live in `public/specs/` and are linked using paths such as `/specs/p01-02.jpg`.

## Content and licensing

The specification document, product imagery, development name, and related brand assets remain the property of their respective owners. Confirm that you have permission to publish these materials before making the repository public.

No open-source license is included. Add an appropriate license if you intend to permit reuse of the source code.
