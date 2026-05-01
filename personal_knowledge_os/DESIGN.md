---
name: Personal Knowledge OS
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#464652'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#767684'
  outline-variant: '#c6c5d5'
  surface-tint: '#4b53bb'
  primary: '#4b53bb'
  on-primary: '#ffffff'
  primary-container: '#8b93ff'
  on-primary-container: '#1d238f'
  inverse-primary: '#bec2ff'
  secondary: '#006c52'
  on-secondary: '#ffffff'
  secondary-container: '#58f9c8'
  on-secondary-container: '#007055'
  tertiary: '#82542a'
  on-tertiary: '#ffffff'
  tertiary-container: '#c89161'
  on-tertiary-container: '#502b03'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bec2ff'
  on-primary-fixed: '#00016d'
  on-primary-fixed-variant: '#3239a2'
  secondary-fixed: '#5cfcca'
  secondary-fixed-dim: '#34dfaf'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#00513d'
  tertiary-fixed: '#ffdcc1'
  tertiary-fixed-dim: '#f6ba87'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#663d15'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system centers on the concept of an "External Brain" that feels approachable rather than clinical. It balances the high-density utility of professional productivity tools with the delightful, tactile feedback of modern educational apps. 

The aesthetic is defined by **Soft Neumorphism**, using subtle light and dark shadows to create extrusions that feel physical and "squishy," paired with **Glassmorphism** for navigational overlays to maintain a sense of depth and lightness. The goal is to evoke a sense of organized calm, transforming complex data management into a playful, sensory experience.

## Colors

The palette utilizes a "Sugar-Coated Professional" approach. The primary canvas is a very light grey-tinted white, preventing eye strain. Pastel gradients serve as semantic markers for different knowledge domains (e.g., Lavender for "Ideas," Mint for "Tasks").

- **Primary:** A soft, saturated lavender for main actions and focus states.
- **Secondary:** A bright mint for success states and growth metrics.
- **Tertiary:** A soft orange for warnings or high-priority highlights.
- **Surface:** Uses white with high transparency (Glassmorphism) or matches the background with dual-shadow offsets (Neumorphism).

## Typography

This design system utilizes **Plus Jakarta Sans** for headings to achieve a friendly, geometric, and rounded feel that mirrors the UI's corner radius. **Inter** is used for body text and data-heavy views to ensure maximum legibility and functional precision. Headings should be set with tight letter spacing and bold weights to contrast against the soft, airy nature of the UI components.

## Layout & Spacing

The layout follows a flexible 12-column fluid grid designed for a "Personal OS" feel, where widgets can be resized and snapped into place. 

Generous whitespace (padding-heavy) is mandatory to prevent the Neumorphic shadows from feeling cluttered. Gutters are fixed at 24px to ensure distinct separation between "extruded" cards. Components should use a base-8 spacing scale to maintain a rhythmic, mathematical precision beneath the playful exterior.

## Elevation & Depth

Depth is the core differentiator of this design system. It is achieved through three specific layers:

1.  **The Floor:** The base background level (Neutral #F0F2F5).
2.  **Extruded Layer (Neumorphism):** Used for primary interactive cards. Created using two shadows: a light shadow (white, top-left, -8px -8px, 16px blur) and a dark shadow (grey-blue, bottom-right, 8px 8px, 16px blur).
3.  **Floating Layer (Glassmorphism):** Used for sidebars and modals. These use a 65% opacity white fill with a 20px backdrop-blur and a subtle 1px white inner-border to simulate the edge of a glass pane.

Avoid traditional "black drop shadows" in favor of tinted ambient shadows that match the underlying pastel gradients.

## Shapes

The design system is defined by "Super-ellipses." Hard corners are strictly prohibited. 

- **Standard Containers:** 16px radius for buttons, input fields, and small widgets.
- **Parent Containers:** 24px radius for main content cards and sidebar backgrounds.
- **Interactions:** Hover states should transition from a flat Neumorphic extrusion to a slightly "pressed" (inset shadow) state to provide tactile feedback.

## Components

- **Glassy Sidebars:** Fixed position, high backdrop-blur (30px), with menu items that use a soft-gradient pill background on hover.
- **Soft Gradient Chat Bubbles:** Used for AI interactions. Bubbles use a subtle linear gradient (e.g., Lavender to Sky Blue) with a soft outer glow rather than a harsh border.
- **Neumorphic Buttons:** Use a subtle convex gradient. On click, they transform to an inset shadow to simulate a physical button being pressed.
- **Minimal Cartoon Icons:** Use thick 2px strokes with rounded caps. Icons should be monochrome but sit on a small pastel-colored "squircle" background.
- **Input Fields:** Recessed (inset shadow) background to indicate "editability," with a bright Primary color border-glow on focus.
- **Knowledge Cards:** 24px rounded corners, Neumorphic base, containing a "Glass-tile" header for the title area to create multi-layered depth.