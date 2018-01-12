import { Component , OnInit, EventEmitter, Directive, HostListener, ChangeDetectorRef  } from '@angular/core';

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
  addressPickerTop = "1000px";
  addressPicker;
    private clipboardService: ClipboardService;


  constructor(public dataService:DataService, clipboardService: ClipboardService, private ref: ChangeDetectorRef ) {

        this.clipboardService = clipboardService;
        this.copyEvent = new EventEmitter();
        this.errorEvent = new EventEmitter();
        this.value = "";

    }

    ngAfterViewInit() {
    this.addressPicker = document.getElementById("addressPicker");

    this.addressPickerTop = document.documentElement.clientHeight+"";
   document.body.style.position = "fixed";

}

@HostListener('window:resize', ['$event'])
onResize(event) {
 this.ref.markForCheck();
 this.addressPickerTop = document.documentElement.clientHeight+"";
  document.body.style.position = "fixed";
}
    public copyToClipboard() : void {
var tmpthis = this;
        this.clipboardService
            .copy( this.dataService.maincontroller.currentAddress )
            .then(
                ( value: string ) : void => {

                    this.copyEvent.emit( value );
                    alert(tmpthis.dataService.getLang("copied_info",value))

                }
            )
            .catch(
                ( error: Error ) : void => {

                    this.errorEvent.emit( error );
                     alert(tmpthis.dataService.getLang("error"));

                }
            )
        ;

    }



 getAddressPickerTop(){
  
   return this.addressPickerTop+"px";
 }
showSeperator(){
  if(document.documentElement.clientHeight > 600){
    return true;
  }
  return false;
}
    getTopBackground(){
  var topbar = document.getElementById("topBarTop");
 
      return topbar.clientHeight+"px";
    }
  ngOnInit() {
  	 var qr = new QRious({
          element: document.getElementById('qr1'),
          value: this.dataService.maincontroller.currentAddress,
          size:this.getQRSize()
        });






  }
  getTopHeight(){
      if(document.documentElement.clientHeight < document.documentElement.clientWidth){
         return "50vh";
     }else{
      return "40vh";
    }
     
  }
   getBottomHeight(){
     if(document.documentElement.clientHeight < document.documentElement.clientWidth){
         return "50vh";
     }else{
      return "60vh";
    }
  }
  getQRHeight(){
    return this.getQRSize()+"px";
  }
  getQRSize(){
  	var screenHeight = document.documentElement.clientHeight;
  	var screenWidth= document.documentElement.clientWidth;

  	if(screenHeight > screenWidth){
      if(document.documentElement.clientHeight > 600){
  		return -5 + screenWidth * 0.5;
      }
      else{
          return -20 + screenWidth * 0.5;
      }
  	}else{
  		return -5 + screenHeight * 0.4;
  	}

  }
  getAddress(){
  	if(this.dataService.maincontroller.currentAddress == "empty"){
  			return  this.dataService.getLang("no_address")
  	}
  	return this.dataService.maincontroller.currentAddress;
  }

  getCurrency(){
  	if(this.dataService.maincontroller.currentOrbs == null){
  		return  this.dataService.getLang("loading")
  	}
  	else{

  		return this.dataService.maincontroller.currentCurrency;
  	}
  }
  send(currency:string){

     this.dataService.maincontroller.currentBalance =  this.dataService.maincontroller.getUserBalance(currency);

     var selectedOrb = {
       image:"",
       isCurrency:true
     };
     if(currency == "BTC"){
       selectedOrb.image = this.dataService.getImage('bitcoinWingsSmall');
     }else if (currency == "BITCRYSTALS"){
       selectedOrb.image = this.dataService.getImage('bitcrystals');
     }
     else if (currency == "PEPECASH"){
       selectedOrb.image = this.dataService.getImage('pepecash');
     }
     else if (currency == "XCP"){
       selectedOrb.image = this.dataService.getImage('xcp_asset');
     }
    this.dataService.maincontroller.selectedOrb = selectedOrb;
    this.dataService.maincontroller.selectedKey = currency; 

    this.dataService.maincontroller.openSend();
  
  }
getCurrencyIcon (){
	if(this.dataService.maincontroller.currentCurrency == "BITCRYSTALS"){
		return this.dataService.getImage('bitcrystals');
	}else if(this.dataService.maincontroller.currentCurrency == "XCP"){
    return this.dataService.getImage('xcp_asset');
  }
  else if(this.dataService.maincontroller.currentCurrency == "PEPECASH"){
    return this.dataService.getImage('pepecash');
  }
  else {
		return "";
	}
}
 
   getBalanceCurrency(){
     if(this.dataService.maincontroller.loading == true){
       return this.dataService.getLang("loading");
     }
   	if(this.dataService.maincontroller.currentCurrency == null){
   		return "";
   	}
    return this.getBalance(this.dataService.maincontroller.currentCurrency);
  }
   getUnconfBalanceCurrency(){
     if(this.dataService.maincontroller.loading == true){
       return "";
     }
     if(this.dataService.maincontroller.currentCurrency == null){
       return "";
     }
    return this.getUnconfBalance(this.dataService.maincontroller.currentCurrency);
  }
   getUnconfBalance(currency:string){
       
    if(this.dataService.maincontroller.loading == true){
      return "";
    }
    if(this.dataService.maincontroller.userBalance == null){
      return "";
    }
    else{
     

      var currentBalance = this.dataService.maincontroller.getUserUnconfBalance(currency);
       currentBalance = currentBalance.replace( /\s/g, "");

      if(currentBalance == null){
        return "";
      }else{

        return currentBalance+" ";;
      }
    }
  }
    getBalance(currency:string){
       
    if(this.dataService.maincontroller.loading == true){
      return this.dataService.getLang("loading");
    }
  	if(this.dataService.maincontroller.userBalance == null){
  		return  this.dataService.getLang("loading");
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
  			return currentBalance.toFixed(4);
  		}
  	}
  }


   getListHeight(){
   if(this.addressPicker != null){
     return this.addressPicker.offsetHeight-50 +"px";
   }
 }
getLeftPos(){
  var bwidth  = document.getElementById("changeAdd").clientWidth;
   
  return (document.documentElement.clientWidth / 2)-(bwidth/2) + "px";
}
 setAddress(addresObj:any){
   this.dataService.maincontroller.currentAddress = addresObj.address;
   this.dataService.maincontroller.currentAddressIndex = addresObj.index;
   this.dataService.maincontroller.setPersistance("userAddress",JSON.stringify(addresObj) );
   this.dataService.maincontroller.reloadBalances();
     this.closePicker();


 }
getAddresses(){


var addressesString = this.dataService.maincontroller.getPersistance("HDaddressesV1");
    if(addressesString == ""){
      return [];
    }
  var addresses = JSON.parse(addressesString);

 
return addresses;

}

addAddress(){
  this.dataService.maincontroller.showPassword(null,this.contAddAddress,this);
}
contAddAddress(passphrase:string){
this.dataService.addAddressToHDList(passphrase);
}

 showAddressPicker(){

 

this.addressPickerTop = (document.documentElement.clientHeight-this.addressPicker.offsetHeight)+"";
   

 }
closePicker(){


this.addressPickerTop =  document.documentElement.clientHeight+"";

 
 }


  getBalanceFiat(currency:string){
       
    if(this.dataService.maincontroller.loading == true){
      return "";
    }
    if(this.dataService.maincontroller.userBalance == null){
      return this.dataService.getLang("loading");
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
        return this.dataService.maincontroller.getFiatForToken(currency,currentBalance);
      }
    }
  }

}
