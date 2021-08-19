import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectSelectedHashtag,
  selectHashtagTweetCount,
  selectTweetAveragePerMin,
  selectCountryCodeDataArray
} from '../../store/twitter-data/twitter-data.selectors';
import { SetSelectedHashtag } from '../../store/twitter-data/twitter-data.actions';
import { State } from '../../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public selectedHashtag$: Observable<string>;
  public selectedHashtagTweetCount$: Observable<number>;
  public selectedHashtagAvgPerMin$: Observable<number>;
  public chartData$: Observable<{ name: string; value: number }[]>;

  public hashtagFormControl = new FormControl('', [Validators.required]);

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.selectedHashtag$ = this.store.select(selectSelectedHashtag);
    this.selectedHashtagTweetCount$ = this.store.select(
      selectHashtagTweetCount
    );
    this.selectedHashtagAvgPerMin$ = this.store.pipe(selectTweetAveragePerMin);
    this.chartData$ = this.store.select(selectCountryCodeDataArray);
  }

  public setSelectedHashtag(hashtag: string) {
    if (hashtag) {
      this.store.dispatch(new SetSelectedHashtag({ hashtag }));
    }
  }
}
