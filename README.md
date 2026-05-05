# GIF Picker

A fast, responsive GIF picker built with React and TypeScript using the GIPHY API. Search for GIFs, copy URLs to share in your favorite chat app, and browse through results with pagination.

🔗 **Live Demo:** [https://gif-picker-abhi.netlify.app](https://gif-picker-abhi.netlify.app)

---

## Features

- 🔍 **Debounced search** — results appear shortly after you stop typing
- 🔗 **URL-based search** — share searches via URL (e.g. `/?q=cats`)
- 📋 **Copy to clipboard** — copy any GIF URL with one click
- 📄 **Pagination** — cycle through hundreds of results
- ⚠️ **Rate limit handling** — shows cached results when API limit is reached
- 🎲 **Random trending GIFs** — 3 random GIFs shown before searching
- 💀 **Skeleton loading** — smooth loading states between searches
- 🌙 **Dark mode** — toggle between light and dark theme
- 📱 **Responsive** — works on desktop and mobile

---

## Tech Stack

- React 18
- TypeScript
- Vite
- GIPHY API
- Plain CSS

---

## Getting Started

### Prerequisites

- Node.js 18+
- A GIPHY API key — get one free at [developers.giphy.com](https://developers.giphy.com)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Abhiram-23/gif-picker.git
cd gif-picker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
VITE_GIPHY_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

| Variable             | Description                                     |
| -------------------- | ----------------------------------------------- |
| `VITE_GIPHY_API_KEY` | Your GIPHY API key from the developer dashboard |

---

## Project Structure

```
src/
├── components/
│   ├── GifCard.tsx       # Single GIF card with copy button
│   ├── GifGrid.tsx       # Grid layout for GIF results
│   ├── Pagination.tsx    # Page navigation controls
│   ├── SearchBar.tsx     # Search input with clear button
│   ├── SkeletonGrid.tsx  # Loading placeholder grid
│   └── Toast.tsx         # Copy confirmation notification
├── hooks/
│   ├── useDebounce.ts    # Debounce hook for search input
│   └── useGiphy.ts       # GIPHY API integration hook
├── types/
│   └── giphy.ts          # TypeScript interfaces for API response
├── App.tsx               # Root component with state management
├── main.tsx              # Entry point
└── index.css             # Global styles
```

---

## Key Technical Decisions

**Debouncing** — search fires 400ms after the user stops typing, protecting the API rate limit and reducing unnecessary network requests.

**URL sync** — search query is stored in the URL as `?q=term`, allowing users to share searches and preserving state on page refresh.

**Custom hooks** — all GIPHY API logic is extracted into `useGiphy.ts`, keeping components focused on rendering and keeping business logic testable and reusable.

**GIF caching** — previously fetched results are cached by search term. When the API rate limit is hit, users still see all previously loaded GIFs for that search.

**MP4 format** — GIFs are rendered as MP4 videos using `<video autoPlay loop muted playsInline>` for better performance and smaller file sizes compared to GIF format.

**No UI libraries** — styled with plain CSS to meet assessment requirements and keep bundle size minimal for the 1.5s load time target.

---

## API Rate Limits

GIPHY beta keys are limited to 42 requests per hour. The app handles this gracefully by:

- Showing an amber warning banner when the limit is reached
- Displaying all previously cached results for the current search term
- Allowing users to copy URLs from cached results

---

## Deployment

This app is deployed on Netlify. To deploy your own instance:

1. Push the repository to GitHub
2. Connect the repo to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add `VITE_GIPHY_API_KEY` in Netlify environment variables
6. Deploy

---

## Acknowledgements

Powered by [GIPHY](https://giphy.com)
