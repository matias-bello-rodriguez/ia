import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, MetricItem, BarDataItem, PieDataItem } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  metrics: MetricItem[] = [];
  barData: BarDataItem[] = [];
  pieData: PieDataItem[] = [];
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.metrics = data.metrics;
        this.barData = data.barData;
        this.pieData = data.pieData;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get barMax(): number {
    return Math.max(...this.barData.map((b) => b.value));
  }

  barHeight(value: number): number {
    const max = this.barMax;
    return max > 0 ? (value / max) * 200 : 0;
  }

  get pieChartBackground(): string {
    let acc = 0;
    const parts = this.pieData.map((p) => {
      const start = acc;
      acc += p.value;
      return `${p.color} ${start}% ${acc}%`;
    });
    return `conic-gradient(${parts.join(', ')})`;
  }
}
