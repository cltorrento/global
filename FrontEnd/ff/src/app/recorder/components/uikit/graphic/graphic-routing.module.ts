import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GraphicComponent } from './graphic.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: GraphicComponent }
	])],
	exports: [RouterModule]
})
export class GraphicRoutingModule { }
