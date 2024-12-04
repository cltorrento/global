import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './recorder/components/notfound/notfound.component';
import { CustomService } from './recorder/service/custom.service';
import { StatisticsService } from './recorder/service/statistics.service';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SpinnerComponent } from './recorder/components/spinner/spinner.component';
import { ProgressBarModule } from 'primeng/progressbar';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, SpinnerComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule, ProgressBarModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CustomService, StatisticsService, DatePipe, TableModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
