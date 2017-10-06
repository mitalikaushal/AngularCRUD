import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CrudComponent } from './components/crud/crud.component';
import {DataService} from './services/data.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const appRoutes: Routes =[
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'user/:id',component:UserDetailsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
