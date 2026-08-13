import { useState } from 'react';
import { Button } from '@simurgh-ui/react/button';
import { Checkbox } from '@simurgh-ui/react/checkbox';
import { Input } from '@simurgh-ui/react/input';
import { Meter } from '@simurgh-ui/react/meter';
import { NativeSelect } from '@simurgh-ui/react/native-select';
import { Progress } from '@simurgh-ui/react/progress';
import { Switch } from '@simurgh-ui/react/switch';
import { Textarea } from '@simurgh-ui/react/textarea';
import { Alert } from '@simurgh-ui/react/alert';
import { Avatar } from '@simurgh-ui/react/avatar';
import { Badge } from '@simurgh-ui/react/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@simurgh-ui/react/card';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@simurgh-ui/react/empty';
import { Kbd } from '@simurgh-ui/react/kbd';
import { Separator } from '@simurgh-ui/react/separator';
import { Spinner } from '@simurgh-ui/react/spinner';
import { AspectRatio } from '@simurgh-ui/react/aspect-ratio';
import { Breadcrumb } from '@simurgh-ui/react/breadcrumb';
import { Label } from '@simurgh-ui/react/label';
import { Link } from '@simurgh-ui/react/link';
import { Skeleton } from '@simurgh-ui/react/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@simurgh-ui/react/table';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@simurgh-ui/react/button-group';
import { DescriptionList, DescriptionListDetails, DescriptionListGroup, DescriptionListTerm } from '@simurgh-ui/react/description-list';
import { Field, FieldDescription, FieldLegend } from '@simurgh-ui/react/field';
import { InputGroup, InputGroupAddon, InputGroupText } from '@simurgh-ui/react/input-group';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@simurgh-ui/react/item';
import '@simurgh-ui/styles/button.css';
import '@simurgh-ui/styles/checkbox.css';
import '@simurgh-ui/styles/input.css';
import '@simurgh-ui/styles/meter.css';
import '@simurgh-ui/styles/native-select.css';
import '@simurgh-ui/styles/progress.css';
import '@simurgh-ui/styles/switch.css';
import '@simurgh-ui/styles/textarea.css';
import '@simurgh-ui/styles/alert.css';
import '@simurgh-ui/styles/avatar.css';
import '@simurgh-ui/styles/badge.css';
import '@simurgh-ui/styles/card.css';
import '@simurgh-ui/styles/empty.css';
import '@simurgh-ui/styles/kbd.css';
import '@simurgh-ui/styles/separator.css';
import '@simurgh-ui/styles/spinner.css';
import '@simurgh-ui/styles/aspect-ratio.css';
import '@simurgh-ui/styles/breadcrumb.css';
import '@simurgh-ui/styles/label.css';
import '@simurgh-ui/styles/link.css';
import '@simurgh-ui/styles/skeleton.css';
import '@simurgh-ui/styles/table.css';
import '@simurgh-ui/styles/button-group.css';
import '@simurgh-ui/styles/description-list.css';
import '@simurgh-ui/styles/field.css';
import '@simurgh-ui/styles/input-group.css';
import '@simurgh-ui/styles/item.css';

type Props = { component: 'alert' | 'aspect-ratio' | 'avatar' | 'badge' | 'breadcrumb' | 'button' | 'button-group' | 'card' | 'checkbox' | 'description-list' | 'empty' | 'field' | 'input' | 'input-group' | 'item' | 'kbd' | 'label' | 'link' | 'meter' | 'native-select' | 'progress' | 'separator' | 'skeleton' | 'spinner' | 'switch' | 'table' | 'textarea' };

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

  if (component === 'alert')
    return <Alert className="preview-stack"><strong>Profile updated</strong><span className="preview-muted">Your public information was saved successfully.</span></Alert>;

  if (component === 'avatar')
    return <div className="preview-row"><Avatar alt="Ada Lovelace" fallback="AL" aria-label="Ada Lovelace" /><div className="preview-stack"><strong>Ada Lovelace</strong><span className="preview-muted">Maintainer</span></div></div>;

  if (component === 'badge')
    return <div className="preview-row"><Badge>Draft</Badge><Badge tone="success" status>Published</Badge><Badge tone="neutral">Archived</Badge></div>;

  if (component === 'card')
    return <Card style={{ maxWidth: '26rem' }}><CardHeader><CardTitle>The Conference of the Birds</CardTitle><CardDescription>A journey through seven valleys.</CardDescription></CardHeader><CardContent>Discover a composable, framework-native component system.</CardContent><CardFooter><Button>Read more</Button></CardFooter></Card>;

  if (component === 'empty')
    return <Empty><EmptyMedia>+</EmptyMedia><EmptyHeader><EmptyTitle>No projects yet</EmptyTitle><EmptyDescription>Create a project to organize your work.</EmptyDescription></EmptyHeader><EmptyContent><Button>Create project</Button></EmptyContent></Empty>;

  if (component === 'kbd')
    return <div className="preview-row">Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search.</div>;

  if (component === 'separator')
    return <div className="preview-stack"><strong>Account</strong><span className="preview-muted">Manage profile and security preferences.</span><Separator /><strong>Notifications</strong><span className="preview-muted">Choose which updates you receive.</span></div>;

  if (component === 'spinner')
    return <div className="preview-row"><Spinner label="Loading results" /><strong>Loading results</strong></div>;

  if (component === 'label')
    return <div className="preview-stack"><Label htmlFor="live-preview-labelled-email">Email address</Label><Input id="live-preview-labelled-email" type="email" placeholder="ada@example.com" /></div>;

  if (component === 'link')
    return <div className="preview-row"><Link href="#related-components">Related components</Link><Link href="https://example.com" external>External reference</Link><Link disabled>Unavailable</Link></div>;

  if (component === 'breadcrumb')
    return <Breadcrumb><ol className="preview-row" style={{ listStyle: 'none', margin: 0, padding: 0 }}><li><Link href="/">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/components/overview/">Components</Link></li><li aria-hidden="true">/</li><li aria-current="page">Breadcrumb</li></ol></Breadcrumb>;

  if (component === 'aspect-ratio')
    return <AspectRatio ratio={16 / 9} className="preview-panel" style={{ width: 'min(100%, 24rem)', display: 'grid', placeItems: 'center' }}>16:9 media area</AspectRatio>;

  if (component === 'skeleton')
    return <div className="preview-stack"><Skeleton label="Loading profile" style={{ blockSize: '3rem', borderRadius: '999px', inlineSize: '3rem' }} /><Skeleton style={{ blockSize: '1rem', borderRadius: '.25rem', inlineSize: '75%' }} /><Skeleton style={{ blockSize: '1rem', borderRadius: '.25rem', inlineSize: '100%' }} /></div>;

  if (component === 'table')
    return <Table><TableCaption>Component adoption</TableCaption><TableHeader><TableRow><TableHead>Framework</TableHead><TableHead>Teams</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>React</TableCell><TableCell>12</TableCell></TableRow><TableRow><TableCell>Vue</TableCell><TableCell>8</TableCell></TableRow></TableBody></Table>;

  if (component === 'button-group')
    return <ButtonGroup aria-label="Text alignment"><Button>Left</Button><ButtonGroupSeparator /><ButtonGroupText>Align</ButtonGroupText><Button>Right</Button></ButtonGroup>;

  if (component === 'description-list')
    return <DescriptionList><DescriptionListGroup><DescriptionListTerm>Frameworks</DescriptionListTerm><DescriptionListDetails>Angular, React, and Vue</DescriptionListDetails></DescriptionListGroup><DescriptionListGroup><DescriptionListTerm>Direction</DescriptionListTerm><DescriptionListDetails>LTR and RTL</DescriptionListDetails></DescriptionListGroup></DescriptionList>;

  if (component === 'field')
    return <Field className="preview-stack"><FieldLegend>Notifications</FieldLegend><FieldDescription id="live-preview-field-help">Choose how we should contact you.</FieldDescription><label><input type="checkbox" aria-describedby="live-preview-field-help" defaultChecked /> Email</label><label><input type="checkbox" aria-describedby="live-preview-field-help" /> Push notification</label></Field>;

  if (component === 'input-group')
    return <div className="preview-stack"><Label id="live-preview-website-label" htmlFor="live-preview-website">Website</Label><InputGroup aria-labelledby="live-preview-website-label"><InputGroupAddon decorative><InputGroupText>https://</InputGroupText></InputGroupAddon><Input id="live-preview-website" name="website" placeholder="example.com" /></InputGroup></div>;

  if (component === 'item')
    return <ItemGroup><Item><ItemMedia>D</ItemMedia><ItemContent><ItemTitle>Design system</ItemTitle><ItemDescription>Updated two minutes ago</ItemDescription></ItemContent><ItemActions><Button variant="secondary">Open</Button></ItemActions></Item></ItemGroup>;

  if (component === 'input')
    return <div className="preview-stack"><label htmlFor="live-preview-email">Email address</label><Input id="live-preview-email" type="email" defaultValue="ada@example.com" /></div>;

  return null;
}
