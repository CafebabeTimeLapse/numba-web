import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumbaPage } from './numba.page';

const routes: Routes = [
  {
    path: '',
    component: NumbaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumbaPageRoutingModule {}
