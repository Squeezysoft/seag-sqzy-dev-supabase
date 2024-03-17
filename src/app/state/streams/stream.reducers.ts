import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Stream } from '../../models';
import { streamInitAction } from './stream.actions';

export type StreamState = EntityState<Stream>;

export const streamAdapter = createEntityAdapter<Stream>({
  selectId: (stream: Stream) => stream.broadcastId,
});

const initialState = streamAdapter.getInitialState();

export const streamReducer = createReducer<StreamState>(
  initialState,
  on(streamInitAction, (state, action) => streamAdapter.addMany(action.streams, state)),
);
