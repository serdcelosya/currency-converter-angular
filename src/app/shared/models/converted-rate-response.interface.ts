type Query = {
	amount?: number;
	from: string;
	to: string;
};
export interface ConvertedRateResponse {
	date?: string;
	historical?: boolean;
	info?: any;
	motd?: any;
	query?: Query;
	result?: number;
	success?: boolean;
}
