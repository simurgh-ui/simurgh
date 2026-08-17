import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@simurgh-ui/react/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@simurgh-ui/react/carousel';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@simurgh-ui/react/collapsible';
import { Menubar, MenubarItem } from '@simurgh-ui/react/menubar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@simurgh-ui/react/resizable';
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarProvider, SidebarTrigger } from '@simurgh-ui/react/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@simurgh-ui/react/tabs';
import { Button } from '@simurgh-ui/react/button';
import { ToastProvider, ToastViewport, useToast } from '@simurgh-ui/react/toast';
import { Toolbar, ToolbarButton } from '@simurgh-ui/react/toolbar';
import { Tree, TreeItem } from '@simurgh-ui/react/tree';
import '@simurgh-ui/styles/accordion.css';
import '@simurgh-ui/styles/button.css';
import '@simurgh-ui/styles/carousel.css';
import '@simurgh-ui/styles/collapsible.css';
import '@simurgh-ui/styles/menubar.css';
import '@simurgh-ui/styles/resizable.css';
import '@simurgh-ui/styles/sidebar.css';
import '@simurgh-ui/styles/tabs.css';
import '@simurgh-ui/styles/toast.css';
import '@simurgh-ui/styles/toolbar.css';
import '@simurgh-ui/styles/tree.css';

type Props = { component: 'accordion' | 'carousel' | 'collapsible' | 'menubar' | 'resizable' | 'sidebar' | 'tabs' | 'toast' | 'toolbar' | 'tree' };

function ToastPreview() {
  const { toast } = useToast();
  return <div className="preview-stack"><Button onClick={() => toast({ title: 'Changes saved', description: 'Your profile has been updated.', duration: 0 })}>Save changes</Button><ToastViewport /></div>;
}

export default function CompositeComponentPreview({ component }: Props) {
  if (component === 'collapsible') return <Collapsible defaultOpen><div className="preview-stack"><CollapsibleTrigger>Project details</CollapsibleTrigger><CollapsibleContent>Three framework-native implementations.</CollapsibleContent></div></Collapsible>;
  if (component === 'accordion') return <Accordion defaultValue={['about']}><div className="preview-stack"><AccordionItem value="about"><AccordionTrigger className="preview-button">What is Simurgh UI?</AccordionTrigger><AccordionContent>Accessible source components for Angular, React, and Vue.</AccordionContent></AccordionItem><AccordionItem value="customize"><AccordionTrigger className="preview-button">Can I customize it?</AccordionTrigger><AccordionContent>Yes. Own the source or override its semantic tokens.</AccordionContent></AccordionItem></div></Accordion>;
  if (component === 'tabs') return <Tabs defaultValue="account"><div className="preview-stack"><TabsList><TabsTrigger value="account">Account</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger></TabsList><TabsContent value="account">Manage your account preferences.</TabsContent><TabsContent value="security">Review password and sign-in settings.</TabsContent></div></Tabs>;
  if (component === 'menubar') return <Menubar label="Editor"><MenubarItem>File</MenubarItem><MenubarItem>Edit</MenubarItem><MenubarItem disabled>View</MenubarItem></Menubar>;
  if (component === 'toolbar') return <Toolbar label="Text formatting"><ToolbarButton>Bold</ToolbarButton><ToolbarButton>Italic</ToolbarButton><ToolbarButton>Link</ToolbarButton></Toolbar>;
  if (component === 'tree') return <Tree aria-label="Files"><TreeItem label="Documents" defaultExpanded><TreeItem label="Guide" /></TreeItem><TreeItem label="Images" /></Tree>;
  if (component === 'carousel') return <Carousel label="Featured projects"><CarouselPrevious /><CarouselContent><CarouselItem><strong>Design system</strong><p>Shared accessible patterns for product teams.</p></CarouselItem><CarouselItem><strong>Documentation</strong><p>Guidance for Angular, React, and Vue.</p></CarouselItem><CarouselItem><strong>Tokens</strong><p>A consistent visual language across products.</p></CarouselItem></CarouselContent><CarouselNext /></Carousel>;
  if (component === 'resizable') return <ResizablePanelGroup aria-label="Workspace panels" style={{ inlineSize: 'min(100%, 36rem)' }}><ResizablePanel defaultSize={35} minSize={20}>Navigation</ResizablePanel><ResizableHandle aria-label="Resize panels" /><ResizablePanel defaultSize={65} minSize={30}>Content</ResizablePanel></ResizablePanelGroup>;
  if (component === 'sidebar') return <SidebarProvider defaultOpen><div className="preview-row"><SidebarTrigger>Toggle navigation</SidebarTrigger><Sidebar aria-label="Workspace navigation"><SidebarHeader><strong>Simurgh</strong></SidebarHeader><SidebarContent><SidebarGroup><SidebarMenu><li><a href="#projects">Projects</a></li><li><a href="#settings">Settings</a></li></SidebarMenu></SidebarGroup></SidebarContent></Sidebar></div></SidebarProvider>;
  return <ToastProvider><ToastPreview /></ToastProvider>;
}
