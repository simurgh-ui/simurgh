import { useState } from 'react';
const colors = [
  ['Firuzeh', '#1d9b91'], ['Persian blue', '#1851a1'], ['Cobalt', '#245caa'], ['Saffron', '#f1bd38'],
  ['Brick', '#a84d2d'], ['Pomegranate', '#a91b3b'], ['Ivory', '#eee0c3'], ['Ink', '#18243a'],
];
export function PalettePicker() {
  const [active, setActive] = useState(colors[0]);
  return <div className="palette-card" style={{ '--active-color': active[1] } as React.CSSProperties}><div className="palette-copy"><span className="eyebrow">Theme playground</span><h3>Rooted in color. Built for products.</h3><p>Heritage pigments stay separate from semantic roles, so brand expression never compromises clarity.</p><button className="button palette-button">Explore theming <span aria-hidden="true">→</span></button></div><div className="swatches" role="listbox" aria-label="Simurgh color palette">{colors.map((color) => <button key={color[0]} role="option" aria-selected={active[0] === color[0]} aria-label={color[0]} onClick={() => setActive(color)} style={{ background: color[1] }}><span>{color[0]}</span></button>)}</div></div>;
}
