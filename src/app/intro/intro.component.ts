import { Component, OnInit } from '@angular/core';

import { ActivatedRoute }     from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';
  declare var Mnemonic:any; 
   declare var bitcore:any; 
    declare var IndieSquare:any; 
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
  
})
export class IntroComponent implements OnInit {
  showIntroButtons = true;
  showPasswordDecryptField =false;
   showPassphraseField = false;
    showPasswordField = false;
     shorturl = "";
      passphraseStatus = "";
       showNewPassphrase = false;
       decryptStatus = "";
     passphrase = "";
     password = "";
     cipherText = "";
     userAgent = "";
     testObj:any;
     
 constructor(public dataService:DataService, private route: ActivatedRoute) { 
    route.queryParams.subscribe(
      data =>  this.loadShortUrl(data['pass']));

   

}

  getMessage(){

    let isMobile = /Android|iPhone/i.test(window.navigator.userAgent)
    if(isMobile){
      return "Enter a password and save the next page to your home screen, this will let you login without entering your recovery phrase";
    }else{
      return "Enter a password and save the next page to your bookmarks, this will let you login without entering your recovery phrase";
   
    }

  }
  ngOnInit() {
 
    //}

 alert("test");


 // http://localhost:4200/?pass=U2FsdGVkX19I3BKnbJ912%2FigiTTn%2FynHJwPa4obo7Do2i4roBIqAyKOt0bwD8m2rNRAEFvOFvAR7W59dHIpEC979hUStgpLxWEnriuukKmIsyXcsGJxBLISrV8PupDFF

  }

 backToStart(){
   this.passphrase = "";
 this.showNewPassphrase = false;
   this.showIntroButtons = true;
this.showPassphraseField = false;
  }
createNewAccount(){

   this.testObj = [];
 this.testObj.userAgent = "";
    this.shorturl = window.location.href+"?pass=";

    this.testObj["userAgent"]  = "User-agent header sent: " + navigator.userAgent;
   var obj = this.testObj;
 
   // if(this.userAgent.indexOf("IndieSquare") == -1){

      var indiesquare = new IndieSquare({
    'apikey': 'your-api-key', // See https://developer.indiesquare.me/#api-key
    // 'use-server': true,
    // 'port': 8080
  });
     alert("test");
 
      indiesquare.getAddress('Test', function(url, urlScheme, error){
    if( error ){
        console.log("error"+error);
         obj.userAgent  = "error";
        return;
    }else{
      console.log("went here"+url);
    }
    /*
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 128, height: 128,
        correctLevel : QRCode.CorrectLevel.L
    });*/
   obj.userAgent   = url;
}, function(result, error){
 obj.userAgent  = "res";
  if(error){
 obj.userAgent  = error;
  }else{
     obj.userAgent  = result.address;

   }
   alert(JSON.stringify(result));

});

  return;
  this.showNewPassphrase = true;
   this.showIntroButtons = false;

 var words = null;
	
      
			var m = new Mnemonic(words);
      this.passphrase =  m.toWords().toString().replace(/,/gi, ' ');
  
      this.createAddressFromPassphrase(m);
     

}

createAddressFromPassphrase(m:any){
   var basePath = 'm/0\'/0/';
    	var seed = m.toHex();
        	var master = bitcore.HDPrivateKey.fromSeed(seed);
		 	var d = basePath + '0';
	  	var masterderive = master.derive( d );
 	var priv = bitcore.PrivateKey(masterderive.privateKey);
	 this.dataService.maincontroller.currentAddress = priv.toAddress().toString();

      
}
continueLogin(){
this.dataService.maincontroller.showBottomBar = true;
    this.dataService.maincontroller.showCollection = true;
          this.dataService.maincontroller.showTopBar = true;
          this.dataService.maincontroller.showIntro = false;
          this.dataService.maincontroller.loadEnvironments();

}
  enterPassphrase(){
    this.showIntroButtons =false;
    this.showPassphraseField = true;
  }
    loadShortUrl(encData:string){
      this.cipherText = encData;
  
       if(typeof this.cipherText !=  "undefined"){

         this.showPasswordDecryptField =true;
          this.showIntroButtons =false;
    this.showPassphraseField = false;
       
      }


      // this.password = "password";
    // this.decryptPassphrase();


    }

    decryptPassphrase(){
     this.decryptStatus = "";
       console.log("password is"+this.cipherText);
	try{
          var bytes  = CryptoJS.AES.decrypt(this.cipherText, this.password);
         this.passphrase = bytes.toString(CryptoJS.enc.Utf8);


  var words = null;
		if( this.passphrase != null ) words = this.passphrase.split(' ');
    	var m;
		try{
      
			m = new Mnemonic(words);

   this.createAddressFromPassphrase(m);
      this.continueLogin();

		}
		catch(e){ 
      
      this.decryptStatus = "password or link incorrect";
    
   }

   	}
		catch(e){ 
      
      this.decryptStatus = "password or link incorrect";
    
   }
    }
   checkPassphrase(){
       this.showNewPassphrase = false;

     this.passphraseStatus = ""; 
     var words = null;
		if( this.passphrase != null ) words = this.passphrase.split(' ');
		var m;


		try{
			m = new Mnemonic(words);

      this.createAddressFromPassphrase(m);
    this.showIntroButtons =false;
    this.showPassphraseField = false;
     this.showPasswordField = true;
       this.passphraseStatus = "";
  //   	return m.toWords().toString().replace(/,/gi, ' ');

		}
		catch(e){ 
      
      this.passphraseStatus = e;
    
   }
		
	
  }
  updateShortUrl(){
  // this.shorturl+=this.password;

  // var CryptoJS = require("crypto-js");
 
// Encrypt 

 
var ciphertext =  CryptoJS.AES.encrypt(this.passphrase, this.password);
 
// Decrypt 
//var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
//var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
this.shorturl = window.location.href+"?pass="+ciphertext;
  }

  setShortUrl(){
    if(this.password.length > 3){
    // this.copyToClipboard(this.shorturl);
    window.location.href = this.shorturl;
    }
    else{
      
    }
  }
  copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
  

}
