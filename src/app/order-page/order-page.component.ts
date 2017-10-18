import { Component, OnInit,ViewChild } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
 declare var IndieSquare:any; 
  declare var bitcore:any; 
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  providers:[HTTPService],
  styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent implements OnInit {

 constructor(public dataService:DataService,private httpService:HTTPService) { }
loading:boolean;
orderType = "";
orbHeight = "";
orbWidth = "";
orderAmount:number;
orderPrice:number;
currentTransactionFee:number;
sell_orders : any;
buy_orders : any;
customOrder1Left = "0"; 
customOrder2Left = "100vw"; 
customOrder3Left = "200vw"; 
showConfOverlay = false;
 showConfText = false;
  showOrderText = false;
 buySellText = "you are buying";
selectAmount = false;
originalOrderAmount:number;
  ngOnInit() {
  	 this.orbHeight =  "80%";
      this.orbWidth = "auto";
      this.getOrders();



  }
closeSelf(){

	this.dataService.maincontroller.showOrderPage = false;
}
getTotalPrice(){
	return this.orderAmount * this.orderPrice;
}
closeConf(){
	this.showConfOverlay = false;
}
showConf(){
	if(this.orderPrice > 0){
		this.selectAmount = false;
		this.showConfOverlay = true;
		this.showConfText = false;
		  this.showOrderText = true;
	}else{
		alert("please enter a valid price");
		 
	}
	
}
createOrder(){
	this.selectAmount = false;
	var tmpthis = this;
	this.loading = true;

	 var indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
     
     var giveQuant = this.orderPrice;
     var giveToken = this.dataService.maincontroller.currentCurrency;
     var getQuant = this.orderAmount;
     var getToken = this.dataService.maincontroller.selectedKey;

     if(this.orderType == "sell"){
     	giveQuant = this.orderAmount;
        giveToken = this.dataService.maincontroller.selectedKey;
        getQuant = this.orderPrice;
        getToken = this.dataService.maincontroller.currentCurrency;
     }

    
    var params = {"source": this.dataService.maincontroller.currentAddress, "give_quantity": giveQuant, "give_token": giveToken, "get_quantity":getQuant, "get_token": getToken, "expiration": 100};
var currentFee = this.dataService.maincontroller.getCurrentFee();
if(currentFee == "custom"){
	params["fee"] = +this.dataService.maincontroller.currentFee * 100000000;
}else{
	 params["fee_per_kb"] = currentFee;
}
   
	console.log(JSON.stringify(params));

    indiesquare.createOrder(params, function(data, error){
    if( error ){
    	tmpthis.showConfOverlay = false;
    	if(error.message != null){
    		tmpthis.dataService.maincontroller.showMessage(error.message);
    	}
    	else{
    		tmpthis.dataService.maincontroller.showMessage("error");
    	}
        console.error(error);
        return;
    }

    	 tmpthis.selectAmount = false; 
		 tmpthis.showOrderText = false;
   tmpthis.showConfText = true;
   
    console.dir('unsigned_tx:' + data.unsigned_tx);

    if(tmpthis.dataService.maincontroller.linkType == "indiesquare" || 1==1){
    indiesquare.signTransaction({'unsigned_tx': data.unsigned_tx}, function(url, urlScheme, error){
    if( error ){
        console.error(error);
        return;
    }
    /*
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 128, height: 128,
        correctLevel : QRCode.CorrectLevel.L
    });*/
}, function(data, error){
    if( error ){
    	 tmpthis.loading = false;
        console.error(error);
        tmpthis.showConfOverlay = false;
    	if(error.message != null){
    		tmpthis.dataService.maincontroller.showMessage(error.message);
    	}
    	else{
    		tmpthis.dataService.maincontroller.showMessage("error");
    	}
        return;
    }

        console.log(data.signed_tx);

    indiesquare.broadcast({"tx": data.signed_tx}, function(data, error){
    	 tmpthis.loading = false;
    if( error ){

        console.error(error);
        tmpthis.showConfOverlay = false;
    	if(error.message != null){
    		tmpthis.dataService.maincontroller.showMessage(error.message);
    	}
    	else{
    		tmpthis.dataService.maincontroller.showMessage("error");
    	}
        return;
    }
    tmpthis.dataService.maincontroller.showMessage("order placed!");
     tmpthis.showConfOverlay = false;
		 
    console.dir('txid:' + data.txid);
});

});
}



    tmpthis.currentTransactionFee = 0.0001;
	});


}
getSellPrice(){



}
getOrbInfo(){
return  "availability 199";
}
getOrbLock(){
	return "";
}
goToCustom1(){

	 this.customOrder1Left = "0";
	  this.customOrder2Left = "100vw";
	   this.customOrder3Left = "100vw";
}
goToCustom2(orderType:string){
this.orderAmount = null;
this.orderPrice = null;


       if(orderType == "buy"){
       	 this.buySellText = "you are buying";
       }else if(orderType == "sell"){
       	this.buySellText = "you are selling";
       }

	this.orderType = orderType;
	 this.customOrder1Left = "-100vw";
	  this.customOrder2Left = "0";
	   this.customOrder3Left = "100vw";
}
goToCustom3(){
	if(this.orderAmount > 0){
		this.customOrder1Left = "-100vw";
	  this.customOrder2Left = "-100vw";
	   this.customOrder3Left = "0";

	}else{
	 
	   alert("please enter a valid amount");
	}
}
buyOrder(order:any,type:string){
	this.goToCustom1();
this.orderAmount = null;
this.orderPrice = null;

	if(order.amount == 1){
this.selectAmount = false;
  if(type == "buy"){
       	 this.buySellText = "you are buying";
       }else{
       	this.buySellText = "you are selling";
       }


		this.orderType = type;
			  this.orderPrice = order.price; 
     		this.orderAmount = order.amount; 
		 
		this.showConfOverlay = true;
		this.showConfText = false;
		this.showOrderText = true;
		this.selectAmount = false;
	}else{
			this.orderType = type;
			  this.orderPrice = order.price; 
     		 
		 
		this.showConfOverlay = true;
		this.showConfText = false;
		this.originalOrderAmount = order.amount; 
		this.selectAmount = true;
		this.showOrderText = false;
	}
}
getOrderAmount(order:any){
	if(order.amount > 1){
		return "x"+order.amount;
	}
	return "";
}
getOrders(){
this.dataService.maincontroller.selectedKey = "SARUTOBICARD";
this.dataService.maincontroller.currentCurrency = "BITCRYSTALS";
this.dataService.maincontroller.currentAbrev = "BCY";
		 this.httpService.getOrders( this.dataService.maincontroller.selectedKey, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
          	console.log("got orders"+JSON.stringify(data)+" "+this.dataService.maincontroller.currentCurrency);

          this.sell_orders = this.dataService.maincontroller.marge(data.ask, 'sell');
  this.sell_orders =   this.sell_orders.slice(0,3);

				this.buy_orders = this.dataService.maincontroller.marge(data.bid, 'buy');
				  this.buy_orders =   this.buy_orders.slice(0,3);
					if(this.dataService.maincontroller.currentOrbs != null){
					var theORB = this.dataService.maincontroller.currentOrbs[this.dataService.maincontroller.selectedKey];
						if (this.buy_orders.length > 0) {

						  
						 if(theORB != null){
								theORB["bestBuyPrice"] = this.buy_orders[0].price;
						 }
							 
						} 

						if (this.sell_orders.length > 0) {
						  if(theORB != null){
									theORB["bestSellPrice"] = this.sell_orders[0].price;
							 }
						} 
								}

						//this.dataService.maincontroller.currentOrbs[this.dataService.maincontroller.selectedKey]["openOrders"] = this.sell_orders.length + this.buy_orders.length;
						 

      },   
      error => {
      	console.log("get orders"+JSON.stringify(error));
 			 
      },
     () => {});




}

}
