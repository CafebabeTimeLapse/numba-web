import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Numba } from "../models/numba";
import { Observable, of, BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class NumbaService {
  private subject = new BehaviorSubject<Numba[]>([]);

  numbas$: Observable<Numba[]> = this.subject.asObservable();

  constructor(private db: AngularFirestore) {}

  init() {
    const collections$ = this.db
      .collection<Numba>("const")
      .valueChanges()
      .subscribe((numbas) => this.subject.next(numbas));
  }

  selectById(id: string): Observable<Numba> {
    let ret$ = this.numbas$.pipe(
      map((numbas) => numbas.filter((numba) => numba.id === id)[0]),
      catchError((err) => {
        console.error("caught mapping error nd rethrowing", err);
        return throwError(err);
      })
    );
    return ret$;
  }

  selectAll(): Observable<Numba[]> {
    return this.numbas$;
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
