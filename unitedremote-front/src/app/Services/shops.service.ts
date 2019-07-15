import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private http : HttpClient) { }

  getShops() : Observable<any> {
    return this.http.get(environment.url + "/shops/all");
  }
}
