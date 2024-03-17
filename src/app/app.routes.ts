import { RouterConfigOptions, RouterFeatures, Routes, withRouterConfig, withViewTransitions } from '@angular/router';
import { HomePageComponent, NotFoundPageComponent, StreamPageComponent } from './pages';

const routerConfigOptions: RouterConfigOptions = {
  urlUpdateStrategy: 'deferred',
};

export const routerFeatures: Array<RouterFeatures> = [
  //withDebugTracing(),
  withRouterConfig(routerConfigOptions),
  withViewTransitions(),
];

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomePageComponent,
  },
  {
    path: 'stream/:broadcastId',
    title: 'Stream',
    component: StreamPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
