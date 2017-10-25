import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { ActivatedRoute }     from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';
import { PersistenceService, StorageType } from 'angular-persistence';
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
     
 constructor(public dataService:DataService, private httpService:HTTPService, private route: ActivatedRoute,private persistenceService: PersistenceService) { 
    route.queryParams.subscribe(
      data =>  this.loadShortUrl(data['pass']));

   

}
linkIndieSquare(){

 
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
      if(tempThis.dataService.isMobile == false){
        //show qrcode here;
      }
    }


   
   
}, function(result, error){
 
  if(error){
    console.error(error);
 return;
  }else{
      

   tempThis.persistenceService.set('userAddress0', result.address, {type: StorageType.LOCAL}); 
   tempThis.persistenceService.set('linkType', "indiesquare", {type: StorageType.LOCAL}); 

   tempThis.dataService.maincontroller.currentAddress =result.address;
   tempThis.dataService.maincontroller.linkType = "indiesquare";
   tempThis.continueLogin();

   }
   

});





}
  getMessage(){

    
    if(this.dataService.isMobile){
      return "Enter a password and save the next page to your home screen, this will let you login without entering your recovery phrase";
    }else{
      return "Enter a password and save the next page to your bookmarks, this will let you login without entering your recovery phrase";
   
    }

  }
  ngOnInit() {
 
  this.persistenceService.set('userAddress0', "1gg14Fiz7uHoxAbAxkBaD2TYkFmGTu73Z", {type: StorageType.LOCAL}); 
    this.persistenceService.set('linkType', "indiesquare", {type: StorageType.LOCAL}); 
   
    this.isIndiesquare = false; 
    this.shorturl = window.location.href+"?pass=";
   this.testObj = [];
    // this.linkIndiesquare();
 

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

  this.dataService.viewMode = true;
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
