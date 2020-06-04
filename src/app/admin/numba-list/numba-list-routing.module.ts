import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumbaListPage } from './numba-list.page';

const routes: Routes = [
  {
    path: '',
    component: NumbaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumbaListPageRoutingModule {}
