import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StopComponent } from './stop.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: StopComponent }
    ])],
    exports: [RouterModule]
})
export class StopRoutingModule { }
