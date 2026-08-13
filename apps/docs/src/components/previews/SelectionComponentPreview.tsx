import { Field, FieldLegend } from '@simurgh-ui/react/field';
import { Label } from '@simurgh-ui/react/label';
import { RadioGroup, RadioGroupItem } from '@simurgh-ui/react/radio-group';
import { Rating } from '@simurgh-ui/react/rating';
import { Toggle } from '@simurgh-ui/react/toggle';
import { ToggleGroup, ToggleGroupItem } from '@simurgh-ui/react/toggle-group';
import '@simurgh-ui/styles/field.css';
import '@simurgh-ui/styles/label.css';
import '@simurgh-ui/styles/radio-group.css';
import '@simurgh-ui/styles/rating.css';
import '@simurgh-ui/styles/toggle.css';
import '@simurgh-ui/styles/toggle-group.css';

type Props = {
  component: 'radio-group' | 'rating' | 'toggle' | 'toggle-group';
};

export default function SelectionComponentPreview({ component }: Props) {
  if (component === 'toggle')
    return <div className="preview-row" role="toolbar" aria-label="Text formatting"><Toggle defaultPressed aria-label="Bold"><strong aria-hidden="true">B</strong></Toggle><Toggle aria-label="Italic"><em aria-hidden="true">I</em></Toggle><Toggle aria-label="Underline"><span aria-hidden="true">U</span></Toggle></div>;
  if (component === 'radio-group')
    return <Field className="preview-stack"><FieldLegend>Choose a plan</FieldLegend><RadioGroup defaultValue="basic" name="plan" aria-label="Choose a plan"><label className="preview-row"><RadioGroupItem value="basic" aria-label="Basic" />Basic</label><label className="preview-row"><RadioGroupItem value="pro" aria-label="Pro" />Pro</label></RadioGroup></Field>;
  if (component === 'rating')
    return <div className="preview-stack"><Label>Product rating</Label><Rating aria-label="Product rating" defaultValue={3} name="product-rating" /></div>;
  if (component === 'toggle-group')
    return <ToggleGroup type="single" defaultValue={['start']} aria-label="Alignment"><ToggleGroupItem value="start">Start</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="end">End</ToggleGroupItem></ToggleGroup>;
  return null;
}
