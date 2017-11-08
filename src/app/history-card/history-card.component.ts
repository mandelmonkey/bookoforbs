import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../services/data.service';

import {HTTPService} from "../services/http.service";
   declare var IndieSquare:any; 
@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit {
 unsigned_tx = "";
 @Input()
	data:any;

 @Input()
  order:boolean;

constructor(public dataService:DataService,private httpService:HTTPService) { }
  ngOnInit() {
  	//console.log(JSON.stringify(this.data));
  }
getImage(){

if(this.data != null){
  if(this.order == true){

    if(this.data.type == "sell"){

      var theToken = this.data.give_token;

        }
        else{
          theToken = this.data.get_token;
        }

    if(theToken == "BTC"){
      return this.dataService.getImage("asset_bitcoin");
    }else if(theToken == "XCP"){
      return this.dataService.getImage("xcp_asset");
    }
    else{
    
  
        for(var i = 0; i < this.dataService.maincontroller.currentOrbsKeys.length; i++){

          var aKey = this.dataService.maincontroller.currentOrbsKeys[i];
          if(aKey == theToken){

            return  this.dataService.maincontroller.currentOrbs[aKey].image;
          }
        }

        return "https://api.indiesquare.me/v2/tokens/"+ theToken +"/image?width=200&X-Api-Key=" + this.httpService.apiKey;

    }


   
  



  }
  else{



	if(this.data.token != null){
		if(this.data.token == "BTC"){
			return this.dataService.getImage("asset_bitcoin");
		}else if(this.data.token == "XCP"){
			return this.dataService.getImage("xcp_asset");
		}
		else{
    
  
        for(var i = 0; i < this.dataService.maincontroller.currentOrbsKeys.length; i++){

        	var aKey = this.dataService.maincontroller.currentOrbsKeys[i];
        	if(aKey == this.data.token){

        		return  this.dataService.maincontroller.currentOrbs[aKey].image;
        	}
        }

        return "https://api.indiesquare.me/v2/tokens/"+ this.data.token +"/image?width=200&X-Api-Key=" + this.httpService.apiKey;

    }
	 }
	 
	return "";
}

}

}

canCancel(){
	 
	if(this.data.status == "open"){
return true;
	}
	return false;
  
    //return true;
}
cancelOrder(){
var tmpthis = this;
	this.dataService.maincontroller.showLoading(this.dataService.getLang("please_wait"));
	console.log("Data "+JSON.stringify(this.data));
	  var indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
       var sendParams = {"source": this.dataService.maincontroller.currentAddress, "offer_hash":this.data.tx_hash};
if(this.dataService.maincontroller.feeIsCustom(this.dataService.maincontroller.currentFee)){
 

  sendParams["fee"] = Math.floor(parseFloat(this.dataService.maincontroller.customFee) * 100000000);

}else{
  sendParams["feePerKb"] =this.dataService.maincontroller.fees[this.dataService.maincontroller.currentFee];

  
}


indiesquare.createCancel(sendParams, function(data, error){


	
    if( error ){
    	tmpthis.dataService.maincontroller.showingLoading = false;
        console.error(error);
        if(typeof error.message != "undefined"){
        			tmpthis.dataService.maincontroller.showMessage(error.message);
        }else{
       	 	tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("error"));
   		 }
        return;
    }

 tmpthis.unsigned_tx=data.unsigned_tx;
    	  if(tmpthis.dataService.maincontroller.linkType == "indiesquare"){
     
  indiesquare.signTransaction({'unsigned_tx': tmpthis.unsigned_tx}, function(url, urlScheme, error){
  
    if( error ){
    	tmpthis.dataService.maincontroller.showingLoading = false;
      console.error(error);
             tmpthis.dataService.maincontroller.showMessage(error);
        
        
       
        return;
    } 
   
   
}, function(result, error){
 
  if(error){
  	tmpthis.dataService.maincontroller.showingLoading = false;
    console.error(error); 
             tmpthis.dataService.maincontroller.showMessage(error);
     
 return;
  }else{
     
console.log(result.signed_tx); 

    
  indiesquare.broadcast({"tx": result.signed_tx}, function(data, error){

     tmpthis.dataService.maincontroller.showingLoading = false;
        if( error ){
        	 
            console.error(error);
             tmpthis.dataService.maincontroller.showMessage(error);
             
            return;
        }
        tmpthis.dataService.history.reloadOrders();
        tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang("order_canceled"));
           
      });   
    

   }
   

});





}





});

 

}
getOrderTitle1(){
if(this.data != null){
if(this.data.type == "sell"){
  if(this.data.status == "filled"){
    return this.dataService.getLang("status_sold");
  }
  else if(this.data.status == "expired"){
    return this.dataService.getLang("status_couldnt_sell");
  }
     return this.dataService.getLang("status_selling");
   }
   else if(this.data.type == "buy"){
       if(this.data.status == "filled"){
    return this.dataService.getLang("status_bought");
  }
  else if(this.data.status == "expired"){
    return this.dataService.getLang("status_couldnt_buy");
  }
     return this.dataService.getLang("status_buying");
   }
}
    
}

 getOrderInfo(){
 	if(this.data != null){
 if(this.data.type == "sell"){
     return this.dataService.getLang("order_sell_info", this.data.give_quantity,this.data.give_token,this.data.price,this.data.get_token,this.getOrderStatus()); 
   }
   else if(this.data.type == "buy"){
    
     return this.dataService.getLang("order_buy_info", this.data.give_quantity,this.data.give_token,this.data.price,this.data.get_token,this.getOrderStatus()); 
  
   }
}
 }

 getOrderTitle2(){

return this.dataService.getLang("order_status");
    
}



 getOrderStatus(){
if(this.data != null){
return this.data.status;
}
    
 }

 getOrderTitle3(){

return this.dataService.getLang("order_date");
    
}



 getInfo(){
if(this.data != null){

	if(this.data.type == "order"){
  	return this.dataService.getLang("order_pending");
  	}else{
 	if(this.data.category== "Send"){

     return this.dataService.getLang("order_info_sent",this.data.quantity,this.data.token);
 	 
 	}
 	else if(this.data.category == "Receive"){
     return this.dataService.getLang("order_info_receive",this.data.quantity,this.data.token);
 	 
 	}
 }
}
 
 }



 getAddress(){
 	if(this.data != null){
if(this.data.type == "order"){
  return this.dataService.getLang("order_order_info",this.data.quantity,this.data.get_asset,this.data.give_quantity,this.data.give_asset);
  		
  	}else{
 

if(this.data.category== "Send"){
     return this.data.destination;
   }
  else if(this.data.category == "Receive"){
     return this.data.source;
   }
}
 
}
 }

 getDateTitle(){
 	if(this.data != null){
 	if(this.data.type == "order"){
  		return this.dataService.getLang("order_status");
  	}else{
return this.dataService.getLang("order_date");
  	}
  }
 }
 getDate(){
	 if(this.data != null){
 	if(this.data.unconfirm){
 		return this.dataService.getLang("order_unconfirmed");
 	}
 	else if (this.data.time != null){
  
 		var dateString=this.data.time.replace('T', ' ');
 		 dateString= dateString.replace('-', '/');
 		  dateString= dateString.replace('-', '/');
 		   dateString= dateString.replace('-', '/');
 		// console.log("ds"+dateString);
 	//	 dateString = "2015/12/31 00:00:00";
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
 
 return "";
}
 }



 imgLoadError(){
 
}
imageLoaded(){
}
  getWidth(){
    if(this.dataService.isMobile){
  	 var pxWidth = (document.documentElement.clientWidth * 0.9);
     
  	return pxWidth+"px";
    }
    else{
       var pxWidth = (document.documentElement.clientWidth * 0.4);
     
    return pxWidth+"px";

    }
  }
   getHeight(){
if(this.dataService.isMobile){
       var pxWidth = (document.documentElement.clientWidth * 0.9);
     var pxHeight = pxWidth * 0.55;

    return pxHeight+"px";
    }
    else{
       var pxWidth = (document.documentElement.clientWidth * 0.4);
     var pxHeight = pxWidth * 0.55;

    return pxHeight+"px";

    }

  
  
  }

}
