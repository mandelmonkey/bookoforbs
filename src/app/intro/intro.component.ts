import { Component, OnInit } from '@angular/core';
import {HTTPService} from "../services/http.service";
import { ActivatedRoute }     from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';
import { PersistenceService, StorageType } from 'angular-persistence';
  declare var Mnemonic:any; 
   declare var bitcore:any; 
    declare var IndieSquare:any; 
    declare var QRious:any;
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
     linkText = "";
     isIndiesquare = false;
     qrUrl = "";
     wordCheck ="";
     showNewAccountNext=false;
     
 constructor(public dataService:DataService, private httpService:HTTPService, private route: ActivatedRoute,private persistenceService: PersistenceService) { 
    route.queryParams.subscribe(
      data =>  this.loadShortUrl(data['pass']));

   

}
showLinkageIcon(){
  if(this.dataService.isMobile == true){
    return false;
  }

  if(this.qrUrl != ""){
    return true;
  }
  return false;

}
showEnterPassphrase(){
  this.showIntroButtons = false;
  this.showPassphraseField = true;
}
linkIndieSquare(){

 this.linkText = "linking with IndieSquare...";
    var tempThis = this;
 
this.isIndiesquare = true;
      var indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
       
      indiesquare.getAddress('Book of Orbs', function(url, urlScheme, error){
    if( error ){
        console.log("error"+error);
       
        return;
    }else{
     
      if(tempThis.dataService.isMobile == false){
       tempThis.linkText = "scan the qrcode with your IndieSquare Wallet's linking button";
         console.log("went here"+url);
         tempThis.qrUrl = url;
        //show qrcode here;
         var qr = new QRious({
          element: document.getElementById('qr1'),
          value: tempThis.qrUrl,
          size:250
        });

      }
    }


   
   
}, function(result, error){
 tempThis.qrUrl="";
  if(error){
    tempThis.isIndiesquare = false;
    console.error(error);
    alert("error please try again");
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

      return "Enter a secure password, this is used to secrure your key";
     
  }
  ngOnInit() {
 if(this.dataService.dev == true){
     //alert("Dev");
    
  //this.persistenceService.set('userAddress0', "1Nh4tPtQjHZSoYdToTF7T3xbaKrTNKM3wP", {type: StorageType.LOCAL}); 
    //this.persistenceService.set('linkType', "indiesquare", {type: StorageType.LOCAL}); 
   }
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
     
      indiesquare.getAddress('Book of Orbs', function(url, urlScheme, error){
    if( error ){
      alert("er "+error);
        console.log("error"+error);
       
        return;
    }else{
      console.log("went here"+url);
    }


   
   
}, function(result, error){
 
  if(error){
      alert("er "+error);
    console.error(error);
 return;
  }else{
     

   tempDataService.maincontroller.currentAddress =result.address;
   tempDataService.maincontroller.linkType = "indiesquare";
    tempDataService.maincontroller.loading = true;
   tempDataService.maincontroller.currentOrbs = [];
   tempDataService.maincontroller.currentOrbsKeys =[];
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

goToIndieSquare(){
 
 var isIphone = /iPhone/i.test(window.navigator.userAgent);
  var isAndroid= /Android/i.test(window.navigator.userAgent);
  if(isIphone){
 window.location.href="https://itunes.apple.com/app/kauntao-cai-bu/id977972108";
  }
  else if(isAndroid){
   window.location.href="https://play.google.com/store/apps/details?id=inc.lireneosoft.counterparty";
  
  }
  else{
     window.location.href="https://wallet.indiesquare.me/";
  }
  
}
 backToStart(){
   this.passphrase = "";
 this.showNewPassphrase = false;
   this.showIntroButtons = true;
this.showPassphraseField = false;
  }
createNewAccount(){

  this.showNewAccountNext = false;
 
  this.showNewPassphrase = true;
   this.showPassphraseField = false;

 var words = null;
	
      
			var m = new Mnemonic(words);
      this.passphrase =  m.toWords().toString().replace(/,/gi, ' ');
  var tmpthis = this;
      this.createAddressFromPassphrase(m);
         setTimeout(function() {
       tmpthis.showNewAccountNext= true;
        },3000);
   

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
    this.dataService.currentTab = 1;
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


updatePhraseEnter(val:string){
 
 var words = val.split(' ');
 this.wordCheck = "";
 
  for(var i=0;i<words.length;i++){
    if(Mnemonic.words.indexOf(words[i]) != -1){

      this.wordCheck = "Word "+(i+1)+"/12";
    }
 }


   var aWord = words[words.length-1];
  var lastVal = val[val.indexOf(aWord)+(aWord.length-1)];
   //   console.log(lastVal);
      if(typeof lastVal == "undefined" ){


    aWord = words[words.length-2];
     if(Mnemonic.words.indexOf(aWord) == -1){
       alert("the last word was incorrect, please re-type it");
this.passphrase = "";
       for(var i=0;i<words.length-2;i++){

this.passphrase = this.passphrase + words[i]+" ";
}
       return;
     }
     

   }
   if(words.length == 12){

     aWord = words[words.length-1];
 
     if(Mnemonic.words.indexOf(aWord) != -1){
         alert("valid!");
       return;
     }
  
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
