

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
currentEnvTitle = "loading...";
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

  ngOnInit() {
      this.dataService.topbar = this;
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


}


 
}
