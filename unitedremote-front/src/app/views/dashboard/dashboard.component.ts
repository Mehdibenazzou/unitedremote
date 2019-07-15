import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../../Services/shops.service';
import { UserService } from '../../Services/user.service';
import { DislikedshopsService } from '../../Services/dislikedshops.service';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  shops: Array<any>
  shopsSorted: Array<any>
  likedShops: Array<any>
  dislikedShops: Array<any>
  

  isEmpty: Boolean = false;
  hoursNow: number;
  minutesNow: number;
  secondsNow: number;
  lastElement: any;
  saveTimeToSplit: String;
  saveTime: string[];
  hours: number;
  minutes: number;
  seconds: number;
  saveTimeMilliseconds: number;
  nowTimeMilliseconds: number;

  theDate: Date;

  ONE_HOUR: number = 2 * (60 * 60 * 1000);

  constructor(private Service : ShopsService, private userService : UserService, private dislikedShopsService: DislikedshopsService) {
  }

  getShops() {
    this.Service.getShops()
      .subscribe(
        data => {
          this.shops = data;
          this.shopsSorted = this.shops.sort((a,b) => a["distance"]-b["distance"]);
          this.userService.getLikedShops()
            .subscribe(
              data => {
                this.likedShops = data;
                this.likedShops.forEach(element => {
                  this.shopsSorted = this.shopsSorted.filter((a) => a["id"] != element["id"])
                });
              }
          )
          this.dislikedShopsService.getDislikedShops()
              .subscribe(
                data => {
                  this.dislikedShops = data;
                  if(this.dislikedShops.length) {
                    this.hoursNow = new Date().getHours()
                    this.minutesNow = new Date().getMinutes()
                    this.secondsNow = new Date().getSeconds()

                    this.dislikedShops.forEach(element => {
                      this.saveTimeToSplit = element["date"];
                      this.saveTime = this.saveTimeToSplit.split(":");

                      this.hours = parseInt(this.saveTime[0]);
                      this.minutes = parseInt(this.saveTime[1]);
                      this.seconds = parseInt(this.saveTime[2]);

                      this.saveTimeMilliseconds = this.toMilliseconds(this.hours, this.minutes, this.seconds);
                      this.nowTimeMilliseconds = this.toMilliseconds(this.hoursNow, this.minutesNow, this.secondsNow);

                      this.shopsSorted = this.shopsSorted.filter((a) => a["nom"] != element["nom"])
                      console.log(this.nowTimeMilliseconds - this.saveTimeMilliseconds + " ms")

                      if((this.nowTimeMilliseconds - this.saveTimeMilliseconds) > this.ONE_HOUR) {
                        this.deleteDislikedShop(element["id"])
                      }
                    });
                  }
                }
            )
        }
      )
  }

  likeShops(idShop: Int16Array) {
    this.userService.likeShop(idShop)
      .subscribe(
        data => {
          swal.fire(data['message']);
          this.getShops();
        }
      )
  }

  dislikeShop(shop: any) {
    this.dislikedShopsService.addDislikedShop(shop)
      .subscribe(
        data => {
          swal.fire(data['message']);
          this.getShops();
        }
      )
  }

  deleteDislikedShop(shopId: Int16Array) {
    this.dislikedShopsService.deleteDislikedShop(shopId)
      .subscribe(
        data => {
          console.log(data);
        }
      )
  }

  toMilliseconds(hours: number, minutes: number, seconds: number) {
    return ((hours*60*60 + minutes*60 + seconds)*1000)
  }

  ngOnInit(): void {
    this.getShops();
  }
}
