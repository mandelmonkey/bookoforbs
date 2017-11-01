import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CollectionComponent } from './collection/collection.component';
import { MainControllerComponent } from './main-controller/main-controller.component';
import { DataService } from './services/data.service';
import { ClipboardService } from './services/clipboard.service';
import { IntroComponent } from './intro/intro.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule, Routes }  from '@angular/router';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { SendComponent } from './send/send.component';
import { MarketComponent } from './market/market.component';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { FeeSelectorComponent } from './fee-selector/fee-selector.component'; 
import { PersistenceModule } from 'angular-persistence';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { AccountComponent } from './account/account.component';
import { QrscanComponent } from './qrscan/qrscan.component';
import { HistoryComponent } from './history/history.component';
import { HistoryCardComponent } from './history-card/history-card.component'; 
import { ImgCacheModule } from 'ng-imgcache';
import { RankingsComponent } from './rankings/rankings.component';
import { CompletionbarComponent } from './completionbar/completionbar.component';

const appRoutes: Routes = [
  { path: 'pass', component: IntroComponent } 
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CollectionComponent,
    MainControllerComponent,
    IntroComponent,
    BottomBarComponent,
    SendComponent,
    MarketComponent,
    OrderInfoComponent,
    OrderPageComponent,
    FeeSelectorComponent,
    CollectionCardComponent,
    AccountComponent,
    QrscanComponent,
    HistoryComponent,
    HistoryCardComponent,
    RankingsComponent,
    CompletionbarComponent
  ],
  imports: [
    PersistenceModule,
    BrowserModule,
    FormsModule,
    HttpModule, 
    ImgCacheModule,
    VirtualScrollModule,
    LazyLoadImageModule,
   RouterModule.forRoot(appRoutes) 
  ],
  exports: [
    RouterModule
  ],
  providers: [DataService,ClipboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
