// ============================================================
// Vivo Care Connect — Screens A
// Dashboard · Referral Inbox · Referral Detail
// ============================================================
(function () {
  const { useState } = React;
  const V = window.VIVO, VH = window.VH;

  // ------------------------------------------------------------
  // 1. DASHBOARD
  // ------------------------------------------------------------
  function Dashboard({ nav }) {
    const kpis = [
      { label: 'New referrals', value: 3, icon: 'ri-inbox-archive-line', bg: '#e7f1fb', fg: '#1c5d96', to: ['referrals', { filter: 'new' }] },
      { label: 'Awaiting enrollment', value: 2, icon: 'ri-user-add-line', bg: '#e3f3f6', fg: '#1c7384', to: ['referrals', { filter: 'accepted' }] },
      { label: 'Active referred members', value: 14, icon: 'ri-team-line', bg: '#e6f4ec', fg: '#2f7345', to: ['referrals', { filter: 'inprogress' }] },
      { label: 'Progress reports due', value: 5, icon: 'ri-file-chart-line', bg: '#fbf0dd', fg: '#97600a', to: ['referrals', { filter: 'inprogress' }] },
    ];
    const toneColor = { blue: '#1c5d96', green: '#2f7345', teal: '#1c7384', amber: '#97600a' };
    const toneBg = { blue: '#e7f1fb', green: '#e6f4ec', teal: '#e3f3f6', amber: '#fbf0dd' };

    return React.createElement('div', null,
      React.createElement(PageHeader, {
        title: 'Dashboard',
        actions: React.createElement(Button, { variant: 'primary', icon: 'ri-refresh-line', onClick: () => window.showToast('Synced all connections.') }, 'Sync now'),
      }),
      React.createElement('p', { className: 'text-muted', style: { marginTop: -8, marginBottom: 20 } }, 'Welcome back, Sam. Here is what needs attention today.'),

      // KPI row
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 } },
        kpis.map((k, i) => React.createElement('div', {
          key: i, className: 'metric-card kpi', onClick: () => nav(k.to[0], k.to[1]),
        },
          React.createElement('div', { className: 'kpi-top' },
            React.createElement('div', { className: 'metric-label' }, k.label),
            React.createElement('div', { className: 'kpi-icon', style: { background: k.bg, color: k.fg } }, React.createElement('i', { className: k.icon })),
          ),
          React.createElement('div', { className: 'metric-value' }, k.value),
          React.createElement('div', { style: { fontSize: 12, color: 'var(--app-text-tertiary)', marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 4 } },
            'View', React.createElement('i', { className: 'ri-arrow-right-line' })),
        )),
      ),

      // Two-column: connections + feed
      React.createElement('div', { className: 'cols-2-wide' },
        React.createElement(Card, {
          title: 'Connected care managers',
          headerAction: React.createElement(Button, { size: 'sm', variant: 'outline-secondary', onClick: () => nav('connections', {}) }, 'Manage'),
        },
          React.createElement('div', { className: 'v-stack' },
            V.CONNECTIONS.map((c, i) => React.createElement('div', {
              key: c.id,
              style: { display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: i < V.CONNECTIONS.length - 1 ? '1px solid var(--app-border-light)' : 'none' },
            },
              React.createElement('span', { className: 'dot ' + c.status }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontWeight: 600, fontSize: 13.5 } }, c.name),
                React.createElement('div', { className: 'muted-sm' }, c.ehr + ' · FHIR R4'),
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', { className: 'muted-sm' }, 'Last sync'),
                React.createElement('div', { style: { fontSize: 13, fontWeight: 500, color: c.status === 'amber' ? 'var(--theme-warning)' : 'var(--app-text-secondary)' } }, c.lastSync),
              ),
            )),
          ),
        ),

        React.createElement(Card, { title: 'Recent activity' },
          React.createElement('div', { className: 'v-stack' },
            V.FEED.map((f, i) => React.createElement('div', {
              key: i,
              style: { display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < V.FEED.length - 1 ? '1px solid var(--app-border-light)' : 'none' },
            },
              React.createElement('div', {
                style: { width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: toneBg[f.tone], color: toneColor[f.tone], fontSize: 15 },
              }, React.createElement('i', { className: f.icon })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 13, lineHeight: 1.45 }, dangerouslySetInnerHTML: { __html: f.text } }),
                React.createElement('div', { className: 'muted-sm', style: { marginTop: 2 } }, f.time),
              ),
            )),
          ),
        ),
      ),
    );
  }

  // ------------------------------------------------------------
  // 2. REFERRAL INBOX
  // ------------------------------------------------------------
  function ReferralInbox({ nav, params }) {
    const [filter, setFilter] = useState((params && params.filter) || 'all');
    const counts = {};
    V.REFERRALS.forEach(r => { counts[r.status] = (counts[r.status] || 0) + 1; });
    const chips = [
      { value: 'all', label: 'All', count: V.REFERRALS.length },
      { value: 'new', label: 'New', count: counts.new || 0 },
      { value: 'accepted', label: 'Accepted', count: counts.accepted || 0 },
      { value: 'inprogress', label: 'In Progress', count: counts.inprogress || 0 },
      { value: 'onhold', label: 'On Hold', count: counts.onhold || 0 },
      { value: 'completed', label: 'Completed', count: counts.completed || 0 },
      { value: 'rejected', label: 'Rejected', count: counts.rejected || 0 },
    ];
    const [detail, setDetail] = useState(null);
    const data = filter === 'all' ? V.REFERRALS : V.REFERRALS.filter(r => r.status === filter);

    return React.createElement('div', null,
      React.createElement(PageHeader, {
        title: 'Referrals',
      }),
      React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement(FilterChips, { options: chips, value: filter, onChange: setFilter }),
      ),
      React.createElement('div', { className: 'card', style: { overflow: 'hidden' } },
        React.createElement('table', { className: 'table' },
          React.createElement('thead', null, React.createElement('tr', null,
            ['Patient', 'Referred by', 'Received', 'Referral status', 'Vivo status', 'Classes (30d)', 'Next report due', ''].map((h, i) =>
              React.createElement('th', { key: i }, h)))),
          React.createElement('tbody', null,
            data.length === 0
              ? React.createElement('tr', null, React.createElement('td', { colSpan: 8, style: { textAlign: 'center', padding: '48px 16px', color: 'var(--app-text-tertiary)' } }, 'No referrals match this filter.'))
              : data.map(r => React.createElement('tr', { key: r.id, className: 'clickable', onClick: () => nav('referral-detail', { id: r.id }) },
                React.createElement('td', null,
                  React.createElement('div', { style: { fontWeight: 600, fontSize: 13.5 } }, r.name)),
                React.createElement('td', null,
                  React.createElement('div', { style: { fontWeight: 500, fontSize: 13 } }, r.provider.practitioner),
                  React.createElement('div', { className: 'muted-sm' }, r.provider.org)),
                React.createElement('td', { className: 'muted-sm' }, r.received),
                React.createElement('td', null, VH.statusBadge(r.status)),
                React.createElement('td', null, r.vivo ? VH.vivoBadge(r.vivo) : React.createElement('span', { className: 'muted-sm' }, '-')),
                React.createElement('td', { style: { fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' } },
                  r.attended || React.createElement('span', { className: 'muted-sm', style: { fontWeight: 400 } }, '-')),
                React.createElement('td', { style: { fontSize: 13, color: 'var(--app-text-secondary)' } },
                  r.nextDue || React.createElement('span', { className: 'muted-sm' }, '-')),
                React.createElement('td', { style: { textAlign: 'right' } }, React.createElement(Button, {
                  size: 'sm', variant: 'outline-secondary', icon: 'ri-information-line',
                  onClick: e => { e.stopPropagation(); setDetail(r); } }, 'Details')),
              )),
          ),
        ),
      ),

      // Referral details modal
      React.createElement(Modal, {
        open: !!detail, title: detail ? detail.name : '', icon: 'ri-file-list-3-line', onClose: () => setDetail(null),
        footer: React.createElement(React.Fragment, null,
          React.createElement(Button, { variant: 'outline-secondary', onClick: () => setDetail(null) }, 'Close'),
          React.createElement(Button, { variant: 'primary', icon: 'ri-arrow-right-line', onClick: () => { const id = detail.id; setDetail(null); nav('referral-detail', { id }); } }, 'Open referral')),
      },
        detail && React.createElement('div', { className: 'deflist', style: { gap: 14 } },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            VH.statusBadge(detail.status)),
          React.createElement('div', { style: { display: 'flex', gap: 32 } },
            React.createElement(IField, { label: 'Date of birth', value: VH.formatDob(detail.dob), strong: true }),
            React.createElement(IField, { label: 'Age', value: detail.age + ' years' })),
          React.createElement('div', { style: { display: 'flex', gap: 32 } },
            React.createElement(IField, { label: 'Referral ID', value: detail.id, mono: true }),
            React.createElement(IField, { label: 'Order #', value: detail.order, mono: true })),
          React.createElement(IField, { label: 'Service requested', value: detail.service }),
          React.createElement(IField, { label: 'Reason', value: detail.reason, strong: true }),
          React.createElement(IField, { label: 'Referred by', value: `${detail.provider.practitioner} · ${detail.provider.org}` }),
          detail.rejectReason && React.createElement(IField, { label: 'Decline reason', value: detail.rejectReason }),
          detail.holdReason && React.createElement(IField, { label: 'Hold reason', value: detail.holdReason }),
        ),
      ),
    );
  }

  function IField({ label, value, mono, strong }) {
    return React.createElement('div', null,
      React.createElement('span', { className: 'field-label' }, label),
      React.createElement('div', { className: 'dval' + (strong ? ' strong' : ''), style: mono ? { fontFamily: 'var(--font-mono)', fontSize: 12.5 } : null }, value));
  }

  // ------------------------------------------------------------
  // 3. REFERRAL DETAIL
  // ------------------------------------------------------------
  function ReferralDetail({ nav, params }) {
    const r = VH.byId(params.id) || V.REFERRALS[0];
    const [declineOpen, setDeclineOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');
    const [reason2, setReason2] = useState('');
    const [repDetail, setRepDetail] = useState(null);
    const reports = V.REPORTS[r.id] || [];
    const [messages, setMessages] = useState([
      { from: r.provider.practitioner, me: false, text: r.note.replace(/ —.*$/, ''), time: r.received },
    ]);
    const [draft, setDraft] = useState('');

    const order = ['Received', 'Accepted', 'Enrolled', 'In Progress', 'Completed'];
    const idxMap = { new: 0, accepted: 1, onhold: 1, inprogress: 3, completed: 4, rejected: 0 };
    const curIdx = idxMap[r.status];
    const steps = order.map((label, i) => ({ label, date: i === 0 ? r.received : (i <= curIdx ? '' : '') }));

    const sendMsg = () => {
      if (!draft.trim()) return;
      setMessages(m => [...m, { from: 'You (Vivo)', me: true, text: draft.trim(), time: 'Just now' }]);
      setDraft('');
    };

    const Panel = ({ label, value, strong }) => React.createElement('div', null,
      React.createElement('span', { className: 'field-label' }, label),
      React.createElement('div', { className: 'dval' + (strong ? ' strong' : '') }, value),
    );

    return React.createElement('div', null,
      React.createElement('div', { className: 'back-link', onClick: () => nav('referrals', {}) },
        React.createElement('i', { className: 'ri-arrow-left-line' }), 'Back to referrals'),

      // Header
      React.createElement('div', { className: 'detail-head' },
        React.createElement('div', { className: 'dh-left' },
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('h1', null, r.name),
              VH.statusBadge(r.status),
              r.vivo && VH.vivoBadge(r.vivo),
            ),
            React.createElement('div', { className: 'text-muted', style: { fontSize: 14, marginTop: 2 } },
              `Age ${r.age} · Referral ${r.id} · Received ${r.received}`),
          ),
        ),
        r.status === 'new' && React.createElement('div', { className: 'tb-actions' },
          React.createElement(Button, { variant: 'outline-danger', icon: 'ri-close-line', onClick: () => setDeclineOpen(true) }, 'Decline'),
          React.createElement(Button, { variant: 'primary', icon: 'ri-check-line', onClick: () => { window.showToast('Referral accepted. Ready to enroll.'); nav('enroll', { id: r.id }); } }, 'Accept referral'),
        ),
        r.status === 'accepted' && React.createElement(Button, { variant: 'primary', icon: 'ri-user-add-line', onClick: () => nav('enroll', { id: r.id }) }, 'Enroll member'),
        r.status === 'inprogress' && React.createElement('div', { className: 'tb-actions' },
          React.createElement(Button, { variant: 'outline-secondary', icon: 'ri-flag-line', onClick: () => nav('closeout', { id: r.id }) }, 'Close out'),
          React.createElement(Button, { variant: 'primary', icon: 'ri-send-plane-line', onClick: () => nav('submit-report', { id: r.id }) }, 'Submit progress report'),
        ),
        r.status === 'completed' && React.createElement(Button, { variant: 'primary', icon: 'ri-send-plane-line', onClick: () => nav('submit-report', { id: r.id }) }, 'Submit progress report'),
      ),

      // 3-column body
      React.createElement('div', { className: 'cols-3', style: { marginBottom: 16 } },
        // (a) Patient
        React.createElement(Card, { title: 'Patient' },
          React.createElement('div', { className: 'deflist' },
            React.createElement(Panel, { label: 'Date of birth', value: r.dob, strong: true }),
            React.createElement(Panel, { label: 'Phone', value: r.phone }),
            React.createElement(Panel, { label: 'Email', value: r.email }),
            React.createElement(Panel, { label: 'Address', value: r.address }),
            React.createElement(Panel, { label: 'Emergency contact', value: r.emergency }),
          ),
        ),
        // (b) Referral
        React.createElement(Card, { title: 'Referral' },
          React.createElement('div', { className: 'deflist' },
            React.createElement(Panel, { label: 'Service requested', value: r.service, strong: true }),
            React.createElement(Panel, { label: 'Reason', value: r.reason }),
            React.createElement(Panel, { label: 'Referring practitioner', value: r.provider.practitioner }),
            React.createElement(Panel, { label: 'Organization', value: r.provider.org }),
            React.createElement('div', { style: { display: 'flex', gap: 24 } },
              React.createElement(Panel, { label: 'Date', value: r.received }),
              React.createElement(Panel, { label: 'Order #', value: r.order }),
            ),
          ),
          React.createElement('hr', { className: 'section-divider' }),
          React.createElement('span', { className: 'field-label' }, 'Patient goals'),
          React.createElement('ul', { className: 'goal-list', style: { marginBottom: 12 } },
            r.goals.map((g, i) => React.createElement('li', { key: i }, React.createElement('i', { className: 'ri-focus-3-line' }), g)),
          ),
          React.createElement('span', { className: 'field-label' }, 'Baseline measures'),
          React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 6 } },
            React.createElement('div', { className: 'stat-tile', style: { flex: 1, padding: '10px 12px' } },
              React.createElement('div', { className: 'st-value', style: { fontSize: 18 } }, r.baseline.daysWeek),
              React.createElement('div', { className: 'st-sub' }, 'days/week')),
            React.createElement('div', { className: 'stat-tile', style: { flex: 1, padding: '10px 12px' } },
              React.createElement('div', { className: 'st-value', style: { fontSize: 18 } }, r.baseline.minWeek),
              React.createElement('div', { className: 'st-sub' }, 'min/week')),
          ),
        ),
        // (c) Messages
        React.createElement(Card, { title: 'Messages with care manager' },
          React.createElement('div', { className: 'thread', style: { marginBottom: 14 } },
            messages.map((m, i) => React.createElement('div', { key: i, className: 'msg' + (m.me ? ' me' : '') },
              React.createElement(AV, { name: m.from, size: 30, color: m.me ? '#2480c0' : '#7c9971' }),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { className: 'mbubble' }, m.text),
                React.createElement('div', { className: 'mmeta' }, m.from + ' · ' + m.time),
              ),
            )),
          ),
          React.createElement('textarea', {
            className: 'form-control', rows: 3, placeholder: 'Write a note to ' + r.provider.practitioner + '…',
            value: draft, onChange: e => setDraft(e.target.value), style: { resize: 'vertical', marginBottom: 10 },
          }),
          React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end' } },
            React.createElement(Button, { variant: 'primary', size: 'sm', icon: 'ri-send-plane-line', onClick: sendMsg }, 'Send'),
          ),
        ),
      ),

      // Attendance log (only for enrolled members with logged classes)
      (V.ATTENDANCE[r.id] || []).length > 0 && React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement(Card, { title: 'Attendance log', padded: false },
          React.createElement('table', { className: 'table' },
            React.createElement('thead', null, React.createElement('tr', null,
              ['Class', 'Date & time', 'Trainer', 'Duration', 'Status'].map((h, i) =>
                React.createElement('th', { key: i }, h)))),
            React.createElement('tbody', null,
              V.ATTENDANCE[r.id].map((a, i) => React.createElement('tr', { key: i },
                React.createElement('td', { style: { fontWeight: 600, fontSize: 13.5 } }, a.cls),
                React.createElement('td', { style: { fontSize: 13, color: 'var(--app-text-secondary)' } }, a.date),
                React.createElement('td', { style: { fontSize: 13 } }, a.trainer),
                React.createElement('td', { style: { fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' } }, a.dur + ' min'),
                React.createElement('td', null, React.createElement('span', { className: 'sync-ind ' + a.sync },
                  React.createElement('i', { className: a.sync === 'sent' ? 'ri-checkbox-circle-line' : 'ri-time-line' }),
                  a.sync === 'sent' ? 'Synced' : 'Pending')),
              )),
            ),
          ),
        ),
      ),

      // Submitted reports
      reports.length > 0 && React.createElement('div', { style: { marginBottom: 16 } },
        React.createElement(Card, { title: 'Submitted reports', padded: false },
          React.createElement('table', { className: 'table' },
            React.createElement('thead', null, React.createElement('tr', null,
              ['Sent', 'Type', 'Reporting period', 'Measures', ''].map((h, i) =>
                React.createElement('th', { key: i }, h)))),
            React.createElement('tbody', null,
              reports.map((rep, i) => React.createElement('tr', { key: i, className: 'clickable', onClick: () => setRepDetail(rep) },
                React.createElement('td', { style: { fontSize: 13, fontWeight: 600 } }, rep.sent),
                React.createElement('td', null, React.createElement('span', { className: 'vbadge plain ' + (rep.type === 'final' ? 'completed' : 'accepted') }, rep.type === 'final' ? 'Final' : 'Progress')),
                React.createElement('td', { style: { fontSize: 13, color: 'var(--app-text-secondary)' } }, rep.period),
                React.createElement('td', { style: { fontSize: 13, fontVariantNumeric: 'tabular-nums' } },
                  (rep.type === 'final' ? 'avg ' : '') + `${rep.days} days · ${rep.minutes} min · ${rep.strengthDays} strength`),
                React.createElement('td', { style: { textAlign: 'right' } }, React.createElement(Button, {
                  size: 'sm', variant: 'outline-secondary', icon: 'ri-information-line',
                  onClick: e => { e.stopPropagation(); setRepDetail(rep); } }, 'Details')),
              )),
            ),
          ),
        ),
      ),

      // Report detail modal (with the FHIR Bundle as sent)
      React.createElement(Modal, {
        open: !!repDetail, icon: 'ri-file-chart-line',
        title: repDetail ? (repDetail.type === 'final' ? 'Final report' : 'Progress report') + ' · ' + repDetail.sent : '',
        onClose: () => setRepDetail(null),
        footer: React.createElement(Button, { variant: 'primary', onClick: () => setRepDetail(null) }, 'Close'),
      },
        repDetail && (() => {
          const sess = (V.ATTENDANCE[r.id] || []).filter(s => {
            const d = VH.sessionISO(s.date);
            return d && d.slice(0, 10) >= repDetail.start && d.slice(0, 10) <= repDetail.end;
          });
          const sentBundle = VH.buildReportBundle(r, {
            sessions: sess, start: repDetail.start, end: repDetail.end,
            days: repDetail.days, minutes: repDetail.minutes, strengthDays: repDetail.strengthDays,
            statusText: repDetail.statusText, note: repDetail.note,
            taskStatus: repDetail.type === 'final' ? 'completed' : 'in-progress',
          });
          return React.createElement('div', null,
            React.createElement('div', { className: 'deflist', style: { gap: 14, marginBottom: 16 } },
              React.createElement(IField, { label: 'Reporting period', value: repDetail.period, strong: true }),
              React.createElement('div', { style: { display: 'flex', gap: 32 } },
                React.createElement(IField, { label: 'Sent', value: repDetail.sent }),
                React.createElement(IField, { label: 'Delivered to', value: r.provider.system })),
              React.createElement(IField, { label: 'Measures', value: (repDetail.type === 'final' ? 'avg ' : '') + `${repDetail.days} days/week · ${repDetail.minutes} min/week · ${repDetail.strengthDays} strength days/week` }),
              React.createElement(IField, { label: 'Summary', value: repDetail.statusText }),
            ),
            React.createElement(JsonBlock, { obj: sentBundle, label: `FHIR JSON as sent (transaction Bundle · ${sentBundle.entry.length} entries)` }),
          );
        })(),
      ),

      // Status timeline
      React.createElement(Card, { title: 'Referral status' },
        React.createElement(StatusTimeline, { steps, currentIndex: curIdx }),
        r.status === 'rejected' && React.createElement('div', { className: 'callout', style: { marginTop: 18 } },
          React.createElement('i', { className: 'ri-close-circle-line' }),
          React.createElement('div', null, React.createElement('strong', null, 'Declined. '), r.rejectReason)),
        r.status === 'onhold' && React.createElement('div', { className: 'callout', style: { marginTop: 18 } },
          React.createElement('i', { className: 'ri-pause-circle-line' }),
          React.createElement('div', null, React.createElement('strong', null, 'On hold. '), r.holdReason)),
      ),

      // Decline modal
      React.createElement(Modal, {
        open: declineOpen, title: 'Decline referral', icon: 'ri-close-circle-line', onClose: () => setDeclineOpen(false),
        footer: React.createElement(React.Fragment, null,
          React.createElement(Button, { variant: 'outline-secondary', onClick: () => setDeclineOpen(false) }, 'Cancel'),
          React.createElement(Button, {
            variant: 'danger', disabled: !declineReason,
            onClick: () => { setDeclineOpen(false); window.showToast('Referral declined. Care manager notified.', 'info'); nav('referrals', {}); },
          }, 'Decline referral'),
        ),
      },
        React.createElement('p', { style: { marginBottom: 14 } }, `Let ${r.provider.org} know why ${r.name}'s referral is being declined. A reason is required.`),
        React.createElement(Select, {
          placeholder: 'Select a reason', required: true, value: declineReason,
          onChange: e => setDeclineReason(e.target.value),
          options: ['Patient declined', 'Outside service area', 'Not medically appropriate', 'Duplicate referral', 'Other'],
        }),
        React.createElement('textarea', { className: 'form-control', rows: 3, placeholder: 'Add a note (optional)', value: reason2, onChange: e => setReason2(e.target.value), style: { marginTop: 12, resize: 'vertical' } }),
      ),
    );
  }

  Object.assign(window, { Dashboard, ReferralInbox, ReferralDetail });
})();
