import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AuthlayoutComponent } from './Layout/authlayout/authlayout.component';
import { SignupComponent } from './signup/signup.component';
import { MainlayoutComponent } from './Layout/mainlayout/mainlayout.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    AuthlayoutComponent,
    SignupComponent,
    MainlayoutComponent,
    MemberDetailComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
