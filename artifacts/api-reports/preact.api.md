# @simurgh-ui/preact public API

Version snapshot: 1.0.0-beta.4

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
  "./chart-export": {
    "types": "./dist/chart-export.d.ts",
    "import": "./dist/chart-export.js"
  },
  "./chart-responsive": {
    "types": "./dist/chart-responsive.d.ts",
    "import": "./dist/chart-responsive.js"
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

- `Accordion`: `({ children, type, defaultValue, }: PropsWithChildren<{ type?: "single" | "multiple"; defaultValue?: string[]; }>) => JSXInternal.Element`
- `AccordionContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element | null`
- `AccordionItem`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSXInternal.Element`
- `AccordionTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `Alert`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { urgent?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `AlertDialog`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `AlertDialogAction`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `AlertDialogCancel`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `AlertDialogContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `AlertDialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `AlertDialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `AlertDialogTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `AreaChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `AspectRatio`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { ratio?: number; }> & { ref?: Ref<HTMLDivElement>; }>`
- `Avatar`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { src?: string; alt: string; fallback: ReactNode; imageProps?: ImgHTMLAttributes<HTMLImageElement>; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `Badge`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; status?: boolean; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`
- `BarChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `Breadcrumb`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement> & { label?: string; }> & { ref?: Ref<HTMLElement>; }>`
- `BubbleChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `Button`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: "primary" | "secondary" | "destructive" | "quiet"; size?: "sm" | "md" | "lg"; fullWidth?: boolean; iconOnly?: boolean; }> & { ref?: Ref<HTMLButtonElement>; }>`
- `ButtonGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ButtonGroupSeparator`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { orientation?: Orientation; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `ButtonGroupText`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement>> & { ref?: Ref<HTMLSpanElement>; }>`
- `Calendar`: `({ value, defaultValue, month, defaultMonth, locale, direction, firstDayOfWeek, min, max, disabledDates, name, label, onValueChange, onMonthChange, }: CalendarProps) => JSXInternal.Element`
- `CalendarProps`: `type CalendarProps = { value?: string; defaultValue?: string; month?: string; defaultMonth?: string; locale?: string; direction?: Direction; firstDayOfWeek?: number; min?: string; max?: string; disabledDates?: string[]; name?: string; label?: string; onValueChange?: (value: string) => void; onMonthChange?: (month: string) => void; };`
- `Card`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `CardFooter`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardTitle`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & { ref?: Ref<HTMLHeadingElement>; }>`
- `Carousel`: `({ label, direction, loop, defaultIndex, onIndexChange, onKeyDown, children, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; loop?: boolean; defaultIndex?: number; onIndexChange?: (index: number) => void; }) => React.JSX.Element`
- `CarouselContent`: `({ children, ...props }: HTMLAttributes<HTMLDivElement>) => React.JSX.Element`
- `CarouselItem`: `FunctionalComponent<React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> & { ref?: React.Ref<HTMLDivElement>; }>`
- `CarouselNext`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`
- `CarouselPrevious`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`
- `ChartBrush`: `(props: SVGAttributes<SVGRectElement>) => JSXInternal.Element`
- `ChartCrosshair`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `ChartDataTable`: `<T>({ data, columns, pageSize, locale }: { data: readonly T[]; columns: readonly { label: string; value: ChartAccessor<T>; }[]; pageSize?: number; locale?: Partial<ChartLocale>; }) => JSXInternal.Element`
- `ChartGrid`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `ChartLegend`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `ChartPlot`: `(props: SVGAttributes<SVGSVGElement>) => JSXInternal.Element`
- `ChartPointInteraction`: `type ChartPointInteraction<T> = Pick<PreparedPoint<T>, 'datum' | 'index' | 'x' | 'y' | 'xValue' | 'yValue' | 'radius'> & { seriesId: string };`
- `ChartProps`: `type ChartProps<T> = Omit<HTMLAttributes<HTMLElement>, 'title'> & { data?: readonly T[]; stream?: ChartStream<string>; x?: ChartAccessor<T>; y?: ChartAccessor<T, number>; series?: readonly ChartSeries<T>[]; accessibility: ChartAccessibility; width?: number; height?: number; xScale?: ChartScaleType; yScale?: Exclude<ChartScaleType, 'band'>; xDomain?: ChartDomain; yDomain?: ChartDomain; xAxis?: ChartAxisConfig; yAxis?: ChartAxisConfig; references?: readonly ChartReference[]; annotations?: readonly ChartAnnotation[]; dataLabels?: boolean | ChartDataLabelConfig; legend?: ChartLegendConfig; legendContent?: (series: readonly ChartSeries<T>[], hiddenSeries: readonly string[]) => ReactNode; visualMap?: ChartVisualMap; dataOptions?: ChartDataOptions<T>; streamControls?: boolean; streamAutoScroll?: boolean; streamAnnouncement?: boolean; centerLabel?: string; showTotal?: boolean; onSliceSelect?: (slice: { datum: T; index: number; value: number }) => void; drilldownDepth?: number; onDrilldown?: (event: ChartPointInteraction<T> | { datum: T; index: number; value: number }) => void; onDrilldownBack?: () => void; viewport?: { x?: ChartDomain; y?: ChartDomain }; defaultViewport?: { x?: ChartDomain; y?: ChartDomain }; interaction?: { zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy' }; sync?: ChartSync; onViewportChange?: (viewport: { x?: ChartDomain; y?: ChartDomain }) => void; onXDomainChange?: (domain: ChartDomain) => void; onYDomainChange?: (domain: ChartDomain) => void; onSelectionChange?: (selection: { start: readonly [number, number]; end: readonly [number, number] } | null) => void; onSelectedDataChange?: (data: readonly T[]) => void; onPointHover?: (point: ChartPointInteraction<T> | null) => void; onPointClick?: (point: ChartPointInteraction<T>) => void; onPointDoubleClick?: (point: ChartPointInteraction<T>) => void; onPointContextMenu?: (point: ChartPointInteraction<T>) => void; tooltipMode?: ChartTooltipMode; tooltipTrigger?: ChartTooltipTrigger; tooltipPosition?: ChartTooltipPosition; tooltipFormatter?: (point: ChartPointInteraction<T>) => ReactNode; tooltipContent?: (points: readonly ChartPointInteraction<T>[]) => ReactNode; renderMode?: ChartRenderMode; canvasThreshold?: number; workerProcessing?: boolean; viewportCulling?: boolean; progressiveChunkSize?: number; motion?: boolean; locale?: Partial<ChartLocale>; hiddenSeries?: readonly string[]; defaultHiddenSeries?: readonly string[]; onHiddenSeriesChange?: (series: string[]) => void; emptyContent?: ReactNode; orientation?: 'vertical' | 'horizontal'; innerRadius?: number; };`
- `ChartRoot`: `({ width, height, children, ...props }: HTMLAttributes<HTMLElement> & ChartContextValue) => JSXInternal.Element`
- `ChartTooltip`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `ChartXAxis`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `ChartYAxis`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `Checkbox`: `(props: CheckProps) => JSXInternal.Element`
- `Collapsible`: `({ open, defaultOpen, onOpenChange, children, }: PropsWithChildren<{ open?: boolean; defaultOpen?: boolean; onOpenChange?(open: boolean): void; }>) => JSXInternal.Element`
- `CollapsibleContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `CollapsibleTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `Combobox`: `({ options, name, value, defaultValue, required, disabled, placeholder, noResults, onValueChange, }: ComboboxProps) => JSXInternal.Element`
- `ComboboxProps`: `type ComboboxProps = { options: Array<Omit<SelectOption, 'label'> & { label: string }>; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; placeholder?: string; noResults?: ReactNode; onValueChange?: (value: string) => void; };`
- `ComboChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `Command`: `(props: ComboboxProps) => JSXInternal.Element`
- `ContextMenu`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `ContextMenuContent`: `({ className, style, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `ContextMenuItem`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ContextMenuTrigger`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DatePicker`: `({ value, defaultValue, name, locale, label, placeholder, required, disabled, onValueChange, ...calendarProps }: DatePickerProps) => JSXInternal.Element`
- `DatePickerProps`: `type DatePickerProps = CalendarProps & { placeholder?: string; required?: boolean; disabled?: boolean; };`
- `DescriptionList`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDListElement>> & { ref?: Ref<HTMLDListElement>; }>`
- `DescriptionListDetails`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement>> & { ref?: Ref<HTMLElement>; }>`
- `DescriptionListGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DescriptionListTerm`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement>> & { ref?: Ref<HTMLElement>; }>`
- `Dialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DialogClose`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DialogContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `DialogOverlay`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DialogPortal`: `({ children }: PropsWithChildren) => VNode<any> | null`
- `DialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `DialogTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Disclosure`: `FunctionalComponent<React.PropsWithoutRef<React.JSX.DetailsHTMLAttributes<HTMLDetailsElement> & OpenProps> & { ref?: React.Ref<HTMLDetailsElement>; }>`
- `DisclosureContent`: `FunctionalComponent<React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> & { ref?: React.Ref<HTMLDivElement>; }>`
- `DisclosureSummary`: `FunctionalComponent<React.PropsWithoutRef<React.HTMLAttributes<HTMLElement>> & { ref?: React.Ref<HTMLElement>; }>`
- `DonutChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `Drawer`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DrawerClose`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DrawerContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { side?: "top" | "bottom"; }> & { ref?: Ref<HTMLDivElement>; }>`
- `DrawerDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `DrawerTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `DrawerTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DropdownMenu`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DropdownMenuContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `DropdownMenuItem`: `({ disabled, onSelect, ...props }: HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }) => JSXInternal.Element`
- `DropdownMenuTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Empty`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { status?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `EmptyHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyMedia`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyTitle`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & { ref?: Ref<HTMLHeadingElement>; }>`
- `Field`: `FunctionalComponent<React.PropsWithoutRef<FieldsetHTMLAttributes<HTMLFieldSetElement>> & { ref?: Ref<HTMLFieldSetElement>; }>`
- `FieldDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `FieldError`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `FieldLegend`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLLegendElement>> & { ref?: Ref<HTMLLegendElement>; }>`
- `FileUpload`: `({ label, description, onFilesChange, accept, disabled, multiple, ...props }: FileUploadProps) => JSXInternal.Element`
- `Form`: `FunctionalComponent<React.PropsWithoutRef<FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean; }> & { ref?: Ref<HTMLFormElement>; }>`
- `FormErrorSummary`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `HeatmapChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `HoverCard`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `HoverCardContent`: `({ label, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; }) => JSXInternal.Element`
- `HoverCardTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Input`: `FunctionalComponent<React.PropsWithoutRef<InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLInputElement>; }>`
- `InputGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `InputGroupAddon`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { align?: "inline-start" | "inline-end" | "block-start" | "block-end"; decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `InputGroupText`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement>> & { ref?: Ref<HTMLSpanElement>; }>`
- `InputOtp`: `FunctionalComponent<React.PropsWithoutRef<Omit<InputHTMLAttributes<HTMLInputElement>, "maxLength"> & { length?: number; digitsOnly?: boolean; invalid?: boolean; }> & { ref?: Ref<HTMLInputElement>; }>`
- `Item`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemActions`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `ItemGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemMedia`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemTitle`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & { ref?: Ref<HTMLHeadingElement>; }>`
- `Kbd`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement>> & { ref?: Ref<HTMLElement>; }>`
- `Label`: `FunctionalComponent<React.PropsWithoutRef<LabelHTMLAttributes<HTMLLabelElement>> & { ref?: Ref<HTMLLabelElement>; }>`
- `LineChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `Link`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; external?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`
- `Menubar`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; }> & { ref?: Ref<HTMLDivElement>; }>`
- `MenubarItem`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Meter`: `FunctionalComponent<React.PropsWithoutRef<MeterHTMLAttributes<HTMLMeterElement> & { label?: string; }> & { ref?: Ref<HTMLMeterElement>; }>`
- `NativeSelect`: `FunctionalComponent<React.PropsWithoutRef<SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLSelectElement>; }>`
- `NavigationMenu`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement> & { label?: string; }> & { ref?: Ref<HTMLElement>; }>`
- `NavigationMenuItem`: `FunctionalComponent<React.PropsWithoutRef<LiHTMLAttributes<HTMLLIElement>> & { ref?: Ref<HTMLLIElement>; }>`
- `NavigationMenuLink`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`
- `NavigationMenuList`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLUListElement>> & { ref?: Ref<HTMLUListElement>; }>`
- `NumberInput`: `FunctionalComponent<React.PropsWithoutRef<NumberInputProps> & { ref?: Ref<HTMLInputElement>; }>`
- `Pagination`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement> & { label?: string; }> & { ref?: Ref<HTMLElement>; }>`
- `PaginationContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLUListElement>> & { ref?: Ref<HTMLUListElement>; }>`
- `PaginationItem`: `FunctionalComponent<React.PropsWithoutRef<LiHTMLAttributes<HTMLLIElement>> & { ref?: Ref<HTMLLIElement>; }>`
- `PaginationLink`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`
- `PasswordInput`: `FunctionalComponent<React.PropsWithoutRef<PasswordInputProps> & { ref?: Ref<HTMLInputElement>; }>`
- `PieChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `Popover`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `PopoverContent`: `({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `PopoverTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Progress`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { value?: number | null; max?: number; getValueLabel?: (value: number, max: number) => string; }> & { ref?: Ref<HTMLDivElement>; }>`
- `RadarChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `RadioGroup`: `({ children, value, defaultValue, onValueChange, name, required, disabled, direction, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; name?: string; required?: boolean; disabled?: boolean; direction?: Direction; }>) => JSXInternal.Element`
- `RadioGroupItem`: `({ value, disabled, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & { value: string; }) => JSXInternal.Element`
- `Rating`: `FunctionalComponent<React.PropsWithoutRef<RatingProps> & { ref?: Ref<HTMLDivElement>; }>`
- `RatingProps`: `type RatingProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; };`
- `ResizableHandle`: `({ _boundary, onKeyDown, onPointerDown, ...props }: ResizableHandleProps) => React.JSX.Element`
- `ResizablePanel`: `(props: ResizablePanelProps) => React.JSX.Element`
- `ResizablePanelGroup`: `({ orientation, direction, children, ...props }: HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; }) => React.JSX.Element`
- `ScatterChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `ScrollArea`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "both"; label?: string; }> & { ref?: Ref<HTMLDivElement>; }>`
- `Select`: `({ options, name, value, defaultValue, required, disabled, onValueChange, placeholder, }: { options: SelectOption[]; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; onValueChange?: (value: string) => void; placeholder?: ReactNode; }) => JSXInternal.Element`
- `SelectOption`: `type SelectOption = { value: string; label: ReactNode; disabled?: boolean; };`
- `Separator`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `Sheet`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `SheetClose`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `SheetContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { side?: SheetSide; }> & { ref?: Ref<HTMLDivElement>; }>`
- `SheetDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `SheetSide`: `type SheetSide = 'top' | 'right' | 'bottom' | 'left';`
- `SheetTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `SheetTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Sidebar`: `({ side, ...props }: HTMLAttributes<HTMLElement> & { side?: "start" | "end"; }) => JSXInternal.Element`
- `SidebarContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarFooter`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarGroup`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarHeader`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarMenu`: `(props: HTMLAttributes<HTMLUListElement>) => JSXInternal.Element`
- `SidebarProvider`: `({ open: controlledOpen, defaultOpen, onOpenChange, children, }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `SidebarTrigger`: `({ onClick, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `Skeleton`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { label?: string; }> & { ref?: Ref<HTMLDivElement>; }>`
- `Slider`: `FunctionalComponent<React.PropsWithoutRef<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { invalid?: boolean; }> & { ref?: Ref<HTMLInputElement>; }>`
- `Spinner`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { label?: string; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `Switch`: `(props: CheckProps) => JSXInternal.Element`
- `Table`: `FunctionalComponent<React.PropsWithoutRef<TableHTMLAttributes<HTMLTableElement>> & { ref?: Ref<HTMLTableElement>; }>`
- `TableBody`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableCaption`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableCaptionElement>> & { ref?: Ref<HTMLTableCaptionElement>; }>`
- `TableCell`: `FunctionalComponent<React.PropsWithoutRef<TdHTMLAttributes<HTMLTableCellElement>> & { ref?: Ref<HTMLTableCellElement>; }>`
- `TableFooter`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableHead`: `FunctionalComponent<React.PropsWithoutRef<ThHTMLAttributes<HTMLTableCellElement>> & { ref?: Ref<HTMLTableCellElement>; }>`
- `TableHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableRow`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableRowElement>> & { ref?: Ref<HTMLTableRowElement>; }>`
- `Tabs`: `({ value, defaultValue, onValueChange, orientation, direction, children, }: PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void; orientation?: Orientation; direction?: Direction; }>) => JSXInternal.Element`
- `TabsContent`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSXInternal.Element | null`
- `TabsList`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `TabsTrigger`: `({ value, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSXInternal.Element`
- `TagsInput`: `FunctionalComponent<React.PropsWithoutRef<TagsInputProps> & { ref?: Ref<HTMLInputElement>; }>`
- `TagsInputProps`: `type TagsInputProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: string[]; defaultValue?: string[]; name?: string; disabled?: boolean; readOnly?: boolean; required?: boolean; maxTags?: number; placeholder?: string; inputLabel?: string; getRemoveLabel?: (tag: string) => string; onValueChange?: (value: string[]) => void; };`
- `Textarea`: `FunctionalComponent<React.PropsWithoutRef<TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLTextAreaElement>; }>`
- `ToastMessage`: `type ToastMessage = { id: string; title: ReactNode; description?: ReactNode; duration?: number; };`
- `ToastProvider`: `({ children }: PropsWithChildren) => JSXInternal.Element`
- `ToastViewport`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `Toggle`: `FunctionalComponent<React.PropsWithoutRef<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & { pressed?: boolean; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void; }> & { ref?: Ref<HTMLButtonElement>; }>`
- `ToggleGroup`: `({ type, value, defaultValue, onValueChange, orientation, direction, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?(value: string[]): void; orientation?: Orientation; direction?: Direction; }>) => JSXInternal.Element`
- `ToggleGroupItem`: `({ value, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSXInternal.Element`
- `Toolbar`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; label?: string; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ToolbarButton`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Tooltip`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `TooltipContent`: `({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `TooltipTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Tree`: `({ onKeyDown, ...props }: HTMLAttributes<HTMLUListElement>) => React.JSX.Element`
- `TreeItem`: `({ label, children, expandable, expanded: controlledExpanded, defaultExpanded, disabled, onExpandedChange, ...props }: TreeItemProps) => React.JSX.Element`
- `useToast`: `() => ToastContextValue`
- `VisuallyHidden`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement>> & { ref?: Ref<HTMLSpanElement>; }>`

## ./chart-interactions

- `chartInteractionKey`: `(event: Pick<KeyboardEvent, "key" | "shiftKey">, viewport: ChartViewport) => { viewport: ChartViewport; clearSelection?: true; }`
- `ChartSelection`: `type ChartSelection = { start: readonly [number, number]; end: readonly [number, number]; } | null;`
- `ChartViewport`: `type ChartViewport = { x?: ChartDomain; y?: ChartDomain; };`
- `nextChartIndex`: `(current: number, size: number, key: string, direction?: "ltr" | "rtl") => number`
- `panDomain`: `(domain: ChartDomain, fraction: number) => ChartDomain`
- `SpatialGrid`: `typeof SpatialGrid`
- `zoomDomain`: `(domain: ChartDomain, factor: number, anchor?: number) => ChartDomain`

## ./chart-stream

- `ChartStream`: `type ChartStream<D extends string> = { readonly capacity: number; readonly dimensions: readonly D[]; readonly length: number; readonly window: number | undefined; readonly paused: boolean; append(batch: Readonly<Record<D, ArrayLike<number>>>): void; backfill(batch: Readonly<Record<D, ArrayLike<number>>>): void; clear(): void; setWindow(size?: number): void; pause(): void; resume(): void; snapshot(): ChartStreamSnapshot<D>; subscribe(listener: () => void): () => void; };`
- `ChartStreamSnapshot`: `type ChartStreamSnapshot<D extends string> = Readonly<{ length: number; version: number; columns: Readonly<Record<D, Float64Array>>; }>;`
- `createChartStream`: `<const D extends string>(options: { capacity: number; dimensions: readonly D[]; window?: number; }) => ChartStream<D>`

## ./chart-canvas

- `CanvasMark`: `type CanvasMark = { type: 'line'; points: readonly (readonly [number, number])[]; color: string; width?: number; } | { type: 'area'; points: readonly (readonly [number, number])[]; color: string; baseline: number; opacity?: number; } | { type: 'point'; x: number; y: number; radius?: number; color: string; } | { type: 'rect'; x: number; y: number; width: number; height: number; color: string; opacity?: number; };`
- `drawChartCanvas`: `(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, marks: readonly CanvasMark[], width: number, height: number, pixelRatio?: number) => void`
- `supportsWorkerCanvas`: `() => boolean`

## ./chart-export

- `ChartExportPoint`: `type ChartExportPoint = { seriesId: string; index: number; xValue: ChartValue; yValue: number; };`
- `chartToCsv`: `(points: readonly ChartExportPoint[], delimiter?: string, headers?: readonly [string, string, string, string]) => string`
- `copyChartText`: `(text: string) => Promise<void>`
- `downloadChartBlob`: `(blob: Blob, filename: string) => void`
- `printChart`: `(svg: string) => void`
- `svgToDataUri`: `(svg: string) => string`
- `svgToPng`: `(svg: string, width: number, height: number) => Promise<Blob>`

## ./chart-responsive

- `ChartResponsiveContainer`: `({ aspectRatio, minWidth, minHeight, children }: { aspectRatio?: number; minWidth?: number; minHeight?: number; children: (size: ChartResponsiveSize) => ReactNode; }) => JSXInternal.Element`
- `ChartResponsiveSize`: `type ChartResponsiveSize = { width: number; height: number };`

## ./chart-motion

- `animated`: `Record<string, FunctionalComponent<React.PropsWithoutRef<AnimatedProps> & { ref?: Ref<Element>; }>>`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `useMotion`: `<T extends Element>(definition: MotionDefinition) => { ref: import("preact").RefObject<T>; controls: import("preact/hooks").MutableRef<MotionControls | null>; }`

## ./accordion

- `Accordion`: `({ children, type, defaultValue, }: PropsWithChildren<{ type?: "single" | "multiple"; defaultValue?: string[]; }>) => JSXInternal.Element`
- `AccordionContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element | null`
- `AccordionItem`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSXInternal.Element`
- `AccordionTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`

## ./alert-dialog

- `AlertDialog`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `AlertDialogAction`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `AlertDialogCancel`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `AlertDialogContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `AlertDialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `AlertDialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `AlertDialogTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./alert

- `Alert`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { urgent?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`

## ./aspect-ratio

- `AspectRatio`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { ratio?: number; }> & { ref?: Ref<HTMLDivElement>; }>`

## ./avatar

- `Avatar`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { src?: string; alt: string; fallback: ReactNode; imageProps?: ImgHTMLAttributes<HTMLImageElement>; }> & { ref?: Ref<HTMLSpanElement>; }>`

## ./badge

- `Badge`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; status?: boolean; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`

## ./basic

- `Accordion`: `({ children, type, defaultValue, }: PropsWithChildren<{ type?: "single" | "multiple"; defaultValue?: string[]; }>) => JSXInternal.Element`
- `AccordionContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element | null`
- `AccordionItem`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSXInternal.Element`
- `AccordionTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `Alert`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { urgent?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `AspectRatio`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { ratio?: number; }> & { ref?: Ref<HTMLDivElement>; }>`
- `Badge`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; status?: boolean; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`
- `Button`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: "primary" | "secondary" | "destructive" | "quiet"; size?: "sm" | "md" | "lg"; fullWidth?: boolean; iconOnly?: boolean; }> & { ref?: Ref<HTMLButtonElement>; }>`
- `Card`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `CardFooter`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardTitle`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & { ref?: Ref<HTMLHeadingElement>; }>`
- `Checkbox`: `(props: CheckProps) => JSXInternal.Element`
- `Field`: `FunctionalComponent<React.PropsWithoutRef<FieldsetHTMLAttributes<HTMLFieldSetElement>> & { ref?: Ref<HTMLFieldSetElement>; }>`
- `FieldDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `FieldError`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `FieldLegend`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLLegendElement>> & { ref?: Ref<HTMLLegendElement>; }>`
- `Form`: `FunctionalComponent<React.PropsWithoutRef<FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean; }> & { ref?: Ref<HTMLFormElement>; }>`
- `FormErrorSummary`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `Input`: `FunctionalComponent<React.PropsWithoutRef<InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLInputElement>; }>`
- `Label`: `FunctionalComponent<React.PropsWithoutRef<LabelHTMLAttributes<HTMLLabelElement>> & { ref?: Ref<HTMLLabelElement>; }>`
- `Link`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; external?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`
- `NativeSelect`: `FunctionalComponent<React.PropsWithoutRef<SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLSelectElement>; }>`
- `NumberInput`: `FunctionalComponent<React.PropsWithoutRef<NumberInputProps> & { ref?: Ref<HTMLInputElement>; }>`
- `Pagination`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement> & { label?: string; }> & { ref?: Ref<HTMLElement>; }>`
- `PaginationContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLUListElement>> & { ref?: Ref<HTMLUListElement>; }>`
- `PaginationItem`: `FunctionalComponent<React.PropsWithoutRef<LiHTMLAttributes<HTMLLIElement>> & { ref?: Ref<HTMLLIElement>; }>`
- `PaginationLink`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`
- `Progress`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { value?: number | null; max?: number; getValueLabel?: (value: number, max: number) => string; }> & { ref?: Ref<HTMLDivElement>; }>`
- `RadioGroup`: `({ children, value, defaultValue, onValueChange, name, required, disabled, direction, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; name?: string; required?: boolean; disabled?: boolean; direction?: Direction; }>) => JSXInternal.Element`
- `RadioGroupItem`: `({ value, disabled, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & { value: string; }) => JSXInternal.Element`
- `Rating`: `FunctionalComponent<React.PropsWithoutRef<RatingProps> & { ref?: Ref<HTMLDivElement>; }>`
- `RatingProps`: `type RatingProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; };`
- `Separator`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `Skeleton`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { label?: string; }> & { ref?: Ref<HTMLDivElement>; }>`
- `Spinner`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { label?: string; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `Switch`: `(props: CheckProps) => JSXInternal.Element`
- `Table`: `FunctionalComponent<React.PropsWithoutRef<TableHTMLAttributes<HTMLTableElement>> & { ref?: Ref<HTMLTableElement>; }>`
- `TableBody`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableCaption`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableCaptionElement>> & { ref?: Ref<HTMLTableCaptionElement>; }>`
- `TableCell`: `FunctionalComponent<React.PropsWithoutRef<TdHTMLAttributes<HTMLTableCellElement>> & { ref?: Ref<HTMLTableCellElement>; }>`
- `TableFooter`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableHead`: `FunctionalComponent<React.PropsWithoutRef<ThHTMLAttributes<HTMLTableCellElement>> & { ref?: Ref<HTMLTableCellElement>; }>`
- `TableHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableRow`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableRowElement>> & { ref?: Ref<HTMLTableRowElement>; }>`
- `Tabs`: `({ value, defaultValue, onValueChange, orientation, direction, children, }: PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void; orientation?: Orientation; direction?: Direction; }>) => JSXInternal.Element`
- `TabsContent`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSXInternal.Element | null`
- `TabsList`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `TabsTrigger`: `({ value, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSXInternal.Element`
- `TagsInput`: `FunctionalComponent<React.PropsWithoutRef<TagsInputProps> & { ref?: Ref<HTMLInputElement>; }>`
- `Textarea`: `FunctionalComponent<React.PropsWithoutRef<TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLTextAreaElement>; }>`
- `VisuallyHidden`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement>> & { ref?: Ref<HTMLSpanElement>; }>`

## ./breadcrumb

- `Breadcrumb`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement> & { label?: string; }> & { ref?: Ref<HTMLElement>; }>`

## ./button-group

- `ButtonGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ButtonGroupSeparator`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { orientation?: Orientation; }> & { ref?: Ref<HTMLSpanElement>; }>`
- `ButtonGroupText`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement>> & { ref?: Ref<HTMLSpanElement>; }>`

## ./button

- `Button`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; variant?: "primary" | "secondary" | "destructive" | "quiet"; size?: "sm" | "md" | "lg"; fullWidth?: boolean; iconOnly?: boolean; }> & { ref?: Ref<HTMLButtonElement>; }>`

## ./calendar

- `Calendar`: `({ value, defaultValue, month, defaultMonth, locale, direction, firstDayOfWeek, min, max, disabledDates, name, label, onValueChange, onMonthChange, }: CalendarProps) => JSXInternal.Element`
- `CalendarProps`: `type CalendarProps = { value?: string; defaultValue?: string; month?: string; defaultMonth?: string; locale?: string; direction?: Direction; firstDayOfWeek?: number; min?: string; max?: string; disabledDates?: string[]; name?: string; label?: string; onValueChange?: (value: string) => void; onMonthChange?: (month: string) => void; };`

## ./card

- `Card`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `CardFooter`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `CardTitle`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & { ref?: Ref<HTMLHeadingElement>; }>`

## ./carousel

- `Carousel`: `({ label, direction, loop, defaultIndex, onIndexChange, onKeyDown, children, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; loop?: boolean; defaultIndex?: number; onIndexChange?: (index: number) => void; }) => React.JSX.Element`
- `CarouselContent`: `({ children, ...props }: HTMLAttributes<HTMLDivElement>) => React.JSX.Element`
- `CarouselItem`: `FunctionalComponent<React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> & { ref?: React.Ref<HTMLDivElement>; }>`
- `CarouselNext`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`
- `CarouselPrevious`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => React.JSX.Element`

## ./chart

- `AreaChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `BarChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `BubbleChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `ChartBrush`: `(props: SVGAttributes<SVGRectElement>) => JSXInternal.Element`
- `ChartCrosshair`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `ChartDataTable`: `<T>({ data, columns, pageSize, locale }: { data: readonly T[]; columns: readonly { label: string; value: ChartAccessor<T>; }[]; pageSize?: number; locale?: Partial<ChartLocale>; }) => JSXInternal.Element`
- `ChartGrid`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `ChartLegend`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `ChartPlot`: `(props: SVGAttributes<SVGSVGElement>) => JSXInternal.Element`
- `ChartPointInteraction`: `type ChartPointInteraction<T> = Pick<PreparedPoint<T>, 'datum' | 'index' | 'x' | 'y' | 'xValue' | 'yValue' | 'radius'> & { seriesId: string };`
- `ChartProps`: `type ChartProps<T> = Omit<HTMLAttributes<HTMLElement>, 'title'> & { data?: readonly T[]; stream?: ChartStream<string>; x?: ChartAccessor<T>; y?: ChartAccessor<T, number>; series?: readonly ChartSeries<T>[]; accessibility: ChartAccessibility; width?: number; height?: number; xScale?: ChartScaleType; yScale?: Exclude<ChartScaleType, 'band'>; xDomain?: ChartDomain; yDomain?: ChartDomain; xAxis?: ChartAxisConfig; yAxis?: ChartAxisConfig; references?: readonly ChartReference[]; annotations?: readonly ChartAnnotation[]; dataLabels?: boolean | ChartDataLabelConfig; legend?: ChartLegendConfig; legendContent?: (series: readonly ChartSeries<T>[], hiddenSeries: readonly string[]) => ReactNode; visualMap?: ChartVisualMap; dataOptions?: ChartDataOptions<T>; streamControls?: boolean; streamAutoScroll?: boolean; streamAnnouncement?: boolean; centerLabel?: string; showTotal?: boolean; onSliceSelect?: (slice: { datum: T; index: number; value: number }) => void; drilldownDepth?: number; onDrilldown?: (event: ChartPointInteraction<T> | { datum: T; index: number; value: number }) => void; onDrilldownBack?: () => void; viewport?: { x?: ChartDomain; y?: ChartDomain }; defaultViewport?: { x?: ChartDomain; y?: ChartDomain }; interaction?: { zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy' }; sync?: ChartSync; onViewportChange?: (viewport: { x?: ChartDomain; y?: ChartDomain }) => void; onXDomainChange?: (domain: ChartDomain) => void; onYDomainChange?: (domain: ChartDomain) => void; onSelectionChange?: (selection: { start: readonly [number, number]; end: readonly [number, number] } | null) => void; onSelectedDataChange?: (data: readonly T[]) => void; onPointHover?: (point: ChartPointInteraction<T> | null) => void; onPointClick?: (point: ChartPointInteraction<T>) => void; onPointDoubleClick?: (point: ChartPointInteraction<T>) => void; onPointContextMenu?: (point: ChartPointInteraction<T>) => void; tooltipMode?: ChartTooltipMode; tooltipTrigger?: ChartTooltipTrigger; tooltipPosition?: ChartTooltipPosition; tooltipFormatter?: (point: ChartPointInteraction<T>) => ReactNode; tooltipContent?: (points: readonly ChartPointInteraction<T>[]) => ReactNode; renderMode?: ChartRenderMode; canvasThreshold?: number; workerProcessing?: boolean; viewportCulling?: boolean; progressiveChunkSize?: number; motion?: boolean; locale?: Partial<ChartLocale>; hiddenSeries?: readonly string[]; defaultHiddenSeries?: readonly string[]; onHiddenSeriesChange?: (series: string[]) => void; emptyContent?: ReactNode; orientation?: 'vertical' | 'horizontal'; innerRadius?: number; };`
- `ChartRoot`: `({ width, height, children, ...props }: HTMLAttributes<HTMLElement> & ChartContextValue) => JSXInternal.Element`
- `ChartTooltip`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `ChartXAxis`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `ChartYAxis`: `(props: SVGAttributes<SVGGElement>) => JSXInternal.Element`
- `ComboChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `DonutChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `HeatmapChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `LineChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `PieChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `RadarChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`
- `ScatterChart`: `<T>(props: ChartProps<T>) => JSXInternal.Element`

## ./checkbox

- `Checkbox`: `(props: CheckProps) => JSXInternal.Element`

## ./collapsible

- `Collapsible`: `({ open, defaultOpen, onOpenChange, children, }: PropsWithChildren<{ open?: boolean; defaultOpen?: boolean; onOpenChange?(open: boolean): void; }>) => JSXInternal.Element`
- `CollapsibleContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `CollapsibleTrigger`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`

## ./combobox

- `Combobox`: `({ options, name, value, defaultValue, required, disabled, placeholder, noResults, onValueChange, }: ComboboxProps) => JSXInternal.Element`
- `ComboboxProps`: `type ComboboxProps = { options: Array<Omit<SelectOption, 'label'> & { label: string }>; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; placeholder?: string; noResults?: ReactNode; onValueChange?: (value: string) => void; };`
- `SelectOption`: `type SelectOption = { value: string; label: ReactNode; disabled?: boolean; };`

## ./command

- `Command`: `(props: ComboboxProps) => JSXInternal.Element`

## ./context-menu

- `ContextMenu`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `ContextMenuContent`: `({ className, style, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `ContextMenuItem`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ContextMenuTrigger`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`

## ./date-picker

- `DatePicker`: `({ value, defaultValue, name, locale, label, placeholder, required, disabled, onValueChange, ...calendarProps }: DatePickerProps) => JSXInternal.Element`
- `DatePickerProps`: `type DatePickerProps = CalendarProps & { placeholder?: string; required?: boolean; disabled?: boolean; };`

## ./description-list

- `DescriptionList`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDListElement>> & { ref?: Ref<HTMLDListElement>; }>`
- `DescriptionListDetails`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement>> & { ref?: Ref<HTMLElement>; }>`
- `DescriptionListGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DescriptionListTerm`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement>> & { ref?: Ref<HTMLElement>; }>`

## ./dialog

- `Dialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DialogClose`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DialogContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `DialogOverlay`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DialogPortal`: `({ children }: PropsWithChildren) => VNode<any> | null`
- `DialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `DialogTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./disclosure

- `Disclosure`: `FunctionalComponent<React.PropsWithoutRef<React.JSX.DetailsHTMLAttributes<HTMLDetailsElement> & OpenProps> & { ref?: React.Ref<HTMLDetailsElement>; }>`
- `DisclosureContent`: `FunctionalComponent<React.PropsWithoutRef<React.HTMLAttributes<HTMLDivElement>> & { ref?: React.Ref<HTMLDivElement>; }>`
- `DisclosureSummary`: `FunctionalComponent<React.PropsWithoutRef<React.HTMLAttributes<HTMLElement>> & { ref?: React.Ref<HTMLElement>; }>`

## ./drawer

- `Drawer`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DrawerClose`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DrawerContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { side?: "top" | "bottom"; }> & { ref?: Ref<HTMLDivElement>; }>`
- `DrawerDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `DrawerTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `DrawerTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./dropdown-menu

- `DropdownMenu`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DropdownMenuContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `DropdownMenuItem`: `({ disabled, onSelect, ...props }: HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }) => JSXInternal.Element`
- `DropdownMenuTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./empty

- `Empty`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { status?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `EmptyHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyMedia`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `EmptyTitle`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & { ref?: Ref<HTMLHeadingElement>; }>`

## ./field

- `Field`: `FunctionalComponent<React.PropsWithoutRef<FieldsetHTMLAttributes<HTMLFieldSetElement>> & { ref?: Ref<HTMLFieldSetElement>; }>`
- `FieldDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `FieldError`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `FieldLegend`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLLegendElement>> & { ref?: Ref<HTMLLegendElement>; }>`

## ./file-upload

- `FileUpload`: `({ label, description, onFilesChange, accept, disabled, multiple, ...props }: FileUploadProps) => JSXInternal.Element`

## ./form

- `Form`: `FunctionalComponent<React.PropsWithoutRef<FormHTMLAttributes<HTMLFormElement> & { focusInvalid?: boolean; }> & { ref?: Ref<HTMLFormElement>; }>`
- `FormErrorSummary`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`

## ./hover-card

- `HoverCard`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `HoverCardContent`: `({ label, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; }) => JSXInternal.Element`
- `HoverCardTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./input-group

- `InputGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `InputGroupAddon`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { align?: "inline-start" | "inline-end" | "block-start" | "block-end"; decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `InputGroupText`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement>> & { ref?: Ref<HTMLSpanElement>; }>`

## ./input-otp

- `InputOtp`: `FunctionalComponent<React.PropsWithoutRef<Omit<InputHTMLAttributes<HTMLInputElement>, "maxLength"> & { length?: number; digitsOnly?: boolean; invalid?: boolean; }> & { ref?: Ref<HTMLInputElement>; }>`

## ./input

- `Input`: `FunctionalComponent<React.PropsWithoutRef<InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLInputElement>; }>`

## ./item

- `Item`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemActions`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemDescription`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLParagraphElement>> & { ref?: Ref<HTMLParagraphElement>; }>`
- `ItemGroup`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemMedia`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ItemTitle`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLHeadingElement>> & { ref?: Ref<HTMLHeadingElement>; }>`

## ./kbd

- `Kbd`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement>> & { ref?: Ref<HTMLElement>; }>`

## ./label

- `Label`: `FunctionalComponent<React.PropsWithoutRef<LabelHTMLAttributes<HTMLLabelElement>> & { ref?: Ref<HTMLLabelElement>; }>`

## ./link

- `Link`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; external?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`

## ./menubar

- `Menubar`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { label?: string; direction?: Direction; }> & { ref?: Ref<HTMLDivElement>; }>`
- `MenubarItem`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./meter

- `Meter`: `FunctionalComponent<React.PropsWithoutRef<MeterHTMLAttributes<HTMLMeterElement> & { label?: string; }> & { ref?: Ref<HTMLMeterElement>; }>`

## ./native-select

- `NativeSelect`: `FunctionalComponent<React.PropsWithoutRef<SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLSelectElement>; }>`

## ./navigation-menu

- `NavigationMenu`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement> & { label?: string; }> & { ref?: Ref<HTMLElement>; }>`
- `NavigationMenuItem`: `FunctionalComponent<React.PropsWithoutRef<LiHTMLAttributes<HTMLLIElement>> & { ref?: Ref<HTMLLIElement>; }>`
- `NavigationMenuLink`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`
- `NavigationMenuList`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLUListElement>> & { ref?: Ref<HTMLUListElement>; }>`

## ./number-input

- `NumberInput`: `FunctionalComponent<React.PropsWithoutRef<NumberInputProps> & { ref?: Ref<HTMLInputElement>; }>`

## ./overlays

- `AlertDialog`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `AlertDialogAction`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `AlertDialogCancel`: `(props: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`
- `AlertDialogContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `AlertDialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `AlertDialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `AlertDialogTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `ContextMenu`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `ContextMenuContent`: `({ className, style, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `ContextMenuItem`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ContextMenuTrigger`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `Dialog`: `({ children, ...props }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DialogClose`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DialogContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & { ref?: Ref<HTMLDivElement>; }>`
- `DialogDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `DialogTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `DialogTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Drawer`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DrawerClose`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DrawerContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { side?: "top" | "bottom"; }> & { ref?: Ref<HTMLDivElement>; }>`
- `DrawerDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `DrawerTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `DrawerTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `DropdownMenu`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `DropdownMenuContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `DropdownMenuItem`: `({ disabled, onSelect, ...props }: HTMLAttributes<HTMLDivElement> & { disabled?: boolean; onSelect?: () => void; }) => JSXInternal.Element`
- `DropdownMenuTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `HoverCard`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `HoverCardContent`: `({ label, ...props }: HTMLAttributes<HTMLDivElement> & { label?: string; }) => JSXInternal.Element`
- `HoverCardTrigger`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Popover`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `PopoverContent`: `({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `PopoverTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Sheet`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `SheetClose`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `SheetContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { side?: SheetSide; }> & { ref?: Ref<HTMLDivElement>; }>`
- `SheetDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `SheetTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `SheetTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `Tooltip`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `TooltipContent`: `({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `TooltipTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./pagination

- `Pagination`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLElement> & { label?: string; }> & { ref?: Ref<HTMLElement>; }>`
- `PaginationContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLUListElement>> & { ref?: Ref<HTMLUListElement>; }>`
- `PaginationItem`: `FunctionalComponent<React.PropsWithoutRef<LiHTMLAttributes<HTMLLIElement>> & { ref?: Ref<HTMLLIElement>; }>`
- `PaginationLink`: `FunctionalComponent<React.PropsWithoutRef<AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean; }> & { ref?: Ref<HTMLAnchorElement>; }>`

## ./password-input

- `PasswordInput`: `FunctionalComponent<React.PropsWithoutRef<PasswordInputProps> & { ref?: Ref<HTMLInputElement>; }>`

## ./popover

- `Popover`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `PopoverContent`: `({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `PopoverTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./progress

- `Progress`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { value?: number | null; max?: number; getValueLabel?: (value: number, max: number) => string; }> & { ref?: Ref<HTMLDivElement>; }>`

## ./radio-group

- `RadioGroup`: `({ children, value, defaultValue, onValueChange, name, required, disabled, direction, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; name?: string; required?: boolean; disabled?: boolean; direction?: Direction; }>) => JSXInternal.Element`
- `RadioGroupItem`: `({ value, disabled, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & { value: string; }) => JSXInternal.Element`

## ./rating

- `Rating`: `FunctionalComponent<React.PropsWithoutRef<RatingProps> & { ref?: Ref<HTMLDivElement>; }>`
- `RatingProps`: `type RatingProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: number; defaultValue?: number; max?: number; name?: string; disabled?: boolean; required?: boolean; onValueChange?: (value: number) => void; getLabel?: (value: number, max: number) => string; };`

## ./resizable

- `ResizableHandle`: `({ _boundary, onKeyDown, onPointerDown, ...props }: ResizableHandleProps) => React.JSX.Element`
- `ResizablePanel`: `(props: ResizablePanelProps) => React.JSX.Element`
- `ResizablePanelGroup`: `({ orientation, direction, children, ...props }: HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; }) => React.JSX.Element`

## ./scroll-area

- `ScrollArea`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: "vertical" | "horizontal" | "both"; label?: string; }> & { ref?: Ref<HTMLDivElement>; }>`

## ./select

- `Select`: `({ options, name, value, defaultValue, required, disabled, onValueChange, placeholder, }: { options: SelectOption[]; name?: string; value?: string; defaultValue?: string; required?: boolean; disabled?: boolean; onValueChange?: (value: string) => void; placeholder?: ReactNode; }) => JSXInternal.Element`
- `SelectOption`: `type SelectOption = { value: string; label: ReactNode; disabled?: boolean; };`

## ./separator

- `Separator`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; decorative?: boolean; }> & { ref?: Ref<HTMLDivElement>; }>`

## ./sheet

- `Sheet`: `({ children, ...props }: React.PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `SheetClose`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`
- `SheetContent`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { side?: SheetSide; }> & { ref?: Ref<HTMLDivElement>; }>`
- `SheetDescription`: `(props: HTMLAttributes<HTMLParagraphElement>) => JSXInternal.Element`
- `SheetSide`: `type SheetSide = 'top' | 'right' | 'bottom' | 'left';`
- `SheetTitle`: `(props: HTMLAttributes<HTMLHeadingElement>) => JSXInternal.Element`
- `SheetTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./sidebar

- `Sidebar`: `({ side, ...props }: HTMLAttributes<HTMLElement> & { side?: "start" | "end"; }) => JSXInternal.Element`
- `SidebarContent`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarFooter`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarGroup`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarHeader`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `SidebarMenu`: `(props: HTMLAttributes<HTMLUListElement>) => JSXInternal.Element`
- `SidebarProvider`: `({ open: controlledOpen, defaultOpen, onOpenChange, children, }: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `SidebarTrigger`: `({ onClick, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => JSXInternal.Element`

## ./skeleton

- `Skeleton`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { label?: string; }> & { ref?: Ref<HTMLDivElement>; }>`

## ./slider

- `Slider`: `FunctionalComponent<React.PropsWithoutRef<Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { invalid?: boolean; }> & { ref?: Ref<HTMLInputElement>; }>`

## ./specialty-charts

- `BoxPlotChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `CandlestickChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `FunnelChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `GaugeChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `GeoChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `HistogramChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `MapChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `OhlcChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `PolarAreaChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `SankeyChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `SpecialtyChart`: `({ kind, data, accessibility, width, height, ...native }: SpecialtyChartProps & { kind: SpecialtyChartKind; }) => JSXInternal.Element`
- `SpecialtyChartProps`: `type SpecialtyChartProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & { data: readonly SpecialtyDatum[]; accessibility: ChartAccessibility; width?: number; height?: number };`
- `TreemapChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `ViolinChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`
- `WaterfallChart`: `(props: SpecialtyChartProps) => JSXInternal.Element`

## ./spinner

- `Spinner`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement> & { label?: string; }> & { ref?: Ref<HTMLSpanElement>; }>`

## ./switch

- `Switch`: `(props: CheckProps) => JSXInternal.Element`

## ./table

- `Table`: `FunctionalComponent<React.PropsWithoutRef<TableHTMLAttributes<HTMLTableElement>> & { ref?: Ref<HTMLTableElement>; }>`
- `TableBody`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableCaption`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableCaptionElement>> & { ref?: Ref<HTMLTableCaptionElement>; }>`
- `TableCell`: `FunctionalComponent<React.PropsWithoutRef<TdHTMLAttributes<HTMLTableCellElement>> & { ref?: Ref<HTMLTableCellElement>; }>`
- `TableFooter`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableHead`: `FunctionalComponent<React.PropsWithoutRef<ThHTMLAttributes<HTMLTableCellElement>> & { ref?: Ref<HTMLTableCellElement>; }>`
- `TableHeader`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableSectionElement>> & { ref?: Ref<HTMLTableSectionElement>; }>`
- `TableRow`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLTableRowElement>> & { ref?: Ref<HTMLTableRowElement>; }>`

## ./tabs

- `Tabs`: `({ value, defaultValue, onValueChange, orientation, direction, children, }: PropsWithChildren<{ value?: string; defaultValue?: string; onValueChange?: (value: string) => void; orientation?: Orientation; direction?: Direction; }>) => JSXInternal.Element`
- `TabsContent`: `({ value, ...props }: HTMLAttributes<HTMLDivElement> & { value: string; }) => JSXInternal.Element | null`
- `TabsList`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `TabsTrigger`: `({ value, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSXInternal.Element`

## ./tags-input

- `TagsInput`: `FunctionalComponent<React.PropsWithoutRef<TagsInputProps> & { ref?: Ref<HTMLInputElement>; }>`
- `TagsInputProps`: `type TagsInputProps = Omit< HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' > & { value?: string[]; defaultValue?: string[]; name?: string; disabled?: boolean; readOnly?: boolean; required?: boolean; maxTags?: number; placeholder?: string; inputLabel?: string; getRemoveLabel?: (tag: string) => string; onValueChange?: (value: string[]) => void; };`

## ./textarea

- `Textarea`: `FunctionalComponent<React.PropsWithoutRef<TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean; }> & { ref?: Ref<HTMLTextAreaElement>; }>`

## ./toast

- `ToastMessage`: `type ToastMessage = { id: string; title: ReactNode; description?: ReactNode; duration?: number; };`
- `ToastProvider`: `({ children }: PropsWithChildren) => JSXInternal.Element`
- `ToastViewport`: `(props: HTMLAttributes<HTMLDivElement>) => JSXInternal.Element`
- `useToast`: `() => ToastContextValue`

## ./toggle-group

- `ToggleGroup`: `({ type, value, defaultValue, onValueChange, orientation, direction, children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; value?: string[]; defaultValue?: string[]; onValueChange?(value: string[]): void; orientation?: Orientation; direction?: Direction; }>) => JSXInternal.Element`
- `ToggleGroupItem`: `({ value, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { value: string; }) => JSXInternal.Element`

## ./toggle

- `Toggle`: `FunctionalComponent<React.PropsWithoutRef<Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & { pressed?: boolean; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void; }> & { ref?: Ref<HTMLButtonElement>; }>`

## ./toolbar

- `Toolbar`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLDivElement> & { orientation?: Orientation; direction?: Direction; label?: string; }> & { ref?: Ref<HTMLDivElement>; }>`
- `ToolbarButton`: `FunctionalComponent<React.PropsWithoutRef<ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./tooltip

- `Tooltip`: `(props: PropsWithChildren<OpenProps>) => JSXInternal.Element`
- `TooltipContent`: `({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => VNode<any> | null`
- `TooltipTrigger`: `FunctionalComponent<React.PropsWithoutRef<JSXInternal.ButtonHTMLAttributes<HTMLButtonElement>> & { ref?: Ref<HTMLButtonElement>; }>`

## ./tree

- `Tree`: `({ onKeyDown, ...props }: HTMLAttributes<HTMLUListElement>) => React.JSX.Element`
- `TreeItem`: `({ label, children, expandable, expanded: controlledExpanded, defaultExpanded, disabled, onExpandedChange, ...props }: TreeItemProps) => React.JSX.Element`

## ./visually-hidden

- `VisuallyHidden`: `FunctionalComponent<React.PropsWithoutRef<HTMLAttributes<HTMLSpanElement>> & { ref?: Ref<HTMLSpanElement>; }>`

