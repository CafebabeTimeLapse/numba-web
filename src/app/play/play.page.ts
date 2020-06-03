import { HostListener, Component, OnInit } from "@angular/core";
import { KEYCODE } from "../shared/enum/key-code.enum";
import { Numba } from "../shared/models/numba";
import { NumbaService } from "../shared/services/numba.service";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-play",
  templateUrl: "./play.page.html",
  styleUrls: ["./play.page.scss"],
})
export class PlayPage implements OnInit {
  disp: string[][];
  dispPos: number;
  ansPos: number;
  width: number;
  height: number;

  ans: Numba;

  ansString: string;

  constructor(
    private route: ActivatedRoute,
    private numbaService: NumbaService,
    public alertController: AlertController
  ) {}

  async ngOnInit() {
    this.width = 10;
    this.height = 10;
    this.ansPos = 0;
    this.clearDisp();
    this.route.params.subscribe((param) => {
      this.numbaService.selectById(param.id).subscribe((data) => {
        this.ans = data;
        this.ansString = this.ans.value + this.ans.orderOfMagnitude;
      });
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Conguratulations!",
      message: "You have memorized " + this.ans.nickname + ".",
      buttons: ["OK"],
    });

    await alert.present();
  }

  clearDisp() {
    this.dispPos = 0;
    this.disp = new Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.disp[i] = new Array(this.width);
      this.disp[i].fill(undefined);
    }
    this.disp[0][0] = "_";
  }

  inputFromPanel(n: string) {
    this.check(n);
  }

  @HostListener("window:keyup", ["$event"])
  inputFromKeyboard(event: KeyboardEvent) {
    let n: string = undefined;

    if (event.keyCode >= KEYCODE.DIGIT0 && event.keyCode <= KEYCODE.DIGIT9) {
      n = (event.keyCode - KEYCODE.DIGIT0).toString();
    } else if (
      event.keyCode >= KEYCODE.NUMPAD0 &&
      event.keyCode <= KEYCODE.NUMPAD9
    ) {
      n = (event.keyCode - KEYCODE.NUMPAD0).toString();
    } else if (
      [
        KEYCODE.NUMPAD_PERIOD_CHROME,
        KEYCODE.NUMPAD_PERIOD_FIREFOX,
        KEYCODE.PERIOD,
        KEYCODE.DECIMAL_POINT,
      ].includes(event.keyCode)
    ) {
      n = ".";
    } else if (
      [KEYCODE.MINUS_FIREFOX, KEYCODE.SUBTRACT, KEYCODE.DASH].includes(
        event.keyCode
      )
    ) {
      n = "-";
    }

    if (n !== undefined) {
      this.check(n);
    }
  }

  check(n: string) {
    if (n === this.ansString[this.ansPos]) {
      let x = Math.floor(this.dispPos / 10);
      let y = this.dispPos % 10;
      this.disp[x][y] = n;
      this.ansPos++;
      this.dispPos++;

      // show prompt cursor
      if (this.dispPos == this.width * this.height) {
        this.clearDisp();
      } else {
        let cx = x;
        let cy = y + 1;
        if (y === 9) {
          cy = 0;
          cx = x + 1;
        }
        this.disp[cx][cy] = "_";
      }

      // order of magnitude mode
      if (this.ansPos == this.ans.value.length) {
        let x = Math.floor(this.dispPos / 10);
        let y = this.dispPos % 10;
        this.disp[x][y] = "";

        if (y !== 0) {
          if (x === this.height - 1) {
            this.clearDisp();
            x = 0;
            y = 0;
          } else {
            x += 1;
            y = 0;
            this.dispPos = 10 * x;
          }
        }
        let _str = "*10^";
        for (let i = 0; i < 4; i++) {
          this.disp[x][i] = _str[i];
        }
        this.dispPos += 4;
      }

      // finished
      if (this.ansPos === this.ansString.length) {
        let x = Math.floor(this.dispPos / 10);
        let y = this.dispPos % 10;
        this.disp[x][y] = "!!";
        this.presentAlert();
      }
    }
  }
}
