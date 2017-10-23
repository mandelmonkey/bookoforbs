import { Component, OnInit, EventEmitter, Directive } from '@angular/core';

import { DataService } from '../services/data.service';
import { ClipboardService } from '../services/clipboard.service';
declare var QRious:any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
 
export class AccountComponent implements OnInit {
   public copyEvent: EventEmitter<string>;
    public errorEvent: EventEmitter<Error>;
    public value: string;

    private clipboardService: ClipboardService;


  constructor(public dataService:DataService, clipboardService: ClipboardService ) {

        this.clipboardService = clipboardService;
        this.copyEvent = new EventEmitter();
        this.errorEvent = new EventEmitter();
        this.value = "";

    }
    public copyToClipboard() : void {

        this.clipboardService
            .copy( this.dataService.maincontroller.currentAddress )
            .then(
                ( value: string ) : void => {

                    this.copyEvent.emit( value );
                    alert(this.dataService.maincontroller.currentAddress+" copied to clipboard, make sure to check the address matches on paste!")

                }
            )
            .catch(
                ( error: Error ) : void => {

                    this.errorEvent.emit( error );
                     alert("error copying to clipboard");

                }
            )
        ;

    }
  ngOnInit() {
  	 var qr = new QRious({
          element: document.getElementById('qr1'),
          value: this.dataService.maincontroller.currentAddress,
          size:this.getQRSize()
        });






  }

  getQRSize(){
  	var screenHeight = document.documentElement.clientHeight;
  	var screenWidth= document.documentElement.clientWidth;

  	if(screenHeight > screenWidth){
  		return screenWidth * 0.5;
  	}else{
  		return screenHeight * 0.5;
  	}

  }
  getAddress(){
  	if(this.dataService.maincontroller.currentAddress == "empty"){
  			return "no address";
  	}
  	return this.dataService.maincontroller.currentAddress;
  }

  getCurrency(){
  	if(this.dataService.maincontroller.currentOrbs == null){
  		return "loading...";
  	}
  	else{

  		return this.dataService.maincontroller.currentCurrency;
  	}
  }
  send(currency:string){
  	this.dataService.maincontroller.showQRScan = true;
  		this.dataService.maincontroller.showAccount = false;
  }
getCurrencyIcon (){
	if(this.dataService.maincontroller.currentCurrency == "BITCRYSTALS"){
		return "../assets/images/bitcrystals.png"
	}else {
		return "";
	}
}
 
   getBalanceCurrency(){
   	if(this.dataService.maincontroller.currentCurrency == null){
   		return "";
   	}
    return this.getBalance(this.dataService.maincontroller.currentCurrency);
  }
    getBalance(currency:string){
     
  	if(this.dataService.maincontroller.userBalance == null){
  		return "loading...";
  	}
  	else{
var abrev = this.dataService.maincontroller.currentAbrev;
  		if(currency == "BTC"){
  			abrev = "BTC";
  		}



  		var currentBalance = this.dataService.maincontroller.getUserBalance(currency);
  	 

  		if(currentBalance == null){
  			return "0 "+ abrev;
  		}else{
  			return currentBalance;
  		}
  	}
  }

}
