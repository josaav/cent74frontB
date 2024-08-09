import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CursadasComponent } from './cursadas.component';

describe('CursadasComponent', () => {
  let component: CursadasComponent;
  let fixture: ComponentFixture<CursadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
