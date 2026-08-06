RFI Admin/Supervisor Portal - Developer Functional Specification 

# **RFI Admin/Supervisor Portal** 

Final Functionality Requirements Document 

##### **Prepared by AppZoro Technologies Inc.** 

Version: Final Consolidated Scope | Date: July 29, 2026 

_This document consolidates the uploaded ALEXIOS/RFI feature listing and all subsequent RFI clarifications. No unapproved business functionality has been added._ 

AppZoro Technologies Inc. | Confidential | 1 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **1. Document Control and Scope Rules** 

### **1.1 Purpose** 

This document defines the complete functionality of the RFI Admin/Supervisor Web Portal. It preserves applicable modules, sections, subsections, fields, filters, table columns, actions, settings and pending decisions from the source feature list and subsequent RFI responses. 

### **1.2 Scope Status Legend** 

|**Status**<br>|**Meaning**<br>|
|---|---|
|Source / Confrmed|Present in the uploaded feature list or explicitlyconfrmed byRFI.<br>|
|Pending Discussion|Must remain in the scope register but workfow or behavior is not<br>fnalized.|
|Excluded / Current Phase|Explicitlyignored or not required for the current scope.|



### **1.3 Controlling Rules** 

- The platform is a single-company platform for the current version. 

- The architecture may support future multi-tenancy, but no current multi-tenant screens or controls are included. 

- RFI clarifications override conflicting wording in the original feature list. 

- Items marked Pending Discussion remain visible in this document but must not be treated as finalized. 

- No new approval flow, calculation rule, notification rule, reporting KPI, client capability, mobile behavior or workflow is assumed unless explicitly listed or confirmed. 

- UI organization may consolidate duplicated access points, but every listed functionality must remain accessible. 

### **1.4 Confirmed Organizational Structure** 

##### **Company → Region → Client → Site → Job Type / Position → Shift** 

- Client: organization associated with sites and Client Portal access. 

- Multiple clients may be assigned to one site. 

- Account Type: classification such as Regular Client, Multi-Site Client or Site Account. 

- Site: operational property where security services are performed. 

- Location: exact latitude/longitude or a defined internal site area. 

- Department: employee team used to group and assign employees. 

- Zone is ignored for the current phase. 

- Groups and Segments remain listed only because they exist in the source document; their detailed behavior is pending. 

AppZoro Technologies Inc. | Confidential | 2 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **2. Authentication, Access and Portal Framework** 

### **2.1 Authentication / Login** 

- ALEXIOS/RFI Admin and Supervisor/Employee login. 

- Role-based redirection to the applicable dashboard. 

- Access only to modules assigned through Roles and Permissions. 

- Same web portal may be used for Admin, Supervisor and Client Portal access, according to assigned portal role. 

### **2.2 Roles and Permissions** 

- Users may have multiple roles. 

- Roles are created through role and permission toggles. 

- No separate Dispatcher role is required. 

- Permissions are module-level. A user with module access may access all functions in that module. 

- Users may be restricted to assigned sites; when restricted, they may access permitted module information for those sites. 

- Financial visibility is custom-defined. 

- Temporary permissions are not required. 

#### **Role Setup Fields** 

- Role Name 

- Description 

- Portal Section / Portal Type 

- Module access toggles 

- Assigned site restriction 

- Financial information visibility 

### **2.3 Global Portal Elements** 

- Global Search for Customers/Clients, Contacts, Employees, Reports and other supported records. 

- Notifications indicator. 

- Chat access. 

- User profile and Sign Out. 

- Page-level search, filters, export and actions only where specifically listed in this document. 

## **3. Dashboard** 

### **3.1 Platform Statistics** 

#### **3.1.1 Clocked-In via Mobile** 

Shows the total number of guards clocked in today. 

##### **_Detail Listing Columns_** 

- Name 

- Position / Job Type 

- Clocked-in Time 

- Shift Name 

##### **_Filters and Actions_** 

- Status: Current 

- Status: Current (Uncovered) 

- Status: All Shifts 

- Status: Covered 

AppZoro Technologies Inc. | Confidential | 3 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Status: Late Shift 

- Global Search 

- View details 

#### **3.1.2 Inactive Mobile User** 

Shows guards who are clocked in but have no GPS updates or no mobile activity for a configured duration. The threshold is configured through Automations. Dashboard data refreshes every minute. 

##### **_System Behavior_** 

- Automatically generate a ticket when the configured inactivity condition is met. 

- Suppress duplicate notifications for the same unresolved event. 

##### **_Ticket Listing Columns_** 

- Date 

- Ticket Type 

- First Name 

- Last Name 

- Subject 

- Location 

- Status 

- View 

#### **3.1.3 Expired and Expiring Soon Skills** 

Shows active employee skills and credentials that are expired or expiring soon. 

##### **_Listing Columns_** 

- Employee Name 

- Expiration Date 

- Expires 

- Description 

- Region 

- Category 

##### **_Filters and Export_** 

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

#### **3.1.4 Reports to Approve - Last 7 Days** 

- Shows reports pending approval before publication to the Client Portal. 

- Click redirects to the Reports page under Operation Reports. 

- Approval requirement is configurable while creating the custom report. 

#### **3.1.5 Message Board** 

- Shows count of unread/pending messages created by Guards. 

AppZoro Technologies Inc. | Confidential | 4 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

##### **_Listing Columns_** 

- Sender Name 

- Title 

- Message 

- Date and Time 

- Site 

- Viewable By 

##### **_Filters_** 

- Category 

- Type: Current Message 

- Type: Future Message 

- Type: Expired Messages 

- Global Search 

#### **3.1.6 Time-Off Requests** 

- Shows count of pending time-off requests. 

- Click redirects to the Time Off page. 

### **3.2 Activity Log** 

- Latest: current-day activities. 

- View History: date-wise historical activities. 

#### **Filters** 

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

- **PENDING DISCUSSION:** Detailed Runsheet Patrol Events behavior remains undefined. 

### **3.3 Attendance** 

- Lists guards scheduled today and their clocked-in status, shift-wise. 

- Follow Connecteam-style attendance presentation. 

#### **Filters** 

- Current 

- Current (Uncovered) 

- All Shifts 

- Covered 

- Late Shift 

- Global Search 

### **3.4 Scheduled Tours** 

#### **Listing Columns** 

- Schedule Timing 

- Site Name 

AppZoro Technologies Inc. | Confidential | 5 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Schedule Title 

- Last Performed By 

### **3.5 Task Dispatch** 

- List all created tasks. 

- Add Task opens a dynamic form based on selected Task Type. 

#### **Filters** 

- New Tasks 

- In Progress 

- New and In Progress 

- Completed 

- Assignment: All 

- Assignment: Not Assigned 

- Assignment: Assigned to Any 

- Assignment: Assigned to Employee 

### **3.6 Show Map** 

- Show checked-in guards on a map. 

- Open a popup/activity view for all activities since clock-in. 

#### **Remote Actions** 

- Message with Siren 

- Remote Speak 

- Send Audio Message 

- Reload Install / Reload Settings 

- Clock Out and Stay Signed In 

- Clock Out and Sign Out 

**PENDING DISCUSSION:** Remote Speak behavior remains pending definition. 

### **3.7 Global Search** 

- Search Customer/Client 

- Search Contacts 

- Search Employees 

- Search Reports 

- Redirect to the selected record detail page 

### **3.8 Send an Update** 

- Send bulk updates to a Specific Group 

- Send to a Specific User 

- Send by User Type 

### **3.9 Dashboard Submodules** 

#### **3.9.1 Reports Settings** 

- Custom Report Form Listing 

- Filter by Categories 

- Filter Active / Archived 

- Search 

- Edit 

- Field Setup 

- Count of generated reports 

AppZoro Technologies Inc. | Confidential | 6 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

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

##### **_Incident Category Listing Columns_** 

- Code 

- Region 

- Description 

- Level 

- Parent Category 

- Default Group 

##### **_Incident Category Actions and Filters_** 

- Edit 

- Sub Form 

- Filter: All Groups 

- Filter: Default Groups 

- Global Search 

#### **3.9.2 Vehicle Management** 

- Create Vehicle 

- Vehicle Listing 

- View Vehicle 

##### **_Listing Columns_** 

- ID 

- License 

- Make / Model / Year 

- Status 

##### **_Filters_** 

- All Vehicles 

- Purchased 

- Leased 

- Status: Active 

- Status: Inactive 

- Status: All 

#### **3.9.3 Schedule** 

- Redirect to the Live Schedule page. 

- Follow the confirmed Connecteam-style schedule functionality defined in Section 8. 

AppZoro Technologies Inc. | Confidential | 7 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

#### **3.9.4 Company Activity Journal** 

- List activities performed by Admin users. 

##### **_Filters_** 

- Banned 

- Notes 

- Terminated 

- Reactivated 

#### **3.9.5 System Exceptions** 

- Redirect to the Ticketing/Help Desk module. 

- Display tickets automatically generated under system exception categories. 

**PENDING DISCUSSION:** Detailed System Exceptions behavior beyond ticket generation remains pending. 

## **4. Employee Management** 

### **4.1 Add Employee** 

#### **4.1.1 General Information** 

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

#### **4.1.2 Address** 

- Address 

- Address Line 2 

- City 

- State 

- ZIP Code 

- Country 

#### **4.1.3 Roles and Permissions** 

- Administration Portal toggle 

- Admin role toggle 

- Manager/Supervisor role toggle 

- Employee Portal / Guard Mobile App toggle 

- Assign multiple roles 

- Assign permitted modules 

AppZoro Technologies Inc. | Confidential | 8 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Assign site restriction 

- Configure financial visibility where applicable 

#### **4.1.4 Other Fields** 

- Logo or Picture 

- Tags 

- Fax 

- Employment Date 

- Business Registration Number 

- Birthday 

- Terminated Date 

### **4.2 Employee Listing** 

#### **Table Columns** 

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

#### **Filters and Export** 

- Department 

- Zones - excluded for current phase 

- Status 

- Global Search 

- Export CSV 

- Export PDF 

- Export Excel 

**EXCLUDED / CURRENTLY NOT REQUIRED:** Zone filtering is excluded for the current phase. 

### **4.3 Employee Profile / View Employee** 

#### **4.3.1 Overview and Basic Details** 

- User Type 

- Employee ID 

- Phone 

- Email 

- Address 

- Other information captured during employee creation 

#### **4.3.2 Assigned Sites** 

##### **_Listing Columns_** 

- Site 

- Start Date 

AppZoro Technologies Inc. | Confidential | 9 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Effective Rate Date 

- Rate 

- End Date 

- Is Primary 

- Make Primary 

- Action: Remove 

##### **_Assign Site Form_** 

- Site Name 

- Employee Start Date 

- Is Primary Site: Yes / No 

#### **4.3.3 Site Bans** 

##### **_Ban Site Form_** 

- Site 

- Reason 

- Effective Date 

- Expiration Date 

- Permanent or Temporary 

- Requested By 

- Internal Notes 

- Attachment 

- Status 

##### **_Banned Site Listing Columns_** 

- Site Name 

- Banned On 

- Status 

- Action: Remove Ban 

- System prevents assignment of the employee to a banned site. 

#### **4.3.4 Emergency Contacts** 

- Create Contact 

- Contact Listing 

- Filter Active 

- Filter Archived 

- Filter by Status 

#### **4.3.5 Notes on Employee** 

- Add Note 

- Notes Listing 

#### **4.3.6 Notes by Employee** 

- Notes Listing 

- Filter Types: Banned 

- Filter Types: Notes 

- Filter Types: Terminated 

- Filter Types: Reactivated 

- Status: Active 

- Status: Archived 

- Status: All 

AppZoro Technologies Inc. | Confidential | 10 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

#### **4.3.7 Availability / Calendar** 

- Weekly calendar showing Days and Time 

- Available - Green 

- May Be Available - Yellow 

- Not Available - Red 

- Default availability is Available/Green 

- Click to update availability 

#### **4.3.8 Work Exceptions** 

##### **_Listing Columns_** 

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

##### **_Filters_** 

- Date 

- Status 

- Global Search 

#### **4.3.9 Employee Actions** 

- Change Password 

- Force Password Change 

- Generate/View ID Card 

- Snap Picture / Upload Profile Picture 

- Terminate 

- View Tracks / Current Location 

- Edit Employee 

##### **_Change Password Form_** 

- Enter Password 

- Confirm Password 

##### **_Force Password Change_** 

- Send password change link to the user 

##### **_Terminate Form_** 

- Last Day of Work 

- Reason 

- Comments 

##### **_Automatic Termination Actions_** 

- Mark future shifts as uncovered 

- Revoke Web Portal access 

- Revoke Guard Mobile App access 

- Preserve historical records 

- Notify Payroll 

AppZoro Technologies Inc. | Confidential | 11 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Notify Supervisors 

##### **_Edit Employee_** 

- General Information 

- Address 

- Roles and Permission 

- Other Fields 

- Employee ID remains non-editable 

#### **4.3.10 Skills and Attributes** 

##### **_Listing Columns_** 

- Skill 

- Category 

- Information 

##### **_Filters_** 

- Category 

- Global Search 

- Admin manually verifies submitted credentials and updates status. 

##### **_Credential Statuses_** 

- Pending Review 

- Verified 

- Rejected 

- Expiring Soon 

- Expired 

#### **4.3.11 Security and Patrol - Reports** 

##### **_Report Listing Columns_** 

- ID 

- Type 

- Flags 

- Date 

- Reported By 

- Account 

- Status 

- Printable PDF 

- Email Report 

- View 

- Remove 

##### **_Report Filters_** 

- Active 

- All Templates 

- Archived 

- Incident Flags Only 

- All Status 

- New Report 

- Approved 

- Verification 

- Job Pending 

- Archived 

AppZoro Technologies Inc. | Confidential | 12 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Date From-To 

- Global Search 

#### **4.3.12 Summary Reports** 

##### **_Listing Columns_** 

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

##### **_Options_** 

- Approve All Reports 

- Send Shift Report by Email 

- Delete This Shift and Time Logs 

##### **_Filters_** 

- Date 

- Global Search 

#### **4.3.13 Tours** 

##### **_Listing Columns_** 

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

##### **_Filters and Export_** 

- Date From-To 

- Global Search 

- Export CSV 

- Export PDF 

- Export Excel 

- Pivot Chart View 

- Pivot Chart Edit 

**PENDING DISCUSSION:** Pivot Chart behavior remains source-listed but not further defined. 

AppZoro Technologies Inc. | Confidential | 13 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

#### **4.3.14 Schedules** 

##### **_Schedule Listing Columns_** 

- Note 

- Name 

- Day 

- Start Date 

- Time 

- Clocked Shifts 

- Scheduled Break 

- Actual Break 

##### **_Filters and Views_** 

- Date From-To 

- Calendar View 

- No Schedule to Distribute 

- No Changes to Notify 

- Print 

#### **4.3.15 Time Off** 

##### **_Create Time Off Form_** 

- First Day Off 

- Return Date 

- Description 

##### **_Listing Columns_** 

- ID 

- From 

- To 

- Description 

##### **_Entitlement_** 

- Set employee time-off entitlement 

### **4.4 Company Policies** 

- Upload Policy Document in PDF 

- Policy Document Listing 

- Download Policy Document 

### **4.5 User Settings** 

- Customize fields for user profile 

- Personal Details 

- Company-Related Information 

- Compensation Details 

- Payment Information 

### **4.6 Admins** 

#### **Admin Employee Listing Columns** 

- First Name 

- Last Name 

- Access Level 

AppZoro Technologies Inc. | Confidential | 14 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Managed Groups 

- Permissions 

- Admin Tab 

- Accepted 

- Last Login 

- Added By 

### **4.7 Departments** 

#### **Create Department** 

- Department Name 

- Display ID 

- Details 

#### **Department Listing Columns** 

- Department 

- Install Code 

- Employees 

- View 

#### **Department Detail Sections** 

- Department Employees 

- Operation Reports 

- Notifications 

- Positions / Job Types 

- Edit 

- Contacts 

- Security and Patrol 

- Schedules 

#### **Assign Employee** 

- Filter by Skills 

- Select Employee 

- Employee Start Date 

- Add Rule 

#### **Employee List Columns** 

- Employee 

- Start Date 

- Rate 

- Unassignment Date 

- Is Primary Site 

- Make Primary 

**4.8 Skills and Attributes Administration** 

#### **Create Skill / Attribute Fields** 

- Category 

- Description 

- Show Expiry Date Field 

- Show Text Field 

- Show Text Field (Other) 

- Show Skill in Client Portal 

AppZoro Technologies Inc. | Confidential | 15 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Global 

- Status 

#### **Categories** 

- Diplomas 

- Trainings & Special Skills 

- Languages 

- Licenses & Permits 

- Memberships 

- Prior Career Skills 

- Uniforms 

#### **Skill Listing Columns** 

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

#### **Actions** 

- Assign Employee 

- Edit Skill 

- Archive 

- View History 

## **5. Clients and Sites** 

### **5.1 Client and Site Rules** 

- One client may be assigned to multiple sites. 

- Multiple clients may be assigned to one site. 

- Shared-site Client Portal visibility remains pending. 

- Client is the entity receiving Client Portal access. 

- Account Type is a classification, not a separate hierarchy level. 

**PENDING DISCUSSION:** Contract management is pending discussion. 

**PENDING DISCUSSION:** Detailed site closure consequences are pending discussion. 

### **5.2 Create Site / Client Account** 

#### **5.2.1 Account Type** 

- Regular Client 

- Multi-Site Client 

- Site Account 

- Custom Account Type 

#### **5.2.2 Company Information** 

- Company Name 

- Unique ID 

AppZoro Technologies Inc. | Confidential | 16 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Time Zone 

- Logo Picture 

- Preferred Language 

#### **5.2.3 Main Contact** 

- First Name 

- Last Name 

- Job Title 

- Phone Main 

- Phone Other 

- SMS Notification Consent 

- Fax 

- Email 

#### **5.2.4 Address** 

- Address 

- Address Line 2 

- City 

- State 

- ZIP Code 

- Country 

#### **5.2.5 Employee Relations** 

- Account Representative 

- Sales Representative 

#### **5.2.6 Other Custom Fields** 

- Searchable Tags 

- Business Registration Number 

- Website 

### **5.3 Site Listing** 

The source document does not define a complete site-list column set. The listing must at minimum provide access to created Site/Account records and their View action, without adding unapproved business fields. 

### **5.4 Site Profile** 

#### **5.4.1 Overview** 

- Site Name 

- Photo 

- Manager Name 

- Manager Position 

- Phone 

- Email 

- Address 

- Bill-To Address 

#### **5.4.2 Positions / Job Types** 

##### **_Create Position / Job Type - Post Base Settings_** 

- Post Name 

- Post ID 

- Short Description of Tasks 

AppZoro Technologies Inc. | Confidential | 17 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Schedule Memo 

- Status: Active / Archived 

##### **_Compliance_** 

- Hard Requirements 

- Conditional Requirements 

- Soft Requirements 

##### **_Service Dates_** 

- Service Duration: Ongoing Service 

- Service Duration: Temporary Service 

- Begin Date 

##### **_Break Rule Settings_** 

- Break Rule dropdown 

- No Break Rule option 

##### **_Pay Settings_** 

- Pay on Employee Pay Rate 

- Pay on This Post Rate 

##### **_Premium Matrix Columns_** 

- Days 

- Premium 

- Percentage 

- Start 

- End 

- Pay Code 

- Add Condition 

##### **_Break Payroll_** 

- Do Not Pay Breaks 

- Pay All Breaks 

##### **_Holiday Pay_** 

- Do Not Pay Holiday Premium 

- Rate Multiplier 

##### **_Position / Job Type Listing Columns_** 

- UID 

- Position Title 

- TPT Hours 

- Bill Rate 

- Holiday Rate 

- Temporary 

- Actions 

##### **_Actions_** 

- Duplicate 

- Edit 

- History 

- Remove 

- Position, Job Type and Service Type represent the same business concept. The UI should use Job Type consistently where possible. 

AppZoro Technologies Inc. | Confidential | 18 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Missing requirements generate configured notification to Admin/Supervisor or another configured recipient; Admin takes action manually. 

#### **5.4.3 Assigned Employees** 

##### **_Assign Employee Form_** 

- Filter by Skills 

- Select Employee 

- Employee Start Date 

- Add Rule: Effective Date 

- Add Rule: Hourly Rate 

##### **_Listing Columns_** 

- Employee 

- Start Date 

- Rate 

- Unassignment Date 

- Is Primary Site 

- Make Primary 

- History 

- Remove 

- View 

#### **5.4.4 Employee Profile from Site** 

- Overview 

- Basic Details: Name, Employee ID, Phone, Email, Address 

- HR Profile Information: Type, Pay Type, Hourly Rate Type, Region Default Rate, Overtime, Pay Run 

- Availabilities 

- Time Off 

- Skills and Certifications 

- Sites / Departments 

- Schedules 

- Calendar View 

#### **5.4.5 Client Portal Access** 

##### **_Create Client Access Fields_** 

- First Name 

- Last Name 

- Picture 

- Phone 

- Email 

- Password 

- Force Password Change 

- Client Role 

- Status: Grant Access / Revoke Access 

##### **_Client Access Listing Columns_** 

- Full Name 

- Email 

- Phone 

- Last Login 

- Access 

- Edit 

AppZoro Technologies Inc. | Confidential | 19 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

**PENDING DISCUSSION:** Client Portal visibility, actions, service requests, invoice behavior and shared-site access remain pending. 

#### **5.4.6 Banned Employees** 

- Add employee to Banned Employees list 

- Prevent assignment to the banned site 

#### **5.4.7 Other Site Contacts** 

##### **_Create Contact Fields_** 

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

##### **_Contact Listing Columns_** 

- Name 

- Job Title 

- Phone 

- Email 

- Action: Edit 

#### **5.4.8 Other Site Actions** 

- Edit Site using the same creation fields 

- Close Account 

##### **_Close Account Options_** 

- Terminate Site and All Contracts 

- Terminate One or More Positions 

- Termination Date 

- Confirmation Screen 

**PENDING DISCUSSION:** Detailed automated consequences of site closure and contract termination remain pending. 

#### **5.4.9 Dispatch Settings** 

- Prepare Schedule 

- Follow the confirmed Schedule module 

#### **5.4.10 Operation Reports and Site Activity** 

- Operation Reports 

- Logs and Activities 

AppZoro Technologies Inc. | Confidential | 20 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

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

**PENDING DISCUSSION:** Journal Entries, Recordings, Financial by Shift and Exceptions/Audits remain source-listed but require detailed discussion. 

#### **5.4.11 Site Notifications** 

Follow Connecteam-style automation rules and support report, security and timekeeping notifications listed below. 

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

#### **5.4.12 Security and Patrol Settings** 

- Checkpoints 

- Tour Routes 

- Site Locations and Sections 

- Emergency Contacts 

- Geo-Fencing 

- Mobile App Restrictions 

- Live Dashboard 

- History Tracks 

- Message Board 

#### **5.4.13 Site Locations and Sections** 

- Create Site Item / Location 

- Import Batch 

AppZoro Technologies Inc. | Confidential | 21 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

#### **5.4.14 Emergency Contacts** 

- Create Contacts 

- Assign contacts in priority/order sequence 

- Create contact records used by the dropdown 

#### **5.4.15 Geo-Fencing** 

- Choose boundary points on map 

- Define geo-fence border 

#### **5.4.16 Mobile App Restrictions** 

- Geo-Fence Clock-In Restriction: Yes / No 

- Geo-Fence Clock-Out Restriction: Yes / No 

- Mobile App Login Restriction: Yes / No 

#### **5.4.17 Live Dashboard** 

##### **_Event Filters_** 

- Reports 

- Time Clock 

- Patrol Tours 

- Panic Button Triggers 

- Changed Site 

- Checkpoint Scan 

- Runsheet Patrol Events 

- Remote Actions 

##### **_Actions_** 

- Show Map 

- Broadcast Message 

- New Task 

- New Report 

- History Tracks 

#### **5.4.18 Message Board** 

- Post Message 

- Settings 

#### **5.4.19 Assigned Employees** 

- Assign Employee 

- Employee Listing 

- Filters 

#### **5.4.20 Positions / Job Types** 

- Create site-specific Position / Job Type 

- Site-specific Job Type cannot be reused for another site unless duplicated manually 

#### **5.4.21 Email Settings** 

- PDF Attached as a Link: Yes / No 

AppZoro Technologies Inc. | Confidential | 22 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **6. Checkpoints and Tour Routes** 

### **6.1 Checkpoints** 

#### **6.1.1 Create Checkpoint Fields** 

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

#### **6.1.2 Batch Import** 

- Import checkpoints through Excel 

#### **6.1.3 Checkpoint Logs** 

##### **_Columns_** 

- Time 

- Employee 

- Account 

- Checkpoint 

- Tour 

#### **6.1.4 Checkpoint Listing** 

##### **_Columns_** 

- Checkpoint Name 

- Action 

- Assigned 

- Last Scan 

- Location Map Icon 

- Edit 

##### **_Filters and Actions_** 

- Filters 

- Edit using the same Create Checkpoint form 

AppZoro Technologies Inc. | Confidential | 23 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

#### **6.1.5 Checkpoint Alerts** 

- Late Checkpoint Alert - configured under Automations 

- Tour Finished Alert - configured under Automations 

- Tour Incomplete Alert - configured under Automations 

### **6.2 Tour Routes** 

#### **6.2.1 Create Tour Route Fields** 

- Description 

- Assigned To 

- Special Instructions 

- Estimated Tour Duration 

- Grace Period for Late Notification 

- Default grace period of 15 minutes when set to 0 

- Recurrence Type: Weekly 

- Recurrence Type: Monthly 

- Tour Schedule: Day and Time 

#### **6.2.2 Confirmed Tour Rules** 

- Tour assigned to a specific employee of a shift through the Schedule module. 

- Guard starts the tour manually. 

- Guard must be clocked in. 

- Guard must be within the site geo-fence. 

- Checkpoint order and requirements are configurable when creating the tour. 

- Tour timing, grace and notification behavior are configurable when creating the tour. 

- Manual scans may require reason, comment, photo and GPS based on configuration; no approval is required. 

- Tour interruptions trigger notifications based on configured automation rules. 

#### **6.2.3 Tour Listing and Actions** 

- Tour Listing 

- Filters 

- Edit Settings 

- Manage Checkpoints 

#### **6.2.4 Checkpoint Issue Reporting** 

- Damaged NFC Tag 

- Missing Barcode 

- Inaccessible Checkpoint 

- Unsafe Location 

- GPS Inaccuracy 

- May trigger notification, maintenance task or system exception through configuration 

## **7. Scheduling** 

### **7.1 Schedule Setup** 

#### **Fields and Options** 

- Schedule Name 

- Default Fields 

- Custom Field Definition 

- Jobs / Job Types 

- View Type: User 

AppZoro Technologies Inc. | Confidential | 24 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- View Type: Job 

- Layout Type 

- Fields to Show on Each Shift 

- Users 

#### **Shift Card Field Selection** 

- Hours 

- Job 

- Shift Title 

- Other custom fields defined during Schedule creation 

### **7.2 Schedule View** 

- Day View 

- Week View 

- Month View 

- View by User 

- View by Job 

- List View 

- Date Selection 

- Blank clickable cells to create shifts 

#### **Display Options** 

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

**PENDING DISCUSSION:** Cross Schedule Events and Daily Health remain source-listed but require detailed discussion. 

### **7.3 Shift Creation** 

- Date 

- From-To Date Range 

- All Days option 

- Start Time 

- End Time 

- Title 

- Job / Job Type 

AppZoro Technologies Inc. | Confidential | 25 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Users 

- Address 

- Note 

- Shift Tags 

- Shift Tasks 

- Custom fields selected during Schedule creation 

### **7.4 Schedule Behavior** 

- Assigned users automatically receive assigned shifts. 

- Schedule can be updated after publishing. 

- Notification channel is configurable. 

- Recurring schedules are supported. 

- Schedule issues include overlapping shifts, insufficient rest, overtime, unavailability, time off, expired credentials, site bans, missing training and excessive weekly hours. 

- Missing Job Type requirements generate notifications; Admin decides manually. 

**PENDING DISCUSSION:** Shift acceptance, rejection, open shifts, claiming, swaps and replacement workflow remain pending. 

**PENDING DISCUSSION:** Cross-midnight shift handling remains pending. 

## **8. Time Clock, Attendance and Work Exceptions** 

### **8.1 Clock-In / Clock-Out** 

- Guard clocks in through the Mobile App. 

- Clock-in is blocked outside the site geo-fence. 

- Early clock-in, late clock-in and early clock-out thresholds are configurable in Settings. 

- Manual timesheet changes are allowed and audited. 

- Break rules are configurable. 

**PENDING DISCUSSION:** Offline clock-in, clock-out and synchronization remain pending. 

### **8.2 Time Clock Pages** 

- Security Operations > Time Clock > Site Listing 

- Timesheet with Today filter 

- Employee profile Work Exceptions 

- Site Work Exceptions 

- Dashboard Attendance 

### **8.3 Timesheet / Exception Information** 

Use the source-listed time and exception fields. Do not assume additional approval states or payroll actions that are not defined. 

- Scheduled and actual shift times as available 

- Meal Break Exception 

- Meal Schedule 

- Meal Actual 

- Rest Break Exception 

- Rest Schedule 

- Rest Actual 

- Manual adjustment history 

AppZoro Technologies Inc. | Confidential | 26 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **9. Reports and Incidents** 

### **9.1 Reports versus Forms** 

- Forms are manually created using a customizable form builder and assigned to employees to complete. 

- Reports are generated through Custom Report Forms, Categories, Incident Categories and Report Footers configured by Admin. 

- Forms and Reports remain separate functional areas. 

### **9.2 Report Listing** 

#### **Columns** 

- ID 

- Type 

- Flags 

- Date 

- Reported By 

- Account 

- Status 

- Printable PDF 

- Email Report 

- View 

- Remove 

#### **Filters** 

- Active 

- All Templates 

- Archived 

- Incident Flags Only 

- All Status 

- New Report 

- Approved 

- Verification 

- Job Pending 

- Archived 

- Date From-To 

- Global Search 

### **9.3 Report Approval and Publication** 

- Approval requirement is configured while creating the custom report. 

- No multi-level approval workflow. 

- No formal correction/return workflow. 

- Reports are site-specific. 

- Digital acknowledgment is supported. 

- Report Mentions are excluded. 

**PENDING DISCUSSION:** Client Portal publication and detailed visibility remain pending. 

### **9.4 Custom Report Configuration** 

#### **Report Form Management** 

- Custom Report Form Listing 

- Create Custom Report 

AppZoro Technologies Inc. | Confidential | 27 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Edit 

- Field Setup 

- Generated Report Count 

- Filter by Categories 

- Filter Active / Archived 

- Search 

#### **Custom Report Categories** 

- New Category 

- Add Category 

- Category Listing 

- Edit 

- Archive 

- Filter Active / Archived 

#### **Custom Incident Categories** 

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

#### **Report Footers** 

- Add Footer 

- Footer Listing 

- Text Format 

- Image Format 

- Edit Footer 

#### **Report Form Fields** 

The form builder must support customizable fields. Field types should follow the form/report builder available in the referenced source platforms. Exact field-type inventory may be finalized in UI design without introducing new workflow behavior. 

### **9.5 Incident Categories** 

- Incident type/category is manually created by Admin. 

- No automatic incident workflow beyond configured report and automation behavior is assumed. 

### **9.6 Media Limits** 

- Use standard limits for photos, videos, audio and files. 

- Exact file sizes, counts and durations are configurable and should be finalized during technical design. 

AppZoro Technologies Inc. | Confidential | 28 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **10. Forms** 

### **10.1 Form Management** 

- Add New Form 

- Form Listing 

- Active 

- Archived 

- Export 

- Move 

- Archive 

- Delete 

### **10.2 Form Builder** 

- Create customized fields 

- Assign forms to employees 

- Employees complete assigned forms 

### **10.3 Form Submissions** 

List submitted forms and provide view/export access according to the selected form structure. Do not add unconfirmed approval or reporting workflows. 

## **11. Tasks, Dispatch and Job List** 

### **11.1 Task Types** 

- Dispatch Task 

- Quick Task 

- Recurring Task 

- Help Desk Ticket 

- Job Type - separate from Task and used for the employee role/service performed during a shift 

### **11.2 Assignment** 

- Assign to one selected target, such as an employee, Job Type, site, shift, department or supported group. 

### **11.3 Task Creation** 

- Add Task 

- Select Task Type 

- Show a form based on selected Task Type 

- List the created task 

Fields vary by Task Type. Do not treat priority, evidence, attachments, due date or checklists as universally mandatory unless defined in the selected task form. 

### **11.4 Task Filters and Counts** 

- Created by Me 

- My Tasks 

- All Tasks 

- Archived 

- Overdue Count 

- Done Count 

- Open Count 

AppZoro Technologies Inc. | Confidential | 29 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Total Task Count 

- New Tasks 

- In Progress 

- New and In Progress 

- Completed 

- Assignment: All 

- Not Assigned 

- Assigned to Any 

- Assigned to Employee 

### **11.5 Escalation** 

- Overdue or incomplete tasks may trigger configured automation actions. 

### **11.6 Job List** 

- Add 

- Import 

**PENDING DISCUSSION:** Detailed Job List behavior remains pending. 

## **12. Communications** 

### **12.1 Combined Communication Module** 

- Chat - employee communication 

- Message Board - messages created by guards 

- Broadcast - message sent to selected user types/users/groups/sites as configured 

- Updates - company or operational updates 

- Notifications - system-generated communication 

- SMS - delivery channel 

### **12.2 Chat** 

- New Chat 

- New Group 

- Broadcast Message 

**PENDING DISCUSSION:** Private chat visibility, moderation, export, attachment rules, retention, guard-to-guard behavior and Client participation remain pending. 

### **12.3 Updates** 

- Listing 

- Create Update 

- Export 

### **12.4 Directory** 

#### **Actions** 

- Listing 

- Tag Users 

- Notify 

- Send Chat Message 

- Create Group Chat with Selected 

- Create Task 

- Export 

AppZoro Technologies Inc. | Confidential | 30 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

### **12.5 Forms within Communications** 

- Listing 

- Add New Form 

- Archived 

- Export 

- Move 

- Archive 

- Delete 

### **12.6 Help Desk** 

- Unassigned 

- Assigned to Me 

- All 

## **13. Security Operations** 

### **13.1 Schedules** 

- Site Listing 

- View Schedule button redirects to Site > Schedule 

### **13.2 Time Clock** 

- Site Listing 

- Timesheet with Today filter 

### **13.3 Forms** 

- Add New Form 

- Forms Listing 

### **13.4 Quick Tasks** 

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

### **13.5 Post Orders, SOPs and Manuals** 

- Add New 

- Listing 

- Filter Active 

- Filter Archived 

- Export 

### **13.6 Company Vehicle Documentation** 

- Add New 

AppZoro Technologies Inc. | Confidential | 31 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Vehicle Listing 

- Export 

## **14. Documents, Policies and Team Resources** 

### **14.1 Documents and Policies** 

- Company Policies 

- Post Orders 

- SOPs 

- Manuals 

- Employee Documents 

- Site Documents 

- Company Vehicle Documentation 

- Workplace Notices and Posters 

### **14.2 Team Member Manual** 

- Add Manual 

- Listing 

### **14.3 Rewards** 

- Purchase Tokens 

- Send Tokens 

- Sent Tokens 

- User Activity 

- Purchase History 

**PENDING DISCUSSION:** Rewards and Tokens workflow remains pending. 

### **14.4 Documents** 

- Create Pack 

### **14.5 Team Member Benefits Information** 

- Add New 

- Active 

- Archived 

- Export 

**PENDING DISCUSSION:** Benefits workflow remains pending. 

### **14.6 Celebrations** 

- Past and Upcoming Birthdays 

- Tomorrow 

- Today 

- **PENDING DISCUSSION:** Celebrations workflow remains pending. 

### **14.7 Time Off and Paid Policies** 

- Add Time Off 

- Paid Policies 

- Add Policy Type 

AppZoro Technologies Inc. | Confidential | 32 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

### **14.8 Insights** 

- Export 

- Pending Request 

- Filters 

**PENDING DISCUSSION:** Detailed Insights behavior remains pending. 

### **14.9 Text Message** 

- New Message 

- Message List 

- Filters 

### **14.10 Workplace Notices and Posters** 

- Active 

- Archived 

- Add New 

- Export 

### **14.11 Disciplinary Reports** 

- Add New 

- Reports Listing 

- Active 

- Archived 

- Filter 

- **PENDING DISCUSSION:** Detailed disciplinary workflow remains pending. 

### **14.12 HR Complaint Form** 

- Listing 

- Active 

- Archived 

- Add New 

- Export 

- Search 

- **PENDING DISCUSSION:** Detailed HR complaint workflow remains pending. 

### **14.13 Hiring** 

- Add Positions 

- Listing 

- Active 

- Archived 

- Search 

**PENDING DISCUSSION:** Applicant tracking and onboarding depth remain pending. 

## **15. Training** 

### **15.1 Quizzes** 

- Add New 

- Quiz Listing 

- Active 

- Archived 

AppZoro Technologies Inc. | Confidential | 33 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Export 

- Search 

- Filter 

### **15.2 RFI Academy** 

- Add New 

- Listing 

- Active 

- Archived 

- Export 

- Search 

- Filter 

**PENDING DISCUSSION:** Training content types, automatic skill/certification assignment, certificates, expiration and renewal behavior remain pending. 

## **16. Vehicles** 

### **16.1 Confirmed Scope** 

Vehicle management is limited to vehicle records and documentation. 

### **16.2 Vehicle Management** 

- Create Vehicle 

- Vehicle Listing 

- View Vehicle 

#### **Listing Columns** 

- ID 

- License 

- Make / Model / Year 

- Status 

#### **Filters** 

- All Vehicles 

- Purchased 

- Leased 

- Status: Active 

- Status: Inactive 

- Status: All 

### **16.3 Company Vehicle Documentation** 

- Add New 

- Vehicle Listing 

- Export 

- **EXCLUDED / CURRENTLY NOT REQUIRED:** Fuel, mileage, maintenance, repair, GPS, equipment tracking and vehicle assignment history are excluded. 

## **17. Automations and Notifications** 

### **17.1 Automation Builder** 

The platform includes a custom Connecteam-style builder using Trigger → Conditions → Actions. 

AppZoro Technologies Inc. | Confidential | 34 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

#### **Triggers May Include** 

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

#### **Conditions** 

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

#### **Actions** 

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

### **17.2 Scope Rules** 

- One automation cannot be assigned to multiple sites. 

- No acknowledgment-based escalation. 

- Duplicate notifications for the same unresolved event must be suppressed. 

**PENDING DISCUSSION:** Whether company-wide/global automations are allowed remains pending. 

**PENDING DISCUSSION:** Exact duplicate-suppression settings remain to be finalized during design. 

AppZoro Technologies Inc. | Confidential | 35 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **18. Payroll and Back Office** 

### **18.1 Payroll Scope** 

- Payroll calculation is required. 

- Detailed calculation formulas, rate priority and workflow statuses remain pending. 

### **18.2 Confirmed Back Office Configuration** 

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

### **18.3 Employee Financial Information** 

- Compensation Details 

- Payment Information 

- Financial visibility controlled by custom permissions 

**PENDING DISCUSSION:** Invoice generation is pending discussion. 

**PENDING DISCUSSION:** Payroll provider and accounting integration are pending discussion. 

## **19. Settings and Configuration** 

### **19.1 General Configuration** 

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

AppZoro Technologies Inc. | Confidential | 36 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Category-Wise Settings (13 Categories) 

- System Locale Settings 

- Field Configuration 

**PENDING DISCUSSION:** The exact 13 general categories remain pending definition. 

### **19.2 Operation Configuration** 

- Report Templates 

- Site Templates 

- Zone Templates 

- Incident Templates 

- Devices and License 

- Region Message Boards 

- Job / Service Type 

- Special Calendar Days 

- Calendar Groups 

**EXCLUDED / CURRENTLY NOT REQUIRED:** Zone Templates are excluded for the current phase. 

**PENDING DISCUSSION:** Devices and License, Region Message Boards and Calendar Groups require detailed discussion. 

### **19.3 Back Office Configuration** 

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

### **19.4 Password Policy and Sign-In Log** 

Retain the Password Policy and Sign-In Log sections from the source. Detailed password rules and sign-in log columns may be finalized during technical design without introducing a new business workflow. 

### **19.5 Data Retention** 

- Retention is configurable by data category. 

- Applicable categories include GPS/activity history, reports, media, messages, timesheets, audit history, panic events, tours and checkpoint scans. 

## **20. Groups and Segments** 

- Groups 

- Add Segments 

**PENDING DISCUSSION:** Groups and Segments are not part of the confirmed operational hierarchy. Detailed behavior remains pending. 

AppZoro Technologies Inc. | Confidential | 37 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **21. Help and Help Desk** 

### **21.1 Help** 

- Resource Center 

- Talk to an Expert 

### **21.2 Help Desk** 

- Unassigned 

- Assigned to Me 

- All 

Help and Help Desk are separate functional areas. 

## **22. Supervisor Portal Behavior** 

- Supervisor uses the same portal interface as Admin. 

- Supervisor access is controlled by assigned roles and module permissions. 

- When site-restricted, Supervisor can access permitted modules and records for assigned sites. 

- No separate Dispatcher role is required. 

- Financial information is visible only when explicitly enabled. 

## **23. Pending Discussion Register** 

### **23.1 Scheduling** 

- Shift acceptance 

- Shift rejection 

- Open shifts 

- Shift claiming 

- Shift swaps 

- Shift replacement workflow 

- Cross-midnight handling 

### **23.2 Site, Client and Contracts** 

- Contract management 

- Detailed site closure consequences 

- Client Portal visibility 

- Client report actions 

- Client service requests 

- Invoice behavior 

- Shared-site visibility for multiple clients 

### **23.3 Guard Mobile / Attendance Dependencies** 

- Offline clock-in/out and synchronization 

- Multiple devices per guard 

- Shared devices 

- Device approval 

- GPS tracking frequency 

- Watch Mode 

- Guard visibility of other guards 

AppZoro Technologies Inc. | Confidential | 38 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

### **23.4 Communications** 

- Admin visibility into private chats 

- Edit/delete rights 

- Chat export 

- Media attachments 

- Retention period 

- Guard-to-guard rules 

- Client participation 

### **23.5 HR and Team Resources** 

- Hiring depth 

- Benefits 

- Rewards and Tokens 

- Celebrations 

- Complaints 

- Disciplinary workflow 

### **23.6 Training** 

- Content formats 

- Automatic skill/certification assignment 

- Certificates 

- Expiration and renewal 

### **23.7 Finance** 

- Invoice generation 

- Accounting integration 

- Payroll provider integration 

- Detailed payroll formulas and processing workflow 

### **23.8 Migration** 

- TrackTik data migration 

- Connecteam data migration 

- Parallel operation 

- Historical data categories 

- Cutover process 

### **23.9 Undefined Source Features** 

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

AppZoro Technologies Inc. | Confidential | 39 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Groups and Segments behavior 

- Pivot Chart View/Edit 

## **24. Excluded for Current Phase** 

- Current multi-tenant administration 

- Zone management and Zone Templates 

- Equipment inventory and tracking 

- Vehicle fuel, mileage, maintenance, repair and GPS management 

- Report Mentions 

- Temporary permissions 

- Separate Dispatcher role 

- Multi-level report approval 

- Formal report correction/return workflow 

## **25. Functional Traceability Summary** 

|**Area**|**Status**<br>|
|---|---|
|Authentication and module access|Confrmed<br>|
|Dashboard and operational widgets|Confrmed<br>|
|Employee management|Confrmed<br>|
|Departments and skills|Confrmed<br>|
|Clients and sites|Confrmed withpendingcontract/client-portal details<br>|
|Scheduling|Confrmed withpendingshift-marketplace behaviors<br>|
|Time clock and work exceptions|Confrmed with oflinepending<br>|
|Reports and incidents|Confrmed<br>|
|Forms|Confrmed<br>|
|Checkpoints and tours|Confrmed<br>|
|Tasks and dispatch|Confrmed<br>|
|Communications|Confrmed with chat rulespending<br>|
|SecurityOperations landingarea|Confrmed<br>|
|Team Resources|Source-listed;detailed HR workfowspending<br>|
|Training|Quizzes and RFI Academyconfrmed;detailspending|
|Vehicles|Documentation only<br>|
|Automations|Custom builder confrmed|
|Payroll|Calculation required;detailed rulespending<br>|
|Settings|Confrmed as source-listed|
|Groups / Job List|Source-listed;detailspending<br>|
|Helpand HelpDesk|Confrmed and separate|



## **26. Final Acceptance Principle** 

This document is the final consolidated functionality baseline for the RFI Admin/Supervisor Portal. During UI/UX and technical design, no module, section, subsection, field, filter, table column or action listed here may be omitted without an approved scope change. Items marked Pending Discussion must remain visible in the backlog and must not be implemented based on assumptions. 

AppZoro Technologies Inc. | Confidential | 40 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **PART II - DETAILED DEVELOPER FUNCTIONAL SPECIFICATION** 

_This part expands the approved functionality baseline into development logic. It does not replace Part I. Every field, filter, column and action in Part I remains mandatory unless marked Pending Discussion or Excluded for Current Phase. Where this part describes technical behavior, it is limited to logic necessary to implement the approved feature._ 

## **27. Cross-Module Development Standards** 

### **27.1 Record Identity and Data Integrity** 

##### **Required Logic** 

- Every primary business record must have an internal immutable system ID. Display IDs such as Employee ID, Site ID, Vehicle ID and Report ID remain separate user-facing values. 

- Employee ID is generated automatically and cannot be edited after employee creation. 

- Related records must store internal references rather than copied names so historical links remain valid when names change. 

- Records referenced by historical shifts, reports, tours, timesheets or audit entries must not be hard-deleted. Use Active, Inactive or Archived status where the source document provides it. 

- All date/time values must be stored consistently and displayed using the site or system time-zone setting applicable to the record. 

### **27.2 Common Listing Behavior** 

##### **Required Logic** 

- Load only records the logged-in user is permitted to access based on module access and assigned-site restriction. 

- Apply each listed filter independently and combine multiple filters using AND logic unless a filter explicitly supports multiple selections. 

- Global Search on a page searches only the columns relevant to that page; the portal-level Global Search searches supported entity types. 

- Exports must use the same active filters and search criteria currently applied to the listing. 

- Archived records appear only when the applicable Active/Archived/All filter includes them. 

- Actions must operate on the selected record and refresh the list after successful completion. 

### **27.3 Form Behavior and Validation** 

##### **Required Logic** 

- Required fields must be visibly marked and validated before submission. 

- Email fields must validate email format. Phone fields must retain country code and SMS-consent value separately. 

- Date ranges must prevent an end date earlier than the start date unless the feature is explicitly pending discussion. 

- Dropdowns populated from configurable master data must show active values and provide the confirmed customcreate option only where specifically approved. 

- On validation failure, retain entered data and show field-specific errors. 

- Edit forms must load the current saved values and update only submitted changes. 

- Confirmation must be required for destructive or access-revoking actions such as termination, close account, archive, remove and revoke access. 

### **27.4 Permissions and Site Restriction** 

##### **Required Logic** 

- Authenticate the user, resolve all assigned roles, merge module-access toggles and apply assigned-site restriction. 

- When any role grants module access, the user can use all actions within that module, subject to assigned-site restriction and custom financial visibility. 

- Users with restricted sites must not retrieve, search, export or directly open records belonging only to unassigned sites. 

- Users may hold multiple roles. No temporary-role date range is required. 

AppZoro Technologies Inc. | Confidential | 41 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- No separate Dispatcher role is required. 

### **27.5 Audit and Activity Recording** 

##### **Required Logic** 

- Record audit entries for create, edit, archive, remove, access grant/revoke, password action, termination, time edit, report approval, schedule update, automation update and configuration change. 

- Each audit entry must identify user, date/time, module, record, action and changed values when applicable. 

- Company Activity Journal uses the defined activity types Banned, Notes, Terminated and Reactivated. 

- Operational activity events must feed the applicable Dashboard Activity Log and Site Live Dashboard filters. 

### **27.6 Notifications** 

##### **Required Logic** 

- Only send notifications when a source-defined event, explicit user action or enabled automation requires one. 

- Use the configured notification sender name and sender email. 

- Duplicate notification suppression must prevent repeated alerts for the same unresolved automation event. 

- No acknowledgment-based escalation is required. 

- Notification delivery channels and schedule-change channels are configurable where confirmed. 

AppZoro Technologies Inc. | Confidential | 42 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **28. Authentication, Roles and Portal Framework - Development Logic** 

### **28.1 Login** 

##### **User Flow** 

- User enters username/email and password. 

- System validates credentials and account status. 

- System resolves available portal access and role/module permissions. 

- User is redirected to the permitted Admin/Supervisor dashboard or applicable portal context. 

- Failed login records a Sign-In Log entry with failure status and reason. 

- Successful login records login time, user, device/IP details available to the application and successful status. 

##### **Validation and States** 

- Deny login when access is revoked, employee is terminated or account status does not permit login. 

- Apply password policy configured in Settings. 

- Force Password Change must redirect the user to password creation before other modules can be used. 

### **28.2 Roles and Permissions** 

##### **Create/Edit Role** 

- Admin enters Role Name, Description and Portal Section/Type. 

- Admin enables module-access toggles and optional assigned-site restriction. 

- Admin defines financial information visibility. 

- Saving a role makes it available for assignment to users. 

- Changes apply to future authorization checks and must be audited. 

##### **Multiple Role Resolution** 

- Combine access granted by all active roles assigned to the user. 

- Apply site restriction to every data query. 

- Financial visibility must remain separately controlled even when general module access is granted. 

### **28.3 Global Search** 

##### **Search Logic** 

- Accept a text query and search supported Customers/Clients, Contacts, Employees, Reports and other explicitly enabled records. 

- Group results by record type. 

- Only return records permitted by module and assigned-site access. 

- Selecting a result opens its detail page. 

## **29. Dashboard - Development Logic** 

### **29.1 Dashboard Loading and Refresh** 

##### **Required Logic** 

- Load each dashboard statistic from its source module using the logged-in user’s site scope. 

- Refresh dashboard operational data every minute. 

- Each count card opens the linked detail listing with the corresponding filter already applied. 

- Counts and listing results must use the same query rules to prevent mismatches. 

### **29.2 Clocked-In via Mobile** 

##### **Count Logic** 

- Count guards with an active mobile clock-in for the current day and accessible sites. 

AppZoro Technologies Inc. | Confidential | 43 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Use shift status to classify Current, Current (Uncovered), All Shifts, Covered and Late Shift. 

- Opening the card displays Name, Position/Job Type, Clocked-in Time and Shift Name. 

### **29.3 Inactive Mobile User** 

##### **Detection Logic** 

- Only evaluate guards currently clocked in. 

- Compare last GPS update and last mobile activity against the enabled automation duration. 

- When either configured inactivity condition is met, create one system ticket for the unresolved event. 

- Do not create a duplicate ticket/notification while that same inactivity event remains unresolved. 

- List Date, Ticket Type, First Name, Last Name, Subject, Location, Status and View. 

### **29.4 Expired and Expiring Skills** 

##### **Status Logic** 

- Compare each employee skill expiration date to the current date and configured expiring-soon window. 

- Expired records are those before the current date; expiring-soon records are within the configured window. 

- Apply category and date filters and export the filtered Employee Name, Expiration Date, Expires, Description, Region and Category data. 

### **29.5 Reports to Approve** 

##### **Required Logic** 

- Count reports submitted during the last seven days whose custom report configuration requires approval and are in the applicable pending status. 

- Clicking the count opens Operation Reports with the approval and date filters applied. 

### **29.6 Message Board** 

##### **Required Logic** 

- Count guard-created messages pending to be read according to the available message status. 

- List Sender Name, Title, Message, Date and Time, Site and Viewable By. 

- Apply Category, Current/Future/Expired and Global Search filters. 

### **29.7 Time-Off Requests** 

##### **Required Logic** 

- Count pending time-off requests accessible to the user. 

- Clicking the count opens the Time Off page filtered to pending requests. 

### **29.8 Activity Log** 

##### **Required Logic** 

- Latest shows current-day events. 

- View History allows date-based historical events. 

- Filter by All Events, Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scans, Runsheet Patrol Events and Remote Actions. 

- Apply From-To date filter. 

### **29.9 Attendance** 

##### **Required Logic** 

- List guards scheduled for the current day shift-wise and their clock status. 

- Provide Current, Current (Uncovered), All Shifts, Covered and Late Shift filters plus Global Search. 

- Attendance must use the schedule and mobile time-clock records as its source. 

AppZoro Technologies Inc. | Confidential | 44 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

### **29.10 Scheduled Tours** 

##### **Required Logic** 

- List current-day scheduled tours for accessible sites. 

- Display Schedule Timing, Site Name, Schedule Title and Last Performed By. 

- Last Performed By is populated from the latest completed tour session for that schedule when available. 

### **29.11 Task Dispatch** 

##### **Required Logic** 

- Add Task opens the task form determined by selected Task Type. 

- List tasks and filter by New Tasks, In Progress, New and In Progress and Completed. 

- Filter assignment by All, Not Assigned, Assigned to Any and Assigned to Employee. 

### **29.12 Show Map and Remote Actions** 

##### **Required Logic** 

- Show clocked-in guards using their latest available GPS location. 

- Selecting a guard opens their activities since clock-in. 

- Provide Message with Siren, Remote Speak, Send Audio Message, Reload Install/Settings, Clock Out and Stay Signed In, and Clock Out and Sign Out. 

- Send Audio Message transmits an audio message; it must not remotely activate the guard microphone. 

- Remote Speak remains Pending Discussion and must not be implemented beyond an inactive placeholder until defined. 

- Clock-out actions must update the active time-clock session and record an audit/remote action event. 

AppZoro Technologies Inc. | Confidential | 45 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **30. Employee Management - Development Logic** 

### **30.1 Add Employee** 

##### **Creation Logic** 

- Generate Employee ID automatically when the employee is successfully created. 

- Capture every General Information, Address, Roles and Permissions, and Other Fields value listed in Part I. 

- Employee Type uses an active configurable dropdown and allows Admin to create a new type when the required value does not exist. 

- Phone SMS consent is stored independently for Main Phone and Other Phone. 

- Portal access toggles determine whether credentials/access are enabled for Administration Portal and/or Employee/Guard Portal. 

- Password and Confirm Password must match. 

- Prevent duplicate Username and duplicate Employee ID. 

- After save, create the employee record, role assignments and department assignment. 

### **30.2 Employee Listing** 

##### **Required Logic** 

- Display exactly the approved columns: UID, Name, Middle Name, Last Name, Title, Termination Date, Email, Username, User Type, Department, Status, Last Visit and Added By. 

- Apply Department, Zone (source-listed but current phase treatment per scope), Status and Global Search filters. 

- CSV, PDF and Excel exports must reflect the active filters. 

### **30.3 Assigned Sites** 

##### **Assignment Logic** 

- An employee may be assigned to multiple sites and may have different rates and Job Types at different sites. 

- Assign Site requires Site Name, Employee Start Date and Is Primary Site Yes/No. 

- Only one assignment should be treated as primary at a time when Make Primary is used. 

- Remove ends/removes the active assignment without deleting historical shift/report records. 

- List Site, Start Date, Effective Rate Date, Rate, End, Is Primary, Make Primary and Remove action. 

### **30.4 Site Bans** 

##### **Ban Logic** 

- Create a site-ban record with Site, Reason, Effective Date, Expiration Date, Permanent/Temporary, Requested By, Internal Notes, Attachment and Status where available from the confirmed clarification. 

- Scheduler must prevent assignment to a site when an active ban applies on the shift date. 

- Remove Ban changes the ban status and preserves history. 

### **30.5 Emergency Contacts and Notes** 

##### **Required Logic** 

- Create Contact stores the employee emergency contact and includes it in Active/Archived/Status-filtered listing. 

- Add Notes stores the note author, date/time and applicable type/status required by the Company Activity Journal filters. 

- Notes by Employee and Notes on Employee remain separate views as listed. 

### **30.6 Availability** 

##### **Required Logic** 

- Default weekly availability is Available/Green. 

- Admin can change each day/time block to Available/Green, May Be Available/Yellow or Not Available/Red. 

- Scheduling conflict checks must read the employee availability applicable to the shift date/time. 

AppZoro Technologies Inc. | Confidential | 46 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

### **30.7 Work Exceptions** 

##### **Required Logic** 

- List Shift Start, Shift End, Region, Account Name, Meal Break Exception, Meal Schedule, Meal Actual, Rest Break Exception, Rest Schedule and Rest Actual. 

- Provide date, status and Global Search filters as defined in Part I. 

- Values are derived from scheduled break rules and actual time-clock/break activity. 

### **30.8 Password, ID Card, Picture and Tracking Actions** 

##### **Required Logic** 

- Change Password validates Enter Password and Confirm Password, then updates credentials. 

- Force Password Change sends or activates a password-change requirement for the employee. 

- ID Card displays the generated card using employee-specific details. 

- Snap Picture uploads/replaces the profile picture. 

- Tracks displays the employee current/latest location where location data is available and permitted. 

### **30.9 Termination** 

##### **Required Logic** 

- Collect Last Day of Work, Reason and Comments. 

- On confirmation, set employee termination data/status. 

- Mark future assigned shifts as uncovered. 

- Revoke Admin/Supervisor Portal and Guard Mobile App access. 

- Preserve all historical records. 

- Notify payroll and relevant supervisors. 

- Record the termination in audit history and Company Activity Journal. 

### **30.10 Skills and Credentials** 

##### **Required Logic** 

- Admin assigns skills/attributes from configured categories. 

- Admin manually verifies credentials and updates status. 

- Supported statuses are Pending Review, Verified, Rejected, Expiring Soon and Expired; retain any source-listed status needed by existing records. 

- Expiration status is derived from expiration date, while verification is manually controlled. 

- Skill listing shows Skill, Category and Information and supports Category and Global Search filters. 

### **30.11 Employee Reports** 

##### **Required Logic** 

- List ID, Type, Flags, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. 

- Apply Active/All Templates/Archived, Incident Flags Only, Status, From-To Date and Global Search filters. 

- Approve All performs approval only on eligible reports according to each report configuration. 

### **30.12 Summary Reports** 

##### **Required Logic** 

- Group shift activity into rows showing Employee, Location, Reports, Videos, Checkpoints, Start, End, Tracks, PDF, View and Options. 

- Approve All Reports applies only to approval-required eligible reports in the selected shift summary. 

- Send Shift Report by Email sends the generated shift summary/report to the entered or configured recipient. 

- Delete This Shift and Time Logs requires confirmation and audit; preserve related records where hard deletion would break history. 

AppZoro Technologies Inc. | Confidential | 47 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

### **30.13 Employee Tours and Schedule** 

##### **Required Logic** 

- Tour listing shows Tour Name, Account, Employee, Result, Start Time, End Time, Duration, PDF, Email, View Tour Session and Delete Tour Session. 

- Apply From-To date and Global Search filters and provide CSV, PDF, Excel, Pivot Chart View and Pivot Chart Edit actions. 

- Employee Schedule listing shows Note, Name, Day, Start Date, Time, Clocked Shifts, Scheduled Break and Actual Break. 

- Provide calendar view, No Schedule to Distribute, No Changes to Notify and Print actions as listed. 

### **30.14 Employee Time Off** 

##### **Required Logic** 

- Create Time Off captures First Day Off, Return Date and Description. 

- Validate Return Date is not earlier than First Day Off. 

- List ID, From, To and Description. 

- Entitlement permits the configured entitlement value to be set for the employee. 

## **31. Departments, Admins and User Settings - Development Logic** 

### **31.1 Departments** 

##### **Required Logic** 

- Create Department with Department Name, Display ID and Details. 

- List Department, Install Code, Employees and View. 

- Department detail exposes Employees, Operation Reports, Notifications, Positions, Edit, Contacts, Security and Patrol and Schedules. 

- Assign Employee supports Filter by Skills, Select Employee, Employee Start Date and Add Rule. 

- Employee assignment list shows Employee, Start Date, Rate, Unassignment Date, Is Primary Site and Make Primary. 

### **31.2 Admins** 

##### **Required Logic** 

- List employees with Admin access using First Name, Last Name, Access Level, Managed Groups, Permissions, Admin Tab, Accepted, Last Login and Added By. 

- The list is derived from active portal access/role assignment rather than a duplicate employee record. 

### **31.3 User Settings** 

##### **Required Logic** 

- Allow configured employee profile fields in Personal Details, Company-Related Information, Compensation Details and Payment Information. 

- Financial visibility rules apply to compensation and payment information. 

AppZoro Technologies Inc. | Confidential | 48 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **32. Clients and Sites - Development Logic** 

### **32.1 Client-Site Data Model** 

##### **Required Logic** 

- Use Company → Region → Client → Site → Job Type → Shift hierarchy. 

- Support multiple clients assigned to one site and one client assigned to multiple sites. 

- Do not finalize shared-site Client Portal visibility until the pending decision is resolved. 

- Account Type is a classification, not a separate hierarchy entity. 

- Location stores exact latitude/longitude or a defined internal site area. 

### **32.2 Create Site / Client Account** 

##### **Required Logic** 

- Capture Account Type, Company Information, Main Contact, Address, Employee Relations and Other Custom Fields exactly as listed in Part I. 

- Validate Unique ID uniqueness within the company. 

- Store each phone’s SMS option independently. 

- Time Zone defaults from system settings but remains stored for the site. 

- Allow more than one client assignment to the site. 

### **32.3 Site Overview** 

##### **Required Logic** 

- Display Site Name, Photo, Manager Name, Manager Position, Phone, Email, Address and Bill-To Address. 

- Overview data is drawn from the saved site and contact records. 

### **32.4 Job Type / Position** 

##### **Creation Logic** 

- Create Job Type using Post Name, Post ID, Short Description of Tasks, Schedule Memo and Active/Archived status. 

- Store Hard, Conditional and Soft Requirements. 

- Store Ongoing/Temporary service and Begin Date. 

- Store Break Rule, Employee Pay Rate or Post Rate option, Premium Matrix, Break Payroll option and Holiday Pay/Rate Multiplier. 

- When an assigned employee lacks a requirement, send configured notification to Admin/Supervisor/other configured recipient but allow Admin to take action manually. 

- List UID, Position Title, Total Hours, Bill Rate, Holiday Rate, Temporary and actions Duplicate, Edit, History and Remove. 

- Duplicate creates a new record with a new unique ID and copied settings. 

### **32.5 Site Assigned Employees** 

##### **Required Logic** 

- Assign Employee using Filter by Skills, Select Employee, Employee Start Date and Add Rule with Effective Date and Hourly Rate. 

- List Employee, Start Date, Rate, Unassignment Date, Is Primary Site, Make Primary, History, Remove and View. 

- Prevent assignment when the employee has an active site ban. 

### **32.6 Client Portal Access** 

##### **Required Logic** 

- Create access with First Name, Last Name, Picture, Phone, Email, Password, Force Password Change, Client Role and Grant/Revoke Access status. 

- List Full Name, Email, Phone, Last Login, Access and Edit. 

AppZoro Technologies Inc. | Confidential | 49 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Revoking access blocks future login without deleting the client user history. 

- Detailed portal visibility and multi-client shared-site behavior remain Pending Discussion. 

### **32.7 Site Contacts** 

##### **Required Logic** 

- Create contact using every field listed in Part I, including Attention Of, Preferred Language, Status and Use This Address as Bill-To Address. 

- When Bill-To is selected, update the site billing-address reference. 

- List Name, Job Title, Phone, Email and Edit action. 

### **32.8 Close Account** 

##### **Current Implementation Boundary** 

- Provide choices Terminate Site and All Contracts or Terminate One or More Positions, Termination Date and confirmation screen. 

- Do not implement automated downstream closure consequences until the pending discussion is resolved. 

### **32.9 Site Operational Tabs** 

##### **Required Logic** 

- Dispatch Settings and Prepare Schedule open their respective shared functionality in the current site context. 

- Operation Reports, Logs and Activities, Reports, Patrol Tours, Journal Entries, Recordings, Summaries, Summary by Shift, Financial by Shift, Incident Analytics, Analytics Reports, Exceptions and Audits, Post Orders, Work Exception and System Exception must remain accessible. 

- Undefined source features remain placeholders/pending until their business behavior is defined; do not invent calculations or workflows. 

### **32.10 Site Notifications** 

##### **Required Logic** 

- Notification configuration must support the listed report, checkpoint, tour, timekeeping, clock and security events. 

- Rules are implemented through the confirmed Automation builder where applicable. 

- No acknowledgment escalation is required. 

### **32.11 Site Locations, Emergency Contacts and Geo-Fence** 

##### **Required Logic** 

- Create Site Item/Location and store its name/details and exact latitude/longitude where applicable. 

- Import Batch remains available where listed. 

- Emergency Contacts can be created and assigned in an ordered sequence. 

- Geo-fencing allows Admin to define boundary points on the map. 

- Mobile App restrictions include Geo-Fence Clock-In, Geo-Fence Clock-Out and Mobile App Login toggles. 

- Clock-in outside an enabled geo-fence restriction must be blocked. 

### **32.12 Site Live Dashboard** 

##### **Required Logic** 

- Filter events by Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scan, Runsheet Patrol Events and Remote Actions. 

- Provide Show Map, Broadcast Message, New Task, New Report and History Tracks actions. 

- All actions open shared modules pre-filtered to the current site. 

### **32.13 Site Email Settings** 

##### **Required Logic** 

AppZoro Technologies Inc. | Confidential | 50 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Provide the PDF Is Attached as a Link Yes/No setting. 

- Use this value when emailing applicable site reports. 

## **33. Checkpoints and Tour Routes - Development Logic** 

### **33.1 Checkpoint Creation** 

##### **Required Logic** 

- Capture Checkpoint Name, Special Instruction, allowed Position/Job Type, monitoring method, interval, extra scan option, NFC/Barcode type, Checkpoint ID, GPS Required Accuracy and Manual Scanning option. 

- If manual scanning is Yes with Reason, require a reason before accepting the scan. 

- Apply custom reason, comment, photo and GPS requirements where configured for the tour/checkpoint. 

- Do not add QR as a scan type in the current scope. 

### **33.2 Batch Import and Logs** 

##### **Required Logic** 

- Batch import accepts the approved spreadsheet template, validates required checkpoint fields and reports row-level errors. 

- Checkpoint logs show Time, Employee, Account, Checkpoint and Tour. 

- Imported and manually created checkpoints use the same listing and edit flow. 

### **33.3 Tour Route Creation** 

##### **Required Logic** 

- Capture Description, Assigned To, Special Instructions, Estimated Tour Duration, Grace Period, Weekly/Monthly Recurrence and Tour Schedule day/time. 

- Tour is assigned to a specific employee of a shift through Scheduling. 

- Guard must be clocked in and inside the site geo-fence to start manually. 

- Allow Admin to define checkpoint order/rules and tour timing/exception behavior. 

- Allow Manage Checkpoints to add, remove and arrange assigned checkpoints. 

- Late, incomplete, finished and interruption events trigger enabled notification/automation rules. 

### **33.4 Checkpoint Issues** 

##### **Required Logic** 

- Allow guard-submitted issue types Damaged NFC Tag, Missing Barcode, Inaccessible Checkpoint, Unsafe Location and GPS Inaccuracy. 

- Execute the configured action, such as notification, maintenance task or system exception. 

- Do not require supervisor approval for manual checkpoint issue submission. 

AppZoro Technologies Inc. | Confidential | 51 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **34. Scheduling - Development Logic** 

### **34.1 Schedule Setup** 

##### **Required Logic** 

- Admin creates a Schedule by entering Name and selecting default/custom fields, Jobs, View Type, Layout Type, shiftcard fields and Users. 

- View Type options are User and Job. 

- Shift card field selection includes Hours, Job and Shift Title and any confirmed custom field. 

- The resulting schedule page is generated from the saved configuration. 

### **34.2 Schedule View** 

##### **Required Logic** 

- Provide Day, Week, Month, View by User, View by Job and List View. 

- Render blank clickable boxes for dates/users/jobs without shifts. 

- Provide Sort Cell Content and all source-listed toggles: Minimized View, Daily Info, Weekly Summary, Availability Status, Issues, Cross Schedule Events, Labor Costs, Daily Health, Hide Empty Row, Working Hours, Non-Working Days and Organize by Groups. 

- Provide Week/Date filters, Add, Actions, Coverage per Hour, Print Position Schedule and Settings. 

- Undefined display concepts such as Daily Health and Cross Schedule Events remain present but pending detailed behavior. 

### **34.3 Shift Creation and Editing** 

##### **Required Logic** 

- Clicking a blank cell opens shift creation with Date/From-To/All Days, Start Time, End Time, Title, Job, Users, Address, Note, Shift Tags, Shift Tasks and configured custom fields. 

- Allow recurring shifts: Daily, Weekly, Biweekly, Monthly, selected days and custom recurrence as confirmed. 

- Automatically deliver assigned shifts to selected users. 

- Validate overlapping shifts, availability, approved time off, active site ban, expired/missing credentials, insufficient rest, overtime and excessive weekly hours. 

- For missing Job requirements, notify configured users but allow Admin to proceed manually. 

- Published schedules may be updated; use configurable notification channels for affected users. 

- Open shifts, acceptance/rejection, claiming, swaps, replacements and cross-midnight treatment remain Pending Discussion. 

## **35. Time Clock, Attendance and Work Exceptions - Development Logic** 

### **35.1 Mobile Clock-In/Out** 

##### **Required Logic** 

- Guard clock-in and clock-out originate from the Guard Mobile App. 

- Validate assigned shift/site and current geo-fence restriction. 

- Block clock-in when outside the enabled site geo-fence. 

- Apply configurable earliest clock-in, late threshold, early clock-out and related timing settings. 

- Create time-clock events and update the active shift attendance status. 

- Offline clock-in/out and synchronization remain Pending Discussion. 

### **35.2 Timesheets and Manual Changes** 

##### **Required Logic** 

- Generate timesheet information from scheduled shift, clock-in, clock-out and breaks. 

AppZoro Technologies Inc. | Confidential | 52 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Allow authorized Admin/Supervisor user to edit time records. 

- Require reason and record original value, new value, changed by and date/time in audit history. 

- Use approved break-management configuration to calculate scheduled and actual break information. 

- Do not add unconfirmed approval/rejection workflow states. 

### **35.3 Time Clock Pages** 

##### **Required Logic** 

- Security Operations Time Clock first lists sites. 

- Selecting a site opens its Timesheet with Today filter. 

- Dashboard Attendance and Employee Work Exceptions use the same time-clock source records. 

## **36. Reports and Incidents - Development Logic** 

### **36.1 Reports versus Forms** 

##### **Required Logic** 

- Forms are manually built and assigned for employee completion. 

- Reports are generated from Custom Report settings, Custom Report Form, Categories, Incident Categories and Footer. 

- Do not merge form submissions and operational reports into one record type. 

### **36.2 Report Listing** 

##### **Required Logic** 

- List ID, Type, Flags, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. 

- Apply Active, All Templates, Archived, Incident Flags Only, Status, From-To Date and Global Search filters. 

- Use source statuses New Report, Approved, Verification, Job Pending and Archived unless a custom report setting determines approval behavior. 

- Report numbering is site-specific; the exact display format remains configurable/not otherwise invented. 

### **36.3 Approval and Publication** 

##### **Required Logic** 

- Custom Report creation determines whether approval is required. 

- No multi-level approval is required. 

- Reviewer cannot directly edit the submitted report and there is no return-for-correction workflow. 

- Approval updates report status and records approver/date. 

- Client publication/visibility follows report configuration, but detailed Client Portal behavior remains pending. 

### **36.4 Custom Report Builder** 

##### **Required Logic** 

- Admin can create, edit, archive and search report forms and categories. 

- Field Setup supports the source-listed custom field behavior and subforms. 

- Count shows number of reports generated from the custom report. 

- Incident Category stores Code, Region, Description, Level, Parent Category and Default Group. 

- Report Footer supports text or image format and edit action. 

- Digital acknowledgment is supported where configured. 

- Media uses standard centrally configured limits. 

AppZoro Technologies Inc. | Confidential | 53 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **37. Forms - Development Logic** 

### **37.1 Form Builder and Assignment** 

##### **Required Logic** 

- Admin creates a form using customizable fields. 

- Assign forms to employees for completion. 

- Provide Form Listing, Add New Form, Archived view, Export and actions Move, Archive and Delete. 

- Do not introduce submission frequency, department assignment or approval workflow unless later confirmed. 

### **37.2 Form Submission** 

##### **Required Logic** 

- Employee submits values for the fields defined in the form version assigned to them. 

- Store submission author and submission date/time. 

- Existing submissions must remain readable even after the form is edited or archived. 

## **38. Tasks, Dispatch and Job List - Development Logic** 

### **38.1 Task Types and Assignment** 

##### **Required Logic** 

- Keep Dispatch Task, Quick Task, Recurring Task and Help Desk Ticket as separate record types/workflows. 

- Job Type is the role/service, not a task. 

- A task is assigned to one target: employee, job, site, shift, department or group as applicable. 

- Task form fields change according to selected Task Type as required by the source listing. 

### **38.2 Listings and Filters** 

##### **Required Logic** 

- Dashboard Task Dispatch uses New Tasks, In Progress, New and In Progress, Completed plus assignment filters. 

- Quick Tasks uses Created by Me, My Tasks, All Tasks and Archived. 

- Show Overdue, Done, Open and Total Task counts. 

- No universal mandatory proof-of-completion fields are required. 

### **38.3 Escalation** 

##### **Required Logic** 

- Overdue or qualifying task events may trigger configured automation actions, including notification, priority change, exception or reassignment where configured. 

- No acknowledgment escalation is required. 

### **38.4 Job List** 

##### **Current Scope** 

- Provide Job List, Add and Import. 

- Detailed Job List fields and behavior remain Pending Discussion; do not duplicate Job Type behavior without confirmation. 

AppZoro Technologies Inc. | Confidential | 54 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **39. Communications - Development Logic** 

### **39.1 Combined Module** 

##### **Required Logic** 

- Provide Chat, Updates, Message Board, Broadcast, Directory, Forms access and Help Desk as the source document requires. 

- Chat is employee communication. 

- Message Board contains guard-created messages. 

- Broadcast sends messages to selected user types/users based on selection. 

- Normal communication does not require read acknowledgment. 

### **39.2 Updates** 

##### **Required Logic** 

- Provide Updates Listing, Create Update and Export. 

- Send an Update supports Specific Group, Specific User or User Type audience selection as listed on Dashboard. 

### **39.3 Directory** 

##### **Required Logic** 

- List directory users/contacts available to the logged-in user. 

- Actions: Tag Users, Notify, Send Chat Message, Create Group Chat with Selected, Create Task and Export. 

- Apply site access restrictions to directory results. 

### **39.4 Pending Communication Rules** 

_Admin private-chat visibility, message editing/deletion, export, attachments, retention, guard-to-guard rules and client participation remain Pending Discussion. Do not implement these assumptions._ 

## **40. Security Operations - Development Logic** 

##### **Landing Page Logic** 

- Provide one operational landing area linking to Schedules, Time Clock, Forms, Quick Tasks, Post Orders/SOPs/Manuals and Company Vehicle Documentation. 

- Schedules shows Site Listing and View Schedule action that opens Site → Schedule. 

- Time Clock shows Site Listing and opens Timesheet with Today filter. 

- Each subsection uses the shared module data rather than duplicating records. 

## **41. Documents, Policies and Team Resources - Development Logic** 

### **41.1 Confirmed Document Functions** 

##### **Required Logic** 

- Company Policies supports PDF upload, listing and download. 

- Post Orders, SOPs and Manuals support Add New, Active/Archived listing and Export. 

- Workplace Notices and Posters support Active, Archived, Add New and Export. 

- Documents supports Create Pack as listed. 

### **41.2 Pending Team Resource Functions** 

_Rewards/Tokens, Benefits, Celebrations, extended Time Off/Paid Policies, Insights, Text Message, Disciplinary Reports, HR Complaint Form and Hiring remain in the screen inventory but their detailed logic is Pending Discussion. Preserve their listed Add/List/Active/Archived/Export/Search actions only._ 

AppZoro Technologies Inc. | Confidential | 55 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **42. Training - Development Logic** 

##### **Current Confirmed Scope** 

- Quizzes: Add New, Active listing, Archived listing, Export, Search and Filter. 

- RFI Academy: Add New, Active listing, Archived listing, Export, Search and Filter. 

- Do not add Courses, Certificates, Assignments, completion automation or renewal logic until pending training decisions are resolved. 

## **43. Vehicles - Development Logic** 

##### **Required Logic** 

- Create vehicle record and list ID, License, Make/Model/Year and Status. 

- Filter ownership by All Vehicle, Purchased and Leased. 

- Filter status by Active, Inactive and All. 

- Provide View action. 

- Company Vehicle Documentation supports Add New, Vehicle Listing and Export. 

- Scope is documentation only: no fuel, mileage, maintenance, repair, GPS, equipment inventory or inspection workflow. 

- Document expiry alerts may only be created through the confirmed Automation builder if RFI configures them; do not assume a separate fleet-alert feature. 

## **44. Automations and Notifications - Development Logic** 

### **44.1 Builder** 

##### **Required Logic** 

- Provide custom Trigger → Conditions → Actions builder. 

- Triggers include source-confirmed operational events such as late/missed clock, GPS inactivity, tour/checkpoint events, panic, report, credential, shift, task and termination events. 

- Conditions filter the event by supported record attributes. 

- Actions execute the selected notification or record-creation behavior. 

- One automation cannot be assigned to multiple sites. 

- Whether company-wide/global scope is allowed remains unconfirmed; do not assume it. 

- No acknowledgment escalation is required. 

- Implement duplicate suppression for the same unresolved event. 

### **44.2 Execution Logic** 

##### **Required Logic** 

- When an event occurs, find active automations for the event’s allowed scope. 

- Evaluate all configured conditions. 

- If conditions pass, check whether an unresolved duplicate event already exists. 

- If not suppressed, execute actions and record execution result. 

- If suppressed, do not resend duplicate notification. 

- Record automation execution for troubleshooting and audit. 

## **45. Payroll and Back Office - Development Logic** 

##### **Confirmed Scope Boundary** 

- Payroll calculation is required, but calculation formulas, status workflow, invoice behavior and provider integration remain Pending Discussion. 

AppZoro Technologies Inc. | Confidential | 56 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Implement configuration screens for Break Management, Back Office Defaults, Employee Classes, Payroll Schedules, Holiday Groups, Holiday Codes, Overtime Rules, Pay Codes, Export Formats, Tax Settings, Bill Items, Audit History, General Settings, Back Office Settings and Break Penalties. 

- Employee profile supports Compensation Details and Payment Information subject to financial visibility. 

- Do not finalize double-time, premiums, rate priority, payroll approval states or accounting export mapping without further confirmation. 

## **46. Settings and Configuration - Development Logic** 

### **46.1 General Configuration** 

##### **Required Logic** 

- Provide Notification Sender Name and Email, listed notification categories, Recurrent Tasks, Break Management, Clock In/Out, SMS Segments, Company Name and Address, Roles and Permissions, Password Policy, Sign-In Log, General categories, System Locale and Field Configuration. 

- Configuration changes apply to subsequent operations and are audited. 

### **46.2 Operation Configuration** 

##### **Required Logic** 

- Provide Report Templates, Site Templates, Incident Templates, Devices and License, Region Message Boards, Job/Service Type, Special Calendar Days and Calendar Groups. 

- Zone Templates are excluded for the current phase but retained in traceability. 

- Undefined detailed behavior remains pending and must not be invented. 

### **46.3 Data Retention** 

##### **Required Logic** 

- Provide separate configurable retention values by data category, including GPS, reports, media, chat, timesheets, audit, panic, tours and checkpoints as confirmed. 

- Deletion/archive execution rules must respect legal and historical-reference needs and should not be finalized beyond the configured category setting without RFI approval. 

## **47. Supervisor Portal Logic** 

##### **Required Logic** 

- Use the same web application and module implementations as Admin. 

- Display only modules granted through assigned roles. 

- When the Supervisor is site-restricted, every dashboard count, list, search, export and detail view must include only assigned-site data. 

- Financial fields are shown only when custom financial visibility permits them. 

- Do not create a separate Supervisor-only functionality set unless it is the same shared module filtered by permissions/site. 

## **48. Pending Development Decisions - Do Not Implement by Assumption** 

|**Area**|**Pending Decisions / Development Hold**|
|---|---|
|Scheduling|Shift acceptance/rejection, open shifts, claiming, swaps,<br>replacement workfow,cross-midnight treatment.|
|Site/Client|Contracts, site-closure consequences, Client Portal<br>visibility/actions,invoices,shared-site client visibility.<br>|
|Mobile/Attendance|Ofline clock-in/out, synchronization, multiple/shared devices,<br>device approval,GPS frequency,Watch Mode, guard visibility.|
|Communications|Private chat access, moderation, export, attachments, retention,<br>guard-to-guard and clientparticipation.|



AppZoro Technologies Inc. | Confidential | 57 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

||RFI Admin/Supervisor Portal - Developer Functional Specifcation|
|---|---|
|HR/Team Resources|Hiring depth, benefts, rewards/tokens, celebrations, complaints<br>and disciplinaryworkfow.<br>|
|Training|Content types,certifcates,skill assignment and renewal.<br>|
|Finance|Invoice generation, payroll formulas/workfow, accounting/payroll<br>integrations.|
|Migration|TrackTik/Connecteam migration, historical scope, parallel<br>operation and cutover.|
|Undefned source features|Remote Speak, Runsheet Patrol Events, Daily Health, Cross<br>Schedule Events, Financial by Shift, Recordings, Journal Entries,<br>General 13 Categories, Devices and License, Calendar Groups,<br>Back Ofice Defaults,Groups/Segments and Job List details.|



## **49. Developer Acceptance Checklist** 

##### **For Every Screen** 

- All Part I fields, filters, columns and actions applicable to the screen are implemented. 

- No unapproved mandatory field, workflow, status, KPI or role is introduced. 

- Assigned-site and module permissions are enforced server-side and in the UI. 

- Validation errors are clear and retain user-entered data. 

- Exports match active filters. 

- Audit entries are created for applicable actions. 

- Pending items are disabled, hidden or clearly marked according to product decision; they are not guessed. 

- Linked/shared modules open in the correct employee, client or site context. 

- Every count card matches its filtered detail listing. 

- Every destructive/access-changing action requires confirmation and preserves required history. 

_End of Developer Functional Specification_ 

AppZoro Technologies Inc. | Confidential | 58 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

RFI Admin/Supervisor Portal - Developer Functional Specification 

## **36. Source Coverage Verification Addendum** 

This addendum records the final line-by-line coverage check against the uploaded ALEXIOS FEATURE LIST for the Admin/Supervisor Web App and all subsequent RFI clarifications. It does not introduce new functionality. 

### **36.1 Employee Security and Patrol - Metrics** 

SOURCE-LISTED / PENDING DEFINITION: The Employee → Security and Patrol area includes a section named Metrics. The uploaded feature list does not define its fields, calculations, filters, tables, columns, charts, actions or permissions. The section must remain available as a named placeholder in the screen inventory, but developers must not create metric calculations or KPIs until RFI provides the required definitions. 

### **36.2 Confirmed Source Coverage** 

- Authentication and role-based redirection 

- Dashboard, all platform-statistic cards, Activity Log, Attendance, Scheduled Tours, Task Dispatch, Map, Global Search and Send an Update 

- Dashboard submodules: Report Settings, Vehicle Management, Schedule redirect, Company Activity Journal and System Exceptions 

- Employee creation, listing, profile sections, Security and Patrol, Reports, Summary Reports, Tours, Schedules, Time Off, Policies, User Settings, Admins, Departments and Skills 

- Clients/Sites, site users, contacts, assigned employees, Job Types/Positions, schedules, reports, tours, checkpoints, locations, geo-fencing, notifications and site settings 

- Settings: General, Operation and Back Office configurations 

- Help, Chat, Groups/Segments, Automations, Job List, Security Operations, Communications, Team Resources, Training and Sign Out 

- All original filters, listing columns, exports and actions applicable to the Admin/Supervisor portal 

- All RFI-confirmed logic changes, exclusions and Pending Discussion items 

### **36.3 Scope Boundary** 

The uploaded source also contains Guard Mobile App and Client Portal sections. They were intentionally not expanded in this Admin/Supervisor Portal specification. Their shared Admin configuration and access-management touchpoints are included where applicable, while their standalone screens and workflows remain separate deliverables. 

### **36.4 Development Control** 

- A source-listed item must not be removed because it is duplicated elsewhere; it may link to a shared module. 

- An undefined source-listed heading must remain marked Pending Definition rather than being assigned invented fields or logic. 

- Items explicitly marked Pending Discussion must not be developed based on assumptions. 

- Items explicitly excluded by RFI must not be implemented in the current phase. 

- Any future functional change must be documented as an approved change request. 

AppZoro Technologies Inc. | Confidential | 59 AppZoro Technologies Inc. | Developer-Ready Functional Logic 

