import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuEntry } from '../../models';
import { StorageService } from '../../services';

const components: Array<Type<unknown>> = [];
const directives: Array<Type<unknown>> = [];
const modules: Array<Type<unknown>> = [
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
];
const services: Array<Type<unknown>> = [StorageService];

@Component({
  selector: 'sqzy-language-selector',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectorComponent {
  private readonly languageKey: string = 'language';

  readonly menuEntries: Array<MenuEntry<string>> = [
    { id: 0, icon: 'en-US', isSvg: true, text: 'English', value: 'en-US' },
    { id: 1, icon: 'es-ES', isSvg: true, text: 'Español', value: 'es-ES' },
    { id: 2, icon: 'de-DE', isSvg: true, text: 'Deutsch', value: 'de-DE' },
    { id: 3, icon: 'fr-FR', isSvg: true, text: 'Français', value: 'fr-FR' },
    { id: 4, icon: 'pt-BR', isSvg: true, text: 'Português', value: 'pt-BR' },
    { id: 5, icon: 'it-IT', isSvg: true, text: 'Italiano', value: 'it-IT' },
    { id: 6, icon: 'hi-IN', isSvg: true, text: 'हिंदी', value: 'hi-IN' },
    { id: 7, icon: 'ru-RU', isSvg: true, text: 'русский', value: 'ru-RU' },
    { id: 8, icon: 'vi-VN', isSvg: true, text: 'Tiếng Việt', value: 'vi-VN' },
    { id: 9, icon: 'ja-JP', isSvg: true, text: '日本語', value: 'ja-JP' },
    { id: 10, icon: 'ko-KR', isSvg: true, text: '한국인', value: 'ko-KR' },
    { id: 11, icon: 'zh-CN', isSvg: true, text: '中国人', value: 'zh-CN' },
  ];

  constructor(private readonly storageService: StorageService) {}

  onMenuSelected(language: string): void {
    console.log('onMenuSelected:', language);
    this.storageService.setItem(this.languageKey, language);
  }
}
