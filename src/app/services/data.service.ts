 
import {Injectable} from '@angular/core';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {CollectionComponent} from '../collection/collection.component';
import {MarketComponent} from '../market/market.component';
import { MainControllerComponent} from '../main-controller/main-controller.component';
import { HistoryComponent } from '../history/history.component';
import * as CryptoJS from 'crypto-js';
  declare var Mnemonic:any; 
   declare var bitcore:any; 
 declare var UI:any; 
declare var en:any; 
declare var ja:any;
 declare var RBFTools:any;
   declare var counterpartyParser:any; 


   declare var  CURRENTDATA:any;
     declare var  CURRENTSIG:any;
    declare var SIGNCALLBACK:any;
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
  rbf_tools:any;
  cp_tools:any;

  signCaller:any;

   constructor(){
    this.currentTab = 1;

this.uiclass = new UI();

this.langclass = new ja();
var language =  window.navigator.language;


    if(language == "ja-JP"){
      this.langclass = new ja();
    }else{
       this.langclass = new en();
    }
     
 
this.showIntroScreen = true;

  
        this.rbf_tools = new RBFTools();



     this.cp_tools= new counterpartyParser();



   
  }
 checkForData(){

   /* if(CURRENTSIG.length > 0){
 
      var tmpthis = this;

     this.signCaller.finishSign(CURRENTSIG);

 
      CURRENTSIG = "";

    }else{
      setTimeout(function(){
   this.checkForData();
  }, 1000);
    }*/

  }

 
setCurrentSignData(signData:string,caller:any){
var tmpthis = this;
SIGNCALLBACK = caller.finishSign();
CURRENTDATA = signData;
/*
setTimeout(function(){
   tmpthis.checkForData();
}, 1000);*/


}

  setLang(locale:string){

    

  }

  resetHDAddresses(passphrase:string){

       var currentAddsArray = [];
    

    var newIndex = 0;




   var words = null;
    if(passphrase != null ) words = passphrase.split(' ');

    
      var m;
    try{
      
      m = new Mnemonic(words);

    var basePath = 'm/0\'/0/';
      var seed = m.toHex();
          var master = bitcore.HDPrivateKey.fromSeed(seed);
       var d = basePath + newIndex;
      var masterderive = master.derive( d );
   var priv = bitcore.PrivateKey(masterderive.privateKey);
   
var newAddress = priv.toAddress().toString();
    
    currentAddsArray.push({"address":newAddress,"index":newIndex});

    this.maincontroller.setPersistance("HDaddressesV1",JSON.stringify(currentAddsArray));
   }
 catch(e){
alert("error");
 }

}


  addAddressToHDList(passphrase:string){

    var currentAdds = this.maincontroller.getPersistance("HDaddressesV1");
       var currentAddsArray = [];
    if(currentAdds != ""){
       currentAddsArray = JSON.parse(currentAdds);
    } 
  

    var newIndex = currentAddsArray.length;




   var words = null;
    if(passphrase != null ) words = passphrase.split(' ');

    
      var m;
    try{
      
      m = new Mnemonic(words);

    var basePath = 'm/0\'/0/';
      var seed = m.toHex();
          var master = bitcore.HDPrivateKey.fromSeed(seed);
       var d = basePath + newIndex;
      var masterderive = master.derive( d );
   var priv = bitcore.PrivateKey(masterderive.privateKey);
   
var newAddress = priv.toAddress().toString();
    
    currentAddsArray.push({"address":newAddress,"index":newIndex});

    this.maincontroller.setPersistance("HDaddressesV1",JSON.stringify(currentAddsArray));

 }
 catch(e){
alert("error");
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