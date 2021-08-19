import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { TwitterDataEffects } from './twitter-data/twitter-data.effects';
import {
  TwitterDataState,
  twitterDataReducer
} from './twitter-data/twitter-data.reducer';

export interface State {
  twitterData: TwitterDataState;
}

export const reducers: ActionReducerMap<State> = {
  twitterData: twitterDataReducer
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TwitterDataEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
})
export class TwitterStoreModule {}
