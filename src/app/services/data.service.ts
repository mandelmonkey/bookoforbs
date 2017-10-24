 
import {Injectable} from '@angular/core';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {CollectionComponent} from '../collection/collection.component';
import {MarketComponent} from '../market/market.component';
import { MainControllerComponent} from '../main-controller/main-controller.component';
 declare var UI:any; 

@Injectable()
export class DataService {
 
  topbar:TopBarComponent;
  collection:CollectionComponent;
  maincontroller: MainControllerComponent;
  market:MarketComponent;
  currentTab:number;
  isMobile:boolean;
  viewMode:boolean;
  landscape:boolean;
  uiclass:any;
   constructor(){
    this.currentTab = 1;

this.uiclass = new UI();
  }

  getImage(image:string){

    return this.uiclass.getImage(image);

  }
  

}