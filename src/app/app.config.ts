import { HttpClient, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TitleStrategy, provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { Store, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateModuleConfig, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SupabaseClient, SupabaseClientOptions, createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { routerFeatures, routes } from './app.routes';
import { AppState } from './app.state';
import { SupabaseQuery, SupabaseTables } from './constants';
import { Stream } from './models';
import { SupabaseService } from './services';
import { streamInitAction, streamReducer } from './state';
import { TemplatePageTitleStrategy } from './strategies';

const supabaseOptions: SupabaseClientOptions<'public'> = {
  realtime: {
    log_level: 'info',
  },
};

const translateModuleConfig: TranslateModuleConfig = {
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
    deps: [HttpClient],
  },
};

const iconRegistryFactory = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
  return () => {
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
      iconRegistry.addSvgIcon(name, sanitizer.bypassSecurityTrustResourceUrl(path));
    }
  };
};

const translationRegistryFactory = (translateService: TranslateService) => {
  return () => {
    translateService.addLangs(['en', 'es', 'de', 'fr', 'pt', 'it', 'hi', 'ru', 'vi', 'ja', 'ko', 'zh']);
    translateService.setDefaultLang('en');
  };
};

const populateStoreFactory = (store: Store<AppState>, supabaseService: SupabaseService) => {
  return async () => {
    const streams = await supabaseService.getDatabaseRows<Stream>(SupabaseTables.Streams, SupabaseQuery.Streams);
    streams.forEach((stream) => {
      stream.thumbnailUrls = [...Array(6).keys()].map((i) => {
        const path = `${stream.broadcastId}/${stream.broadcastId}-storyboard-${i}.jpg`;
        return supabaseService.getStorageUrl('thumbnails', path);
      });
    });
    console.log('populateStoreFactory.streams:', streams);
    store.dispatch(streamInitAction({ streams: streams }));
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync('animations'),
    provideHttpClient(),
    provideEffects(),
    provideRouter(routes, ...routerFeatures),
    provideRouterStore(),
    provideStore({ router: routerReducer, streams: streamReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
    importProvidersFrom(TranslateModule.forRoot(translateModuleConfig)),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    {
      provide: SupabaseClient,
      useValue: createClient(environment.supabaseUrl, environment.supabaseKey, supabaseOptions),
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
      },
    },
    {
      provide: APP_INITIALIZER,
      useFactory: iconRegistryFactory,
      multi: true,
      deps: [MatIconRegistry, DomSanitizer],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: translationRegistryFactory,
      multi: true,
      deps: [TranslateService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: populateStoreFactory,
      multi: true,
      deps: [Store, SupabaseService],
    },
  ],
};
