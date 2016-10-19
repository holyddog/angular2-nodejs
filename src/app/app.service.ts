import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
	private headers = new Headers({ 'Content-Type': 'application/json' });

	constructor(private http: Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	getMammal(id: number): Promise<Object> {
		return this.http.get('api/mammal/' + id)
			.toPromise()
			.then(response => {
				return response.json();
			})
			.catch(this.handleError);
	}

	getMammals(): Promise<Object[]> {
		return this.http.get('api/mammals')
			.toPromise()
			.then(response => {
				return response.json();
			})
			.catch(this.handleError);
	}
}