import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './containers';
import { ConverterComponent } from './components/converter/converter.component';

const systemRoutes: Routes = [
	{
		path: '',
		component: SystemComponent,
		children: [{ path: '', component: ConverterComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forChild(systemRoutes)],
	exports: [RouterModule],
})
export class SystemRoutingModule {}
