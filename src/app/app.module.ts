import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './commons/interceptors/spinner.interceptor';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TokenInterceptorService } from './commons/interceptors/token.interceptor';
import { MaterialModule } from 'src/material.module';
import { LoginComponent } from './components/login/login.component';
import { SpinnerModule } from './generic-componets/spinner/spinner.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './generic-componets/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormComponent } from './generic-componets/form/form.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FormComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    SpinnerModule,
    MaterialModule,
    LayoutModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
