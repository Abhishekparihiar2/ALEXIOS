RFI Admin/Supervisor Portal - Developer Functional Specification 

# **RFI Admin/Supervisor Portal** 

Developer Functional Specification - FINAL VERIFIED & RECONCILED 

# **Prepared by AppZoro Technologies Inc.** 

Version: Final Verified & Reconciled Business Logic | Date: August 1, 2026 

This document consolidates the uploaded ALEXIOS/RFI feature listing, all subsequent RFI clarifications, and concise developer explanations for fields, filters, columns, actions and system behavior. No unapproved business functionality has been added. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **1. Document Control and Scope Rules** 

# **1.1 Purpose** 

This document defines the complete functionality of the RFI Admin/Supervisor Web Portal. It preserves applicable modules, sections, subsections, fields, filters, table columns, actions, settings and pending decisions from the source feature list and subsequent RFI responses. 

# **1.2 Scope Status Legend** 

|**Status**<br>|**Meaning**|
|---|---|
|Source / Confrmed|Present in the uploaded feature list or explicitly<br>confrmed byRFI.<br>|
|Pending Discussion|Must remain in the scope register but workfow or<br>behavior is not fnalized.|
|Excluded / Current Phase|Explicitly ignored or not required for the current<br>scope.|



# **1.3 Controlling Rules** 

- The platform is a single-company platform for the current version. 

- The architecture may support future multi-tenancy, but no current multi-tenant screens or controls are included. 

- RFI clarifications override conflicting wording in the original feature list. 

- Items marked Pending Discussion remain visible in this document but must not be treated as finalized. 

- No new approval flow, calculation rule, notification rule, reporting KPI, client capability, mobile behavior or workflow is assumed unless explicitly listed or confirmed. 

- UI organization may consolidate duplicated access points, but every listed functionality must remain accessible. 

- The answered RFI Logic Clarification Register dated August 1, 2026 is the final authority for resolved business logic. Where it conflicts with an earlier generic statement, the answered clarification takes precedence. Items expressly marked Later Phase remain non-implementable in the current phase. 

# **1.3.1 Developer Interpretation Guide** 

Each short field, column, filter or action label is followed by a concise explanation of what the control must display, store, filter or perform. Explanations clarify implementation intent only and do not introduce additional workflow. 

For listing columns, the displayed value must come from the related record and respect active site/module access. For filters, applying a value must narrow the current list without changing stored data. For actions, the system must perform the named operation, show success or failure feedback, and preserve audit history where already required. 

# **1.4 Confirmed Organizational Structure** 

# **Company → Region → Client → Site → Job Type / Position → Shift** 

- Client: organization associated with sites and Client Portal access. 

- Multiple clients may be assigned to one site. 

- Account Type: classification such as Regular Client, Multi-Site Client or Site Account. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Site: operational property where security services are performed. 

- Location: exact latitude/longitude or a defined internal site area. 

- Department: employee team used to group and assign employees. 

- Zone is ignored for the current phase. 

- Groups are current-phase specific-purpose manual collections of selected people. Departments remain permanent organizational teams. Segments do not require separate rule-based behavior in the current phase. 

# **2. Authentication, Access and Portal Framework** 

# **2.1 Authentication / Login** 

- ALEXIOS/RFI Admin and Supervisor/Employee login. 

- Role-based redirection to the applicable dashboard. 

- Access only to modules assigned through Roles and Permissions. 

- Same web portal may be used for Admin, Supervisor and Client Portal access, according to assigned portal role. 

# **2.2 Roles and Permissions** 

- Users may have multiple roles. 

- Roles are created through role and permission toggles. 

- No separate Dispatcher role is required. 

- Permissions are module-level. A user with module access may access all functions in that module. 

- Users may be restricted to assigned sites; when restricted, they may access permitted module information for those sites. 

- Financial visibility is custom-defined. 

- Temporary permissions are not required. 

# **Role Setup Fields** 

- Role Name - Captures or configures role name for the record. 

- Description - Stores or displays explanatory details for the record. 

- Portal Section / Portal Type - Captures or configures portal section portal type for the record. 

- Module access toggles - Provides an on/off control for the stated option. 

- Assigned site restriction - Captures or configures assigned site restriction for the record. 

- Financial information visibility - Captures or configures financial information visibility for the record. 

# **2.3 Global Portal Elements** 

- Global Search for Customers/Clients, Contacts, Employees, Reports and other supported records. 

- Notifications indicator. 

- Chat access. 

- User profile and Sign Out. 

- Page-level search, filters, export and actions only where specifically listed in this document. 

# **3. Dashboard** 

# **3.1 Platform Statistics** 

# **3.1.1 Clocked-In via Mobile** 

Shows the total number of guards clocked in today. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **_Detail Listing Columns_** 

- Name - Displays the record or person's configured name. 

- Position / Job Type - Displays the position job type value for each listed record. 

- Clocked-in Time - Displays the clocked-in time value for each listed record. 

- Shift Name - Displays the configured title/name of the shift. 

# **_Filters and Actions_** 

- Status: Clocked In - Filters guards with an active clock-in for the applicable scheduled shift. 

- Status: Running Late - Filters scheduled guards who have passed the configured start threshold and have not clocked in. 

- Status: Clocked Out - Filters guards whose applicable shift clock-out has been recorded. 

- Status: Need to Clock Out - Filters guards still clocked in after the applicable shift-end/clock-out threshold. 

- Status: On Time Off - Filters employees with approved time off covering the applicable period. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

- View details - Opens the detailed page or panel for the selected row. 

# **3.1.2 Inactive Mobile User** 

Shows guards who are clocked in but have no GPS updates or no mobile activity for a configured duration. The threshold is configured through Automations. Dashboard data refreshes every minute. 

# **_System Behavior_** 

- Automatically generate a ticket when the configured inactivity condition is met. 

- Suppress duplicate notifications for the same unresolved event. 

# **_Ticket Listing Columns_** 

- Date - Displays or captures the applicable calendar date. 

- Ticket Type - Displays the ticket type value for each listed record. 

- First Name - Stores/displays the person's given name. 

- Last Name - Stores/displays the person's family name. 

- Subject - Displays the subject value for each listed record. 

- Location - Displays the location value for each listed record. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- View - Opens the complete detail view for the selected record. 

# **3.1.3 Expired and Expiring Soon Skills** 

Shows active employee skills and credentials that are expired or expiring soon. 

# **_Listing Columns_** 

- Employee Name - Displays the employee's full name and should open the employee profile where a view link is supported. 

- Expiration Date - Displays the expiration date value for each listed record. 

- Expires - Displays the remaining time or expiry indicator calculated from the expiration date. 

- Description - Stores or displays explanatory details for the record. 

- Region - Displays or filters by the region associated with the record. 

- Category - Displays or selects the configured category assigned to the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **_Filters and Export_** 

- Category: Diplomas - Filters the current list to records matching diplomas. 

- Category: Trainings & Special Skills - Filters the current list to records matching trainings & special skills. 

- Category: Languages - Filters the current list to records matching languages. 

- Category: Licenses & Permits - Filters the current list to records matching licenses & permits. 

- Category: Memberships - Filters the current list to records matching memberships. 

- Category: Prior Career Skills - Filters the current list to records matching prior career skills. 

- Category: Uniforms - Filters the current list to records matching uniforms. 

- Date Filter - Filters the listing using the selected date or date range. 

- Export Excel - Downloads the current filtered result set as an Excel-compatible file. 

- Export CSV - Downloads the current filtered result set as a CSV file. 

- Export PDF - Downloads or generates a PDF representation of the current filtered result set. 

# **3.1.4 Reports to Approve - Last 7 Days** 

- Shows reports pending approval before publication to the Client Portal. 

- Click redirects to the Reports page under Operation Reports. 

- Approval requirement is configurable while creating the custom report. 

# **3.1.5 Message Board** 

- Shows count of unread/pending messages created by Guards. 

# **_Listing Columns_** 

- Sender Name - Displays the sender name value for each listed record. 

- Title - Displays or stores the record title or employee job title, based on page context. 

- Message - Displays the message value for each listed record. 

- Date and Time - Displays the event timestamp using the configured system locale and time zone. 

- Site - Identifies the operational site associated with the record. 

- Viewable By - Displays the audience permitted to view the message. 

# **_Filters_** 

- Category - Displays or selects the configured category assigned to the record. 

- Type: Current Message - Filters the current list to records matching current message. 

- Type: Future Message - Filters the current list to records matching future message. 

- Type: Expired Messages - Filters the current list to records matching expired messages. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **3.1.6 Time-Off Requests** 

- Shows count of pending time-off requests. 

- Click redirects to the Time Off page. 

# **3.2 Activity Log** 

- Latest: current-day activities. 

- View History: date-wise historical activities. 

# **Filters** 

- All Events - Filters the current list to records matching all events. 

- Reports - Filters the current list to records matching reports. 

- Time Clock - Filters the current list to records matching time clock. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Patrol Tours - Filters the current list to records matching patrol tours. 

- Panic Button Triggers - Filters the current list to records matching panic button triggers. 

- Changed Site - Filters the current list to records matching changed site. 

- Checkpoint Scans - Filters the current list to records matching checkpoint scans. 

- Runsheet Patrol Events - Filters the current list to records matching runsheet patrol events. 

- Remote Actions - Filters the current list to records matching remote actions. 

- Date From-To - Filters records whose applicable date falls within the selected start and end dates. 

- LATER PHASE: Detailed Runsheet Patrol Events behavior is not implemented in the current phase. 

# **3.3 Attendance** 

- Lists guards scheduled today and their clocked-in status, shift-wise. 

- Follow Connecteam-style attendance presentation. 

# **Filters** 

- Clocked In - Filters guards with an active clock-in for the applicable scheduled shift. 

- Running Late - Filters scheduled guards who have passed the configured start threshold and have not clocked in. 

- Clocked Out - Filters guards whose applicable shift clock-out has been recorded. 

- Need to Clock Out - Filters guards still clocked in after the applicable shift-end/clock-out threshold. 

- On Time Off - Filters employees with approved time off covering the applicable period. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **3.4 Scheduled Tours** – Will list out scheduled tours for current day. 

# **Listing Columns** 

- Schedule Timing - Displays the schedule timing value for each listed record. 

- Site Name - Displays the configured name of the site. 

- Schedule Title - Displays the schedule title value for each listed record. 

- Last Performed By - Displays the last performed by value for each listed record. 

# **3.5 Task Dispatch** 

- List all created tasks. 

- Add Task opens a dynamic form based on selected Task Type. 

# **Filters** 

- New Tasks - Filters the current list to records matching new tasks. 

- In Progress - Filters the current list to records matching in progress. 

- New and In Progress - Filters the current list to records matching new and in progress. 

- Completed - Filters the current list to records matching completed. 

- Assignment: All - Filters the current list to records matching all. 

- Assignment: Not Assigned - Filters the current list to records matching not assigned. 

- Assignment: Assigned to Any - Filters the current list to records matching assigned to any. 

- Assignment: Assigned to Employee - Filters the current list to records matching assigned to employee. 

# **3.6 Show Map** 

- Show checked-in guards on a map. 

- Open a popup/activity view for all activities since clock-in. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **Remote Actions** 

- Message with Siren - Represents the message with siren value or option required by this section. 

- Remote Speak - Represents the remote speak value or option required by this section. 

- Send Audio Message - Sends audio message to the selected recipient or audience. 

- Reload Install / Reload Settings - Requests the device/application to reload install reload settings. 

- Clock Out and Stay Signed In - Performs the stated clock action for the selected guard and records the event. 

- Clock Out and Sign Out - Performs the stated clock action for the selected guard and records the event. 

LATER PHASE: Remote Speak is not required in the current phase. 

# **3.7 Global Search** 

- Search Customer/Client - Represents the search customer client value or option required by this section. 

- Search Contacts - Represents the search contacts value or option required by this section. 

- Search Employees - Represents the search employees value or option required by this section. 

- Search Reports - Represents the search reports value or option required by this section. 

- Redirect to the selected record detail page - Represents the redirect to the selected record detail page value or option required by this section. 

# **3.8 Send an Update** 

- Send bulk updates to a Specific Group - Sends bulk updates to a specific group to the selected recipient or audience. 

- Send to a Specific User - Sends to a specific user to the selected recipient or audience. 

- Send by User Type - Sends by user type to the selected recipient or audience. 

# **3.9 Dashboard Submodules** 

# **3.9.1 Reports Settings** 

- Custom Report Form Listing - Captures or configures custom report form listing for the record. 

- Filter by Categories - Filters the current list to records matching categories. 

- Filter Active / Archived - Filters the current list to records matching active archived. 

- Search - Searches the current listing using supported visible identifiers and text fields. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- Field Setup - Captures or configures field setup for the record. 

- Count of generated reports - Captures or configures count of generated reports for the record. 

- Create Custom Report - Captures or configures create custom report for the record. 

- Custom Report Form - Captures or configures custom report form for the record. 

- New Category - Captures or configures new category for the record. 

- Add Category - Captures or configures add category for the record. 

- Custom Report Categories - Captures or configures custom report categories for the record. 

- Category Listing - Captures or configures category listing for the record. 

- Edit Category - Captures or configures edit category for the record. 

- Archive Category - Captures or configures archive category for the record. 

- Incident Categories - Captures or configures incident categories for the record. 

- Create Incident Category - Captures or configures create incident category for the record. 

- Report Footers - Captures or configures report footers for the record. 

- Add Footer - Captures or configures add footer for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Footer Listing in text/image format - Captures or configures footer listing in text image format for the record. 

- Edit Footer - Captures or configures edit footer for the record. 

# **_Incident Category Listing Columns_** 

- Code - Displays the code value for each listed record. 

- Region - Displays or filters by the region associated with the record. 

- Description - Stores or displays explanatory details for the record. 

- Level - Displays the level value for each listed record. 

- Parent Category - Displays the parent category value for each listed record. 

- Default Group - Displays the default group value for each listed record. 

# **_Incident Category Actions and Filters_** 

- Edit - Opens the existing record in editable form and saves validated changes. 

- Sub Form - Filters the current list to records matching sub form. 

- Filter: All Groups - Filters the current list to records matching : all groups. 

- Filter: Default Groups - Filters the current list to records matching : default groups. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **3.9.2 Vehicle Management** 

- Create Vehicle - Opens the creation form for vehicle and saves a new validated record. 

- Vehicle Listing - Represents the vehicle listing value or option required by this section. 

- View Vehicle - Opens vehicle for complete details. 

# **_Listing Columns_** 

- ID - Displays the unique identifier of the listed record. 

- License - Displays the license value for each listed record. 

- Make / Model / Year - Displays the make model year value for each listed record. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

# **_Filters_** 

- All Vehicles - Filters the current list to records matching all vehicles. 

- Purchased - Filters the current list to records matching purchased. 

- Leased - Filters the current list to records matching leased. 

- Status: Active - Filters the current list to records matching active. 

- Status: Inactive - Filters the current list to records matching inactive. 

- Status: All - Filters the current list to records matching all. 

# **3.9.3 Schedule** 

- Redirect to the Live Schedule page. 

- Follow the confirmed Connecteam-style schedule functionality defined in Section 8. 

# **3.9.4 Company Activity Journal** 

- List activities performed by Admin users. 

# **_Filters_** 

- Banned - Filters the current list to records matching banned. 

- Notes - Stores/displays additional internal information related to the record. 

- Terminated - Filters the current list to records matching terminated. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Reactivated - Filters the current list to records matching reactivated. 

# **3.9.5 System Exceptions** 

- Redirect to the Ticketing/Help Desk module. 

- Display tickets automatically generated under system exception categories. 

LATER PHASE: Detailed System Exceptions behavior beyond currently confirmed ticket generation is not required now. 

# **4. Employee Management** 

# **4.1 Add Employee** 

# **4.1.1 General Information** 

- Employee ID - automatically generated 

- First Name - Stores/displays the person's given name. 

- Middle Name - Stores/displays the person's middle name when provided. 

- Last Name - Stores/displays the person's family name. 

- Job Title - Captures or configures job title for the record. 

- Employee Type - configurable dropdown with ability to create a custom type 

- Phone (Main) - Stores the primary contact number. 

- SMS Notification Consent for Main Phone - Captures or configures sms notification consent for main phone for the record. 

- Phone (Other) - Stores an alternate contact number. 

- SMS Notification Consent for Other Phone - Captures or configures sms notification consent for other phone for the record. 

- Gender - Captures or configures gender for the record. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Government Badge ID - Captures or configures government badge id for the record. 

- Username - Captures or configures username for the record. 

- Departments - Captures or configures departments for the record. 

- Create Password - Captures the password value and applies the stated password validation rules. 

- Confirm Password - Captures the password value and applies the stated password validation rules. 

# **4.1.2 Address** 

- Address - Stores/displays the primary street address. 

- Address Line 2 - Stores optional secondary address information such as suite or unit. 

- City - Stores/displays the city component of the address. 

- State - Stores/displays the state or province component of the address. 

- ZIP Code - Represents the zip code value or option required by this section. 

- Country - Stores/displays the country and controls dependent state selections where applicable. 

# **4.1.3 Roles and Permissions** 

- Administration Portal toggle - Represents the administration portal toggle value or option required by this section. 

- Admin role toggle - Represents the admin role toggle value or option required by this section. 

- Manager/Supervisor role toggle - Represents the manager supervisor role toggle value or option required by this section. 

- Employee Portal / Guard Mobile App toggle - Represents the employee portal guard mobile app toggle value or option required by this section. 

- Assign multiple roles - Associates the selected multiple roles with the current record. AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Assign permitted modules - Associates the selected permitted modules with the current record. 

- Assign site restriction - Associates the selected site restriction with the current record. 

- Configure financial visibility where applicable - Represents the configure financial visibility where applicable value or option required by this section. 

# **4.1.4 Other Fields** 

- Logo or Picture - Uploads the image used for the employee/company record. 

- Tags - Captures or configures tags for the record. 

- Fax - Captures or configures fax for the record. 

- Employment Date - Captures the applicable date using a date picker. 

- Business Registration Number - Captures or configures business registration number for the record. 

- Birthday - Captures or configures birthday for the record. 

- Terminated Date - Captures the applicable date using a date picker. 

# **4.2 Employee Listing** 

# **Table Columns** 

- UID - Displays the unique system identifier for the record. 

- Name - Displays the record or person's configured name. 

- Middle Name - Stores/displays the person's middle name when provided. 

- Last Name - Stores/displays the person's family name. 

- Title - Displays or stores the record title or employee job title, based on page context. 

- Termination Date - Displays the termination date value for each listed record. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Username - Displays the username value for each listed record. 

- User Type - Displays the user type value for each listed record. 

- Department - Displays or selects the internal employee team. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Last Visit - Displays the user's most recent recorded portal visit. 

- Added By - Displays the user who added the record. 

# **Filters and Export** 

- Department - Displays or selects the internal employee team. 

- Zones - excluded for current phase 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

- Export CSV - Downloads the current filtered result set as a CSV file. 

- Export PDF - Downloads or generates a PDF representation of the current filtered result set. 

- Export Excel - Downloads the current filtered result set as an Excel-compatible file. 

- **EXCLUDED / CURRENTLY NOT REQUIRED:** Zone filtering is excluded for the current phase. 

**4.3 Employee Profile / View Employee** 

# **4.3.1 Overview and Basic Details** 

- User Type - Captures or configures user type for the record. 

- Employee ID - Displays the system-generated unique employee identifier. 

- Phone - Stores/displays the contact telephone number. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Address - Stores/displays the primary street address. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Other information captured during employee creation - Captures or configures other information captured during employee creation for the record. 

# **4.3.2 Assigned Sites** 

# **_Listing Columns_** 

- Site - Identifies the operational site associated with the record. 

- Start Date - Captures/displays the date from which the record, assignment or rule becomes effective. 

- Effective Rate Date - Displays the effective rate date value for each listed record. 

- Rate - Displays the rate value for each listed record. 

- End Date - Captures/displays the date on which the record, assignment or rule ends. 

- Is Primary - Displays the is primary value for each listed record. 

- Make Primary - Displays the make primary value for each listed record. 

- Action: Remove - Provides the permitted row-level operation for the selected record. 

# **_Assign Site Form_** 

- Site Name - Displays the configured name of the site. 

- Employee Start Date - Captures the applicable date using a date picker. 

- Is Primary Site: Yes / No - Provides a Yes/No control that stores the selected setting. 

# **4.3.3 Site Bans** 

# **_Ban Site Form_** 

- Site - Identifies the operational site associated with the record. 

- Reason - Captures or configures reason for the record. 

- Effective Date - Captures the applicable date using a date picker. 

- Expiration Date - Captures the applicable date using a date picker. 

- Permanent or Temporary - Captures or configures permanent or temporary for the record. 

- Requested By - Captures or configures requested by for the record. 

- Internal Notes - Captures or configures internal notes for the record. 

- Attachment - Uploads or provides access to the file attached to the record. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

# **_Banned Site Listing Columns_** 

- Site Name - Displays the configured name of the site. 

- Banned On - Displays the banned on value for each listed record. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Action: Remove Ban - Provides the permitted row-level operation for the selected record. 

- System prevents assignment of the employee to a banned site. 

# **4.3.4 Emergency Contacts** 

- Create Contact - Opens the creation form for contact and saves a new validated record. 

- Contact Listing - Represents the contact listing value or option required by this section. 

- Filter Active - Filters the current list to records matching active. 

- Filter Archived - Filters the current list to records matching archived. 

- Filter by Status - Filters the current list to records matching status. 

# **4.3.5 Notes on Employee** 

- Add Note - Opens the applicable form to add note. 

- Notes Listing - Represents the notes listing value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **4.3.6 Notes by Employee** 

- Notes Listing - Represents the notes listing value or option required by this section. 

- Filter Types: Banned - Filters the current list to records matching types: banned. 

- Filter Types: Notes - Filters the current list to records matching types: notes. 

- Filter Types: Terminated - Filters the current list to records matching types: terminated. 

- Filter Types: Reactivated - Filters the current list to records matching types: reactivated. 

- Status: Active - Filters the current list to records matching active. 

- Status: Archived - Filters the current list to records matching archived. 

- Status: All - Filters the current list to records matching all. 

# **4.3.7 Availability / Calendar** 

- Weekly calendar showing Days and Time - Represents the weekly calendar showing days and time value or option required by this section. 

- Available - Green 

- May Be Available - Yellow 

- Not Available - Red 

- Default availability is Available/Green - Represents the default availability is available green value or option required by this section. 

- Click to update availability - Represents the click to update availability value or option required by this section. 

# **4.3.8 Work Exceptions** 

# **_Listing Columns_** 

- Shift Start - Displays the shift start value for each listed record. 

- Shift End - Displays the shift end value for each listed record. 

- Region - Displays or filters by the region associated with the record. 

- Account Name - Displays the calculated number of related records. 

- Meal Break Exception - Displays the meal break exception value for each listed record. 

- Meal Schedule - Displays the meal schedule value for each listed record. 

- Meal Actual - Displays the meal actual value for each listed record. 

- Rest Break Exception - Displays the rest break exception value for each listed record. 

- Rest Schedule - Displays the rest schedule value for each listed record. 

- Rest Actual - Displays the rest actual value for each listed record. 

# **_Filters_** 

- Date - Displays or captures the applicable calendar date. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **4.3.9 Employee Actions** 

- Change Password - Updates password after validation. 

- Force Password Change - Performs the stated force action for password change. 

- Generate/View ID Card - Represents the generate view id card value or option required by this section. 

- Snap Picture / Upload Profile Picture - Represents the snap picture upload profile picture value or option required by this section. 

- Terminate - Represents the terminate value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- View Tracks / Current Location - Opens tracks current location for complete details. 

- Edit Employee - Opens employee in editable mode and saves validated changes. 

# **_Change Password Form_** 

- Enter Password - Captures the password value and applies the stated password validation rules. 

- Confirm Password - Captures the password value and applies the stated password validation rules. 

# **_Force Password Change_** 

- Send password change link to the user - Sends password change link to the user to the selected recipient or audience. 

# **_Terminate Form_** 

- Last Day of Work - Captures or configures last day of work for the record. 

- Reason - Captures or configures reason for the record. 

- Comments - Captures or configures comments for the record. 

# **_Automatic Termination Actions_** 

- Mark future shifts as uncovered - Represents the mark future shifts as uncovered value or option required by this section. 

- Revoke Web Portal access - Removes web portal access while preserving applicable history. 

- Revoke Guard Mobile App access - Removes guard mobile app access while preserving applicable history. 

- Preserve historical records - Represents the preserve historical records value or option required by this section. 

- Notify Payroll - Sends the configured notification to payroll. 

- Notify Supervisors - Sends the configured notification to supervisors. 

# **_Edit Employee_** 

- General Information - Represents the general information value or option required by this section. 

- Address - Stores/displays the primary street address. 

- Roles and Permission - Represents the roles and permission value or option required by this section. 

- Other Fields - Represents the other fields value or option required by this section. 

- Employee ID remains non-editable - Represents the employee id remains non-editable value or option required by this section. 

# **4.3.10 Skills and Attributes** 

# **_Listing Columns_** 

- Skill - Displays the skill value for each listed record. 

- Category - Displays or selects the configured category assigned to the record. 

- Information - Displays the information value for each listed record. 

# **_Filters_** 

- Category - Displays or selects the configured category assigned to the record. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

- Admin manually verifies submitted credentials and updates status. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **_Credential Statuses_** 

- Pending Review - Represents the pending review value or option required by this section. 

- Verified - Represents the verified value or option required by this section. 

- Rejected - Represents the rejected value or option required by this section. 

- Expiring Soon - Represents the expiring soon value or option required by this section. 

- Expired - Represents the expired value or option required by this section. 

# **4.3.11 Security and Patrol - Reports** 

# **_Report Listing Columns_** 

- ID - Displays the unique identifier of the listed record. 

- Type - Displays or selects the applicable configured type. 

- Flags - Displays any report or incident flags associated with the record. 

- Date - Displays or captures the applicable calendar date. 

- Reported By - Displays the reported by value for each listed record. 

- Account - Displays the related account/site context used by the source module. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Printable PDF - Displays the printable pdf value for each listed record. 

- Email Report - Displays the email report value for each listed record. 

- View - Opens the complete detail view for the selected record. 

- Remove - Removes or ends the selected relationship/record according to the module's stated history rules. 

# **_Report Filters_** 

- Active - Shows or marks records currently available for use. 

- All Templates - Filters the current list to records matching all templates. 

- Archived - Shows records that have been archived and are no longer active. 

- Incident Flags Only - Filters the current list to records matching incident flags only. 

- All Status - Filters the current list to records matching all status. 

- New Report - Filters the current list to records matching new report. 

- Approved - Filters the current list to records matching approved. 

- Verification - Filters the current list to records matching verification. 

- Job Pending - Filters the current list to records matching job pending. 

- Archived - Shows records that have been archived and are no longer active. 

- Date From-To - Filters records whose applicable date falls within the selected start and end dates. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **4.3.12 Summary Reports** 

# **_Listing Columns_** 

- Employee - Identifies the employee related to the row, assignment or transaction. 

- Location - Displays the location value for each listed record. 

- Reports - Displays the reports value for each listed record. 

- Videos - Displays the videos value for each listed record. 

- Checkpoints - Displays the checkpoints value for each listed record. 

- Start - Displays the start value for each listed record. 

- End - Displays the end value for each listed record. 

- Tracks - Displays the tracks value for each listed record. 

- PDF - Displays the pdf value for each listed record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- View - Opens the complete detail view for the selected record. 

- Options - Displays the options value for each listed record. 

# **_Options_** 

- Approve All Reports - Marks eligible all reports as approved according to its configured approval requirement. 

- Send Shift Report by Email - Sends shift report by email to the selected recipient or audience. 

- Delete This Shift and Time Logs - Deletes this shift and time logs only after the required confirmation. 

# **_Filters_** 

- Date - Displays or captures the applicable calendar date. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **4.3.13 Tours** 

# **_Listing Columns_** 

- Tour Name - Displays the tour name value for each listed record. 

- Account - Displays the related account/site context used by the source module. 

- Employee - Identifies the employee related to the row, assignment or transaction. 

- Result - Displays the recorded outcome of the tour, task, report or operation. 

- Start Time - Captures/displays the scheduled or actual start time, based on page context. 

- End Time - Captures/displays the scheduled or actual end time, based on page context. 

- Duration (Minutes) - Displays the duration (minutes) value for each listed record. 

- PDF - Displays the pdf value for each listed record. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- View Tour Session - Displays the view tour session value for each listed record. 

- Delete Tour Session - Displays the delete tour session value for each listed record. 

# **_Filters and Export_** 

- Date From-To - Filters records whose applicable date falls within the selected start and end dates. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

- Export CSV - Downloads the current filtered result set as a CSV file. 

- Export PDF - Downloads or generates a PDF representation of the current filtered result set. 

- Export Excel - Downloads the current filtered result set as an Excel-compatible file. 

- Pivot Chart View - Not required in the current phase. 

- Pivot Chart Edit - Not required in the current phase. 

LATER PHASE: Pivot Chart View/Edit is not required in the current phase. 

# **4.3.14 Schedules** 

# **_Schedule Listing Columns_** 

- Note - Displays the note value for each listed record. 

- Name - Displays the record or person's configured name. 

- Day - Displays the day value for each listed record. 

- Start Date - Captures/displays the date from which the record, assignment or rule becomes effective. 

- Time - Displays the relevant event or schedule time. 

- Clocked Shifts - Displays the clocked shifts value for each listed record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Scheduled Break - Displays the scheduled break value for each listed record. 

- Actual Break - Displays the actual break value for each listed record. 

# **_Filters and Views_** 

- Date From-To - Filters records whose applicable date falls within the selected start and end dates. 

- Calendar View - Filters the current list to records matching calendar view. 

- No Schedule to Distribute - Filters the current list to records matching no schedule to distribute. 

- No Changes to Notify - Filters the current list to records matching no changes to notify. 

- Print - Opens a print-ready representation of the current page or selected records. 

# **4.3.15 Time Off** 

# **_Create Time Off Form_** 

- First Day Off - Captures or configures first day off for the record. 

- Return Date - Captures the applicable date using a date picker. 

- Description - Stores or displays explanatory details for the record. 

# **_Listing Columns_** 

- ID - Displays the unique identifier of the listed record. 

- From - Displays the from value for each listed record. 

- To - Displays the to value for each listed record. 

- Description - Stores or displays explanatory details for the record. 

# **_Entitlement_** 

- Set employee time-off entitlement - Represents the set employee time-off entitlement value or option required by this section. 

# **4.4 Company Policies** 

- Upload Policy Document in PDF - Uploads and associates policy document in pdf with the current record. 

- Policy Document Listing - Represents the policy document listing value or option required by this section. 

- Download Policy Document - Downloads policy document in its available format. 

# **4.5 User Settings** 

- Customize fields for user profile - Captures or configures customize fields for user profile for the record. 

- Personal Details - Captures or configures personal details for the record. 

- Company-Related Information - Captures or configures company-related information for the record. 

- Compensation Details - Captures or configures compensation details for the record. 

- Payment Information - Not required for payroll processing in the current phase; no bank/payment processing is included. 

# **4.6 Admins** 

# **Admin Employee Listing Columns** 

- First Name - Stores/displays the person's given name. 

- Last Name - Stores/displays the person's family name. 

- Access Level - Displays the access level value for each listed record. 

- Managed Groups - Displays the managed groups value for each listed record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Permissions - Displays the permissions value for each listed record. 

- Admin Tab - Displays the admin tab value for each listed record. 

- Accepted - Displays the accepted value for each listed record. 

- Last Login - Displays the user's most recent successful portal login. 

- Added By - Displays the user who added the record. 

# **4.7 Departments** 

# **Create Department** 

- Department Name - Represents the department name value or option required by this section. 

- Display ID - Represents the display id value or option required by this section. 

- Details - Represents the details value or option required by this section. 

# **Department Listing Columns** 

- Department - Displays or selects the internal employee team. 

- Install Code - Displays the install code value for each listed record. 

- Employees - Displays the employees value for each listed record. 

- View - Opens the complete detail view for the selected record. 

# **Department Detail Sections** 

- Department Employees - Represents the department employees value or option required by this section. 

- Operation Reports - Represents the operation reports value or option required by this section. 

- Notifications - Represents the notifications value or option required by this section. 

- Positions / Job Types - Represents the positions job types value or option required by this section. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- Contacts - Represents the contacts value or option required by this section. 

- Security and Patrol - Represents the security and patrol value or option required by this section. 

- Schedules - Represents the schedules value or option required by this section. 

# **Assign Employee** 

- Filter by Skills - Filters the current list to records matching skills. 

- Select Employee - Represents the select employee value or option required by this section. 

- Employee Start Date - Represents the employee start date value or option required by this section. 

- Add Rule - Opens the applicable form to add rule. 

# **Employee List Columns** 

- Employee - Identifies the employee related to the row, assignment or transaction. 

- Start Date - Captures/displays the date from which the record, assignment or rule becomes effective. 

- Rate - Displays the rate value for each listed record. 

- Unassignment Date - Displays the unassignment date value for each listed record. 

- Is Primary Site - Displays the is primary site value for each listed record. 

- Make Primary - Displays the make primary value for each listed record. 

- **4.8 Skills and Attributes Administration** 

# **Create Skill / Attribute Fields** 

- Category - Displays or selects the configured category assigned to the record. 

- Description - Stores or displays explanatory details for the record. 

- Show Expiry Date Field - Captures the applicable date using a date picker. 

- Show Text Field - Captures or configures show text field for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Show Text Field (Other) - Captures or configures show text field (other) for the record. 

- Show Skill in Client Portal - Captures or configures show skill in client portal for the record. 

- Global - Captures or configures global for the record. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

# **Categories** 

- Diplomas - Represents the diplomas value or option required by this section. 

- Trainings & Special Skills - Represents the trainings & special skills value or option required by this section. 

- Languages - Represents the languages value or option required by this section. 

- Licenses & Permits - Represents the licenses & permits value or option required by this section. 

- Memberships - Represents the memberships value or option required by this section. 

- Prior Career Skills - Represents the prior career skills value or option required by this section. 

- Uniforms - Represents the uniforms value or option required by this section. 

# **Skill Listing Columns** 

- Description - Stores or displays explanatory details for the record. 

- Region - Displays or filters by the region associated with the record. 

- Category - Displays or selects the configured category assigned to the record. 

- Assigned Employee Count - Displays the calculated number of related records. 

- Position Count - Displays the calculated number of related records. 

- Expiring Soon - Displays the expiring soon value for each listed record. 

- Assign Employees - Displays the assign employees value for each listed record. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- Archive - Moves the record out of active use while preserving it for historical access. 

- History - Displays the history value for each listed record. 

# **Actions** 

- Assign Employee - Associates the selected employee with the current record. 

- Edit Skill - Opens skill in editable mode and saves validated changes. 

- Archive - Moves the record out of active use while preserving it for historical access. 

- View History - Opens history for complete details. 

# **5. Clients and Sites** 

# **5.1 Client and Site Rules** 

- One client may be assigned to multiple sites. 

- Multiple clients may be assigned to one site. 

- Shared-site Client Portal visibility remains pending. 

- Client is the entity receiving Client Portal access. 

- Account Type is a classification, not a separate hierarchy level. 

LATER PHASE: Contract management is not implemented in the current phase. 

CONFIRMED: Closing a site deactivates current/future site operations and access while preserving historical data up to the closure date. Contract functionality remains Later Phase. 

# **5.2 Create Site / Client Account** 

# **5.2.1 Account Type** 

- Regular Client - Represents the regular client value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Multi-Site Client - Represents the multi-site client value or option required by this section. 

- Site Account - Represents the site account value or option required by this section. 

- Custom Account Type - Represents the custom account type value or option required by this section. 

# **5.2.2 Company Information** 

- Company Name - Captures or configures company name for the record. 

- Unique ID - Captures or configures unique id for the record. 

- Time Zone - Captures the applicable time using a time selector. 

- Logo Picture - Captures or configures logo picture for the record. 

- Preferred Language - Captures or configures preferred language for the record. 

# **5.2.3 Main Contact** 

- First Name - Stores/displays the person's given name. 

- Last Name - Stores/displays the person's family name. 

- Job Title - Represents the job title value or option required by this section. 

- Phone Main - Represents the phone main value or option required by this section. 

- Phone Other - Represents the phone other value or option required by this section. 

- SMS Notification Consent - Represents the sms notification consent value or option required by this section. 

- Fax - Represents the fax value or option required by this section. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

# **5.2.4 Address** 

- Address - Stores/displays the primary street address. 

- Address Line 2 - Stores optional secondary address information such as suite or unit. 

- City - Stores/displays the city component of the address. 

- State - Stores/displays the state or province component of the address. 

- ZIP Code - Represents the zip code value or option required by this section. 

- Country - Stores/displays the country and controls dependent state selections where applicable. 

# **5.2.5 Employee Relations** 

- Account Representative - Represents the account representative value or option required by this section. 

- Sales Representative - Represents the sales representative value or option required by this section. 

# **5.2.6 Other Custom Fields** 

- Searchable Tags - Captures or configures searchable tags for the record. 

- Business Registration Number - Captures or configures business registration number for the record. 

- Website - Captures or configures website for the record. 

# **5.3 Site Listing** 

The source document does not define a complete site-list column set. The listing must at minimum provide access to created Site/Account records and their View action, without adding unapproved business fields. 

# **5.4 Site Profile** 

# **5.4.1 Overview** 

- Site Name - Displays the configured name of the site. 

- Photo - Represents the photo value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Manager Name - Represents the manager name value or option required by this section. 

- Manager Position - Represents the manager position value or option required by this section. 

- Phone - Stores/displays the contact telephone number. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Address - Stores/displays the primary street address. 

- Bill-To Address - Represents the bill-to address value or option required by this section. 

# **5.4.2 Positions / Job Types** 

# **_Create Position / Job Type - Post Base Settings_** 

- Post Name - Captures or configures post name for the record. 

- Post ID - Captures or configures post id for the record. 

- Short Description of Tasks - Captures or configures short description of tasks for the record. 

- Schedule Memo - Captures or configures schedule memo for the record. 

- Status: Active / Archived - Filters the current list to records matching active archived. 

# **_Compliance_** 

- Hard Requirements - Represents the hard requirements value or option required by this section. 

- Conditional Requirements - Represents the conditional requirements value or option required by this section. 

- Soft Requirements - Represents the soft requirements value or option required by this section. 

# **_Service Dates_** 

- Service Duration: Ongoing Service - Uses ongoing service as the selected service duration option. 

- Service Duration: Temporary Service - Uses temporary service as the selected service duration option. 

- Begin Date - Represents the begin date value or option required by this section. 

# **_Break Rule Settings_** 

- Break Rule dropdown - Provides a selectable list containing the stated configured values. 

- No Break Rule option - Captures or configures no break rule option for the record. 

# **_Pay Settings_** 

- Pay on Employee Pay Rate - Captures or configures pay on employee pay rate for the record. 

- Pay on This Post Rate - Captures or configures pay on this post rate for the record. 

# **_Premium Matrix Columns_** 

- Days - Displays the days value for each listed record. 

- Premium - Displays the premium value for each listed record. 

- Percentage - Displays the percentage value for each listed record. 

- Start - Displays the start value for each listed record. 

- End - Displays the end value for each listed record. 

- Pay Code - Displays the pay code value for each listed record. 

- Add Condition - Displays the add condition value for each listed record. 

# **_Break Payroll_** 

- Do Not Pay Breaks - Represents the do not pay breaks value or option required by this section. 

- Pay All Breaks - Represents the pay all breaks value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **_Holiday Pay_** 

- Do Not Pay Holiday Premium - Represents the do not pay holiday premium value or option required by this section. 

- Rate Multiplier - Represents the rate multiplier value or option required by this section. 

# **_Position / Job Type Listing Columns_** 

- UID - Displays the unique system identifier for the record. 

- Position Title - Displays the position title value for each listed record. 

- TPT Hours - Displays the tpt hours value for each listed record. 

- Bill Rate - Displays the bill rate value for each listed record. 

- Holiday Rate - Displays the holiday rate value for each listed record. 

- Temporary - Displays the temporary value for each listed record. 

- Actions - Provides the row-level or page-level operations explicitly listed for this module. 

# **_Actions_** 

- Duplicate - Represents the duplicate value or option required by this section. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- History - Represents the history value or option required by this section. 

- Remove - Removes or ends the selected relationship/record according to the module's stated history rules. 

- Position, Job Type and Service Type represent the same business concept. The UI should use Job Type consistently where possible. 

- Missing requirements generate configured notification to Admin/Supervisor or another configured recipient; Admin takes action manually. 

# **5.4.3 Assigned Employees** 

# **_Assign Employee Form_** 

- Filter by Skills - Filters the current list to records matching skills. 

- Select Employee - Captures or configures select employee for the record. 

- Employee Start Date - Captures the applicable date using a date picker. 

- Add Rule: Effective Date - Captures the applicable date using a date picker. 

- Add Rule: Hourly Rate - Captures or configures add rule: hourly rate for the record. 

# **_Listing Columns_** 

- Employee - Identifies the employee related to the row, assignment or transaction. 

- Start Date - Captures/displays the date from which the record, assignment or rule becomes effective. 

- Rate - Displays the rate value for each listed record. 

- Unassignment Date - Displays the unassignment date value for each listed record. 

- Is Primary Site - Displays the is primary site value for each listed record. 

- Make Primary - Displays the make primary value for each listed record. 

- History - Displays the history value for each listed record. 

- Remove - Removes or ends the selected relationship/record according to the module's stated history rules. 

- View - Opens the complete detail view for the selected record. 

# **5.4.4 Employee Profile from Site** 

- Overview - Represents the overview value or option required by this section. 

- Basic Details: Name, Employee ID, Phone, Email, Address - Uses name, employee id, phone, email, address as the selected basic details option. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- HR Profile Information: Type, Pay Type, Hourly Rate Type, Region Default Rate, Overtime, Pay Run 

- Availabilities - Represents the availabilities value or option required by this section. 

- Time Off - Represents the time off value or option required by this section. 

- Skills and Certifications - Represents the skills and certifications value or option required by this section. 

- Sites / Departments - Represents the sites departments value or option required by this section. 

- Schedules - Represents the schedules value or option required by this section. 

- Calendar View - Represents the calendar view value or option required by this section. 

# **5.4.5 Client Portal Access** 

# **_Create Client Access Fields_** 

- First Name - Stores/displays the person's given name. 

- Last Name - Stores/displays the person's family name. 

- Picture - Uploads or displays the applicable user/client image. 

- Phone - Stores/displays the contact telephone number. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Password - Captures the password value and applies the stated password validation rules. 

- Force Password Change - Captures the password value and applies the stated password validation rules. 

- Client Role - Captures or configures client role for the record. 

- Status: Grant Access / Revoke Access - Filters the current list to records matching grant access revoke access. 

# **_Client Access Listing Columns_** 

- Full Name - Displays the full name value for each listed record. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Phone - Stores/displays the contact telephone number. 

- Last Login - Displays the user's most recent successful portal login. 

- Access - Displays the access value for each listed record. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- PARTIALLY RESOLVED: Assigned clients receive minimum access to site reports, schedules and employee information and may see other assigned clients. Remaining Client Portal actions/service requests/invoice behavior are Later Phase. 

# **5.4.6 Banned Employees** 

- Add employee to Banned Employees list - Opens the applicable form to add employee to banned employees list. 

- Prevent assignment to the banned site - Represents the prevent assignment to the banned site value or option required by this section. 

# **5.4.7 Other Site Contacts** 

# **_Create Contact Fields_** 

- Company Name - Captures or configures company name for the record. 

- First Name - Stores/displays the person's given name. 

- Last Name - Stores/displays the person's family name. 

- Job Title - Captures or configures job title for the record. 

- Gender - Captures or configures gender for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Government Badge ID - Captures or configures government badge id for the record. 

- Phone Main - Captures or configures phone main for the record. 

- Phone Other - Captures or configures phone other for the record. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Address - Stores/displays the primary street address. 

- Address Line 2 - Stores optional secondary address information such as suite or unit. 

- City - Stores/displays the city component of the address. 

- State - Stores/displays the state or province component of the address. 

- ZIP Code - Captures or configures zip code for the record. 

- Country - Stores/displays the country and controls dependent state selections where applicable. 

- Attention Of - Captures or configures attention of for the record. 

- Preferred Language - Captures or configures preferred language for the record. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Use This Address as Bill-To Address - Captures or configures use this address as bill-to address for the record. 

# **_Contact Listing Columns_** 

- Name - Displays the record or person's configured name. 

- Job Title - Displays the job title value for each listed record. 

- Phone - Stores/displays the contact telephone number. 

- Email - Stores/displays a valid email address used for login or communication where applicable. 

- Action: Edit - Provides the permitted row-level operation for the selected record. 

# **5.4.8 Other Site Actions** 

- Edit Site using the same creation fields - Opens site using the same creation fields in editable mode and saves validated changes. 

- Close Account - Starts the close workflow for account and requires confirmation. 

# **_Close Account Options_** 

- Terminate Site and All Contracts - Starts the termination workflow for site and all contracts and applies the confirmed consequences. 

- Terminate One or More Positions - Starts the termination workflow for one or more positions and applies the confirmed consequences. 

- Termination Date - Represents the termination date value or option required by this section. 

- Confirmation Screen - Represents the confirmation screen value or option required by this section. 

- CONFIRMED: Closing a site deactivates all current/future site operational items and access while preserving historical data up to closure. Contract-specific behavior remains Later Phase. 

# **5.4.9 Dispatch Settings** 

- Prepare Schedule - Captures or configures prepare schedule for the record. 

- Follow the confirmed Schedule module - Captures or configures follow the confirmed schedule module for the record. 

# **5.4.10 Operation Reports and Site Activity** 

- Operation Reports - Represents the operation reports value or option required by this section. 

- Logs and Activities - Represents the logs and activities value or option required by this section. 

- Reports - Represents the reports value or option required by this section. 

- Filter Reports - Filters the current list to records matching reports. 

- Patrol Tours - Represents the patrol tours value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- View Tours - Opens tours for complete details. 

- Delete Tours - Deletes tours only after the required confirmation. 

- Journal Entries - Represents the journal entries value or option required by this section. 

- Recordings - Represents the recordings value or option required by this section. 

- Summaries - Represents the summaries value or option required by this section. 

- Summary by Shift - Represents the summary by shift value or option required by this section. 

- Financial by Shift - Represents the financial by shift value or option required by this section. 

- Incident Analytics - Represents the incident analytics value or option required by this section. 

- Analytics Reports - Represents the analytics reports value or option required by this section. 

- Exceptions and Audits - Represents the exceptions and audits value or option required by this section. 

- Post Orders - Performs the stated post action for orders. 

- Work Exception - Represents the work exception value or option required by this section. 

- System Exception - Represents the system exception value or option required by this section. 

- CURRENT PHASE: Journal Entries records Admin termination actions with details/date. Recordings, Financial by Shift and detailed Exceptions/Audits remain Later Phase. 

# **5.4.11 Site Notifications** 

Follow Connecteam-style automation rules and support report, security and timekeeping notifications listed below. 

- Operations Reports - Represents the operations reports value or option required by this section. 

- Individual Report - Represents the individual report value or option required by this section. 

- Maintenance Report - Represents the maintenance report value or option required by this section. 

- Incident Report - Represents the incident report value or option required by this section. 

- Operation Report - Represents the operation report value or option required by this section. 

- Hourly Report Filling - Represents the hourly report filling value or option required by this section. 

- End-of-Shift Report for Overnight Patrols - Represents the end-of-shift report for overnight patrols value or option required by this section. 

- Roof Access Notification - Represents the roof access notification value or option required by this section. 

- Tornado Warning Emergency - Represents the tornado warning emergency value or option required by this section. 

- Late Tour / Checkpoint Alert - Represents the late tour checkpoint alert value or option required by this section. 

- Incomplete Tour Alert - Represents the incomplete tour alert value or option required by this section. 

- Finished Tour Alert - Represents the finished tour alert value or option required by this section. 

- Late Shift Alert - Represents the late shift alert value or option required by this section. 

- Early Clock-Out Alert - Represents the early clock-out alert value or option required by this section. 

- Clock-In / Clock-Out - Represents the clock-in clock-out value or option required by this section. 

- Clock-In Exception - Represents the clock-in exception value or option required by this section. 

# **5.4.12 Security and Patrol Settings** 

- Checkpoints - Captures or configures checkpoints for the record. 

- Tour Routes - Captures or configures tour routes for the record. 

- Site Locations and Sections - Captures or configures site locations and sections for the record. 

- Emergency Contacts - Captures or configures emergency contacts for the record. 

- Geo-Fencing - Captures or configures geo-fencing for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Mobile App Restrictions - Captures or configures mobile app restrictions for the record. 

- Live Dashboard - Captures or configures live dashboard for the record. 

- History Tracks - Captures or configures history tracks for the record. 

- Message Board - Captures or configures message board for the record. 

# **5.4.13 Site Locations and Sections** 

- Create Site Item / Location - Opens the creation form for site item location and saves a new validated record. 

- Import Batch - Imports batch using the supported template/file format. 

# **5.4.14 Emergency Contacts** 

- Create Contacts - Opens the creation form for contacts and saves a new validated record. 

- Assign contacts in priority/order sequence - Associates the selected contacts in priority order sequence with the current record. 

- Create contact records used by the dropdown - Opens the creation form for contact records used by the dropdown and saves a new validated record. 

# **5.4.15 Geo-Fencing** 

- Choose boundary points on map - Represents the choose boundary points on map value or option required by this section. 

- Define geo-fence border - Represents the define geo-fence border value or option required by this section. 

# **5.4.16 Mobile App Restrictions** 

- Geo-Fence Clock-In Restriction: Yes / No - Uses yes no as the selected geo-fence clock-in restriction option. 

- Geo-Fence Clock-Out Restriction: Yes / No - Uses yes no as the selected geo-fence clock-out restriction option. 

- Mobile App Login Restriction: Yes / No - Uses yes no as the selected mobile app login restriction option. 

# **5.4.17 Live Dashboard** 

# **_Event Filters_** 

- Reports - Filters the current list to records matching reports. 

- Time Clock - Filters the current list to records matching time clock. 

- Patrol Tours - Filters the current list to records matching patrol tours. 

- Panic Button Triggers - Filters the current list to records matching panic button triggers. 

- Changed Site - Filters the current list to records matching changed site. 

- Checkpoint Scan - Filters the current list to records matching checkpoint scan. 

- Runsheet Patrol Events - Filters the current list to records matching runsheet patrol events. 

- Remote Actions - Filters the current list to records matching remote actions. 

# **_Actions_** 

- Show Map - Represents the show map value or option required by this section. 

- Broadcast Message - Represents the broadcast message value or option required by this section. 

- New Task - Represents the new task value or option required by this section. 

- New Report - Represents the new report value or option required by this section. 

- History Tracks - Represents the history tracks value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **5.4.18 Message Board** 

- Post Message - Performs the stated post action for message. 

- Settings - Represents the settings value or option required by this section. 

# **5.4.19 Assigned Employees** 

- Assign Employee - Associates the selected employee with the current record. 

- Employee Listing - Represents the employee listing value or option required by this section. 

- Filters - Represents the filters value or option required by this section. 

# **5.4.20 Positions / Job Types** 

- Create site-specific Position / Job Type - Opens the creation form for site-specific position job type and saves a new validated record. 

- Site-specific Job Type cannot be reused for another site unless duplicated manually 

# **5.4.21 Email Settings** 

- PDF Attached as a Link: Yes / No - Captures or configures pdf attached as a link: yes no for the record. 

# **6. Checkpoints and Tour Routes** 

# **6.1 Checkpoints** 

# **6.1.1 Create Checkpoint Fields** 

- Checkpoint Name - Captures or configures checkpoint name for the record. 

- Special Instruction - Captures or configures special instruction for the record. 

- Can Be Scanned By: All - Captures or configures can be scanned by: all for the record. 

- Can Be Scanned By: Selected Positions / Job Types - Captures or configures can be scanned by: selected positions job types for the record. 

- Monitoring: Do Not Monitor and Scan Randomly - Captures or configures monitoring: do not monitor and scan randomly for the record. 

- Monitoring: Checkpoint Is Part of Tour - Captures or configures monitoring: checkpoint is part of tour for the record. 

- Monitoring: Request Scan on Regular Interval - Captures or configures monitoring: request scan on regular interval for the record. 

- Scan Request Interval: Minutes / Hours / Days / Weeks - Captures or configures scan request interval: minutes hours days weeks for the record. 

- Extra Scan Option: Log Only - Captures or configures extra scan option: log only for the record. 

- Extra Scan Option: Display a Message - Captures or configures extra scan option: display a message for the record. 

- Extra Scan Option: Open a Report Form - Captures or configures extra scan option: open a report form for the record. 

- Exception Verification: Validate Range - Captures the applicable date using a date picker. 

- Exception Verification: Yes/No Question - No Is Exception 

- Exception Verification: Yes/No Question - Yes Is Exception 

- Exception Multi Questions - Captures or configures exception multi questions for the record. 

- Checkpoint Type: NFC - Captures or configures checkpoint type: nfc for the record. 

- Checkpoint Type: Barcode - Captures or configures checkpoint type: barcode for the record. 

- Checkpoint ID - Captures or configures checkpoint id for the record. 

- GPS Scan Required Accuracy - Captures or configures gps scan required accuracy for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Allow Manual Scanning: Yes / No / Yes with Reason - Captures or configures allow manual scanning: yes no yes with reason for the record. 

# **6.1.2 Batch Import** 

- Import checkpoints through Excel - Imports checkpoints through excel using the supported template/file format. 

# **6.1.3 Checkpoint Logs** 

# **_Columns_** 

- Time - Displays the relevant event or schedule time. 

- Employee - Identifies the employee related to the row, assignment or transaction. 

- Account - Displays the related account/site context used by the source module. 

- Checkpoint - Displays the checkpoint value for each listed record. 

- Tour - Displays the tour value for each listed record. 

# **6.1.4 Checkpoint Listing** 

# **_Columns_** 

- Checkpoint Name - Displays the checkpoint name value for each listed record. 

- Action - Provides the permitted row-level operation for the selected record. 

- Assigned - Displays the assigned value for each listed record. 

- Last Scan - Displays the last scan value for each listed record. 

- Location Map Icon - Displays the location map icon value for each listed record. 

- Edit - Opens the existing record in editable form and saves validated changes. 

# **_Filters and Actions_** 

- Filters - Filters the current list to records matching s. 

- Edit using the same Create Checkpoint form - Filters the current list to records matching edit using the same create checkpoint form. 

# **6.1.5 Checkpoint Alerts** 

- Late Checkpoint Alert - configured under Automations 

- Tour Finished Alert - configured under Automations 

- Tour Incomplete Alert - configured under Automations 

# **6.2 Tour Routes** 

# **6.2.1 Create Tour Route Fields** 

- Description - Stores or displays explanatory details for the record. 

- Assigned To - Captures or configures assigned to for the record. 

- Special Instructions - Captures or configures special instructions for the record. 

- Estimated Tour Duration - Captures or configures estimated tour duration for the record. 

- Grace Period for Late Notification - Captures or configures grace period for late notification for the record. 

- Default grace period of 15 minutes when set to 0 - Captures or configures default grace period of 15 minutes when set to 0 for the record. 

- Recurrence Type: Weekly - Captures or configures recurrence type: weekly for the record. 

- Recurrence Type: Monthly - Captures or configures recurrence type: monthly for the record. 

- Tour Schedule: Day and Time - Captures the applicable time using a time selector. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **6.2.2 Confirmed Tour Rules** 

- Tour is created separately for a site and auto/manual assignment is resolved from employees scheduled for the matching site/date/time. 

- Guard starts the tour manually. 

- Guard must be clocked in. 

- Guard must be within the site geo-fence. 

- Checkpoint order and requirements are configurable when creating the tour. 

- Tour timing, grace and notification behavior are configurable when creating the tour. 

- Manual scans may require reason, comment, photo and GPS based on configuration; no approval is required. 

- Tour interruptions trigger notifications based on configured automation rules. 

# **6.2.3 Tour Listing and Actions** 

- Tour Listing - Displays the tour listing value for each listed record. 

- Filters - Displays the filters value for each listed record. 

- Edit Settings - Displays the edit settings value for each listed record. 

- Manage Checkpoints - Displays the manage checkpoints value for each listed record. 

# **6.2.4 Checkpoint Issue Reporting** 

- Damaged NFC Tag - Represents the damaged nfc tag value or option required by this section. 

- Missing Barcode - Represents the missing barcode value or option required by this section. 

- Inaccessible Checkpoint - Represents the inaccessible checkpoint value or option required by this section. 

- Unsafe Location - Represents the unsafe location value or option required by this section. 

- GPS Inaccuracy - Represents the gps inaccuracy value or option required by this section. 

- May trigger notification, maintenance task or system exception through configuration - Represents the may trigger notification, maintenance task or system exception through configuration value or option required by this section. 

# **7. Scheduling** 

# **7.1 Schedule Setup** 

# **Fields and Options** 

- Schedule Name - Captures or configures schedule name for the record. 

- Default Fields - Captures or configures default fields for the record. 

- Custom Field Definition - Captures or configures custom field definition for the record. 

- Jobs / Job Types - Captures or configures jobs job types for the record. 

- View Type: User - Captures or configures view type: user for the record. 

- View Type: Job - Captures or configures view type: job for the record. 

- Layout Type - Captures or configures layout type for the record. 

- Fields to Show on Each Shift - Captures or configures fields to show on each shift for the record. 

- Users - Selects one or more eligible users where the source feature permits multiple selection. 

# **Shift Card Field Selection** 

- Hours - Captures or configures hours for the record. 

- Job - Captures or configures job for the record. 

- Shift Title - Captures or configures shift title for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Other custom fields defined during Schedule creation - Captures or configures other custom fields defined during schedule creation for the record. 

# **7.2 Schedule View** 

- Day View - Represents the day view value or option required by this section. 

- Week View - Represents the week view value or option required by this section. 

- Month View - Represents the month view value or option required by this section. 

- View by User - Opens by user for complete details. 

- View by Job - Opens by job for complete details. 

- List View - Represents the list view value or option required by this section. 

- Date Selection - Represents the date selection value or option required by this section. 

- Blank clickable cells to create shifts - Represents the blank clickable cells to create shifts value or option required by this section. 

# **Display Options** 

- Sort Cell Content - Represents the sort cell content value or option required by this section. 

- Minimized View - Represents the minimized view value or option required by this section. 

- Daily Info - Represents the daily info value or option required by this section. 

- Weekly Summary - Represents the weekly summary value or option required by this section. 

- Availability Status - Represents the availability status value or option required by this section. 

- Issues - Represents the issues value or option required by this section. 

- Cross Schedule Events - Represents the cross schedule events value or option required by this section. 

- Labor Costs - Represents the labor costs value or option required by this section. 

- Daily Health - Represents the daily health value or option required by this section. 

- Hide Empty Row - Represents the hide empty row value or option required by this section. 

- Working Hours - Represents the working hours value or option required by this section. 

- Non-Working Days - Represents the non-working days value or option required by this section. 

- Organize by Groups - Represents the organize by groups value or option required by this section. 

- Week Filter - Represents the week filter value or option required by this section. 

- Date Filter - Filters the listing using the selected date or date range. 

- Add - Represents the add value or option required by this section. 

- Actions - Provides the row-level or page-level operations explicitly listed for this module. 

- Coverage per Hour - Represents the coverage per hour value or option required by this section. 

- Print Position Schedule - Generates a print-ready view of position schedule. 

- Settings - Represents the settings value or option required by this section. 

- LATER PHASE: Cross Schedule Events and Daily Health are not implemented in the current phase. 

# **7.3 Shift Creation** 

- Date - Displays or captures the applicable calendar date. 

- From-To Date Range - Represents the from-to date range value or option required by this section. 

- All Days option - Represents the all days option value or option required by this section. 

- Start Time - Captures/displays the scheduled or actual start time, based on page context. 

- End Time - Captures/displays the scheduled or actual end time, based on page context. 

- Title - Displays or stores the record title or employee job title, based on page context. 

- Job / Job Type - Represents the job job type value or option required by this section. 

- Users - Selects one or more eligible users where the source feature permits multiple selection. 

- Address - Stores/displays the primary street address. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Note - Represents the note value or option required by this section. 

- Shift Tags - Represents the shift tags value or option required by this section. 

- Shift Tasks - Represents the shift tasks value or option required by this section. 

- Custom fields selected during Schedule creation - Represents the custom fields selected during schedule creation value or option required by this section. 

# **7.4 Schedule Behavior** 

- Assigned users automatically receive assigned shifts. 

- Schedule can be updated after publishing. 

- Notification channel is configurable. 

- Recurring schedules are supported. 

- Eligible employee selection blocks conflicting/ineligible assignments. If a concurrency conflict still occurs, block save and show an alert. 

- Missing Job Type requirements generate notifications; Admin decides manually. 

- **PENDING DISCUSSION:** Shift acceptance, rejection, open shifts, claiming, swaps and replacement workflow remain pending. 

CONFIRMED: A cross-midnight shift belongs to the date on which it starts; the full shift record remains associated with that start date and payroll applies the employee’s assigned Pay Rules. 

# **8. Time Clock, Attendance and Work Exceptions** 

# **8.1 Clock-In / Clock-Out** 

- Guard clocks in through the Mobile App. 

- Clock-in is blocked outside the site geo-fence. 

- Early clock-in, late clock-in and early clock-out thresholds are configurable in Settings. 

- Manual timesheet changes are allowed and audited. 

- Break rules are configurable. 

**PENDING DISCUSSION:** Offline clock-in, clock-out and synchronization remain pending. 

# **8.2 Time Clock Pages** 

- Security Operations > Time Clock > Site Listing - Represents the security operations > time clock > site listing value or option required by this section. 

- Timesheet with Today filter - Represents the timesheet with today filter value or option required by this section. 

- Employee profile Work Exceptions - Represents the employee profile work exceptions value or option required by this section. 

- Site Work Exceptions - Represents the site work exceptions value or option required by this section. 

- Dashboard Attendance - Represents the dashboard attendance value or option required by this section. 

# **8.3 Timesheet / Exception Information** 

Use the source-listed time and exception fields. Do not assume additional approval states or payroll actions that are not defined. 

- Scheduled and actual shift times as available - Captures the applicable time using a time selector. 

- Meal Break Exception - Captures or configures meal break exception for the record. 

- Meal Schedule - Captures or configures meal schedule for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Meal Actual - Captures or configures meal actual for the record. 

- Rest Break Exception - Captures or configures rest break exception for the record. 

- Rest Schedule - Captures or configures rest schedule for the record. 

- Rest Actual - Captures or configures rest actual for the record. 

- Manual adjustment history - Captures or configures manual adjustment history for the record. 

# **9. Reports and Incidents** 

# **9.1 Reports versus Forms** 

- Forms are manually created using a customizable form builder and assigned to employees to complete. 

- Reports are generated through Custom Report Forms, Categories, Incident Categories and Report Footers configured by Admin. 

- Forms and Reports remain separate functional areas. 

# **9.2 Report Listing** 

# **Columns** 

- ID - Displays the unique identifier of the listed record. 

- Type - Displays or selects the applicable configured type. 

- Flags - Displays any report or incident flags associated with the record. 

- Date - Displays or captures the applicable calendar date. 

- Reported By - Displays the reported by value for each listed record. 

- Account - Displays the related account/site context used by the source module. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Printable PDF - Displays the printable pdf value for each listed record. 

- Email Report - Displays the email report value for each listed record. 

- View - Opens the complete detail view for the selected record. 

- Remove - Removes or ends the selected relationship/record according to the module's stated history rules. 

# **Filters** 

- Active - Shows or marks records currently available for use. 

- All Templates - Filters the current list to records matching all templates. 

- Archived - Shows records that have been archived and are no longer active. 

- Incident Flags Only - Filters the current list to records matching incident flags only. 

- All Status - Filters the current list to records matching all status. 

- New Report - Filters the current list to records matching new report. 

- Approved - Filters the current list to records matching approved. 

- Verification - Filters the current list to records matching verification. 

- Job Pending - Filters the current list to records matching job pending. 

- Archived - Shows records that have been archived and are no longer active. 

- Date From-To - Filters records whose applicable date falls within the selected start and end dates. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **9.3 Report Approval and Publication** 

- Approval requirement is configured while creating the custom report. 

- No multi-level approval workflow. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Authorized Admin/Site Supervisor may edit a submitted report, preserve the previous version, and resend it for approval. 

- Reports are site-specific. 

- Digital acknowledgment is supported. 

- Report Mentions are excluded. 

**PENDING DISCUSSION:** Client Portal publication and detailed visibility remain pending. 

# **9.4 Custom Report Configuration** 

# **Report Form Management** 

- Custom Report Form Listing - Captures or configures custom report form listing for the record. 

- Create Custom Report - Captures or configures create custom report for the record. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- Field Setup - Captures or configures field setup for the record. 

- Generated Report Count - Captures or configures generated report count for the record. 

- Filter by Categories - Filters the current list to records matching categories. 

- Filter Active / Archived - Filters the current list to records matching active archived. 

- Search - Searches the current listing using supported visible identifiers and text fields. 

# **Custom Report Categories** 

- New Category - Represents the new category value or option required by this section. 

- Add Category - Opens the applicable form to add category. 

- Category Listing - Represents the category listing value or option required by this section. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- Archive - Moves the record out of active use while preserving it for historical access. 

- Filter Active / Archived - Filters the current list to records matching active archived. 

# **Custom Incident Categories** 

- Create Incident Category - Opens the creation form for incident category and saves a new validated record. 

- Incident Category Listing - Represents the incident category listing value or option required by this section. 

- Code - Represents the code value or option required by this section. 

- Region - Displays or filters by the region associated with the record. 

- Description - Stores or displays explanatory details for the record. 

- Level - Represents the level value or option required by this section. 

- Parent Category - Represents the parent category value or option required by this section. 

- Default Group - Represents the default group value or option required by this section. 

- Edit - Opens the existing record in editable form and saves validated changes. 

- Sub Form - Represents the sub form value or option required by this section. 

- Filter All Groups - Filters the current list to records matching all groups. 

- Filter Default Groups - Filters the current list to records matching default groups. 

- Global Search - Searches across the applicable fields of the current page and returns matching records. 

# **Report Footers** 

- Add Footer - Opens the applicable form to add footer. 

- Footer Listing - Represents the footer listing value or option required by this section. 

- Text Format - Represents the text format value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Image Format - Represents the image format value or option required by this section. 

- Edit Footer - Opens footer in editable mode and saves validated changes. 

# **Report Form Fields** 

The form builder must support customizable fields. Field types should follow the form/report builder available in the referenced source platforms. Exact field-type inventory may be finalized in UI design without introducing new workflow behavior. 

# **9.5 Incident Categories** 

- Incident type/category is manually created by Admin. 

- No automatic incident workflow beyond configured report and automation behavior is assumed. 

# **9.6 Media Limits** 

- Use standard limits for photos, videos, audio and files. 

- Exact file sizes, counts and durations are configurable and should be finalized during technical design. 

# **10. Forms** 

# **10.1 Form Management** 

- Add New Form - Captures or configures add new form for the record. 

- Form Listing - Captures or configures form listing for the record. 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

- Export - Downloads the current applicable dataset using the selected export format. 

- Move - Captures or configures move for the record. 

- Archive - Moves the record out of active use while preserving it for historical access. 

- Delete - Deletes the selected record only where the source requirement allows deletion and after confirmation. 

# **10.2 Form Builder** 

- Create customized fields - Captures or configures create customized fields for the record. 

- Assign forms to employees - Captures or configures assign forms to employees for the record. 

- Employees complete assigned forms - Captures or configures employees complete assigned forms for the record. 

# **10.3 Form Submissions** 

List submitted forms and provide view/export access according to the selected form structure. Do not add unconfirmed approval or reporting workflows. 

# **11. Tasks, Dispatch and Job List** 

# **11.1 Task Types** 

- Dispatch Task - Represents the dispatch task value or option required by this section. 

- Quick Task - Represents the quick task value or option required by this section. 

- Recurring Task - Represents the recurring task value or option required by this section. 

- Help Desk Ticket - Represents the help desk ticket value or option required by this section. 

- Job Type - separate from Task and used for the employee role/service performed during a shift 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **11.2 Assignment** 

- Assign to one selected target, such as an employee, Job Type, site, shift, department or supported group. 

# **11.3 Task Creation** 

- Add Task - Opens the applicable form to add task. 

- Select Task Type - Represents the select task type value or option required by this section. 

- Show a form based on selected Task Type - Represents the show a form based on selected task type value or option required by this section. 

- List the created task - Represents the list the created task value or option required by this section. 

Fields vary by Task Type. Do not treat priority, evidence, attachments, due date or checklists as universally mandatory unless defined in the selected task form. 

# **11.4 Task Filters and Counts** 

- Created by Me - Filters the current list to records matching created by me. 

- My Tasks - Filters the current list to records matching my tasks. 

- All Tasks - Filters the current list to records matching all tasks. 

- Archived - Shows records that have been archived and are no longer active. 

- Overdue Count - Filters the current list to records matching overdue count. 

- Done Count - Filters the current list to records matching done count. 

- Open Count - Filters the current list to records matching open count. 

- Total Task Count - Filters the current list to records matching total task count. 

- New Tasks - Filters the current list to records matching new tasks. 

- In Progress - Filters the current list to records matching in progress. 

- New and In Progress - Filters the current list to records matching new and in progress. 

- Completed - Filters the current list to records matching completed. 

- Assignment: All - Filters the current list to records matching all. 

- Not Assigned - Filters the current list to records matching not assigned. 

- Assigned to Any - Filters the current list to records matching assigned to any. 

- Assigned to Employee - Filters the current list to records matching assigned to employee. 

# **11.5 Escalation** 

- Overdue or incomplete tasks may trigger configured automation actions. 

# **11.6 Job List** 

- No separate Job List is required in the current phase. Job Type/Position setup and the Task List cover these concepts. 

- Import - Represents the import value or option required by this section. 

CURRENT PHASE: Do not implement a separate Job List; use Job Type/Position configuration and the Task List. 

# **12. Communications** 

# **12.1 Combined Communication Module** 

- Chat - employee communication 

- Message Board - messages created by guards 

- Broadcast - message sent to selected user types/users/groups/sites as configured 

- Updates - company or operational updates 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Notifications - system-generated communication 

- SMS - delivery channel 

# **12.2 Chat** 

- New Chat - Represents the new chat value or option required by this section. 

- New Group - Represents the new group value or option required by this section. 

- Broadcast Message - Represents the broadcast message value or option required by this section. 

- CONFIRMED: Admin may view private chats. Chat Settings controls edit/delete/export/attachments. Guards may chat only with guards on the same site. Clients cannot directly chat with guards. 

# **12.3 Updates** 

- Listing - Represents the listing value or option required by this section. 

- Create Update - Opens the creation form for update and saves a new validated record. 

- Export - Downloads the current applicable dataset using the selected export format. 

# **12.4 Directory** 

# **Actions** 

- Listing - Represents the listing value or option required by this section. 

- Tag Users - Represents the tag users value or option required by this section. 

- Notify - Represents the notify value or option required by this section. 

- Send Chat Message - Sends chat message to the selected recipient or audience. 

- Create Group Chat with Selected - Opens the creation form for group chat with selected and saves a new validated record. 

- Create Task - Opens the creation form for task and saves a new validated record. 

- Export - Downloads the current applicable dataset using the selected export format. 

# **12.5 Forms within Communications** 

- Listing - Captures or configures listing for the record. 

- Add New Form - Captures or configures add new form for the record. 

- Archived - Shows records that have been archived and are no longer active. 

- Export - Downloads the current applicable dataset using the selected export format. 

- Move - Captures or configures move for the record. 

- Archive - Moves the record out of active use while preserving it for historical access. 

- Delete - Deletes the selected record only where the source requirement allows deletion and after confirmation. 

# **12.6 Help Desk** 

- Unassigned - Represents the unassigned value or option required by this section. 

- Assigned to Me - Represents the assigned to me value or option required by this section. 

- All - Removes the specific status restriction and shows all permitted records. 

# **13. Security Operations** 

# **13.1 Schedules** 

- Site Listing - Represents the site listing value or option required by this section. 

- View Schedule button redirects to Site > Schedule - Opens schedule button redirects to site > schedule for complete details. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **13.2 Time Clock** 

- Site Listing - Represents the site listing value or option required by this section. 

- Timesheet with Today filter - Represents the timesheet with today filter value or option required by this section. 

# **13.3 Forms** 

- Add New Form - Captures or configures add new form for the record. 

- Forms Listing - Captures or configures forms listing for the record. 

# **13.4 Quick Tasks** 

- Add Task - Opens the applicable form to add task. 

- Created by Me - Represents the created by me value or option required by this section. 

- My Tasks - Represents the my tasks value or option required by this section. 

- All Tasks - Represents the all tasks value or option required by this section. 

- Archived - Shows records that have been archived and are no longer active. 

- Search - Searches the current listing using supported visible identifiers and text fields. 

- Overdue Count - Represents the overdue count value or option required by this section. 

- Done Count - Represents the done count value or option required by this section. 

- Open Count - Performs the stated open action for count. 

- Total Count - Represents the total count value or option required by this section. 

# **13.5 Post Orders, SOPs and Manuals** 

- Add New - Opens the applicable form to add new. 

- Listing - Represents the listing value or option required by this section. 

- Filter Active - Filters the current list to records matching active. 

- Filter Archived - Filters the current list to records matching archived. 

- Export - Downloads the current applicable dataset using the selected export format. 

# **13.6 Company Vehicle Documentation** 

- Add New - Opens the applicable form to add new. 

- Vehicle Listing - Represents the vehicle listing value or option required by this section. 

- Export - Downloads the current applicable dataset using the selected export format. 

# **14. Documents, Policies and Team Resources** 

# **14.1 Documents and Policies** 

- Company Policies - Represents the company policies value or option required by this section. 

- Post Orders - Performs the stated post action for orders. 

- SOPs - Represents the sops value or option required by this section. 

- Manuals - Represents the manuals value or option required by this section. 

- Employee Documents - Represents the employee documents value or option required by this section. 

- Site Documents - Represents the site documents value or option required by this section. 

- Company Vehicle Documentation - Represents the company vehicle documentation value or option required by this section. 

- Workplace Notices and Posters - Represents the workplace notices and posters value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **14.2 Team Member Manual** 

- Add Manual - Opens the applicable form to add manual. 

- Listing - Represents the listing value or option required by this section. 

# **14.3 Rewards** 

- Purchase Tokens - Performs the stated purchase action for tokens. 

- Send Tokens - Sends tokens to the selected recipient or audience. 

- Sent Tokens - Represents the sent tokens value or option required by this section. 

- User Activity - Represents the user activity value or option required by this section. 

- Purchase History - Performs the stated purchase action for history. 

- LATER PHASE: Rewards and Tokens workflow is not implemented in the current phase. 

# **14.4 Documents** 

- Create Pack - Opens the creation form for pack and saves a new validated record. 

# **14.5 Team Member Benefits Information** 

- Add New - Captures or configures add new for the record. 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

- Export - Downloads the current applicable dataset using the selected export format. 

- LATER PHASE: Benefits workflow is not implemented in the current phase. 

# **14.6 Celebrations** 

- Past and Upcoming Birthdays - Represents the past and upcoming birthdays value or option required by this section. 

- Tomorrow - Represents the tomorrow value or option required by this section. 

- Today - Represents the today value or option required by this section. 

- LATER PHASE: Celebrations workflow is not implemented in the current phase. 

# **14.7 Time Off and Paid Policies** 

- Add Time Off - Opens the applicable form to add time off. 

- Paid Policies - Represents the paid policies value or option required by this section. 

- Add Policy Type - Opens the applicable form to add policy type. 

# **14.8 Insights** 

- Export - Downloads the current applicable dataset using the selected export format. 

- Pending Request - Represents the pending request value or option required by this section. 

- Filters - Represents the filters value or option required by this section. 

- LATER PHASE: Detailed Insights behavior is not implemented in the current phase. 

# **14.9 Text Message** 

- New Message - Represents the new message value or option required by this section. 

- Message List - Represents the message list value or option required by this section. 

- Filters - Represents the filters value or option required by this section. 

# **14.10 Workplace Notices and Posters** 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Add New - Opens the applicable form to add new. 

- Export - Downloads the current applicable dataset using the selected export format. 

# **14.11 Disciplinary Reports** 

- Add New - Opens the applicable form to add new. 

- Reports Listing - Represents the reports listing value or option required by this section. 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

- Filter - Represents the filter value or option required by this section. 

- LATER PHASE: Detailed disciplinary workflow is not implemented in the current phase. 

# **14.12 HR Complaint Form** 

- Listing - Captures or configures listing for the record. 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

- Add New - Captures or configures add new for the record. 

- Export - Downloads the current applicable dataset using the selected export format. 

- Search - Searches the current listing using supported visible identifiers and text fields. 

- LATER PHASE: Detailed HR complaint workflow is not implemented in the current phase. 

# **14.13 Hiring** 

- Add Positions - Opens the applicable form to add positions. 

- Listing - Represents the listing value or option required by this section. 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

- Search - Searches the current listing using supported visible identifiers and text fields. 

- LATER PHASE: Hiring/applicant workflow is not implemented in the current phase. 

# **15. Training** 

# **15.1 Quizzes** 

- Add New - Opens the applicable form to add new. 

- Quiz Listing - Represents the quiz listing value or option required by this section. 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

- Export - Downloads the current applicable dataset using the selected export format. 

- Search - Searches the current listing using supported visible identifiers and text fields. 

- Filter - Represents the filter value or option required by this section. 

# **15.2 RFI Academy** 

- Add New - Opens the applicable form to add new. 

- Listing - Represents the listing value or option required by this section. 

- Active - Shows or marks records currently available for use. 

- Archived - Shows records that have been archived and are no longer active. 

- Export - Downloads the current applicable dataset using the selected export format. 

- Search - Searches the current listing using supported visible identifiers and text fields. 

- Filter - Represents the filter value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification Training implementation is defined in Part II, Section 42. Certificates, expiration and automatic skill linkage are not required unless separately configured through Skills. 

# **16. Vehicles** 

# **16.1 Confirmed Scope** 

Vehicle management is limited to vehicle records and documentation. 

# **16.2 Vehicle Management** 

- Create Vehicle - Opens the creation form for vehicle and saves a new validated record. 

- Vehicle Listing - Represents the vehicle listing value or option required by this section. 

- View Vehicle - Opens vehicle for complete details. 

# **Listing Columns** 

- ID - Displays the unique identifier of the listed record. 

- License - Displays the license value for each listed record. 

- Make / Model / Year - Displays the make model year value for each listed record. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

# **Filters** 

- All Vehicles - Filters the current list to records matching all vehicles. 

- Purchased - Filters the current list to records matching purchased. 

- Leased - Filters the current list to records matching leased. 

- Status: Active - Filters the current list to records matching active. 

- Status: Inactive - Filters the current list to records matching inactive. 

- Status: All - Filters the current list to records matching all. 

# **16.3 Company Vehicle Documentation** 

- Add New - Opens the applicable form to add new. 

- Vehicle Listing - Represents the vehicle listing value or option required by this section. 

- Export - Downloads the current applicable dataset using the selected export format. 

**EXCLUDED / CURRENTLY NOT REQUIRED:** Fuel, mileage, maintenance, repair, GPS, equipment tracking and vehicle assignment history are excluded. 

# **17. Automations and Notifications** 

# **17.1 Automation Builder** 

The platform includes a custom Connecteam-style builder using Trigger → Conditions → Actions. 

# **Triggers May Include** 

- Late Tour / Checkpoint - Represents the late tour checkpoint value or option required by this section. 

- Employee Termination - Represents the employee termination value or option required by this section. 

- Finished Tour / Runsheet - Represents the finished tour runsheet value or option required by this section. 

- Panic / Important Report - Represents the panic important report value or option required by this section. 

- Recurring Task - Represents the recurring task value or option required by this section. 

- Break Event - Represents the break event value or option required by this section. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Clock-In / Clock-Out - Represents the clock-in clock-out value or option required by this section. 

- No GPS Update - Represents the no gps update value or option required by this section. 

- No Mobile Activity - Represents the no mobile activity value or option required by this section. 

- Late Shift - Represents the late shift value or option required by this section. 

- Early Clock-Out - Represents the early clock-out value or option required by this section. 

- Report Submission - Represents the report submission value or option required by this section. 

- Skill Expiration - Represents the skill expiration value or option required by this section. 

- Uncovered Shift - Represents the uncovered shift value or option required by this section. 

- Overdue Task - Represents the overdue task value or option required by this section. 

# **Conditions** 

- Site - Identifies the operational site associated with the record. 

- Employee - Identifies the employee related to the row, assignment or transaction. 

- Job Type - Selects or displays the configured job/service type. 

- Shift - Identifies the related scheduled work period. 

- Report Category - Represents the report category value or option required by this section. 

- Incident Category - Represents the incident category value or option required by this section. 

- Date - Displays or captures the applicable calendar date. 

- Time - Displays the relevant event or schedule time. 

- Status - Displays the record's current state and uses only statuses configured for that module. 

- Skill / Credential - Represents the skill credential value or option required by this section. 

- Tour - Represents the tour value or option required by this section. 

- Checkpoint - Represents the checkpoint value or option required by this section. 

# **Version-One Automation Actions (authoritative list: In-App Notification, Push Notification, SMS, Create Task)** 

- Send Notification - Sends notification to the selected recipient or audience. 

- Send Email - Not included as a version-one Automation action. 

- Send SMS - Sends sms to the selected recipient or audience. 

- Send Push Notification - Sends push notification to the selected recipient or audience. 

- Create Task - Opens the creation form for task and saves a new validated record. 

- Create Ticket / System Exception - Not included as a version-one Automation action unless separately triggered by the underlying feature (for example inactivity ticket behavior). 

- Notify Admin - Implement through the selected In-App/Push/SMS notification action and configured recipient. 

- Notify Supervisor - Implement through the selected In-App/Push/SMS notification action and configured recipient. 

- Notify Employee - Implement through the selected In-App/Push/SMS notification action and configured recipient. 

- Create Incident - Not included as a version-one Automation action; incidents remain managed through the Reports/Incident functionality. 

- Send Broadcast - Not included as a version-one Automation action. 

- Update applicable status where configured - Not included as a version-one Automation action. 

# **17.2 Scope Rules** 

- An automation may be assigned to one site or multiple selected sites. 

- No acknowledgment-based escalation. 

- Duplicate notifications for the same unresolved event must be suppressed. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification Automation scope is site-based. A rule may be assigned to one site or multiple selected sites; no separate company-global scope is required unless later requested. 

Duplicate suppression uses the confirmed 30-minute matching-event rule defined in Part II, Section 44.2. 

# **18. Payroll and Back Office** 

# **18.1 Payroll Scope** 

- Payroll calculation is required. 

- Payroll calculation logic is confirmed through configurable Policies and Pay Rules. No separate payroll status workflow is required; detailed rules are defined in Part II, Section 45. 

# **18.2 Confirmed Back Office Configuration** 

- Break Management - Source-listed configuration retained, but detailed break calculations and penalties are Later Phase. 

- Back Office Defaults - Not required in the current phase. 

- Employee Classes - Captures or configures employee classes for the record. 

- Payroll Schedules - Captures or configures payroll schedules for the record. 

- Holiday Groups - Captures or configures holiday groups for the record. 

- Holiday Codes - Captures or configures holiday codes for the record. 

- Overtime Rules - Captures the applicable time using a time selector. 

- Pay Codes - Captures or configures pay codes for the record. 

- Export Formats - Captures or configures export formats for the record. 

- Tax Settings - Not required in the current phase; no tax calculation or tax-payment workflow is included. 

- Bill Items - Captures or configures bill items for the record. 

- Audit History - Captures or configures audit history for the record. 

- General Settings - Captures or configures general settings for the record. 

- Back Office Settings - Captures or configures back office settings for the record. 

- Break Penalties - Later Phase together with detailed Break Management calculations. 

# **18.3 Employee Financial Information** 

- Compensation Details - Captures or configures compensation details for the record. 

- Payment Information - Not required for payroll processing in the current phase; no bank/payment processing is included. 

- Financial visibility controlled by custom permissions - Captures or configures financial visibility controlled by custom permissions for the record. 

LATER PHASE: Invoice generation behavior is not implemented in the current phase. 

LATER PHASE: Payroll-provider and accounting integrations are not implemented in the current phase. 

# **19. Settings and Configuration** 

# **19.1 General Configuration** 

- Notifications - Captures or configures notifications for the record. 

- Notification Sender Name - Captures or configures notification sender name for the record. 

- Notification Sender Email - Captures or configures notification sender email for the record. 

- Late Tour / Checkpoint - Captures or configures late tour checkpoint for the record. 

- On Termination - Captures or configures on termination for the record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Finished Tour / Runsheet - Captures or configures finished tour runsheet for the record. 

- Alerts / Panic / Important Reports - Captures or configures alerts panic important reports for the record. 

- Recurring Tasks - Captures or configures recurring tasks for the record. 

- Break Management - Source-listed configuration retained, but detailed break calculations and penalties are Later Phase. 

- Clock In / Out - Captures or configures clock in out for the record. 

- SMS Segments - Captures or configures sms segments for the record. 

- Company Name and Address - Captures or configures company name and address for the record. 

- Roles and Permissions - Captures or configures roles and permissions for the record. 

- Password Policy - Captures the password value and applies the stated password validation rules. 

- Sign-In Log - Captures or configures sign-in log for the record. 

- General - Captures or configures general for the record. 

- Category-Wise Settings (13 Categories) - Captures or configures category-wise settings (13 categories) for the record. 

- System Locale Settings - Captures or configures system locale settings for the record. 

- Field Configuration - Captures or configures field configuration for the record. 

CONFIRMED: Do not hard-code 13 fixed categories. Categories are custom-created and named by Admin where category configuration is required. 

# **19.2 Operation Configuration** 

- Report Templates - Captures or configures report templates for the record. 

- Site Templates - Not required in the current phase. 

- Zone Templates - Captures or configures zone templates for the record. 

- Incident Templates - Captures or configures incident templates for the record. 

- Devices and License - Not required in the current phase. 

- Region Message Boards - Captures or configures region message boards for the record. 

- Job / Service Type - Captures or configures job service type for the record. 

- Special Calendar Days - Captures or configures special calendar days for the record. 

- Calendar Groups - Not required in the current phase. 

- **EXCLUDED / CURRENTLY NOT REQUIRED:** Zone Templates are excluded for the current phase. 

CURRENT PHASE: Devices and License and Calendar Groups are not required. Region Message Board uses the shared Message Board with existing site/permission scope rather than a separate workflow. 

# **19.3 Back Office Configuration** 

- Break Management - Source-listed configuration retained, but detailed break calculations and penalties are Later Phase. 

- Back Office Defaults - Not required in the current phase. 

- Employee Classes - Captures or configures employee classes for the record. 

- Payroll Schedules - Captures or configures payroll schedules for the record. 

- Holiday Groups - Captures or configures holiday groups for the record. 

- Holiday Codes - Captures or configures holiday codes for the record. 

- Overtime Rules - Captures the applicable time using a time selector. 

- Pay Codes - Captures or configures pay codes for the record. 

- Export Formats - Captures or configures export formats for the record. 

- Tax Settings - Not required in the current phase; no tax calculation or tax-payment workflow is included. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Bill Items - Captures or configures bill items for the record. 

- Audit History - Captures or configures audit history for the record. 

- General Settings - Captures or configures general settings for the record. 

- Back Office Settings - Captures or configures back office settings for the record. 

- Break Penalties - Later Phase together with detailed Break Management calculations. 

# **19.4 Password Policy and Sign-In Log** 

Retain the Password Policy and Sign-In Log sections from the source. Detailed password rules and sign-in log columns may be finalized during technical design without introducing a new business workflow. 

# **19.5 Data Retention** 

- Retention is configurable by data category. 

- Applicable categories include GPS/activity history, reports, media, messages, timesheets, audit history, panic events, tours and checkpoint scans. 

# **20. Groups and Segments** 

- Groups - Represents the groups value or option required by this section. 

- Add Segments - Opens the applicable form to add segments. 

- CURRENT PHASE: Group is a manually created specific-purpose collection of selected people. Department 

- remains the permanent organizational team. No separate rule-based Segment behavior is required. 

# **21. Help and Help Desk** 

# **21.1 Help** 

- Resource Center - Represents the resource center value or option required by this section. 

- Talk to an Expert - Performs the stated talk action for to an expert. 

# **21.2 Help Desk** 

- Unassigned - Represents the unassigned value or option required by this section. 

- Assigned to Me - Represents the assigned to me value or option required by this section. 

- All - Removes the specific status restriction and shows all permitted records. 

- Help and Help Desk are separate functional areas. 

# **22. Supervisor Portal Behavior** 

- Supervisor uses the same portal interface as Admin. 

- Supervisor access is controlled by assigned roles and module permissions. 

- When site-restricted, Supervisor can access permitted modules and records for assigned sites. 

- No separate Dispatcher role is required. 

- Financial information is visible only when explicitly enabled. 

# **23. Pending Discussion Register** 

# **23.1 Scheduling** 

# **Final Status** 

- Later Phase: Shift acceptance, rejection, open shifts, claiming, swapping and replacement. 

- Cross-midnight ownership is resolved: the shift belongs to its start date; payroll interpretation follows assigned Pay Rules. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **23.2 Site, Client and Contracts** 

# **Final Status** 

- Contract management remains Later Phase. 

- Multiple-client site relationship is resolved: one Primary client may be marked; assigned clients can access minimum site reports/schedules/employees and see other assigned clients; no shared-site financial responsibility logic. 

- Site closure is resolved: deactivate active/current/future site functionality while preserving historical records. 

# **23.3 Guard Mobile / Attendance Dependencies** 

# **Final Status** 

- Later Phase: offline clock-in/out and delayed synchronization design details. 

- Geo-fence, GPS permission, attendance statuses, timesheet approvals and manual time-change rules are resolved in Part II. 

# **23.4 Communications** 

# **Final Status** 

- Resolved: Admin can view private chats; Chat Settings controls edit/delete/export/attachments; same-site guard-to-guard chat is allowed; clients cannot directly chat with guards. 

- No additional communication rules are pending for current scope. 

# **23.5 HR and Team Resources** 

# **Final Status** 

- Later Phase: Team Member Manual advanced workflows, Rewards/Tokens, Benefits, Celebrations, Disciplinary Reports, HR Complaint Form, Hiring, Paid Policies, Insights, Workplace Notices, Text Message workflows and Document Packs. 

# **23.6 Training** 

# **Final Status** 

- Current phase Training implementation is defined in Part II: RFI Academy items, Quizzes, assignment, scoring and completion tracking. 

- Certificates/expiry/automatic skill linkage are not required unless separately configured through Skills. 

# **23.7 Finance** 

# **Final Status** 

- Payroll policy/pay-rule calculation logic is resolved in Part II. 

- Later Phase: accounting/payroll-provider integration and invoice-generation behavior. 

# **23.8 Migration** 

# **Final Status** 

- Later Phase: TrackTik/Connecteam historical migration, parallel operation, cutover and historicaldata categories. 

# **23.9 Undefined Source Features** 

# **Final Status** 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Later Phase: Remote Speak, Runsheet Patrol Events, Daily Health, Cross Schedule Events, Financial by Shift, Recordings, detailed System Exceptions and Pivot Chart View/Edit. 

- Journal Entries is current phase and records Admin termination actions with details and date/time. 

- Devices and License, Calendar Groups and Back Office Defaults are not required in the current phase. 

- Groups are specific-purpose manual collections of people; Departments are permanent organizational teams. 

- Separate Job List is not required; Job Type/Position and Task List cover those concepts. 

# **24. Excluded for Current Phase** 

# **Current-Phase Exclusions** 

- Multi-tenant administration and white-label tenant controls. 

- Zone hierarchy/templates. 

- Equipment inventory management. 

- Vehicle fuel, mileage, maintenance, GPS and vehicle-assignment history. 

- Devices and License configuration. 

- Calendar Groups and Back Office Defaults. 

- Separate Job List module. 

- Tax/net-pay/bank-payment processing. 

- Remote Speak and other features explicitly marked Later Phase. 

- Pivot Chart View/Edit in the current phase. 

# **25. Functional Traceability Summary** 

|**Area**|**Status**<br>|
|---|---|
|Authentication and module access|Confrmed<br>|
|Dashboard and operational widgets|Confrmed<br>|
|Employee management|Confrmed<br>|
|Departments and skills|Confrmed<br>|
|Clients and sites|Confrmed including shared-site minimum<br>visibility and closure logic; Contracts and<br>remainingClient Portal details laterphase<br>|
|Scheduling|Confrmed with pending shift-marketplace<br>behaviors<br>|
|Time clock and work exceptions|Confrmed core logic; detailed Break Management<br>and ofline synchronization laterphase<br>|
|Reports and incidents|Custom report confguration confrmed; TrackTik-<br>style runtime statuses/fags/incident<br>logic/numbering/footer precedence still require<br>confrmation<br>|
|Forms|Confrmed<br>|
|Checkpoints and tours|Confrmed<br>|
|Tasks and dispatch|Confrmed<br>|
|Communications|Confrmed for current scope; Admin private-chat<br>visibilityand Chat Settings rules resolved<br>|
|SecurityOperations landingarea|Confrmed<br>|
|Team Resources|Source-listed;detailed HR workfowspending|
|Training|Current-phase Quizzes and RFI Academy logic<br>defned in Part II|



AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

||RFI Admin/Supervisor Portal - Developer Functional Specifcation|
|---|---|
|Vehicles|Documentation only<br>|
|Automations|Confrmed: site/multi-site event builder, 30-<br>minute duplicate suppression,<br>In-App/Push/SMS/Create Task actions<br>|
|Payroll|Confrmed: policy/pay-rule auto-calculation logic;<br>integrations laterphase<br>|
|Settings|Confrmed and rationalized in Part II; unsupported<br>source settings removed from currentphase<br>|
|Groups / Job List|Groups confrmed as manual specifc-purpose<br>collections; separate Job List excluded and<br>covered byTask List/Job Type<br>|
|Helpand HelpDesk|Confrmed and separate|



# **26. Final Acceptance Principle** 

This document is the final consolidated functionality baseline for the RFI Admin/Supervisor Portal. During UI/UX and technical design, no module, section, subsection, field, filter, table column or action listed here may be omitted without an approved scope change. Items marked Pending Discussion must remain visible in the backlog and must not be implemented based on assumptions. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **PART II - DETAILED DEVELOPER FUNCTIONAL SPECIFICATION** 

_This part expands the approved functionality baseline into development logic. It does not replace Part I. Every field, filter, column and action in Part I remains mandatory unless marked Pending Discussion or Excluded for Current Phase. Where this part describes technical behavior, it is limited to logic necessary to implement the approved feature._ 

# **27. Cross-Module Development Standards** 

# **27.1 Record Identity and Data Integrity** 

# **Required Logic** 

- Every primary business record must have an internal immutable system ID. Display IDs such as Employee ID, Site ID, Vehicle ID and Report ID remain separate user-facing values. 

- Employee ID is generated automatically and cannot be edited after employee creation. 

- Related records must store internal references rather than copied names so historical links remain valid when names change. 

- Records referenced by historical shifts, reports, tours, timesheets or audit entries must not be harddeleted. Use Active, Inactive or Archived status where the source document provides it. 

- All date/time values must be stored consistently and displayed using the site or system time-zone setting applicable to the record. 

# **27.2 Common Listing Behavior** 

# **Required Logic** 

- Load only records the logged-in user is permitted to access based on module access and assignedsite restriction. 

- Apply each listed filter independently and combine multiple filters using AND logic unless a filter explicitly supports multiple selections. 

- Global Search on a page searches only the columns relevant to that page; the portal-level Global Search searches supported entity types. 

- Exports must use the same active filters and search criteria currently applied to the listing. 

- Archived records appear only when the applicable Active/Archived/All filter includes them. 

- Actions must operate on the selected record and refresh the list after successful completion. 

# **27.3 Form Behavior and Validation** 

# **Required Logic** 

- Required fields must be visibly marked and validated before submission. 

- Email fields must validate email format. Phone fields must retain country code and SMS-consent value separately. 

- Date ranges must prevent an end date earlier than the start date unless the feature is explicitly pending discussion. 

- Dropdowns populated from configurable master data must show active values and provide the confirmed custom-create option only where specifically approved. 

- On validation failure, retain entered data and show field-specific errors. 

- Edit forms must load the current saved values and update only submitted changes. 

- Confirmation must be required for destructive or access-revoking actions such as termination, close account, archive, remove and revoke access. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **27.4 Permissions and Site Restriction** 

# **Required Logic** 

- Authenticate the user, resolve all assigned roles, merge module-access toggles and apply assignedsite restriction. 

- When any role grants module access, the user can use all actions within that module, subject to assigned-site restriction and custom financial visibility. 

- Users with restricted sites must not retrieve, search, export or directly open records belonging only to unassigned sites. 

- Users may hold multiple roles. No temporary-role date range is required. 

- No separate Dispatcher role is required. 

# **27.5 Audit and Activity Recording** 

# **Required Logic** 

- Record audit entries for create, edit, archive, remove, access grant/revoke, password action, termination, time edit, report approval, schedule update, automation update and configuration change. 

- Each audit entry must identify user, date/time, module, record, action and changed values when applicable. 

- Company Activity Journal uses the defined activity types Banned, Notes, Terminated and Reactivated. 

- Operational activity events must feed the applicable Dashboard Activity Log and Site Live Dashboard filters. 

# **27.6 Notifications** 

# **Required Logic** 

- Only send notifications when a source-defined event, explicit user action or enabled automation requires one. 

- Use the configured notification sender name and sender email. 

- Duplicate notification suppression must prevent repeated alerts for the same unresolved automation event. 

- No acknowledgment-based escalation is required. 

- Notification delivery channels and schedule-change channels are configurable where confirmed. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **28. Authentication, Roles and Portal Framework - Development Logic** 

# **28.1 Login** 

# **User Flow** 

- User enters username/email and password. 

- System validates credentials and account status. 

- System resolves available portal access and role/module permissions. 

- User is redirected to the permitted Admin/Supervisor dashboard or applicable portal context. 

- Failed login records a Sign-In Log entry with failure status and reason. 

- Successful login records login time, user, device/IP details available to the application and successful status. 

# **Validation and States** 

- Deny login when access is revoked, employee is terminated or account status does not permit login. 

- Apply password policy configured in Settings. 

- Force Password Change must redirect the user to password creation before other modules can be used. 

# **28.2 Roles and Permissions** 

# **Create/Edit Role** 

- Admin enters Role Name, Description and Portal Section/Type. 

- Admin enables module-access toggles and optional assigned-site restriction. 

- Admin defines financial information visibility. 

- Saving a role makes it available for assignment to users. 

- Changes apply to future authorization checks and must be audited. 

# **Multiple Role Resolution** 

- Combine access granted by all active roles assigned to the user. 

- Apply site restriction to every data query. 

- Financial visibility must remain separately controlled even when general module access is granted. 

# **28.3 Global Search** 

# **Search Logic** 

- Accept a text query and search supported Customers/Clients, Contacts, Employees, Reports and other explicitly enabled records. 

- Group results by record type. 

- Only return records permitted by module and assigned-site access. 

- Selecting a result opens its detail page. 

# **29. Dashboard - Development Logic** 

# **29.1 Dashboard Loading and Refresh** 

# **Final Confirmed Logic** 

- Refresh live dashboard data every 1 minute and retain the current user/site context during refresh. 

- Use only data permitted by the user’s module access and assigned-site scope. 

- Dashboard time-based report counting uses EST where specifically confirmed for Reports to Approve. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **29.2 Clocked-In via Mobile** 

# **Final Confirmed Logic** 

- Replace the earlier Current/Covered/Uncovered/Late filter set with: Clocked In, Running Late, Clocked Out, Need to Clock Out, and On Time Off. 

- Clocked In means the guard has an active clock-in for the applicable scheduled shift. 

- Running Late means the scheduled start threshold has passed and the employee has not clocked in; when the configured late threshold is exceeded, mark the shift/attendance as Absent. 

- Need to Clock Out means the scheduled shift end/allowed clock-out threshold has passed while the employee remains clocked in. 

- On Time Off means the employee has approved time off covering the applicable scheduled period. 

# **29.3 Inactive Mobile User** 

# **Final Confirmed Logic** 

- Position/Post setup must include a Static or Moving type and an inactivity frequency/time rule. 

- Evaluate GPS/activity inactivity using the frequency configured on the employee’s assigned Position/Post. 

- Generate the inactivity ticket when the configured condition/threshold is met. 

- The Position/Post configuration also defines the time condition used to auto-close the inactivity ticket when activity is restored. 

- Create notifications for the guard and the applicable supervisor according to the Automation module. 

- Apply Automation duplicate-suppression logic to avoid duplicate inactivity notifications/tickets for the same event window. 

# **29.4 Expired and Expiring Skills** 

# **Status Logic** 

- Compare each employee skill expiration date to the current date and configured expiring-soon window. 

- Expired records are those before the current date; expiring-soon records are within the configured window. 

- Apply category and date filters and export the filtered Employee Name, Expiration Date, Expires, Description, Region and Category data. 

# **29.5 Reports to Approve** 

# **Final Confirmed Logic** 

- Count only active reports requiring approval within the rolling previous 7-day period using EST. 

- Archived reports are excluded from the dashboard count. 

- Reports outside the seven-day window remain available in the Reports module through status/date filters. 

# **29.6 Message Board** 

# **Final Confirmed Logic** 

- The unread count is based on messages unread by any intended recipient. 

- For Admin/Supervisor display, only count messages related to sites the logged-in user is allowed to access. 

# **29.7 Time-Off Requests** 

# **Required Logic** 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Count pending time-off requests accessible to the user. 

- Clicking the count opens the Time Off page filtered to pending requests. 

# **29.8 Activity Log** 

# **Required Logic** 

- Latest shows current-day events. 

- View History allows date-based historical events. 

- Filter by All Events, Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scans, Runsheet Patrol Events and Remote Actions. 

- Apply From-To date filter. 

# **29.9 Attendance** 

# **Required Logic** 

- List guards scheduled for the current day shift-wise and their clock status. 

- Provide Clocked In, Running Late, Clocked Out, Need to Clock Out and On Time Off filters plus Global Search. 

- Attendance must use the schedule and mobile time-clock records as its source. 

# **29.10 Scheduled Tours** 

# **Final Confirmed Logic** 

- A tour is created for a site separately from a shift; it is not a child record created inside the shift. 

- The first eligible guard scheduled for the matching site/date/time is auto-assigned by default; additional tour users, when required, are manually assigned. 

- Last Performed By displays the latest employee who completed/performed that tour; show no performer when it has never been performed. 

# **29.11 Task Dispatch** 

# **Required Logic** 

- Add Task opens the task form determined by selected Task Type. 

- List tasks and filter by New Tasks, In Progress, New and In Progress and Completed. 

- Filter assignment by All, Not Assigned, Assigned to Any and Assigned to Employee. 

# **29.12 Show Map and Remote Actions** 

# **Final Confirmed Logic** 

- Message with Siren is implemented as a push-notification alert; no separate continuous siren/acknowledgement workflow is required in the current phase. 

- Remote Speak is Later Phase and must not be implemented now. 

- Reload Install/Settings means configuration refresh plus application synchronization; it does not mean remote reinstall. 

- Remote clock-out uses the same confirmed clock-out rules and must not silently bypass geo-fence/attendance rules. 

- When a remote clock-out changes the time record, retain the standard time-change/audit behavior and notify the employee where applicable. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **30. Employee Management - Development Logic** 

# **30.1 Add Employee** 

# **Final Confirmed Logic** 

- Employee ID is system-generated and unique. 

- Employee Status values are: Pending Invitation, Onboarded, Active, Inactive, and Terminated. 

- Pending Invitation = user created but invitation not accepted; Onboarded = site assigned during onboarding; Active = at least one active site assignment; Inactive = not available for work; Terminated = terminated by Admin. 

- Email address must remain unique even when multiple employees use the same Employee Type. 

- Role/module permissions define portal access; Terminated users cannot log in. Guard users use the mobile app. Non-admin employee access is limited to permitted assigned-site/employee information without edit rights. Admin users receive assigned-site edit access plus explicitly granted modules. Super Admin receives full platform access. 

- Employee Type is configurable and may be edited/archived; archived Employee Type represents past/inactive classification and must not invalidate historical employee records. 

# **30.2 Employee Listing** 

# **Required Logic** 

- Display exactly the approved columns: UID, Name, Middle Name, Last Name, Title, Termination Date, Email, Username, User Type, Department, Status, Last Visit and Added By. 

- Apply Department, Zone (source-listed but current phase treatment per scope), Status and Global Search filters. 

- CSV, PDF and Excel exports must reflect the active filters. 

# **30.3 Assigned Sites** 

# **Final Confirmed Logic** 

- An employee may be assigned to multiple sites. 

- Do not implement separate assigned-site rate logic here; employee compensation/rate calculation is controlled through Payroll Policies and Pay Rules. 

- An employee assigned to one site must not be allowed to clock in at a different site unless that employee also has an active assignment to that site. 

# **30.4 Site Bans** 

# **Final Confirmed Logic** 

- A site-banned employee must not appear in the eligible employee list for assignment to that site. 

- Remove Ban removes the employee from the current Site Ban list; no separate historical ban record is required in the current phase. 

# **30.5 Emergency Contacts and Notes** 

# **Final Confirmed Logic** 

- Notes on Employee are internal notes entered by Admin/Supervisor about the employee. 

- Notes by Employee are notes created by the employee for the employee’s own profile. 

- Keep the two note sources distinguishable in listings and filtering. 

# **30.6 Availability** 

# **Final Confirmed Logic** 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Use the source availability states Available, May Be Available, and Not Available. 

- Availability is checked when building the eligible employee list for a shift; employees not eligible for that date/time must not be shown for assignment. 

- Admin may maintain employee availability from the employee profile/calendar using the confirmed Connecteam-style availability experience. 

# **30.7 Work Exceptions** 

# **Required Logic** 

- List Shift Start, Shift End, Region, Account Name, Meal Break Exception, Meal Schedule, Meal Actual, Rest Break Exception, Rest Schedule and Rest Actual. 

- Provide date, status and Global Search filters as defined in Part I. 

- Values are derived from scheduled break rules and actual time-clock/break activity. 

# **30.8 Password, ID Card, Picture and Tracking Actions** 

# **Final Confirmed Logic** 

- Force Password Change sends the user a password-reset link. 

- ID Card should display the company logo, employee photo, employee full name, system Employee ID, Job Title, Department (if assigned), and current employment status. 

- Provide print and PDF/download output for the ID Card. No QR/barcode requirement is included in the current phase. 

- Snap Picture updates the employee profile image. Tracks shows permitted historical/current map tracking according to site and location access. 

# **30.9 Termination** 

# **Final Confirmed Logic** 

- On termination: mark future shifts as uncovered/unassigned as applicable, revoke portal access, revoke Guard Mobile App access, preserve historical records, notify Payroll, and notify relevant Supervisors. 

- Termination must create a Journal Entry showing the Admin who terminated the employee, employee details, termination details, and date/time. 

# **30.10 Skills and Credentials** 

# **Final Confirmed Logic** 

- Admin first creates a Skill definition, then assigns the skill to applicable Positions and/or selected employees. 

- Skill setup may store a third-party website/course link where the actual skill/training is completed. 

- The resulting certificate/document is downloaded externally and uploaded to the employee skill record in this portal. 

- Admin manually verifies the uploaded skill/certificate status. 

- Expiring Soon and Expired are system-calculated from the stored expiration date. 

- Expiring-soon threshold is configurable by Skill Category. 

- Archived skills are no longer required for completion and should not appear as an active requirement. 

- Position Count represents Positions for which the skill is required. Assigned Employee Count represents selected employees/eligible employees under those positions assigned to complete the skill. 

- The two optional text fields remain form-builder fields and may be labeled/configured by Admin. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **30.11 Employee Reports** 

# **Required Logic** 

- List ID, Type, Flags, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. 

- Apply Active/All Templates/Archived, Incident Flags Only, Status, From-To Date and Global Search filters. 

- Approve All performs approval only on eligible reports according to each report configuration. 

# **30.12 Summary Reports** 

# **Required Logic** 

- Group shift activity into rows showing Employee, Location, Reports, Videos, Checkpoints, Start, End, Tracks, PDF, View and Options. 

- Approve All Reports applies only to approval-required eligible reports in the selected shift summary. 

- Send Shift Report by Email sends the generated shift summary/report to the entered or configured recipient. 

- Delete This Shift and Time Logs requires confirmation and audit; preserve related records where hard deletion would break history. 

# **30.13 Employee Tours and Schedule** 

# **Required Logic** 

- Tour listing shows Tour Name, Account, Employee, Result, Start Time, End Time, Duration, PDF, Email, View Tour Session and Delete Tour Session. 

- Apply From-To date and Global Search filters and provide CSV, PDF, Excel, Pivot Chart View and Pivot Chart Edit actions. 

- Employee Schedule listing shows Note, Name, Day, Start Date, Time, Clocked Shifts, Scheduled Break and Actual Break. 

- Provide calendar view, No Schedule to Distribute, No Changes to Notify and Print actions as listed. 

# **30.14 Employee Time Off** 

# **Required Logic** 

- Create Time Off captures First Day Off, Return Date and Description. 

- Validate Return Date is not earlier than First Day Off. 

- List ID, From, To and Description. 

- Entitlement permits the configured entitlement value to be set for the employee. 

# **31. Departments, Admins and User Settings - Development Logic** 

# **31.1 Departments** 

# **Final Confirmed Logic** 

- Admin creates permanent Departments and manually assigns employees to them. 

- Do not use Department Install Code in the current phase. 

- Do not create Department-specific pay rules; pay is controlled through the Payroll Policies/Pay Rules module. 

- Groups remain separate from Departments: Department is a permanent organizational team; Group is a temporary/specific-purpose collection of selected people. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **31.2 Admins** 

# **Required Logic** 

- List employees with Admin access using First Name, Last Name, Access Level, Managed Groups, Permissions, Admin Tab, Accepted, Last Login and Added By. 

- The list is derived from active portal access/role assignment rather than a duplicate employee record. 

# **31.3 User Settings** 

# **Required Logic** 

- Allow configured employee profile fields in Personal Details, Company-Related Information and Compensation Details. Payment/bank information is not required in the current phase. 

- Financial visibility rules apply to compensation and payment information. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **32. Clients and Sites - Development Logic** 

# **32.1 Client-Site Data Model** 

# **Final Confirmed Logic** 

- One client may be assigned to multiple sites and one site may have multiple assigned clients. 

- One client may be marked Primary for a shared site. 

- A client assigned to a site receives access, at minimum, to the site’s reports, schedules, and employee information as permitted by Client Portal configuration. 

- Assigned clients may see other clients assigned to the same site. 

- Only Super Admin may remove a client-site assignment when other clients remain. 

- No client financial-responsibility logic is required for shared sites. 

- Account Type values (Regular Client, Multi-Site Client, Site Account) are classification indicators only and do not change behavior. 

# **32.2 Create Site / Client Account** 

# **Required Logic** 

- Capture Account Type, Company Information, Main Contact, Address, Employee Relations and Other Custom Fields exactly as listed in Part I. 

- Validate Unique ID uniqueness within the company. 

- Store each phone’s SMS option independently. 

- Time Zone defaults from system settings but remains stored for the site. 

- Allow more than one client assignment to the site. 

# **32.3 Site Overview** 

# **Required Logic** 

- Display Site Name, Photo, Manager Name, Manager Position, Phone, Email, Address and Bill-To Address. 

- Overview data is drawn from the saved site and contact records. 

# **32.4 Job Type / Position** 

# **Final Confirmed Logic** 

- Position and Job Type are the same functional concept. The Position/Post configuration must also allow type Static or Moving for inactivity monitoring. 

- Custom Position/Job Type forms may include Admin-defined custom fields in addition to the sourcelisted fields. 

- Eligible employees for a Position/Shift must exclude inactive, terminated, unavailable, unqualified, site-banned, time-conflicting, or otherwise ineligible employees. 

- If a conflict is detected because of concurrent updates/data race, block save and show an alert; no override reason is required. 

- One shift uses one Job Type and belongs to one site. 

# **32.5 Site Assigned Employees** 

# **Required Logic** 

- Assign Employee using Filter by Skills, Select Employee, Employee Start Date and Add Rule with Effective Date and Hourly Rate. 

- List Employee, Start Date, Rate, Unassignment Date, Is Primary Site, Make Primary, History, Remove and View. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Prevent assignment when the employee has an active site ban. 

# **32.6 Client Portal Access** 

# **Required Logic** 

- Create access with First Name, Last Name, Picture, Phone, Email, Password, Force Password Change, Client Role and Grant/Revoke Access status. 

- List Full Name, Email, Phone, Last Login, Access and Edit. 

- Revoking access blocks future login without deleting the client user history. 

- Confirmed minimum Client Portal access for an assigned site includes reports, schedules and employee information; assigned clients may see other assigned clients. Additional Client Portal features/actions remain Later Phase. 

# **32.7 Site Contacts** 

# **Required Logic** 

- Create contact using every field listed in Part I, including Attention Of, Preferred Language, Status and Use This Address as Bill-To Address. 

- When Bill-To is selected, update the site billing-address reference. 

- List Name, Job Title, Phone, Email and Edit action. 

# **32.8 Close Account** 

# **Final Confirmed Logic** 

- Closing a site deactivates the site and all current/future operational items tied to it, including shifts, assigned operations, tours/checkpoints, automations, client access, tasks and other active site functionality. 

- Preserve all records/history up to the time the site was active; do not hard-delete historical site data. 

- Contract-management behavior remains Later Phase. 

# **32.9 Site Operational Tabs** 

# **Required Logic** 

- Dispatch Settings and Prepare Schedule open their respective shared functionality in the current site context. 

- Operation Reports, Logs and Activities, Reports, Patrol Tours, Journal Entries, Recordings, Summaries, Summary by Shift, Financial by Shift, Incident Analytics, Analytics Reports, Exceptions and Audits, Post Orders, Work Exception and System Exception must remain accessible. 

- Undefined source features remain placeholders/pending until their business behavior is defined; do not invent calculations or workflows. 

# **32.10 Site Notifications** 

# **Required Logic** 

- Notification configuration must support the listed report, checkpoint, tour, timekeeping, clock and security events. 

- Rules are implemented through the confirmed Automation builder where applicable. 

- No acknowledgment escalation is required. 

# **32.11 Site Locations, Emergency Contacts and Geo-Fence** 

# **Final Confirmed Logic** 

- Site internal areas/locations require stored geographic coordinates. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- A site may have multiple polygon geo-fences/coordinate areas for clock validation. 

- Do not create separate per-section Post Orders, checkpoint rules, or guard-switching workflows in the current phase. 

- Guards do not switch between site sections as a separate workflow. 

# **32.12 Site Live Dashboard** 

# **Required Logic** 

- Filter events by Reports, Time Clock, Patrol Tours, Panic Button Triggers, Changed Site, Checkpoint Scan, Runsheet Patrol Events and Remote Actions. 

- Provide Show Map, Broadcast Message, New Task, New Report and History Tracks actions. 

- All actions open shared modules pre-filtered to the current site. 

# **32.13 Site Email Settings** 

# **Required Logic** 

- Provide the PDF Is Attached as a Link Yes/No setting. 

- Use this value when emailing applicable site reports. 

# **33. Checkpoints and Tour Routes - Development Logic** 

# **33.1 Checkpoint Creation** 

# **Final Confirmed Logic** 

- Keep source checkpoint types NFC and Barcode; manual scanning remains optional according to configuration. 

- Checkpoint order/rules are configurable by tour: strict order, any order, randomized, repeated and optional checkpoints may be defined as applicable. 

- If a checkpoint is scanned out of configured order, generate a notification alert identifying that checkpoint. 

- Manual scan may collect Reason, Photo, GPS and Comment; configured requirements may be combined. 

- A valid manual scan counts as checkpoint completion and does not require supervisor approval. 

- Admin may allow manual scanning even when the physical checkpoint is functioning. 

# **33.2 Batch Import and Logs** 

# **Required Logic** 

- Batch import accepts the approved spreadsheet template, validates required checkpoint fields and reports row-level errors. 

- Checkpoint logs show Time, Employee, Account, Checkpoint and Tour. 

- Imported and manually created checkpoints use the same listing and edit flow. 

# **33.3 Tour Route Creation** 

# **Final Confirmed Logic** 

- Tour is created separately for a site and is assigned to scheduled employees matching the tour site/date/time; it is not created as a child of the shift. 

- Multiple tours may be assigned within one shift. The same tour template cannot be repeated twice in the same shift. 

- Tour assignment may occur after shift start. 

- When the shift employee changes, assign the pending/eligible tour to the replacement user. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- An active tour may be manually reassigned. 

- Start Time and End Time are mandatory tour timing fields. 

- Allow custom recurrence/assignment patterns including the source weekly/monthly options and additional custom scheduling needed by RFI. 

- Grace-period notification time may be randomized within the configured grace window to avoid a fixed predictable alert point. 

- Tour statuses: In Progress = started and active; Completed = finished; Late = started/completed but started after allowed start; Missed = scheduled and not started after its allowed time; Interrupted = started but paused because a High-priority task takes control; Cancelled/Deactivated = manually stopped/deactivated. 

- When the priority task finishes, an Interrupted tour resumes from its existing progress. 

- Tour creation provides a toggle controlling whether the guard must explicitly select Finish after required checkpoints are completed. 

- Deleting/deactivating a tour session does not modify existing checkpoint logs, linked reports, or historical records; require confirmation popup but no deletion reason. 

# **33.4 Checkpoint Issues** 

# **Final Confirmed Logic** 

- Guard may report damaged/missing/inaccessible/GPS checkpoint issues and provide the available issue inputs. 

- Issue submission sends a notification to Admin containing the provided inputs. 

- The guard may continue the tour. Manual scan may be used according to the tour/checkpoint configuration. 

- Do not automatically deactivate the checkpoint or create a maintenance workflow unless separately configured through an approved Automation/Task rule. 

# **34. Scheduling - Development Logic** 

# **34.1 Schedule Setup** 

# **Final Confirmed Logic** 

- Admin creates a Schedule using the confirmed Name, default/custom fields, Jobs, View Type, Layout Type, shift-card fields, and Users. 

- Admin may keep the Schedule in Draft before final submission. 

- Final Schedule submission automatically publishes the Schedule; no separate approval workflow is required. 

- Each site has its own Schedule/Shift context; a shift cannot belong to multiple sites. 

- View Type options remain User and Job. 

# **34.2 Schedule View** 

# **Final Confirmed Logic** 

- Provide Day, Week, Month, View by User, View by Job, and List View plus the source-listed display toggles/actions. 

- Use Connecteam-style direct manipulation where practical: duplicate/copy a shift by drag-and-drop or dragging/copying to another day. 

- A copied shift is a separate day-specific shift record after duplication. 

- Cross Schedule Events and Daily Health are Later Phase; keep out of current implementation unless required only as placeholder labels. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **34.3 Shift Creation and Editing** 

# **Final Confirmed Logic** 

- Current phase supports one employee per shift. Multiple employees per shift is Later Phase. 

- A shift may be temporarily unassigned only while it remains Draft; a published/active shift requires one eligible employee. 

- When choosing an employee, show only eligible employees: exclude inactive, terminated, unavailable, site-banned, unqualified, already-booked for the same date/time, or otherwise invalid employees. 

- One employee may only be assigned to one shift for the same overlapping date/time. One shift may only have one Job Type. 

- If a conflict nevertheless occurs due to concurrent changes, block save and show an alert. 

- Any published-shift change (date, time, site, Job Type, employee, note, tag, task or other shift field) sends the affected employee a notification and preserves the previous version in history. 

- Shift tasks may be added or changed after publishing. 

- Editing works on the specific day shift. Recurrence-series delete/edit controls are not required; duplication/copying is the primary repeat mechanism. 

- Cross-midnight shift belongs to the calendar date on which it starts. All shift hours remain associated with that start-date shift record for attendance/reporting context, while payroll applies the assigned Pay Rules. 

- Shift acceptance/rejection, open shifts, claiming, swapping and replacement remain Later Phase. 

# **35. Time Clock, Attendance and Work Exceptions - Development Logic** 

# **35.1 Mobile Clock-In/Out** 

# **Final Confirmed Logic** 

- Clock-in/out originates from the Guard Mobile App. 

- Use polygon geo-fencing and support multiple geo-fence polygons/coordinate areas for a site. 

- Clock-in is blocked when GPS permission is denied, GPS is off, guard is outside all permitted site geo-fences, or guard has no assignment to that site. 

- Use the application/device standard GPS-accuracy validation threshold; keep the threshold centrally configurable rather than hard-coding a business value. 

- Clock-out outside the permitted geo-fence is blocked under the enabled restriction. 

- Remote Admin clock-out does not bypass the confirmed clock-out restrictions. 

- If a guard leaves the site before clocking out, create a ticket/exception for Admin review. 

- Manual Admin clock actions should follow the same Connecteam-style administrative time-clock adjustment flow and must be restricted to authorized Admins for that site. 

# **35.2 Timesheets and Manual Changes** 

# **Final Confirmed Logic** 

- Timesheets require approval: Employee approves first, then Supervisor confirms. 

- Payroll calculation uses only approved timesheet/pay-period data according to the employee’s assigned payroll policy/pay period. 

- Work exceptions must be resolved before timesheet approval. 

- Admin may edit time records; a reason is mandatory and the employee is notified. 

- A manual time edit does not immediately recalculate/finalize payroll until the approved payroll calculation process runs. 

- Only Super Admin may reopen/edit a closed payroll-period time record. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Always preserve original clock event, GPS, device data, old value, new value, changed by, change date/time, and reason. 

- Break logic/penalties are Later Phase and must not be implemented beyond retaining existing source fields/placeholders. 

# **35.3 Time Clock Pages** 

# **Final Confirmed Logic** 

- Use attendance states Clocked In, Running Late, Clocked Out, Need to Clock Out, and On Time Off. 

- Mark Absent when the configured late/missed threshold is reached without clock-in. 

- Offline clock-in/out synchronization remains Later Phase; when later enabled, Admin screens must support delayed synchronized events. 

# **36. Reports and Incidents - Development Logic** 

# **36.1 Reports versus Forms** 

# **Required Logic** 

- Forms are manually built and assigned for employee completion. 

- Reports are generated from Custom Report settings, Custom Report Form, Categories, Incident Categories and Footer. 

- Do not merge form submissions and operational reports into one record type. 

# **36.2 Report Listing** 

# **Required Logic** 

- List ID, Type, Flags, Date, Reported By, Account, Status, Printable PDF, Email Report, View and Remove. 

- Apply Active, All Templates, Archived, Incident Flags Only, Status, From-To Date and Global Search filters. 

- Use source statuses New Report, Approved, Verification, Job Pending and Archived unless a custom report setting determines approval behavior. 

- Report numbering is site-specific; the exact display format remains configurable/not otherwise invented. 

# **36.3 Approval and Publication** 

# **Final Confirmed Logic** 

- Custom Report setup controls whether Approve Automatically is enabled. 

- When manual approval is required, only the Site Supervisor for the applicable site or Super Admin approves the edited/submitted report. 

- A submitted report may be manually edited by an authorized Admin/Supervisor and then sent for approval; every edit must preserve a version of the prior report. 

- Admin may add notes and create an amended/replacement version while retaining the original version history. 

- The exact TrackTik-style status semantics, flag behavior, Client Portal publication behavior and custom-report runtime logic remain to be confirmed in the dedicated report-logic workshop; do not invent them. 

# **36.4 Custom Report Builder** 

# **Final Confirmed Logic** 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Follow TrackTik-style separation between Custom Report configuration and generated Report listing. 

- Create Report fields: Name, Information/Instruction, Category, Status (Active/Inactive/Archive), Assign To (On Demand/Do Not Show by Default, All Accounts, Choose Site), For Admin Only (Yes/No), Approve Automatically, Notify Alert Queue, Exclude from Shift Report, and Report Tag. 

- Custom Report listing columns: Name, Category, View By, Count, and Actions (Edit, Field Setup). 

- Edit updates report-level settings. Field Setup opens the custom field builder for that report. 

- Report Category values come from Custom Report Categories. Incident Categories and Report Footers remain separate configuration areas. 

- Report numbering is required and must be site-specific; exact prefix/sequence/reset format remains to be finalized with the custom-report runtime logic. 

- Remove Report must support TrackTik-style record-removal options as configured; preserve versions/history where applicable rather than silently losing auditability. 

- The detailed logic for report flags, Verification/Job Pending status semantics, incident category Level/Parent/Default Group/Sub Form, and footer precedence is still explicitly pending confirmation. 

# **37. Forms - Development Logic** 

# **37.1 Form Builder and Assignment** 

# **Final Confirmed Logic** 

- Admin and Supervisor may create/assign forms within their permitted site/module scope. 

- A form may be assigned to multiple employees. 

- Form creator defines site behavior, due date, repeat submission, draft/edit capability, and approval requirement as configurable form settings. 

- Deleting/deactivating a form template must preserve historical submissions. 

- Send assignment notification to assigned employees. 

# **37.2 Form Submission** 

# **Final Confirmed Logic** 

- Submission behavior follows the settings saved on the form template. 

- When drafts are enabled, save partial data without treating it as submitted. When edit-after-submit is enabled, retain the latest submitted content according to the configured form behavior. 

- Historical submissions remain accessible even if the form template is later archived/deleted. 

# **38. Tasks, Dispatch and Job List - Development Logic** 

# **38.1 Task Types and Assignment** 

# **Final Confirmed Logic** 

- Use one Task feature with Priority values High, Medium and Low rather than separate Dispatch/Quick/Recurring business workflows. 

- High Priority: when assigned, immediately locks/blocks the assigned guard’s normal app workflow and displays the open priority task even if a tour is in progress. The active tour becomes Interrupted until the High task is completed. 

- Medium Priority: if a tour is currently in progress, allow the guard to finish that tour, then block normal workflow until the Medium task is completed. 

- Low Priority: task may be completed during the shift but all Low tasks assigned to the guard must be completed before clock-out is allowed. 

- No assigned task may remain incomplete when the guard completes the shift/clock-out, subject to the priority rules above. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Task assignment ultimately resolves to one or more specific users. Admin may select all or specific users from a Department/Group, but the saved task assignments are user assignments. 

- Client may request/create a task by Job Type/Position and optionally select a specific user. If only Job Type is selected, Admin assigns the actual guard. 

- Do not allow an unresolved task to remain assigned only to a non-person entity. 

# **38.2 Listings and Filters** 

# **Final Confirmed Logic** 

- Task statuses are: Open = created but not assigned; Assigned = assigned to user; Pending = assigned/scheduled but not started by its defined time; In Progress = user marked Started; Completed = user marked Finished; Overdue = due time passed before completion; Archived = task intentionally archived and no longer requires completion. 

- Task due date/time is defined during task creation when required. 

- Task becomes Overdue when the configured due time passes without completion. 

- A task may be reassigned to another eligible user. 

- Recurring task generation is not required in the current phase. 

# **38.3 Escalation** 

# **Final Confirmed Logic** 

- When a task passes its due time, automatically notify Admin that the task is overdue. 

- High/Medium/Low priority blocking behavior is enforced in the Guard App as defined in Task Types and Assignment. 

- Use Automation duplicate-suppression rules to avoid repeated duplicate overdue alerts for the same task/event window. 

# **38.4 Job List** 

# **Final Confirmed Logic** 

- Do not implement a separate Job List module in the current phase. 

- Job Type/Position is managed under Position/Job Type configuration. Operational Job/Task listing is the Task List. 

- If custom fields are needed when creating a Position/Job Type, use the Position/Job Type custom field capability instead of a separate Job List. 

# **39. Communications - Development Logic** 

# **39.1 Combined Module** 

# **Final Confirmed Logic** 

- Provide New Chat, New Group, and New Broadcast. 

- Admin can view private employee chats. 

- Chat Settings controls whether message edit/delete, chat export, and attachments are enabled. 

- Guards may communicate directly only with other guards assigned to the same site. 

- Client users must not communicate directly with guards. 

- Broadcast targets Job Type/Position; all selected/eligible users under that Job Type receive the broadcast. 

- Broadcast settings may allow combining recipient types and selected individuals as configured. 

- Use MM/DD/YYYY for dates in Communications. 

- Communication experience should function as a chat-style message interface where applicable. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **39.2 Updates** 

# **Final Confirmed Logic** 

- Use Broadcast as the primary Admin-to-group message mechanism by Job Type/Position. 

- Do not create an independent complex Updates workflow beyond the source-listed Updates listing/create capability unless separately required. 

# **39.3 Directory** 

# **Final Confirmed Logic** 

- Tag Users means associate/select users based on Job Type for communication/task actions. 

- Directory actions remain Notify, Send Chat Message, Create Group Chat with Selected, Create Task, and Export. 

# **39.4 Pending Communication Rules** 

# **Final Confirmed Logic** 

- The previously pending rules are resolved as follows: Admin private-chat visibility is allowed; edit/delete/export/attachments are controlled by Chat Settings; guards may message same-site guards; clients cannot directly message guards. 

- No additional client-to-guard chat workflow is included. 

# **40. Security Operations - Development Logic** 

# **Final Confirmed Logic** 

- Do not build a separate Security Operations dashboard/landing area. 

- Security Operations navigation entries act as shortcuts/contextual access to the shared Schedules, Time Clock, Forms, Tasks, Post Orders/SOPs/Manuals, and Company Vehicle Documentation modules. 

- Where the source requires a Site Listing before entering a feature, use the existing site-listing fields already defined in Part I and open the shared module filtered to that site. 

# **41. Documents, Policies and Team Resources - Development Logic** 

# **41.1 Confirmed Document Functions** 

# **Required Logic** 

- Company Policies supports PDF upload, listing and download. 

- Post Orders, SOPs and Manuals support Add New, Active/Archived listing and Export. 

- Workplace Notices and Posters are source-listed but remain Later Phase under Team Resources. 

- Team Resources Documents/Create Pack is source-listed but remains Later Phase. 

# **41.2 Pending Team Resource Functions** 

# **Final Confirmed Logic** 

- Team Member Manual, Rewards/Tokens, Benefits, Celebrations, Disciplinary Reports, HR Complaint Form, Hiring, Paid Policies, Insights, Workplace Notices, Text Messages and Document Packs remain Later Phase. 

- Do not implement detailed HR workflows in the current phase. 

# **42. Training - Development Logic** 

# **Final Confirmed Logic** 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Implement the source Quizzes and RFI Academy modules with Add New, Active/Archived listing, Search, Filter and Export. 

- RFI Academy item fields: Title, Description, Content Type (Document, Link or Video Link), Content/Attachment/URL, Assigned Users/Departments/Job Types, Status (Active/Archived), and optional linked Quiz. 

- Quiz fields: Title, Description, assigned audience, Active/Archived status, Passing Score, Allowed Attempts, and Questions. 

- Version-one question types: Single Choice, Multiple Choice and True/False. 

- On submission, calculate score; mark Passed when score meets Passing Score, otherwise Failed while attempts remain. 

- Track employee assignment, completion status, score, completion date and attempts. Certificates/expiry/automatic skill linkage are not required unless a Skill record is separately configured/uploaded. 

# **43. Vehicles - Development Logic** 

# **Final Confirmed Logic** 

- Create Vehicle fields: Ownership (Purchased/Leased), Status, Vehicle ID, Make, Model, Year, Acquisition/Lease Date, License Plate, License Plate Country, License Plate State, VIN Number, Color, Comments, and Picture. 

- License refers to License Plate. 

- Ownership is a required dropdown value Purchased or Leased. 

- Edit Vehicle supports updating fields and adding Notes. 

- Do not implement vehicle site assignment, historical assignment, maintenance, fuel, mileage, GPS, document-type taxonomy, or document-expiration logic in the current phase. 

- Company Vehicle Documentation may store/upload general vehicle files where required by the source, without additional document-type/expiry workflow. 

# **44. Automations and Notifications - Development Logic** 

# **44.1 Builder** 

# **Final Confirmed Logic** 

- Provide custom event-based Automation builder assignable to one site or multiple selected sites. 

- Do not use a generic condition-operator language (equals/greater-than/etc.) in version one; each event exposes only the configuration fields relevant to that event. 

- Version-one actions: In-App Notification, Push Notification, SMS, and Create Task. 

- Event triggers are the approved operational events available in the module (for example clock, inactivity, tour/checkpoint, task and other source-listed notification events). 

- No acknowledgment escalation is required. 

# **44.2 Execution Logic** 

# **Final Confirmed Logic** 

- When an event occurs, execute active Automation rules assigned to the event’s site(s). 

- If the same event type for the same applicable event context/time is reported within 30 minutes of a previous matching event notification/ticket, treat it as a duplicate. 

- For a detected duplicate, inform the event creator that a matching event/ticket was created in the last 30 minutes and provide Ignore and Continue or Cancel. 

- If Continue is chosen, execute the new event; if Cancel is chosen, suppress it. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- For failed SMS/push/task/action execution, create an in-app notification to Super Admin describing the failed action/event. 

- Record automation execution outcome for troubleshooting/audit. 

# **45. Payroll and Back Office - Development Logic** 

# **Final Confirmed Logic** 

- Implement Connecteam-style configurable Company Policies for Scheduling Rules, Overtime & Pay Rules, and Working Hours. 

- Scheduling Rule policy fields include Policy Name and configurable limits for maximum hours per week/day, maximum shifts per week/day, minimum shifts per week, and minimum gap between shifts. 

- Manage Pay Rules: Admin adds Rule Name, Code, Rule Type (Overtime, Additional Rate, Flat Pay, Premium, Regular), payment multiplier/rate, and conditions. 

- Pay Rule conditions may include Daily, Weekly, Partial Day, Consecutive Day and Holiday. Daily rule supports Start After X hours/day and optional Job Type restriction. 

- List created Pay Rules and allow drag-and-drop priority ordering. 

- When overlapping rules produce the same rate, use Admin-defined priority order. When resulting rates differ, apply the highest applicable rate automatically. 

- Admin creates a Policy with Title and selected Pay Rules. Policy actions: Add User, Duplicate, Delete, Edit and Set as Default. 

- Default Policy applies to users covered by the default configuration; specific users may be manually assigned another Policy. 

- Working Hours stores weekday working-hour ranges. 

- Overtime may be Daily or Weekly according to the assigned rule. Rules are assigned employee-wise through Policy assignment. 

- Holiday, paid-break and cross-midnight treatment follows the employee’s assigned Pay Rules/Policy. Overtime calculation is applied after premiums as confirmed. 

- Payroll is auto-calculated from approved shift/timesheet hours using the employee’s assigned Policy. No separate payroll status workflow is required. 

- Timesheets must be employee-approved and supervisor-confirmed before payroll calculation. 

- Exported payroll is based on approved shift hours; do not implement a separate post-export editing/version workflow in the current phase. 

- Tax calculation, bank/payment processing, net-pay calculation and tax-payment functionality are not required. 

# **46. Settings and Configuration - Development Logic** 

# **46.1 General Configuration** 

# **Final Confirmed Logic** 

- Settings must contain only configuration required by implemented modules: Company Name/Address and locale/date format; Roles & Permissions; Password Policy and Sign-In Log; Employee Types; Departments; Account Types; Job Type/Position custom fields; Scheduling rules; Time Clock/Geo-Fence rules; Notifications and Automation defaults; Chat Settings; Skills/Categories; Report/Form configuration; Payroll Policies/Pay Rules; and Data Retention. 

- General categories are Admin-created/custom named categories where a module requires category configuration; do not hard-code an undefined set of 13 categories. 

- Remove Devices and License from the current phase. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **46.2 Operation Configuration** 

# **Final Confirmed Logic** 

- Retain Report Templates/Custom Reports, Incident Categories, Job/Service Type, site operational configuration and applicable notification settings. 

- Remove Zone Templates, Devices and License, Calendar Groups and Back Office Defaults from the current phase. 

- Special Calendar/Holiday dates should be managed as part of Payroll Holiday rules/policies rather than a separate undefined calendar-group workflow. 

- Region Message Board does not require a separate workflow unless later requested; use the shared Message Board with site/permission scope. 

# **46.3 Data Retention** 

# **Final Confirmed Logic** 

- Allow Super Admin to configure retention by data category for GPS/location history, reports, media, chat, timesheets, audit logs, panic events, tours and checkpoints. 

- When retention expires, archive/remove data according to the configured category while preserving required referential/audit records needed for historical integrity. 

- Do not implement legal-hold or anonymization workflows in the current phase unless separately requested. 

# **47. Supervisor Portal Logic** 

# **Final Confirmed Logic** 

- Supervisor uses the same web application as Admin and sees only granted modules and assignedsite data. 

- Supervisor may approve/confirm timesheets for employees in permitted sites and may approve site reports when the report requires manual site approval. 

- Supervisor can create/assign forms and operational tasks within permitted sites according to module access. 

- Financial data remains visible only where specifically permitted. 

- No separate Dispatcher role or Supervisor-only application is required. 

# **48. Pending Development Decisions - Do Not Implement by Assumption** 

# **Final Confirmed Logic** 

- Later Phase / still pending: shift acceptance/rejection, open shifts, shift claiming/swapping/replacement; detailed Contract module; Break Management calculations/penalties; offline Guard attendance synchronization; Client Portal details beyond confirmed minimum site access; Team Resources/HR modules; advanced certificate automation; data migration; accounting/payroll-provider integration; Remote Speak; Runsheet Patrol Events; Daily Health; Cross Schedule Events; Financial by Shift; Recordings; detailed System Exceptions; Pivot Chart View/Edit. 

- Custom Report runtime logic still requires a dedicated confirmation for exact TrackTik-style report statuses, flags, incident-category runtime behavior, Client Portal publication, report-number format and footer precedence. 

- Do not create unsupported workflows for Later Phase items. 

|**Area**|**Pending Decisions / Development Hold**|
|---|---|



AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

||RFI Admin/Supervisor Portal - Developer Functional Specifcation|
|---|---|
|Scheduling|Shift acceptance/rejection, open shifts, claiming,<br>swaps and replacement workfow only. Cross-<br>midnight ownership is resolved: shift belongs to<br>start date.|
|Site/Client|Contracts and remaining Client Portal<br>actions/details. Shared-site minimum visibility and<br>site-closure behavior are resolved.|
|Mobile/Attendance|Ofline clock-in/out, synchronization,<br>multiple/shared devices, device approval, GPS<br>frequency,Watch Mode, guard visibility.|
|Communications|No current-scope communication logic remains<br>pending; later expansion may add further Client<br>communication if requested.<br>|
|HR/Team Resources|Hiring depth, benefts, rewards/tokens,<br>celebrations, complaints and disciplinary<br>workfow.|
|Training|No core current-phase training logic pending;<br>certifcates/expiry/automatic skill linkage are<br>outside current scope unless confgured through<br>Skills.|
|Finance|Invoice generation and accounting/payroll-provider<br>integrations only. Payroll formulas/policy logic are<br>resolved.|
|Migration|TrackTik/Connecteam migration, historical scope,<br>parallel operation and cutover.|
|Undefned source features|Later Phase: Remote Speak, Runsheet Patrol<br>Events, Daily Health, Cross Schedule Events,<br>Financial by Shift, Recordings, detailed System<br>Exceptions and Pivot Chart View/Edit.<br>Devices/License, Calendar Groups, Back Ofice<br>Defaults and separate Job List are excluded.<br>Journal Entries is currentphase.|



# **49. Developer Acceptance Checklist** 

# **Final Business Logic Authority** 

- All implemented modules must follow the resolved rules in Part II. Earlier generic or contradictory statements are superseded by these final confirmed rules. 

- Where the final answered register says Follow Connecteam/Follow TrackTik, implement the workflow described in this document and preserve only the named source feature; do not add unrelated vendor features. 

- Later Phase items must not block current development and must not be silently implemented. 

# **For Every Screen** 

- All Part I fields, filters, columns and actions applicable to the screen are implemented. 

- No unapproved mandatory field, workflow, status, KPI or role is introduced. 

- Assigned-site and module permissions are enforced server-side and in the UI. 

- Validation errors are clear and retain user-entered data. 

- Exports match active filters. 

- Audit entries are created for applicable actions. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

- Pending items are disabled, hidden or clearly marked according to product decision; they are not guessed. 

- Linked/shared modules open in the correct employee, client or site context. 

- Every count card matches its filtered detail listing. 

- Every destructive/access-changing action requires confirmation and preserves required history. 

_End of Developer Functional Specification_ 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **36. Source Coverage Verification Addendum** 

This addendum records the final line-by-line coverage check against the uploaded ALEXIOS FEATURE LIST for the Admin/Supervisor Web App and all subsequent RFI clarifications. It does not introduce new functionality. 

# **36.1 Employee Security and Patrol - Metrics** 

SOURCE-LISTED / EXCLUDED BY RFI: The original feature list names Employee → Security and Patrol → Metrics, but RFI later confirmed Metrics is not needed. Do not implement a Metrics page, calculations, filters, charts, KPIs or actions in the current phase. 

# **36.2 Confirmed Source Coverage** 

- Authentication and role-based redirection - Represents the authentication and role-based redirection value or option required by this section. 

- Dashboard, all platform-statistic cards, Activity Log, Attendance, Scheduled Tours, Task Dispatch, Map, Global Search and Send an Update 

- Dashboard submodules: Report Settings, Vehicle Management, Schedule redirect, Company Activity Journal and System Exceptions 

- Employee creation, listing, profile sections, Security and Patrol, Reports, Summary Reports, Tours, Schedules, Time Off, Policies, User Settings, Admins, Departments and Skills 

- Clients/Sites, site users, contacts, assigned employees, Job Types/Positions, schedules, reports, tours, checkpoints, locations, geo-fencing, notifications and site settings 

- Settings: General, Operation and Back Office configurations - Uses general, operation and back office configurations as the selected settings option. 

- Help, Chat, Groups/Segments, Automations, Security Operations, Communications, Team Resources, Training and Sign Out 

- All original filters, listing columns, exports and actions applicable to the Admin/Supervisor portal 

- All RFI-confirmed logic changes, exclusions and Pending Discussion items - Represents the all rficonfirmed logic changes, exclusions and pending discussion items value or option required by this section. 

# **36.3 Scope Boundary** 

The uploaded source also contains Guard Mobile App and Client Portal sections. They were intentionally not expanded in this Admin/Supervisor Portal specification. Their shared Admin configuration and accessmanagement touchpoints are included where applicable, while their standalone screens and workflows remain separate deliverables. 

# **36.4 Development Control** 

- A source-listed item must not be removed because it is duplicated elsewhere; it may link to a shared module. 

- An undefined source-listed heading must remain marked Pending Definition rather than being assigned invented fields or logic. 

- Items explicitly marked Pending Discussion must not be developed based on assumptions. 

- Items explicitly excluded by RFI must not be implemented in the current phase. 

- Any future functional change must be documented as an approved change request. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

# **50. Final Reconciliation Verification** 

This section records the second reconciliation pass performed against the original ALEXIOS feature list, the answered Logic Clarification Register, and this final developer specification. 

• All original Admin/Supervisor modules, sections, subsections, source-listed fields, filters, table columns and actions remain represented unless RFI explicitly excluded or moved them to Later Phase. 

• Resolved clarifications now override old Pending labels for Payroll, Communications, Training, Groups, Automations, Site Closure, shared-site client visibility, attendance statuses and cross-midnight shifts. 

• The Part I traceability/status tables have been synchronized with the detailed Part II business logic. 

• Current-phase Automation actions are limited to In-App Notification, Push Notification, SMS and Create Task; 30-minute duplicate suppression is confirmed. 

• Separate Job List, Devices and License, Calendar Groups, Back Office Defaults, tax/net-pay/bank processing and Pivot Chart current-phase behavior are excluded as clarified. 

• Team Resources/HR detailed workflows remain Later Phase even where source-listed page labels are preserved. 

• The only material functional area still explicitly requiring business confirmation is the detailed TrackTikstyle Custom Report runtime behavior: exact statuses, flags, incident-category runtime semantics, Client Portal publication, report-number format and footer precedence. 

• Other Later Phase items remain intentionally unimplemented and are not considered missing currentscope functionality. 

# **Final Clarification Rule** 

Where a point is marked Pending Discussion, the developer must create no assumed business logic beyond preserving the named placeholder or navigation location. Where a field, filter, column or action is explained, the explanation defines its intended display or behavior but does not expand scope beyond the source requirement. 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

RFI Admin/Supervisor Portal - Developer Functional Specification 

AppZoro Technologies Inc. | Confidential | RFI Admin/Supervisor Portal - Developer Functional Specification 

