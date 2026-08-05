RFI Admin/Supervisor Portal - Figma Make Design Specification 

# **RFI ADMIN / SUPERVISOR PORTAL** 

Figma Make Design and HCI Specification 

Complete page inventory, interaction behavior, user flows, fields, tables, filters, actions, states and usability requirements 

|**Prepared for**|RFI SecurityPersonnel OutsourcingPlatform|
|---|---|
|**Prepared by**|AppZoro Technologies Inc.|
|**Design Tool**|Figma Make|
|**Scope**|Admin and Supervisor Web Portal<br>|
|**Basis**|Verifed Developer Functional Specifcation and approved RFI<br>clarifcations|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **1. How to Use This Design Document** 

This document converts the approved functional scope into a design-ready plan for Figma Make. It does not create new business functionality. Any layout recommendation is a presentation method for an existing requirement and may be changed without changing scope. 

- Every source-listed page, module, section, subsection, field, table column, filter and action remains traceable. 

- Items marked Pending Discussion must be represented as placeholders or annotations and must not be finalized by assumption. 

- Items excluded for the current phase must not appear as active product screens. 

- Duplicated access points may open a shared screen, but the contextual entry point must remain available. 

## **2. Figma File Structure** 

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

## **3. Design Foundations** 

### **3.1 Responsive Frames** 

|**Frame**|**Recommended Width**|**Usage**|**Design Requirement**|
|---|---|---|---|
|Desktop Large|1440 px|Primary Admin/Supervisor<br>design|Full navigation and dense<br>operational tables|
|Desktop Standard|1280 px|Secondary validation frame|No horizontal clipping of core<br>actions|
|Tablet Landscape|1024 px|Supervisor feld access|Collapsible navigation and<br>adaptive tables|
|Mobile Web|Optional reference only|Emergency access where<br>applicable|Not a replacement for Guard<br>Mobile App|



### **3.2 Global Visual Language** 

- Operational, clean and information-dense without appearing cluttered. 

- Status colors must always include text or icon labels and must not rely on color alone. 

- Critical alerts and panic events require the strongest visual priority. 

- Tables should use sticky headers where long lists are expected. 

- Forms should group only the source-defined sections and fields. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- 

Financial information must be visually hidden when the role lacks financial visibility. 

### **3.3 Reusable Components** 

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

## **4. Global Screen Rules** 

### **4.1 Application Shell** 

- Left navigation displays only modules assigned through Roles and Permissions. 

- Site-restricted users see only records associated with assigned sites. 

- Top header contains Global Search, Notifications, Chat, User Profile and Sign Out. 

- Do not add a global create menu unless approved later. 

- Page-level search, filters, exports and actions appear only where specified. 

### **4.2 Standard States Required in Figma** 

- Default populated state 

- Empty state 

- Loading state 

- No search results 

- No permission / inaccessible module 

- Validation error 

- System error 

- Archived or inactive record state 

- Pending discussion state where applicable 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **5. Complete Page and Screen Specifications** 

The following sections retain the verified functional specification and add Figma-specific page anatomy. The source requirement text is preserved as the control for design coverage. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **1. Document Control and Scope Rules** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **1.1 Purpose** 

|**Design ID**|SCR-001|
|---|---|
|**Navigation Path**|. Document Control and Scope Rules → Purpose|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table,Filter bar / flter drawer,Form controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- This document defines the complete functionality of the RFI Admin/Supervisor Web Portal. It preserves applicable modules, sections, subsections, fields, filters, table columns, actions, settings and pending decisions from the source feature list and subsequent RFI responses. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **1.2 Scope Status Legend** 

|**Design ID**|SCR-002|
|---|---|
|**Navigation Path**|. Document Control and Scope Rules → Scope Status Legend|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **1.3 Controlling Rules** 

|**Design ID**|SCR-003|
|---|---|
|**Navigation Path**|. Document Control and Scope Rules → ControllingRules|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Form controls,Tabs / segmented controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- The platform is a single-company platform for the current version. 

- The architecture may support future multi-tenancy, but no current multi-tenant screens or controls are included. 

- RFI clarifications override conflicting wording in the original feature list. 

- Items marked Pending Discussion remain visible in this document but must not be treated as finalized. 

- No new approval flow, calculation rule, notification rule, reporting KPI, client capability, mobile behavior or workflow is assumed unless explicitly listed or confirmed. 

- UI organization may consolidate duplicated access points, but every listed functionality must remain accessible. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **1.4 Confirmed Organizational Structure** 

|**Design ID**|SCR-004<br>|
|---|---|
|**Navigation Path**|. Document Control and Scope Rules → Confrmed Organizational<br>Structure|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Interactive map, Form controls, Tabs / segmented controls, File<br>upload,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Company → Region → Client → Site → Job Type / Position → Shift 

- Client: organization associated with sites and Client Portal access. 

- Multiple clients may be assigned to one site. 

- Account Type: classification such as Regular Client, Multi-Site Client or Site Account. 

- Site: operational property where security services are performed. 

- Location: exact latitude/longitude or a defined internal site area. 

- Department: employee team used to group and assign employees. 

- Zone is ignored for the current phase. 

- Groups and Segments remain listed only because they exist in the source document; their detailed behavior is pending. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **2. Authentication, Access and Portal Framework** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **2.1 Authentication / Login** 

|**Design ID**|SCR-005|
|---|---|
|**Navigation Path**|. Authentication, Access and Portal Framework → Authentication /<br>Login|
|**Screen Type**|Dashboard / MonitoringScreen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- ALEXIOS/RFI Admin and Supervisor/Employee login. 

- Role-based redirection to the applicable dashboard. 

- Access only to modules assigned through Roles and Permissions. 

- Same web portal may be used for Admin, Supervisor and Client Portal access, according to assigned portal role. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **2.2 Roles and Permissions** 

|**Design ID**|SCR-006|
|---|---|
|**Navigation Path**|. Authentication, Access and Portal Framework → Roles and<br>Permissions<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Toggle / checkbox / radio controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Financial information visibility 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **2.3 Global Portal Elements** 

|**Design ID**|SCR-007|
|---|---|
|**Navigation Path**|. Authentication, Access and Portal Framework → Global Portal<br>Elements|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Search input,Export controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Global Search for Customers/Clients, Contacts, Employees, Reports and other supported records. 

- Notifications indicator. 

- Chat access. 

- User profile and Sign Out. 

- Page-level search, filters, export and actions only where specifically listed in this document. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **3. Dashboard** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **3.1 Platform Statistics** 

|**Design ID**|SCR-008|
|---|---|
|**Navigation Path**|. Dashboard → Platform Statistics|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls,<br>Calendar / schedule grid, Form controls, Tabs / segmented controls,<br>Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- 3.1.1 Clocked-In via Mobile 

- Shows the total number of guards clocked in today. 

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

- Status: Late Shift 

- Global Search 

- View details 

- 3.1.2 Inactive Mobile User 

 Shows guards who are clocked in but have no GPS updates or no mobile activity for a configured duration. The threshold is configured through Automations. Dashboard data refreshes every minute. 

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

- 3.1.3 Expired and Expiring Soon Skills 

- Shows active employee skills and credentials that are expired or expiring soon. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

- 3.1.4 Reports to Approve - Last 7 Days 

- Shows reports pending approval before publication to the Client Portal. 

- Click redirects to the Reports page under Operation Reports. 

- Approval requirement is configurable while creating the custom report. 

- 3.1.5 Message Board 

- Shows count of unread/pending messages created by Guards. 

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

- 3.1.6 Time-Off Requests 

- Shows count of pending time-off requests. 

- Click redirects to the Time Off page. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.2 Activity Log** 

|**Design ID**|SCR-009|
|---|---|
|**Navigation Path**|. Dashboard → ActivityLog|
|**Screen Type**|Listing/ Management Screen|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

|**Design ID**|SCR-009<br>|
|---|---|
|**Primary Components**|Filter bar / flter drawer, Calendar / schedule grid, Tabs / segmented<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

###### **PENDING DISCUSSION: Detailed Runsheet Patrol Events behavior remains undefined.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.3 Attendance** 

|**Design ID**|SCR-010|
|---|---|
|**Navigation Path**|. Dashboard → Attendance|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer, Search input, Calendar / schedule grid, Tabs /<br>segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Lists guards scheduled today and their clocked-in status, shift-wise. 

- Follow Connecteam-style attendance presentation. 

- Filters 

- Current 

- Current (Uncovered) 

- All Shifts 

- Covered 

- Late Shift 

- Global Search 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.4 Scheduled Tours** 

|**Design ID**|SCR-011|
|---|---|
|**Navigation Path**|. Dashboard → Scheduled Tours|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Data table,Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Listing Columns 

- Schedule Timing 

- Site Name 

- Schedule Title 

- Last Performed By 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.5 Task Dispatch** 

|**Design ID**|SCR-012|
|---|---|
|**Navigation Path**|. Dashboard → Task Dispatch<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table,Filter bar / flter drawer,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.6 Show Map** 

|**Design ID**|SCR-013|
|---|---|
|**Navigation Path**|. Dashboard → Show Map<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Interactive map|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Show checked-in guards on a map. 

- Open a popup/activity view for all activities since clock-in. 

- Remote Actions 

- Message with Siren 

- Remote Speak 

- Send Audio Message 

- Reload Install / Reload Settings 

- Clock Out and Stay Signed In 

- Clock Out and Sign Out 

###### **PENDING DISCUSSION: Remote Speak behavior remains pending definition.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.7 Global Search** 

|**Design ID**|SCR-014|
|---|---|
|**Navigation Path**|. Dashboard → Global Search|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Search input|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Search Customer/Client 

- Search Contacts 

- Search Employees 

- Search Reports 

- Redirect to the selected record detail page 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.8 Send an Update** 

|**Design ID**|SCR-015|
|---|---|
|**Navigation Path**|. Dashboard → Send an Update|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Send bulk updates to a Specific Group 

- Send to a Specific User 

- Send by User Type 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **3.9 Dashboard Submodules** 

|**Design ID**|SCR-016|
|---|---|
|**Navigation Path**|. Dashboard → Dashboard Submodules<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Calendar / schedule<br>grid,Form controls,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

- 3.9.2 Vehicle Management 

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

- 3.9.3 Schedule 

- Redirect to the Live Schedule page. 

- Follow the confirmed Connecteam-style schedule functionality defined in Section 8. 

- 3.9.4 Company Activity Journal 

- List activities performed by Admin users. 

##### **_Filters_** 

- Banned 

- Notes 

- Terminated 

- Reactivated 

- 3.9.5 System Exceptions 

- Redirect to the Ticketing/Help Desk module. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Display tickets automatically generated under system exception categories. 

###### **PENDING DISCUSSION: Detailed System Exceptions behavior beyond ticket generation remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **4. Employee Management** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **4.1 Add Employee** 

|**Design ID**|SCR-017|
|---|---|
|**Navigation Path**|. Employee Management → Add Employee<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedule grid, Form controls, File upload, Toggle / checkbox<br>/ radio controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

- 4.1.2 Address  Address  Address Line 2 

||City|
|---|---|
||State|
||ZIP Code|
||Country|
||4.1.3 Roles and Permissions|
||Administration Portal toggle|
||Admin role toggle|
||Manager/Supervisor role toggle|
||Employee Portal / Guard Mobile App toggle|
||Assign multiple roles|
||Assign permitted modules|
||Assign site restriction<br>|
||Confgure fnancial visibility where applicable|
||4.1.4 Other Fields|
||Logo or Picture|
||Tags|
||Fax|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Employment Date 

- Business Registration Number 

- Birthday 

- Terminated Date 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **4.2 Employee Listing** 

|**Design ID**|SCR-018|
|---|---|
|**Navigation Path**|. Employee Management → Employee Listing|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls, Form<br>controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

**EXCLUDED / CURRENTLY NOT REQUIRED: Zone filtering is excluded for the current phase.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **4.3 Employee Profile / View Employee** 

|**Design ID**|SCR-019<br>|
|---|---|
|**Navigation Path**|. Employee Management → Employee Profle / View Employee<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls,<br>Interactive map, Calendar / schedule grid, Form controls, Tabs /<br>segmented controls,File upload,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- 4.3.1 Overview and Basic Details 

- User Type 

- Employee ID 

- Phone 

- Email 

- Address 

- Other information captured during employee creation 

- 4.3.2 Assigned Sites 

##### **_Listing Columns_** 

- Site 

- Start Date 

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

- 4.3.3 Site Bans 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

- 4.3.9 Employee Actions 

- Change Password 

- Force Password Change 

- Generate/View ID Card 

- Snap Picture / Upload Profile Picture 

- Terminate 

- View Tracks / Current Location 

- Edit Employee 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

- Notify Supervisors 

##### **_Edit Employee_** 

- General Information 

- Address 

- Roles and Permission 

- Other Fields 

- Employee ID remains non-editable 

- 4.3.10 Skills and Attributes 

##### **_Listing Columns_** 

- Skill 

- Category 

- Information 

##### **_Filters_** 

- Category 

- Global Search 

- Admin manually verifies submitted credentials and updates status. 

##### **_Credential Statuses_** 

**Pending Review** 

- Verified 

- Rejected 

- Expiring Soon 

- Expired 

- 4.3.11 Security and Patrol - Reports 

##### **_Report Listing Columns_** 

- ID 

- Type 

- Flags 

- Date 

- Reported By 

- Account 

- Status 

- Printable PDF 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

- Date From-To 

- Global Search 

- 4.3.12 Summary Reports 

##### **_Listing Columns_** 

- Employee 

- Location 

- Reports 

- Videos 

- Checkpoints 

- Start 

- End 

- Tracks  PDF  View 

- Options 

##### **_Options_** 

- Approve All Reports 

- Send Shift Report by Email 

- Delete This Shift and Time Logs 

##### **_Filters_** 

- Date 

- Global Search 

 4.3.13 Tours 

##### **_Listing Columns_** 

- Tour Name 

- Account 

- Employee 

- Result 

- Start Time 

- End Time 

- Duration (Minutes) 

- PDF 

- Email  View Tour Session  Delete Tour Session 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Filters and Export_** 

- Date From-To 

- Global Search 

- Export CSV 

- Export PDF 

- Export Excel 

- Pivot Chart View 

- Pivot Chart Edit 

**PENDING DISCUSSION: Pivot Chart behavior remains source-listed but not further defined.** 

- 4.3.14 Schedules 

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

- 4.3.15 Time Off 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **4.4 Company Policies** 

|**Design ID**|SCR-020|
|---|---|
|**Navigation Path**|. Employee Management → CompanyPolicies|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Data table,Export controls,File upload|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Upload Policy Document in PDF 

- Policy Document Listing 

- Download Policy Document 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **4.5 User Settings** 

|**Design ID**|SCR-021|
|---|---|
|**Navigation Path**|. Employee Management → User Settings<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Customize fields for user profile 

- Personal Details 

- Company-Related Information 

- Compensation Details 

- Payment Information 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **4.6 Admins** 

|**Design ID**|SCR-022|
|---|---|
|**Navigation Path**|. Employee Management → Admins|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Data table,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Source requirements to represent_** 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **4.7 Departments** 

|**Design ID**|SCR-023|
|---|---|
|**Navigation Path**|. Employee Management → Departments<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Calendar / schedule grid, Form<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Employee List Columns 

- Employee 

- Start Date 

- Rate 

- Unassignment Date 

- Is Primary Site 

- Make Primary 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **4.8 Skills and Attributes Administration** 

|**Design ID**|SCR-024|
|---|---|
|**Navigation Path**|. Employee Management → Skills and Attributes Administration<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Form controls,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Actions 

- Assign Employee 

- Edit Skill 

- Archive 

- View History 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **5. Clients and Sites** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **5.1 Client and Site Rules** 

|**Design ID**|SCR-025|
|---|---|
|**Navigation Path**|. Clients and Sites → Client and Site Rules<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- One client may be assigned to multiple sites. 

- Multiple clients may be assigned to one site. 

- Shared-site Client Portal visibility remains pending. 

- Client is the entity receiving Client Portal access. 

- Account Type is a classification, not a separate hierarchy level. 

###### **PENDING DISCUSSION: Contract management is pending discussion.** 

###### **PENDING DISCUSSION: Detailed site closure consequences are pending discussion.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **5.2 Create Site / Client Account** 

|**Design ID**|SCR-026|
|---|---|
|**Navigation Path**|. Clients and Sites → Create Site / Client Account<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Search input,Form controls,File upload,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **5.3 Site Listing** 

|**Design ID**|SCR-027|
|---|---|
|**Navigation Path**|. Clients and Sites → Site Listing|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Data table,Form controls,File upload,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

 The source document does not define a complete site-list column set. The listing must at minimum provide access to created Site/Account records and their View action, without adding unapproved business fields. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **5.4 Site Profile** 

**<mark>Design ID</mark>** SCR-028 **<mark>Navigation Path</mark>** . Clients and Sites → Site Profile **<mark>Screen Type</mark>** Form / Configuration Screen Data table, Filter bar / filter drawer, Export controls, Interactive map, **Primary Components** Calendar / schedule grid, Form controls, Tabs / segmented controls, File upload, Metric card 

##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

##### **_Create Position / Job Type - Post Base Settings_** 

- Post Name 

- Post ID 

- Short Description of Tasks 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

- Missing requirements generate configured notification to Admin/Supervisor or another configured recipient; Admin takes action manually. 

- 5.4.3 Assigned Employees 

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

- 5.4.4 Employee Profile from Site 

- Overview 

- Basic Details: Name, Employee ID, Phone, Email, Address 

- HR Profile Information: Type, Pay Type, Hourly Rate Type, Region Default Rate, Overtime, Pay Run 

- Availabilities  Time Off 

- Skills and Certifications 

- Sites / Departments 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Schedules 

- Calendar View 

- 5.4.5 Client Portal Access 

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

**PENDING DISCUSSION: Client Portal visibility, actions, service requests, invoice behavior and shared-site access remain pending.** 

- 5.4.6 Banned Employees 

- Add employee to Banned Employees list 

- Prevent assignment to the banned site 

- 5.4.7 Other Site Contacts 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Action: Edit 

- 5.4.8 Other Site Actions 

- Edit Site using the same creation fields 

- Close Account 

##### **_Close Account Options_** 

- Terminate Site and All Contracts 

- Terminate One or More Positions 

- Termination Date 

- Confirmation Screen 

**PENDING DISCUSSION: Detailed automated consequences of site closure and contract termination remain pending.** 

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

**PENDING DISCUSSION: Journal Entries, Recordings, Financial by Shift and Exceptions/Audits remain source-listed but require detailed discussion.** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **6. Checkpoints and Tour Routes** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **6.1 Checkpoints** 

|**Design ID**|SCR-029|
|---|---|
|**Navigation Path**|. Checkpoints and Tour Routes → Checkpoints<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Export controls, Interactive map,<br>Calendar / schedule grid, Form controls, Toggle / checkbox / radio<br>controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

- Extra Scan Option: Display a Message  Extra Scan Option: Open a Report Form  Exception Verification: Validate Range 

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

##### **_Columns_** 

- Time 

- Employee 

- Account 

- Checkpoint 

- Tour 

- 6.1.4 Checkpoint Listing 

##### **_Columns_** 

- Checkpoint Name 

- Action 

- Assigned 

- Last Scan 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Location Map Icon 

- Edit 

##### **_Filters and Actions_** 

- Filters 

- Edit using the same Create Checkpoint form 

- 6.1.5 Checkpoint Alerts 

- Late Checkpoint Alert - configured under Automations 

- Tour Finished Alert - configured under Automations 

- Tour Incomplete Alert - configured under Automations 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **6.2 Tour Routes** 

|**Design ID**|SCR-030|
|---|---|
|**Navigation Path**|. Checkpoints and Tour Routes → Tour Routes<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Interactive map, Calendar /<br>schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- 6.2.1 Create Tour Route Fields 

- Description 

- Assigned To 

- Special Instructions 

- Estimated Tour Duration 

- Grace Period for Late Notification 

- Default grace period of 15 minutes when set to 0 

- Recurrence Type: Weekly  Recurrence Type: Monthly  Tour Schedule: Day and Time  6.2.2 Confirmed Tour Rules 

- Tour assigned to a specific employee of a shift through the Schedule module. 

- Guard starts the tour manually.  Guard must be clocked in.  Guard must be within the site geo-fence.  Checkpoint order and requirements are configurable when creating the tour. 

- Tour timing, grace and notification behavior are configurable when creating the tour. 

- Manual scans may require reason, comment, photo and GPS based on configuration; no approval is required. 

- Tour interruptions trigger notifications based on configured automation rules. 

- 6.2.3 Tour Listing and Actions  Tour Listing  Filters  Edit Settings  Manage Checkpoints 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- 6.2.4 Checkpoint Issue Reporting 

- Damaged NFC Tag 

- Missing Barcode 

- Inaccessible Checkpoint 

- Unsafe Location 

- GPS Inaccuracy 

- May trigger notification, maintenance task or system exception through configuration 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **7. Scheduling** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **7.1 Schedule Setup** 

|**Design ID**|SCR-031|
|---|---|
|**Navigation Path**|. Scheduling→ Schedule Setup<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **7.2 Schedule View** 

|**Design ID**|SCR-032|
|---|---|
|**Navigation Path**|. Scheduling→ Schedule View<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Day View 

- Week View 

- Month View 

- View by User 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

**PENDING DISCUSSION: Cross Schedule Events and Daily Health remain source-listed but require detailed discussion.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **7.3 Shift Creation** 

|**Design ID**|SCR-033|
|---|---|
|**Navigation Path**|. Scheduling→ Shift Creation|
|**Screen Type**|Calendar / Scheduler Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Date 

- From-To Date Range 

- All Days option 

- Start Time 

- End Time 

- Title 

- Job / Job Type 

- Users 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Address 

- Note 

- Shift Tags 

- Shift Tasks 

- Custom fields selected during Schedule creation 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **7.4 Schedule Behavior** 

|**Design ID**|SCR-034|
|---|---|
|**Navigation Path**|. Scheduling→ Schedule Behavior|
|**Screen Type**|Calendar / Scheduler Screen|
|**Primary Components**|Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Assigned users automatically receive assigned shifts. 

- Schedule can be updated after publishing. 

- Notification channel is configurable. 

- Recurring schedules are supported. 

- Schedule issues include overlapping shifts, insufficient rest, overtime, unavailability, time off, expired credentials, site bans, missing training and excessive weekly hours. 

- Missing Job Type requirements generate notifications; Admin decides manually. 

**PENDING DISCUSSION: Shift acceptance, rejection, open shifts, claiming, swaps and replacement workflow remain pending.** 

###### **PENDING DISCUSSION: Cross-midnight shift handling remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **8. Time Clock, Attendance and Work Exceptions** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **8.1 Clock-In / Clock-Out** 

|**Design ID**|SCR-035|
|---|---|
|**Navigation Path**|. Time Clock,Attendance and Work Exceptions → Clock-In / Clock-Out|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Interactive map|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Guard clocks in through the Mobile App. 

- Clock-in is blocked outside the site geo-fence. 

- Early clock-in, late clock-in and early clock-out thresholds are configurable in Settings. 

- Manual timesheet changes are allowed and audited. 

- Break rules are configurable. 

###### **PENDING DISCUSSION: Offline clock-in, clock-out and synchronization remain pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **8.2 Time Clock Pages** 

|**Design ID**|SCR-036|
|---|---|
|**Navigation Path**|. Time Clock,Attendance and Work Exceptions → Time Clock Pages|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table,Filter bar / flter drawer,Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Security Operations > Time Clock > Site Listing 

- Timesheet with Today filter 

- Employee profile Work Exceptions 

- Site Work Exceptions 

- Dashboard Attendance 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **8.3 Timesheet / Exception Information** 

|**Design ID**|SCR-037|
|---|---|
|**Navigation Path**|. Time Clock, Attendance and Work Exceptions → Timesheet /<br>Exception Information|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Use the source-listed time and exception fields. Do not assume additional approval states or payroll actions that are not defined. 

- Scheduled and actual shift times as available 

- Meal Break Exception 

- Meal Schedule 

- Meal Actual 

- Rest Break Exception 

- Rest Schedule 

- Rest Actual 

- Manual adjustment history 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **9. Reports and Incidents** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **9.1 Reports versus Forms** 

|**Design ID**|SCR-038|
|---|---|
|**Navigation Path**|. Reports and Incidents → Reports versus Forms<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Forms are manually created using a customizable form builder and assigned to employees to complete. 

- Reports are generated through Custom Report Forms, Categories, Incident Categories and Report Footers configured by Admin. 

- Forms and Reports remain separate functional areas. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **9.2 Report Listing** 

|**Design ID**|SCR-039|
|---|---|
|**Navigation Path**|. Reports and Incidents → Report Listing|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls,<br>Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Columns 

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

- Filters 

- Active 

- All Templates 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **9.3 Report Approval and Publication** 

|**Design ID**|SCR-040|
|---|---|
|**Navigation Path**|. Reports and Incidents → Report Approval and Publication<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Approval requirement is configured while creating the custom report. 

- No multi-level approval workflow. 

- No formal correction/return workflow. 

- Reports are site-specific. 

- Digital acknowledgment is supported. 

- Report Mentions are excluded. 

###### **PENDING DISCUSSION: Client Portal publication and detailed visibility remain pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **9.4 Custom Report Configuration** 

|**Design ID**|SCR-041<br>|
|---|---|
|**Navigation Path**|. Reports and Incidents → Custom Report Confguration<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Form controls, Tabs /<br>segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **9.5 Incident Categories** 

|**Design ID**|SCR-042|
|---|---|
|**Navigation Path**|. Reports and Incidents → Incident Categories|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Form controls|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Incident type/category is manually created by Admin. 

- No automatic incident workflow beyond configured report and automation behavior is assumed. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **9.6 Media Limits** 

|**Design ID**|SCR-043|
|---|---|
|**Navigation Path**|. Reports and Incidents → Media Limits|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Use standard limits for photos, videos, audio and files. 

- Exact file sizes, counts and durations are configurable and should be finalized during technical design. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **10. Forms** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **10.1 Form Management** 

|**Design ID**|SCR-044|
|---|---|
|**Navigation Path**|. Forms → Form Management<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Export controls,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New Form 

- Form Listing 

- Active 

- Archived 

- Export 

- Move 

- Archive 

- Delete 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **10.2 Form Builder** 

|**Design ID**|SCR-045|
|---|---|
|**Navigation Path**|. Forms → Form Builder<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Create customized fields 

- Assign forms to employees 

- Employees complete assigned forms 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **10.3 Form Submissions** 

|**Design ID**|SCR-046|
|---|---|
|**Navigation Path**|. Forms → Form Submissions<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Export controls,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- List submitted forms and provide view/export access according to the selected form structure. Do not add unconfirmed approval or reporting workflows. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **11. Tasks, Dispatch and Job List** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **11.1 Task Types** 

|**Design ID**|SCR-047|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List → Task Types|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Dispatch Task 

- Quick Task 

- Recurring Task 

- Help Desk Ticket 

- Job Type - separate from Task and used for the employee role/service performed during a shift 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **11.2 Assignment** 

|**Design ID**|SCR-048|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List → Assignment|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Assign to one selected target, such as an employee, Job Type, site, shift, department or supported group. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **11.3 Task Creation** 

|**Design ID**|SCR-049|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List → Task Creation<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,File upload|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add Task 

- Select Task Type 

- Show a form based on selected Task Type 

- List the created task 

- Fields vary by Task Type. Do not treat priority, evidence, attachments, due date or checklists as universally mandatory unless defined in the selected task form. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **11.4 Task Filters and Counts** 

|**Design ID**|SCR-050|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List → Task Filters and Counts|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Form controls,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **11.5 Escalation** 

|**Design ID**|SCR-051|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List → Escalation|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Overdue or incomplete tasks may trigger configured automation actions. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **11.6 Job List** 

|**Design ID**|SCR-052|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List → Job List<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add 

- Import 

###### **PENDING DISCUSSION: Detailed Job List behavior remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **12. Communications** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **12.1 Combined Communication Module** 

|**Design ID**|SCR-053|
|---|---|
|**Navigation Path**|. Communications → Combined Communication Module|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Chat - employee communication 

- Message Board - messages created by guards 

- Broadcast - message sent to selected user types/users/groups/sites as configured 

- Updates - company or operational updates 

- Notifications - system-generated communication 

- SMS - delivery channel 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **12.2 Chat** 

|**Design ID**|SCR-054|
|---|---|
|**Navigation Path**|. Communications → Chat|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Export controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- New Chat 

- New Group 

- Broadcast Message 

**PENDING DISCUSSION: Private chat visibility, moderation, export, attachment rules, retention, guard-to-guard behavior and Client participation remain pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **12.3 Updates** 

|**Design ID**|SCR-055|
|---|---|
|**Navigation Path**|. Communications → Updates<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Export controls,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Listing 

- Create Update 

- Export 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **12.4 Directory** 

|**Design ID**|SCR-056|
|---|---|
|**Navigation Path**|. Communications → Directory<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Export controls,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Actions 

- Listing 

- Tag Users 

- Notify 

- Send Chat Message 

- Create Group Chat with Selected 

- Create Task 

- Export 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **12.5 Forms within Communications** 

|**Design ID**|SCR-057|
|---|---|
|**Navigation Path**|. Communications → Forms within Communications<br>|
|**Screen Type**|Form / Confguration Screen|
||RFI Admin/Supervisor Portal - Figma Design and HCI Specifcation|



RFI Admin/Supervisor Portal - Figma Make Design Specification 

|**Design ID**|SCR-057|
|---|---|
|**Primary Components**|Data table,Export controls,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Listing 

- Add New Form 

- Archived 

- Export 

- Move 

- Archive 

- Delete 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **12.6 Help Desk** 

|**Design ID**|SCR-058|
|---|---|
|**Navigation Path**|. Communications → HelpDesk|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Unassigned 

- Assigned to Me 

- All 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **13. Security Operations** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **13.1 Schedules** 

|**Design ID**|SCR-059|
|---|---|
|**Navigation Path**|. SecurityOperations → Schedules|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Data table,Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Site Listing 

- View Schedule button redirects to Site > Schedule 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **13.2 Time Clock** 

|**Design ID**|SCR-060|
|---|---|
|**Navigation Path**|. SecurityOperations → Time Clock|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table,Filter bar / flter drawer,Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Site Listing 

- Timesheet with Today filter 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **13.3 Forms** 

|**Design ID**|SCR-061|
|---|---|
|**Navigation Path**|. SecurityOperations → Forms<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- 

- 

   - Primary content follows the source-defined section order below. 

   - Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New Form 

- Forms Listing 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **13.4 Quick Tasks** 

|**Design ID**|SCR-062|
|---|---|
|**Navigation Path**|. SecurityOperations →Quick Tasks<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Search input,Form controls,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **13.5 Post Orders, SOPs and Manuals** 

|**Design ID**|SCR-063|
|---|---|
|**Navigation Path**|. SecurityOperations → Post Orders,SOPs and Manuals<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Export controls, Form controls,<br>Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New 

- Listing 

- Filter Active 

- Filter Archived 

- Export 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **13.6 Company Vehicle Documentation** 

|**Design ID**|SCR-064|
|---|---|
|**Navigation Path**|. SecurityOperations → CompanyVehicle Documentation<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Export controls,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New 

- Vehicle Listing 

- Export 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **14. Documents, Policies and Team Resources** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **14.1 Documents and Policies** 

|**Design ID**|SCR-065|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Documents and Policies|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Company Policies 

- Post Orders 

- SOPs 

- Manuals 

- Employee Documents 

- Site Documents 

- Company Vehicle Documentation 

- Workplace Notices and Posters 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.2 Team Member Manual** 

|**Design ID**|SCR-066|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Team Member Manual<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add Manual 

- Listing 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **14.3 Rewards** 

|**Design ID**|SCR-067|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Rewards|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Purchase Tokens 

- Send Tokens 

- Sent Tokens 

- User Activity 

- Purchase History 

###### **PENDING DISCUSSION: Rewards and Tokens workflow remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.4 Documents** 

|**Design ID**|SCR-068|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Documents<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Create Pack 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.5 Team Member Benefits Information** 

|**Design ID**|SCR-069<br>|
|---|---|
|**Navigation Path**|. Documents, Policies and Team Resources → Team Member Benefts<br>Information<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Export controls,Form controls,Tabs / segmented controls|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New 

- Active 

- Archived 

- Export 

###### **PENDING DISCUSSION: Benefits workflow remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.6 Celebrations** 

|**Design ID**|SCR-070|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Celebrations|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Past and Upcoming Birthdays 

- Tomorrow 

- Today 

###### **PENDING DISCUSSION: Celebrations workflow remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.7 Time Off and Paid Policies** 

|**Design ID**|SCR-071<br>|
|---|---|
|**Navigation Path**|. Documents, Policies and Team Resources → Time Of and Paid<br>Policies<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add Time Off 

- Paid Policies 

- Add Policy Type 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.8 Insights** 

|**Design ID**|SCR-072|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Insights<br>|
|**Screen Type**|Detail / Profle Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Export controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Export 

###### **Pending Request** 

- Filters 

###### **PENDING DISCUSSION: Detailed Insights behavior remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.9 Text Message** 

|**Design ID**|SCR-073|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Text Message|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- New Message 

- Message List 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

######  Filters 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.10 Workplace Notices and Posters** 

|**Design ID**|SCR-074|
|---|---|
|**Navigation Path**|. Documents, Policies and Team Resources → Workplace Notices and<br>Posters<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Export controls,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Active 

- Archived 

- Add New 

- Export 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.11 Disciplinary Reports** 

|**Design ID**|SCR-075|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → DisciplinaryReports<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Form controls, Tabs / segmented<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New 

- Reports Listing 

- Active 

- Archived 

- Filter 

**PENDING DISCUSSION: Detailed disciplinary workflow remains pending.** 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.12 HR Complaint Form** 

|**Design ID**|SCR-076|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → HR Complaint Form<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table, Search input, Export controls, Form controls, Tabs /<br>segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Listing 

- Active 

- Archived 

- Add New 

- Export 

- Search 

###### **PENDING DISCUSSION: Detailed HR complaint workflow remains pending.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **14.13 Hiring** 

|**Design ID**|SCR-077|
|---|---|
|**Navigation Path**|. Documents,Policies and Team Resources → Hiring<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table, Search input, Interactive map, Form controls, Tabs /<br>segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add Positions 

- Listing 

- Active 

- Archived 

- Search 

###### **PENDING DISCUSSION: Applicant tracking and onboarding depth remain pending.** 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **15. Training** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **15.1 Quizzes** 

|**Design ID**|SCR-078|
|---|---|
|**Navigation Path**|. Training→Quizzes<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls, Form<br>controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New 

- Quiz Listing 

- Active 

- Archived 

- Export 

- Search 

- Filter 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **15.2 RFI Academy** 

|**Design ID**|SCR-079|
|---|---|
|**Navigation Path**|. Training→ RFI Academy<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls, Form<br>controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New 

- Listing 

- Active 

- Archived 

- Export 

- Search 

- Filter 

**PENDING DISCUSSION: Training content types, automatic skill/certification assignment, certificates, expiration and renewal behavior remain pending.** 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **16. Vehicles** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **16.1 Confirmed Scope** 

|**Design ID**|SCR-080<br>|
|---|---|
|**Navigation Path**|. Vehicles → Confrmed Scope|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Vehicle management is limited to vehicle records and documentation. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **16.2 Vehicle Management** 

|**Design ID**|SCR-081|
|---|---|
|**Navigation Path**|. Vehicles → Vehicle Management<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Form controls, Tabs / segmented<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **16.3 Company Vehicle Documentation** 

|**Design ID**|SCR-082|
|---|---|
|**Navigation Path**|. Vehicles → CompanyVehicle Documentation<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table, Export controls, Interactive map, Form controls, Tabs /<br>segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Add New 

- Vehicle Listing 

- Export 

**EXCLUDED / CURRENTLY NOT REQUIRED: Fuel, mileage, maintenance, repair, GPS, equipment tracking and vehicle assignment history are excluded.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **17. Automations and Notifications** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **17.1 Automation Builder** 

|**Design ID**|SCR-083<br>|
|---|---|
|**Navigation Path**|. Automations and Notifcations → Automation Builder<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

- Status  Skill / Credential  Tour  Checkpoint  Actions  Send Notification 

- Send Email 

- Send SMS  Send Push Notification 

- Create Task  Create Ticket / System Exception  Notify Admin  Notify Supervisor 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Notify Employee 

- Create Incident 

- Send Broadcast 

- Update applicable status where configured 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **17.2 Scope Rules** 

|**Design ID**|SCR-084<br>|
|---|---|
|**Navigation Path**|. Automations and Notifcations → Scope Rules|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- One automation cannot be assigned to multiple sites. 

- No acknowledgment-based escalation. 

- Duplicate notifications for the same unresolved event must be suppressed. 

**PENDING DISCUSSION: Whether company-wide/global automations are allowed remains pending.** 

**PENDING DISCUSSION: Exact duplicate-suppression settings remain to be finalized during design.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **18. Payroll and Back Office** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **18.1 Payroll Scope** 

|**Design ID**|SCR-085<br>|
|---|---|
|**Navigation Path**|. Payroll and Back Ofice → Payroll Scope<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Payroll calculation is required. 

- Detailed calculation formulas, rate priority and workflow statuses remain pending. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **18.2 Confirmed Back Office Configuration** 

|**Design ID**|SCR-086<br>|
|---|---|
|**Navigation Path**|. Payroll and Back Ofice → Confrmed Back Ofice Confguration<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Export controls, Calendar / schedule grid, Form controls, Tabs /<br>segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **18.3 Employee Financial Information** 

|**Design ID**|SCR-087<br>|
|---|---|
|**Navigation Path**|. Payroll and Back Ofice → Employee Financial Information<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Form controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Compensation Details 

- Payment Information 

- Financial visibility controlled by custom permissions 

###### **PENDING DISCUSSION: Invoice generation is pending discussion.** 

###### **PENDING DISCUSSION: Payroll provider and accounting integration are pending discussion.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **19. Settings and Configuration** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **19.1 General Configuration** 

|**Design ID**|SCR-088<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration → General Confguration<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

###### **PENDING DISCUSSION: The exact 13 general categories remain pending definition.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **19.2 Operation Configuration** 

|**Design ID**|SCR-089<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration → Operation Confguration<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedulegrid,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Source requirements to represent_** 

- Report Templates 

- Site Templates 

- Zone Templates 

- Incident Templates 

- Devices and License 

- Region Message Boards 

- Job / Service Type 

- Special Calendar Days 

- Calendar Groups 

###### **EXCLUDED / CURRENTLY NOT REQUIRED: Zone Templates are excluded for the current phase.** 

###### **PENDING DISCUSSION: Devices and License, Region Message Boards and Calendar Groups require detailed discussion.** 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **19.3 Back Office Configuration** 

|**Design ID**|SCR-090<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration → Back Ofice Confguration<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Export controls, Calendar / schedule grid, Form controls, Tabs /<br>segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **19.4 Password Policy and Sign-In Log** 

|**Design ID**|SCR-091<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration → Password Policyand Sign-In Log<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Retain the Password Policy and Sign-In Log sections from the source. Detailed password rules and sign-in log columns may be finalized during technical design without introducing a new business workflow. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **19.5 Data Retention** 

|**Design ID**|SCR-092<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration → Data Retention|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Retention is configurable by data category. 

- Applicable categories include GPS/activity history, reports, media, messages, timesheets, audit history, panic events, tours and checkpoint scans. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **20. Groups and Segments** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **21. Help and Help Desk** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **21.1 Help** 

|**Design ID**|SCR-093|
|---|---|
|**Navigation Path**|. Helpand HelpDesk → Help|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Resource Center 

- Talk to an Expert 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **21.2 Help Desk** 

|**Design ID**|SCR-094|
|---|---|
|**Navigation Path**|. Helpand HelpDesk → HelpDesk|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Unassigned 

- Assigned to Me 

- All 

- Help and Help Desk are separate functional areas. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **22. Supervisor Portal Behavior** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **23. Pending Discussion Register** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **23.1 Scheduling** 

|**Design ID**|SCR-095|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → Scheduling|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Shift acceptance 

- Shift rejection 

- Open shifts 

- Shift claiming 

- Shift swaps 

- Shift replacement workflow 

- Cross-midnight handling 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **23.2 Site, Client and Contracts** 

|**Design ID**|SCR-096|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → Site,Client and Contracts|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Contract management 

- Detailed site closure consequences 

- Client Portal visibility 

- Client report actions 

- Client service requests 

- Invoice behavior 

- Shared-site visibility for multiple clients 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **23.3 Guard Mobile / Attendance Dependencies** 

|**Design ID**|SCR-097|
|---|---|
|**Navigation Path**|. Pending Discussion Register → Guard Mobile / Attendance<br>Dependencies|
|**Screen Type**|Map/ Spatial Screen|
|**Primary Components**|Interactive map|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Offline clock-in/out and synchronization 

- Multiple devices per guard 

- Shared devices 

- Device approval 

- GPS tracking frequency 

- Watch Mode 

- Guard visibility of other guards 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **23.4 Communications** 

|**Design ID**|SCR-098|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → Communications|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Export controls,Form controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Admin visibility into private chats 

- Edit/delete rights 

- Chat export 

- Media attachments 

- Retention period 

- Guard-to-guard rules 

- Client participation 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **23.5 HR and Team Resources** 

|**Design ID**|SCR-099|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → HR and Team Resources|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Hiring depth 

- Benefits 

- Rewards and Tokens 

- Celebrations 

- Complaints 

- Disciplinary workflow 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **23.6 Training** 

|**Design ID**|SCR-100|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → Training|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Content formats 

- Automatic skill/certification assignment 

- Certificates 

- Expiration and renewal 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **23.7 Finance** 

|**Design ID**|SCR-101|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → Finance<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Form controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Invoice generation 

- Accounting integration 

- Payroll provider integration 

- Detailed payroll formulas and processing workflow 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **23.8 Migration** 

|**Design ID**|SCR-102|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → Migration|
|**Screen Type**|Map/ Spatial Screen|
|**Primary Components**|Interactive map|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- TrackTik data migration 

- Connecteam data migration 

- Parallel operation 

- Historical data categories 

- Cutover process 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **23.9 Undefined Source Features** 

|**Design ID**|SCR-103<br>|
|---|---|
|**Navigation Path**|. PendingDiscussion Register → Undefned Source Features|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

- Groups and Segments behavior 

- Pivot Chart View/Edit 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **24. Excluded for Current Phase** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **25. Functional Traceability Summary** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **26. Final Acceptance Principle** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **PART II - DETAILED DEVELOPER FUNCTIONAL SPECIFICATION** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **27. Cross-Module Development Standards** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **27.1 Record Identity and Data Integrity** 

|**Design ID**|SCR-104|
|---|---|
|**Navigation Path**|. Cross-Module Development Standards → Record Identity and Data<br>Integrity|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Data table,Form controls,Tabs / segmented controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Every primary business record must have an internal immutable system ID. Display IDs such as Employee ID, Site ID, Vehicle ID and Report ID remain separate user-facing values. 

- Employee ID is generated automatically and cannot be edited after employee creation. 

- Related records must store internal references rather than copied names so historical links remain valid when names change. 

- Records referenced by historical shifts, reports, tours, timesheets or audit entries must not be hard-deleted. Use Active, Inactive or Archived status where the source document provides it. 

- All date/time values must be stored consistently and displayed using the site or system time-zone setting applicable to the record. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **27.2 Common Listing Behavior** 

|**Design ID**|SCR-105|
|---|---|
|**Navigation Path**|. Cross-Module Development Standards → Common ListingBehavior|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls,<br>Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Load only records the logged-in user is permitted to access based on module access and assigned-site restriction. 

- Apply each listed filter independently and combine multiple filters using AND logic unless a filter explicitly supports multiple selections. 

- Global Search on a page searches only the columns relevant to that page; the portal-level Global Search searches supported entity types. 

- Exports must use the same active filters and search criteria currently applied to the listing. 

- Archived records appear only when the applicable Active/Archived/All filter includes them. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Actions must operate on the selected record and refresh the list after successful completion. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **27.3 Form Behavior and Validation** 

|**Design ID**|SCR-106|
|---|---|
|**Navigation Path**|. Cross-Module Development Standards → Form Behavior and<br>Validation<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Required fields must be visibly marked and validated before submission. 

- Email fields must validate email format. Phone fields must retain country code and SMS-consent value separately. 

- Date ranges must prevent an end date earlier than the start date unless the feature is explicitly pending discussion. 

- Dropdowns populated from configurable master data must show active values and provide the confirmed custom-create option only where specifically approved. 

- On validation failure, retain entered data and show field-specific errors. 

- Edit forms must load the current saved values and update only submitted changes. 

- Confirmation must be required for destructive or access-revoking actions such as termination, close account, archive, remove and revoke access. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **27.4 Permissions and Site Restriction** 

|**Design ID**|SCR-107|
|---|---|
|**Navigation Path**|. Cross-Module Development Standards → Permissions and Site<br>Restriction|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Search input,Export controls,Toggle / checkbox / radio controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Authenticate the user, resolve all assigned roles, merge module-access toggles and apply assigned-site restriction. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- When any role grants module access, the user can use all actions within that module, subject to assigned-site restriction and custom financial visibility. 

- Users with restricted sites must not retrieve, search, export or directly open records belonging only to unassigned sites. 

- Users may hold multiple roles. No temporary-role date range is required. 

- No separate Dispatcher role is required. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **27.5 Audit and Activity Recording** 

|**Design ID**|SCR-108|
|---|---|
|**Navigation Path**|. Cross-Module Development Standards → Audit and ActivityRecording<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Record audit entries for create, edit, archive, remove, access grant/revoke, password action, termination, time edit, report approval, schedule update, automation update and configuration change. 

- Each audit entry must identify user, date/time, module, record, action and changed values when applicable. 

- Company Activity Journal uses the defined activity types Banned, Notes, Terminated and Reactivated. 

- Operational activity events must feed the applicable Dashboard Activity Log and Site Live Dashboard filters. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **27.6 Notifications** 

|**Design ID**|SCR-109<br>|
|---|---|
|**Navigation Path**|. Cross-Module Development Standards → Notifcations|
|**Screen Type**|Calendar / Scheduler Screen|
|**Primary Components**|Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Only send notifications when a source-defined event, explicit user action or enabled automation requires one. 

- Use the configured notification sender name and sender email. 

- Duplicate notification suppression must prevent repeated alerts for the same unresolved automation event. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- No acknowledgment-based escalation is required. 

- Notification delivery channels and schedule-change channels are configurable where confirmed. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **28. Authentication, Roles and Portal Framework - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **28.1 Login** 

|**Design ID**|SCR-110|
|---|---|
|**Navigation Path**|. Authentication, Roles and Portal Framework - Development Logic →<br>Login<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

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

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **28.2 Roles and Permissions** 

|**Design ID**|SCR-111|
|---|---|
|**Navigation Path**|. Authentication, Roles and Portal Framework - Development Logic →<br>Roles and Permissions<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls, Tabs / segmented controls, Toggle / checkbox / radio<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Create/Edit Role 

- Admin enters Role Name, Description and Portal Section/Type. 

- Admin enables module-access toggles and optional assigned-site restriction. 

- Admin defines financial information visibility. 

- Saving a role makes it available for assignment to users. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Changes apply to future authorization checks and must be audited. 

- Multiple Role Resolution 

- Combine access granted by all active roles assigned to the user. 

- Apply site restriction to every data query. 

- Financial visibility must remain separately controlled even when general module access is granted. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **28.3 Global Search** 

|**Design ID**|SCR-112|
|---|---|
|**Navigation Path**|. Authentication, Roles and Portal Framework - Development Logic →<br>Global Search|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Search input|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Search Logic 

- Accept a text query and search supported Customers/Clients, Contacts, Employees, Reports and other explicitly enabled records. 

- Group results by record type. 

- Only return records permitted by module and assigned-site access. 

- Selecting a result opens its detail page. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **29. Dashboard - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **29.1 Dashboard Loading and Refresh** 

|**Design ID**|SCR-113|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Dashboard Loadingand Refresh|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table,Filter bar / flter drawer,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Load each dashboard statistic from its source module using the logged-in user’s site scope. 

- Refresh dashboard operational data every minute. 

- Each count card opens the linked detail listing with the corresponding filter already applied. 

- Counts and listing results must use the same query rules to prevent mismatches. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.2 Clocked-In via Mobile** 

|**Design ID**|SCR-114|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Clocked-In via Mobile|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Calendar / schedulegrid,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Count Logic 

- Count guards with an active mobile clock-in for the current day and accessible sites. 

- Use shift status to classify Current, Current (Uncovered), All Shifts, Covered and Late Shift. 

- Opening the card displays Name, Position/Job Type, Clocked-in Time and Shift Name. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **29.3 Inactive Mobile User** 

|**Design ID**|SCR-115|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Inactive Mobile User<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Detection Logic 

- Only evaluate guards currently clocked in. 

- Compare last GPS update and last mobile activity against the enabled automation duration. 

- When either configured inactivity condition is met, create one system ticket for the unresolved event. 

- Do not create a duplicate ticket/notification while that same inactivity event remains unresolved. 

- List Date, Ticket Type, First Name, Last Name, Subject, Location, Status and View. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.4 Expired and Expiring Skills** 

|**Design ID**|SCR-116|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Expired and ExpiringSkills|
|**Screen Type**|Section / Feature Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Export controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Status Logic 

- Compare each employee skill expiration date to the current date and configured expiring-soon window. 

- Expired records are those before the current date; expiring-soon records are within the configured window. 

- Apply category and date filters and export the filtered Employee Name, Expiration Date, Expires, Description, Region and Category data. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.5 Reports to Approve** 

|**Design ID**||SCR-117|
|---|---|---|
|**Navigation Path**||. Dashboard - Development Logic → Reports to Approve<br>|
|**Screen Type**||Form / Confguration Screen|
||RFI Admin/Supervisor Portal - Figm|a Design and HCI Specifcation|



RFI Admin/Supervisor Portal - Figma Make Design Specification 

|**Design ID**|SCR-117<br>|
|---|---|
|**Primary Components**|Filter bar / flter drawer,Calendar / schedulegrid,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Count reports submitted during the last seven days whose custom report configuration requires approval and are in the applicable pending status. 

- Clicking the count opens Operation Reports with the approval and date filters applied. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.6 Message Board** 

|**Design ID**|SCR-118|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Message Board|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer, Search input, Form controls, Tabs / segmented<br>controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Count guard-created messages pending to be read according to the available message status. 

- List Sender Name, Title, Message, Date and Time, Site and Viewable By. 

- Apply Category, Current/Future/Expired and Global Search filters. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.7 Time-Off Requests** 

|**Design ID**|SCR-119<br>|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Time-Of Requests|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Count pending time-off requests accessible to the user. 

- Clicking the count opens the Time Off page filtered to pending requests. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.8 Activity Log** 

|**Design ID**|SCR-120|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → ActivityLog|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer, Calendar / schedule grid, Tabs / segmented<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Latest shows current-day events. 

- View History allows date-based historical events. 

- Filter by All Events, Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scans, Runsheet Patrol Events and Remote Actions. 

- Apply From-To date filter. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.9 Attendance** 

|**Design ID**|SCR-121|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Attendance|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer, Search input, Calendar / schedule grid, Tabs /<br>segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Source requirements to represent_** 

- Required Logic 

- List guards scheduled for the current day shift-wise and their clock status. 

- Provide Current, Current (Uncovered), All Shifts, Covered and Late Shift filters plus Global Search. 

- Attendance must use the schedule and mobile time-clock records as its source. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.10 Scheduled Tours** 

|**Design ID**|SCR-122|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Scheduled Tours|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- List current-day scheduled tours for accessible sites. 

- Display Schedule Timing, Site Name, Schedule Title and Last Performed By. 

- Last Performed By is populated from the latest completed tour session for that schedule when available. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.11 Task Dispatch** 

|**Design ID**|SCR-123|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Task Dispatch<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Add Task opens the task form determined by selected Task Type. 

- List tasks and filter by New Tasks, In Progress, New and In Progress and Completed. 

- Filter assignment by All, Not Assigned, Assigned to Any and Assigned to Employee. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **29.12 Show Map and Remote Actions** 

|**Design ID**|SCR-124|
|---|---|
|**Navigation Path**|. Dashboard - Development Logic → Show Mapand Remote Actions|
|**Screen Type**|Map/ Spatial Screen|
|**Primary Components**|Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Show clocked-in guards using their latest available GPS location. 

- Selecting a guard opens their activities since clock-in. 

- Provide Message with Siren, Remote Speak, Send Audio Message, Reload Install/Settings, Clock Out and Stay Signed In, and Clock Out and Sign Out. 

- Send Audio Message transmits an audio message; it must not remotely activate the guard microphone. 

- Remote Speak remains Pending Discussion and must not be implemented beyond an inactive placeholder until defined. 

- Clock-out actions must update the active time-clock session and record an audit/remote action event. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **30. Employee Management - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **30.1 Add Employee** 

|**Design ID**|SCR-125|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Add Employee<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls, Tabs / segmented controls, Toggle / checkbox / radio<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Creation Logic 

- Generate Employee ID automatically when the employee is successfully created. 

- Capture every General Information, Address, Roles and Permissions, and Other Fields value listed in Part I. 

- Employee Type uses an active configurable dropdown and allows Admin to create a new type when the required value does not exist. 

- Phone SMS consent is stored independently for Main Phone and Other Phone. 

- Portal access toggles determine whether credentials/access are enabled for Administration Portal and/or Employee/Guard Portal. 

- Password and Confirm Password must match. 

- Prevent duplicate Username and duplicate Employee ID. 

- After save, create the employee record, role assignments and department assignment. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.2 Employee Listing** 

|**Design ID**|SCR-126|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Employee Listing|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls, Form<br>controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Display exactly the approved columns: UID, Name, Middle Name, Last Name, Title, Termination Date, Email, Username, User Type, Department, Status, Last Visit and Added By. 

- Apply Department, Zone (source-listed but current phase treatment per scope), Status and Global Search filters. 

- CSV, PDF and Excel exports must reflect the active filters. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.3 Assigned Sites** 

|**Design ID**|SCR-127|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Assigned Sites|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Tabs / segmented controls,Toggle / checkbox / radio controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Assignment Logic 

- An employee may be assigned to multiple sites and may have different rates and Job Types at different sites. 

- Assign Site requires Site Name, Employee Start Date and Is Primary Site Yes/No. 

- Only one assignment should be treated as primary at a time when Make Primary is used. 

- Remove ends/removes the active assignment without deleting historical shift/report records. 

- List Site, Start Date, Effective Rate Date, Rate, End, Is Primary, Make Primary and Remove action. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.4 Site Bans** 

|**Design ID**|SCR-128|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Site Bans<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedule grid, Form controls, Tabs / segmented controls,<br>File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Ban Logic 

- Create a site-ban record with Site, Reason, Effective Date, Expiration Date, Permanent/Temporary, Requested By, Internal Notes, Attachment and Status where available from the confirmed clarification. 

- Scheduler must prevent assignment to a site when an active ban applies on the shift date. 

- Remove Ban changes the ban status and preserves history. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- 

   - Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.5 Emergency Contacts and Notes** 

|**Design ID**|SCR-129|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Emergency Contacts<br>and Notes<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Form controls, Tabs / segmented<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Create Contact stores the employee emergency contact and includes it in Active/Archived/Status-filtered listing. 

- Add Notes stores the note author, date/time and applicable type/status required by the Company Activity Journal filters. 

- Notes by Employee and Notes on Employee remain separate views as listed. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.6 Availability** 

|**Design ID**|SCR-130|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Availability|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Default weekly availability is Available/Green. 

- Admin can change each day/time block to Available/Green, May Be Available/Yellow or Not Available/Red. 

- Scheduling conflict checks must read the employee availability applicable to the shift date/time. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **30.7 Work Exceptions** 

|**Design ID**|SCR-131|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Work Exceptions|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer, Search input, Calendar / schedule grid, Metric<br>card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- List Shift Start, Shift End, Region, Account Name, Meal Break Exception, Meal Schedule, Meal Actual, Rest Break Exception, Rest Schedule and Rest Actual. 

- Provide date, status and Global Search filters as defined in Part I. 

- Values are derived from scheduled break rules and actual time-clock/break activity. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.8 Password, ID Card, Picture and Tracking Actions** 

|**Design ID**|SCR-132|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Password, ID Card,<br>Picture and TrackingActions<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Interactive map,Tabs / segmented controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Change Password validates Enter Password and Confirm Password, then updates credentials. 

- Force Password Change sends or activates a password-change requirement for the employee. 

- ID Card displays the generated card using employee-specific details. 

- Snap Picture uploads/replaces the profile picture. 

- Tracks displays the employee current/latest location where location data is available and permitted. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **30.9 Termination** 

|**Design ID**|SCR-133|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Termination|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Calendar / schedulegrid,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Collect Last Day of Work, Reason and Comments. 

- On confirmation, set employee termination data/status. 

- Mark future assigned shifts as uncovered. 

- Revoke Admin/Supervisor Portal and Guard Mobile App access. 

- Preserve all historical records. 

- Notify payroll and relevant supervisors. 

- Record the termination in audit history and Company Activity Journal. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.10 Skills and Credentials** 

|**Design ID**|SCR-134|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Skills and Credentials|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table,Filter bar / flter drawer,Search input,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Admin assigns skills/attributes from configured categories. 

- Admin manually verifies credentials and updates status. 

- Supported statuses are Pending Review, Verified, Rejected, Expiring Soon and Expired; retain any source-listed status needed by existing records. 

- Expiration status is derived from expiration date, while verification is manually controlled. 

- Skill listing shows Skill, Category and Information and supports Category and Global Search filters. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **30.11 Employee Reports** 

|**Design ID**|SCR-135|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Employee Reports<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls, Form<br>controls,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- List ID, Type, Flags, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. 

- Apply Active/All Templates/Archived, Incident Flags Only, Status, From-To Date and Global Search filters. 

- Approve All performs approval only on eligible reports according to each report configuration. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.12 Summary Reports** 

|**Design ID**|SCR-136|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → SummaryReports|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Export controls,Interactive map,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Group shift activity into rows showing Employee, Location, Reports, Videos, Checkpoints, Start, End, Tracks, PDF, View and Options. 

- Approve All Reports applies only to approval-required eligible reports in the selected shift summary. 

- Send Shift Report by Email sends the generated shift summary/report to the entered or configured recipient. 

- Delete This Shift and Time Logs requires confirmation and audit; preserve related records where hard deletion would break history. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.13 Employee Tours and Schedule** 

|**Design ID**|SCR-137|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Employee Tours and|
||RFI Admin/Supervisor Portal - Figma Design and HCI Specifcation|



||RFI Admin/Supervisor Portal - Figma Make Design Specifcation|
|---|---|
|**Design ID**|SCR-137|
||Schedule<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls,<br>Calendar / schedulegrid,Form controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Tour listing shows Tour Name, Account, Employee, Result, Start Time, End Time, Duration, PDF, Email, View Tour Session and Delete Tour Session. 

- Apply From-To date and Global Search filters and provide CSV, PDF, Excel, Pivot Chart View and Pivot Chart Edit actions. 

- Employee Schedule listing shows Note, Name, Day, Start Date, Time, Clocked Shifts, Scheduled Break and Actual Break. 

- Provide calendar view, No Schedule to Distribute, No Changes to Notify and Print actions as listed. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **30.14 Employee Time Off** 

|**Design ID**|SCR-138<br>|
|---|---|
|**Navigation Path**|. Employee Management - Development Logic → Employee Time Of<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Create Time Off captures First Day Off, Return Date and Description. 

- Validate Return Date is not earlier than First Day Off. 

- List ID, From, To and Description. 

- Entitlement permits the configured entitlement value to be set for the employee. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **31. Departments, Admins and User Settings - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **31.1 Departments** 

|**Design ID**|SCR-139|
|---|---|
|**Navigation Path**|. Departments, Admins and User Settings - Development Logic →<br>Departments<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Create Department with Department Name, Display ID and Details. 

- List Department, Install Code, Employees and View. 

- Department detail exposes Employees, Operation Reports, Notifications, Positions, Edit, Contacts, Security and Patrol and Schedules. 

- Assign Employee supports Filter by Skills, Select Employee, Employee Start Date and Add Rule. 

- Employee assignment list shows Employee, Start Date, Rate, Unassignment Date, Is Primary Site and Make Primary. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **31.2 Admins** 

|**Design ID**|SCR-140|
|---|---|
|**Navigation Path**|. Departments, Admins and User Settings - Development Logic →<br>Admins|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- List employees with Admin access using First Name, Last Name, Access Level, Managed Groups, Permissions, Admin Tab, Accepted, Last Login and Added By. 

- The list is derived from active portal access/role assignment rather than a duplicate employee record. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **31.3 User Settings** 

|**Design ID**|SCR-141|
|---|---|
|**Navigation Path**|. Departments, Admins and User Settings - Development Logic → User<br>Settings<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Allow configured employee profile fields in Personal Details, Company-Related Information, Compensation Details and Payment Information. 

- Financial visibility rules apply to compensation and payment information. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **32. Clients and Sites - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **32.1 Client-Site Data Model** 

|**Design ID**|SCR-142|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Client-Site Data Model|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Interactive map,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Use Company → Region → Client → Site → Job Type → Shift hierarchy. 

- Support multiple clients assigned to one site and one client assigned to multiple sites. 

- Do not finalize shared-site Client Portal visibility until the pending decision is resolved. 

- Account Type is a classification, not a separate hierarchy entity. 

- Location stores exact latitude/longitude or a defined internal site area. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.2 Create Site / Client Account** 

|**Design ID**|SCR-143|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Create Site / Client Account<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Capture Account Type, Company Information, Main Contact, Address, Employee Relations and Other Custom Fields exactly as listed in Part I. 

- Validate Unique ID uniqueness within the company. 

- Store each phone’s SMS option independently. 

- Time Zone defaults from system settings but remains stored for the site. 

- Allow more than one client assignment to the site. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.3 Site Overview** 

|**Design ID**|SCR-144|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Overview<br>|
|**Screen Type**|Detail / Profle Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Display Site Name, Photo, Manager Name, Manager Position, Phone, Email, Address and Bill-To Address. 

- Overview data is drawn from the saved site and contact records. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.4 Job Type / Position** 

|**Design ID**|SCR-145|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Job Type / Position<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Creation Logic 

- Create Job Type using Post Name, Post ID, Short Description of Tasks, Schedule Memo and Active/Archived status. 

- Store Hard, Conditional and Soft Requirements. 

- Store Ongoing/Temporary service and Begin Date. 

- Store Break Rule, Employee Pay Rate or Post Rate option, Premium Matrix, Break Payroll option and Holiday Pay/Rate Multiplier. 

- When an assigned employee lacks a requirement, send configured notification to Admin/Supervisor/other configured recipient but allow Admin to take action manually. 

- List UID, Position Title, Total Hours, Bill Rate, Holiday Rate, Temporary and actions Duplicate, Edit, History and Remove. 

- Duplicate creates a new record with a new unique ID and copied settings. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **32.5 Site Assigned Employees** 

|**Design ID**|SCR-146|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Assigned Employees<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Assign Employee using Filter by Skills, Select Employee, Employee Start Date and Add Rule with Effective Date and Hourly Rate. 

- List Employee, Start Date, Rate, Unassignment Date, Is Primary Site, Make Primary, History, Remove and View. 

- Prevent assignment when the employee has an active site ban. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.6 Client Portal Access** 

|**Design ID**|SCR-147|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Client Portal Access<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Tabs / segmented controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Create access with First Name, Last Name, Picture, Phone, Email, Password, Force Password Change, Client Role and Grant/Revoke Access status. 

- List Full Name, Email, Phone, Last Login, Access and Edit. 

- Revoking access blocks future login without deleting the client user history. 

- Detailed portal visibility and multi-client shared-site behavior remain Pending Discussion. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.7 Site Contacts** 

|**Design ID**|SCR-148|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Contacts<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Create contact using every field listed in Part I, including Attention Of, Preferred Language, Status and Use This Address as BillTo Address. 

- When Bill-To is selected, update the site billing-address reference. 

- List Name, Job Title, Phone, Email and Edit action. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.8 Close Account** 

|**Design ID**|SCR-149|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Close Account|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Current Implementation Boundary 

- Provide choices Terminate Site and All Contracts or Terminate One or More Positions, Termination Date and confirmation screen. 

- Do not implement automated downstream closure consequences until the pending discussion is resolved. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.9 Site Operational Tabs** 

|**Design ID**|SCR-150|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Operational Tabs|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Calendar / schedulegrid,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Source requirements to represent_** 

- Required Logic 

- Dispatch Settings and Prepare Schedule open their respective shared functionality in the current site context. 

- Operation Reports, Logs and Activities, Reports, Patrol Tours, Journal Entries, Recordings, Summaries, Summary by Shift, Financial by Shift, Incident Analytics, Analytics Reports, Exceptions and Audits, Post Orders, Work Exception and System Exception must remain accessible. 

- Undefined source features remain placeholders/pending until their business behavior is defined; do not invent calculations or workflows. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.10 Site Notifications** 

|**Design ID**|SCR-151<br>|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Notifcations<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Notification configuration must support the listed report, checkpoint, tour, timekeeping, clock and security events. 

- Rules are implemented through the confirmed Automation builder where applicable. 

- No acknowledgment escalation is required. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.11 Site Locations, Emergency Contacts and Geo-Fence** 

|**Design ID**|SCR-152|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Locations, Emergency<br>Contacts and Geo-Fence<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Interactive map,Form controls,Toggle / checkbox / radio controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Create Site Item/Location and store its name/details and exact latitude/longitude where applicable. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Import Batch remains available where listed. 

- Emergency Contacts can be created and assigned in an ordered sequence. 

- Geo-fencing allows Admin to define boundary points on the map. 

- Mobile App restrictions include Geo-Fence Clock-In, Geo-Fence Clock-Out and Mobile App Login toggles. 

- Clock-in outside an enabled geo-fence restriction must be blocked. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.12 Site Live Dashboard** 

|**Design ID**|SCR-153|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Live Dashboard|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Interactive map,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Filter events by Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scan, Runsheet Patrol Events and Remote Actions. 

- Provide Show Map, Broadcast Message, New Task, New Report and History Tracks actions. 

- All actions open shared modules pre-filtered to the current site. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **32.13 Site Email Settings** 

|**Design ID**|SCR-154|
|---|---|
|**Navigation Path**|. Clients and Sites - Development Logic → Site Email Settings|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Export controls,Toggle / checkbox / radio controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide the PDF Is Attached as a Link Yes/No setting. 

- Use this value when emailing applicable site reports. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **33. Checkpoints and Tour Routes - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **33.1 Checkpoint Creation** 

|**Design ID**|SCR-155|
|---|---|
|**Navigation Path**|. Checkpoints and Tour Routes - Development Logic → Checkpoint<br>Creation<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Capture Checkpoint Name, Special Instruction, allowed Position/Job Type, monitoring method, interval, extra scan option, NFC/Barcode type, Checkpoint ID, GPS Required Accuracy and Manual Scanning option. 

- If manual scanning is Yes with Reason, require a reason before accepting the scan. 

- Apply custom reason, comment, photo and GPS requirements where configured for the tour/checkpoint. 

- Do not add QR as a scan type in the current scope. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **33.2 Batch Import and Logs** 

|**Design ID**|SCR-156|
|---|---|
|**Navigation Path**|. Checkpoints and Tour Routes - Development Logic → Batch Import<br>and Logs<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Form controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Batch import accepts the approved spreadsheet template, validates required checkpoint fields and reports row-level errors. 

- Checkpoint logs show Time, Employee, Account, Checkpoint and Tour. 

- Imported and manually created checkpoints use the same listing and edit flow. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **33.3 Tour Route Creation** 

|**Design ID**|SCR-157|
|---|---|
|**Navigation Path**|. Checkpoints and Tour Routes - Development Logic → Tour Route<br>Creation|
|**Screen Type**|Calendar / Scheduler Screen|
|**Primary Components**|Interactive map,Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Capture Description, Assigned To, Special Instructions, Estimated Tour Duration, Grace Period, Weekly/Monthly Recurrence and Tour Schedule day/time. 

- Tour is assigned to a specific employee of a shift through Scheduling. 

- Guard must be clocked in and inside the site geo-fence to start manually. 

- Allow Admin to define checkpoint order/rules and tour timing/exception behavior. 

- Allow Manage Checkpoints to add, remove and arrange assigned checkpoints. 

- Late, incomplete, finished and interruption events trigger enabled notification/automation rules. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **33.4 Checkpoint Issues** 

|**Design ID**|SCR-158|
|---|---|
|**Navigation Path**|. Checkpoints and Tour Routes - Development Logic → Checkpoint<br>Issues|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Allow guard-submitted issue types Damaged NFC Tag, Missing Barcode, Inaccessible Checkpoint, Unsafe Location and GPS Inaccuracy. 

- Execute the configured action, such as notification, maintenance task or system exception. 

- Do not require supervisor approval for manual checkpoint issue submission. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **34. Scheduling - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **34.1 Schedule Setup** 

|**Design ID**|SCR-159|
|---|---|
|**Navigation Path**|. Scheduling- Development Logic → Schedule Setup<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Admin creates a Schedule by entering Name and selecting default/custom fields, Jobs, View Type, Layout Type, shift-card fields and Users. 

- View Type options are User and Job. 

- Shift card field selection includes Hours, Job and Shift Title and any confirmed custom field. 

- The resulting schedule page is generated from the saved configuration. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **34.2 Schedule View** 

|**Design ID**|SCR-160|
|---|---|
|**Navigation Path**|. Scheduling- Development Logic → Schedule View|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer, Calendar / schedule grid, Form controls,<br>Toggle / checkbox / radio controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide Day, Week, Month, View by User, View by Job and List View. 

- Render blank clickable boxes for dates/users/jobs without shifts. 

- Provide Sort Cell Content and all source-listed toggles: Minimized View, Daily Info, Weekly Summary, Availability Status, Issues, Cross Schedule Events, Labor Costs, Daily Health, Hide Empty Row, Working Hours, Non-Working Days and Organize by Groups. 

- Provide Week/Date filters, Add, Actions, Coverage per Hour, Print Position Schedule and Settings. 

- Undefined display concepts such as Daily Health and Cross Schedule Events remain present but pending detailed behavior. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **34.3 Shift Creation and Editing** 

|**Design ID**|SCR-161|
|---|---|
|**Navigation Path**|. Scheduling- Development Logic → Shift Creation and Editing|
|**Screen Type**|Calendar / Scheduler Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Clicking a blank cell opens shift creation with Date/From-To/All Days, Start Time, End Time, Title, Job, Users, Address, Note, Shift Tags, Shift Tasks and configured custom fields. 

- Allow recurring shifts: Daily, Weekly, Biweekly, Monthly, selected days and custom recurrence as confirmed. 

- Automatically deliver assigned shifts to selected users. 

- Validate overlapping shifts, availability, approved time off, active site ban, expired/missing credentials, insufficient rest, overtime and excessive weekly hours. 

- For missing Job requirements, notify configured users but allow Admin to proceed manually. 

- Published schedules may be updated; use configurable notification channels for affected users. 

- Open shifts, acceptance/rejection, claiming, swaps, replacements and cross-midnight treatment remain Pending Discussion. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **35. Time Clock, Attendance and Work Exceptions - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **35.1 Mobile Clock-In/Out** 

|**Design ID**|SCR-162|
|---|---|
|**Navigation Path**|. Time Clock, Attendance and Work Exceptions - Development Logic →<br>Mobile Clock-In/Out<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Interactive map,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Guard clock-in and clock-out originate from the Guard Mobile App. 

- Validate assigned shift/site and current geo-fence restriction. 

- Block clock-in when outside the enabled site geo-fence. 

- Apply configurable earliest clock-in, late threshold, early clock-out and related timing settings. 

- Create time-clock events and update the active shift attendance status. 

- Offline clock-in/out and synchronization remain Pending Discussion. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **35.2 Timesheets and Manual Changes** 

|**Design ID**|SCR-163|
|---|---|
|**Navigation Path**|. Time Clock, Attendance and Work Exceptions - Development Logic →<br>Timesheets and Manual Changes<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedulegrid,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Generate timesheet information from scheduled shift, clock-in, clock-out and breaks. 

- Allow authorized Admin/Supervisor user to edit time records. 

- Require reason and record original value, new value, changed by and date/time in audit history. 

- Use approved break-management configuration to calculate scheduled and actual break information. 

- Do not add unconfirmed approval/rejection workflow states. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **35.3 Time Clock Pages** 

|**Design ID**|SCR-164|
|---|---|
|**Navigation Path**|. Time Clock, Attendance and Work Exceptions - Development Logic →<br>Time Clock Pages|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer,Calendar / schedulegrid|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Security Operations Time Clock first lists sites. 

- Selecting a site opens its Timesheet with Today filter. 

- Dashboard Attendance and Employee Work Exceptions use the same time-clock source records. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **36. Reports and Incidents - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **36.1 Reports versus Forms** 

|**Design ID**|SCR-165|
|---|---|
|**Navigation Path**|. Reports and Incidents - Development Logic → Reports versus Forms|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Forms are manually built and assigned for employee completion. 

- Reports are generated from Custom Report settings, Custom Report Form, Categories, Incident Categories and Footer. 

- Do not merge form submissions and operational reports into one record type. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **36.2 Report Listing** 

|**Design ID**|SCR-166|
|---|---|
|**Navigation Path**|. Reports and Incidents - Development Logic → Report Listing|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls, Form<br>controls,Tabs / segmented controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- List ID, Type, Flags, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. 

- Apply Active, All Templates, Archived, Incident Flags Only, Status, From-To Date and Global Search filters. 

- Use source statuses New Report, Approved, Verification, Job Pending and Archived unless a custom report setting determines approval behavior. 

- Report numbering is site-specific; the exact display format remains configurable/not otherwise invented. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **36.3 Approval and Publication** 

|**Design ID**|SCR-167|
|---|---|
|**Navigation Path**|. Reports and Incidents - Development Logic → Approval and<br>Publication<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Custom Report creation determines whether approval is required. 

- No multi-level approval is required. 

- Reviewer cannot directly edit the submitted report and there is no return-for-correction workflow. 

- Approval updates report status and records approver/date. 

- Client publication/visibility follows report configuration, but detailed Client Portal behavior remains pending. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **36.4 Custom Report Builder** 

|**Design ID**|SCR-168|
|---|---|
|**Navigation Path**|. Reports and Incidents - Development Logic → Custom Report Builder<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Search input,Form controls,Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Admin can create, edit, archive and search report forms and categories. 

- Field Setup supports the source-listed custom field behavior and subforms. 

- Count shows number of reports generated from the custom report. 

- Incident Category stores Code, Region, Description, Level, Parent Category and Default Group. 

- Report Footer supports text or image format and edit action. 

- Digital acknowledgment is supported where configured. 

- Media uses standard centrally configured limits. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **37. Forms - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **37.1 Form Builder and Assignment** 

|**Design ID**|SCR-169|
|---|---|
|**Navigation Path**|. Forms - Development Logic → Form Builder and Assignment<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Export controls,Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Admin creates a form using customizable fields. 

- Assign forms to employees for completion. 

- Provide Form Listing, Add New Form, Archived view, Export and actions Move, Archive and Delete. 

- Do not introduce submission frequency, department assignment or approval workflow unless later confirmed. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **37.2 Form Submission** 

|**Design ID**|SCR-170|
|---|---|
|**Navigation Path**|. Forms - Development Logic → Form Submission|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Employee submits values for the fields defined in the form version assigned to them. 

- Store submission author and submission date/time. 

- Existing submissions must remain readable even after the form is edited or archived. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **38. Tasks, Dispatch and Job List - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **38.1 Task Types and Assignment** 

|**Design ID**|SCR-171|
|---|---|
|**Navigation Path**|. Tasks, Dispatch and Job List - Development Logic → Task Types and<br>Assignment|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Data table,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Keep Dispatch Task, Quick Task, Recurring Task and Help Desk Ticket as separate record types/workflows. 

- Job Type is the role/service, not a task. 

- A task is assigned to one target: employee, job, site, shift, department or group as applicable. 

- Task form fields change according to selected Task Type as required by the source listing. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **38.2 Listings and Filters** 

|**Design ID**|SCR-172|
|---|---|
|**Navigation Path**|. Tasks, Dispatch and Job List - Development Logic → Listings and<br>Filters|
|**Screen Type**|Listing/ Management Screen<br>|
|**Primary Components**|Filter bar / flter drawer, Form controls, Tabs / segmented controls,<br>Metric card|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Dashboard Task Dispatch uses New Tasks, In Progress, New and In Progress, Completed plus assignment filters. 

- Quick Tasks uses Created by Me, My Tasks, All Tasks and Archived. 

- Show Overdue, Done, Open and Total Task counts. 

- No universal mandatory proof-of-completion fields are required. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **38.3 Escalation** 

|**Design ID**|SCR-173|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List - Development Logic → Escalation|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Overdue or qualifying task events may trigger configured automation actions, including notification, priority change, exception or reassignment where configured. 

- No acknowledgment escalation is required. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **38.4 Job List** 

|**Design ID**|SCR-174|
|---|---|
|**Navigation Path**|. Tasks,Dispatch and Job List - Development Logic → Job List<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Current Scope 

- Provide Job List, Add and Import. 

- Detailed Job List fields and behavior remain Pending Discussion; do not duplicate Job Type behavior without confirmation. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **39. Communications - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **39.1 Combined Module** 

|**Design ID**|SCR-175|
|---|---|
|**Navigation Path**|. Communications - Development Logic → Combined Module|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Form controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide Chat, Updates, Message Board, Broadcast, Directory, Forms access and Help Desk as the source document requires. 

- Chat is employee communication. 

- Message Board contains guard-created messages. 

- Broadcast sends messages to selected user types/users based on selection. 

- Normal communication does not require read acknowledgment. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **39.2 Updates** 

|**Design ID**|SCR-176|
|---|---|
|**Navigation Path**|. Communications - Development Logic → Updates<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table,Export controls,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide Updates Listing, Create Update and Export. 

- Send an Update supports Specific Group, Specific User or User Type audience selection as listed on Dashboard. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **39.3 Directory** 

|**Design ID**|SCR-177|
|---|---|
|**Navigation Path**|. Communications - Development Logic → Directory<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Export controls,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- List directory users/contacts available to the logged-in user. 

- Actions: Tag Users, Notify, Send Chat Message, Create Group Chat with Selected, Create Task and Export. 

- Apply site access restrictions to directory results. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **39.4 Pending Communication Rules** 

|**Design ID**|SCR-178|
|---|---|
|**Navigation Path**|. Communications - Development Logic → Pending Communication<br>Rules|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Export controls,Form controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Admin private-chat visibility, message editing/deletion, export, attachments, retention, guard-to-guard rules and client participation remain Pending Discussion. Do not implement these assumptions. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **40. Security Operations - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **41. Documents, Policies and Team Resources - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **41.1 Confirmed Document Functions** 

|**Design ID**|SCR-179|
|---|---|
|**Navigation Path**|. Documents, Policies and Team Resources - Development Logic →<br>Confrmed Document Functions<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Data table, Export controls, Form controls, Tabs / segmented controls,<br>File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Company Policies supports PDF upload, listing and download. 

- Post Orders, SOPs and Manuals support Add New, Active/Archived listing and Export. 

- Workplace Notices and Posters support Active, Archived, Add New and Export. 

- Documents supports Create Pack as listed. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **41.2 Pending Team Resource Functions** 

|**Design ID**|SCR-180|
|---|---|
|**Navigation Path**|. Documents, Policies and Team Resources - Development Logic →<br>PendingTeam Resource Functions|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Search input, Export controls, Form controls, Tabs / segmented<br>controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Rewards/Tokens, Benefits, Celebrations, extended Time Off/Paid Policies, Insights, Text Message, Disciplinary Reports, HR Complaint Form and Hiring remain in the screen inventory but their detailed logic is Pending Discussion. Preserve their listed Add/List/Active/Archived/Export/Search actions only. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **42. Training - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **43. Vehicles - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **44. Automations and Notifications - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **44.1 Builder** 

|**Design ID**|SCR-181<br>|
|---|---|
|**Navigation Path**|. Automations and Notifcations - Development Logic → Builder<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Filter bar / flter drawer|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide custom Trigger → Conditions → Actions builder. 

- Triggers include source-confirmed operational events such as late/missed clock, GPS inactivity, tour/checkpoint events, panic, report, credential, shift, task and termination events. 

- Conditions filter the event by supported record attributes. 

- Actions execute the selected notification or record-creation behavior. 

- One automation cannot be assigned to multiple sites. 

- Whether company-wide/global scope is allowed remains unconfirmed; do not assume it. 

- No acknowledgment escalation is required. 

- Implement duplicate suppression for the same unresolved event. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **44.2 Execution Logic** 

|**Design ID**|SCR-182<br>|
|---|---|
|**Navigation Path**|. Automations and Notifcations - Development Logic → Execution Logic|
|**Screen Type**|Section / Feature Screen|
|**Primary Components**|Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- When an event occurs, find active automations for the event’s allowed scope. 

- Evaluate all configured conditions. 

- If conditions pass, check whether an unresolved duplicate event already exists. 

- If not suppressed, execute actions and record execution result. 

- If suppressed, do not resend duplicate notification. 

- Record automation execution for troubleshooting and audit. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **45. Payroll and Back Office - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **46. Settings and Configuration - Development Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **46.1 General Configuration** 

|**Design ID**|SCR-183<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration - Development Logic → General<br>Confguration<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Form controls,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide Notification Sender Name and Email, listed notification categories, Recurrent Tasks, Break Management, Clock In/Out, SMS Segments, Company Name and Address, Roles and Permissions, Password Policy, Sign-In Log, General categories, System Locale and Field Configuration. 

- Configuration changes apply to subsequent operations and are audited. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **46.2 Operation Configuration** 

|**Design ID**|SCR-184<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration - Development Logic → Operation<br>Confguration<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|Calendar / schedulegrid,Tabs / segmented controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide Report Templates, Site Templates, Incident Templates, Devices and License, Region Message Boards, Job/Service Type, Special Calendar Days and Calendar Groups. 

- Zone Templates are excluded for the current phase but retained in traceability. 

- Undefined detailed behavior remains pending and must not be invented. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **46.3 Data Retention** 

|**Design ID**|SCR-185<br>|
|---|---|
|**Navigation Path**|. Settings and Confguration - Development Logic → Data Retention|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Standard content section|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Required Logic 

- Provide separate configurable retention values by data category, including GPS, reports, media, chat, timesheets, audit, panic, tours and checkpoints as confirmed. 

- Deletion/archive execution rules must respect legal and historical-reference needs and should not be finalized beyond the configured category setting without RFI approval. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **47. Supervisor Portal Logic** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **48. Pending Development Decisions - Do Not Implement by Assumption** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **49. Developer Acceptance Checklist** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **36. Source Coverage Verification Addendum** 

Module design group. All screens below must remain accessible according to assigned module access and site restrictions. 

### **36.1 Employee Security and Patrol - Metrics** 

|**Design ID**|SCR-186<br>|
|---|---|
|**Navigation Path**|. Source Coverage Verifcation Addendum → Employee Security and<br>Patrol - Metrics<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table,Filter bar / flter drawer,Form controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- SOURCE-LISTED / PENDING DEFINITION: The Employee → Security and Patrol area includes a section named Metrics. The uploaded feature list does not define its fields, calculations, filters, tables, columns, charts, actions or permissions. The section must remain available as a named placeholder in the screen inventory, but developers must not create metric calculations or KPIs until RFI provides the required definitions. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **36.2 Confirmed Source Coverage** 

|**Design ID**|SCR-187<br>|
|---|---|
|**Navigation Path**|. Source Coverage Verifcation Addendum → Confrmed Source<br>Coverage<br>|
|**Screen Type**|Form / Confguration Screen<br>|
|**Primary Components**|Data table, Filter bar / flter drawer, Search input, Export controls,<br>Interactive map,Calendar / schedulegrid,Form controls|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- Authentication and role-based redirection 

- Dashboard, all platform-statistic cards, Activity Log, Attendance, Scheduled Tours, Task Dispatch, Map, Global Search and Send an Update 

- Dashboard submodules: Report Settings, Vehicle Management, Schedule redirect, Company Activity Journal and System Exceptions 

- Employee creation, listing, profile sections, Security and Patrol, Reports, Summary Reports, Tours, Schedules, Time Off, Policies, User Settings, Admins, Departments and Skills 

- Clients/Sites, site users, contacts, assigned employees, Job Types/Positions, schedules, reports, tours, checkpoints, locations, geo-fencing, notifications and site settings 

- Settings: General, Operation and Back Office configurations 

- Help, Chat, Groups/Segments, Automations, Job List, Security Operations, Communications, Team Resources, Training and Sign Out 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- All original filters, listing columns, exports and actions applicable to the Admin/Supervisor portal 

- All RFI-confirmed logic changes, exclusions and Pending Discussion items 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **36.3 Scope Boundary** 

|**Design ID**|SCR-188<br>|
|---|---|
|**Navigation Path**|. Source Coverage Verifcation Addendum → Scope Boundary<br>|
|**Screen Type**|Form / Confguration Screen|
|**Primary Components**|File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- The uploaded source also contains Guard Mobile App and Client Portal sections. They were intentionally not expanded in this Admin/Supervisor Portal specification. Their shared Admin configuration and access-management touchpoints are included where applicable, while their standalone screens and workflows remain separate deliverables. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

### **36.4 Development Control** 

|**Design ID**|SCR-189<br>|
|---|---|
|**Navigation Path**|. Source Coverage Verifcation Addendum → Development Control|
|**Screen Type**|Listing/ Management Screen|
|**Primary Components**|Form controls,Tabs / segmented controls,File upload|



##### **_Figma screen anatomy_** 

- Page header with exact screen title. 

- Primary content follows the source-defined section order below. 

- Use only the filters, columns, fields and actions listed below. 

- Include applicable default, empty, loading, no-results, error and no-permission states. 

##### **_Source requirements to represent_** 

- A source-listed item must not be removed because it is duplicated elsewhere; it may link to a shared module. 

- An undefined source-listed heading must remain marked Pending Definition rather than being assigned invented fields or logic. 

- Items explicitly marked Pending Discussion must not be developed based on assumptions. 

- Items explicitly excluded by RFI must not be implemented in the current phase. 

- Any future functional change must be documented as an approved change request. 

##### **_Design interaction notes_** 

- Actions that change status, revoke access, terminate, remove, archive, delete, clock out or close an account require a confirmation dialog. 

- Filters must visibly show active selections and provide a clear reset action when filters are listed. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

- Long forms should visually preserve the named source sections; a stepper may be used only as a layout treatment. 

- Contextual links may open a shared global screen with the applicable record filter already applied. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **6. Source Tables and Status Registers** 

The tables below are copied from the verified specification so Figma page coverage remains traceable. 

### **6.1 Reference Table** 

|**Status**<br>|**Meaning**<br>|
|---|---|
|Source / Confrmed|Present in the uploaded feature list or explicitlyconfrmed byRFI.<br>|
|PendingDiscussion|Must remain in the scope register but workfow or behavior is not fnalized.|
|Excluded / Current Phase|Explicitlyignored or not required for the current scope.|
|**6.2 Reference Table**<br>**Area**|**Status**<br>|
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



### **6.3 Reference Table** 

|**Area**|**Pending Decisions / Development Hold**|
|---|---|
|Scheduling|Shift acceptance/rejection, open shifts, claiming, swaps, replacement<br>workfow,cross-midnight treatment.|
|Site/Client|Contracts, site-closure consequences, Client Portal visibility/actions,<br>invoices,shared-site client visibility.<br>|
|Mobile/Attendance|Ofline clock-in/out, synchronization, multiple/shared devices, device<br>approval,GPS frequency,Watch Mode, guard visibility.|
|Communications|Private chat access, moderation, export, attachments, retention, guard-to-<br>guard and clientparticipation.<br>|
|HR/Team Resources|Hiring depth, benefts, rewards/tokens, celebrations, complaints and<br>disciplinaryworkfow.<br>|
|Training|Content types,certifcates,skill assignment and renewal.<br>|
|Finance|Invoice generation, payroll formulas/workfow, accounting/payroll<br>integrations.|
|Migration|TrackTik/Connecteam migration, historical scope, parallel operation and<br>cutover.|
|Undefned source features|Remote Speak, Runsheet Patrol Events, Daily Health, Cross Schedule<br>Events, Financial by Shift, Recordings, Journal Entries, General 13<br>Categories, Devices and License, Calendar Groups, Back Ofice Defaults,<br>Groups/Segments and Job List details.|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **7. Prototype Flows Required** 

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

## **8. Figma Delivery Checklist** 

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

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

## **19. Human-Computer Interaction and End-to-End User Flow Blueprint** 

**Purpose.** This section strengthens the existing screen inventory with interaction behavior. It does not add business functionality. It explains how approved features should be presented so Admins and Supervisors can understand status, complete tasks efficiently, avoid mistakes and recover from errors. 

### **19.1 Interaction Principles** 

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

### **19.2 Visual and Cognitive Hierarchy** 

- Level 1 - Critical: panic, active safety risk, missed coverage and clock-in failure. Use persistent banners or high-priority cards with a direct action. 

- Level 2 - Requires action: reports awaiting approval, time-off requests, overdue tasks, expiring skills and system exceptions. 

- Level 3 - Current operations: attendance, scheduled tours, active guards, current tasks and activity log. 

- Level 4 - Reference and configuration: historical records, settings, templates, policies and archived data. 

- Never communicate severity by color alone. Pair status color with icon, text label and, where useful, a short explanation. 

### **19.3 Navigation and Wayfinding Model** 

- The left navigation displays only permitted modules. The current module and subsection must remain visibly selected. 

- Use breadcrumbs for records deeper than one level, for example: Sites > Site Name > Security and Patrol > Tour Routes. 

- Context chips must identify active Region, Client, Site, Employee, Schedule or Date filters. 

- Shared screens opened contextually must show a clear context banner such as “Showing reports for Site A” with a Remove Context action. 

- Browser back, breadcrumb back and in-product back actions must not discard unsaved form data without warning. 

- Long detail pages should use tabs or anchored subsection navigation, preserving the source-defined section order. 

### **19.4 Standard Screen Interaction Contract** 

|**Screen Pattern**|**First View**|**Primary Interaction**<br>|**Feedback**<br>|**Recovery**<br>|
|---|---|---|---|---|
|Listing|Title, record count,<br>specifed flters, table<br>andprimaryaction<br>|Search/flter, open<br>record, use listed row<br>action|Active flters, loading<br>state, updated count,<br>exportprogress|Reset flters, retry load,<br>preserve entered<br>search<br>|
|Create/Edit Form|Purpose, required-feld<br>indication and named<br>sections|Complete felds in<br>source order and save|Inline validation, save<br>progress, success<br>confrmation<br>|Focus frst error,<br>preserve values, warn<br>before leaving|
|Detail/Profle|Identity, status and<br>critical summary|Review tabs and<br>perform listed|Action confrmation<br>and refreshed afected|Return to prior<br>tab/scrollposition after|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

|||contextual actions|section|error|
|---|---|---|---|---|
|Dashboard|Critical items and<br>current scope|Select card/list item to<br>open fltered detail|Visible refresh time and<br>changed state|Retry individual widget<br>without blocking whole<br>dashboard|
|Calendar/Schedule|Date scope, view type<br>and schedule context|Select blank cell or<br>shift card|Immediate visual<br>placement/update and<br>confict warning|Undo or cancel before<br>publish/update|
|Map|Scope, legend and last<br>update|Select marker and<br>perform listed action|Marker status and<br>action result in context|Show stale/unknown<br>location instead of<br>misleading precision|
|Builder|Current confguration<br>and sequence|Add/edit ordered<br>trigger, condition,<br>action or feld|Inline completeness<br>and validation|Keep incomplete draft<br>in session; identify<br>missingconfguration|



### **19.5 Accessibility and Inclusive Interaction** 

- All interactive controls must be keyboard reachable in a logical order with a visible focus indicator. 

- Provide text alternatives for icons, map actions, status indicators and uploaded images where applicable. 

- Use programmatic labels for every form field; placeholder text must not replace a label. 

- Tables require clear headers; row actions must identify the associated record to assistive technology. 

- Dialogs must trap focus, announce their title and return focus to the initiating control when closed. 

- Validation messages must explain the problem and correction, not only state that a value is invalid. 

- Support browser zoom and responsive layouts without hiding critical actions or causing overlapping content. 

- Touch targets on tablet should be sufficiently large and separated for field supervisors. 

- Time, date and status content must be readable without relying on abbreviations alone. 

### **19.6 System Feedback, Latency and State Behavior** 

- Dashboard and live-operation data show “Last updated” time; automatic refresh occurs every minute for approved live data. 

- Use skeleton loading for initial content and small inline progress indicators for row-level actions. 

- Do not clear the entire page during background refresh. Preserve scroll position and selected record. 

- For exports, show generation progress and a success/failure result without blocking unrelated work. 

- For uploads, show file name, size, progress and the specific reason for rejection. 

- For empty states, distinguish “no data exists” from “no results match filters.” 

- For stale GPS or activity data, display the last known timestamp and do not represent it as current. 

- Duplicate automation notifications must be suppressed according to approved configuration; the UI should identify the original unresolved event. 

### **19.7 Primary Role Journeys** 

#### **19.7.1 Supervisor Starts a Shift Monitoring Session** 

|**Primary user**|Supervisor|
|---|---|
|**Entry point**|Login > Dashboard|
|**Usergoal**|Understand which assigned-site items need attention now.|
|**System feedback**|Show assigned-site scope, last refresh time and changed<br>counts after action.|
||Do not expose unassigned-site data. Preserve dashboard<br>|
|**Error prevention and recovery**|flters and prevent accidental remote actions through<br>confrmation.|
|**Completion signal**<br>|The selected issue is resolved, reviewed or clearly left open<br>with its current status.|
|**Primary interaction fow**||



18. Log in and land on the Dashboard restricted to assigned sites and permitted modules. 

19. Review Clocked-In via Mobile, Inactive Mobile Users, Reports to Approve, Message Board, Time-Off Requests, Attendance, Scheduled Tours and Task Dispatch. 

20. Select a count or row to open the corresponding pre-filtered detail page. 

21. Resolve or review the item using only the actions approved for that module. 

22. Return to Dashboard with context retained and refreshed counts. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

#### **19.7.2 Admin Configures Operational Structure** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Employees / Sites / Settings|
|**User goal**|Create and maintain employees, clients, sites, job types and<br>related confguration.|
|**System feedback**|Inline validation and clear success response naming the<br>created/updated record.|
|**Error prevention and recovery**|Preserve entered values after validation errors. Do not<br>introduce felds not approved in source or clarifcations.|
|**Completion signal**<br>|Record is visible with correct status and relationships.|
|**Primary interaction fow**||



23. Open the applicable module and select its source-defined Add/Create action. 

24. Complete source-defined sections and fields in their original grouping. 

25. Review validation warnings, including site ban or qualification warnings where applicable. 

26. Save the record and display the created detail page or updated listing. 

27. Use audit/history areas where source-listed to confirm the change. 

### **19.8 Authentication and Access** 

#### **19.8 Authentication and Access.1 Login** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Login screen|
|**Usergoal**|Access theportal usingauthorized credentials.|
|**System feedback**|Displayloading,success redirect or accessible error.|
|**Error prevention and recovery**|Prevent access to hidden modules and avoid revealing whether<br>an account exists.|
|**Completion signal**<br>|User reaches authorizedportal scope.|
|**Primary interaction fow**||



28. Enter username and password. 

29. System validates credentials, role/module access and assigned-site restrictions. 

30. Successful login opens the permitted Dashboard. 

31. Failed login keeps entered username, clears sensitive password as appropriate and shows a specific non-revealing error. 

#### **19.8 Authentication and Access.2 Role and Module Access** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Settings > Roles and Permissions|
|**User goal**|Assign portal and module access without creating action-level<br>permissions.<br>|
|**System feedback**|Show modules afected and confrmation after save.|
|**Error prevention and recovery**|Warn when changes could remove the current administrator’s<br>own access.<br>|
|**Completion signal**<br>|Role refectspermitted modules and fnancial visibility.|
|**Primary interaction fow**||



32. Open a role or create a role using source-listed fields. 

33. Toggle permitted portal sections/modules and apply assigned-site restrictions where applicable. 

34. Save and apply access on the user’s next authorized session or refresh. 

### **19.9 Dashboard and Live Operations** 

#### **19.9 Dashboard and Live Operations.1 Dashboard Review** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Dashboard|
|**Usergoal**|See source-listed operational counts and activity.|
|**System feedback**|Show one-minute refresh timestampandper-widget|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

||RFI Admin/Supervisor Portal - Figma Make Design Specifcation|
|---|---|
||loading/error states.|
|**Errorprevention and recovery**|Never hide critical alerts behind lower-prioritycontent.<br>|
|**Completion signal**<br>|User identifes and opens required work.|
|**Primary interaction fow**||



35. Review each source-defined dashboard grid and section. 

36. Use listed status/category/date filters and global search. 

37. Open detail pages from cards without losing dashboard scope. 

#### **19.9 Dashboard and Live Operations.2 Guard Map and Remote Actions** 

|**Primary user**|Admin or Supervisor with module access|
|---|---|
|**Entry point**|Dashboard > Show Map|
|**Usergoal**|Locate checked-inguards and review their activity.|
|**System feedback**|Show last GPS update and action result.<br>|
|**Error prevention and recovery**|Mark stale location; require confrmation for clock-out/sign-<br>out. Remote Speak remainspendingdefnition.|
|**Completion signal**<br>|Action succeeds or user receives a recoverable error.|
|**Primary interaction fow**||



38. Select a guard marker or row. 

39. Review current status and activity since clock-in. 

40. Choose only a source-listed remote action: Message with Siren, Remote Speak, Send Audio Message, Reload Install/Settings, Clock Out and Stay Signed In, or Clock Out and Sign Out. 

41. Confirm consequential actions before execution. 

#### **19.9 Dashboard and Live Operations.3 Inactive Mobile User Review** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Dashboard count > Inactive Mobile User<br>|
|**User goal**|Review guards with no GPS update or no activity for confgured<br>duration.|
|**System feedback**|Show inactivity duration and originating automation where<br>available.|
|**Errorprevention and recovery**|Avoid duplicate alerts for the same unresolved event.|
|**Completion signal**<br>|Issue is reviewed through the existing ticket/system exception<br>path.|



**Primary interaction flow** 

42. Open listing with Date, Ticket Type, First Name, Last Name, Subject, Location, Status and View. 

43. Open the generated ticket or related record. 

### **19.10 Employee and Department Management** 

#### **19.10 Employee and Department Management.1 Create Employee** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Employee > Add Employee<br>|
|**Usergoal**|Create an employee with the exact approved source felds.<br>|
|**System feedback**|Inline required-feld and duplicate validation; success names<br>employee and ID.<br>|
|**Error prevention and recovery**|Preserve values on error. Password felds follow password<br>policy.|
|**Completion signal**<br>|Employee appears in listing with permitted portal/mobile<br>access.|
|**Primary interaction fow**||



44. Complete General Information, Address, Roles and Permission, and Other Fields. 

45. Select or create the confirmed customizable Employee Type. 

46. System auto-generates Employee ID. 

47. Submit and open the employee record. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

#### **19.10 Employee and Department Management.2 Review Employee Profile** 

|**Primary user**|Admin or Supervisor with access|
|---|---|
|**Entry point**|Employee Listing> View|
|**User goal**|Understand employee assignments, availability, exceptions,<br>reports,tours,schedules and time of.|
|**System feedback**|Keepemployee identity/status visible across tabs.|
|**Error prevention and recovery**|Sensitive compensation/payment information follows custom<br>fnancial visibility.|
|**Completion signal**<br>|User completes review or action and remains in employee<br>context.|
|**Primary interaction fow**||



48. Open profile Overview. 

49. Navigate source-listed subsections without losing employee context. 

50. Use only listed actions such as Change Password, Force Password Change, ID Card, Snap Picture, Terminate, Tracks and Edit. 

#### **19.10 Employee and Department Management.3 Terminate Employee** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Employee > View > Terminate|
|**User goal**|Terminate an employee using Last Day of Work, Reason and<br>Comments.<br>|
|**System feedback**|Show a summary of consequences before confrmation and<br>fnal success afterprocessing.|
|**Errorprevention and recovery**|Do not delete historical reports,shifts,tours or time records.<br>|
|**Completion signal**<br>|Employee status/access refects termination and future<br>coverage is visible.|



**Primary interaction flow** 

51. Open Terminate action. 

52. Complete source-defined fields and confirm. 

53. System marks future shifts uncovered, revokes portal/mobile access, preserves history and notifies payroll and supervisors. 

#### **19.10 Employee and Department Management.4 Manage Site Ban** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Employee > Site Bans|
|**Usergoal**|Prevent assignment to a banned site.|
|**System feedback**|Show ban status prominently in employee and scheduling<br>context.|
|**Errorprevention and recovery**|Displayclear blockingreason duringassignment.|
|**Completion signal**<br>|Ban is active or removed and historyremains traceable.|
|**Primary interaction fow**||



54. Create ban with approved details and save. 

55. Scheduler blocks future assignment to that site. 

56. Remove ban using the listed action when applicable. 

#### **19.10 Employee and Department Management.5 Manage Department** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Employee > Departments|
|**Usergoal**|Create a department and assign employees.|
|**System feedback**|Show employee count and assignment results.<br>|
|**Errorprevention and recovery**|Prevent duplicate department identifers where required.|
|**Completion signal**<br>|Department and assignments appear correctly.|
|**Primary interaction fow**||



57. Create department with Department Name, Display ID and Details. 

58. Open Department detail and use source-listed Employees, Operation Reports, Notifications, Positions, Contacts, Security & Patrol and Schedules subsections. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

### **19.11 Client, Site and Job Type Management** 

#### **19.11 Client, Site and Job Type Management.1 Create Site** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Sites > New Site<br>|
|**User goal**|Create a site using source-defned account, company, contact,<br>address,employee relation and custom felds.|
|**System feedback**|Validate required contact/address values and show success.|
|**Errorprevention and recovery**|Do not assume unresolved shared-client visibilityrules.<br>|
|**Completion signal**<br>|Site appears with assigned clients and approved confguration.|
|**Primary interaction fow**||



59. Choose Account Type. 

60. Complete Company Information, Main Contact, Address, Employee Relations and Other Custom Fields. 

61. Assign multiple clients where required by confirmed clarification. 

62. Save and open Site detail. 

#### **19.11 Client, Site and Job Type Management.2 Configure Site Operations** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Site > Securityand Patrol / Settings<br>|
|**User goal**|Confgure checkpoints, tours, site locations, emergency<br>contacts, geo-fence and mobile restrictions.|
|**System feedback**|Show site context and status after save.|
|**Error prevention and recovery**|Do not introduce Site Templates; Zone Templates excluded for<br>currentphase.<br>|
|**Completion signal**<br>|Confguration is active for that site.|
|**Primary interaction fow**||



63. Open the required subsection from Site context. 

64. Complete source-defined fields and save. 

65. Return to Site with the same subsection selected. 

#### **19.11 Client, Site and Job Type Management.3 Create Job Type** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Site > Positions/Job Types > Create|
|**Usergoal**|Create the source-listed Position/Job Type settings.<br>|
|**System feedback**|Show missing qualifcation warnings without automatic<br>blocking, per clarifcation.|
|**Error prevention and recovery**|Do not silently rename stored source data; UI may use Job Type<br>consistently.|
|**Completion signal**<br>|Job Type is available for schedules and assignments.|
|**Primary interaction fow**||



66. Complete Post Base Settings, Compliances, Service Dates, Break Rule Settings, Pay Settings, Matrix, Break Payroll and Holiday Pay. 

67. Save and list the record with UID, Position Title, Tpt Hrs, Bill Rate, Holiday Rate, Temp and Actions. 

#### **19.11 Client, Site and Job Type Management.4 Assign Employee to Site** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Site > Assigned Employees|
|**User goal**|Assign an employee with Filter by Skills, Select Employee,<br>Employee Start Date and Add Rule.<br>|
|**System feedback**|Display warnings for qualifcation gaps and hard block for<br>active site ban.|
|**Errorprevention and recovery**|Do not auto-decide on warnings;Admin acts manually.|
|**Completion signal**<br>|Employee is assigned and visible in Site and Employee<br>contexts.|
|**Primary interaction fow**||



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

68. Search/filter qualified employees. 

69. Select employee and enter effective rate rule fields. 

70. Save assignment and show in listing. 

### **19.12 Scheduling** 

#### **19.12 Scheduling.1 Create Schedule Definition** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Schedule > Create|
|**Usergoal**|Create the Connecteam-style schedule shell.<br>|
|**System feedback**|Preview selected shift-card felds and validate required<br>confguration.<br>|
|**Errorprevention and recovery**|Do not add unapproved workfow states or extra felds.<br>|
|**Completion signal**<br>|Schedulepage isgenerated with chosen views and felds.|
|**Primary interaction fow**||



71. Enter Name, choose default/custom fields, Jobs, View Type, Layout Type, shift-card fields and Users. 

72. Save to generate the schedule page. 

#### **19.12 Scheduling.2 Create or Update Shift** 

|**Primary user**|Admin or Supervisor with access|
|---|---|
|**Entry point**|Schedulepage > blank cell or shift|
|**Usergoal**|Create or modifya shift.<br>|
|**System feedback**|Show the shift immediately in the grid and notify afected users<br>through confgured channels.<br>|
|**Error prevention and recovery**|Detect approved conficts; block banned-site assignment;<br>showqualifcation warnings.|
|**Completion signal**<br>|Shift is visible with chosen card content and historyretained.|
|**Primary interaction fow**||



73. Select Day, Week or Month and the required date. 

74. Click a blank box or existing shift. 

75. Complete Date/From-To/All Days, Start Time, End Time, Title, Job, Users, Address, Note, Shift Tags, Shift Tasks and approved custom fields. 

76. Save or update the published schedule. 

#### **19.12 Scheduling.3 Review Schedule Issues** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Schedule > Issues<br>|
|**User goal**|Review overlapping shifts, availability, time of, site ban,<br>expired credentials, missing training, overtime, rest and weekly<br>hours issues.<br>|
|**System feedback**|Explain each issue in plain language and identify the afected<br>rule.|
|**Error prevention and recovery**|Pending open-shift/swap/replacement features must not be<br>shown as fnalized.|
|**Completion signal**<br>|Issue is corrected or remains visible with reason.|
|**Primary interaction fow**||



77. Turn on Issues view/filter. 

78. Open the affected shift or employee context. 

79. Take a manual action; no unapproved automated reassignment. 

### **19.13 Time Clock, Attendance and Payroll** 

#### **19.13 Time Clock, Attendance and Payroll.1 Review Attendance** 

|**Primary user**|Admin or Supervisor|
|---|---|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

|**Entry point**|Dashboard Attendance / SecurityOperations > Time Clock|
|---|---|
|**Usergoal**|Review scheduledguards and clock status.|
|**System feedback**|Show current status and last activity; data refresh follows<br>approved timing.|
|**Errorprevention and recovery**|Do not invent approval actions not in source.|
|**Completion signal**<br>|User understands attendance condition and takes an approved<br>action.|
|**Primary interaction fow**||



80. Use source-listed Current, Current Uncovered, All Shifts, Covered and Late Shift filters plus search. 

81. Open the relevant employee/shift/timesheet context. 

#### **19.13 Time Clock, Attendance and Payroll.2 Manual Time Adjustment** 

|**Primary user**|Authorized Admin/Supervisor|
|---|---|
|**Entry point**|Timesheet detail|
|**Usergoal**|Correct a time entrywith audit history.<br>|
|**System feedback**|Show recalculated time/pay impact where defned by approved<br>payroll logic.<br>|
|**Errorprevention and recovery**|Preserve original values;ofline behavior remainspending.|
|**Completion signal**<br>|Adjustment is saved and traceable.|
|**Primary interaction fow**||



82. Open the source-listed timesheet. 

83. Edit the applicable time and enter required reason/notes as confirmed. 

84. Save and display original and updated values in history. 

#### **19.13 Time Clock, Attendance and Payroll.3 Configure Payroll** 

|**Primary user**|Admin with fnancial visibility<br>|
|---|---|
|**Entry point**|Settings > Back Ofice Confguration / Payroll<br>|
|**User goal**|Confgure source-listed Employee Classes, Payroll Schedules,<br>Holiday Groups/Codes, Overtime Rules, Pay Codes, Export<br>Formats,Tax Settings,Bill Items and Break Penalties.<br>|
|**System feedback**|Show active confguration and validation dependencies.|
|**Error prevention and recovery**|Mark detailed formulas, invoice behavior and integrations<br>pending.<br>|
|**Completion signal**<br>|Confguration is available to approvedpayroll calculation.|
|**Primary interaction fow**||



85. Open each configuration subsection. 

86. Create/edit only source-defined records and fields. 

87. Use payroll calculation module without assuming unapproved formulas or provider integration. 

### **19.14 Reports, Incidents and Forms** 

#### **19.14 Reports, Incidents and Forms.1 Create Custom Report Template** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Dashboard Reports Settings / Settings > Report Templates|
|**User goal**|Create a custom report using report form, categories, incident<br>categories and footer.<br>|
|**System feedback**|Preview form layout and identifyrequired felds.<br>|
|**Errorprevention and recovery**|No multi-level approval or correction workfow.|
|**Completion signal**<br>|Template is available for reportgeneration.|
|**Primary interaction fow**||



###### 88. Open Create Custom Report. 

89. Define fields and configure approval requirement, site context and applicable settings. 

90. Save and list template with count and active/archive controls. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

#### **19.14 Reports, Incidents and Forms.2 Review and Approve Report** 

|**Primary user**|Admin or Supervisor with access|
|---|---|
|**Entry point**|Reports listing> View<br>|
|**Usergoal**|Review report details and approve when confgured.|
|**System feedback**|Show current source-listed status and approval result.|
|**Errorprevention and recovery**|Do not add invented report states or numberingformat.<br>|
|**Completion signal**<br>|Report status refects approved action.|
|**Primary interaction fow**||



91. Filter using Active/All Templates/Archived, Incident Flags Only, Status, Date and Search. 

92. Open report with ID, Type, Flags, Date, Reported By, Account and Status. 

93. Use approved actions: Printable PDF, Email Report, View, Remove and approval where configured. 

#### **19.14 Reports, Incidents and Forms.3 Build and Assign Form** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Communications/SecurityOperations > Forms > Add New|
|**User goal**|Create a custom form and make it available for employee<br>completion.|
|**System feedback**|Show formpreview and clear save result.|
|**Error prevention and recovery**|Do not add unapproved frequency, department assignment or<br>workfow states.|
|**Completion signal**<br>|Form is listed and available according to approved assignment<br>behavior.|
|**Primary interaction fow**||



94. Add approved fields using form builder. 

95. Use source-listed list, archive, export, move and delete actions. 

### **19.15 Patrols and Checkpoints** 

#### **19.15 Patrols and Checkpoints.1 Create Checkpoint** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Site > Securityand Patrol > Checkpoints > Create<br>|
|**Usergoal**|Create a checkpoint usingexact source felds.<br>|
|**System feedback**|Validate unique ID and required scan confguration.<br>|
|**Error prevention and recovery**|Do not add QR. Manual evidence options follow confrmed<br>custom defnition.|
|**Completion signal**<br>|Checkpoint is visible with Assigned, Last Scan, Location and<br>Edit.|
|**Primary interaction fow**||



96. Enter Checkpoint Name, Special Instruction, Can Be Scanned By, monitoring method, scan interval, extra scan options, NFC/Barcode type, Checkpoint ID, GPS accuracy and manual-scanning option. 

97. Save and list checkpoint. 

#### **19.15 Patrols and Checkpoints.2 Create Tour Route** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Site > Tour Routes > Create<br>|
|**Usergoal**|Create a tour route and confgure approved behavior.|
|**System feedback**|Show checkpoint count/order and timingsummary.|
|**Error prevention and recovery**|Do not make optional thresholds mandatory; interruption<br>handlinguses confgured notifcations.|
|**Completion signal**<br>|Tour route is available for shift assignment.|
|**Primary interaction fow**||



98. Enter Description, Assigned To, Special Instructions, Estimated Duration, Grace Period, Weekly/Monthly recurrence and Tour Schedule. 

99. Manage checkpoints and custom order rules. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

100.Save for assignment through Schedule > Shift > Employee. 

#### **19.15 Patrols and Checkpoints.3 Monitor Tour Session** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Dashboard Scheduled Tours / Employee Tours / Site Tours|
|**Usergoal**|Review tourprogress and results.<br>|
|**System feedback**|Show late/incomplete/missed status from confgured rules.<br>|
|**Error prevention and recovery**|Delete requires confrmation; preserve listed history/audit<br>behavior.|
|**Completion signal**<br>|Tour is reviewed or action completed.|
|**Primary interaction fow**||



###### 101.Use date and search filters. 

102.Open session with Tour Name, Account, Employee, Result, Start, End and Duration. 103.Use listed PDF, Email, View Session or Delete actions. 

### **19.16 Tasks, Communications and Help** 

#### **19.16 Tasks, Communications and Help.1 Create Task** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Dashboard Task Dispatch / SecurityOperationsQuick Tasks|
|**Usergoal**|Create a task based on selected Task Type.|
|**System feedback**|Show task status and assignment result.<br>|
|**Error prevention and recovery**|Do not impose universal priority/due-date/evidence felds<br>unless the selected Task Type defnes them.|
|**Completion signal**<br>|Task appears in New/Assigned/Open context.|
|**Primary interaction fow**||



###### 104.Select Add Task. 

105.System displays the fields applicable to that Task Type. 

106.Assign to one approved target and save. 

#### **19.16 Tasks, Communications and Help.2 Review Task Worklist** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Task listing<br>|
|**Usergoal**|Find work usingsource flters and counts.<br>|
|**System feedback**|Keepflters and count changes visible.|
|**Error prevention and recovery**|Duplicate or unsupported assignment behavior must not be<br>assumed.|
|**Completion signal**<br>|Task state is clear and current.|
|**Primary interaction fow**||



107.Switch Created by Me, My Tasks, All Tasks or Archived. 108.Review Overdue, Done, Open and Total counts. 109.Open and update through source-defined actions. 

#### **19.16 Tasks, Communications and Help.3 Send Broadcast or Update** 

|**Primary user**|Admin or Supervisor with access|
|---|---|
|**Entry point**|Communications > Broadcast / Updates|
|**Usergoal**|Send a message to selected user types or users.|
|**System feedback**|Show success/failureper approved channel.|
|**Errorprevention and recovery**|Do not add unapproved scheduling,expiration or read-tracking.|
|**Completion signal**<br>|Message is sent and appears in its source-listed listing.|
|**Primary interaction fow**||



110.Choose audience according to approved selection behavior. 111.Enter message content and submit. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

#### **19.16 Tasks, Communications and Help.4 Use Directory Actions** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Communications > Directory|
|**Usergoal**|Find users andperform source-listed communication actions.|
|**System feedback**|Show selected-user count and completion feedback.|
|**Errorprevention and recovery**|Pendingchatprivacy/media/retention rules remain annotated.|
|**Completion signal**<br>|Chosen action opens or completes in user context.|
|**Primary interaction fow**||



###### 112.Search/list directory users. 

113.Select users and choose Tag Users, Notify, Send Chat Message, Create Group Chat, Create Task or Export. 

#### **19.16 Tasks, Communications and Help.5 Resolve Help Desk Item** 

|**Primary user**|Admin or Supervisor|
|---|---|
|**Entry point**|Communications > HelpDesk|
|**Usergoal**|Work through Unassigned,Assigned to Me and Allqueues.|
|**System feedback**|Show assignment/status visibly.|
|**Error prevention and recovery**|Do not merge Help Desk with Help > Resource Center/Talk to<br>an Expert.|
|**Completion signal**<br>|Item is assigned or reviewed.|
|**Primary interaction fow**||



###### 114.Select a queue. 

115.Open an item and use only source-listed help desk behavior. 

### **19.17 Automations, Vehicles, Team Resources and Training** 

#### **19.17 Automations, Vehicles, Team Resources and Training.1 Create Automation** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Automations > Add<br>|
|**Usergoal**|Confgure a custom Trigger > Conditions > Actions rule.|
|**System feedback**|Show a human-readable rule summarybefore save.|
|**Error prevention and recovery**|No acknowledgment escalation; company-global scope<br>remains unconfrmed.|
|**Completion signal**<br>|Automation is listed and can generate one unresolved-event<br>notifcation set.|
|**Primary interaction fow**||



116.Select one allowed scope; multi-site selection is not allowed. 117.Define trigger, conditions and actions from approved options. 118.Configure duplicate notification suppression. 

119.Save and enable according to source behavior. 

#### **19.17 Automations, Vehicles, Team Resources and Training.2 Manage Vehicle Documentation** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Vehicle Management / CompanyVehicle Documentation|
|**User goal**|Create vehicle records and manage documentation-only<br>scope.|
|**System feedback**|Show document upload result and current record status.|
|**Error prevention and recovery**|Do not add maintenance, fuel, mileage, GPS or equipment<br>inventory.|
|**Completion signal**<br>|Vehicle and documents are available in listing/view.|
|**Primary interaction fow**||



120.Create Vehicle with ID, License, Make/Model/Year and Status. 121.Use Purchased/Leased and Active/Inactive/All filters. 122.Add/view/export company vehicle documents. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

#### **19.17 Automations, Vehicles, Team Resources and Training.3 Review Team Resources** 

|**Primary user**|Admin or Supervisor aspermitted|
|---|---|
|**Entry point**|Team Resources|
|**User goal**|Access all source-listed Team Resources while detailed<br>workfows remainpending.|
|**System feedback**|Mark pending modules with visible design annotation, not<br>fabricated interactions.|
|**Errorprevention and recovery**|Do not removependingsource modules.|
|**Completion signal**<br>|User can locate everysource-listed area.|
|**Primary interaction fow**||



123.Navigate Team Member Manual, Rewards, Documents, Benefits, Celebrations, Time Off, Paid Policies, Insights, Text Message, Notices, Disciplinary Reports, HR Complaint and Hiring. 

124.Use only source-listed Add, Active/Archived, Export, Search and filter actions. 

#### **19.17 Automations, Vehicles, Team Resources and Training.4 Manage Training Listings** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Training<br>|
|**Usergoal**|Manage confrmedQuizzes and RFI Academylistings.|
|**System feedback**|Show status and result of listed actions.<br>|
|**Error prevention and recovery**|Do not add courses, certifcates or completion workfows until<br>approved.|
|**Completion signal**<br>|Item is created or managed in the correct listing.|
|**Primary interaction fow**||



125.Open Quizzes or RFI Academy. 

126.Use Add New, Active/Archived, Export, Search and Filter. 

### **19.18 Settings, Audit, Help and Sign Out** 

#### **19.18 Settings, Audit, Help and Sign Out.1 Configure Settings** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Settings<br>|
|**Usergoal**|Manage General,Operation and Back Ofice confgurations.<br>|
|**System feedback**|Show which scope is afected and the save result.<br>|
|**Error prevention and recovery**|Zone Templates are excluded current phase; undefned<br>settings remainpendingrather than invented.<br>|
|**Completion signal**<br>|Confguration is stored and visible.|
|**Primary interaction fow**||



127.Choose the exact source-listed subsection. 128.Complete or update its approved fields. 

129.Save and preserve audit history where source-listed. 

#### **19.18 Settings, Audit, Help and Sign Out.2 Review Audit History** 

|**Primary user**|Admin|
|---|---|
|**Entry point**|Settings > Audit History/ contextual history|
|**Usergoal**|Understand who changed a record and when.|
|**System feedback**|Keepaudit records read-onlyand chronologicallyclear.|
|**Errorprevention and recovery**|Do not allow operational historyto be silentlydeleted.|
|**Completion signal**<br>|User can trace the relevant change.|
|**Primary interaction fow**||



###### 130.Open the relevant audit/history view. 

131.Review source-listed history information and associated record context. 

#### **19.18 Settings, Audit, Help and Sign Out.3 Use Help** 

|**Primary user**|Admin or Supervisor|
|---|---|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

||RFI Admin/Supervisor Portal - Figma Make Design Specifcation|
|---|---|
|**Entry point**|Help|
|**Usergoal**|Access Resource Center or Talk to an Expert.|
|**System feedback**|Maintainportal context wherepossible.|
|**Errorprevention and recovery**|Do not substitute HelpDeskqueues for this module.|
|**Completion signal**<br>|User reaches the required support resource.|
|**Primary interaction fow**||



132.Choose the required help option. 

133.Open the source-defined support destination. 

#### **19.18 Settings, Audit, Help and Sign Out.4 Sign Out** 

|**Primary user**|Admin or Supervisor<br>|
|---|---|
|**Entry point**|Userprofle / Sign Out|
|**Usergoal**|End the authenticated session safely.|
|**System feedback**|Show completion without exposing priorprotected content.|
|**Errorprevention and recovery**|Unsaved form warningappears before sign-out if applicable.|
|**Completion signal**<br>|Session is ended.|
|**Primary interaction fow**||



134.Select Sign Out. 

135.System clears authenticated session and returns to login. 

### **19.19 Required HCI Annotation for Every Figma Screen** 

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

### **19.20 Required Clickable Prototype Flows** 

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

### **19.21 Usability Validation Checklist** 

|**Validation Area**|**Test**|**Pass Condition**|**Applies To**|
|---|---|---|---|
|Findability|Ask user to locate a source-<br>listed module or subsection<br>withoutguidance.|Correct destination reached<br>without dead end.|All navigation|
|Operational scan|Ask Supervisor to identify the<br>most urgent current issue.|Critical issue recognized<br>before informational items.|Dashboard/Live Operations|



RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

RFI Admin/Supervisor Portal - Figma Make Design Specification 

|Form clarity|Ask user to create<br>employee/site/job type/report<br>template.|User understands sections,<br>required felds and<br>completion.|Create/Edit forms|
|---|---|---|---|
|Error prevention|Attempt banned-site<br>assignment and invalid geo-<br>fence clock-in context.|System prevents or warns<br>exactly as approved.|Scheduling/Attendance|
|Context retention|Open report/tour/task from<br>Site or Employee context and<br>return.<br>|Original context and flters<br>remain visible.|Shared modules|
|Accessibility|Complete core fow using<br>keyboard and screen-reader<br>labels.|All controls reachable, named<br>and understandable.|All core screens|
|Recovery|Trigger load, validation and<br>upload errors.|User can retry without losing<br>unrelated work.|All interactive screens|
|Supervisor eficiency|Complete top recurring tasks<br>from Dashboard.|No unnecessary Admin<br>confguration screens<br>encountered.|Supervisor portal|



### **19.22 Scope Control for Figma Make** 

- Figma Make prompts and generated screens must use the verified source requirements and this HCI blueprint together. 

- A visually useful shortcut may be designed only when it opens an already approved action or module; it must not create new business behavior. 

- Pending items must be annotated and isolated from approved prototype paths. 

- Every generated screen must be checked against the traceability Design ID and source requirements already present in this document. 

- Any proposed feature beyond the approved source must be documented separately as a recommendation and excluded from the approved design file until accepted. 

RFI Admin/Supervisor Portal - Figma Design and HCI Specification 

