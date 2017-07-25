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
    public basePath = 'm/0\'/0/';
  public account = null;
  ngOnInit() {
  	this.amount = "1";
    this.sendAddress = "18sqV3e7eoyPiHJM5RqPtiXS1xiCNEDGkt";
    this.status = "";
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

  send(){
var tmpThis = this
   // if(this.dataService.maincontroller.currentAddress)
  
 this.httpService.createSendTransaction(this.dataService.maincontroller.currentAddress,this.sendAddress,this.dataService.maincontroller.selectedKey,this.amount,-1,10000).subscribe(
     data => { 
      console.log(JSON.stringify(data));

        if(data.unsigned_tx != null){
 
      if(this.dataService.maincontroller.linkType == "indiesquare"){


            var indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
     
       indiesquare.signTransaction({'unsigned_tx': data.unsigned_tx}, function(url, urlScheme, error){
  
    if( error ){
        console.log("error"+error);
       
        return;
    }else{
      console.log("went here"+url);
    }
   
   
}, function(result, error){
 
  if(error){
    console.error(error);
 return;
  }else{
     
console.log(result.signed_tx);
tmpThis.status = result.signed_tx;

   }
   

});








      }else{

    try {
        var seed = new Mnemonic(this.dataService.maincontroller.recoveryPhrase).toHex();
    }
    catch(err) {
       
        
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
            
        };
          this.params.onError = function(error){
            console.log("error "+error);
            
        };
          this.params.fail = function(error){
            console.log("fail "+error);
            
        };
         try {
            
            var result = bitcore.signrawtransaction(data.unsigned_tx, privkey, this.params,this.httpService.apiKey);
           



        }  catch(err) {
            
           console.log("error"+err);
        }

      } 
      }
      },   
      error => {
       
 
 
      },
     () => {});


  }

}
