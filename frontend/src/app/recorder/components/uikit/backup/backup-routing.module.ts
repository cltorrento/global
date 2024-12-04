import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackupComponent } from './backup.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BackupComponent }
	])],
	exports: [RouterModule]
})
export class BackupRoutingModule { }
