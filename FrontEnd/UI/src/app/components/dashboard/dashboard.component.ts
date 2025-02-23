import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(public layoutService: LayoutService) {
  }
}