# Portfolio Website Installation Guide

This guide will help you install and run the portfolio website.

## Prerequisites

- Node.js 16.x or higher
- npm or yarn or pnpm

## Installation Steps

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd portfolio-website
\`\`\`

### 2. Install dependencies

Using npm:
\`\`\`bash
npm install
\`\`\`

Using yarn:
\`\`\`bash
yarn install
\`\`\`

Using pnpm:
\`\`\`bash
pnpm install
\`\`\`

### 3. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for production

\`\`\`bash
npm run build
# or
yarn build
# or
pnpm build
\`\`\`

### 5. Start the production server

\`\`\`bash
npm run start
# or
yarn start
# or
pnpm start
\`\`\`

## Troubleshooting

If you encounter any issues during installation:

1. Make sure you have the correct Node.js version installed
2. Try deleting the `node_modules` folder and the lock file (package-lock.json, yarn.lock, or pnpm-lock.yaml) and reinstall
3. Check that all dependencies in package.json are compatible

## Dependencies

The project uses the following main dependencies:

- Next.js 14.0.3
- React 18.2.0
- Framer Motion 10.16.4
- Three.js 0.158.0
- Lucide React 0.292.0
- Tailwind CSS 3.3.5

For a complete list of dependencies, see the package.json file.
