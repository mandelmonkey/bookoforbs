import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
import {HTTPService} from "../services/http.service";
 declare var IndieSquare:any; 
  declare var bitcore:any; 
  declare var Mnemonic:any;
@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})

export class RankingsComponent implements OnInit {
	    @ViewChild(VirtualScrollComponent)
    private virtualScroll: VirtualScrollComponent;
	rankings = [];
	rankingsKeys = [];
	username = "";
	 scrollView;
	 viewPortItems3:any;
	 loadingUsername:boolean;
	   scrollObservable;
	loading:boolean;
indiesquare;
  constructor(private _sanitizer: DomSanitizer,public dataService:DataService,private httpService:HTTPService,private ref: ChangeDetectorRef) { }
ngAfterViewInit() {
    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable =  Observable.fromEvent(this. scrollView,'scroll'); 
 

}
onFocus(){

}
cancelSign(owner:any){
 owner.loadingUsername = false; 
}
continueSign(passphrase:string,owner:any){
  var tmpthis = owner;




       try {

        var seed = new Mnemonic(passphrase.split(' ')).toHex();
    }
    catch(err) {
       
         tmpthis.loading = false;
         throw  err;
    }
  
    
    var master = bitcore.HDPrivateKey.fromSeed(seed);
    
    var route = tmpthis.dataService.maincontroller.basePath + tmpthis.dataService.maincontroller.currentIndex;
    
    var masterderive = master.derive( route );
    var privkey = bitcore.PrivateKey(masterderive.privateKey);
        

    var sig = bitcore.signMessage("hello",privkey);







  tmpthis.httpService.setUsername(sig,tmpthis.username).subscribe(
     data => { 
console.log("set"+JSON.stringify(data));
     tmpthis.loadingUsername = false; 
     if(typeof data.error != undefined){

       if(data.error != null){
           tmpthis.loadingUsername = false;
           alert(tmpthis.dataService.getLang("error"));
         return;
       }else{
          console.log("error null"+data.username);
       }
     }
     console.log("data username "+data.username);
       alert(tmpthis.dataService.getLang("username_set"));
       tmpthis.getRankings();
       tmpthis.dataService.maincontroller.setPersistance("username:"+tmpthis.dataService.maincontroller.currentAddress,data.username+":"+tmpthis.dataService.maincontroller.currentEnv);
        
     },
         error => {
  tmpthis.loadingUsername = false; 
       alert(tmpthis.dataService.getLang("error"));
 
       },
     () => {});

}
setUsername(){

	if(this.dataService.maincontroller.currentAddress == "empty"){
		alert(this.dataService.getLang('please_sign_in_username'));
		return;
	}

     var tmpthis = this;
 
this.loadingUsername = true;
	 this.httpService.getHandshake().subscribe(
     data => { 
     
     	var hashToSign = data["handshake"];
     	
      if(tmpthis.dataService.maincontroller.linkType == "indiesquare"){
 this.indiesquare.signMessage({"message": hashToSign,"xsuccess":"Book of Orbs"}, function(url, urlScheme, error){
    if( error ){
        console.log("error"+error);
       	   tmpthis.loadingUsername = false;
         alert(tmpthis.dataService.getLang("error"));
     		return;
    }else{
      console.log("went here"+url);
      
    }

  if(!tmpthis.dataService.isMobile){
console.log("url is "+url);
    tmpthis.dataService.maincontroller.showQR(url);

  }

   
   
}, function(result, error){
  tmpthis.dataService.maincontroller.closeQR();
  if(error){
  		this.loadingUsername = false;
    console.error("Link error");
     alert(tmpthis.dataService.getLang("error"));
     		return;
 
  }else{
 
  	   tmpthis.httpService.setUsername(result.signature,tmpthis.username).subscribe(
     data => { 
console.log("set"+JSON.stringify(data));
     tmpthis.loadingUsername = false; 
     if(typeof data.error != undefined){

     	if(data.error != null){
     		  tmpthis.loadingUsername = false;
     		  alert(tmpthis.dataService.getLang("error"));
     		return;
     	}else{
     		 console.log("error null"+data.username);
     	}
     }
     console.log("data username "+data.username);
       alert(tmpthis.dataService.getLang("username_set"));
       tmpthis.getRankings();
       tmpthis.dataService.maincontroller.setPersistance("username:"+tmpthis.dataService.maincontroller.currentAddress,data.username+":"+tmpthis.dataService.maincontroller.currentEnv);
     	 
     },
         error => {
	tmpthis.loadingUsername = false; 
       alert(tmpthis.dataService.getLang("error"));
 
       },
     () => {});


 
   }
   

});

}else{

 tmpthis.dataService.maincontroller.showPassword(tmpthis.cancelSign,tmpthis.continueSign,tmpthis);


}

      },   
      error => {
	this.loadingUsername = false;
       this.loadingUsername = false;
       alert(tmpthis.dataService.getLang("error"));
 
       },
     () => {});
     
}
getStatusText(){
if(this.loading){
	return  this.dataService.getLang("loading");
}else{
	return this.dataService.getLang("collectors",this.rankingsKeys.length+"");
}
	}

jumpToMe(){
	for (var i = this.rankingsKeys.length - 1; i >= 0; i--) {
		var anAddress = this.rankings[i].xcpAddress;
		if(anAddress == this.dataService.maincontroller.currentAddress){
			this.virtualScroll.scrollInto(this.rankingsKeys[i]);
			return;
		}
	}
	
}
  ngOnInit() {
	 this.indiesquare = new IndieSquare({
    'apikey': this.httpService.apiKey  
  });
  //	 this.rankings = JSON.parse("{\"1\":{\"score\":\"75\",\"userId\":434481,\"userName\":\"Test\",\"xcpAddress\":\"1Nh4tPtQjHZSoYdToTF7T3xbaKrTNKM3wP\"},\"2\":{\"score\":\"58\",\"userId\":434734,\"userName\":\"kojitest\",\"xcpAddress\":\"1BG5Kra4EhAaJwkaGX2LQWWbqpGXv6f7dj\"},\"3\":{\"score\":\"0\",\"userId\":434484,\"userName\":\"Test\",\"xcpAddress\":\"1DVQiPGJYoA8RNfJxe6AeNgwdjvUHGZC6F\"}}");
  	// this.rankingsKeys = Object.keys(this.rankings);


this.getRankings();


this.username =  this.dataService.maincontroller.getPersistance("username:"+this.dataService.maincontroller.currentAddress+":"+this.dataService.maincontroller.currentEnv);






   
     

  }
  getRankings(){

  	this.loading = true;
  	var tmpthis = this;
 this.httpService.getRankings(this.dataService.maincontroller.currentEnv).subscribe(
     data => { 
     	this.loading = false;
     	tmpthis.rankings = data;
     	tmpthis.rankingsKeys = Object.keys(tmpthis.rankings);
     	console.log(tmpthis.rankings.length+" env "+JSON.stringify(tmpthis.rankings));
     	

      },   
      error => {
       this.loading = false;
       alert(tmpthis.dataService.getLang("error"));
console.log("error rankings"); 
       },
     () => {});
  }
 getTopBackground(){
  return 0;
    }
    closeSelf(){
    	this.dataService.maincontroller.showRankings = false;
    }

     getCollectionHeight(){

    if(this.scrollView == null){
      return "5px";
    }else{
     
 
      return (document.documentElement.clientHeight-this.scrollView.offsetTop + 20 )+"px";
    }
   
  }
 
}
