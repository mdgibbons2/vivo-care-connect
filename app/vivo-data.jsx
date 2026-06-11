// ============================================================
// Vivo Care Connect — shared sample data
// All patients are 60+. Data is consistent across every screen.
// Exposed on window.VIVO and window.VH (helpers).
// ============================================================
(function () {
  const palette = ['#2a6cb0', '#1aa35a', '#57b0c4', '#d37445', '#7c9971', '#618abd', '#a779b5', '#8a6455', '#6fb09b', '#415364'];

  // ---- Providers (Atlanta-area) ----
  const ORGS = {
    piedmont: { org: 'Piedmont Primary Care', practitioner: 'Dr. Anita Patel', system: 'Piedmont Healthcare' },
    emory:    { org: 'Emory Cardiology',      practitioner: 'Dr. James Okafor', system: 'Emory Healthcare' },
    grady:    { org: 'Grady Internal Medicine',practitioner: 'Dr. Marcus Lee',  system: 'Grady Health System' },
    northside:{ org: 'Northside Family Medicine',practitioner: 'Dr. Priya Raman',system: 'Northside Hospital' },
    wellstar: { org: 'Wellstar Geriatrics',   practitioner: 'Dr. Daniel Cho',  system: 'Wellstar Health' },
  };

  // ---- Referrals / patients (10, all 60+) ----
  const REFERRALS = [
    {
      id: 'R-1042', name: 'Margaret Chen', age: 72, status: 'new',
      dob: '1953-08-14', phone: '(404) 555-0172', email: 'm.chen@email.com',
      address: '418 Virginia Ave NE, Atlanta, GA 30306',
      emergency: 'David Chen (son) — (404) 555-0199',
      org: 'piedmont', service: 'Referral to physical activity program',
      reason: 'Lack of physical exercise (Z72.3)', received: 'Jun 9, 2026', receivedAgo: '10 min ago',
      order: 'ORD-88241',
      goals: ['Build up to 150 min/week of moderate exercise', 'Strength training 2× per week'],
      baseline: { daysWeek: 0, minWeek: 0, strengthDays: 0 },
      note: 'Patient is motivated but worried about her knees — please start gently. — Dr. Patel',
    },
    {
      id: 'R-1039', name: 'Robert Alvarez', age: 68, status: 'inprogress',
      dob: '1957-11-02', phone: '(770) 555-0143', email: 'ralvarez@email.com',
      address: '1290 Briarcliff Rd NE, Atlanta, GA 30306',
      emergency: 'Lucia Alvarez (wife) — (770) 555-0144',
      org: 'emory', service: 'Referral to physical activity program',
      reason: 'Cardiac rehabilitation maintenance', received: 'May 12, 2026', receivedAgo: '4 weeks ago',
      order: 'ORD-87903', vivo: 'active', attended: '9 of 12', nextDue: 'Jun 16, 2026',
      goals: ['150 min/week moderate exercise', 'Strength training 2× per week', 'Maintain resting HR < 90'],
      baseline: { daysWeek: 1, minWeek: 30, strengthDays: 0 },
      note: 'Cleared for moderate activity. Monitor exertion — recent stent. — Dr. Okafor',
    },
    {
      id: 'R-1040', name: 'Doris Whitfield', age: 81, status: 'accepted',
      dob: '1944-03-21', phone: '(404) 555-0188', email: 'doris.w@email.com',
      address: '77 Peachtree Pl NE, Atlanta, GA 30309',
      emergency: 'Carol Whitfield (daughter) — (404) 555-0190',
      org: 'grady', service: 'Referral to physical activity program',
      reason: 'Knee osteoarthritis', received: 'Jun 2, 2026', receivedAgo: '1 week ago',
      order: 'ORD-88010', vivo: 'trial', attended: '2 of 4', nextDue: 'Jun 20, 2026',
      goals: ['Improve balance and mobility', 'Reduce fall risk'],
      baseline: { daysWeek: 0, minWeek: 0, strengthDays: 0 },
      note: 'Uses a cane. Level 1 recommended to start. — Dr. Lee',
    },
    {
      id: 'R-1021', name: 'Frank Osei', age: 75, status: 'completed',
      dob: '1950-06-09', phone: '(678) 555-0121', email: 'frank.osei@email.com',
      address: '512 Moreland Ave SE, Atlanta, GA 30316',
      emergency: 'Ama Osei (wife) — (678) 555-0122',
      org: 'northside', service: 'Referral to physical activity program',
      reason: 'Type 2 diabetes — activity counseling', received: 'Mar 3, 2026', receivedAgo: '14 weeks ago',
      order: 'ORD-86655', vivo: 'active', attended: '11 of 12',
      goals: ['150 min/week moderate exercise', 'Improve HbA1c'],
      baseline: { daysWeek: 1, minWeek: 40, strengthDays: 0 },
      note: 'Completed 12-week program with excellent attendance. — Dr. Raman',
    },
    {
      id: 'R-1035', name: 'Eleanor Briggs', age: 70, status: 'rejected',
      dob: '1955-12-30', phone: '(404) 555-0167', email: 'e.briggs@email.com',
      address: '900 Ponce De Leon Ave NE, Atlanta, GA 30306',
      emergency: 'Tom Briggs (husband) — (404) 555-0168',
      org: 'piedmont', service: 'Referral to physical activity program',
      reason: 'Lack of physical exercise (Z72.3)', received: 'May 28, 2026', receivedAgo: '2 weeks ago',
      order: 'ORD-87780', rejectReason: 'Patient declined — prefers in-person program closer to home.',
      goals: ['150 min/week moderate exercise'],
      baseline: { daysWeek: 2, minWeek: 60, strengthDays: 0 },
      note: 'Patient declined enrollment after intro call. — Vivo intake',
    },
    {
      id: 'R-1043', name: 'Harold Kim', age: 66, status: 'new',
      dob: '1959-09-17', phone: '(770) 555-0210', email: 'h.kim@email.com',
      address: '233 Clairemont Ave, Decatur, GA 30030',
      emergency: 'Grace Kim (daughter) — (770) 555-0211',
      org: 'wellstar', service: 'Referral to physical activity program',
      reason: 'Hypertension — lifestyle modification', received: 'Jun 9, 2026', receivedAgo: '1 hr ago',
      order: 'ORD-88250',
      goals: ['150 min/week moderate exercise', 'Lower blood pressure'],
      baseline: { daysWeek: 1, minWeek: 45, strengthDays: 1 },
      note: 'Active golfer, looking to add structured strength work. — Dr. Cho',
    },
    {
      id: 'R-1031', name: 'Gloria Battle', age: 78, status: 'inprogress',
      dob: '1947-04-25', phone: '(404) 555-0155', email: 'gloria.b@email.com',
      address: '145 Auburn Ave NE, Atlanta, GA 30303',
      emergency: 'Renee Battle (daughter) — (404) 555-0156',
      org: 'grady', service: 'Referral to physical activity program',
      reason: 'Deconditioning post-hospitalization', received: 'Apr 20, 2026', receivedAgo: '7 weeks ago',
      order: 'ORD-87401', vivo: 'cancelled', attended: '3 of 14', nextDue: 'Jun 8, 2026',
      goals: ['Rebuild strength and endurance', '120 min/week moderate exercise'],
      baseline: { daysWeek: 0, minWeek: 0, strengthDays: 0 },
      note: 'Recovering from pneumonia. Attendance has slipped recently — please follow up. — Dr. Lee',
    },
    {
      id: 'R-1037', name: 'Stanley Petrov', age: 69, status: 'onhold',
      dob: '1956-07-11', phone: '(678) 555-0133', email: 's.petrov@email.com',
      address: '60 Marietta St NW, Atlanta, GA 30303',
      emergency: 'Irene Petrov (wife) — (678) 555-0134',
      org: 'emory', service: 'Referral to physical activity program',
      reason: 'Chronic low back pain', received: 'May 19, 2026', receivedAgo: '3 weeks ago',
      order: 'ORD-87702', holdReason: 'Awaiting PT clearance before starting.',
      goals: ['Improve core strength', 'Reduce back pain'],
      baseline: { daysWeek: 1, minWeek: 20, strengthDays: 0 },
      note: 'On hold pending physical therapy sign-off. — Dr. Okafor',
    },
    {
      id: 'R-1041', name: 'Beatrice Nwosu', age: 64, status: 'accepted',
      dob: '1961-10-05', phone: '(770) 555-0177', email: 'b.nwosu@email.com',
      address: '3500 Peachtree Rd NE, Atlanta, GA 30326',
      emergency: 'Chidi Nwosu (son) — (770) 555-0178',
      org: 'northside', service: 'Referral to physical activity program',
      reason: 'Osteopenia — weight-bearing exercise', received: 'Jun 5, 2026', receivedAgo: '5 days ago',
      order: 'ORD-88120', vivo: 'trial', attended: '3 of 4', nextDue: 'Jun 18, 2026',
      goals: ['Weight-bearing strength 3× per week', 'Improve bone density'],
      baseline: { daysWeek: 2, minWeek: 70, strengthDays: 1 },
      note: 'Eager to start. Prefers morning classes. — Dr. Raman',
    },
    {
      id: 'R-1009', name: 'Walter Mendez', age: 83, status: 'completed',
      dob: '1942-01-28', phone: '(404) 555-0102', email: 'w.mendez@email.com',
      address: '21 Edgewood Ave SE, Atlanta, GA 30303',
      emergency: 'Sofia Mendez (daughter) — (404) 555-0103',
      org: 'wellstar', service: 'Referral to physical activity program',
      reason: 'Frailty — fall prevention', received: 'Feb 16, 2026', receivedAgo: '17 weeks ago',
      order: 'ORD-86200', vivo: 'active', attended: '10 of 12',
      goals: ['Improve balance', 'Reduce fall risk', '90 min/week activity'],
      baseline: { daysWeek: 0, minWeek: 0, strengthDays: 0 },
      note: 'Graduated program. Notable balance improvement. — Dr. Cho',
    },
  ];

  REFERRALS.forEach((r, i) => { r.color = palette[i % palette.length]; r.provider = ORGS[r.org]; });

  // ---- Connected Care Managers (EHR systems) ----
  const CONNECTIONS = [
    { id: 'C1', name: 'Piedmont Healthcare', ehr: 'Epic', status: 'green', lastSync: '4 min ago', baseUrl: 'https://fhir.piedmont.org/api/FHIR/R4', auth: 'SMART Backend Services', clientId: 'a8f3••••••••2b1c', interval: '15 min', open: 12 },
    { id: 'C2', name: 'Emory Healthcare', ehr: 'Oracle Health', status: 'green', lastSync: '12 min ago', baseUrl: 'https://fhir.emoryhealthcare.org/r4', auth: 'SMART Backend Services', clientId: 'c1d9••••••••7f4a', interval: '15 min', open: 7 },
    { id: 'C3', name: 'Grady Health System', ehr: 'Epic', status: 'amber', lastSync: '3 hrs ago', baseUrl: 'https://fhir.gradyhealth.org/api/FHIR/R4', auth: 'SMART Backend Services', clientId: 'e5b2••••••••9a30', interval: '30 min', open: 3, warn: 'Access token expired — re-authentication required.' },
  ];

  // ---- Attendance logs (keyed by referral id; enrolled members only) ----
  // Each member takes ONE class type (Vivo, Vivo+, or Vivo Foundations) 2-3x/week.
  const ATTENDANCE = {
    'R-1039': [
      { date: 'Jun 9, 2026 10:00 AM ET', cls: 'Vivo+', dur: 45, trainer: 'Renata Alves', sync: 'sent' },
      { date: 'Jun 5, 2026 9:00 AM ET', cls: 'Vivo+', dur: 45, trainer: 'Marcus Bell', sync: 'sent' },
      { date: 'Jun 3, 2026 10:00 AM ET', cls: 'Vivo+', dur: 45, trainer: 'Renata Alves', sync: 'pending' },
      { date: 'May 30, 2026 9:00 AM ET', cls: 'Vivo+', dur: 40, trainer: 'Marcus Bell', sync: 'sent' },
      { date: 'May 27, 2026 10:00 AM ET', cls: 'Vivo+', dur: 45, trainer: 'Renata Alves', sync: 'sent' },
      { date: 'May 23, 2026 9:00 AM ET', cls: 'Vivo+', dur: 40, trainer: 'Marcus Bell', sync: 'sent' },
    ],
    'R-1040': [
      { date: 'Jun 8, 2026 11:00 AM ET', cls: 'Vivo Foundations', dur: 45, trainer: 'Dana Whitcomb', sync: 'pending' },
      { date: 'Jun 4, 2026 11:00 AM ET', cls: 'Vivo Foundations', dur: 40, trainer: 'Dana Whitcomb', sync: 'sent' },
    ],
    'R-1031': [
      { date: 'May 12, 2026 2:00 PM ET', cls: 'Vivo Foundations', dur: 40, trainer: 'Marcus Bell', sync: 'sent' },
      { date: 'May 5, 2026 2:00 PM ET', cls: 'Vivo Foundations', dur: 45, trainer: 'Dana Whitcomb', sync: 'sent' },
      { date: 'Apr 28, 2026 2:00 PM ET', cls: 'Vivo Foundations', dur: 45, trainer: 'Dana Whitcomb', sync: 'sent' },
    ],
    'R-1041': [
      { date: 'Jun 8, 2026 9:00 AM ET', cls: 'Vivo', dur: 45, trainer: 'Renata Alves', sync: 'pending' },
      { date: 'Jun 5, 2026 9:00 AM ET', cls: 'Vivo', dur: 45, trainer: 'Renata Alves', sync: 'sent' },
      { date: 'Jun 2, 2026 9:00 AM ET', cls: 'Vivo', dur: 45, trainer: 'Marcus Bell', sync: 'sent' },
    ],
    'R-1021': [
      { date: 'May 26, 2026 10:00 AM ET', cls: 'Vivo+', dur: 45, trainer: 'Marcus Bell', sync: 'sent' },
      { date: 'May 22, 2026 10:00 AM ET', cls: 'Vivo+', dur: 45, trainer: 'Renata Alves', sync: 'sent' },
      { date: 'May 19, 2026 10:00 AM ET', cls: 'Vivo+', dur: 45, trainer: 'Marcus Bell', sync: 'sent' },
      { date: 'May 15, 2026 10:00 AM ET', cls: 'Vivo+', dur: 40, trainer: 'Marcus Bell', sync: 'sent' },
    ],
    'R-1009': [
      { date: 'May 20, 2026 1:00 PM ET', cls: 'Vivo Foundations', dur: 45, trainer: 'Dana Whitcomb', sync: 'sent' },
      { date: 'May 16, 2026 1:00 PM ET', cls: 'Vivo Foundations', dur: 40, trainer: 'Renata Alves', sync: 'sent' },
      { date: 'May 13, 2026 1:00 PM ET', cls: 'Vivo Foundations', dur: 45, trainer: 'Dana Whitcomb', sync: 'sent' },
    ],
  };

  // ---- Submitted reports (keyed by referral id, newest first) ----
  // For 'final' reports, days/minutes/strengthDays are weekly averages over the program.
  const REPORTS = {
    'R-1039': [
      { type: 'progress', period: 'May 25 – May 31, 2026', start: '2026-05-25', end: '2026-05-31', sent: 'Jun 1, 2026', days: 2, minutes: 85, strengthDays: 2, statusText: 'Completed week 3, attendance strong.' },
      { type: 'progress', period: 'May 18 – May 24, 2026', start: '2026-05-18', end: '2026-05-24', sent: 'May 25, 2026', days: 1, minutes: 40, strengthDays: 1, statusText: 'First full week after intake. Started gently per cardiology guidance.' },
    ],
    'R-1021': [
      { type: 'final', period: 'Mar 9 – May 31, 2026', start: '2026-03-09', end: '2026-05-31', sent: 'Jun 2, 2026', days: 3, minutes: 142, strengthDays: 3, statusText: 'Program complete: 31 classes over 12 weeks, exceeding the weekly activity goal. Reports improved energy and blood sugar control.' },
      { type: 'progress', period: 'May 25 – May 31, 2026', start: '2026-05-25', end: '2026-05-31', sent: 'Jun 1, 2026', days: 1, minutes: 45, strengthDays: 1, statusText: 'Final week of the program.' },
      { type: 'progress', period: 'May 18 – May 24, 2026', start: '2026-05-18', end: '2026-05-24', sent: 'May 25, 2026', days: 2, minutes: 90, strengthDays: 2, statusText: 'Week 11: consistent attendance, full participation.' },
    ],
    'R-1009': [
      { type: 'final', period: 'Feb 23 – May 22, 2026', start: '2026-02-23', end: '2026-05-22', sent: 'May 26, 2026', days: 2, minutes: 90, strengthDays: 2, statusText: 'Graduated program. Notable balance improvement; reduced fall-risk score.' },
    ],
  };

  // ---- Recent activity feed (dashboard) ----
  const FEED = [
    { icon: 'ri-inbox-archive-line', text: '<strong>New referral received</strong> for Margaret Chen from Piedmont Primary Care', time: '10 min ago', tone: 'blue' },
    { icon: 'ri-send-plane-line', text: '<strong>Progress report sent</strong> for Robert Alvarez to Emory Cardiology', time: '2 hrs ago', tone: 'green' },
    { icon: 'ri-user-add-line', text: '<strong>Beatrice Nwosu enrolled</strong> as a Vivo member (Trial)', time: '5 hrs ago', tone: 'teal' },
    { icon: 'ri-error-warning-line', text: '<strong>Grady Health System</strong> connection needs re-authentication', time: '3 hrs ago', tone: 'amber' },
    { icon: 'ri-checkbox-circle-line', text: '<strong>Referral completed</strong> for Walter Mendez — final report sent to Wellstar', time: 'Yesterday', tone: 'green' },
    { icon: 'ri-inbox-archive-line', text: '<strong>New referral received</strong> for Harold Kim from Wellstar Geriatrics', time: '1 hr ago', tone: 'blue' },
  ];

  // ---- FHIR activity log ----
  const LOG = [
    { t: '2026-06-09 14:32:08', dir: 'in', method: 'GET', path: '/Task?owner=Organization/vivo&status=requested', sys: 'Piedmont Healthcare', code: 200, codeType: 'ok',
      json: { resourceType: 'Bundle', type: 'searchset', total: 1, entry: [{ resource: { resourceType: 'Task', id: 'task-88241', status: 'requested', intent: 'order', code: { text: 'Referral to physical activity program' }, for: { display: 'Margaret Chen' }, requester: { display: 'Dr. Anita Patel' } } }] } },
    { t: '2026-06-09 14:32:09', dir: 'out', method: 'POST', path: '/Patient', sys: 'Vivo (internal)', code: 201, codeType: 'ok',
      json: { resourceType: 'Patient', id: 'pat-1042', name: [{ family: 'Chen', given: ['Margaret'] }], birthDate: '1953-08-14', telecom: [{ system: 'phone', value: '(404) 555-0172' }] } },
    { t: '2026-06-09 12:05:44', dir: 'out', method: 'POST', path: '/Observation', sys: 'Emory Healthcare', code: 201, codeType: 'ok',
      json: { resourceType: 'Observation', status: 'final', category: [{ coding: [{ code: 'activity', display: 'Activity' }] }], code: { coding: [{ system: 'http://loinc.org', code: '89555-7', display: 'Exercise vital sign' }] }, subject: { display: 'Robert Alvarez' }, valueQuantity: { value: 135, unit: 'min/week' } } },
    { t: '2026-06-09 12:05:43', dir: 'out', method: 'PUT', path: '/Task/task-87903', sys: 'Emory Healthcare', code: 200, codeType: 'ok',
      json: { resourceType: 'Task', id: 'task-87903', status: 'in-progress', for: { display: 'Robert Alvarez' }, output: [{ type: { text: 'Progress report' }, valueReference: { reference: 'DiagnosticReport/dr-552' } }] } },
    { t: '2026-06-09 09:14:22', dir: 'out', method: 'POST', path: '/Observation', sys: 'Grady Health System', code: 422, codeType: 'err',
      json: { resourceType: 'OperationOutcome', issue: [{ severity: 'error', code: 'invalid', diagnostics: 'Observation.effectivePeriod is required for Exercise Vital Sign rollup.' }] } },
    { t: '2026-06-09 09:00:01', dir: 'in', method: 'GET', path: '/Task?owner=Organization/vivo&status=requested', sys: 'Grady Health System', code: 200, codeType: 'ok',
      json: { resourceType: 'Bundle', type: 'searchset', total: 1, entry: [{ resource: { resourceType: 'Task', id: 'task-88010', status: 'requested', for: { display: 'Doris Whitfield' }, reasonCode: { text: 'Knee osteoarthritis' } } }] } },
    { t: '2026-06-09 08:45:10', dir: 'out', method: 'PUT', path: '/Task/task-86200', sys: 'Wellstar Health', code: 200, codeType: 'ok',
      json: { resourceType: 'Task', id: 'task-86200', status: 'completed', for: { display: 'Walter Mendez' }, businessStatus: { text: 'Program completed — final report delivered' } } },
    { t: '2026-06-08 16:20:55', dir: 'out', method: 'POST', path: '/Observation', sys: 'Northside Hospital', code: 201, codeType: 'ok',
      json: { resourceType: 'Observation', status: 'final', code: { text: 'Exercise vital sign' }, subject: { display: 'Beatrice Nwosu' }, component: [{ code: { text: 'Days/week moderate-vigorous' }, valueQuantity: { value: 2 } }, { code: { text: 'Minutes/week' }, valueQuantity: { value: 120 } }] } },
    { t: '2026-06-08 15:02:33', dir: 'in', method: 'GET', path: '/Practitioner/dr-patel', sys: 'Piedmont Healthcare', code: 200, codeType: 'ok',
      json: { resourceType: 'Practitioner', id: 'dr-patel', name: [{ family: 'Patel', given: ['Anita'], prefix: ['Dr.'] }], qualification: [{ code: { text: 'MD' } }] } },
    { t: '2026-06-08 11:48:19', dir: 'out', method: 'POST', path: '/Observation', sys: 'Grady Health System', code: 201, codeType: 'ok',
      json: { resourceType: 'Observation', status: 'final', code: { text: 'Exercise vital sign' }, subject: { display: 'Gloria Battle' }, component: [{ code: { text: 'Days/week' }, valueQuantity: { value: 1 } }, { code: { text: 'Strength days/week' }, valueQuantity: { value: 0 } }] } },
  ];

  // status → label + badge class
  const STATUS = {
    new:        { label: 'New', cls: 'new' },
    accepted:   { label: 'Accepted', cls: 'accepted' },
    rejected:   { label: 'Rejected', cls: 'rejected' },
    inprogress: { label: 'In Progress', cls: 'inprogress' },
    onhold:     { label: 'On Hold', cls: 'onhold' },
    completed:  { label: 'Completed', cls: 'completed' },
  };
  const VIVO_STATUS = {
    trial:  { label: 'Trial', cls: 'trial' },
    active: { label: 'Active', cls: 'active' },
    cancelled: { label: 'Cancelled', cls: 'cancelled' },
  };

  window.VIVO = { ORGS, REFERRALS, CONNECTIONS, ATTENDANCE, REPORTS, FEED, LOG, STATUS, VIVO_STATUS, palette };

  // ---- Helpers shared across screens ----
  window.VH = {
    byId: (id) => REFERRALS.find(r => r.id === id),
    initials: (name) => String(name || '?').split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase(),
    formatDob: (iso) => {
      if (!iso) return '—';
      const [y, m, d] = iso.split('-').map(Number);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[m - 1]} ${d}, ${y}`;
    },
    statusBadge: (status) => {
      const s = STATUS[status]; if (!s) return null;
      return React.createElement('span', { className: 'vbadge ' + s.cls }, s.label);
    },
    vivoBadge: (status) => {
      const s = VIVO_STATUS[status]; if (!s) return null;
      return React.createElement('span', { className: 'vbadge ' + s.cls }, s.label);
    },
    // 'Jun 9, 2026 10:00 AM ET' -> '2026-06-09T10:00:00-04:00'
    sessionISO: (dateStr) => {
      const M = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
      const m = String(dateStr).match(/^(\w+) (\d+), (\d+) (\d+):(\d+) (AM|PM) ET$/);
      if (!m) return null;
      let h = parseInt(m[4], 10) % 12;
      if (m[6] === 'PM') h += 12;
      return `${m[3]}-${M[m[1]]}-${String(m[2]).padStart(2, '0')}T${String(h).padStart(2, '0')}:${m[5]}:00-04:00`;
    },
    // Build the PA IG transaction Bundle for a progress/final report:
    // one activity-measure Observation per session, the three weekly EVS
    // rollups (min/week derived from the sessions), and the Task update.
    buildReportBundle: (r, o) => {
      const IG = 'http://hl7.org/fhir/us/physical-activity/';
      const LOINC = 'http://loinc.org';
      const UCUM = 'http://unitsofmeasure.org';
      const CATEGORIES = [
        { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'activity', display: 'Activity' }] },
        { coding: [{ system: IG + 'CodeSystem/pa-temporary-codes', code: 'PhysicalActivity', display: 'Physical Activity' }] },
      ];
      const profile = (p) => ({ profile: [IG + 'StructureDefinition/' + p] });
      const ORG = { reference: 'Organization/vivo', display: 'Vivo Health, Inc.' };
      const num = r.order.replace('ORD-', '');
      const taskId = 'task-' + num;
      const subject = { reference: 'Patient/pat-' + r.id.replace('R-', ''), display: r.name };
      const uuid = (n) => 'urn:uuid:00000000-0000-4000-8000-' + String(n).padStart(12, '0');
      const sessionEntries = (o.sessions || []).map((s, i) => ({
        fullUrl: uuid(i + 1),
        resource: {
          resourceType: 'Observation',
          meta: profile('pa-observation-activity-measure'),
          status: 'final',
          category: CATEGORIES,
          code: { coding: [{ system: LOINC, code: '55411-3' }], text: 'Exercise duration' },
          subject,
          effectiveDateTime: window.VH.sessionISO(s.date),
          performer: [ORG],
          valueQuantity: { value: s.dur, unit: 'min', system: UCUM, code: 'min' },
          note: [{ text: s.cls + ' class with trainer ' + s.trainer }],
        },
        request: { method: 'POST', url: 'Observation' },
      }));
      const evs = (n, prof, code, text, value, unit) => ({
        fullUrl: uuid(n),
        resource: {
          resourceType: 'Observation',
          meta: profile(prof),
          status: 'final',
          category: CATEGORIES,
          code: { coding: [{ system: LOINC, code }], text },
          subject,
          effectivePeriod: { start: o.start, end: o.end },
          performer: [ORG],
          valueQuantity: { value, unit, system: UCUM, code: unit },
        },
        request: { method: 'POST', url: 'Observation' },
      });
      const daysEntry = evs(101, 'pa-observation-evs-days-per-week', '89555-7', 'Days per week of moderate to strenuous exercise', o.days, 'd/wk');
      const strengthEntry = evs(102, 'pa-observation-strength-days-per-week', '82291-6', 'Days per week of muscle-strengthening exercise', o.strengthDays, 'd/wk');
      const minEntry = evs(103, 'pa-observation-evs-min-per-week', '82290-8', 'Minutes per week of moderate to vigorous physical activity', o.minutes, 'min/wk');
      minEntry.resource.derivedFrom = sessionEntries.map(e => ({ reference: e.fullUrl }));
      const task = {
        resourceType: 'Task',
        id: taskId,
        meta: profile('pa-task-for-referral-management'),
        status: o.taskStatus || 'in-progress',
        intent: 'order',
        code: { coding: [{ system: 'http://hl7.org/fhir/CodeSystem/task-code', code: 'fulfill' }] },
        focus: { reference: 'ServiceRequest/sr-' + num },
        for: subject,
        requester: { reference: 'PractitionerRole/dr-' + r.provider.practitioner.split(' ').pop().toLowerCase(), display: r.provider.practitioner },
        owner: ORG,
        businessStatus: { text: o.statusText },
      };
      if (o.note) task.note = [{ authorReference: ORG, time: new Date().toISOString().slice(0, 19) + 'Z', text: o.note }];
      return {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: [...sessionEntries, daysEntry, strengthEntry, minEntry, { resource: task, request: { method: 'PUT', url: 'Task/' + taskId } }],
      };
    },
    // Pretty-print a JS object as syntax-highlighted JSON HTML
    jsonHtml: (obj) => {
      const json = JSON.stringify(obj, null, 2);
      return json
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"([^"]+)":/g, '<span class="k">"$1"</span><span class="p">:</span>')
        .replace(/: "([^"]*)"/g, ': <span class="s">"$1"</span>')
        .replace(/: (\d+(?:\.\d+)?)/g, ': <span class="n">$1</span>');
    },
  };
})();
