# Framework public API parity

| Component | React | Preact | Vue | Angular | Svelte | Lit |
| --- | --- | --- | --- | --- | --- | --- |
| dialog | Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose | Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose | Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose | DialogComponent | Dialog | Dialog |
| alert-dialog | AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel | AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel | AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel | AlertDialogComponent, AlertDialogActionDirective, AlertDialogCancelDirective | AlertDialog | AlertDialog |
| sheet | Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose, SheetSide | Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose, SheetSide | Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose, SheetSide | SheetComponent, SheetSide | Sheet | Sheet |
| drawer | Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose | Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose | Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose | DrawerComponent | Drawer | Drawer |
| popover | Popover, PopoverTrigger, PopoverContent | Popover, PopoverTrigger, PopoverContent | Popover, PopoverTrigger, PopoverContent | PopoverComponent | Popover | Popover |
| tooltip | Tooltip, TooltipTrigger, TooltipContent | Tooltip, TooltipTrigger, TooltipContent | Tooltip, TooltipTrigger, TooltipContent | TooltipComponent | Tooltip | Tooltip |
| hover-card | HoverCard, HoverCardTrigger, HoverCardContent | HoverCard, HoverCardTrigger, HoverCardContent | HoverCard, HoverCardTrigger, HoverCardContent | HoverCardComponent | HoverCard | HoverCard |
| dropdown-menu | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem | DropdownMenuComponent, DropdownMenuItemDirective | DropdownMenu | DropdownMenu |
| context-menu | ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem | ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem | ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem | ContextMenuComponent, ContextMenuItemDirective | ContextMenu | ContextMenu |
| select | Select | Select | Select, SelectOption | SelectComponent, SelectOption | Select | Select |
| native-select | NativeSelect | NativeSelect | NativeSelect | NativeSelectComponent | NativeSelect | NativeSelect |
| combobox | Combobox, ComboboxProps, SelectOption | Combobox, ComboboxProps, SelectOption | Combobox, ComboboxOption | ComboboxComponent, SelectOption | Combobox | Combobox |
| command | Command | Command | Command | CommandComponent | Command | Command |
| calendar | Calendar, CalendarProps | Calendar, CalendarProps | Calendar | CalendarComponent | Calendar | Calendar |
| date-picker | DatePicker, DatePickerProps | DatePicker, DatePickerProps | DatePicker | DatePickerComponent | DatePicker | DatePicker |
| carousel | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext | CarouselComponent, CarouselContentComponent, CarouselItemComponent, CarouselPreviousComponent, CarouselNextComponent | Carousel | Carousel |
| resizable | ResizablePanelGroup, ResizablePanel, ResizableHandle | ResizablePanelGroup, ResizablePanel, ResizableHandle | ResizablePanelGroup, ResizablePanel, ResizableHandle | ResizablePanelGroupComponent, ResizablePanelComponent, ResizableHandleComponent | Resizable | Resizable |
| sidebar | SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu | SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu | SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu | SidebarProviderComponent, SidebarDirective, SidebarTriggerDirective, SidebarHeaderDirective, SidebarContentDirective, SidebarFooterDirective, SidebarGroupDirective, SidebarMenuDirective | Sidebar | Sidebar |
| tree | Tree, TreeItem | Tree, TreeItem | Tree, TreeItem | TreeDirective, TreeItemComponent | Tree | Tree |
| file-upload | FileUpload | FileUpload | FileUpload | FileUploadComponent | FileUpload | FileUpload |
| password-input | PasswordInput | PasswordInput | PasswordInput | PasswordInputComponent | PasswordInput | PasswordInput |
| number-input | NumberInput | NumberInput | NumberInput | NumberInputComponent | NumberInput | NumberInput |
| rating | Rating, RatingProps | Rating, RatingProps | Rating | RatingComponent | Rating | Rating |
| tags-input | TagsInput, TagsInputProps | TagsInput, TagsInputProps | TagsInput | TagsInputComponent | TagsInput | TagsInput |
| tabs | Tabs, TabsList, TabsTrigger, TabsContent | Tabs, TabsList, TabsTrigger, TabsContent | Tabs, TabsList, TabsTrigger, TabsContent | TabsComponent, TabDirective, TabPanelDirective | Tabs | Tabs |
| accordion | Accordion, AccordionItem, AccordionTrigger, AccordionContent | Accordion, AccordionItem, AccordionTrigger, AccordionContent | Accordion, AccordionItem, AccordionTrigger, AccordionContent | AccordionComponent, AccordionItemComponent | Accordion | Accordion |
| checkbox | Checkbox | Checkbox | Checkbox | CheckboxComponent | Checkbox | Checkbox |
| label | Label | Label | Label | LabelComponent | Label | Label |
| separator | Separator | Separator | Separator | SeparatorComponent | Separator | Separator |
| progress | Progress | Progress | Progress | ProgressComponent | Progress | Progress |
| chart | ChartProps, ChartRoot, ChartPlot, ChartGrid, ChartXAxis, ChartYAxis, ChartLegend, ChartTooltip, ChartCrosshair, ChartBrush, ChartDataTable, LineChart, AreaChart, BarChart, PieChart, DonutChart, ScatterChart, BubbleChart, RadarChart, HeatmapChart, ComboChart, ChartPointInteraction | ChartProps, ChartRoot, ChartPlot, ChartGrid, ChartXAxis, ChartYAxis, ChartLegend, ChartTooltip, ChartCrosshair, ChartBrush, ChartDataTable, LineChart, AreaChart, BarChart, PieChart, DonutChart, ScatterChart, BubbleChart, RadarChart, HeatmapChart, ComboChart, ChartPointInteraction | ChartRoot, ChartPlot, ChartGrid, ChartXAxis, ChartYAxis, ChartLegend, ChartTooltip, ChartCrosshair, ChartBrush, LineChart, AreaChart, BarChart, PieChart, DonutChart, ScatterChart, BubbleChart, RadarChart, HeatmapChart, ComboChart, ChartPointInteraction | ChartBaseComponent, ChartRootComponent, ChartPlotComponent, ChartGridDirective, ChartXAxisDirective, ChartYAxisDirective, ChartLegendDirective, ChartTooltipDirective, ChartCrosshairDirective, ChartBrushDirective, LineChartComponent, AreaChartComponent, BarChartComponent, PieChartComponent, DonutChartComponent, ScatterChartComponent, BubbleChartComponent, RadarChartComponent, HeatmapChartComponent, ComboChartComponent, ChartPointInteraction | Chart | Chart |
| toggle | Toggle | Toggle | Toggle | ToggleComponent | Toggle | Toggle |
| visually-hidden | VisuallyHidden | VisuallyHidden | VisuallyHidden | VisuallyHiddenComponent | VisuallyHidden | VisuallyHidden |
| avatar | Avatar | Avatar | Avatar | AvatarComponent | Avatar | Avatar |
| alert | Alert | Alert | Alert | AlertComponent | Alert | Alert |
| aspect-ratio | AspectRatio | AspectRatio | AspectRatio | AspectRatioComponent | AspectRatio | AspectRatio |
| skeleton | Skeleton | Skeleton | Skeleton | SkeletonComponent | Skeleton | Skeleton |
| spinner | Spinner | Spinner | Spinner | SpinnerComponent | Spinner | Spinner |
| button | Button | Button | Button | ButtonComponent | Button | Button |
| button-group | ButtonGroup, ButtonGroupText, ButtonGroupSeparator | ButtonGroup, ButtonGroupText, ButtonGroupSeparator | ButtonGroup, ButtonGroupText, ButtonGroupSeparator | ButtonGroupComponent, ButtonGroupTextComponent, ButtonGroupSeparatorComponent | ButtonGroup | ButtonGroup |
| link | Link | Link | Link | LinkComponent | Link | Link |
| input | Input | Input | Input | InputComponent | Input | Input |
| input-group | InputGroup, InputGroupAddon, InputGroupText | InputGroup, InputGroupAddon, InputGroupText | InputGroup, InputGroupAddon, InputGroupText | InputGroupComponent, InputGroupAddonComponent, InputGroupTextComponent | InputGroup | InputGroup |
| input-otp | InputOtp | InputOtp | InputOtp | InputOtpComponent | InputOtp | InputOtp |
| slider | Slider | Slider | Slider | SliderComponent | Slider | Slider |
| meter | Meter | Meter | Meter | MeterComponent | Meter | Meter |
| toolbar | Toolbar, ToolbarButton | Toolbar, ToolbarButton | Toolbar, ToolbarButton | ToolbarComponent, ToolbarButtonDirective | Toolbar | Toolbar |
| toggle-group | ToggleGroup, ToggleGroupItem | ToggleGroup, ToggleGroupItem | ToggleGroup, ToggleGroupItem | ToggleGroupComponent, ToggleGroupItemDirective | ToggleGroup | ToggleGroup |
| scroll-area | ScrollArea | ScrollArea | ScrollArea | ScrollAreaComponent | ScrollArea | ScrollArea |
| textarea | Textarea | Textarea | Textarea | TextareaComponent | Textarea | Textarea |
| badge | Badge, BadgeTone | Badge, BadgeTone | Badge, BadgeTone | BadgeComponent, BadgeTone | Badge | Badge |
| breadcrumb | Breadcrumb | Breadcrumb | Breadcrumb | BreadcrumbComponent | Breadcrumb | Breadcrumb |
| navigation-menu | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink | NavigationMenuComponent, NavigationMenuListDirective, NavigationMenuItemDirective, NavigationMenuLinkDirective | NavigationMenu | NavigationMenu |
| menubar | Menubar, MenubarItem | Menubar, MenubarItem | Menubar, MenubarItem | MenubarComponent, MenubarItemDirective | Menubar | Menubar |
| card | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent | Card | Card |
| empty | Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent | Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent | Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent | EmptyComponent, EmptyHeaderComponent, EmptyMediaComponent, EmptyTitleComponent, EmptyDescriptionComponent, EmptyContentComponent | Empty | Empty |
| item | ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions | ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions | ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions | ItemGroupComponent, ItemComponent, ItemMediaComponent, ItemContentComponent, ItemTitleComponent, ItemDescriptionComponent, ItemActionsComponent | Item | Item |
| kbd | Kbd | Kbd | Kbd | KbdComponent | Kbd | Kbd |
| field | Field, FieldLegend, FieldDescription, FieldError | Field, FieldLegend, FieldDescription, FieldError | Field, FieldLegend, FieldDescription, FieldError | FieldComponent, FieldLegendComponent, FieldDescriptionComponent, FieldErrorComponent | Field | Field |
| form | Form, FormErrorSummary | Form, FormErrorSummary | Form, FormErrorSummary | FormDirective, FormErrorSummaryComponent | Form | Form |
| table | Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption | Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption | Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption | TableDirective, TableHeaderDirective, TableBodyDirective, TableFooterDirective, TableRowDirective, TableHeadDirective, TableCellDirective, TableCaptionDirective | Table | Table |
| pagination | Pagination, PaginationContent, PaginationItem, PaginationLink | Pagination, PaginationContent, PaginationItem, PaginationLink | Pagination, PaginationContent, PaginationItem, PaginationLink | PaginationComponent, PaginationContentDirective, PaginationItemDirective, PaginationLinkDirective | Pagination | Pagination |
| collapsible | Collapsible, CollapsibleTrigger, CollapsibleContent | Collapsible, CollapsibleTrigger, CollapsibleContent | Collapsible, CollapsibleTrigger, CollapsibleContent | CollapsibleComponent | Collapsible | Collapsible |
| disclosure | Disclosure, DisclosureSummary, DisclosureContent | Disclosure, DisclosureSummary, DisclosureContent | Disclosure, DisclosureSummary, DisclosureContent | DisclosureComponent, DisclosureSummaryDirective, DisclosureContentDirective | Disclosure | Disclosure |
| description-list | DescriptionList, DescriptionListGroup, DescriptionListTerm, DescriptionListDetails | DescriptionList, DescriptionListGroup, DescriptionListTerm, DescriptionListDetails | DescriptionList, DescriptionListGroup, DescriptionListTerm, DescriptionListDetails | DescriptionListDirective, DescriptionListGroupDirective, DescriptionListTermDirective, DescriptionListDetailsDirective | DescriptionList | DescriptionList |
| switch | Switch | Switch | Switch | SwitchComponent | Switch | Switch |
| radio-group | RadioGroup, RadioGroupItem | RadioGroup, RadioGroupItem | RadioGroup, RadioGroupItem | RadioGroupComponent, RadioGroupItemDirective | RadioGroup | RadioGroup |
| toast | ToastProvider, useToast, ToastViewport, ToastMessage | ToastProvider, useToast, ToastViewport, ToastMessage | ToastProvider, useToast, ToastViewport, ToastMessage | ToastViewportComponent, ToastMessage | Toast | Toast |
