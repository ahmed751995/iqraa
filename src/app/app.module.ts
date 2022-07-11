import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router'


import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg'; // froalaeditor
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // fontawesome
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoComponent } from './components/photo/photo.component';


import { initializeApp,provideFirebaseApp } from '@angular/fire/app'; // angularfire
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth'; // angularfire
import { provideFirestore,getFirestore } from '@angular/fire/firestore'; // angularfire
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { ButtonComponent } from './components/button/button.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'photos', component: PhotosListComponent},
  {path: 'photos/new-photo', component: PhotoFormComponent},
  {path: 'photos/:id', component: PhotoDetailsComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterFormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PhotosListComponent,
    PhotoComponent,
    PhotoCardComponent,
    PhotoFormComponent,
    ButtonComponent,
    PhotoDetailsComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {enableTracing: true}),
    FontAwesomeModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
