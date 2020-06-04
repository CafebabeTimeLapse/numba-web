import { Injectable, OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Numba } from "../models/numba";
import { Observable, BehaviorSubject, throwError, Subscription } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class NumbaService implements OnDestroy {
  private subject = new BehaviorSubject<Numba[]>([]);
  private collections$: Subscription;
  numbas$: Observable<Numba[]> = this.subject.asObservable();

  constructor(private db: AngularFirestore) {}

  init() {
    this.collections$ = this.db
      .collection<Numba>("const")
      .valueChanges()
      .subscribe((numbas) => this.subject.next(numbas));
  }

  ngOnDestroy() {
    this.collections$.unsubscribe();
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
