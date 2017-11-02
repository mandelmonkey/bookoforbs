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
}

 getMarketKeys(){
 	return Object.keys(this.dataService.maincontroller.markets);
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

  //	 this.rankings = JSON.parse("{\"1\":{\"score\":\"75\",\"userId\":434481,\"userName\":\"Test\",\"xcpAddress\":\"1Nh4tPtQjHZSoYdToTF7T3xbaKrTNKM3wP\"},\"2\":{\"score\":\"58\",\"userId\":434734,\"userName\":\"kojitest\",\"xcpAddress\":\"1BG5Kra4EhAaJwkaGX2LQWWbqpGXv6f7dj\"},\"3\":{\"score\":\"0\",\"userId\":434484,\"userName\":\"Test\",\"xcpAddress\":\"1DVQiPGJYoA8RNfJxe6AeNgwdjvUHGZC6F\"}}");
  	// this.rankingsKeys = Object.keys(this.rankings);
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
