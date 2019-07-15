import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from '../../app/Services/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DislikedshopsService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getDislikedShops() : Observable<any> {
    return this.http.get(environment.url + "/user/dislikedshops/" + this.token.getUsername());
  }

  addDislikedShop(shop: any) : Observable<any> {
    return this.http.post(environment.url+ "/user/dislikedshops/" + this.token.getUsername(), shop);
  }

  deleteDislikedShop(shopId: Int16Array) : Observable<any> {
    return this.http.post(environment.url + "/user/dislikedshops/delete/" + this.token.getUsername() + "/" + shopId, null);
  }
}
