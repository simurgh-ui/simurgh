# @simurgh-ui/react public API

Version snapshot: 0.3.2-beta.1

## Export map

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  },
  "./chart-interactions": {
    "types": "./dist/chart-interactions.d.ts",
    "import": "./dist/chart-interactions.js"
  },
  "./chart-stream": {
    "types": "./dist/chart-stream.d.ts",
    "import": "./dist/chart-stream.js"
  },
  "./chart-canvas": {
    "types": "./dist/chart-canvas.d.ts",
    "import": "./dist/chart-canvas.js"
  },
  "./chart-motion": {
    "types": "./dist/chart-motion.d.ts",
    "import": "./dist/chart-motion.js"
  },
  "./*": {
    "types": "./dist/components/*.d.ts",
    "import": "./dist/components/*.js"
  }
}
```

## .

- `Accordion`: `({ children, type, defaultValue, }: PropsWithChildren<{ type?: "single" | "multiple"; defaultValue?: string[]; }>) => JSX.Element`
- `AccordionContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element | null`
- `AccordionItem`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSX.Element`
- `AccordionTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `Alert`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { urgent?: boolean; } & RefAttributes<HTMLDivElement>>`
- `AlertDialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `AlertDialogAction`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `AlertDialogCancel`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `AlertDialogContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `AlertDialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `AlertDialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `AlertDialogTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `AreaChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `AspectRatio`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { ratio?: number; } & RefAttributes<HTMLDivElement>>`
- `Avatar`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { src?: string; alt: string; fallback: ReactNode; imageProps?: ImgHTMLAttributes<HTMLImageElement>; } & RefAttributes<HTMLSpanElement>>`
- `Badge`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; status?: boolean; } & RefAttributes<HTMLSpanElement>>`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`
- `BarChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `Breadcrumb`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & { label?: string; } & RefAttributes<HTMLElement>>`
- `BubbleChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `Button`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: "primary" | "secondary" | "destructive" | "quiet"; size?: "sm" | "md" | "lg"; fullWidth?: boolean; iconOnly?: boolean; } & RefAttributes<HTMLButtonElement>>`
- `ButtonGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; } & RefAttributes<HTMLDivElement>>`
- `ButtonGroupSeparator`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { orientation?: Orientation; } & RefAttributes<HTMLSpanElement>>`
- `ButtonGroupText`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement>>`
- `Calendar`: `({ value, defaultValue, month, defaultMonth, locale, direction, firstDayOfWeek, min, max, disabledDates, name, label, onValueChange, onMonthChange, }: CalendarProps) => JSX.Element`
- `CalendarProps`: `type CalendarProps = { value?: string; defaultValue?: string; month?: string; defaultMonth?: string; locale?: string; direction?: Direction; firstDayOfWeek?: number; min?: string; max?: string; disabledDates?: string[]; name?: string; label?: string; onValueChange?: (value: string) => void; onMonthChange?: (month: string) => void; };`
- `Card`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `CardFooter`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardTitle`: `ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>`
- `Carousel`: `({ label, direction, loop, defaultIndex, onIndexChange, onKeyDown, children, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; loop?: boolean; defaultIndex?: number; onIndexChange?: (index: number) => void; }) => React.JSX.Element`
- `CarouselContent`: `({ children, ...props }: HTMLAttributes<HTMLDivElement>) => React.JSX.Element`
- `CarouselItem`: `React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>`
- `CarouselNext`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`
- `CarouselPrevious`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`
- `ChartBrush`: `(props: SVGAttributes<SVGRectElement>) => JSX.Element`
- `ChartCrosshair`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `ChartDataTable`: `<T>({ data, columns, pageSize }: { data: readonly T[]; columns: readonly { label: string; value: ChartAccessor<T>; }[]; pageSize?: number; }) => JSX.Element`
- `ChartGrid`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `ChartLegend`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `ChartPlot`: `(props: SVGAttributes<SVGSVGElement>) => JSX.Element`
- `ChartProps`: `type ChartProps<T> = Omit<HTMLAttributes<HTMLElement>, 'title'> & { data?: readonly T[]; stream?: ChartStream<string>; x?: ChartAccessor<T>; y?: ChartAccessor<T, number>; series?: readonly ChartSeries<T>[]; accessibility: ChartAccessibility; width?: number; height?: number; xScale?: ChartScaleType; yScale?: Exclude<ChartScaleType, 'band'>; xDomain?: ChartDomain; yDomain?: ChartDomain; renderMode?: ChartRenderMode; canvasThreshold?: number; hiddenSeries?: readonly string[]; defaultHiddenSeries?: readonly string[]; onHiddenSeriesChange?: (series: string[]) => void; emptyContent?: ReactNode; orientation?: 'vertical' | 'horizontal'; innerRadius?: number; };`
- `ChartRoot`: `({ width, height, children, ...props }: HTMLAttributes<HTMLElement> & ChartContextValue) => JSX.Element`
- `ChartTooltip`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `ChartXAxis`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `ChartYAxis`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `Checkbox`: `(props: CheckProps) => JSX.Element`
- `Collapsible`: `({ open, defaultOpen, onOpenChange, children, }: PropsWithChildren<{ open?: boolean; defaultOpen?: boolean; onOpenChange?(open: boolean): void; }>) => JSX.Element`
- `CollapsibleContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `CollapsibleTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `Combobox`: `({ options, name, value, defaultValue, required, disabled, placeholder, noResults, onValueChange, }: ComboboxProps) => JSX.Element`
- `ComboboxProps`: `type ComboboxProps = { options: Array<Omit<SelectOption, 'label'> & { label: string }>; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; placeholder?: string; noResults?: ReactNode; onValueChange?: (value: string) => void; };`
- `ComboChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `Command`: `(props: ComboboxProps) => JSX.Element`
- `ContextMenu`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `ContextMenuContent`: `({ className, style, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `ContextMenuItem`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; } & RefAttributes<HTMLDivElement>>`
- `ContextMenuTrigger`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DatePicker`: `({ value, defaultValue, name, locale, label, placeholder, required, disabled, onValueChange, ...calendarProps }: DatePickerProps) => JSX.Element`
- `DatePickerProps`: `type DatePickerProps = CalendarProps & { placeholder?: string; required?: boolean; disabled?: boolean; };`
- `DescriptionList`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDListElement> & RefAttributes<HTMLDListElement>>`
- `DescriptionListDetails`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>`
- `DescriptionListGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DescriptionListTerm`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>`
- `Dialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `DialogClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DialogContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `DialogOverlay`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DialogPortal`: `({ children }: PropsWithChildren) => ReactPortal | null`
- `DialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `DialogTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Disclosure`: `React.ForwardRefExoticComponent<React.DetailsHTMLAttributes<HTMLDetailsElement> & OpenProps & React.RefAttributes<HTMLDetailsElement>>`
- `DisclosureContent`: `React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>`
- `DisclosureSummary`: `React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>`
- `DonutChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `Drawer`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `DrawerClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DrawerContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { side?: "top" | "bottom"; } & RefAttributes<HTMLDivElement>>`
- `DrawerDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `DrawerTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `DrawerTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DropdownMenu`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `DropdownMenuContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `DropdownMenuItem`: `({ disabled, onSelect, ...props }: HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }) => JSX.Element`
- `DropdownMenuTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Empty`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { status?: boolean; } & RefAttributes<HTMLDivElement>>`
- `EmptyContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `EmptyDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `EmptyHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `EmptyMedia`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `EmptyTitle`: `ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>`
- `Field`: `ForwardRefExoticComponent<FieldsetHTMLAttributes<HTMLFieldSetElement> & RefAttributes<HTMLFieldSetElement>>`
- `FieldDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `FieldError`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `FieldLegend`: `ForwardRefExoticComponent<HTMLAttributes<HTMLLegendElement> & RefAttributes<HTMLLegendElement>>`
- `FileUpload`: `({ label, description, onFilesChange, accept, disabled, multiple, ...props }: FileUploadProps) => JSX.Element`
- `Form`: `ForwardRefExoticComponent<FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean; } & RefAttributes<HTMLFormElement>>`
- `FormErrorSummary`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `HeatmapChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `HoverCard`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `HoverCardContent`: `({ label, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; }) => JSX.Element`
- `HoverCardTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Input`: `ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; } & RefAttributes<HTMLInputElement>>`
- `InputGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `InputGroupAddon`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { align?: "inline-start" | "inline-end" | "block-start" | "block-end"; decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `InputGroupText`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement>>`
- `InputOtp`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "maxLength"> & { length?: number; digitsOnly?: boolean; invalid?: boolean; } & RefAttributes<HTMLInputElement>>`
- `Item`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemActions`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `ItemGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemMedia`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `ItemTitle`: `ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>`
- `Kbd`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>`
- `Label`: `ForwardRefExoticComponent<LabelHTMLAttributes<HTMLLabelElement> & RefAttributes<HTMLLabelElement>>`
- `LineChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `Link`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; external?: boolean; } & RefAttributes<HTMLAnchorElement>>`
- `Menubar`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; } & RefAttributes<HTMLDivElement>>`
- `MenubarItem`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Meter`: `ForwardRefExoticComponent<MeterHTMLAttributes<HTMLMeterElement> & { label?: string; } & RefAttributes<HTMLMeterElement>>`
- `NativeSelect`: `ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; } & RefAttributes<HTMLSelectElement>>`
- `NavigationMenu`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & { label?: string; } & RefAttributes<HTMLElement>>`
- `NavigationMenuItem`: `ForwardRefExoticComponent<LiHTMLAttributes<HTMLLIElement> & RefAttributes<HTMLLIElement>>`
- `NavigationMenuLink`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; } & RefAttributes<HTMLAnchorElement>>`
- `NavigationMenuList`: `ForwardRefExoticComponent<HTMLAttributes<HTMLUListElement> & RefAttributes<HTMLUListElement>>`
- `NumberInput`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "type" | "value" | "max" | "min" | "step"> & { value?: number; defaultValue?: number; min?: number; max?: number; step?: number; incrementLabel?: string; decrementLabel?: string; onValueChange?: (value: number) => void; } & RefAttributes<HTMLInputElement>>`
- `Pagination`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & { label?: string; } & RefAttributes<HTMLElement>>`
- `PaginationContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLUListElement> & RefAttributes<HTMLUListElement>>`
- `PaginationItem`: `ForwardRefExoticComponent<LiHTMLAttributes<HTMLLIElement> & RefAttributes<HTMLLIElement>>`
- `PaginationLink`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; } & RefAttributes<HTMLAnchorElement>>`
- `PasswordInput`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { revealLabel?: string; concealLabel?: string; } & RefAttributes<HTMLInputElement>>`
- `PieChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `Popover`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `PopoverContent`: `({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `PopoverTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Progress`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { value?: number | null; max?: number; getValueLabel?: (value: number, max: number) => string; } & RefAttributes<HTMLDivElement>>`
- `RadarChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `RadioGroup`: `({ children, value, defaultValue, onValueChange, name, required, disabled, direction, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; name?: string; required?: boolean; disabled?: boolean; direction?: Direction; }>) => JSX.Element`
- `RadioGroupItem`: `({ value, disabled, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & { value: string; }) => JSX.Element`
- `Rating`: `ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; } & RefAttributes<HTMLDivElement>>`
- `RatingProps`: `type RatingProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; };`
- `ResizableHandle`: `({ _boundary, onKeyDown, onPointerDown, ...props }: ResizableHandleProps) => React.JSX.Element`
- `ResizablePanel`: `(props: ResizablePanelProps) => React.JSX.Element`
- `ResizablePanelGroup`: `({ orientation, direction, children, ...props }: HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; }) => React.JSX.Element`
- `ScatterChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `ScrollArea`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "both"; label?: string; } & RefAttributes<HTMLDivElement>>`
- `Select`: `({ options, name, value, defaultValue, required, disabled, onValueChange, placeholder, }: { options: SelectOption[]; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; onValueChange?: (value: string) => void; placeholder?: ReactNode; }) => JSX.Element`
- `SelectOption`: `type SelectOption = { value: string; label: ReactNode; disabled?: boolean; };`
- `Separator`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `Sheet`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `SheetClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `SheetContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { side?: SheetSide; } & RefAttributes<HTMLDivElement>>`
- `SheetDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `SheetSide`: `type SheetSide = 'top' | 'right' | 'bottom' | 'left';`
- `SheetTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `SheetTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Sidebar`: `({ side, ...props }: HTMLAttributes<HTMLElement> & { side?: "start" | "end"; }) => JSX.Element`
- `SidebarContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarFooter`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarGroup`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarHeader`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarMenu`: `(props: HTMLAttributes<HTMLUListElement>) => JSX.Element`
- `SidebarProvider`: `({ open: controlledOpen, defaultOpen, onOpenChange, children, }: PropsWithChildren<OpenProps>) => JSX.Element`
- `SidebarTrigger`: `({ onClick, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `Skeleton`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { label?: string; } & RefAttributes<HTMLDivElement>>`
- `Slider`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { invalid?: boolean; } & RefAttributes<HTMLInputElement>>`
- `Spinner`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { label?: string; } & RefAttributes<HTMLSpanElement>>`
- `Switch`: `(props: CheckProps) => JSX.Element`
- `Table`: `ForwardRefExoticComponent<TableHTMLAttributes<HTMLTableElement> & RefAttributes<HTMLTableElement>>`
- `TableBody`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableCaption`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableCaptionElement> & RefAttributes<HTMLTableCaptionElement>>`
- `TableCell`: `ForwardRefExoticComponent<TdHTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>`
- `TableFooter`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableHead`: `ForwardRefExoticComponent<ThHTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>`
- `TableHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableRow`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & RefAttributes<HTMLTableRowElement>>`
- `Tabs`: `({ value, defaultValue, onValueChange, orientation, direction, children, }: PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void; orientation?: Orientation; direction?: Direction; }>) => JSX.Element`
- `TabsContent`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSX.Element | null`
- `TabsList`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `TabsTrigger`: `({ value, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSX.Element`
- `TagsInput`: `ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & { value?: string[]; defaultValue?: string[]; name?: string; disabled?: boolean; readOnly?: boolean; required?: boolean; maxTags?: number; placeholder?: string; inputLabel?: string; getRemoveLabel?: (tag: string) => string; onValueChange?: (value: string[]) => void; } & RefAttributes<HTMLInputElement>>`
- `TagsInputProps`: `type TagsInputProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: string[]; defaultValue?: string[]; name?: string; disabled?: boolean; readOnly?: boolean; required?: boolean; maxTags?: number; placeholder?: string; inputLabel?: string; getRemoveLabel?: (tag: string) => string; onValueChange?: (value: string[]) => void; };`
- `Textarea`: `ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; } & RefAttributes<HTMLTextAreaElement>>`
- `ToastMessage`: `type ToastMessage = { id: string; title: ReactNode; description?: ReactNode; duration?: number; };`
- `ToastProvider`: `({ children }: PropsWithChildren) => JSX.Element`
- `ToastViewport`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `Toggle`: `ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & { pressed?: boolean; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void; } & RefAttributes<HTMLButtonElement>>`
- `ToggleGroup`: `({ type, value, defaultValue, onValueChange, orientation, direction, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?(value: string[]): void; orientation?: Orientation; direction?: Direction; }>) => JSX.Element`
- `ToggleGroupItem`: `({ value, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSX.Element`
- `Toolbar`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; label?: string; } & RefAttributes<HTMLDivElement>>`
- `ToolbarButton`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Tooltip`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `TooltipContent`: `({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `TooltipTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Tree`: `({ onKeyDown, ...props }: HTMLAttributes<HTMLUListElement>) => React.JSX.Element`
- `TreeItem`: `({ label, children, expandable, expanded: controlledExpanded, defaultExpanded, disabled, onExpandedChange, ...props }: TreeItemProps) => React.JSX.Element`
- `useToast`: `() => ToastContextValue`
- `VisuallyHidden`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement>>`

## ./chart-interactions

- `chartInteractionKey`: `chartInteractionKey`
- `ChartSelection`: `type ChartSelection`
- `ChartViewport`: `type ChartViewport`
- `nextChartIndex`: `nextChartIndex`
- `panDomain`: `panDomain`
- `SpatialGrid`: `SpatialGrid`
- `zoomDomain`: `zoomDomain`

## ./chart-stream

- `ChartStream`: `type ChartStream`
- `ChartStreamSnapshot`: `type ChartStreamSnapshot`
- `createChartStream`: `createChartStream`

## ./chart-canvas

- `CanvasMark`: `type CanvasMark`
- `drawChartCanvas`: `drawChartCanvas`
- `supportsWorkerCanvas`: `supportsWorkerCanvas`

## ./chart-motion

- `animated`: `animated`
- `MotionDefinition`: `MotionDefinition`
- `ReducedMotionMode`: `ReducedMotionMode`
- `useMotion`: `useMotion`

## ./accordion

- `Accordion`: `({ children, type, defaultValue, }: PropsWithChildren<{ type?: "single" | "multiple"; defaultValue?: string[]; }>) => JSX.Element`
- `AccordionContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element | null`
- `AccordionItem`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSX.Element`
- `AccordionTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`

## ./alert-dialog

- `AlertDialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `AlertDialogAction`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `AlertDialogCancel`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `AlertDialogContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `AlertDialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `AlertDialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `AlertDialogTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./alert

- `Alert`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { urgent?: boolean; } & RefAttributes<HTMLDivElement>>`

## ./aspect-ratio

- `AspectRatio`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { ratio?: number; } & RefAttributes<HTMLDivElement>>`

## ./avatar

- `Avatar`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { src?: string; alt: string; fallback: ReactNode; imageProps?: ImgHTMLAttributes<HTMLImageElement>; } & RefAttributes<HTMLSpanElement>>`

## ./badge

- `Badge`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; status?: boolean; } & RefAttributes<HTMLSpanElement>>`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`

## ./basic

- `Accordion`: `({ children, type, defaultValue, }: PropsWithChildren<{ type?: "single" | "multiple"; defaultValue?: string[]; }>) => JSX.Element`
- `AccordionContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element | null`
- `AccordionItem`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSX.Element`
- `AccordionTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `Alert`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { urgent?: boolean; } & RefAttributes<HTMLDivElement>>`
- `AspectRatio`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { ratio?: number; } & RefAttributes<HTMLDivElement>>`
- `Badge`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; status?: boolean; } & RefAttributes<HTMLSpanElement>>`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`
- `Button`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: "primary" | "secondary" | "destructive" | "quiet"; size?: "sm" | "md" | "lg"; fullWidth?: boolean; iconOnly?: boolean; } & RefAttributes<HTMLButtonElement>>`
- `Card`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `CardFooter`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardTitle`: `ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>`
- `Checkbox`: `(props: CheckProps) => JSX.Element`
- `Field`: `ForwardRefExoticComponent<FieldsetHTMLAttributes<HTMLFieldSetElement> & RefAttributes<HTMLFieldSetElement>>`
- `FieldDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `FieldError`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `FieldLegend`: `ForwardRefExoticComponent<HTMLAttributes<HTMLLegendElement> & RefAttributes<HTMLLegendElement>>`
- `Form`: `ForwardRefExoticComponent<FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean; } & RefAttributes<HTMLFormElement>>`
- `FormErrorSummary`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `Input`: `ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; } & RefAttributes<HTMLInputElement>>`
- `Label`: `ForwardRefExoticComponent<LabelHTMLAttributes<HTMLLabelElement> & RefAttributes<HTMLLabelElement>>`
- `Link`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; external?: boolean; } & RefAttributes<HTMLAnchorElement>>`
- `NativeSelect`: `ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; } & RefAttributes<HTMLSelectElement>>`
- `NumberInput`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "type" | "value" | "max" | "min" | "step"> & { value?: number; defaultValue?: number; min?: number; max?: number; step?: number; incrementLabel?: string; decrementLabel?: string; onValueChange?: (value: number) => void; } & RefAttributes<HTMLInputElement>>`
- `Pagination`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & { label?: string; } & RefAttributes<HTMLElement>>`
- `PaginationContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLUListElement> & RefAttributes<HTMLUListElement>>`
- `PaginationItem`: `ForwardRefExoticComponent<LiHTMLAttributes<HTMLLIElement> & RefAttributes<HTMLLIElement>>`
- `PaginationLink`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; } & RefAttributes<HTMLAnchorElement>>`
- `Progress`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { value?: number | null; max?: number; getValueLabel?: (value: number, max: number) => string; } & RefAttributes<HTMLDivElement>>`
- `RadioGroup`: `({ children, value, defaultValue, onValueChange, name, required, disabled, direction, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; name?: string; required?: boolean; disabled?: boolean; direction?: Direction; }>) => JSX.Element`
- `RadioGroupItem`: `({ value, disabled, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & { value: string; }) => JSX.Element`
- `Rating`: `ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; } & RefAttributes<HTMLDivElement>>`
- `RatingProps`: `type RatingProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; };`
- `Separator`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `Skeleton`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { label?: string; } & RefAttributes<HTMLDivElement>>`
- `Spinner`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { label?: string; } & RefAttributes<HTMLSpanElement>>`
- `Switch`: `(props: CheckProps) => JSX.Element`
- `Table`: `ForwardRefExoticComponent<TableHTMLAttributes<HTMLTableElement> & RefAttributes<HTMLTableElement>>`
- `TableBody`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableCaption`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableCaptionElement> & RefAttributes<HTMLTableCaptionElement>>`
- `TableCell`: `ForwardRefExoticComponent<TdHTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>`
- `TableFooter`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableHead`: `ForwardRefExoticComponent<ThHTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>`
- `TableHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableRow`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & RefAttributes<HTMLTableRowElement>>`
- `Tabs`: `({ value, defaultValue, onValueChange, orientation, direction, children, }: PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void; orientation?: Orientation; direction?: Direction; }>) => JSX.Element`
- `TabsContent`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSX.Element | null`
- `TabsList`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `TabsTrigger`: `({ value, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSX.Element`
- `TagsInput`: `ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & { value?: string[]; defaultValue?: string[]; name?: string; disabled?: boolean; readOnly?: boolean; required?: boolean; maxTags?: number; placeholder?: string; inputLabel?: string; getRemoveLabel?: (tag: string) => string; onValueChange?: (value: string[]) => void; } & RefAttributes<HTMLInputElement>>`
- `Textarea`: `ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; } & RefAttributes<HTMLTextAreaElement>>`
- `VisuallyHidden`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement>>`

## ./breadcrumb

- `Breadcrumb`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & { label?: string; } & RefAttributes<HTMLElement>>`

## ./button-group

- `ButtonGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; } & RefAttributes<HTMLDivElement>>`
- `ButtonGroupSeparator`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { orientation?: Orientation; } & RefAttributes<HTMLSpanElement>>`
- `ButtonGroupText`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement>>`

## ./button

- `Button`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: "primary" | "secondary" | "destructive" | "quiet"; size?: "sm" | "md" | "lg"; fullWidth?: boolean; iconOnly?: boolean; } & RefAttributes<HTMLButtonElement>>`

## ./calendar

- `Calendar`: `({ value, defaultValue, month, defaultMonth, locale, direction, firstDayOfWeek, min, max, disabledDates, name, label, onValueChange, onMonthChange, }: CalendarProps) => JSX.Element`
- `CalendarProps`: `type CalendarProps = { value?: string; defaultValue?: string; month?: string; defaultMonth?: string; locale?: string; direction?: Direction; firstDayOfWeek?: number; min?: string; max?: string; disabledDates?: string[]; name?: string; label?: string; onValueChange?: (value: string) => void; onMonthChange?: (month: string) => void; };`

## ./card

- `Card`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `CardFooter`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `CardTitle`: `ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>`

## ./carousel

- `Carousel`: `({ label, direction, loop, defaultIndex, onIndexChange, onKeyDown, children, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; loop?: boolean; defaultIndex?: number; onIndexChange?: (index: number) => void; }) => React.JSX.Element`
- `CarouselContent`: `({ children, ...props }: HTMLAttributes<HTMLDivElement>) => React.JSX.Element`
- `CarouselItem`: `React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>`
- `CarouselNext`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`
- `CarouselPrevious`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`

## ./chart

- `AreaChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `BarChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `BubbleChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `ChartBrush`: `(props: SVGAttributes<SVGRectElement>) => JSX.Element`
- `ChartCrosshair`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `ChartDataTable`: `<T>({ data, columns, pageSize }: { data: readonly T[]; columns: readonly { label: string; value: ChartAccessor<T>; }[]; pageSize?: number; }) => JSX.Element`
- `ChartGrid`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `ChartLegend`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `ChartPlot`: `(props: SVGAttributes<SVGSVGElement>) => JSX.Element`
- `ChartProps`: `type ChartProps<T> = Omit<HTMLAttributes<HTMLElement>, 'title'> & { data?: readonly T[]; stream?: ChartStream<string>; x?: ChartAccessor<T>; y?: ChartAccessor<T, number>; series?: readonly ChartSeries<T>[]; accessibility: ChartAccessibility; width?: number; height?: number; xScale?: ChartScaleType; yScale?: Exclude<ChartScaleType, 'band'>; xDomain?: ChartDomain; yDomain?: ChartDomain; renderMode?: ChartRenderMode; canvasThreshold?: number; hiddenSeries?: readonly string[]; defaultHiddenSeries?: readonly string[]; onHiddenSeriesChange?: (series: string[]) => void; emptyContent?: ReactNode; orientation?: 'vertical' | 'horizontal'; innerRadius?: number; };`
- `ChartRoot`: `({ width, height, children, ...props }: HTMLAttributes<HTMLElement> & ChartContextValue) => JSX.Element`
- `ChartTooltip`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `ChartXAxis`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `ChartYAxis`: `(props: SVGAttributes<SVGGElement>) => JSX.Element`
- `ComboChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `DonutChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `HeatmapChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `LineChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `PieChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `RadarChart`: `<T>(props: ChartProps<T>) => JSX.Element`
- `ScatterChart`: `<T>(props: ChartProps<T>) => JSX.Element`

## ./checkbox

- `Checkbox`: `(props: CheckProps) => JSX.Element`

## ./collapsible

- `Collapsible`: `({ open, defaultOpen, onOpenChange, children, }: PropsWithChildren<{ open?: boolean; defaultOpen?: boolean; onOpenChange?(open: boolean): void; }>) => JSX.Element`
- `CollapsibleContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `CollapsibleTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`

## ./combobox

- `Combobox`: `({ options, name, value, defaultValue, required, disabled, placeholder, noResults, onValueChange, }: ComboboxProps) => JSX.Element`
- `ComboboxProps`: `type ComboboxProps = { options: Array<Omit<SelectOption, 'label'> & { label: string }>; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; placeholder?: string; noResults?: ReactNode; onValueChange?: (value: string) => void; };`
- `SelectOption`: `type SelectOption = { value: string; label: ReactNode; disabled?: boolean; };`

## ./command

- `Command`: `(props: ComboboxProps) => JSX.Element`

## ./context-menu

- `ContextMenu`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `ContextMenuContent`: `({ className, style, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `ContextMenuItem`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; } & RefAttributes<HTMLDivElement>>`
- `ContextMenuTrigger`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`

## ./date-picker

- `DatePicker`: `({ value, defaultValue, name, locale, label, placeholder, required, disabled, onValueChange, ...calendarProps }: DatePickerProps) => JSX.Element`
- `DatePickerProps`: `type DatePickerProps = CalendarProps & { placeholder?: string; required?: boolean; disabled?: boolean; };`

## ./description-list

- `DescriptionList`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDListElement> & RefAttributes<HTMLDListElement>>`
- `DescriptionListDetails`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>`
- `DescriptionListGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DescriptionListTerm`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>`

## ./dialog

- `Dialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `DialogClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DialogContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `DialogOverlay`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DialogPortal`: `({ children }: PropsWithChildren) => ReactPortal | null`
- `DialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `DialogTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./disclosure

- `Disclosure`: `React.ForwardRefExoticComponent<React.DetailsHTMLAttributes<HTMLDetailsElement> & OpenProps & React.RefAttributes<HTMLDetailsElement>>`
- `DisclosureContent`: `React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>`
- `DisclosureSummary`: `React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>`

## ./drawer

- `Drawer`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `DrawerClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DrawerContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { side?: "top" | "bottom"; } & RefAttributes<HTMLDivElement>>`
- `DrawerDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `DrawerTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `DrawerTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./dropdown-menu

- `DropdownMenu`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `DropdownMenuContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `DropdownMenuItem`: `({ disabled, onSelect, ...props }: HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }) => JSX.Element`
- `DropdownMenuTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./empty

- `Empty`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { status?: boolean; } & RefAttributes<HTMLDivElement>>`
- `EmptyContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `EmptyDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `EmptyHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `EmptyMedia`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `EmptyTitle`: `ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>`

## ./field

- `Field`: `ForwardRefExoticComponent<FieldsetHTMLAttributes<HTMLFieldSetElement> & RefAttributes<HTMLFieldSetElement>>`
- `FieldDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `FieldError`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `FieldLegend`: `ForwardRefExoticComponent<HTMLAttributes<HTMLLegendElement> & RefAttributes<HTMLLegendElement>>`

## ./file-upload

- `FileUpload`: `({ label, description, onFilesChange, accept, disabled, multiple, ...props }: FileUploadProps) => JSX.Element`

## ./form

- `Form`: `ForwardRefExoticComponent<FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean; } & RefAttributes<HTMLFormElement>>`
- `FormErrorSummary`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`

## ./hover-card

- `HoverCard`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `HoverCardContent`: `({ label, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; }) => JSX.Element`
- `HoverCardTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./input-group

- `InputGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `InputGroupAddon`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { align?: "inline-start" | "inline-end" | "block-start" | "block-end"; decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `InputGroupText`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement>>`

## ./input-otp

- `InputOtp`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "maxLength"> & { length?: number; digitsOnly?: boolean; invalid?: boolean; } & RefAttributes<HTMLInputElement>>`

## ./input

- `Input`: `ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; } & RefAttributes<HTMLInputElement>>`

## ./item

- `Item`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemActions`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemDescription`: `ForwardRefExoticComponent<HTMLAttributes<HTMLParagraphElement> & RefAttributes<HTMLParagraphElement>>`
- `ItemGroup`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `ItemMedia`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; } & RefAttributes<HTMLDivElement>>`
- `ItemTitle`: `ForwardRefExoticComponent<HTMLAttributes<HTMLHeadingElement> & RefAttributes<HTMLHeadingElement>>`

## ./kbd

- `Kbd`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>`

## ./label

- `Label`: `ForwardRefExoticComponent<LabelHTMLAttributes<HTMLLabelElement> & RefAttributes<HTMLLabelElement>>`

## ./link

- `Link`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; external?: boolean; } & RefAttributes<HTMLAnchorElement>>`

## ./menubar

- `Menubar`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; } & RefAttributes<HTMLDivElement>>`
- `MenubarItem`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./meter

- `Meter`: `ForwardRefExoticComponent<MeterHTMLAttributes<HTMLMeterElement> & { label?: string; } & RefAttributes<HTMLMeterElement>>`

## ./native-select

- `NativeSelect`: `ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; } & RefAttributes<HTMLSelectElement>>`

## ./navigation-menu

- `NavigationMenu`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & { label?: string; } & RefAttributes<HTMLElement>>`
- `NavigationMenuItem`: `ForwardRefExoticComponent<LiHTMLAttributes<HTMLLIElement> & RefAttributes<HTMLLIElement>>`
- `NavigationMenuLink`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; } & RefAttributes<HTMLAnchorElement>>`
- `NavigationMenuList`: `ForwardRefExoticComponent<HTMLAttributes<HTMLUListElement> & RefAttributes<HTMLUListElement>>`

## ./number-input

- `NumberInput`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "type" | "value" | "max" | "min" | "step"> & { value?: number; defaultValue?: number; min?: number; max?: number; step?: number; incrementLabel?: string; decrementLabel?: string; onValueChange?: (value: number) => void; } & RefAttributes<HTMLInputElement>>`

## ./overlays

- `AlertDialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `AlertDialogAction`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `AlertDialogCancel`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`
- `AlertDialogContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `AlertDialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `AlertDialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `AlertDialogTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `ContextMenu`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `ContextMenuContent`: `({ className, style, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `ContextMenuItem`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; } & RefAttributes<HTMLDivElement>>`
- `ContextMenuTrigger`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `Dialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `DialogClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DialogContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>>`
- `DialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `DialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `DialogTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Drawer`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `DrawerClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DrawerContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { side?: "top" | "bottom"; } & RefAttributes<HTMLDivElement>>`
- `DrawerDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `DrawerTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `DrawerTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `DropdownMenu`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `DropdownMenuContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `DropdownMenuItem`: `({ disabled, onSelect, ...props }: HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }) => JSX.Element`
- `DropdownMenuTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `HoverCard`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `HoverCardContent`: `({ label, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; }) => JSX.Element`
- `HoverCardTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Popover`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `PopoverContent`: `({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `PopoverTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Sheet`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `SheetClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `SheetContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { side?: SheetSide; } & RefAttributes<HTMLDivElement>>`
- `SheetDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `SheetTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `SheetTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `Tooltip`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `TooltipContent`: `({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `TooltipTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./pagination

- `Pagination`: `ForwardRefExoticComponent<HTMLAttributes<HTMLElement> & { label?: string; } & RefAttributes<HTMLElement>>`
- `PaginationContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLUListElement> & RefAttributes<HTMLUListElement>>`
- `PaginationItem`: `ForwardRefExoticComponent<LiHTMLAttributes<HTMLLIElement> & RefAttributes<HTMLLIElement>>`
- `PaginationLink`: `ForwardRefExoticComponent<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; } & RefAttributes<HTMLAnchorElement>>`

## ./password-input

- `PasswordInput`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { revealLabel?: string; concealLabel?: string; } & RefAttributes<HTMLInputElement>>`

## ./popover

- `Popover`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `PopoverContent`: `({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `PopoverTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./progress

- `Progress`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { value?: number | null; max?: number; getValueLabel?: (value: number, max: number) => string; } & RefAttributes<HTMLDivElement>>`

## ./radio-group

- `RadioGroup`: `({ children, value, defaultValue, onValueChange, name, required, disabled, direction, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; name?: string; required?: boolean; disabled?: boolean; direction?: Direction; }>) => JSX.Element`
- `RadioGroupItem`: `({ value, disabled, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & { value: string; }) => JSX.Element`

## ./rating

- `Rating`: `ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; } & RefAttributes<HTMLDivElement>>`
- `RatingProps`: `type RatingProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; };`

## ./resizable

- `ResizableHandle`: `({ _boundary, onKeyDown, onPointerDown, ...props }: ResizableHandleProps) => React.JSX.Element`
- `ResizablePanel`: `(props: ResizablePanelProps) => React.JSX.Element`
- `ResizablePanelGroup`: `({ orientation, direction, children, ...props }: HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; }) => React.JSX.Element`

## ./scroll-area

- `ScrollArea`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "both"; label?: string; } & RefAttributes<HTMLDivElement>>`

## ./select

- `Select`: `({ options, name, value, defaultValue, required, disabled, onValueChange, placeholder, }: { options: SelectOption[]; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; onValueChange?: (value: string) => void; placeholder?: ReactNode; }) => JSX.Element`
- `SelectOption`: `type SelectOption = { value: string; label: ReactNode; disabled?: boolean; };`

## ./separator

- `Separator`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; decorative?: boolean; } & RefAttributes<HTMLDivElement>>`

## ./sheet

- `Sheet`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSX.Element`
- `SheetClose`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`
- `SheetContent`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { side?: SheetSide; } & RefAttributes<HTMLDivElement>>`
- `SheetDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSX.Element`
- `SheetSide`: `type SheetSide = 'top' | 'right' | 'bottom' | 'left';`
- `SheetTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSX.Element`
- `SheetTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./sidebar

- `Sidebar`: `({ side, ...props }: HTMLAttributes<HTMLElement> & { side?: "start" | "end"; }) => JSX.Element`
- `SidebarContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarFooter`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarGroup`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarHeader`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `SidebarMenu`: `(props: HTMLAttributes<HTMLUListElement>) => JSX.Element`
- `SidebarProvider`: `({ open: controlledOpen, defaultOpen, onOpenChange, children, }: PropsWithChildren<OpenProps>) => JSX.Element`
- `SidebarTrigger`: `({ onClick, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element`

## ./skeleton

- `Skeleton`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { label?: string; } & RefAttributes<HTMLDivElement>>`

## ./slider

- `Slider`: `ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { invalid?: boolean; } & RefAttributes<HTMLInputElement>>`

## ./spinner

- `Spinner`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & { label?: string; } & RefAttributes<HTMLSpanElement>>`

## ./switch

- `Switch`: `(props: CheckProps) => JSX.Element`

## ./table

- `Table`: `ForwardRefExoticComponent<TableHTMLAttributes<HTMLTableElement> & RefAttributes<HTMLTableElement>>`
- `TableBody`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableCaption`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableCaptionElement> & RefAttributes<HTMLTableCaptionElement>>`
- `TableCell`: `ForwardRefExoticComponent<TdHTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>`
- `TableFooter`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableHead`: `ForwardRefExoticComponent<ThHTMLAttributes<HTMLTableCellElement> & RefAttributes<HTMLTableCellElement>>`
- `TableHeader`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & RefAttributes<HTMLTableSectionElement>>`
- `TableRow`: `ForwardRefExoticComponent<HTMLAttributes<HTMLTableRowElement> & RefAttributes<HTMLTableRowElement>>`

## ./tabs

- `Tabs`: `({ value, defaultValue, onValueChange, orientation, direction, children, }: PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void; orientation?: Orientation; direction?: Direction; }>) => JSX.Element`
- `TabsContent`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSX.Element | null`
- `TabsList`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `TabsTrigger`: `({ value, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSX.Element`

## ./tags-input

- `TagsInput`: `ForwardRefExoticComponent<Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & { value?: string[]; defaultValue?: string[]; name?: string; disabled?: boolean; readOnly?: boolean; required?: boolean; maxTags?: number; placeholder?: string; inputLabel?: string; getRemoveLabel?: (tag: string) => string; onValueChange?: (value: string[]) => void; } & RefAttributes<HTMLInputElement>>`
- `TagsInputProps`: `type TagsInputProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: string[]; defaultValue?: string[]; name?: string; disabled?: boolean; readOnly?: boolean; required?: boolean; maxTags?: number; placeholder?: string; inputLabel?: string; getRemoveLabel?: (tag: string) => string; onValueChange?: (value: string[]) => void; };`

## ./textarea

- `Textarea`: `ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; } & RefAttributes<HTMLTextAreaElement>>`

## ./toast

- `ToastMessage`: `type ToastMessage = { id: string; title: ReactNode; description?: ReactNode; duration?: number; };`
- `ToastProvider`: `({ children }: PropsWithChildren) => JSX.Element`
- `ToastViewport`: `(props: HTMLAttributes<HTMLDivElement>) => JSX.Element`
- `useToast`: `() => ToastContextValue`

## ./toggle-group

- `ToggleGroup`: `({ type, value, defaultValue, onValueChange, orientation, direction, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?(value: string[]): void; orientation?: Orientation; direction?: Direction; }>) => JSX.Element`
- `ToggleGroupItem`: `({ value, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSX.Element`

## ./toggle

- `Toggle`: `ForwardRefExoticComponent<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & { pressed?: boolean; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void; } & RefAttributes<HTMLButtonElement>>`

## ./toolbar

- `Toolbar`: `ForwardRefExoticComponent<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; label?: string; } & RefAttributes<HTMLDivElement>>`
- `ToolbarButton`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./tooltip

- `Tooltip`: `(props: PropsWithChildren<OpenProps>) => JSX.Element`
- `TooltipContent`: `({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => ReactPortal | null`
- `TooltipTrigger`: `ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & RefAttributes<HTMLButtonElement>>`

## ./tree

- `Tree`: `({ onKeyDown, ...props }: HTMLAttributes<HTMLUListElement>) => React.JSX.Element`
- `TreeItem`: `({ label, children, expandable, expanded: controlledExpanded, defaultExpanded, disabled, onExpandedChange, ...props }: TreeItemProps) => React.JSX.Element`

## ./visually-hidden

- `VisuallyHidden`: `ForwardRefExoticComponent<HTMLAttributes<HTMLSpanElement> & RefAttributes<HTMLSpanElement>>`

