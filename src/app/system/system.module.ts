import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';
import { HeaderComponent } from './components /header/header.component';
import { ConverterComponent } from './components /converter/converter.component';
import { SystemComponent } from './containers';
import { CurrencyService } from './services/currency.service';

@NgModule({
	declarations: [SystemComponent, HeaderComponent, ConverterComponent],
	imports: [CommonModule, SystemRoutingModule],
	providers: [CurrencyService],
})
export class SystemModule {}
