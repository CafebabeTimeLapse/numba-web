import { Component, OnInit } from "@angular/core";
import { NumbaService } from "src/app/shared/services/numba.service";
import { Numba } from "src/app/shared/models/numba";

@Component({
  selector: "app-numba-list",
  templateUrl: "./numba-list.page.html",
  styleUrls: ["./numba-list.page.scss"],
})
export class NumbaListPage implements OnInit {
  genres: Set<string>;
  numbaList: { [key: string]: Numba[] };
  numDigits: number;
  constructor(private numbaService: NumbaService) {}

  ngOnInit() {
    this.numDigits = 10;
    this.numbaService.selectAll().subscribe((data) => {
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
}
