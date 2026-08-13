import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@simurgh-ui/react/alert-dialog';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@simurgh-ui/react/context-menu';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@simurgh-ui/react/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@simurgh-ui/react/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@simurgh-ui/react/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@simurgh-ui/react/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@simurgh-ui/react/popover';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@simurgh-ui/react/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@simurgh-ui/react/tooltip';
import '@simurgh-ui/styles/alert-dialog.css';
import '@simurgh-ui/styles/context-menu.css';
import '@simurgh-ui/styles/dialog.css';
import '@simurgh-ui/styles/drawer.css';
import '@simurgh-ui/styles/dropdown-menu.css';
import '@simurgh-ui/styles/hover-card.css';
import '@simurgh-ui/styles/popover.css';
import '@simurgh-ui/styles/sheet.css';
import '@simurgh-ui/styles/tooltip.css';

type Props = { component: 'alert-dialog' | 'context-menu' | 'dialog' | 'drawer' | 'dropdown-menu' | 'hover-card' | 'popover' | 'sheet' | 'tooltip' };

export default function OverlayComponentPreview({ component }: Props) {
  if (component === 'popover') return <Popover><PopoverTrigger>Delivery details</PopoverTrigger><PopoverContent><div className="preview-stack"><strong>Arrives Tuesday</strong><span className="preview-muted">Free delivery to Tehran.</span></div></PopoverContent></Popover>;
  if (component === 'dialog') return <Dialog><DialogTrigger>Edit profile</DialogTrigger><DialogPortal><DialogOverlay /><DialogContent><DialogTitle>Edit profile</DialogTitle><DialogDescription>Update the details shown on your public profile.</DialogDescription><div className="preview-row"><DialogClose>Cancel</DialogClose><DialogClose>Save changes</DialogClose></div></DialogContent></DialogPortal></Dialog>;
  if (component === 'alert-dialog') return <AlertDialog><AlertDialogTrigger>Delete project</AlertDialogTrigger><AlertDialogContent><AlertDialogTitle>Delete project?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription><div className="preview-row"><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Delete</AlertDialogAction></div></AlertDialogContent></AlertDialog>;
  if (component === 'sheet') return <Sheet><SheetTrigger>Open filters</SheetTrigger><SheetContent side="right"><SheetTitle>Filters</SheetTitle><SheetDescription>Narrow the visible results.</SheetDescription><SheetClose>Done</SheetClose></SheetContent></Sheet>;
  if (component === 'drawer') return <Drawer><DrawerTrigger>Edit profile</DrawerTrigger><DrawerContent side="bottom"><DrawerTitle>Edit profile</DrawerTitle><DrawerDescription>Update your public account details.</DrawerDescription><DrawerClose>Done</DrawerClose></DrawerContent></Drawer>;
  if (component === 'dropdown-menu') return <DropdownMenu><DropdownMenuTrigger>Actions</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuItem disabled>Archive</DropdownMenuItem></DropdownMenuContent></DropdownMenu>;
  if (component === 'context-menu') return <ContextMenu><ContextMenuTrigger className="preview-panel">Right-click this canvas</ContextMenuTrigger><ContextMenuContent aria-label="Canvas actions"><ContextMenuItem>Copy</ContextMenuItem><ContextMenuItem>Duplicate</ContextMenuItem></ContextMenuContent></ContextMenu>;
  if (component === 'tooltip') return <Tooltip><TooltipTrigger>Copy link</TooltipTrigger><TooltipContent>Copy page URL</TooltipContent></Tooltip>;
  return <HoverCard><HoverCardTrigger>Simurgh UI</HoverCardTrigger><HoverCardContent label="Simurgh UI profile">Accessible components for Angular, React, and Vue.</HoverCardContent></HoverCard>;
}
