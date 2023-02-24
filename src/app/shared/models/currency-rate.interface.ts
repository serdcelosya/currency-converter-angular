import { Currencies } from './currencies.enum';

export interface CurrencyRate {
	r030: number;
	txt: string;
	rate: number;
	cc: Currencies;
	exchangeDate: string;
}
