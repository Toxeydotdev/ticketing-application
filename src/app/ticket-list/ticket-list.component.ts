import { Component, OnInit } from '@angular/core';
import { concat, merge, Observable, scheduled } from 'rxjs';
import { concatMap, finalize, flatMap, mergeMap, switchMap, take } from 'rxjs/operators';
import { BackendService, Ticket, User } from '../backend.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  users: User[];
  ticketDescription: string;
  userID: number;

  filter: string;
  allTickets: Ticket[];
  filteredTickets: Ticket[];

  newTicketRequest$: Observable<Ticket>
  getTicketRequest$: Observable<Ticket[]>
  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.backend.tickets().subscribe(c => {
      this.allTickets = c;
      this.filterTickets();
    });

    this.backend.users().subscribe(c => {
      this.users = c;
    });
  }

  addTicket(): void {
    this.newTicketRequest$ = this.backend.newTicket({ description: this.ticketDescription });
    this.getTicketRequest$ = this.backend.tickets();

    this.newTicketRequest$.pipe(
      switchMap(() => this.getTicketRequest$),
      finalize(() => {
        this.newTicketRequest$ = null
        this.getTicketRequest$ = null
      })
    ).subscribe(c => {
      this.allTickets = c;
      this.filterTickets();
    })
  }

  filterTickets(): void {
    if (this.filter) {
      this.filteredTickets = this.allTickets.filter(c =>
        c.description.toUpperCase().includes(this.filter.toUpperCase()) ||
        c.id.toString() === this.filter
      );
    } else {
      this.filteredTickets = this.allTickets;
    }
  }

  getAssignee(userID: number): string {
    return this.users?.find(c => c.id.toString() === userID.toString()).name;
  }
}
