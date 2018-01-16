import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
import {ActivatedRoute} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

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

  constructor(public dataService:DataService,private httpService:HTTPService,private route:ActivatedRoute,private ref: ChangeDetectorRef) { }
  public amount:string;
  public currentORB:string; 
  public status:string;
public params:any;
public currentSendResponse:any;
public sending:boolean;
  test = "hello";
  public account = null;
  public indiesquare:any;
  public  divisible = -1;
  tmpthis:any;
  
   getNumImage(image:string){
      
      return { 
        "background":"url("+ this.dataService.getImage(image)+") no-repeat 0 0",
         "background-size":" auto 50%",
         "background-position":" center",
         "border":"none",
         "background-blend-mode":" overlay"
      }
     
  }
  ngOnInit() {
  	this.amount = "";
    this.dataService.maincontroller.currentSendAddress="";
    this.status = "";
    this.sending = false;

    this.indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
    });
    this.tmpthis = this;
    
    document.body.style.position = "fixed";


  if(this.dataService.maincontroller.selectedKey == "BTC"){
             this.divisible = 1;
             
           }
           else if(this.dataService.maincontroller.getPersistance("DIVISIBLEV1"+this.dataService.maincontroller.selectedKey) == "NO"){
             this.divisible = 0;
              
           }
           else{
           this.httpService.getTokenInfo( this.dataService.maincontroller.selectedKey).subscribe(
     data => { 
        
           this.divisible = data.divisible;
           if(this.divisible == 0){
             this.dataService.maincontroller.setPersistance("DIVISIBLEV1"+this.dataService.maincontroller.selectedKey,"NO");
           }
  },   
      error => {
        
        
      },
     () => {});

         }


  }
  ngOnDestroy(){
     document.body.style.position = null;
      
    document.body.style.position = "fixed";
     
  }
  disableTouches(){
 //.setdisabled { pointer-events: none; }
  }
  closeSend(){
    this.dataService.maincontroller.currentSendAddress="";
  	this.dataService.maincontroller.showSend = false; 

  }
  addKey(num:string){
  	if(num == "-1"){


  		this.amount = this.amount.slice(0, -1);
  	}else{
       if(num == "."){
        if(this.amount.indexOf(".") != -1 || this.amount.length == 0){
          return;
        }
      }
      if(num == "0"){
        if(this.amount.length == 1){
          if(this.amount.indexOf("0") != -1){
              this.amount = this.amount+".";
          }
        }
      }
  		this.amount = this.amount+num;
  	}
  	
  }
 
signError(error,currentOwner){

 
 currentOwner.sending = false;
  
  currentOwner.closeSend();

currentOwner.ref.detectChanges();
 
 
}
finishSign(hex,currentOwner){

 

 
 currentOwner.broadcastTx(hex,currentOwner);
 
}
  signBoO(currentOwner:any){


     var params = {};
       
      params["destination"] =  currentOwner.dataService.maincontroller.currentSendAddress;
        
    params["address"] =  currentOwner.dataService.maincontroller.currentAddress;


    var json = JSON.stringify({signType:"transaction","toSign":currentOwner.currentSendResponse.unsigned_tx,"params":params});
   
    currentOwner.dataService.setCurrentSignData(json,currentOwner.finishSign,currentOwner.signError,currentOwner);

    currentOwner.sending = true;
  }

   getPassphrase(currentOwner:any){

      currentOwner.dataService.maincontroller.showPassword(currentOwner.cancelSend,currentOwner.broadcast,currentOwner);
   }
 

  broadcast(passphrase:string,owner:any){
     

    owner.sending = true;

    var tmpthis =owner;

    try {

        var seed = new Mnemonic(passphrase.split(' ')).toHex();
    }
    catch(err) {
       
         tmpthis.sending = false;
         throw  err;
    }
  
    
    var master = bitcore.HDPrivateKey.fromSeed(seed);
    
    var route = tmpthis.dataService.maincontroller.basePath + tmpthis.dataService.maincontroller.currentIndex;
      console.log(route);
    var masterderive = master.derive( route );
    
         tmpthis.params = [];
       
        
        tmpthis.params["pubkey"] = masterderive.publicKey;
       
         tmpthis.params["destination"] =  tmpthis.dataService.maincontroller.currentSendAddress;
        
        var privkey = bitcore.PrivateKey(masterderive.privateKey);
        
         tmpthis.params["address"] = privkey.toAddress().toString();
         tmpthis.params.callback = function(signed_tx){
                
   
 
       tmpthis.broadcastTx(signed_tx,tmpthis);
              

            
        };
         tmpthis.params.onError = function(error){
            console.log("error "+error);
            tmpthis.sending = false;
            
        };
         tmpthis.params.fail = function(error){
            console.log("fail "+error);
            tmpthis.sending = false;
            
        };
         try {
            
            var result = bitcore.signrawtransaction(tmpthis.currentSendResponse.unsigned_tx, privkey, tmpthis.params,tmpthis.httpService.apiKey);
          

        }  catch(err) {
            tmpthis.sending = false;
           console.log("error"+err);
        }





  }
  broadcastTx(hex,currentOwner){
     
     

 
     currentOwner.indiesquare.broadcast({"tx": hex}, function(data, error){
           currentOwner.dataService.maincontroller.closeQR();
    if( error ){
       
      currentOwner.sending = false;
       currentOwner.dataService.maincontroller.showMessage(error);
        alert("error broadcasting");
        currentOwner.ref.detectChanges();

        return;
    }

  
 currentOwner.sending = false;
 
   currentOwner.dataService.maincontroller.showMessage("sent!");
     
  currentOwner.closeSend();
  currentOwner.dataService.maincontroller.reloadBalances();
currentOwner.ref.detectChanges();
 

}); 
 
     
 
  }

  cancelSend(currentOwner:any){
 
    currentOwner.sending = false;

  }
  getScanImage(){
    return {

        "text-align": "center",
     "cursor":" pointer",
    "position": "absolute",
    "top": "12px",
 "left":" 5px",
 "width":"32px",
 "height":"32px",
    "background":"url("+ this.dataService.getImage('qrcodeSend')+") no-repeat 0 0",
"background-size": "100% 100%",
 "border":"none",


    }
  }
  scan(){

    if(document.location.href.indexOf("https") == -1){
    alert("please reload with https to use camera");

  }
      this.dataService.maincontroller.showQRScan = true;
    
  
}
        
     onBlurMethod(){
      
         
     }

     onFocusMethod(){

         
     }

  send(){

     if(this.divisible == -1){
      alert("Error loading, please try again");
      return;
    }
    
    if(parseFloat(this.amount) < 0 || parseFloat(this.amount) > this.dataService.maincontroller.currentBalance){
      if( parseFloat(this.amount) > this.dataService.maincontroller.currentBalance){
 this.dataService.maincontroller.showMessage(this.dataService.getLang("dont_have_enough",this.dataService.maincontroller.selectedKey));

      }else{
      this.dataService.maincontroller.showMessage(this.dataService.getLang("enter_valid_amount"));
    }
      return;
    }

    if( bitcore.Address.isValid(this.dataService.maincontroller.currentSendAddress, 'livenet') == false){
           this.dataService.maincontroller.showMessage(this.dataService.getLang("enter_valid_address"));
        return;

    }



           
var tmpThis = this
 
  this.sending = true;

   var tmpthis = this;

   var fee = -1;
   var feePerKb = -1;
 
 var sendParams = {"source": this.dataService.maincontroller.currentAddress, "token": this.dataService.maincontroller.selectedKey, "destination":this.dataService.maincontroller.currentSendAddress, "quantity": this.amount};
if(this.dataService.maincontroller.feeIsCustom(this.dataService.maincontroller.currentFee)){
 

 // sendParams["fee"] = Math.floor(parseFloat(this.dataService.maincontroller.customFee) * 100000000);
 sendParams["feePerKb"] =  parseFloat(this.dataService.maincontroller.customFee) / 1000;

}else{
  sendParams["feePerKb"] =this.dataService.maincontroller.fees[this.dataService.maincontroller.currentFee];

  
}
 console.log(JSON.stringify(sendParams));

 try{
tmpthis.indiesquare.createSend(sendParams, function(data, error){
    if( error ){
console.error("send error " + error);
             tmpthis.dataService.maincontroller.showMessage(JSON.stringify(error));
        
         tmpthis.sending = false;
        return;
    }

    if(data != null){

    tmpthis.currentSendResponse = data;
 // console.dir('unsigned_tx:' + tmpthis.currentSendResponse.unsigned_tx);

      var isDivisble= false;
     if(tmpthis.divisible == 1){
       isDivisble = true;
     }
    tmpthis.currentSendResponse.unsigned_tx = tmpthis.dataService.rbf_tools.setRBF(tmpthis.currentSendResponse.unsigned_tx);
   
    if(tmpthis.dataService.maincontroller.selectedKey != "BTC"){
      var check = tmpthis.dataService.cp_tools.checkSendTransaction( tmpthis.currentSendResponse.unsigned_tx,tmpthis.dataService.maincontroller.currentAddress,tmpthis.dataService.maincontroller.currentSendAddress,tmpthis.dataService.maincontroller.selectedKey,parseFloat(tmpthis.amount), isDivisble );
      if(check  == false){
          alert("transaction does not match parameters");
          return;
      }
    }  
    console.dir('unsigned_tx:' + tmpthis.currentSendResponse.unsigned_tx);
   

var feeBTC = data.fee / 100000000;

      
   if(tmpthis.dataService.maincontroller.linkType == "indiesquare"){
     
     tmpthis.indiesquare.signTransaction({'unsigned_tx': tmpthis.currentSendResponse.unsigned_tx}, function(url, urlScheme, error){
  
    if( error ){

      console.error(error);
             tmpthis.dataService.maincontroller.showMessage(error);
        tmpthis.sending = false;
        
       
        return;
    } 

    if(tmpthis.dataService.isMobile == false){
      tmpthis.dataService.maincontroller.showQR(url);
      console.log("url is "+url);

    }
   
   
}, function(result, error){
 
  if(error){
    console.error(error); 
             tmpthis.dataService.maincontroller.showMessage(error);
    tmpthis.sending = false;
      tmpthis.dataService.maincontroller.closeQR();
 return;
  }else{
     
 
  tmpthis.broadcastTx(result.signed_tx,tmpthis);

    

    

   }
   

});








      }else if(tmpthis.dataService.maincontroller.linkType == "BoO"){

         tmpthis.sending = false;
         tmpthis.dataService.maincontroller.showConf(tmpthis.dataService.getLang('you_are_sending',tmpthis.amount,tmpthis.dataService.maincontroller.selectedKey,tmpthis.dataService.maincontroller.currentSendAddress,feeBTC+"")+" "+tmpthis.dataService.maincontroller.getFiatForToken('BTC',feeBTC),tmpthis.signBoO ,tmpthis.cancelSend,tmpthis );
 
       


      }else{
        tmpthis.sending = false;
         tmpthis.dataService.maincontroller.showConf(tmpthis.dataService.getLang('you_are_sending',tmpthis.amount,tmpthis.dataService.maincontroller.selectedKey,tmpthis.dataService.maincontroller.currentSendAddress,feeBTC+"")+" "+tmpthis.dataService.maincontroller.getFiatForToken('BTC',feeBTC),tmpthis.getPassphrase ,tmpthis.cancelSend,tmpthis );
 
      } 
  

}

});
}
catch(e){
  console.log("unknown error");
   tmpthis.dataService.maincontroller.showMessage(tmpthis.dataService.getLang('error'));
             tmpthis.sending = false;
}
　
  }

}
