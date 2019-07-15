import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavshopsComponent } from './favshops.component';
import { FavshopsRoutingModule } from './favshops-routing.module';

@NgModule({
  declarations: [FavshopsComponent],
  imports: [
    CommonModule, 
    FavshopsRoutingModule
  ]
})
export class FavshopsModule { }
