import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
	CurrencyRateResponse,
	Currencies,
	ConvertedRateResponse,
} from '../../shared/models';

@Injectable({
	providedIn: 'root',
})
export class CurrencyService {
	constructor(private http: HttpClient) {}

	getCurrencies(): Observable<CurrencyRateResponse[]> {
		return this.http
			.get<CurrencyRateResponse[]>(
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

	convert(
		amount: number,
		from: string,
		to: string
	): Observable<ConvertedRateResponse> {
		return this.http.get<ConvertedRateResponse>(
			`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
		);
	}
}
