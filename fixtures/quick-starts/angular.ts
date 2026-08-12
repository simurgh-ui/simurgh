import { Component } from '@angular/core';
import { ButtonComponent } from '@simurgh-ui/angular/button';
import '@simurgh-ui/styles/button.css';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [ButtonComponent],
  template: `<simurgh-button type="button">Save changes</simurgh-button>`,
})
export class SaveButtonComponent {}
