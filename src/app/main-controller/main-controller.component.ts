import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
import { PersistenceService, StorageType } from 'angular-persistence';
@Component({
  selector: 'app-main-controller',
  templateUrl: './main-controller.component.html',
  providers:[HTTPService],
  styleUrls: ['./main-controller.component.css']
})
export class MainControllerComponent implements OnInit {

  constructor(public dataService:DataService,private httpService:HTTPService,private ref: ChangeDetectorRef,private persistenceService: PersistenceService){}
public loading = true;
public showTopBar = true;
public showSend = false;
public showQRScan = false;
public showOrderPage = false;
public showCollection = true;
public showSelected = false;
public showMarket = false;
public showHistory = true;
public showBottomBar = true;
public showAccount = false;
public showIntro = false;
public orbData :any;
public userBalance :Array<any>;
public currentAddress = "";
public recoveryPhrase = "";
public selectedOrb:any;
public selectedKey:string;
public currentBundleId:string;
public currentBalance:number;
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

  public currentOrbs : Array<any>;
  public currentOrbsKeys : Array<any>;
  public allOrbsKeys : Array<any>;
currentConfirm;
currentCancel;
  loadEnvironments(){
  
    /*
    var envRes = "{\"Environements\":{\"com.spellsofgenesis\":{\"Title\":\"Spells of Genesis\",\"MasterCurrency\":\"BITCRYSTALS\",\"ticker\":\"BCY\",\"envCode\":\"eSog\",\"bundleId\":\"com.spellsofgenesis\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eSog\\\/banner.png\"},\"com.forceofwill\":{\"Title\":\"Force of Will\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eFow\",\"bundleId\":\"com.forceofwill\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eFow\\\/banner.png\"},\"com.diecast-club\":{\"Title\":\"Diecast\",\"MasterCurrency\":\"BITCRYSTALS\",\"ticker\":\"BCY\",\"envCode\":\"eDie\",\"bundleId\":\"com.diecast-club\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eDie\\\/banner.png\"},\"com.bitgirls\":{\"Title\":\"BitGirls\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eBtg\",\"bundleId\":\"com.bitgirls\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eBtg\\\/banner.png\"},\"com.memorychain\":{\"Title\":\"Memorychain\",\"MasterCurrency\":\"PEPECASH\",\"ticker\":\"PCSH\",\"envCode\":\"eMyc\",\"bundleId\":\"com.memorychain\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eMyc\\\/banner.png\"},\"com.ageofchains\":{\"Title\":\"Age of Chains\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eAoc\",\"bundleId\":\"com.ageofchains\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eAoc\\\/banner.png\"},\"com.rarepepe\":{\"Title\":\"Rarepepe\",\"MasterCurrency\":\"PEPECASH\",\"ticker\":\"PCSH\",\"envCode\":\"eRar\",\"bundleId\":\"com.rarepepe\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eRar\\\/banner.png\"},\"com.bookoforbs\":{\"Title\":\"ORBexchange\",\"MasterCurrency\":\"XCP\",\"ticker\":\"XCP\",\"envCode\":\"eOex\",\"bundleId\":\"com.bookoforbs\",\"bannerImage\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eOex\\\/banner.jpg\"}}}";
   
this.orbData = JSON.parse(envRes);
if(this.currentAddress == "empty"){

  this.userBalance = [];
  
 this.dataService.topbar.setEnvironments(this.orbData.Environements);
 
}else{

 this.httpService.getBalance(this.currentAddress).subscribe(
     data => { 
      this.userBalance = data;
      console.log(  this.userBalance);
      
      this.dataService.topbar.setEnvironments(this.orbData.Environements);

      },   
      error => {
       
console.log("error balance");
 this.loading = false;
      },
     () => {});

}


     */





this.httpService.decodeRawTransaction("010000000414ae2264cdbe754b9ae4be18d84bfeb4f578af553b9b9e4f9cb2303d04ee9e45000000001976a91458b6e991b45487df810f4d96d5315da739637f1788acffffffffec15d27b74516fefd921cecbe043ea63124d28a3903aef8fb1682ccc926b1c62000000001976a91458b6e991b45487df810f4d96d5315da739637f1788acffffffff9878f76e1424c1d1eeb6b15d06902dd8f0c78f9bdb61263e4ca3ae68c571a292000000001976a91458b6e991b45487df810f4d96d5315da739637f1788acfffffffffdac7f1c83b01a8924a8965d356b804c2608bc261fc18041116ddb4a143bc499000000001976a91458b6e991b45487df810f4d96d5315da739637f1788acffffffff0336150000000000001976a9141485d9d03b41aaa9dca7d70d7f63ff4a0826100e88ac00000000000000001e6a1c246698efc5d81b78ceadf3179316b5eb6cc5c2c347c0b7b42121a94e92180000000000001976a91458b6e991b45487df810f4d96d5315da739637f1788ac00000000").subscribe(
     data => { 
      console.log(data);

      },   
      error => {
       
console.log("error raxtx");
 this.loading = false;
      },
     () => {});

 

 
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
this.showMessage("error loading balance");
 this.loading = false;
      },
     () => {});

}
          
     },   
      error => {
       this.showMessage("error loading");
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
  ngOnInit() {
   
 this.dataService.isMobile = /Android|iPhone/i.test(window.navigator.userAgent);
  

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




    this.getFees();
/*
    this.showOrderPage = true;
    var tempORB = {
      image:"http://api.moonga.com/RCT/cp/cards/view/normal/large/en/1456.jpg",

    };
   
    this.dataService.maincontroller.currentBalance = 1;
     this.dataService.maincontroller.selectedKey = "SARUTOBICARD";
    this.dataService.maincontroller.selectedOrb = tempORB;
*/

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
