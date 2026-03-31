# Saroya Heritage Hub

## Current State
Partially built project. Existing React components in src/frontend/src/components/heritage/. Needs complete rebuild with all 6 required sections and full GitHub Pages compatibility.

## Requested Changes (Diff)

### Add
- Home section: hero banner with full-screen village image, welcome message, CTA buttons
- About section: History (founding story), Lifestyle (farming/crafts), People of Saroya (community profiles)
- Culture section: Features overview, Traditions & Festivals, Traditional Food
- Gallery section: responsive image grid with hover zoom/overlay effects, lightbox
- Services section: School, Hospital, Transport — each with image, description, details cards
- Contact section: Address, phone, email, Google Maps embed
- Sticky Navbar with smooth scroll, active link highlight, mobile hamburger
- Footer with quick links, contact info, social icons
- Hover effects on all cards and images
- Smooth scrolling throughout
- Bootstrap 5 grid system + custom CSS

### Modify
- Replace all existing components with new complete implementation
- index.html updated with Bootstrap CDN, Google Fonts, Font Awesome icons

### Remove
- Old incomplete components

## Implementation Plan
1. Rewrite App.tsx as single-page app rendering all section components in order
2. Implement all 6 section components plus Navbar and Footer
3. Custom CSS with parchment/terracotta theme, hover effects, animations
4. Use all generated images in correct sections
5. Bootstrap 5 responsive grid for layout
6. JavaScript: smooth scroll, navbar toggle, gallery lightbox, scroll-based active nav
