import { Component, OnInit , Input} from '@angular/core';

import { DataService } from '../services/data.service';
import { ImgCacheService } from 'ng-imgcache';
import { PersistenceService, StorageType } from 'angular-persistence';
declare var XMLHttpRequest:any;
export interface OrbItem {
    orbKey?: number;
    cardWidth?: string;
    gender?: string;
    age?: number;
    email?: string;
    phone?: string;
    address?: string;
}


@Component({
  selector: 'app-market-card',
  templateUrl: './market-card.component.html',
  styleUrls: ['./market-card.component.css']
})

export class MarketCardComponent implements OnInit {

	  @Input()
    item:  OrbItem;

     @Input()
	orbKey:string;

	 @Input()
	cardWidth:string;


	 @Input()
	i:number;

	@Input()
	orbImage:string;

	@Input()
	scrollEvent:any;

 
	loadNum = 0;
		loadNum2 = 0;
  constructor(public dataService:DataService,private persistenceService: PersistenceService,imgCache: ImgCacheService) { 

 
  }
imgLoadError(){

	console.error("load error "+this.orbKey);
}
 getId(){
 	return "img"+this.i;
 }
imageLoaded(){
/*
if(typeof this.orbImage != "undefined"){
	 var cachedImg = localStorage.getItem(this.orbKey+"v9");
	 
 
if(cachedImg == null){
 console.log("caching "+ cachedImg+" "+this.orbKey);
	 
var tmpthis = this;
var blobToBase64 = function(blob, cb) {
    var reader = new FileReader();
    reader.onload = function() {
    var dataUrl = reader.result;
    var base64 = dataUrl.split(',')[1];
    cb(base64);
    };
    reader.readAsDataURL(blob);
};
var xhr = new XMLHttpRequest();
xhr.open('GET', this.orbImage, true);
xhr.responseType = 'blob';

xhr.onload = function(e) {
   if (this.status !== 200) return;
   var blob = new Blob([this.response], {type: this.response.type});
 	 blobToBase64(blob, function(base64String) {
 	 	if(tmpthis.orbKey == "PEPEBRIEFS"){
 console.log(base64String);
}

localStorage.setItem(tmpthis.orbKey+"v9", base64String);
//tmpthis.persistenceService.set( tmpthis.orbKey+"v9",base64String, {type: StorageType.LOCAL}); 
 console.log("saved "+tmpthis.orbImage);

   }); 
 

   //rest of the code that uses the blob goes here
};

xhr.send();

}
}*/

 
var img = document.getElementById("img"+this.i);
img.style.background = "none";


	if(this.i == 2){
		 

	 if(this.loadNum == 1){
		 

	 
		var height = img.offsetHeight;
		var width = img.offsetWidth;
		var aspect =  height/width;
		if(this.dataService.landscape == true){
			 aspect =   width/height;
			//	this.dataService.collection.cardHeight = (20+(width * aspect))+"px";
		}else{
			//this.dataService.collection.cardHeight = (20+(this.dataService.collection.cardWidthNum * aspect))+"%";
			//this.dataService.collection.cardWidth = width+"px";
			//this.dataService.collection.cardHeight = (20+(width * aspect))+"px";
		}
		
	 
			this.loadNum++;
	}
	} 
/*
	  if(this.loadNum2 > 99){
	 	this.canvas = document.createElement("canvas");
   
	 //this.canvas.setAttribute('crossOrigin', 'anonymous');
    // Copy the image contents to the canvas
    this.ctx = this.canvas.getContext("2d");
var img = document.getElementById("img"); 
	var base64 = this.getBase64Image(img);
this.canvas = null;
		  console.log(base64);

 this.persistenceService.set( this.orbImage+"v8",base64, {type: StorageType.LOCAL}); 

 }
 this.loadNum2++;
	  
	*/
}
 
getHeight(){
	
	 return this.dataService.collection.cardHeightInner;
}
  showORB(){
 	this.dataService.collection.showORB(this.dataService.maincontroller.currentOrbs[this.orbKey],this.orbKey);
  }
 
  ngOnInit() {
 	 
  
  }
 getImage(){

  
	  
    return this.orbImage;

}
   
}
