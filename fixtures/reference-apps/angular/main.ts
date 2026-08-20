import '@angular/compiler';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ButtonComponent } from '@simurgh-ui/angular/button';
import { CheckboxComponent } from '@simurgh-ui/angular/checkbox';
import { InputComponent } from '@simurgh-ui/angular/input';
import { PopoverComponent } from '@simurgh-ui/angular/popover';
import '../theme.css';

@Component({
  selector: 'reference-app',
  standalone: true,
  imports: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    PopoverComponent,
  ],
  template: `<main class="reference-app">
    <h1>Angular reference</h1>
    <form>
      <simurgh-input name="email" type="email" required placeholder="Email" />
      <simurgh-checkbox name="updates">Product updates</simurgh-checkbox>
      <simurgh-button type="submit">Join</simurgh-button>
    </form>
    <simurgh-popover contentLabel="Account help">
      <span trigger>Account help</span>
      <p>Contact support@example.com.</p>
    </simurgh-popover>
  </main>`,
})
export class AppComponent {}

if (typeof document !== 'undefined') void bootstrapApplication(AppComponent);
