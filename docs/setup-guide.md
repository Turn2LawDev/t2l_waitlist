# Turn2Law - Project Setup Guide

## Project Overview

Turn2Law is a modern Next.js application with a sophisticated tech stack designed for legal technology services. This guide covers the complete setup and verification process.

## ✅ Current Project Status

### Technology Stack (Verified)

- **Frontend Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v3.4.1 + CSS Variables
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion v11.18.2
- **Icons**: Lucide React
- **Build Tool**: Turbopack (for development)

### Dependencies Verification

#### Core Dependencies ✅
```json
{
  "next": "15.3.3",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "^5",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^11.18.2"
}
```

#### shadcn/ui Components ✅
All essential Radix UI primitives are installed:
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`
- `@radix-ui/react-popover`
- `@radix-ui/react-select`
- `@radix-ui/react-slot`
- `@radix-ui/react-tabs`
- `@radix-ui/react-toast`
- `@radix-ui/react-tooltip`

#### Utility Libraries ✅
- `class-variance-authority`: Component variants
- `clsx`: Conditional classes
- `tailwind-merge`: Merge Tailwind classes
- `tailwindcss-animate`: Animation utilities
- `lucide-react`: Icon library

## Project Structure

```
Turn2Law-main/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles with CSS variables
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main homepage
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── input.tsx      # Animated input component
│   │   │   ├── button.tsx     # Button component
│   │   │   └── ...           # Other UI components
│   │   ├── magicui/          # Custom animations
│   │   └── waitlist-form.tsx # Waitlist form component
│   ├── hooks/                # Custom React hooks
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/images/            # Static assets
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind configuration
└── package.json             # Dependencies
```

## Configuration Files

### shadcn/ui Configuration (components.json) ✅
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### Tailwind CSS Configuration ✅
- CSS Variables enabled for theme customization
- Custom color scheme with yellow primary (`--primary: 46 98% 50%`)
- Dark mode support
- Custom animations (marquee, accordion)
- Extended font families and utilities

### TypeScript Configuration ✅
- Strict mode enabled
- Path aliases configured (`@/` points to `src/`)
- Next.js optimizations included

## Recent Enhancements

### 1. Marquee Section Improvements ✅
- **Consistent Logo Sizing**: Standardized logo dimensions (240x96px)
- **Improved Spacing**: Even distribution using flexbox and gap utilities
- **Removed Grayscale Filter**: Preserved original logo colors
- **Per-Logo Customization**: Flexible width/height per logo
- **Streamlined Content**: Removed specific problematic logos
- **Animation**: Smooth infinite scroll with fade edges

### 2. Footer Modernization ✅
- **Newsletter Integration**: Email subscription with animated input
- **Yellow Animation**: Radial gradient hover effect matching waitlist form
- **Responsive Design**: Mobile-first grid layout
- **Enhanced Links**: Social media and quick navigation
- **Brand Consistency**: Logo and color scheme maintained
- **Interactive Elements**: Hover effects and transitions

### 3. Animated Input Component ✅
- **Framer Motion Integration**: `useMotionValue`, `useMotionTemplate`
- **Yellow Border Animation**: Matches primary brand color
- **Hover Effects**: Radial gradient following mouse movement
- **Focus States**: Enhanced accessibility and UX
- **Reusable Design**: Component-based architecture

## Development Commands

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev                    # Default port (likely 3000)
npm run dev -- -p 3000       # Specify port 3000
npm run dev -- -p 9002       # Specify port 9002 (as configured)

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run typecheck
```

## Environment Setup

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn package manager

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open browser to `http://localhost:3000` (or specified port)

### Production Build
1. Build the application: `npm run build`
2. Start production server: `npm start`

## Color Scheme

The project uses a sophisticated dark theme with yellow accents:

```css
:root {
  --primary: 46 98% 50%;        /* Yellow #FDE047 */
  --accent: 45 96% 51%;         /* Yellow variant #FACC15 */
  --background: 8 0% 0%;        /* Pure black */
  --card: 222 47% 11%;          /* Dark gray #111827 */
  --border: 222 40% 16%;        /* Border gray #1F2937 */
}
```

## Component Usage Examples

### Animated Input (Footer Implementation)
```tsx
<AnimatedFooterInput
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="custom-styles"
/>
```

### shadcn/ui Components
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Usage with yellow animation
<Input className="custom-animated-input" />
<Button className="bg-primary text-black">Click me</Button>
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Try different port
   npm run dev -- -p 3001
   ```

2. **TypeScript Errors**
   ```bash
   # Run type check
   npm run typecheck
   ```

3. **Missing Dependencies**
   ```bash
   # Reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Styling Issues**
   - Verify Tailwind CSS is working: Check if classes apply
   - Check CSS variable definitions in `globals.css`
   - Ensure dark mode is enabled (project uses dark theme)

### Performance Optimization
- Uses Turbopack for faster development builds
- Next.js 15 App Router for optimal performance
- Framer Motion for smooth animations
- CSS variables for efficient theming

## Next Steps

The project is fully set up and ready for development. Key areas for future enhancement:

1. **Backend Integration**: Add API routes for newsletter subscription
2. **Form Validation**: Enhance with Zod schemas and react-hook-form
3. **Analytics**: Integrate tracking for user interactions
4. **SEO**: Add metadata and structured data
5. **Testing**: Implement unit and integration tests

## Support

For questions or issues:
- Check the documentation in `/docs/`
- Review component implementations in `/src/components/`
- Refer to shadcn/ui documentation: https://ui.shadcn.com/
- Tailwind CSS documentation: https://tailwindcss.com/
