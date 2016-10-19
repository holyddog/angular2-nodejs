import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export class Mammal {
  _id: string;
  name: string;
}

@Injectable()
export class AppService {
 	private servUrl = 'data.json';
 	private headers = new Headers({'Content-Type': 'application/json'});

  	constructor(private http: Http) { }

  	private handleError(error: any): Promise<any> {
	  	console.error('An error occurred', error);
	  	return Promise.reject(error.message || error);
	}

	getMammals(): Promise<Mammal[]> {
		return this.http.get(this.servUrl)
               .toPromise()
               .then(
                   response => {
                       return response.json();
                   }
                )
               .catch(this.handleError);
	}
}