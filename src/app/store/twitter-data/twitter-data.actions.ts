import { Action } from '@ngrx/store';

import { TwitterMessage } from '../../models/twitter-message';

export enum TwitterDataActionTypes {
  SET_SELECTED_HASHTAG = '[User] Set Selected Hashtag',
  PROCESS_TWEET = '[API] Process tweet',
  INITIALIZE_STREAM = '[User] Initialize message stream'
}

export class SetSelectedHashtag implements Action {
  readonly type = TwitterDataActionTypes.SET_SELECTED_HASHTAG;

  constructor(readonly payload: { hashtag: string }) {}
}

export class ProcessTweet implements Action {
  readonly type = TwitterDataActionTypes.PROCESS_TWEET;

  constructor(readonly payload: { hashtag: string; tweet: TwitterMessage }) {}
}

export class InitializeStream implements Action {
  readonly type = TwitterDataActionTypes.INITIALIZE_STREAM;
}

export type TwitterDataActionsUnion =
  | SetSelectedHashtag
  | ProcessTweet
  | InitializeStream;
