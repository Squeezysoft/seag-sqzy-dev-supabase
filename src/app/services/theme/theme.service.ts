import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ThemeService {
  private readonly darkModeThemeName: string = 'sqzy-dark-mode-theme';
  private readonly lightModeThemeName: string = 'sqzy-light-mode-theme';
  private readonly matchQuerySelector: string = '(prefers-color-scheme: dark)';
  private readonly isDarkThemeSource = new BehaviorSubject<boolean>(false);
  readonly isDarkTheme$: Observable<boolean> = this.isDarkThemeSource.asObservable();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly media: MediaMatcher,
  ) {
    this.detectTheme();
  }

  toggleTheme(): void {
    const isDarkTheme = !this.isDarkThemeSource.getValue();
    this.isDarkThemeSource.next(isDarkTheme);
    if (isDarkTheme) {
      this.document.body.classList.add(this.darkModeThemeName);
    } else {
      this.document.body.classList.remove(this.darkModeThemeName);
    }
  }

  private detectTheme(): void {
    this.document.body.classList.add(this.lightModeThemeName);
    const themeQuery = this.media.matchMedia(this.matchQuerySelector);
    if (themeQuery.matches) {
      this.document.body.classList.add(this.darkModeThemeName);
      this.isDarkThemeSource.next(true);
    } else {
      this.isDarkThemeSource.next(false);
    }
  }
}
