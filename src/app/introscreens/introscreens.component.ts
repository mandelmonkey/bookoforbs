import { HostListener, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
declare var iNoBounce: any;

@Component({
  selector: 'app-introscreens',
  templateUrl: './introscreens.component.html',
  styleUrls: ['./introscreens.component.css']
})

export class IntroscreensComponent implements OnInit {
  scrollView;
  scrollObservable;
  pixelWidth;
  page1Left = "0";
  page2Left = "100vw";
  page3Left = "100vw";
  page4Left = "100vw";
  scrollImage = "";
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.pixelWidth = document.documentElement.clientWidth;
    this.scrollImage = this.dataService.getImage('scrollIndicator1');
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    console.log(event.srcElement.scrollLeft, this.pixelWidth);
    //console.log(document.getElementById('scrollView').scrollLeft);
  }
  slide2() {
    this.page1Left = "-100vw";
    this.page2Left = "0";
    this.scrollImage = this.dataService.getImage('scrollIndicator2');
  }
  slide3() {
    this.page2Left = "-100vw";
    this.page3Left = "0";
    this.scrollImage = this.dataService.getImage('scrollIndicator3');
  }
  slide4() {
    this.page3Left = "-100vw";
    this.page4Left = "0";
    this.scrollImage = this.dataService.getImage('scrollIndicator4');
  }
  start() {
    this.dataService.showIntroScreen = false;
  }
  getTop() {
    return (window.innerHeight - 100) + "px";
  }
  ngAfterViewInit() {
    var tmpthis = this;
    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable = Observable.fromEvent(this.scrollView, 'scroll');
    tmpthis.scrollView.scrollLeft = 300;


  }




}
