import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { ActivatedRoute }     from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';
  declare var Mnemonic:any; 
   declare var bitcore:any; 
    declare var IndieSquare:any; 
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
   providers:[HTTPService],
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
     isIndiesquare = false;
     
 constructor(public dataService:DataService, private httpService:HTTPService, private route: ActivatedRoute) { 
    route.queryParams.subscribe(
      data =>  this.loadShortUrl(data['pass']));

   

}

  getMessage(){

    
    if(this.dataService.isMobile){
      return "Enter a password and save the next page to your home screen, this will let you login without entering your recovery phrase";
    }else{
      return "Enter a password and save the next page to your bookmarks, this will let you login without entering your recovery phrase";
   
    }

  }
  ngOnInit() {
    this.dataService.isMobile = /Android|iPhone/i.test(window.navigator.userAgent)
  
    this.isIndiesquare = false; 
    this.shorturl = window.location.href+"?pass=";
   this.testObj = [];
    // this.linkIndiesquare();

 
      var indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
    indiesquare.signTransaction({'unsigned_tx': '0100000001425fc12873a1a09c744ce7e782e95acc5cb69611d9f9b69550a45576383338f7020000001976a914edee861dff4de166683e4c54ae3869cd05c7ae0f88acffffffff0336150000000000001976a9141485d9d03b41aaa9dca7d70d7f63ff4a0826100e88ac00000000000000001e6a1cacd10644550a44ead1ce07effa7abcdd01911e197349b796338f1fe0b0561400000000001976a914edee861dff4de166683e4c54ae3869cd05c7ae0f88ac00000000'}, function(url, urlScheme, error){
    if( error ){
        console.error(error);
        return;
    }
   alert(urlScheme);
    alert(url);
  
}, function(data, error){
    if( error ){
        console.error(error);
        return;
    }
    alert("sig"+data.signed_tx);
});

  }

  linkIndiesquare(){
   
// this.testObj.userAgent = "loading...";
    
this.testObj["userAgent"]  =  navigator.userAgent;
   
  
 
     if(this.testObj["userAgent"].indexOf("IndieSquare") != -1){
var tempDataService = this.dataService;
    var tempThis = this;
 
this.isIndiesquare = true;
      var indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
     
      indiesquare.getAddress('Test', function(url, urlScheme, error){
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
     

   tempDataService.maincontroller.currentAddress =result.address;
   tempDataService.maincontroller.linkType = "indiesquare";
   tempThis.continueLogin();

   }
   

});
  }else if(this.testObj["userAgent"].indexOf("phrase:") != -1){
//this.testObj.userAgent = "here";
    var userAgent = this.testObj["userAgent"].replace("phrase:","");

this.passphrase = userAgent;
    var words = null;
    if( this.passphrase != null ) words = this.passphrase.split(' ');

     this.dataService.maincontroller.recoveryPhrase = words;
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
}

 backToStart(){
   this.passphrase = "";
 this.showNewPassphrase = false;
   this.showIntroButtons = true;
this.showPassphraseField = false;
  }
createNewAccount(){

  
 
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

          this.dataService.maincontroller.showTopBar = true;
this.dataService.maincontroller.showBottomBar = true;
    this.dataService.maincontroller.showCollection = true;
          this.dataService.maincontroller.showIntro = false;
var tmpdata =  this.dataService;
          setTimeout(function() {
         tmpdata.maincontroller.loadEnvironments();
        },500);

}
  enterPassphrase(){
    this.showIntroButtons =false;
    this.showPassphraseField = true;
  }
    loadShortUrl(encData:string){
      this.cipherText = encData;
  
       if(typeof this.cipherText !=  "undefined"){

           if(this.cipherText == "view"){
               this.continueNoAddress();
           }
           else{
         this.showPasswordDecryptField =true;
          this.showIntroButtons =false;
    this.showPassphraseField = false;
  }
       
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

     this.dataService.maincontroller.recoveryPhrase = words;
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

    continueNoAddress(){


      this.dataService.maincontroller.currentAddress = "empty";
   this.continueLogin();
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
