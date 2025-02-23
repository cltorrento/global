import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        DashboardsRoutingModule,
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
