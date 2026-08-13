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
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@simurgh-ui/react/pagination';
import { ScrollArea } from '@simurgh-ui/react/scroll-area';
import { Toolbar, ToolbarButton } from '@simurgh-ui/react/toolbar';
import { VisuallyHidden } from '@simurgh-ui/react/visually-hidden';
import { Form } from '@simurgh-ui/react/form';
import { InputOtp } from '@simurgh-ui/react/input-otp';
import { PasswordInput } from '@simurgh-ui/react/password-input';
import { NumberInput } from '@simurgh-ui/react/number-input';
import { FileUpload } from '@simurgh-ui/react/file-upload';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@simurgh-ui/react/collapsible';
import { Disclosure, DisclosureContent, DisclosureSummary } from '@simurgh-ui/react/disclosure';
import { Toggle } from '@simurgh-ui/react/toggle';
import { RadioGroup, RadioGroupItem } from '@simurgh-ui/react/radio-group';
import { Slider } from '@simurgh-ui/react/slider';
import { Rating } from '@simurgh-ui/react/rating';
import { ToggleGroup, ToggleGroupItem } from '@simurgh-ui/react/toggle-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@simurgh-ui/react/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@simurgh-ui/react/tabs';
import { Select } from '@simurgh-ui/react/select';
import { Popover, PopoverContent, PopoverTrigger } from '@simurgh-ui/react/popover';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@simurgh-ui/react/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@simurgh-ui/react/alert-dialog';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@simurgh-ui/react/sheet';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@simurgh-ui/react/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@simurgh-ui/react/dropdown-menu';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@simurgh-ui/react/context-menu';
import { Menubar, MenubarItem } from '@simurgh-ui/react/menubar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@simurgh-ui/react/navigation-menu';
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
import '@simurgh-ui/styles/pagination.css';
import '@simurgh-ui/styles/scroll-area.css';
import '@simurgh-ui/styles/toolbar.css';
import '@simurgh-ui/styles/visually-hidden.css';
import '@simurgh-ui/styles/form.css';
import '@simurgh-ui/styles/input-otp.css';
import '@simurgh-ui/styles/password-input.css';
import '@simurgh-ui/styles/number-input.css';
import '@simurgh-ui/styles/file-upload.css';
import '@simurgh-ui/styles/collapsible.css';
import '@simurgh-ui/styles/disclosure.css';
import '@simurgh-ui/styles/toggle.css';
import '@simurgh-ui/styles/radio-group.css';
import '@simurgh-ui/styles/slider.css';
import '@simurgh-ui/styles/rating.css';
import '@simurgh-ui/styles/toggle-group.css';
import '@simurgh-ui/styles/accordion.css';
import '@simurgh-ui/styles/tabs.css';
import '@simurgh-ui/styles/select.css';
import '@simurgh-ui/styles/popover.css';
import '@simurgh-ui/styles/dialog.css';
import '@simurgh-ui/styles/alert-dialog.css';
import '@simurgh-ui/styles/sheet.css';
import '@simurgh-ui/styles/drawer.css';
import '@simurgh-ui/styles/dropdown-menu.css';
import '@simurgh-ui/styles/context-menu.css';
import '@simurgh-ui/styles/menubar.css';
import '@simurgh-ui/styles/navigation-menu.css';

type Props = { component: 'accordion' | 'alert' | 'alert-dialog' | 'aspect-ratio' | 'avatar' | 'badge' | 'breadcrumb' | 'button' | 'button-group' | 'card' | 'checkbox' | 'collapsible' | 'context-menu' | 'description-list' | 'dialog' | 'disclosure' | 'drawer' | 'dropdown-menu' | 'empty' | 'field' | 'file-upload' | 'form' | 'input' | 'input-group' | 'input-otp' | 'item' | 'kbd' | 'label' | 'link' | 'menubar' | 'meter' | 'native-select' | 'navigation-menu' | 'number-input' | 'pagination' | 'password-input' | 'popover' | 'progress' | 'radio-group' | 'rating' | 'scroll-area' | 'select' | 'separator' | 'sheet' | 'skeleton' | 'slider' | 'spinner' | 'switch' | 'table' | 'tabs' | 'textarea' | 'toggle' | 'toggle-group' | 'toolbar' | 'visually-hidden' };

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

  if (component === 'pagination')
    return <Pagination><PaginationContent><PaginationItem><PaginationLink href="?page=1" aria-label="Previous page">Previous</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="?page=2" current>2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="?page=3">3</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="?page=3" aria-label="Next page">Next</PaginationLink></PaginationItem></PaginationContent></Pagination>;

  if (component === 'scroll-area')
    return <ScrollArea label="Poets" style={{ blockSize: '10rem', inlineSize: 'min(100%, 24rem)' }}><p>Ferdowsi</p><p>Hafez</p><p>Saadi</p><p>Rumi</p><p>Khayyam</p><p>Attar</p><p>Nizami</p><p>Parvin Etesami</p></ScrollArea>;

  if (component === 'toolbar')
    return <Toolbar label="Text formatting"><ToolbarButton>Bold</ToolbarButton><ToolbarButton>Italic</ToolbarButton><ToolbarButton>Link</ToolbarButton></Toolbar>;

  if (component === 'visually-hidden')
    return <div className="preview-stack"><div className="preview-row"><Button iconOnly><span aria-hidden="true">X</span><VisuallyHidden>Close dialog</VisuallyHidden></Button><Button iconOnly variant="secondary"><span aria-hidden="true">&lt;</span><VisuallyHidden>Previous page</VisuallyHidden></Button><Button iconOnly variant="secondary"><span aria-hidden="true">&gt;</span><VisuallyHidden>Next page</VisuallyHidden></Button></div><span className="preview-muted">Each icon has a hidden text label available to screen readers.</span></div>;

  if (component === 'form')
    return <Form className="preview-stack" onSubmit={(event) => event.preventDefault()}><Label htmlFor="live-preview-form-email">Email</Label><Input id="live-preview-form-email" name="email" type="email" required placeholder="ada@example.com" /><Button type="submit">Continue</Button></Form>;

  if (component === 'input-otp')
    return <div className="preview-stack"><Label htmlFor="live-preview-otp">Verification code</Label><InputOtp id="live-preview-otp" name="code" length={6} aria-describedby="live-preview-otp-help" /><span id="live-preview-otp-help" className="preview-muted">Enter the six-digit code.</span></div>;

  if (component === 'password-input')
    return <div className="preview-stack"><Label htmlFor="live-preview-password">Account password</Label><PasswordInput id="live-preview-password" defaultValue="correct horse battery staple" autoComplete="current-password" /></div>;

  if (component === 'number-input')
    return <div className="preview-stack"><Label htmlFor="live-preview-quantity">Quantity</Label><NumberInput id="live-preview-quantity" defaultValue={2} min={0} max={10} step={1} /></div>;

  if (component === 'file-upload')
    return <FileUpload id="live-preview-upload" label="Upload documents" description="Drop PDF files here or browse" accept=".pdf" multiple name="documents" />;

  if (component === 'collapsible')
    return <Collapsible defaultOpen><div className="preview-stack"><CollapsibleTrigger>Project details</CollapsibleTrigger><CollapsibleContent>Three framework-native implementations.</CollapsibleContent></div></Collapsible>;

  if (component === 'disclosure')
    return <Disclosure defaultOpen><DisclosureSummary>Why use native disclosure?</DisclosureSummary><DisclosureContent>It remains interactive before hydration and follows the browser accessibility model.</DisclosureContent></Disclosure>;

  if (component === 'toggle')
    return <div className="preview-row" role="toolbar" aria-label="Text formatting"><Toggle defaultPressed aria-label="Bold"><strong aria-hidden="true">B</strong></Toggle><Toggle aria-label="Italic"><em aria-hidden="true">I</em></Toggle><Toggle aria-label="Underline"><span aria-hidden="true">U</span></Toggle></div>;

  if (component === 'radio-group')
    return <Field className="preview-stack"><FieldLegend>Choose a plan</FieldLegend><RadioGroup defaultValue="basic" name="plan" aria-label="Choose a plan"><label className="preview-row"><RadioGroupItem value="basic" aria-label="Basic" />Basic</label><label className="preview-row"><RadioGroupItem value="pro" aria-label="Pro" />Pro</label></RadioGroup></Field>;

  if (component === 'slider')
    return <div className="preview-stack"><Label htmlFor="live-preview-volume">Volume</Label><Slider id="live-preview-volume" min={0} max={100} step={10} defaultValue={40} /></div>;

  if (component === 'rating')
    return <div className="preview-stack"><Label>Product rating</Label><Rating aria-label="Product rating" defaultValue={3} name="product-rating" /></div>;

  if (component === 'toggle-group')
    return <ToggleGroup type="single" defaultValue={['start']} aria-label="Alignment"><ToggleGroupItem value="start">Start</ToggleGroupItem><ToggleGroupItem value="center">Center</ToggleGroupItem><ToggleGroupItem value="end">End</ToggleGroupItem></ToggleGroup>;

  if (component === 'accordion')
    return <Accordion defaultValue={['about']}><div className="preview-stack"><AccordionItem value="about"><AccordionTrigger>What is Simurgh UI?</AccordionTrigger><AccordionContent>Accessible source components for Angular, React, and Vue.</AccordionContent></AccordionItem><AccordionItem value="customize"><AccordionTrigger>Can I customize it?</AccordionTrigger><AccordionContent>Yes. Own the source or override its semantic tokens.</AccordionContent></AccordionItem></div></Accordion>;

  if (component === 'tabs')
    return <Tabs defaultValue="account"><div className="preview-stack"><TabsList><TabsTrigger value="account">Account</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger></TabsList><TabsContent value="account">Manage your account preferences.</TabsContent><TabsContent value="security">Review password and sign-in settings.</TabsContent></div></Tabs>;

  if (component === 'select')
    return <div className="preview-stack"><Label>Framework</Label><Select name="framework" defaultValue="react" placeholder="Choose a framework" options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'angular', label: 'Angular' }]} /></div>;

  if (component === 'popover')
    return <Popover><PopoverTrigger>Delivery details</PopoverTrigger><PopoverContent><div className="preview-stack"><strong>Arrives Tuesday</strong><span className="preview-muted">Free delivery to Tehran.</span></div></PopoverContent></Popover>;

  if (component === 'dialog')
    return <Dialog><DialogTrigger>Edit profile</DialogTrigger><DialogPortal><DialogOverlay /><DialogContent><DialogTitle>Edit profile</DialogTitle><DialogDescription>Update the details shown on your public profile.</DialogDescription><div className="preview-row"><DialogClose>Cancel</DialogClose><DialogClose>Save changes</DialogClose></div></DialogContent></DialogPortal></Dialog>;

  if (component === 'alert-dialog')
    return <AlertDialog><AlertDialogTrigger>Delete project</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription><div className="preview-row"><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Delete</AlertDialogAction></div></AlertDialogContent></AlertDialog>;

  if (component === 'sheet')
    return <Sheet><SheetTrigger>Open filters</SheetTrigger><SheetContent side="right"><SheetTitle>Filters</SheetTitle><SheetDescription>Narrow the visible results.</SheetDescription><SheetClose>Done</SheetClose></SheetContent></Sheet>;

  if (component === 'drawer')
    return <Drawer><DrawerTrigger>Edit profile</DrawerTrigger><DrawerContent side="bottom"><DrawerTitle>Edit profile</DrawerTitle><DrawerDescription>Update your public account details.</DrawerDescription><DrawerClose>Done</DrawerClose></DrawerContent></Drawer>;

  if (component === 'dropdown-menu')
    return <DropdownMenu><DropdownMenuTrigger>Actions</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuItem disabled>Archive</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;

  if (component === 'context-menu')
    return <ContextMenu><ContextMenuTrigger className="preview-panel">Right-click this canvas</ContextMenuTrigger><ContextMenuContent aria-label="Canvas actions"><ContextMenuItem>Copy</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem></ContextMenuContent></ContextMenu>;

  if (component === 'menubar')
    return <Menubar label="Editor"><MenubarItem>File</MenubarItem><MenubarItem>Edit</MenubarItem><MenubarItem disabled>View</MenubarItem></Menubar>;

  if (component === 'navigation-menu')
    return <NavigationMenu label="Preview navigation"><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="#navigation-menu-examples" current>Overview</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#navigation-menu-examples">Components</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#navigation-menu-examples">Guides</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>;

  if (component === 'input')
    return <div className="preview-stack"><label htmlFor="live-preview-email">Email address</label><Input id="live-preview-email" type="email" defaultValue="ada@example.com" /></div>;

  return null;
}
