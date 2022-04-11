import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { BackendService, Ticket, User } from '../backend.service';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  users: User[];
  selectedAssignee: number;
  routeID: number;
  getUserRequest$: Observable<User[]>
  updateTicketRequest$: Observable<Ticket>;
  getTicketRequest$: Observable<Ticket>;
  currentTicket: Ticket;
  constructor(private router: Router, private route: ActivatedRoute, private backend: BackendService) { }

  ngOnInit(): void {

    this.getUserRequest$ = this.backend.users();
    this.getUserRequest$.subscribe((c) => {
      this.users = c;
    })
    
    this.route.params.subscribe(params => {
      this.routeID = params['id'];
    });

    this.getTicketRequest$ = this.backend.ticket(this.routeID);
    this.getTicketRequest$.subscribe(c => {
      if (c) {
        this.currentTicket = c;
        this.selectedAssignee = this.currentTicket.assigneeId;
      } else {
        this.router.navigateByUrl('/');
      }
    })
  }

  getAssignee(userID: number): string {
    return this.users?.find(c => c.id.toString() === userID.toString()).name;
  }

  submitAssignee(): void {
    this.updateTicketRequest$ = this.backend.update(this.currentTicket.id, { assigneeId: this.selectedAssignee });
    this.getTicketRequest$ = this.backend.ticket(this.routeID);

    this.updateTicketRequest$.pipe(
      switchMap(() => this.getTicketRequest$),
      finalize(() => {
        this.updateTicketRequest$ = null
        this.getTicketRequest$ = null
      })
    ).subscribe(c => {
      this.currentTicket = c;
      this.selectedAssignee = this.currentTicket.assigneeId;
    })

  }

  submitComplete(): void {
    this.updateTicketRequest$ = this.backend.update(this.currentTicket.id, { completed: true });
    this.getTicketRequest$ = this.backend.ticket(this.routeID);

    this.updateTicketRequest$.pipe(
      switchMap(() => this.getTicketRequest$),
      finalize(() => {
        this.updateTicketRequest$ = null
        this.getTicketRequest$ = null
      })
    ).subscribe(c => {
      this.currentTicket = c;
    })

  }
}
