import { Component, OnInit , Input} from '@angular/core';

import { DataService } from '../services/data.service';

import { PersistenceService, StorageType } from 'angular-persistence';
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
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {
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

 canvas;
 ctx;
	loadNum = 0;
		loadNum2 = 0;
  constructor(public dataService:DataService,private persistenceService: PersistenceService) { }
imgLoadError(){
	console.error("load error "+this.orbKey);
}

	 getBase64Image(img) {
    // Create an empty canvas element
  this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = this.canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
imageLoaded(){




	if(this.i == 1){
		 

	 if(this.loadNum == 1){
		var img = document.getElementById("img");

	 
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
		
		console.log("ch "+this.dataService.collection.cardWidthNum +" as"+aspect );
			this.loadNum++;
	}
	} 

	  if(this.loadNum2 == 1){
	 	this.canvas = document.createElement("canvas");
   
	//this.canvas.setAttribute('crossOrigin', 'anonymous');
    // Copy the image contents to the canvas
    this.ctx = this.canvas.getContext("2d");
var img = document.getElementById("img"); 
	var base64 = this.getBase64Image(img);

		  console.log(base64);

 this.persistenceService.set( this.orbImage+"v6",base64, {type: StorageType.LOCAL}); 

 }
 this.loadNum2++;
	  
	
}
  showORB(){
 	this.dataService.collection.showORB(this.dataService.maincontroller.currentOrbs[this.orbKey],this.orbKey);
  }
handlerFunction() {
	console.log("hello");
}
  ngOnInit() {

  	 
  
  }
 getImage(obj:any){

 
	 var cachedImg = this.persistenceService.get(obj+"v6",   StorageType.LOCAL);
	 
 console.log("cahceh is "+cachedImg);
if(typeof cachedImg!="undefined"){

 console.log(this.i+" Getting base "+ obj);
return "data:image/png;base64,"+cachedImg;

}

 console.log(this.i+" Getting image "+ obj);
    return obj;
  }
}
