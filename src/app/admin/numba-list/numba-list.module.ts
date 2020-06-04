import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumbaListPageRoutingModule } from './numba-list-routing.module';

import { NumbaListPage } from './numba-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumbaListPageRoutingModule
  ],
  declarations: [NumbaListPage]
})
export class NumbaListPageModule {}
