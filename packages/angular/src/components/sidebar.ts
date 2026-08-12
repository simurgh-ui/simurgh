import {
  Component,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { createId } from '@simurgh-ui/core';

@Component({
  selector: 'simurgh-sidebar-provider',
  standalone: true,
  template: `<ng-content />`,
  host: { 'data-slot': 'sidebar-provider' },
})
export class SidebarProviderComponent {
  @Input() open = true;
  @Output() openChange = new EventEmitter<boolean>();
  readonly contentId = createId('sidebar');
  @HostBinding('attr.data-state') get state() {
    return this.open ? 'open' : 'closed';
  }
  setOpen(open: boolean) {
    this.open = open;
    this.openChange.emit(open);
  }
}

@Directive({
  selector: 'aside[simurghSidebar]',
  standalone: true,
  host: { 'data-slot': 'sidebar' },
})
export class SidebarDirective {
  @Input() side: 'start' | 'end' = 'start';
  private provider = inject(SidebarProviderComponent);
  @HostBinding('id') get id() {
    return this.provider.contentId;
  }
  @HostBinding('attr.data-side') get dataSide() {
    return this.side;
  }
  @HostBinding('attr.data-state') get state() {
    return this.provider.open ? 'open' : 'closed';
  }
  @HostBinding('attr.hidden') get hidden() {
    return this.provider.open ? null : '';
  }
}

@Directive({
  selector: 'button[simurghSidebarTrigger]',
  standalone: true,
  host: { 'data-slot': 'sidebar-trigger', type: 'button' },
})
export class SidebarTriggerDirective {
  private provider = inject(SidebarProviderComponent);
  @HostBinding('attr.aria-controls') get controls() {
    return this.provider.contentId;
  }
  @HostBinding('attr.aria-expanded') get expanded() {
    return this.provider.open;
  }
  @HostListener('click') toggle() {
    this.provider.setOpen(!this.provider.open);
  }
}

@Directive({
  selector: '[simurghSidebarHeader]',
  standalone: true,
  host: { 'data-slot': 'sidebar-header' },
})
export class SidebarHeaderDirective {}

@Directive({
  selector: '[simurghSidebarContent]',
  standalone: true,
  host: { 'data-slot': 'sidebar-content' },
})
export class SidebarContentDirective {}

@Directive({
  selector: '[simurghSidebarFooter]',
  standalone: true,
  host: { 'data-slot': 'sidebar-footer' },
})
export class SidebarFooterDirective {}

@Directive({
  selector: '[simurghSidebarGroup]',
  standalone: true,
  host: { 'data-slot': 'sidebar-group' },
})
export class SidebarGroupDirective {}

@Directive({
  selector: 'ul[simurghSidebarMenu]',
  standalone: true,
  host: { 'data-slot': 'sidebar-menu' },
})
export class SidebarMenuDirective {}
