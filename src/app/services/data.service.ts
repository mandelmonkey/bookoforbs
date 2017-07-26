 
import {Injectable} from '@angular/core';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {CollectionComponent} from '../collection/collection.component';
import {MarketComponent} from '../market/market.component';
import { MainControllerComponent} from '../main-controller/main-controller.component';
@Injectable()
export class DataService {
 
  topbar:TopBarComponent;
  collection:CollectionComponent;
  maincontroller: MainControllerComponent;
  market:MarketComponent;
  currentTab:number;
  isMobile:boolean;
   constructor(){
    this.currentTab = 1;

  }
  

}