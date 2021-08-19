import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { InitializeStream } from './store/twitter-data/twitter-data.actions';
import { State } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Sejal example';

  constructor(private store: Store<State>) {}

  public ngOnInit() {
    this.store.dispatch(new InitializeStream());
  }
}
