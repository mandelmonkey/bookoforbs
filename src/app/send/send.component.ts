import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
declare var Mnemonic:any; 
 declare var bitcore:any; 
    declare var IndieSquare:any; 
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
    providers:[HTTPService],
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  constructor(public dataService:DataService,private httpService:HTTPService) { }
  public amount:string;
  public currentORB:string;
  public sendAddress:string;
  public status:string;
public params:any;
public sending:boolean;
    public basePath = 'm/0\'/0/';
  public account = null;
rotated = false;
  public fees:any;
  ngOnInit() {
  	this.amount = "";
    this.sendAddress = "";
    this.status = "";
    this.sending = false;
  }

  closeSend(){
  	this.dataService.maincontroller.showSend = false; 
  }
  addKey(num:string){
  	if(num == "-1"){
  		this.amount = this.amount.slice(0, -1);
  	}else{
  		this.amount = this.amount+num;
  	}
  	
  }

  getFeeTitle(){

 if(this.dataService.maincontroller.currentFee == "fastestFee"){

      return "fee: very high";
    }
    else if(this.dataService.maincontroller.currentFee == "halfHourFee"){

      return "fee: high";
    }
    else if(this.dataService.maincontroller.currentFee == "lowFee"){

      return "fee: low";
    }
    else if(this.dataService.maincontroller.currentFee == "hourFee"){

      return "fee: mid";
    }
    else{

      return "fee: "+ this.dataService.maincontroller.customFee+" btc";
    }
 

    
  }

  openFeeList(){
    
      console.log("opening fees");
    document.getElementById("myDropdownFee").classList.toggle("show");

    var div =   document.getElementById("smallarrowFee");


     var deg = this.rotated ? 0 : -90;

    div.style.webkitTransform = 'rotate('+deg+'deg)';  
    div.style.transform       = 'rotate('+deg+'deg)'; 
    div.style.webkitTransition=" all 0.1s ease-in-out"; 
     div.style.transition=" all 0.1s ease-in-out";
    this.rotated = !this.rotated;
 
  }

  getTitleForFee(index:number){

    if(index == 0){

      return "Very High";
    }
    else if(index == 1){

      return "High";
    }
    else if(index == 2){

     return "Mid";
    }
    else if(index == 3){

        return "Low";
    }
      

  }
  setFee(index:number){
    if(index == 0){
        this.dataService.maincontroller.currentFee = "fastestFee";
    }
    else if(index == 1){
        this.dataService.maincontroller.currentFee = "halfHourFee";
    }
     else if(index == 2){
        this.dataService.maincontroller.currentFee = "hourFee";
    }
     else if(index == 3){
        this.dataService.maincontroller.currentFee = "lowFee";
    }
     else if(index == 4){

       if(parseFloat(this.dataService.maincontroller.customFee) < 0){
         this.dataService.maincontroller.showMessage("this fee is too low! please enter a fee greater than 0");
         this.dataService.maincontroller.customFee = "";
       }
       else if(parseFloat(this.dataService.maincontroller.customFee) > 0.01){
         this.dataService.maincontroller.showMessage("this fee is too high! please enter a fee less than 0.01");
         this.dataService.maincontroller.customFee = "";
       }
       else{
        this.dataService.maincontroller.currentFee = "custom";
      }



    }

    this.openFeeList();

  }

  send(){
    
    if(parseFloat(this.amount) < 0 || parseFloat(this.amount) > this.dataService.maincontroller.currentBalance){
      this.dataService.maincontroller.showMessage("please enter a valid amount");
      return;
    }

    if( bitcore.Address.isValid(this.sendAddress, 'livenet') == false){
           this.dataService.maincontroller.showMessage("please enter a valid address");
        return;

}
        
         

            var indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
var tmpThis = this
   // if(this.dataService.maincontroller.currentAddress)
  this.sending = true;

   var tmpthis = this;

   var fee = -1;
   var feePerKb = -1;

if(this.dataService.maincontroller.currentFee == "custom"){

  fee =  Math.floor(parseFloat(this.dataService.maincontroller.customFee) * 100000000);
  feePerKb = -1;

}else{
  fee = -1;
  feePerKb = this.dataService.maincontroller.fees[this.dataService.maincontroller.currentFee];
}

console.log("fee "+fee);
console.log("feeperkb "+feePerKb);

 this.httpService.createSendTransaction(this.dataService.maincontroller.currentAddress,this.sendAddress,this.dataService.maincontroller.selectedKey,this.amount,feePerKb,fee).subscribe(
     data => { 
      console.log(JSON.stringify(data));

        if(data.unsigned_tx != null){
 
      if(this.dataService.maincontroller.linkType == "indiesquare"){


     
       indiesquare.signTransaction({'unsigned_tx': data.unsigned_tx}, function(url, urlScheme, error){
  
    if( error ){
        tmpthis.sending = false;
        console.log("error"+error);
       
        return;
    } 
   
   
}, function(result, error){
 
  if(error){
    console.error(error);
    tmpthis.sending = false;
 return;
  }else{
     
console.log(result.signed_tx); 

    indiesquare.broadcast({"tx": result.signed_tx}, function(data, error){
    if( error ){
        console.error(error);
         tmpthis.sending = false;
        return;
    }
    tmpthis.dataService.maincontroller.showMessage("sent!");
});



   }
   

});








      }else{

    try {
        var seed = new Mnemonic(this.dataService.maincontroller.recoveryPhrase).toHex();
    }
    catch(err) {
       
         tmpthis.sending = false;
         throw  err;
    }
  
    
    var master = bitcore.HDPrivateKey.fromSeed(seed);
    
    var route = this.basePath + this.dataService.maincontroller.currentIndex;
    
    var masterderive = master.derive( route );
    
     
     

          this.params = [];
       
        
          this.params["pubkey"] = masterderive.publicKey;
       
          this.params["destination"] = this.sendAddress;
        
        var privkey = bitcore.PrivateKey(masterderive.privateKey);
        
          this.params["address"] = privkey.toAddress().toString();
          this.params.callback = function(signed_tx){
               console.log("signed "+signed_tx);
              

                 indiesquare.broadcast({"tx": signed_tx}, function(data, error){
    if( error ){
       tmpthis.sending = false;
        console.error(error);
        return;
    }
     tmpthis.sending = false;
    tmpthis.dataService.maincontroller.showMessage("sent!");
});
            
        };
          this.params.onError = function(error){
            console.log("error "+error);
            tmpthis.sending = false;
            
        };
          this.params.fail = function(error){
            console.log("fail "+error);
            tmpthis.sending = false;
            
        };
         try {
            
            var result = bitcore.signrawtransaction(data.unsigned_tx, privkey, this.params,this.httpService.apiKey);
           



        }  catch(err) {
            tmpthis.sending = false;
           console.log("error"+err);
        }

      } 
      }
      },   
      error => {
        tmpthis.sending = false;
 
 
      },
     () => {});


  }

}
