import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pie-chart-card',
  templateUrl: './pie-chart-card.component.html',
  styleUrls: ['./pie-chart-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartCardComponent {
  @Input() public chartData: { name: string; value: number }[] = [];
}
