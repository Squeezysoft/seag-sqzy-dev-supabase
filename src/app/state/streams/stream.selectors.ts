import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParams } from '../router/router.selectors';
import { StreamState, streamAdapter } from './stream.reducers';

export const streamsFeatureSelector = createFeatureSelector<StreamState>('streams');

const { selectEntities, selectAll } = streamAdapter.getSelectors();

export const selectStreamEntities = createSelector(streamsFeatureSelector, selectEntities);

export const selectAllStreams = createSelector(streamsFeatureSelector, selectAll);

export const selectStream = createSelector(
  selectStreamEntities,
  selectRouteParams,
  (streams, params) => streams[params['broadcastId']],
);
