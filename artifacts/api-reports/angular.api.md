# @simurgh-ui/angular public API

Version snapshot: 0.3.2-beta.1

## Export map

```json
{
  ".": {
    "types": "./dist/index.d.ts",
    "default": "./dist/index.js"
  },
  "./all": {
    "types": "./dist/all.d.ts",
    "default": "./dist/all.js"
  },
  "./chart-interactions": {
    "types": "./dist/chart-interactions.d.ts",
    "default": "./dist/chart-interactions.js"
  },
  "./chart-stream": {
    "types": "./dist/chart-stream.d.ts",
    "default": "./dist/chart-stream.js"
  },
  "./chart-canvas": {
    "types": "./dist/chart-canvas.d.ts",
    "default": "./dist/chart-canvas.js"
  },
  "./chart-export": {
    "types": "./dist/chart-export.d.ts",
    "default": "./dist/chart-export.js"
  },
  "./chart-responsive": {
    "types": "./dist/chart-responsive.d.ts",
    "default": "./dist/chart-responsive.js"
  },
  "./chart-motion": {
    "types": "./dist/chart-motion.d.ts",
    "default": "./dist/chart-motion.js"
  },
  "./*": {
    "types": "./dist/components/*.d.ts",
    "default": "./dist/components/*.js"
  }
}
```

## .

- `AccordionComponent`: `typeof AccordionComponent`
- `AccordionItemComponent`: `typeof AccordionItemComponent`
- `AlertComponent`: `typeof AlertComponent`
- `AlertDialogActionDirective`: `typeof AlertDialogActionDirective`
- `AlertDialogCancelDirective`: `typeof AlertDialogCancelDirective`
- `AlertDialogComponent`: `typeof AlertDialogComponent`
- `AreaChartComponent`: `typeof AreaChartComponent`
- `AspectRatioComponent`: `typeof AspectRatioComponent`
- `AvatarComponent`: `typeof AvatarComponent`
- `BadgeComponent`: `typeof BadgeComponent`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`
- `BarChartComponent`: `typeof BarChartComponent`
- `BreadcrumbComponent`: `typeof BreadcrumbComponent`
- `BubbleChartComponent`: `typeof BubbleChartComponent`
- `ButtonComponent`: `typeof ButtonComponent`
- `ButtonGroupComponent`: `typeof ButtonGroupComponent`
- `ButtonGroupSeparatorComponent`: `typeof ButtonGroupSeparatorComponent`
- `ButtonGroupTextComponent`: `typeof ButtonGroupTextComponent`
- `CalendarComponent`: `typeof CalendarComponent`
- `CardComponent`: `typeof CardComponent`
- `CardContentComponent`: `typeof CardContentComponent`
- `CardDescriptionComponent`: `typeof CardDescriptionComponent`
- `CardFooterComponent`: `typeof CardFooterComponent`
- `CardHeaderComponent`: `typeof CardHeaderComponent`
- `CardTitleComponent`: `typeof CardTitleComponent`
- `CarouselComponent`: `typeof CarouselComponent`
- `CarouselContentComponent`: `typeof CarouselContentComponent`
- `CarouselItemComponent`: `typeof CarouselItemComponent`
- `CarouselNextComponent`: `typeof CarouselNextComponent`
- `CarouselPreviousComponent`: `typeof CarouselPreviousComponent`
- `ChartBaseComponent`: `typeof ChartBaseComponent`
- `ChartBrushDirective`: `typeof ChartBrushDirective`
- `ChartCrosshairDirective`: `typeof ChartCrosshairDirective`
- `ChartGridDirective`: `typeof ChartGridDirective`
- `ChartLegendDirective`: `typeof ChartLegendDirective`
- `ChartPlotComponent`: `typeof ChartPlotComponent`
- `ChartPointInteraction`: `type ChartPointInteraction<T = Datum> = { datum: T; index: number; x: number; y: number; xValue: string | number | Date; yValue: number; radius: number; seriesId: string };`
- `ChartRootComponent`: `typeof ChartRootComponent`
- `ChartTooltipDirective`: `typeof ChartTooltipDirective`
- `ChartXAxisDirective`: `typeof ChartXAxisDirective`
- `ChartYAxisDirective`: `typeof ChartYAxisDirective`
- `CheckboxComponent`: `typeof CheckboxComponent`
- `CollapsibleComponent`: `typeof CollapsibleComponent`
- `ComboboxComponent`: `typeof ComboboxComponent`
- `ComboChartComponent`: `typeof ComboChartComponent`
- `CommandComponent`: `typeof CommandComponent`
- `ContextMenuComponent`: `typeof ContextMenuComponent`
- `ContextMenuItemDirective`: `typeof ContextMenuItemDirective`
- `DatePickerComponent`: `typeof DatePickerComponent`
- `DescriptionListDetailsDirective`: `typeof DescriptionListDetailsDirective`
- `DescriptionListDirective`: `typeof DescriptionListDirective`
- `DescriptionListGroupDirective`: `typeof DescriptionListGroupDirective`
- `DescriptionListTermDirective`: `typeof DescriptionListTermDirective`
- `DialogComponent`: `typeof DialogComponent`
- `DisclosureComponent`: `typeof DisclosureComponent`
- `DisclosureContentDirective`: `typeof DisclosureContentDirective`
- `DisclosureSummaryDirective`: `typeof DisclosureSummaryDirective`
- `DonutChartComponent`: `typeof DonutChartComponent`
- `DrawerComponent`: `typeof DrawerComponent`
- `DropdownMenuComponent`: `typeof DropdownMenuComponent`
- `DropdownMenuItemDirective`: `typeof DropdownMenuItemDirective`
- `EmptyComponent`: `typeof EmptyComponent`
- `EmptyContentComponent`: `typeof EmptyContentComponent`
- `EmptyDescriptionComponent`: `typeof EmptyDescriptionComponent`
- `EmptyHeaderComponent`: `typeof EmptyHeaderComponent`
- `EmptyMediaComponent`: `typeof EmptyMediaComponent`
- `EmptyTitleComponent`: `typeof EmptyTitleComponent`
- `FieldComponent`: `typeof FieldComponent`
- `FieldDescriptionComponent`: `typeof FieldDescriptionComponent`
- `FieldErrorComponent`: `typeof FieldErrorComponent`
- `FieldLegendComponent`: `typeof FieldLegendComponent`
- `FileUploadComponent`: `typeof FileUploadComponent`
- `FormDirective`: `typeof FormDirective`
- `FormErrorSummaryComponent`: `typeof FormErrorSummaryComponent`
- `HeatmapChartComponent`: `typeof HeatmapChartComponent`
- `HoverCardComponent`: `typeof HoverCardComponent`
- `InputComponent`: `typeof InputComponent`
- `InputGroupAddonComponent`: `typeof InputGroupAddonComponent`
- `InputGroupComponent`: `typeof InputGroupComponent`
- `InputGroupTextComponent`: `typeof InputGroupTextComponent`
- `InputOtpComponent`: `typeof InputOtpComponent`
- `ItemActionsComponent`: `typeof ItemActionsComponent`
- `ItemComponent`: `typeof ItemComponent`
- `ItemContentComponent`: `typeof ItemContentComponent`
- `ItemDescriptionComponent`: `typeof ItemDescriptionComponent`
- `ItemGroupComponent`: `typeof ItemGroupComponent`
- `ItemMediaComponent`: `typeof ItemMediaComponent`
- `ItemTitleComponent`: `typeof ItemTitleComponent`
- `KbdComponent`: `typeof KbdComponent`
- `LabelComponent`: `typeof LabelComponent`
- `LineChartComponent`: `typeof LineChartComponent`
- `LinkComponent`: `typeof LinkComponent`
- `MenubarComponent`: `typeof MenubarComponent`
- `MenubarItemDirective`: `typeof MenubarItemDirective`
- `MeterComponent`: `typeof MeterComponent`
- `NativeSelectComponent`: `typeof NativeSelectComponent`
- `NavigationMenuComponent`: `typeof NavigationMenuComponent`
- `NavigationMenuItemDirective`: `typeof NavigationMenuItemDirective`
- `NavigationMenuLinkDirective`: `typeof NavigationMenuLinkDirective`
- `NavigationMenuListDirective`: `typeof NavigationMenuListDirective`
- `NumberInputComponent`: `typeof NumberInputComponent`
- `PaginationComponent`: `typeof PaginationComponent`
- `PaginationContentDirective`: `typeof PaginationContentDirective`
- `PaginationItemDirective`: `typeof PaginationItemDirective`
- `PaginationLinkDirective`: `typeof PaginationLinkDirective`
- `PasswordInputComponent`: `typeof PasswordInputComponent`
- `PieChartComponent`: `typeof PieChartComponent`
- `PopoverComponent`: `typeof PopoverComponent`
- `ProgressComponent`: `typeof ProgressComponent`
- `RadarChartComponent`: `typeof RadarChartComponent`
- `RadioGroupComponent`: `typeof RadioGroupComponent`
- `RadioGroupItemDirective`: `typeof RadioGroupItemDirective`
- `RatingComponent`: `typeof RatingComponent`
- `ResizableHandleComponent`: `typeof ResizableHandleComponent`
- `ResizablePanelComponent`: `typeof ResizablePanelComponent`
- `ResizablePanelGroupComponent`: `typeof ResizablePanelGroupComponent`
- `ScatterChartComponent`: `typeof ScatterChartComponent`
- `ScrollAreaComponent`: `typeof ScrollAreaComponent`
- `SelectComponent`: `typeof SelectComponent`
- `SelectOption`: `type SelectOption = { value: string; label: string; disabled?: boolean };`
- `SeparatorComponent`: `typeof SeparatorComponent`
- `SheetComponent`: `typeof SheetComponent`
- `SheetSide`: `type SheetSide = 'top' | 'right' | 'bottom' | 'left';`
- `SidebarContentDirective`: `typeof SidebarContentDirective`
- `SidebarDirective`: `typeof SidebarDirective`
- `SidebarFooterDirective`: `typeof SidebarFooterDirective`
- `SidebarGroupDirective`: `typeof SidebarGroupDirective`
- `SidebarHeaderDirective`: `typeof SidebarHeaderDirective`
- `SidebarMenuDirective`: `typeof SidebarMenuDirective`
- `SidebarProviderComponent`: `typeof SidebarProviderComponent`
- `SidebarTriggerDirective`: `typeof SidebarTriggerDirective`
- `SkeletonComponent`: `typeof SkeletonComponent`
- `SliderComponent`: `typeof SliderComponent`
- `SpinnerComponent`: `typeof SpinnerComponent`
- `SwitchComponent`: `typeof SwitchComponent`
- `TabDirective`: `typeof TabDirective`
- `TableBodyDirective`: `typeof TableBodyDirective`
- `TableCaptionDirective`: `typeof TableCaptionDirective`
- `TableCellDirective`: `typeof TableCellDirective`
- `TableDirective`: `typeof TableDirective`
- `TableFooterDirective`: `typeof TableFooterDirective`
- `TableHeadDirective`: `typeof TableHeadDirective`
- `TableHeaderDirective`: `typeof TableHeaderDirective`
- `TableRowDirective`: `typeof TableRowDirective`
- `TabPanelDirective`: `typeof TabPanelDirective`
- `TabsComponent`: `typeof TabsComponent`
- `TagsInputComponent`: `typeof TagsInputComponent`
- `TextareaComponent`: `typeof TextareaComponent`
- `ToastMessage`: `type ToastMessage = { id: string; title: string; description?: string };`
- `ToastViewportComponent`: `typeof ToastViewportComponent`
- `ToggleComponent`: `typeof ToggleComponent`
- `ToggleGroupComponent`: `typeof ToggleGroupComponent`
- `ToggleGroupItemDirective`: `typeof ToggleGroupItemDirective`
- `ToolbarButtonDirective`: `typeof ToolbarButtonDirective`
- `ToolbarComponent`: `typeof ToolbarComponent`
- `TooltipComponent`: `typeof TooltipComponent`
- `TreeDirective`: `typeof TreeDirective`
- `TreeItemComponent`: `typeof TreeItemComponent`
- `VisuallyHiddenComponent`: `typeof VisuallyHiddenComponent`

## ./all

- `AccordionComponent`: `typeof AccordionComponent`
- `AccordionItemComponent`: `typeof AccordionItemComponent`
- `AlertComponent`: `typeof AlertComponent`
- `AlertDialogActionDirective`: `typeof AlertDialogActionDirective`
- `AlertDialogCancelDirective`: `typeof AlertDialogCancelDirective`
- `AlertDialogComponent`: `typeof AlertDialogComponent`
- `AreaChartComponent`: `typeof AreaChartComponent`
- `AspectRatioComponent`: `typeof AspectRatioComponent`
- `AvatarComponent`: `typeof AvatarComponent`
- `BadgeComponent`: `typeof BadgeComponent`
- `BarChartComponent`: `typeof BarChartComponent`
- `BreadcrumbComponent`: `typeof BreadcrumbComponent`
- `BubbleChartComponent`: `typeof BubbleChartComponent`
- `ButtonComponent`: `typeof ButtonComponent`
- `ButtonGroupComponent`: `typeof ButtonGroupComponent`
- `ButtonGroupSeparatorComponent`: `typeof ButtonGroupSeparatorComponent`
- `ButtonGroupTextComponent`: `typeof ButtonGroupTextComponent`
- `CalendarComponent`: `typeof CalendarComponent`
- `CardComponent`: `typeof CardComponent`
- `CardContentComponent`: `typeof CardContentComponent`
- `CardDescriptionComponent`: `typeof CardDescriptionComponent`
- `CardFooterComponent`: `typeof CardFooterComponent`
- `CardHeaderComponent`: `typeof CardHeaderComponent`
- `CardTitleComponent`: `typeof CardTitleComponent`
- `CarouselComponent`: `typeof CarouselComponent`
- `CarouselContentComponent`: `typeof CarouselContentComponent`
- `CarouselItemComponent`: `typeof CarouselItemComponent`
- `CarouselNextComponent`: `typeof CarouselNextComponent`
- `CarouselPreviousComponent`: `typeof CarouselPreviousComponent`
- `ChartBaseComponent`: `typeof ChartBaseComponent`
- `ChartBrushDirective`: `typeof ChartBrushDirective`
- `ChartCrosshairDirective`: `typeof ChartCrosshairDirective`
- `ChartGridDirective`: `typeof ChartGridDirective`
- `ChartLegendDirective`: `typeof ChartLegendDirective`
- `ChartPlotComponent`: `typeof ChartPlotComponent`
- `ChartRootComponent`: `typeof ChartRootComponent`
- `ChartTooltipDirective`: `typeof ChartTooltipDirective`
- `ChartXAxisDirective`: `typeof ChartXAxisDirective`
- `ChartYAxisDirective`: `typeof ChartYAxisDirective`
- `CheckboxComponent`: `typeof CheckboxComponent`
- `CollapsibleComponent`: `typeof CollapsibleComponent`
- `ComboboxComponent`: `typeof ComboboxComponent`
- `ComboChartComponent`: `typeof ComboChartComponent`
- `CommandComponent`: `typeof CommandComponent`
- `ContextMenuComponent`: `typeof ContextMenuComponent`
- `ContextMenuItemDirective`: `typeof ContextMenuItemDirective`
- `DatePickerComponent`: `typeof DatePickerComponent`
- `DescriptionListDetailsDirective`: `typeof DescriptionListDetailsDirective`
- `DescriptionListDirective`: `typeof DescriptionListDirective`
- `DescriptionListGroupDirective`: `typeof DescriptionListGroupDirective`
- `DescriptionListTermDirective`: `typeof DescriptionListTermDirective`
- `DialogComponent`: `typeof DialogComponent`
- `DisclosureComponent`: `typeof DisclosureComponent`
- `DisclosureContentDirective`: `typeof DisclosureContentDirective`
- `DisclosureSummaryDirective`: `typeof DisclosureSummaryDirective`
- `DonutChartComponent`: `typeof DonutChartComponent`
- `DrawerComponent`: `typeof DrawerComponent`
- `DropdownMenuComponent`: `typeof DropdownMenuComponent`
- `DropdownMenuItemDirective`: `typeof DropdownMenuItemDirective`
- `EmptyComponent`: `typeof EmptyComponent`
- `EmptyContentComponent`: `typeof EmptyContentComponent`
- `EmptyDescriptionComponent`: `typeof EmptyDescriptionComponent`
- `EmptyHeaderComponent`: `typeof EmptyHeaderComponent`
- `EmptyMediaComponent`: `typeof EmptyMediaComponent`
- `EmptyTitleComponent`: `typeof EmptyTitleComponent`
- `FieldComponent`: `typeof FieldComponent`
- `FieldDescriptionComponent`: `typeof FieldDescriptionComponent`
- `FieldErrorComponent`: `typeof FieldErrorComponent`
- `FieldLegendComponent`: `typeof FieldLegendComponent`
- `FileUploadComponent`: `typeof FileUploadComponent`
- `FormDirective`: `typeof FormDirective`
- `FormErrorSummaryComponent`: `typeof FormErrorSummaryComponent`
- `HeatmapChartComponent`: `typeof HeatmapChartComponent`
- `HoverCardComponent`: `typeof HoverCardComponent`
- `InputComponent`: `typeof InputComponent`
- `InputGroupAddonComponent`: `typeof InputGroupAddonComponent`
- `InputGroupComponent`: `typeof InputGroupComponent`
- `InputGroupTextComponent`: `typeof InputGroupTextComponent`
- `InputOtpComponent`: `typeof InputOtpComponent`
- `ItemActionsComponent`: `typeof ItemActionsComponent`
- `ItemComponent`: `typeof ItemComponent`
- `ItemContentComponent`: `typeof ItemContentComponent`
- `ItemDescriptionComponent`: `typeof ItemDescriptionComponent`
- `ItemGroupComponent`: `typeof ItemGroupComponent`
- `ItemMediaComponent`: `typeof ItemMediaComponent`
- `ItemTitleComponent`: `typeof ItemTitleComponent`
- `KbdComponent`: `typeof KbdComponent`
- `LabelComponent`: `typeof LabelComponent`
- `LineChartComponent`: `typeof LineChartComponent`
- `LinkComponent`: `typeof LinkComponent`
- `MenubarComponent`: `typeof MenubarComponent`
- `MenubarItemDirective`: `typeof MenubarItemDirective`
- `MeterComponent`: `typeof MeterComponent`
- `NativeSelectComponent`: `typeof NativeSelectComponent`
- `NavigationMenuComponent`: `typeof NavigationMenuComponent`
- `NavigationMenuItemDirective`: `typeof NavigationMenuItemDirective`
- `NavigationMenuLinkDirective`: `typeof NavigationMenuLinkDirective`
- `NavigationMenuListDirective`: `typeof NavigationMenuListDirective`
- `NumberInputComponent`: `typeof NumberInputComponent`
- `PaginationComponent`: `typeof PaginationComponent`
- `PaginationContentDirective`: `typeof PaginationContentDirective`
- `PaginationItemDirective`: `typeof PaginationItemDirective`
- `PaginationLinkDirective`: `typeof PaginationLinkDirective`
- `PasswordInputComponent`: `typeof PasswordInputComponent`
- `PieChartComponent`: `typeof PieChartComponent`
- `PopoverComponent`: `typeof PopoverComponent`
- `ProgressComponent`: `typeof ProgressComponent`
- `RadarChartComponent`: `typeof RadarChartComponent`
- `RadioGroupComponent`: `typeof RadioGroupComponent`
- `RadioGroupItemDirective`: `typeof RadioGroupItemDirective`
- `RatingComponent`: `typeof RatingComponent`
- `ResizableHandleComponent`: `typeof ResizableHandleComponent`
- `ResizablePanelComponent`: `typeof ResizablePanelComponent`
- `ResizablePanelGroupComponent`: `typeof ResizablePanelGroupComponent`
- `ScatterChartComponent`: `typeof ScatterChartComponent`
- `ScrollAreaComponent`: `typeof ScrollAreaComponent`
- `SelectComponent`: `typeof SelectComponent`
- `SeparatorComponent`: `typeof SeparatorComponent`
- `SheetComponent`: `typeof SheetComponent`
- `SidebarContentDirective`: `typeof SidebarContentDirective`
- `SidebarDirective`: `typeof SidebarDirective`
- `SidebarFooterDirective`: `typeof SidebarFooterDirective`
- `SidebarGroupDirective`: `typeof SidebarGroupDirective`
- `SidebarHeaderDirective`: `typeof SidebarHeaderDirective`
- `SidebarMenuDirective`: `typeof SidebarMenuDirective`
- `SidebarProviderComponent`: `typeof SidebarProviderComponent`
- `SidebarTriggerDirective`: `typeof SidebarTriggerDirective`
- `SIMURGH_COMPONENTS`: `readonly [typeof DialogComponent, typeof AlertDialogComponent, typeof AlertDialogActionDirective, typeof AlertDialogCancelDirective, typeof SheetComponent, typeof DrawerComponent, typeof PopoverComponent, typeof TooltipComponent, typeof HoverCardComponent, typeof DropdownMenuComponent, typeof DropdownMenuItemDirective, typeof ContextMenuComponent, typeof ContextMenuItemDirective, typeof SelectComponent, typeof NativeSelectComponent, typeof ComboboxComponent, typeof CommandComponent, typeof CalendarComponent, typeof DatePickerComponent, typeof CarouselComponent, typeof CarouselContentComponent, typeof CarouselItemComponent, typeof CarouselPreviousComponent, typeof CarouselNextComponent, typeof ResizablePanelGroupComponent, typeof ResizablePanelComponent, typeof ResizableHandleComponent, typeof SidebarProviderComponent, typeof SidebarDirective, typeof SidebarTriggerDirective, typeof SidebarHeaderDirective, typeof SidebarContentDirective, typeof SidebarFooterDirective, typeof SidebarGroupDirective, typeof SidebarMenuDirective, typeof TreeDirective, typeof TreeItemComponent, typeof FileUploadComponent, typeof PasswordInputComponent, typeof NumberInputComponent, typeof RatingComponent, typeof TagsInputComponent, typeof TabsComponent, typeof TabDirective, typeof TabPanelDirective, typeof AccordionComponent, typeof AccordionItemComponent, typeof CheckboxComponent, typeof LabelComponent, typeof SeparatorComponent, typeof ProgressComponent, typeof ChartBaseComponent, typeof ChartRootComponent, typeof ChartPlotComponent, typeof ChartGridDirective, typeof ChartXAxisDirective, typeof ChartYAxisDirective, typeof ChartLegendDirective, typeof ChartTooltipDirective, typeof ChartCrosshairDirective, typeof ChartBrushDirective, typeof LineChartComponent, typeof AreaChartComponent, typeof BarChartComponent, typeof PieChartComponent, typeof DonutChartComponent, typeof ScatterChartComponent, typeof BubbleChartComponent, typeof RadarChartComponent, typeof HeatmapChartComponent, typeof ComboChartComponent, typeof ToggleComponent, typeof VisuallyHiddenComponent, typeof AvatarComponent, typeof AlertComponent, typeof AspectRatioComponent, typeof SkeletonComponent, typeof SpinnerComponent, typeof ButtonComponent, typeof ButtonGroupComponent, typeof ButtonGroupTextComponent, typeof ButtonGroupSeparatorComponent, typeof LinkComponent, typeof InputComponent, typeof InputGroupComponent, typeof InputGroupAddonComponent, typeof InputGroupTextComponent, typeof InputOtpComponent, typeof SliderComponent, typeof MeterComponent, typeof ToolbarComponent, typeof ToolbarButtonDirective, typeof ToggleGroupComponent, typeof ToggleGroupItemDirective, typeof ScrollAreaComponent, typeof TextareaComponent, typeof BadgeComponent, typeof BreadcrumbComponent, typeof NavigationMenuComponent, typeof NavigationMenuListDirective, typeof NavigationMenuItemDirective, typeof NavigationMenuLinkDirective, typeof MenubarComponent, typeof MenubarItemDirective, typeof CardComponent, typeof CardHeaderComponent, typeof CardTitleComponent, typeof CardDescriptionComponent, typeof CardContentComponent, typeof CardFooterComponent, typeof EmptyComponent, typeof EmptyHeaderComponent, typeof EmptyMediaComponent, typeof EmptyTitleComponent, typeof EmptyDescriptionComponent, typeof EmptyContentComponent, typeof ItemGroupComponent, typeof ItemComponent, typeof ItemMediaComponent, typeof ItemContentComponent, typeof ItemTitleComponent, typeof ItemDescriptionComponent, typeof ItemActionsComponent, typeof KbdComponent, typeof FieldComponent, typeof FieldLegendComponent, typeof FieldDescriptionComponent, typeof FieldErrorComponent, typeof FormDirective, typeof FormErrorSummaryComponent, typeof TableDirective, typeof TableHeaderDirective, typeof TableBodyDirective, typeof TableFooterDirective, typeof TableRowDirective, typeof TableHeadDirective, typeof TableCellDirective, typeof TableCaptionDirective, typeof PaginationComponent, typeof PaginationContentDirective, typeof PaginationItemDirective, typeof PaginationLinkDirective, typeof CollapsibleComponent, typeof DisclosureComponent, typeof DisclosureSummaryDirective, typeof DisclosureContentDirective, typeof DescriptionListDirective, typeof DescriptionListGroupDirective, typeof DescriptionListTermDirective, typeof DescriptionListDetailsDirective, typeof SwitchComponent, typeof RadioGroupComponent, typeof RadioGroupItemDirective, typeof ToastViewportComponent]`
- `SkeletonComponent`: `typeof SkeletonComponent`
- `SliderComponent`: `typeof SliderComponent`
- `SpinnerComponent`: `typeof SpinnerComponent`
- `SwitchComponent`: `typeof SwitchComponent`
- `TabDirective`: `typeof TabDirective`
- `TableBodyDirective`: `typeof TableBodyDirective`
- `TableCaptionDirective`: `typeof TableCaptionDirective`
- `TableCellDirective`: `typeof TableCellDirective`
- `TableDirective`: `typeof TableDirective`
- `TableFooterDirective`: `typeof TableFooterDirective`
- `TableHeadDirective`: `typeof TableHeadDirective`
- `TableHeaderDirective`: `typeof TableHeaderDirective`
- `TableRowDirective`: `typeof TableRowDirective`
- `TabPanelDirective`: `typeof TabPanelDirective`
- `TabsComponent`: `typeof TabsComponent`
- `TagsInputComponent`: `typeof TagsInputComponent`
- `TextareaComponent`: `typeof TextareaComponent`
- `ToastViewportComponent`: `typeof ToastViewportComponent`
- `ToggleComponent`: `typeof ToggleComponent`
- `ToggleGroupComponent`: `typeof ToggleGroupComponent`
- `ToggleGroupItemDirective`: `typeof ToggleGroupItemDirective`
- `ToolbarButtonDirective`: `typeof ToolbarButtonDirective`
- `ToolbarComponent`: `typeof ToolbarComponent`
- `TooltipComponent`: `typeof TooltipComponent`
- `TreeDirective`: `typeof TreeDirective`
- `TreeItemComponent`: `typeof TreeItemComponent`
- `VisuallyHiddenComponent`: `typeof VisuallyHiddenComponent`

## ./chart-interactions

- `ChartBrushHandle`: `type ChartBrushHandle = 'start' | 'end' | 'start-y' | 'end-y';`
- `ChartInteractionConfig`: `type ChartInteractionConfig = { zoom?: boolean | 'x' | 'y' | 'xy'; pan?: boolean | 'x' | 'y' | 'xy'; brush?: boolean | 'x' | 'y' | 'xy'; };`
- `chartInteractionKey`: `(event: Pick<KeyboardEvent, "key" | "shiftKey">, viewport: ChartViewport) => { viewport: ChartViewport; clearSelection?: true; }`
- `ChartSelection`: `type ChartSelection = { start: readonly [number, number]; end: readonly [number, number]; } | null;`
- `ChartSync`: `type ChartSync = { readonly state: ChartSyncState; set(next: Partial<ChartSyncState>): void; subscribe(listener: (state: ChartSyncState) => void): () => void; };`
- `ChartSyncState`: `type ChartSyncState = { viewport: ChartViewport; selection: ChartSelection; focused?: { seriesId: string; index: number; } | null; };`
- `ChartViewport`: `type ChartViewport = { x?: ChartDomain; y?: ChartDomain; };`
- `clampDomain`: `(domain: ChartDomain, bounds?: ChartDomain) => ChartDomain`
- `createChartSync`: `(initial?: Partial<ChartSyncState>) => ChartSync`
- `domainFromSelection`: `(domain: ChartDomain, selection: readonly [number, number], pixels: readonly [number, number]) => ChartDomain`
- `nextChartIndex`: `(current: number, size: number, key: string, direction?: "ltr" | "rtl") => number`
- `panDomain`: `(domain: ChartDomain, fraction: number) => ChartDomain`
- `pinchZoomDomain`: `(domain: ChartDomain, startDistance: number, endDistance: number, anchor: number) => ChartDomain`
- `resizeChartSelection`: `(selection: Exclude<ChartSelection, null>, handle: ChartBrushHandle, point: readonly [number, number]) => Exclude<ChartSelection, null>`
- `selectionFromPoints`: `(start: readonly [number, number], end: readonly [number, number]) => ChartSelection`
- `SpatialGrid`: `typeof SpatialGrid`
- `zoomDomain`: `(domain: ChartDomain, factor: number, anchor?: number) => ChartDomain`

## ./chart-stream

- `ChartStream`: `type ChartStream<D extends string> = { readonly capacity: number; readonly dimensions: readonly D[]; readonly length: number; readonly window: number | undefined; readonly paused: boolean; append(batch: Readonly<Record<D, ArrayLike<number>>>): void; backfill(batch: Readonly<Record<D, ArrayLike<number>>>): void; clear(): void; setWindow(size?: number): void; pause(): void; resume(): void; snapshot(): ChartStreamSnapshot<D>; subscribe(listener: () => void): () => void; };`
- `ChartStreamSnapshot`: `type ChartStreamSnapshot<D extends string> = Readonly<{ length: number; version: number; columns: Readonly<Record<D, Float64Array>>; }>;`
- `createChartStream`: `<const D extends string>(options: { capacity: number; dimensions: readonly D[]; window?: number; }) => ChartStream<D>`

## ./chart-canvas

- `CanvasMark`: `type CanvasMark = { type: 'line'; points: readonly (readonly [number, number])[]; color: string; width?: number; } | { type: 'area'; points: readonly (readonly [number, number])[]; color: string; baseline: number; opacity?: number; } | { type: 'point'; x: number; y: number; radius?: number; color: string; } | { type: 'rect'; x: number; y: number; width: number; height: number; color: string; opacity?: number; };`
- `ChartWorkerInput`: `type ChartWorkerInput = { operation: 'decimate'; points: { x: number; y: number; }[]; width: number; } | { operation: 'heatmap'; points: { x: number; y: number; value?: number; }[]; columns: number; rows: number; };`
- `ChartWorkerRequest`: `type ChartWorkerRequest = { id: number; operation: 'decimate'; points: { x: number; y: number; }[]; width: number; } | { id: number; operation: 'heatmap'; points: { x: number; y: number; value?: number; }[]; columns: number; rows: number; };`
- `ChartWorkerResponse`: `type ChartWorkerResponse = { id: number; result?: unknown; error?: string; };`
- `createChartWorker`: `() => Worker | null`
- `drawChartCanvas`: `(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, marks: readonly CanvasMark[], width: number, height: number, pixelRatio?: number) => void`
- `drawChartCanvasProgressive`: `(context: CanvasRenderingContext2D, marks: readonly CanvasMark[], width: number, height: number, options?: { pixelRatio?: number; chunkSize?: number; }) => () => void`
- `drawChartWebGL`: `(context: WebGLRenderingContext, marks: readonly CanvasMark[], width: number, height: number) => boolean`
- `runChartWorker`: `<T>(worker: Worker, request: ChartWorkerInput) => Promise<T>`
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

- `ChartResponsiveContainerComponent`: `typeof ChartResponsiveContainerComponent`
- `ChartResponsiveSize`: `type ChartResponsiveSize = { width: number; height: number };`

## ./chart-motion

- `MotionController`: `typeof MotionController`
- `MotionDefinition`: `type MotionDefinition = { initial?: MotionTarget | string; animate?: MotionTarget | string; exit?: MotionTarget | string; whileHover?: MotionTarget | string; whilePress?: MotionTarget | string; whileFocus?: MotionTarget | string; whileInView?: MotionTarget | string; variants?: Record<string, MotionVariant>; transition?: MotionTransition; reducedMotion?: ReducedMotionMode; stagger?: number; onStart?: () => void; onComplete?: () => void; onCancel?: () => void; };`
- `ReducedMotionMode`: `type ReducedMotionMode = 'user' | 'always' | 'never';`
- `SimurghMotionDirective`: `typeof SimurghMotionDirective`

## ./accordion

- `AccordionComponent`: `typeof AccordionComponent`
- `AccordionItemComponent`: `typeof AccordionItemComponent`

## ./alert-dialog

- `AlertDialogActionDirective`: `typeof AlertDialogActionDirective`
- `AlertDialogCancelDirective`: `typeof AlertDialogCancelDirective`
- `AlertDialogComponent`: `typeof AlertDialogComponent`

## ./alert

- `AlertComponent`: `typeof AlertComponent`

## ./aspect-ratio

- `AspectRatioComponent`: `typeof AspectRatioComponent`

## ./avatar

- `AvatarComponent`: `typeof AvatarComponent`

## ./badge

- `BadgeComponent`: `typeof BadgeComponent`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`

## ./basic

- `AccordionComponent`: `typeof AccordionComponent`
- `AccordionItemComponent`: `typeof AccordionItemComponent`
- `AlertComponent`: `typeof AlertComponent`
- `BadgeComponent`: `typeof BadgeComponent`
- `BadgeTone`: `type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';`
- `ButtonComponent`: `typeof ButtonComponent`
- `CardComponent`: `typeof CardComponent`
- `CardContentComponent`: `typeof CardContentComponent`
- `CardDescriptionComponent`: `typeof CardDescriptionComponent`
- `CardFooterComponent`: `typeof CardFooterComponent`
- `CardHeaderComponent`: `typeof CardHeaderComponent`
- `CardTitleComponent`: `typeof CardTitleComponent`
- `CheckboxComponent`: `typeof CheckboxComponent`
- `InputComponent`: `typeof InputComponent`
- `LabelComponent`: `typeof LabelComponent`
- `NativeSelectComponent`: `typeof NativeSelectComponent`
- `NumberInputComponent`: `typeof NumberInputComponent`
- `ProgressComponent`: `typeof ProgressComponent`
- `RadioGroupComponent`: `typeof RadioGroupComponent`
- `RadioGroupItemDirective`: `typeof RadioGroupItemDirective`
- `RatingComponent`: `typeof RatingComponent`
- `SeparatorComponent`: `typeof SeparatorComponent`
- `SkeletonComponent`: `typeof SkeletonComponent`
- `SpinnerComponent`: `typeof SpinnerComponent`
- `SwitchComponent`: `typeof SwitchComponent`
- `TabDirective`: `typeof TabDirective`
- `TabPanelDirective`: `typeof TabPanelDirective`
- `TabsComponent`: `typeof TabsComponent`
- `TagsInputComponent`: `typeof TagsInputComponent`
- `TextareaComponent`: `typeof TextareaComponent`

## ./breadcrumb

- `BreadcrumbComponent`: `typeof BreadcrumbComponent`

## ./button-group

- `ButtonGroupComponent`: `typeof ButtonGroupComponent`
- `ButtonGroupSeparatorComponent`: `typeof ButtonGroupSeparatorComponent`
- `ButtonGroupTextComponent`: `typeof ButtonGroupTextComponent`

## ./button

- `ButtonComponent`: `typeof ButtonComponent`

## ./calendar

- `CalendarComponent`: `typeof CalendarComponent`

## ./card

- `CardComponent`: `typeof CardComponent`
- `CardContentComponent`: `typeof CardContentComponent`
- `CardDescriptionComponent`: `typeof CardDescriptionComponent`
- `CardFooterComponent`: `typeof CardFooterComponent`
- `CardHeaderComponent`: `typeof CardHeaderComponent`
- `CardTitleComponent`: `typeof CardTitleComponent`

## ./carousel

- `CarouselComponent`: `typeof CarouselComponent`
- `CarouselContentComponent`: `typeof CarouselContentComponent`
- `CarouselItemComponent`: `typeof CarouselItemComponent`
- `CarouselNextComponent`: `typeof CarouselNextComponent`
- `CarouselPreviousComponent`: `typeof CarouselPreviousComponent`

## ./chart

- `AreaChartComponent`: `typeof AreaChartComponent`
- `BarChartComponent`: `typeof BarChartComponent`
- `BubbleChartComponent`: `typeof BubbleChartComponent`
- `ChartBaseComponent`: `typeof ChartBaseComponent`
- `ChartBrushDirective`: `typeof ChartBrushDirective`
- `ChartCrosshairDirective`: `typeof ChartCrosshairDirective`
- `ChartGridDirective`: `typeof ChartGridDirective`
- `ChartLegendDirective`: `typeof ChartLegendDirective`
- `ChartPlotComponent`: `typeof ChartPlotComponent`
- `ChartPointInteraction`: `type ChartPointInteraction<T = Datum> = { datum: T; index: number; x: number; y: number; xValue: string | number | Date; yValue: number; radius: number; seriesId: string };`
- `ChartRootComponent`: `typeof ChartRootComponent`
- `ChartTooltipDirective`: `typeof ChartTooltipDirective`
- `ChartXAxisDirective`: `typeof ChartXAxisDirective`
- `ChartYAxisDirective`: `typeof ChartYAxisDirective`
- `ComboChartComponent`: `typeof ComboChartComponent`
- `DonutChartComponent`: `typeof DonutChartComponent`
- `HeatmapChartComponent`: `typeof HeatmapChartComponent`
- `LineChartComponent`: `typeof LineChartComponent`
- `PieChartComponent`: `typeof PieChartComponent`
- `RadarChartComponent`: `typeof RadarChartComponent`
- `ScatterChartComponent`: `typeof ScatterChartComponent`

## ./checkbox

- `CheckboxComponent`: `typeof CheckboxComponent`

## ./collapsible

- `CollapsibleComponent`: `typeof CollapsibleComponent`

## ./combobox

- `ComboboxComponent`: `typeof ComboboxComponent`
- `SelectOption`: `type SelectOption = { value: string; label: string; disabled?: boolean };`

## ./command

- `CommandComponent`: `typeof CommandComponent`

## ./context-menu

- `ContextMenuComponent`: `typeof ContextMenuComponent`
- `ContextMenuItemDirective`: `typeof ContextMenuItemDirective`

## ./date-picker

- `DatePickerComponent`: `typeof DatePickerComponent`

## ./description-list

- `DescriptionListDetailsDirective`: `typeof DescriptionListDetailsDirective`
- `DescriptionListDirective`: `typeof DescriptionListDirective`
- `DescriptionListGroupDirective`: `typeof DescriptionListGroupDirective`
- `DescriptionListTermDirective`: `typeof DescriptionListTermDirective`

## ./dialog

- `DialogComponent`: `typeof DialogComponent`

## ./disclosure

- `DisclosureComponent`: `typeof DisclosureComponent`
- `DisclosureContentDirective`: `typeof DisclosureContentDirective`
- `DisclosureSummaryDirective`: `typeof DisclosureSummaryDirective`

## ./drawer

- `DrawerComponent`: `typeof DrawerComponent`

## ./dropdown-menu

- `DropdownMenuComponent`: `typeof DropdownMenuComponent`
- `DropdownMenuItemDirective`: `typeof DropdownMenuItemDirective`

## ./empty

- `EmptyComponent`: `typeof EmptyComponent`
- `EmptyContentComponent`: `typeof EmptyContentComponent`
- `EmptyDescriptionComponent`: `typeof EmptyDescriptionComponent`
- `EmptyHeaderComponent`: `typeof EmptyHeaderComponent`
- `EmptyMediaComponent`: `typeof EmptyMediaComponent`
- `EmptyTitleComponent`: `typeof EmptyTitleComponent`

## ./field

- `FieldComponent`: `typeof FieldComponent`
- `FieldDescriptionComponent`: `typeof FieldDescriptionComponent`
- `FieldErrorComponent`: `typeof FieldErrorComponent`
- `FieldLegendComponent`: `typeof FieldLegendComponent`

## ./file-upload

- `FileUploadComponent`: `typeof FileUploadComponent`

## ./form

- `FormDirective`: `typeof FormDirective`
- `FormErrorSummaryComponent`: `typeof FormErrorSummaryComponent`

## ./hover-card

- `HoverCardComponent`: `typeof HoverCardComponent`

## ./input-group

- `InputGroupAddonComponent`: `typeof InputGroupAddonComponent`
- `InputGroupComponent`: `typeof InputGroupComponent`
- `InputGroupTextComponent`: `typeof InputGroupTextComponent`

## ./input-otp

- `InputOtpComponent`: `typeof InputOtpComponent`

## ./input

- `InputComponent`: `typeof InputComponent`

## ./item

- `ItemActionsComponent`: `typeof ItemActionsComponent`
- `ItemComponent`: `typeof ItemComponent`
- `ItemContentComponent`: `typeof ItemContentComponent`
- `ItemDescriptionComponent`: `typeof ItemDescriptionComponent`
- `ItemGroupComponent`: `typeof ItemGroupComponent`
- `ItemMediaComponent`: `typeof ItemMediaComponent`
- `ItemTitleComponent`: `typeof ItemTitleComponent`

## ./kbd

- `KbdComponent`: `typeof KbdComponent`

## ./label

- `LabelComponent`: `typeof LabelComponent`

## ./link

- `LinkComponent`: `typeof LinkComponent`

## ./menubar

- `MenubarComponent`: `typeof MenubarComponent`
- `MenubarItemDirective`: `typeof MenubarItemDirective`

## ./meter

- `MeterComponent`: `typeof MeterComponent`

## ./native-select

- `NativeSelectComponent`: `typeof NativeSelectComponent`

## ./navigation-menu

- `NavigationMenuComponent`: `typeof NavigationMenuComponent`
- `NavigationMenuItemDirective`: `typeof NavigationMenuItemDirective`
- `NavigationMenuLinkDirective`: `typeof NavigationMenuLinkDirective`
- `NavigationMenuListDirective`: `typeof NavigationMenuListDirective`

## ./number-input

- `NumberInputComponent`: `typeof NumberInputComponent`

## ./overlays

- `AlertDialogActionDirective`: `typeof AlertDialogActionDirective`
- `AlertDialogCancelDirective`: `typeof AlertDialogCancelDirective`
- `AlertDialogComponent`: `typeof AlertDialogComponent`
- `ContextMenuComponent`: `typeof ContextMenuComponent`
- `ContextMenuItemDirective`: `typeof ContextMenuItemDirective`
- `DialogComponent`: `typeof DialogComponent`
- `DrawerComponent`: `typeof DrawerComponent`
- `DropdownMenuComponent`: `typeof DropdownMenuComponent`
- `DropdownMenuItemDirective`: `typeof DropdownMenuItemDirective`
- `HoverCardComponent`: `typeof HoverCardComponent`
- `PopoverComponent`: `typeof PopoverComponent`
- `SheetComponent`: `typeof SheetComponent`
- `SheetSide`: `type SheetSide = 'top' | 'right' | 'bottom' | 'left';`
- `TooltipComponent`: `typeof TooltipComponent`

## ./pagination

- `PaginationComponent`: `typeof PaginationComponent`
- `PaginationContentDirective`: `typeof PaginationContentDirective`
- `PaginationItemDirective`: `typeof PaginationItemDirective`
- `PaginationLinkDirective`: `typeof PaginationLinkDirective`

## ./password-input

- `PasswordInputComponent`: `typeof PasswordInputComponent`

## ./popover

- `PopoverComponent`: `typeof PopoverComponent`

## ./progress

- `ProgressComponent`: `typeof ProgressComponent`

## ./radio-group

- `RadioGroupComponent`: `typeof RadioGroupComponent`
- `RadioGroupItemDirective`: `typeof RadioGroupItemDirective`

## ./rating

- `RatingComponent`: `typeof RatingComponent`

## ./resizable

- `ResizableHandleComponent`: `typeof ResizableHandleComponent`
- `ResizablePanelComponent`: `typeof ResizablePanelComponent`
- `ResizablePanelGroupComponent`: `typeof ResizablePanelGroupComponent`

## ./scroll-area

- `ScrollAreaComponent`: `typeof ScrollAreaComponent`

## ./select

- `SelectComponent`: `typeof SelectComponent`
- `SelectOption`: `type SelectOption = { value: string; label: string; disabled?: boolean };`

## ./separator

- `SeparatorComponent`: `typeof SeparatorComponent`

## ./sheet

- `SheetComponent`: `typeof SheetComponent`
- `SheetSide`: `type SheetSide = 'top' | 'right' | 'bottom' | 'left';`

## ./sidebar

- `SidebarContentDirective`: `typeof SidebarContentDirective`
- `SidebarDirective`: `typeof SidebarDirective`
- `SidebarFooterDirective`: `typeof SidebarFooterDirective`
- `SidebarGroupDirective`: `typeof SidebarGroupDirective`
- `SidebarHeaderDirective`: `typeof SidebarHeaderDirective`
- `SidebarMenuDirective`: `typeof SidebarMenuDirective`
- `SidebarProviderComponent`: `typeof SidebarProviderComponent`
- `SidebarTriggerDirective`: `typeof SidebarTriggerDirective`

## ./skeleton

- `SkeletonComponent`: `typeof SkeletonComponent`

## ./slider

- `SliderComponent`: `typeof SliderComponent`

## ./specialty-charts

- `BoxPlotChartComponent`: `typeof BoxPlotChartComponent`
- `CandlestickChartComponent`: `typeof CandlestickChartComponent`
- `FunnelChartComponent`: `typeof FunnelChartComponent`
- `GaugeChartComponent`: `typeof GaugeChartComponent`
- `GeoChartComponent`: `typeof GeoChartComponent`
- `HistogramChartComponent`: `typeof HistogramChartComponent`
- `MapChartComponent`: `typeof MapChartComponent`
- `OhlcChartComponent`: `typeof OhlcChartComponent`
- `PolarAreaChartComponent`: `typeof PolarAreaChartComponent`
- `SankeyChartComponent`: `typeof SankeyChartComponent`
- `SpecialtyChartComponent`: `typeof SpecialtyChartComponent`
- `TreemapChartComponent`: `typeof TreemapChartComponent`
- `ViolinChartComponent`: `typeof ViolinChartComponent`
- `WaterfallChartComponent`: `typeof WaterfallChartComponent`

## ./spinner

- `SpinnerComponent`: `typeof SpinnerComponent`

## ./switch

- `SwitchComponent`: `typeof SwitchComponent`

## ./table

- `TableBodyDirective`: `typeof TableBodyDirective`
- `TableCaptionDirective`: `typeof TableCaptionDirective`
- `TableCellDirective`: `typeof TableCellDirective`
- `TableDirective`: `typeof TableDirective`
- `TableFooterDirective`: `typeof TableFooterDirective`
- `TableHeadDirective`: `typeof TableHeadDirective`
- `TableHeaderDirective`: `typeof TableHeaderDirective`
- `TableRowDirective`: `typeof TableRowDirective`

## ./tabs

- `TabDirective`: `typeof TabDirective`
- `TabPanelDirective`: `typeof TabPanelDirective`
- `TabsComponent`: `typeof TabsComponent`

## ./tags-input

- `TagsInputComponent`: `typeof TagsInputComponent`

## ./textarea

- `TextareaComponent`: `typeof TextareaComponent`

## ./toast

- `ToastMessage`: `type ToastMessage = { id: string; title: string; description?: string };`
- `ToastViewportComponent`: `typeof ToastViewportComponent`

## ./toggle-group

- `ToggleGroupComponent`: `typeof ToggleGroupComponent`
- `ToggleGroupItemDirective`: `typeof ToggleGroupItemDirective`

## ./toggle

- `ToggleComponent`: `typeof ToggleComponent`

## ./toolbar

- `ToolbarButtonDirective`: `typeof ToolbarButtonDirective`
- `ToolbarComponent`: `typeof ToolbarComponent`

## ./tooltip

- `TooltipComponent`: `typeof TooltipComponent`

## ./tree

- `TreeDirective`: `typeof TreeDirective`
- `TreeItemComponent`: `typeof TreeItemComponent`

## ./visually-hidden

- `VisuallyHiddenComponent`: `typeof VisuallyHiddenComponent`

