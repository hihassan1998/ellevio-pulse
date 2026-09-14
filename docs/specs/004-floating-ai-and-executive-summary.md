# Feature Specification 004: Floating AI Assistant & Strategic Web Manager Insights

---

## 1. Overview & Business Value for Ellevio

This specification details the refactoring of the **AI Kundassistent** into a floating bottom-right drawer widget, alongside the strategic web management rationale demonstrating competence for the **Webbansvarig** role.

---

## 2. Core Strategic Insights & Demonstrable Competencies

### 📊 1. Complex Live Data Visualization Made Simple
- **Challenge:** Raw electricity spot prices across SE1 (Luleå), SE2 (Sundsvall), SE3 (Stockholm), and SE4 (Malmö) are confusing for non-technical retail customers.
- **Solution:** Converts live REST API data into simple, color-coded, accessible (WCAG 2.1 AA) charts so customers instantly grasp regional market dynamics.

### 💡 2. Customer-Centric Content Strategy & Actionable Value
- **Challenge:** Customers struggle to translate kilowatt-hours into actual invoice impact.
- **Solution:** The *Smarta Tidsintervall* cost calculator empowers customers to shift EV charging and laundry to cheaper night windows (`00:00–06:00`), directly supporting Ellevio's electrification and grid-balancing goals.

### 🤖 3. AI Assistant with Human-in-the-Loop & Interaction Analytics
- **Live Website Observation (`ellevio.se`):** Ellevio's current live chat routes directly to human operators, resulting in queue bottlenecks during peak outage or billing periods.
- **Strategic Mervärde (AI Option + Human-in-the-Loop):**
  - **Off-Hours & Peak Relief:** The AI assistant answers repetitive, high-volume questions (solar connections, power outage status, invoice breakdown) 24/7.
  - **Data Collection for Strategic Decisions:** Captures customer interaction patterns and logs whether users choose AI self-service or prefer routing to a human agent for specific query types.
  - **Future Web Roadmap:** Provides Ellevio's web management team with concrete data to optimize self-service UX, adjust customer support staffing hours, and refine digital communication channels.

---

## 3. UI Component Architecture: Floating AI Chat Widget

### Floating Position & Looping Attention Popup
- **Location:** `fixed bottom-6 right-6` with Ellevio Green (`#0b8454`) trigger button.
- **Looping Attention Tooltip:**
  - Displays a subtle speech bubble above the floating icon every 10 seconds:  
    *💬 "Behöver du hjälp med något? Fråga mig!"* or *💬 "Fråga om elområden, solceller eller fakturering"*
- **Drawer State:** Clicking the icon toggles a floating 380px × 520px chat panel with:
  - Clean Swedish plain text streaming (`gpt-4o-mini`).
  - An explicit *"Koppla till mänsklig handläggare"* button to demonstrate Human-in-the-Loop fallback capability.
