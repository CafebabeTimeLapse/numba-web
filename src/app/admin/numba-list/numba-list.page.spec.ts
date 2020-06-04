import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NumbaListPage } from './numba-list.page';

describe('NumbaListPage', () => {
  let component: NumbaListPage;
  let fixture: ComponentFixture<NumbaListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbaListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NumbaListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
