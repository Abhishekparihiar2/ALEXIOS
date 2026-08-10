# ALEXIOS Guard Mobile App - Detailed HCI Design & Feature Specification

## 1. Executive Summary & HCI Philosophy
The legacy TrackTik mobile app utilizes an outdated, dense grid of skeuomorphic icons that overwhelm the user, providing equal visual hierarchy to unequal tasks. Our redesign for the **ALEXIOS Guard Mobile App** employs core Human-Computer Interaction (HCI) principles to ensure guards can operate safely, efficiently, and with minimal cognitive load.

### Core HCI Principles Applied
- **Fitts’s Law (Target Accessibility)**: High-frequency actions (Panic Button, Time Clock, Scan Checkpoint) are placed in the "Thumb Zone" (lower half of the screen) with large, minimum 48x48px hit areas.
- **Progressive Disclosure**: Instead of displaying 14 modules simultaneously, the dashboard adapts to the guard's state. (e.g., if a guard is on a tour, the primary action becomes "Scan Next Checkpoint").
- **Recognition over Recall**: Eliminate ambiguous icons. Use clear text labels paired with modern, flat iconography aligned with the ALEXIOS Admin portal.
- **Error Prevention & Recovery**: Destructive or critical actions (Panic Button, Sign Out) feature delayed triggers or confirmation modals to prevent accidental presses.

---

## 2. Detailed Feature Specification & Design Approach

This section details exactly how every required module from the legacy system is modernized and integrated into the new ALEXIOS Mobile App.

### 1. Login Module
- **Features Included**:
  - **Device Setup**: Used by admins to provision a company device to a specific site.
  - **Login**: Guard authentication.
- **Functionality & Design Approach**:
  - The login screen is a clean, distraction-free view utilizing the ALEXIOS dark navy branding.
  - **Device Setup** is hidden behind a discreet gear icon in the top right corner. It requires an admin PIN or QR code to configure, preventing guards from accidentally un-provisioning the device.
  - **Login** utilizes a large, tactile PIN pad (or biometrics like FaceID/Fingerprint for modern devices) rather than forcing tiny keyboard typing.

### 2. Time Clock
- **Features Included**:
  - **Start Break**
  - **Clock Out & Stay Signed in** (Useful for ending a shift but needing to complete a post-shift report).
  - **Clock Out & Sign Out** (Full shift end).
  - **Cancel**
- **Functionality & Design Approach**:
  - Removed from the main icon grid. The Time Clock is now a **persistent contextual banner** at the top of the Home Dashboard showing current status (e.g., "🟢 Clocked In - 08:00 AM").
  - Tapping the banner opens a clean bottom sheet (Action Drawer) presenting the options. This prevents accidental taps while keeping time-tracking accessible from anywhere on the dashboard.

### 3. Checkpoints & Tours
This is the core operational workflow. It is moved from a nested menu into a primary tab on the bottom navigation bar.

- **Features Included & Design Approach**:
  - **View Active Tour**: 
    - When a tour is started, the screen converts to an "Active Tour" view displaying a vertical timeline of the **Checkpoints listing**.
    - **Start Tour / Finish Tour**: Massive blue buttons at the top/bottom of the timeline.
    - **Reports**: During a tour, a floating "+" button allows guards to instantly open the **Report Template list** (Fire Watch Log, Fuel Expense Report, Incident Report) without leaving the tour screen. The report is automatically tagged to the current tour/checkpoint.
    - **Scan NFC**: A massive floating action button (FAB) locked to the bottom center of the screen allows instant NFC/Barcode scanning without navigating menus.
    - **Add Icon**: Upon scanning a checkpoint, an inline card allows guards to add Comments and up to 5 Pictures using the native device camera.
  - **Tour Schedules**:
    - **Tour listing**: A sub-tab showing upcoming scheduled tours for the shift, sorted chronologically.
  - **All Checkpoints**:
    - A searchable list of all site checkpoints.
    - **Setup NFC Checkpoint**: An admin/supervisor tool to pair new physical NFC tags to digital checkpoints, placed behind a long-press or supervisor-PIN wall to prevent guard tampering.
    - **Scan NFC** (Standalone): For ad-hoc scans outside of a structured tour.
  - **Reload Settings**: A pull-to-refresh mechanism on the Tour screen to sync route changes instantly from dispatch.

### 4. Reports & Logs
- **Features Included & Design Approach**:
  - Accessible via a dedicated "Reports" tab in the bottom navigation.
  - **Create Report**: 
    - Tapping "+" opens the template list: **Fire Watch Log, Fuel Expense Report, Incident Report**.
    - Forms utilize native mobile inputs (large date pickers, dropdowns, native camera) instead of cramped web-views.
  - **Browse Site Reports**:
    - **Report Occurrences**: A feed of recent reports.
    - **View My Site Reports**: A segmented tab filtering to only reports submitted by the logged-in guard.
    - **View All Site Reports**: A segmented tab showing team reports (if permission allows).
  - **Cancel**: A clear "X" button in the top left of any report draft, triggering a "Save as Draft?" prompt.

### 5. Dispatch Tasks
- **Functionality & Design Approach**:
  - Replaces the old icon with a "Tasks" section. Urgent dispatch tasks generate a persistent, non-dismissible banner above the dashboard until acknowledged. Tasks open into a checklist view where guards can mark them "Complete" or "Issue Found".

### 6. Message Board
- **Features Included & Design Approach**:
  - Integrated into a unified "Comms" tab in the bottom navigation.
  - **New Messages (listing)**: Unread messages are bolded at the top of the feed with a red notification dot.
  - **All Message (listing)**: A chronologically sorted feed of site communications.
  - **Post a new Message (Submit form)**: Uses a standard chat-app style input field at the bottom of the screen with a paperclip icon to attach images, rather than a clunky full-page form.

### 7. Post and Escalation Orders
- **Functionality & Design Approach**:
  - Presented as a searchable, categorized digital handbook accessible from the "More ☰" menu. The content is automatically cached offline so guards can reference critical procedures even in dead zones (e.g., parking garages).

### 8. Panic Button (Safety Critical)
- **Features Included**:
  - **Automated 10 Sec Timer**
  - **Call**
  - **Siren Off**
  - **Cancel Alarm**
- **Functionality & Design Approach**:
  - **Trigger**: A distinct, red SOS button persistently floating in the bottom right of the Home dashboard, decoupled from other icons.
  - **Friction/Timer**: Tapping SOS initiates a massive, full-screen red 10-second countdown with an auditory pulse and vibration. 
  - **Cancel**: The user must "Slide to Cancel Alarm" (a deliberate gesture preventing accidental cancellation).
  - **Active State**: Once the timer hits 0 (or is bypassed), the screen locks into an active panic state, presenting massive buttons for "Call (911/Dispatch)" and "Siren Off" (which mutes the device alarm but keeps the dispatch alert active).

### 9. Emergency Contacts
- **Functionality & Design Approach**:
  - A clean directory view accessible from the "More ☰" menu. Includes one-tap dialing for dispatchers, local police, fire, and property managers.

### 10. Team
- **Features Included & Design Approach**:
  - **Other Employee List and Detail page**: Shows a directory of other guards currently clocked into the site. Avatars show a green dot for active status. Tapping an employee opens a detail page with their title and a quick-message button.

### 11. Flashlight
- **Functionality & Design Approach**:
  - Removed from the main menu grid. Instead, it is available as a hardware-level toggle or a persistent small "pill" button at the top of the Home Dashboard for instant illumination during night patrols.

### 12. Schedules
- **Features Included & Design Approach**:
  - **Schedule Listing with filters**: A clean calendar/agenda view accessible from the "More ☰" menu. Guards can see upcoming shifts for the week/month. Filters (by site or role) are horizontal scrollable chips at the top of the screen.

### 13. Watch Mode
- **Features Included**: Video Recording and submission.
- **Functionality & Design Approach**:
  - Accessed via a "Quick Actions" tray. Watch mode launches a specialized, darkened camera interface for discreet recording. Once recording stops, it automatically packages the video into an Incident Report draft for seamless submission.

### 14. Settings (Device & App Management)
- **Features Included & Design Approach**:
  - Housed in the "More ☰" tab.
  - **ALEXIO Help Center**: Includes a native Form Submission for reporting app bugs or requesting support.
  - **Change Password**: Secure standard flow.
  - **Synchronization Status**: Shows last successful server sync time.
  - **Reload Phone Settings**: Force-fetches updated site configs.
  - **System Diagnostics**: A dedicated visual dashboard that runs automatically on load, displaying visual traffic lights (🟢 🔴) next to:
    - *Storage is not full*
    - *Internet Connectivity*
    - *Pinging Google*
    - *Pinging ALEXIOs*
    - *GPS Location Permission*
    - *GPS Turned On*
    - *Push Notification*
  - **Session Settings & Local Settings**: Adjust timeout durations, dark mode, and offline cache clearing.
  - **Barcode Scanner Settings**: Allow/Disallow hardware barcode scanner vs. device camera, depending on the rugged device being used.

---

## 3. Proposed Global App Architecture (Bottom Navigation)

To facilitate all these features without overwhelming the user, the app utilizes a **Bottom Navigation Bar** with 4 primary destinations, keeping the most critical workflows one tap away.

1. **Home 🏠** 
   - Time Clock Banner (Top)
   - Dispatch Task Alerts
   - Quick Utilities (Flashlight, Watch Mode)
   - Panic Button (Floating SOS)
2. **Tours 📍** 
   - Active Tour Timeline (Start/Finish, Scan NFC, Add Media, Mid-tour Reports)
   - Tour Schedules
   - All Checkpoints
3. **Comms 💬** 
   - Message Board
   - Team Directory
4. **More ☰** 
   - Reports Hub (Create & Browse)
   - Schedules
   - Post & Escalation Orders
   - Emergency Contacts
   - Settings & Diagnostics
