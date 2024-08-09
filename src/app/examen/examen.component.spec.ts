import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';

import { ExamenComponent } from './examen.component';

describe('ExamenComponent', () => {
  let component: ExamenComponent;
  let fixture: ComponentFixture<ExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
