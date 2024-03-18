import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TitleStrategy, provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SupabaseClient, SupabaseClientOptions, createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { routerFeatures, routes } from './app.routes';
import { streamReducer } from './state';
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
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
    {
      provide: SupabaseClient,
      useValue: createClient(environment.supabaseUrl, environment.supabaseKey, supabaseOptions),
    },
  ],
};
