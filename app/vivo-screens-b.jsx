// ============================================================
// Vivo Care Connect — Screens B
// Enroll Member (wizard) · Referred Members Roster · Member Progress
// ============================================================
(function () {
  const { useState } = React;
  const V = window.VIVO, VH = window.VH;

  // ------------------------------------------------------------
  // 4. ENROLL MEMBER (3-step wizard, opens at step 2)
  // ------------------------------------------------------------
  function EnrollMember({ nav, params }) {
    const r = VH.byId(params.id) || V.REFERRALS[0];
    const [step, setStep] = useState(1); // 0-indexed; start on step 2
    const [plan, setPlan] = useState('2');
    const [level, setLevel] = useState('1');
    const [times, setTimes] = useState({ 'Mon 10am': true, 'Tue 10am': false, 'Wed 9am': false, 'Thu 10am': false, 'Fri 9am': true });
    const [sync, setSync] = useState({ hubspot: true, momence: true, welcome: true });
    const [assessDate, setAssessDate] = useState('2026-06-16');
    const [assessTime, setAssessTime] = useState('10:30');

    const plans = [
      { v: '1', n: '1', label: 'class / week', desc: 'Best for easing in', price: '$49/mo' },
      { v: '2', n: '2', label: 'classes / week', desc: 'Most popular', price: '$89/mo' },
      { v: '3', n: '3', label: 'classes / week', desc: 'Maximum momentum', price: '$119/mo' },
    ];
    const levels = [
      { v: '1', t: 'Level 1', d: 'Seated & supported — limited mobility' },
      { v: '2', t: 'Level 2', d: 'Standing with support — building strength' },
      { v: '3', t: 'Level 3', d: 'Independent — moderate intensity' },
      { v: '4', t: 'Level 4', d: 'Advanced — vigorous strength & cardio' },
    ];
    const steps = ['Contact info', 'Program setup', 'Sync & confirm'];

    const toggle = (set, key) => set(s => ({ ...s, [key]: !s[key] }));
    const finish = () => { window.showToast(`${r.name} enrolled as a Vivo member.`); nav('members', {}); };

    return React.createElement('div', null,
      React.createElement('div', { className: 'back-link', onClick: () => nav('referral-detail', { id: r.id }) },
        React.createElement('i', { className: 'ri-arrow-left-line' }), 'Back to referral'),
      React.createElement(PageHeader, { title: 'Enroll member' }),
      React.createElement('p', { className: 'text-muted', style: { marginTop: -8, marginBottom: 20 } },
        'Setting up ', React.createElement('strong', null, r.name), ' from ', r.provider.org, ' referral ', r.id, '.'),

      React.createElement('div', { style: { maxWidth: 560, margin: '0 auto 24px' } },
        React.createElement(Stepper, { steps, active: step }),
      ),

      React.createElement('div', { style: { maxWidth: 820, margin: '0 auto' } },
        // STEP 1
        step === 0 && React.createElement(Card, { title: 'Contact information' },
          React.createElement('div', { className: 'callout info', style: { marginBottom: 18 } },
            React.createElement('i', { className: 'ri-information-line' }),
            React.createElement('div', null, 'Prefilled from the referral. Review and confirm before continuing.')),
          React.createElement('div', { className: 'cols-2' },
            React.createElement(Field, { label: 'Full name', value: r.name }),
            React.createElement(Field, { label: 'Date of birth', value: r.dob }),
            React.createElement(Field, { label: 'Phone', value: r.phone }),
            React.createElement(Field, { label: 'Email', value: r.email }),
          ),
          React.createElement(Field, { label: 'Address', value: r.address, full: true }),
          React.createElement(Field, { label: 'Emergency contact', value: r.emergency, full: true }),
        ),

        // STEP 2
        step === 1 && React.createElement('div', { className: 'v-grid' },
          React.createElement(Card, { title: 'Membership plan' },
            React.createElement('div', { className: 'opt-grid', style: { gridTemplateColumns: 'repeat(3,1fr)' } },
              plans.map(p => React.createElement('div', { key: p.v, className: 'opt-card' + (plan === p.v ? ' selected' : ''), onClick: () => setPlan(p.v) },
                React.createElement('div', { className: 'opt-big' }, p.n),
                React.createElement('div', { className: 'opt-title', style: { fontWeight: 500, fontSize: 13 } }, p.label),
                React.createElement('div', { className: 'opt-desc' }, p.desc),
                React.createElement('div', { style: { marginTop: 8, fontWeight: 600, fontSize: 13 } }, p.price),
              )),
            ),
          ),
          React.createElement(Card, { title: 'Suggested exercise level' },
            React.createElement('div', { className: 'opt-grid', style: { gridTemplateColumns: 'repeat(2,1fr)' } },
              levels.map(l => React.createElement('div', { key: l.v, className: 'opt-card' + (level === l.v ? ' selected' : ''), onClick: () => setLevel(l.v) },
                React.createElement('div', { className: 'opt-title' }, l.t),
                React.createElement('div', { className: 'opt-desc' }, l.d),
              )),
            ),
            React.createElement('div', { className: 'callout', style: { marginTop: 14 } },
              React.createElement('i', { className: 'ri-lightbulb-line' }),
              React.createElement('div', null, 'Based on the referral note (', React.createElement('em', null, r.note.replace(/ —.*$/, '')), '), Level 1 is suggested to start.')),
          ),
          React.createElement('div', { className: 'cols-2' },
            React.createElement(Card, { title: 'Baseline 1-on-1 assessment' },
              React.createElement('span', { className: 'field-label' }, 'Date'),
              React.createElement('input', { type: 'date', className: 'form-control', value: assessDate, onChange: e => setAssessDate(e.target.value), style: { marginBottom: 14 } }),
              React.createElement('span', { className: 'field-label' }, 'Time'),
              React.createElement('input', { type: 'time', className: 'form-control', value: assessTime, onChange: e => setAssessTime(e.target.value) }),
            ),
            React.createElement(Card, { title: 'Preferred class times' },
              React.createElement('div', null,
                Object.keys(times).map(k => React.createElement('div', { key: k, className: 'check-row' },
                  React.createElement('input', { type: 'checkbox', id: 't-' + k, checked: times[k], onChange: () => toggle(setTimes, k) }),
                  React.createElement('label', { htmlFor: 't-' + k }, k),
                )),
              ),
            ),
          ),
        ),

        // STEP 3
        step === 2 && React.createElement('div', { className: 'cols-2-wide' },
          React.createElement(Card, { title: 'Sync & integrations' },
            React.createElement('div', null,
              React.createElement(SyncRow, { id: 'hubspot', icon: 'ri-contacts-book-line', title: 'Create HubSpot contact', sub: 'Add to CRM and referral pipeline', on: sync.hubspot, onToggle: () => toggle(setSync, 'hubspot') }),
              React.createElement(SyncRow, { id: 'momence', icon: 'ri-calendar-check-line', title: 'Create Momence account', sub: 'Class booking & attendance', on: sync.momence, onToggle: () => toggle(setSync, 'momence') }),
              React.createElement(SyncRow, { id: 'welcome', icon: 'ri-gift-line', title: 'Send welcome kit (resistance bands)', sub: 'Ships to home address', on: sync.welcome, onToggle: () => toggle(setSync, 'welcome') }),
            ),
          ),
          React.createElement(Card, { title: 'Summary' },
            React.createElement('div', { className: 'deflist' },
              React.createElement(SumRow, { label: 'Member', value: r.name }),
              React.createElement(SumRow, { label: 'Referral source', value: r.provider.org }),
              React.createElement(SumRow, { label: 'Plan', value: plan + ' class' + (plan === '1' ? '' : 'es') + ' / week' }),
              React.createElement(SumRow, { label: 'Exercise level', value: 'Level ' + level }),
              React.createElement(SumRow, { label: 'Assessment', value: assessDate + ' at ' + assessTime }),
              React.createElement(SumRow, { label: 'Class times', value: Object.keys(times).filter(k => times[k]).join(', ') || 'None selected' }),
            ),
          ),
        ),

        // Wizard nav
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 20 } },
          React.createElement(Button, { variant: 'outline-secondary', icon: 'ri-arrow-left-line', disabled: step === 0, onClick: () => setStep(s => s - 1) }, 'Back'),
          step < 2
            ? React.createElement(Button, { variant: 'primary', onClick: () => setStep(s => s + 1) }, React.createElement(React.Fragment, null, 'Continue ', React.createElement('i', { className: 'ri-arrow-right-line' })))
            : React.createElement(Button, { variant: 'primary', icon: 'ri-check-line', onClick: finish }, 'Complete enrollment'),
        ),
      ),
    );
  }

  function Field({ label, value, full }) {
    return React.createElement('div', { style: full ? { marginTop: 16 } : null },
      React.createElement('span', { className: 'field-label' }, label),
      React.createElement('input', { className: 'form-control', defaultValue: value }),
    );
  }
  function SyncRow({ id, icon, title, sub, on, onToggle }) {
    return React.createElement('div', { className: 'check-row', style: { alignItems: 'center' } },
      React.createElement('input', { type: 'checkbox', id: 'sy-' + id, checked: on, onChange: onToggle }),
      React.createElement('div', { style: { width: 34, height: 34, borderRadius: 8, background: 'var(--app-bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, color: 'var(--app-text-secondary)' } }, React.createElement('i', { className: icon })),
      React.createElement('label', { htmlFor: 'sy-' + id, style: { flex: 1 } },
        React.createElement('div', { style: { fontWeight: 600, fontSize: 13.5 } }, title),
        React.createElement('div', { className: 'muted-sm' }, sub)),
    );
  }
  function SumRow({ label, value }) {
    return React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 12 } },
      React.createElement('span', { className: 'muted-sm', style: { paddingTop: 1 } }, label),
      React.createElement('span', { style: { fontSize: 13, fontWeight: 600, textAlign: 'right' } }, value));
  }

  // ------------------------------------------------------------
  // 5. REFERRED MEMBERS ROSTER
  // ------------------------------------------------------------
  function MembersRoster({ nav }) {
    return React.createElement('div', null,
      React.createElement(PageHeader, { title: 'Referred members' }),
      React.createElement('div', { className: 'card', style: { overflow: 'hidden' } },
        React.createElement('table', { className: 'table' },
          React.createElement('thead', null, React.createElement('tr', null,
            ['Member', 'Referral source', 'Vivo status', 'Classes (30d)', 'Next report due'].map((h, i) =>
              React.createElement('th', { key: i }, h)))),
          React.createElement('tbody', null,
            V.MEMBERS.map(r => React.createElement('tr', {
              key: r.id, className: 'clickable',
              onClick: () => nav('member-detail', { id: r.id }),
            },
              React.createElement('td', null,
                React.createElement('div', { style: { fontWeight: 600, fontSize: 13.5 } }, r.name),
                React.createElement('div', { className: 'muted-sm' }, `Age ${r.age}`)),
              React.createElement('td', { style: { fontSize: 13 } }, r.source),
              React.createElement('td', null, VH.vivoBadge(r.vivo)),
              React.createElement('td', { style: { fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' } }, r.attended),
              React.createElement('td', { style: { fontSize: 13, color: 'var(--app-text-secondary)' } }, r.nextDue),
            )),
          ),
        ),
      ),
    );
  }

  // ------------------------------------------------------------
  // 6. MEMBER PROGRESS DETAIL (Robert Alvarez)
  // ------------------------------------------------------------
  function MemberProgress({ nav, params }) {
    const r = VH.byId(params.id) || VH.byId('R-1039');
    const D = V.ROBERT;
    return React.createElement('div', null,
      React.createElement('div', { className: 'back-link', onClick: () => nav('members', {}) },
        React.createElement('i', { className: 'ri-arrow-left-line' }), 'Back to members'),

      React.createElement('div', { className: 'detail-head' },
        React.createElement('div', { className: 'dh-left' },
          React.createElement(AV, { name: r.name, color: r.color, size: 52 }),
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
              React.createElement('h1', null, r.name),
              VH.vivoBadge('active')),
            React.createElement('div', { className: 'text-muted', style: { fontSize: 14, marginTop: 2 } },
              `Age ${r.age} · Referred by ${r.provider.org} · ${r.provider.practitioner}`)),
        ),
      ),

      React.createElement(Card, { title: 'Attendance log', padded: false },
        React.createElement('table', { className: 'table' },
          React.createElement('thead', null, React.createElement('tr', null,
            ['Class', 'Date & time', 'Trainer', 'Duration', 'Status'].map((h, i) =>
              React.createElement('th', { key: i }, h)))),
          React.createElement('tbody', null,
            D.attendance.map((a, i) => React.createElement('tr', { key: i },
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
    );
  }
  function StatTile({ label, value, sub }) {
    return React.createElement('div', { className: 'stat-tile' },
      React.createElement('div', { className: 'st-label' }, label),
      React.createElement('div', { className: 'st-value' }, value),
      React.createElement('div', { className: 'st-sub' }, sub));
  }

  Object.assign(window, { EnrollMember, MembersRoster, MemberProgress });
})();
