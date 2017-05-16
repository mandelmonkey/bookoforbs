import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CollectionComponent } from './collection/collection.component';
import { MainControllerComponent } from './main-controller/main-controller.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CollectionComponent,
    MainControllerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
