import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';

import { DataService } from '../services/data.service';
import {HTTPService} from "../services/http.service";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	    @ViewChild(VirtualScrollComponent)
    private virtualScroll: VirtualScrollComponent;
	rankings = [];
	rankingsKeys = [];
	username = "";
	 scrollView;
	 viewPortItems:any;
	 loadingUsername:boolean;
	loading:boolean;
	fiatPickerTop = "1000px";
	fiatPicker;
  constructor(private _sanitizer: DomSanitizer,public dataService:DataService,private httpService:HTTPService) { }
ngAfterViewInit() {
    this.fiatPicker = document.getElementById("fiatPicker");

    this.fiatPickerTop = document.documentElement.clientHeight+"";
    document.body.style.position = "fixed";
}
showPassphrase(){
  this.dataService.maincontroller.showPassword(this.cancelPassphrase,this.contShowPassphrase);
}
contShowPassphrase(passphrase:string){
  alert(passphrase)
}
cancelPassphrase(){

}
 getMarketKeys(){

   var keys = Object.keys(this.dataService.maincontroller.markets);
   if(keys.indexOf("PEPECASH") != -1){
      keys.splice(keys.indexOf("PEPECASH"),1);
   }
    if(keys.indexOf("XCP") != -1){
      keys.splice(keys.indexOf("XCP"),1);
   }
 	return keys;
 }
 getFiatPickerTop(){
  
 	return this.fiatPickerTop+"px";
 }
 getCurrentFiatCurrency(){
 	return this.dataService.maincontroller.currentFiatCurreny;

 }
 getListHeight(){
 	if(this.fiatPicker != null){
 		return this.fiatPicker.offsetHeight-50 +"px";
 	}
 }
 showFiatPicker(){


this.fiatPickerTop = (document.documentElement.clientHeight-this.fiatPicker.offsetHeight)+"";
	 

 }

setFiat(item:string){
	this.dataService.maincontroller.setPersistance("userFiat",item);
	this.dataService.maincontroller.currentFiatCurreny = item;
	this.closePicker();
}
 closePicker(){


this.fiatPickerTop =  document.documentElement.clientHeight+"";

 
 }
	 logout(){
  this.dataService.maincontroller.removePrefs();
  this.dataService.maincontroller.currentOrbsKeys = [];
  this.dataService.maincontroller.showIntro = true;
  this.dataService.maincontroller.showCollection = false;
  this.dataService.maincontroller.showMarket = false;
  this.dataService.maincontroller.showSend = false;
  this.dataService.maincontroller.showSelected = false;
  this.dataService.maincontroller.showOrderPage = false;
  this.dataService.maincontroller.showBottomBar = false;
  this.dataService.maincontroller.showTopBar = false;
  this.dataService.maincontroller.showAccount = false;
  this.dataService.maincontroller.showHistory = false;
  this.dataService.maincontroller.showSettings = false;
  this.dataService.viewMode = false;

}
  ngOnInit() {

   
 }

 
 getTopBackground(){
  return 0;
    }
    closeSelf(){
    	this.dataService.maincontroller.showSettings = false;
    }

     getCollectionHeight(){
    if(this.scrollView == null){
      return "5px";
    }else{
     var bottombar = document.getElementById("bottomBarBottom");
 
      return (document.documentElement.clientHeight-this.scrollView.offsetTop )+"px";
    }
   
  }
 
}
