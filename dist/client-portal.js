/*
 * Client Portal — a full-screen overlay launched from Clients & Sites -> Overview.
 *
 * Entry:  a "Client Portal" button beside the client name on the Overview header.
 * Shell:  own top bar, user menu, hash-free internal router, Logout.
 * Routes: login | forgot | setpw | dashboard | tours | tour | activity |
 *         reports | report | tasks | map | tickets | profile
 *
 * The dashboard mirrors the admin's Security Operations detail page, scoped to a
 * single site. Data is taken from the app's own records where they exist (tours,
 * guards, activity, reports, tasks) and mocked in the same conventions where the
 * build has none (portal sign-in, inactive-mobile tickets).
 *
 * Sign-in is a prototype: nothing is authenticated, transmitted or stored as a
 * credential, and no email is sent. Tasks the client creates persist to
 * localStorage so the demo holds together across reloads.
 */
(function () {
    'use strict';

    var TASK_KEY = 'alexios.clientPortal.tasks.v1';

    // ------------------------------------------------------------------- data

    var SITE = {
        id: 'CLT-001',
        name: 'Downtown Financial Center',
        area: 'Meridian Tower · Floors 1–22',
        contact: 'Robert Hayes',
        contactRole: 'Operations Manager',
        email: 'r.hayes@dfc.com',
        phone: '+1 (555) 201-0001',
        accountType: 'Regular Client',
        status: 'Active',
        timezone: 'America/Los_Angeles',
        website: 'www.dfc.com',
        address: '1234 Main Street, Suite 400',
        city: 'Los Angeles, CA',
        country: 'USA',
        accountRep: 'James Morrison',
        salesRep: 'Linda Foster',
        added: 'Jan 12, 2024',
        manager: 'Sarah Jenkins'
    };

    var RINGS = [
        { label: 'Tours', value: 7, pct: 76 },
        { label: 'Reports', value: 11, pct: 65 },
        { label: 'Tasks', value: 18, pct: 82 }
    ];

    // Active = started and in progress.
    var TOURS = [
        {
            id: 'TOUR-A', name: 'Tower B — Floors 4-22', guard: 'J. Rivera', badge: 'S-041',
            scheduled: '06:30-08:30', elapsed: '1h 13m', done: 4, total: 12,
            behind: false, started: '06:30', route: 'Interior stairwells, lift lobbies, floor landings',
            steps: [
                { name: 'Floor 4 — lift lobby', time: '06:34', done: true },
                { name: 'Floor 7 — stairwell B', time: '06:51', done: true },
                { name: 'Floor 11 — plant room door', time: '07:12', done: true },
                { name: 'Floor 14 — lift lobby', time: '07:38', done: true },
                { name: 'Floor 17 — stairwell B', time: '—', done: false },
                { name: 'Floor 22 — roof access door', time: '—', done: false }
            ]
        },
        {
            id: 'TOUR-B', name: 'Parking Structure P1', guard: 'L. Santos', badge: 'S-024',
            scheduled: '06:45-08:15', elapsed: '1h 22m', done: 3, total: 10,
            behind: true, started: '06:45', route: 'Parking levels P1–P3, vehicle ramps, stair cores',
            steps: [
                { name: 'P1 — north ramp', time: '06:49', done: true },
                { name: 'P1 — stair core A', time: '07:06', done: true },
                { name: 'P2 — south ramp', time: '07:33', done: true },
                { name: 'P2 — stair core B', time: '—', done: false },
                { name: 'P3 — vehicle gate', time: '—', done: false }
            ]
        },
        {
            id: 'TOUR-C', name: 'Perimeter & Loading Dock', guard: 'M. Chen', badge: 'S-019',
            scheduled: '07:00-08:00', elapsed: '52m', done: 6, total: 8,
            behind: false, started: '07:00', route: 'External perimeter, dock doors, bin store',
            steps: [
                { name: 'East perimeter gate', time: '07:04', done: true },
                { name: 'Loading dock door 4', time: '07:19', done: true },
                { name: 'Bin store', time: '07:31', done: true },
                { name: 'West perimeter fence', time: '07:44', done: true },
                { name: 'Dock office', time: '07:50', done: true },
                { name: 'Gatehouse', time: '07:55', done: true },
                { name: 'South gate', time: '—', done: false }
            ]
        },
        {
            id: 'TOUR-D', name: 'Levels 3-5 Interior Sweep', guard: 'A. Okafor', badge: 'S-033',
            scheduled: '07:15-08:45', elapsed: '37m', done: 2, total: 9,
            behind: false, started: '07:15', route: 'Levels 3–5 tenant floors and risers',
            steps: [
                { name: 'Level 3 — riser cupboard', time: '07:22', done: true },
                { name: 'Level 4 — tenant lobby', time: '07:41', done: true },
                { name: 'Level 5 — riser cupboard', time: '—', done: false }
            ]
        },
        {
            id: 'TOUR-E', name: 'Control Room Camera Sweep', guard: 'D. Patel', badge: 'S-062',
            scheduled: '07:30-08:30', elapsed: '22m', done: 1, total: 6,
            behind: false, started: '07:30', route: 'CCTV positions, camera health, recording status',
            steps: [
                { name: 'Camera bank 1–12', time: '07:38', done: true },
                { name: 'Camera bank 13–24', time: '—', done: false }
            ]
        }
    ];

    var ACTIVITY = [
        { time: '07:43', text: 'Tour A Completed', actor: 'J. Rivera', kind: 'Tour', alert: false },
        { time: '07:38', text: 'Incident Report Submitted', actor: 'M. Chen', kind: 'Report', alert: false },
        { time: '07:31', text: 'Access Denied — Gate B', actor: 'System', kind: 'System', alert: false },
        { time: '07:24', text: 'Task #T-09 Marked Done', actor: 'A. Okafor', kind: 'Task', alert: false },
        { time: '07:18', text: 'Tour B Behind Schedule', actor: 'L. Santos', kind: 'Tour', alert: true },
        { time: '07:11', text: 'Motion — Roof Access', actor: 'System', kind: 'System', alert: true },
        { time: '07:02', text: 'Clock-in — Gate B', actor: 'T. Williams', kind: 'Clock', alert: false },
        { time: '06:58', text: 'Hourly Log Submitted', actor: 'J. Rivera', kind: 'Report', alert: false },
        { time: '06:47', text: 'Task #T-08 Marked Done', actor: 'L. Santos', kind: 'Task', alert: false },
        { time: '06:32', text: 'Clock-in — Lobby / L1', actor: 'J. Rivera', kind: 'Clock', alert: false },
        { time: '06:30', text: 'Clock-in — Perimeter', actor: 'M. Chen', kind: 'Clock', alert: false },
        { time: '06:28', text: 'Clock-in — Levels 3-5', actor: 'A. Okafor', kind: 'Clock', alert: false },
        { time: '06:15', text: 'Clock-out — Night Shift', actor: 'K. Jones', kind: 'Clock', alert: false },
        { time: '06:12', text: 'Shift Summary Submitted', actor: 'K. Jones', kind: 'Report', alert: false },
        { time: '06:05', text: 'Tour Night-C Completed', actor: 'R. Smith', kind: 'Tour', alert: false }
    ];

    var REPORT_TYPES = [
        { name: 'Hourly Log', desc: 'Routine patrol tracking & perimeter updates' },
        { name: 'Incident Report', desc: 'Security breaches, medical emergencies, damage' },
        { name: 'Maintenance Log', desc: 'Facility faults, hardware, or lock failures' },
        { name: 'Shift Summary', desc: 'Handover summaries & pass-down notes' }
    ];

    var REPORTS = [
        {
            id: 'RPT-1048', type: 'Incident Report', date: 'Sep 10, 2026', time: '07:38',
            by: 'M. Chen', badge: 'S-019', approval: 'Approved', approver: 'Sarah Jenkins',
            summary: 'Unscheduled entry attempt logged at East Perimeter Gate 2. Individual left the area before contact was made. Gate secured and locked; access log exported for review.',
            detail: 'At 07:31 the access control panel recorded a denied badge read at East Perimeter Gate 2, followed by a second attempt 40 seconds later. Patrol attended at 07:35 and found the gate closed but the latch not fully engaged. No individual was present on arrival. The gate was secured manually and confirmed locked at 07:37. Access logs for the 07:00–07:40 window were exported and attached to this report for supervisor review. Recommend a hardware check on the latch mechanism.'
        },
        {
            id: 'RPT-1047', type: 'Hourly Log', date: 'Sep 10, 2026', time: '06:58',
            by: 'J. Rivera', badge: 'S-041', approval: 'No approval required', approver: '',
            summary: 'Routine hourly patrol of Tower B floors 4-22. All access points secure, no exceptions logged.',
            detail: 'Interior patrol of Tower B completed between 06:30 and 06:55. All lift lobbies checked on floors 4, 7, 11 and 14. Stairwell B doors closed and latched throughout. Plant room door on floor 11 secure. No unauthorised access, no housekeeping issues, no faults observed. Loading dock door 4 checked physically in line with the standing instruction on the faulty contact sensor; found closed and latched.'
        },
        {
            id: 'RPT-1046', type: 'Maintenance Log', date: 'Sep 10, 2026', time: '06:41',
            by: 'A. Okafor', badge: 'S-033', approval: 'Approved', approver: 'Sarah Jenkins',
            summary: 'Loading dock door 4 contact sensor still reporting intermittently. Contractor call remains open.',
            detail: 'Door 4 contact sensor continues to report an intermittent open state while the door is physically closed and latched. Behaviour matches the fault first logged on Sep 03. The standing instruction to verify this door by hand on every tour remains in force. Contractor reference DC-4471 is open with the facilities team; no attendance date confirmed at the time of writing.'
        },
        {
            id: 'RPT-1045', type: 'Shift Summary', date: 'Sep 10, 2026', time: '06:12',
            by: 'K. Jones', badge: 'S-078', approval: 'No approval required', approver: '',
            summary: 'Night shift handover. Two tours completed, one maintenance item carried forward.',
            detail: 'Night shift ran 22:00–06:00 with full coverage. Tours Night-B and Night-C completed on schedule with all checkpoints scanned. One maintenance item carried forward: loading dock door 4 sensor fault. No incidents, no access denials, no visitor exceptions. Keys returned to the guard office key box and signed in at 06:08. Radios returned to the charging bank.'
        },
        {
            id: 'RPT-1042', type: 'Hourly Log', date: 'Sep 09, 2026', time: '21:04',
            by: 'R. Smith', badge: 'S-089', approval: 'No approval required', approver: '',
            summary: 'Evening perimeter patrol. All clear.',
            detail: 'External perimeter walked at 20:45. Fence line intact, no damage observed. Vehicle gate closed and locked. Bin store secure. Car park lighting fully operational. No exceptions.'
        },
        {
            id: 'RPT-1039', type: 'Incident Report', date: 'Sep 09, 2026', time: '14:22',
            by: 'L. Santos', badge: 'S-024', approval: 'Approved', approver: 'James Morrison',
            summary: 'Vehicle in a reserved bay on P1. Plate logged, tenant notified, vehicle removed.',
            detail: 'A vehicle was found parked in reserved bay P1-14 without a valid permit displayed. Registration was logged and photographed at 14:05. The tenant contact for bay P1-14 was notified by the control room at 14:12. The vehicle was removed by the driver at 14:19 without incident. No enforcement action was required.'
        }
    ];

    // source maps onto the portal's filter set.
    var TASKS = [
        {
            id: 'T-11', tier: 'critical', tag: 'Critical Immediate Need',
            body: 'Secure and lock East Perimeter Gate 2 immediately. Unscheduled entry attempt logged.',
            due: 'Overdue (14m)', source: 'System Generated', origin: 'Athena AI Engine',
            assignee: 'M. Chen', date: 'Sep 10, 2026'
        },
        {
            id: 'T-10', tier: 'warn', tag: 'Imminent Compliance Deadline',
            body: 'Verify and log backup generator fuel gauges and ambient room temperature values.',
            due: 'Due within 30m', source: 'Supervisor', origin: 'Supervisor Order',
            assignee: 'D. Patel', date: 'Sep 10, 2026'
        },
        {
            id: 'T-09', tier: 'routine', tag: 'Routine Compliance Task',
            body: 'Conduct visual inspection of main lobby fire extinguishers and exit egress paths.',
            due: 'Due by 23:00', source: 'System Generated', origin: 'Daily Recurring',
            assignee: 'A. Okafor', date: 'Sep 10, 2026'
        },
        {
            id: 'T-08', tier: 'routine', tag: 'Tour Checkpoint Task',
            body: 'Scan all 12 checkpoints on Tour A and photograph the roof access door on floor 22.',
            due: 'Due by 08:30', source: 'Tours', origin: 'Tour A definition',
            assignee: 'J. Rivera', date: 'Sep 10, 2026'
        },
        {
            id: 'T-07', tier: 'warn', tag: 'Client Request',
            body: 'Check the visitor register against issued badges at the main reception desk and report discrepancies.',
            due: 'Due by 12:00', source: 'Client', origin: 'Client portal',
            assignee: 'T. Williams', date: 'Sep 10, 2026'
        },
        {
            id: 'T-06', tier: 'routine', tag: 'Tour Checkpoint Task',
            body: 'Complete Parking Structure P1 sweep and log the vehicle gate condition.',
            due: 'Due by 08:15', source: 'Tours', origin: 'Tour B definition',
            assignee: 'L. Santos', date: 'Sep 10, 2026'
        }
    ];

    var TASK_FILTERS = ['All Tasks', 'System Generated', 'Tours', 'Supervisor', 'Client'];

    // Clocked-in officers with their last fetched coordinate, as map percentages.
    var OFFICERS = [
        { name: 'J. Rivera', badge: 'S-041', post: 'Lobby / L1', x: 24, y: 30, stale: false, seen: '2 min ago' },
        { name: 'M. Chen', badge: 'S-019', post: 'Perimeter', x: 68, y: 22, stale: false, seen: '1 min ago' },
        { name: 'A. Okafor', badge: 'S-033', post: 'Levels 3-5', x: 45, y: 55, stale: false, seen: 'just now' },
        { name: 'L. Santos', badge: 'S-024', post: 'Parking P1', x: 78, y: 68, stale: true, seen: '19 min ago' },
        { name: 'D. Patel', badge: 'S-062', post: 'Control Rm', x: 33, y: 74, stale: false, seen: '3 min ago' },
        { name: 'T. Williams', badge: 'S-057', post: 'Gate B', x: 58, y: 84, stale: true, seen: '24 min ago' }
    ];

    var TICKETS = [
        { date: 'Sep 10, 2026 07:34', type: 'Inactive Mobile User Alert', first: 'Luis', last: 'Santos', subject: 'No mobile activity for 19 minutes — coordinate unchanged', location: 'Parking P1', status: 'Open' },
        { date: 'Sep 10, 2026 07:29', type: 'Inactive Mobile User Alert', first: 'Tyrell', last: 'Williams', subject: 'No mobile activity for 24 minutes — coordinate unchanged', location: 'Gate B', status: 'Open' },
        { date: 'Sep 10, 2026 06:11', type: 'Inactive Mobile User Alert', first: 'Kwame', last: 'Jones', subject: 'No mobile activity for 16 minutes before clock-out', location: 'Tower B — Floor 9', status: 'Resolved' },
        { date: 'Sep 09, 2026 22:47', type: 'Inactive Mobile User Alert', first: 'Rosa', last: 'Smith', subject: 'No mobile activity for 21 minutes — coordinate unchanged', location: 'Perimeter — West fence', status: 'Resolved' },
        { date: 'Sep 09, 2026 15:02', type: 'Inactive Mobile User Alert', first: 'Dev', last: 'Patel', subject: 'GPS reported disabled for 17 minutes', location: 'Control Room', status: 'Closed' }
    ];

    // ---- client record sub-sections, mirroring Clients & Sites in the admin ----

    var PROFILE_SECTIONS = [
        'Overview', 'Post Orders', 'Positions / Job Types', 'Assigned Employees',
        'Emergency Contacts', 'Other Contacts', 'Banned Employees', 'Notifications',
        'Geofencing', 'Email Settings', 'Site Assets', 'Checklists'
    ];

    var POST_ORDERS = [
        {
            title: 'Standard Operating Procedures v2', updated: 'Aug 15, 2025',
            ref: 'PO-001', version: 'v2.0', by: 'James Morrison', file: 'PDF · 2.4 MB',
            applies: 'All positions at this site',
            summary: 'Day-to-day operating procedure for the Downtown Financial Center guard force, covering access control, patrols, visitor handling and escalation.',
            body: 'Access control: all persons entering Tower B outside core hours must present a valid badge and be logged in the visitor register. Contractors require a signed work permit before access is granted above level 3.\n\nPatrols: interior patrols run hourly across floors 4–22 with all checkpoints scanned. Perimeter patrols run twice per shift. Loading dock door 4 is to be verified by hand on every tour while the contact sensor fault remains open.\n\nEscalation: any access-control alert is escalated to the control room before the officer responds. Panic activations are treated as genuine until proven otherwise.'
        },
        {
            title: 'Emergency Evacuation Plan', updated: 'Jul 22, 2025',
            ref: 'PO-002', version: 'v1.3', by: 'Sarah Jenkins', file: 'PDF · 1.1 MB',
            applies: 'All positions at this site',
            summary: 'Evacuation routes, assembly points and officer responsibilities for fire, flood and structural emergencies.',
            body: 'On alarm activation officers move to their assigned sweep zones and clear floors from the alarm level upward, then downward. Lifts are not to be used.\n\nAssembly point A is the plaza on the east drive; assembly point B is the west car park apron when the east drive is compromised. Roll call is taken by the shift supervisor against the clock-in register.\n\nThe control room retains the master floor plans and liaises with the attending fire service. No re-entry until the incident commander releases the building.'
        }
    ];

    var POSITIONS = [
        {
            uid: 'POS-001', title: 'Day Shift Guard', hours: '8h', bill: '$28.00', holiday: '$42.00', temp: 'No',
            status: 'Active', description: 'Static day-shift coverage for the main lobby and tower floors.',
            memo: 'Cover 06:00–14:00. Handover to the swing shift at the lobby desk.',
            service: 'Regular Service', begin: 'Jan 15, 2024', breakRule: 'Standard 30-min Break',
            working: 'Standard Full-Time (9 to 5)', scheduling: 'Flexible Scheduling (Core hours required)',
            payBasis: 'Pay on This Post Rate', breakPay: 'Do Not Pay Breaks',
            holidayPay: 'Rate Multiplier', timeOff: 'Standard PTO', days: '15', accrual: '1.25',
            conditional: 'Background Check', soft: 'Customer-facing experience preferred'
        },
        {
            uid: 'POS-002', title: 'Night Patrol Officer', hours: '8h', bill: '$30.00', holiday: '$45.00', temp: 'No',
            status: 'Active', description: 'Mobile night patrol of the perimeter, parking structure and tower floors.',
            memo: 'Cover 22:00–06:00. Two full perimeter patrols per shift.',
            service: 'Regular Service', begin: 'Jan 15, 2024', breakRule: 'Standard 30-min Break',
            working: 'Night Shift (10 PM to 6 AM)', scheduling: 'Strict Scheduling (Must adhere to hours)',
            payBasis: 'Pay on This Post Rate', breakPay: 'Pay All Breaks',
            holidayPay: 'Rate Multiplier', timeOff: 'Standard PTO', days: '15', accrual: '1.25',
            conditional: 'Background Check · Night-shift clearance', soft: 'Own transport preferred'
        },
        {
            uid: 'POS-003', title: 'Weekend Supervisor', hours: '12h', bill: '$35.00', holiday: '$52.50', temp: 'Yes',
            status: 'Active', description: 'Weekend supervisory cover with responsibility for handover and reporting.',
            memo: 'Saturday and Sunday, 06:00–18:00. Owns the shift summary report.',
            service: 'Temporary Service', begin: 'Mar 01, 2024', breakRule: 'California Break Rule',
            working: 'Set Custom Working Hour', scheduling: 'Custom Rules',
            payBasis: 'Pay on Employee Pay Rate', breakPay: 'Do Not Pay Breaks',
            holidayPay: 'Rate Multiplier', timeOff: 'No Paid Time Off', days: '—', accrual: '—',
            conditional: 'Background Check · First Aid/CPR', soft: 'Prior supervisory experience'
        }
    ];

    var ASSIGNED = [
        {
            name: 'Marcus Johnson', role: 'Security Officer', start: '01/15/2024', rate: '$22.00/hr',
            end: '—', primary: true, empId: 'EMP-001', badge: 'S-041', position: 'Day Shift Guard',
            phone: '+1 (555) 000-1234', email: 'm.johnson@alexios.com', dept: 'Field Services',
            status: 'Active'
        },
        {
            name: 'Sarah Chen', role: 'Security Officer', start: '03/01/2024', rate: '$24.00/hr',
            end: '—', primary: false, empId: 'EMP-002', badge: 'S-016', position: 'Weekend Supervisor',
            phone: '+1 (555) 000-1235', email: 'sarah.chen@alexios.com', dept: 'Field Services',
            status: 'Active'
        },
        {
            name: 'Derek Wilson', role: 'Security Officer', start: '06/10/2024', rate: '$20.00/hr',
            end: '—', primary: false, empId: 'EMP-003', badge: 'S-048', position: 'Night Patrol Officer',
            phone: '+1 (555) 000-1236', email: 'derek@alexios.com', dept: 'Field Services',
            status: 'Active'
        }
    ];

    var CONTACTS = [
        {
            name: 'Gregory Nash', role: 'Facility Director', phone: '+1 (555) 301-0001',
            email: 'g.nash@site.com', priority: 'Primary', hours: '24/7',
            note: 'First call for building services, plant faults and after-hours access authorisation.'
        },
        {
            name: 'Patricia Lane', role: 'Security Liaison', phone: '+1 (555) 301-0002',
            email: 'p.lane@site.com', priority: 'Secondary', hours: 'Mon–Fri, 08:00–18:00',
            note: 'Point of contact for incident follow-up, reporting queries and tenant liaison.'
        }
    ];

    var BANNED = [
        {
            name: 'Carlos Mendez', id: 'EMP-009', reason: 'Conduct violation', on: 'Aug 14, 2025',
            by: 'James Morrison', scope: 'This site only',
            note: 'Banned following a substantiated conduct complaint raised by the client. Assignment to this site is blocked automatically by the scheduler.'
        },
        {
            name: 'Darnell Scott', id: 'EMP-015', reason: 'Attendance issues', on: 'May 31, 2025',
            by: 'Sarah Jenkins', scope: 'This site only',
            note: 'Repeated late starts and two no-shows across a four-week period. Client requested removal from the site roster.'
        }
    ];

    // Rule states read from the admin panel.
    var NOTIF_GROUPS = [
        {
            group: 'Operations Reports', rules: [
                'Individual Report', 'Maintenance Report', 'Incident Report', 'Operation Report',
                'Hourly Report Filling', 'End-of-Shift Report for Overnight Patrols',
                'Roof Access Notification', 'Tornado Warning Emergency'
            ]
        },
        {
            group: 'Tours & Patrols', rules: [
                'Late Tour / Checkpoint Alert', 'Incomplete Tour Alert', 'Finished Tour Alert'
            ]
        },
        {
            group: 'Time & Attendance', rules: [
                'Late Shift Alert', 'Early Clock-Out Alert', 'Clock-In / Clock-Out', 'Clock-In Exception'
            ]
        }
    ];

    var GEO_LINKS = [
        { name: 'Checkpoints', desc: 'NFC / QR checkpoint scan points' },
        { name: 'Tour Routes', desc: 'Patrol tour sequences and waypoints' },
        { name: 'Site Locations & Sections', desc: 'Site locations and sections' }
    ];

    var GEO_RESTRICTIONS = [
        { name: 'Geo-Fence Clock-In Restriction', desc: 'Employees must be inside the geo-fence to clock in', on: true },
        { name: 'Geo-Fence Clock-Out Restriction', desc: 'Employees must be inside the geo-fence to clock out', on: true },
        { name: 'Mobile App Login Restriction', desc: 'Restrict guard app sign-in to the site boundary', on: false }
    ];

    var CHECKLIST_ITEMS = [
        'Daily Brief Acknowledgement',
        'Shift Summary Acknowledgement',
        'Firearms & Duty Gear Log',
        'Uniform & PPE Compliance Check'
    ];

    // Mirrors the seed in site-assets.js, used when the admin store is empty.
    var ASSET_FALLBACK = [
        { category: 'Fire Extinguishers', name: 'Extinguisher — Lobby L1', ref: 'FE-101', location: 'Lobby / L1', condition: 'Operational', qty: 1 },
        { category: 'Checkpoints', name: 'Main Entrance Gate', ref: 'CP-001', location: 'Main entrance', condition: 'Operational', qty: 1 },
        { category: 'Gates', name: 'Gate B — Vehicle Entry', ref: 'GT-002', location: 'East drive', condition: 'Needs Service', qty: 1 },
        { category: 'Keys', name: 'Master Key Set', ref: 'KEY-A12', location: 'Guard office key box', condition: 'Operational', qty: 3 },
        { category: 'Fire Panels', name: 'Main Fire Alarm Panel', ref: 'FP-01', location: 'Fire control room', condition: 'Operational', qty: 1 },
        { category: 'Access Control Panels', name: 'ACP — Server Room B', ref: 'ACP-07', location: 'Level 3', condition: 'Operational', qty: 1 },
        { category: 'Vehicles', name: 'Patrol Vehicle 1', ref: 'VEH-01', location: 'Parking P1', condition: 'Operational', qty: 1 },
        { category: 'Radios', name: 'Handheld Radios', ref: 'RAD-04', location: 'Guard office charging bank', condition: 'Operational', qty: 6 },
        { category: 'First Aid/AED', name: 'AED Cabinet — Lobby', ref: 'AED-01', location: 'Lobby / L1', condition: 'Operational', qty: 1 }
    ];

    var SITE_EMPLOYEES = [
        'J. Rivera · S-041 · Lead Guard',
        'M. Chen · S-019 · Patrol',
        'A. Okafor · S-033 · Patrol',
        'L. Santos · S-024 · Patrol',
        'D. Patel · S-062 · CCTV Monitor',
        'T. Williams · S-057 · Access Ctrl'
    ];

    // ------------------------------------------------------------------ utils

    var esc = function (value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    };

    var readTasks = function () {
        try {
            var raw = JSON.parse(localStorage.getItem(TASK_KEY) || '[]');
            return Array.isArray(raw) ? raw : [];
        } catch (e) {
            return [];
        }
    };

    var writeTasks = function (list) {
        try {
            localStorage.setItem(TASK_KEY, JSON.stringify(list));
        } catch (e) {
            /* storage unavailable - the demo still works for this session */
        }
    };

    var allTasks = function () {
        return readTasks().concat(TASKS);
    };

    var todayLabel = function () {
        return new Date().toLocaleDateString(undefined, {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    var isoToday = function () {
        var d = new Date();
        var m = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        return d.getFullYear() + '-' + m + '-' + day;
    };

    var I = {
        chevL: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>',
        chevR: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>',
        x: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
        ext: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
        doc: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>',
        plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>',
        dl: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>',
        user: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
        out: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>'
    };

    // ------------------------------------------------------------------ state

    var state = {
        route: 'login',
        arg: null,
        signedIn: false,
        menuOpen: false,
        taskFilter: 'All Tasks',
        profileSection: 'Overview',
        profileItem: null,
        tourPage: 1,
        tourFilter: 'All',
        activityDate: '',
        activityKind: 'All',
        reportFilter: 'All',
        reportSearch: '',
        ticketStatus: 'All'
    };

    var root = null;

    var go = function (route, arg) {
        state.route = route;
        state.arg = arg === undefined ? null : arg;
        state.menuOpen = false;
        render();
        var body = root && root.querySelector('.cp-body');
        if (body) body.scrollTop = 0;
    };

    var toast = function (message) {
        var el = document.createElement('div');
        el.className = 'cp-toast';
        el.textContent = message;
        document.body.appendChild(el);
        setTimeout(function () {
            el.style.opacity = '0';
            el.style.transition = 'opacity .3s ease';
            setTimeout(function () { el.remove(); }, 320);
        }, 3600);
    };

    // ------------------------------------------------------------ auth screens

    var authShell = function (inner) {
        return '<div class="cp-auth"><div class="cp-auth-card">' +
            '<div class="cp-auth-brand"><strong>ALEXIOS</strong><span>Client Portal</span></div>' +
            inner + '</div></div>';
    };

    var viewLogin = function () {
        return authShell(
            '<h2>Sign in</h2>' +
            '<p class="cp-auth-lead">Use the email address your ALEXIOS administrator registered for ' +
            esc(SITE.name) + '.</p>' +
            '<div class="cp-field"><label class="cp-label">Email address</label>' +
            '<input class="cp-input" type="email" data-f="email" value="' + esc(SITE.email) + '" /></div>' +
            '<div class="cp-field"><label class="cp-label">Password</label>' +
            '<input class="cp-input" type="password" data-f="password" placeholder="••••••••" /></div>' +
            '<div class="cp-auth-actions">' +
            '<button type="button" class="cp-btn cp-btn-primary" data-act="signin">Sign In</button>' +
            '<button type="button" class="cp-link" data-act="forgot">Forgot password?</button>' +
            '</div>' +
            '<div class="cp-note">Prototype sign-in — no credentials are checked, stored or sent. ' +
            'Select Sign In to open the portal.</div>' +
            '<div class="cp-auth-actions" style="margin-top:12px">' +
            '<button type="button" class="cp-link" data-act="setpw">View the “create password” screen</button>' +
            '</div>'
        );
    };

    var viewForgot = function () {
        return authShell(
            '<h2>Reset your password</h2>' +
            '<p class="cp-auth-lead">Enter your registered email address and we will send a reset link.</p>' +
            '<div class="cp-field"><label class="cp-label">Email address</label>' +
            '<input class="cp-input" type="email" data-f="email" value="' + esc(SITE.email) + '" /></div>' +
            '<div class="cp-auth-actions">' +
            '<button type="button" class="cp-btn cp-btn-primary" data-act="sendreset">Send Reset Link</button>' +
            '<button type="button" class="cp-link" data-act="tologin">Back to sign in</button>' +
            '</div>' +
            (state.arg === 'sent'
                ? '<div class="cp-ok">If that address is registered, a reset link is on its way. ' +
                  'The link expires in 30 minutes.</div>'
                : '') +
            '<div class="cp-note">Prototype — no email is actually sent.</div>'
        );
    };

    var viewSetPassword = function () {
        return authShell(
            '<h2>Create your password</h2>' +
            '<p class="cp-auth-lead">This is the screen reached from the invitation email after an ' +
            'administrator creates the client account.</p>' +
            '<div class="cp-field"><label class="cp-label">New password</label>' +
            '<input class="cp-input" type="password" data-f="pw1" placeholder="At least 10 characters" /></div>' +
            '<div class="cp-field"><label class="cp-label">Confirm password</label>' +
            '<input class="cp-input" type="password" data-f="pw2" placeholder="Re-enter password" /></div>' +
            '<div class="cp-auth-actions">' +
            '<button type="button" class="cp-btn cp-btn-primary" data-act="savepw">Create Password</button>' +
            '<button type="button" class="cp-link" data-act="tologin">Back to sign in</button>' +
            '</div>' +
            (state.arg === 'done'
                ? '<div class="cp-ok">Password created. You can now sign in to the client portal.</div>'
                : '') +
            '<div class="cp-note">Prototype — nothing is stored or transmitted.</div>'
        );
    };

    // --------------------------------------------------------------- dashboard

    var ringHtml = function (ring) {
        var deg = Math.round(ring.pct * 3.6);
        return '<div class="cp-ring">' +
            '<div class="cp-ring-dial" style="background:conic-gradient(#3b82f6 ' + deg +
            'deg, #111827 ' + deg + 'deg)">' +
            '<span style="position:absolute;inset:4px;border-radius:50%;background:#000"></span>' +
            '<b>' + ring.value + '</b></div>' +
            '<span class="cp-ring-label">' + esc(ring.label) + '</span>' +
            '<span class="cp-ring-pct">' + ring.pct + '%</span>' +
            '</div>';
    };

    var tourCardHtml = function (tour) {
        return '<div class="cp-tour' + (tour.behind ? ' is-behind' : '') +
            '" data-tour="' + esc(tour.id) + '">' +
            '<div class="cp-tour-dial"><b>' + tour.done + '</b><span>of ' + tour.total + '<br>chkpts</span></div>' +
            '<div class="cp-tour-main">' +
            '<div class="cp-tour-top">' +
            '<span class="cp-tag' + (tour.behind ? ' is-amber' : '') + '">' + esc(tour.id) + '</span>' +
            '<span class="cp-tour-name">' + esc(tour.name) + '</span>' +
            (tour.behind ? '<span class="cp-pill cp-pill-amber">Behind</span>' : '') +
            '</div>' +
            '<div class="cp-tour-guard">' + esc(tour.guard + ' · ' + tour.badge) + '</div>' +
            '<div class="cp-tour-times">' +
            '<div class="cp-tour-time"><span>Scheduled</span><b>' + esc(tour.scheduled) + '</b></div>' +
            '<div class="cp-tour-time is-elapsed"><span>Since start</span><b>' + esc(tour.elapsed) + '</b></div>' +
            '</div></div></div>';
    };

    var activityRowHtml = function (item) {
        return '<div class="cp-act' + (item.alert ? ' is-alert' : '') + '">' +
            '<span class="cp-act-time">' + esc(item.time) + '</span>' +
            '<span class="cp-act-main"><span class="cp-act-text">' + esc(item.text) + '</span></span>' +
            '<span class="cp-act-actor">' + esc(item.actor) + '</span>' +
            '</div>';
    };

    var taskCardHtml = function (task) {
        return '<div class="cp-task is-' + esc(task.tier) + '">' +
            '<span class="cp-task-tag">' + esc(task.tag) + '</span>' +
            '<p class="cp-task-body">' + esc(task.body) + '</p>' +
            '<div class="cp-task-foot">' +
            '<span class="cp-task-due">' + esc(task.due) + '</span>' +
            '<span class="cp-task-src">' + esc(task.origin) + '</span>' +
            '</div></div>';
    };

    var filteredTasks = function () {
        var list = allTasks();
        if (state.taskFilter === 'All Tasks') return list;
        return list.filter(function (t) { return t.source === state.taskFilter; });
    };

    var viewDashboard = function () {
        var staleCount = OFFICERS.filter(function (o) { return o.stale; }).length;
        var tasks = filteredTasks();

        return '<div class="cp-head">' +
            '<div class="cp-head-main">' +
            '<h1 class="cp-title">Security Operations</h1>' +
            '<p class="cp-sub">' + esc(SITE.name) + ' · live site view</p>' +
            '</div>' +
            '<div class="cp-rings">' + RINGS.map(ringHtml).join('') + '</div>' +
            '</div>' +

            '<div class="cp-grid">' +

            // Active tours
            '<section class="cp-panel">' +
            '<div class="cp-panel-head"><span class="cp-panel-title"><i class="cp-dot"></i>Active Tours</span>' +
            '<button class="cp-viewall" data-go="tours">View All</button></div>' +
            '<div class="cp-scroll">' + TOURS.slice(0, 3).map(tourCardHtml).join('') + '</div>' +
            '</section>' +

            // Live activity
            '<section class="cp-panel">' +
            '<div class="cp-panel-head"><span class="cp-panel-title"><i class="cp-dot is-live"></i>Live Activity</span>' +
            '<button class="cp-viewall" data-go="activity">View All</button></div>' +
            '<div class="cp-scroll">' + ACTIVITY.slice(0, 7).map(activityRowHtml).join('') + '</div>' +
            '<div class="cp-quick">' +
            '<button data-act="assign-task">' + I.plus + 'Assign Task</button>' +
            '<button data-go="reports">' + I.doc + 'Reports</button>' +
            '<button data-go="tasks">' + I.user + 'All Tasks</button>' +
            '</div>' +
            '</section>' +

            // Field reporting hub
            '<section class="cp-panel">' +
            '<div class="cp-panel-head"><span class="cp-panel-title"><i class="cp-dot"></i>Field Reporting Hub</span>' +
            '<button class="cp-viewall" data-go="reports">View All</button></div>' +
            '<div class="cp-scroll">' +
            '<div class="cp-report is-approve" data-go="reports">' +
            '<span class="cp-report-icon">' + I.doc + '</span>' +
            '<span class="cp-report-main"><span class="cp-report-name">Approved Reports</span>' +
            '<span class="cp-report-desc">' +
            REPORTS.filter(function (r) { return r.approval === 'Approved'; }).length +
            ' approved by admin / supervisor</span></span>' +
            '<span class="cp-chev">' + I.chevR + '</span></div>' +
            REPORT_TYPES.map(function (t) {
                var n = REPORTS.filter(function (r) { return r.type === t.name; }).length;
                return '<div class="cp-report" data-report-type="' + esc(t.name) + '">' +
                    '<span class="cp-report-icon">' + I.doc + '</span>' +
                    '<span class="cp-report-main"><span class="cp-report-name">' + esc(t.name) + '</span>' +
                    '<span class="cp-report-desc">' + esc(t.desc) + '</span></span>' +
                    '<span class="cp-pill cp-pill-grey">' + n + '</span>' +
                    '<span class="cp-chev">' + I.chevR + '</span></div>';
            }).join('') +
            '</div></section>' +

            // Tasks
            '<section class="cp-panel">' +
            '<div class="cp-panel-head"><span class="cp-panel-title"><i class="cp-dot"></i>Tasks</span>' +
            '<button class="cp-viewall" data-go="tasks">View All</button></div>' +
            '<div class="cp-chips">' + TASK_FILTERS.map(function (f) {
                return '<button class="cp-chip' + (state.taskFilter === f ? ' is-on' : '') +
                    '" data-task-filter="' + esc(f) + '">' + esc(f) + '</button>';
            }).join('') + '</div>' +
            '<div class="cp-scroll">' +
            (tasks.length ? tasks.slice(0, 4).map(taskCardHtml).join('')
                : '<div class="cp-empty">No tasks in this category.</div>') +
            '</div></section>' +

            // Live map
            '<section class="cp-panel" style="grid-column:span 2">' +
            '<div class="cp-panel-head"><span class="cp-panel-title"><i class="cp-dot is-live"></i>Live Map</span>' +
            '<button class="cp-viewall" data-go="map">Expand</button></div>' +
            '<div class="cp-map">' +
            '<span class="cp-map-label">' + esc(SITE.area.toUpperCase()) + '</span>' +
            OFFICERS.map(function (o) {
                return '<span class="cp-pin' + (o.stale ? ' is-stale' : '') + '" style="left:' + o.x +
                    '%;top:' + o.y + '%" title="' + esc(o.name + ' · ' + o.post + ' · last seen ' + o.seen) +
                    '">' + esc(o.badge.replace('S-', '')) + '</span>';
            }).join('') +
            '</div>' +
            '<div class="cp-map-legend"><span><i></i>On duty · reporting</span>' +
            '<span><i class="is-stale"></i>No recent mobile activity</span>' +
            '<span style="margin-left:auto">' + OFFICERS.length + ' clocked in</span></div>' +
            '<button class="cp-inactive" data-go="tickets">' +
            '<b>' + staleCount + '</b>' +
            '<span class="cp-inactive-main">' +
            '<span class="cp-inactive-title">Inactive Mobile Users</span>' +
            '<span class="cp-inactive-sub">Clocked in with no app activity for 15+ minutes — tickets raised automatically</span>' +
            '</span><span class="cp-chev">' + I.chevR + '</span></button>' +
            '</section>' +

            '</div>';
    };

    // -------------------------------------------------------------- sub-pages

    var pageHead = function (title, sub, back) {
        return '<div class="cp-head">' +
            '<button class="cp-back" data-go="' + (back || 'dashboard') + '">' + I.chevL + '</button>' +
            '<div class="cp-head-main"><h1 class="cp-title">' + esc(title) + '</h1>' +
            '<p class="cp-sub">' + esc(sub) + '</p></div></div>';
    };

    var PER_PAGE = 3;

    var viewTours = function () {
        var list = TOURS.filter(function (t) {
            if (state.tourFilter === 'Behind') return t.behind;
            if (state.tourFilter === 'On schedule') return !t.behind;
            return true;
        });
        var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
        if (state.tourPage > pages) state.tourPage = pages;
        var from = (state.tourPage - 1) * PER_PAGE;
        var slice = list.slice(from, from + PER_PAGE);

        return pageHead('Active Tours', SITE.name + ' · in progress', 'dashboard') +
            '<div class="cp-card">' +
            '<div class="cp-toolbar">' +
            '<select class="cp-select" data-tour-filter>' +
            ['All', 'On schedule', 'Behind'].map(function (o) {
                return '<option' + (state.tourFilter === o ? ' selected' : '') + '>' + o + '</option>';
            }).join('') + '</select>' +
            '<span class="cp-muted" style="font-size:11px">' + list.length + ' active tour' +
            (list.length === 1 ? '' : 's') + '</span>' +
            '</div>' +
            '<table class="cp-table"><thead><tr>' +
            '<th>Tour</th><th>Route</th><th>Guard</th><th>Scheduled</th><th>Since Start</th><th>Progress</th><th>Status</th>' +
            '</tr></thead><tbody>' +
            (slice.length ? slice.map(function (t) {
                return '<tr class="is-click" data-tour="' + esc(t.id) + '">' +
                    '<td><span class="cp-tag' + (t.behind ? ' is-amber' : '') + '">' + esc(t.id) + '</span></td>' +
                    '<td class="cp-strong">' + esc(t.name) + '</td>' +
                    '<td>' + esc(t.guard) + ' <span class="cp-muted cp-mono">' + esc(t.badge) + '</span></td>' +
                    '<td class="cp-mono">' + esc(t.scheduled) + '</td>' +
                    '<td class="cp-mono">' + esc(t.elapsed) + '</td>' +
                    '<td>' + t.done + ' / ' + t.total + '</td>' +
                    '<td>' + (t.behind ? '<span class="cp-pill cp-pill-amber">Behind</span>'
                        : '<span class="cp-pill cp-pill-blue">In Progress</span>') + '</td></tr>';
            }).join('') : '<tr><td colspan="7" class="cp-empty">No tours match this filter.</td></tr>') +
            '</tbody></table>' +
            '<div class="cp-pager">' +
            '<span class="cp-pager-info">Showing ' + (list.length ? from + 1 : 0) + '–' +
            Math.min(from + PER_PAGE, list.length) + ' of ' + list.length + '</span>' +
            '<button class="cp-btn" data-page="prev"' + (state.tourPage <= 1 ? ' disabled' : '') + '>Previous</button>' +
            '<span class="cp-muted" style="font-size:11px">Page ' + state.tourPage + ' of ' + pages + '</span>' +
            '<button class="cp-btn" data-page="next"' + (state.tourPage >= pages ? ' disabled' : '') + '>Next</button>' +
            '</div></div>';
    };

    var viewTour = function () {
        var tour = TOURS.filter(function (t) { return t.id === state.arg; })[0];
        if (!tour) return pageHead('Tour', 'Not found', 'tours') + '<div class="cp-card"><div class="cp-empty">Tour not found.</div></div>';

        return pageHead(tour.name, tour.id + ' · ' + SITE.name, 'tours') +
            '<div class="cp-card">' +
            '<div class="cp-pairs">' +
            '<div><span class="cp-k">Status</span><span class="cp-v">' +
            (tour.behind ? '<span class="cp-pill cp-pill-amber">Behind Schedule</span>'
                : '<span class="cp-pill cp-pill-blue">In Progress</span>') + '</span></div>' +
            '<div><span class="cp-k">Assigned Guard</span><span class="cp-v">' +
            esc(tour.guard + ' · ' + tour.badge) + '</span></div>' +
            '<div><span class="cp-k">Scheduled Window</span><span class="cp-v cp-mono">' + esc(tour.scheduled) + '</span></div>' +
            '<div><span class="cp-k">Started At</span><span class="cp-v cp-mono">' + esc(tour.started) + '</span></div>' +
            '<div><span class="cp-k">Time Since Start</span><span class="cp-v cp-mono">' + esc(tour.elapsed) + '</span></div>' +
            '<div><span class="cp-k">Checkpoints</span><span class="cp-v">' + tour.done + ' of ' + tour.total + ' scanned</span></div>' +
            '</div>' +
            '<div class="cp-section"><span class="cp-k">Route</span>' +
            '<p class="cp-prose">' + esc(tour.route) + '</p></div>' +
            '<div class="cp-section"><span class="cp-k">Checkpoint Progress</span>' +
            '<ul class="cp-steps">' + tour.steps.map(function (s) {
                return '<li' + (s.done ? ' class="is-done"' : '') + '>' +
                    '<span class="cp-step-mark' + (s.done ? ' is-done' : '') + '">' + (s.done ? '✓' : '') + '</span>' +
                    '<span class="cp-step-name">' + esc(s.name) + '</span>' +
                    '<span class="cp-step-time">' + esc(s.time) + '</span></li>';
            }).join('') + '</ul></div>' +
            '<p class="cp-muted" style="margin-top:16px;font-size:11px">Read-only view. Tour configuration is managed by your ALEXIOS administrator.</p>' +
            '</div>';
    };

    var viewActivity = function () {
        var kinds = ['All', 'Clock', 'Tour', 'Task', 'Report', 'System'];
        var list = ACTIVITY.filter(function (a) {
            return state.activityKind === 'All' || a.kind === state.activityKind;
        });
        var date = state.activityDate || isoToday();
        var isToday = date === isoToday();

        return pageHead('Live Activity', SITE.name + ' · system activity log', 'dashboard') +
            '<div class="cp-card">' +
            '<div class="cp-toolbar">' +
            '<input class="cp-input" type="date" data-activity-date value="' + esc(date) + '" />' +
            '<select class="cp-select" data-activity-kind>' +
            kinds.map(function (k) {
                return '<option' + (state.activityKind === k ? ' selected' : '') + '>' + k + '</option>';
            }).join('') + '</select>' +
            '<span class="cp-muted" style="font-size:11px">' +
            (isToday ? 'Showing today · ' + todayLabel() : 'Showing ' + esc(date)) +
            '</span></div>' +
            (isToday
                ? '<table class="cp-table"><thead><tr><th>Time</th><th>Activity</th><th>Type</th><th>By</th></tr></thead><tbody>' +
                  (list.length ? list.map(function (a) {
                      return '<tr><td class="cp-mono" style="color:#3b82f6">' + esc(a.time) + '</td>' +
                          '<td class="' + (a.alert ? '' : 'cp-strong') + '"' +
                          (a.alert ? ' style="color:#fbbf24;font-weight:700"' : '') + '>' + esc(a.text) + '</td>' +
                          '<td><span class="cp-pill cp-pill-grey">' + esc(a.kind) + '</span></td>' +
                          '<td class="cp-muted">' + esc(a.actor) + '</td></tr>';
                  }).join('') : '<tr><td colspan="4" class="cp-empty">No activity of this type today.</td></tr>') +
                  '</tbody></table>'
                : '<div class="cp-empty">No activity recorded for ' + esc(date) + '.<br>' +
                  'This preview carries a full log for today only.</div>') +
            '</div>';
    };

    var viewReports = function () {
        var list = REPORTS.filter(function (r) {
            if (state.reportFilter !== 'All' && r.type !== state.reportFilter) return false;
            if (!state.reportSearch) return true;
            var hay = (r.id + ' ' + r.type + ' ' + r.by + ' ' + r.summary).toLowerCase();
            return hay.indexOf(state.reportSearch.toLowerCase()) !== -1;
        });

        // Group by date, newest group first in source order.
        var groups = [];
        list.forEach(function (r) {
            var g = groups.filter(function (x) { return x.date === r.date; })[0];
            if (!g) { g = { date: r.date, rows: [] }; groups.push(g); }
            g.rows.push(r);
        });

        return pageHead('Field Reporting Hub', SITE.name + ' · submitted reports', 'dashboard') +
            '<div class="cp-card">' +
            '<div class="cp-toolbar">' +
            '<input class="cp-input is-grow" data-report-search placeholder="Search by ID, type, officer or summary..." value="' +
            esc(state.reportSearch) + '" />' +
            '<select class="cp-select" data-report-filter>' +
            ['All'].concat(REPORT_TYPES.map(function (t) { return t.name; })).map(function (o) {
                return '<option' + (state.reportFilter === o ? ' selected' : '') + '>' + o + '</option>';
            }).join('') + '</select>' +
            '<span class="cp-muted" style="font-size:11px">' + list.length + ' report' +
            (list.length === 1 ? '' : 's') + '</span></div>' +
            (groups.length ? groups.map(function (g) {
                return '<div style="margin-bottom:6px"><div class="cp-k" style="margin:14px 0 8px">' +
                    esc(g.date) + '</div>' +
                    '<table class="cp-table cp-table-reports"><thead><tr>' +
                    '<th>Report</th><th>Type</th><th>Submitted By</th><th>Time</th><th></th>' +
                    '</tr></thead><tbody>' +
                    g.rows.map(function (r) {
                        return '<tr class="is-click" data-report="' + esc(r.id) + '">' +
                            '<td class="cp-mono cp-strong">' + esc(r.id) + '</td>' +
                            '<td>' + esc(r.type) + '</td>' +
                            '<td>' + esc(r.by) + ' <span class="cp-muted cp-mono">' + esc(r.badge) + '</span></td>' +
                            '<td class="cp-mono">' + esc(r.time) + '</td>' +
                            '<td class="cp-chev">' + I.chevR + '</td></tr>';
                    }).join('') + '</tbody></table></div>';
            }).join('') : '<div class="cp-empty">No reports match this filter.</div>') +
            '</div>';
    };

    var viewReport = function () {
        var r = REPORTS.filter(function (x) { return x.id === state.arg; })[0];
        if (!r) return pageHead('Report', 'Not found', 'reports') + '<div class="cp-card"><div class="cp-empty">Report not found.</div></div>';

        return '<div class="cp-head">' +
            '<button class="cp-back" data-go="reports">' + I.chevL + '</button>' +
            '<div class="cp-head-main"><h1 class="cp-title">' + esc(r.type) + '</h1>' +
            '<p class="cp-sub">' + esc(r.id + ' · ' + SITE.name) + '</p></div>' +
            '<button class="cp-btn cp-btn-primary" data-download="' + esc(r.id) + '">' +
            I.dl + ' Download PDF</button></div>' +
            '<div class="cp-card">' +
            '<div class="cp-pairs">' +
            '<div><span class="cp-k">Report ID</span><span class="cp-v cp-mono">' + esc(r.id) + '</span></div>' +
            '<div><span class="cp-k">Type</span><span class="cp-v">' + esc(r.type) + '</span></div>' +
            '<div><span class="cp-k">Date &amp; Time</span><span class="cp-v">' + esc(r.date + ' · ' + r.time) + '</span></div>' +
            '<div><span class="cp-k">Submitted By</span><span class="cp-v">' + esc(r.by + ' · ' + r.badge) + '</span></div>' +
            '<div><span class="cp-k">Approval</span><span class="cp-v">' +
            (r.approval === 'Approved'
                ? '<span class="cp-pill cp-pill-green">Approved</span>'
                : '<span class="cp-pill cp-pill-grey">No approval required</span>') + '</span></div>' +
            '<div><span class="cp-k">Approved By</span><span class="cp-v">' +
            esc(r.approver || '—') + '</span></div>' +
            '</div>' +
            '<div class="cp-section"><span class="cp-k">Summary</span>' +
            '<p class="cp-prose">' + esc(r.summary) + '</p></div>' +
            '<div class="cp-section"><span class="cp-k">Report Detail</span>' +
            '<p class="cp-prose">' + esc(r.detail) + '</p></div>' +
            '<div class="cp-section"><span class="cp-k">Site</span>' +
            '<p class="cp-prose">' + esc(SITE.name + ' · ' + SITE.address + ' · ' + SITE.city) + '</p></div>' +
            '</div>';
    };

    var viewTasks = function () {
        var list = filteredTasks();
        return pageHead('Tasks', SITE.name + ' · assigned to site employees', 'dashboard') +
            '<div class="cp-card">' +
            '<div class="cp-toolbar">' +
            '<div class="cp-chips" style="margin:0">' + TASK_FILTERS.map(function (f) {
                return '<button class="cp-chip' + (state.taskFilter === f ? ' is-on' : '') +
                    '" data-task-filter="' + esc(f) + '">' + esc(f) + '</button>';
            }).join('') + '</div>' +
            '<button class="cp-btn cp-btn-primary" style="margin-left:auto" data-act="assign-task">' +
            I.plus + ' Assign Task</button>' +
            '</div>' +
            '<table class="cp-table"><thead><tr>' +
            '<th>Task</th><th>Assigned To</th><th>Date</th><th>Due</th><th>Source</th><th>Origin</th>' +
            '</tr></thead><tbody>' +
            (list.length ? list.map(function (t) {
                return '<tr><td><span class="cp-strong">' + esc(t.body) + '</span><br>' +
                    '<span class="cp-muted" style="font-size:10px">' + esc(t.tag) + '</span></td>' +
                    '<td>' + esc(t.assignee || 'Unassigned') + '</td>' +
                    '<td>' + esc(t.date) + '</td>' +
                    '<td><span class="cp-pill ' + (t.tier === 'critical' ? 'cp-pill-red'
                        : t.tier === 'warn' ? 'cp-pill-amber' : 'cp-pill-grey') + '">' +
                    esc(t.due) + '</span></td>' +
                    '<td><span class="cp-pill cp-pill-blue">' + esc(t.source) + '</span></td>' +
                    '<td class="cp-muted">' + esc(t.origin) + '</td></tr>';
            }).join('') : '<tr><td colspan="6" class="cp-empty">No tasks in this category.</td></tr>') +
            '</tbody></table></div>';
    };

    var viewMap = function () {
        var staleCount = OFFICERS.filter(function (o) { return o.stale; }).length;
        return pageHead('Live Map', SITE.name + ' · ' + SITE.area, 'dashboard') +
            '<div class="cp-card">' +
            '<div class="cp-map" style="min-height:420px">' +
            '<span class="cp-map-label">' + esc(SITE.area.toUpperCase()) + '</span>' +
            OFFICERS.map(function (o) {
                return '<span class="cp-pin' + (o.stale ? ' is-stale' : '') + '" style="left:' + o.x +
                    '%;top:' + o.y + '%" title="' + esc(o.name + ' · ' + o.post) + '">' +
                    esc(o.badge.replace('S-', '')) + '</span>';
            }).join('') + '</div>' +
            '<div class="cp-map-legend"><span><i></i>On duty · reporting</span>' +
            '<span><i class="is-stale"></i>No recent mobile activity</span>' +
            '<span style="margin-left:auto">' + OFFICERS.length + ' clocked in · ' + staleCount + ' inactive</span></div>' +
            '<div class="cp-section"><span class="cp-k">Clocked-in Officers</span>' +
            '<table class="cp-table" style="margin-top:10px"><thead><tr>' +
            '<th>Officer</th><th>Badge</th><th>Post</th><th>Last Coordinate</th><th>Mobile App</th>' +
            '</tr></thead><tbody>' +
            OFFICERS.map(function (o) {
                return '<tr><td class="cp-strong">' + esc(o.name) + '</td>' +
                    '<td class="cp-mono cp-muted">' + esc(o.badge) + '</td>' +
                    '<td>' + esc(o.post) + '</td>' +
                    '<td class="cp-mono cp-muted">' + esc(o.seen) + '</td>' +
                    '<td>' + (o.stale ? '<span class="cp-pill cp-pill-amber">Inactive</span>'
                        : '<span class="cp-pill cp-pill-green">Active</span>') + '</td></tr>';
            }).join('') + '</tbody></table></div>' +
            '<button class="cp-inactive" data-go="tickets" style="margin-top:16px">' +
            '<b>' + staleCount + '</b><span class="cp-inactive-main">' +
            '<span class="cp-inactive-title">Inactive Mobile User tickets</span>' +
            '<span class="cp-inactive-sub">Raised automatically after 15 minutes without app activity or coordinate change</span>' +
            '</span><span class="cp-chev">' + I.chevR + '</span></button>' +
            '</div>';
    };

    var viewTickets = function () {
        var list = TICKETS.filter(function (t) {
            return state.ticketStatus === 'All' || t.status === state.ticketStatus;
        });
        return pageHead('Inactive Mobile User Tickets', SITE.name + ' · system generated', 'map') +
            '<div class="cp-card">' +
            '<div class="cp-toolbar">' +
            '<select class="cp-select" data-ticket-status>' +
            ['All', 'Open', 'Resolved', 'Closed'].map(function (o) {
                return '<option' + (state.ticketStatus === o ? ' selected' : '') + '>' + o + '</option>';
            }).join('') + '</select>' +
            '<span class="cp-muted" style="font-size:11px">' + list.length + ' ticket' +
            (list.length === 1 ? '' : 's') + '</span></div>' +
            '<table class="cp-table"><thead><tr>' +
            '<th>Date</th><th>Ticket Type</th><th>First Name</th><th>Last Name</th>' +
            '<th>Subject</th><th>Location</th><th>Status</th><th>View</th>' +
            '</tr></thead><tbody>' +
            (list.length ? list.map(function (t, i) {
                return '<tr><td class="cp-mono">' + esc(t.date) + '</td>' +
                    '<td>' + esc(t.type) + '</td>' +
                    '<td class="cp-strong">' + esc(t.first) + '</td>' +
                    '<td class="cp-strong">' + esc(t.last) + '</td>' +
                    '<td>' + esc(t.subject) + '</td>' +
                    '<td>' + esc(t.location) + '</td>' +
                    '<td>' + (t.status === 'Open' ? '<span class="cp-pill cp-pill-amber">Open</span>'
                        : t.status === 'Resolved' ? '<span class="cp-pill cp-pill-green">Resolved</span>'
                        : '<span class="cp-pill cp-pill-grey">Closed</span>') + '</td>' +
                    '<td><button class="cp-link" data-ticket="' + i + '">View</button></td></tr>';
            }).join('') : '<tr><td colspan="8" class="cp-empty">No tickets with this status.</td></tr>') +
            '</tbody></table></div>';
    };

    var pair = function (k, v) {
        return '<div><span class="cp-k">' + esc(k) + '</span>' +
            '<span class="cp-v">' + esc(v || '—') + '</span></div>';
    };

    var initialsOf = function (name) {
        return String(name || '').split(/\s+/).map(function (p) { return p[0]; })
            .join('').slice(0, 2).toUpperCase();
    };

    var statePill = function (on, onLabel, offLabel) {
        return '<span class="cp-state ' + (on ? 'cp-state-on' : 'cp-state-off') + '">' +
            esc(on ? (onLabel || 'Enabled') : (offLabel || 'Disabled')) + '</span>';
    };

    var ruleRow = function (name, desc, on, onLabel, offLabel, index) {
        var open = (index === undefined) ? '' : ' is-click" data-pitem="' + index;
        return '<div class="cp-rule' + open + '"><span class="cp-rule-name">' + esc(name) +
            (desc ? '<span class="cp-rule-sub">' + esc(desc) + '</span>' : '') + '</span>' +
            statePill(on, onLabel, offLabel) +
            (index === undefined ? '' : '<span class="cp-chev">' + I.chevR + '</span>') +
            '</div>';
    };

    var table = function (headers, rows) {
        if (!rows.length) return '<div class="cp-empty">Nothing recorded for this site.</div>';
        return '<table class="cp-table"><thead><tr>' +
            headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') +
            '</tr></thead><tbody>' + rows.join('') + '</tbody>' +
            '</table>';
    };

    // A listing row that drills into its own read-only view.
    var itemRow = function (index, cells) {
        return '<tr class="is-click" data-pitem="' + index + '">' + cells +
            '<td class="cp-chev">' + I.chevR + '</td></tr>';
    };

    // Grouped field pairs, matching the admin's own item-view idiom.
    var itemView = function (opts) {
        var groups = (opts.groups || []).map(function (g) {
            return '<div class="cp-section"><span class="cp-k">' + esc(g.heading) + '</span>' +
                '<div class="cp-pairs" style="margin-top:10px">' +
                g.pairs.map(function (p) { return pair(p[0], p[1]); }).join('') +
                '</div></div>';
        }).join('');

        var prose = (opts.prose || []).map(function (p) {
            return '<div class="cp-section"><span class="cp-k">' + esc(p.heading) + '</span>' +
                '<p class="cp-prose">' + esc(p.text) + '</p></div>';
        }).join('');

        var tables = (opts.tables || []).map(function (t) {
            return '<div class="cp-section"><span class="cp-k">' + esc(t.heading) + '</span>' +
                '<div style="margin-top:10px">' + table(t.headers, t.rows) + '</div></div>';
        }).join('');

        return '<div class="cp-item-head">' +
            '<button class="cp-btn" data-pback>' + I.chevL + ' Back to ' + esc(opts.back) + '</button>' +
            '</div>' +
            '<h3 class="cp-sec-title" style="margin-bottom:4px">' + esc(opts.title) + '</h3>' +
            (opts.subtitle ? '<p class="cp-item-sub">' + esc(opts.subtitle) + '</p>' : '') +
            (opts.pills ? '<div class="cp-tags" style="margin:10px 0 4px">' + opts.pills + '</div>' : '') +
            groups + prose + tables;
    };

    // Site assets come from the admin store when it has been populated.
    var portalAssets = function () {
        try {
            var store = JSON.parse(localStorage.getItem('alexios.siteAssets.v1') || '{}');
            var rec = store[SITE.id];
            if (rec && Array.isArray(rec.assets) && rec.assets.length) return rec.assets;
        } catch (e) {
            /* fall through to the mirrored seed */
        }
        return ASSET_FALLBACK;
    };

    // Checklist requirements likewise, defaulting to nothing required.
    var portalChecklists = function () {
        try {
            var store = JSON.parse(localStorage.getItem('alexios.clientChecklists.v1') || '{}');
            return store[SITE.id] || null;
        } catch (e) {
            return null;
        }
    };

    // ---- per-item read-only views, one per sub-section listing ----

    var profileItemView = function (section, i) {
        switch (section) {

            case 'Post Orders': {
                var p = POST_ORDERS[i];
                if (!p) return null;
                return itemView({
                    back: 'Post Orders', title: p.title,
                    subtitle: p.ref + ' · ' + p.version + ' · updated ' + p.updated,
                    pills: '<span class="cp-pill cp-pill-blue">' + esc(p.file) + '</span>',
                    groups: [{
                        heading: 'Document', pairs: [
                            ['Document Ref', p.ref], ['Version', p.version],
                            ['Updated On', p.updated], ['Uploaded By', p.by],
                            ['File', p.file], ['Applies To', p.applies]
                        ]
                    }],
                    prose: [{ heading: 'Summary', text: p.summary }, { heading: 'Content', text: p.body }]
                });
            }

            case 'Positions / Job Types': {
                var q = POSITIONS[i];
                if (!q) return null;
                return itemView({
                    back: 'Positions / Job Types', title: q.title,
                    subtitle: q.uid + ' · ' + SITE.name,
                    pills: '<span class="cp-pill cp-pill-green">' + esc(q.status) + '</span>' +
                        (q.temp === 'Yes' ? '<span class="cp-pill cp-pill-amber">Temporary</span>' : ''),
                    groups: [
                        {
                            heading: 'Post Base Settings', pairs: [
                                ['Post Name', q.title], ['Post ID', q.uid],
                                ['Status', q.status], ['Schedule Memo', q.memo]
                            ]
                        },
                        {
                            heading: 'Service & Scheduling', pairs: [
                                ['Service Duration', q.service], ['Begin Date', q.begin],
                                ['Break Rule', q.breakRule], ['TPT Hours', q.hours],
                                ['Regular Working Hour', q.working], ['Scheduling Rules', q.scheduling]
                            ]
                        },
                        {
                            heading: 'Payroll & Billing', pairs: [
                                ['Pay Basis', q.payBasis], ['Break Pay', q.breakPay],
                                ['Holiday Pay', q.holidayPay], ['Bill Rate', q.bill],
                                ['Holiday Rate', q.holiday], ['Temporary', q.temp]
                            ]
                        },
                        {
                            heading: 'Time Off Policy', pairs: [
                                ['Policy', q.timeOff], ['Days Per Year', q.days],
                                ['Accrual Rate (days/month)', q.accrual]
                            ]
                        },
                        {
                            heading: 'Requirements', pairs: [
                                ['Conditional Requirements', q.conditional],
                                ['Soft Requirements', q.soft]
                            ]
                        }
                    ],
                    prose: [{ heading: 'Description', text: q.description }]
                });
            }

            case 'Assigned Employees': {
                var a = ASSIGNED[i];
                if (!a) return null;
                return itemView({
                    back: 'Assigned Employees', title: a.name,
                    subtitle: a.empId + ' · ' + a.role,
                    pills: (a.primary ? '<span class="cp-pill cp-pill-blue">Primary</span>'
                        : '<span class="cp-pill cp-pill-grey">Assigned</span>') +
                        '<span class="cp-pill cp-pill-green">' + esc(a.status) + '</span>',
                    groups: [
                        {
                            heading: 'Employee', pairs: [
                                ['Full Name', a.name], ['Employee ID', a.empId],
                                ['Badge', a.badge], ['Title / Position', a.role],
                                ['Department', a.dept], ['Status', a.status]
                            ]
                        },
                        {
                            heading: 'Assignment', pairs: [
                                ['Site', SITE.name], ['Position', a.position],
                                ['Start Date', a.start], ['Rate', a.rate],
                                ['Unassignment Date', a.end],
                                ['Primary', a.primary ? 'Yes' : 'No']
                            ]
                        },
                        {
                            heading: 'Contact', pairs: [
                                ['Phone', a.phone], ['Email', a.email]
                            ]
                        }
                    ]
                });
            }

            case 'Emergency Contacts':
            case 'Other Contacts': {
                var c = CONTACTS[i];
                if (!c) return null;
                return itemView({
                    back: section, title: c.name, subtitle: c.role + ' · ' + SITE.name,
                    pills: '<span class="cp-pill cp-pill-blue">' + esc(c.priority) + '</span>',
                    groups: [{
                        heading: 'Contact', pairs: [
                            ['Name', c.name], ['Job Title', c.role],
                            ['Phone', c.phone], ['Email', c.email],
                            ['Priority', c.priority], ['Contactable', c.hours]
                        ]
                    }],
                    prose: [{ heading: 'Notes', text: c.note }]
                });
            }

            case 'Banned Employees': {
                var b = BANNED[i];
                if (!b) return null;
                return itemView({
                    back: 'Banned Employees', title: b.name, subtitle: b.id + ' · banned ' + b.on,
                    pills: '<span class="cp-pill cp-pill-red">Assignment blocked</span>',
                    groups: [{
                        heading: 'Ban Record', pairs: [
                            ['Employee', b.name], ['Employee ID', b.id],
                            ['Reason', b.reason], ['Banned On', b.on],
                            ['Banned By', b.by], ['Scope', b.scope]
                        ]
                    }],
                    prose: [{ heading: 'Notes', text: b.note }]
                });
            }

            case 'Notifications': {
                var flat = [];
                NOTIF_GROUPS.forEach(function (g) {
                    g.rules.forEach(function (r) { flat.push({ group: g.group, rule: r }); });
                });
                var n = flat[i];
                if (!n) return null;
                return itemView({
                    back: 'Notifications', title: n.rule, subtitle: n.group + ' · ' + SITE.name,
                    pills: '<span class="cp-state cp-state-off">Off</span>',
                    groups: [{
                        heading: 'Rule', pairs: [
                            ['Rule', n.rule], ['Group', n.group],
                            ['State', 'Off'], ['Site', SITE.name],
                            ['Channel', 'Email · in-app'], ['Recipients', SITE.email]
                        ]
                    }],
                    prose: [{
                        heading: 'Behaviour',
                        text: 'While this rule is off, no notification is raised for ' + n.rule.toLowerCase() +
                            ' at this site. Rule state and recipients are maintained by your ALEXIOS administrator.'
                    }]
                });
            }

            case 'Geofencing': {
                var areaLists = {
                    'Checkpoints': {
                        headers: ['Checkpoint', 'ID', 'Type'],
                        rows: [
                            ['Main Entrance Gate', 'CP-001', 'NFC'],
                            ['Server Room B', 'CP-003', 'Barcode'],
                            ['Loading Dock A', 'CP-004', 'Barcode']
                        ]
                    },
                    'Tour Routes': {
                        headers: ['Route', 'ID', 'Checkpoints'],
                        rows: [
                            ['Tower B — Floors 4-22', 'TOUR-A', '12'],
                            ['Parking Structure P1', 'TOUR-B', '10'],
                            ['Perimeter & Loading Dock', 'TOUR-C', '8']
                        ]
                    },
                    'Site Locations & Sections': {
                        headers: ['Location', 'Section', 'Floors'],
                        rows: [
                            ['Meridian Tower', 'Tower B', '4–22'],
                            ['Parking Structure', 'P1–P3', '3'],
                            ['External Perimeter', 'Grounds', '—']
                        ]
                    }
                };
                var link = GEO_LINKS[i];
                if (!link) {
                    var r = GEO_RESTRICTIONS[i - GEO_LINKS.length];
                    if (!r) return null;
                    return itemView({
                        back: 'Geofencing', title: r.name, subtitle: 'Mobile app restriction',
                        pills: statePill(r.on),
                        groups: [{
                            heading: 'Restriction', pairs: [
                                ['Restriction', r.name], ['State', r.on ? 'Enabled' : 'Disabled'],
                                ['Site', SITE.name], ['Applies To', 'All assigned employees']
                            ]
                        }],
                        prose: [{ heading: 'Behaviour', text: r.desc + '.' }]
                    });
                }
                var data = areaLists[link.name];
                return itemView({
                    back: 'Geofencing', title: link.name, subtitle: link.desc,
                    pills: '<span class="cp-state cp-state-on">Configured</span>',
                    tables: [{
                        heading: link.name,
                        headers: data.headers,
                        rows: data.rows.map(function (row) {
                            return '<tr>' + row.map(function (cell, ci) {
                                return '<td class="' + (ci === 0 ? 'cp-strong' : 'cp-muted') + '">' +
                                    esc(cell) + '</td>';
                            }).join('') + '</tr>';
                        })
                    }]
                });
            }

            case 'Email Settings':
                return itemView({
                    back: 'Email Settings', title: 'PDF Attached as a Link',
                    subtitle: 'Report delivery setting · ' + SITE.name,
                    pills: statePill(true),
                    groups: [{
                        heading: 'Setting', pairs: [
                            ['Setting', 'PDF Attached as a Link'], ['State', 'Enabled'],
                            ['Recipient', SITE.email], ['Site', SITE.name]
                        ]
                    }],
                    prose: [{
                        heading: 'Behaviour',
                        text: 'Reports for ' + SITE.name + ' are sent to ' + SITE.email +
                            ' with PDFs as downloadable links rather than email attachments.'
                    }]
                });

            case 'Site Assets': {
                var assets = portalAssets();
                var s = assets[i];
                if (!s) return null;
                var cls = s.condition === 'Operational' ? 'cp-pill-green'
                    : s.condition === 'Needs Service' ? 'cp-pill-amber' : 'cp-pill-red';
                var photo = (s.photos && s.photos.length)
                    ? '<div class="cp-section"><span class="cp-k">Pictures</span>' +
                      '<div class="cp-view-hero" style="margin-top:10px"><img alt="' + esc(s.name) +
                      '" src="' + s.photos[0] + '" /></div></div>'
                    : '';
                return itemView({
                    back: 'Site Assets', title: s.name,
                    subtitle: (s.ref ? s.ref + ' · ' : '') + s.category,
                    pills: '<span class="cp-pill ' + cls + '">' + esc(s.condition) + '</span>',
                    groups: [{
                        heading: 'Asset', pairs: [
                            ['Asset Name', s.name], ['Category', s.category],
                            ['Asset ID / Serial', s.ref], ['Location On Site', s.location],
                            ['Condition', s.condition], ['Quantity', String(s.qty || 1)],
                            ['Last Checked', s.lastChecked || '—'],
                            ['Pictures', (s.photos && s.photos.length) ? s.photos.length + '' : 'None']
                        ]
                    }],
                    prose: s.description ? [{ heading: 'Description', text: s.description }] : []
                }) + photo;
            }

            case 'Checklists': {
                var cfg = portalChecklists();
                var rows = [];
                ['clockIn', 'clockOut'].forEach(function (key) {
                    CHECKLIST_ITEMS.forEach(function (item) {
                        rows.push({ phase: key === 'clockIn' ? 'Clock In' : 'Clock Out', item: item, key: key });
                    });
                });
                var it = rows[i];
                if (!it) return null;
                var row = null;
                if (cfg && cfg[it.key]) {
                    Object.keys(cfg[it.key]).forEach(function (k) {
                        var id = it.item.toLowerCase().replace(/[^a-z]+/g, '-');
                        if (id.indexOf(k.split('-')[0]) !== -1) row = cfg[it.key][k];
                    });
                }
                var on = !!(row && row.on);
                return itemView({
                    back: 'Checklists', title: it.item, subtitle: it.phase + ' · ' + SITE.name,
                    pills: statePill(on, 'Required', 'Not required'),
                    groups: [{
                        heading: 'Checklist Item', pairs: [
                            ['Item', it.item], ['Phase', it.phase],
                            ['State', on ? 'Required' : 'Not required'],
                            ['Positions In Scope', (on && row && row.positions)
                                ? row.positions.join(', ') : 'All positions'],
                            ['Photo Required', on ? 'Per admin configuration' : '—']
                        ]
                    }],
                    prose: [{
                        heading: 'Behaviour',
                        text: on
                            ? 'This item appears in the guard app at ' + it.phase.toLowerCase() +
                              ' and must be completed before the action can proceed.'
                            : 'This item is not currently required at ' + it.phase.toLowerCase() +
                              ' for this site.'
                    }]
                });
            }

            default:
                return null;
        }
    };

    var profileSection = function (name) {
        switch (name) {

            case 'Overview':
                return '<h3 class="cp-sec-title">Site Overview</h3>' +
                    '<div class="cp-pairs">' +
                    pair('Site Name', SITE.name) + pair('Unique ID', SITE.id) +
                    pair('Account Type', SITE.accountType) + pair('Status', SITE.status) +
                    pair('Time Zone', SITE.timezone) + pair('Phone', SITE.phone) +
                    pair('Email', SITE.email) + pair('Website', SITE.website) +
                    pair('City / State', SITE.city) + pair('Country', SITE.country) +
                    pair('Account Rep', SITE.accountRep) + pair('Sales Rep', SITE.salesRep) +
                    pair('Added On', SITE.added) + pair('Assigned Manager', SITE.manager) +
                    '</div>' +
                    '<div class="cp-section"><span class="cp-k">Manager / Main Contact</span>' +
                    '<div class="cp-pairs" style="margin-top:10px">' +
                    pair('Manager Name', SITE.contact) + pair('Manager Position', SITE.contactRole) +
                    pair('Phone', SITE.phone) + pair('Email', SITE.email) +
                    '</div></div>' +
                    '<div class="cp-section"><span class="cp-k">Address</span>' +
                    '<div class="cp-pairs" style="margin-top:10px">' +
                    pair('Address', SITE.address) + pair('Bill-To Address', SITE.address) +
                    pair('City', 'Los Angeles') + pair('State', 'CA') +
                    pair('ZIP', '90001') + pair('Country', SITE.country) +
                    '</div></div>' +
                    '<div class="cp-section"><span class="cp-k">Tags</span>' +
                    '<div class="cp-tags"><span class="cp-pill cp-pill-grey">banking</span>' +
                    '<span class="cp-pill cp-pill-grey">downtown</span></div></div>';

            case 'Post Orders':
                return '<h3 class="cp-sec-title">Post Orders</h3>' +
                    table(['Title', 'Updated On', ''], POST_ORDERS.map(function (p, i) {
                        return itemRow(i, '<td class="cp-strong">' + esc(p.title) + '</td>' +
                            '<td class="cp-muted">' + esc(p.updated) + '</td>');
                    }));

            case 'Positions / Job Types':
                return '<h3 class="cp-sec-title">Positions / Job Types</h3>' +
                    table(['UID', 'Position Title', 'TPT Hours', 'Bill Rate', 'Holiday Rate', 'Temporary', ''],
                        POSITIONS.map(function (p, i) {
                            return itemRow(i, '<td class="cp-mono cp-muted">' + esc(p.uid) + '</td>' +
                                '<td class="cp-strong">' + esc(p.title) + '</td>' +
                                '<td>' + esc(p.hours) + '</td><td class="cp-mono">' + esc(p.bill) + '</td>' +
                                '<td class="cp-mono">' + esc(p.holiday) + '</td>' +
                                '<td>' + esc(p.temp) + '</td>');
                        }));

            case 'Assigned Employees':
                return '<h3 class="cp-sec-title">Assigned Employees</h3>' +
                    table(['Employee', 'Position', 'Start Date', 'Rate', 'Unassignment Date', 'Status', ''],
                        ASSIGNED.map(function (a, i) {
                            return itemRow(i, '<td class="cp-strong">' + esc(a.name) + '</td>' +
                                '<td>' + esc(a.role) + '</td><td>' + esc(a.start) + '</td>' +
                                '<td class="cp-mono">' + esc(a.rate) + '</td>' +
                                '<td class="cp-muted">' + esc(a.end) + '</td>' +
                                '<td>' + (a.primary
                                    ? '<span class="cp-pill cp-pill-blue">Primary</span>'
                                    : '<span class="cp-pill cp-pill-grey">Assigned</span>') + '</td>');
                        }));

            case 'Emergency Contacts':
                return '<h3 class="cp-sec-title">Emergency Contacts</h3>' +
                    CONTACTS.map(function (c, i) {
                        return '<div class="cp-contact is-click" data-pitem="' + i + '">' +
                            '<span class="cp-contact-av">' + esc(initialsOf(c.name)) + '</span>' +
                            '<span class="cp-contact-main">' +
                            '<span class="cp-contact-name">' + esc(c.name) + '</span>' +
                            '<span class="cp-contact-role">' + esc(c.role) + '</span></span>' +
                            '<span class="cp-contact-meta">' + esc(c.phone) + '<br>' +
                            '<span class="cp-muted">' + esc(c.email) + '</span></span></div>';
                    }).join('');

            case 'Other Contacts':
                return '<h3 class="cp-sec-title">Other Contacts</h3>' +
                    table(['Name', 'Job Title', 'Phone', 'Email', ''], CONTACTS.map(function (c, i) {
                        return itemRow(i, '<td class="cp-strong">' + esc(c.name) + '</td>' +
                            '<td>' + esc(c.role) + '</td>' +
                            '<td class="cp-mono">' + esc(c.phone) + '</td>' +
                            '<td class="cp-muted">' + esc(c.email) + '</td>');
                    }));

            case 'Banned Employees':
                return '<h3 class="cp-sec-title">Banned Employees</h3>' +
                    '<p class="cp-prose" style="margin-bottom:14px">Banned employees cannot be assigned to ' +
                    'this site. Assignment is blocked automatically.</p>' +
                    table(['Employee', 'Employee ID', 'Reason', 'Banned On', ''], BANNED.map(function (b, i) {
                        return itemRow(i, '<td class="cp-strong">' + esc(b.name) + '</td>' +
                            '<td class="cp-mono cp-muted">' + esc(b.id) + '</td>' +
                            '<td>' + esc(b.reason) + '</td>' +
                            '<td class="cp-muted">' + esc(b.on) + '</td>');
                    }));

            case 'Notifications':
                return '<h3 class="cp-sec-title">Notification Rules</h3>' +
                    (function () {
                        var at = -1;
                        return NOTIF_GROUPS.map(function (g) {
                            return '<div class="cp-group-title">' + esc(g.group) + '</div>' +
                                g.rules.map(function (r) {
                                    at++;
                                    return ruleRow(r, '', false, 'On', 'Off', at);
                                }).join('');
                        }).join('');
                    })();

            case 'Geofencing':
                return '<h3 class="cp-sec-title">Geofencing</h3>' +
                    '<div class="cp-group-title">Configured Areas</div>' +
                    GEO_LINKS.map(function (l, i) {
                        return '<div class="cp-rule is-click" data-pitem="' + i + '">' +
                            '<span class="cp-rule-name">' + esc(l.name) +
                            '<span class="cp-rule-sub">' + esc(l.desc) + '</span></span>' +
                            '<span class="cp-state cp-state-on">Configured</span>' +
                            '<span class="cp-chev">' + I.chevR + '</span></div>';
                    }).join('') +
                    '<div class="cp-group-title">Site Boundary</div>' +
                    '<div class="cp-map" style="min-height:230px">' +
                    '<span class="cp-map-label">' + esc(SITE.area.toUpperCase()) + '</span>' +
                    OFFICERS.map(function (o) {
                        return '<span class="cp-pin' + (o.stale ? ' is-stale' : '') + '" style="left:' +
                            o.x + '%;top:' + o.y + '%" title="' + esc(o.name) + '">' +
                            esc(o.badge.replace('S-', '')) + '</span>';
                    }).join('') + '</div>' +
                    '<p class="cp-prose" style="font-size:11px">Boundary and clock-in radius are maintained ' +
                    'by your ALEXIOS administrator.</p>' +
                    '<div class="cp-group-title">Mobile App Restrictions</div>' +
                    GEO_RESTRICTIONS.map(function (r, i) {
                        return ruleRow(r.name, r.desc, r.on, undefined, undefined, GEO_LINKS.length + i);
                    }).join('');

            case 'Email Settings':
                return '<h3 class="cp-sec-title">Email Settings</h3>' +
                    ruleRow('PDF Attached as a Link',
                        'Send report PDFs as links instead of email attachments', true,
                        undefined, undefined, 0) +
                    '<div class="cp-section"><span class="cp-k">Delivery</span>' +
                    '<p class="cp-prose">Reports for ' + esc(SITE.name) + ' are sent to ' +
                    esc(SITE.email) + ' with PDFs as downloadable links.</p></div>';

            case 'Site Assets': {
                var assets = portalAssets();
                var counts = {};
                assets.forEach(function (a) {
                    counts[a.category] = (counts[a.category] || 0) + 1;
                });
                return '<h3 class="cp-sec-title">Site Assets</h3>' +
                    '<div class="cp-asset-counts">' +
                    '<span class="cp-count-chip">All <b>' + assets.length + '</b></span>' +
                    Object.keys(counts).map(function (c) {
                        return '<span class="cp-count-chip">' + esc(c) + ' <b>' + counts[c] + '</b></span>';
                    }).join('') + '</div>' +
                    table(['Asset', 'Category', 'Asset ID', 'Location', 'Condition', 'Qty', ''],
                        assets.map(function (a, i) {
                            var cls = a.condition === 'Operational' ? 'cp-pill-green'
                                : a.condition === 'Needs Service' ? 'cp-pill-amber' : 'cp-pill-red';
                            return itemRow(i, '<td class="cp-strong">' + esc(a.name) + '</td>' +
                                '<td>' + esc(a.category) + '</td>' +
                                '<td class="cp-mono cp-muted">' + esc(a.ref || '—') + '</td>' +
                                '<td>' + esc(a.location || '—') + '</td>' +
                                '<td><span class="cp-pill ' + cls + '">' + esc(a.condition) + '</span></td>' +
                                '<td>' + esc(a.qty || 1) + '</td>');
                        }));
            }

            case 'Checklists': {
                var cfg = portalChecklists();
                var phase = function (label, key, base) {
                    return '<div class="cp-group-title">' + label + '</div>' +
                        CHECKLIST_ITEMS.map(function (item, ii) {
                            var id = item.toLowerCase().replace(/[^a-z]+/g, '-');
                            var row = null;
                            if (cfg && cfg[key]) {
                                Object.keys(cfg[key]).forEach(function (k) {
                                    if (id.indexOf(k.split('-')[0]) !== -1) row = cfg[key][k];
                                });
                            }
                            var on = !!(row && row.on);
                            return ruleRow(item,
                                on && row.positions
                                    ? row.positions.length + ' position(s) in scope'
                                    : '',
                                on, 'Required', 'Not required', base + ii);
                        }).join('');
                };
                return '<h3 class="cp-sec-title">Checklists</h3>' +
                    phase('Clock In', 'clockIn', 0) +
                    phase('Clock Out', 'clockOut', CHECKLIST_ITEMS.length) +
                    '<p class="cp-prose" style="font-size:11px;margin-top:16px">Enabled items appear in the ' +
                    'guard app at clock in or clock out.</p>';
            }

            default:
                return '<div class="cp-empty">Section not available.</div>';
        }
    };

    var viewProfile = function () {
        var current = state.profileSection || 'Overview';

        // A chosen row shows its own view in place of the listing.
        var inner = null;
        if (state.profileItem !== null && state.profileItem !== undefined) {
            inner = profileItemView(current, Number(state.profileItem));
        }
        if (inner === null || inner === undefined) inner = profileSection(current);

        return pageHead('Client Profile', SITE.name + ' · ' + SITE.id, 'dashboard') +
            '<div class="cp-profile">' +
            '<nav class="cp-pnav"><div class="cp-pnav-label">Navigation</div>' +
            PROFILE_SECTIONS.map(function (s) {
                return '<button class="' + (s === current ? 'is-on' : '') +
                    '" data-psec="' + esc(s) + '">' + esc(s) + '</button>';
            }).join('') + '</nav>' +
            '<div class="cp-card">' +
            '<div class="cp-ro">Read-only view. This record is maintained by your ALEXIOS administrator.</div>' +
            inner +
            '</div></div>';
    };

    // ------------------------------------------------------------ assign task

    var openAssignTask = function () {
        var overlay = document.createElement('div');
        overlay.className = 'cp-modal';
        overlay.innerHTML = '<div class="cp-dialog" role="dialog" aria-modal="true">' +
            '<div class="cp-dialog-head"><h3>Assign Task</h3>' +
            '<button class="cp-x" data-cancel>' + I.x + '</button></div>' +
            '<div class="cp-dialog-body">' +
            '<div class="cp-field"><label class="cp-label">Task detail <span style="color:#ef4444">*</span></label>' +
            '<input class="cp-input" style="width:100%" data-f="body" placeholder="e.g. Check the visitor register against issued badges" /></div>' +
            '<div class="cp-row2">' +
            '<div class="cp-field"><label class="cp-label">Assign to</label>' +
            '<select class="cp-select" style="width:100%" data-f="assignee">' +
            '<option value="">Leave unassigned</option>' +
            SITE_EMPLOYEES.map(function (e) { return '<option>' + esc(e) + '</option>'; }).join('') +
            '</select></div>' +
            '<div class="cp-field"><label class="cp-label">Date</label>' +
            '<input class="cp-input" style="width:100%" type="date" data-f="date" value="' + isoToday() + '" /></div>' +
            '</div>' +
            '<div class="cp-row2">' +
            '<div class="cp-field"><label class="cp-label">Priority</label>' +
            '<select class="cp-select" style="width:100%" data-f="tier">' +
            '<option value="routine">Routine</option><option value="warn">Time sensitive</option>' +
            '<option value="critical">Critical</option></select></div>' +
            '<div class="cp-field"><label class="cp-label">Due by</label>' +
            '<input class="cp-input" style="width:100%" type="time" data-f="due" value="17:00" /></div>' +
            '</div>' +
            '<div class="cp-note">Unassigned tasks are placed in the Unassigned section of the schedule. ' +
            'Either way the assigned manager (' + esc(SITE.manager) + ') is notified.</div>' +
            '<div data-warn></div>' +
            '</div>' +
            '<div class="cp-dialog-foot">' +
            '<button class="cp-btn" data-cancel>Cancel</button>' +
            '<button class="cp-btn cp-btn-primary" data-save>Create Task</button>' +
            '</div></div>';
        document.body.appendChild(overlay);

        var field = function (n) { return overlay.querySelector('[data-f="' + n + '"]'); };
        var close = function () { overlay.remove(); };

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) { close(); return; }
            var btn = e.target.closest ? e.target.closest('button') : null;
            if (!btn) return;

            if (btn.hasAttribute('data-cancel')) { close(); return; }

            if (btn.hasAttribute('data-save')) {
                var body = field('body').value.trim();
                if (!body) {
                    field('body').style.borderColor = '#ef4444';
                    field('body').focus();
                    return;
                }
                var assignee = field('assignee').value;
                var tier = field('tier').value;
                var due = field('due').value;
                var dateVal = field('date').value;

                var list = readTasks();
                list.unshift({
                    id: 'T-' + Date.now().toString(36).slice(-4).toUpperCase(),
                    tier: tier,
                    tag: 'Client Request',
                    body: body,
                    due: due ? 'Due by ' + due : 'No due time',
                    source: 'Client',
                    origin: 'Client portal',
                    assignee: assignee ? assignee.split(' · ')[0] : '',
                    date: dateVal || isoToday()
                });
                writeTasks(list);
                close();
                render();
                toast(assignee
                    ? 'Task created and assigned to ' + assignee.split(' · ')[0] +
                      '. ' + SITE.manager + ' has been notified.'
                    : 'Task created as unassigned and placed in the schedule’s Unassigned section. ' +
                      SITE.manager + ' has been notified.');
            }
        });

        overlay.addEventListener('input', function (e) {
            if (e.target.style) e.target.style.borderColor = '';
        });
    };

    var openTicket = function (index) {
        var t = TICKETS[index];
        if (!t) return;
        var overlay = document.createElement('div');
        overlay.className = 'cp-modal';
        overlay.innerHTML = '<div class="cp-dialog">' +
            '<div class="cp-dialog-head"><h3>' + esc(t.type) + '</h3>' +
            '<button class="cp-x" data-cancel>' + I.x + '</button></div>' +
            '<div class="cp-dialog-body"><div class="cp-pairs">' +
            '<div><span class="cp-k">Date</span><span class="cp-v cp-mono">' + esc(t.date) + '</span></div>' +
            '<div><span class="cp-k">Officer</span><span class="cp-v">' + esc(t.first + ' ' + t.last) + '</span></div>' +
            '<div><span class="cp-k">Location</span><span class="cp-v">' + esc(t.location) + '</span></div>' +
            '<div><span class="cp-k">Status</span><span class="cp-v">' + esc(t.status) + '</span></div>' +
            '</div><div class="cp-section"><span class="cp-k">Subject</span>' +
            '<p class="cp-prose">' + esc(t.subject) + '</p></div>' +
            '<div class="cp-section"><span class="cp-k">How this was raised</span>' +
            '<p class="cp-prose">The officer was clocked in but the guard app recorded no activity for more ' +
            'than 15 minutes, and the coordinate returned on the follow-up fetch was unchanged. The system ' +
            'raised this ticket automatically.</p></div></div>' +
            '<div class="cp-dialog-foot"><button class="cp-btn cp-btn-primary" data-cancel>Close</button></div>' +
            '</div>';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay || (e.target.closest && e.target.closest('[data-cancel]'))) overlay.remove();
        });
    };

    var downloadReport = function (id) {
        var r = REPORTS.filter(function (x) { return x.id === id; })[0];
        if (!r || !window.AlexiosPDF) return;
        var bytes = window.AlexiosPDF.save(r.id + '-' + r.type.replace(/\s+/g, '-') + '.pdf', {
            title: r.type,
            subtitle: SITE.name + ' · ' + r.date + ' · ' + r.time,
            meta: [
                ['Report ID', r.id],
                ['Submitted By', r.by + ' · ' + r.badge],
                ['Approval', r.approval + (r.approver ? ' — ' + r.approver : '')],
                ['Site', SITE.name + ', ' + SITE.address + ', ' + SITE.city]
            ],
            sections: [
                { heading: 'Summary', body: r.summary },
                { heading: 'Report Detail', body: r.detail }
            ],
            footer: 'Generated from the ALEXIOS Client Portal · ' + todayLabel()
        });
        toast('PDF generated — ' + r.id + ' (' + Math.round(bytes / 1024) + ' KB)');
    };

    // ----------------------------------------------------------------- render

    var shellHtml = function () {
        var initials = SITE.contact.split(/\s+/).map(function (p) { return p[0]; }).join('').slice(0, 2);
        return '<div class="cp-bar">' +
            '<div class="cp-brand"><strong>Alexios</strong><span>Client Portal</span></div>' +
            '<div class="cp-bar-site">' + esc(SITE.name) + '</div>' +
            '<div class="cp-bar-right">' +
            '<button class="cp-user" data-act="menu">' +
            '<span class="cp-avatar">' + esc(initials.toUpperCase()) + '</span>' +
            '<span class="cp-user-name">' + esc(SITE.contact) + '</span>' +
            '</button></div></div>' +
            (state.menuOpen
                ? '<div class="cp-menu">' +
                  '<button data-go="profile">' + I.user + 'Client Profile</button>' +
                  '<button data-go="dashboard">' + I.ext + 'Dashboard</button>' +
                  '<div class="cp-menu-sep"></div>' +
                  '<button class="is-danger" data-act="logout">' + I.out + 'Log Out</button>' +
                  '</div>'
                : '') +
            '<div class="cp-body"></div>';
    };

    var routeHtml = function () {
        switch (state.route) {
            case 'dashboard': return viewDashboard();
            case 'tours': return viewTours();
            case 'tour': return viewTour();
            case 'activity': return viewActivity();
            case 'reports': return viewReports();
            case 'report': return viewReport();
            case 'tasks': return viewTasks();
            case 'map': return viewMap();
            case 'tickets': return viewTickets();
            case 'profile': return viewProfile();
            default: return viewDashboard();
        }
    };

    var render = function () {
        if (!root) return;

        if (!state.signedIn) {
            root.innerHTML = state.route === 'forgot' ? viewForgot()
                : state.route === 'setpw' ? viewSetPassword()
                : viewLogin();
            return;
        }

        root.innerHTML = shellHtml();
        root.querySelector('.cp-body').innerHTML = routeHtml();
    };

    var closePortal = function () {
        if (root) { root.remove(); root = null; }
        document.documentElement.style.overflow = '';
    };

    var openPortal = function () {
        if (root) return;
        root = document.createElement('div');
        root.className = 'cp-root';
        root.id = 'cp-root';
        document.body.appendChild(root);
        document.documentElement.style.overflow = 'hidden';

        state.route = 'login';
        state.signedIn = false;
        state.arg = null;
        render();

        root.addEventListener('click', function (e) {
            var el = e.target.closest ? e.target.closest('[data-go],[data-act],[data-psec],[data-pitem],[data-pback],[data-tour],[data-report],[data-report-type],[data-task-filter],[data-page],[data-download],[data-ticket]') : null;
            if (!el) {
                if (state.menuOpen) { state.menuOpen = false; render(); }
                return;
            }

            // auth actions
            var act = el.getAttribute('data-act');
            if (act === 'signin') { state.signedIn = true; go('dashboard'); return; }
            if (act === 'forgot') { go('forgot'); return; }
            if (act === 'sendreset') { go('forgot', 'sent'); return; }
            if (act === 'setpw') { go('setpw'); return; }
            if (act === 'savepw') { go('setpw', 'done'); return; }
            if (act === 'tologin') { go('login'); return; }
            if (act === 'menu') { state.menuOpen = !state.menuOpen; render(); return; }
            if (act === 'logout') { closePortal(); return; }
            if (act === 'assign-task') { openAssignTask(); return; }

            if (el.hasAttribute('data-psec')) {
                state.profileSection = el.getAttribute('data-psec');
                state.profileItem = null;
                render();
                return;
            }

            if (el.hasAttribute('data-pitem')) {
                state.profileItem = el.getAttribute('data-pitem');
                render();
                return;
            }

            if (el.hasAttribute('data-pback')) {
                state.profileItem = null;
                render();
                return;
            }

            if (el.hasAttribute('data-go')) { go(el.getAttribute('data-go')); return; }
            if (el.hasAttribute('data-tour')) { go('tour', el.getAttribute('data-tour')); return; }
            if (el.hasAttribute('data-report')) { go('report', el.getAttribute('data-report')); return; }
            if (el.hasAttribute('data-report-type')) {
                state.reportFilter = el.getAttribute('data-report-type');
                state.reportSearch = '';
                go('reports');
                return;
            }
            if (el.hasAttribute('data-task-filter')) {
                state.taskFilter = el.getAttribute('data-task-filter');
                render();
                return;
            }
            if (el.hasAttribute('data-page')) {
                state.tourPage += el.getAttribute('data-page') === 'next' ? 1 : -1;
                if (state.tourPage < 1) state.tourPage = 1;
                render();
                return;
            }
            if (el.hasAttribute('data-download')) { downloadReport(el.getAttribute('data-download')); return; }
            if (el.hasAttribute('data-ticket')) { openTicket(Number(el.getAttribute('data-ticket'))); return; }
        });

        root.addEventListener('change', function (e) {
            var t = e.target;
            if (t.hasAttribute('data-tour-filter')) { state.tourFilter = t.value; state.tourPage = 1; render(); }
            else if (t.hasAttribute('data-activity-date')) { state.activityDate = t.value; render(); }
            else if (t.hasAttribute('data-activity-kind')) { state.activityKind = t.value; render(); }
            else if (t.hasAttribute('data-report-filter')) { state.reportFilter = t.value; render(); }
            else if (t.hasAttribute('data-ticket-status')) { state.ticketStatus = t.value; render(); }
        });

        root.addEventListener('input', function (e) {
            if (e.target.hasAttribute('data-report-search')) {
                state.reportSearch = e.target.value;
                var card = root.querySelector('.cp-body');
                var pos = e.target.selectionStart;
                card.innerHTML = routeHtml();
                var again = card.querySelector('[data-report-search]');
                if (again) { again.focus(); again.setSelectionRange(pos, pos); }
            }
        });
    };

    // ----------------------------------------------------- entry button (admin)

    var findOverviewHeader = function () {
        var wraps = [].slice.call(document.querySelectorAll('div.p-6.space-y-6'));
        for (var i = 0; i < wraps.length; i++) {
            var text = wraps[i].innerText || '';
            if (!/SITE NAME/i.test(text) || !/ACCOUNT TYPE/i.test(text)) continue;
            var head = [].slice.call(wraps[i].children).filter(function (c) {
                return /rounded-2xl/.test(String(c.className)) && /CLT-\d/.test(c.innerText || '');
            })[0];
            if (head) return head;
        }
        return null;
    };

    var tick = function () {
        var head = findOverviewHeader();
        if (!head) return;
        if (head.querySelector('.cpx-open')) return;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cpx-open';
        btn.innerHTML = I.ext + '<span>Client Portal</span>';
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openPortal();
        });
        head.appendChild(btn);
    };

    setInterval(tick, 400);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tick);
    } else {
        tick();
    }
})();
