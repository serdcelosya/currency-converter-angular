import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components';
import { SystemModule } from './system/system.module';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => SystemModule,
	},
	{ path: 'not-found', component: PageNotFoundComponent },
	{ path: '**', redirectTo: 'not-found' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
