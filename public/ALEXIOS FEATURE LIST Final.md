**ALEXIOS FEATURE LIST**

**Funtionality DOC:** [**https://chatgpt.com/c/6a6a1747-6f84-83ee-ba65-5e11dd947253**](https://chatgpt.com/c/6a6a1747-6f84-83ee-ba65-5e11dd947253)

**Admin/Supervisor Web App:**

1\. Authentication/ Log in – ALEXIO ADMIN and Supervisor/Employee will be able to login using option and redirected to its dedicated dashboard as per user role and only accessible to allowed modules of the platform.

2\. Dashboard:

2.1 Platform Statistics – Will show count for below grids:

- **CLOCKED-IN VIA MOBILE** – Total number of guards clocked in today. Detail page will list out the all clocked in users details including Name, Position, Clocked in time, Shift Name with filter by status dropdown (Current, Current (Uncovered), All Shifts, Covered, Late Shift), Search Box.
- **Inactive Mobile User** – Total number of Guard Clocked-in but mobile app is not active. System will automatically generate a ticket and that will be listed out on the dedicated page with fields as Date, Ticket Type, First Name, Last Name, Subject, Location, Status, and View.
- EXPIRED AND EXPIRING SOON SKILLS – Total number of Skills active and expiring soon. A detail page will list out all employees with column as Employee Name, Expiration Date, Expires, Description, Region, Category. A filter for Categories (Diplomas, Trainings & Special Skills, Languages, Licenses & Permits, Memberships, Prior Career Skills, Uniforms), Date Filter, Export (Excel, CSV, PDF)
- Reports to Approve (Last 7 Days) – Reports pending for admin approval before allowing publishing to the client portal. On Click will redirect to Reports page of Operation Report module.
- MESSAGE BOARD – Count of Message pending to be read created by Guards. Detail page will list out all the messages sent with Sender Name, Title, Message, Date and Time, Site, Viewable by. Filters for Category, Type (Current Message, Future Message, Expired Messages) and Global Search.
- Time off Request – Counts of pending time-off request, on click will be redirected to the Time off page.

All grids will open its dedicated listing page having all details as per count.

2.2 Activity Log – This section on the dashboard will list out all activities.

- Latest – Will list out all current day activities.
- View History – Will allow to see all date wise activities listed.
- Filter – Option to filter activities by category as (All Events, Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scans, Runsheet Patrol Events, Remote Actions.) and Date (From –to)

2.3 Attendance – Will list out all the guards clocked in who were scheduled today shiftwise. Filter would be Current, Current (uncovered), All Shifts, Covered, Late Shift and a global search. (should follow connecteam)

2.4 Scheduled Tours listing – This section will list out all schedule created site wise for current day. Table includes Schedule Timing, Site Name, Schedule Title, Last Performed by.

2.5 Task Dispatch – This section will list out all tasks created. A button to create add Task will open a form based on Task Type selected and once filled it would be listed under this section with filters as Dropdown (New Tasks, In Progress, New and In Progress, Completed) and Assign Status (All, Not Assigned, Assigned to any, Assigned to employee.

2.6 Show Map – This section will list out Guards checked in and option to see map location. Option to see all activities of the guard will also be there that will open a popup will all activities since clocked in with filter Choose One, Message With siren, Remote Speak, Record Audio, Reload install, Clock out and Stay Signed in, Clock out and Sign out.

2.7 Global Search option (Customer, Contacts, Employees, reports Etc) – This option will also to search all type of user by name and redirect to its detail page.

2.8 Send an update – This option allows admin to send updates in bulk to all employees based on Specific Group, Specific user or User type.

2.9 Sub Modules

2.9.1 Reports Settings

- - - - Custom Reports Form Listing – Allow admin to create customized report. - Custom Report Listing with Filters by Categories, Active Archive, Search

Edit – Allow

Field Setup

Count (show number of reports generated)

- - - - - Create Custom Report

Custom Report Form

- - - - - New Category

Add Category

- - - - Custom Report Categories - Add New Category - Category Listing – Edit, Archive - Filters- Active, Archived - Incidents Categories - Incident Categories

Create Incident Category

Category listing (Column Code, Region, Discription, Level, Parent Category, Default Group

Actions

Edit

Sub form

Filters (All Groups, Default Groups), Global Search

- - - - Report Footers - Add Footer - Footer Listing (Text/image format) - Edit Footer

2.9.2 Vehicle Management

- Create Vehicle
- Vehicle Listing (ID, License, Make/Model/Year, Status)
- Filters (dropdown - All Vehicle, Purchased, Leased), Status (Active, Inactive, All)
- Actions
  - View

2.9.3 Schedule – Redirect to Live Schedule Page listing – Use Connecteam Version

2.9.4 Company Activity Journal –

- Will list out all activities done by admin
- Filters - types (banned, Notes, Terminated, Reactivated)

2.9.5 System Exceptions – Redirect to Ticketing Module having all ticket categories and ticket generated under them.

3\. Employee

3.1 Add Employee

- General Information – This tab will include fields as Employee ID, First Name, Middle Name, Last Name, Job Title, Phone (Main), SMS Notification Consent (Main Phone), Phone (Other), SMS Notification Consent (Other Phone), Gender, Email, Government Badge ID, Username, Departments, Create a Password, Confirm Password
- Address : This tab will include fields as Address, Address Line 2, City, State, Zip Code, Country
- Roles and Permission : This section will include option to Toggle On/Off Administration Portal (Admin, Manager), Employee Portal (Guard)
- Other Fields : This section will include Logo or Picture, Tags, Fax, Employment Date, Business Registration Number, Birthday, Terminated Date

3.2 Employee Listing

- List Added employee with column (UID, Name, Middle Name, Last Name, Title, Termination Date, Email, Username, User Type, Department, Status, Last Visit, Added by)
- Filters (Department, Zones, Status, Global Search)
- Export as CSV, PDF, EXCEL

3.3 View Employee

- Overview
  - Basic Details (User Type, ID, Phone, Email, Address and other provided while adding the employee)
  - Assigned Sites
    - Assigned sites listing \[Site, Start Date, Effective Rate Date, Rate, End, Is Primary, Make Primary, Action (Remove) \]
    - Filters
    - Assign Site
      - Form with fields (Site Name, Employee Start Date, Is primary site Yes/No)
  - Site Bans
    - Ban Site Form
    - Banned Site Listing with column \[Site Name, Banned On, Status, Action (Remove Ban)\]
  - Emergency Contacts
    - Create Contact
    - Contacts listing with Filter (Active, Achieved, By Status)
  - Notes on Employee
    - Add Notes
    - Notes Listing
  - Notes by Employee
    - Notes Listing
    - Filters (Types (Banned, Notes, Terminated,Reactivated), Status (Active, archived, All)
  - Availabilities/Calendar view
    - Availability Calendar for the week (Days and Time) with indicator Available-Green, May be Yellow, Not Available- Red)
    - Update Availability – By Default all would be green and on click it allow to change availability)
  - Work Exceptions
    - List out all exceptions with date, status and global search filter. Table column will be Shift Star, Shift End, Region, Account Name, Meal Break Exception, Meal Schedule, Meal Actual, Rest Break Exception, Rest Schedule, Rest Actual
- Actions
  - Change Password
    - Change Password Form (Enter Password/Confirm Password)
    - Force Password Change
  - Force Change Password – This option will send password change link to the user to
  - Id card – Show the ID card generated based on employee specific details.
  - Snap Picture – Upload profile picture.
  - Terminate – Open Terminate form with fields Last day of work, Reason, Comments.
  - Tracks – list out its current location on the map.
- Edit – Allow editing all fields filled while creating Employee Profile. Will keep employee id as unique that can't be updated.
  - General Information
  - Address
  - Roles and Permission
  - Other Fields
- Skills and Attributes – This section will show all skill assigned to the employee.
  - Skill Listing: Table will show column as Skill, Category, and Information.
  - Filters (Categories, Global Search)
- Security and Patrol
  - Reports
    - Reports Listing (ID, Type, Flags, Date, Reported by, Account, Status, View as printable pdf, Email Report, View, Remove)
    - Reports Filter (Active, All Templates, archived), With Incident Flags Only, Statuses (All Status, New Report, Approved, Verification, Job Pending, archived) , Date (From –to), Global Search)
  - Reports Mentions
    - Listing ((ID, Type, Flags, Date, Reported by, Account, Status, View as printable pdf, Email Report, View, Remove)
    - Reports Filter (Active, All Templates, archived), With Incident Flags Only, Statuses (All Status, New Report, Approved, Verification, Job Pending, archived) , Date (From –to), Global Search)
    - Approve All
    - Metrics
  - Summary Reports
    - Listing (Column as Employee, Location, Reports, Videos, Checkpoints, Start, End, Tracks, PDF , View, Options (Approve all reports, Send Shift Report by Email, Delete this shift and time logs)
    - Filters (Date, Global Search)
  - Tours
    - Tour listing (Column include Tour name, Account, Employee, Result, Start Time, End Time, Duration (Min), pdf, Email, View Tour Session, Delete Tour Session)
    - Filter (Date For-To), Global Search
    - Export as CSV, PDF, EXCEL, PIVOT Chart View, Pivot Chart Edit.
- Schedules
  - Schedule Listing: List out all assigned schedule to the employee with column as Note, Name, Day, Start Date, Time, Clocked Shifts, Sch. Break, Actual Break with Filter as Date (From –To)
  - Calendar View – will show all assigned schedule in the calendar date wise.
  - No Schedule To Distribute
  - No Changes to Notify
  - Print
- Time off
  - Create Time off – Will open up form to add time off directly from the admin panel having fields as First Day off (date Picker), Return Date (Date Picker), Description
  - List all time off created with column as ID, From , To, Description
- Entitlement: This option will provide option to set Entitlement for the employee.

3.6 Company Policies

- Upload Policy document – provide option to upload document in pdf form
- Policy Document listing – This section will list out all uploaded document with download option.

3.7 User Settings

- User Details – Customize fields for user profile including all fields Personal details, Company Related Info, Compensation Details, Payment information

3.8 Admins

- Admin Employees list View – Show all employees with Admin access in the list having column First Name, Last Name, Access Level, Managed Groups, Permissions, Admin Tab, Accepted, Last Login, Added by.

3.9 **Sub Modules**

- Departments
  - Create Department
    - Form with fields Department Name, Display Id, Details.
  - List of Department in a table with fields Department, Install Code, Employees, and View button.
    - View Department details under sub section Department's Employees, Operation Reports, Notifications, Positions, Edit, Contacts, Security & Patrol, and Schedules.
    - Assign Employee
      - Assign Employee Form with fields as Filter by Skills, Select Employee, Employee Start Date, Add Rule.
    - Employee list
      - List of employee with table column as Employee, Start Date, Rate, Unassignment Date, Is Primary Site, Make Primary.
- Skills and Attributes
  - New Attribute/Skill
    - Skill form with fields Category (dropdown as Diplomas, Trainings, & Special Skills, Languages, Licenses & Permit, Memberships, Prior Career Skills, Uniforms), Description, Checkbox (Show Expiry Date Field, Show Text Field, Show Text Field (Other), Show Skill in client Portal, Global)
    - Added Skill lists with column Description, Region, Category, Assigned Employee Count, Position Count, Expiring Soon, Assign Employees, Edit, Archive, history.
    - Assign Employee – Open list of employee to assign in the skill.
    - Edit Skill – Allow to open the editable view of Add skill page to update details.

4\. Sites (Client)

4.1 Sites

- New Site – This option allow to create new site and open up a form with fields as below sections:
  - Account Type – Allow to choose account type as Radio button
  - Company Information : Company Name, Unique Id, Time Zone (Use system Timezone), Logo Picture, Preferred Language
  - Main Contact: First Name, Last Name, Job title, Phone Main, Phone (other) with option to checkmark for notification by SMS, Fax, Email
  - Address: Address, Address Line 2, City, State, Zip code, Country
  - Employee Relations: Account Representative (Text), Sales Representative (Text)
  - Other Custom Fields: Searchable tags, Business Registration No. , Website.
- View Site – Show details filled while adding the Site.
  - Overview
    - Site Details – Name, Photo, Manager Name, Manager Position, Phone, Email, Address, Bill to address.
    - Positions
      - Create Position- Will open form with fields as –

Post Base Settings \[Post Name, Post ID, Short Description of Tasks, Schedule Memo, Status (Active, Archived)\] , Compliances \[ Hard Requirements, Conditional Requirements, Soft Requirements \], Service Dates \[ (Service Duration – optional radio button for Ongoing Service, Temporary Service), Begin Date – Show Calendar\], Break Rule Settings (Break Rule – No Break Rule dropdown), Pay Setting \[Pay on –Radio button for Employee Pay Rate, This post Rate), Matrix \[(Table with column Days, Premium, %, Start, End, Pay code) with Add Condition button\] Break (Payroll) \[with option dropdown as Do not pay breaks, pay all breaks)\], Holiday pay with radio button option as Do not pay Radio Button holiday premium and Rate Multiplier ie. 1.5

- Position Listing
  - List out created positions with columns Uid, Position Title, Tpt Hrs, Bill Rate, Holiday Rate, Temp, Actions (Duplicate ,Edit, History, remove)
  - Duplicate Position – This will copy the added position and create same new position with unique id.
  - Edit Position – Allow editing existing position with same fields available while adding it.
  - Remove Position – Allow removing existing position.
    - Assigned Employees
      - Assign Employee Form
        - Form with fields \[Filter by skills, Select Employee, Employee Start Date, Add rule (Effective Date, Hourly Rate)\]
      - Assigned Employee Listing – This section will list out all assigned employees with column as Employee, Start Date, Rate, Unassignment Date, Is Primary Site, Make Primary, History, Remove, View.
      - View Employee Profile-
        - Overview

Show Sections as All basic details including \[Name, Employee Id, Phone, Email, Address\], HR Profile Information \[ Type,Pay Type, Hourly Rate Type, Region's Default Rate, Overtime, Pay Run\] , Availabilities, Time off, Skills and Certifications.

- - - - - Certification Skills – Common as in Employee View - Sites/Departments - Common as in Employee View - Schedules - Common as in Employee View - Calendar View - Common as in Employee View - Time off - Common as in Employee View
        - Client Portal Access: This section will list out all users having client portal access of the site.
          - Create a Client Access: This option will open up the form to Fill First Name, Last Name, Picture, Phone, Email, Password, Force to change password, Permissions - Client Role (Check mark) and Status – Grant access/ Revoke Access.
          - Client Access List
            - This will list out all users with client access with column as Full Name, Email, Phone, Last Login, Access and Edit Button.
            - Edit – This option allow updating all fields values updated while created the client.
        - Banned Employees – This section will allow adding employee as Banned Employees. A banned Employees
        - Other Site Contacts – This option will allow to create new contacts for the site.
          - Create contact – This form allow to add contact details including Company Name, First Name, Last Name, Job Title, Gender, Government Badge Id, Phone (main), Phone (Other), Email, Address, Address Line 2, City, State, Zipcode, Country, Attention of, Preferred Language, Status, Use this address as Bill to address (checkmark)
          - List Contact with column as Name, Job Title, Phone, Email, Action (Edit)
          - Edit Contact -
        - Other Action
          - Edit site – Will open up same form in edit view which is used to create a site.
          - Close Account – this will allow updating site as closed with action type as Terminate Site (And all contracts) or Terminate one or more positions. Admin will also choose termination date and once submit, get confirmation screen. Once confirmed site status will be updated as closed and will be listed under
          - GeoCode: This section will be covered under geo fence section.
          - Dispatch Settings
          - Prepare Schedule: Will follow connecteam feature functionality.
    - Operation Reports
      - Log and Activities
        - Reports
          - Filter Reports
        - Patrols Tours
          - View Tours
          - Delete Tours
        - Journel Entries
        - Recordings
      - Summaries
        - Summary by shift
        - Financial by shift
        - Incident Analytics
        - Analytics Reports
      - Exceptions and Audits
        - Post Orders
        - Work Exception
        - System Exception
    - Notifications – Will follow Connecteam automation module which allow to set automated notification for certain condition which must include notification at the generation of report below also:
      - Operations Reports
        - Individual Report
          - Maintenance Report
          - Incident Report
          - Operation Report
          - Hourly Report Filling
          - End of Shift Report for Overnight Patrols
          - Roof Access Notifications
          - Tornado Warning Emergency
        - Checkpoints
          - Late Tour/Checkpoint Alert
          - Incomplete Tour Alert
          - Finished Tour Alert
        - Timekeeping
          - Late Shift Alert
          - Early Clock Out Alert
          - Clockin/Clockout
          - Clock-in-Exception
    - Security and Patrol
      - Settings
        - Checkpoints
          - Create Checkpoint : Admin would be able to create checkpoint and fill details as Checkpoint name, Special Instruction, can be scanned by (dropdown- All, and list out all positions created for the site), Can be scanned by \[dropdown – Do not monitor and scan randomly, Checkpoint is part of tour (Will use tour settings), Request a scan on a regular interval, \], Scan Request Intervals as Every {Minute,Hour,days, weeks}, Extra Scan options \[(Log only, Display a message, Open a report form, Exception Verification (Validate Range), Exeption Verification- Yes/NO Question (No is an Exception), Exeption Verification- Yes/NO Question (YES is an Exception), Exception Multi Questions\], Checkpoint Type (NFC, Barcode), Checkpoint ID, GPS Scan:Required Accuracy, Allow Manual Scanning (Yes/No/Yes with a reason)
          - Import Batch: Bulk checkpoint import through excel.
          - View Logs : list out activities done for checkpoints will list out in a table Time, Employee, Account, Checkpoint, Tour.
          - Late Checkpoint Alert: keep under automation module as in Connectteam.
          - Tour Finished Alert: keep under automation module as in Connectteam.
          - Tour Incomplete Alert: keep under automation module as in Connectteam.
          - Checkpoint listing – Will list out all checkpoint in table with column as Checkpoint Name, Action , Assigned, Last Scan, Location (map icon open map as per latitude and longitude) , Edit option

Filters

Edit – Will open the same add form with edit ability.

- - - - Tour Routes - Create a Tour Route: This option will allow to create a tour by filling form with fields as Description, Assigned to, Special Instructions, Estimated Tour Duration, Grace Period for Late Notification (if grace period is set to 0, it will give 15 minutes by default), Recurrence Type (Weekly, Monthly), Tour Schedule (with option to choose day and time of the day) - Tour Listing

Filters

Edit Settings: Allow editing filled details.

Manage Checkpoints: This option will allow assigning checkpoint for the assigned tour.

- - - - Site Locations and Sections - Create Site item – Allow to create location at item of the site. - Import Batch - Emergency Contacts - Create Contacts _ Allow to assign contacts in the dropdown in order sequence of emergency. - Create Contact – Allow to create contacts that will be added in the dropdown. - Geo-fencing- Allow choosing boundary points on a map to define geo fence border. - Mobile App Restriction – Yes/No toggle will be available for below points - Geo Fence Clock-in Restriction - Geo-Fence Clock-out Restriction - Mobile App login Restriction
        - Live Dashboard
          - All Events with filters below:
            - Reports
            - Time Clock
            - Patrol Tours
            - Panic Button Triggers
            - Changed Site
            - Checkpoint Scan
            - Runsheet Patrol Events
            - Remote Actions
            - Show Map

Broadcast Message

New Task

New Report

- - - - History Tracks
- Message Board
  - Post Message
- Settings
  - Assigned Employees
    - Assign Employee
    - Employee list with filter
  - Positions
    - Create a Position/Job – create position specific to the site and cant used for other site.
  - Email Settings
    - PDF is attached as a link? – Yes/No dropdown
- Schedule -Follow Connecteam for whole module
  - Prepare Schedule / Shift Scheduler
    - View Options
      - View by user
      - View by job
      - List view
      - Sort Cell content

Toggles -

- - - - Minimized view - Daily info - Weekly Summary - Availability status - Issues - Cross Schedules Events - Labor Costs - Daily Health - Hide Empty Row - Working Hours - Now Working days - Organize by groups
        - Filter (week, Dates)
        - Add
        - Actions
    - Coverage per Hour
    - Print Position Schedule
    - Settings

5\. Settings

- General Configration
- Notifications
  - Notification Sender- define email from NAME and EMAIL address.

Below notification creation rule will follow Connecteam automation feature.

- - - Late Tour/Checkpoint
      - On Termination
      - Finished Tour/Runsheet
      - Alerts/Panic/Important Reports
      - Recurrent Tasks
      - Break Management
      - Clock in/Out
      - SMS Segments
- Company Name and Address
- Roles & Permission – Create Role for the user to assign under 3 categories: Admin Portal Roles, Staff Portal Roles, Client Portal Roles with an option to create Role having form with fields as Role Name, Description, Portal Section.
  - Password Policy
  - Sign in Log
- General
  - Category wise (13 Categories)
- System Locale Settings
- Field Configuration
- Operation Configuration
- Report Templates
- Site Templates
- Zone Templates
- Incidents Templates
- Devices and License
- Region Message Boards
- Job/Service Type
- Special Calendar Days
- Calendar Groups
- Back office Configurations
- Break Management
- Back office Defaults
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
- BackOffice Settings
- Break Penalties

7\. Help

- Resource Center
- Talk to an Expert

8\. Chat Module

- New Chat
- New Group
- Broadcast Message

9\. Groups

- Add Segments

10\. Automations

11\. Job List

- Add
- Import

12\. Security operations

- Schedules
  - Sites Listing
    - View Schedule Button (Take to Site>Schedule )
- Time Clock
  - Sites Listing
    - Timesheet with today filter
- Forms
  - Add New Form
  - Forms Listing
- Quick Tasks
  - Add Task
  - Tasks Filters (Created by Me, My Tasks, All Tasks, Archived)
  - Search bar
  - Overdue, Done, Open, Task in total counts
- Post Orders, SOPs, Manuals
  - Add New
  - Post Orders , Sops, Manuals Listing
  - Filters (Active, Archived)
  - Export
- Company Vehicle Documentation
  - Add New
  - Vehicle listing
  - Export

12\. Communications

- Chat – Already covered under point 8
- Updates
  - Listing
  - Create Update
  - Export
- Directory
  - Listing
  - Actions
    - Tag Users
    - Notify
    - Send Chat Message
    - Create Group chat with selected
    - Create Task
  - Export
- Forms
  - Listing
  - Add new form
  - Archieved
  - Export
  - Actions
    - Move
    - Archive
    - Delete
- Help desk
  - Unassigned
  - Assigned to Me
  - All.

13\. Team Resources

- Team Member Manual
  - Add Manual
  - Listing
- Rewards
  - Purchase Tokens
  - Send Tokens
  - Sent Tokens
  - User Activity
  - Purchase History
- Documents
  - Create Pack
- Team Member Benefits Information
  - Add New
  - Active
  - Archived
  - Export
- Celebrations
  - Past and upcoming birthday
  - Tomorrow
  - Today
- Time off
  - Add Time Off
  - Paid Policies
    - Add policy type
  - Insights
  - Export
  - Pending Request
  - Filters
- Text Message
  - New Message
  - Message List
  - Filters
- Workplace Notices and Posters
  - Active
  - Archived
  - Add New
  - Export
- Disciplinary Reports
  - Add New
  - Reports listing (Active/Archieve)
  - Filter
- HR Complaint Form
  - Listing (Active/Archieved)
  - Add New
  - Export
  - Search
- Hiring
  - Add positions
  - Listing (Active/Archived)
  - Search

14\. Training

- Quizzes
  - Add New
  - Quiz Listing (Active and Archieved)
  - Export
  - Search and Filter
- RFI Academy
  - Add New
  - Listing (Active and Archieved)
  - Export
  - Search and Filter

15\. Sign-out

Guard Mobile App

1. Login Module
   - Login, Forgot Password
2. Time Clock

- Start Break
- Clock Out & Stay Signed in
- Clock Out & Sign Out
- Cancel

1. Checkpoints
   - View Active Tour
     1. Checkpoints listing
     2. Start Tour
        1. Finish
        2. Reports
           1. Report Template list

Fire Watch Log

Fuel Expense Report

Incident Report

- - - 1. Scan NFC 2. Add Icon (Comments, Pictures upto 5)
    - Tour Schedules
      1. Tour listing
    - All Checkpoints
      1. Setup NFC Checkpoint
    - Reload Settings
    - Scan NFC

1. Reports & Logs
   - Create Report
     1. Fire Watch Log
     2. Fuel Expense Report
     3. Incident Report
   - Browse Site Reports
     1. Report Occurrences
        1. View My Site Reports
        2. View All Site Reports
   - Cancel
2. Dispatch Tasks
3. Message Board

- New Messages
  - listing
- All Message
  - listing
- Post a new Message
  - Submit form

1. Post and Escalation Orders
2. Panic Button
   - Automated 10 Sec Timer
   - Call
   - Siren Off
   - Cancel Alarm
3. Emergency Contacts
4. Team

- Other Employee List and Detail page

1. Flashlight
2. Schedules
   - Schedule Listing with filters
3. Watch mode
   - Video Recording and submission
4. Settings
   - ALEXIO Help Center
     1. Form Submission
   - Change Password
   - Reload Phone Settings
   - System Diagnostics
     1. Storage is not full
     2. Internet Connectivity
     3. Pinging ALEXIOs
     4. GPS Location Permission
     5. GPS Turned On
     6. Push Notification
   - Session Settings
   - Local Settings
   - Barcode Scanner Settings
     1. Allow/Disallow

Client Portal

1\. Login

2\. Security Operation

- Logs & Activities
  - Reports
- Summaries
  - Incident Analytics
  - Custom Analytics
  - Daily Shift Reports
- Tours
  - Tour Schedule

3\. Invoices