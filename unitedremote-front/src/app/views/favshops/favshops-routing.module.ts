import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavshopsComponent } from './favshops.component';

const routes: Routes = [
  {
    path: '',
    component: FavshopsComponent,
    data: {
      title: 'My preferred shops'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class FavshopsRoutingModule {}
