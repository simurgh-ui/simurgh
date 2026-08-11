import { Component, Directive, Input } from '@angular/core';

@Component({
  selector: 'simurgh-navigation-menu',
  standalone: true,
  template: `<nav data-slot="navigation-menu" [attr.aria-label]="label">
    <ng-content />
  </nav>`,
})
export class NavigationMenuComponent {
  @Input() label = 'Main navigation';
}

@Directive({
  selector: 'ul[simurghNavigationMenuList]',
  standalone: true,
  host: { 'data-slot': 'navigation-menu-list' },
})
export class NavigationMenuListDirective {}

@Directive({
  selector: 'li[simurghNavigationMenuItem]',
  standalone: true,
  host: { 'data-slot': 'navigation-menu-item' },
})
export class NavigationMenuItemDirective {}

@Directive({
  selector: 'a[simurghNavigationMenuLink]',
  standalone: true,
  host: {
    'data-slot': 'navigation-menu-link',
    '[attr.aria-current]': "current ? 'page' : null",
  },
})
export class NavigationMenuLinkDirective {
  @Input() current = false;
}
