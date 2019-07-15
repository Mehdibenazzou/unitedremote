import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from '../../app/Services/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  getLikedShops() : Observable<any> {
    return this.http.get(environment.url+"/user/shops/"+this.token.getUsername());
  }

  likeShop(shopId: Int16Array) : Observable<any> {
    return this.http.post(environment.url+"/user/"+this.token.getUsername()+"/"+shopId, null);
  }

  dislikeShop(shopId: Int16Array) : Observable<any> {
    return this.http.post(environment.url+"/user/delete/"+this.token.getUsername()+"/"+shopId, null);
  }
}
