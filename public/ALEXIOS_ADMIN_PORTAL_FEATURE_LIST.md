# ALEXIOS ADMIN PORTAL FEATURE LIST (EXHAUSTIVE SPECIFICATION)

This document provides a highly detailed breakdown of every sub-feature, section, sub-section, field, and table column for the Alexios Admin Portal, mapped directly to the current React frontend navigation structure.

> [!NOTE]
> Sections marked with **[MISSING LOGIC]** indicate areas where the frontend UI exists, but backend API integration, data persistence, or complex business logic flows remain to be built.

---

## 1. Authentication / Login (`LoginPage` Module)
* **Login Form Fields**: Username/Email, Password.
* **Actions**: "Sign In", "Forgot Password".
* **User Flow**: Authenticates user and redirects to `AppShell` based on assigned role permissions.
* **[MISSING LOGIC]**: Actual JWT session generation and Role-Based Access Control (RBAC) validation.

---

## 2. Security Operations

### 2.1 Dashboard (`Dashboard` Module)
The Command Center Dashboard is composed of four quadrants and slide-over context drawers.
* **Q1: Security Operations (KPIs & Feeds)**
  * **Progress Rings**: Tours (Completed vs Expected), Reports (Completed vs Expected), Tasks (Completed vs Total).
  * **Live Activity Feed**: Scrolling list of system events (Time, Event Text, Actor).
* **Q2: Security Team (Attendance Summary)**
  * **Summary Counters**: Total Assigned, On Duty, Late, Behind.
  * **Guard Cards**: Individual cards for each guard displaying:
    * Guard Avatar (Initials)
    * Guard Name & ID (e.g., J. Rivera, S-041)
    * Scheduled Start Time
    * Actual Clock-in Time (with variance, e.g., "+2m")
    * Real-time Status Badge (ON DUTY, LATE, BEHIND)
* **Q3: Communications (Live Feed)**
  * **Emergency Alerts**: Red-highlighted BOLO or Panic alerts.
  * **Message List**: Sender Avatar, Sender Name, Message Preview, Timestamp, Unread Indicator.
* **Q4: Administration (Quick Links Grid)**
  * Clickable cards navigating to Users, Sites, Groups, Automations, Documents, Forms, Quizzes, Settings.
* **Slide-Over Drawers (Contextual Overlays)**
  * **Coverage & Attendance Details**: Breakdown of present/scheduled guards per site.
  * **Inactive Mobile Tickets**: List of inactive mobile app sessions. Fields: First Name, Last Name, Subject, Location.
  * **Expiring Skills**: Table of expiring certifications. Fields: Name, Skill, Category, Description.
  * **Guard Message Board**: Centralized inbox for guard communications.
  * **Live Feed**: Expanded historical event view with Date and Category filters.

### 2.2 Scheduling (`Scheduling` Module)
* **View Modes**: By User, By Job, List View, Calendar View.
* **Filters**: Week, Dates, Groups.
* **Toggles**: Minimized View, Daily Info, Availability Status, Labor Costs, Daily Health, Working Hours.
* **Shift Assignment Form**: 
  * Select Employee, Select Site/Job, Start Time, End Time, Notes, Break Rules.
* **Shift Drawer Tabs**: Details, Tasks, Templates.
* **Requests Drawer Tabs**: Time Off, Claims, Replacements.
* **[MISSING LOGIC]**: Drag-and-drop shift assignment, shift swap approvals, overtime clash warnings.

### 2.3 Time Clock (`TimeClock` Module)
* **Tabs**:
  * **Today**: Current day's clock-ins.
  * **Timesheets**: Historical listing of all timesheets with columns for Employee Name, Date, Clock In, Clock Out, Total Hours, Status (Approved/Pending), Exceptions.
  * **Live Map**: Real-time GPS view of clocked-in guards.
* **Actions**: Approve, Edit Time, Add Manual Entry.
* **Manual Entry Form**: Employee, Site, Start Time, End Time, Reason for manual entry.
* **[MISSING LOGIC]**: Real-time GPS validation and facial recognition sync.

---

## 3. People

### 3.1 Employees (`Employees` Module)
* **Employee Listing Table**
  * **Columns**: UID, Name, Title, Email, User Type, Department, Status, Added By, Actions (View, Edit).
  * **Filters**: Department, Zones, Status, Global Search.
  * **Export Options**: CSV, PDF, Excel.
* **Add Employee Form**
  * **General Information**: Employee ID, First/Middle/Last Name, Job Title, Phone, SMS Consent, Gender, Email, Badge ID, Username, Password, Confirm Password.
  * **Address**: Address Line 1 & 2, City, State, Zip, Country.
  * **Roles & Permissions**: Admin Portal Access Toggle, Guard Mobile Access Toggle.
  * **Other Fields**: Profile Picture, Tags, Fax, Employment Date, Birthday, Terminated Date.
* **Employee Profile View (Tabs)**
  * **Overview**: Basic contact details, assigned sites list, emergency contacts, HR notes.
  * **Assigned Sites**: Table (Site, Start Date, Rate, End Date, Is Primary). Assign Form (Site, Start Date, Rate).
  * **Availabilities**: Weekly visual calendar grid showing 24/7 blocks (Available, May Be, Not Available).
  * **Skills & Attributes**: Table of assigned skills (Name, Category, Expiration Date).
  * **Time Off**: Table of requests (Request ID, From, To, Description, Status).

### 3.2 Clients & Sites (`Clients` Module)
* **Sites Listing Table**
  * **Columns**: Account Type, Site Name, Address, Manager, Status, Actions.
  * **Filters**: Account Type, Status.
* **Create Site Form**
  * **Account Type**: Commercial, Residential, etc.
  * **Company Information**: Name, Unique ID, Timezone, Logo, Preferred Language.
  * **Main Contact**: Name, Job Title, Phone, SMS Config, Fax, Email.
  * **Address**: Street, City, State, Zip, Country.
  * **Employee Relations**: Account Rep, Sales Rep.
* **Site Profile View (Tabs)**
  * **Overview Tab**: Key contacts, mapped location, summary statistics.
  * **Post Orders / SOPs Tab**: Upload Form (File, Title, Description) and Table (Title, Upload Date, Edit/Delete).
  * **Positions Tab**: Create Position Form (Post Name, ID, Description, Schedule Memo, Pay Setting, Bill Rate, Holiday Rate multiplier) and Table (Position Title, Bill Rate, Holiday Rate).
  * **Assigned Employees Tab**: Manage which employees can work here and set site-specific pay rates.
  * **Client Portal Tab**: Manage external stakeholders who can log in. Create Client Form (Name, Phone, Email, Password, Role Permissions).
  * **Banned Employees Tab**: List of guards prohibited from this location.
  * **Other Contacts Tab**: Facility managers, emergency responders, etc.

---

## 4. Field

### 4.1 Checkpoints & Tours (`Checkpoints` Module)
* **Tabs**:
  * **Checkpoints**: Listing Table (Name, Scan Type, Assigned Sites, Last Scan, Location map icon, Edit). Create Checkpoint Form (Name, Instructions, Config (NFC/Barcode/GPS), Intervals, Extra Scan Options).
  * **Tours**: Tour Routes listing. Create Tour Form (Description, Assigned To, Special Instructions, Estimated Duration, Grace Period, Recurrence, Checkpoints Included).
  * **Logs**: Table of all recent scans with timestamps and guard associations.
  * **Site Locations**: List of logical zones or areas (Name, Site, Status, Added By).

### 4.2 Reports & Incidents (`Reports` Module)
* **Tabs**:
  * **Report Settings**: Drag-and-drop form builder for DARs and Incident Reports.
  * **Report Categories**: Organize custom report types.
  * **Incident Categories**: Categorize critical incidents (e.g., Use of Force, Vandalism).
  * **Footers**: Custom footer text/images for exported PDF reports.
* **Completed Reports Listing**: Table with columns for ID, Type, Flags (Incident), Date, Reported By, Account, Status, Actions (View PDF, Email, Delete).

### 4.3 Forms (`Forms` Module)
* General-purpose internal forms (HR Complaints, Vehicle Inspections, Disciplinary Reports).
* **Listing Table**: Form Name, Submitted By, Date, Status.
* **Actions**: Create New Form Template, Export Data.

### 4.4 Tasks & Dispatch (`Tasks` Module)
* **Tabs / Views**:
  * **All Tasks**: General list view.
  * **Overview**: Dashboard-style summary of task completion.
  * **Subtasks**: Broken-down checklist items for parent tasks.
  * **Activity**: Audit log of task-related actions.
* **Task Listing Table**: Task Title, Type, Priority (High/Med/Low), Assignee, Due Date, Status (New, In Progress, Done).
* **Create Task Form**: Title, Description, Type Dropdown, Assign To (Specific Guard or Site), Priority, Due Date.

---

## 5. Communication

### 5.1 Communications (`Communications` Module)
* **Chat Interface**: Direct messaging, Group chats, Broadcast messaging (announcements).
* **Message Board (Admin View)**: Create global or site-specific sticky messages for guards to read upon clock-in.

### 5.2 Activity Journal (`ActivityJournal` Module)
* **System Audit Log**: Tracks all admin actions.
* **Columns**: Timestamp, Admin Name, Action Taken, Module, Target Record.
* **Filters**: Action Type (Created, Deleted, Updated), Date.

### 5.3 Manage Tickets / Exceptions (`Tickets` Module)
* **Ticketing Dashboard**: Unassigned, Assigned to Me, All Tickets.
* **Ticket Details**: Ticket Type (e.g., Inactive Mobile), Guard Name, Location, Subject, Status (Open, Resolved).

---

## 6. Resources

### 6.1 Skills & Certifications (`Skills` Module)
* **Create Skill Form**: Skill Name, Category (Diplomas, Licenses, Memberships), Show Expiry Date toggle.
* **Skill Detail Tabs**:
  * **Overview**: Summary details of the skill.
  * **Employees**: Guards currently holding this certification.
  * **Positions**: Job types that require this certification.
  * **Expiring / Expired**: Guards whose certs need renewal.
  * **History**: Audit log of assignments.

### 6.2 Documents & Policies (`Documents` Module)
* Centralized repository. 
* **Upload Form**: File, Document Type, Target Audience (All, specific groups).

### 6.3 Training (`Training` Module)
* **Tabs**:
  * **Quizzes**: Create multiple-choice assessments.
  * **RFI Academy**: Larger course modules.
* **Listing Table**: Name, Passing Score, Assigned Employees, Completion Rate.

### 6.4 Vehicles (`Vehicles` Module)
* **Tabs**:
  * **Overview**: Fleet management details, maintenance schedules.
  * **Documents**: Uploaded registration, insurance, etc.
* **Create Vehicle Form**: ID, License Plate, Make/Model/Year, Status.

---

## 7. Administration

### 7.1 Automations (`Automations` Module)
* **Rule Engine (Triggers & Actions)**.
* **Supported Triggers**: Late Tour, Panic Button, Clock In/Out Exception, Expiring Skill.
* **Supported Actions**: Send SMS, Send Email, Create Ticket, Broadcast Alert.
* **[MISSING LOGIC]**: The execution engine backend is fully pending.

### 7.2 Payroll & Back Office (`Payroll` Module)
* **Tabs & Navigation**:
  * **Overview**: KPIs (Active Payroll Schedules, Calculation Exceptions).
  * **Policies & Pay Rules**: Create pay rules, define hourly rates vs site rates.
  * **Payroll Schedules**: Set frequency (Weekly, Bi-Weekly, Semi-Monthly).
  * **Overtime Rules**: Define overtime thresholds (Daily > 8hrs, Weekly > 40hrs).
  * **Pay Codes**: Customize specific earnings/deduction codes.
  * **Compensation**: Base pay adjustments.
  * **Break Management**: Define paid/unpaid break penalties.
  * **Employee Classes**: Group workers by union/exempt status.
  * **Holidays**: Set holiday calendar and premium multipliers (e.g., 1.5x).
  * **Export Formats**: Configure output formats compatible with ADP, Paychex, Quickbooks.
  * **Bill Items**: Configurable invoice line items.
  * **Audit History**: Payroll specific logs.
  * **Settings**: Global payroll config.

### 7.3 Settings (`Settings` Module)
* **Configuration Forms**: Company Name, Address, Notification Sender Email, System Timezone, Password Policies.

### 7.4 Groups & Segments (`Groups` Module)
* **Create Group Form**: Group Name, Inclusion Rules (e.g., "All Guards in Region A").
* **Listing**: Group Name, Member Count, Linked Policies.

### 7.5 Help & Help Desk (`Help` / `HelpDesk` Module)
* Integration for internal platform support (Help documentation, Contact RFI Support, Submit IT Tickets).

---
*Document Generated Automatically from Current Codebase structure. All fields match the implementation specs within the `src/pages` directory.*
