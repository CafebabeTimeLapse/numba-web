import { Component, OnInit, OnDestroy } from "@angular/core";
import { NumbaService } from "../shared/services/numba.service";
import { Numba } from "../shared/models/numba";
import { Subscription } from "rxjs";

@Component({
  selector: "app-select",
  templateUrl: "./select.page.html",
  styleUrls: ["./select.page.scss"],
})
export class SelectPage implements OnInit, OnDestroy {
  numbaList: { [key: string]: Numba[] };
  genres: Set<string>;
  constructor(private numbaService: NumbaService) {}

  sub: Subscription;

  ngOnInit() {
    this.sub = this.numbaService.selectAll().subscribe((data) => {
      this.numbaList = {};
      this.genres = new Set<string>();

      data.forEach((numba) => {
        this.genres.add(numba.genre);
      });

      this.genres.forEach((genre) => {
        this.numbaList[genre] = data.filter((numba) => {
          return numba.genre === genre;
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
