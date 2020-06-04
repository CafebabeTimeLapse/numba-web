import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NumbaService } from "src/app/shared/services/numba.service";
import { Numba } from "src/app/shared/models/numba";
import { NavController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-numba",
  templateUrl: "./numba.page.html",
  styleUrls: ["./numba.page.scss"],
})
export class NumbaPage implements OnInit {
  numba: Numba;
  createMode: boolean;
  numbaForm: FormGroup;
  numbaNickname: string;

  constructor(
    private route: ActivatedRoute,
    private numbaService: NumbaService,
    private nav: NavController,
    private formBuilder: FormBuilder
  ) {}

  private _initializeForm(data: Numba) {
    this.numbaForm = this.formBuilder.group({
      id: [(data && data.id) || "", [Validators.required]],
      genre: [(data && data.genre) || "", [Validators.required]],
      description: [(data && data.description) || ""],
      value: [(data && data.value) || ""],
      unit: [(data && data.unit) || ""],
      orderOfMagnitude: [(data && data.orderOfMagnitude) || ""],
      priority: [(data && data.priority) || 0],
      notes: [(data && data.notes) || ""],
      nickname: [(data && data.nickname) || ""],
      reference: [(data && data.reference) || ""],
    });
  }

  ngOnInit() {
    this._initializeForm(<Numba>{});

    this.route.params.subscribe((param) => {
      if (param && param.id) {
        this.createMode = false;
        this.numbaService.selectById(param.id).subscribe((data) => {
          this.numbaNickname = data.nickname || "";
          this._initializeForm(data);
        });
      } else {
        this.numbaNickname = "";
        this.createMode = true;
      }
    });
  }

  submit() {
    if (this.numbaForm.invalid) {
      return;
    }
    let numba = this.numbaForm.value;
    if (this.createMode) {
      this.numbaService.create(numba).then(() => this.nav.pop());
    } else {
      this.numbaService.update(numba).then(() => this.nav.pop());
    }
  }

  delete() {
    if (this.numbaForm.invalid) {
      return;
    }
    let numba = this.numbaForm.value;
    this.nav.pop().then(() => this.numbaService.delete(numba));
  }
}
