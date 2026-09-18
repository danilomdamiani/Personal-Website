# AGENTS.md

## Project Overview

Static portfolio website for Danilo - a Motion Designer & Video Editor.

**Tech Stack:**
- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript (GSAP for animations)
- No build system or framework

## File Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # All JavaScript
├── _headers            # Netlify HTTP response headers (RFC 8288 Link headers)
├── netlify.toml        # Netlify config
├── llms.txt            # LLM & Agent information
├── netlify/
│   └── edge-functions/
│       └── markdown-negotiation.js # Markdown for Agents content negotiation
├── .well-known/
│   └── api-catalog     # RFC 9727 API Catalog linkset
├── me.png              # Portrait image
├── ae.svg              # After Effects icon
└── premiere.svg        # Premiere Pro icon
```

## Development Workflow

### Local Development

Since this is a static site, simply open `index.html` in a browser:

```bash
# Option 1: Direct file open (Windows)
start index.html

# Option 2: Python simple server (for proper module loading)
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3: VS Code Live Server extension
```

### Making Changes

1. Edit files directly
2. Refresh browser to see changes
3. Test on mobile (responsive design)
4. Test animations work properly

## Code Style Guidelines

### HTML

- Use semantic HTML5 elements (`<section>`, `<nav>`, `<header>`, etc.)
- Indent with 4 spaces
- Use lowercase for tags and attributes
- Include alt text for all images
- Keep class names kebab-case: `nav-links`, `hero-section`
- Use `id` attributes for section anchors (e.g., `#work`, `#contact`)

### CSS

- Use CSS custom properties (variables) defined in `:root`
- Format: `property: value;` with space after colon
- Group related properties together
- Use BEM-like naming: `.block-element-modifier`
- Mobile-first responsive design with media queries
- Always include fallbacks for older browsers

**Key Variables (in styles.css):**
- `--font-primary`: 'Outfit', sans-serif
- `--color-bg`: #050505 (dark background)
- `--color-accent-primary`: #8b5cf6 (purple accent)
- `--spacing-xxl`: 6rem (section padding)

### JavaScript

- Use ES6+ features
- Prefer `const` and `let` over `var`
- Use camelCase for variables and functions
- Prefix jQuery-like selectors with `$`: `const $nav = document.querySelector('.nav')`
- Comment complex GSAP animations
- Clean up event listeners and animations on page unload

**Animation Conventions:**
- Use GSAP for all animations
- Keep animations subtle and professional
- Duration: 0.3s - 1s for UI, 3s - 6s for background effects
- Use `ease-in-out` or `power2.out` for smooth motion

### Naming Conventions

**CSS Classes:**
- Sections: `hero-section`, `portfolio-section`
- Components: `nav-links`, `btn-primary`, `card-item`
- Modifiers: `is-active`, `has-error` (state), `size-large` (variant)
- Utilities: `text-center`, `hidden`

**JavaScript:**
- Functions: `initNavigation`, `animateHero`, `handleClick`
- Constants: `SECTIONS`, `BREAKPOINTS`
- Variables: `currentSection`, `isAnimating`

## Common Tasks

### Adding a New Section

1. Create section in HTML with unique `id`
2. Add corresponding nav link
3. Add CSS styles following existing patterns
4. Initialize any JS in `script.js`
5. Update section number in header

### Adding a Video

1. Place video file in project root
2. Use `<video>` tag with `loop muted playsinline`
3. Add poster image for loading state
4. Style with CSS for responsive sizing
5. Add hover-to-play interaction

### Responsive Changes

- Mobile breakpoint: 768px and 992px
- Test all changes at these widths
- Use relative units (rem, %, vw/vh)
- Hide non-essential elements on mobile

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing Checklist

Before committing changes:

- [ ] Site loads without console errors
- [ ] All animations play smoothly
- [ ] Navigation works (scroll to sections)
- [ ] Mobile layout is correct
- [ ] Images load properly
- [ ] Videos play on hover
- [ ] No broken links
- [ ] Text is readable (contrast check)

## Performance Notes

- Minimize external dependencies
- Optimize images before adding
- Use `loading="lazy"` for below-fold images
- Keep CSS animations performant (use transform/opacity)
- Debounce scroll events

## External Dependencies

Loaded via CDN (do not bundle):
- GSAP (animations)
- Lucide Icons
- Google Fonts (Outfit)

## License

Personal portfolio - do not copy without permission.
