import { HostListener,Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../services/data.service';
 declare var iNoBounce:any;

@Component({
  selector: 'app-introscreens',
  templateUrl: './introscreens.component.html',
  styleUrls: ['./introscreens.component.css']
})

export class IntroscreensComponent implements OnInit {
scrollView;
scrollObservable;
pixelWidth;
  constructor(public dataService:DataService) { }

  ngOnInit() {
  	 this.pixelWidth = document.documentElement.clientWidth;

  }

  @HostListener('scroll', ['$event'])
onScroll(event) {
	    console.log(event.srcElement.scrollLeft, this.pixelWidth);
 //console.log(document.getElementById('scrollView').scrollLeft);
}
slide2(){
  
}
  ngAfterViewInit() {
 	 var tmpthis = this;
    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable =  Observable.fromEvent(this. scrollView,'scroll'); 
  	tmpthis.scrollView.scrollLeft = 300;

   
 }

 


}
