 
import {Injectable} from '@angular/core';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {CollectionComponent} from '../collection/collection.component';
import {MarketComponent} from '../market/market.component';
import { MainControllerComponent} from '../main-controller/main-controller.component';
import { HistoryComponent } from '../history/history.component';
 declare var UI:any; 
declare var en:any; 
declare var ja:any;
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
  langclass:any;
  showIntroScreen:boolean;
  dev:boolean; 
   constructor(){
    this.currentTab = 1;

this.uiclass = new UI();

this.langclass = new ja();
this.showIntroScreen = true;
  }

  setLang(locale:string){

    console.log("locale"+locale);
    if(locale == "ja-JP"){
      this.langclass = new ja();
    }else{
       this.langclass = new en();
    }

  }

  getImage(image:string){

    return this.uiclass.getImage(image);

  }


  getLang(trans:string,param1 = "",param2 = "",param3 = "",param4 = "", param5 = ""){

     var val = this.langclass.getTrans(trans);
         val = val.replace('$1$', param1);
         val = val.replace('$2$', param2);
         val = val.replace('$3$', param3);
         val = val.replace('$4$', param4);
         val = val.replace('$5$', param5);
         
    return val;

  }
  


}