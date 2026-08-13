import { useState } from 'react';
import { Button } from '@simurgh-ui/react/button';
import { Checkbox } from '@simurgh-ui/react/checkbox';
import { Field, FieldDescription, FieldLegend } from '@simurgh-ui/react/field';
import { FileUpload } from '@simurgh-ui/react/file-upload';
import { Form } from '@simurgh-ui/react/form';
import { Input } from '@simurgh-ui/react/input';
import { InputOtp } from '@simurgh-ui/react/input-otp';
import { Label } from '@simurgh-ui/react/label';
import { NumberInput } from '@simurgh-ui/react/number-input';
import { PasswordInput } from '@simurgh-ui/react/password-input';
import { Switch } from '@simurgh-ui/react/switch';
import { TagsInput } from '@simurgh-ui/react/tags-input';
import '@simurgh-ui/styles/button.css';
import '@simurgh-ui/styles/checkbox.css';
import '@simurgh-ui/styles/field.css';
import '@simurgh-ui/styles/file-upload.css';
import '@simurgh-ui/styles/form.css';
import '@simurgh-ui/styles/input.css';
import '@simurgh-ui/styles/input-otp.css';
import '@simurgh-ui/styles/label.css';
import '@simurgh-ui/styles/number-input.css';
import '@simurgh-ui/styles/password-input.css';
import '@simurgh-ui/styles/switch.css';
import '@simurgh-ui/styles/tags-input.css';

type Props = {
  component: 'checkbox' | 'file-upload' | 'form' | 'input-otp' | 'number-input' | 'password-input' | 'switch' | 'tags-input';
};

export default function FormComponentPreview({ component }: Props) {
  const [checked, setChecked] = useState(true);

  if (component === 'checkbox')
    return <label className="preview-row"><Checkbox checked={checked} onCheckedChange={setChecked} aria-label="Receive product updates">{checked ? '✓' : ''}</Checkbox>Receive product updates</label>;
  if (component === 'switch')
    return <label className="preview-row"><Switch checked={checked} onCheckedChange={setChecked} aria-label="Reduced motion">{checked ? '●' : '○'}</Switch>Reduced motion</label>;
  if (component === 'form')
    return <Form className="preview-stack" onSubmit={(event) => event.preventDefault()}><Label htmlFor="live-preview-form-email">Email</Label><Input id="live-preview-form-email" name="email" type="email" required placeholder="ada@example.com" /><Button type="submit">Continue</Button></Form>;
  if (component === 'file-upload')
    return <FileUpload id="live-preview-upload" label="Upload documents" description="Drop PDF files here or browse" accept=".pdf" multiple name="documents" />;
  if (component === 'input-otp')
    return <div className="preview-stack"><Label htmlFor="live-preview-otp">Verification code</Label><InputOtp id="live-preview-otp" name="code" length={6} aria-describedby="live-preview-otp-help" /><span id="live-preview-otp-help" className="preview-muted">Enter the six-digit code.</span></div>;
  if (component === 'number-input')
    return <div className="preview-stack"><Label htmlFor="live-preview-quantity">Quantity</Label><NumberInput id="live-preview-quantity" defaultValue={2} min={0} max={10} step={1} /></div>;
  if (component === 'password-input')
    return <div className="preview-stack"><Label htmlFor="live-preview-password">Account password</Label><PasswordInput id="live-preview-password" defaultValue="correct horse battery staple" autoComplete="current-password" /></div>;
  if (component === 'tags-input')
    return <TagsInput aria-label="Skills" inputLabel="Add skill" defaultValue={['TypeScript', 'Accessibility']} name="skills" placeholder="Add a skill" />;

  return <Field><FieldLegend>Unsupported preview</FieldLegend><FieldDescription>This form preview is unavailable.</FieldDescription></Field>;
}
