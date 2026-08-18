import type { IconDefinition, IconGroup, IconRenderOptions } from './types.js';
import { explicitMirrorTransform, iconDirectionMode, iconDirectionStyles } from './direction.js';
import { definition as AccessKeyDefinition } from './definitions/access-key.js';
import { definition as AccessibilityDefinition } from './definitions/accessibility.js';
import { definition as AccountCircleDefinition } from './definitions/account-circle.js';
import { definition as AccountDefinition } from './definitions/account.js';
import { definition as ActivityChartDefinition } from './definitions/activity-chart.js';
import { definition as AdminDefinition } from './definitions/admin.js';
import { definition as AirplaneDefinition } from './definitions/airplane.js';
import { definition as AlarmOffDefinition } from './definitions/alarm-off.js';
import { definition as AlarmDefinition } from './definitions/alarm.js';
import { definition as AlignBottomDefinition } from './definitions/align-bottom.js';
import { definition as AlignCenterDefinition } from './definitions/align-center.js';
import { definition as AlignLeftDefinition } from './definitions/align-left.js';
import { definition as AlignMiddleDefinition } from './definitions/align-middle.js';
import { definition as AlignRightDefinition } from './definitions/align-right.js';
import { definition as AlignTopDefinition } from './definitions/align-top.js';
import { definition as AnalyticsDefinition } from './definitions/analytics.js';
import { definition as AnnouncementDefinition } from './definitions/announcement.js';
import { definition as AntivirusDefinition } from './definitions/antivirus.js';
import { definition as ApiDefinition } from './definitions/api.js';
import { definition as AppointmentDefinition } from './definitions/appointment.js';
import { definition as ArchiveDefinition } from './definitions/archive.js';
import { definition as AreaChartDefinition } from './definitions/area-chart.js';
import { definition as ArrowDownDefinition } from './definitions/arrow-down.js';
import { definition as ArrowLeftDefinition } from './definitions/arrow-left.js';
import { definition as ArrowRightDefinition } from './definitions/arrow-right.js';
import { definition as ArrowUpDefinition } from './definitions/arrow-up.js';
import { definition as AtSignDefinition } from './definitions/at-sign.js';
import { definition as AttachmentDefinition } from './definitions/attachment.js';
import { definition as AuthenticationDefinition } from './definitions/authentication.js';
import { definition as AvailableDefinition } from './definitions/available.js';
import { definition as BadgeCheckDefinition } from './definitions/badge-check.js';
import { definition as BanknoteDefinition } from './definitions/banknote.js';
import { definition as BarChartHorizontalDefinition } from './definitions/bar-chart-horizontal.js';
import { definition as BarChartStackedDefinition } from './definitions/bar-chart-stacked.js';
import { definition as BarChartDefinition } from './definitions/bar-chart.js';
import { definition as BarcodeDefinition } from './definitions/barcode.js';
import { definition as BasketDefinition } from './definitions/basket.js';
import { definition as BatteryChargingDefinition } from './definitions/battery-charging.js';
import { definition as BatteryLowDefinition } from './definitions/battery-low.js';
import { definition as BatteryDefinition } from './definitions/battery.js';
import { definition as BikeDefinition } from './definitions/bike.js';
import { definition as BinaryDefinition } from './definitions/binary.js';
import { definition as BluetoothDefinition } from './definitions/bluetooth.js';
import { definition as BracesDefinition } from './definitions/braces.js';
import { definition as BracketsDefinition } from './definitions/brackets.js';
import { definition as BreakpointDefinition } from './definitions/breakpoint.js';
import { definition as BroadcastDefinition } from './definitions/broadcast.js';
import { definition as BubbleChartDefinition } from './definitions/bubble-chart.js';
import { definition as BugShieldDefinition } from './definitions/bug-shield.js';
import { definition as BugDefinition } from './definitions/bug.js';
import { definition as BuildDefinition } from './definitions/build.js';
import { definition as BuildingDefinition } from './definitions/building.js';
import { definition as BuildingsDefinition } from './definitions/buildings.js';
import { definition as BusDefinition } from './definitions/bus.js';
import { definition as CalendarCheckDefinition } from './definitions/calendar-check.js';
import { definition as CalendarClockDefinition } from './definitions/calendar-clock.js';
import { definition as CalendarDaysDefinition } from './definitions/calendar-days.js';
import { definition as CalendarEditDefinition } from './definitions/calendar-edit.js';
import { definition as CalendarEventDefinition } from './definitions/calendar-event.js';
import { definition as CalendarLockDefinition } from './definitions/calendar-lock.js';
import { definition as CalendarMinusDefinition } from './definitions/calendar-minus.js';
import { definition as CalendarMonthDefinition } from './definitions/calendar-month.js';
import { definition as CalendarPlusDefinition } from './definitions/calendar-plus.js';
import { definition as CalendarRangeDefinition } from './definitions/calendar-range.js';
import { definition as CalendarSearchDefinition } from './definitions/calendar-search.js';
import { definition as CalendarSettingsDefinition } from './definitions/calendar-settings.js';
import { definition as CalendarStarDefinition } from './definitions/calendar-star.js';
import { definition as CalendarWeekDefinition } from './definitions/calendar-week.js';
import { definition as CalendarXDefinition } from './definitions/calendar-x.js';
import { definition as CalendarDefinition } from './definitions/calendar.js';
import { definition as CameraOffDefinition } from './definitions/camera-off.js';
import { definition as CameraDefinition } from './definitions/camera.js';
import { definition as CaptionsDefinition } from './definitions/captions.js';
import { definition as CarDefinition } from './definitions/car.js';
import { definition as CardCheckDefinition } from './definitions/card-check.js';
import { definition as CartCheckDefinition } from './definitions/cart-check.js';
import { definition as CartMinusDefinition } from './definitions/cart-minus.js';
import { definition as CartPlusDefinition } from './definitions/cart-plus.js';
import { definition as CartXDefinition } from './definitions/cart-x.js';
import { definition as CashRegisterDefinition } from './definitions/cash-register.js';
import { definition as CashDefinition } from './definitions/cash.js';
import { definition as CastDeviceDefinition } from './definitions/cast-device.js';
import { definition as CastDefinition } from './definitions/cast.js';
import { definition as CertificateDefinition } from './definitions/certificate.js';
import { definition as ChartAxisDefinition } from './definitions/chart-axis.js';
import { definition as ChartGridDefinition } from './definitions/chart-grid.js';
import { definition as ChartLabelDefinition } from './definitions/chart-label.js';
import { definition as ChartLegendDefinition } from './definitions/chart-legend.js';
import { definition as ChartPlusDefinition } from './definitions/chart-plus.js';
import { definition as ChartSettingsDefinition } from './definitions/chart-settings.js';
import { definition as ChartTooltipDefinition } from './definitions/chart-tooltip.js';
import { definition as CheckDefinition } from './definitions/check.js';
import { definition as CheckoutDefinition } from './definitions/checkout.js';
import { definition as ChevronDownDefinition } from './definitions/chevron-down.js';
import { definition as ChevronLeftDefinition } from './definitions/chevron-left.js';
import { definition as ChevronRightDefinition } from './definitions/chevron-right.js';
import { definition as ChevronUpDefinition } from './definitions/chevron-up.js';
import { definition as ChevronsDownDefinition } from './definitions/chevrons-down.js';
import { definition as ChevronsLeftDefinition } from './definitions/chevrons-left.js';
import { definition as ChevronsRightDefinition } from './definitions/chevrons-right.js';
import { definition as ChevronsUpDefinition } from './definitions/chevrons-up.js';
import { definition as ChildDefinition } from './definitions/child.js';
import { definition as ClapperboardDefinition } from './definitions/clapperboard.js';
import { definition as ClipboardTextDefinition } from './definitions/clipboard-text.js';
import { definition as ClipboardDefinition } from './definitions/clipboard.js';
import { definition as ClockCheckDefinition } from './definitions/clock-check.js';
import { definition as ClockPlusDefinition } from './definitions/clock-plus.js';
import { definition as ClockDefinition } from './definitions/clock.js';
import { definition as CloseDefinition } from './definitions/close.js';
import { definition as CloudCodeDefinition } from './definitions/cloud-code.js';
import { definition as CloudFileDefinition } from './definitions/cloud-file.js';
import { definition as CodeAltDefinition } from './definitions/code-alt.js';
import { definition as CodeDefinition } from './definitions/code.js';
import { definition as CoinsDefinition } from './definitions/coins.js';
import { definition as CollapseDefinition } from './definitions/collapse.js';
import { definition as ColumnChartDefinition } from './definitions/column-chart.js';
import { definition as Columns2Definition } from './definitions/columns-2.js';
import { definition as Columns3Definition } from './definitions/columns-3.js';
import { definition as CommandLineDefinition } from './definitions/command-line.js';
import { definition as CommunityDefinition } from './definitions/community.js';
import { definition as ComparisonChartDefinition } from './definitions/comparison-chart.js';
import { definition as CompassMapDefinition } from './definitions/compass-map.js';
import { definition as CompassDefinition } from './definitions/compass.js';
import { definition as ContactDefinition } from './definitions/contact.js';
import { definition as ContactsDefinition } from './definitions/contacts.js';
import { definition as ContainerDefinition } from './definitions/container.js';
import { definition as CopyDefinition } from './definitions/copy.js';
import { definition as CornerDownLeftDefinition } from './definitions/corner-down-left.js';
import { definition as CornerDownRightDefinition } from './definitions/corner-down-right.js';
import { definition as CornerUpLeftDefinition } from './definitions/corner-up-left.js';
import { definition as CornerUpRightDefinition } from './definitions/corner-up-right.js';
import { definition as CouponDefinition } from './definitions/coupon.js';
import { definition as CpuDefinition } from './definitions/cpu.js';
import { definition as CreditCardDefinition } from './definitions/credit-card.js';
import { definition as CrosshairLocationDefinition } from './definitions/crosshair-location.js';
import { definition as CurrentLocationDefinition } from './definitions/current-location.js';
import { definition as CustomerDefinition } from './definitions/customer.js';
import { definition as CutDefinition } from './definitions/cut.js';
import { definition as DashboardChartDefinition } from './definitions/dashboard-chart.js';
import { definition as DashboardDefinition } from './definitions/dashboard.js';
import { definition as DataTableDefinition } from './definitions/data-table.js';
import { definition as DatabaseDefinition } from './definitions/database.js';
import { definition as DateTodayDefinition } from './definitions/date-today.js';
import { definition as DateDefinition } from './definitions/date.js';
import { definition as DayDefinition } from './definitions/day.js';
import { definition as DebugDefinition } from './definitions/debug.js';
import { definition as DeliveryTruckDefinition } from './definitions/delivery-truck.js';
import { definition as DeployDefinition } from './definitions/deploy.js';
import { definition as DeselectDefinition } from './definitions/deselect.js';
import { definition as DesktopDefinition } from './definitions/desktop.js';
import { definition as DeviceDesktopDefinition } from './definitions/device-desktop.js';
import { definition as DeviceMobileDefinition } from './definitions/device-mobile.js';
import { definition as DevicesDefinition } from './definitions/devices.js';
import { definition as DirectionsDefinition } from './definitions/directions.js';
import { definition as DiscDefinition } from './definitions/disc.js';
import { definition as DonutChartDefinition } from './definitions/donut-chart.js';
import { definition as DownloadDefinition } from './definitions/download.js';
import { definition as DuplicateDefinition } from './definitions/duplicate.js';
import { definition as EarthDefinition } from './definitions/earth.js';
import { definition as EditDefinition } from './definitions/edit.js';
import { definition as EjectDefinition } from './definitions/eject.js';
import { definition as EmployeeDefinition } from './definitions/employee.js';
import { definition as EnterDefinition } from './definitions/enter.js';
import { definition as EqualizerDefinition } from './definitions/equalizer.js';
import { definition as ErrorCircleDefinition } from './definitions/error-circle.js';
import { definition as ErrorDefinition } from './definitions/error.js';
import { definition as ExitDefinition } from './definitions/exit.js';
import { definition as ExpandDefinition } from './definitions/expand.js';
import { definition as ExternalLinkDefinition } from './definitions/external-link.js';
import { definition as FaceIdDefinition } from './definitions/face-id.js';
import { definition as FastForwardDefinition } from './definitions/fast-forward.js';
import { definition as FavoriteFilledDefinition } from './definitions/favorite-filled.js';
import { definition as FavoriteDefinition } from './definitions/favorite.js';
import { definition as FileAudioDefinition } from './definitions/file-audio.js';
import { definition as FileCheckDefinition } from './definitions/file-check.js';
import { definition as FileCodeDefinition } from './definitions/file-code.js';
import { definition as FileDownloadDefinition } from './definitions/file-download.js';
import { definition as FileErrorDefinition } from './definitions/file-error.js';
import { definition as FileImageDefinition } from './definitions/file-image.js';
import { definition as FileLockDefinition } from './definitions/file-lock.js';
import { definition as FileMinusDefinition } from './definitions/file-minus.js';
import { definition as FilePdfDefinition } from './definitions/file-pdf.js';
import { definition as FilePlusDefinition } from './definitions/file-plus.js';
import { definition as FileSearchDefinition } from './definitions/file-search.js';
import { definition as FileTextDefinition } from './definitions/file-text.js';
import { definition as FileUploadDefinition } from './definitions/file-upload.js';
import { definition as FileVideoDefinition } from './definitions/file-video.js';
import { definition as FileZipDefinition } from './definitions/file-zip.js';
import { definition as FileDefinition } from './definitions/file.js';
import { definition as FilesDefinition } from './definitions/files.js';
import { definition as FilmDefinition } from './definitions/film.js';
import { definition as FilterDefinition } from './definitions/filter.js';
import { definition as FingerprintDefinition } from './definitions/fingerprint.js';
import { definition as FirewallDefinition } from './definitions/firewall.js';
import { definition as FlagDefinition } from './definitions/flag.js';
import { definition as FocusModeDefinition } from './definitions/focus-mode.js';
import { definition as FolderCheckDefinition } from './definitions/folder-check.js';
import { definition as FolderDownloadDefinition } from './definitions/folder-download.js';
import { definition as FolderErrorDefinition } from './definitions/folder-error.js';
import { definition as FolderLockDefinition } from './definitions/folder-lock.js';
import { definition as FolderMinusDefinition } from './definitions/folder-minus.js';
import { definition as FolderOpenDefinition } from './definitions/folder-open.js';
import { definition as FolderPlusDefinition } from './definitions/folder-plus.js';
import { definition as FolderSearchDefinition } from './definitions/folder-search.js';
import { definition as FolderUploadDefinition } from './definitions/folder-upload.js';
import { definition as FolderDefinition } from './definitions/folder.js';
import { definition as FoldersDefinition } from './definitions/folders.js';
import { definition as ForwardDefinition } from './definitions/forward.js';
import { definition as FullscreenDefinition } from './definitions/fullscreen.js';
import { definition as GalleryDefinition } from './definitions/gallery.js';
import { definition as GamepadDefinition } from './definitions/gamepad.js';
import { definition as GaugeDefinition } from './definitions/gauge.js';
import { definition as GiftDefinition } from './definitions/gift.js';
import { definition as GitBranchDefinition } from './definitions/git-branch.js';
import { definition as GitCommitDefinition } from './definitions/git-commit.js';
import { definition as GitForkDefinition } from './definitions/git-fork.js';
import { definition as GitMergeDefinition } from './definitions/git-merge.js';
import { definition as GitPullRequestDefinition } from './definitions/git-pull-request.js';
import { definition as GlobeAltDefinition } from './definitions/globe-alt.js';
import { definition as GlobeDefinition } from './definitions/globe.js';
import { definition as GpsDefinition } from './definitions/gps.js';
import { definition as Grid2x2Definition } from './definitions/grid-2x2.js';
import { definition as Grid3x3Definition } from './definitions/grid-3x3.js';
import { definition as GuestDefinition } from './definitions/guest.js';
import { definition as HardDriveDefinition } from './definitions/hard-drive.js';
import { definition as HeadphonesDefinition } from './definitions/headphones.js';
import { definition as HeadsetDefinition } from './definitions/headset.js';
import { definition as HelpCircleDefinition } from './definitions/help-circle.js';
import { definition as HelpDefinition } from './definitions/help.js';
import { definition as HiddenDefinition } from './definitions/hidden.js';
import { definition as HistogramDefinition } from './definitions/histogram.js';
import { definition as HistoryClockDefinition } from './definitions/history-clock.js';
import { definition as HomeDefinition } from './definitions/home.js';
import { definition as IdCardDefinition } from './definitions/id-card.js';
import { definition as ImageDefinition } from './definitions/image.js';
import { definition as ImagesDefinition } from './definitions/images.js';
import { definition as InboxDefinition } from './definitions/inbox.js';
import { definition as IncognitoDefinition } from './definitions/incognito.js';
import { definition as InfoCircleDefinition } from './definitions/info-circle.js';
import { definition as InfoDefinition } from './definitions/info.js';
import { definition as InsecureDefinition } from './definitions/insecure.js';
import { definition as IntegrationTestDefinition } from './definitions/integration-test.js';
import { definition as InvoiceDefinition } from './definitions/invoice.js';
import { definition as KeyRoundDefinition } from './definitions/key-round.js';
import { definition as KeyDefinition } from './definitions/key.js';
import { definition as KeyboardDefinition } from './definitions/keyboard.js';
import { definition as LandmarkDefinition } from './definitions/landmark.js';
import { definition as LaptopDefinition } from './definitions/laptop.js';
import { definition as LayoutColumnsDefinition } from './definitions/layout-columns.js';
import { definition as LayoutDashboardDefinition } from './definitions/layout-dashboard.js';
import { definition as LayoutFooterDefinition } from './definitions/layout-footer.js';
import { definition as LayoutGridDefinition } from './definitions/layout-grid.js';
import { definition as LayoutHeaderDefinition } from './definitions/layout-header.js';
import { definition as LayoutListDefinition } from './definitions/layout-list.js';
import { definition as LayoutNavbarDefinition } from './definitions/layout-navbar.js';
import { definition as LayoutRowsDefinition } from './definitions/layout-rows.js';
import { definition as LayoutSidebarLeftDefinition } from './definitions/layout-sidebar-left.js';
import { definition as LayoutSidebarRightDefinition } from './definitions/layout-sidebar-right.js';
import { definition as LayoutToolbarDefinition } from './definitions/layout-toolbar.js';
import { definition as LayoutDefinition } from './definitions/layout.js';
import { definition as LineChartDefinition } from './definitions/line-chart.js';
import { definition as LinkDefinition } from './definitions/link.js';
import { definition as LoadingDefinition } from './definitions/loading.js';
import { definition as LocationCheckDefinition } from './definitions/location-check.js';
import { definition as LocationPlusDefinition } from './definitions/location-plus.js';
import { definition as LocationXDefinition } from './definitions/location-x.js';
import { definition as LocationDefinition } from './definitions/location.js';
import { definition as LockKeyholeDefinition } from './definitions/lock-keyhole.js';
import { definition as LockDefinition } from './definitions/lock.js';
import { definition as MailNotificationDefinition } from './definitions/mail-notification.js';
import { definition as MailOpenDefinition } from './definitions/mail-open.js';
import { definition as MailDefinition } from './definitions/mail.js';
import { definition as MapPinFilledDefinition } from './definitions/map-pin-filled.js';
import { definition as MapPinDefinition } from './definitions/map-pin.js';
import { definition as MapPinnedDefinition } from './definitions/map-pinned.js';
import { definition as MapDefinition } from './definitions/map.js';
import { definition as MaximizeDefinition } from './definitions/maximize.js';
import { definition as MegaphoneDefinition } from './definitions/megaphone.js';
import { definition as MemoryDefinition } from './definitions/memory.js';
import { definition as MenuDefinition } from './definitions/menu.js';
import { definition as MessageDotsDefinition } from './definitions/message-dots.js';
import { definition as MessageSquareDefinition } from './definitions/message-square.js';
import { definition as MessageDefinition } from './definitions/message.js';
import { definition as MessagesDefinition } from './definitions/messages.js';
import { definition as MicrophoneOffDefinition } from './definitions/microphone-off.js';
import { definition as MicrophoneDefinition } from './definitions/microphone.js';
import { definition as MinimizeDefinition } from './definitions/minimize.js';
import { definition as MinusDefinition } from './definitions/minus.js';
import { definition as ModeratorDefinition } from './definitions/moderator.js';
import { definition as MonitorDefinition } from './definitions/monitor.js';
import { definition as MonthDefinition } from './definitions/month.js';
import { definition as MoreHorizontalDefinition } from './definitions/more-horizontal.js';
import { definition as MoreVerticalDefinition } from './definitions/more-vertical.js';
import { definition as MouseDefinition } from './definitions/mouse.js';
import { definition as MusicNoteDefinition } from './definitions/music-note.js';
import { definition as MusicDefinition } from './definitions/music.js';
import { definition as NavigationArrowDefinition } from './definitions/navigation-arrow.js';
import { definition as NotificationActiveDefinition } from './definitions/notification-active.js';
import { definition as NotificationOffDefinition } from './definitions/notification-off.js';
import { definition as NotificationDefinition } from './definitions/notification.js';
import { definition as OfflineDefinition } from './definitions/offline.js';
import { definition as OnlineDefinition } from './definitions/online.js';
import { definition as OutboxDefinition } from './definitions/outbox.js';
import { definition as PackageCheckDefinition } from './definitions/package-check.js';
import { definition as PackageCodeDefinition } from './definitions/package-code.js';
import { definition as PackageOpenDefinition } from './definitions/package-open.js';
import { definition as PackageXDefinition } from './definitions/package-x.js';
import { definition as PackageDefinition } from './definitions/package.js';
import { definition as PanelBottomDefinition } from './definitions/panel-bottom.js';
import { definition as PanelLeftDefinition } from './definitions/panel-left.js';
import { definition as PanelRightDefinition } from './definitions/panel-right.js';
import { definition as PanelTopDefinition } from './definitions/panel-top.js';
import { definition as PasskeyDefinition } from './definitions/passkey.js';
import { definition as PasswordDefinition } from './definitions/password.js';
import { definition as PasteDefinition } from './definitions/paste.js';
import { definition as PauseDefinition } from './definitions/pause.js';
import { definition as PencilDefinition } from './definitions/pencil.js';
import { definition as PendingDefinition } from './definitions/pending.js';
import { definition as PercentChartDefinition } from './definitions/percent-chart.js';
import { definition as PercentDefinition } from './definitions/percent.js';
import { definition as PhoneIncomingDefinition } from './definitions/phone-incoming.js';
import { definition as PhoneMissedDefinition } from './definitions/phone-missed.js';
import { definition as PhoneOutgoingDefinition } from './definitions/phone-outgoing.js';
import { definition as PhoneDefinition } from './definitions/phone.js';
import { definition as PictureInPictureDefinition } from './definitions/picture-in-picture.js';
import { definition as PieChartDefinition } from './definitions/pie-chart.js';
import { definition as PinCodeDefinition } from './definitions/pin-code.js';
import { definition as PlayDefinition } from './definitions/play.js';
import { definition as PlaylistDefinition } from './definitions/playlist.js';
import { definition as PlugDefinition } from './definitions/plug.js';
import { definition as PlusDefinition } from './definitions/plus.js';
import { definition as PodcastDefinition } from './definitions/podcast.js';
import { definition as PowerDefinition } from './definitions/power.js';
import { definition as PresentationChartDefinition } from './definitions/presentation-chart.js';
import { definition as PrintDefinition } from './definitions/print.js';
import { definition as PrinterDefinition } from './definitions/printer.js';
import { definition as PrivacyDefinition } from './definitions/privacy.js';
import { definition as ProfileCardDefinition } from './definitions/profile-card.js';
import { definition as ProfileDefinition } from './definitions/profile.js';
import { definition as ProgressChartDefinition } from './definitions/progress-chart.js';
import { definition as ProgressDefinition } from './definitions/progress.js';
import { definition as RadarChartDefinition } from './definitions/radar-chart.js';
import { definition as RadioDefinition } from './definitions/radio.js';
import { definition as ReceiptDefinition } from './definitions/receipt.js';
import { definition as RedoDefinition } from './definitions/redo.js';
import { definition as RefreshDefinition } from './definitions/refresh.js';
import { definition as RefundDefinition } from './definitions/refund.js';
import { definition as RegexDefinition } from './definitions/regex.js';
import { definition as ReminderDefinition } from './definitions/reminder.js';
import { definition as RepeatDefinition } from './definitions/repeat.js';
import { definition as ReplyDefinition } from './definitions/reply.js';
import { definition as ReportChartDefinition } from './definitions/report-chart.js';
import { definition as RepositoryDefinition } from './definitions/repository.js';
import { definition as RewindDefinition } from './definitions/rewind.js';
import { definition as RoadDefinition } from './definitions/road.js';
import { definition as RocketDefinition } from './definitions/rocket.js';
import { definition as RotateClockwiseDefinition } from './definitions/rotate-clockwise.js';
import { definition as RouteMapDefinition } from './definitions/route-map.js';
import { definition as RouteDefinition } from './definitions/route.js';
import { definition as RouterDefinition } from './definitions/router.js';
import { definition as Rows2Definition } from './definitions/rows-2.js';
import { definition as Rows3Definition } from './definitions/rows-3.js';
import { definition as RssDefinition } from './definitions/rss.js';
import { definition as SatelliteDefinition } from './definitions/satellite.js';
import { definition as SaveDefinition } from './definitions/save.js';
import { definition as ScanFaceDefinition } from './definitions/scan-face.js';
import { definition as ScannerDefinition } from './definitions/scanner.js';
import { definition as ScatterChartDefinition } from './definitions/scatter-chart.js';
import { definition as ScheduleDefinition } from './definitions/schedule.js';
import { definition as ScreenOffDefinition } from './definitions/screen-off.js';
import { definition as ScreenShareDefinition } from './definitions/screen-share.js';
import { definition as SecureCloudDefinition } from './definitions/secure-cloud.js';
import { definition as SecureServerDefinition } from './definitions/secure-server.js';
import { definition as SecureDefinition } from './definitions/secure.js';
import { definition as SecurityScanDefinition } from './definitions/security-scan.js';
import { definition as SecurityWarningDefinition } from './definitions/security-warning.js';
import { definition as SelectAllDefinition } from './definitions/select-all.js';
import { definition as SendDefinition } from './definitions/send.js';
import { definition as ServerCodeDefinition } from './definitions/server-code.js';
import { definition as ServerDefinition } from './definitions/server.js';
import { definition as SettingsCodeDefinition } from './definitions/settings-code.js';
import { definition as SettingsDefinition } from './definitions/settings.js';
import { definition as ShareDefinition } from './definitions/share.js';
import { definition as ShieldAlertDefinition } from './definitions/shield-alert.js';
import { definition as ShieldCheckDefinition } from './definitions/shield-check.js';
import { definition as ShieldLockDefinition } from './definitions/shield-lock.js';
import { definition as ShieldXDefinition } from './definitions/shield-x.js';
import { definition as ShieldDefinition } from './definitions/shield.js';
import { definition as ShipDefinition } from './definitions/ship.js';
import { definition as ShippingDefinition } from './definitions/shipping.js';
import { definition as ShoppingBagDefinition } from './definitions/shopping-bag.js';
import { definition as ShoppingCartDefinition } from './definitions/shopping-cart.js';
import { definition as ShuffleDefinition } from './definitions/shuffle.js';
import { definition as SignpostDefinition } from './definitions/signpost.js';
import { definition as SkipNextDefinition } from './definitions/skip-next.js';
import { definition as SkipPreviousDefinition } from './definitions/skip-previous.js';
import { definition as SmartphoneDefinition } from './definitions/smartphone.js';
import { definition as SortAscendingDefinition } from './definitions/sort-ascending.js';
import { definition as SortDescendingDefinition } from './definitions/sort-descending.js';
import { definition as SplitHorizontalDefinition } from './definitions/split-horizontal.js';
import { definition as SplitVerticalDefinition } from './definitions/split-vertical.js';
import { definition as StarFilledDefinition } from './definitions/star-filled.js';
import { definition as StarDefinition } from './definitions/star.js';
import { definition as StopDefinition } from './definitions/stop.js';
import { definition as StopwatchDefinition } from './definitions/stopwatch.js';
import { definition as StoreDefinition } from './definitions/store.js';
import { definition as SubtitlesDefinition } from './definitions/subtitles.js';
import { definition as SuccessCircleDefinition } from './definitions/success-circle.js';
import { definition as SuccessDefinition } from './definitions/success.js';
import { definition as SwapDefinition } from './definitions/swap.js';
import { definition as SyncErrorDefinition } from './definitions/sync-error.js';
import { definition as SyncDefinition } from './definitions/sync.js';
import { definition as TabletDefinition } from './definitions/tablet.js';
import { definition as TagDefinition } from './definitions/tag.js';
import { definition as TagsDefinition } from './definitions/tags.js';
import { definition as TargetChartDefinition } from './definitions/target-chart.js';
import { definition as TerminalDefinition } from './definitions/terminal.js';
import { definition as TimerDefinition } from './definitions/timer.js';
import { definition as ToolsDefinition } from './definitions/tools.js';
import { definition as TrainDefinition } from './definitions/train.js';
import { definition as TrashDefinition } from './definitions/trash.js';
import { definition as TrendDownDefinition } from './definitions/trend-down.js';
import { definition as TrendUpDefinition } from './definitions/trend-up.js';
import { definition as TwoFactorDefinition } from './definitions/two-factor.js';
import { definition as UnavailableDefinition } from './definitions/unavailable.js';
import { definition as UndoDefinition } from './definitions/undo.js';
import { definition as UnitTestDefinition } from './definitions/unit-test.js';
import { definition as UnlinkDefinition } from './definitions/unlink.js';
import { definition as UnlockDefinition } from './definitions/unlock.js';
import { definition as UnverifiedDefinition } from './definitions/unverified.js';
import { definition as UploadDefinition } from './definitions/upload.js';
import { definition as UsbDefinition } from './definitions/usb.js';
import { definition as UserBlockedDefinition } from './definitions/user-blocked.js';
import { definition as UserCardDefinition } from './definitions/user-card.js';
import { definition as UserCheckDefinition } from './definitions/user-check.js';
import { definition as UserCircleDefinition } from './definitions/user-circle.js';
import { definition as UserEditDefinition } from './definitions/user-edit.js';
import { definition as UserHeartDefinition } from './definitions/user-heart.js';
import { definition as UserLockDefinition } from './definitions/user-lock.js';
import { definition as UserMinusDefinition } from './definitions/user-minus.js';
import { definition as UserPlusDefinition } from './definitions/user-plus.js';
import { definition as UserSearchDefinition } from './definitions/user-search.js';
import { definition as UserSettingsDefinition } from './definitions/user-settings.js';
import { definition as UserShieldDefinition } from './definitions/user-shield.js';
import { definition as UserStarDefinition } from './definitions/user-star.js';
import { definition as UserXDefinition } from './definitions/user-x.js';
import { definition as UserDefinition } from './definitions/user.js';
import { definition as UsersGroupDefinition } from './definitions/users-group.js';
import { definition as UsersDefinition } from './definitions/users.js';
import { definition as VerifiedUserDefinition } from './definitions/verified-user.js';
import { definition as VerifiedDefinition } from './definitions/verified.js';
import { definition as VersionControlDefinition } from './definitions/version-control.js';
import { definition as VideoOffDefinition } from './definitions/video-off.js';
import { definition as VideoDefinition } from './definitions/video.js';
import { definition as VisibilityOffDefinition } from './definitions/visibility-off.js';
import { definition as VisibilityDefinition } from './definitions/visibility.js';
import { definition as VolumeHighDefinition } from './definitions/volume-high.js';
import { definition as VolumeLowDefinition } from './definitions/volume-low.js';
import { definition as VolumeOffDefinition } from './definitions/volume-off.js';
import { definition as VolumeDefinition } from './definitions/volume.js';
import { definition as WalkingDefinition } from './definitions/walking.js';
import { definition as WalletDefinition } from './definitions/wallet.js';
import { definition as WarehouseDefinition } from './definitions/warehouse.js';
import { definition as WarningCircleDefinition } from './definitions/warning-circle.js';
import { definition as WarningDefinition } from './definitions/warning.js';
import { definition as WatchDefinition } from './definitions/watch.js';
import { definition as WaveformDefinition } from './definitions/waveform.js';
import { definition as WebcamDefinition } from './definitions/webcam.js';
import { definition as WebhookDefinition } from './definitions/webhook.js';
import { definition as WeekDefinition } from './definitions/week.js';
import { definition as WifiOffDefinition } from './definitions/wifi-off.js';
import { definition as WifiDefinition } from './definitions/wifi.js';
import { definition as ZoomInDefinition } from './definitions/zoom-in.js';
import { definition as ZoomOutDefinition } from './definitions/zoom-out.js';

export const iconNames = ["access-key","accessibility","account-circle","account","activity-chart","admin","airplane","alarm-off","alarm","align-bottom","align-center","align-left","align-middle","align-right","align-top","analytics","announcement","antivirus","api","appointment","archive","area-chart","arrow-down","arrow-left","arrow-right","arrow-up","at-sign","attachment","authentication","available","badge-check","banknote","bar-chart-horizontal","bar-chart-stacked","bar-chart","barcode","basket","battery-charging","battery-low","battery","bike","binary","bluetooth","braces","brackets","breakpoint","broadcast","bubble-chart","bug-shield","bug","build","building","buildings","bus","calendar-check","calendar-clock","calendar-days","calendar-edit","calendar-event","calendar-lock","calendar-minus","calendar-month","calendar-plus","calendar-range","calendar-search","calendar-settings","calendar-star","calendar-week","calendar-x","calendar","camera-off","camera","captions","car","card-check","cart-check","cart-minus","cart-plus","cart-x","cash-register","cash","cast-device","cast","certificate","chart-axis","chart-grid","chart-label","chart-legend","chart-plus","chart-settings","chart-tooltip","check","checkout","chevron-down","chevron-left","chevron-right","chevron-up","chevrons-down","chevrons-left","chevrons-right","chevrons-up","child","clapperboard","clipboard-text","clipboard","clock-check","clock-plus","clock","close","cloud-code","cloud-file","code-alt","code","coins","collapse","column-chart","columns-2","columns-3","command-line","community","comparison-chart","compass-map","compass","contact","contacts","container","copy","corner-down-left","corner-down-right","corner-up-left","corner-up-right","coupon","cpu","credit-card","crosshair-location","current-location","customer","cut","dashboard-chart","dashboard","data-table","database","date-today","date","day","debug","delivery-truck","deploy","deselect","desktop","device-desktop","device-mobile","devices","directions","disc","donut-chart","download","duplicate","earth","edit","eject","employee","enter","equalizer","error-circle","error","exit","expand","external-link","face-id","fast-forward","favorite-filled","favorite","file-audio","file-check","file-code","file-download","file-error","file-image","file-lock","file-minus","file-pdf","file-plus","file-search","file-text","file-upload","file-video","file-zip","file","files","film","filter","fingerprint","firewall","flag","focus-mode","folder-check","folder-download","folder-error","folder-lock","folder-minus","folder-open","folder-plus","folder-search","folder-upload","folder","folders","forward","fullscreen","gallery","gamepad","gauge","gift","git-branch","git-commit","git-fork","git-merge","git-pull-request","globe-alt","globe","gps","grid-2x2","grid-3x3","guest","hard-drive","headphones","headset","help-circle","help","hidden","histogram","history-clock","home","id-card","image","images","inbox","incognito","info-circle","info","insecure","integration-test","invoice","key-round","key","keyboard","landmark","laptop","layout-columns","layout-dashboard","layout-footer","layout-grid","layout-header","layout-list","layout-navbar","layout-rows","layout-sidebar-left","layout-sidebar-right","layout-toolbar","layout","line-chart","link","loading","location-check","location-plus","location-x","location","lock-keyhole","lock","mail-notification","mail-open","mail","map-pin-filled","map-pin","map-pinned","map","maximize","megaphone","memory","menu","message-dots","message-square","message","messages","microphone-off","microphone","minimize","minus","moderator","monitor","month","more-horizontal","more-vertical","mouse","music-note","music","navigation-arrow","notification-active","notification-off","notification","offline","online","outbox","package-check","package-code","package-open","package-x","package","panel-bottom","panel-left","panel-right","panel-top","passkey","password","paste","pause","pencil","pending","percent-chart","percent","phone-incoming","phone-missed","phone-outgoing","phone","picture-in-picture","pie-chart","pin-code","play","playlist","plug","plus","podcast","power","presentation-chart","print","printer","privacy","profile-card","profile","progress-chart","progress","radar-chart","radio","receipt","redo","refresh","refund","regex","reminder","repeat","reply","report-chart","repository","rewind","road","rocket","rotate-clockwise","route-map","route","router","rows-2","rows-3","rss","satellite","save","scan-face","scanner","scatter-chart","schedule","screen-off","screen-share","secure-cloud","secure-server","secure","security-scan","security-warning","select-all","send","server-code","server","settings-code","settings","share","shield-alert","shield-check","shield-lock","shield-x","shield","ship","shipping","shopping-bag","shopping-cart","shuffle","signpost","skip-next","skip-previous","smartphone","sort-ascending","sort-descending","split-horizontal","split-vertical","star-filled","star","stop","stopwatch","store","subtitles","success-circle","success","swap","sync-error","sync","tablet","tag","tags","target-chart","terminal","timer","tools","train","trash","trend-down","trend-up","two-factor","unavailable","undo","unit-test","unlink","unlock","unverified","upload","usb","user-blocked","user-card","user-check","user-circle","user-edit","user-heart","user-lock","user-minus","user-plus","user-search","user-settings","user-shield","user-star","user-x","user","users-group","users","verified-user","verified","version-control","video-off","video","visibility-off","visibility","volume-high","volume-low","volume-off","volume","walking","wallet","warehouse","warning-circle","warning","watch","waveform","webcam","webhook","week","wifi-off","wifi","zoom-in","zoom-out"] as const;
export type IconName = (typeof iconNames)[number];

export const icons: Readonly<Record<IconName, IconDefinition>> = {
  "access-key": AccessKeyDefinition,
  "accessibility": AccessibilityDefinition,
  "account-circle": AccountCircleDefinition,
  "account": AccountDefinition,
  "activity-chart": ActivityChartDefinition,
  "admin": AdminDefinition,
  "airplane": AirplaneDefinition,
  "alarm-off": AlarmOffDefinition,
  "alarm": AlarmDefinition,
  "align-bottom": AlignBottomDefinition,
  "align-center": AlignCenterDefinition,
  "align-left": AlignLeftDefinition,
  "align-middle": AlignMiddleDefinition,
  "align-right": AlignRightDefinition,
  "align-top": AlignTopDefinition,
  "analytics": AnalyticsDefinition,
  "announcement": AnnouncementDefinition,
  "antivirus": AntivirusDefinition,
  "api": ApiDefinition,
  "appointment": AppointmentDefinition,
  "archive": ArchiveDefinition,
  "area-chart": AreaChartDefinition,
  "arrow-down": ArrowDownDefinition,
  "arrow-left": ArrowLeftDefinition,
  "arrow-right": ArrowRightDefinition,
  "arrow-up": ArrowUpDefinition,
  "at-sign": AtSignDefinition,
  "attachment": AttachmentDefinition,
  "authentication": AuthenticationDefinition,
  "available": AvailableDefinition,
  "badge-check": BadgeCheckDefinition,
  "banknote": BanknoteDefinition,
  "bar-chart-horizontal": BarChartHorizontalDefinition,
  "bar-chart-stacked": BarChartStackedDefinition,
  "bar-chart": BarChartDefinition,
  "barcode": BarcodeDefinition,
  "basket": BasketDefinition,
  "battery-charging": BatteryChargingDefinition,
  "battery-low": BatteryLowDefinition,
  "battery": BatteryDefinition,
  "bike": BikeDefinition,
  "binary": BinaryDefinition,
  "bluetooth": BluetoothDefinition,
  "braces": BracesDefinition,
  "brackets": BracketsDefinition,
  "breakpoint": BreakpointDefinition,
  "broadcast": BroadcastDefinition,
  "bubble-chart": BubbleChartDefinition,
  "bug-shield": BugShieldDefinition,
  "bug": BugDefinition,
  "build": BuildDefinition,
  "building": BuildingDefinition,
  "buildings": BuildingsDefinition,
  "bus": BusDefinition,
  "calendar-check": CalendarCheckDefinition,
  "calendar-clock": CalendarClockDefinition,
  "calendar-days": CalendarDaysDefinition,
  "calendar-edit": CalendarEditDefinition,
  "calendar-event": CalendarEventDefinition,
  "calendar-lock": CalendarLockDefinition,
  "calendar-minus": CalendarMinusDefinition,
  "calendar-month": CalendarMonthDefinition,
  "calendar-plus": CalendarPlusDefinition,
  "calendar-range": CalendarRangeDefinition,
  "calendar-search": CalendarSearchDefinition,
  "calendar-settings": CalendarSettingsDefinition,
  "calendar-star": CalendarStarDefinition,
  "calendar-week": CalendarWeekDefinition,
  "calendar-x": CalendarXDefinition,
  "calendar": CalendarDefinition,
  "camera-off": CameraOffDefinition,
  "camera": CameraDefinition,
  "captions": CaptionsDefinition,
  "car": CarDefinition,
  "card-check": CardCheckDefinition,
  "cart-check": CartCheckDefinition,
  "cart-minus": CartMinusDefinition,
  "cart-plus": CartPlusDefinition,
  "cart-x": CartXDefinition,
  "cash-register": CashRegisterDefinition,
  "cash": CashDefinition,
  "cast-device": CastDeviceDefinition,
  "cast": CastDefinition,
  "certificate": CertificateDefinition,
  "chart-axis": ChartAxisDefinition,
  "chart-grid": ChartGridDefinition,
  "chart-label": ChartLabelDefinition,
  "chart-legend": ChartLegendDefinition,
  "chart-plus": ChartPlusDefinition,
  "chart-settings": ChartSettingsDefinition,
  "chart-tooltip": ChartTooltipDefinition,
  "check": CheckDefinition,
  "checkout": CheckoutDefinition,
  "chevron-down": ChevronDownDefinition,
  "chevron-left": ChevronLeftDefinition,
  "chevron-right": ChevronRightDefinition,
  "chevron-up": ChevronUpDefinition,
  "chevrons-down": ChevronsDownDefinition,
  "chevrons-left": ChevronsLeftDefinition,
  "chevrons-right": ChevronsRightDefinition,
  "chevrons-up": ChevronsUpDefinition,
  "child": ChildDefinition,
  "clapperboard": ClapperboardDefinition,
  "clipboard-text": ClipboardTextDefinition,
  "clipboard": ClipboardDefinition,
  "clock-check": ClockCheckDefinition,
  "clock-plus": ClockPlusDefinition,
  "clock": ClockDefinition,
  "close": CloseDefinition,
  "cloud-code": CloudCodeDefinition,
  "cloud-file": CloudFileDefinition,
  "code-alt": CodeAltDefinition,
  "code": CodeDefinition,
  "coins": CoinsDefinition,
  "collapse": CollapseDefinition,
  "column-chart": ColumnChartDefinition,
  "columns-2": Columns2Definition,
  "columns-3": Columns3Definition,
  "command-line": CommandLineDefinition,
  "community": CommunityDefinition,
  "comparison-chart": ComparisonChartDefinition,
  "compass-map": CompassMapDefinition,
  "compass": CompassDefinition,
  "contact": ContactDefinition,
  "contacts": ContactsDefinition,
  "container": ContainerDefinition,
  "copy": CopyDefinition,
  "corner-down-left": CornerDownLeftDefinition,
  "corner-down-right": CornerDownRightDefinition,
  "corner-up-left": CornerUpLeftDefinition,
  "corner-up-right": CornerUpRightDefinition,
  "coupon": CouponDefinition,
  "cpu": CpuDefinition,
  "credit-card": CreditCardDefinition,
  "crosshair-location": CrosshairLocationDefinition,
  "current-location": CurrentLocationDefinition,
  "customer": CustomerDefinition,
  "cut": CutDefinition,
  "dashboard-chart": DashboardChartDefinition,
  "dashboard": DashboardDefinition,
  "data-table": DataTableDefinition,
  "database": DatabaseDefinition,
  "date-today": DateTodayDefinition,
  "date": DateDefinition,
  "day": DayDefinition,
  "debug": DebugDefinition,
  "delivery-truck": DeliveryTruckDefinition,
  "deploy": DeployDefinition,
  "deselect": DeselectDefinition,
  "desktop": DesktopDefinition,
  "device-desktop": DeviceDesktopDefinition,
  "device-mobile": DeviceMobileDefinition,
  "devices": DevicesDefinition,
  "directions": DirectionsDefinition,
  "disc": DiscDefinition,
  "donut-chart": DonutChartDefinition,
  "download": DownloadDefinition,
  "duplicate": DuplicateDefinition,
  "earth": EarthDefinition,
  "edit": EditDefinition,
  "eject": EjectDefinition,
  "employee": EmployeeDefinition,
  "enter": EnterDefinition,
  "equalizer": EqualizerDefinition,
  "error-circle": ErrorCircleDefinition,
  "error": ErrorDefinition,
  "exit": ExitDefinition,
  "expand": ExpandDefinition,
  "external-link": ExternalLinkDefinition,
  "face-id": FaceIdDefinition,
  "fast-forward": FastForwardDefinition,
  "favorite-filled": FavoriteFilledDefinition,
  "favorite": FavoriteDefinition,
  "file-audio": FileAudioDefinition,
  "file-check": FileCheckDefinition,
  "file-code": FileCodeDefinition,
  "file-download": FileDownloadDefinition,
  "file-error": FileErrorDefinition,
  "file-image": FileImageDefinition,
  "file-lock": FileLockDefinition,
  "file-minus": FileMinusDefinition,
  "file-pdf": FilePdfDefinition,
  "file-plus": FilePlusDefinition,
  "file-search": FileSearchDefinition,
  "file-text": FileTextDefinition,
  "file-upload": FileUploadDefinition,
  "file-video": FileVideoDefinition,
  "file-zip": FileZipDefinition,
  "file": FileDefinition,
  "files": FilesDefinition,
  "film": FilmDefinition,
  "filter": FilterDefinition,
  "fingerprint": FingerprintDefinition,
  "firewall": FirewallDefinition,
  "flag": FlagDefinition,
  "focus-mode": FocusModeDefinition,
  "folder-check": FolderCheckDefinition,
  "folder-download": FolderDownloadDefinition,
  "folder-error": FolderErrorDefinition,
  "folder-lock": FolderLockDefinition,
  "folder-minus": FolderMinusDefinition,
  "folder-open": FolderOpenDefinition,
  "folder-plus": FolderPlusDefinition,
  "folder-search": FolderSearchDefinition,
  "folder-upload": FolderUploadDefinition,
  "folder": FolderDefinition,
  "folders": FoldersDefinition,
  "forward": ForwardDefinition,
  "fullscreen": FullscreenDefinition,
  "gallery": GalleryDefinition,
  "gamepad": GamepadDefinition,
  "gauge": GaugeDefinition,
  "gift": GiftDefinition,
  "git-branch": GitBranchDefinition,
  "git-commit": GitCommitDefinition,
  "git-fork": GitForkDefinition,
  "git-merge": GitMergeDefinition,
  "git-pull-request": GitPullRequestDefinition,
  "globe-alt": GlobeAltDefinition,
  "globe": GlobeDefinition,
  "gps": GpsDefinition,
  "grid-2x2": Grid2x2Definition,
  "grid-3x3": Grid3x3Definition,
  "guest": GuestDefinition,
  "hard-drive": HardDriveDefinition,
  "headphones": HeadphonesDefinition,
  "headset": HeadsetDefinition,
  "help-circle": HelpCircleDefinition,
  "help": HelpDefinition,
  "hidden": HiddenDefinition,
  "histogram": HistogramDefinition,
  "history-clock": HistoryClockDefinition,
  "home": HomeDefinition,
  "id-card": IdCardDefinition,
  "image": ImageDefinition,
  "images": ImagesDefinition,
  "inbox": InboxDefinition,
  "incognito": IncognitoDefinition,
  "info-circle": InfoCircleDefinition,
  "info": InfoDefinition,
  "insecure": InsecureDefinition,
  "integration-test": IntegrationTestDefinition,
  "invoice": InvoiceDefinition,
  "key-round": KeyRoundDefinition,
  "key": KeyDefinition,
  "keyboard": KeyboardDefinition,
  "landmark": LandmarkDefinition,
  "laptop": LaptopDefinition,
  "layout-columns": LayoutColumnsDefinition,
  "layout-dashboard": LayoutDashboardDefinition,
  "layout-footer": LayoutFooterDefinition,
  "layout-grid": LayoutGridDefinition,
  "layout-header": LayoutHeaderDefinition,
  "layout-list": LayoutListDefinition,
  "layout-navbar": LayoutNavbarDefinition,
  "layout-rows": LayoutRowsDefinition,
  "layout-sidebar-left": LayoutSidebarLeftDefinition,
  "layout-sidebar-right": LayoutSidebarRightDefinition,
  "layout-toolbar": LayoutToolbarDefinition,
  "layout": LayoutDefinition,
  "line-chart": LineChartDefinition,
  "link": LinkDefinition,
  "loading": LoadingDefinition,
  "location-check": LocationCheckDefinition,
  "location-plus": LocationPlusDefinition,
  "location-x": LocationXDefinition,
  "location": LocationDefinition,
  "lock-keyhole": LockKeyholeDefinition,
  "lock": LockDefinition,
  "mail-notification": MailNotificationDefinition,
  "mail-open": MailOpenDefinition,
  "mail": MailDefinition,
  "map-pin-filled": MapPinFilledDefinition,
  "map-pin": MapPinDefinition,
  "map-pinned": MapPinnedDefinition,
  "map": MapDefinition,
  "maximize": MaximizeDefinition,
  "megaphone": MegaphoneDefinition,
  "memory": MemoryDefinition,
  "menu": MenuDefinition,
  "message-dots": MessageDotsDefinition,
  "message-square": MessageSquareDefinition,
  "message": MessageDefinition,
  "messages": MessagesDefinition,
  "microphone-off": MicrophoneOffDefinition,
  "microphone": MicrophoneDefinition,
  "minimize": MinimizeDefinition,
  "minus": MinusDefinition,
  "moderator": ModeratorDefinition,
  "monitor": MonitorDefinition,
  "month": MonthDefinition,
  "more-horizontal": MoreHorizontalDefinition,
  "more-vertical": MoreVerticalDefinition,
  "mouse": MouseDefinition,
  "music-note": MusicNoteDefinition,
  "music": MusicDefinition,
  "navigation-arrow": NavigationArrowDefinition,
  "notification-active": NotificationActiveDefinition,
  "notification-off": NotificationOffDefinition,
  "notification": NotificationDefinition,
  "offline": OfflineDefinition,
  "online": OnlineDefinition,
  "outbox": OutboxDefinition,
  "package-check": PackageCheckDefinition,
  "package-code": PackageCodeDefinition,
  "package-open": PackageOpenDefinition,
  "package-x": PackageXDefinition,
  "package": PackageDefinition,
  "panel-bottom": PanelBottomDefinition,
  "panel-left": PanelLeftDefinition,
  "panel-right": PanelRightDefinition,
  "panel-top": PanelTopDefinition,
  "passkey": PasskeyDefinition,
  "password": PasswordDefinition,
  "paste": PasteDefinition,
  "pause": PauseDefinition,
  "pencil": PencilDefinition,
  "pending": PendingDefinition,
  "percent-chart": PercentChartDefinition,
  "percent": PercentDefinition,
  "phone-incoming": PhoneIncomingDefinition,
  "phone-missed": PhoneMissedDefinition,
  "phone-outgoing": PhoneOutgoingDefinition,
  "phone": PhoneDefinition,
  "picture-in-picture": PictureInPictureDefinition,
  "pie-chart": PieChartDefinition,
  "pin-code": PinCodeDefinition,
  "play": PlayDefinition,
  "playlist": PlaylistDefinition,
  "plug": PlugDefinition,
  "plus": PlusDefinition,
  "podcast": PodcastDefinition,
  "power": PowerDefinition,
  "presentation-chart": PresentationChartDefinition,
  "print": PrintDefinition,
  "printer": PrinterDefinition,
  "privacy": PrivacyDefinition,
  "profile-card": ProfileCardDefinition,
  "profile": ProfileDefinition,
  "progress-chart": ProgressChartDefinition,
  "progress": ProgressDefinition,
  "radar-chart": RadarChartDefinition,
  "radio": RadioDefinition,
  "receipt": ReceiptDefinition,
  "redo": RedoDefinition,
  "refresh": RefreshDefinition,
  "refund": RefundDefinition,
  "regex": RegexDefinition,
  "reminder": ReminderDefinition,
  "repeat": RepeatDefinition,
  "reply": ReplyDefinition,
  "report-chart": ReportChartDefinition,
  "repository": RepositoryDefinition,
  "rewind": RewindDefinition,
  "road": RoadDefinition,
  "rocket": RocketDefinition,
  "rotate-clockwise": RotateClockwiseDefinition,
  "route-map": RouteMapDefinition,
  "route": RouteDefinition,
  "router": RouterDefinition,
  "rows-2": Rows2Definition,
  "rows-3": Rows3Definition,
  "rss": RssDefinition,
  "satellite": SatelliteDefinition,
  "save": SaveDefinition,
  "scan-face": ScanFaceDefinition,
  "scanner": ScannerDefinition,
  "scatter-chart": ScatterChartDefinition,
  "schedule": ScheduleDefinition,
  "screen-off": ScreenOffDefinition,
  "screen-share": ScreenShareDefinition,
  "secure-cloud": SecureCloudDefinition,
  "secure-server": SecureServerDefinition,
  "secure": SecureDefinition,
  "security-scan": SecurityScanDefinition,
  "security-warning": SecurityWarningDefinition,
  "select-all": SelectAllDefinition,
  "send": SendDefinition,
  "server-code": ServerCodeDefinition,
  "server": ServerDefinition,
  "settings-code": SettingsCodeDefinition,
  "settings": SettingsDefinition,
  "share": ShareDefinition,
  "shield-alert": ShieldAlertDefinition,
  "shield-check": ShieldCheckDefinition,
  "shield-lock": ShieldLockDefinition,
  "shield-x": ShieldXDefinition,
  "shield": ShieldDefinition,
  "ship": ShipDefinition,
  "shipping": ShippingDefinition,
  "shopping-bag": ShoppingBagDefinition,
  "shopping-cart": ShoppingCartDefinition,
  "shuffle": ShuffleDefinition,
  "signpost": SignpostDefinition,
  "skip-next": SkipNextDefinition,
  "skip-previous": SkipPreviousDefinition,
  "smartphone": SmartphoneDefinition,
  "sort-ascending": SortAscendingDefinition,
  "sort-descending": SortDescendingDefinition,
  "split-horizontal": SplitHorizontalDefinition,
  "split-vertical": SplitVerticalDefinition,
  "star-filled": StarFilledDefinition,
  "star": StarDefinition,
  "stop": StopDefinition,
  "stopwatch": StopwatchDefinition,
  "store": StoreDefinition,
  "subtitles": SubtitlesDefinition,
  "success-circle": SuccessCircleDefinition,
  "success": SuccessDefinition,
  "swap": SwapDefinition,
  "sync-error": SyncErrorDefinition,
  "sync": SyncDefinition,
  "tablet": TabletDefinition,
  "tag": TagDefinition,
  "tags": TagsDefinition,
  "target-chart": TargetChartDefinition,
  "terminal": TerminalDefinition,
  "timer": TimerDefinition,
  "tools": ToolsDefinition,
  "train": TrainDefinition,
  "trash": TrashDefinition,
  "trend-down": TrendDownDefinition,
  "trend-up": TrendUpDefinition,
  "two-factor": TwoFactorDefinition,
  "unavailable": UnavailableDefinition,
  "undo": UndoDefinition,
  "unit-test": UnitTestDefinition,
  "unlink": UnlinkDefinition,
  "unlock": UnlockDefinition,
  "unverified": UnverifiedDefinition,
  "upload": UploadDefinition,
  "usb": UsbDefinition,
  "user-blocked": UserBlockedDefinition,
  "user-card": UserCardDefinition,
  "user-check": UserCheckDefinition,
  "user-circle": UserCircleDefinition,
  "user-edit": UserEditDefinition,
  "user-heart": UserHeartDefinition,
  "user-lock": UserLockDefinition,
  "user-minus": UserMinusDefinition,
  "user-plus": UserPlusDefinition,
  "user-search": UserSearchDefinition,
  "user-settings": UserSettingsDefinition,
  "user-shield": UserShieldDefinition,
  "user-star": UserStarDefinition,
  "user-x": UserXDefinition,
  "user": UserDefinition,
  "users-group": UsersGroupDefinition,
  "users": UsersDefinition,
  "verified-user": VerifiedUserDefinition,
  "verified": VerifiedDefinition,
  "version-control": VersionControlDefinition,
  "video-off": VideoOffDefinition,
  "video": VideoDefinition,
  "visibility-off": VisibilityOffDefinition,
  "visibility": VisibilityDefinition,
  "volume-high": VolumeHighDefinition,
  "volume-low": VolumeLowDefinition,
  "volume-off": VolumeOffDefinition,
  "volume": VolumeDefinition,
  "walking": WalkingDefinition,
  "wallet": WalletDefinition,
  "warehouse": WarehouseDefinition,
  "warning-circle": WarningCircleDefinition,
  "warning": WarningDefinition,
  "watch": WatchDefinition,
  "waveform": WaveformDefinition,
  "webcam": WebcamDefinition,
  "webhook": WebhookDefinition,
  "week": WeekDefinition,
  "wifi-off": WifiOffDefinition,
  "wifi": WifiDefinition,
  "zoom-in": ZoomInDefinition,
  "zoom-out": ZoomOutDefinition,
};

export const iconGroups: Readonly<Record<IconGroup, readonly IconName[]>> = {
  "landmarks": [
    "home",
    "dashboard",
    "route",
    "compass"
  ],
  "menus": [
    "menu",
    "more-horizontal",
    "more-vertical"
  ],
  "arrows": [
    "arrow-left",
    "arrow-right",
    "arrow-up",
    "arrow-down"
  ],
  "chevrons": [
    "chevron-left",
    "chevron-right",
    "chevron-up",
    "chevron-down",
    "chevrons-left",
    "chevrons-right",
    "chevrons-up",
    "chevrons-down"
  ],
  "corner-movement": [
    "corner-up-left",
    "corner-up-right",
    "corner-down-left",
    "corner-down-right"
  ],
  "viewport": [
    "expand",
    "collapse",
    "maximize",
    "minimize"
  ],
  "transfers": [
    "external-link",
    "enter",
    "exit"
  ],
  "history": [
    "refresh",
    "rotate-clockwise",
    "undo",
    "redo"
  ],
  "action-basics": [
    "plus",
    "minus",
    "close",
    "check"
  ],
  "editing": [
    "edit",
    "pencil",
    "trash",
    "cut"
  ],
  "clipboard": [
    "copy",
    "duplicate",
    "paste"
  ],
  "file-actions": [
    "archive",
    "save",
    "download",
    "upload",
    "print"
  ],
  "sharing": [
    "share",
    "send",
    "link",
    "unlink"
  ],
  "organization": [
    "filter",
    "settings"
  ],
  "ordering": [
    "sort-ascending",
    "sort-descending",
    "swap",
    "shuffle"
  ],
  "selection": [
    "select-all",
    "deselect"
  ],
  "view-actions": [
    "zoom-in",
    "zoom-out"
  ],
  "semantic-feedback": [
    "success",
    "success-circle",
    "error",
    "error-circle",
    "warning",
    "warning-circle",
    "info",
    "info-circle"
  ],
  "assistance": [
    "help",
    "help-circle"
  ],
  "notifications": [
    "notification",
    "notification-active",
    "notification-off"
  ],
  "activity": [
    "loading",
    "pending",
    "progress"
  ],
  "presence": [
    "online",
    "offline",
    "available",
    "unavailable"
  ],
  "trust-security": [
    "verified",
    "unverified",
    "secure",
    "insecure"
  ],
  "preferences": [
    "favorite",
    "favorite-filled",
    "star",
    "star-filled"
  ],
  "visibility-sync": [
    "visibility",
    "visibility-off",
    "sync",
    "sync-error"
  ],
  "documents": [
    "file",
    "file-text",
    "file-code",
    "file-pdf",
    "file-zip",
    "file-lock"
  ],
  "document-actions": [
    "file-plus",
    "file-minus",
    "file-check",
    "file-error",
    "file-search",
    "file-download",
    "file-upload"
  ],
  "media-files": [
    "file-image",
    "file-video",
    "file-audio"
  ],
  "folders": [
    "folder",
    "folder-open",
    "folder-lock"
  ],
  "folder-actions": [
    "folder-plus",
    "folder-minus",
    "folder-check",
    "folder-error",
    "folder-search",
    "folder-download",
    "folder-upload"
  ],
  "file-collections": [
    "files",
    "folders",
    "cloud-file"
  ],
  "file-utilities": [
    "clipboard",
    "clipboard-text",
    "attachment"
  ],
  "layout-structures": [
    "layout",
    "layout-dashboard",
    "layout-grid",
    "layout-list",
    "layout-columns",
    "layout-rows",
    "layout-sidebar-left",
    "layout-sidebar-right"
  ],
  "layout-regions": [
    "layout-header",
    "layout-footer",
    "layout-navbar",
    "layout-toolbar"
  ],
  "layout-panels": [
    "panel-left",
    "panel-right",
    "panel-top",
    "panel-bottom"
  ],
  "layout-grids": [
    "grid-2x2",
    "grid-3x3",
    "columns-2",
    "columns-3",
    "rows-2",
    "rows-3"
  ],
  "layout-splits": [
    "split-horizontal",
    "split-vertical"
  ],
  "alignment": [
    "align-left",
    "align-center",
    "align-right",
    "align-top",
    "align-middle",
    "align-bottom"
  ],
  "display-modes": [
    "fullscreen",
    "focus-mode"
  ],
  "messaging": [
    "message",
    "message-dots",
    "messages",
    "message-square",
    "reply",
    "forward"
  ],
  "mail": [
    "mail",
    "mail-open",
    "mail-notification",
    "inbox",
    "outbox"
  ],
  "calling": [
    "phone",
    "phone-incoming",
    "phone-outgoing",
    "phone-missed",
    "video",
    "video-off"
  ],
  "audio": [
    "microphone",
    "microphone-off",
    "headphones",
    "headset"
  ],
  "broadcasting": [
    "megaphone",
    "announcement",
    "broadcast",
    "rss",
    "at-sign"
  ],
  "people": [
    "user",
    "user-circle",
    "users",
    "users-group",
    "contact",
    "contacts",
    "community"
  ],
  "user-actions": [
    "user-plus",
    "user-check",
    "user-minus",
    "user-x",
    "user-settings",
    "user-search",
    "user-edit"
  ],
  "user-security": [
    "user-lock",
    "user-shield",
    "user-star",
    "user-heart"
  ],
  "profiles": [
    "user-card",
    "profile",
    "profile-card",
    "id-card",
    "badge-check",
    "account",
    "account-circle"
  ],
  "roles": [
    "admin",
    "moderator",
    "employee",
    "customer",
    "guest",
    "child",
    "accessibility"
  ],
  "calendars": [
    "calendar",
    "calendar-days",
    "calendar-week",
    "calendar-month"
  ],
  "calendar-actions": [
    "calendar-plus",
    "calendar-minus",
    "calendar-check",
    "calendar-x",
    "calendar-search",
    "calendar-edit",
    "calendar-settings",
    "calendar-lock",
    "calendar-star"
  ],
  "scheduling": [
    "calendar-clock",
    "calendar-event",
    "calendar-range",
    "date",
    "date-today",
    "day",
    "week",
    "month",
    "schedule",
    "appointment",
    "reminder"
  ],
  "time": [
    "clock",
    "clock-plus",
    "clock-check",
    "alarm",
    "alarm-off",
    "timer",
    "stopwatch",
    "history-clock"
  ],
  "playback": [
    "play",
    "pause",
    "stop",
    "skip-next",
    "skip-previous",
    "fast-forward",
    "rewind",
    "eject",
    "repeat"
  ],
  "media-audio": [
    "volume",
    "volume-low",
    "volume-high",
    "volume-off",
    "music",
    "music-note",
    "playlist",
    "radio"
  ],
  "visual-media": [
    "image",
    "images",
    "camera",
    "camera-off",
    "film",
    "clapperboard",
    "gallery",
    "picture-in-picture"
  ],
  "media-content": [
    "captions",
    "subtitles",
    "equalizer",
    "waveform",
    "podcast",
    "disc",
    "cast"
  ],
  "shopping": [
    "shopping-cart",
    "cart-plus",
    "cart-minus",
    "cart-check",
    "cart-x",
    "shopping-bag",
    "basket",
    "store"
  ],
  "fulfillment": [
    "package",
    "package-open",
    "package-check",
    "package-x",
    "delivery-truck",
    "shipping",
    "warehouse",
    "barcode"
  ],
  "payments": [
    "credit-card",
    "card-check",
    "wallet",
    "cash",
    "banknote",
    "coins",
    "receipt",
    "invoice"
  ],
  "pricing": [
    "tag",
    "tags",
    "coupon",
    "percent",
    "gift",
    "cash-register",
    "checkout",
    "refund"
  ],
  "charts": [
    "bar-chart",
    "bar-chart-horizontal",
    "bar-chart-stacked",
    "column-chart",
    "line-chart",
    "area-chart",
    "pie-chart",
    "donut-chart"
  ],
  "statistical-charts": [
    "trend-up",
    "trend-down",
    "activity-chart",
    "scatter-chart",
    "bubble-chart",
    "radar-chart",
    "gauge",
    "histogram"
  ],
  "chart-interface": [
    "chart-grid",
    "chart-axis",
    "chart-label",
    "chart-legend",
    "chart-tooltip",
    "data-table",
    "analytics",
    "dashboard-chart"
  ],
  "chart-actions": [
    "percent-chart",
    "progress-chart",
    "target-chart",
    "comparison-chart",
    "report-chart",
    "presentation-chart",
    "chart-plus",
    "chart-settings"
  ],
  "devices": [
    "monitor",
    "laptop",
    "desktop",
    "tablet",
    "smartphone",
    "watch",
    "keyboard",
    "mouse"
  ],
  "hardware": [
    "printer",
    "scanner",
    "router",
    "server",
    "hard-drive",
    "cpu",
    "memory",
    "usb"
  ],
  "connectivity": [
    "battery",
    "battery-low",
    "battery-charging",
    "power",
    "plug",
    "wifi",
    "wifi-off",
    "bluetooth"
  ],
  "device-actions": [
    "device-mobile",
    "device-desktop",
    "devices",
    "screen-share",
    "screen-off",
    "cast-device",
    "gamepad",
    "webcam"
  ],
  "access-control": [
    "lock",
    "unlock",
    "lock-keyhole",
    "shield",
    "shield-check",
    "shield-x",
    "shield-alert",
    "shield-lock"
  ],
  "identity-security": [
    "key",
    "key-round",
    "fingerprint",
    "face-id",
    "scan-face",
    "password",
    "pin-code",
    "access-key"
  ],
  "privacy-security": [
    "privacy",
    "incognito",
    "hidden",
    "firewall",
    "antivirus",
    "bug-shield",
    "secure-server",
    "secure-cloud"
  ],
  "authentication": [
    "authentication",
    "two-factor",
    "verified-user",
    "user-blocked",
    "certificate",
    "passkey",
    "security-scan",
    "security-warning"
  ],
  "mapping": [
    "map",
    "map-pin",
    "map-pin-filled",
    "map-pinned",
    "navigation-arrow",
    "compass-map",
    "route-map",
    "directions"
  ],
  "location-services": [
    "location",
    "location-check",
    "location-x",
    "location-plus",
    "current-location",
    "crosshair-location",
    "gps",
    "satellite"
  ],
  "geography": [
    "globe",
    "globe-alt",
    "earth",
    "landmark",
    "building",
    "buildings",
    "road",
    "signpost"
  ],
  "transportation": [
    "car",
    "bus",
    "train",
    "airplane",
    "ship",
    "bike",
    "walking",
    "flag"
  ],
  "coding": [
    "code",
    "code-alt",
    "terminal",
    "command-line",
    "braces",
    "brackets",
    "binary",
    "regex"
  ],
  "version-control": [
    "git-branch",
    "git-commit",
    "git-merge",
    "git-pull-request",
    "git-fork",
    "version-control",
    "repository",
    "package-code"
  ],
  "testing-delivery": [
    "bug",
    "debug",
    "breakpoint",
    "unit-test",
    "integration-test",
    "deploy",
    "rocket",
    "build"
  ],
  "development-infrastructure": [
    "api",
    "webhook",
    "database",
    "cloud-code",
    "server-code",
    "container",
    "settings-code",
    "tools"
  ]
};

export function getIcon(name: IconName): IconDefinition { return icons[name]; }

function escape(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function renderIconSvg(name: IconName, options: IconRenderOptions = {}): string {
  const icon = getIcon(name);
  const size = options.size ?? 24;
  const directionMode = iconDirectionMode(options.direction, options.mirrorInRtl !== false, icon.direction === 'directional');
  const mirrorTransform = explicitMirrorTransform(directionMode);
  const accessibility = options.title ? `role="img" aria-label="${escape(options.title)}"` : 'aria-hidden="true"';
  const className = options.class ? ` class="${escape(options.class)}"` : '';
  const paths = icon.paths.map((path, index) => { const fill = options.colorMode === 'currentColor' ? 'currentColor' : index === 0 ? `var(--simurgh-icon-primary, ${path.fill})` : `var(--simurgh-icon-secondary, ${path.fill})`; return `<path d="${path.d}" fill="${fill}"${path.opacity === undefined ? '' : ` opacity="${path.opacity}"`}/>`; }).join('');
  const directionAttribute = directionMode ? ` data-simurgh-direction="${directionMode}"` : '';
  const directionStyle = directionMode === 'auto' ? `<style>${iconDirectionStyles}</style>` : '';
  const mirrorAttribute = mirrorTransform ? ` transform="${mirrorTransform}"` : '';
  return `<svg width="${escape(String(size))}" height="${escape(String(size))}" viewBox="${icon.viewBox}" ${accessibility} focusable="false"${directionAttribute}${className}>${directionStyle}<g class="simurgh-icon-directional"${mirrorAttribute}><g transform="${icon.transform}">${paths}</g></g></svg>`;
}
