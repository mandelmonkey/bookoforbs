import { Component, OnInit,Input } from '@angular/core';
import { DataService } from '../services/data.service';

import {HTTPService} from "../services/http.service";
@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit {

 @Input()
	data:any;

constructor(public dataService:DataService,private httpService:HTTPService) { }
  ngOnInit() {
  	//console.log(JSON.stringify(this.data));
  }
getImage(){
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

 getInfo(){
 	if(this.data.type == "send"){
 		return "Sent "+this.data.quantity+" "+this.data.token+" to";
 	}
 	else if(this.data.type == "receive"){
 		return "Received "+this.data.quantity+" "+this.data.token+" from";
 	}
 }

 getAddress(){
if(this.data.type == "send"){
 		return this.data.destination;
 	}
 	else if(this.data.type == "receive"){
 		return this.data.source;
 	}
 }

 
 getDate(){

 	if(this.data.unconfirm){
 		return "unconfirmed";
 	}
 	else if (this.data.time != null){
  
 		var dateString=this.data.time.replace('T', ' ');
 		 dateString= dateString.replace('-', '/')
 	let date = new Date();
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
  	 var pxWidth = (document.documentElement.clientWidth * 0.9);
   

  	return pxWidth+"px";
  }
   getHeight(){


  	 var pxWidth = (document.documentElement.clientWidth * 0.9);
   	var pxHeight = pxWidth * 0.55;

  	return pxHeight+"px";
  
  }

}
