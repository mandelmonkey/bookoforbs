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

  var img = this.orbImage.replace("http:", '');
	  console.log(img);
    return img;

}
   
}
