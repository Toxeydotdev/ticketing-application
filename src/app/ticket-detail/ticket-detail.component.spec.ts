import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BackendService } from '../backend.service';

import { TicketDetailComponent } from './ticket-detail.component';

describe('TicketDetailComponent', () => {
  let component: TicketDetailComponent;
  let fixture: ComponentFixture<TicketDetailComponent>;
  const fakeActivatedRoute = {
    params: of({
      id: 2,
    }),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketDetailComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: BackendService }, { provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
