// ============================================================
// Vivo Care Connect — shared widgets
// Hand-drawn SVG charts styled to the design system + small
// reusable presentational pieces. Exported to window.
// ============================================================
(function () {
  const { useState } = React;

  // ---- Avatar (initials) ----
  function AV({ name, color, size = 34 }) {
    return React.createElement('div', {
      className: 'av',
      style: { width: size, height: size, fontSize: size * 0.38, background: color || '#618abd' },
    }, window.VH.initials(name));
  }

  // ---- Patient name cell (avatar + name + sub) ----
  function PatientCell({ name, sub, color }) {
    return React.createElement('div', { className: 'pcell' },
      React.createElement(AV, { name, color, size: 36 }),
      React.createElement('div', null,
        React.createElement('div', { className: 'pname' }, name),
        sub && React.createElement('div', { className: 'psub' }, sub),
      ),
    );
  }

  // ---- Sparkline ----
  function Sparkline({ data, width = 96, height = 28, color = '#2480c0' }) {
    const max = Math.max(...data, 1), min = Math.min(...data, 0);
    const rng = max - min || 1;
    const pts = data.map((v, i) => {
      const x = (i / (data.length - 1)) * (width - 4) + 2;
      const y = height - 3 - ((v - min) / rng) * (height - 6);
      return [x, y];
    });
    const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const last = pts[pts.length - 1];
    return React.createElement('svg', { width, height, style: { display: 'block' } },
      React.createElement('path', { d, fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      React.createElement('circle', { cx: last[0], cy: last[1], r: 2.6, fill: color }),
    );
  }

  // ---- Line chart: weekly minutes vs goal ----
  function LineChart({ series, goal, width = 560, height = 240, color = '#2480c0' }) {
    const padL = 42, padR = 16, padT = 16, padB = 30;
    const w = width - padL - padR, h = height - padT - padB;
    const maxV = Math.max(goal, ...series.map(s => s.min)) * 1.12;
    const x = (i) => padL + (series.length === 1 ? w / 2 : (i / (series.length - 1)) * w);
    const y = (v) => padT + h - (v / maxV) * h;
    const linePath = series.map((s, i) => (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(s.min).toFixed(1)).join(' ');
    const areaPath = linePath + ' L' + x(series.length - 1).toFixed(1) + ' ' + (padT + h) + ' L' + x(0).toFixed(1) + ' ' + (padT + h) + ' Z';
    const yticks = [0, 50, 100, 150].filter(t => t <= maxV);
    return React.createElement('svg', { width: '100%', viewBox: `0 0 ${width} ${height}`, style: { display: 'block', maxWidth: width } },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: 'lcfill', x1: 0, y1: 0, x2: 0, y2: 1 },
          React.createElement('stop', { offset: '0%', stopColor: color, stopOpacity: 0.18 }),
          React.createElement('stop', { offset: '100%', stopColor: color, stopOpacity: 0 }),
        ),
      ),
      // gridlines + y labels
      yticks.map(t => React.createElement('g', { key: t },
        React.createElement('line', { x1: padL, y1: y(t), x2: width - padR, y2: y(t), stroke: '#e2e8f0', strokeWidth: 1 }),
        React.createElement('text', { x: padL - 8, y: y(t) + 4, textAnchor: 'end', fontSize: 11, fill: '#94a3b8' }, t),
      )),
      // goal line
      React.createElement('line', { x1: padL, y1: y(goal), x2: width - padR, y2: y(goal), stroke: '#1aa35a', strokeWidth: 1.5, strokeDasharray: '5 4' }),
      React.createElement('text', { x: width - padR, y: y(goal) - 6, textAnchor: 'end', fontSize: 11, fontWeight: 600, fill: '#1aa35a' }, `Goal ${goal} min`),
      // area + line
      React.createElement('path', { d: areaPath, fill: 'url(#lcfill)' }),
      React.createElement('path', { d: linePath, fill: 'none', stroke: color, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
      // points + x labels
      series.map((s, i) => React.createElement('g', { key: i },
        React.createElement('circle', { cx: x(i), cy: y(s.min), r: 4, fill: '#fff', stroke: color, strokeWidth: 2 }),
        React.createElement('text', { x: x(i), y: y(s.min) - 12, textAnchor: 'middle', fontSize: 11, fontWeight: 600, fill: '#0f172a' }, s.min),
        React.createElement('text', { x: x(i), y: height - 10, textAnchor: 'middle', fontSize: 11, fill: '#64748b' }, s.wk),
      )),
    );
  }

  // ---- Horizontal status timeline ----
  function StatusTimeline({ steps, currentIndex }) {
    return React.createElement('div', { className: 'timeline' },
      steps.map((s, i) => {
        const cls = i < currentIndex ? 'done' : i === currentIndex ? 'current' : '';
        return React.createElement('div', { key: i, className: 'tstep ' + cls },
          React.createElement('div', { className: 'tnode' },
            i < currentIndex ? React.createElement('i', { className: 'ri-check-line' }) : (i + 1)),
          React.createElement('div', { className: 'tlabel' }, s.label),
          s.date && React.createElement('div', { className: 'tdate' }, s.date),
        );
      }),
    );
  }

  // ---- Wizard stepper ----
  function Stepper({ steps, active }) {
    const out = [];
    steps.forEach((s, i) => {
      const cls = i < active ? 'done' : i === active ? 'active' : '';
      out.push(React.createElement('div', { key: 's' + i, className: 'wstep ' + cls },
        React.createElement('div', { className: 'wnum' }, i < active ? React.createElement('i', { className: 'ri-check-line' }) : (i + 1)),
        React.createElement('div', { className: 'wtitle' }, s),
      ));
      if (i < steps.length - 1) out.push(React.createElement('div', { key: 'l' + i, className: 'wline ' + (i < active ? 'done' : '') }));
    });
    return React.createElement('div', { className: 'stepper' }, out);
  }

  // ---- Collapsible JSON / code block ----
  function JsonBlock({ obj, label = 'Preview FHIR JSON', defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    return React.createElement('div', null,
      React.createElement('div', {
        onClick: () => setOpen(o => !o),
        style: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--app-text-secondary)', padding: '6px 0' },
      },
        React.createElement('i', { className: open ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line' }),
        React.createElement('i', { className: 'ri-code-s-slash-line' }),
        label,
      ),
      open && React.createElement('div', { className: 'codeblock', dangerouslySetInnerHTML: { __html: window.VH.jsonHtml(obj) } }),
    );
  }

  // ---- Filter chips ----
  function FilterChips({ options, value, onChange }) {
    return React.createElement('div', { className: 'chips' },
      options.map(o => React.createElement('div', {
        key: o.value,
        className: 'chip ' + (value === o.value ? 'active' : ''),
        onClick: () => onChange(o.value),
      }, o.label, o.count != null && React.createElement('span', { className: 'count' }, o.count))),
    );
  }

  // ---- Goal progress row ----
  function GoalBar({ label, value, max, unit, blue }) {
    const pct = Math.min(100, Math.round((value / max) * 100));
    return React.createElement('div', { style: { marginBottom: 14 } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 } },
        React.createElement('span', { style: { fontWeight: 500 } }, label),
        React.createElement('span', { className: 'muted-sm' }, `${value} / ${max} ${unit || ''}`),
      ),
      React.createElement('div', { className: 'pbar' + (blue ? ' blue' : '') }, React.createElement('span', { style: { width: pct + '%' } })),
    );
  }

  Object.assign(window, { AV, PatientCell, Sparkline, LineChart, StatusTimeline, Stepper, JsonBlock, FilterChips, GoalBar });
})();
