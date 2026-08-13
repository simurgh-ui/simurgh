import { Combobox } from '@simurgh-ui/react/combobox';
import { Command } from '@simurgh-ui/react/command';
import { Label } from '@simurgh-ui/react/label';
import { Select } from '@simurgh-ui/react/select';
import '@simurgh-ui/styles/combobox.css';
import '@simurgh-ui/styles/command.css';
import '@simurgh-ui/styles/label.css';
import '@simurgh-ui/styles/select.css';

type Props = { component: 'combobox' | 'command' | 'select' };

export default function SearchSelectionComponentPreview({ component }: Props) {
  if (component === 'select')
    return <div className="preview-stack"><Label>Framework</Label><Select name="framework" defaultValue="react" placeholder="Choose a framework" options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'angular', label: 'Angular' }]} /></div>;
  if (component === 'command')
    return <Command name="command" placeholder="Search commands" options={[{ value: 'settings', label: 'Open settings' }, { value: 'project', label: 'Create project' }, { value: 'theme', label: 'Change theme' }]} />;
  return <div className="preview-stack"><Label>City</Label><Combobox name="city" placeholder="Search cities" defaultValue="isfahan" options={[{ value: 'isfahan', label: 'Isfahan' }, { value: 'isfara', label: 'Isfara' }, { value: 'shiraz', label: 'Shiraz' }]} /></div>;
}
