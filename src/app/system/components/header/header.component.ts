import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyRateResponse } from '../../../shared/models';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
	@Input() currencies: CurrencyRateResponse[];
	constructor() {}
}
