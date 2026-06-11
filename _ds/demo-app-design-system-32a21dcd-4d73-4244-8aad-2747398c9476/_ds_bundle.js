/* @ds-bundle: {"format":3,"namespace":"DemoAppDesignSystem_32a21d","components":[],"sourceHashes":{"ui_kits/demo-app/components.jsx":"4f1f70bf4b9f","ui_kits/demo-app/screens.jsx":"6da376e308ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DemoAppDesignSystem_32a21d = window.DemoAppDesignSystem_32a21d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/demo-app/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// ============================================================
// Demo App UI Kit — atomic components
// Small, reusable building blocks shared across screens.
// All components exported on window for cross-script use.
// ============================================================

const {
  useState,
  useEffect,
  useRef
} = React;

// ------------------------------------------------------------
// Button
// ------------------------------------------------------------
function Button({
  variant = 'outline-secondary',
  size,
  icon,
  iconOnly,
  children,
  onClick,
  type = 'button',
  disabled,
  className = '',
  ...rest
}) {
  const cls = ['btn', `btn-${variant}`, size && `btn-${size}`, iconOnly && 'btn-icon', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    onClick: onClick,
    disabled: disabled
  }, rest), icon && /*#__PURE__*/React.createElement("i", {
    className: icon
  }), children);
}

// ------------------------------------------------------------
// Badge
// ------------------------------------------------------------
function Badge({
  variant = 'bg-secondary',
  subtle,
  role,
  children
}) {
  let cls = 'badge';
  if (role) cls += ` role-${role}`;else if (subtle) cls += ` subtle-${variant.replace('bg-', '')}`;else cls += ` ${variant}`;
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, children);
}

// ------------------------------------------------------------
// Card — standard / compact
// ------------------------------------------------------------
function Card({
  title,
  headerAction,
  children,
  padded = true,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `card ${className}`
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "card-title"
  }, title), headerAction), /*#__PURE__*/React.createElement("div", {
    className: padded ? 'card-body' : ''
  }, children));
}
function MetricCard({
  label,
  value,
  delta,
  deltaDirection = 'up'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "metric-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "metric-value"
  }, value), delta && /*#__PURE__*/React.createElement("div", {
    className: `metric-delta ${deltaDirection}`
  }, /*#__PURE__*/React.createElement("i", {
    className: `ri-arrow-${deltaDirection}-line`
  }), " ", delta));
}
function CompactCard({
  icon,
  title,
  subtitle,
  linkText = 'VIEW',
  onLinkClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compact-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compact-card-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "compact-card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "compact-card-title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "compact-card-subtitle"
  }, subtitle)), /*#__PURE__*/React.createElement("a", {
    className: "compact-card-link",
    onClick: onLinkClick
  }, linkText, " ", /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-right-line"
  }))));
}

// ------------------------------------------------------------
// Form controls — placeholder-only convention
// ------------------------------------------------------------
function Input({
  placeholder,
  required,
  value,
  onChange,
  type = 'text',
  invalid,
  error,
  ...rest
}) {
  const ph = placeholder + (required ? ' *' : '');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    className: `form-control ${invalid ? 'is-invalid' : ''}`,
    placeholder: ph,
    value: value || '',
    onChange: onChange
  }, rest)), invalid && error && /*#__PURE__*/React.createElement("div", {
    className: "invalid-feedback"
  }, error));
}
function Select({
  placeholder,
  required,
  value,
  onChange,
  options = [],
  ...rest
}) {
  return /*#__PURE__*/React.createElement("select", _extends({
    className: "form-select",
    value: value || '',
    onChange: onChange
  }, rest), /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder, required ? ' *' : ''), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)));
}

// ------------------------------------------------------------
// Page header
// ------------------------------------------------------------
function PageHeader({
  icon,
  title,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "app-page-header"
  }, /*#__PURE__*/React.createElement("h1", null, icon && /*#__PURE__*/React.createElement("i", {
    className: icon
  }), title), actions && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, actions));
}

// ------------------------------------------------------------
// Sidebar
// ------------------------------------------------------------
function Sidebar({
  active,
  onNavigate,
  sections,
  brandIcon = 'ri-flashlight-line',
  brandText = 'Demo App'
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "app-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-brand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: 'var(--theme-primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontWeight: 700
    }
  }, "D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '-0.01em'
    }
  }, brandText))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav"
  }, sections.map((sec, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, sec.label && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-nav-section"
  }, sec.label), sec.items.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: `sidebar-nav-link ${active === item.id ? 'active' : ''}`,
    onClick: () => onNavigate && onNavigate(item.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: item.icon
  }), /*#__PURE__*/React.createElement("span", null, item.label), item.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "bg-secondary"
  }, item.badge))))))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-nav-link",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-question-line"
  }), /*#__PURE__*/React.createElement("span", null, "Help & docs"))));
}

// ------------------------------------------------------------
// TopBar
// ------------------------------------------------------------
function TopBar({
  user,
  onSignOut
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: "app-topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-search"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-search-line"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search members, classes, settings\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu",
    onClick: () => setMenuOpen(m => !m)
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, user.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, user.name), /*#__PURE__*/React.createElement("div", {
    className: "user-role"
  }, user.role)), /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-down-s-line",
    style: {
      color: 'var(--app-text-tertiary)',
      fontSize: 18
    }
  })), menuOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      right: 0,
      background: '#fff',
      border: '1px solid var(--app-border)',
      borderRadius: 6,
      boxShadow: 'var(--app-shadow-lg)',
      minWidth: 220,
      padding: '4px 0',
      zIndex: 1050
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 16px',
      borderBottom: '1px solid var(--app-border-light)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--app-text-tertiary)'
    }
  }, user.email)), /*#__PURE__*/React.createElement(UserMenuItem, {
    icon: "ri-user-line"
  }, "Account"), /*#__PURE__*/React.createElement(UserMenuItem, {
    icon: "ri-building-line"
  }, "Switch company"), /*#__PURE__*/React.createElement(UserMenuItem, {
    icon: "ri-settings-3-line"
  }, "Settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--app-border-light)',
      marginTop: 4,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(UserMenuItem, {
    icon: "ri-logout-box-r-line",
    onClick: onSignOut
  }, "Sign out")))));
}
function UserMenuItem({
  icon,
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 16px',
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer'
    },
    onMouseDown: onClick,
    onMouseEnter: e => e.currentTarget.style.background = 'var(--app-bg-secondary)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      fontSize: 16,
      color: 'var(--app-text-secondary)'
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}

// ------------------------------------------------------------
// DataTable — clean static table with toolbar + footer
// ------------------------------------------------------------
function DataTable({
  columns,
  data,
  onRowClick,
  toolbar,
  pageSize = 10,
  emptyMessage = 'No items found.'
}) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const filtered = query ? data.filter(row => columns.some(c => {
    const v = typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor];
    return String(v || '').toLowerCase().includes(query.toLowerCase());
  })) : data;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice(page * pageSize, (page + 1) * pageSize);
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-search-line"
  }), /*#__PURE__*/React.createElement("input", {
    className: "form-control form-control-sm",
    placeholder: "Search\u2026",
    value: query,
    onChange: e => {
      setQuery(e.target.value);
      setPage(0);
    }
  })), toolbar), /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key || c.accessor,
    style: c.width ? {
      width: c.width
    } : undefined
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, pageData.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      textAlign: 'center',
      padding: '48px 16px',
      color: 'var(--app-text-tertiary)'
    }
  }, emptyMessage)) : pageData.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: row.id || i,
    className: onRowClick ? 'clickable' : '',
    onClick: onRowClick ? () => onRowClick(row) : undefined
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key || c.accessor
  }, c.render ? c.render(row) : typeof c.accessor === 'function' ? c.accessor(row) : row[c.accessor])))))), filtered.length > pageSize && /*#__PURE__*/React.createElement("div", {
    className: "table-footer"
  }, /*#__PURE__*/React.createElement("div", null, "Showing ", page * pageSize + 1, "\u2013", Math.min((page + 1) * pageSize, filtered.length), " of ", filtered.length), /*#__PURE__*/React.createElement("div", {
    className: "pager"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline-secondary",
    disabled: page === 0,
    onClick: () => setPage(p => p - 1)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-left-s-line"
  })), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline-secondary",
    disabled: page >= totalPages - 1,
    onClick: () => setPage(p => p + 1)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-right-s-line"
  })))));
}

// ------------------------------------------------------------
// Toast host & helpers
// ------------------------------------------------------------
let toastIdCounter = 0;
const toastListeners = new Set();
function showToast(message, type = 'success', duration = 4000) {
  const id = ++toastIdCounter;
  const t = {
    id,
    message,
    type
  };
  toastListeners.forEach(fn => fn({
    add: t
  }));
  if (duration > 0) setTimeout(() => toastListeners.forEach(fn => fn({
    remove: id
  })), duration);
}
window.showToast = showToast;
function ToastHost() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const fn = ev => {
      if (ev.add) setToasts(t => [...t, ev.add]);
      if (ev.remove) setToasts(t => t.filter(x => x.id !== ev.remove));
    };
    toastListeners.add(fn);
    return () => toastListeners.delete(fn);
  }, []);
  const icon = {
    success: 'ri-check-circle-line',
    danger: 'ri-error-warning-line',
    info: 'ri-information-line',
    warning: 'ri-alert-line'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "toast-host"
  }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: `toast toast-${t.type}`
  }, /*#__PURE__*/React.createElement("i", {
    className: icon[t.type] || icon.info
  }), /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: t.message
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "ri-close-line close",
    onClick: () => setToasts(ts => ts.filter(x => x.id !== t.id))
  }))));
}

// ------------------------------------------------------------
// Modal
// ------------------------------------------------------------
function Modal({
  open,
  title,
  icon,
  onClose,
  children,
  footer
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("h5", null, icon && /*#__PURE__*/React.createElement("i", {
    className: icon
  }), title), /*#__PURE__*/React.createElement("i", {
    className: "ri-close-line close",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, footer)));
}

// ------------------------------------------------------------
// Confirm popover (declarative pattern)
// ------------------------------------------------------------
function ConfirmButton({
  message,
  onConfirm,
  children,
  variant = 'outline-danger',
  size,
  icon
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (!open) return;
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'inline-block'
    },
    ref: ref
  }, /*#__PURE__*/React.createElement(Button, {
    variant: variant,
    size: size,
    icon: icon,
    onClick: () => setOpen(o => !o)
  }, children), open && /*#__PURE__*/React.createElement("div", {
    className: "confirm-popover",
    style: {
      top: 'calc(100% + 6px)',
      right: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "msg"
  }, message), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline-secondary",
    onClick: () => setOpen(false)
  }, "No"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "danger",
    onClick: () => {
      setOpen(false);
      onConfirm && onConfirm();
    }
  }, "Yes"))));
}

// ------------------------------------------------------------
// Avatar
// ------------------------------------------------------------
function Avatar({
  name,
  color,
  size = 32
}) {
  const initials = String(name || '?').split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  // pick a stable color from the custom palette based on the name
  const palette = ['#d37445', '#7c9971', '#618abd', '#a779b5', '#8a6455', '#7fa37b', '#6fb09b', '#415364'];
  const idx = String(name || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: color || palette[idx],
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.4,
      fontWeight: 600,
      letterSpacing: '0.5px',
      flexShrink: 0
    }
  }, initials);
}

// ------------------------------------------------------------
// Export for cross-script use
// ------------------------------------------------------------
Object.assign(window, {
  Button,
  Badge,
  Card,
  MetricCard,
  CompactCard,
  Input,
  Select,
  PageHeader,
  Sidebar,
  TopBar,
  DataTable,
  ToastHost,
  Modal,
  ConfirmButton,
  Avatar,
  showToast
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/demo-app/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/demo-app/screens.jsx
try { (() => {
// ============================================================
// Demo App UI Kit — screens
// Each screen reads/writes the shared app state via props.
// Components are pulled from window (defined in components.jsx).
// ============================================================

const {
  useState: useS,
  useEffect: useE
} = React;

// ------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------
function LoginScreen({
  onSignIn
}) {
  const [email, setEmail] = useS('admin@demoapp.com');
  const [password, setPassword] = useS('demo1234');
  const [err, setErr] = useS(null);
  const [loading, setLoading] = useS(false);
  const submit = e => {
    e.preventDefault();
    setErr(null);
    if (!email.includes('@')) {
      setErr('Please enter a valid email.');
      return;
    }
    if (!password) {
      setErr('Password is required.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignIn();
    }, 500);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "login-page"
  }, /*#__PURE__*/React.createElement("form", {
    className: "login-card",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'var(--theme-primary)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 700
    }
  }, "D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 18
    }
  }, "Demo App"))), /*#__PURE__*/React.createElement("h2", null, "Sign in to your account"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Welcome back. Enter your details to continue."), err && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-error-warning-line"
  }), /*#__PURE__*/React.createElement("div", null, err)), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Email",
    required: true,
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Password",
    required: true,
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      color: 'var(--app-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true
  }), " Keep me signed in"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--app-accent)',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    disabled: loading,
    className: ""
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      display: 'block',
      textAlign: 'center'
    }
  }, loading ? 'Signing in…' : 'Sign in')), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 13,
      color: 'var(--app-text-tertiary)'
    }
  }, "Don't have an account? ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--app-accent)',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Create one"))));
}

// ------------------------------------------------------------
// DASHBOARD
// ------------------------------------------------------------
function DashboardScreen({
  company,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "ri-dashboard-line",
    title: "Dashboard"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 4px',
      fontSize: 18
    }
  }, "Welcome back, Sarah"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--app-text-tertiary)',
      fontSize: 14
    }
  }, "Here's what's happening at ", company.name, " this week.")), /*#__PURE__*/React.createElement("div", {
    className: "grid-4 mb-5"
  }, /*#__PURE__*/React.createElement(MetricCard, {
    label: "Active members",
    value: "1,284",
    delta: "12% this month",
    deltaDirection: "up"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Revenue (MTD)",
    value: "$48,920",
    delta: "8% vs last month",
    deltaDirection: "up"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Bookings this week",
    value: "312",
    delta: "3% vs last week",
    deltaDirection: "down"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Open coverage requests",
    value: "4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid-2 mb-5"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Company information"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "detail-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Name"), /*#__PURE__*/React.createElement("dd", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("strong", null, company.name), /*#__PURE__*/React.createElement(Badge, {
    variant: "bg-success"
  }, "Active"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Created"), /*#__PURE__*/React.createElement("dd", null, "Mar 12, 2024")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Timezone"), /*#__PURE__*/React.createElement("dd", null, "America/New_York")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Plan"), /*#__PURE__*/React.createElement("dd", null, "Pro \xB7 Annual")))), /*#__PURE__*/React.createElement(Card, {
    title: "Web links"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field-label",
    style: {
      marginBottom: 6
    }
  }, "URL slug"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--app-text-tertiary)'
    }
  }, "demoapp.com/company/"), /*#__PURE__*/React.createElement("code", null, company.slug)), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--app-text-tertiary)',
      display: 'block',
      marginTop: 4
    }
  }, "Contact support to change your company URL.")), /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 'none',
      borderTop: '1px solid var(--app-border-light)',
      margin: '14px 0'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field-label",
    style: {
      marginBottom: 8
    }
  }, "Company pages"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      textDecoration: 'none',
      color: 'var(--app-accent)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-home-line",
    style: {
      marginRight: 6
    }
  }), "Home page", /*#__PURE__*/React.createElement("i", {
    className: "ri-external-link-line",
    style: {
      marginLeft: 6,
      fontSize: 13
    }
  })), /*#__PURE__*/React.createElement("a", {
    style: {
      textDecoration: 'none',
      color: 'var(--app-accent)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-login-box-line",
    style: {
      marginRight: 6
    }
  }), "Login page", /*#__PURE__*/React.createElement("i", {
    className: "ri-external-link-line",
    style: {
      marginLeft: 6,
      fontSize: 13
    }
  })))))), /*#__PURE__*/React.createElement("h5", {
    style: {
      margin: '0 0 12px',
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      color: 'var(--app-text-tertiary)'
    }
  }, "Quick access"), /*#__PURE__*/React.createElement("div", {
    className: "grid-4 mb-5"
  }, /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-user-star-line",
    title: "Trainers",
    subtitle: "14 active",
    linkText: "MANAGE",
    onLinkClick: () => onNavigate('members')
  }), /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-admin-line",
    title: "Staff",
    subtitle: "6 staff",
    linkText: "MANAGE",
    onLinkClick: () => onNavigate('members')
  }), /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-user-heart-line",
    title: "Active members",
    subtitle: "1,284 members",
    linkText: "VIEW",
    onLinkClick: () => onNavigate('members')
  }), /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-user-add-line",
    title: "New members",
    subtitle: "38 in past 30 days",
    linkText: "VIEW"
  }), /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-exchange-line",
    title: "Coverage requests",
    subtitle: "4 open",
    linkText: "VIEW"
  }), /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-team-line",
    title: "Weekly classes",
    subtitle: "42 classes",
    linkText: "VIEW"
  }), /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-bank-card-line",
    title: "Subscriptions",
    subtitle: "1,156 active",
    linkText: "VIEW"
  }), /*#__PURE__*/React.createElement(CompactCard, {
    icon: "ri-bar-chart-2-line",
    title: "Reports",
    subtitle: "12 saved",
    linkText: "OPEN"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Recent activity",
    headerAction: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline-secondary",
      icon: "ri-arrow-right-line"
    }, "View all")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, [{
    who: 'Marcus Reilly',
    action: 'created a new class',
    what: 'Sunrise Yoga · Mon 7:00 AM',
    when: '2 hours ago',
    icon: 'ri-calendar-line',
    color: 'var(--cc-6)'
  }, {
    who: 'Priya Natarajan',
    action: 'updated her subscription',
    what: 'Pro monthly → Pro annual',
    when: '5 hours ago',
    icon: 'ri-bank-card-line',
    color: 'var(--cc-11)'
  }, {
    who: 'James Okonkwo',
    action: 'requested coverage',
    what: 'HIIT Bootcamp · Wed 6:00 PM',
    when: 'yesterday',
    icon: 'ri-exchange-line',
    color: 'var(--cc-14)'
  }, {
    who: 'Lin Wei',
    action: 'joined as a member',
    what: 'Welcome plan',
    when: '2 days ago',
    icon: 'ri-user-add-line',
    color: 'var(--cc-7)'
  }].map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 0',
      borderBottom: i < 3 ? '1px solid var(--app-border-light)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 6,
      background: a.color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: a.icon,
    style: {
      fontSize: 18
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("strong", null, a.who), " ", a.action), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--app-text-tertiary)',
      marginTop: 2
    }
  }, a.what)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--app-text-tertiary)'
    }
  }, a.when))))));
}

// ------------------------------------------------------------
// MEMBERS LIST
// ------------------------------------------------------------
function MembersScreen({
  members,
  onMember,
  onAddMember
}) {
  const [filter, setFilter] = useS('all');
  const filtered = members.filter(m => filter === 'all' || m.status.toLowerCase() === filter);
  const columns = [{
    key: 'name',
    header: 'Name',
    accessor: r => r.name,
    render: r => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: r.name,
      size: 28
    }), /*#__PURE__*/React.createElement("a", {
      className: "bold-link",
      onClick: e => {
        e.stopPropagation();
        onMember(r);
      }
    }, r.name))
  }, {
    key: 'email',
    header: 'Email',
    accessor: 'email'
  }, {
    key: 'role',
    header: 'Role',
    accessor: 'role',
    render: r => /*#__PURE__*/React.createElement(Badge, {
      role: r.role.toLowerCase()
    }, r.role)
  }, {
    key: 'status',
    header: 'Status',
    accessor: 'status',
    render: r => {
      const map = {
        Active: 'subtle-success',
        Pending: 'subtle-warning',
        Frozen: 'subtle-info',
        Cancelled: 'subtle-danger'
      };
      return /*#__PURE__*/React.createElement(Badge, {
        subtle: true,
        variant: 'bg-' + map[r.status]?.replace('subtle-', '') || 'secondary'
      }, r.status);
    }
  }, {
    key: 'plan',
    header: 'Plan',
    accessor: 'plan'
  }, {
    key: 'joined',
    header: 'Joined',
    accessor: 'joined'
  }, {
    key: 'actions',
    header: '',
    width: 40,
    render: r => /*#__PURE__*/React.createElement("i", {
      className: "ri-more-2-fill",
      style: {
        cursor: 'pointer',
        color: 'var(--app-text-tertiary)'
      },
      onClick: e => {
        e.stopPropagation();
        showToast('Row actions — not wired in this prototype', 'info');
      }
    })
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "ri-group-line",
    title: "Members",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "outline-secondary",
      icon: "ri-download-line"
    }, "Export"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      icon: "ri-add-line",
      onClick: onAddMember
    }, "Add member"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-4 mb-5"
  }, /*#__PURE__*/React.createElement(MetricCard, {
    label: "Total members",
    value: members.length
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Active",
    value: members.filter(m => m.status === 'Active').length
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Pending",
    value: members.filter(m => m.status === 'Pending').length
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Cancelled",
    value: members.filter(m => m.status === 'Cancelled').length
  })), /*#__PURE__*/React.createElement(DataTable, {
    columns: columns,
    data: filtered,
    onRowClick: onMember,
    pageSize: 8,
    toolbar: /*#__PURE__*/React.createElement("div", {
      className: "btn-group-toggle"
    }, ['all', 'active', 'pending', 'frozen', 'cancelled'].map(f => /*#__PURE__*/React.createElement("button", {
      key: f,
      className: `btn-toggle ${filter === f ? 'active' : ''}`,
      onClick: () => setFilter(f)
    }, f[0].toUpperCase() + f.slice(1))))
  }));
}

// ------------------------------------------------------------
// MEMBER DETAIL
// ------------------------------------------------------------
function MemberDetailScreen({
  member,
  onBack,
  onCancel
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: onBack,
    style: {
      color: 'var(--app-text-secondary)',
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-arrow-left-line"
  }), " Back to members")), /*#__PURE__*/React.createElement("div", {
    className: "app-page-header",
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: member.name,
    size: 48
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: '-0.005em'
    }
  }, member.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    role: member.role.toLowerCase()
  }, member.role), /*#__PURE__*/React.createElement(Badge, {
    subtle: true,
    variant: member.status === 'Active' ? 'bg-success' : 'bg-warning'
  }, member.status), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--app-text-tertiary)'
    }
  }, member.email)))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline-secondary",
    icon: "ri-mail-line"
  }, "Message"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-secondary",
    icon: "ri-edit-line"
  }, "Edit"), /*#__PURE__*/React.createElement(ConfirmButton, {
    icon: "ri-close-circle-line",
    message: "Cancel this member's subscription? They will lose access at the end of the current billing period.",
    onConfirm: onCancel
  }, "Cancel subscription"))), /*#__PURE__*/React.createElement("div", {
    className: "grid-3 mb-5"
  }, /*#__PURE__*/React.createElement(MetricCard, {
    label: "Classes booked",
    value: "48"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Attendance",
    value: "92%",
    delta: "up 3 pts",
    deltaDirection: "up"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "Lifetime value",
    value: "$1,240"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid-2 mb-5"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Profile"
  }, /*#__PURE__*/React.createElement("dl", {
    className: "detail-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Phone"), /*#__PURE__*/React.createElement("dd", null, member.phone || '(555) 123-4587')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Joined"), /*#__PURE__*/React.createElement("dd", null, member.joined)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Plan"), /*#__PURE__*/React.createElement("dd", null, member.plan)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Next billing"), /*#__PURE__*/React.createElement("dd", null, "Dec 12, 2025")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Emergency contact"), /*#__PURE__*/React.createElement("dd", null, "Alex Chen")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Member ID"), /*#__PURE__*/React.createElement("dd", null, /*#__PURE__*/React.createElement("code", null, member.id))))), /*#__PURE__*/React.createElement(Card, {
    title: "Notes",
    headerAction: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline-secondary",
      icon: "ri-add-line"
    }, "Add note")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [{
    when: 'Nov 12',
    who: 'Sarah Chen',
    text: 'Followed up on missed sessions. Member said she was traveling — back next week.'
  }, {
    when: 'Oct 28',
    who: 'Marcus Reilly',
    text: 'Completed onboarding. Set up auto-renewal.'
  }].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 12,
      background: 'var(--app-bg-secondary)',
      borderRadius: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("strong", null, n.who), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--app-text-tertiary)',
      fontSize: 12
    }
  }, n.when)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--app-text-secondary)'
    }
  }, n.text)))))), /*#__PURE__*/React.createElement(Card, {
    title: "Recent bookings",
    headerAction: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline-secondary"
    }, "View all")
  }, /*#__PURE__*/React.createElement("table", {
    className: "table",
    style: {
      margin: '-20px -20px -20px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Date"), /*#__PURE__*/React.createElement("th", null, "Class"), /*#__PURE__*/React.createElement("th", null, "Trainer"), /*#__PURE__*/React.createElement("th", null, "Status"))), /*#__PURE__*/React.createElement("tbody", null, [['Dec 8, 9:00 AM', 'Sunrise Yoga', 'Marcus Reilly', 'Booked'], ['Dec 5, 6:00 PM', 'HIIT Bootcamp', 'Priya Natarajan', 'Attended'], ['Dec 3, 7:30 AM', 'Spin 45', 'James Okonkwo', 'Attended'], ['Nov 30, 9:00 AM', 'Sunrise Yoga', 'Marcus Reilly', 'No-show']].map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", null, row[0]), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, row[1])), /*#__PURE__*/React.createElement("td", null, row[2]), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    subtle: true,
    variant: row[3] === 'Booked' ? 'bg-info' : row[3] === 'Attended' ? 'bg-success' : 'bg-danger'
  }, row[3]))))))));
}

// ------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------
function SettingsScreen({
  company,
  onSave
}) {
  const [tab, setTab] = useS('general');
  const [name, setName] = useS(company.name);
  const [slug, setSlug] = useS(company.slug);
  const save = () => {
    onSave({
      ...company,
      name,
      slug
    });
    showToast('Settings saved.', 'success');
  };
  const tabs = [{
    id: 'general',
    label: 'General',
    icon: 'ri-settings-3-line'
  }, {
    id: 'billing',
    label: 'Billing',
    icon: 'ri-bank-card-line'
  }, {
    id: 'team',
    label: 'Team',
    icon: 'ri-team-line'
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: 'ri-notification-3-line'
  }, {
    id: 'integrations',
    label: 'Integrations',
    icon: 'ri-plug-line'
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHeader, {
    icon: "ri-settings-3-line",
    title: "Settings"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: `sidebar-nav-link ${tab === t.id ? 'active' : ''}`,
    style: {
      margin: 0
    },
    onClick: () => setTab(t.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: t.icon
  }), /*#__PURE__*/React.createElement("span", null, t.label)))), /*#__PURE__*/React.createElement("div", null, tab === 'general' && /*#__PURE__*/React.createElement(Card, {
    title: "General"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field-label",
    style: {
      marginBottom: 6
    }
  }, "Company name"), /*#__PURE__*/React.createElement(Input, {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Company name",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field-label",
    style: {
      marginBottom: 6
    }
  }, "URL slug"), /*#__PURE__*/React.createElement(Input, {
    value: slug,
    onChange: e => setSlug(e.target.value),
    placeholder: "url-slug"
  }), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--app-text-tertiary)',
      fontSize: 12
    }
  }, "Your workspace lives at ", /*#__PURE__*/React.createElement("code", null, "demoapp.com/company/", slug))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "field-label",
    style: {
      marginBottom: 6
    }
  }, "Timezone"), /*#__PURE__*/React.createElement(Select, {
    value: "America/New_York",
    onChange: () => {},
    options: ['America/New_York', 'America/Los_Angeles', 'America/Chicago', 'Europe/London', 'Asia/Tokyo']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: save
  }, "Save changes"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-secondary"
  }, "Cancel")))), tab === 'billing' && /*#__PURE__*/React.createElement(Card, {
    title: "Billing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "alert alert-info"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ri-information-line"
  }), /*#__PURE__*/React.createElement("div", null, "You're on the ", /*#__PURE__*/React.createElement("strong", null, "Pro \xB7 Annual"), " plan. Renews on Dec 12, 2025.")), /*#__PURE__*/React.createElement("dl", {
    className: "detail-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Card on file"), /*#__PURE__*/React.createElement("dd", null, "Visa \u2022\u2022\u2022\u2022 4242")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Next charge"), /*#__PURE__*/React.createElement("dd", null, "$1,188 on Dec 12, 2025")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Billing email"), /*#__PURE__*/React.createElement("dd", null, "billing@demoapp.com"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "ri-bank-card-line"
  }, "Update payment method"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-secondary"
  }, "View invoices"))), tab === 'team' && /*#__PURE__*/React.createElement(Card, {
    title: "Team members"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "ri-user-add-line"
  }, "Invite teammate")), /*#__PURE__*/React.createElement("table", {
    className: "table",
    style: {
      margin: '-20px -20px -20px'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Role"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, [['Sarah Chen', 'sarah@demoapp.com', 'Admin'], ['Marcus Reilly', 'marcus@demoapp.com', 'Trainer'], ['Priya Natarajan', 'priya@demoapp.com', 'Staff']].map(r => /*#__PURE__*/React.createElement("tr", {
    key: r[0]
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r[0],
    size: 28
  }), /*#__PURE__*/React.createElement("strong", null, r[0]))), /*#__PURE__*/React.createElement("td", null, r[1]), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    role: r[2].toLowerCase()
  }, r[2])), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("i", {
    className: "ri-more-2-fill",
    style: {
      cursor: 'pointer',
      color: 'var(--app-text-tertiary)'
    }
  }))))))), tab === 'notifications' && /*#__PURE__*/React.createElement(Card, {
    title: "Notifications"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['New member signups', 'Get an email each time someone joins.', true], ['Coverage requests', 'Notify me when a trainer needs coverage.', true], ['Daily activity digest', 'A summary of yesterday\'s activity at 7:00 AM.', false], ['Failed payments', 'Alert me about failed billing attempts.', true]].map(([title, desc, on], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: i < 3 ? '1px solid var(--app-border-light)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--app-text-tertiary)',
      marginTop: 2
    }
  }, desc)), /*#__PURE__*/React.createElement(Toggle, {
    defaultOn: on
  }))))), tab === 'integrations' && /*#__PURE__*/React.createElement(Card, {
    title: "Integrations"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 14
    }
  }, [{
    name: 'Stripe',
    desc: 'Process payments and subscriptions',
    icon: 'ri-bank-card-line',
    connected: true,
    color: '#475569'
  }, {
    name: 'SendGrid',
    desc: 'Transactional email delivery',
    icon: 'ri-mail-send-line',
    connected: true,
    color: '#1A82E2'
  }, {
    name: 'Zoom',
    desc: 'Host virtual classes',
    icon: 'ri-video-line',
    connected: false,
    color: '#2D8CFF'
  }, {
    name: 'Google Calendar',
    desc: 'Sync schedules to calendar',
    icon: 'ri-calendar-line',
    connected: false,
    color: '#4285F4'
  }].map(int => /*#__PURE__*/React.createElement("div", {
    key: int.name,
    style: {
      padding: 16,
      border: '1px solid var(--app-border)',
      borderRadius: 6,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 6,
      background: int.color,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: int.icon,
    style: {
      fontSize: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("strong", null, int.name), int.connected && /*#__PURE__*/React.createElement(Badge, {
    subtle: true,
    variant: "bg-success"
  }, "Connected")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--app-text-tertiary)',
      marginTop: 2
    }
  }, int.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: int.connected ? 'outline-secondary' : 'outline-primary'
  }, int.connected ? 'Manage' : 'Connect'))))))))));
}
function Toggle({
  defaultOn = false
}) {
  const [on, setOn] = useS(defaultOn);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => setOn(o => !o),
    style: {
      width: 36,
      height: 20,
      borderRadius: 10,
      background: on ? 'var(--theme-success)' : 'var(--app-border)',
      position: 'relative',
      cursor: 'pointer',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
      transition: 'left 0.15s ease'
    }
  }));
}

// Export
Object.assign(window, {
  LoginScreen,
  DashboardScreen,
  MembersScreen,
  MemberDetailScreen,
  SettingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/demo-app/screens.jsx", error: String((e && e.message) || e) }); }

})();
