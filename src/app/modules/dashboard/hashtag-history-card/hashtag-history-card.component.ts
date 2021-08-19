import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectHashtagHistory } from '../../../store/twitter-data/twitter-data.selectors';
import { SetSelectedHashtag } from '../../../store/twitter-data/twitter-data.actions';
import { State } from '../../../store';

@Component({
  selector: 'app-hashtag-history-card',
  templateUrl: './hashtag-history-card.component.html',
  styleUrls: ['./hashtag-history-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HashtagHistoryCardComponent implements OnInit {
  public hashtags$: Observable<string[]>;

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.hashtags$ = this.store.select(selectHashtagHistory);
  }

  public setSelectedHashtag(hashtag: string) {
    this.store.dispatch(new SetSelectedHashtag({ hashtag }));
  }
}
