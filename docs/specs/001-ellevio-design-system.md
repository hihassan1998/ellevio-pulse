---
version: alpha
name: Ellevio
description: >-
  Ellevio is Sweden's leading electricity distributor serving nearly one million customers, combining technical
  infrastructure expertise with a commitment to sustainable energy solutions and electrification.
logo:
  src: https://ellevio.se/gui-web/img/logo-orange.svg
colors:
  surface: '#ffffff'
  surface-dim: '#f2f1f0'
  surface-bright: '#ffffff'
  surface-container-lowest: '#f1f1f1'
  surface-container-low: '#e5e3e1'
  surface-container: '#e7f6f0'
  surface-container-high: '#e9ecef'
  surface-container-highest: '#d0d0d0'
  on-surface: '#2c2827'
  on-surface-variant: '#757575'
  inverse-surface: '#2c2827'
  inverse-on-surface: '#f1f1f1'
  outline: '#757575'
  outline-variant: '#949494'
  surface-tint: '#0b8454'
  primary: '#0b8454'
  on-primary: '#ffffff'
  primary-container: '#e7f6f0'
  on-primary-container: '#0b8454'
  inverse-primary: '#0b8454'
  secondary: '#ce1f36'
  on-secondary: '#ffffff'
  secondary-container: '#f2e5e7'
  on-secondary-container: '#ce1f36'
  tertiary: '#f5a623'
  on-tertiary: '#ffffff'
  tertiary-container: '#fef3e6'
  on-tertiary-container: '#f5a623'
  error: '#ce1f36'
  on-error: '#ffffff'
  error-container: '#f2e5e7'
  on-error-container: '#ce1f36'
  primary-fixed: '#e7f6f0'
  primary-fixed-dim: '#0f5a46'
  on-primary-fixed: '#0b8454'
  on-primary-fixed-variant: '#0f5a46'
  secondary-fixed: '#f2e5e7'
  secondary-fixed-dim: '#9d1528'
  on-secondary-fixed: '#ce1f36'
  on-secondary-fixed-variant: '#9d1528'
  tertiary-fixed: '#fef3e6'
  tertiary-fixed-dim: '#c67f1a'
  on-tertiary-fixed: '#f5a623'
  on-tertiary-fixed-variant: '#c67f1a'
  background: '#ffffff'
  on-background: '#2c2827'
  surface-variant: '#949494'
typography:
  display:
    fontFamily: FuturaEF-DemiBold, Arial, Helvetica, sans-serif
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: '-0.02em'
  headline-lg:
    fontFamily: FuturaEF-DemiBold, Arial, Helvetica, sans-serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: '-0.01em'
  headline-md:
    fontFamily: FuturaEF-DemiBold, Arial, Helvetica, sans-serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0em
  title-lg:
    fontFamily: FuturaEF-DemiBold, Arial, Helvetica, sans-serif
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0em
  body-lg:
    fontFamily: FuturaEF-Book, Arial, Helvetica, sans-serif
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: FuturaEF-Book, Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-md:
    fontFamily: FuturaEF-DemiBold, Arial, Helvetica, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: FuturaEF-DemiBold, Arial, Helvetica, sans-serif
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  container-max: 1200px
elevation:
  sm: 0 1px 2px rgba(0, 0, 0, 0.06)
  md: 0 3px 8px rgba(0, 0, 0, 0.15)
  lg: 0 8px 24px rgba(0, 0, 0, 0.12)
layout:
  containerMaxWidth: 1200px
  gridColumns: 12
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.DEFAULT}'
    padding: 12px 32px
    height: 48px
    borderWidth: 2px
    borderColor: '{colors.primary}'
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1)
  button-primary-hover:
    backgroundColor: '#0f5a46'
    borderColor: '#0f5a46'
    textColor: '{colors.on-primary}'
  button-primary-focus:
    backgroundColor: '#0f5a46'
    borderColor: '#0f5a46'
    outline: 2px dotted black
    outlineOffset: 4px
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '#3f3d3c'
    typography: '{typography.label-md}'
    rounded: '{rounded.DEFAULT}'
    padding: 12px 32px
    height: 48px
    borderWidth: 2px
    borderColor: '#3f3d3c'
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1)
  button-secondary-hover:
    backgroundColor: '#3f3d3c'
    borderColor: '#3f3d3c'
    textColor: '{colors.on-primary}'
  button-hero-light:
    backgroundColor: '{colors.surface}'
    textColor: '#2c2827'
    typography: '{typography.label-md}'
    rounded: '{rounded.DEFAULT}'
    padding: 12px 48px
    borderWidth: 2px
    borderColor: '{colors.surface}'
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1)
  button-hero-light-hover:
    backgroundColor: '#e5e3e1'
    borderColor: '#2c2827'
    textColor: '#2c2827'
  card:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.md}'
    padding: '{spacing.md}'
    boxShadow: '{elevation.md}'
    transition: background-color 0.15s ease-in-out
  card-hover:
    backgroundColor: '{colors.surface-container-high}'
  input-field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    typography: '{typography.body-md}'
    rounded: '{rounded.sm}'
    padding: 12px
    borderWidth: 1px
    borderColor: '{colors.outline-variant}'
    transition: border-color 0.15s ease-in-out
  input-field-focus:
    borderColor: '{colors.primary}'
    outline: none
  list-item:
    backgroundColor: transparent
    rounded: '{rounded.md}'
    padding: '{spacing.sm}'
    transition: background-color 0.15s ease-in-out
  list-item-hover:
    backgroundColor: '{colors.surface-container-high}'
    textColor: '{colors.primary}'
  badge:
    backgroundColor: '{colors.primary-container}'
    textColor: '{colors.on-primary-container}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.full}'
    padding: 4px 12px
    display: inline-block
---

## Overview

Ellevio is a Swedish electricity distribution company serving nearly one million customers with a design system rooted in Scandinavian Functionalism—a philosophy that prioritizes clarity, efficiency, and trustworthiness over ornamentation. The visual language combines a confident, forest-green primary accent (#0b8454) with warm, neutral grays and whites to convey stability and technical competence. The brand personality is direct, solution-oriented, and deeply committed to electrification and sustainability; the UI reflects this through clean hierarchies, generous whitespace, and purposeful color deployment that guides users toward critical actions without distraction.

The tone is professional yet approachable—never corporate-speak, always practical. Ellevio speaks to customers as partners in the energy transition, using concrete language and avoiding jargon. Example sentence in brand voice: 'Anslut din laddare på under 5 minuter—vi hanterar resten.' (Connect your charger in under 5 minutes—we handle the rest.) The design system emphasizes accessibility and legibility at all scales, with typography anchored in FuturaEF (a geometric sans-serif family) and a spacing model that respects cognitive load.

## Colors

The color system is anchored by a primary green (#0b8454) that appears on all call-to-action buttons, active states, and brand-critical interactive elements. This green is derived from Ellevio's commitment to sustainable energy and is used sparingly to maintain visual impact—it never appears as a background fill for large surfaces, only as an accent on components like buttons (padding: 12px 32px, border-radius: 8px) and focus indicators. The secondary red (#ce1f36) is reserved for error states, alerts, and critical warnings; it should never be used for positive actions. Tertiary orange (#f5a623) serves as a supporting accent for highlights and secondary calls-to-action in specific contexts.

The surface stack is deliberately minimal: white (#ffffff) is the primary canvas, with subtle off-w

## Typography

The typography system uses FuturaEF-DemiBold for all headings and labels, and FuturaEF-Book for body text, creating a clear distinction between structural and content layers. Display text (72px, line-height: 80px, letter-spacing: -0.02em) is reserved for hero sections and major page titles; headline-lg (48px, line-height: 56px) for section headings; headline-md (32px, line-height: 40px) for subsections; and body-lg (20px, line-height: 28px) for primary body copy. The label system (label-md at 16px, label-sm at 14px) is used exclusively for buttons, form labels, and metadata. All text over 16px should use a line-height of at least 1.4× the font size to maintain readability; body text at 20px uses 28px line-height (1.4×). When placing small labels (12–14px) over busy or colored backgrounds,

## Layout

The page layout follows a 12-column grid with a max-width of 1200px, centered on the viewport with symmetric margins. The gutter between columns is 24px, and the outer margin (from viewport edge to container edge) is also 24px on desktop, reducing to 16px on tablets and 12px on mobile. Section spacing uses the lg token (40px) for major section breaks, md (24px) for subsection breaks, and sm (12px) for component-level spacing. The container-max-width of 1200px accommodates up to three equal-width cards per row at desktop resolution, with graceful reflow to two columns at 768px and single column below 480px. Whitespace is generous and intentional: a typical section has 40px top margin, 40px bottom margin, and 24px internal padding between the section header and content. This rhythm creates v

## Elevation & Depth

Depth in this system is achieved through restrained shadows and subtle surface color shifts rather than dramatic layering. The elevation model consists of three levels: Level 1 (Base) uses no shadow and sits directly on the white surface (#ffffff). Level 2 (Standard Cards & Modals) applies box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15) and a background color of #f2f1f0 or #e5e3e1 to create gentle separation. Level 3 (Elevated Modals & Overlays) uses box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) with a background of #ffffff to ensure maximum contrast and focus. Interactive elements like buttons never u

## Shapes

The shape philosophy is 'Geometric Clarity'—combining sharp, technical precision with subtle softness to reflect Ellevio's dual nature as both an infrastructure company and a customer-focused service provider. Buttons use a 8px border-radius (rounded.DEFAULT: 0.5rem) to provide a modern, approachable feel without excessive rounding; this radius is applied consistently across all button variants (primary, secondary, hero-light). Cards and containers use 12px border-radius (rounded.md: 0.75rem) to create a slightly more relaxed appearance while maintaining geometric integrity. Input fields use t

## Components

### Action Elements
Buttons are the primary interactive component and come in three variants: primary (green background #0b8454, white text, 2px green border), secondary (white background, dark text #3f3d3c, 2px dark border), and hero-light (white background with dark border, used on dark hero backgrounds). All buttons use FuturaEF-DemiBold at 16px with 24px line-height, padding of 12px 32px, and a height of 48px. Hover states transition the background color over 100ms (transition-duration: 0.1s) to the darker variant (#0f5a46 for primary, #3f3d3c for secondary). Focus states add a 2px dotted black outline with 4px offset. Disabled buttons use a neutral gray (#757575) for both background and border, with white text, and the cursor changes to not-allowed. Button groups use 24px gap spacing

## Do's and Don'ts

**Do**
- Do use the primary green (#0b8454) exclusively for call-to-action buttons, active states, and brand-critical interactive elements—never as a background fill for large surfaces.
- Do maintain 40px spacing between major sections and 24px between subsections to create visual breathing room and reduce cognitive load.
- Do apply the 2px solid border to all buttons and interactive elements to reinforce clickability and provide clear visual definition.
- Do use FuturaEF-DemiBold for all headings and labels, and FuturaEF-Book for body text, to create a clear distinction between structural and content layers.
- Do use soft shadows (0 3px 8px rgba(0, 0, 0, 0.15)) for standard cards and (0 8px 24px rgba(0, 0, 0, 0.12)) for elevated modals to maintain the clean, Scandinavian aesthetic.
- Do apply focus states with a 2px dotted black outline and 4px offset to meet accessibility standards and provide clear keyboard navigation feedback.

**Don't**
- Don't use the secondary red (#ce1f36) or tertiary orange (#f5a623) for positive actions or primary call-to-action buttons—reserve red for errors and orange for secondary highlights only.
- Don't apply shadows to buttons or interactive elements; instead, use color change and border definition to signal state changes.
- Don't exceed a line-height of 1.5× the font size for body text, as this disrupts the geometric proportions of FuturaEF and reduces readability.
- Don't use full-width backgrounds for interactive components; always contain them within the 12-column grid and use shadows to separate from the surface.
- Don't apply letter-spacing beyond 0.05em, as this disrupts the intended proportions of FuturaEF and creates visual discomfort.
- Don't mix FuturaEF with system fonts or other typefaces in the same component; maintain typographic consistency across all UI layers.
