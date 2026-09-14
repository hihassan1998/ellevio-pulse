# Feature Specification 003: "Vad kostar det för dig?" Customer Cost Calculator

---

## 1. Existing Feature (Current Baseline)

### Overview
The current "Vad kostar det för dig?" component (`components/ImpactCalculator.tsx`) allows Ellevio customers to calculate estimated electricity costs for common household activities based on the **daily average spot price** of their selected bidding zone (SE1–SE4).

### Current User Flow
1. **Select Bidding Zone:** User selects `SE1` (Luleå), `SE2` (Sundsvall), `SE3` (Stockholm), or `SE4` (Malmö).
2. **Select Appliance / Activity:** User clicks one of three presets:
   - **Elbil:** 40 kWh battery charge
   - **Tvättmaskin:** 1.5 kWh laundry wash
   - **Uppvärmning:** 25 kWh daily heating estimate
3. **Calculation Logic:**  
   $$\text{Cost (SEK)} = \frac{\text{Daily Average Spot Price (öre/kWh)} \times \text{Appliance kWh}}{100}$$
4. **Display:** Shows a static single daily estimate in SEK.

### Limitations of Current Version
- Uses the **flat daily average spot price**, ignoring hourly price fluctuations.
- Does not empower users to find or select the **cheapest time window of the day** (e.g., night charging vs. evening peak).

---

## 2. Proposed Refactored Feature: Time Interval & Smart Planning

### Overview
Enhance the "Vad kostar det för dig?" component to allow users to select a **Time Interval of the Day** (e.g., *Natt 00–06*, *Morgon 06–12*, *Eftermiddag 12–18*, *Kväll 18–24*, or specific hourly slots). The calculator dynamically computes the cost based on the **exact average spot price during that specific time window** and highlights the **Cheapest Window Recommendation** for smart energy planning.

### Proposed Enhanced User Flow
1. **Select Bidding Zone:** Choose `SE1`, `SE2`, `SE3`, or `SE4`.
2. **Select Appliance / Activity:** Choose *Elbil (40 kWh)*, *Tvätt (1.5 kWh)*, or *Uppvärmning (25 kWh)*.
3. **New - Select Time Interval / Slot:**
   - 🌙 **Natt (00:00 – 06:00):** Typically lowest price / best for EV charging.
   - 🌅 **Morgon (06:00 – 12:00):** Morning peak demand.
   - ☀️ **Eftermiddag (12:00 – 18:00):** Daytime solar / steady load.
   - 🌆 **Kväll (18:00 – 24:00):** Evening peak demand.
4. **Dynamic Calculation Logic:**  
   $$\text{Interval Cost (SEK)} = \frac{\text{Average Spot Price in Selected Time Window (öre/kWh)} \times \text{Appliance kWh}}{100}$$
5. **Smart Recommendation Badge:**  
   Displays a prominent badge:  
   *💡 "Spara pengar: Ladda mellan 00:00–06:00 för ca [X] kr istället för [Y] kr på kvällen!"*

### Benefits for Ellevio & Customers
- **Empowers Smart Energy Planning:** Helps customers shift load away from peak hours, supporting grid balance.
- **Direct Financial Savings:** Shows clear price differences between daytime peak and nighttime low rates.
- **Strengthens Ellevio's Electrification & Sustainability Mission:** Demonstrates actionable customer guidance.

---

## 3. Implementation Plan (Pending Approval)

Once approved, the implementation will involve:
1. Updating `lib/elpris.ts` or component helpers to calculate average prices per 6-hour interval (`00-06`, `06-12`, `12-18`, `18-24`).
2. Refactoring `components/ImpactCalculator.tsx` to include time interval selector buttons and the smart recommendation badge.
3. Applying Ellevio design system styling (`#0b8454` primary green, `#e7f6f0` container, WCAG accessible tags).
