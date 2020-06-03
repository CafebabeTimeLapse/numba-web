import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Numba } from "../models/numba";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NumbaService {
  constructor(private db: AngularFirestore) {}

  selectById(id: string): Observable<Numba> {
    let snapshot = this.db.collection("const").doc<Numba>(id);
    return snapshot.valueChanges();
  }

  selectAll(): Observable<Numba[]> {
    let snapshot = this.db.collection<Numba>("const");
    return snapshot.valueChanges();
  }

  update(doc: Numba) {
    let snapshot = this.db.collection("const").doc<Numba>(doc.id);
    return snapshot.update(doc);
  }

  create(doc: Numba) {
    let snapshot = this.db.collection("const").doc<Numba>(doc.id);
    return snapshot.set(doc);
  }

  delete(doc: Numba) {
    let snapshot = this.db.collection("const").doc<Numba>(doc.id);
    return snapshot.delete();
  }
}
