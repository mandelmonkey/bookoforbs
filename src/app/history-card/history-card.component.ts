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

canCancel(){
	 
	if(this.data.status == "open"){
return true;
	}
	return false;
  
    //return true;
}
cancelOrder(){
var tmpthis = this;
	this.dataService.maincontroller.showLoading("Please wait...");
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
       	 	tmpthis.dataService.maincontroller.showMessage("error canceling order");
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
        if( error ){
        	tmpthis.dataService.maincontroller.showingLoading = false;
            console.error(error);
             tmpthis.dataService.maincontroller.showMessage(error);
             
            return;
        }
       tmpthis.dataService.maincontroller.showingLoading = false;
        tmpthis.dataService.maincontroller.showMessage("Cancel order placed!");
           
      });  

    

   }
   

});





}





});

 

}
getOrderTitle1(){

if(this.data.type == "sell"){
  if(this.data.status == "filled"){
    return "Sold";
  }
  else if(this.data.status == "expired"){
    return "Couldn't Sell";
  }
     return "Selling";
   }
   else if(this.data.type == "buy"){
       if(this.data.status == "filled"){
    return "Bought";
  }
  else if(this.data.status == "expired"){
    return "Couldn't Buy";
  }
     return "Buying";
   }
    
}

 getOrderInfo(){
 if(this.data.type == "sell"){
     return this.data.give_quantity + " " + this.data.give_token + " at "+this.data.price +" "+this.data.get_token +  " each, status: "+this.getOrderStatus();
   }
   else if(this.data.type == "buy"){
      return this.data.get_quantity + " " + this.data.get_token + " at "+ this.data.price +" "+ this.data.give_token + " each, status: "+this.getOrderStatus();
   }
 }

 getOrderTitle2(){

return "Status";
    
}



 getOrderStatus(){

return this.data.status;
    
 }

 getOrderTitle3(){

return "Date";
    
}



 getInfo(){

   	if(this.data.type == "order"){
  		return "Pending order";
  	}else{
 	if(this.data.category== "Send"){
 		return "Sent "+this.data.quantity+" "+this.data.token+" to";
 	}
 	else if(this.data.category == "Receive"){
 		return "Received "+this.data.quantity+" "+this.data.token+" from";
 	}
 }

 
 }



 getAddress(){
if(this.data.type == "order"){
  		return this.data.get_quantity+" " +this.data.get_asset+" for " + this.data.give_quantity+" " +this.data.give_asset;
  	}else{
 

if(this.data.category== "Send"){
     return this.data.destination;
   }
  else if(this.data.category == "Receive"){
     return this.data.source;
   }
}
 

 }

 getDateTitle(){
 	if(this.data.type == "order"){
  		return "Status";
  	}else{
return "Date";
  	}
 }
 getDate(){
	 
 	if(this.data.unconfirm){
 		return "unconfirmed";
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
