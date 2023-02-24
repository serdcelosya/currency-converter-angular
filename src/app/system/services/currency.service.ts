import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrencyRate, Currencies } from '../../shared/models';

@Injectable({
	providedIn: 'root',
})
export class CurrencyService {
	constructor(private http: HttpClient) {}

	getCurrencies(): Observable<CurrencyRate[]> {
		return this.http
			.get<CurrencyRate[]>(
				'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
			)
			.pipe(
				map(res =>
					res.filter(currency =>
						Object.values(Currencies).includes(currency.cc)
					)
				)
			);
	}
}
