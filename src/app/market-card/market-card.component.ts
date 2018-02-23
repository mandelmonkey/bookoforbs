import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../services/data.service';
import { ImgCacheService } from 'ng-imgcache';
import { PersistenceService, StorageType } from 'angular-persistence';
declare var XMLHttpRequest: any;
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
	item: OrbItem;

	@Input()
	orbKey: string;

	@Input()
	cardWidth: string;


	@Input()
	i: number;

	@Input()
	orbImage: string;

	@Input()
	scrollEvent: any;

	loaded = false;

	loadNum = 0;
	loadNum2 = 0;
	constructor(public dataService: DataService, private persistenceService: PersistenceService, imgCache: ImgCacheService) {


	}
	imgLoadError() {

		console.error("load error " + this.orbKey);
	}
	getId() {
		return "img" + this.i;
	}
	imageLoaded() {

		this.loaded = true;

	}

	getHeight() {

		return this.dataService.collection.cardHeightInner;
	}
	showORB() {
		this.dataService.collection.showORB(this.dataService.maincontroller.currentOrbs[this.orbKey], this.orbKey);
	}

	ngOnInit() {


	}
	getImage() {
		if (this.loaded == false) {
			return this.dataService.collection.defaultImage;
		}
		var img = this.orbImage;

		return this.dataService.getRemoteImage(img);

	}

}
