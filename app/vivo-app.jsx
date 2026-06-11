// ============================================================
// Vivo Care Connect — App shell + router
// ============================================================
(function () {
  const { useState, useEffect } = React;

  const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'referrals', label: 'Referrals', icon: 'ri-inbox-archive-line', badge: 3 },
    { id: 'connections', label: 'Connections', icon: 'ri-plug-line' },
    { id: 'log', label: 'Activity Log', icon: 'ri-terminal-box-line' },
  ];

  // Which top-level nav a screen belongs to
  const PARENT = {
    dashboard: 'dashboard',
    referrals: 'referrals', 'referral-detail': 'referrals', enroll: 'referrals',
    'submit-report': 'referrals', closeout: 'referrals',
    connections: 'connections', log: 'log',
  };

  const SCREENS = {
    dashboard: 'Dashboard',
    referrals: 'ReferralInbox',
    'referral-detail': 'ReferralDetail',
    enroll: 'EnrollMember',
    'submit-report': 'SubmitReport',
    closeout: 'CloseOut',
    connections: 'Connections',
    log: 'FhirLog',
  };

  function VivoSidebar({ active, onNavigate }) {
    return React.createElement('aside', { className: 'app-sidebar' },
      React.createElement('div', { className: 'sidebar-brand' },
        React.createElement('div', { className: 'vivo-brand' },
          React.createElement('img', { src: 'assets/vivo-wordmark.png', alt: 'Vivo' }),
          React.createElement('div', { className: 'vivo-brand-sub' }, 'Care', React.createElement('br', null), 'Connect'),
        ),
      ),
      React.createElement('nav', { className: 'sidebar-nav' },
        React.createElement('div', { className: 'sidebar-nav-section' }, 'Operations'),
        NAV.map(item => React.createElement('div', {
          key: item.id,
          className: 'sidebar-nav-link ' + (active === item.id ? 'active' : ''),
          onClick: () => onNavigate(item.id, {}),
        },
          React.createElement('i', { className: item.icon }),
          React.createElement('span', null, item.label),
          item.badge && React.createElement('span', { style: { marginLeft: 'auto' } },
            React.createElement('span', { className: 'badge bg-secondary' }, item.badge)),
        )),
      ),
      React.createElement('div', { className: 'sidebar-footer' },
        React.createElement('div', { className: 'sidebar-nav-link', style: { margin: 0 } },
          React.createElement('i', { className: 'ri-book-open-line' }),
          React.createElement('span', null, 'FHIR PA IG docs')),
      ),
    );
  }

  function App() {
    const [route, setRoute] = useState(() => {
      try { const s = JSON.parse(localStorage.getItem('vivo-route')); if (s && s.screen) return s; } catch (e) {}
      return { screen: 'dashboard', params: {} };
    });
    useEffect(() => {
      try { localStorage.setItem('vivo-route', JSON.stringify(route)); } catch (e) {}
      const main = document.querySelector('.app-main');
      if (main) main.scrollTop = 0;
      window.scrollTo(0, 0);
    }, [route]);

    const nav = (screen, params) => setRoute({ screen, params: params || {} });
    const Comp = window[SCREENS[route.screen]] || window.Dashboard;
    const active = PARENT[route.screen] || 'dashboard';

    return React.createElement(React.Fragment, null,
      React.createElement(VivoSidebar, { active, onNavigate: nav }),
      React.createElement(TopBar, {
        user: { name: 'Sam Okafor', role: 'Care coordinator', initials: 'SO', email: 'sam@vivohealth.com' },
        onSignOut: () => window.showToast('Signed out.', 'info'),
      }),
      React.createElement('main', { className: 'app-main' },
        React.createElement('div', { className: 'app-content' },
          React.createElement(Comp, { nav, params: route.params, key: route.screen + JSON.stringify(route.params) }),
        ),
      ),
      React.createElement(ToastHost, null),
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

  // Drop the boot splash once mounted.
  setTimeout(() => {
    const b = document.getElementById('boot');
    if (b) { b.style.opacity = '0'; setTimeout(() => b.remove(), 350); }
  }, 60);
})();
