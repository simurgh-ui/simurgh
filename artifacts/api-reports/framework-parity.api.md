# Framework public API parity

| Component | React | Vue | Angular |
| --- | --- | --- | --- |
| dialog | Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose | Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose | DialogComponent |
| alert-dialog | AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel | AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel | AlertDialogComponent, AlertDialogActionDirective, AlertDialogCancelDirective |
| sheet | Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose, SheetSide | Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose, SheetSide | SheetComponent, SheetSide |
| drawer | Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose | Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose | DrawerComponent |
| popover | Popover, PopoverTrigger, PopoverContent | Popover, PopoverTrigger, PopoverContent | PopoverComponent |
| tooltip | Tooltip, TooltipTrigger, TooltipContent | Tooltip, TooltipTrigger, TooltipContent | TooltipComponent |
| hover-card | HoverCard, HoverCardTrigger, HoverCardContent | HoverCard, HoverCardTrigger, HoverCardContent | HoverCardComponent |
| dropdown-menu | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem | DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem | DropdownMenuComponent, DropdownMenuItemDirective |
| context-menu | ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem | ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem | ContextMenuComponent, ContextMenuItemDirective |
| select | Select | Select, SelectOption | SelectComponent, SelectOption |
| native-select | NativeSelect | NativeSelect | NativeSelectComponent |
| combobox | Combobox, ComboboxProps, SelectOption | Combobox, ComboboxOption | ComboboxComponent, SelectOption |
| command | Command | Command | CommandComponent |
| calendar | Calendar, CalendarProps | Calendar | CalendarComponent |
| date-picker | DatePicker, DatePickerProps | DatePicker | DatePickerComponent |
| carousel | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext | Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext | CarouselComponent, CarouselContentComponent, CarouselItemComponent, CarouselPreviousComponent, CarouselNextComponent |
| resizable | ResizablePanelGroup, ResizablePanel, ResizableHandle | ResizablePanelGroup, ResizablePanel, ResizableHandle | ResizablePanelGroupComponent, ResizablePanelComponent, ResizableHandleComponent |
| sidebar | SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu | SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu | SidebarProviderComponent, SidebarDirective, SidebarTriggerDirective, SidebarHeaderDirective, SidebarContentDirective, SidebarFooterDirective, SidebarGroupDirective, SidebarMenuDirective |
| tree | Tree, TreeItem | Tree, TreeItem | TreeDirective, TreeItemComponent |
| file-upload | FileUpload | FileUpload | FileUploadComponent |
| password-input | PasswordInput | PasswordInput | PasswordInputComponent |
| number-input | NumberInput | NumberInput | NumberInputComponent |
| rating | Rating, RatingProps | Rating | RatingComponent |
| tags-input | TagsInput, TagsInputProps | TagsInput | TagsInputComponent |
| tabs | Tabs, TabsList, TabsTrigger, TabsContent | Tabs, TabsList, TabsTrigger, TabsContent | TabsComponent, TabDirective, TabPanelDirective |
| accordion | Accordion, AccordionItem, AccordionTrigger, AccordionContent | Accordion, AccordionItem, AccordionTrigger, AccordionContent | AccordionComponent, AccordionItemComponent |
| checkbox | Checkbox | Checkbox | CheckboxComponent |
| label | Label | Label | LabelComponent |
| separator | Separator | Separator | SeparatorComponent |
| progress | Progress | Progress | ProgressComponent |
| chart | ChartProps, ChartRoot, ChartPlot, ChartGrid, ChartXAxis, ChartYAxis, ChartLegend, ChartTooltip, ChartCrosshair, ChartBrush, ChartDataTable, LineChart, AreaChart, BarChart, PieChart, DonutChart, ScatterChart, BubbleChart, RadarChart, HeatmapChart, ComboChart, ChartPointInteraction | ChartRoot, ChartPlot, ChartGrid, ChartXAxis, ChartYAxis, ChartLegend, ChartTooltip, ChartCrosshair, ChartBrush, LineChart, AreaChart, BarChart, PieChart, DonutChart, ScatterChart, BubbleChart, RadarChart, HeatmapChart, ComboChart, ChartPointInteraction | ChartBaseComponent, ChartRootComponent, ChartPlotComponent, ChartGridDirective, ChartXAxisDirective, ChartYAxisDirective, ChartLegendDirective, ChartTooltipDirective, ChartCrosshairDirective, ChartBrushDirective, LineChartComponent, AreaChartComponent, BarChartComponent, PieChartComponent, DonutChartComponent, ScatterChartComponent, BubbleChartComponent, RadarChartComponent, HeatmapChartComponent, ComboChartComponent, ChartPointInteraction |
| toggle | Toggle | Toggle | ToggleComponent |
| visually-hidden | VisuallyHidden | VisuallyHidden | VisuallyHiddenComponent |
| avatar | Avatar | Avatar | AvatarComponent |
| alert | Alert | Alert | AlertComponent |
| aspect-ratio | AspectRatio | AspectRatio | AspectRatioComponent |
| skeleton | Skeleton | Skeleton | SkeletonComponent |
| spinner | Spinner | Spinner | SpinnerComponent |
| button | Button | Button | ButtonComponent |
| button-group | ButtonGroup, ButtonGroupText, ButtonGroupSeparator | ButtonGroup, ButtonGroupText, ButtonGroupSeparator | ButtonGroupComponent, ButtonGroupTextComponent, ButtonGroupSeparatorComponent |
| link | Link | Link | LinkComponent |
| input | Input | Input | InputComponent |
| input-group | InputGroup, InputGroupAddon, InputGroupText | InputGroup, InputGroupAddon, InputGroupText | InputGroupComponent, InputGroupAddonComponent, InputGroupTextComponent |
| input-otp | InputOtp | InputOtp | InputOtpComponent |
| slider | Slider | Slider | SliderComponent |
| meter | Meter | Meter | MeterComponent |
| toolbar | Toolbar, ToolbarButton | Toolbar, ToolbarButton | ToolbarComponent, ToolbarButtonDirective |
| toggle-group | ToggleGroup, ToggleGroupItem | ToggleGroup, ToggleGroupItem | ToggleGroupComponent, ToggleGroupItemDirective |
| scroll-area | ScrollArea | ScrollArea | ScrollAreaComponent |
| textarea | Textarea | Textarea | TextareaComponent |
| badge | Badge, BadgeTone | Badge, BadgeTone | BadgeComponent, BadgeTone |
| breadcrumb | Breadcrumb | Breadcrumb | BreadcrumbComponent |
| navigation-menu | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink | NavigationMenuComponent, NavigationMenuListDirective, NavigationMenuItemDirective, NavigationMenuLinkDirective |
| menubar | Menubar, MenubarItem | Menubar, MenubarItem | MenubarComponent, MenubarItemDirective |
| card | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter | CardComponent, CardHeaderComponent, CardTitleComponent, CardDescriptionComponent, CardContentComponent, CardFooterComponent |
| empty | Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent | Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent | EmptyComponent, EmptyHeaderComponent, EmptyMediaComponent, EmptyTitleComponent, EmptyDescriptionComponent, EmptyContentComponent |
| item | ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions | ItemGroup, Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions | ItemGroupComponent, ItemComponent, ItemMediaComponent, ItemContentComponent, ItemTitleComponent, ItemDescriptionComponent, ItemActionsComponent |
| kbd | Kbd | Kbd | KbdComponent |
| field | Field, FieldLegend, FieldDescription, FieldError | Field, FieldLegend, FieldDescription, FieldError | FieldComponent, FieldLegendComponent, FieldDescriptionComponent, FieldErrorComponent |
| form | Form, FormErrorSummary | Form, FormErrorSummary | FormDirective, FormErrorSummaryComponent |
| table | Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption | Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption | TableDirective, TableHeaderDirective, TableBodyDirective, TableFooterDirective, TableRowDirective, TableHeadDirective, TableCellDirective, TableCaptionDirective |
| pagination | Pagination, PaginationContent, PaginationItem, PaginationLink | Pagination, PaginationContent, PaginationItem, PaginationLink | PaginationComponent, PaginationContentDirective, PaginationItemDirective, PaginationLinkDirective |
| collapsible | Collapsible, CollapsibleTrigger, CollapsibleContent | Collapsible, CollapsibleTrigger, CollapsibleContent | CollapsibleComponent |
| disclosure | Disclosure, DisclosureSummary, DisclosureContent | Disclosure, DisclosureSummary, DisclosureContent | DisclosureComponent, DisclosureSummaryDirective, DisclosureContentDirective |
| description-list | DescriptionList, DescriptionListGroup, DescriptionListTerm, DescriptionListDetails | DescriptionList, DescriptionListGroup, DescriptionListTerm, DescriptionListDetails | DescriptionListDirective, DescriptionListGroupDirective, DescriptionListTermDirective, DescriptionListDetailsDirective |
| switch | Switch | Switch | SwitchComponent |
| radio-group | RadioGroup, RadioGroupItem | RadioGroup, RadioGroupItem | RadioGroupComponent, RadioGroupItemDirective |
| toast | ToastProvider, useToast, ToastViewport, ToastMessage | ToastProvider, useToast, ToastViewport, ToastMessage | ToastViewportComponent, ToastMessage |
