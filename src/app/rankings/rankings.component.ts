import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VirtualScrollComponent } from 'angular2-virtual-scroll';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
import {HTTPService} from "../services/http.service";
 declare var IndieSquare:any; 
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
setUsername(){

     
 
this.loadingUsername = true;
	 this.httpService.getHandshake().subscribe(
     data => { 
     
     	var hashToSign = data["handshake"];
     	

 this.indiesquare.signMessage({"message": hashToSign,"xsuccess":"Book of Orbs"}, function(url, urlScheme, error){
    if( error ){
        console.log("error"+error);
       	this.loadingUsername = false;
        return;
    }else{
      console.log("went here"+url);
      
    }


   
   
}, function(result, error){
 
  if(error){
  		this.loadingUsername = false;
    console.error(error);
 return;
  }else{
      
 alert(JSON.stringify(result));
   }
   

});

      },   
      error => {
	this.loadingUsername = false;
       this.loadingUsername = false;
       alert("error setting username");
 
       },
     () => {});
     
}
getStatusText(){
if(this.loading){
	return "loading...";
}else{
	return this.rankingsKeys.length + " Collectors";
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
       alert("error getting rankings");
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
