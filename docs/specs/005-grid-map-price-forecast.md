# Feature Spec: Local Grid Status & Price Forecast Map

## Overview
An interactive map component for the Ellevio customer portal that visualizes real-time electricity spot prices (SE1–SE4) and local grid status across Ellevio's service areas. The feature aims to make complex energy market data understandable for residential customers, reducing billing confusion and enabling proactive energy consumption decisions.

## Problem Statement
Ellevio customers struggle to understand:
- Why their electricity bill varies month to month
- When electricity is cheapest or most expensive
- How their local grid area affects their costs
- When to shift heavy appliance usage to save money

## Target Users
- Residential Ellevio customers (1M+)
- Customers in SE1, SE2, SE3, SE4 price zones
- Users on mobile and desktop

## Core Features

### 1. Interactive Map
- **Library**: Use `react-leaflet` with OpenStreetMap tiles (free, no API key)
- **Coverage**: Swedish map centered on Ellevio's service areas (Stockholm, Karlstad, and surrounding regions)
- **Markers**: Clickable city markers for major cities in each SE zone
- **Color coding**: Markers colored by current price level (green = low, yellow = medium, red = high)

### 2. Real-Time Price Data
- **API**: Use the free Swedish electricity spot price API (e.g., `https://api.spot-hinta.fi` or ENTSO-E transparency platform)
- **Data points**: Current price (öre/kWh), price for next 24h, daily average
- **Zones**: SE1 (Luleå), SE2 (Sundsvall), SE3 (Stockholm), SE4 (Malmö)

### 3. Price Forecast Panel
- **Chart library**: Use `recharts` or `chart.js` for a 24-hour forecast line chart
- **Display**: Show hourly prices for the selected zone
- **Highlight**: Mark peak and off-peak hours visually
- **Comparison**: Show how current price compares to yesterday and weekly average

### 4. Customer Notification Logic
- **Trigger**: When price exceeds a threshold (e.g., 150 öre/kWh)
- **Message**: "High prices now. If you can, shift heavy appliance use (washing machine, dishwasher, EV charging) to after 20:00."
- **Implementation**: CSS animation on the notification banner; no push notifications in v1

### 5. Grid Status Indicator
- **Display**: Current grid load status (Normal / High / Critical) per region
- **Data source**: Simulated for demo; later connect to Ellevio's internal grid data
- **Visual**: Simple status badge with color (green/yellow/red)

## Technical Stack
- React 18+ with TypeScript
- `react-leaflet` for maps
- `recharts` for charts
- Tailwind CSS for styling
- Fetch API for live data
- Responsive design (mobile-first)

## UI/UX Requirements
- **Loading state**: Skeleton loaders for map and chart
- **Error state**: Friendly error message with retry button
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigable map controls
- **Language**: Swedish primary, English fallback

## Success Metrics
- Time on page > 2 minutes
- Reduction in "why is my bill high" support tickets
- User engagement with price forecast feature

## Future Enhancements
- Personalized usage overlay (connect to customer's actual consumption data)
- Push notifications for price spikes
- Savings calculator: "If you shift usage to off-peak, you save X kr/month"
- Integration with Ellevio's "Mina sidor" login