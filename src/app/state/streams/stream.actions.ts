import { createAction, props } from '@ngrx/store';
import { Stream } from '../../models';

export type StreamPayload = { stream: Stream };
export type StreamsPayload = { streams: Array<Stream> };

export enum StreamActions {
  Init = '[Streams] Init',
}

export const streamInitAction = createAction(StreamActions.Init, props<StreamsPayload>());
