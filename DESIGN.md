---
name: Padiver Motor
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#424751'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#737783'
  outline-variant: '#c2c6d3'
  surface-tint: '#255dad'
  primary: '#00346f'
  on-primary: '#ffffff'
  primary-container: '#004a99'
  on-primary-container: '#9bbdff'
  inverse-primary: '#abc7ff'
  secondary: '#006d37'
  on-secondary: '#ffffff'
  secondary-container: '#6bfe9c'
  on-secondary-container: '#00743a'
  tertiary: '#323537'
  on-tertiary: '#ffffff'
  tertiary-container: '#494c4e'
  on-tertiary-container: '#babcbe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#6bfe9c'
  secondary-fixed-dim: '#4ae183'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005228'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
---

## Brand & Style
The design system focuses on the intersection of precision engineering and environmental sustainability. It is built for a Romanian automotive audience that values both technical expertise and cost-efficiency.

The style is **Corporate / Modern** with a slight lean toward **Minimalism** to ensure the technical information remains accessible. The emotional goal is to evoke confidence in safety (Deep Blue) and excitement about savings and environmental impact (Eco-Green). The UI uses high-quality whitespace, crisp structural alignment, and a "precision-fit" aesthetic to mirror the quality of an LPG installation.

## Colors
This palette balances engineering authority with ecological benefits.

- **Primary (Deep Blue):** Used for navigation, headers, and primary technical calls to action. It represents the "Motor" aspect—stability and reliability.
- **Secondary (Eco-Green):** Reserved strictly for "Savings," "Eco-friendly" highlights, and final conversion points. It provides high contrast against the blue.
- **Neutral (Charcoal & Slates):** Used for body text and subtle UI borders to maintain a modern, clean look.
- **Backgrounds:** Use the Tertiary color for section staggering to keep the layout from feeling flat.

## Typography
The typography strategy uses **Montserrat** for headlines to project a bold, geometric, and professional architectural feel. **Inter** is used for body and labels to ensure maximum legibility for technical specifications and pricing tables.

- Use **Headline XL** for hero sections to immediately establish brand authority.
- Use **Label SM** for technical tags or small metadata (e.g., "GPL Type," "Installation Time").
- Maintain generous line heights in body text to ensure readability for a wide age demographic.

## Layout & Spacing
The design system utilizes a **12-column fluid grid** for desktop and a **single-column stack** for mobile. 

- **Grid:** Use a 1280px max-width container with 24px gutters to allow technical diagrams and cards room to breathe.
- **Rhythm:** Spacing follows an 8px baseline. Use 80px vertical gaps between major landing page sections to reinforce the minimalist, premium feel.
- **Mobile:** Margins shrink to 16px. Ensure all interactive touch targets (buttons, inputs) maintain a minimum height of 48px for accessibility in workshop environments.

## Elevation & Depth
Depth is created through **Ambient Shadows** and **Tonal Layers**. 

- **Surface Levels:** The primary background is white. Secondary information sits on a light grey (Tertiary) "container" surface.
- **Shadows:** Use extremely soft, diffused shadows (Blur: 20px, Spread: -4px, Opacity: 8% of Deep Blue) for primary cards. This makes components feel "lifted" without looking cluttered.
- **Interaction:** On hover, card elevation should increase slightly, and the shadow should become more pronounced to provide tactile feedback.

## Shapes
The shape language is defined as **Rounded**, using an 8px radius for standard components and a 16px radius for large cards and containers. This softens the "industrial" nature of auto service, making the brand feel more modern and customer-friendly.

- **Buttons:** 8px radius.
- **Input Fields:** 8px radius.
- **Service Cards:** 16px radius.
- **Testimonial Bubbles:** 16px radius with a bottom-left anchor point.

## Components

### Buttons
- **Primary:** Deep Blue background, white text. Bold, authoritative.
- **Savings CTA:** Eco-Green background, dark charcoal text. Used for "Calculate Savings" or "Get Quote."
- **Ghost:** Transparent background with a 1px Deep Blue border.

### Service Cards
- Use 16px rounded corners.
- Feature a 48px icon in Deep Blue or Eco-Green at the top left.
- Subtle 1px border (#E2E8F0) with a soft ambient shadow.

### Trust Badges
- Circular or shield-shaped icons.
- Use Eco-Green for "Certified" or "Warranty" labels to visually link safety with environmental value.

### Testimonial Bubbles
- Light grey background (Tertiary).
- 16px roundedness. 
- Include a small avatar and a 5-star rating component in Eco-Green.

### Contact Forms
- Inputs should have a 1px grey border that transitions to a 2px Deep Blue border on focus.
- Labels are positioned above the input in **Label SM** typography.