# Netram Moolchand And Sons — Official Website

The official website for **Netram Moolchand And Sons**, a heritage halwai shop crafting traditional Indian mithai since 1854. Built with React, Tailwind CSS, and a deep respect for five generations of tradition.

---

## Pages

- **Home** — Hero section, brand story, featured sweets, gallery strip, and CTA
- **Our Shop** — Full product catalogue with search, filters, sort, and grid/list view toggle
- **Heritage** — Brand story, values, timeline of five generations, and family note
- **Contact** — Shop details, Instagram, hours, contact form, and embedded map

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| Icons | Lucide React |
| Toasts | Sonner |
| Images | Cloudinary + Pexels |
| Maps | Google Maps Embed |
| Build | Create React App |

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Netram-website.git

# Navigate into the project
cd Netram-website/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The app runs at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/        # Navbar, Footer, shared UI
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── lib/
│   │   ├── api.js         # API calls (fetchProducts, fetchFeatured, submitContact)
│   │   └── shopInfo.js    # Shop constants (address, phone, hours, instagram)
│   └── index.css          # Tailwind + custom brand tokens
└── tailwind.config.js
```

---

## Brand Tokens

Custom Tailwind colors defined in `tailwind.config.js`:

| Token | Usage |
|---|---|
| `brand-maroon` | Primary brand color |
| `brand-maroon-deep` | Darker maroon for overlays |
| `brand-gold` | Accent color |
| `brand-ivory` | Page background |
| `brand-cream` | Card/section background |
| `brand-text` | Body text |
| `brand-border` | Borders and dividers |

---

## Features

- **Product catalogue** with search, category filter, price range slider, and sort
- **Grid / List view** toggle on the products page
- **Sticky filter bar** on products page
- **Animated timeline** on the Heritage page
- **Contact form** with validation and toast feedback
- **Embedded Google Map** on the Contact page
- **Back to top** button on scroll
- **Skeleton loaders** while data fetches
- **Fully responsive** — mobile, tablet, desktop

---

## Environment

The API base URL and any keys should be configured in a `.env` file at the root:

```env
REACT_APP_API_URL=https://your-api-url.com
```

---

## Credits

- Photography: [Pexels](https://pexels.com) and Cloudinary-hosted originals
- Icons: [Lucide React](https://lucide.dev)
- Fonts: Serif (brand headings) + System sans-serif

---

## License

Private — all rights reserved.  
© 2026 Netram Moolchand And Sons.
