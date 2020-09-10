import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = 'http://localhost:3002';

  constructor(private http: HttpClient) { }


  get(apiName, body?) {
    return this.http.get(`${this.url}/${apiName}`);
  }

  post(apiName, body?) {
    return this.http.post(`${this.url}/${apiName}`, body);
  }

  delete(apiName, body?) {
    
    return this.http.delete(`${this.url}/${apiName}`, body);
  }

  update(apiName, body?) {
    return this.http.post(`${this.url}/${apiName}`, body);
  }

}
