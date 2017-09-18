import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { ActivatedRoute }     from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';

import * as crypto  from 'crypto-browserify'; 
import * as eccrypto  from 'eccrypto';  

declare var bitcore:any; 
declare var Message:any; 
@Component({
  selector: 'app-pico',
  templateUrl: './pico.component.html',
  styleUrls: ['./pico.component.css']
})
export class PicoComponent implements OnInit {
 
wif = "cQDSZQdKiAcMNdMZu1fPSmGsjxpqcW53BNd9mRt2UJxchYAHN6iR";
pubkey = "";
state = "None";

handle = "";
channel_terms = "";
hub_pubkey = "";
c2h_spend_secret_hash = "";


constructor(public dataService:DataService, private httpService:HTTPService, private route: ActivatedRoute) {  }

  ngOnInit() {

  	

 		/*console.log("pub key "+this.pubkey);

 		var spendSecret = CryptoJS.lib.WordArray.random(32);

 		console.log("spend secret "+spendSecret );

 		var secretHash = CryptoJS.RIPEMD160(spendSecret);

 		console.log("secret hash "+secretHash );*/
 	 //	this.connectToHub();
 	
 	 this.hubStatus();	 
  }

  connectToHub(){

this.pubkey =  bitcore.PrivateKey(this.wif).toPublicKey();
   
  	 var spendSecret = CryptoJS.lib.WordArray.random(32);
	var spendSecretHash = CryptoJS.RIPEMD160(spendSecret);
 console.log("spendsecrethash:"+spendSecretHash);
  console.log("pubkey:"+this.pubkey);

 console.log("pubkey:"+JSON.stringify(bitcore.PrivateKey(this.wif).toObject()));
 
// A new random 32-byte private key. 
var privateKey = crypto.randomBytes(32);
// Corresponding uncompressed (65-byte) public key. 
var publicKey = eccrypto.getPublic(privateKey);
 
var str = "message to sign";
// Always hash you message to sign! 
var msg = crypto.createHash("sha256").update(str).digest();
function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
var str = "4e933db881a84455b11fa8f9b3628393f727cb360aa7d22f2818cc696fa297d5";
 var pkey = hexToBytes(str);

     var publicKey = hexToBytes("0446A6820EF8A8CF38818968F9C6AC45564ABF54957FDCDF8D53D47C866ADAD170458C252D2EE3740F69AF2386A513772285252B516458C57B258AD983FCD1E746");
 
 function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

eccrypto.sign(pkey, msg).then(function(sig) {
  console.log("Signature in DER format:", toHexString(sig));
  eccrypto.verify(publicKey, msg, sig).then(function() {
    console.log("Signature is OK");
  }).catch(function() {
    console.log("Signature is BAD");
  });
});

/*
var message =   Message('This is an example of a signed message.');

var signature = message.sign(bitcore.PrivateKey(this.wif));

console.log("huh"+signature);*/
//console.log("huh"+bitcore.lib.Crypto.ECDSA.sign("DFsdfds"));

  //		console.log("huh"+bitcore.crypto.ECDSA.sign("DFsdfds"));
	//this.requestConnection(spendSecretHash );

  }


 

 requestConnection(spendSecretHash:string){

 		this.httpService.requestConnection(null,"XCP",spendSecretHash).subscribe(
     data => { 
	     console.log("success "+JSON.stringify(data));

      },   
      error => {
       
console.log("error "+JSON.stringify(error));
 
      },
     () => {});

}

 hubStatus(){

 		this.httpService.hubStatus().subscribe(
     data => { 
	     console.log("success "+JSON.stringify(data));

      },   
      error => {
       
console.log("error "+JSON.stringify(error));
 
      },
     () => {});

}
 
}
   
 
