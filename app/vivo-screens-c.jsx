// ============================================================
// Vivo Care Connect — Screens C
// Submit Progress Report · Close Out Referral · Connections · FHIR Log
// ============================================================
(function () {
  const { useState } = React;
  const V = window.VIVO, VH = window.VH;

  // ------------------------------------------------------------
  // 7. SUBMIT PROGRESS REPORT
  // ------------------------------------------------------------
  function SubmitReport({ nav, params }) {
    const r = VH.byId(params.id) || VH.byId('R-1039');
    const sessions = V.ATTENDANCE[r.id] || [];
    const [period, setPeriod] = useState('Jun 1 – Jun 7, 2026');
    const [statusText, setStatusText] = useState('Completed week 4 of program, attendance excellent.');
    const [note, setNote] = useState('');
    const [included, setIncluded] = useState(sessions.map(() => true));
    const fhir = {
      resourceType: 'Observation', status: 'final',
      category: [{ coding: [{ code: 'activity' }] }],
      code: { coding: [{ system: 'http://loinc.org', code: '89555-7', display: 'Exercise vital sign' }] },
      subject: { display: r.name }, effectivePeriod: { start: '2026-06-01', end: '2026-06-07' },
      component: [
        { code: { text: 'Days/week moderate-vigorous' }, valueQuantity: { value: 3, unit: 'days' } },
        { code: { text: 'Minutes/week' }, valueQuantity: { value: 135, unit: 'min' } },
        { code: { text: 'Strength days/week' }, valueQuantity: { value: 2, unit: 'days' } },
      ],
    };
    const send = () => { window.showToast(`Progress report sent to ${r.provider.org}.`); nav('referral-detail', { id: r.id }); };

    return React.createElement('div', null,
      React.createElement('div', { className: 'back-link', onClick: () => nav('referral-detail', { id: r.id }) },
        React.createElement('i', { className: 'ri-arrow-left-line' }), 'Back to referral'),
      React.createElement(PageHeader, { title: 'Submit progress report' }),
      React.createElement('p', { className: 'text-muted', style: { marginTop: -8, marginBottom: 20 } },
        'Reporting on ', React.createElement('strong', null, r.name), ' to ', React.createElement('strong', null, r.provider.org), ' · ', r.provider.practitioner),

      React.createElement('div', { className: 'cols-2-wide' },
        React.createElement('div', { className: 'v-grid' },
          React.createElement(Card, { title: 'Reporting period' },
            React.createElement(Select, { placeholder: 'Select period', value: period, onChange: e => setPeriod(e.target.value),
              options: ['Jun 1 – Jun 7, 2026', 'May 25 – May 31, 2026', 'May 18 – May 24, 2026', 'Full program to date'] }),
          ),
          React.createElement(Card, { title: 'Exercise vital sign (auto-calculated)' },
            React.createElement('div', { className: 'callout info', style: { marginBottom: 16 } },
              React.createElement('i', { className: 'ri-calculator-line' }),
              React.createElement('div', null, 'Computed from logged class sessions. Read-only.')),
            React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 } },
              React.createElement(RO, { label: 'Days/week moderate', value: '3' }),
              React.createElement(RO, { label: 'Minutes/week', value: '135' }),
              React.createElement(RO, { label: 'Strength days/week', value: '2' }),
            ),
          ),
          React.createElement(Card, { title: 'Status update' },
            React.createElement('span', { className: 'field-label' }, 'Summary for clinician'),
            React.createElement('textarea', { className: 'form-control', rows: 3, value: statusText, onChange: e => setStatusText(e.target.value), style: { resize: 'vertical', marginBottom: 16 } }),
            React.createElement('span', { className: 'field-label' }, 'Message to care manager (optional)'),
            React.createElement('textarea', { className: 'form-control', rows: 2, placeholder: 'Add a personal note…', value: note, onChange: e => setNote(e.target.value), style: { resize: 'vertical' } }),
          ),
          React.createElement(Card, { title: 'FHIR payload' },
            React.createElement(JsonBlock, { obj: fhir, label: 'Preview FHIR JSON (Observation)' }),
          ),
        ),

        React.createElement('div', { className: 'v-grid' },
          React.createElement(Card, { title: `Included sessions (${included.filter(Boolean).length})` },
            React.createElement('div', null,
              sessions.map((a, i) => React.createElement('div', { key: i, className: 'check-row', style: { alignItems: 'center' } },
                React.createElement('input', { type: 'checkbox', id: 'inc-' + i, checked: included[i], onChange: () => setIncluded(s => s.map((v, j) => j === i ? !v : v)) }),
                React.createElement('label', { htmlFor: 'inc-' + i, style: { flex: 1 } },
                  React.createElement('div', { style: { fontWeight: 600, fontSize: 13 } }, a.cls),
                  React.createElement('div', { className: 'muted-sm' }, `${a.date} · ${a.dur} min`)),
              )),
            ),
          ),
          React.createElement(Card, { title: 'Ready to send' },
            React.createElement('p', { style: { fontSize: 13, color: 'var(--app-text-secondary)' } },
              'This report will be delivered to ', React.createElement('strong', null, r.provider.org), ' as a FHIR Observation tied to referral ', r.id, '.'),
            React.createElement(Button, { variant: 'primary', icon: 'ri-send-plane-line', onClick: send, className: 'w-full', style: { width: '100%', justifyContent: 'center' } }, `Send to ${r.provider.org}`),
          ),
        ),
      ),
    );
  }
  function RO({ label, value }) {
    return React.createElement('div', { className: 'stat-tile', style: { background: 'var(--app-bg-secondary)' } },
      React.createElement('div', { className: 'st-value' }, value),
      React.createElement('div', { className: 'st-sub' }, label));
  }

  // ------------------------------------------------------------
  // 8. CLOSE OUT REFERRAL
  // ------------------------------------------------------------
  function CloseOut({ nav, params }) {
    const r = VH.byId(params.id) || VH.byId('R-1021');
    const [summary, setSummary] = useState('Frank completed all 12 weeks of the program with outstanding commitment. He now exceeds his weekly activity goal and reports improved energy and blood sugar control.');
    const [highlights, setHighlights] = useState('Upper body strength improved 24% from baseline. Resting comfortably through full 45-minute classes.');
    const [done, setDone] = useState(false);

    if (done) {
      return React.createElement('div', { style: { maxWidth: 560, margin: '60px auto', textAlign: 'center' } },
        React.createElement('div', { style: { width: 72, height: 72, borderRadius: '50%', background: '#e6f4ec', color: '#1aa35a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, margin: '0 auto 20px' } },
          React.createElement('i', { className: 'ri-check-line' })),
        React.createElement('h2', null, 'Referral completed'),
        React.createElement('p', { className: 'text-muted', style: { fontSize: 15 } },
          `Final report for ${r.name} has been sent to ${r.provider.org}. The referral is now closed.`),
        React.createElement('div', { style: { display: 'flex', gap: 10, justifyContent: 'center', marginTop: 20 } },
          React.createElement(Button, { variant: 'outline-secondary', onClick: () => nav('referral-detail', { id: r.id }) }, 'View referral'),
          React.createElement(Button, { variant: 'primary', onClick: () => nav('referrals', {}) }, 'Back to referrals')),
      );
    }

    const measures = [
      { label: 'Days/week moderate exercise', base: 0, now: 3 },
      { label: 'Minutes/week', base: 40, now: 142 },
      { label: 'Strength days/week', base: 0, now: 2 },
    ];
    return React.createElement('div', null,
      React.createElement('div', { className: 'back-link', onClick: () => nav('referral-detail', { id: r.id }) },
        React.createElement('i', { className: 'ri-arrow-left-line' }), 'Back to referral'),
      React.createElement(PageHeader, { title: 'Close out referral' }),
      React.createElement('p', { className: 'text-muted', style: { marginTop: -8, marginBottom: 20 } },
        'Completing ', React.createElement('strong', null, r.name), '\u2019s program and sending the final report to ', r.provider.org, '.'),

      React.createElement('div', { className: 'cols-2-wide' },
        React.createElement('div', { className: 'v-grid' },
          React.createElement(Card, { title: 'Outcome summary' },
            React.createElement('textarea', { className: 'form-control', rows: 4, value: summary, onChange: e => setSummary(e.target.value), style: { resize: 'vertical' } }),
          ),
          React.createElement(Card, { title: 'Final measures vs baseline' },
            React.createElement('div', { className: 'v-stack', style: { gap: 0 } },
              measures.map((m, i) => React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < measures.length - 1 ? '1px solid var(--app-border-light)' : 'none' } },
                React.createElement('span', { style: { fontSize: 13.5, fontWeight: 500 } }, m.label),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, fontVariantNumeric: 'tabular-nums' } },
                  React.createElement('span', { className: 'muted-sm' }, m.base),
                  React.createElement('i', { className: 'ri-arrow-right-line', style: { color: 'var(--app-text-muted)' } }),
                  React.createElement('span', { style: { fontWeight: 700, fontSize: 16, color: 'var(--vivo-green)' } }, m.now)),
              )),
            ),
          ),
          React.createElement(Card, { title: 'Assessment highlights (optional)' },
            React.createElement('textarea', { className: 'form-control', rows: 3, value: highlights, onChange: e => setHighlights(e.target.value), style: { resize: 'vertical' } }),
          ),
        ),

        React.createElement('div', { className: 'v-grid' },
          React.createElement(Card, { title: 'Program at a glance' },
            React.createElement('div', { className: 'stat-tiles' },
              React.createElement(BigStat, { value: '31', label: 'Total classes attended' }),
              React.createElement(BigStat, { value: '142', label: 'Avg weekly minutes' }),
              React.createElement(BigStat, { value: '12 weeks', label: 'Program length' }),
            ),
          ),
          React.createElement(Card, { title: 'Send final report' },
            React.createElement('p', { style: { fontSize: 13, color: 'var(--app-text-secondary)' } },
              'This marks referral ', r.id, ' as ', React.createElement('strong', null, 'Completed'), ' and delivers a final DiagnosticReport to ', r.provider.org, '.'),
            React.createElement(Button, { variant: 'primary', icon: 'ri-flag-line', onClick: () => { setDone(true); window.showToast('Referral completed and final report sent.'); }, style: { width: '100%', justifyContent: 'center' } }, 'Complete referral & send final report'),
          ),
        ),
      ),
    );
  }
  function BigStat({ value, label }) {
    return React.createElement('div', { className: 'stat-tile' },
      React.createElement('div', { className: 'st-value', style: { fontSize: 26 } }, value),
      React.createElement('div', { className: 'st-sub' }, label));
  }

  // ------------------------------------------------------------
  // 9. CONNECTIONS / SETTINGS
  // ------------------------------------------------------------
  function Connections({ nav }) {
    const [detail, setDetail] = useState(null);
    return React.createElement('div', null,
      React.createElement(PageHeader, { title: 'Connections',
        actions: React.createElement(Button, { variant: 'primary', icon: 'ri-add-line', onClick: () => window.showToast('Add-connection wizard coming soon.', 'info') }, 'Add connection') }),

      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 16 } },
        V.CONNECTIONS.map(c => React.createElement('div', { key: c.id, className: 'card' },
          React.createElement('div', { className: 'card-body' },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 } },
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                React.createElement('span', { className: 'dot ' + c.status }),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontWeight: 600, fontSize: 15 } }, c.name),
                  React.createElement('div', { className: 'muted-sm' }, c.ehr + ' · FHIR R4 · last poll ' + c.lastSync))),
              React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
                React.createElement('span', { className: 'vbadge plain ' + (c.status === 'green' ? 'completed' : 'inprogress') }, c.status === 'green' ? 'Connected' : 'Needs attention'),
                React.createElement('div', { style: { display: 'flex', gap: 8 } },
                  c.warn && React.createElement(Button, { size: 'sm', variant: 'primary', icon: 'ri-key-line', onClick: () => window.showToast('Re-authentication started.', 'info') }, 'Re-authenticate'),
                  React.createElement(Button, { size: 'sm', variant: 'outline-secondary', icon: 'ri-information-line', onClick: () => setDetail(c) }, 'Details'),
                ),
              ),
            ),
            c.warn && React.createElement('div', { className: 'callout', style: { marginTop: 14, marginBottom: 0 } },
              React.createElement('i', { className: 'ri-error-warning-line' }), React.createElement('div', null, c.warn)),
          ),
        )),

        // Add connection card
        React.createElement('div', { className: 'card', style: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120, border: '1.5px dashed var(--app-border-dark)', cursor: 'pointer' }, onClick: () => window.showToast('Add-connection wizard coming soon.', 'info') },
          React.createElement('div', { style: { textAlign: 'center', color: 'var(--app-text-tertiary)' } },
            React.createElement('i', { className: 'ri-add-circle-line', style: { fontSize: 28 } }),
            React.createElement('div', { style: { fontWeight: 600, marginTop: 6, color: 'var(--app-text-secondary)' } }, 'Add a care manager connection'),
            React.createElement('div', { className: 'muted-sm', style: { marginTop: 2 } }, 'Connect an EHR FHIR endpoint')),
        ),
      ),

      // Connection details modal
      React.createElement(Modal, {
        open: !!detail, title: detail ? detail.name : '', icon: 'ri-plug-line', onClose: () => setDetail(null),
        footer: React.createElement(React.Fragment, null,
          React.createElement(Button, { variant: 'outline-secondary', icon: 'ri-pulse-line', onClick: () => detail && window.showToast(`Testing ${detail.name}…`, 'info') }, 'Test connection'),
          React.createElement(Button, { variant: 'outline-secondary', icon: 'ri-refresh-line', onClick: () => detail && window.showToast(`${detail.name} polled.`) }, 'Poll now'),
          React.createElement(Button, { variant: 'primary', onClick: () => setDetail(null) }, 'Close')),
      },
        detail && React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
            React.createElement('span', { className: 'dot ' + detail.status }),
            React.createElement('span', { className: 'muted-sm' }, detail.ehr + ' · FHIR R4'),
            React.createElement('span', { className: 'vbadge plain ' + (detail.status === 'green' ? 'completed' : 'inprogress'), style: { marginLeft: 'auto' } }, detail.status === 'green' ? 'Connected' : 'Needs attention')),
          detail.warn && React.createElement('div', { className: 'callout', style: { marginBottom: 16 } },
            React.createElement('i', { className: 'ri-error-warning-line' }), React.createElement('div', null, detail.warn)),
          React.createElement('div', { className: 'deflist', style: { gap: 14 } },
            React.createElement(KV, { label: 'FHIR base URL', value: detail.baseUrl, mono: true }),
            React.createElement('div', { style: { display: 'flex', gap: 32 } },
              React.createElement(KV, { label: 'Auth type', value: detail.auth }),
              React.createElement(KV, { label: 'Client ID', value: detail.clientId, mono: true })),
            React.createElement('div', { style: { display: 'flex', gap: 32, alignItems: 'flex-end' } },
              React.createElement(KV, { label: 'Last successful poll', value: detail.lastSync }),
              React.createElement('div', null,
                React.createElement('span', { className: 'field-label' }, 'Poll interval'),
                React.createElement('select', { className: 'form-select form-select-sm', defaultValue: detail.interval, style: { width: 130 } },
                  ['5 min', '15 min', '30 min', '60 min'].map(o => React.createElement('option', { key: o }, o)))),
            ),
          ),
        ),
      ),

      // Org identity
      React.createElement(Card, { title: 'Vivo organization identity' },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' } },
          React.createElement('img', { src: 'assets/vivo-logo-color.png', alt: 'Vivo', style: { height: 40 } }),
          React.createElement('div', { style: { display: 'flex', gap: 32, flexWrap: 'wrap' } },
            React.createElement(KV, { label: 'Organization', value: 'Vivo Health, Inc.' }),
            React.createElement(KV, { label: 'FHIR Organization ID', value: 'Organization/vivo', mono: true }),
            React.createElement(KV, { label: 'NPI', value: '1841299305', mono: true }),
            React.createElement(KV, { label: 'Endpoint', value: 'fhir.vivohealth.com/r4', mono: true })),
        ),
      ),
    );
  }
  function KV({ label, value, mono }) {
    return React.createElement('div', null,
      React.createElement('span', { className: 'field-label' }, label),
      React.createElement('div', { className: 'dval', style: mono ? { fontFamily: 'var(--font-mono)', fontSize: 12.5 } : { fontSize: 13.5 } }, value));
  }

  // ------------------------------------------------------------
  // 10. FHIR ACTIVITY LOG
  // ------------------------------------------------------------
  function resourceOf(path) {
    const m = path.replace(/^\//, '').split(/[/?]/)[0];
    return m || '—';
  }
  function shortPath(path) {
    return '/' + resourceOf(path);
  }
  function FhirLog() {
    const [rt, setRt] = useState('all');
    const [code, setCode] = useState('all');
    const [detail, setDetail] = useState(null);
    const resourceTypes = Array.from(new Set(V.LOG.map(l => resourceOf(l.path))));
    let rows = V.LOG;
    if (rt !== 'all') rows = rows.filter(l => resourceOf(l.path) === rt);
    if (code !== 'all') rows = rows.filter(l => code === 'ok' ? l.code < 300 : code === 'err' ? l.code >= 400 : false);
    const codeWord = (c) => c === 200 ? 'OK' : c === 201 ? 'Created' : c === 422 ? 'Unprocessable' : '';

    return React.createElement('div', null,
      React.createElement(PageHeader, { title: 'FHIR activity log',
        actions: React.createElement(Button, { variant: 'outline-secondary', icon: 'ri-refresh-line', onClick: () => window.showToast('Log refreshed.') }, 'Refresh') }),

      React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' } },
        React.createElement('span', { className: 'field-label', style: { margin: 0 } }, 'Resource'),
        React.createElement(FilterChips, {
          value: rt, onChange: setRt,
          options: [{ value: 'all', label: 'All' }].concat(resourceTypes.map(t => ({ value: t, label: t }))),
        }),
        React.createElement('span', { style: { width: 1, height: 22, background: 'var(--app-border)', margin: '0 4px' } }),
        React.createElement('span', { className: 'field-label', style: { margin: 0 } }, 'Status'),
        React.createElement(FilterChips, {
          value: code, onChange: setCode,
          options: [{ value: 'all', label: 'All' }, { value: 'ok', label: '2xx' }, { value: 'err', label: '4xx' }],
        }),
      ),

      React.createElement('div', { className: 'card', style: { overflow: 'hidden' } },
        React.createElement('table', { className: 'table' },
          React.createElement('thead', null, React.createElement('tr', null,
            ['Timestamp', 'Dir', 'Request', 'Target system', 'Status', ''].map((h, i) =>
              React.createElement('th', { key: i }, h)))),
          React.createElement('tbody', null,
            rows.map((l, i) => {
              const codeType = l.code < 300 ? 'ok' : l.code < 400 ? 'warn' : 'err';
              return React.createElement('tr', { key: i, className: 'clickable', onClick: () => setDetail(l) },
                React.createElement('td', { className: 'path-mono' }, l.t),
                React.createElement('td', null, React.createElement('span', { className: 'dir-pill ' + l.dir }, l.dir)),
                React.createElement('td', null, React.createElement('span', { className: 'method ' + l.method }, l.method), ' ',
                  React.createElement('span', { className: 'path-mono' }, shortPath(l.path))),
                React.createElement('td', { style: { fontSize: 13 } }, l.sys),
                React.createElement('td', null, React.createElement('span', { className: 'status-code ' + codeType }, l.code,
                  ' ', React.createElement('span', { style: { fontWeight: 400, color: 'var(--app-text-tertiary)' } }, codeWord(l.code)))),
                React.createElement('td', { style: { textAlign: 'right' } }, React.createElement(Button, {
                  size: 'sm', variant: 'outline-secondary', icon: 'ri-information-line',
                  onClick: e => { e.stopPropagation(); setDetail(l); } }, 'Details')),
              );
            }),
          ),
        ),
      ),
      rows.length === 0 && React.createElement('p', { className: 'text-muted', style: { textAlign: 'center', marginTop: 20 } }, 'No log entries match these filters.'),

      // Log entry detail modal
      React.createElement(Modal, {
        open: !!detail, icon: 'ri-code-s-slash-line',
        title: detail ? `${detail.method} ${shortPath(detail.path)}` : '',
        onClose: () => setDetail(null),
        footer: React.createElement(Button, { variant: 'primary', onClick: () => setDetail(null) }, 'Close'),
      },
        detail && React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' } },
            React.createElement('span', { className: 'dir-pill ' + detail.dir }, detail.dir),
            React.createElement('span', { className: 'method ' + detail.method }, detail.method),
            React.createElement('span', { className: 'status-code ' + (detail.code < 300 ? 'ok' : detail.code < 400 ? 'warn' : 'err') }, detail.code + ' ' + codeWord(detail.code)),
            React.createElement('span', { className: 'muted-sm', style: { marginLeft: 'auto' } }, detail.t)),
          React.createElement('div', { className: 'deflist', style: { gap: 12, marginBottom: 16 } },
            React.createElement(KV, { label: 'Request path', value: detail.path, mono: true }),
            React.createElement(KV, { label: 'Target system', value: detail.sys })),
          React.createElement('span', { className: 'field-label' }, 'Payload'),
          React.createElement('div', { className: 'codeblock', style: { marginTop: 6 }, dangerouslySetInnerHTML: { __html: VH.jsonHtml(detail.json) } }),
        ),
      ),
    );
  }

  Object.assign(window, { SubmitReport, CloseOut, Connections, FhirLog });
})();
