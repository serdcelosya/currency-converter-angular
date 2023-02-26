import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from '../../services/currency.service';
import { finalize, Subject, switchMap, takeUntil } from 'rxjs';
import { Currencies, Rate } from '../../../shared/models';

@Component({
	selector: 'app-converter',
	templateUrl: './converter.component.html',
	styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
	converterForm: FormGroup;
	private destroyOne$: Subject<boolean> = new Subject<boolean>();
	private destroyTwo$: Subject<boolean> = new Subject<boolean>();
	rate: Rate;
	currencies = Object.values(Currencies);
	constructor(
		private formBuilder: FormBuilder,
		private currencyService: CurrencyService
	) {
		this.converterForm = this.formBuilder.group({
			fromValue: [0, [Validators.required]],
			toValue: [0, [Validators.required]],
			fromName: '',
			toName: '',
		});
	}

	ngOnInit(): void {
		this.rate = {
			fromValue: 1,
			toValue: 0,
			fromName: Currencies.USD,
			toName: Currencies.UAH,
			date: '',
		};

		this.currencyService
			.convert(this.rate.fromValue, this.rate.fromName, this.rate.toName)
			.subscribe(rate => {
				this.rate.toValue = rate.result;
				this.rate.date = rate.date;
			});
	}

	onAmountChange(): void {
		this.destroyTwo$.next(true);
		this.destroyTwo$.unsubscribe();

		this.converterForm.valueChanges
			.pipe(
				takeUntil(this.destroyOne$),
				switchMap(res => {
					return this.currencyService.convert(
						res.fromValue,
						res.fromName,
						res.toName
					);
				}),
				finalize(() => {
					this.destroyTwo$ = new Subject<boolean>();
				})
			)
			.subscribe(rate => {
				this.rate.toValue = rate.result;
			});
	}

	onConvertedAmount(): void {
		this.destroyOne$.next(true);
		this.destroyOne$.unsubscribe();

		this.converterForm.valueChanges
			.pipe(
				takeUntil(this.destroyTwo$),
				switchMap(res => {
					return this.currencyService.convert(
						res.toValue,
						res.toName,
						res.fromName
					);
				}),
				finalize(() => {
					this.destroyOne$ = new Subject<boolean>();
				})
			)
			.subscribe(rate => {
				this.rate.fromValue = rate.result;
			});
	}
}
