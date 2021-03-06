

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { PersistenceService, StorageType } from 'angular-persistence';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  /* host: {
     '(document:click)': 'onClick($event)',
   },*/
})
export class TopBarComponent implements OnInit {

  public currentEnv: any;
  public currentEnvKey: string;
  currentEnvTitle = "";
  public orbsData: Array<any>;
  environmentKeys: Array<any>;
  environments: Array<any>;
  rotated = false;
  screenHeight: number;

  constructor(public dataService: DataService, private persistenceService: PersistenceService) {
    document.addEventListener('click', this.offClickHandler.bind(this)); // bind on doc
  }
  getTestHeight() {

    return 8;


  }
  canShowEnv() {
    if (this.dataService.currentTab == 1 || this.dataService.currentTab == 2) {
      return true;
    }
    return false;
  }
  getAHeight(hHeight: string) {

    var isAndroid = /(android)/i.test(navigator.userAgent);
    if (!isAndroid) {

      this.calcScreenHeight()


    }



    var height = (this.screenHeight * (parseFloat(hHeight) / 100));

    return height;


  }

  offClickHandler(event: any) {
    if (!event.target.matches('.envbutton')) {

      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }

  }

  shouldShowReload() {
    if (this.dataService.currentTab == 1) {
      if (this.dataService.maincontroller.loading == false) {
        return true;
      }
    } else if (this.dataService.currentTab == 3) {
      if (this.dataService.history != undefined && this.dataService.history.loading == false) {
        return true;
      }
    }
    return false;
  }

  shouldShowSearch() {
    if (this.dataService.currentTab == 1) {
      if (this.dataService.maincontroller.loading == false) {
        return true;
      }
    }
    return false;
  }
  shouldShowViewAll() {
    if (this.dataService.currentTab == 2) {
      if (this.dataService.maincontroller.loading == false) {
        return true;
      }
    }
    return false;
  }
  ngOnInit() {
    this.dataService.topbar = this;
    this.currentEnvTitle = this.dataService.getLang("loading");
  }

  ngAfterViewInit() {
    this.calcScreenHeight()
  }

  calcScreenHeight() {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth

    this.screenHeight = w.innerHeight || e.clientHeight || g.clientHeight;
  }

  getSettings() {
    return this.dataService.getLang("settings");
  }
  getSignIn() {
    return this.dataService.getLang("signin");
  }
  getViewAll() {
    return this.dataService.getLang("viewall");
  }
  showSettings() {
    this.dataService.maincontroller.showSettings = true;;
  }
  showMarketAll() {
    /*this.dataService.maincontroller.showMarket = false;
    this.dataService.maincontroller.showCollection = false;
    this.dataService.maincontroller.showBottomBar = false;
    this.dataService.maincontroller.showTopBar = false;*/

    this.dataService.maincontroller.showMarketAll = true;
  }
  logout() {
    this.dataService.maincontroller.currentOrbsKeys = [];
    this.dataService.maincontroller.showIntro = true;
    this.dataService.maincontroller.showCollection = false;
    this.dataService.maincontroller.showMarket = false;
    this.dataService.maincontroller.showSend = false;
    this.dataService.maincontroller.showSelected = false;
    this.dataService.maincontroller.showOrderPage = false;
    this.dataService.maincontroller.showBottomBar = false;
    this.dataService.maincontroller.showTopBar = false;
    this.dataService.maincontroller.showAccount = false;
    this.dataService.maincontroller.showHistory = false;
    this.dataService.maincontroller.showSettings = false;
    this.dataService.viewMode = false;

  }

  setEnvironments(environmentData: Array<any>) {

    this.environments = environmentData;
    console.log(this.environments);
    this.environmentKeys = Object.keys(this.environments);
    console.log(this.environmentKeys);


    var lastKey = this.persistenceService.get('selectedEnv', StorageType.LOCAL);

    if (typeof lastKey != "undefined" && this.environmentKeys.indexOf(lastKey) != -1) {
      this.setEnvironment(lastKey);

    }
    else {
      if (this.environmentKeys.length > 0) {

        this.setEnvironment(this.environmentKeys[0]);

      }

    }

  }


  reloadViews() {
    if (this.dataService.currentTab == 1) {
      this.dataService.collection.setCurrentOrbs(this.currentEnv.envCode);
    } else if (this.dataService.currentTab == 3) {
      this.dataService.history.reloadViews();
    }
  }

  updateSearch(val: string) {
    this.dataService.maincontroller.currentSearch = val.toUpperCase();

    if (this.dataService.maincontroller.currentSearch != "") {

      this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
      var tmpthis = this;
      //if you only want to match id- as prefix 
      var matches = this.dataService.maincontroller.currentOrbsKeys.filter(function(returnValue) {
        if (returnValue) {
          return (returnValue.substring(0, tmpthis.dataService.maincontroller.currentSearch.length) === tmpthis.dataService.maincontroller.currentSearch);
        }


      });

      this.dataService.maincontroller.currentOrbsKeys = matches;



    } else {
      this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
      this.dataService.collection.refreshView();
    }



    this.dataService.collection.setScrollObs();
  }
  openEnvironmentList() {
    if (this.environmentKeys.length > 0) {
      document.getElementById("myDropdown").classList.toggle("show");

      var div = document.getElementById("smallarrow");


      var deg = this.rotated ? 0 : -90;

      div.style.webkitTransform = 'rotate(' + deg + 'deg)';
      div.style.transform = 'rotate(' + deg + 'deg)';
      div.style.webkitTransition = " all 0.1s ease-in-out";
      div.style.transition = " all 0.1s ease-in-out";
      this.rotated = !this.rotated;
    }
  }

  setEnvironment(key: string) {


    this.currentEnvKey = key;
    this.currentEnv = this.environments[this.currentEnvKey];

    this.currentEnvTitle = this.currentEnv.Title;
    this.dataService.maincontroller.currentBundleId = this.currentEnvKey;
    this.dataService.collection.setCurrentOrbs(this.currentEnv.envCode);



    this.persistenceService.set('selectedEnv', key, { type: StorageType.LOCAL });
    this.dataService.maincontroller.currentEnv = this.currentEnv.envCode;


  }

  shouldShowSettings() {
    if (this.dataService.maincontroller.showAccount == true && this.dataService.maincontroller.currentAddress != "empty") {
      return true;
    }
    return false;
  }
  shouldShowSignIn() {

    if (this.dataService.maincontroller.showAccount == true && this.dataService.maincontroller.currentAddress == "empty") {
      return true;
    }
    return false;
  }


}
