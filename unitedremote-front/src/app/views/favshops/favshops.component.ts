import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-favshops',
  templateUrl: './favshops.component.html'
})
export class FavshopsComponent implements OnInit {

  favShops : Array<any>
  isEmpty : Boolean = false;

  constructor(private userService: UserService) { }

  getFavShops() {
    this.userService.getLikedShops()
      .subscribe(
        data => {
          this.favShops = data;
          if(this.favShops.length) {
            this.isEmpty = false;
          } else {
            this.isEmpty = true;
          }
        }
      )
  }

  dislikeShops(idShop: Int16Array) {
    this.userService.dislikeShop(idShop)
      .subscribe(data => {
        this.getFavShops();
      })
  }

  ngOnInit() {
    this.getFavShops();
  }

}
