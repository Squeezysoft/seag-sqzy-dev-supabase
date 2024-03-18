import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Renderer2, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuEntry } from '../../models';
import { StorageService } from '../../services';

const darkModeThemeClassName = 'sqzy-dark-mode-theme';
const lightModeThemeClassName = 'sqzy-light-mode-theme';

enum ThemeType {
  DarkMode = darkModeThemeClassName,
  LightMode = lightModeThemeClassName,
}

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [];
const modules: Array<Type<unknown>> = [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule];
const services: Array<Type<unknown>> = [StorageService];

@Component({
  selector: 'sqzy-theme-selector',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent implements OnInit {
  private readonly matchQuerySelector: string = '(prefers-color-scheme: dark)';
  private readonly themeKey: string = 'theme';

  readonly themeType = ThemeType;
  readonly menuEntries: Array<MenuEntry<ThemeType>> = [
    { id: 0, icon: 'dark_mode', text: 'Dark Mode', value: ThemeType.DarkMode },
    { id: 1, icon: 'light_mode', text: 'Light Mode', value: ThemeType.LightMode },
  ];

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly media: MediaMatcher,
    private readonly renderer: Renderer2,
    private readonly storageService: StorageService,
  ) {}

  ngOnInit(): void {
    const theme = this.storageService.geteItem(this.themeKey);
    if (theme) {
      this.renderer.addClass(this.document.body, theme);
    } else {
      const query = this.media.matchMedia(this.matchQuerySelector);
      if (query.matches) {
        this.renderer.addClass(this.document.body, darkModeThemeClassName);
        this.storageService.setItem(this.themeKey, darkModeThemeClassName);
      }
    }
  }

  onMenuSelected(themeType: ThemeType): void {
    switch (themeType) {
      case ThemeType.DarkMode: {
        this.renderer.addClass(this.document.body, darkModeThemeClassName);
        this.storageService.setItem(this.themeKey, darkModeThemeClassName);
        break;
      }
      case ThemeType.LightMode: {
        this.renderer.removeClass(this.document.body, darkModeThemeClassName);
        this.storageService.setItem(this.themeKey, lightModeThemeClassName);
        break;
      }
    }
  }
}
