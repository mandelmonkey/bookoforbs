import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, style, state, animate, transition, trigger } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { HTTPService } from "../services/http.service";
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-marketall',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(1500, style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './marketall.component.html',
  styleUrls: ['./marketall.component.css']
})
export class MarketallComponent implements OnInit {

  loading = false;
  currentScroll: number;
  floatCheck: number;
  cardWidth: string;
  cardWidthNum: number;
  cardHeight: string;
  cardHeightInner: string;
  scrollHeight: string;
  scrollObservable;
  scrollView;

  constructor(public dataService: DataService, private httpService: HTTPService) {

  }

  ngAfterViewInit() {
    this.setScrollObs();


  }
  setScrollObs() {

    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable = Observable.fromEvent(this.scrollView, 'scroll');


  }

  goBack() {
    this.dataService.maincontroller.currentBalance = null;
    this.dataService.maincontroller.selectedOrb = "";
    this.dataService.maincontroller.selectedKey = "";
    this.dataService.maincontroller.showMarketAll = false;
    this.dataService.maincontroller.showSelected = false;
  }


  ngOnInit() {



    this.currentScroll = 40;
    this.floatCheck = 0;
    this.setWidths();



  }
  getScrollHeight() {
    if (this.scrollView == null) {
      return "5px";
    } else {

      return (document.documentElement.clientHeight - 55) + "px";
    }

  }
  goToOrder(selectedOrb, selectedKey) {
    this.dataService.maincontroller.currentBalance = this.dataService.maincontroller.getUserBalance(selectedKey);
    this.dataService.maincontroller.selectedOrb = selectedOrb;
    this.dataService.maincontroller.selectedKey = selectedKey;
    this.dataService.maincontroller.showOrderPage = true;
  }
  setWidths() {

    var pxWidth = (document.documentElement.clientWidth / 7);



    if (this.dataService.isMobile == true) {
      pxWidth = (document.documentElement.clientWidth / 3.5);

      if (this.dataService.landscape == true) {
        pxWidth = (document.documentElement.clientWidth / 2.5);

      }


    } else {

      if (this.dataService.landscape == true) {
        pxWidth = (document.documentElement.clientWidth / 5);

      }

    }


    this.cardWidth = pxWidth + "px";


    var heightNum = pxWidth * 1.8;

    if (this.dataService.landscape == true) {
      heightNum = (pxWidth * 0.9);
    }

    this.cardHeight = heightNum + "px";




    this.cardHeightInner = (heightNum * 0.8) + "px";



  }

}
