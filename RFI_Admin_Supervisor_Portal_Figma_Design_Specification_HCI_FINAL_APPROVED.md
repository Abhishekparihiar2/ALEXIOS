RFI ADMIN / SUPERVISOR PORTAL

Figma Make Design and HCI Specification - FINAL APPROVED

Complete page inventory, interaction behavior, user flows, fields, tables, filters, actions, states and usability requirements

| **Prepared for** | RFI Security Personnel Outsourcing Platform                                 |
| ---------------- | --------------------------------------------------------------------------- |
| **Prepared by**  | AppZoro Technologies Inc.                                                   |
| **Design Tool**  | Figma Make                                                                  |
| **Scope**        | Admin and Supervisor Web Portal                                             |
| **Basis**        | Verified Developer Functional Specification and approved RFI clarifications |

# 1\. How to Use This Design Document

This document converts the approved functional scope into a design-ready plan for Figma Make. It does not create new business functionality. Any layout recommendation is a presentation method for an existing requirement and may be changed without changing scope.

- Every source-listed page, module, section, subsection, field, table column, filter and action remains traceable.
- Items marked Pending Discussion must be represented as placeholders or annotations and must not be finalized by assumption.
- Items excluded for the current phase must not appear as active product screens.
- Duplicated access points may open a shared screen, but the contextual entry point must remain available.

# 2\. Figma File Structure

- 00 - Cover and Design Notes
- 01 - Foundations
- 02 - Components
- 03 - Authentication and Global Shell
- 04 - Dashboard
- 05 - Employees
- 06 - Clients and Sites
- 07 - Scheduling
- 08 - Time Clock and Payroll
- 09 - Reports and Forms
- 10 - Patrols and Checkpoints
- 11 - Security Operations
- 12 - Communications
- 13 - Team Resources
- 14 - Training
- 15 - Settings and Administration
- 16 - Help and Sign Out
- 17 - Pending Discussion Screens
- 18 - Prototypes and User Flows

# 3\. Design Foundations

## 3.1 Responsive Frames

| **Frame**        | **Recommended Width**   | **Usage**                         | **Design Requirement**                       |
| ---------------- | ----------------------- | --------------------------------- | -------------------------------------------- |
| Desktop Large    | 1440 px                 | Primary Admin/Supervisor design   | Full navigation and dense operational tables |
| Desktop Standard | 1280 px                 | Secondary validation frame        | No horizontal clipping of core actions       |
| Tablet Landscape | 1024 px                 | Supervisor field access           | Collapsible navigation and adaptive tables   |
| Mobile Web       | Optional reference only | Emergency access where applicable | Not a replacement for Guard Mobile App       |

## 3.2 Global Visual Language

- Operational, clean and information-dense without appearing cluttered.
- Status colors must always include text or icon labels and must not rely on color alone.
- Critical alerts and panic events require the strongest visual priority.
- Tables should use sticky headers where long lists are expected.
- Forms should group only the source-defined sections and fields.
- Financial information must be visually hidden when the role lacks financial visibility.

## 3.3 Reusable Components

- Application shell
- Primary sidebar
- Top header
- Global search overlay
- Page header
- Metric/count card
- Tab navigation
- Filter bar
- Filter drawer
- Data table
- Pagination
- Export menu
- Status badge
- Empty state
- Loading skeleton
- Inline validation
- Confirmation dialog
- Form section
- Dynamic form field
- Map marker and guard detail popup
- Calendar cell and shift card
- Activity timeline
- File uploader
- Date and time picker
- Role/module toggle matrix
- Notification banner
- Pending-definition annotation

# 4\. Global Screen Rules

## 4.1 Application Shell

- Left navigation displays only modules assigned through Roles and Permissions.
- Site-restricted users see only records associated with assigned sites.
- Top header contains Global Search, Notifications, Chat, User Profile and Sign Out.
- Do not add a global create menu unless approved later.
- Page-level search, filters, exports and actions appear only where specified.

## 4.2 Standard States Required in Figma

- Default populated state
- Empty state
- Loading state
- No search results
- No permission / inaccessible module
- Validation error
- System error
- Archived or inactive record state
- Pending discussion state where applicable

# 4A. Final Approved Project Logic for Design

This section is authoritative for Figma and Figma Make. If any older screen note elsewhere in this document conflicts with the rules below, the rule below supersedes the older wording. These rules are design behavior, not new scope.

## Portal Roles and Access

- Web Portal roles are Employee, Admin, Super Admin and Client. Guard uses the Mobile App.
- Only Super Admin can grant Admin rights to an Employee.
- No separate Supervisor account type is required; supervisor duties are performed by an Admin with the applicable site/module permissions.
- Every screen must visually respect module permissions and assigned-site restrictions.

## Employee Lifecycle

- Pending Invitation: employee created and invitation sent but not yet accepted. User cannot be assigned to a Site or Shift.
- Active: invitation accepted; employee becomes eligible for Site/Shift assignment according to permissions and qualifications.
- Inactive: login disabled and current Site assignments removed. Reactivation requires manual Site reassignment.
- Terminated: access revoked and history preserved.

## Reports and Incidents

- Report statuses are Pending Approval, Approved and Archived only.
- If Approve Automatically is enabled on the Custom Report, submission becomes Approved immediately.
- If approval is required, submission is Pending Approval and may be approved by Admin or Super Admin. The submitter cannot approve their own report.
- Editing a submitted or approved report preserves the prior version and returns it to Pending Approval when approval is required.
- Report Flags are not used in the current approved scope. Do not show flag-based filters or flows as active functionality.
- Incident Categories classify incident types and configure form sub-fields. Level does not alter approval or notification behavior.
- Report ID displays as sequential #00001 and never resets.
- Use one Company Footer only. Generated PDFs retain the footer active when the PDF was generated.

## Forms

- Every employee assigned to a Form must complete it independently.
- Each assigned employee has an individual completion/submission status.
- One employee submits only once for that assignment. Repeat submission/history chains are not required.
- Editing is allowed before submission only.
- Submitted values remain read-only and preserved even if the Form template is later removed.

## Scheduling and Shift Interaction

- Copy/duplicate Shift carries Job Type, User, Notes, Tags, Tasks and Tour association.
- If a published Shift employee later becomes Inactive/Terminated, alert Admin; do not automatically unassign the historical/published Shift.
- If a required Skill expires for a future assigned Shift, alert Admin; do not auto-unassign the existing published Shift.
- An unassigned Draft Shift requires an Admin reminder before scheduled time.
- Guard can Accept or Reject assigned Shift in Mobile App; rejection alerts the Site Admin.
- Guard can request swap/replacement; Admin receives the request and manually resolves it.
- Open-shift claiming remains Later Phase.
- Cross-midnight Shift belongs to its start date.

## Tours

- Each Guard assigned to the same Tour occurrence receives an independent Tour session.
- First scheduled Guard is auto-assigned first; additional Guards may be manually assigned.
- High Priority Task interrupts active Tour, sets Tour to Interrupted and pauses the Tour timer.
- Interruption duration is excluded from late/incomplete calculations.
- After High Priority Task completion, app returns Guard to the interrupted Tour.
- If not resumed before shift end, final Tour status remains Interrupted.
- Guard may see the expected randomized Tour time/window in advance.

## Task Priority UX

- High Priority: interrupt current Tour/work immediately; keep Panic, Emergency Contacts, Call and Supervisor/Admin messaging accessible.
- Medium Priority: complete current active Tour first, then process waiting Medium tasks by due time.
- Low Priority: must be completed before normal Guard clock-out. Admin may override with mandatory reason and exception/ticket.
- Admin may manually complete a Task, but the action must be visibly auditable.
- Task reassignment preserves prior assignee, progress and status history.

## Timesheets and Automatic Clock-Out

- Employee may view but cannot edit timesheet. Admin reviews/edits/approves; edits must show audit/history.
- Super Admin may reopen approved time; reopening resets approval.
- Approved time changes feed the next automatic payroll calculation cycle.
- If Guard does not clock out at assigned shift end, create ticket/notification and auto clock-out after 10 minutes even if Guard remains inside Site polygon.
- After automatic clock-out, Guard may still use the Mobile App to finish pending Tasks/Tours; app access must be visually separated from paid Clocked-In state.

## Skills and Eligibility

- Add Skill includes configurable Expiring Soon Alert Days.
- Soft Skill does not block Site/Shift assignment.
- Expired required Skill blocks new assignments but does not remove an already active Shift.
- Rejected certificate may be replaced; rejected document remains visible in audit/history.

## Geo-Fence and Inactivity

- Use one polygon geo-fence per Site covering the permitted Site area; store Guard coordinates at clock-in.
- Static Position inactivity is based on required app/task/report/form input activity within configured interval.
- Moving Position inactivity additionally uses geo-coordinate activity.
- Inactivity notification and ticket require manual Admin resolution; do not design automatic ticket closure.

## Automations

- Automation is assigned to selected Site(s); no automatic all-future-sites behavior.
- Current actions are In-App Notification, Push Notification, SMS and Create Task.
- For manually reported duplicate events inside 30 minutes, show duplicate warning and allow reporter confirmation to create separately.
- Auto-generated alerts do not require approval.
- Failure of SMS, Push Notification or Create Task generates Super Admin notification.

## Client/Site, Vehicles and Groups

- Primary Client is an indicator only.
- Removing Client from Site immediately revokes current Site/Report/Schedule/Employee access while preserving historical records.
- Multi-site Client Portal uses a Site selector dropdown in the dashboard header.
- Vehicle statuses are Active/Inactive; Vehicle ID auto-generated; VIN and License Plate unique; inactive Vehicles remain historically accessible.
- Group fields: Group Name, Description, Members, Status and Activity. Employees may belong to multiple Groups.
- Groups support activity, communications and applicable automation targeting; Groups do not control Schedule access.

# 5\. Complete Page and Screen Specifications

The following sections retain the verified functional specification and add Figma-specific page anatomy. The source requirement text is preserved as the control for design coverage.

# 1\. Document Control and Scope Rules

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 1.1 Purpose

| **Design ID**          | SCR-001                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **Navigation Path**    | . Document Control and Scope Rules → Purpose                       |
| **Screen Type**        | Listing / Management Screen                                        |
| **Primary Components** | Data table, Filter bar / filter drawer, Form controls, File upload |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- This document defines the complete functionality of the RFI Admin/Supervisor Web Portal. It preserves applicable modules, sections, subsections, fields, filters, table columns, actions, settings and pending decisions from the source feature list and subsequent RFI responses.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 1.2 Scope Status Legend

| **Design ID**          | SCR-002                                                  |
| ---------------------- | -------------------------------------------------------- |
| **Navigation Path**    | . Document Control and Scope Rules → Scope Status Legend |
| **Screen Type**        | Section / Feature Screen                                 |
| **Primary Components** | Standard content section                                 |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 1.3 Controlling Rules

| **Design ID**          | SCR-003                                                |
| ---------------------- | ------------------------------------------------------ |
| **Navigation Path**    | . Document Control and Scope Rules → Controlling Rules |
| **Screen Type**        | Listing / Management Screen                            |
| **Primary Components** | Form controls, Tabs / segmented controls, File upload  |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- The platform is a single-company platform for the current version.
- The architecture may support future multi-tenancy, but no current multi-tenant screens or controls are included.
- RFI clarifications override conflicting wording in the original feature list.
- Items marked Pending Discussion remain visible in this document but must not be treated as finalized.
- No new approval flow, calculation rule, notification rule, reporting KPI, client capability, mobile behavior or workflow is assumed unless explicitly listed or confirmed.
- UI organization may consolidate duplicated access points, but every listed functionality must remain accessible.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 1.4 Confirmed Organizational Structure

| **Design ID**          | SCR-004                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Navigation Path**    | . Document Control and Scope Rules → Confirmed Organizational Structure             |
| **Screen Type**        | Listing / Management Screen                                                         |
| **Primary Components** | Interactive map, Form controls, Tabs / segmented controls, File upload, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Company → Region → Client → Site → Job Type / Position → Shift
- Client: organization associated with sites and Client Portal access.
- Multiple clients may be assigned to one site.
- Account Type: classification such as Regular Client, Multi-Site Client or Site Account.
- Site: operational property where security services are performed.
- Location: exact latitude/longitude or a defined internal site area.
- Department: employee team used to group and assign employees.
- Zone is ignored for the current phase.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 2\. Authentication, Access and Portal Framework

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 2.1 Authentication / Login

| **Design ID**          | SCR-005                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| **Navigation Path**    | . Authentication, Access and Portal Framework → Authentication / Login |
| **Screen Type**        | Dashboard / Monitoring Screen                                          |
| **Primary Components** | Standard content section                                               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Web Portal login supports Employee, Admin, Super Admin and Client. Guard authentication belongs to the Mobile App.
- Role-based redirection to the applicable dashboard.
- Access only to modules assigned through Roles and Permissions.
- Web Portal is shared by Employee, Admin, Super Admin and Client according to role. No separate Supervisor account type is required.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 2.2 Roles and Permissions

| **Design ID**          | SCR-006                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Navigation Path**    | . Authentication, Access and Portal Framework → Roles and Permissions |
| **Screen Type**        | Form / Configuration Screen                                           |
| **Primary Components** | Form controls, Toggle / checkbox / radio controls                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Users may have multiple roles.
- Roles are created through role and permission toggles.
- No separate Dispatcher role is required.
- Permissions are module-level. A user with module access may access all functions in that module.
- Users may be restricted to assigned sites; when restricted, they may access permitted module information for those sites.
- Financial visibility is custom-defined.
- Temporary permissions are not required.
- Role Setup Fields
- Role Name
- Description
- Portal Section / Portal Type
- Module access toggles
- Assigned site restriction
- Financial information visibility

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 2.3 Global Portal Elements

| **Design ID**          | SCR-007                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| **Navigation Path**    | . Authentication, Access and Portal Framework → Global Portal Elements |
| **Screen Type**        | Listing / Management Screen                                            |
| **Primary Components** | Filter bar / filter drawer, Search input, Export controls, File upload |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Global Search for Customers/Clients, Contacts, Employees, Reports and other supported records.
- Notifications indicator.
- Chat access.
- User profile and Sign Out.
- Page-level search, filters, export and actions only where specifically listed in this document.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 3\. Dashboard

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 3.1 Platform Statistics

| **Design ID**          | SCR-008                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Navigation Path**    | . Dashboard → Platform Statistics                                                                                                                      |
| **Screen Type**        | Listing / Management Screen                                                                                                                            |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Calendar / schedule grid, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 3.1.1 Clocked-In via Mobile
- Shows the total number of guards clocked in today.

#### Detail Listing Columns

- Name
- Position / Job Type
- Clocked-in Time
- Shift Name

#### Filters and Actions

- Status: Current
- Status: Current (Uncovered)
- Status: All Shifts
- Status: Covered
- Status: Late Shift
- Global Search
- View details
- 3.1.2 Inactive Mobile User
- Shows guards who are clocked in but have no GPS updates or no mobile activity for a configured duration. The threshold is configured through Automations. Dashboard data refreshes every minute.

#### System Behavior

- Automatically generate a ticket when the configured inactivity condition is met.
- Suppress duplicate notifications for the same unresolved event.

#### Ticket Listing Columns

- Date
- Ticket Type
- First Name
- Last Name
- Subject
- Location
- Status
- View
- 3.1.3 Expired and Expiring Soon Skills
- Shows active employee skills and credentials that are expired or expiring soon.

#### Listing Columns

- Employee Name
- Expiration Date
- Expires
- Description
- Region
- Category

#### Filters and Export

- Category: Diplomas
- Category: Trainings & Special Skills
- Category: Languages
- Category: Licenses & Permits
- Category: Memberships
- Category: Prior Career Skills
- Category: Uniforms
- Date Filter
- Export Excel
- Export CSV
- Export PDF
- 3.1.4 Reports to Approve - Last 7 Days
- Shows reports pending approval before publication to the Client Portal.
- Click redirects to the Reports page under Operation Reports.
- Approval requirement is configurable while creating the custom report.
- 3.1.5 Message Board
- Shows count of unread/pending messages created by Guards.

#### Listing Columns

- Sender Name
- Title
- Message
- Date and Time
- Site
- Viewable By

#### Filters

- Category
- Type: Current Message
- Type: Future Message
- Type: Expired Messages
- Global Search
- 3.1.6 Time-Off Requests
- Shows count of pending time-off requests.
- Click redirects to the Time Off page.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.2 Activity Log

| **Design ID**          | SCR-009                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard → Activity Log                                                      |
| **Screen Type**        | Listing / Management Screen                                                     |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Latest: current-day activities.
- View History: date-wise historical activities.
- Filters
- All Events
- Reports
- Time Clock
- Patrol Tours
- Panic Button Triggers
- Changed Site
- Checkpoint Scans
- Runsheet Patrol Events
- Remote Actions
- Date From-To

PENDING DISCUSSION: Detailed Runsheet Patrol Events behavior remains undefined.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.3 Attendance

| **Design ID**          | SCR-010                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard → Attendance                                                                      |
| **Screen Type**        | Listing / Management Screen                                                                   |
| **Primary Components** | Filter bar / filter drawer, Search input, Calendar / schedule grid, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Lists guards scheduled today and their clocked-in status, shift-wise.
- Follow Connecteam-style attendance presentation.
- Filters
- Current
- Current (Uncovered)
- All Shifts
- Covered
- Late Shift
- Global Search

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.4 Scheduled Tours

| **Design ID**          | SCR-011                                             |
| ---------------------- | --------------------------------------------------- |
| **Navigation Path**    | . Dashboard → Scheduled Tours                       |
| **Screen Type**        | Listing / Management Screen                         |
| **Primary Components** | Data table, Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Listing Columns
- Schedule Timing
- Site Name
- Schedule Title
- Last Performed By

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.5 Task Dispatch

| **Design ID**          | SCR-012                                               |
| ---------------------- | ----------------------------------------------------- |
| **Navigation Path**    | . Dashboard → Task Dispatch                           |
| **Screen Type**        | Form / Configuration Screen                           |
| **Primary Components** | Data table, Filter bar / filter drawer, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- List all created tasks.
- Add Task opens a dynamic form based on selected Task Type.
- Filters
- New Tasks
- In Progress
- New and In Progress
- Completed
- Assignment: All
- Assignment: Not Assigned
- Assignment: Assigned to Any
- Assignment: Assigned to Employee

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.6 Show Map

| **Design ID**          | SCR-013                 |
| ---------------------- | ----------------------- |
| **Navigation Path**    | . Dashboard → Show Map  |
| **Screen Type**        | Detail / Profile Screen |
| **Primary Components** | Interactive map         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Show checked-in guards on a map.
- Open a popup/activity view for all activities since clock-in.
- Remote Actions
- Message with Siren
- Remote Speak
- Send Audio Message
- Reload Install / Reload Settings
- Clock Out and Stay Signed In
- Clock Out and Sign Out

PENDING DISCUSSION: Remote Speak behavior remains pending definition.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.7 Global Search

| **Design ID**          | SCR-014                     |
| ---------------------- | --------------------------- |
| **Navigation Path**    | . Dashboard → Global Search |
| **Screen Type**        | Listing / Management Screen |
| **Primary Components** | Search input                |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Search Customer/Client
- Search Contacts
- Search Employees
- Search Reports
- Redirect to the selected record detail page

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.8 Send an Update

| **Design ID**          | SCR-015                      |
| ---------------------- | ---------------------------- |
| **Navigation Path**    | . Dashboard → Send an Update |
| **Screen Type**        | Section / Feature Screen     |
| **Primary Components** | Standard content section     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Send bulk updates to a Specific Group
- Send to a Specific User
- Send by User Type

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 3.9 Dashboard Submodules

| **Design ID**          | SCR-016                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard → Dashboard Submodules                                                                                                    |
| **Screen Type**        | Form / Configuration Screen                                                                                                           |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Calendar / schedule grid, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 3.9.1 Reports Settings
- Custom Report Form Listing
- Filter by Categories
- Filter Active / Archived
- Search
- Edit
- Field Setup
- Count of generated reports
- Create Custom Report
- Custom Report Form
- New Category
- Add Category
- Custom Report Categories
- Category Listing
- Edit Category
- Archive Category
- Incident Categories
- Create Incident Category
- Report Footers
- Add Footer
- Footer Listing in text/image format
- Edit Footer

#### Incident Category Listing Columns

- Code
- Region
- Description
- Level
- Parent Category
- Default Group

#### Incident Category Actions and Filters

- Edit
- Sub Form
- Filter: All Groups
- Filter: Default Groups
- Global Search
- 3.9.2 Vehicle Management
- Create Vehicle
- Vehicle Listing
- View Vehicle

#### Listing Columns

- ID
- License
- Make / Model / Year
- Status

#### Filters

- All Vehicles
- Purchased
- Leased
- Status: Active
- Status: Inactive
- Status: All
- 3.9.3 Schedule
- Redirect to the Live Schedule page.
- Follow the confirmed Connecteam-style schedule functionality defined in Section 8.
- 3.9.4 Company Activity Journal
- List activities performed by Admin users.

#### Filters

- Banned
- Notes
- Terminated
- Reactivated
- 3.9.5 System Exceptions
- Redirect to the Ticketing/Help Desk module.
- Display tickets automatically generated under system exception categories.

PENDING DISCUSSION: Detailed System Exceptions behavior beyond ticket generation remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 4\. Employee Management

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 4.1 Add Employee

| **Design ID**          | SCR-017                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management → Add Employee                                                                  |
| **Screen Type**        | Form / Configuration Screen                                                                           |
| **Primary Components** | Calendar / schedule grid, Form controls, File upload, Toggle / checkbox / radio controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 4.1.1 General Information
- Employee ID - automatically generated
- First Name
- Middle Name
- Last Name
- Job Title
- Employee Type - configurable dropdown with ability to create a custom type
- Phone (Main)
- SMS Notification Consent for Main Phone
- Phone (Other)
- SMS Notification Consent for Other Phone
- Gender
- Email
- Government Badge ID
- Username
- Departments
- Create Password
- Confirm Password
- 4.1.2 Address
- Address
- Address Line 2
- City
- State
- ZIP Code
- Country
- 4.1.3 Roles and Permissions
- Administration Portal toggle
- Admin role toggle
- Manager/Supervisor role toggle
- Employee Portal / Guard Mobile App toggle
- Assign multiple roles
- Assign permitted modules
- Assign site restriction
- Configure financial visibility where applicable
- 4.1.4 Other Fields
- Logo or Picture
- Tags
- Fax
- Employment Date
- Business Registration Number
- Birthday
- Terminated Date

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 4.2 Employee Listing

| **Design ID**          | SCR-018                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management → Employee Listing                                                                        |
| **Screen Type**        | Listing / Management Screen                                                                                     |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Table Columns
- UID
- Name
- Middle Name
- Last Name
- Title
- Termination Date
- Email
- Username
- User Type
- Department
- Status
- Last Visit
- Added By
- Filters and Export
- Department
- Zones - excluded for current phase
- Status
- Global Search
- Export CSV
- Export PDF
- Export Excel

EXCLUDED / CURRENTLY NOT REQUIRED: Zone filtering is excluded for the current phase.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 4.3 Employee Profile / View Employee

| **Design ID**          | SCR-019                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Navigation Path**    | . Employee Management → Employee Profile / View Employee                                                                                                                             |
| **Screen Type**        | Form / Configuration Screen                                                                                                                                                          |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Interactive map, Calendar / schedule grid, Form controls, Tabs / segmented controls, File upload, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 4.3.1 Overview and Basic Details
- User Type
- Employee ID
- Phone
- Email
- Address
- Other information captured during employee creation
- 4.3.2 Assigned Sites

#### Listing Columns

- Site
- Start Date
- Effective Rate Date
- Rate
- End Date
- Is Primary
- Make Primary
- Action: Remove

#### Assign Site Form

- Site Name
- Employee Start Date
- Is Primary Site: Yes / No
- 4.3.3 Site Bans

#### Ban Site Form

- Site
- Reason
- Effective Date
- Expiration Date
- Permanent or Temporary
- Requested By
- Internal Notes
- Attachment
- Status

#### Banned Site Listing Columns

- Site Name
- Banned On
- Status
- Action: Remove Ban
- System prevents assignment of the employee to a banned site.
- 4.3.4 Emergency Contacts
- Create Contact
- Contact Listing
- Filter Active
- Filter Archived
- Filter by Status
- 4.3.5 Notes on Employee
- Add Note
- Notes Listing
- 4.3.6 Notes by Employee
- Notes Listing
- Filter Types: Banned
- Filter Types: Notes
- Filter Types: Terminated
- Filter Types: Reactivated
- Status: Active
- Status: Archived
- Status: All
- 4.3.7 Availability / Calendar
- Weekly calendar showing Days and Time
- Available - Green
- May Be Available - Yellow
- Not Available - Red
- Default availability is Available/Green
- Click to update availability
- 4.3.8 Work Exceptions

#### Listing Columns

- Shift Start
- Shift End
- Region
- Account Name
- Meal Break Exception
- Meal Schedule
- Meal Actual
- Rest Break Exception
- Rest Schedule
- Rest Actual

#### Filters

- Date
- Status
- Global Search
- 4.3.9 Employee Actions
- Change Password
- Force Password Change
- Generate/View ID Card
- Snap Picture / Upload Profile Picture
- Terminate
- View Tracks / Current Location
- Edit Employee

#### Change Password Form

- Enter Password
- Confirm Password

#### Force Password Change

- Send password change link to the user

#### Terminate Form

- Last Day of Work
- Reason
- Comments

#### Automatic Termination Actions

- Mark future shifts as uncovered
- Revoke Web Portal access
- Revoke Guard Mobile App access
- Preserve historical records
- Notify Payroll
- Notify Supervisors

#### Edit Employee

- General Information
- Address
- Roles and Permission
- Other Fields
- Employee ID remains non-editable
- 4.3.10 Skills and Attributes

#### Listing Columns

- Skill
- Category
- Information

#### Filters

- Category
- Global Search
- Admin manually verifies submitted credentials and updates status.

#### Credential Statuses

Pending Review

- Verified
- Rejected
- Expiring Soon
- Expired
- 4.3.11 Security and Patrol - Reports

#### Report Listing Columns

- ID
- Type
- Date
- Reported By
- Account
- Status
- Printable PDF
- Email Report
- View
- Remove

#### Report Filters

- Active
- All Templates
- Archived
- Status Filter
- Approved
- Archived
- Date From-To
- Global Search
- 4.3.12 Summary Reports

#### Listing Columns

- Employee
- Location
- Reports
- Videos
- Checkpoints
- Start
- End
- Tracks
- PDF
- View
- Options

#### Options

- Approve All Reports
- Send Shift Report by Email
- Delete This Shift and Time Logs

#### Filters

- Date
- Global Search
- 4.3.13 Tours

#### Listing Columns

- Tour Name
- Account
- Employee
- Result
- Start Time
- End Time
- Duration (Minutes)
- PDF
- Email
- View Tour Session
- Delete Tour Session

#### Filters and Export

- Date From-To
- Global Search
- Export CSV
- Export PDF
- Export Excel
- Pivot Chart View
- Pivot Chart Edit

PENDING DISCUSSION: Pivot Chart behavior remains source-listed but not further defined.

- 4.3.14 Schedules

#### Schedule Listing Columns

- Note
- Name
- Day
- Start Date
- Time
- Clocked Shifts
- Scheduled Break
- Actual Break

#### Filters and Views

- Date From-To
- Calendar View
- No Schedule to Distribute
- No Changes to Notify
- Print
- 4.3.15 Time Off

#### Create Time Off Form

- First Day Off
- Return Date
- Description

#### Listing Columns

- ID
- From
- To
- Description

#### Entitlement

- Set employee time-off entitlement

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 4.4 Company Policies

| **Design ID**          | SCR-020                                  |
| ---------------------- | ---------------------------------------- |
| **Navigation Path**    | . Employee Management → Company Policies |
| **Screen Type**        | Listing / Management Screen              |
| **Primary Components** | Data table, Export controls, File upload |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Upload Policy Document in PDF
- Policy Document Listing
- Download Policy Document

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 4.5 User Settings

| **Design ID**          | SCR-021                               |
| ---------------------- | ------------------------------------- |
| **Navigation Path**    | . Employee Management → User Settings |
| **Screen Type**        | Detail / Profile Screen               |
| **Primary Components** | Form controls                         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Customize fields for user profile
- Personal Details
- Company-Related Information
- Compensation Details
- Payment Information

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 4.6 Admins

| **Design ID**          | SCR-022                        |
| ---------------------- | ------------------------------ |
| **Navigation Path**    | . Employee Management → Admins |
| **Screen Type**        | Listing / Management Screen    |
| **Primary Components** | Data table, Form controls      |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Admin Employee Listing Columns
- First Name
- Last Name
- Access Level
- Managed Groups
- Permissions
- Admin Tab
- Accepted
- Last Login
- Added By

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 4.7 Departments

| **Design ID**          | SCR-023                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management → Departments                                             |
| **Screen Type**        | Form / Configuration Screen                                                     |
| **Primary Components** | Data table, Filter bar / filter drawer, Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Create Department
- Department Name
- Display ID
- Details
- Department Listing Columns
- Department
- Install Code
- Employees
- View
- Department Detail Sections
- Department Employees
- Operation Reports
- Notifications
- Positions / Job Types
- Edit
- Contacts
- Security and Patrol
- Schedules
- Assign Employee
- Filter by Skills
- Select Employee
- Employee Start Date
- Add Rule
- Employee List Columns
- Employee
- Start Date
- Rate
- Unassignment Date
- Is Primary Site
- Make Primary

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 4.8 Skills and Attributes Administration

| **Design ID**          | SCR-024                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management → Skills and Attributes Administration      |
| **Screen Type**        | Form / Configuration Screen                                       |
| **Primary Components** | Data table, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Create Skill / Attribute Fields
- Category
- Description
- Show Expiry Date Field
- Show Text Field
- Show Text Field (Other)
- Show Skill in Client Portal
- Global
- Status
- Categories
- Diplomas
- Trainings & Special Skills
- Languages
- Licenses & Permits
- Memberships
- Prior Career Skills
- Uniforms
- Skill Listing Columns
- Description
- Region
- Category
- Assigned Employee Count
- Position Count
- Expiring Soon
- Assign Employees
- Edit
- Archive
- History
- Actions
- Assign Employee
- Edit Skill
- Archive
- View History

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 5\. Clients and Sites

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 5.1 Client and Site Rules

| **Design ID**          | SCR-025                                     |
| ---------------------- | ------------------------------------------- |
| **Navigation Path**    | . Clients and Sites → Client and Site Rules |
| **Screen Type**        | Detail / Profile Screen                     |
| **Primary Components** | Metric card                                 |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- One client may be assigned to multiple sites.
- Multiple clients may be assigned to one site.
- Shared-site Client Portal visibility remains pending.
- Client is the entity receiving Client Portal access.
- Account Type is a classification, not a separate hierarchy level.

PENDING DISCUSSION: Contract management is pending discussion.

Site closure deactivates active Site functionality and preserves historical records through the point of closure.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 5.2 Create Site / Client Account

| **Design ID**          | SCR-026                                               |
| ---------------------- | ----------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites → Create Site / Client Account    |
| **Screen Type**        | Form / Configuration Screen                           |
| **Primary Components** | Search input, Form controls, File upload, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 5.2.1 Account Type
- Regular Client
- Multi-Site Client
- Site Account
- Custom Account Type
- 5.2.2 Company Information
- Company Name
- Unique ID
- Time Zone
- Logo Picture
- Preferred Language
- 5.2.3 Main Contact
- First Name
- Last Name
- Job Title
- Phone Main
- Phone Other
- SMS Notification Consent
- Fax
- Email
- 5.2.4 Address
- Address
- Address Line 2
- City
- State
- ZIP Code
- Country
- 5.2.5 Employee Relations
- Account Representative
- Sales Representative
- 5.2.6 Other Custom Fields
- Searchable Tags
- Business Registration Number
- Website

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 5.3 Site Listing

| **Design ID**          | SCR-027                                             |
| ---------------------- | --------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites → Site Listing                  |
| **Screen Type**        | Listing / Management Screen                         |
| **Primary Components** | Data table, Form controls, File upload, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- The source document does not define a complete site-list column set. The listing must at minimum provide access to created Site/Account records and their View action, without adding unapproved business fields.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 5.4 Site Profile

| **Design ID**          | SCR-028                                                                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites → Site Profile                                                                                                                                     |
| **Screen Type**        | Form / Configuration Screen                                                                                                                                            |
| **Primary Components** | Data table, Filter bar / filter drawer, Export controls, Interactive map, Calendar / schedule grid, Form controls, Tabs / segmented controls, File upload, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 5.4.1 Overview
- Site Name
- Photo
- Manager Name
- Manager Position
- Phone
- Email
- Address
- Bill-To Address
- 5.4.2 Positions / Job Types

#### Create Position / Job Type - Post Base Settings

- Post Name
- Post ID
- Short Description of Tasks
- Schedule Memo
- Status: Active / Archived

#### Compliance

- Hard Requirements
- Conditional Requirements
- Soft Requirements

#### Service Dates

- Service Duration: Ongoing Service
- Service Duration: Temporary Service
- Begin Date

#### Break Rule Settings

- Break Rule dropdown
- No Break Rule option

#### Pay Settings

- Pay on Employee Pay Rate
- Pay on This Post Rate

#### Premium Matrix Columns

- Days
- Premium
- Percentage
- Start
- End
- Pay Code
- Add Condition

#### Break Payroll

- Do Not Pay Breaks
- Pay All Breaks

#### Holiday Pay

- Do Not Pay Holiday Premium
- Rate Multiplier

#### Position / Job Type Listing Columns

- UID
- Position Title
- TPT Hours
- Bill Rate
- Holiday Rate
- Temporary
- Actions

#### Actions

- Duplicate
- Edit
- History
- Remove
- Position, Job Type and Service Type represent the same business concept. The UI should use Job Type consistently where possible.
- Missing requirements generate configured notification to Admin/Supervisor or another configured recipient; Admin takes action manually.
- 5.4.3 Assigned Employees

#### Assign Employee Form

- Filter by Skills
- Select Employee
- Employee Start Date
- Add Rule: Effective Date
- Add Rule: Hourly Rate

#### Listing Columns

- Employee
- Start Date
- Rate
- Unassignment Date
- Is Primary Site
- Make Primary
- History
- Remove
- View
- 5.4.4 Employee Profile from Site
- Overview
- Basic Details: Name, Employee ID, Phone, Email, Address
- HR Profile Information: Type, Pay Type, Hourly Rate Type, Region Default Rate, Overtime, Pay Run
- Availabilities
- Time Off
- Skills and Certifications
- Sites / Departments
- Schedules
- Calendar View
- 5.4.5 Client Portal Access

#### Create Client Access Fields

- First Name
- Last Name
- Picture
- Phone
- Email
- Password
- Force Password Change
- Client Role
- Status: Grant Access / Revoke Access

#### Client Access Listing Columns

- Full Name
- Email
- Phone
- Last Login
- Access
- Edit

Client Portal detailed functions remain separate, but approved Admin-side rule is that Client access follows assigned Sites and multi-site Clients use a Site selector.

- 5.4.6 Banned Employees
- Add employee to Banned Employees list
- Prevent assignment to the banned site
- 5.4.7 Other Site Contacts

#### Create Contact Fields

- Company Name
- First Name
- Last Name
- Job Title
- Gender
- Government Badge ID
- Phone Main
- Phone Other
- Email
- Address
- Address Line 2
- City
- State
- ZIP Code
- Country
- Attention Of
- Preferred Language
- Status
- Use This Address as Bill-To Address

#### Contact Listing Columns

- Name
- Job Title
- Phone
- Email
- Action: Edit
- 5.4.8 Other Site Actions
- Edit Site using the same creation fields
- Close Account

#### Close Account Options

- Terminate Site and All Contracts
- Terminate One or More Positions
- Termination Date
- Confirmation Screen

Site closure deactivates active Site operations while preserving historical data; Contract management remains Later Phase.

- 5.4.9 Dispatch Settings
- Prepare Schedule
- Follow the confirmed Schedule module
- 5.4.10 Operation Reports and Site Activity
- Operation Reports
- Logs and Activities
- Reports
- Filter Reports
- Patrol Tours
- View Tours
- Delete Tours
- Journal Entries
- Recordings
- Summaries
- Summary by Shift
- Financial by Shift
- Incident Analytics
- Analytics Reports
- Exceptions and Audits
- Post Orders
- Work Exception
- System Exception

PENDING DISCUSSION: Journal Entries, Recordings, Financial by Shift and Exceptions/Audits remain source-listed but require detailed discussion.

- 5.4.11 Site Notifications
- Follow Connecteam-style automation rules and support report, security and timekeeping notifications listed below.
- Operations Reports
- Individual Report
- Maintenance Report
- Incident Report
- Operation Report
- Hourly Report Filling
- End-of-Shift Report for Overnight Patrols
- Roof Access Notification
- Tornado Warning Emergency
- Late Tour / Checkpoint Alert
- Incomplete Tour Alert
- Finished Tour Alert
- Late Shift Alert
- Early Clock-Out Alert
- Clock-In / Clock-Out
- Clock-In Exception
- 5.4.12 Security and Patrol Settings
- Checkpoints
- Tour Routes
- Site Locations and Sections
- Emergency Contacts
- Geo-Fencing
- Mobile App Restrictions
- Live Dashboard
- History Tracks
- Message Board
- 5.4.13 Site Locations and Sections
- Create Site Item / Location
- Import Batch
- 5.4.14 Emergency Contacts
- Create Contacts
- Assign contacts in priority/order sequence
- Create contact records used by the dropdown
- 5.4.15 Geo-Fencing
- Choose boundary points on map
- Define geo-fence border
- 5.4.16 Mobile App Restrictions
- Geo-Fence Clock-In Restriction: Yes / No
- Geo-Fence Clock-Out Restriction: Yes / No
- Mobile App Login Restriction: Yes / No
- 5.4.17 Live Dashboard

#### Event Filters

- Reports
- Time Clock
- Patrol Tours
- Panic Button Triggers
- Changed Site
- Checkpoint Scan
- Runsheet Patrol Events
- Remote Actions

#### Actions

- Show Map
- Broadcast Message
- New Task
- History Tracks
- 5.4.18 Message Board
- Post Message
- Settings
- 5.4.19 Assigned Employees
- Assign Employee
- Employee Listing
- Filters
- 5.4.20 Positions / Job Types
- Create site-specific Position / Job Type
- Site-specific Job Type cannot be reused for another site unless duplicated manually
- 5.4.21 Email Settings
- PDF Attached as a Link: Yes / No

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 6\. Checkpoints and Tour Routes

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 6.1 Checkpoints

| **Design ID**          | SCR-029                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Navigation Path**    | . Checkpoints and Tour Routes → Checkpoints                                                                                                                        |
| **Screen Type**        | Form / Configuration Screen                                                                                                                                        |
| **Primary Components** | Data table, Filter bar / filter drawer, Export controls, Interactive map, Calendar / schedule grid, Form controls, Toggle / checkbox / radio controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 6.1.1 Create Checkpoint Fields
- Checkpoint Name
- Special Instruction
- Can Be Scanned By: All
- Can Be Scanned By: Selected Positions / Job Types
- Monitoring: Do Not Monitor and Scan Randomly
- Monitoring: Checkpoint Is Part of Tour
- Monitoring: Request Scan on Regular Interval
- Scan Request Interval: Minutes / Hours / Days / Weeks
- Extra Scan Option: Log Only
- Extra Scan Option: Display a Message
- Extra Scan Option: Open a Report Form
- Exception Verification: Validate Range
- Exception Verification: Yes/No Question - No Is Exception
- Exception Verification: Yes/No Question - Yes Is Exception
- Exception Multi Questions
- Checkpoint Type: NFC
- Checkpoint Type: Barcode
- Checkpoint ID
- GPS Scan Required Accuracy
- Allow Manual Scanning: Yes / No / Yes with Reason
- 6.1.2 Batch Import
- Import checkpoints through Excel
- 6.1.3 Checkpoint Logs

#### Columns

- Time
- Employee
- Account
- Checkpoint
- Tour
- 6.1.4 Checkpoint Listing

#### Columns

- Checkpoint Name
- Action
- Assigned
- Last Scan
- Location Map Icon
- Edit

#### Filters and Actions

- Filters
- Edit using the same Create Checkpoint form
- 6.1.5 Checkpoint Alerts
- Late Checkpoint Alert - configured under Automations
- Tour Finished Alert - configured under Automations
- Tour Incomplete Alert - configured under Automations

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 6.2 Tour Routes

| **Design ID**          | SCR-030                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| **Navigation Path**    | . Checkpoints and Tour Routes → Tour Routes                                                      |
| **Screen Type**        | Form / Configuration Screen                                                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Interactive map, Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- 6.2.1 Create Tour Route Fields
- Description
- Assigned To
- Special Instructions
- Estimated Tour Duration
- Grace Period for Late Notification
- Default grace period of 15 minutes when set to 0
- Recurrence Type: Weekly
- Recurrence Type: Monthly
- Tour Schedule: Day and Time
- 6.2.2 Confirmed Tour Rules
- Tour assigned to a specific employee of a shift through the Schedule module.
- Guard starts the tour manually.
- Guard must be clocked in.
- Guard must be within the single Site polygon geo-fence for clock-in and coordinates are captured at clock-in.
- Checkpoint order and requirements are configurable when creating the tour.
- Tour timing, grace and notification behavior are configurable when creating the tour.
- Manual scans may require reason, comment, photo and GPS based on configuration; no approval is required.
- Tour interruptions trigger notifications based on configured automation rules.
- 6.2.3 Tour Listing and Actions
- Tour Listing
- Filters
- Edit Settings
- Manage Checkpoints
- 6.2.4 Checkpoint Issue Reporting
- Damaged NFC Tag
- Missing Barcode
- Inaccessible Checkpoint
- Unsafe Location
- GPS Inaccuracy
- May trigger notification, maintenance task or system exception through configuration

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 7\. Scheduling

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 7.1 Schedule Setup

| **Design ID**          | SCR-031                                 |
| ---------------------- | --------------------------------------- |
| **Navigation Path**    | . Scheduling → Schedule Setup           |
| **Screen Type**        | Form / Configuration Screen             |
| **Primary Components** | Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Fields and Options
- Schedule Name
- Default Fields
- Custom Field Definition
- Jobs / Job Types
- View Type: User
- View Type: Job
- Layout Type
- Fields to Show on Each Shift
- Users
- Shift Card Field Selection
- Hours
- Job
- Shift Title
- Other custom fields defined during Schedule creation

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 7.2 Schedule View

| **Design ID**          | SCR-032                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Navigation Path**    | . Scheduling → Schedule View                                        |
| **Screen Type**        | Form / Configuration Screen                                         |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Day View
- Week View
- Month View
- View by User
- View by Job
- List View
- Date Selection
- Blank clickable cells to create shifts
- Display Options
- Sort Cell Content
- Minimized View
- Daily Info
- Weekly Summary
- Availability Status
- Issues
- Cross Schedule Events
- Labor Costs
- Daily Health
- Hide Empty Row
- Working Hours
- Non-Working Days
- Organize by Groups
- Week Filter
- Date Filter
- Add
- Actions
- Coverage per Hour
- Print Position Schedule
- Settings

PENDING DISCUSSION: Cross Schedule Events and Daily Health remain source-listed but require detailed discussion.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 7.3 Shift Creation

| **Design ID**          | SCR-033                                 |
| ---------------------- | --------------------------------------- |
| **Navigation Path**    | . Scheduling → Shift Creation           |
| **Screen Type**        | Calendar / Scheduler Screen             |
| **Primary Components** | Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Date
- From-To Date Range
- All Days option
- Start Time
- End Time
- Title
- Job / Job Type
- Users
- Address
- Note
- Shift Tags
- Shift Tasks
- Custom fields selected during Schedule creation

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 7.4 Schedule Behavior

| **Design ID**          | SCR-034                          |
| ---------------------- | -------------------------------- |
| **Navigation Path**    | . Scheduling → Schedule Behavior |
| **Screen Type**        | Calendar / Scheduler Screen      |
| **Primary Components** | Calendar / schedule grid         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Assigned users automatically receive assigned shifts and may Accept or Reject them in the Guard Mobile App; rejection alerts the Site Admin.
- Schedule can be updated after publishing.
- Schedule notifications are configurable; published changes, rejection, swap/replacement requests and draft-unassigned reminders must be visibly surfaced to the responsible Admin.
- Recurring schedules are supported. Shift copy/duplicate carries Job Type, User, Notes, Tags, Tasks and Tour association.
- Schedule issues include overlapping shifts, insufficient rest, overtime, unavailability, time off, expired credentials, site bans, missing training and excessive weekly hours.
- Missing Job Type requirements generate notifications; Admin decides manually.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 8\. Time Clock, Attendance and Work Exceptions

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 8.1 Clock-In / Clock-Out

| **Design ID**          | SCR-035                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Navigation Path**    | . Time Clock, Attendance and Work Exceptions → Clock-In / Clock-Out |
| **Screen Type**        | Listing / Management Screen                                         |
| **Primary Components** | Interactive map                                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Guard clocks in through the Mobile App.
- Clock-in is blocked outside the single Site polygon geo-fence.
- Early clock-in, late clock-in and early clock-out thresholds are configurable in Settings.
- Manual timesheet changes are allowed and audited.
- Break rules are configurable.

PENDING DISCUSSION: Offline clock-in, clock-out and synchronization remain pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 8.2 Time Clock Pages

| **Design ID**          | SCR-036                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| **Navigation Path**    | . Time Clock, Attendance and Work Exceptions → Time Clock Pages  |
| **Screen Type**        | Listing / Management Screen                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Calendar / schedule grid |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Security Operations > Time Clock > Site Listing
- Timesheet with Today filter
- Employee profile Work Exceptions
- Site Work Exceptions
- Dashboard Attendance

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 8.3 Timesheet / Exception Information

| **Design ID**          | SCR-037                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Navigation Path**    | . Time Clock, Attendance and Work Exceptions → Timesheet / Exception Information |
| **Screen Type**        | Listing / Management Screen                                                      |
| **Primary Components** | Calendar / schedule grid, Form controls, Tabs / segmented controls               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Use the source-listed time and exception fields. Do not assume additional approval states or payroll actions that are not defined.
- Scheduled and actual shift times as available
- Meal Break Exception
- Meal Schedule
- Meal Actual
- Rest Break Exception
- Rest Schedule
- Rest Actual
- Manual adjustment history

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 9\. Reports and Incidents

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 9.1 Reports versus Forms

| **Design ID**          | SCR-038                                        |
| ---------------------- | ---------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents → Reports versus Forms |
| **Screen Type**        | Form / Configuration Screen                    |
| **Primary Components** | Form controls                                  |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Forms are manually created using a customizable form builder and assigned to employees to complete.
- Reports are generated through Custom Report Forms, Categories, Incident Categories and Report Footers configured by Admin.
- Forms and Reports remain separate functional areas.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 9.2 Report Listing

| **Design ID**          | SCR-039                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents → Report Listing                                                                      |
| **Screen Type**        | Listing / Management Screen                                                                                   |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Columns
- ID
- Type
- Date
- Reported By
- Account
- Status
- Printable PDF
- Email Report
- View
- Remove
- Filters
- Active
- All Templates
- Archived
- Status Filter
- Approved
- Archived
- Date From-To
- Global Search

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 9.3 Report Approval and Publication

| **Design ID**          | SCR-040                                                   |
| ---------------------- | --------------------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents → Report Approval and Publication |
| **Screen Type**        | Detail / Profile Screen                                   |
| **Primary Components** | Form controls                                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Approval requirement is configured while creating the Custom Report. Auto-approved submissions become Approved immediately; otherwise they enter Pending Approval.
- No multi-level approval workflow. Admin or Super Admin may approve when required, and the report submitter cannot self-approve.
- Editing a submitted report preserves the prior version and returns the report to Pending Approval when approval is required.
- Reports are site-specific.
- Digital acknowledgment is supported.
- Report Mentions are excluded.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 9.4 Custom Report Configuration

| **Design ID**          | SCR-041                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents → Custom Report Configuration                                                       |
| **Screen Type**        | Form / Configuration Screen                                                                                 |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Report Form Management
- Custom Report Form Listing
- Create Custom Report
- Edit
- Field Setup
- Generated Report Count
- Filter by Categories
- Filter Active / Archived
- Search
- Custom Report Categories
- New Category
- Add Category
- Category Listing
- Edit
- Archive
- Filter Active / Archived
- Custom Incident Categories
- Create Incident Category
- Incident Category Listing
- Code
- Region
- Description
- Level
- Parent Category
- Default Group
- Edit
- Sub Form
- Filter All Groups
- Filter Default Groups
- Global Search
- Report Footers
- Add Footer
- Footer Listing
- Text Format
- Image Format
- Edit Footer
- Report Form Fields
- The form builder must support customizable fields. Field types should follow the form/report builder available in the referenced source platforms. Exact field-type inventory may be finalized in UI design without introducing new workflow behavior.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 9.5 Incident Categories

| **Design ID**          | SCR-042                                       |
| ---------------------- | --------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents → Incident Categories |
| **Screen Type**        | Section / Feature Screen                      |
| **Primary Components** | Form controls                                 |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Incident type/category is manually created by Admin.
- No automatic incident workflow beyond configured report and automation behavior is assumed.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 9.6 Media Limits

| **Design ID**          | SCR-043                                |
| ---------------------- | -------------------------------------- |
| **Navigation Path**    | . Reports and Incidents → Media Limits |
| **Screen Type**        | Section / Feature Screen               |
| **Primary Components** | Metric card                            |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Use standard limits for photos, videos, audio and files.
- Exact file sizes, counts and durations are configurable and should be finalized during technical design.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 10\. Forms

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 10.1 Form Management

| **Design ID**          | SCR-044                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Navigation Path**    | . Forms → Form Management                                             |
| **Screen Type**        | Form / Configuration Screen                                           |
| **Primary Components** | Data table, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New Form
- Form Listing
- Active
- Archived
- Export
- Move
- Archive
- Delete

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 10.2 Form Builder

| **Design ID**          | SCR-045                     |
| ---------------------- | --------------------------- |
| **Navigation Path**    | . Forms → Form Builder      |
| **Screen Type**        | Form / Configuration Screen |
| **Primary Components** | Form controls               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Create customized fields
- Assign forms to employees
- Employees complete assigned forms

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 10.3 Form Submissions

| **Design ID**          | SCR-046                        |
| ---------------------- | ------------------------------ |
| **Navigation Path**    | . Forms → Form Submissions     |
| **Screen Type**        | Form / Configuration Screen    |
| **Primary Components** | Export controls, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- List submitted forms and provide view/export access according to the selected form structure. Do not add unconfirmed approval or reporting workflows.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 11\. Tasks, Dispatch and Job List

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 11.1 Task Types

| **Design ID**          | SCR-047                                     |
| ---------------------- | ------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List → Task Types |
| **Screen Type**        | Section / Feature Screen                    |
| **Primary Components** | Form controls                               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Dispatch Task
- Quick Task
- Recurring Task
- Help Desk Ticket
- Job Type - separate from Task and used for the employee role/service performed during a shift

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 11.2 Assignment

| **Design ID**          | SCR-048                                     |
| ---------------------- | ------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List → Assignment |
| **Screen Type**        | Section / Feature Screen                    |
| **Primary Components** | Standard content section                    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Assign to one selected target, such as an employee, Job Type, site, shift, department or supported group.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 11.3 Task Creation

| **Design ID**          | SCR-049                                        |
| ---------------------- | ---------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List → Task Creation |
| **Screen Type**        | Form / Configuration Screen                    |
| **Primary Components** | Form controls, File upload                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add Task
- Select Task Type
- Show a form based on selected Task Type
- List the created task
- Fields vary by Task Type. Do not treat priority, evidence, attachments, due date or checklists as universally mandatory unless defined in the selected task form.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 11.4 Task Filters and Counts

| **Design ID**          | SCR-050                                                  |
| ---------------------- | -------------------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List → Task Filters and Counts |
| **Screen Type**        | Section / Feature Screen                                 |
| **Primary Components** | Form controls, Tabs / segmented controls, Metric card    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Created by Me
- My Tasks
- All Tasks
- Archived
- Overdue Count
- Done Count
- Open Count
- Total Task Count
- New Tasks
- In Progress
- New and In Progress
- Completed
- Assignment: All
- Not Assigned
- Assigned to Any
- Assigned to Employee

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 11.5 Escalation

| **Design ID**          | SCR-051                                     |
| ---------------------- | ------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List → Escalation |
| **Screen Type**        | Section / Feature Screen                    |
| **Primary Components** | Standard content section                    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Overdue or incomplete tasks may trigger configured automation actions.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 11.6 Job List

| **Design ID**          | SCR-052                                   |
| ---------------------- | ----------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List → Job List |
| **Screen Type**        | Form / Configuration Screen               |
| **Primary Components** | Form controls                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add
- Import

PENDING DISCUSSION: Detailed Job List behavior remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 12\. Communications

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 12.1 Combined Communication Module

| **Design ID**          | SCR-053                                          |
| ---------------------- | ------------------------------------------------ |
| **Navigation Path**    | . Communications → Combined Communication Module |
| **Screen Type**        | Section / Feature Screen                         |
| **Primary Components** | Form controls                                    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Chat - employee communication
- Message Board - messages created by guards
- Broadcast - message sent to selected user types/users/groups/sites as configured
- Updates - company or operational updates
- Notifications - system-generated communication
- SMS - delivery channel

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 12.2 Chat

| **Design ID**          | SCR-054                      |
| ---------------------- | ---------------------------- |
| **Navigation Path**    | . Communications → Chat      |
| **Screen Type**        | Section / Feature Screen     |
| **Primary Components** | Export controls, File upload |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- New Chat
- New Group
- Broadcast Message

Current communication rules: Admin may view private chats; Chat Settings may allow edit/delete, export and attachments; Guards may communicate with other Guards at the same Site; Client does not communicate directly with Guard.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 12.3 Updates

| **Design ID**          | SCR-055                                    |
| ---------------------- | ------------------------------------------ |
| **Navigation Path**    | . Communications → Updates                 |
| **Screen Type**        | Form / Configuration Screen                |
| **Primary Components** | Data table, Export controls, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Listing
- Create Update
- Export

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 12.4 Directory

| **Design ID**          | SCR-056                                    |
| ---------------------- | ------------------------------------------ |
| **Navigation Path**    | . Communications → Directory               |
| **Screen Type**        | Form / Configuration Screen                |
| **Primary Components** | Data table, Export controls, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Actions
- Listing
- Tag Users
- Notify
- Send Chat Message
- Create Group Chat with Selected
- Create Task
- Export

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 12.5 Forms within Communications

| **Design ID**          | SCR-057                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Navigation Path**    | . Communications → Forms within Communications                        |
| **Screen Type**        | Form / Configuration Screen                                           |
| **Primary Components** | Data table, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Listing
- Add New Form
- Archived
- Export
- Move
- Archive
- Delete

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 12.6 Help Desk

| **Design ID**          | SCR-058                      |
| ---------------------- | ---------------------------- |
| **Navigation Path**    | . Communications → Help Desk |
| **Screen Type**        | Section / Feature Screen     |
| **Primary Components** | Standard content section     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Unassigned
- Assigned to Me
- All

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 13\. Security Operations

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 13.1 Schedules

| **Design ID**          | SCR-059                              |
| ---------------------- | ------------------------------------ |
| **Navigation Path**    | . Security Operations → Schedules    |
| **Screen Type**        | Listing / Management Screen          |
| **Primary Components** | Data table, Calendar / schedule grid |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Site Listing
- View Schedule button redirects to Site > Schedule

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 13.2 Time Clock

| **Design ID**          | SCR-060                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| **Navigation Path**    | . Security Operations → Time Clock                               |
| **Screen Type**        | Listing / Management Screen                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Calendar / schedule grid |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Site Listing
- Timesheet with Today filter

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 13.3 Forms

| **Design ID**          | SCR-061                       |
| ---------------------- | ----------------------------- |
| **Navigation Path**    | . Security Operations → Forms |
| **Screen Type**        | Form / Configuration Screen   |
| **Primary Components** | Data table, Form controls     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New Form
- Forms Listing

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 13.4 Quick Tasks

| **Design ID**          | SCR-062                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Navigation Path**    | . Security Operations → Quick Tasks                                 |
| **Screen Type**        | Form / Configuration Screen                                         |
| **Primary Components** | Search input, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add Task
- Created by Me
- My Tasks
- All Tasks
- Archived
- Search
- Overdue Count
- Done Count
- Open Count
- Total Count

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 13.5 Post Orders, SOPs and Manuals

| **Design ID**          | SCR-063                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Security Operations → Post Orders, SOPs and Manuals                                             |
| **Screen Type**        | Form / Configuration Screen                                                                       |
| **Primary Components** | Data table, Filter bar / filter drawer, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New
- Listing
- Filter Active
- Filter Archived
- Export

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 13.6 Company Vehicle Documentation

| **Design ID**          | SCR-064                                               |
| ---------------------- | ----------------------------------------------------- |
| **Navigation Path**    | . Security Operations → Company Vehicle Documentation |
| **Screen Type**        | Form / Configuration Screen                           |
| **Primary Components** | Data table, Export controls, Form controls            |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New
- Vehicle Listing
- Export

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 14\. Documents, Policies and Team Resources

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 14.1 Documents and Policies

| **Design ID**          | SCR-065                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Documents and Policies |
| **Screen Type**        | Section / Feature Screen                                          |
| **Primary Components** | File upload                                                       |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Company Policies
- Post Orders
- SOPs
- Manuals
- Employee Documents
- Site Documents
- Company Vehicle Documentation
- Workplace Notices and Posters

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.2 Team Member Manual

| **Design ID**          | SCR-066                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Team Member Manual |
| **Screen Type**        | Form / Configuration Screen                                   |
| **Primary Components** | Data table, Form controls                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add Manual
- Listing

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.3 Rewards

| **Design ID**          | SCR-067                                            |
| ---------------------- | -------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Rewards |
| **Screen Type**        | Listing / Management Screen                        |
| **Primary Components** | Tabs / segmented controls                          |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Purchase Tokens
- Send Tokens
- Sent Tokens
- User Activity
- Purchase History

PENDING DISCUSSION: Rewards and Tokens workflow remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.4 Documents

| **Design ID**          | SCR-068                                              |
| ---------------------- | ---------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Documents |
| **Screen Type**        | Form / Configuration Screen                          |
| **Primary Components** | Form controls                                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Create Pack

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.5 Team Member Benefits Information

| **Design ID**          | SCR-069                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Team Member Benefits Information |
| **Screen Type**        | Form / Configuration Screen                                                 |
| **Primary Components** | Export controls, Form controls, Tabs / segmented controls                   |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New
- Active
- Archived
- Export

PENDING DISCUSSION: Benefits workflow remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.6 Celebrations

| **Design ID**          | SCR-070                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Celebrations |
| **Screen Type**        | Section / Feature Screen                                |
| **Primary Components** | Calendar / schedule grid                                |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Past and Upcoming Birthdays
- Tomorrow
- Today

PENDING DISCUSSION: Celebrations workflow remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.7 Time Off and Paid Policies

| **Design ID**          | SCR-071                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Time Off and Paid Policies |
| **Screen Type**        | Form / Configuration Screen                                           |
| **Primary Components** | Form controls                                                         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add Time Off
- Paid Policies
- Add Policy Type

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.8 Insights

| **Design ID**          | SCR-072                                             |
| ---------------------- | --------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Insights |
| **Screen Type**        | Detail / Profile Screen                             |
| **Primary Components** | Filter bar / filter drawer, Export controls         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Export

Pending Request

- Filters

PENDING DISCUSSION: Detailed Insights behavior remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.9 Text Message

| **Design ID**          | SCR-073                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Text Message |
| **Screen Type**        | Listing / Management Screen                             |
| **Primary Components** | Filter bar / filter drawer                              |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- New Message
- Message List
- Filters

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.10 Workplace Notices and Posters

| **Design ID**          | SCR-074                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| **Navigation Path**    | . Documents, Policies and Team Resources → Workplace Notices and Posters |
| **Screen Type**        | Form / Configuration Screen                                              |
| **Primary Components** | Export controls, Form controls, Tabs / segmented controls                |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Active
- Archived
- Add New
- Export

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.11 Disciplinary Reports

| **Design ID**          | SCR-075                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Disciplinary Reports                  |
| **Screen Type**        | Form / Configuration Screen                                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New
- Reports Listing
- Active
- Archived
- Filter

PENDING DISCUSSION: Detailed disciplinary workflow remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.12 HR Complaint Form

| **Design ID**          | SCR-076                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → HR Complaint Form                        |
| **Screen Type**        | Form / Configuration Screen                                                         |
| **Primary Components** | Data table, Search input, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Listing
- Active
- Archived
- Add New
- Export
- Search

PENDING DISCUSSION: Detailed HR complaint workflow remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 14.13 Hiring

| **Design ID**          | SCR-077                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources → Hiring                                   |
| **Screen Type**        | Form / Configuration Screen                                                         |
| **Primary Components** | Data table, Search input, Interactive map, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add Positions
- Listing
- Active
- Archived
- Search

PENDING DISCUSSION: Applicant tracking and onboarding depth remain pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 15\. Training

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 15.1 Quizzes

| **Design ID**          | SCR-078                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Training → Quizzes                                                                                            |
| **Screen Type**        | Form / Configuration Screen                                                                                     |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New
- Quiz Listing
- Active
- Archived
- Export
- Search
- Filter

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 15.2 RFI Academy

| **Design ID**          | SCR-079                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Training → RFI Academy                                                                                        |
| **Screen Type**        | Form / Configuration Screen                                                                                     |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New
- Listing
- Active
- Archived
- Export
- Search
- Filter

PENDING DISCUSSION: Training content types, automatic skill/certification assignment, certificates, expiration and renewal behavior remain pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 16\. Vehicles

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 16.1 Confirmed Scope

| **Design ID**          | SCR-080                      |
| ---------------------- | ---------------------------- |
| **Navigation Path**    | . Vehicles → Confirmed Scope |
| **Screen Type**        | Section / Feature Screen     |
| **Primary Components** | File upload                  |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Vehicle management is limited to vehicle records and documentation.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 16.2 Vehicle Management

| **Design ID**          | SCR-081                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Navigation Path**    | . Vehicles → Vehicle Management                                                  |
| **Screen Type**        | Form / Configuration Screen                                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Create Vehicle
- Vehicle Listing
- View Vehicle
- Listing Columns
- ID
- License
- Make / Model / Year
- Status
- Filters
- All Vehicles
- Purchased
- Leased
- Status: Active
- Status: Inactive
- Status: All

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 16.3 Company Vehicle Documentation

| **Design ID**          | SCR-082                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Vehicles → Company Vehicle Documentation                                             |
| **Screen Type**        | Form / Configuration Screen                                                            |
| **Primary Components** | Data table, Export controls, Interactive map, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Add New
- Vehicle Listing
- Export

EXCLUDED / CURRENTLY NOT REQUIRED: Fuel, mileage, maintenance, repair, GPS, equipment tracking and vehicle assignment history are excluded.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 17\. Automations and Notifications

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 17.1 Automation Builder

| **Design ID**          | SCR-083                                              |
| ---------------------- | ---------------------------------------------------- |
| **Navigation Path**    | . Automations and Notifications → Automation Builder |
| **Screen Type**        | Form / Configuration Screen                          |
| **Primary Components** | Form controls                                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- The platform includes a custom Connecteam-style builder using Trigger → Conditions → Actions.
- Triggers May Include
- Late Tour / Checkpoint
- Employee Termination
- Finished Tour / Runsheet
- Panic / Important Report
- Recurring Task
- Break Event
- Clock-In / Clock-Out
- No GPS Update
- No Mobile Activity
- Late Shift
- Early Clock-Out
- Report Submission
- Skill Expiration
- Uncovered Shift
- Overdue Task
- Conditions
- Site
- Employee
- Job Type
- Shift
- Report Category
- Incident Category
- Date
- Time
- Status
- Skill / Credential
- Tour
- Checkpoint
- Actions
- Send Notification
- Send Email
- Send SMS
- Send Push Notification
- Create Task
- Create Ticket / System Exception
- Notify Admin
- Notify Supervisor
- Notify Employee
- Create Incident
- Send Broadcast
- Update applicable status where configured

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 17.2 Scope Rules

| **Design ID**          | SCR-084                                       |
| ---------------------- | --------------------------------------------- |
| **Navigation Path**    | . Automations and Notifications → Scope Rules |
| **Screen Type**        | Section / Feature Screen                      |
| **Primary Components** | Standard content section                      |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- One automation cannot be assigned to multiple sites.
- No acknowledgment-based escalation.
- Duplicate notifications for the same unresolved event must be suppressed.

PENDING DISCUSSION: Exact duplicate-suppression settings remain to be finalized during design.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 18\. Payroll and Back Office

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 18.1 Payroll Scope

| **Design ID**          | SCR-085                                   |
| ---------------------- | ----------------------------------------- |
| **Navigation Path**    | . Payroll and Back Office → Payroll Scope |
| **Screen Type**        | Detail / Profile Screen                   |
| **Primary Components** | Form controls                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Payroll calculation is required.
- Detailed calculation formulas, rate priority and workflow statuses remain pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 18.2 Confirmed Back Office Configuration

| **Design ID**          | SCR-086                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Navigation Path**    | . Payroll and Back Office → Confirmed Back Office Configuration                     |
| **Screen Type**        | Form / Configuration Screen                                                         |
| **Primary Components** | Export controls, Calendar / schedule grid, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Break Management
- Back Office Defaults
- Employee Classes
- Payroll Schedules
- Holiday Groups
- Holiday Codes
- Overtime Rules
- Pay Codes
- Export Formats
- Tax Settings
- Bill Items
- Audit History
- General Settings
- Back Office Settings
- Break Penalties

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 18.3 Employee Financial Information

| **Design ID**          | SCR-087                                                    |
| ---------------------- | ---------------------------------------------------------- |
| **Navigation Path**    | . Payroll and Back Office → Employee Financial Information |
| **Screen Type**        | Detail / Profile Screen                                    |
| **Primary Components** | Form controls, Metric card                                 |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Compensation Details
- Payment Information
- Financial visibility controlled by custom permissions

PENDING DISCUSSION: Invoice generation is pending discussion.

PENDING DISCUSSION: Payroll provider and accounting integration are pending discussion.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 19\. Settings and Configuration

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 19.1 General Configuration

| **Design ID**          | SCR-088                                              |
| ---------------------- | ---------------------------------------------------- |
| **Navigation Path**    | . Settings and Configuration → General Configuration |
| **Screen Type**        | Form / Configuration Screen                          |
| **Primary Components** | Form controls                                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Notifications
- Notification Sender Name
- Notification Sender Email
- Late Tour / Checkpoint
- On Termination
- Finished Tour / Runsheet
- Alerts / Panic / Important Reports
- Recurring Tasks
- Break Management
- Clock In / Out
- SMS Segments
- Company Name and Address
- Roles and Permissions
- Password Policy
- Sign-In Log
- General
- Category-Wise Settings (13 Categories)
- System Locale Settings
- Field Configuration

General Categories are Admin-created and custom named; do not design a fixed 13-category taxonomy.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 19.2 Operation Configuration

| **Design ID**          | SCR-089                                                |
| ---------------------- | ------------------------------------------------------ |
| **Navigation Path**    | . Settings and Configuration → Operation Configuration |
| **Screen Type**        | Form / Configuration Screen                            |
| **Primary Components** | Calendar / schedule grid, Tabs / segmented controls    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Report Templates
- Site Templates
- Zone Templates
- Incident Templates
- Devices and License
- Region Message Boards
- Job / Service Type
- Special Calendar Days
- Calendar Groups

EXCLUDED / CURRENTLY NOT REQUIRED: Zone Templates are excluded for the current phase.

PENDING DISCUSSION: Devices and License, Region Message Boards and Calendar Groups require detailed discussion.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 19.3 Back Office Configuration

| **Design ID**          | SCR-090                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Navigation Path**    | . Settings and Configuration → Back Office Configuration                            |
| **Screen Type**        | Form / Configuration Screen                                                         |
| **Primary Components** | Export controls, Calendar / schedule grid, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Break Management
- Back Office Defaults
- Employee Classes
- Payroll Schedules
- Holiday Groups
- Holiday Codes
- Overtime Rules
- Pay Codes
- Export Formats
- Tax Settings
- Bill Items
- Audit History
- General Settings
- Back Office Settings
- Break Penalties

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 19.4 Password Policy and Sign-In Log

| **Design ID**          | SCR-091                                                        |
| ---------------------- | -------------------------------------------------------------- |
| **Navigation Path**    | . Settings and Configuration → Password Policy and Sign-In Log |
| **Screen Type**        | Form / Configuration Screen                                    |
| **Primary Components** | Data table                                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Retain the Password Policy and Sign-In Log sections from the source. Detailed password rules and sign-in log columns may be finalized during technical design without introducing a new business workflow.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 19.5 Data Retention

| **Design ID**          | SCR-092                                       |
| ---------------------- | --------------------------------------------- |
| **Navigation Path**    | . Settings and Configuration → Data Retention |
| **Screen Type**        | Listing / Management Screen                   |
| **Primary Components** | Tabs / segmented controls                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Retention is configurable by data category.
- Applicable categories include GPS/activity history, reports, media, messages, timesheets, audit history, panic events, tours and checkpoint scans.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 20\. Groups and Segments

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 21\. Help and Help Desk

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 21.1 Help

| **Design ID**          | SCR-093                     |
| ---------------------- | --------------------------- |
| **Navigation Path**    | . Help and Help Desk → Help |
| **Screen Type**        | Section / Feature Screen    |
| **Primary Components** | Standard content section    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Resource Center
- Talk to an Expert

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 21.2 Help Desk

| **Design ID**          | SCR-094                          |
| ---------------------- | -------------------------------- |
| **Navigation Path**    | . Help and Help Desk → Help Desk |
| **Screen Type**        | Section / Feature Screen         |
| **Primary Components** | Standard content section         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Unassigned
- Assigned to Me
- All
- Help and Help Desk are separate functional areas.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 22\. Admin Operational Portal Behavior

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 23\. Pending Discussion Register

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 23.1 Scheduling

| **Design ID**          | SCR-095                                    |
| ---------------------- | ------------------------------------------ |
| **Navigation Path**    | . Pending Discussion Register → Scheduling |
| **Screen Type**        | Section / Feature Screen                   |
| **Primary Components** | Standard content section                   |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Open-shift claiming (Later Phase)
- Shift rejection
- Open-shift claiming
- Shift claiming
- Shift swaps
- Shift replacement workflow
- Cross-midnight handling

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.2 Site, Client and Contracts

| **Design ID**          | SCR-096                                                    |
| ---------------------- | ---------------------------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → Site, Client and Contracts |
| **Screen Type**        | Listing / Management Screen                                |
| **Primary Components** | Standard content section                                   |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Contract management
- Detailed site closure consequences
- Client Portal visibility
- Client report actions
- Client service requests
- Invoice behavior
- Shared-site visibility for multiple clients

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.3 Guard Mobile / Attendance Dependencies

| **Design ID**          | SCR-097                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → Guard Mobile / Attendance Dependencies |
| **Screen Type**        | Map / Spatial Screen                                                   |
| **Primary Components** | Interactive map                                                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Offline clock-in/out and synchronization
- Multiple devices per guard
- Shared devices
- Device approval
- GPS tracking frequency
- Watch Mode
- Guard visibility of other guards

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.4 Communications

| **Design ID**          | SCR-098                                        |
| ---------------------- | ---------------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → Communications |
| **Screen Type**        | Section / Feature Screen                       |
| **Primary Components** | Export controls, Form controls, File upload    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Admin visibility into private chats
- Edit/delete rights
- Chat export
- Media attachments
- Retention period
- Guard-to-guard rules
- Client participation

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.5 HR and Team Resources

| **Design ID**          | SCR-099                                               |
| ---------------------- | ----------------------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → HR and Team Resources |
| **Screen Type**        | Section / Feature Screen                              |
| **Primary Components** | Standard content section                              |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Hiring depth
- Benefits
- Rewards and Tokens
- Celebrations
- Complaints
- Disciplinary workflow

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.6 Training

| **Design ID**          | SCR-100                                  |
| ---------------------- | ---------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → Training |
| **Screen Type**        | Section / Feature Screen                 |
| **Primary Components** | Form controls                            |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Content formats
- Automatic skill/certification assignment
- Certificates
- Expiration and renewal

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.7 Finance

| **Design ID**          | SCR-101                                 |
| ---------------------- | --------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → Finance |
| **Screen Type**        | Detail / Profile Screen                 |
| **Primary Components** | Form controls, Metric card              |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Invoice generation
- Accounting integration
- Payroll provider integration
- Detailed payroll formulas and processing workflow

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.8 Migration

| **Design ID**          | SCR-102                                   |
| ---------------------- | ----------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → Migration |
| **Screen Type**        | Map / Spatial Screen                      |
| **Primary Components** | Interactive map                           |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- TrackTik data migration
- Connecteam data migration
- Parallel operation
- Historical data categories
- Cutover process

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 23.9 Undefined Source Features

| **Design ID**          | SCR-103                                                   |
| ---------------------- | --------------------------------------------------------- |
| **Navigation Path**    | . Pending Discussion Register → Undefined Source Features |
| **Screen Type**        | Listing / Management Screen                               |
| **Primary Components** | Calendar / schedule grid, Form controls                   |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Remote Speak
- Runsheet Patrol Events
- Daily Health
- Cross Schedule Events
- Financial by Shift
- Recordings
- Journal Entries
- System Exceptions detailed behavior
- General Categories (13)
- Devices and License
- Calendar Groups
- Back Office Defaults
- Job List behavior
- Groups: activity and communication membership; no Schedule-access control
- Pivot Chart View/Edit

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 24\. Excluded for Current Phase

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 25\. Functional Traceability Summary

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 26\. Final Acceptance Principle

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# PART II - DETAILED DEVELOPER FUNCTIONAL SPECIFICATION

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 27\. Cross-Module Development Standards

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 27.1 Record Identity and Data Integrity

| **Design ID**          | SCR-104                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| **Navigation Path**    | . Cross-Module Development Standards → Record Identity and Data Integrity |
| **Screen Type**        | Listing / Management Screen                                               |
| **Primary Components** | Data table, Form controls, Tabs / segmented controls, File upload         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Every primary business record must have an internal immutable system ID. Display IDs such as Employee ID, Site ID, Vehicle ID and Report ID remain separate user-facing values.
- Employee ID is generated automatically and cannot be edited after employee creation.
- Related records must store internal references rather than copied names so historical links remain valid when names change.
- Records referenced by historical shifts, reports, tours, timesheets or audit entries must not be hard-deleted. Use Active, Inactive or Archived status where the source document provides it.
- All date/time values must be stored consistently and displayed using the site or system time-zone setting applicable to the record.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 27.2 Common Listing Behavior

| **Design ID**          | SCR-105                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| **Navigation Path**    | . Cross-Module Development Standards → Common Listing Behavior                                   |
| **Screen Type**        | Listing / Management Screen                                                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Load only records the logged-in user is permitted to access based on module access and assigned-site restriction.
- Apply each listed filter independently and combine multiple filters using AND logic unless a filter explicitly supports multiple selections.
- Global Search on a page searches only the columns relevant to that page; the portal-level Global Search searches supported entity types.
- Exports must use the same active filters and search criteria currently applied to the listing.
- Archived records appear only when the applicable Active/Archived/All filter includes them.
- Actions must operate on the selected record and refresh the list after successful completion.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 27.3 Form Behavior and Validation

| **Design ID**          | SCR-106                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Navigation Path**    | . Cross-Module Development Standards → Form Behavior and Validation |
| **Screen Type**        | Form / Configuration Screen                                         |
| **Primary Components** | Form controls, Tabs / segmented controls, Metric card               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Required fields must be visibly marked and validated before submission.
- Email fields must validate email format. Phone fields must retain country code and SMS-consent value separately.
- Date ranges must prevent an end date earlier than the start date unless the feature is explicitly pending discussion.
- Dropdowns populated from configurable master data must show active values and provide the confirmed custom-create option only where specifically approved.
- On validation failure, retain entered data and show field-specific errors.
- Edit forms must load the current saved values and update only submitted changes.
- Confirmation must be required for destructive or access-revoking actions such as termination, close account, archive, remove and revoke access.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 27.4 Permissions and Site Restriction

| **Design ID**          | SCR-107                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Navigation Path**    | . Cross-Module Development Standards → Permissions and Site Restriction |
| **Screen Type**        | Section / Feature Screen                                                |
| **Primary Components** | Search input, Export controls, Toggle / checkbox / radio controls       |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Authenticate the user, resolve all assigned roles, merge module-access toggles and apply assigned-site restriction.
- When any role grants module access, the user can use all actions within that module, subject to assigned-site restriction and custom financial visibility.
- Users with restricted sites must not retrieve, search, export or directly open records belonging only to unassigned sites.
- Users may hold multiple roles. No temporary-role date range is required.
- No separate Dispatcher role is required.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 27.5 Audit and Activity Recording

| **Design ID**          | SCR-108                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Navigation Path**    | . Cross-Module Development Standards → Audit and Activity Recording |
| **Screen Type**        | Form / Configuration Screen                                         |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Record audit entries for create, edit, archive, remove, access grant/revoke, password action, termination, time edit, report approval, schedule update, automation update and configuration change.
- Each audit entry must identify user, date/time, module, record, action and changed values when applicable.
- Company Activity Journal uses the defined activity types Banned, Notes, Terminated and Reactivated.
- Operational activity events must feed the applicable Dashboard Activity Log and Site Live Dashboard filters.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 27.6 Notifications

| **Design ID**          | SCR-109                                              |
| ---------------------- | ---------------------------------------------------- |
| **Navigation Path**    | . Cross-Module Development Standards → Notifications |
| **Screen Type**        | Calendar / Scheduler Screen                          |
| **Primary Components** | Calendar / schedule grid                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Only send notifications when a source-defined event, explicit user action or enabled automation requires one.
- Use the configured notification sender name and sender email.
- Duplicate notification suppression must prevent repeated alerts for the same unresolved automation event.
- No acknowledgment-based escalation is required.
- Notification delivery channels and schedule-change channels are configurable where confirmed.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 28\. Authentication, Roles and Portal Framework - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 28.1 Login

| **Design ID**          | SCR-110                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| **Navigation Path**    | . Authentication, Roles and Portal Framework - Development Logic → Login |
| **Screen Type**        | Form / Configuration Screen                                              |
| **Primary Components** | Metric card                                                              |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- User Flow
- User enters username/email and password.
- System validates credentials and account status.
- System resolves available portal access and role/module permissions.
- User is redirected to the permitted Admin/Supervisor dashboard or applicable portal context.
- Failed login records a Sign-In Log entry with failure status and reason.
- Successful login records login time, user, device/IP details available to the application and successful status.
- Validation and States
- Deny login when access is revoked, employee is terminated or account status does not permit login.
- Apply password policy configured in Settings.
- Force Password Change must redirect the user to password creation before other modules can be used.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 28.2 Roles and Permissions

| **Design ID**          | SCR-111                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Authentication, Roles and Portal Framework - Development Logic → Roles and Permissions |
| **Screen Type**        | Form / Configuration Screen                                                              |
| **Primary Components** | Form controls, Tabs / segmented controls, Toggle / checkbox / radio controls             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Create/Edit Role
- Admin enters Role Name, Description and Portal Section/Type.
- Admin enables module-access toggles and optional assigned-site restriction.
- Admin defines financial information visibility.
- Saving a role makes it available for assignment to users.
- Changes apply to future authorization checks and must be audited.
- Multiple Role Resolution
- Combine access granted by all active roles assigned to the user.
- Apply site restriction to every data query.
- Financial visibility must remain separately controlled even when general module access is granted.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 28.3 Global Search

| **Design ID**          | SCR-112                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Navigation Path**    | . Authentication, Roles and Portal Framework - Development Logic → Global Search |
| **Screen Type**        | Listing / Management Screen                                                      |
| **Primary Components** | Search input                                                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Search Logic
- Accept a text query and search supported Customers/Clients, Contacts, Employees, Reports and other explicitly enabled records.
- Group results by record type.
- Only return records permitted by module and assigned-site access.
- Selecting a result opens its detail page.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 29\. Dashboard - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 29.1 Dashboard Loading and Refresh

| **Design ID**          | SCR-113                                                         |
| ---------------------- | --------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Dashboard Loading and Refresh |
| **Screen Type**        | Listing / Management Screen                                     |
| **Primary Components** | Data table, Filter bar / filter drawer, Metric card             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Load each dashboard statistic from its source module using the logged-in user's site scope.
- Refresh dashboard operational data every minute.
- Each count card opens the linked detail listing with the corresponding filter already applied.
- Counts and listing results must use the same query rules to prevent mismatches.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.2 Clocked-In via Mobile

| **Design ID**          | SCR-114                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Clocked-In via Mobile          |
| **Screen Type**        | Section / Feature Screen                                         |
| **Primary Components** | Calendar / schedule grid, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Count Logic
- Count guards with an active mobile clock-in for the current day and accessible sites.
- Use shift status to classify Current, Current (Uncovered), All Shifts, Covered and Late Shift.
- Opening the card displays Name, Position/Job Type, Clocked-in Time and Shift Name.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.3 Inactive Mobile User

| **Design ID**          | SCR-115                                                |
| ---------------------- | ------------------------------------------------------ |
| **Navigation Path**    | . Dashboard - Development Logic → Inactive Mobile User |
| **Screen Type**        | Form / Configuration Screen                            |
| **Primary Components** | Form controls, Tabs / segmented controls               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Detection Logic
- Only evaluate guards currently clocked in.
- Compare last GPS update and last mobile activity against the enabled automation duration.
- When either configured inactivity condition is met, create one system ticket for the unresolved event.
- Do not create a duplicate ticket/notification while that same inactivity event remains unresolved.
- List Date, Ticket Type, First Name, Last Name, Subject, Location, Status and View.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.4 Expired and Expiring Skills

| **Design ID**          | SCR-116                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Expired and Expiring Skills          |
| **Screen Type**        | Section / Feature Screen                                               |
| **Primary Components** | Filter bar / filter drawer, Export controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Status Logic
- Compare each employee skill expiration date to the current date and configured expiring-soon window.
- Expired records are those before the current date; expiring-soon records are within the configured window.
- Apply category and date filters and export the filtered Employee Name, Expiration Date, Expires, Description, Region and Category data.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.5 Reports to Approve

| **Design ID**          | SCR-117                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Reports to Approve              |
| **Screen Type**        | Form / Configuration Screen                                       |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Count reports submitted during the last seven days whose custom report configuration requires approval and are in the applicable pending status.
- Clicking the count opens Operation Reports with the approval and date filters applied.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.6 Message Board

| **Design ID**          | SCR-118                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Message Board                                                 |
| **Screen Type**        | Listing / Management Screen                                                                     |
| **Primary Components** | Filter bar / filter drawer, Search input, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Count guard-created messages pending to be read according to the available message status.
- List Sender Name, Title, Message, Date and Time, Site and Viewable By.
- Apply Category, Current/Future/Expired and Global Search filters.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.7 Time-Off Requests

| **Design ID**          | SCR-119                                             |
| ---------------------- | --------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Time-Off Requests |
| **Screen Type**        | Listing / Management Screen                         |
| **Primary Components** | Filter bar / filter drawer, Metric card             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Count pending time-off requests accessible to the user.
- Clicking the count opens the Time Off page filtered to pending requests.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.8 Activity Log

| **Design ID**          | SCR-120                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Activity Log                                  |
| **Screen Type**        | Listing / Management Screen                                                     |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Latest shows current-day events.
- View History allows date-based historical events.
- Filter by All Events, Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scans, Runsheet Patrol Events and Remote Actions.
- Apply From-To date filter.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.9 Attendance

| **Design ID**          | SCR-121                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Attendance                                                  |
| **Screen Type**        | Listing / Management Screen                                                                   |
| **Primary Components** | Filter bar / filter drawer, Search input, Calendar / schedule grid, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- List guards scheduled for the current day shift-wise and their clock status.
- Provide Current, Current (Uncovered), All Shifts, Covered and Late Shift filters plus Global Search.
- Attendance must use the schedule and mobile time-clock records as its source.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.10 Scheduled Tours

| **Design ID**          | SCR-122                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **Navigation Path**    | . Dashboard - Development Logic → Scheduled Tours                  |
| **Screen Type**        | Listing / Management Screen                                        |
| **Primary Components** | Calendar / schedule grid, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- List current-day scheduled tours for accessible sites.
- Display Schedule Timing, Site Name, Schedule Title and Last Performed By.
- Last Performed By is populated from the latest completed tour session for that schedule when available.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.11 Task Dispatch

| **Design ID**          | SCR-123                                         |
| ---------------------- | ----------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Task Dispatch |
| **Screen Type**        | Form / Configuration Screen                     |
| **Primary Components** | Filter bar / filter drawer, Form controls       |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Add Task opens the task form determined by selected Task Type.
- List tasks and filter by New Tasks, In Progress, New and In Progress and Completed.
- Filter assignment by All, Not Assigned, Assigned to Any and Assigned to Employee.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 29.12 Show Map and Remote Actions

| **Design ID**          | SCR-124                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Dashboard - Development Logic → Show Map and Remote Actions |
| **Screen Type**        | Map / Spatial Screen                                          |
| **Primary Components** | Tabs / segmented controls                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Show clocked-in guards using their latest available GPS location.
- Selecting a guard opens their activities since clock-in.
- Provide Message with Siren, Remote Speak, Send Audio Message, Reload Install/Settings, Clock Out and Stay Signed In, and Clock Out and Sign Out.
- Send Audio Message transmits an audio message; it must not remotely activate the guard microphone.
- Remote Speak remains Pending Discussion and must not be implemented beyond an inactive placeholder until defined.
- Clock-out actions must update the active time-clock session and record an audit/remote action event.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 30\. Employee Management - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 30.1 Add Employee

| **Design ID**          | SCR-125                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Add Employee                     |
| **Screen Type**        | Form / Configuration Screen                                                  |
| **Primary Components** | Form controls, Tabs / segmented controls, Toggle / checkbox / radio controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Creation Logic
- Generate Employee ID automatically when the employee is successfully created.
- Capture every General Information, Address, Roles and Permissions, and Other Fields value listed in Part I.
- Employee Type uses an active configurable dropdown and allows Admin to create a new type when the required value does not exist.
- Phone SMS consent is stored independently for Main Phone and Other Phone.
- Portal access toggles determine whether credentials/access are enabled for Administration Portal and/or Employee/Guard Portal.
- Password and Confirm Password must match.
- Prevent duplicate Username and duplicate Employee ID.
- After save, create the employee record, role assignments and department assignment.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.2 Employee Listing

| **Design ID**          | SCR-126                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Employee Listing                                                    |
| **Screen Type**        | Listing / Management Screen                                                                                     |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Display exactly the approved columns: UID, Name, Middle Name, Last Name, Title, Termination Date, Email, Username, User Type, Department, Status, Last Visit and Added By.
- Apply Department, Zone (source-listed but current phase treatment per scope), Status and Global Search filters.
- CSV, PDF and Excel exports must reflect the active filters.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.3 Assigned Sites

| **Design ID**          | SCR-127                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Assigned Sites    |
| **Screen Type**        | Listing / Management Screen                                   |
| **Primary Components** | Tabs / segmented controls, Toggle / checkbox / radio controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Assignment Logic
- An employee may be assigned to multiple sites and may have different rates and Job Types at different sites.
- Assign Site requires Site Name, Employee Start Date and Is Primary Site Yes/No.
- Only one assignment should be treated as primary at a time when Make Primary is used.
- Remove ends/removes the active assignment without deleting historical shift/report records.
- List Site, Start Date, Effective Rate Date, Rate, End, Is Primary, Make Primary and Remove action.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.4 Site Bans

| **Design ID**          | SCR-128                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Site Bans                           |
| **Screen Type**        | Form / Configuration Screen                                                     |
| **Primary Components** | Calendar / schedule grid, Form controls, Tabs / segmented controls, File upload |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Ban Logic
- Create a site-ban record with Site, Reason, Effective Date, Expiration Date, Permanent/Temporary, Requested By, Internal Notes, Attachment and Status where available from the confirmed clarification.
- Scheduler must prevent assignment to a site when an active ban applies on the shift date.
- Remove Ban changes the ban status and preserves history.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.5 Emergency Contacts and Notes

| **Design ID**          | SCR-129                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Emergency Contacts and Notes         |
| **Screen Type**        | Form / Configuration Screen                                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Create Contact stores the employee emergency contact and includes it in Active/Archived/Status-filtered listing.
- Add Notes stores the note author, date/time and applicable type/status required by the Company Activity Journal filters.
- Notes by Employee and Notes on Employee remain separate views as listed.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.6 Availability

| **Design ID**          | SCR-130                                                  |
| ---------------------- | -------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Availability |
| **Screen Type**        | Section / Feature Screen                                 |
| **Primary Components** | Calendar / schedule grid                                 |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Default weekly availability is Available/Green.
- Admin can change each day/time block to Available/Green, May Be Available/Yellow or Not Available/Red.
- Scheduling conflict checks must read the employee availability applicable to the shift date/time.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.7 Work Exceptions

| **Design ID**          | SCR-131                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Work Exceptions                     |
| **Screen Type**        | Listing / Management Screen                                                     |
| **Primary Components** | Filter bar / filter drawer, Search input, Calendar / schedule grid, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- List Shift Start, Shift End, Region, Account Name, Meal Break Exception, Meal Schedule, Meal Actual, Rest Break Exception, Rest Schedule and Rest Actual.
- Provide date, status and Global Search filters as defined in Part I.
- Values are derived from scheduled break rules and actual time-clock/break activity.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.8 Password, ID Card, Picture and Tracking Actions

| **Design ID**          | SCR-132                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Password, ID Card, Picture and Tracking Actions |
| **Screen Type**        | Detail / Profile Screen                                                                     |
| **Primary Components** | Interactive map, Tabs / segmented controls, File upload                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Change Password validates Enter Password and Confirm Password, then updates credentials.
- Force Password Change sends or activates a password-change requirement for the employee.
- ID Card displays the generated card using employee-specific details.
- Snap Picture uploads/replaces the profile picture.
- Tracks displays the employee current/latest location where location data is available and permitted.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.9 Termination

| **Design ID**          | SCR-133                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Termination |
| **Screen Type**        | Listing / Management Screen                             |
| **Primary Components** | Calendar / schedule grid, Tabs / segmented controls     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Collect Last Day of Work, Reason and Comments.
- On confirmation, set employee termination data/status.
- Mark future assigned shifts as uncovered.
- Revoke Admin/Supervisor Portal and Guard Mobile App access.
- Preserve all historical records.
- Notify payroll and relevant supervisors.
- Record the termination in audit history and Company Activity Journal.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.10 Skills and Credentials

| **Design ID**          | SCR-134                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Skills and Credentials  |
| **Screen Type**        | Listing / Management Screen                                         |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Admin assigns skills/attributes from configured categories.
- Admin manually verifies credentials and updates status.
- Supported statuses are Pending Review, Verified, Rejected, Expiring Soon and Expired; retain any source-listed status needed by existing records.
- Expiration status is derived from expiration date, while verification is manually controlled.
- Skill listing shows Skill, Category and Information and supports Category and Global Search filters.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.11 Employee Reports

| **Design ID**          | SCR-135                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Employee Reports                                                                 |
| **Screen Type**        | Form / Configuration Screen                                                                                                  |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- List ID, Type, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. Report Flags are not used.
- Apply Active/All Templates/Archived, Status, From-To Date and Global Search filters. Do not include Incident Flags filtering.
- Approve All performs approval only on eligible reports according to each report configuration.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.12 Summary Reports

| **Design ID**          | SCR-136                                                     |
| ---------------------- | ----------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Summary Reports |
| **Screen Type**        | Listing / Management Screen                                 |
| **Primary Components** | Export controls, Interactive map, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Group shift activity into rows showing Employee, Location, Reports, Videos, Checkpoints, Start, End, Tracks, PDF, View and Options.
- Approve All Reports applies only to approval-required eligible reports in the selected shift summary.
- Send Shift Report by Email sends the generated shift summary/report to the entered or configured recipient.
- Delete This Shift and Time Logs requires confirmation and audit; preserve related records where hard deletion would break history.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.13 Employee Tours and Schedule

| **Design ID**          | SCR-137                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Employee Tours and Schedule                                                     |
| **Screen Type**        | Form / Configuration Screen                                                                                                 |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Calendar / schedule grid, Form controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Tour listing shows Tour Name, Account, Employee, Result, Start Time, End Time, Duration, PDF, Email, View Tour Session and Delete Tour Session.
- Apply From-To date and Global Search filters and provide CSV, PDF, Excel, Pivot Chart View and Pivot Chart Edit actions.
- Employee Schedule listing shows Note, Name, Day, Start Date, Time, Clocked Shifts, Scheduled Break and Actual Break.
- Provide calendar view, No Schedule to Distribute, No Changes to Notify and Print actions as listed.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 30.14 Employee Time Off

| **Design ID**          | SCR-138                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Employee Management - Development Logic → Employee Time Off |
| **Screen Type**        | Form / Configuration Screen                                   |
| **Primary Components** | Calendar / schedule grid, Form controls                       |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Create Time Off captures First Day Off, Return Date and Description.
- Validate Return Date is not earlier than First Day Off.
- List ID, From, To and Description.
- Entitlement permits the configured entitlement value to be set for the employee.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 31\. Departments, Admins and User Settings - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 31.1 Departments

| **Design ID**          | SCR-139                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| **Navigation Path**    | . Departments, Admins and User Settings - Development Logic → Departments |
| **Screen Type**        | Form / Configuration Screen                                               |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid, Form controls       |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Create Department with Department Name, Display ID and Details.
- List Department, Install Code, Employees and View.
- Department detail exposes Employees, Operation Reports, Notifications, Positions, Edit, Contacts, Security and Patrol and Schedules.
- Assign Employee supports Filter by Skills, Select Employee, Employee Start Date and Add Rule.
- Employee assignment list shows Employee, Start Date, Rate, Unassignment Date, Is Primary Site and Make Primary.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 31.2 Admins

| **Design ID**          | SCR-140                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| **Navigation Path**    | . Departments, Admins and User Settings - Development Logic → Admins |
| **Screen Type**        | Listing / Management Screen                                          |
| **Primary Components** | Form controls, Tabs / segmented controls                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- List employees with Admin access using First Name, Last Name, Access Level, Managed Groups, Permissions, Admin Tab, Accepted, Last Login and Added By.
- The list is derived from active portal access/role assignment rather than a duplicate employee record.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 31.3 User Settings

| **Design ID**          | SCR-141                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| **Navigation Path**    | . Departments, Admins and User Settings - Development Logic → User Settings |
| **Screen Type**        | Detail / Profile Screen                                                     |
| **Primary Components** | Form controls                                                               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Allow configured employee profile fields in Personal Details, Company-Related Information, Compensation Details and Payment Information.
- Financial visibility rules apply to compensation and payment information.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 32\. Clients and Sites - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 32.1 Client-Site Data Model

| **Design ID**          | SCR-142                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Client-Site Data Model |
| **Screen Type**        | Section / Feature Screen                                         |
| **Primary Components** | Interactive map, Metric card                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Use Company → Region → Client → Site → Job Type → Shift hierarchy.
- Support multiple clients assigned to one site and one client assigned to multiple sites.
- Do not finalize shared-site Client Portal visibility until the pending decision is resolved.
- Account Type is a classification, not a separate hierarchy entity.
- Location stores exact latitude/longitude or a defined internal site area.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.2 Create Site / Client Account

| **Design ID**          | SCR-143                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Create Site / Client Account |
| **Screen Type**        | Form / Configuration Screen                                            |
| **Primary Components** | Form controls, Metric card                                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Capture Account Type, Company Information, Main Contact, Address, Employee Relations and Other Custom Fields exactly as listed in Part I.
- Validate Unique ID uniqueness within the company.
- Store each phone's SMS option independently.
- Time Zone defaults from system settings but remains stored for the site.
- Allow more than one client assignment to the site.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.3 Site Overview

| **Design ID**          | SCR-144                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Overview |
| **Screen Type**        | Detail / Profile Screen                                 |
| **Primary Components** | Form controls                                           |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Display Site Name, Photo, Manager Name, Manager Position, Phone, Email, Address and Bill-To Address.
- Overview data is drawn from the saved site and contact records.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.4 Job Type / Position

| **Design ID**          | SCR-145                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **Navigation Path**    | . Clients and Sites - Development Logic → Job Type / Position      |
| **Screen Type**        | Form / Configuration Screen                                        |
| **Primary Components** | Calendar / schedule grid, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Creation Logic
- Create Job Type using Post Name, Post ID, Short Description of Tasks, Schedule Memo and Active/Archived status.
- Store Hard, Conditional and Soft Requirements.
- Store Ongoing/Temporary service and Begin Date.
- Store Break Rule, Employee Pay Rate or Post Rate option, Premium Matrix, Break Payroll option and Holiday Pay/Rate Multiplier.
- When an assigned employee lacks a requirement, send configured notification to Admin/Supervisor/other configured recipient but allow Admin to take action manually.
- List UID, Position Title, Total Hours, Bill Rate, Holiday Rate, Temporary and actions Duplicate, Edit, History and Remove.
- Duplicate creates a new record with a new unique ID and copied settings.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.5 Site Assigned Employees

| **Design ID**          | SCR-146                                                              |
| ---------------------- | -------------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Assigned Employees    |
| **Screen Type**        | Form / Configuration Screen                                          |
| **Primary Components** | Filter bar / filter drawer, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Assign Employee using Filter by Skills, Select Employee, Employee Start Date and Add Rule with Effective Date and Hourly Rate.
- List Employee, Start Date, Rate, Unassignment Date, Is Primary Site, Make Primary, History, Remove and View.
- Prevent assignment when the employee has an active site ban.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.6 Client Portal Access

| **Design ID**          | SCR-147                                                        |
| ---------------------- | -------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Client Portal Access |
| **Screen Type**        | Form / Configuration Screen                                    |
| **Primary Components** | Form controls, Tabs / segmented controls, File upload          |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Create access with First Name, Last Name, Picture, Phone, Email, Password, Force Password Change, Client Role and Grant/Revoke Access status.
- List Full Name, Email, Phone, Last Login, Access and Edit.
- Revoking access blocks future login without deleting the client user history.
- Detailed portal visibility and multi-client shared-site behavior remain Pending Discussion.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.7 Site Contacts

| **Design ID**          | SCR-148                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Contacts |
| **Screen Type**        | Form / Configuration Screen                             |
| **Primary Components** | Form controls                                           |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Create contact using every field listed in Part I, including Attention Of, Preferred Language, Status and Use This Address as Bill-To Address.
- When Bill-To is selected, update the site billing-address reference.
- List Name, Job Title, Phone, Email and Edit action.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.8 Close Account

| **Design ID**          | SCR-149                                                 |
| ---------------------- | ------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Close Account |
| **Screen Type**        | Section / Feature Screen                                |
| **Primary Components** | Tabs / segmented controls                               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Current Implementation Boundary
- Provide choices Terminate Site and All Contracts or Terminate One or More Positions, Termination Date and confirmation screen.
- Do not implement automated downstream closure consequences until the pending discussion is resolved.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.9 Site Operational Tabs

| **Design ID**          | SCR-150                                                         |
| ---------------------- | --------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Operational Tabs |
| **Screen Type**        | Listing / Management Screen                                     |
| **Primary Components** | Calendar / schedule grid, Tabs / segmented controls             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Dispatch Settings and Prepare Schedule open their respective shared functionality in the current site context.
- Operation Reports, Logs and Activities, Reports, Patrol Tours, Journal Entries, Recordings, Summaries, Summary by Shift, Financial by Shift, Incident Analytics, Analytics Reports, Exceptions and Audits, Post Orders, Work Exception and System Exception must remain accessible.
- Undefined source features remain placeholders/pending until their business behavior is defined; do not invent calculations or workflows.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.10 Site Notifications

| **Design ID**          | SCR-151                                                      |
| ---------------------- | ------------------------------------------------------------ |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Notifications |
| **Screen Type**        | Form / Configuration Screen                                  |
| **Primary Components** | Standard content section                                     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Notification configuration must support the listed report, checkpoint, tour, timekeeping, clock and security events.
- Rules are implemented through the confirmed Automation builder where applicable.
- No acknowledgment escalation is required.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.11 Site Locations, Emergency Contacts and Geo-Fence

| **Design ID**          | SCR-152                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Locations, Emergency Contacts and Geo-Fence |
| **Screen Type**        | Form / Configuration Screen                                                                |
| **Primary Components** | Interactive map, Form controls, Toggle / checkbox / radio controls                         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Create Site Item/Location and store its name/details and exact latitude/longitude where applicable.
- Import Batch remains available where listed.
- Emergency Contacts can be created and assigned in an ordered sequence.
- Geo-fencing allows Admin to define boundary points on the map.
- Mobile App restrictions include Geo-Fence Clock-In, Geo-Fence Clock-Out and Mobile App Login toggles.
- Clock-in outside an enabled geo-fence restriction must be blocked.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.12 Site Live Dashboard

| **Design ID**          | SCR-153                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Live Dashboard          |
| **Screen Type**        | Listing / Management Screen                                            |
| **Primary Components** | Filter bar / filter drawer, Interactive map, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Filter events by Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scan, Runsheet Patrol Events and Remote Actions.
- Provide Show Map, Broadcast Message, New Task, New Report and History Tracks actions.
- All actions open shared modules pre-filtered to the current site.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 32.13 Site Email Settings

| **Design ID**          | SCR-154                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Clients and Sites - Development Logic → Site Email Settings |
| **Screen Type**        | Section / Feature Screen                                      |
| **Primary Components** | Export controls, Toggle / checkbox / radio controls           |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide the PDF Is Attached as a Link Yes/No setting.
- Use this value when emailing applicable site reports.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 33\. Checkpoints and Tour Routes - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 33.1 Checkpoint Creation

| **Design ID**          | SCR-155                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Navigation Path**    | . Checkpoints and Tour Routes - Development Logic → Checkpoint Creation |
| **Screen Type**        | Form / Configuration Screen                                             |
| **Primary Components** | Form controls, Tabs / segmented controls                                |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Capture Checkpoint Name, Special Instruction, allowed Position/Job Type, monitoring method, interval, extra scan option, NFC/Barcode type, Checkpoint ID, GPS Required Accuracy and Manual Scanning option.
- If manual scanning is Yes with Reason, require a reason before accepting the scan.
- Apply custom reason, comment, photo and GPS requirements where configured for the tour/checkpoint.
- Do not add QR as a scan type in the current scope.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 33.2 Batch Import and Logs

| **Design ID**          | SCR-156                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| **Navigation Path**    | . Checkpoints and Tour Routes - Development Logic → Batch Import and Logs |
| **Screen Type**        | Form / Configuration Screen                                               |
| **Primary Components** | Data table, Form controls, Metric card                                    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Batch import accepts the approved spreadsheet template, validates required checkpoint fields and reports row-level errors.
- Checkpoint logs show Time, Employee, Account, Checkpoint and Tour.
- Imported and manually created checkpoints use the same listing and edit flow.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 33.3 Tour Route Creation

| **Design ID**          | SCR-157                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| **Navigation Path**    | . Checkpoints and Tour Routes - Development Logic → Tour Route Creation |
| **Screen Type**        | Calendar / Scheduler Screen                                             |
| **Primary Components** | Interactive map, Calendar / schedule grid, Form controls                |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Capture Description, Assigned To, Special Instructions, Estimated Tour Duration, Grace Period, Weekly/Monthly Recurrence and Tour Schedule day/time.
- Tour is assigned to a specific employee of a shift through Scheduling.
- Guard must be clocked in and inside the Site polygon to start a Tour manually.
- Allow Admin to define checkpoint order/rules and tour timing/exception behavior.
- Allow Manage Checkpoints to add, remove and arrange assigned checkpoints.
- Late, incomplete, finished and interruption events trigger enabled notification/automation rules.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 33.4 Checkpoint Issues

| **Design ID**          | SCR-158                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Navigation Path**    | . Checkpoints and Tour Routes - Development Logic → Checkpoint Issues |
| **Screen Type**        | Section / Feature Screen                                              |
| **Primary Components** | Standard content section                                              |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Allow guard-submitted issue types Damaged NFC Tag, Missing Barcode, Inaccessible Checkpoint, Unsafe Location and GPS Inaccuracy.
- Execute the configured action, such as notification, maintenance task or system exception.
- Do not require supervisor approval for manual checkpoint issue submission.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 34\. Scheduling - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 34.1 Schedule Setup

| **Design ID**          | SCR-159                                           |
| ---------------------- | ------------------------------------------------- |
| **Navigation Path**    | . Scheduling - Development Logic → Schedule Setup |
| **Screen Type**        | Form / Configuration Screen                       |
| **Primary Components** | Calendar / schedule grid, Form controls           |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Admin creates a Schedule by entering Name and selecting default/custom fields, Jobs, View Type, Layout Type, shift-card fields and Users.
- View Type options are User and Job.
- Shift card field selection includes Hours, Job and Shift Title and any confirmed custom field.
- The resulting schedule page is generated from the saved configuration.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 34.2 Schedule View

| **Design ID**          | SCR-160                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Scheduling - Development Logic → Schedule View                                                        |
| **Screen Type**        | Listing / Management Screen                                                                             |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid, Form controls, Toggle / checkbox / radio controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide Day, Week, Month, View by User, View by Job and List View.
- Render blank clickable boxes for dates/users/jobs without shifts.
- Provide Sort Cell Content and all source-listed toggles: Minimized View, Daily Info, Weekly Summary, Availability Status, Issues, Cross Schedule Events, Labor Costs, Daily Health, Hide Empty Row, Working Hours, Non-Working Days and Organize by Groups.
- Provide Week/Date filters, Add, Actions, Coverage per Hour, Print Position Schedule and Settings.
- Undefined display concepts such as Daily Health and Cross Schedule Events remain present but pending detailed behavior.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 34.3 Shift Creation and Editing

| **Design ID**          | SCR-161                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **Navigation Path**    | . Scheduling - Development Logic → Shift Creation and Editing      |
| **Screen Type**        | Calendar / Scheduler Screen                                        |
| **Primary Components** | Calendar / schedule grid, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Clicking a blank cell opens shift creation with Date/From-To/All Days, Start Time, End Time, Title, Job, Users, Address, Note, Shift Tags, Shift Tasks and configured custom fields.
- Allow recurring shifts: Daily, Weekly, Biweekly, Monthly, selected days and custom recurrence as confirmed.
- Automatically deliver assigned shifts to selected users.
- Validate overlapping shifts, availability, approved time off, active site ban, expired/missing credentials, insufficient rest, overtime and excessive weekly hours.
- For missing Job requirements, notify configured users but allow Admin to proceed manually.
- Published schedules may be updated; use configurable notification channels for affected users.
- Guard Shift acceptance/rejection and swap/replacement requests are current scope; Admin resolves reassignment manually. Open-shift claiming remains Later Phase. Cross-midnight Shift belongs to its start date.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 35\. Time Clock, Attendance and Work Exceptions - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 35.1 Mobile Clock-In/Out

| **Design ID**          | SCR-162                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Time Clock, Attendance and Work Exceptions - Development Logic → Mobile Clock-In/Out |
| **Screen Type**        | Form / Configuration Screen                                                            |
| **Primary Components** | Interactive map, Form controls, Tabs / segmented controls                              |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Guard clock-in and clock-out originate from the Guard Mobile App.
- Validate assigned shift/site and current geo-fence restriction.
- Block clock-in when outside the enabled site geo-fence.
- Apply configurable earliest clock-in, late threshold, early clock-out and related timing settings.
- Create time-clock events and update the active shift attendance status.
- Offline clock-in/out and synchronization remain Pending Discussion.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 35.2 Timesheets and Manual Changes

| **Design ID**          | SCR-163                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| **Navigation Path**    | . Time Clock, Attendance and Work Exceptions - Development Logic → Timesheets and Manual Changes |
| **Screen Type**        | Form / Configuration Screen                                                                      |
| **Primary Components** | Calendar / schedule grid, Form controls, Tabs / segmented controls                               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Generate timesheet information from scheduled shift, clock-in, clock-out and breaks.
- Allow authorized Admin to edit time records with audit history; Super Admin may reopen approved time.
- Require reason and record original value, new value, changed by and date/time in audit history.
- Use approved break-management configuration to calculate scheduled and actual break information.
- Do not add unconfirmed approval/rejection workflow states.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 35.3 Time Clock Pages

| **Design ID**          | SCR-164                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Navigation Path**    | . Time Clock, Attendance and Work Exceptions - Development Logic → Time Clock Pages |
| **Screen Type**        | Listing / Management Screen                                                         |
| **Primary Components** | Filter bar / filter drawer, Calendar / schedule grid                                |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Security Operations Time Clock first lists sites.
- Selecting a site opens its Timesheet with Today filter.
- Dashboard Attendance and Employee Work Exceptions use the same time-clock source records.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 36\. Reports and Incidents - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 36.1 Reports versus Forms

| **Design ID**          | SCR-165                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **Navigation Path**    | . Reports and Incidents - Development Logic → Reports versus Forms |
| **Screen Type**        | Section / Feature Screen                                           |
| **Primary Components** | Form controls                                                      |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Forms are manually built and assigned for employee completion.
- Reports are generated from Custom Report settings, Custom Report Form, Categories, Incident Categories and Footer.
- Do not merge form submissions and operational reports into one record type.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 36.2 Report Listing

| **Design ID**          | SCR-166                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents - Development Logic → Report Listing                                                                 |
| **Screen Type**        | Listing / Management Screen                                                                                                  |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- List ID, Type, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. Report Flags are not used.
- Apply Active, All Templates, Archived, Status, From-To Date and Global Search filters.
- Use only Pending Approval, Approved and Archived report statuses.
- Report numbering is site-specific; the exact display format remains configurable/not otherwise invented.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 36.3 Approval and Publication

| **Design ID**          | SCR-167                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents - Development Logic → Approval and Publication |
| **Screen Type**        | Form / Configuration Screen                                            |
| **Primary Components** | Form controls                                                          |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Custom Report creation determines whether approval is required.
- No multi-level approval is required.
- Reviewer cannot directly edit the submitted report and there is no return-for-correction workflow.
- Approval updates report status and records approver/date.
- Client publication/visibility follows report configuration, but detailed Client Portal behavior remains pending.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 36.4 Custom Report Builder

| **Design ID**          | SCR-168                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Navigation Path**    | . Reports and Incidents - Development Logic → Custom Report Builder |
| **Screen Type**        | Form / Configuration Screen                                         |
| **Primary Components** | Search input, Form controls, Metric card                            |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Admin can create, edit, archive and search report forms and categories.
- Field Setup supports the source-listed custom field behavior and subforms.
- Count shows number of reports generated from the custom report.
- Incident Category stores Code, Region, Description, Level, Parent Category and Default Group.
- Report Footer supports text or image format and edit action.
- Digital acknowledgment is supported where configured.
- Media uses standard centrally configured limits.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 37\. Forms - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 37.1 Form Builder and Assignment

| **Design ID**          | SCR-169                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Navigation Path**    | . Forms - Development Logic → Form Builder and Assignment             |
| **Screen Type**        | Form / Configuration Screen                                           |
| **Primary Components** | Data table, Export controls, Form controls, Tabs / segmented controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Admin creates a form using customizable fields.
- Assign forms to employees for completion.
- Provide Form Listing, Add New Form, Archived view, Export and actions Move, Archive and Delete.
- Do not introduce submission frequency, department assignment or approval workflow unless later confirmed.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 37.2 Form Submission

| **Design ID**          | SCR-170                                       |
| ---------------------- | --------------------------------------------- |
| **Navigation Path**    | . Forms - Development Logic → Form Submission |
| **Screen Type**        | Section / Feature Screen                      |
| **Primary Components** | Form controls, Tabs / segmented controls      |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Employee submits values for the fields defined in the form version assigned to them.
- Store submission author and submission date/time.
- Existing submissions must remain readable even after the form is edited or archived.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 38\. Tasks, Dispatch and Job List - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 38.1 Task Types and Assignment

| **Design ID**          | SCR-171                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Navigation Path**    | . Tasks, Dispatch and Job List - Development Logic → Task Types and Assignment |
| **Screen Type**        | Listing / Management Screen                                                    |
| **Primary Components** | Data table, Form controls                                                      |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Keep Dispatch Task, Quick Task, Recurring Task and Help Desk Ticket as separate record types/workflows.
- Job Type is the role/service, not a task.
- A task is assigned to one target: employee, job, site, shift, department or group as applicable.
- Task form fields change according to selected Task Type as required by the source listing.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 38.2 Listings and Filters

| **Design ID**          | SCR-172                                                                           |
| ---------------------- | --------------------------------------------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List - Development Logic → Listings and Filters         |
| **Screen Type**        | Listing / Management Screen                                                       |
| **Primary Components** | Filter bar / filter drawer, Form controls, Tabs / segmented controls, Metric card |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Dashboard Task Dispatch uses New Tasks, In Progress, New and In Progress, Completed plus assignment filters.
- Quick Tasks uses Created by Me, My Tasks, All Tasks and Archived.
- Show Overdue, Done, Open and Total Task counts.
- No universal mandatory proof-of-completion fields are required.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 38.3 Escalation

| **Design ID**          | SCR-173                                                         |
| ---------------------- | --------------------------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List - Development Logic → Escalation |
| **Screen Type**        | Section / Feature Screen                                        |
| **Primary Components** | Standard content section                                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Overdue or qualifying task events may trigger configured automation actions, including notification, priority change, exception or reassignment where configured.
- No acknowledgment escalation is required.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 38.4 Job List

| **Design ID**          | SCR-174                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Tasks, Dispatch and Job List - Development Logic → Job List |
| **Screen Type**        | Form / Configuration Screen                                   |
| **Primary Components** | Form controls, Tabs / segmented controls                      |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Current Scope
- Provide Job List, Add and Import.
- Detailed Job List fields and behavior remain Pending Discussion; do not duplicate Job Type behavior without confirmation.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 39\. Communications - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 39.1 Combined Module

| **Design ID**          | SCR-175                                                |
| ---------------------- | ------------------------------------------------------ |
| **Navigation Path**    | . Communications - Development Logic → Combined Module |
| **Screen Type**        | Listing / Management Screen                            |
| **Primary Components** | Form controls, File upload                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide Chat, Updates, Message Board, Broadcast, Directory, Forms access and Help Desk as the source document requires.
- Chat is employee communication.
- Message Board contains guard-created messages.
- Broadcast sends messages to selected user types/users based on selection.
- Normal communication does not require read acknowledgment.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 39.2 Updates

| **Design ID**          | SCR-176                                        |
| ---------------------- | ---------------------------------------------- |
| **Navigation Path**    | . Communications - Development Logic → Updates |
| **Screen Type**        | Form / Configuration Screen                    |
| **Primary Components** | Data table, Export controls, Form controls     |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide Updates Listing, Create Update and Export.
- Send an Update supports Specific Group, Specific User or User Type audience selection as listed on Dashboard.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 39.3 Directory

| **Design ID**          | SCR-177                                          |
| ---------------------- | ------------------------------------------------ |
| **Navigation Path**    | . Communications - Development Logic → Directory |
| **Screen Type**        | Form / Configuration Screen                      |
| **Primary Components** | Export controls, Form controls                   |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- List directory users/contacts available to the logged-in user.
- Actions: Tag Users, Notify, Send Chat Message, Create Group Chat with Selected, Create Task and Export.
- Apply site access restrictions to directory results.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 39.4 Pending Communication Rules

| **Design ID**          | SCR-178                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **Navigation Path**    | . Communications - Development Logic → Pending Communication Rules |
| **Screen Type**        | Section / Feature Screen                                           |
| **Primary Components** | Export controls, Form controls, File upload                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Admin private-chat visibility, message editing/deletion, export, attachments, retention, guard-to-guard rules and client participation remain Pending Discussion. Do not implement these assumptions.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 40\. Security Operations - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 41\. Documents, Policies and Team Resources - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 41.1 Confirmed Document Functions

| **Design ID**          | SCR-179                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources - Development Logic → Confirmed Document Functions |
| **Screen Type**        | Form / Configuration Screen                                                                 |
| **Primary Components** | Data table, Export controls, Form controls, Tabs / segmented controls, File upload          |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Company Policies supports PDF upload, listing and download.
- Post Orders, SOPs and Manuals support Add New, Active/Archived listing and Export.
- Workplace Notices and Posters support Active, Archived, Add New and Export.
- Documents supports Create Pack as listed.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 41.2 Pending Team Resource Functions

| **Design ID**          | SCR-180                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Documents, Policies and Team Resources - Development Logic → Pending Team Resource Functions |
| **Screen Type**        | Listing / Management Screen                                                                    |
| **Primary Components** | Search input, Export controls, Form controls, Tabs / segmented controls                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Rewards/Tokens, Benefits, Celebrations, extended Time Off/Paid Policies, Insights, Text Message, Disciplinary Reports, HR Complaint Form and Hiring remain in the screen inventory but their detailed logic is Pending Discussion. Preserve their listed Add/List/Active/Archived/Export/Search actions only.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 42\. Training - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 43\. Vehicles - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 44\. Automations and Notifications - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 44.1 Builder

| **Design ID**          | SCR-181                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Automations and Notifications - Development Logic → Builder |
| **Screen Type**        | Form / Configuration Screen                                   |
| **Primary Components** | Filter bar / filter drawer                                    |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide custom Trigger → Conditions → Actions builder.
- Triggers include source-confirmed operational events such as late/missed clock, GPS inactivity, tour/checkpoint events, panic, report, credential, shift, task and termination events.
- Conditions filter the event by supported record attributes.
- Actions execute the selected notification or record-creation behavior.
- One automation cannot be assigned to multiple sites.
- Whether company-wide/global scope is allowed remains unconfirmed; do not assume it.
- No acknowledgment escalation is required.
- Implement duplicate suppression for the same unresolved event.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 44.2 Execution Logic

| **Design ID**          | SCR-182                                                               |
| ---------------------- | --------------------------------------------------------------------- |
| **Navigation Path**    | . Automations and Notifications - Development Logic → Execution Logic |
| **Screen Type**        | Section / Feature Screen                                              |
| **Primary Components** | Tabs / segmented controls                                             |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- When an event occurs, find active automations for the event's allowed scope.
- Evaluate all configured conditions.
- If conditions pass, check whether an unresolved duplicate event already exists.
- If not suppressed, execute actions and record execution result.
- If suppressed, do not resend duplicate notification.
- Record automation execution for troubleshooting and audit.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 45\. Payroll and Back Office - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 46\. Settings and Configuration - Development Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 46.1 General Configuration

| **Design ID**          | SCR-183                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| **Navigation Path**    | . Settings and Configuration - Development Logic → General Configuration |
| **Screen Type**        | Form / Configuration Screen                                              |
| **Primary Components** | Form controls, Tabs / segmented controls                                 |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide Notification Sender Name and Email, listed notification categories, Recurrent Tasks, Break Management, Clock In/Out, SMS Segments, Company Name and Address, Roles and Permissions, Password Policy, Sign-In Log, General categories, System Locale and Field Configuration.
- Configuration changes apply to subsequent operations and are audited.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 46.2 Operation Configuration

| **Design ID**          | SCR-184                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| **Navigation Path**    | . Settings and Configuration - Development Logic → Operation Configuration |
| **Screen Type**        | Form / Configuration Screen                                                |
| **Primary Components** | Calendar / schedule grid, Tabs / segmented controls                        |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide Report Templates, Site Templates, Incident Templates, Devices and License, Region Message Boards, Job/Service Type, Special Calendar Days and Calendar Groups.
- Zone Templates are excluded for the current phase but retained in traceability.
- Undefined detailed behavior remains pending and must not be invented.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 46.3 Data Retention

| **Design ID**          | SCR-185                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| **Navigation Path**    | . Settings and Configuration - Development Logic → Data Retention |
| **Screen Type**        | Listing / Management Screen                                       |
| **Primary Components** | Standard content section                                          |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Required Logic
- Provide separate configurable retention values by data category, including GPS, reports, media, chat, timesheets, audit, panic, tours and checkpoints as confirmed.
- Deletion/archive execution rules must respect legal and historical-reference needs and should not be finalized beyond the configured category setting without RFI approval.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 47\. Supervisor Portal Logic

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 48\. Pending Development Decisions - Do Not Implement by Assumption

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 49\. Developer Acceptance Checklist

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

# 36\. Source Coverage Verification Addendum

Module design group. All screens below must remain accessible according to assigned module access and site restrictions.

## 36.1 Employee Security and Patrol - Metrics (Excluded)

| **Design ID**          | SCR-186                                                                          |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Navigation Path**    | . Source Coverage Verification Addendum → Employee Security and Patrol - Metrics |
| **Screen Type**        | Form / Configuration Screen                                                      |
| **Primary Components** | Data table, Filter bar / filter drawer, Form controls, File upload               |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- EXCLUDED: Employee Metrics is not required in the current approved scope.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 36.2 Confirmed Source Coverage

| **Design ID**          | SCR-187                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Navigation Path**    | . Source Coverage Verification Addendum → Confirmed Source Coverage                                                             |
| **Screen Type**        | Form / Configuration Screen                                                                                                     |
| **Primary Components** | Data table, Filter bar / filter drawer, Search input, Export controls, Interactive map, Calendar / schedule grid, Form controls |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- Authentication and role-based redirection
- Dashboard, all platform-statistic cards, Activity Log, Attendance, Scheduled Tours, Task Dispatch, Map, Global Search and Send an Update
- Dashboard submodules: Report Settings, Vehicle Management, Schedule redirect, Company Activity Journal and System Exceptions
- Employee creation, listing, profile sections, Security and Patrol, Reports, Summary Reports, Tours, Schedules, Time Off, Policies, User Settings, Admins, Departments and Skills
- Clients/Sites, site users, contacts, assigned employees, Job Types/Positions, schedules, reports, tours, checkpoints, locations, geo-fencing, notifications and site settings
- Settings: General, Operation and Back Office configurations
- Help, Chat, Groups/Segments, Automations, Job List, Security Operations, Communications, Team Resources, Training and Sign Out
- All original filters, listing columns, exports and actions applicable to the Admin/Supervisor portal
- All RFI-confirmed logic changes, exclusions and Pending Discussion items

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 36.3 Scope Boundary

| **Design ID**          | SCR-188                                                  |
| ---------------------- | -------------------------------------------------------- |
| **Navigation Path**    | . Source Coverage Verification Addendum → Scope Boundary |
| **Screen Type**        | Form / Configuration Screen                              |
| **Primary Components** | File upload                                              |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- The uploaded source also contains Guard Mobile App and Client Portal sections. They were intentionally not expanded in this Admin/Supervisor Portal specification. Their shared Admin configuration and access-management touchpoints are included where applicable, while their standalone screens and workflows remain separate deliverables.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

## 36.4 Development Control

| **Design ID**          | SCR-189                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **Navigation Path**    | . Source Coverage Verification Addendum → Development Control |
| **Screen Type**        | Listing / Management Screen                                   |
| **Primary Components** | Form controls, Tabs / segmented controls, File upload         |

#### Figma screen anatomy

- Page header with exact screen title.
- Primary content follows the source-defined section order below.
- Use only the filters, columns, fields and actions listed below.
- Include applicable default, empty, loading, no-results, error and no-permission states.

#### Source requirements to represent

- A source-listed item must not be removed because it is duplicated elsewhere; it may link to a shared module.
- An undefined source-listed heading must remain marked Pending Definition rather than being assigned invented fields or logic.
- Items explicitly marked Pending Discussion must not be developed based on assumptions.
- Items explicitly excluded by RFI must not be implemented in the current phase.
- Any future functional change must be documented as an approved change request.

#### Design interaction notes

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog.
- Filters must visibly show active selections and provide a clear reset action when filters are listed.
- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment.
- Contextual links may open a shared global screen with the applicable record filter already applied.

# 6\. Source Tables and Status Registers

The tables below are copied from the verified specification so Figma page coverage remains traceable.

## 6.1 Reference Table

| **Status**               | **Meaning**                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| Source / Confirmed       | Present in the uploaded feature list or explicitly confirmed by RFI.         |
| Pending Discussion       | Must remain in the scope register but workflow or behavior is not finalized. |
| Excluded / Current Phase | Explicitly ignored or not required for the current scope.                    |

## 6.2 Reference Table

| **Area**                          | **Status**                                            |
| --------------------------------- | ----------------------------------------------------- |
| Authentication and module access  | Confirmed                                             |
| Dashboard and operational widgets | Confirmed                                             |
| Employee management               | Confirmed                                             |
| Departments and skills            | Confirmed                                             |
| Clients and sites                 | Confirmed with pending contract/client-portal details |
| Scheduling                        | Confirmed with pending shift-marketplace behaviors    |
| Time clock and work exceptions    | Confirmed with offline pending                        |
| Reports and incidents             | Confirmed                                             |
| Forms                             | Confirmed                                             |
| Checkpoints and tours             | Confirmed                                             |
| Tasks and dispatch                | Confirmed                                             |
| Communications                    | Confirmed with chat rules pending                     |
| Security Operations landing area  | Confirmed                                             |
| Team Resources                    | Source-listed; detailed HR workflows pending          |
| Training                          | Quizzes and RFI Academy confirmed; details pending    |
| Vehicles                          | Documentation only                                    |
| Automations                       | Custom builder confirmed                              |
| Payroll                           | Calculation required; detailed rules pending          |
| Settings                          | Confirmed as source-listed                            |
| Groups / Job List                 | Source-listed; details pending                        |
| Help and Help Desk                | Confirmed and separate                                |

## 6.3 Reference Table

| **Area**                  | **Pending Decisions / Development Hold**                                                                                                                                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scheduling                | Shift acceptance/rejection, open shifts, claiming, swaps, replacement workflow, cross-midnight treatment.                                                                                                                                            |
| Site/Client               | Contracts, site-closure consequences, Client Portal visibility/actions, invoices, shared-site client visibility.                                                                                                                                     |
| Mobile/Attendance         | Offline clock-in/out, synchronization, multiple/shared devices, device approval, GPS frequency, Watch Mode, guard visibility.                                                                                                                        |
| Communications            | Private chat access, moderation, export, attachments, retention, guard-to-guard and client participation.                                                                                                                                            |
| HR/Team Resources         | Hiring depth, benefits, rewards/tokens, celebrations, complaints and disciplinary workflow.                                                                                                                                                          |
| Training                  | Content types, certificates, skill assignment and renewal.                                                                                                                                                                                           |
| Finance                   | Invoice generation, payroll formulas/workflow, accounting/payroll integrations.                                                                                                                                                                      |
| Migration                 | TrackTik/Connecteam migration, historical scope, parallel operation and cutover.                                                                                                                                                                     |
| Undefined source features | Remote Speak, Runsheet Patrol Events, Daily Health, Cross Schedule Events, Financial by Shift, Recordings, Journal Entries, General 13 Categories, Devices and License, Calendar Groups, Back Office Defaults, Groups/Segments and Job List details. |

# 7\. Prototype Flows Required

1. Login → role-based dashboard
2. Dashboard count card → filtered detail listing
3. Global Search → grouped results → record detail
4. Employee listing → Add Employee → employee profile
5. Employee profile → assign site / ban site / terminate
6. Client listing → client detail → assigned sites
7. Site listing → site detail → positions / employees / reports / patrols
8. Schedule listing → create schedule → schedule grid → create/edit shift
9. Clocked-in guard map → activity popup → permitted remote action
10. Custom Report listing → builder → category/footer setup
11. Report listing → report detail → approval when configured
12. Checkpoint listing → create/edit checkpoint → logs
13. Tour route → manage checkpoints → assigned shift → tour session detail
14. Task listing → dynamic Add Task form → status update
15. Automation listing → Trigger / Conditions / Actions builder
16. Payroll configuration and calculation screens, limited to approved fields and pending rules
17. Settings → role creation → module and site access

# 8\. Figma Delivery Checklist

- All modules from the verified specification have a Figma page or contextual access point.
- All source fields appear in the correct form section.
- All source listing columns appear in table designs.
- All source filters and exports are represented.
- All source actions are represented.
- Pending items are visibly annotated and not designed as final workflows.
- Excluded items are not shown as active functionality.
- Desktop 1440 px screens are complete.
- Key Supervisor screens are validated at 1024 px.
- Component variants cover statuses, loading, empty, validation, error and no-permission states.
- Prototype links cover the required operational flows.
- No unapproved functionality, analytics, workflow state, calculation or role has been introduced.

# 19\. Human-Computer Interaction and End-to-End User Flow Blueprint

**Purpose.** This section strengthens the existing screen inventory with interaction behavior. It does not add business functionality. It explains how approved features should be presented so Admins and Supervisors can understand status, complete tasks efficiently, avoid mistakes and recover from errors.

## 19.1 Interaction Principles

- Operational priority first: urgent items such as panic events, inactive guards, missed clock-ins, late tours and missed checkpoints must appear before informational content.
- Recognition over recall: show names, statuses, site context, selected filters and next actions instead of requiring users to remember codes or prior screens.
- One dominant action per screen: the primary action must be visually obvious; secondary and destructive actions must be separated.
- Progressive disclosure: show essential operational details first and reveal advanced configuration only when the user requests it.
- Context preservation: opening a shared module from an Employee, Site, Client or Dashboard context must retain the applicable filter and provide a visible path back.
- Immediate feedback: every save, publish, clock-out, assignment, approval, upload, export and status change must produce a clear success or failure response.
- Error prevention before correction: validate site bans, geo-fence restrictions, required fields, schedule conflicts and missing qualifications before the final action.
- Safe destructive actions: archive, remove, terminate, revoke access, delete tours, close account and remote clock-out require explicit confirmation with the affected record named.
- Consistent vocabulary: use Job Type as the interface term for Position/Service Type while retaining source labels where legally or operationally necessary.
- Role-appropriate complexity: Supervisors see assigned-site operations and frequent actions; Admin-only configuration is visually separated and permission-controlled.

## 19.2 Visual and Cognitive Hierarchy

- Level 1 - Critical: panic, active safety risk, missed coverage and clock-in failure. Use persistent banners or high-priority cards with a direct action.
- Level 2 - Requires action: reports awaiting approval, time-off requests, overdue tasks, expiring skills and system exceptions.
- Level 3 - Current operations: attendance, scheduled tours, active guards, current tasks and activity log.
- Level 4 - Reference and configuration: historical records, settings, templates, policies and archived data.
- Never communicate severity by color alone. Pair status color with icon, text label and, where useful, a short explanation.

## 19.3 Navigation and Wayfinding Model

- The left navigation displays only permitted modules. The current module and subsection must remain visibly selected.
- Use breadcrumbs for records deeper than one level, for example: Sites > Site Name > Security and Patrol > Tour Routes.
- Context chips must identify active Region, Client, Site, Employee, Schedule or Date filters.
- Shared screens opened contextually must show a clear context banner such as "Showing reports for Site A" with a Remove Context action.
- Browser back, breadcrumb back and in-product back actions must not discard unsaved form data without warning.
- Long detail pages should use tabs or anchored subsection navigation, preserving the source-defined section order.

## 19.4 Standard Screen Interaction Contract

| **Screen Pattern** | **First View**                                                   | **Primary Interaction**                              | **Feedback**                                                  | **Recovery**                                                     |
| ------------------ | ---------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------- |
| Listing            | Title, record count, specified filters, table and primary action | Search/filter, open record, use listed row action    | Active filters, loading state, updated count, export progress | Reset filters, retry load, preserve entered search               |
| Create/Edit Form   | Purpose, required-field indication and named sections            | Complete fields in source order and save             | Inline validation, save progress, success confirmation        | Focus first error, preserve values, warn before leaving          |
| Detail/Profile     | Identity, status and critical summary                            | Review tabs and perform listed contextual actions    | Action confirmation and refreshed affected section            | Return to prior tab/scroll position after error                  |
| Dashboard          | Critical items and current scope                                 | Select card/list item to open filtered detail        | Visible refresh time and changed state                        | Retry individual widget without blocking whole dashboard         |
| Calendar/Schedule  | Date scope, view type and schedule context                       | Select blank cell or shift card                      | Immediate visual placement/update and conflict warning        | Undo or cancel before publish/update                             |
| Map                | Scope, legend and last update                                    | Select marker and perform listed action              | Marker status and action result in context                    | Show stale/unknown location instead of misleading precision      |
| Builder            | Current configuration and sequence                               | Add/edit ordered trigger, condition, action or field | Inline completeness and validation                            | Keep incomplete draft in session; identify missing configuration |

## 19.5 Accessibility and Inclusive Interaction

- All interactive controls must be keyboard reachable in a logical order with a visible focus indicator.
- Provide text alternatives for icons, map actions, status indicators and uploaded images where applicable.
- Use programmatic labels for every form field; placeholder text must not replace a label.
- Tables require clear headers; row actions must identify the associated record to assistive technology.
- Dialogs must trap focus, announce their title and return focus to the initiating control when closed.
- Validation messages must explain the problem and correction, not only state that a value is invalid.
- Support browser zoom and responsive layouts without hiding critical actions or causing overlapping content.
- Touch targets on tablet should be sufficiently large and separated for field supervisors.
- Time, date and status content must be readable without relying on abbreviations alone.

## 19.6 System Feedback, Latency and State Behavior

- Dashboard and live-operation data show "Last updated" time; automatic refresh occurs every minute for approved live data.
- Use skeleton loading for initial content and small inline progress indicators for row-level actions.
- Do not clear the entire page during background refresh. Preserve scroll position and selected record.
- For exports, show generation progress and a success/failure result without blocking unrelated work.
- For uploads, show file name, size, progress and the specific reason for rejection.
- For empty states, distinguish "no data exists" from "no results match filters."
- For stale GPS or activity data, display the last known timestamp and do not represent it as current.
- Duplicate automation notifications must be suppressed according to approved configuration; the UI should identify the original unresolved event.

## 19.7 Primary Role Journeys

### 19.7.1 Supervisor Starts a Shift Monitoring Session

| **Primary user**                  | Supervisor                                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Login > Dashboard                                                                                                          |
| **User goal**                     | Understand which assigned-site items need attention now.                                                                   |
| **System feedback**               | Show assigned-site scope, last refresh time and changed counts after action.                                               |
| **Error prevention and recovery** | Do not expose unassigned-site data. Preserve dashboard filters and prevent accidental remote actions through confirmation. |
| **Completion signal**             | The selected issue is resolved, reviewed or clearly left open with its current status.                                     |

**Primary interaction flow**

1. Log in and land on the Dashboard restricted to assigned sites and permitted modules.
2. Review Clocked-In via Mobile, Inactive Mobile Users, Reports to Approve, Message Board, Time-Off Requests, Attendance, Scheduled Tours and Task Dispatch.
3. Select a count or row to open the corresponding pre-filtered detail page.
4. Resolve or review the item using only the actions approved for that module.
5. Return to Dashboard with context retained and refreshed counts.

### 19.7.2 Admin Configures Operational Structure

| **Primary user**                  | Admin                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Entry point**                   | Employees / Sites / Settings                                                                                       |
| **User goal**                     | Create and maintain employees, clients, sites, job types and related configuration.                                |
| **System feedback**               | Inline validation and clear success response naming the created/updated record.                                    |
| **Error prevention and recovery** | Preserve entered values after validation errors. Do not introduce fields not approved in source or clarifications. |
| **Completion signal**             | Record is visible with correct status and relationships.                                                           |

**Primary interaction flow**

1. Open the applicable module and select its source-defined Add/Create action.
2. Complete source-defined sections and fields in their original grouping.
3. Review validation warnings, including site ban or qualification warnings where applicable.
4. Save the record and display the created detail page or updated listing.
5. Use audit/history areas where source-listed to confirm the change.

## 19.8 Authentication and Access

### 19.8 Authentication and Access.1 Login

| **Primary user**                  | Admin or Supervisor                                                             |
| --------------------------------- | ------------------------------------------------------------------------------- |
| **Entry point**                   | Login screen                                                                    |
| **User goal**                     | Access the portal using authorized credentials.                                 |
| **System feedback**               | Display loading, success redirect or accessible error.                          |
| **Error prevention and recovery** | Prevent access to hidden modules and avoid revealing whether an account exists. |
| **Completion signal**             | User reaches authorized portal scope.                                           |

**Primary interaction flow**

1. Enter username and password.
2. System validates credentials, role/module access and assigned-site restrictions.
3. Successful login opens the permitted Dashboard.
4. Failed login keeps entered username, clears sensitive password as appropriate and shows a specific non-revealing error.

### 19.8 Authentication and Access.2 Role and Module Access

| **Primary user**                  | Admin                                                                      |
| --------------------------------- | -------------------------------------------------------------------------- |
| **Entry point**                   | Settings > Roles and Permissions                                           |
| **User goal**                     | Assign portal and module access without creating action-level permissions. |
| **System feedback**               | Show modules affected and confirmation after save.                         |
| **Error prevention and recovery** | Warn when changes could remove the current administrator's own access.     |
| **Completion signal**             | Role reflects permitted modules and financial visibility.                  |

**Primary interaction flow**

1. Open a role or create a role using source-listed fields.
2. Toggle permitted portal sections/modules and apply assigned-site restrictions where applicable.
3. Save and apply access on the user's next authorized session or refresh.

## 19.9 Dashboard and Live Operations

### 19.9 Dashboard and Live Operations.1 Dashboard Review

| **Primary user**                  | Admin or Supervisor                                                    |
| --------------------------------- | ---------------------------------------------------------------------- |
| **Entry point**                   | Dashboard                                                              |
| **User goal**                     | See source-listed operational counts and activity.                     |
| **System feedback**               | Show one-minute refresh timestamp and per-widget loading/error states. |
| **Error prevention and recovery** | Never hide critical alerts behind lower-priority content.              |
| **Completion signal**             | User identifies and opens required work.                               |

**Primary interaction flow**

1. Review each source-defined dashboard grid and section.
2. Use listed status/category/date filters and global search.
3. Open detail pages from cards without losing dashboard scope.

### 19.9 Dashboard and Live Operations.2 Guard Map and Remote Actions

| **Primary user**                  | Admin or Supervisor with module access                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Dashboard > Show Map                                                                                       |
| **User goal**                     | Locate checked-in guards and review their activity.                                                        |
| **System feedback**               | Show last GPS update and action result.                                                                    |
| **Error prevention and recovery** | Mark stale location; require confirmation for clock-out/sign-out. Remote Speak remains pending definition. |
| **Completion signal**             | Action succeeds or user receives a recoverable error.                                                      |

**Primary interaction flow**

1. Select a guard marker or row.
2. Review current status and activity since clock-in.
3. Choose only a source-listed remote action: Message with Siren, Remote Speak, Send Audio Message, Reload Install/Settings, Clock Out and Stay Signed In, or Clock Out and Sign Out.
4. Confirm consequential actions before execution.

### 19.9 Dashboard and Live Operations.3 Inactive Mobile User Review

| **Primary user**                  | Admin or Supervisor                                                      |
| --------------------------------- | ------------------------------------------------------------------------ |
| **Entry point**                   | Dashboard count > Inactive Mobile User                                   |
| **User goal**                     | Review guards with no GPS update or no activity for configured duration. |
| **System feedback**               | Show inactivity duration and originating automation where available.     |
| **Error prevention and recovery** | Avoid duplicate alerts for the same unresolved event.                    |
| **Completion signal**             | Issue is reviewed through the existing ticket/system exception path.     |

**Primary interaction flow**

1. Open listing with Date, Ticket Type, First Name, Last Name, Subject, Location, Status and View.
2. Open the generated ticket or related record.

## 19.10 Employee and Department Management

### 19.10 Employee and Department Management.1 Create Employee

| **Primary user**                  | Admin                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------ |
| **Entry point**                   | Employee > Add Employee                                                        |
| **User goal**                     | Create an employee with the exact approved source fields.                      |
| **System feedback**               | Inline required-field and duplicate validation; success names employee and ID. |
| **Error prevention and recovery** | Preserve values on error. Password fields follow password policy.              |
| **Completion signal**             | Employee appears in listing with permitted portal/mobile access.               |

**Primary interaction flow**

1. Complete General Information, Address, Roles and Permission, and Other Fields.
2. Select or create the confirmed customizable Employee Type.
3. System auto-generates Employee ID.
4. Submit and open the employee record.

### 19.10 Employee and Department Management.2 Review Employee Profile

| **Primary user**                  | Admin or Supervisor with access                                                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Employee Listing > View                                                                            |
| **User goal**                     | Understand employee assignments, availability, exceptions, reports, tours, schedules and time off. |
| **System feedback**               | Keep employee identity/status visible across tabs.                                                 |
| **Error prevention and recovery** | Sensitive compensation/payment information follows custom financial visibility.                    |
| **Completion signal**             | User completes review or action and remains in employee context.                                   |

**Primary interaction flow**

1. Open profile Overview.
2. Navigate source-listed subsections without losing employee context.
3. Use only listed actions such as Change Password, Force Password Change, ID Card, Snap Picture, Terminate, Tracks and Edit.

### 19.10 Employee and Department Management.3 Terminate Employee

| **Primary user**                  | Admin                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| **Entry point**                   | Employee > View > Terminate                                                            |
| **User goal**                     | Terminate an employee using Last Day of Work, Reason and Comments.                     |
| **System feedback**               | Show a summary of consequences before confirmation and final success after processing. |
| **Error prevention and recovery** | Do not delete historical reports, shifts, tours or time records.                       |
| **Completion signal**             | Employee status/access reflects termination and future coverage is visible.            |

**Primary interaction flow**

1. Open Terminate action.
2. Complete source-defined fields and confirm.
3. System marks future shifts uncovered, revokes portal/mobile access, preserves history and notifies payroll and supervisors.

### 19.10 Employee and Department Management.4 Manage Site Ban

| **Primary user**                  | Admin                                                           |
| --------------------------------- | --------------------------------------------------------------- |
| **Entry point**                   | Employee > Site Bans                                            |
| **User goal**                     | Prevent assignment to a banned site.                            |
| **System feedback**               | Show ban status prominently in employee and scheduling context. |
| **Error prevention and recovery** | Display clear blocking reason during assignment.                |
| **Completion signal**             | Ban is active or removed and history remains traceable.         |

**Primary interaction flow**

1. Create ban with approved details and save.
2. Scheduler blocks future assignment to that site.
3. Remove ban using the listed action when applicable.

### 19.10 Employee and Department Management.5 Manage Department

| **Primary user**                  | Admin                                                    |
| --------------------------------- | -------------------------------------------------------- |
| **Entry point**                   | Employee > Departments                                   |
| **User goal**                     | Create a department and assign employees.                |
| **System feedback**               | Show employee count and assignment results.              |
| **Error prevention and recovery** | Prevent duplicate department identifiers where required. |
| **Completion signal**             | Department and assignments appear correctly.             |

**Primary interaction flow**

1. Create department with Department Name, Display ID and Details.
2. Open Department detail and use source-listed Employees, Operation Reports, Notifications, Positions, Contacts, Security & Patrol and Schedules subsections.

## 19.11 Client, Site and Job Type Management

### 19.11 Client, Site and Job Type Management.1 Create Site

| **Primary user**                  | Admin                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Sites > New Site                                                                                            |
| **User goal**                     | Create a site using source-defined account, company, contact, address, employee relation and custom fields. |
| **System feedback**               | Validate required contact/address values and show success.                                                  |
| **Error prevention and recovery** | Do not assume unresolved shared-client visibility rules.                                                    |
| **Completion signal**             | Site appears with assigned clients and approved configuration.                                              |

**Primary interaction flow**

1. Choose Account Type.
2. Complete Company Information, Main Contact, Address, Employee Relations and Other Custom Fields.
3. Assign multiple clients where required by confirmed clarification.
4. Save and open Site detail.

### 19.11 Client, Site and Job Type Management.2 Configure Site Operations

| **Primary user**                  | Admin                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Site > Security and Patrol / Settings                                                                |
| **User goal**                     | Configure checkpoints, tours, site locations, emergency contacts, geo-fence and mobile restrictions. |
| **System feedback**               | Show site context and status after save.                                                             |
| **Error prevention and recovery** | Do not introduce Site Templates; Zone Templates excluded for current phase.                          |
| **Completion signal**             | Configuration is active for that site.                                                               |

**Primary interaction flow**

1. Open the required subsection from Site context.
2. Complete source-defined fields and save.
3. Return to Site with the same subsection selected.

### 19.11 Client, Site and Job Type Management.3 Create Job Type

| **Primary user**                  | Admin                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| **Entry point**                   | Site > Positions/Job Types > Create                                                |
| **User goal**                     | Create the source-listed Position/Job Type settings.                               |
| **System feedback**               | Show missing qualification warnings without automatic blocking, per clarification. |
| **Error prevention and recovery** | Do not silently rename stored source data; UI may use Job Type consistently.       |
| **Completion signal**             | Job Type is available for schedules and assignments.                               |

**Primary interaction flow**

1. Complete Post Base Settings, Compliances, Service Dates, Break Rule Settings, Pay Settings, Matrix, Break Payroll and Holiday Pay.
2. Save and list the record with UID, Position Title, Tpt Hrs, Bill Rate, Holiday Rate, Temp and Actions.

### 19.11 Client, Site and Job Type Management.4 Assign Employee to Site

| **Primary user**                  | Admin                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| **Entry point**                   | Site > Assigned Employees                                                                    |
| **User goal**                     | Assign an employee with Filter by Skills, Select Employee, Employee Start Date and Add Rule. |
| **System feedback**               | Display warnings for qualification gaps and hard block for active site ban.                  |
| **Error prevention and recovery** | Do not auto-decide on warnings; Admin acts manually.                                         |
| **Completion signal**             | Employee is assigned and visible in Site and Employee contexts.                              |

**Primary interaction flow**

1. Search/filter qualified employees.
2. Select employee and enter effective rate rule fields.
3. Save assignment and show in listing.

## 19.12 Scheduling

### 19.12 Scheduling.1 Create Schedule Definition

| **Primary user**                  | Admin                                                                   |
| --------------------------------- | ----------------------------------------------------------------------- |
| **Entry point**                   | Schedule > Create                                                       |
| **User goal**                     | Create the Connecteam-style schedule shell.                             |
| **System feedback**               | Preview selected shift-card fields and validate required configuration. |
| **Error prevention and recovery** | Do not add unapproved workflow states or extra fields.                  |
| **Completion signal**             | Schedule page is generated with chosen views and fields.                |

**Primary interaction flow**

1. Enter Name, choose default/custom fields, Jobs, View Type, Layout Type, shift-card fields and Users.
2. Save to generate the schedule page.

### 19.12 Scheduling.2 Create or Update Shift

| **Primary user**                  | Admin or Supervisor with access                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------- |
| **Entry point**                   | Schedule page > blank cell or shift                                                           |
| **User goal**                     | Create or modify a shift.                                                                     |
| **System feedback**               | Show the shift immediately in the grid and notify affected users through configured channels. |
| **Error prevention and recovery** | Detect approved conflicts; block banned-site assignment; show qualification warnings.         |
| **Completion signal**             | Shift is visible with chosen card content and history retained.                               |

**Primary interaction flow**

1. Select Day, Week or Month and the required date.
2. Click a blank box or existing shift.
3. Complete Date/From-To/All Days, Start Time, End Time, Title, Job, Users, Address, Note, Shift Tags, Shift Tasks and approved custom fields.
4. Save or update the published schedule.

### 19.12 Scheduling.3 Review Schedule Issues

| **Primary user**                  | Admin or Supervisor                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Schedule > Issues                                                                                                                           |
| **User goal**                     | Review overlapping shifts, availability, time off, site ban, expired credentials, missing training, overtime, rest and weekly hours issues. |
| **System feedback**               | Explain each issue in plain language and identify the affected rule.                                                                        |
| **Error prevention and recovery** | Pending open-shift/swap/replacement features must not be shown as finalized.                                                                |
| **Completion signal**             | Issue is corrected or remains visible with reason.                                                                                          |

**Primary interaction flow**

1. Turn on Issues view/filter.
2. Open the affected shift or employee context.
3. Take a manual action; no unapproved automated reassignment.

## 19.13 Time Clock, Attendance and Payroll

### 19.13 Time Clock, Attendance and Payroll.1 Review Attendance

| **Primary user**                  | Admin or Supervisor                                                          |
| --------------------------------- | ---------------------------------------------------------------------------- |
| **Entry point**                   | Dashboard Attendance / Security Operations > Time Clock                      |
| **User goal**                     | Review scheduled guards and clock status.                                    |
| **System feedback**               | Show current status and last activity; data refresh follows approved timing. |
| **Error prevention and recovery** | Do not invent approval actions not in source.                                |
| **Completion signal**             | User understands attendance condition and takes an approved action.          |

**Primary interaction flow**

1. Use source-listed Current, Current Uncovered, All Shifts, Covered and Late Shift filters plus search.
2. Open the relevant employee/shift/timesheet context.

### 19.13 Time Clock, Attendance and Payroll.2 Manual Time Adjustment

| **Primary user**                  | Authorized Admin/Supervisor                                                |
| --------------------------------- | -------------------------------------------------------------------------- |
| **Entry point**                   | Timesheet detail                                                           |
| **User goal**                     | Correct a time entry with audit history.                                   |
| **System feedback**               | Show recalculated time/pay impact where defined by approved payroll logic. |
| **Error prevention and recovery** | Preserve original values; offline behavior remains pending.                |
| **Completion signal**             | Adjustment is saved and traceable.                                         |

**Primary interaction flow**

1. Open the source-listed timesheet.
2. Edit the applicable time and enter required reason/notes as confirmed.
3. Save and display original and updated values in history.

### 19.13 Time Clock, Attendance and Payroll.3 Configure Payroll

| **Primary user**                  | Admin with financial visibility                                                                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Settings > Back Office Configuration / Payroll                                                                                                                              |
| **User goal**                     | Configure source-listed Employee Classes, Payroll Schedules, Holiday Groups/Codes, Overtime Rules, Pay Codes, Export Formats, Tax Settings, Bill Items and Break Penalties. |
| **System feedback**               | Show active configuration and validation dependencies.                                                                                                                      |
| **Error prevention and recovery** | Mark detailed formulas, invoice behavior and integrations pending.                                                                                                          |
| **Completion signal**             | Configuration is available to approved payroll calculation.                                                                                                                 |

**Primary interaction flow**

1. Open each configuration subsection.
2. Create/edit only source-defined records and fields.
3. Use payroll calculation module without assuming unapproved formulas or provider integration.

## 19.14 Reports, Incidents and Forms

### 19.14 Reports, Incidents and Forms.1 Create Custom Report Template

| **Primary user**                  | Admin                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| **Entry point**                   | Dashboard Reports Settings / Settings > Report Templates                              |
| **User goal**                     | Create a custom report using report form, categories, incident categories and footer. |
| **System feedback**               | Preview form layout and identify required fields.                                     |
| **Error prevention and recovery** | No multi-level approval or correction workflow.                                       |
| **Completion signal**             | Template is available for report generation.                                          |

**Primary interaction flow**

1. Open Create Custom Report.
2. Define fields and configure approval requirement, site context and applicable settings.
3. Save and list template with count and active/archive controls.

### 19.14 Reports, Incidents and Forms.2 Review and Approve Report

| **Primary user**                  | Admin or Supervisor with access                        |
| --------------------------------- | ------------------------------------------------------ |
| **Entry point**                   | Reports listing > View                                 |
| **User goal**                     | Review report details and approve when configured.     |
| **System feedback**               | Show current source-listed status and approval result. |
| **Error prevention and recovery** | Do not add invented report states or numbering format. |
| **Completion signal**             | Report status reflects approved action.                |

**Primary interaction flow**

1. Filter using Active/All Templates/Archived, Status, Date and Search. Report Flags and Incident Flags filtering are not used.
2. Open report with ID, Type, Date, Reported By, Account and Status.
3. Use approved actions: Printable PDF, Email Report, View, Remove and approval where configured.

### 19.14 Reports, Incidents and Forms.3 Build and Assign Form

| **Primary user**                  | Admin                                                                      |
| --------------------------------- | -------------------------------------------------------------------------- |
| **Entry point**                   | Communications/Security Operations > Forms > Add New                       |
| **User goal**                     | Create a custom form and make it available for employee completion.        |
| **System feedback**               | Show form preview and clear save result.                                   |
| **Error prevention and recovery** | Do not add unapproved frequency, department assignment or workflow states. |
| **Completion signal**             | Form is listed and available according to approved assignment behavior.    |

**Primary interaction flow**

1. Add approved fields using form builder.
2. Use source-listed list, archive, export, move and delete actions.

## 19.15 Patrols and Checkpoints

### 19.15 Patrols and Checkpoints.1 Create Checkpoint

| **Primary user**                  | Admin                                                                      |
| --------------------------------- | -------------------------------------------------------------------------- |
| **Entry point**                   | Site > Security and Patrol > Checkpoints > Create                          |
| **User goal**                     | Create a checkpoint using exact source fields.                             |
| **System feedback**               | Validate unique ID and required scan configuration.                        |
| **Error prevention and recovery** | Do not add QR. Manual evidence options follow confirmed custom definition. |
| **Completion signal**             | Checkpoint is visible with Assigned, Last Scan, Location and Edit.         |

**Primary interaction flow**

1. Enter Checkpoint Name, Special Instruction, Can Be Scanned By, monitoring method, scan interval, extra scan options, NFC/Barcode type, Checkpoint ID, GPS accuracy and manual-scanning option.
2. Save and list checkpoint.

### 19.15 Patrols and Checkpoints.2 Create Tour Route

| **Primary user**                  | Admin                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Entry point**                   | Site > Tour Routes > Create                                                                     |
| **User goal**                     | Create a tour route and configure approved behavior.                                            |
| **System feedback**               | Show checkpoint count/order and timing summary.                                                 |
| **Error prevention and recovery** | Do not make optional thresholds mandatory; interruption handling uses configured notifications. |
| **Completion signal**             | Tour route is available for shift assignment.                                                   |

**Primary interaction flow**

1. Enter Description, Assigned To, Special Instructions, Estimated Duration, Grace Period, Weekly/Monthly recurrence and Tour Schedule.
2. Manage checkpoints and custom order rules.
3. Save for assignment through Schedule > Shift > Employee.

### 19.15 Patrols and Checkpoints.3 Monitor Tour Session

| **Primary user**                  | Admin or Supervisor                                                   |
| --------------------------------- | --------------------------------------------------------------------- |
| **Entry point**                   | Dashboard Scheduled Tours / Employee Tours / Site Tours               |
| **User goal**                     | Review tour progress and results.                                     |
| **System feedback**               | Show late/incomplete/missed status from configured rules.             |
| **Error prevention and recovery** | Delete requires confirmation; preserve listed history/audit behavior. |
| **Completion signal**             | Tour is reviewed or action completed.                                 |

**Primary interaction flow**

1. Use date and search filters.
2. Open session with Tour Name, Account, Employee, Result, Start, End and Duration.
3. Use listed PDF, Email, View Session or Delete actions.

## 19.16 Tasks, Communications and Help

### 19.16 Tasks, Communications and Help.1 Create Task

| **Primary user**                  | Admin or Supervisor                                                                                   |
| --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Dashboard Task Dispatch / Security Operations Quick Tasks                                             |
| **User goal**                     | Create a task based on selected Task Type.                                                            |
| **System feedback**               | Show task status and assignment result.                                                               |
| **Error prevention and recovery** | Do not impose universal priority/due-date/evidence fields unless the selected Task Type defines them. |
| **Completion signal**             | Task appears in New/Assigned/Open context.                                                            |

**Primary interaction flow**

1. Select Add Task.
2. System displays the fields applicable to that Task Type.
3. Assign to one approved target and save.

### 19.16 Tasks, Communications and Help.2 Review Task Worklist

| **Primary user**                  | Admin or Supervisor                                               |
| --------------------------------- | ----------------------------------------------------------------- |
| **Entry point**                   | Task listing                                                      |
| **User goal**                     | Find work using source filters and counts.                        |
| **System feedback**               | Keep filters and count changes visible.                           |
| **Error prevention and recovery** | Duplicate or unsupported assignment behavior must not be assumed. |
| **Completion signal**             | Task state is clear and current.                                  |

**Primary interaction flow**

1. Switch Created by Me, My Tasks, All Tasks or Archived.
2. Review Overdue, Done, Open and Total counts.
3. Open and update through source-defined actions.

### 19.16 Tasks, Communications and Help.3 Send Broadcast or Update

| **Primary user**                  | Admin or Supervisor with access                                |
| --------------------------------- | -------------------------------------------------------------- |
| **Entry point**                   | Communications > Broadcast / Updates                           |
| **User goal**                     | Send a message to selected user types or users.                |
| **System feedback**               | Show success/failure per approved channel.                     |
| **Error prevention and recovery** | Do not add unapproved scheduling, expiration or read-tracking. |
| **Completion signal**             | Message is sent and appears in its source-listed listing.      |

**Primary interaction flow**

1. Choose audience according to approved selection behavior.
2. Enter message content and submit.

### 19.16 Tasks, Communications and Help.4 Use Directory Actions

| **Primary user**                  | Admin or Supervisor                                          |
| --------------------------------- | ------------------------------------------------------------ |
| **Entry point**                   | Communications > Directory                                   |
| **User goal**                     | Find users and perform source-listed communication actions.  |
| **System feedback**               | Show selected-user count and completion feedback.            |
| **Error prevention and recovery** | Pending chat privacy/media/retention rules remain annotated. |
| **Completion signal**             | Chosen action opens or completes in user context.            |

**Primary interaction flow**

1. Search/list directory users.
2. Select users and choose Tag Users, Notify, Send Chat Message, Create Group Chat, Create Task or Export.

### 19.16 Tasks, Communications and Help.5 Resolve Help Desk Item

| **Primary user**                  | Admin or Supervisor                                                   |
| --------------------------------- | --------------------------------------------------------------------- |
| **Entry point**                   | Communications > Help Desk                                            |
| **User goal**                     | Work through Unassigned, Assigned to Me and All queues.               |
| **System feedback**               | Show assignment/status visibly.                                       |
| **Error prevention and recovery** | Do not merge Help Desk with Help > Resource Center/Talk to an Expert. |
| **Completion signal**             | Item is assigned or reviewed.                                         |

**Primary interaction flow**

1. Select a queue.
2. Open an item and use only source-listed help desk behavior.

## 19.17 Automations, Vehicles, Team Resources and Training

### 19.17 Automations, Vehicles, Team Resources and Training.1 Create Automation

| **Primary user**                  | Admin                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------- |
| **Entry point**                   | Automations > Add                                                            |
| **User goal**                     | Configure a custom Trigger > Conditions > Actions rule.                      |
| **System feedback**               | Show a human-readable rule summary before save.                              |
| **Error prevention and recovery** | No acknowledgment escalation; company-global scope remains unconfirmed.      |
| **Completion signal**             | Automation is listed and can generate one unresolved-event notification set. |

**Primary interaction flow**

1. Assign the Automation to one or more selected existing Sites. Do not auto-apply to future Sites.
2. Define trigger, conditions and actions from approved options.
3. Configure duplicate notification suppression.
4. Save and enable according to source behavior.

### 19.17 Automations, Vehicles, Team Resources and Training.2 Manage Vehicle Documentation

| **Primary user**                  | Admin                                                              |
| --------------------------------- | ------------------------------------------------------------------ |
| **Entry point**                   | Vehicle Management / Company Vehicle Documentation                 |
| **User goal**                     | Create vehicle records and manage documentation-only scope.        |
| **System feedback**               | Show document upload result and current record status.             |
| **Error prevention and recovery** | Do not add maintenance, fuel, mileage, GPS or equipment inventory. |
| **Completion signal**             | Vehicle and documents are available in listing/view.               |

**Primary interaction flow**

1. Create Vehicle with auto-generated Vehicle ID, unique License Plate, Make, Model, Year, VIN and Active/Inactive Status.
2. Use Purchased/Leased and Active/Inactive/All filters.
3. Add/view/export company vehicle documents.

### 19.17 Automations, Vehicles, Team Resources and Training.3 Review Team Resources

| **Primary user**                  | Admin or Supervisor as permitted                                                  |
| --------------------------------- | --------------------------------------------------------------------------------- |
| **Entry point**                   | Team Resources                                                                    |
| **User goal**                     | Access all source-listed Team Resources while detailed workflows remain pending.  |
| **System feedback**               | Mark pending modules with visible design annotation, not fabricated interactions. |
| **Error prevention and recovery** | Do not remove pending source modules.                                             |
| **Completion signal**             | User can locate every source-listed area.                                         |

**Primary interaction flow**

1. Navigate Team Member Manual, Rewards, Documents, Benefits, Celebrations, Time Off, Paid Policies, Insights, Text Message, Notices, Disciplinary Reports, HR Complaint and Hiring.
2. Use only source-listed Add, Active/Archived, Export, Search and filter actions.

### 19.17 Automations, Vehicles, Team Resources and Training.4 Manage Training Listings

| **Primary user**                  | Admin                                                                    |
| --------------------------------- | ------------------------------------------------------------------------ |
| **Entry point**                   | Training                                                                 |
| **User goal**                     | Manage confirmed Quizzes and RFI Academy listings.                       |
| **System feedback**               | Show status and result of listed actions.                                |
| **Error prevention and recovery** | Do not add courses, certificates or completion workflows until approved. |
| **Completion signal**             | Item is created or managed in the correct listing.                       |

**Primary interaction flow**

1. Open Quizzes or RFI Academy.
2. Use Add New, Active/Archived, Export, Search and Filter.

## 19.18 Settings, Audit, Help and Sign Out

### 19.18 Settings, Audit, Help and Sign Out.1 Configure Settings

| **Primary user**                  | Admin                                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Entry point**                   | Settings                                                                                           |
| **User goal**                     | Manage General, Operation and Back Office configurations.                                          |
| **System feedback**               | Show which scope is affected and the save result.                                                  |
| **Error prevention and recovery** | Zone Templates are excluded current phase; undefined settings remain pending rather than invented. |
| **Completion signal**             | Configuration is stored and visible.                                                               |

**Primary interaction flow**

1. Choose the exact source-listed subsection.
2. Complete or update its approved fields.
3. Save and preserve audit history where source-listed.

### 19.18 Settings, Audit, Help and Sign Out.2 Review Audit History

| **Primary user**                  | Admin                                                    |
| --------------------------------- | -------------------------------------------------------- |
| **Entry point**                   | Settings > Audit History / contextual history            |
| **User goal**                     | Understand who changed a record and when.                |
| **System feedback**               | Keep audit records read-only and chronologically clear.  |
| **Error prevention and recovery** | Do not allow operational history to be silently deleted. |
| **Completion signal**             | User can trace the relevant change.                      |

**Primary interaction flow**

1. Open the relevant audit/history view.
2. Review source-listed history information and associated record context.

### 19.18 Settings, Audit, Help and Sign Out.3 Use Help

| **Primary user**                  | Admin or Supervisor                                 |
| --------------------------------- | --------------------------------------------------- |
| **Entry point**                   | Help                                                |
| **User goal**                     | Access Resource Center or Talk to an Expert.        |
| **System feedback**               | Maintain portal context where possible.             |
| **Error prevention and recovery** | Do not substitute Help Desk queues for this module. |
| **Completion signal**             | User reaches the required support resource.         |

**Primary interaction flow**

1. Choose the required help option.
2. Open the source-defined support destination.

### 19.18 Settings, Audit, Help and Sign Out.4 Sign Out

| **Primary user**                  | Admin or Supervisor                                         |
| --------------------------------- | ----------------------------------------------------------- |
| **Entry point**                   | User profile / Sign Out                                     |
| **User goal**                     | End the authenticated session safely.                       |
| **System feedback**               | Show completion without exposing prior protected content.   |
| **Error prevention and recovery** | Unsaved form warning appears before sign-out if applicable. |
| **Completion signal**             | Session is ended.                                           |

**Primary interaction flow**

1. Select Sign Out.
2. System clears authenticated session and returns to login.

## 19.19A Final Approved Interaction Flows

### Report Approval

1. Open submitted report.
2. If auto-approval is enabled, display Approved immediately.
3. Otherwise show Pending Approval with Approve action only to eligible Admin/Super Admin other than submitter.
4. On edit, show version/history indicator and return to Pending Approval when approval is required.
5. Archive is a separate final action with confirmation.

### Form Completion

1. Open Form assignment.
2. Show assigned employees and individual Pending/Completed status.
3. Each employee completes once.
4. Allow edit only before Submit.
5. After Submit, lock response and update that employee to Completed.

### Shift Accept / Reject / Replacement

1. Guard receives assigned Shift.
2. Accept keeps assignment confirmed.
3. Reject immediately alerts Site Admin.
4. Replacement/swap request sends request to Admin; Admin manually chooses reassignment.
5. Do not design automatic open-shift claiming.

### High Priority Task Interrupting Tour

1. High Priority Task arrives while Tour is active.
2. Pause Tour timer and show Interrupted state.
3. Move Guard to task while preserving emergency controls.
4. On task completion, return directly to the interrupted Tour.
5. Exclude interruption time from Tour lateness calculations.

### Low Priority Task at Clock-Out

1. Guard attempts Clock Out.
2. If Low Priority Tasks remain, block normal clock-out and show remaining tasks.
3. Admin override requires reason and creates exception/ticket.

### Automatic Shift-End Clock-Out

1. At Shift end, if Guard has not clocked out, create ticket/notification.
2. After 10 minutes, automatically end payable Clocked-In state even if Guard remains inside Site polygon.
3. Keep Mobile App available for pending Tasks/Tours and clearly label Not Clocked In.

### Skill Expiration

1. Required expired Skill blocks new assignment.
2. Soft Skill shows warning only.
3. If an existing active/published Shift already exists, do not auto-remove; alert Admin.

### Automation Duplicate Event

1. For manually reported matching event inside 30 minutes, show duplicate warning.
2. Reporter may Cancel or Continue as Separate Event.
3. Auto-generated alerts never require approval.

### Client Site Switching

1. Client logs into Web Portal.
2. If assigned to multiple Sites, show Site selector in dashboard header.
3. Changing Site refreshes all Site-scoped content and permissions.

## 19.19 Required HCI Annotation for Every Figma Screen

- User goal: one sentence describing what the user is trying to accomplish.
- Entry point: exact navigation path or contextual link.
- Primary action: the single most likely next action.
- Secondary actions: only source-listed alternatives.
- System status: loading, saved, failed, stale, archived, inactive or pending as applicable.
- Validation and prevention: required fields, conflicts, restrictions and confirmations.
- Empty and no-results states: explain why no content appears and provide an approved next action where one exists.
- Completion feedback: identify what changed and where the user can verify it.
- Next logical step: link only to an existing approved module or contextual record.
- Pending annotation: visibly label unresolved behavior and avoid clickable final flows that imply approval.

## 19.20 Required Clickable Prototype Flows

- Supervisor login > Dashboard > Inactive Mobile User > ticket/detail > return to refreshed Dashboard.
- Dashboard > Clocked-In via Mobile > filtered attendance list > employee or shift context.
- Employee Listing > Add Employee > validation > created Employee Overview.
- Employee Profile > Site Ban > attempt schedule assignment > blocked assignment message.
- Sites > Create Site > Site Overview > create Job Type > assign Employee.
- Schedule Listing > create Schedule definition > blank cell > create Shift > updated published schedule notification.
- Reports Settings > create Category/Incident Category/Footer > create Custom Report > report submission listing > approval where configured.
- Site > create Checkpoint > create Tour Route > manage Checkpoints > assign Tour through Shift > view Tour Session.
- Dashboard Map > guard detail > Send Audio Message > success; remote Clock Out > confirmation > result.
- Automations > create no-GPS/no-activity rule > duplicate suppression > Inactive Mobile User ticket generated.
- Communications > Directory > select users > Create Task or Send Chat Message.
- Settings > Roles and Permissions > restrict module/site > Supervisor view showing only authorized content.

## 19.21 Usability Validation Checklist

| **Validation Area**   | **Test**                                                                  | **Pass Condition**                                         | **Applies To**            |
| --------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------- |
| Findability           | Ask user to locate a source-listed module or subsection without guidance. | Correct destination reached without dead end.              | All navigation            |
| Operational scan      | Ask Supervisor to identify the most urgent current issue.                 | Critical issue recognized before informational items.      | Dashboard/Live Operations |
| Form clarity          | Ask user to create employee/site/job type/report template.                | User understands sections, required fields and completion. | Create/Edit forms         |
| Error prevention      | Attempt banned-site assignment and invalid geo-fence clock-in context.    | System prevents or warns exactly as approved.              | Scheduling/Attendance     |
| Context retention     | Open report/tour/task from Site or Employee context and return.           | Original context and filters remain visible.               | Shared modules            |
| Accessibility         | Complete core flow using keyboard and screen-reader labels.               | All controls reachable, named and understandable.          | All core screens          |
| Recovery              | Trigger load, validation and upload errors.                               | User can retry without losing unrelated work.              | All interactive screens   |
| Supervisor efficiency | Complete top recurring tasks from Dashboard.                              | No unnecessary Admin configuration screens encountered.    | Supervisor portal         |

## 19.22 Scope Control for Figma Make

- Figma Make prompts and generated screens must use the verified source requirements and this HCI blueprint together.
- A visually useful shortcut may be designed only when it opens an already approved action or module; it must not create new business behavior.
- Pending items must be annotated and isolated from approved prototype paths.
- Every generated screen must be checked against the traceability Design ID and source requirements already present in this document.
- Any proposed feature beyond the approved source must be documented separately as a recommendation and excluded from the approved design file until accepted.

# Final Approved Design Control

This FINAL APPROVED design specification is controlled by RFI_Admin_Supervisor_Portal_Developer_Functional_Specification_FINAL_APPROVED.docx. Older contradictory statuses, role labels, report flags, pending labels, multi-geofence behavior, timesheet approval chains, or automation scope statements must not be used in Figma/Figma Make.