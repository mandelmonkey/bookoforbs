import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
   providers:[HTTPService],
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
 newOrbs : Array<any>;
 trendingOrbs : Array<any>;
 sellHighOrbs : Array<any>;
 buyLowOrbs : Array<any>;
  currentOrbs  : Array<any>;
  randomOrbs  : Array<any>;
  scrollHeight:string;
   
 constructor(public dataService:DataService,private httpService:HTTPService) {
 	dataService.market = this;
 }

  ngOnInit() {

 	 

  }
getCollectionHeight(){
    return (document.documentElement.clientHeight-document.getElementById("marketScroll").offsetTop-55)+"px"; 
  }
 
getPrice(token:string){

	if(typeof this.dataService.maincontroller.currentOrbs[token]["bestBuyPrice"] != "undefined" ){

	}else{
	 this.httpService.getOrders( token, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
          
          var sell_orders = this.dataService.maincontroller.marge(data.ask, 'sell');

						var buy_orders = this.dataService.maincontroller.marge(data.bid, 'buy');

						if (buy_orders.length > 0) {

						 
								
						 
								this.dataService.maincontroller.currentOrbs[token]["bestBuyPrice"] = buy_orders[0].price;
							
								
							 
							

						} 

						if (sell_orders.length > 0) {
						 
									 this.dataService.maincontroller.currentOrbs[token]["bestSellPrice"] = sell_orders[0].price;
							
							 
							

						} 


						this.dataService.maincontroller.currentOrbs[token]["openOrders"] = sell_orders.length + buy_orders.length;
							

		 
     
      this.updateMarket();

      },   
      error => {
      	console.log(JSON.stringify(error));
 			 
      },
     () => {});
 
 }

	 

}
updateMarket(){
	var bestBuyArray = [];
  var bestSellArray = [];
	var trendingArray = [];

 

	 for (var i = this.dataService.maincontroller.allOrbsKeys.length - 1; i >= 0; i--) {
  	 	var key = this.dataService.maincontroller.allOrbsKeys[i];
  	 	var anOrb = this.dataService.maincontroller.currentOrbs[key];

var ownedKeys = Object.keys(this.dataService.maincontroller.ownedOrbsEnv);
console.log("ownedKeys "+ownedKeys);
  	 	if(typeof anOrb["bestBuyPrice"] != "undefined"){
  	 			if(ownedKeys.indexOf(key) != -1){
  	 			bestBuyArray.push({key:key,value:anOrb["bestBuyPrice"]});
  	 	   }
  	 	}
         if(typeof anOrb["bestSellPrice"] != "undefined"){
        
           bestSellArray.push({key:key,value:anOrb["bestSellPrice"]});
        
       }

  	 	if(typeof anOrb["openOrders"]  != "undefined"){
  	 		trendingArray.push({key:key,value:anOrb["openOrders"]});
  	 	}



  	 }



  	var sorted = bestBuyArray.sort(function(a, b) {
  		return  b.value- a.value ;
		});
 
  	 
 
 this.sellHighOrbs = []; 

  	 for (var i =  0; i< sorted.length ; i++) {

  	 	this.sellHighOrbs.push(sorted[i].key);
  		 
  	 } 


   sorted = bestSellArray.sort(function(a, b) {
      return   a.value-b.value;
    });
 
     
 
 this.buyLowOrbs = []; 

     for (var i =  0; i< sorted.length ; i++) {

       this.buyLowOrbs.push(sorted[i].key);
       
     } 



  	 sorted = trendingArray.sort(function(a, b) {
  			return  b.value- a.value ;
		});
 
  	 
 
 this.trendingOrbs = []; 

  	 for (var i =  0; i< sorted.length ; i++) {

  	 	this.trendingOrbs.push(sorted[i].key);
  		 
  	 } 


    this.sellHighOrbs = this.sellHighOrbs.slice(0,5);
       this.buyLowOrbs =    this.buyLowOrbs.slice(0,5);
          this.trendingOrbs =    this.trendingOrbs.slice(0,5);
  	   
  	 
}
 shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

  showORB(selectedOrb:any,selectedKey:string){
        
    this.dataService.maincontroller.currentBalance =  this.dataService.maincontroller.getUserBalance(selectedKey);
    this.dataService.maincontroller.selectedOrb = selectedOrb;
    this.dataService.maincontroller.selectedKey = selectedKey;
    this.dataService.maincontroller.showOrderPage = true;

    
  }

getMarketHeight(){
	return (document.documentElement.clientHeight-document.getElementById("market").offsetTop-55)+"px"; 
}
  setMarketData(){
  	 
   
  	 this.newOrbs = Object.keys(this.dataService.maincontroller.currentOrbs).slice(0,10);
  	 this.randomOrbs = this.shuffle(Object.keys(this.dataService.maincontroller.currentOrbs)).slice(0,10);

  	 for (var i = this.dataService.maincontroller.allOrbsKeys.length - 1; i >= 0; i--) {
  	 	var key = this.dataService.maincontroller.allOrbsKeys[i];
  	 	this.getPrice(key);

  	 }

  	 
  }
 getImage(obj:any){

    return obj.image;
  }

}
