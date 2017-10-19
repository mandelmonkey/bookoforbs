import { Component, OnInit , Input} from '@angular/core';

import { DataService } from '../services/data.service';

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
  constructor(public dataService:DataService) { }
imgLoadError(){
	console.error("load error "+this.orbKey);
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
 console.log(this.i+" Getting image "+ obj.image);
    return obj.image;
  }
}
