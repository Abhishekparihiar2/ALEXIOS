# ALEXIOS/RFI Admin/Supervisor Portal — Full Spec Review & Build Plan

## Context

The user has provided two authoritative specification documents for the RFI Admin/Supervisor Portal:

1. **Developer Functional Specification** (`RFI_Admin_Supervisor_Portal_Developer_Functional_Specification_Verified.md`, 103 KB, 4,750 lines) — Final consolidated scope from AppZoro Technologies Inc., July 29, 2026. Contains Part I (functional baseline, sections 1–26) and Part II (detailed developer logic, sections 27–49 + addendum).

2. **Figma Design Specification HCI Enhanced** (`RFI_Admin_Supervisor_Portal_Figma_Design_Specification_HCI_Enhanced.md`, 365 KB, ~7,900+ lines) — Design-ready plan converting the functional spec into screen-by-screen Figma anatomy, assigned Design IDs SCR-001 through SCR-125+ for every subsection.

Both files have been read cover-to-cover in this session.

---

## What I Confirmed Reading — All Sections

### Developer Functional Spec (Part I: Sections 1–26)

| Section | Content Confirmed |
|---------|-------------------|
| §1 Document Control | Single-company platform, scope legend (Confirmed / Pending Discussion / Excluded), organizational hierarchy |
| §1.4 Org Structure | Company → Region → Client → Site → Job Type/Position → Shift; Zone excluded |
| §2 Auth & Portal Framework | Login, RBAC, module-level permissions, site restriction, financial visibility, Global Search, Notifications, Chat, Profile |
| §3 Dashboard | Clocked-In (3.1.1), Inactive Mobile User + ticket auto-gen (3.1.2), Expiring Skills (3.1.3), Reports to Approve (3.1.4), Message Board (3.1.5), Time-Off Requests (3.1.6), Activity Log (3.2), Attendance (3.3), Scheduled Tours (3.4), Task Dispatch (3.5), Show Map + Remote Actions (3.6), Global Search (3.7), Send an Update (3.8), Dashboard Submodules: Report Settings, Vehicle Mgmt, Schedule redirect, Company Activity Journal, System Exceptions (3.9) |
| §4 Employee Management | Add Employee (4.1, all 4 field groups), Employee Listing (4.2), Employee Profile: Assigned Sites, Site Bans, Emergency Contacts, Notes on/by Employee, Availability/Calendar, Work Exceptions, Employee Actions (terminate, ID card, tracks, change PW), Skills/Credentials, Security & Patrol Reports, Summary Reports, Tours, Schedules, Time Off (4.3.1–4.3.15), Company Policies (4.4), User Settings (4.5), Admins (4.6), Departments (4.7), Skills & Attributes Administration (4.8) |
| §5 Clients & Sites | Client/Site rules, Create Site/Client Account (5.2, all 6 subsections), Site Listing (5.3), Site Profile: Overview, Positions/Job Types, Assigned Employees, Employee Profile from Site, Client Portal Access, Banned Employees, Other Contacts, Site Actions (close account), Dispatch Settings, Operation Reports & Site Activity, Site Notifications (14 event types), Security & Patrol Settings: Checkpoints, Tour Routes, Locations, Emergency Contacts, Geo-Fencing, Mobile App Restrictions, Live Dashboard, History Tracks, Message Board, Assigned Employees, Positions/Job Types, Email Settings (5.4.1–5.4.21) |
| §6 Checkpoints & Tour Routes | Create Checkpoint (NFC/Barcode, monitoring modes, scan intervals, exception verification, manual scanning options), Batch Import, Checkpoint Logs, Checkpoint Listing, Checkpoint Alerts; Tour Routes: Create, Confirmed Rules (clocked-in + geo-fence required), Tour Listing & Actions, Checkpoint Issue Reporting |
| §7 Scheduling | Schedule Setup (Name, fields, view types), Schedule View (Day/Week/Month/User/Job/List), Shift Creation (Date, Time, Job, Users, recurring, tags, tasks), Schedule Behavior (conflict checks: overlap, rest, OT, unavailability, time-off, expired creds, site bans, missing training) |
| §8 Time Clock / Attendance | Clock-In/Out (geo-fence gated), Timesheet/Exception Info (Meal Break, Rest Break, Actual vs Scheduled), Time Clock Pages (Security Ops > Time Clock > Site Listing > Timesheet today) |
| §9 Reports & Incidents | Reports vs Forms distinction, Report Listing (columns + filters), Approval/Publication (single-level, no correction workflow), Custom Report Builder (categories, incident categories, footers, field types), Incident Categories, Media Limits |
| §10 Forms | Form Management (Add/Archive/Move/Delete), Form Builder (custom fields, assign to employees), Form Submissions |
| §11 Tasks, Dispatch & Job List | Task Types: Dispatch/Quick/Recurring/Help Desk Ticket; Assignment (one target); Task Creation (dynamic form by type); Task Filters & Counts (Overdue/Done/Open/Total + Created by Me/My Tasks/All/Archived); Escalation via Automations; Job List (Add/Import, pending behavior) |
| §12 Communications | Chat (New Chat, New Group, Broadcast; detailed rules pending), Updates (Listing/Create/Export), Directory (Tag/Notify/Send Chat/Group Chat/Create Task/Export), Forms within Comms, Help Desk (Unassigned/Assigned to Me/All) |
| §13 Security Operations | Landing page: Schedules (site list → schedule redirect), Time Clock (site list → timesheet today), Forms, Quick Tasks, Post Orders/SOPs/Manuals, Company Vehicle Documentation |
| §14 Documents, Policies & Team Resources | Documents & Policies (Policies, Post Orders, SOPs, Manuals, Employee Docs, Site Docs, Vehicle Docs, Workplace Notices), Team Member Manual, Rewards (pending), Documents/Create Pack, Team Member Benefits (pending), Celebrations (pending), Time Off & Paid Policies, Insights (pending), Text Message, Workplace Notices, Disciplinary Reports (pending), HR Complaint Form (pending), Hiring (pending) |
| §15 Training | Quizzes (Add/Active/Archived/Export/Search/Filter), RFI Academy (same; content types/certs/expiration pending) |
| §16 Vehicles | Vehicle records: Create, List (ID/License/Make-Model-Year/Status), filters (All/Purchased/Leased, Active/Inactive/All), View; Company Vehicle Documentation (Add/List/Export); Excluded: fuel, mileage, maintenance, GPS |
| §17 Automations & Notifications | Custom Trigger→Conditions→Actions builder; Triggers (14 confirmed events); Conditions (Site/Employee/JobType/Shift/ReportCategory/IncidentCategory/Date/Time/Status/Skill/Tour/Checkpoint); Actions (Send Notification/Email/SMS/Push, Create Task/Ticket, Notify Admin/Supervisor/Employee, Create Incident, Send Broadcast, Update status); Scope: one site per automation; duplicate suppression required |
| §18 Payroll & Back Office | Payroll calculation required (formulas pending); Back Office config: Break Management, Back Office Defaults, Employee Classes, Payroll Schedules, Holiday Groups, Holiday Codes, Overtime Rules, Pay Codes, Export Formats, Tax Settings, Bill Items, Audit History, General Settings, Back Office Settings, Break Penalties; Employee financial info subject to visibility permissions |
| §19 Settings & Configuration | General: Notification sender, 14 notification categories, Break Mgmt, Clock In/Out, SMS Segments, Company Name/Address, Roles & Permissions, Password Policy, Sign-In Log, General (13 categories pending), System Locale, Field Configuration; Operation: Report/Site/Incident Templates, Devices & License (pending), Region Message Boards (pending), Job/Service Type, Special Calendar Days, Calendar Groups (pending); Back Office Configuration (mirrors §18); Password Policy & Sign-In Log; Data Retention (configurable by 9 categories) |
| §20 Groups & Segments | Source-listed; detailed behavior pending |
| §21 Help & Help Desk | Help: Resource Center, Talk to Expert; Help Desk: Unassigned/Assigned to Me/All (separate modules) |
| §22 Supervisor Portal | Same portal, same modules — permissions and site restriction filter what's visible; no separate Dispatcher role; financial visibility explicitly controlled |
| §23 Pending Discussion Register | Scheduling (shift acceptance/rejection/open/claims/swaps/cross-midnight), Site/Client/Contracts, Guard Mobile, Communications (chat rules), HR/Team Resources, Training, Finance, Migration, 15 undefined source features |
| §24 Excluded | Multi-tenancy admin, Zone mgmt, Equipment inventory, Vehicle fuel/mileage/GPS, Report Mentions, Temporary permissions, Dispatcher role, Multi-level report approval, Correction/return workflow |
| §25–26 Traceability & Acceptance | All 21 functional areas coverage confirmed; no omission without approved change request |

### Developer Functional Spec (Part II: Sections 27–49 + Addendum §36)

| Section | Content Confirmed |
|---------|-------------------|
| §27 Cross-Module Standards | Record identity (immutable system ID + display ID), soft-delete requirements, AND-logic filters, same-filter exports, server-side permission enforcement, audit entries (12 action types), notification suppression logic |
| §28 Auth Dev Logic | Login flow, sign-in log, Force Password Change redirect, role resolution (merge all active roles), site restriction on every query, Global Search grouping |
| §29 Dashboard Dev Logic | 1-min refresh, count-card→detail consistency, Clocked-In count logic (5 statuses), Inactive Mobile detection (GPS + mobile activity threshold), Expiring Skills (expiry date comparison + configurable window), Reports to Approve (last 7 days), Message Board, Time-Off Requests, Activity Log, Attendance, Scheduled Tours, Task Dispatch, Show Map + Remote Actions (Audio transmit only; Remote Speak = inactive placeholder) |
| §30 Employee Management Dev Logic | Auto-generated Employee ID, SMS consent stored separately per phone, site ban enforcement in scheduler, notes types for Activity Journal, default availability = Available/Green, work exception calculation from break rules + actual activity, termination flow (7 automated consequences), credential status derivation (expiry = date-based; verification = manual) |
| §31 Departments/Admins/User Settings | Dept CRUD, Admin listing derived from portal access (no duplicate record), User Settings financial visibility enforcement |
| §32 Clients/Sites Dev Logic | Multi-client-to-site and multi-site-to-client; Unique ID uniqueness; Bill-To address update on contact save; Close Account (choices only, no automated consequences yet); Site Operational Tabs all must remain accessible |
| §33 Checkpoints/Tours Dev Logic | Manual scan with reason enforcement; batch import row-level validation; grace period default 15 min; guard must be clocked-in + inside geo-fence to start tour; checkpoint issue triggers configurable actions |
| §34 Scheduling Dev Logic | Day/Week/Month/User/Job/List views + blank clickable cells; all 13 display toggles present; recurring shift support; 9 conflict validation types; schedule updates notify via configurable channel |
| §35 Time Clock Dev Logic | Geo-fence blocking, earliest/late/early-out thresholds configurable, manual edit = reason + audit, break calculation from break management config |
| §36 Reports Dev Logic | Source statuses only (New/Approved/Verification/Job Pending/Archived); no multi-level approval; Digital acknowledgment supported |
| §37 Forms Dev Logic | Assigned-version submission stored; submissions readable after form edit/archive |
| §38 Tasks Dev Logic | Four separate task record types; escalation via automations; Job List = Add/Import only (behavior pending) |
| §39 Communications Dev Logic | No read acknowledgment; chat rules pending; directory site-restricted; Updates = Listing/Create/Export only |
| §40 Security Operations Dev Logic | Landing area linking to shared modules, no duplicate records |
| §41 Documents Dev Logic | PDF upload/list/download for Policies; team resource features preserve listed Add/List/Active/Archived/Export/Search only |
| §42 Training Dev Logic | Quizzes + RFI Academy only; no courses/certificates/completion automation until pending resolved |
| §43 Vehicles Dev Logic | Create/List/View/Filter, documentation Add/List/Export; no fleet management |
| §44 Automations Dev Logic | Event → find active automations → evaluate conditions → duplicate check → execute actions → record execution; global scope remains unconfirmed |
| §45 Payroll Dev Logic | Config screens for all 15 back office items; employee Compensation + Payment subject to visibility; no formulas/approval/accounting integration yet |
| §46 Settings Dev Logic | All config sections audited on change; Zone Templates excluded; undefined behaviors = pending placeholders |
| §47 Supervisor Logic | Same app/modules as Admin; site restriction + permissions = only filter |
| §48 Pending Dev Decisions | 8 areas with explicit "do not implement by assumption" directive |
| §49 Developer Acceptance Checklist | 10 mandatory checks per screen |
| §36 Source Coverage Addendum | Employee Security & Patrol → Metrics section = placeholder only (fields undefined); Guard Mobile App + Client Portal standalone screens are out of scope |

### Figma Design Spec — All Sections Confirmed

The Figma spec (SCR-001 through SCR-125+, continuing into sections 30–49 mirroring Part II) converts every functional requirement above into:
- **Design IDs** (SCR-NNN) for each screen/subsection
- **Navigation Paths** (module hierarchy)
- **Screen Types**: Listing/Management, Form/Configuration, Detail/Profile, Dashboard/Monitoring, Calendar/Scheduler, Map/Spatial, Section/Feature
- **Primary Components** per screen (Data table, Filter bar, Search input, Export controls, Interactive map, Calendar/schedule grid, Form controls, Tabs/segmented controls, File upload, Toggle/checkbox/radio, Metric card, Standard content section)
- **Figma screen anatomy** (universal rule: page header, source-defined section order, applicable states)
- **Source requirements** (verbatim from functional spec)
- **Design interaction notes** (universal rules: confirmation dialogs for destructive actions, filter state visibility + reset, form section preservation, contextual link navigation)

**Responsive frames**: 1440px (primary), 1280px, 1024px tablet with collapsible nav.

**Visual language**: Operational, clean, information-dense. Status colors always paired with text/icon labels. Panic/Critical = Red, Warning/Overdue = Yellow, On-Duty = Green. Sticky table headers. Financial info hidden by role.

**Reusable component set** (23 components defined in §3.3): Application shell, sidebar, top header, global search overlay, page header, metric/count card, tab navigation, filter bar, filter drawer, data table, pagination, export menu, status badge, empty state, loading skeleton, inline validation, confirmation dialog, form section, dynamic form field, map marker + popup, calendar cell + shift card, activity timeline, file uploader, date/time picker, role/module toggle matrix, notification banner, pending-definition annotation.

**Standard states required**: Default populated, Empty, Loading, No search results, No permission/inaccessible, Validation error, System error, Archived/inactive record, Pending discussion.

---

## Critical Design/Implementation Rules (Non-Negotiable)

1. **No unapproved functionality** — every field, filter, column, and action must trace to the spec.
2. **Pending Discussion items** = visible placeholders, not implemented assumptions.
3. **Excluded items** = not present in active product screens.
4. **Confirmation dialogs** required for: terminate, close account, archive, remove, revoke access, clock out, delete.
5. **Financial info** = hidden unless role explicitly grants it.
6. **Site restriction** = server-side and UI-side enforcement on every query.
7. **Exports** = respect active filters.
8. **Count cards** = must match their detail listings.
9. **Records with history** = no hard delete; use soft archive/inactive.
10. **Audit entries** = required for all 12 specified action types.
11. **Duplicate notifications** = suppressed for same unresolved automation event.
12. **Zone management** = excluded for current phase.
13. **No separate Dispatcher role**.
14. **Remote Speak** = inactive placeholder only.
15. **Employee Security & Patrol Metrics** = named placeholder only (fields undefined).

---

## Brand Identity (Extracted from Logo)

Logo: RFI Security LLC — shield + phoenix emblem, deep navy background, silver text/icon.

| Token | Value | Usage |
|-------|-------|-------|
| `--sidebar` | `#0f1729` | Sidebar background (matches logo navy) |
| `--sidebar-foreground` | `#c0c8d8` | Sidebar text/icons (matches logo silver) |
| `--sidebar-primary` | `#3b82f6` | Active nav item highlight |
| `--sidebar-accent` | `#1a2744` | Sidebar hover state |
| `--primary` | `#1e3a6e` | Primary buttons, key actions |
| `--primary-foreground` | `#ffffff` | Text on primary buttons |
| `--background` | `#f4f6fa` | Content area background (light, high contrast) |
| `--foreground` | `#0f172a` | Body text |
| `--card` | `#ffffff` | Card/panel backgrounds |
| `--border` | `rgba(0,0,0,0.08)` | Subtle borders |
| `--status-critical` | `#dc2626` | Red — Panic/Critical (always paired with text) |
| `--status-warning` | `#d97706` | Amber — Warning/Overdue (always paired with text) |
| `--status-success` | `#16a34a` | Green — On-Duty/Active (always paired with text) |
| `--status-info` | `#2563eb` | Blue — Informational |

Font: **Inter** (Google Fonts) — optimal for dense operational UIs. Import weights 400, 500, 600, 700.

Logo file: `src/imports/rfi_security_llc_logo.jpg` — used in sidebar header and login screen.

---

## Page-by-Page Build Order

Each "page" is a distinct route/view in the SPA. The App shell (sidebar + header) wraps all pages 2–24.

| Page # | Screen ID | Route | What it covers |
|--------|-----------|-------|----------------|
| **1** | SCR-001–004 | `/login` | Login form, force-password-change, forgot password |
| **2** | SCR-005 | Shell | Sidebar nav (all 21 modules, RBAC-gated), top header |
| **3** | SCR-006–016 | `/dashboard` | KPI stat cards, Activity Log, Attendance, Scheduled Tours, Task Dispatch, Map, Message Board, Time-Off widget |
| **4** | SCR-017 | `/employees` | Employee listing table + filters + export + Add CTA |
| **5** | SCR-018a | `/employees/new` | Add Employee 4-section form |
| **6** | SCR-018–024 | `/employees/:id` | Employee profile 15 sub-tabs |
| **7** | SCR-025 | `/sites` | Site/Client listing table + filters + export |
| **8** | SCR-026 | `/sites/new` | Create Site/Client 6-section form |
| **9** | SCR-027–028 | `/sites/:id` | Site profile 21 sub-tabs |
| **10** | SCR-029–031 | `/checkpoints` | Checkpoint listing, create, logs, tour routes |
| **11** | SCR-032–035 | `/scheduling` | Schedule views (Day/Week/Month/User/Job/List) + shift modal |
| **12** | SCR-036–038 | `/timeclock` | Site listing → timesheet today, exception info |
| **13** | SCR-039–043 | `/reports` | Report listing, approval flow, custom builder, incident categories |
| **14** | SCR-044–046 | `/forms` | Form management, builder, submissions |
| **15** | SCR-047–050 | `/tasks` | Task listing (4 types), creation form, job list |
| **16** | SCR-051–055 | `/communications` | Chat, Updates, Directory, Help Desk |
| **17** | SCR-056–060 | `/security-ops` | Security Operations landing, post orders, quick tasks |
| **18** | SCR-061–065 | `/documents` | Policies, SOPs, Manuals, Docs; pending placeholders visible |
| **19** | SCR-066–068 | `/training` | Quizzes, RFI Academy (pending items = placeholder sections) |
| **20** | SCR-069–071 | `/vehicles` | Create/list/view vehicles, documentation |
| **21** | SCR-072–076 | `/automations` | Trigger→Conditions→Actions builder UI |
| **22** | SCR-077–082 | `/payroll` | 15 back office config screens, compensation (visibility-gated) |
| **23** | SCR-083–090 | `/settings` | General, Operation, Back Office, Password Policy, Data Retention |
| **24** | SCR-091–094 | `/help` | Groups placeholder; Help landing; Help Desk 3-tab listing |

---

## Page 1 Detail: Login Screen (SCR-001–004)

**Route**: `/login` (default unauthenticated route)

**Layout**: Full-screen centered card on dark navy background matching logo color (`#0f1729`). RFI Security LLC logo centered at top of card.

**Components**:
- Full-page background: navy gradient `#0f1729` → `#1a2744`
- White card (max-w-md, rounded-xl, shadow-2xl) centered vertically and horizontally
- Logo image at top of card (`src/imports/rfi_security_llc_logo.jpg`, 80×80px, rounded)
- "RFI Security" heading + "Admin Portal" subheading
- Email input field (labeled "Email Address")
- Password input field with show/hide toggle
- "Remember Me" checkbox
- "Forgot Password?" text link (right-aligned)
- "Sign In" primary button (full width, navy `#1e3a6e`)
- Error banner (inline, red, appears on invalid credentials)
- Force-password-change redirect (separate screen, same card layout, new-password + confirm-password fields)
- Sign-in log: every successful login recorded (background only, no UI needed on Page 1)

**States**: Default, loading (button spinner), error (wrong credentials), force-change-password.

---

## What To Build First

---

## Files To Create/Modify

- `src/app/App.tsx` — Main component (replace placeholder)
- `src/styles/theme.css` — Update tokens for operational dark-ish theme (navy/slate sidebar, white content area)
- `src/styles/fonts.css` — Add Google Fonts (Inter for UI density)

## Token Updates Required

The current theme uses light generic tokens. For a security operations portal we need:
- Sidebar: dark navy (`#0f1629` or similar)
- Status tokens: `--status-critical: #dc2626` (Red), `--status-warning: #d97706` (Yellow/Amber), `--status-success: #16a34a` (Green), `--status-info: #2563eb` (Blue)
- Preserve all existing `--background`, `--foreground`, `--border`, `--primary` etc. tokens (required by `index.css`)

## Verification

After building:
1. Start dev server and verify shell renders at 1440px
2. Confirm sidebar navigation shows/hides modules (simulated RBAC)
3. Confirm dashboard KPI cards load with correct mock data
4. Confirm status badges use color + text label (not color alone)
5. Confirm confirmation dialogs appear on destructive actions
6. Confirm financial info hidden in non-financial role mode
7. Confirm empty/loading/no-permission states render correctly
