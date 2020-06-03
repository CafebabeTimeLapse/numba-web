import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "select",
    loadChildren: () =>
      import("./select/select.module").then((m) => m.SelectPageModule),
  },
  {
    path: "play/:id",
    loadChildren: () =>
      import("./play/play.module").then((m) => m.PlayPageModule),
  },
  {
    path: "info/:id",
    loadChildren: () =>
      import("./info/info.module").then((m) => m.InfoPageModule),
  },
  {
    path: "admin/numba/:id",
    loadChildren: () =>
      import("./admin/numba/numba.module").then((m) => m.NumbaPageModule),
  },
  {
    path: "admin/numba",
    loadChildren: () =>
      import("./admin/numba/numba.module").then((m) => m.NumbaPageModule),
  },
  {
    path: "admin/numba-list",
    loadChildren: () =>
      import("./admin/numba-list/numba-list.module").then(
        (m) => m.NumbaListPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
