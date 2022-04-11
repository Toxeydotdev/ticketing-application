import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackendService } from '../backend.service';

import { TicketListComponent } from './ticket-list.component';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketListComponent],
      providers: [
        { provide: BackendService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter allTickets', () => {
    component.allTickets = [
      {
        id: 0,
        description: "Install a monitor arm",
        assigneeId: 111,
        completed: false
      },
      {
        id: 1,
        description: "Move the desk to the new location",
        assigneeId: 111,
        completed: false
      }
    ];
    component.filter = 'Install';
    component.filterTickets();
    expect(component.filteredTickets.length).toBe(1);
    expect(component.filteredTickets[0]).toBe(component.allTickets[0]);
  });

  it('should get assignee name', () => {
    const testUsers = [
      { id: 111, name: "Victor" },
      { id: 222, name: "Jack" }
    ];
    component.users = testUsers;

    component.userID = 222;
    const getAssignee = component.getAssignee(222);
    expect(getAssignee).toBe(testUsers[1].name);
  });
});
