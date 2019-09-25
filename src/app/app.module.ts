import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { MatAutocompleteModule, MatSnackBarModule, MatChipsModule, MatBadgeModule, MatPaginatorModule, MatTooltipModule, MatExpansionModule, MatSelectModule, MatCheckboxModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatProgressBarModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';
import { SocketService } from "./socket.service";
import { Err500Component } from './err500/err500.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router'
import { AppService } from './app.service'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    Err500Component,
    DescriptionComponent,
    HomeComponent,
    RegistrationComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
    MatProgressBarModule,
    NgxEditorModule,


    RouterModule.forRoot([

      { path: 'home', component: HomeComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'description/:type', component: DescriptionComponent },
      { path: '500', component: Err500Component },
      { path: '', redirectTo: 'registration', pathMatch: 'full' },

    ])
  ],
  providers: [AppService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
