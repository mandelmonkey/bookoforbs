

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PersistenceService, StorageType } from 'angular-persistence';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class TopBarComponent implements OnInit {

public currentEnv:any;
public currentEnvKey:string;
currentEnvTitle = "";
public orbsData: Array<any>;
environmentKeys: Array<any>;
environments: Array<any>;
rotated = false;

  constructor(public dataService:DataService,private persistenceService: PersistenceService) {
        document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
    }

    offClickHandler(event:any) {
       if (!event.target.matches('.envbutton')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  
    }
    shouldShowSearch(){
       if(this.dataService.maincontroller.showCollection == true){
           if(this.dataService.maincontroller.loading == false){
             return true;
           }
       }
      return false;
    }
  ngOnInit() {
      this.dataService.topbar = this;
       this.currentEnvTitle = this.dataService.getLang("loading");
  }
 getSettings(){
   return this.dataService.getLang("settings");
 }
 getSignIn(){
    return this.dataService.getLang("signin");
 }
 showSettings(){
   return this.dataService.maincontroller.showSettings = true;;
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

setEnvironments(environmentData:Array<any> ){

  this.environments = environmentData;
  console.log(this.environments);
 this.environmentKeys = Object.keys(this.environments);
console.log(this.environmentKeys);
 

 var lastKey = this.persistenceService.get('selectedEnv',   StorageType.LOCAL);
  
if(typeof lastKey != "undefined" && this.environmentKeys.indexOf(lastKey) != -1){
this.setEnvironment(lastKey);

}
else{
if(this.environmentKeys.length > 0){
 
 this.setEnvironment(this.environmentKeys[0]);

}

}

}


updateSearch(val:string){
  this.dataService.maincontroller.currentSearch = val.toUpperCase();
  
  if(this.dataService.maincontroller.currentSearch != ""){

this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
var tmpthis = this;
//if you only want to match id- as prefix 
var matches =  this.dataService.maincontroller.currentOrbsKeys.filter(function(returnValue){
  if(returnValue) {
      return (returnValue.substring(0,  tmpthis.dataService.maincontroller.currentSearch.length) ===  tmpthis.dataService.maincontroller.currentSearch);
  }
}); //["id-3-text"]
/*
//if you want to match id- string exists at any position
var matches = windowArray.filter(function(windowValue){
  if(windowValue) {
      return windowValue.indexOf(this.dataService.maincontroller.currentSearch) >= 0;
  }
});*/

this.dataService.maincontroller.currentOrbsKeys = matches;
 

    
  }else{
    this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
  }
}
openEnvironmentList() {
 if(this.environmentKeys.length > 0){
    document.getElementById("myDropdown").classList.toggle("show");

    var div =   document.getElementById("smallarrow");


     var deg = this.rotated ? 0 : -90;

    div.style.webkitTransform = 'rotate('+deg+'deg)';  
    div.style.transform       = 'rotate('+deg+'deg)'; 
    div.style.webkitTransition=" all 0.1s ease-in-out"; 
     div.style.transition=" all 0.1s ease-in-out";
    this.rotated = !this.rotated;
 }
}

setEnvironment(key:string){


  this.currentEnvKey = key;
 this.currentEnv = this.environments[this.currentEnvKey];
 
 this.currentEnvTitle = this.currentEnv.Title;
this.dataService.maincontroller.currentBundleId = this.currentEnvKey;
this.dataService.collection.setCurrentOrbs(this.currentEnv.envCode);

   

 this.persistenceService.set('selectedEnv', key, {type: StorageType.LOCAL}); 
this.dataService.maincontroller.currentEnv = this.currentEnv.envCode;


}
shouldShowSettings(){
  if(this.dataService.maincontroller.showAccount == true && this.dataService.maincontroller.currentAddress != "empty"){
    return true;
  } 
  return false;
}
shouldShowSignIn(){
  
  if(this.dataService.maincontroller.showAccount == true && this.dataService.maincontroller.currentAddress == "empty"){
    return true;
  } 
  return false;
}

 
}
