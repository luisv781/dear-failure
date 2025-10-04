# Dear Failure 💌

A beautiful, minimalist website where people can anonymously write heartfelt letters to their past failures, celebrating growth, resilience, and transformation.

## Features

- **Anonymous Letter Writing**: Share your story without revealing your identity
- **Beautiful Stationery Design**: Elegant pastel colors and handwriting fonts
- **Smooth Animations**: Framer Motion animations for delightful interactions
- **Category Filtering**: Organize letters by School, Career, Relationships, Personal Growth, or Other
- **Shuffle Feature**: Discover random letters for inspiration
- **Mobile Responsive**: Beautiful on all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom pastel theme
- **Animations**: Framer Motion
- **Fonts**: Cormorant Garamond (serif) + Handlee (handwriting)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js
- npm

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd hackaithon-failing-upward
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to http://localhost:3000

### Deploy to GitHub Pages

1. **Fork this repository** to your GitHub account

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Set source to "GitHub Actions"

3. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Your site will be available at:**
   `https://yourusername.github.io/hackaithon-failing-upward`

The GitHub Actions workflow will automatically build and deploy your site whenever you push to the main branch.

## Project Structure

```
hackaithon-failing-upward/
├── app/
│   ├── letters/page.tsx        # Letters archive page
│   ├── write/page.tsx          # Write letter page
│   ├── page.tsx                # Homepage
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── lib/
│   ├── letters.ts              # Static data management
│   └── utils.ts                # Utility functions
├── data/
│   └── letters.json            # Sample letters data
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
└── components.json             # UI components config
```
## Static Site Features

- **Client-side Data Management**: Letters are stored in JSON and managed in memory
- **Category Filtering**: Filter letters by School, Career, Relationships, Personal Growth, or Other
- **Shuffle Feature**: Randomize letter order for discovery
- **Responsive Design**: Beautiful on all devices
- **No Backend Required**: Fully static, works on any hosting platform

---

*"Every failure is a stepping stone to success. Every setback is a setup for a comeback."*
