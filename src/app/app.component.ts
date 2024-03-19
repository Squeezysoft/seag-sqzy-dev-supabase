import { ChangeDetectionStrategy, Component, OnInit, Type, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageSelectorComponent, NavigationDrawerComponent, ThemeSelectorComponent } from './components';
import { Stream } from './models';
import { SupabaseService } from './services';
import { streamInitAction } from './state';

const components: Array<Type<unknown>> = [LanguageSelectorComponent, NavigationDrawerComponent, ThemeSelectorComponent];
const directives: Array<Type<unknown>> = [RouterLink, RouterLinkActive, RouterOutlet];
const modules: Array<Type<unknown>> = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  TranslateModule,
];
const services: Array<Type<unknown>> = [SupabaseService, TranslateService];

@Component({
  selector: 'sqzy-app',
  standalone: true,
  imports: [...components, ...directives, ...modules],
  providers: [...services],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly title: string = 'Seagull Archive';

  @ViewChild('drawer', { static: true }) drawer: MatDrawer;

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
    private readonly store: Store,
    private readonly supabaseService: SupabaseService,
    private readonly translateService: TranslateService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.registerIcons();
    this.registerTranslations();

    await this.drawer.toggle();

    //this.supabaseService.getRealtime('rooms', 'status');

    const table = 'streams';
    const query = `
      *,
      chapters (
        id,
        offset,
        duration,
        game:games ( id, title, description, slug, thumbnailUrl )
      ),
      tags ( id, name )
    `;
    const streams = await this.supabaseService.getDatabaseRows<Stream>(table, query);
    streams.forEach((stream) => {
      stream.thumbnailUrls = [...Array(6).keys()].map((i) => {
        const path = `${stream.broadcastId}/${stream.broadcastId}-storyboard-${i}.jpg`;
        return this.supabaseService.getStorageUrl('thumbnails', path);
      });
    });
    console.log('AppComponent.ngOnInit.streams:', streams);
    this.store.dispatch(streamInitAction({ streams: streams }));
  }

  async onToggleDrawerClicked(): Promise<void> {
    await this.drawer.toggle();
  }

  private registerIcons(): void {
    const icons = new Map<string, string>([
      ['en-US', 'assets/images/svg/flags/en-US.svg'],
      ['es-ES', 'assets/images/svg/flags/es-ES.svg'],
      ['de-DE', 'assets/images/svg/flags/de-DE.svg'],
      ['fr-FR', 'assets/images/svg/flags/fr-FR.svg'],
      ['pt-BR', 'assets/images/svg/flags/pt-BR.svg'],
      ['it-IT', 'assets/images/svg/flags/it-IT.svg'],
      ['hi-IN', 'assets/images/svg/flags/hi-IN.svg'],
      ['ru-RU', 'assets/images/svg/flags/ru-RU.svg'],
      ['vi-VN', 'assets/images/svg/flags/vi-VN.svg'],
      ['ja-JP', 'assets/images/svg/flags/ja-JP.svg'],
      ['ko-KR', 'assets/images/svg/flags/ko-KR.svg'],
      ['zh-CN', 'assets/images/svg/flags/zh-CN.svg'],
      ['github', 'assets/images/svg/github.svg'],
      ['instagram', 'assets/images/svg/instagram.svg'],
      ['twitch', 'assets/images/svg/twitch.svg'],
      ['twitter', 'assets/images/svg/twitter.svg'],
      ['youtube', 'assets/images/svg/youtube.svg'],
    ]);
    for (const [name, path] of icons) {
      this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(path));
    }
  }

  private registerTranslations(): void {
    this.translateService.addLangs(['en', 'es', 'de', 'fr', 'pt', 'it', 'hi', 'ru', 'vi', 'ja', 'ko', 'zh']);
    this.translateService.setDefaultLang('en');
  }
}
