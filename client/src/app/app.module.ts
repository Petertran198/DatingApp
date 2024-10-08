import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';

const COMPONENTS = [
  AppComponent,
  NavComponent,
  HomeComponent,
  RegisterComponent,
  MemberListComponent,
  MemberDetailComponent,
  ListsComponent,
  MessagesComponent,
  NotFoundComponent,
];

const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  BrowserAnimationsModule,
  SharedModule,
  FormsModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
