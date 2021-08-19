import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-display-card',
  templateUrl: './data-display-card.component.html',
  styleUrls: ['./data-display-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataDisplayCardComponent {
  @Input() public data = 0;
  @Input() public dataLabel: string;

  public selectedHashtagTweetCount$: Observable<number>;
}
