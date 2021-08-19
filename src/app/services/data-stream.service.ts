import { Injectable, OnDestroy } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ProcessTweet } from '../store/twitter-data/twitter-data.actions';
import { selectSelectedHashtag } from '../store/twitter-data/twitter-data.selectors';
import { State } from '../store';
import { TwitterMessage } from '../models/twitter-message';

@Injectable({
  providedIn: 'root'
})
export class DataStreamService implements OnDestroy {
  private channel = 'pubnub-twitter';
  private hashtag: string;
  private subs: Subscription[] = [];

  constructor(
    private twitterPubNub: PubNubAngular,
    private store: Store<State>
  ) {
    this.subs.push(
      store.select(selectSelectedHashtag).subscribe(hashtag => {
        this.hashtag = hashtag;
      })
    );
  }

  public initMessageStream() {
    this.twitterPubNub.init({
      subscribeKey: 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe'
    });

    this.twitterPubNub.addListener({
      message: (data: any) => {
        this.processTweet(data);
      }
    });

    this.twitterPubNub.subscribe({
      channels: [this.channel]
    });
  }

  public ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }

    this.twitterPubNub.unsubscribeAll();
    this.twitterPubNub.stop();
  }

  private processTweet(data: any) {
    const tweet: TwitterMessage = data.message;

    if (this.hashtag && this.hasHashtag(tweet)) {
      this.store.dispatch(new ProcessTweet({ hashtag: this.hashtag, tweet }));
    }
  }

  private hasHashtag(tweet: TwitterMessage) {
    return (
      tweet.text.toLowerCase().includes(this.hashtag.toLowerCase()) ||
      tweet.entities.hashtags.find(
        h => h.text.toLowerCase() === this.hashtag.toLowerCase()
      )
    );
  }
}
