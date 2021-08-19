import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';

import { DataStreamService } from '../../services/data-stream.service';
import { TwitterDataActionTypes } from './twitter-data.actions';

@Injectable({
  providedIn: 'root'
})
export class TwitterDataEffects {
  @Effect({ dispatch: false })
  initializeStream$ = this.actions$.pipe(
    ofType(TwitterDataActionTypes.INITIALIZE_STREAM),
    tap(() => this.dataStreamService.initMessageStream()),
    catchError(err => {
      console.log('An error ocurred while initializing the stream.', err);
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private dataStreamService: DataStreamService
  ) {}
}
