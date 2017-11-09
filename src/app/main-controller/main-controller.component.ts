import { Inject,LOCALE_ID, Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
import { PersistenceService, StorageType } from 'angular-persistence';
   declare var QRious:any;
@Component({
  selector: 'app-main-controller',
  templateUrl: './main-controller.component.html',
  providers:[HTTPService],
  styleUrls: ['./main-controller.component.css']
})
export class MainControllerComponent implements OnInit {

  constructor(@Inject(LOCALE_ID) locale: string, public dataService:DataService,private httpService:HTTPService,private ref: ChangeDetectorRef,private persistenceService: PersistenceService){
    this.locale = window.navigator.language;
  
  }
  public locale = "";

public loading = true;
public showTopBar = true;
public showSend = false;
public showQRScan = false;
public showOrderPage = false;
public showCollection = true;
public showSelected = false;
public showMarket = false;
public showHistory = false;
public showBottomBar = true;
public showRankings = false;
public showAccount = true;
public showIntro = false;
public rankings = false;
public showSettings = false;
public showingLoading = false;
public orbData :any;
public userBalance :Array<any>;
public currentAddress = "";
public recoveryPhrase = "";
public currentFiatCurreny = "";
public currentEnv = "";
public selectedOrb:any;
public selectedKey:string;
public currentSearch = "";
public currentBundleId:string;
public currentBalance:number;
public currentCurrencyPrice:number;
public currentImage:string;
public currentIndex = 0;
public showingMessage = false;
public showingConf = false;
public orbHeight:string;
public orbWidth:string;
public messageText:string;
public linkType:string;
public fees:any;
public feeKeys:any;
public currentFee:string;
public ownedOrbsEnv:Array<any>;
public customFee:string;
public currentOwner:any;
public currentCurrency:string;
public currentAbrev:string;
public currentSendAddress:string;
public currentCurrencyImg:string;
public history =[];
public orders =[];
public markets = [];
public allOrbs = false;

public showingQR = false;
public qrUrl = "";

  public currentOrbs : Array<any>;
  public currentOrbsKeys : Array<any>;
  public allOrbsKeys : Array<any>;


  public newOrbs : Array<any>;
  public trendingOrbs : Array<any>;
  public sellHighOrbs : Array<any>;
  public buyLowOrbs : Array<any>;
  public randomOrbs  : Array<any>;


currentConfirm;
currentCancel;
  loadEnvironments(){
   
     var tmpData = this.dataService;
this.httpService.getEnvironments().subscribe(
     data => { 
      this.orbData = data;
      console.log("orbdata "+ JSON.stringify(this.orbData));
      


      if(this.currentAddress == "empty"){

  this.userBalance = [];
  
 this.dataService.topbar.setEnvironments(this.orbData.Environements);
 
}else{

      this.httpService.getBalance(this.currentAddress).subscribe(
     data => { 
      this.userBalance = data;
     // console.log("usre balancre "+  this.userBalance);
      
     tmpData.topbar.setEnvironments(this.orbData.Environements);
        
     },   
      error => {
       
console.log("error balance");
this.showMessage(this.dataService.getLang("errorloading"));
 this.loading = false;
      },
     () => {});

}
          
     },   
      error => {
       this.showMessage(this.dataService.getLang("errorloading"));
console.log("error gamecenter");
 this.loading = false;
      },
     () => {});

      
}
getFees(){
var tmpthis = this;
 this.httpService.getFees().subscribe(
     data => { 
     tmpthis.fees = data;
     tmpthis.feeKeys = Object.keys(tmpthis.fees);
      console.log(JSON.stringify(tmpthis.fees));
     

      },   
      error => {
       
console.log("error fees"); 
       },
     () => {});



}

removePrefs(){
  console.log("removing prefs");
  this.persistenceService.removeAll(StorageType.LOCAL);
}
getFiatForToken(token:string,quantity:number,fixed = 2){

 if(quantity == 0){
   return "";
 }
  var currency = this.currentFiatCurreny;
  
  var fiatValue = this.markets[currency];

  if(typeof fiatValue == "undefined"){
    return "";
  }
  
  if(token == "BTC"){

    return  (quantity * fiatValue.last).toLocaleString(this.locale, { style: 'currency', currency: currency,maximumSignificantDigits: fixed });

  }else{
    var btcVal = this.markets[token];
    if(btcVal != null){
  

      return  ((btcVal.last *  quantity) * fiatValue.last).toLocaleString(this.locale, { style: 'currency', currency: currency ,maximumSignificantDigits: fixed });
   
    } else{
       
      if(this.currentCurrencyPrice != 0){

         if(typeof this.markets["XCP"] != "undefined" && typeof fiatValue.last != "undefined"){

        var XCPPrice = this.markets["XCP"].last;

      var XCPFiatPrice = XCPPrice *  fiatValue.last

        var xcpTotal = XCPFiatPrice * this.currentCurrencyPrice;
         
        return  ( xcpTotal * quantity).toLocaleString(this.locale, { style: 'currency', currency: currency,maximumSignificantDigits: fixed });
      }
    }
    }
  }
  return "";

}

 getPriceForCurrency(currency:string){
   var tmpthis = this;
tmpthis.currentCurrencyPrice =0;
 this.httpService.getPriceForToken(currency).subscribe(
     data => { 
      tmpthis.currentCurrencyPrice = data["XCP"].price;
     

      },   
      error => {
       
console.log("error price"); 
       },
     () => {});
 }
getMarkets(){
  var tmpthis = this;

 this.httpService.getMarkets().subscribe(
     data => { 
      tmpthis.markets = data;
       

      },   
      error => {
       
console.log("error markets"); 
       },
     () => {});

}

 getCurrentFee(){
if(this.currentFee == "fastestFee"){
  return  this.fees[this.currentFee];
 }else if(this.currentFee == "hourFee"){
  return  this.fees[this.currentFee];
 }else if(this.currentFee == "lowFee"){
  return  this.fees[this.currentFee];
 } else{
   return "custom";
 }
}
openMarket(){
  console.log("show send");
  this.showOrderPage = true; 
  //this.dataService.maincontroller.showCollection = false;
}
openSend(){
  console.log("show send");
  this.showSend = true; 
  //this.dataService.maincontroller.showCollection = false;
}
 closeLarge(){
   this.selectedOrb = null;
   this.showSelected = false;

 }

closeMessage(){
this.showingMessage = false;

}
feeIsCustom(fee:string){
if( fee != "fastestFee" && fee != "halfHourFee" && fee != "hourFee" && fee != "lowFee" ){
       return true;
       }else{
         return false;
       }
}

setPersistance(key:string,value:string){
this.persistenceService.set(key, value, {type: StorageType.LOCAL}); 
}
getPersistance(key:string,){
 var val = this.persistenceService.get(key,   StorageType.LOCAL);
    if(typeof val == "undefined"){
      return "";
    }
    return val;
}
  ngOnInit() {

    this.currentFiatCurreny = this.persistenceService.get('userFiat',   StorageType.LOCAL);
    if(typeof this.currentFiatCurreny  == "undefined"){
      this.currentFiatCurreny = "USD";
    }
 
    if(window.location.href.indexOf("localhost") != -1 ){
this.dataService.dev = true;
    }
   
 this.dataService.isMobile = /Android|iPhone|IndieSquare|indieSquare|indiesquare/i.test(window.navigator.userAgent);
  

if(this.dataService.isMobile ==false){
//alert("please load this app in iOS safari browser");
}
    this.dataService.maincontroller = this;
    this.selectedOrb = null;
    this.linkType = "";
       var lastFee = this.persistenceService.get('userFee',   StorageType.LOCAL);
    if(typeof lastFee != "undefined"){


       this.currentFee = lastFee;

       if(this.feeIsCustom(this.currentFee)){
         this.dataService.maincontroller.customFee =   this.currentFee;
       }
       
     
     
       


    }else{
      this.currentFee = "hourFee";
    }

    var userAddress = this.persistenceService.get('userAddress0',   StorageType.LOCAL);
    if(typeof userAddress != "undefined"){
       this.currentAddress = userAddress;
    }else{
        this.currentAddress = "empty";
    }

     var linkType = this.persistenceService.get('linkType',   StorageType.LOCAL);
    if(typeof linkType != "undefined"){
       this.linkType = linkType;
    }else{
        this.linkType = "";
    }

    
 

  this.getMarkets();
    this.getFees();
 
  
  this.loadEnvironments();
    
  }
  reloadViews(){
    if(this.dataService.isMobile == true){
    this.orbHeight =  (document.documentElement.clientHeight - 200)+"px"
      this.orbWidth = "auto";
    } else{
      this.orbHeight =  "80%";
      this.orbWidth = "auto";
    }
 
  }

  showMessage(message:string){
    this.messageText = message;
    this.showingMessage = true;
   

  }

    showQR(url:string){
      var tmpthis = this;
    this.qrUrl = url;
    this.showingQR = true;


       setTimeout(function(){ 
 var qrBack = document.getElementById("qrBack");
     
            var qr = new QRious({
          element: document.getElementById('qr2'),
          value:  tmpthis.qrUrl,
          size:250
        });


        }, 100);

      
   

  }
  closeQR(){
    this.qrUrl = "";
    this.showingQR = false;

    
   

  }
showLoading(message:string){
    this.messageText = message;
    this.showingLoading = true; 
  }
   showConf(message:string,confirm,cancel,owner:any){
    this.messageText = message;
    this.showingConf = true;
   this.currentConfirm = confirm;
   this.currentCancel = cancel;
   this.currentOwner = owner;
  }

  didConfirm(){
 this.showingConf = false;
    this.currentConfirm(this.currentOwner);

  }
  didCancel(){
    this.showingConf = false;
     this.currentCancel(this.currentOwner);
  }
  getUserBalance(key:string){
   
    for(var i = 0; i <this.userBalance.length;i++ ){

      var aUserToken = this.userBalance[i];
      if(aUserToken.token == key){
          return aUserToken.balance;
      }
    }
   
      return 0;
     
  }

    getUserUnconfBalance(key:string){
    var userToken = this.userBalance[key];
    for(var i = 0; i <this.userBalance.length;i++ ){
      var aUserToken = this.userBalance[i];
      if(aUserToken.token == key){
          if(aUserToken.unconfirmed_balance != 0){
            return " "+aUserToken.unconfirmed_balance;
          }
      }
    }
   
      return "";
     
  }
  marge(orders:any,type:string){
var marged = new Array();
      var n = 0;
      for (var i = 0; i < orders.length; i++) {
        var is = true;
        if (i > 0) {
          if (orders[i].price == marged[n].price) {
            marged[n].order += orders[i].order;
            is = false;
          } else {
            n++;
            is = true;
          }
        }
        if (is) {
          if (marged[n] == null)
            marged[n] = {};
          marged[n].price = orders[i].price;
          if (type === 'buy') {
            marged[n].quantity = orders[i]["get_quantity"];
          } else {
            marged[n].quantity = orders[i]["give_quantity"];
          }
          marged[n].amount = orders[i]["order_amount"];
          marged[n].order = orders[i].order;
          marged[n].type = type;
        }
      }
      return marged;
 }



}
