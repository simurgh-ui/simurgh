import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideServerRendering,
  renderApplication,
} from '@angular/platform-server';
import { AppComponent } from './main.js';

export function render() {
  return renderApplication(
    (context) =>
      bootstrapApplication(
        AppComponent,
        { providers: [provideServerRendering()] },
        context,
      ),
    { document: '<!doctype html><reference-app></reference-app>', url: '/' },
  );
}
