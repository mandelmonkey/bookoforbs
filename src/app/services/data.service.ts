 
import {Injectable} from '@angular/core';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {CollectionComponent} from '../collection/collection.component';
import {MarketComponent} from '../market/market.component';
import { MainControllerComponent} from '../main-controller/main-controller.component';
import { HistoryComponent } from '../history/history.component';
 declare var UI:any; 

@Injectable()
export class DataService {
 

  history:HistoryComponent;
  topbar:TopBarComponent;
  collection:CollectionComponent;
  maincontroller: MainControllerComponent;
  market:MarketComponent;
  currentTab:number;
  isMobile:boolean;
  viewMode:boolean;
  landscape:boolean;
  uiclass:any;
  dev:boolean;
   constructor(){
    this.currentTab = 1;

this.uiclass = new UI();
  }

  getImage(image:string){

    return this.uiclass.getImage(image);

  }
  


}