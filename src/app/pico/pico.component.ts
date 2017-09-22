import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { ActivatedRoute }     from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';

import * as crypto  from 'crypto-browserify'; 
import * as eccrypto  from 'eccrypto';  

declare var bitcore:any; 
declare var CWPrivateKey:any; 
declare var CWBitcore:any;
 declare var IndieSquare:any; 
@Component({
  selector: 'app-pico',
  templateUrl: './pico.component.html',
  styleUrls: ['./pico.component.css']
})
export class PicoComponent implements OnInit {

 
wif = "cRJLdJyKLU6564Fga4BsDrypnRFMGPXCcbLv13y8RnvPudDxTHQM";
pubkey = "";
state = "None";
asset = "XCP";
spendSecret = "";
spendSecretHash = "";
handle = "";
channel_terms = "";
hub_pubkey = "";
c2h_spend_secret_hash = "";
c2h_deposit_expire_time = 1024;
c2h_deposit_quantity = 1000000;
c2h_state;
h2c_state;
unsigned_c2h_deposit_rawtx　= "";
h2c_spend_secret_hash = "";
secrets = [];
next_revoke_hash = "";
c2h_next_revoke_secret_hash = "";
h2c_deposit_script = "";
signed_c2h_deposit_rawtx = "";
c2h_commit_delay_time = 2;
indiesquare;

raw_tx_history=[];
 payments_sent = [];
 payments_received = [];
 payments_queued = [];
constructor(public dataService:DataService, private httpService:HTTPService, private route: ActivatedRoute) {  }

  ngOnInit() {

  	this.indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });

 		/*console.log("pub key "+this.pubkey);

 		var spendSecret = CryptoJS.lib.WordArray.random(32);

 		console.log("spend secret "+spendSecret );

 		var secretHash = CryptoJS.RIPEMD160(spendSecret);

 		console.log("secret hash "+secretHash );*/

 		
 	 	//this.connectToHub();


 	
 
        
       /* cwk.signRawTransaction(unsig, function(err, signedHex) {
          console.log("err: "+err);
 console.log("signedHex: "+signedHex);
        }); 
	*/

   this.hubStatus();	 
  }

  connectToHub(){
this.next_revoke_hash = this.createInitalSecrets().toString();
this.pubkey =  bitcore.PrivateKey(this.wif).toPublicKey();
    
  
 
 var params = { 
	 "asset":this.asset,
    "pubkey": this.pubkey.toString(),
    "spend_secret_hash":  this.h2c_spend_secret_hash,
    "hub_rpc_url":"http://www.none.com",  	
}
var tmpthis = this;
  
 
var str = JSON.stringify(params);
// Always hash you message to sign! 
var msg = crypto.createHash("sha256").update(str).digest();
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
var str = bitcore.PrivateKey(this.wif).toObject()["bn"] as string;
 var pkey = hexToBytes(str);
 
var publicKey = eccrypto.getPublic(pkey);

 
 function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

eccrypto.sign(pkey, msg).then(function(sig) {
	var hexSig =  toHexString(sig);
  
  params["signature"] = hexSig;


  tmpthis.httpService.requestConnection(params).subscribe(
     data => { 
	     console.log("requestConnection: "+JSON.stringify(data));
 
	     tmpthis.handle = data.result.handle;
		 tmpthis.channel_terms =data.result.channel_terms;
		 tmpthis.hub_pubkey = data.result.pubkey;
		 tmpthis.c2h_spend_secret_hash = data.result.spend_secret_hash;

		 tmpthis.makeDeposit();
		 //todo verify terms

      },   
      error => {
       
console.log("error "+JSON.stringify(error));
 
      },
     () => {});


   
});

}


 genSecret(){
 	
 	 var secret_value = CryptoJS.lib.WordArray.random(32);
	 var secret_hash = CryptoJS.RIPEMD160(secret_value);
	 this.secrets[secret_hash] = secret_value;
	 return secret_hash;

 }
   
   createInitalSecrets(){


        this.secrets = [];
        this.h2c_spend_secret_hash = this.genSecret().toString();
        return this.genSecret();
   }     

 makeDeposit(){ 
  var tmpthis = this;
this.httpService.makeDeposit(this.asset,this.pubkey.toString(),this.hub_pubkey,this.c2h_spend_secret_hash,this.c2h_deposit_expire_time,this.c2h_deposit_quantity).subscribe(
     data => { 
	     console.log("makeDeposit: "+JSON.stringify(data));
 
 			tmpthis.c2h_state = data.result.state;
         tmpthis.unsigned_c2h_deposit_rawtx = data.result.topublish;
	   
         	//console.log(tmpthis.c2h_state);
         	//	console.log( tmpthis.unsigned_c2h_deposit_rawtx);
          tmpthis.exchangeDepositScripts();
	 
		 //todo verify terms

      },   
      error => {
       
console.log("error "+JSON.stringify(error));
 
      },
     () => {});

}
 
exchangeDepositScripts(){


 
  var tmpthis = this;

var params = {
              pubkey:this.pubkey.toString(),
             handle:this.handle.toString(),
             asset:this.asset, 
             deposit_script:this.c2h_state.deposit_script,
             next_revoke_secret_hash:this.next_revoke_hash
           }
 
var str = JSON.stringify(params);
// Always hash you message to sign! 
var msg = crypto.createHash("sha256").update(str).digest();
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
var str = bitcore.PrivateKey(this.wif).toObject()["bn"] as string;
 var pkey = hexToBytes(str);
 
var publicKey = eccrypto.getPublic(pkey);

 
 function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

eccrypto.sign(pkey, msg).then(function(sig) {
	var hexSig =  toHexString(sig);
  
  params["signature"] = hexSig;

tmpthis.httpService.deposit(params).subscribe(
     data => { 
	     console.log("exchangeDepositScripts: "+JSON.stringify(data));
 			
	     	 tmpthis.h2c_deposit_script = data.result.deposit_script;

        tmpthis.c2h_next_revoke_secret_hash = data.result.next_revoke_secret_hash;



	 
       console.log(tmpthis.unsigned_c2h_deposit_rawtx);
       
        


 var cwk = new CWPrivateKey(tmpthis.wif);
 
  
     cwk.signRawTransaction(tmpthis.unsigned_c2h_deposit_rawtx, function(err, signedHex) {
       console.log("err: "+err);
 console.log("signedHex: "+signedHex);


tmpthis.indiesquare.broadcast({"tx": signedHex}, function(data, error){
    if( error ){
        console.error(error);
        return;
    }



    tmpthis._history_add_published_c2h_deposit(signedHex,"publish_c2h_deposit_tx");
 	tmpthis._set_initial_h2c_state(tmpthis.h2c_deposit_script);
     tmpthis._add_to_commits_requested(tmpthis.next_revoke_hash);
     tmpthis.payments_sent = [];
        tmpthis.payments_received = [];
        tmpthis.payments_queued = [];

    console.dir('txid:' + data.txid);
});
/*
tmpthis.httpService.sendRawTx(signedHex).subscribe(
     data => { 
	     console.log("txid: "+JSON.stringify(data));





      },   
      error => {

       
console.log("error "+JSON.stringify(error));
 
      },
     () => {});
*/
 /*	tmpthis.indiesquare.broadcast({"tx":signedHex}, function(data, error){
    if( error ){
        console.error(error);
        return;
    }




    this._history_add_published_c2h_deposit(signedHex,"publish_c2h_deposit_tx");
 	this._set_initial_h2c_state()
      this._add_to_commits_requested(this.next_revoke_hash);
       this.payments_sent = [];
          this.payments_received = [];
          this.payments_queued = [];

    console.dir('txid:' + data.txid);
});*/

 	


    });

/*
          c2h_deposit_txid = self.publish(signed_c2h_deposit_rawtx)
        self._history_add_published_c2h_deposit(signed_c2h_deposit_rawtx)
        self._set_initial_h2c_state(h2c_deposit_script)
        self._add_to_commits_requested(next_revoke_hash)
        self.payments_sent = []
        self.payments_received = []
        self.payments_queued = []
        self.c2h_commit_delay_time = delay_time
        return c2h_deposit_txid


*/

     //  tmpthis.signed_c2h_deposit_rawtx = tx.sign(pkey);

 			 
 			// console.log(tmpthis.signed_c2h_deposit_rawtx);

		 //todo verify terms

      },   
      error => {
       
console.log("error "+JSON.stringify(error));
 
      },
     () => {});
  		 

    
});

}
_history_add_published_c2h_deposit(signedHex:string,type:string){

var obj = [];
obj["hex"] = signedHex;
obj["type"]= type;
obj["handle"] = this.handle;
	//todo this needs to be object with balances more info

this.raw_tx_history.push(obj);

  console.log(JSON.stringify(this.raw_tx_history));

}
_add_to_commits_requested(secret_hash:string){
	 this.h2c_state["commits_requested"].push(secret_hash);
	 console.log(JSON.stringify(this.h2c_state));
}
_set_initial_h2c_state(h2c_deposit_script:string){
        this.h2c_state = {
            "asset": this.asset,
            "deposit_script": h2c_deposit_script,
            "commits_requested": [],
            "commits_active": [],
            "commits_revoked": [],
        }

    }

/*
    def queuepayment(source, destination, quantity, token=None):
    """ Queue micropayment channel send (sent on sync).
    Args:
        source (str): Handle of connection to send funds from.
        destination (str): Handle of connection to receive funds.
        quantity (int): Quantity of channel asset to transfer.
        token (str, default=None): Optional token payee will
                                   receive with the payment.
    Returns:
        Provided token or generated token if None given.
    """
    hub_api = _hub_api()
    data = _load_data()
    client = Mph.deserialize(hub_api, data["connections"][source])
    # TODO check dest can receive payment
    result = client.micro_send(destination, quantity, token=token)
    data["connections"][source] = client.serialize()
    _save_data(data)
    return result

    */

    queuepayment(source:string,destination:string,quantity:number,token:string){
       
           if(token == null){

                var token_value = CryptoJS.lib.WordArray.random(32);
            token = CryptoJS.RIPEMD160(token_value);

             
           }
           
       this.payments_queued.push({
            "payee_handle": destination,
            "amount": quantity,
            "token": token
        })
       this._history_add_micro_send(destination, quantity, token)




    }
   _history_add_micro_send(destination:string,quantity:number,token:string){

     var obj = {
            handle:this.handle,
            action:"queue_micropayment",
            id:token,
            fee:"0"+this.asset,
            quantity:quantity+""+this.asset,
            destination:destination
          }

          return token;
   }
 hubStatus(){

 		this.httpService.hubStatus().subscribe(
     data => { 
	     console.log("hubStatus: "+JSON.stringify(data));

      },   
      error => {

       
console.log("error "+JSON.stringify(error));
 
      },
     () => {});

}
 
}
   
 
