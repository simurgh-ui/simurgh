import { useState } from 'react';
import { Button } from '@simurgh-ui/react/button';
import { Checkbox } from '@simurgh-ui/react/checkbox';
import { Input } from '@simurgh-ui/react/input';
import { Meter } from '@simurgh-ui/react/meter';
import { NativeSelect } from '@simurgh-ui/react/native-select';
import { Progress } from '@simurgh-ui/react/progress';
import { Switch } from '@simurgh-ui/react/switch';
import { Textarea } from '@simurgh-ui/react/textarea';
import '@simurgh-ui/styles/button.css';
import '@simurgh-ui/styles/checkbox.css';
import '@simurgh-ui/styles/input.css';
import '@simurgh-ui/styles/meter.css';
import '@simurgh-ui/styles/native-select.css';
import '@simurgh-ui/styles/progress.css';
import '@simurgh-ui/styles/switch.css';
import '@simurgh-ui/styles/textarea.css';

type Props = { component: 'button' | 'checkbox' | 'input' | 'meter' | 'native-select' | 'progress' | 'switch' | 'textarea' };

export default function ReactComponentPreview({ component }: Props) {
  const [checked, setChecked] = useState(true);

  if (component === 'button')
    return <div className="preview-row"><Button>Save changes</Button><Button variant="secondary" loading>Saving…</Button></div>;

  if (component === 'checkbox')
    return <label className="preview-row"><Checkbox checked={checked} onCheckedChange={setChecked} aria-label="Receive product updates">{checked ? '✓' : ''}</Checkbox>Receive product updates</label>;

  if (component === 'textarea')
    return <div className="preview-stack"><label htmlFor="live-preview-bio">Biography</label><Textarea id="live-preview-bio" rows={4} defaultValue="Poet, mathematician, and pioneer." /></div>;

  if (component === 'native-select')
    return <div className="preview-stack"><label htmlFor="live-preview-timezone">Timezone</label><NativeSelect id="live-preview-timezone" defaultValue="tehran"><option value="utc">UTC</option><option value="tehran">Tehran</option><option value="tokyo">Tokyo</option></NativeSelect></div>;

  if (component === 'switch')
    return <label className="preview-row"><Switch checked={checked} onCheckedChange={setChecked} aria-label="Reduced motion">{checked ? '●' : '○'}</Switch>Reduced motion</label>;

  if (component === 'progress')
    return <div className="preview-stack"><div className="preview-row"><strong>Uploading assets</strong><span className="preview-muted">68%</span></div><Progress value={68} aria-label="Uploading assets" /></div>;

  if (component === 'meter')
    return <div className="preview-stack"><label htmlFor="live-preview-storage">Storage used: 72%</label><Meter id="live-preview-storage" min={0} max={100} low={40} high={80} optimum={20} value={72}>72%</Meter></div>;

  if (component === 'input')
    return <div className="preview-stack"><label htmlFor="live-preview-email">Email address</label><Input id="live-preview-email" type="email" defaultValue="ada@example.com" /></div>;

  return null;
}
