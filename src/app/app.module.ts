import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'ticket-list', component: TicketListComponent },
  { path: 'detail/:id', component: TicketDetailComponent },
  { path: '**', redirectTo: 'ticket-list' }
]


@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketDetailComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
