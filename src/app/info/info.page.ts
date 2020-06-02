import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NumbaService } from "../shared/services/numba.service";
import { Numba } from "../shared/models/numba";

@Component({
  selector: "app-info",
  templateUrl: "./info.page.html",
  styleUrls: ["./info.page.scss"],
})
export class InfoPage implements OnInit {
  numba: Numba;
  numDigits: number;

  constructor(
    private route: ActivatedRoute,
    private numbaService: NumbaService
  ) {}

  ngOnInit() {
    this.numDigits = 20;
    this.route.params.subscribe((param) => {
      this.numbaService.selectById(param.id).subscribe((data) => {
        this.numba = data;
      });
    });
  }
}
