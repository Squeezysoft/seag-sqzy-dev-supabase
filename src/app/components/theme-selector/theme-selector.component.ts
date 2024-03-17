import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, Renderer2, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

enum ThemeType {
  DarkMode,
  LightMode,
}

interface MenuEntry {
  id: number;
  icon: string;
  text: string;
  type: ThemeType;
}

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [];
const modules: Array<Type<unknown>> = [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule];
const services: Array<Type<unknown>> = [];

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
  private readonly darkModeThemeClassName: string = 'sqzy-dark-mode-theme';
  private readonly lightModeThemeClassName: string = 'sqzy-light-mode-theme';
  private readonly matchQuerySelector: string = '(prefers-color-scheme: dark)';

  readonly themeType = ThemeType;
  readonly menuEntries: Array<MenuEntry> = [
    { id: 0, icon: 'dark_mode', text: 'Dark Mode', type: ThemeType.DarkMode },
    { id: 1, icon: 'light_mode', text: 'Light Mode', type: ThemeType.LightMode },
  ];

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly media: MediaMatcher,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const themeQuery = this.media.matchMedia(this.matchQuerySelector);
    if (themeQuery.matches) {
      this.renderer.addClass(this.document.body, this.darkModeThemeClassName);
    }
  }

  onMenuSelected(themeType: ThemeType): void {
    switch (themeType) {
      case ThemeType.DarkMode: {
        this.renderer.addClass(this.document.body, this.darkModeThemeClassName);
        break;
      }
      case ThemeType.LightMode: {
        this.renderer.removeClass(this.document.body, this.darkModeThemeClassName);
        break;
      }
    }
  }
}
