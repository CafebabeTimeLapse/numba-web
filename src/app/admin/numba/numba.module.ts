import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { NumbaPageRoutingModule } from "./numba-routing.module";

import { NumbaPage } from "./numba.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NumbaPageRoutingModule,
  ],
  declarations: [NumbaPage],
})
export class NumbaPageModule {}
