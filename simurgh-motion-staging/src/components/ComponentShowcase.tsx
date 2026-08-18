import { useState } from 'react';

const tabs = ['Controls', 'Forms', 'Overlays', 'Data', 'Charts'] as const;
type Tab = (typeof tabs)[number];

function Controls() {
  return <div className="demo-grid"><button className="button primary">Primary action</button><button className="button secondary">Secondary</button><span className="badge">New</span><label className="switch"><input type="checkbox" defaultChecked /><span /> Notifications</label><div className="avatar-row"><span className="avatar">SA</span><div><strong>Simurgh team</strong><small>Accessible by default</small></div></div></div>;
}
function Forms() {
  return <form className="demo-form" onSubmit={(event) => event.preventDefault()}><label>Project name<input defaultValue="My new product" /></label><label>Framework<select defaultValue="React"><option>React</option><option>Vue</option><option>Angular</option></select></label><label className="check"><input type="checkbox" defaultChecked /> Include design tokens</label><button className="button primary">Create project</button></form>;
}
function Overlays() {
  return <div className="dialog-demo" role="dialog" aria-labelledby="demo-dialog-title"><div className="dialog-icon">✓</div><h3 id="demo-dialog-title">Source added</h3><p>Button and Dialog are now yours to customize.</p><div><button className="button secondary">View files</button><button className="button primary">Done</button></div></div>;
}
function Data() {
  return <div className="table-wrap"><table><caption className="sr-only">Installed component status</caption><thead><tr><th>Component</th><th>Framework</th><th>Status</th></tr></thead><tbody><tr><td>Dialog</td><td>React</td><td><span className="status">Ready</span></td></tr><tr><td>Calendar</td><td>Vue</td><td><span className="status">Ready</span></td></tr><tr><td>Chart</td><td>Angular</td><td><span className="status">Ready</span></td></tr></tbody></table></div>;
}
function Charts() {
  const bars = [42, 70, 55, 88, 66, 96, 76];
  return <div className="chart-demo"><div><small>Weekly installs</small><strong>12,480 <em>+18.2%</em></strong></div><div className="bars" aria-label="Weekly installs trending upward">{bars.map((bar, index) => <span key={index} style={{ '--bar': `${bar}%` } as React.CSSProperties} />)}</div><div className="chart-labels"><span>Mon</span><span>Sun</span></div></div>;
}

const panels: Record<Tab, React.ReactNode> = { Controls: <Controls />, Forms: <Forms />, Overlays: <Overlays />, Data: <Data />, Charts: <Charts /> };
export function ComponentShowcase() {
  const [active, setActive] = useState<Tab>('Controls');
  function keyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setActive(tabs[next]);
    document.getElementById(`tab-${tabs[next]}`)?.focus();
  }
  return <div className="showcase"><div className="showcase-tabs" role="tablist" aria-label="Component examples">{tabs.map((tab, index) => <button id={`tab-${tab}`} role="tab" aria-selected={active === tab} aria-controls="showcase-panel" tabIndex={active === tab ? 0 : -1} onClick={() => setActive(tab)} onKeyDown={(event) => keyDown(event, index)} key={tab}>{tab}</button>)}</div><div className="showcase-panel" id="showcase-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>{panels[active]}</div></div>;
}
