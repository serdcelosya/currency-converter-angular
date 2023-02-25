import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Observable } from 'rxjs';
import { CurrencyRateResponse } from '../../../shared/models';

@Component({
	selector: 'app-system',
	templateUrl: './system.component.html',
	styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit {
	currencies$: Observable<CurrencyRateResponse[]>;
	constructor(private currencyService: CurrencyService) {}

	ngOnInit(): void {
		this.currencies$ = this.currencyService.getCurrencies();
	}
}
