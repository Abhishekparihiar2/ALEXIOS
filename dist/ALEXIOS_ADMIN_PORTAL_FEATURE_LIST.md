# ALEXIOS ADMIN PORTAL FEATURE LIST (EXHAUSTIVE SPECIFICATION)

This document provides a highly detailed breakdown of every feature, section, sub-section, field, and user flow for the Alexios Admin Portal. It is mapped directly to the current React frontend navigation structure. The narrative style is intended to help developers understand the exact user flows, interactions, and required data points to provide accurate timeline estimates.

> [!NOTE]
> Sections marked with **[MISSING LOGIC]** indicate areas where the frontend UI exists, but backend API integration, data persistence, or complex business logic flows remain to be built.

---

## 1. Authentication / Login (`LoginPage` Module)
* **Login Flow**: An administrator or supervisor navigates to the login screen and enters their email or username and password into the respective fields. They can click "Sign In" to authenticate or "Forgot Password" to initiate a password reset flow. Upon successful authentication, the system evaluates their role permissions and redirects them into the main application shell (`AppShell`).
* **[MISSING LOGIC]**: The actual JWT session generation, token storage, and Role-Based Access Control (RBAC) validation logic on the backend need to be implemented.

---

## 2. Security Operations

### 2.1 Dashboard (`Dashboard` Module)
The Command Center Dashboard provides a high-level operational overview divided into four distinct visual quadrants, supported by interactive slide-over context drawers.
* **Security Operations (Q1)**: The admin views progress rings that visually track the day's completed versus expected tours, reports, and tasks. Clicking on this quadrant opens a dedicated **Security Operations detail page** divided into a header and 6 sub-quadrants:
  * **Header**: Contains an "All Sites" filter dropdown, global progress rings for Tours, Reports, and Tasks, and an Edit button.
  * **Active Tours (Top Left)**: Displays active tour progress cards showing the tour name, assigned guard, checkpoint progress (e.g., 4 of 10), scheduled time, elapsed time, and real-time status badges (e.g., "BEHIND").
  * **Live Activity (Top Middle)**: A scrolling feed of real-time system events with timestamps, event text, and actor. Includes quick action buttons at the bottom: "+ Assign Task", "+ Assign Tour", and "Create Report".
  * **Field Reporting Hub (Top Right)**: A menu of report categories (e.g., Reports to Approve, Hourly Log, Incident Report, Maintenance Log, Shift Summary). Highlights items requiring immediate supervisor review (e.g., "3 pending supervisor review").
  * **Quick Access (Bottom Left)**: A grid of 6 shortcut cards to specific operational areas: Location Tracks, Site Map, Tour Schedule, Checkpoints, Site Tasks, and Site Assets.
  * **Tasks (Bottom Middle)**: A priority-ordered task list with filter chips (All Tasks, AI Generated, Daily Routine, Supervisor, Client). Task cards are color-coded by urgency (Red for Critical/Overdue, Yellow for Imminent Deadline, Blue for Routine) and show the source (e.g., Athena AI Engine, Supervisor Order).
  * **Live Map (Bottom Right)**: Displays a site floor plan plotting the real-time locations of guards with a legend (blue dots for "On Duty", yellow dots for "Late").
* **Security Team (Q2)**: The admin views a quick summary of guard attendance. Clicking on this quadrant opens a dedicated **Security Team detail page** divided into:
  * **Header**: Contains status filter counters ("On Duty", "Late", "Behind", "Off Duty") and quick navigation buttons to "SCHEDULES", "TIMESHEETS", and the total number of assigned guards.
  * **Guard Cards (Top Section)**: A row of individual guard cards displaying the guard's avatar (initials), name, ID, role (e.g., Lead Guard, Patrol), and current location/zone. Each card compares the Scheduled start time vs. the Actual clock-in time, and features a color-coded border and badge reflecting real-time status (Blue for "ON DUTY", Yellow for "LATE", Red for "BEHIND").
  * **Team Activity (Bottom Left)**: A chronological feed of team-specific events with timestamps (e.g., clock-ins, shift starts, zone reassignments). Exceptions like late check-ins are visually highlighted.
  * **Shift Summary (Bottom Right)**: A grid of 6 KPI cards providing a snapshot of current shift metrics: "On Duty" (current vs total), "Hours Logged", "Next 4H Shifts", "Upcoming" (next shift time), "Late / Absent", and "Off Duty".
* **Communications (Q3)**: The admin monitors a real-time message feed showing communications from guards and automated system alerts. Emergency BOLO (Be On Look Out) or panic alerts are highlighted in red for immediate attention. Each message in the list displays the sender's avatar, name, a message preview, the timestamp, and an indicator if the message is unread.
* **Administration (Q4)**: The admin can quickly navigate to other areas of the portal by clicking on shortcut cards organized in a grid. These cards link directly to Users, Sites, Groups, Automations, Documents, Forms, Quizzes, and Settings.
* **Slide-Over Contextual Drawers**: When the admin clicks on various key performance indicators (KPIs) on the dashboard, a right-side drawer slides open.
  * **Coverage & Attendance Details**: Shows a percentage breakdown of present versus scheduled guards per site. Includes Employee roster details showing Guard Name, Position, Shift, Status badge, and variance time.
  * **Inactive Mobile Tickets**: Lists guards whose app sessions are inactive. Includes a search text input to filter tickets. Displays a table with Ticket ID, Date, Guard Name, Subject, Location, and a "Resolve" action button.
  * **Expiring Skills**: Displays a table of certifications nearing expiration. Includes a Search text input and a Category dropdown filter (Diplomas, Trainings, Languages, Licenses). Provides action buttons to export data as CSV, PDF, or Excel. The table displays Employee, Skill/Credential, Expiration, Time Remaining, Region, and Category.
  * **Guard Message Board**: Centralized inbox for guard communications, with a search text input and filter dropdown for message type (All, Current, Future, Expired). Message cards show Title, Body, Sender, Site, Time, and Audience.
  * **Live Feed**: Expanded historical event view. Includes an Event Type dropdown (Reports, Time clock, Patrol Tours, Panic Button Triggers, Checkpoint scan), a Date From picker, and a Date To picker. Events are displayed in a list showing an icon, text, site, and time.
* **Pop-Up Modals & Dialogs**: The dashboard heavily utilizes modals for quick actions without leaving the page.
  * **Live Map Coordinate Pin Details Modal**: Triggered from map pins. Shows Site Details (Status, Active Staff count, Staffing Alert). Shows a Guard Listing with buttons to "Clock Out" or "Clock Out & Sign Out". Includes Remote Device Broadcast Commands: "Message with Siren", "Send Audio Message", and "Reload Install/Config".
  * **Remote Clock Out Confirmation Dialog**: Triggered by the Clock Out buttons in the pin modal. Shows a warning about forced clock-outs and includes "Cancel Command" and "Confirm Clock-Out" action buttons.
  * **Audio Recorder Modal**: Triggered by the "Send Audio Message" action. Shows an animated audio visualizer and "Start Stream" / "Stop Recording" buttons to broadcast voice directly to guards.
  * **Send Update Modal (Broadcast)**: An admin can broadcast messages. Contains Target Grouping Type buttons (Specific Group, Specific User, User Type), a Select Target Recipients dropdown (populated based on the grouping type), a Message Content text area, and a "Send Broadcast" action button.
  * **Task Creation Modal Form**: A quick dispatch modal containing: Task Type dropdown (Dispatch, Quick, Recurring, Help Desk), Task Priority dropdown (High, Medium, Low), Task Title text input, Assigned Guard dropdown, Due Date dropdown, and Operational Site dropdown, followed by a "Dispatch Task" action button.
* **[MISSING LOGIC]**: The dashboard UI currently relies on static mock data. Backend aggregations, database queries for KPIs, real-time map pin plotting, WebRTC for live audio broadcasts, and WebSocket integrations for the real-time feeds must be built.

### 2.2 Scheduling (`Scheduling` Module)
* **View and Filter Flow**: The admin navigates to the Scheduling module. They can filter the schedule using a Search text input, a Job dropdown, and a Status dropdown. They can also toggle specific informational overlays via checkboxes: Minimized View, Daily Info, Availability Status, Labor Costs, Daily Health, or Working Hours.
* **Contextual Drawers**: The Scheduling module utilizes right-side slide-over drawers for creation, resolution, and management.
  * **Shift Drawer**: Used for Creating or Editing a Shift. Has two tabs:
    * **Shift Details Tab**: Contains inputs for Date picker, "All day" checkbox, Start Time, End Time, Shift title (optional text), Job dropdown, Employee dropdown (with "Unassigned (Open Shift)"), "Enable users to claim this shift" checkbox (if unassigned), Location/Address dropdown, Notes textarea, and an Attach file button. Includes footer buttons to "Publish Shift", "Save as Draft", "Update Shift", "Publish Draft", or "Update Draft".
    * **Shift Tasks Tab**: Contains an "Add a task..." text input and an "Add" action button to build a checklist.
  * **Tour Drawer**: Used for Creating or Editing a patrol Tour. Contains inputs for Tour Name, Date picker, Site dropdown, Start Time, End Time, Assigned To / Role dropdown, Duration (mins) number input, Grace Period (mins) number input, Special Instructions textarea, and Status dropdown (Active). Includes footer buttons to Save.
  * **Conflicts Drawer**: Displays scheduling conflicts with a red warning header. Shows employee name, job title, time, and site. Provides action buttons to "Resolve Shift" (opens Shift Drawer) or "Unassign".
  * **Publish Drawer**: Used to review Draft shifts before mass publishing. Lists drafts with "Edit" and "Publish" action buttons per shift. Includes a master "Publish X Shifts" action button at the bottom.
  * **Requests Drawer**: Organizes requests into three tabs:
    * **Time Off**: Lists leave requests showing employee, role, site, type, requested dates, duration, and affected shifts. Provides "Approve", "Decline", and "Details" action buttons.
    * **Open Shift Claims**: Lists open shifts and the employees who claimed them. Shows conflict alerts, qualifications, and hours. Provides "Approve" and "Decline" action buttons.
    * **Shift Replacements**: Lists shift swap requests between guards showing the requester, the target shift, and the replacer. Provides "Approve Swap" and "Deny" action buttons.
* **[MISSING LOGIC]**: Drag-and-drop interactions for moving shifts on the calendar/grid view, the backend approval workflows for shift swaps, and the logic to generate real-time overtime clash warnings.

### 2.3 Time Clock (`TimeClock` Module)
* **Time Clock Navigation**: The admin accesses the Time Clock module, divided into three main tabs. The module includes global filters for Site Dropdown and a Select Position Dropdown (multiselect with checkboxes), and a Settings icon that opens the Time Clock Settings Modal (Grace Period, Auto Clock-Out, Photo Verification checkbox, Enforce Geofence Location checkbox).
  * **Today Tab**: Displays daily KPI Cards (Scheduled Today, Currently Active, Running Late, Missed Clock-Out, On Time Off). Contains a Toolbar with Search text input, Status Filter Dropdown, and Date Range Picker popup. The main table lists guards, post/shift details, scheduled vs. actual clock in/out times (with geofence and missing punch flags), totals (OT/PTO), and status. Includes a Floating Bulk Action Bar (when rows are selected via checkboxes) with "Approve Exceptions", "Message Guards", and "Export Selected".
  * **Timesheets Tab**: Contains an Advanced Filters dropdown (Employment Type, Position), a Date Range Picker popup, a Status Filter Dropdown, a "Compare to Schedule" checkbox, a Requests button (opens Time Off and Shift Swap requests), and an Export dropdown (CSV, PDF, ADP Payroll). The table lists guards and their daily hours for the week. Clicking a day expands an Inline Row showing detailed clock in/out times, breaks, and geofence flags. Includes a Bulk Action Bar with "Approve Timesheets", "Message Guards", and "Reopen Periods".
  * **Live Map Tab**: Renders a real-time GPS map plotting site pins. Selected pins show a tooltip overlay with coverage status (Optimal, Partial, Understaffed).
* **Contextual Drawers & Modals**:
  * **Issues Side Panel Overlay**: Triggered from the Timesheets table when a guard has exceptions. Displays issues (missing punch, geofence, late, no show) with "View Details" and "Approve & Resolve" action buttons.
  * **Requests Side Panel Overlay**: Triggered from the Timesheets toolbar. Displays Time Off requests and Shift Swaps with "Deny" and "Approve" action buttons.
* **[MISSING LOGIC]**: Backend validation for real-time GPS coordinates and the integration with facial recognition checks during clock-in.

---

## 3. People

### 3.1 Employees (`Employees` Module)
* **Employee Listing Flow**: The admin manages employees using a comprehensive multi-tab layout:
  * **Tabs**: "All Users", "Admins", "Archived", "Employee Type", and "Department". The "Employee Type" and "Department" tabs open a management view with a text input to "Add New" and a table listing active types/departments with a "Delete" action.
  * **Toolbar**: Contains a Search text input (name, email, UID), a Department filter dropdown, a Status filter dropdown (Active, Inactive, On Leave, Terminated), a Filter toggle button, and Export buttons (CSV, PDF, Excel).
  * **Bulk Selection Bar**: Triggered when rows are selected via checkboxes. Displays a counter and actions for "Deactivate", "Export", and "Clear".
  * **Table View**: Columns include Checkbox, UID, Name (with Initials Avatar + active status dot), Last Name, Title, Email, User Type (with shield icons), Department, Status (color-coded pill), and an Actions menu (opens "Edit" and "Delete" popup).
* **Create Employee Flow**: To add a new staff member, the admin clicks the "+ Add Employee" button and fills out a comprehensive form. 
  * **General Information**: Inputs for Employee ID, First/Middle/Last Name, Job Title, Phone numbers, SMS consent checkbox, Gender dropdown, Email, Badge ID, Username, and Password fields.
  * **Address**: Inputs for Address Line 1 & 2, City, State, Zip, Country.
  * **Roles & Permissions**: Toggles for Admin Portal Access and Guard Mobile Access.
  * **Other Fields**: File upload for Profile Picture, multi-select for Tags, Fax input, Date pickers for Employment Date, Birthday, and Terminated Date.
* **Employee Profile Management Flow**: When viewing an employee, the admin navigates through several tabs:
  * **Overview Tab**: Displays a top profile card with Avatar, Name, Title, User Type, and Status. Contains a "Fields Grid" (UID, Email, Phone, Address, etc.), a "Portal Access" visual check (Admin Portal, Guard Mobile App, Supervisor View), and "Quick Stats" KPI cards (Reports Filed, Tours Completed, Shifts Worked, Skills Verified).
  * **Assigned Sites Tab**: Lists assigned sites (Site, Start/End Date, Rate). Includes buttons to "Make Primary", "Remove", and an "Assign Site" modal (dropdowns for Site, Start Date, Primary toggle).
  * **Site Bans Tab**: Tracks prohibited locations. Includes a warning banner and a "Ban Site" modal (dropdowns for Site, Reason textarea, Effective/Expiration Date pickers, Permanent/Temporary dropdown, Requested By, Internal Notes textarea, Attachment upload, Status dropdown).
  * **Emergency Contacts Tab**: Allows adding contacts (Name, Relationship, Phone). Includes filter chips ("All", "Active", "Archived").
  * **Notes on Employee / by Employee Tabs**: Rich-text log for managers to read or add internal HR notes.
  * **Availability Tab**: A visual weekly calendar grid (Mon-Sun, hourly slots) where the admin clicks blocks to cycle status: Available (Green), May Be Available (Yellow), or Not Available (Red).
  * **Employment & Policies Tab**: Configures structural working rules. Includes sub-sections for:
    * **Regular Working Hour**: Daily schedule layout (Monday to Sunday) defining base hours via time inputs or a "Not Working" toggle.
    * **Pay Rules**: Assignment of specific overtime policies from a dropdown.
    * **Scheduling Rules**: Number inputs defining hard constraints (Max/Min Hours per Week, Max Hours per Day, Max/Min Shifts per Week, Required Gap Between Shifts).
  * **Actions Tab**: A menu for quick operations: change/force password reset, generate ID card PDF, upload profile picture, terminate employee (form with Last Day date picker, Reason dropdown, and Comments text area), or view tracking location.
  * **Skills & Attributes Tab**: Table of certifications (Skill name, category, expiration date) with global search capabilities.
  * **Time Off Tab**: Table of the employee's time-off requests (Request ID, start/end dates, description, approval status).

### 3.2 Clients & Sites (`Clients` Module)
* **Sites Listing Flow**: The admin views a table of all clients and sites. The columns display Account Type (Regular, Multi-Site, Site Account), Company Name, Contact Name, Email, Phone, City, State, Country, Timezone, Status (Active, Inactive, Pending, Closed), Account Rep, Sales Rep, Website, Tags, and Added On date.
* **Create Site / Client Account Flow**: A 4-step wizard form to onboard a new client or site.
  * **Step 1 — Account Type**: Card selection between Regular Client, Multi-Site Client, Site Account, or Custom Account Type.
  * **Step 2 — Company Info**: Inputs for Company Name, Unique ID, Time Zone dropdown, Preferred Language dropdown, and Company Logo file upload.
  * **Step 3 — Contact & Address**: Main Contact inputs (First/Last Name, Job Title, Phone Main/Other, Fax, Email, SMS Consent toggle) and Address inputs (Address 1 & 2, City, State, ZIP, Country dropdown).
  * **Step 4 — Relations & Tags**: Employee Relations (Account/Sales Rep dropdowns) and Custom Fields (Website URL, Business Registration Number, Searchable Tags multi-select input).
* **Site Profile Management Flow**: When viewing a specific site, the admin manages site-specific configurations through an 11-tab layout.
  * **Overview Tab**: Displays a top identity card (Logo, Name, UID, Account Type, Status) and quick info grids for Site Details, Manager Contact, and Address. Includes a searchable/filterable list of Emergency Contacts with an "Add Contact" modal (Name, Role, Phone, Email, Priority).
  * **Post Orders Tab**: Table of uploaded SOPs (Title, Updated On, Edit/Delete). Includes an "Upload Order" modal with Title input and File dropzone.
  * **Positions / Job Types Tab**: Table of site-specific roles (UID, Title, TPT Hours, Bill Rate, Holiday Rate, Temporary flag). "Create Position" modal includes:
    * **Post Base Settings**: Name, ID, Description, Status, Schedule Memo.
    * **Service & Scheduling**: Duration, Begin Date, Break Rules.
    * **Payroll & Billing**: Pay Basis, Break/Holiday Pay.
    * **Regular Working Hour**: Toggle between Policy (dropdown) or Custom (Mon-Sun schedule builder with "Not Working" checkbox).
    * **Scheduling Rules**: Policy vs. Custom limits (Max hours/shifts per week, Min rest between shifts).
    * **Pay Rules**: Dynamic rule builder to configure Overtime/Holiday triggers (e.g., "After 40 hrs/wk -> Pay x1.5") with custom multipliers.
    * **Time Off Policy**: PTO dropdown, Days per year, Accrual rate.
    * **Requirements**: Text inputs for Conditional and Soft requirements.
  * **Assigned Employees Tab**: Table tracking assigned guards (Employee, Start Date, Rate, Unassign Date, Status), with actions for History, Edit Assignment, View Profile, and Remove. "Assign Employee" modal provides Skills/Department filters, an Employee preview card, assignment details (Position, Start Date, Rates), and a Primary contact toggle.
  * **Client Portal Tab**: Table of portal users (Name, Email, Phone, Last Login, Access status). "Create Client Portal Access" modal provides Name, Picture, Phone, Email, Password, Client Role, Force Password Change toggle, and Status.
  * **Banned Employees Tab**: Table tracking prohibited guards. "Ban Employee" modal provides Employee dropdown, Reason textarea, and Effective Date picker.
  * **Other Contacts Tab**: Table of secondary contacts. "Create Site Contact" modal includes Company, Name, Title, Gender, Badge ID, Phone, Email, Address, Language, Status, and a Bill-To checkbox.
  * **Site Actions Tab**: Quick operation cards to Edit Site or Close Account. The "Close Site Account" modal warns about terminating contracts/positions and requires typing "CONFIRM" to proceed.
  * **Notifications Tab**: Toggles to configure Connecteam-style automated alerts grouped by "Operations Reports", "Tours & Patrols", and "Time & Attendance" (e.g., Late Tour, Early Clock-Out).
  * **Geofencing & Security Tab**: Quick links to manage Checkpoints and Tour Routes. A map view for defining Geo-Fencing boundaries. Toggles for Mobile App Restrictions (Geo-Fence Clock-In, Geo-Fence Clock-Out, Mobile App Login).
  * **Live Activity Panel**: Displays a real-time feed of events at the site (Clock-Ins, Scans, Reports) with filter chips and actions to "Broadcast" messages.

---

## 4. Field

### 4.1 Checkpoints & Tours (`Checkpoints` Module)
* **Checkpoints Management Flow**: The admin accesses the Checkpoints tab to view a table of all existing checkpoints, displaying Name, Type (NFC, Barcode, GPS), Site, Monitoring style, Assigned, Last Scan, and Status. The admin can import checkpoints via an Excel dropzone or create a new checkpoint by providing:
  * **Basic Details**: Checkpoint Name, ID (NFC/Barcode value), and Location dropdown.
  * **Type & Assignment**: Checkbox group for Type (NFC, Barcode, GPS) and radio toggles for Scan By (All Positions vs Selected).
  * **Monitoring Rules**: Radio toggles for Do Not Monitor, Part of Tour, or Regular Interval (with minute/hour numeric inputs).
  * **Advanced Rules**: Toggles for Extra Scan Option (Log, Message, Report), Exception Verification (Range, Yes/No, Multi), GPS required accuracy, and Manual Scanning permissions.
* **Tours Management Flow**: On the Tours tab, the admin views cards of tour routes showing Status, Site, Assigned To, Duration, Grace, Recurrence, Schedule, and Checkpoint count. The "Create Tour Wizard" is a multi-step modal:
  * **Step 1 - Tour Details**: Tour Name, Site dropdown, Assigned To (All Qualified Guards, Specific Employees, Position, Shift), Estimated Duration (minutes), Grace Period (minutes), Special Instructions, and Status.
  * **Step 2 - Checkpoints**: A split-panel interface to search available site checkpoints (left) and add them to the Selected Route (right). Includes a toggle for "Fixed Order" (with drag-and-drop ordering arrows) versus "Any Order".
  * **Step 3 - Schedule & Review**: Recurrence configuration (Once, Daily, Weekly, Monthly) with day-of-week toggles and time pickers. Provides a human-readable schedule preview and an Operational Rules checklist before saving.
  * **Manage Checkpoints Modal**: A quick-edit drag-and-drop list view to reorder checkpoints and toggle the "Required" flag on individual stops for an existing tour.
* **Logs Flow**: A searchable table of all recent scans, showing Time, Employee, Account/Site, Checkpoint, and Tour. Includes an Export button.
* **Locations Flow**: A management table for logical site zones (Location Name, Site, Status, Added By). The "Add Location" modal allows selecting a site and dynamically adding multiple text inputs to batch-create location names at once.

### 4.2 Reports & Incidents (`Reports` Module)
* **Report Forms (Templates) Flow**: The admin manages report templates through the Reports tab. The interface provides a searchable table of templates displaying Report Name, Category, Available To, Approval requirement, Status, and Last Updated.
* **Report Builder Wizard**: Creating a new report template utilizes a 5-step wizard:
  * **1. Overview**: Form for Basic Information (Report Name, Description), Report Type (Report, Dispatchable Task, Ticket, IN/OUT Log), Category, Status (Active/Archived), and a "Save as Template" checkbox.
  * **2. Form Builder**: A drag-and-drop interactive canvas to assemble the report fields. The admin drags from a categorized Fields Library on the left (Text & Data, Selection, Date & Time, Media & Evidence, Lists & Operational, Drawing). Selecting a field on the canvas opens a Field Settings panel on the right (Label, Help Text, Required toggle).
  * **3. Access & Assignment**: Configuration for "Available To Scope" (All Sites, Specific Sites, All Guards, Specific Guards). Displays an Access Preview summary.
  * **4. Workflow**: Settings to enforce an Approval Workflow (No Approval Required vs. Approval Required).
  * **5. Preview**: An interactive mobile app preview showing exactly how the guard will see the report on their device.
* **Incident Categories Builder Flow**: The admin manages incident classifications. Creating a category uses a 3-step wizard:
  * **1. Overview**: Incident Type Name, Incident Code (e.g., INC-FIRE), Description, Severity Level (Critical/High/Medium/Low), Region, Parent Category, Default Group, and Status.
  * **2. Form Builder**: Similar drag-and-drop form builder as the report builder to define incident-specific data collection.
  * **3. Preview**: Mobile app preview of the incident form.
* **Completed Reports Dashboard Flow**: A comprehensive view of submitted data with three primary tabs:
  * **Reports Tab**: Table of submitted reports (Report Details, Submitted By, Location, Date & Time, Status). Clicking a row opens a detailed view.
  * **Patrol Tours Tab**: Table of completed tours (Tour Name, Guard, Site, Start, End, Duration, Checkpoints Hit/Total, Result, Status). Clicking a row opens a slide-out drawer with a timeline of checkpoint scans.
  * **Summary by Shift Tab**: Table aggregating shift data (Shift Name, Site, Supervisor, Guards Count, Total Tours, Total Reports, Critical Events, Status). Clicking a row opens a Shift Briefing drawer.
  * **Filters & Actions**: A unified toolbar for all tabs offering a Date Range Picker calendar, Location filter, Guard filter, Type filter, Status filter, and a global "Export CSV" button.
* **Footers Flow**: On the Footers tab, the admin can configure custom text or image uploads that will appear at the bottom of exported PDF reports.

### 4.3 Tasks & Dispatch (`Tasks` Module)
* **Tasks & Dispatch Management Flow**: The admin views a comprehensive list of all operational tasks, which serve as dispatch assignments. The view toggles between "List", "Create", and "Detail".
  * **Tasks List**: A searchable and filterable table displaying Task Title, Type (Dispatch Task, Recurring Task, Quick Task, Help Desk Ticket), Site, Due Date, Assignee (Employee, Job Type, Supported Group), Author, and Status (New, In Progress, Completed, Overdue) with colored status chips.
  * **Create Task**: A wizard to assign dispatches to Field Guards or Job Types, setting start/due dates, attaching required subtasks, and linking to specific sites.
  * **Task Details**: A deep dive showing task progress, subtask checklists, and an activity audit log.

### 4.4 Post Orders (`Documents` Module)
* **Post Orders & Policies Flow**: Within the centralized `Documents` module, the admin manages company-wide handbooks, policies, and Post Orders. 
  * **Document List**: A dashboard displaying document categories (e.g., Company Policies, Post Orders, SOPs, Manuals) with counts. The main table lists Document Name, Category, Site / Scope, Created By, Updated, and Status (Active/Archived). 
  * **Filters & Actions**: Quick filter chips for Site, Employee, and Date. Actions include Export, Create Pack (to bundle documents), and Add New.
  * **Creation & Scoping**: Admins upload files and specify the precise "Scope" (All Sites vs. specific Client Sites like 'Downtown Financial Center') to ensure guards only see Post Orders relevant to their assigned shift.

---

## 5. Communication

### 5.1 Communications (`Communications` Module)
* **Messaging Flow**: The admin uses the Chat interface to send direct messages to individuals, participate in group chats, or send broadcast announcements to the entire team. In the Message Board view, the admin can create sticky messages by providing a Title, Message Body, and selecting Target Sites/Groups that guards are required to read when they clock in.

### 5.2 Activity Journal (`ActivityJournal` Module)
* **Audit Review Flow**: The admin accesses the System Audit Log to track all actions taken by administrators within the portal. The table lists the Timestamp, Admin Name, Action Taken, Affected Module, and Target Record. The admin can filter this log by the Action Type dropdown (Created, Deleted, Updated) and by Date pickers.

### 5.3 Manage Tickets / Exceptions (`Tickets` Module)
* **Ticketing Flow**: The admin uses the Help Desk dashboard to manage operational exceptions. They can view tickets categorized via tabs: Unassigned, Assigned to Me, or All Tickets. The ticket table displays the Ticket Type, Guard Name, Location, Subject, and Status. The admin can click a ticket to add resolution notes and change the status to Resolved.

---

## 6. Resources

### 6.1 Skills & Certifications (`Skills` Module)
* **Skill Creation Flow**: To track a new qualification, the admin fills out a form providing the Skill Name, selecting a Category from a dropdown (Diplomas, Licenses, Memberships), and toggling a checkbox for whether the skill requires an expiration date.
* **Skill Management Flow**: The admin clicks into a specific skill to view its detail tabs:
  * **Overview**: Summarizes the skill details.
  * **Employees**: Displays a table of all guards currently holding this certification, with a button to Assign Employee (opens a guard search dropdown and expiration date picker).
  * **Positions**: Displays a table of job types that require it, with a button to Link Position.
  * **Expiring / Expired**: Displays a filtered table alerting the admin to guards whose certifications need renewal.
  * **History**: Provides an audit log table of when the skill was assigned or revoked.

### 6.2 Documents & Policies (`Documents` Module)
* **Document Management Flow**: The admin uses this centralized repository to distribute company-wide handbooks and policies. They fill out an upload form by selecting a File, categorizing the Document Type from a dropdown, and defining the Target Audience via multi-select checkboxes (e.g., all employees, specific groups, or specific sites).

### 6.3 Training (`Training` Module)
* **Training Management Flow**: The admin navigates between the Quizzes tab and the RFI Academy tab.
  * **Quizzes**: The admin creates multiple-choice assessments by providing a Quiz Name, Passing Score (number input), and adding questions with multiple Choice inputs and a Correct Answer radio button.
  * **RFI Academy**: The admin creates larger course modules by uploading video files or documents.
* **Listing Table**: Both tabs display a table showing the Training Name, Passing Score, Assigned Employees, and the overall Completion Rate percentage.

### 6.4 Vehicles (`Vehicles` Module)
* **Fleet Management Flow**: The admin manages company vehicles by navigating between:
  * **Overview**: Displays a table of vehicles, their maintenance schedules, and current operational status.
  * **Documents**: Provides upload forms for vehicle registration, insurance cards, and inspection reports.
* **Create Vehicle Flow**: To add a vehicle to the fleet, the admin fills out a form providing the Vehicle ID, License Plate, Make, Model, Year, and Operational Status dropdown.

---

## 7. Administration

### 7.1 Automations (`Automations` Module)
* **Rule Configuration Flow**: The admin uses the rule engine to set up automated alerts. They construct rules by providing:
  * **Rule Name** (Text input)
  * **Triggers** (Dropdown: Late Tour, Panic Button Pressed, Clock In/Out Exception, Expiring Skill)
  * **Actions** (Dropdown: Send SMS, Send Email, Create Ticket, Broadcast Alert)
  * **Target** (Input for email addresses or phone numbers)
* **[MISSING LOGIC]**: The backend execution engine that evaluates these rules and fires the actions is fully pending implementation.

### 7.2 Payroll & Back Office (`Payroll` Module)
* **Payroll Configuration Flow**: The admin configures the financial backbone of the system through a robust set of 13 granular tabs:
  * **Overview**: Dashboard view monitoring KPIs like active schedules and calculation exceptions.
  * **Policies & Pay Rules**: Forms to define how standard hourly rates interact with site-specific rates (e.g., toggles for "Site Rate Overrides Global Rate").
  * **Payroll Schedules**: Forms to set payment frequencies (Dropdown: Weekly, Bi-Weekly, Semi-Monthly) and define the start/end days of the pay period.
  * **Overtime Rules**: Number inputs to define thresholds (e.g., Daily > 8hrs triggers 1.5x, Weekly > 40hrs triggers 1.5x, California 7th Day Rules).
  * **Pay Codes**: Forms to customize specific earnings/deduction codes (Code Name, Multiplier, Taxable checkbox).
  * **Compensation**: Forms to make base pay adjustments or define commission structures.
  * **Break Management**: Toggles to define paid or unpaid break penalties (e.g., deduct 30 mins if shift > 6 hours).
  * **Employee Classes**: Forms to group workers by union or exempt status for specific reporting.
  * **Holidays**: Calendar view to set recognized holidays and number inputs for premium multipliers (e.g., 1.5x on Christmas).
  * **Export Formats**: Dropdown configurations for data outputs compatible with external providers like ADP, Paychex, or Quickbooks.
  * **Bill Items**: Forms to create configurable invoice line items for clients.
  * **Audit History**: A table logging all payroll modifications.
  * **Settings**: Global payroll configuration toggles (e.g., "Require Manager Approval for Timesheets").

### 7.3 Settings (`Settings` Module)
* **Global Settings Flow**: The admin accesses the general configuration forms to update the Company Name, Address, Notification Sender Email, System Timezone dropdown, and Password Security Policies (toggles for require numbers, special characters, length).

### 7.4 Groups & Segments (`Groups` Module)
* **Group Management Flow**: To organize employees, the admin fills out a Create Group form, providing a Group Name and defining inclusion rules via an expression builder (e.g., Dropdown "Region" equals "Region A"). They view a listing table showing the Group Name, Member Count, and any linked policies, allowing for easy bulk messaging and schedule distribution.

### 7.5 Help & Help Desk (`Help` / `HelpDesk` Module)
* **Support Flow**: If the admin needs assistance with the portal, they access this module to view Help documentation, click to contact RFI Support (opens an email modal), or submit IT tickets for internal platform issues (Subject and Description text areas).

---
*Document Generated Automatically from Current Codebase structure. All fields match the implementation specs within the `src/pages` directory.*
