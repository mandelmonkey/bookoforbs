import { Component, OnInit,ViewChild } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
 declare var IndieSquare:any; 
  declare var bitcore:any; 
  declare var Mnemonic:any;
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  providers:[HTTPService],
  styleUrls: ['./order-page.component.css']
})

export class OrderPageComponent implements OnInit {

 constructor(public dataService:DataService,private httpService:HTTPService) { }
 pastOrderPickerTop = "1000px";
  pastOrderPicker;
loading:boolean;
loadingOrders:boolean;
loadingClosedOrders:boolean;
indiesquare:any;
unsigned_tx = "";
orderType = "";
orbHeight = "";
orbWidth = "";
orderAmount:number;
orderPrice:number;
currentTransactionFee:number;
sell_orders : any;
buy_orders : any;
closedOrders : any;
customOrder1Left = "0"; 
customOrder2Left = "100vw"; 
customOrder3Left = "200vw"; 
showConfOverlay = false;
 showConfText = false;
  showOrderText = false;
 buySellText = "";
selectAmount = false;
originalOrderAmount:number;
bottomTop = "0px";
  supply = " ";
  locked =" ";
 baseDivisible = -1;
 selectedDivisible = -1;

  ngOnInit() {
     this.sell_orders = [];
    this.buy_orders = [];
    this.closedOrders = [];
  	 this.orbHeight =  "80%";
      this.orbWidth = "auto";
      this.getOrders();
      this.getClosedOrders();

    this.buySellText = this.dataService.getLang("you_are_buying");
       document.body.style.position = "fixed";
 


 if(this.dataService.maincontroller.getPersistance("DIVISIBLEV1"+this.dataService.maincontroller.selectedKey) == "NO"){
             this. selectedDivisible = 0;
              
           }
           else{
           this.httpService.getTokenInfo( this.dataService.maincontroller.selectedKey).subscribe(
     data => { 
        
           this. selectedDivisible= data.divisible;
           if(this. selectedDivisible == 0){
             this.dataService.maincontroller.setPersistance("DIVISIBLEV1"+this.dataService.maincontroller.selectedKey,"NO");
           }
  },   
      error => {
        
        
      },
     () => {});

         }


          if(this.dataService.maincontroller.getPersistance("DIVISIBLEV1"+this.dataService.maincontroller.currentCurrency) == "NO"){
             this.baseDivisible = 0;
              
           }
           else{
           this.httpService.getTokenInfo( this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
          
           this. baseDivisible= data.divisible;
           if(this.baseDivisible == 0){
             this.dataService.maincontroller.setPersistance("DIVISIBLEV1"+this.dataService.maincontroller.currentCurrency,"NO");
           }
  },   
      error => {
        
        
      },
     () => {});

         }



  this.httpService.getAssetInfo( this.dataService.maincontroller.selectedKey).subscribe(
     data => { 
         console.log("asset info  "+JSON.stringify(data));
         if(typeof data.correctedSupply != "undefined"){
           
           this.supply = this.dataService.getLang("supply",data.correctedSupply);
         }else{
            this.supply = this.dataService.getLang("supply",data.supply);
        }
       
         if(data.locked == false){
           this.locked = "";
           
         }else{
             this.locked = "";
         }
  },   
      error => {
        console.log("asset info error"+JSON.stringify(error));
        
      },
     () => {});

  }

  getAmount(order){

    if(order.type == "sell"){
      return order.give_quantity;
    }else{
      return order.get_quantity;
    }

  }

   getPrice(order){

    if(order.type == "sell"){
      return order.get_quantity;
    }else{
      return order.give_quantity;
    }

  }


   getDate(order){

   
     var dateString= order.time.replace('T', ' ');
      dateString= dateString.replace('-', '/');
       dateString= dateString.replace('-', '/');
        dateString= dateString.replace('-', '/');
     // console.log("ds"+dateString);
   //   dateString = "2015/12/31 00:00:00";
   //2017/10/17T09:31:12+0000
   let date = new Date(dateString);

 var hourOffset = date.getTimezoneOffset() / 60;

        date.setHours( date.getHours() + hourOffset ); 



   var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();
var minutes = date.getMinutes();
var hours = date.getHours();
var seconds = date.getSeconds();
var myFormattedDate = day+"-"+(monthIndex+1)+"-"+year+" "+ hours+":"+minutes+":"+seconds;

   return myFormattedDate;

  }
    getListHeight(){
   if(this.pastOrderPicker!= null){
     return this.pastOrderPicker.offsetHeight-40 +"px";
   }
 }
  ngOnDestroy(){
     document.body.style.position = null;
     
  }
  getImageSize(){

    if(this.dataService.landscape == true){
      return {width:"100%"};
    }
    return  {height:"45vh"};
  }
  ngAfterViewInit() {
    this.pastOrderPicker = document.getElementById("pastOrderPicker");

    this.pastOrderPickerTop = document.documentElement.clientHeight+"";
  }

 showPastOrderPicker(){
 

this.pastOrderPickerTop = (document.documentElement.clientHeight-this.pastOrderPicker.offsetHeight)+"";
   

 }
closePicker(){


this.pastOrderPickerTop =  document.documentElement.clientHeight+"";

 
 }

  getBottomTop(){

   var clientHeight = document.documentElement.clientHeight / 2;
      var top = document.getElementById("sendOrb");
    this.bottomTop =  (top.clientHeight+top.clientTop+90)+"px";
   return this.bottomTop;
  }
     onBlurMethod(){
       document.body.style.position = "fixed";
         
     }

     onFocusMethod(){
document.body.style.position = "none";
         
     }
closeSelf(){

	this.dataService.maincontroller.showOrderPage = false;
}
getTotalPrice(){
	return this.orderAmount * this.orderPrice;
}
closeConf(){
	this.showConfOverlay = false;
  this.showOrderText = false;
  this.loading = false;


}
showConf(){
	if(this.orderPrice > 0){
		this.selectAmount = false;
		this.showConfOverlay = true;
		this.showConfText = false;
		  this.showOrderText = true;
	}else{
		alert(this.dataService.getLang("enter_valid_price"));
		 
	}
	
}
createOrder(){

    if(this.selectedDivisible == -1 || this.baseDivisible == -1){
      alert("Error loading, please try again");
      return;
    }
	this.selectAmount = false;
	var tmpthis = this;
	this.loading = true;

	 this.indiesquare = new IndieSquare({
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
	//params["fee"] = +this.dataService.maincontroller.currentFee * 100000000;

  params["feePerKb"] =  parseFloat(this.dataService.maincontroller.customFee) / 1000;
}else{
	 params["fee_per_kb"] = currentFee;
}
   
	console.log(JSON.stringify(params));

    tmpthis.indiesquare.createOrder(params, function(data, error){

    if( error ){
    	tmpthis.closeConf();
      tmpthis.loading = false;
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
    tmpthis.currentTransactionFee =  data.fee / 100000000;
     data.unsigned_tx = tmpthis.dataService.rbf_tools.setRBF(data.unsigned_tx);

     var getDivisible= false;
      var giveDivisible= false;
     

     if(giveToken == tmpthis.dataService.maincontroller.selectedKey){
       if(tmpthis.baseDivisible == 1){
       getDivisible = true;
       
     }
       if(tmpthis.selectedDivisible == 1){
       giveDivisible = true;
      
     }
   }else{
if(tmpthis.baseDivisible == 1){
       giveDivisible = true;
       
     }
       if(tmpthis.selectedDivisible == 1){
       getDivisible = true;
       
     }

   }
     


     var res =   tmpthis.dataService.cp_tools.checkOrderTransaction(data.unsigned_tx,tmpthis.dataService.maincontroller.currentAddress,getToken,getQuant,giveToken,giveQuant,getDivisible,giveDivisible);
    if(res == false){
       alert("error transaction does not match params");
       return;
    }
    tmpthis.unsigned_tx = data.unsigned_tx;

    if(tmpthis.dataService.maincontroller.linkType == "indiesquare" ){
    tmpthis.indiesquare.signTransaction({'unsigned_tx': data.unsigned_tx}, function(url, urlScheme, error){
    if( error ){
          tmpthis.closeConf();
      tmpthis.loading = false;
      if(error.message != null){
        tmpthis.dataService.maincontroller.showMessage(error.message);
      }
      else{
        tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("error"));
      }
        console.error(error);
        return;
    }

    if(tmpthis.dataService.isMobile == false){
      tmpthis.dataService.maincontroller.showQR(url);
    }
   
}, function(data, error){
    if( error ){
    	 tmpthis.loading = false;
        console.error(error);
         tmpthis.dataService.maincontroller.closeQR();
        tmpthis.showConfOverlay = false;
    	if(error.message != null){
    		tmpthis.dataService.maincontroller.showMessage(error.message);
    	}
    	else{
    		tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("error"));
    	}
        return;
    }

    
       
    tmpthis.indiesquare.broadcast({"tx": data.signed_tx}, function(data, error){
    	 tmpthis.loading = false;
    if( error ){

        console.error(error);
        tmpthis.showConfOverlay = false;
    	if(error.message != null){
    		tmpthis.dataService.maincontroller.showMessage(error.message);
    	}
    	else{
    		tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("error"));
    	}
       tmpthis.closeConf();
    tmpthis.dataService.maincontroller.closeQR();
        return;
    }
 
 tmpthis.closeConf();
 tmpthis.dataService.maincontroller.closeQR();
 tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("order_placed"));
     
 
});  




});
}else{

    
         tmpthis.dataService.maincontroller.showConf(tmpthis.dataService.getLang('you_are_ordering',giveQuant+"",giveToken,getQuant+"",getToken,  tmpthis.currentTransactionFee+""),tmpthis.getPassphrase ,tmpthis.cancelOrder,tmpthis );
 

}



   
	});


}
cancelOrder(owner:any){
  owner.loading = false;
}

 getPassphrase(currentOwner:any){

      currentOwner.dataService.maincontroller.showPassword(currentOwner.cancelSend,currentOwner.broadcast,currentOwner);
   }
 

  broadcast(passphrase:string,owner:any){
     
 
    owner.loading = true;

    var tmpthis =owner;

    try {

        var seed = new Mnemonic(passphrase.split(' ')).toHex();
    }
    catch(err) {
       
         tmpthis.loading = false;
         throw  err;
    }
  
    
    var master = bitcore.HDPrivateKey.fromSeed(seed);
    
    var route = tmpthis.dataService.maincontroller.basePath + tmpthis.dataService.maincontroller.currentIndex;
    
    var masterderive = master.derive( route );
    
     
     

         tmpthis.params = [];
       
        /*
        tmpthis.params["pubkey"] = masterderive.publicKey;
       
         tmpthis.params["destination"] =  tmpthis.dataService.maincontroller.currentSendAddress;
        */
        var privkey = bitcore.PrivateKey(masterderive.privateKey);
        
         tmpthis.params["address"] = privkey.toAddress().toString();
         tmpthis.params.callback = function(signed_tx){
                /*
              if(1==1){
    tmpthis.loading = false;
 tmpthis.closeConf(); 
 tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("order_placed"));
    return; 
  }*/
             
      tmpthis.indiesquare.broadcast({"tx": signed_tx}, function(data, error){
    if( error ){
     
 tmpthis.closeConf(); 
        console.error(error);
        alert("error broadcasting");
        return;
    }
     tmpthis.loading= false;
  
 tmpthis.closeConf(); 
 tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("order_placed"));
});
              

            
        };
         tmpthis.params.onError = function(error){
            console.log("error "+error);
            tmpthis.loading = false;

 tmpthis.closeConf(); 
            
        };
         tmpthis.params.fail = function(error){
            console.log("fail "+error);
            tmpthis.loading= false;

 tmpthis.closeConf(); 
            
        };
         try {
            
            var result = bitcore.signrawtransaction(tmpthis.unsigned_tx, privkey, tmpthis.params,tmpthis.httpService.apiKey);
          

        }  catch(err) {
            tmpthis.loading= false;

 tmpthis.closeConf(); 
           console.log("error"+err);
        }





  }
getSellPrice(){



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
       	 this.buySellText = this.dataService.getLang("you_are_buying");
       }else if(orderType == "sell"){
       	this.buySellText = this.dataService.getLang("you_are_selling");
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
	 
	   alert(this.dataService.getLang("enter_valid_amount"));
	}
}
formatNum(num:number){
  if(num > 1){
return num.toFixed(2);
}
else if(num > 0.1){
return num.toFixed(4);
}
else if(num > 0.01){
return num.toFixed(6);
}else{
  return num.toFixed(8);
}
}
 
buyOrder(order:any,type:string){
	this.goToCustom1();
this.orderAmount = null;
this.orderPrice = null;

	if(order.amount == 1){
this.selectAmount = false;
  if(type == "buy"){
       	 this.buySellText = this.dataService.getLang("you_are_buying");
       }else{
       	this.buySellText = this.dataService.getLang("you_are_selling");
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

 getPastOrderPickerTop(){
  
   return this.pastOrderPickerTop+"px";
 }
getOrderAmount(order:any){

  var fiatPrice = this.dataService.maincontroller.getFiatForToken(this.dataService.maincontroller.currentCurrency,order.price);
	if(order.amount != 1){
		return "x"+this.formatNum(order.amount)+" "+fiatPrice;
	}
	return ""+fiatPrice;
}
 
getOrders(){
this.loadingOrders = true;
		 this.httpService.getOrders( this.dataService.maincontroller.selectedKey, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
       this.loadingOrders = false;
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

						 

      },   
      error => {
        this.loadingOrders = false;
      	console.log("get orders"+JSON.stringify(error));
 			 
      },
     () => {});




}
getLastSoldPrice(){
  if(this.closedOrders.length > 0){
    return this.getPrice(this.closedOrders[0])+" "+this.dataService.maincontroller.currentAbrev;
  }else{
    return "-";
  }
}
getLastSoldDate(){
  if(this.closedOrders.length > 0){
    return this.getDate(this.closedOrders[0]);
  }else{
    return "-";
  }
}
getClosedOrders(){
this.loadingClosedOrders = true;
     this.httpService.getClosedOrders( this.dataService.maincontroller.selectedKey, this.dataService.maincontroller.currentCurrency).subscribe(
     data => { 
       this.loadingClosedOrders = false;
            console.log("got closed orders"+JSON.stringify(data)+" "+this.dataService.maincontroller.currentCurrency);
         
         this.closedOrders = data;

             

      },   
      error => {
        this.loadingClosedOrders = false;
        console.log("get closedorders"+JSON.stringify(error));
        
      },
     () => {});




}

}
