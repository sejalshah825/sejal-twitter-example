import { bufferTime, map, skip, scan } from 'rxjs/operators';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe } from 'rxjs';

import { TwitterDataState } from './twitter-data.reducer';

export const selectMessagesState = createFeatureSelector<TwitterDataState>(
  'twitterData'
);

export const selectSelectedHashtag = createSelector(
  selectMessagesState,
  state => state.selectedHashtag
);

export const selectTweetCount = createSelector(
  selectMessagesState,
  state => state.tweetCount
);

export const selectCountryCodeData = createSelector(
  selectMessagesState,
  state => state.countryCodeData
);

export const selectHashtagTweetCount = createSelector(
  selectTweetCount,
  selectSelectedHashtag,
  (tweetCount, hashtag: string) => tweetCount[hashtag]
);

export const selectCountryCodeDataArray = createSelector(
  selectCountryCodeData,
  countryCodeData => {
    return Object.keys(countryCodeData).map(countryCode => {
      return { name: countryCode, value: countryCodeData[countryCode] };
    });
  }
);

export const selectHashtagHistory = createSelector(
  selectTweetCount,
  tweetCount => Object.keys(tweetCount)
);

/**
 * This selector calculates a rolling average of the amount of tweets coming in per minute.
 * Every second, We read the last 5 tweet count updates in that time frame, and take their
 * average, which gives us average tweets per second. We multiply by 60 to get an approximation of tweets per minute.
 */
export const selectTweetAveragePerMin = pipe(
  select(selectHashtagTweetCount),
  skip(1),
  bufferTime(1000),
  scan((a, c) => {
    a = [...a, c];

    // only store the last 5 values.
    if (a.length > 5) {
      a.shift();
    }

    return a;
  }, []),
  map(buffers => {
    // take the average of the last 5 update counts and multiply by 60 to get avg / min.
    const sum = buffers.reduce((a, c) => a + c.length, 0);
    return Math.round(sum / buffers.length) * 60;
  })
);
