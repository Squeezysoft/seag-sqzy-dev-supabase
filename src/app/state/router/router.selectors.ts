import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
  // select the current route
  selectCurrentRoute,
  // select the current route fragment
  selectFragment,
  // select the current route query params
  selectQueryParams,
  // factory function to select a query param
  selectQueryParam,
  // select the current route params
  selectRouteParams,
  // factory function to select a route param
  selectRouteParam,
  // select the current route data
  selectRouteData,
  // factory function to select a route data param
  selectRouteDataParam,
  // select the current url
  selectUrl,
  // select the title if available
  selectTitle,
} = getRouterSelectors();
