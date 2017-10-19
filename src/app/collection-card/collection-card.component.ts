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

	deafultImage = "../assets/images/cardback.png";

  constructor(public dataService:DataService) { }
imgLoadError(){
	console.error("load error "+this.orbKey);
}
  showORB(){
 	this.dataService.collection.showORB(this.dataService.maincontroller.currentOrbs[this.orbKey],this.orbKey);
  }

  ngOnInit() {
  }
 getImage(obj:any){
//console.log("Getting image"+JSON.stringify(obj));
    return obj.image;
  }
}
