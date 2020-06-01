import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  greeting: any;

  constructor(private firestore: AngularFirestore) {
    this.greeting = firestore
      .collection("greeting")
      .doc<any>("Bq0m7zAUnoHbmGf3dMwI")
      .valueChanges();
  }
}
