import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
import {ActivatedRoute} from '@angular/router';

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

  constructor(public dataService:DataService,private httpService:HTTPService,private route:ActivatedRoute) { }
  public amount:string;
  public currentORB:string;
  public sendAddress:string;
  public status:string;
public params:any;
public currentSendResponse:any;
public sending:boolean;
    public basePath = 'm/0\'/0/';
  public account = null;
  public indiesquare:any;
  

  ngOnInit() {
  	this.amount = "";
    this.sendAddress = "";
    this.status = "";
    this.sending = false;

    this.indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
    });



  }

  closeSend(){
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
  		this.amount = this.amount+num;
  	}
  	
  }

  


  broadcast(currentOwner:any){
currentOwner.sending = true;

    var tmpthis = currentOwner;

    try {
        var seed = new Mnemonic(tmpthis.dataService.maincontroller.recoveryPhrase).toHex();
    }
    catch(err) {
       
         tmpthis.sending = false;
         throw  err;
    }
  
    
    var master = bitcore.HDPrivateKey.fromSeed(seed);
    
    var route = tmpthis.basePath + tmpthis.dataService.maincontroller.currentIndex;
    
    var masterderive = master.derive( route );
    
     
     

         tmpthis.params = [];
       
        
        tmpthis.params["pubkey"] = masterderive.publicKey;
       
         tmpthis.params["destination"] = tmpthis.sendAddress;
        
        var privkey = bitcore.PrivateKey(masterderive.privateKey);
        
         tmpthis.params["address"] = privkey.toAddress().toString();
         tmpthis.params.callback = function(signed_tx){
                
             
                       tmpthis.indiesquare.broadcast({"tx": signed_tx}, function(data, error){
    if( error ){
       tmpthis.sending = false;
        console.error(error);
        return;
    }
     tmpthis.sending = false;
    tmpthis.dataService.maincontroller.showMessage("sent!");
    tmpthis.closeSend();
});
              

            
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
  cancelSend(currentOwner:any){

    currentOwner.sending = false;

  }

  scan(){

    if(document.location.href.indexOf("https") == -1){
    alert("please reload with https to use camera");

  }
      this.dataService.maincontroller.showQRScan = true;
    // this.dataService.maincontroller.showAccount = false; 
     /*
    var thi = this;
 
  this.indiesquare.getQRcode('ServiceNameHere', function(url, urlScheme, error){
    if( error ){
       thi.sendAddress = "err1"+JSON.stringify(error);
      console.error(error);
      return;
    }
    
  }, function(result, error){
    if( error ){
      thi.sendAddress = "err2"+JSON.stringify(error);
      return;
    }
    console.dir(result); // {data: "READ-STRINGS"}
    thi.sendAddress = JSON.stringify(result);
  });*/
  
}
        
     onBlurMethod(){
       document.body.style.position = "fixed";
         
     }

     onFocusMethod(){
document.body.style.position = "none";
         
     }

  send(){
    
    if(parseFloat(this.amount) < 0 || parseFloat(this.amount) > this.dataService.maincontroller.currentBalance){
      if( parseFloat(this.amount) > this.dataService.maincontroller.currentBalance){
 this.dataService.maincontroller.showMessage("you don't have enough "+this.dataService.maincontroller.selectedKey);

      }else{
      this.dataService.maincontroller.showMessage("please enter a valid amount");
    }
      return;
    }

    if( bitcore.Address.isValid(this.dataService.maincontroller.currentSendAddress, 'livenet') == false){
           this.dataService.maincontroller.showMessage("please enter a valid address");
        return;

    }



           
var tmpThis = this
   // if(this.dataService.maincontroller.currentAddress)
  this.sending = true;

   var tmpthis = this;

   var fee = -1;
   var feePerKb = -1;
 
if(this.dataService.maincontroller.feeIsCustom(this.dataService.maincontroller.currentFee)){

  fee =  Math.floor(parseFloat(this.dataService.maincontroller.customFee) * 100000000);
  feePerKb = -1;

}else{
  fee = -1;
  feePerKb = this.dataService.maincontroller.fees[this.dataService.maincontroller.currentFee];
}

console.log("fee "+fee);
console.log("feeperkb "+feePerKb);

 this.httpService.createSendTransaction(this.dataService.maincontroller.currentAddress,this.dataService.maincontroller.currentSendAddress,this.dataService.maincontroller.selectedKey,this.amount,feePerKb,fee).subscribe(
     data => { 
      console.log(JSON.stringify(data));
        tmpthis.currentSendResponse = data;
      var feeBTC = (tmpthis.currentSendResponse.fee / 100000000);
        if(data.unsigned_tx != null){
 
      if(this.dataService.maincontroller.linkType == "indiesquare"){


     
     tmpthis.indiesquare.signTransaction({'unsigned_tx': tmpthis.currentSendResponse.unsigned_tx}, function(url, urlScheme, error){
  
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

  
     tmpthis.indiesquare.broadcast({"tx": result.signed_tx}, function(data, error){
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

         tmpthis.dataService.maincontroller.showConf("You are sending\n\n"+tmpthis.amount+ " " +tmpthis.dataService.maincontroller.selectedKey+" to "+tmpthis.sendAddress+"\n\nfee: "+feeBTC+" btc",tmpthis.broadcast ,tmpthis.cancelSend,tmpthis );


    

      } 
      }
      },   
      error => {
        tmpthis.sending = false;
         tmpthis.dataService.maincontroller.showMessage( JSON.parse(error._body).message);
         //["message"]
 
      },
     () => {});


  }

}
