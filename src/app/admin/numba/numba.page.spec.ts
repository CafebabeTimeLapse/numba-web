import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumbaPage } from './numba.page';

describe('NumbaPage', () => {
  let component: NumbaPage;
  let fixture: ComponentFixture<NumbaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumbaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
