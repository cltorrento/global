import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopRoutingModule } from './stop-routing.module';
import { StopComponent } from './stop.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';


@NgModule({
    imports: [
        CommonModule,
        StopRoutingModule,
        DialogModule,
        ConfirmDialogModule,
        ToastModule,
        ConfirmPopupModule
    ],
    declarations: [StopComponent]
})
export class StopModule { }
