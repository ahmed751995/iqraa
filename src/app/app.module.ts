import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg'; // froalaeditor
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // fontawesome
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app'; // angularfire
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth'; // angularfire
import { provideFirestore,getFirestore } from '@angular/fire/firestore'; // angularfire
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthGuard } from './auth.guard';
import { AlertComponent } from './components/alert/alert.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'photos', component: PhotosListComponent, canActivate: [AuthGuard]},
  {path: 'photos/new-photo', component: PhotoFormComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PhotosListComponent,
    PhotoCardComponent,
    PhotoFormComponent,
    ButtonComponent,
    LoginFormComponent,
    RegisterFormComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing: false}),
    FontAwesomeModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
