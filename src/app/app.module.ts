import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CollectionComponent } from './collection/collection.component';
import { MainControllerComponent } from './main-controller/main-controller.component';
import { DataService } from './services/data.service';
import { IntroComponent } from './intro/intro.component';

import { RouterModule, Routes }  from '@angular/router';
const appRoutes: Routes = [
  { path: 'pass', component: IntroComponent } 
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CollectionComponent,
    MainControllerComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   RouterModule.forRoot(appRoutes) 
  ],
  exports: [
    RouterModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
