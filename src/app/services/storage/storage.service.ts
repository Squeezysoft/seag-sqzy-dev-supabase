import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private readonly storage: Storage = this.getStorage();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  geteItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  private getStorage(): Storage {
    return this.document.defaultView.localStorage;
  }
}
