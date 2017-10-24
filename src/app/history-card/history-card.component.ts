import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit {

constructor(public dataService:DataService) { }
  ngOnInit() {
  }

  getWidth(){
  	 var pxWidth = (document.documentElement.clientWidth * 0.9);
   

  	return pxWidth+"px";
  }
   getHeight(){
  	 var pxWidth = (document.documentElement.clientWidth * 0.9);
   	var pxHeight = pxWidth * 0.55;

  	return pxHeight+"px";
  
  }

}
