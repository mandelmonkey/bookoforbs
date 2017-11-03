import { HostListener,Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-introscreens',
  templateUrl: './introscreens.component.html',
  styleUrls: ['./introscreens.component.css']
})
export class IntroscreensComponent implements OnInit {
scrollView;
scrollObservable;
pixelWidth;
  constructor() { }

  ngOnInit() {
  	 this.pixelWidth = document.documentElement.clientWidth;
  }

  @HostListener('scroll', ['$event'])
onScroll(event) {
	    console.log(event.srcElement.scrollLeft, this.pixelWidth);
 //console.log(document.getElementById('scrollView').scrollLeft);
}

  ngAfterViewInit() {
 	 
    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable =  Observable.fromEvent(this. scrollView,'scroll'); 


 
 }

 @HostListener('document:click', ['$event'])
  clickout(event) {
   console.log(event)
  }


}
