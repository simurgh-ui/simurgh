import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InternalIdService {
  private nextId = 0;

  next(prefix: string) {
    this.nextId += 1;
    return `${prefix}-${this.nextId}`;
  }
}
