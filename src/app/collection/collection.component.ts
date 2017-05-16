import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
 
 allOwnImage = "../assets/images/leftOptionSeg.png";
  public allOrbs = false;
    public loading = true;
  currentOrbs : Array<any>;
  currentOrbsKeys : Array<any>;
  ownedOrbsEnv:Array<any>;
 constructor(public dataService:DataService) {
 }

  ngOnInit() {
    this.dataService.collection = this;
  }

  setCurrentOrbs(){
this.loading = false;
this.ownedOrbsEnv = new Array<any>();
      this.currentOrbs = this.dataService.maincontroller.orbData.Environments[this.dataService.topbar.currentEnvKey].Assets;


        for(var i = 0; i < this.dataService.maincontroller.userBalance.length; i++){

          let anOwnedToken = this.dataService.maincontroller.userBalance[i];
          if(this.currentOrbs[anOwnedToken.token]){
            this.ownedOrbsEnv[anOwnedToken.token]=this.currentOrbs[anOwnedToken.token];
          }
          
      }
     
     if(this.allOrbs == false){
       this.currentOrbsKeys = Object.keys(this.ownedOrbsEnv);

     }else{
      this.currentOrbsKeys = Object.keys(this.currentOrbs);
     }

          


      console.log("current orbs"+this.dataService.topbar.currentEnvKey);
      console.log(this.currentOrbs);


  }
  selectAllOwn(){
    if(this.allOrbs == true){
       this.currentOrbsKeys = Object.keys(this.ownedOrbsEnv);
      this.allOrbs = false;
      this.allOwnImage = "../assets/images/leftOptionSeg.png";
    }
    else{
       this.currentOrbsKeys = Object.keys(this.currentOrbs);
      this.allOrbs = true;
      this.allOwnImage = "../assets/images/rightOptionSeg.png";
    }
  }

  getUserBalance(key:string){
    var userToken = this.dataService.maincontroller.userBalance[key];
    for(var i = 0; i <this.dataService.maincontroller.userBalance.length;i++ ){
      var aUserToken = this.dataService.maincontroller.userBalance[i];
      if(aUserToken.token == key){
          return aUserToken.balance;
      }
    }
   
      return 0;
     
  }

}
