import { Component, OnInit,ViewChild, ElementRef,ChangeDetectorRef } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {HTTPService} from "../services/http.service";
import { DataService } from '../services/data.service';
 
@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
 
 

 allOwnImage = this.dataService.getImage('leftOptionSeg'); 
  public allOrbs = false;
   
  
  currentScroll:number;
  floatCheck:number;
  cardWidth:string;
  cardWidthNum:number;
  cardHeight:string;
  cardHeightInner:string;
  scrollHeight:string;
  scrollObservable;
 scrollView;
 env="";


 errorImage = this.dataService.getImage('cardback');
  defaultImage = this.dataService.getImage('cardback');


 constructor(public dataService:DataService,private httpService:HTTPService) {
 }
 ngAfterViewInit() {
    this.scrollView = document.getElementById("scrollView");
    this.scrollObservable =  Observable.fromEvent(this. scrollView,'scroll'); 


  

 }

 addPull(){

var tmpthis = this;
    //grab the list
var list = document.getElementById("scrollView");
//grab the loading div
var loader = document.getElementById("touchloader");
 loader.style.display = "none";
//keep the state whether the fingers are touched
var isTouched = false;
//keep the state whether a PULL actually went out
var isMoved = false;
//This has the original Top offset (relative to screen) position of the list
var prevY =  list.offsetTop;
//This has the original Top CSS position of the list
var cssY = list.style.top+"";
 
cssY =  cssY.substring(0, cssY.length - 2);
//alert(cssY);

//Add the start of the touching
 
list.addEventListener("touchstart", function (e) {
    //touch started ? YES
    isTouched = true;
    //initialize the touched point
    prevY = e.changedTouches[0].clientY;
    //we use css3 transitions when available for smooth sliding
    list.style.transition = "";
   // e.preventDefault();
}, false);
list.addEventListener("touchend", function (e) {
    //on touchup we cancel the touch event
    isTouched = false;
    //now if the list has moved downwards, it should come up but in a transition
   // list.style.transition = "top 1s";
    if (isMoved) {
        //show the loader div
       // loader.style.display = "block";
       tmpthis.setCurrentOrbs(tmpthis.env);
    }
   // alert(cssY);
    list.style.top ='0px';
    isMoved = false;

   // e.preventDefault();
}, false);

 
list.addEventListener("touchmove", function (e) {
    if (isTouched) {
        if (e.changedTouches[0].clientY > prevY) {
            //on touchmove, we add the exact amount fingers moved to the top of the list
            var change = e.changedTouches[0].clientY - prevY;
            //and add it to the style
            list.style.top = cssY + change + 'px';
            isMoved = true;
        }
    }
   // e.preventDefault();
}, false);

/*
//binding mouse events to make this work in desktop browsers as well
list.addEventListener("mousedown", function (e) {
    isTouched = true;
    prevY = e.clientY;
    list.style.transition = "";
    e.preventDefault();
}, false);
list.addEventListener("mouseup", function (e) {
    isTouched = false;

    list.style.transition = "top 1s";
    if (isMoved) {
        loader.style.display = "block";
        loadNewData();
    }
    list.style.top = cssY + 'px';
    isMoved = false;

    e.preventDefault();
}, false);
list.addEventListener("mousemove", function (e) {
    if (isTouched) {
        if (e.clientY > prevY) {
            var change = e.clientY - prevY;
            list.style.top = cssY + change + 'px';
            isMoved = true;
        }
    }
    e.preventDefault();
}, false);*/

 

 }
  ngOnInit() {
      

   
    this.dataService.collection = this;
    this.currentScroll = 40;
    this.floatCheck = 0;
    this.setWidths();

    this.dataService.maincontroller.showAccount = false;






        
  }
  setWidths(){
 
   var pxWidth = (document.documentElement.clientWidth / 7);
   


    if(this.dataService.isMobile == true){
       pxWidth = (document.documentElement.clientWidth / 3.5);
       
      if(this.dataService.landscape == true){
          pxWidth = (document.documentElement.clientWidth / 2.5);
    
      }


    }else{

      if(this.dataService.landscape == true){
          pxWidth = (document.documentElement.clientWidth / 5);
    
      }

    }


     this.cardWidth = pxWidth +"px";
 

    var heightNum = pxWidth * 1.8;

    if(this.dataService.landscape == true){
      heightNum  =  (pxWidth * 0.9);
    }

    this.cardHeight = heightNum+"px";




    this.cardHeightInner =  (heightNum * 0.8)+"px";

    

  }
  imgLoadError(){
    console.log("load error");
  }
  getCollectionHeight(){
    if(this.scrollView == null){
      return "5px";
    }else{
     var bottombar = document.getElementById("bottomBarBottom");
 
      return (document.documentElement.clientHeight-this.scrollView.offsetTop-bottombar.clientHeight+7 )+"px";
    }
   
  }
 
  setCurrentOrbs(env:string){

this.env=env;
this.dataService.maincontroller.loading = true;
console.log("called here");
this.dataService.maincontroller.currentOrbs = [];
this.dataService.maincontroller.currentOrbsKeys = [];
 
 
 this.httpService.getEnvironment(env).subscribe(
     data => { 
          
this.dataService.maincontroller.loading = false;
this.dataService.maincontroller.ownedOrbsEnv = new Array<any>();
this.continueLoad(data);
     

      

      },   
      error => {

 var resString = "{\"Environements\":{\"com.spellsofgenesis\":{\"Definition\":{\"Title\":\"Spells of Genesis\",\"MasterCurrency\":\"BITCRYSTALS\",\"ticker\":\"BCY\",\"envCode\":\"eSog\",\"bundleId\":\"com.spellsofgenesis\",\"banner\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/orbcenter\\\/eSog\\\/banner.png\",\"assetOrientation\":\"default\",\"Sortable\":{\"attack\":{\"image\":\"https:\\\/\\\/spellsofgenesis.com\\\/img\\\/divers\\\/pp.png\"},\"health\":{\"image\":\"https:\\\/\\\/spellsofgenesis.com\\\/img\\\/divers\\\/pv.png\"},\"speed\":{\"image\":\"https:\\\/\\\/spellsofgenesis.com\\\/img\\\/divers\\\/sp.png\"}},\"Filters\":{\"element\":{\"FIRE\":{\"image\":\"https:\\\/\\\/sogassets.com\\\/static\\\/img\\\/icons\\\/elements\\\/fire.png\"},\"EARTH\":{\"image\":\"https:\\\/\\\/sogassets.com\\\/static\\\/img\\\/icons\\\/elements\\\/earth.png\"},\"WATER\":{\"image\":\"https:\\\/\\\/sogassets.com\\\/static\\\/img\\\/icons\\\/elements\\\/water.png\"},\"ICE\":{\"image\":\"https:\\\/\\\/sogassets.com\\\/static\\\/img\\\/icons\\\/elements\\\/ice.png\"},\"LIGHT\":{\"image\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/Light.png\"},\"DARKNESS\":{\"image\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/Dark.png\"}},\"rarity\":{\"COMMON\":{\"image\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/common_full.png\"},\"RARE\":{\"image\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/rare_full.png\"},\"EPIC\":{\"image\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/epic_full.png\"},\"LEGENDARY\":{\"image\":\"http:\\\/\\\/sandra.everdreamsoft.com\\\/images\\\/legendary_full.png\"}}}},\"Assets\":{\"BTCMEETUPCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1985.jpg\",\"assetName\":\"BTCMEETUPCD\",\"id\":\"401\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"19\"},\"FACTOMCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1953.jpg\",\"assetName\":\"FACTOMCD\",\"id\":\"400\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"11\"},\"CRYSTALIBUR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1984.jpg\",\"assetName\":\"CRYSTALIBUR\",\"id\":\"384\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"31\"},\"BADWOLF\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1934.jpg\",\"assetName\":\"BADWOLF\",\"id\":\"383\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"23\"},\"FORKCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1983.jpg\",\"assetName\":\"FORKCARD\",\"id\":\"382\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"30\"},\"SIACARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1952.jpg\",\"assetName\":\"SIACARD\",\"id\":\"381\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"DARK\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"9\"},\"SOGLAUNCHCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1951.jpg\",\"assetName\":\"SOGLAUNCHCD\",\"id\":\"380\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"9\"},\"GIANTCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1950.jpg\",\"assetName\":\"GIANTCARD\",\"id\":\"379\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"22\"},\"PRINCEOFICE\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1949.jpg\",\"assetName\":\"PRINCEOFICE\",\"id\":\"378\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"10\"},\"MUSHROOMSIMP\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1948.jpg\",\"assetName\":\"MUSHROOMSIMP\",\"id\":\"377\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"12\"},\"THEMESSENGER\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1947.jpg\",\"assetName\":\"THEMESSENGER\",\"id\":\"376\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"2\"},\"SORCERERAKAM\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1946.jpg\",\"assetName\":\"SORCERERAKAM\",\"id\":\"375\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"21\"},\"PURPLEDRAGON\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1945.jpg\",\"assetName\":\"PURPLEDRAGON\",\"id\":\"374\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"DARK\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"25\"},\"MOTHERBIRD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1933.jpg\",\"assetName\":\"MOTHERBIRD\",\"id\":\"373\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"17\"},\"SYLVANELF\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1944.jpg\",\"assetName\":\"SYLVANELF\",\"id\":\"372\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"13\"},\"STAGWARRIOR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1941.jpg\",\"assetName\":\"STAGWARRIOR\",\"id\":\"371\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"18\"},\"DARKSTATUE\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1940.jpg\",\"assetName\":\"DARKSTATUE\",\"id\":\"370\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"28\"},\"GENOFLIGHT\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1982.jpg\",\"assetName\":\"GENOFLIGHT\",\"id\":\"368\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"15\"},\"FWCFCUMRATTC\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1939.jpg\",\"assetName\":\"FWCFCUMRATTC\",\"id\":\"367\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"11\"},\"FWSDLFIETHSC\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1938.jpg\",\"assetName\":\"FWSDLFIETHSC\",\"id\":\"366\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"13\"},\"FWSDLICEDRAC\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1937.jpg\",\"assetName\":\"FWSDLICEDRAC\",\"id\":\"365\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"16\"},\"FWCFCFIERYCC\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1936.jpg\",\"assetName\":\"FWCFCFIERYCC\",\"id\":\"364\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"15\"},\"QUIRINCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1929.jpg\",\"assetName\":\"QUIRINCARD\",\"id\":\"363\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"24\"},\"HERBODCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1928.jpg\",\"assetName\":\"HERBODCARD\",\"id\":\"362\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"14\"},\"RIDANCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1927.jpg\",\"assetName\":\"RIDANCARD\",\"id\":\"361\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"12\"},\"FWSDLTHEMONC\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1935.jpg\",\"assetName\":\"FWSDLTHEMONC\",\"id\":\"360\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"8\"},\"WOODMONSTER\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1932.jpg\",\"assetName\":\"WOODMONSTER\",\"id\":\"359\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"10\"},\"CRAZYLOLA\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1930.jpg\",\"assetName\":\"CRAZYLOLA\",\"id\":\"357\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"9\"},\"SAPPHIREELF\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1923.jpg\",\"assetName\":\"SAPPHIREELF\",\"id\":\"356\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"18\"},\"MIGHTYSTORK\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1924.jpg\",\"assetName\":\"MIGHTYSTORK\",\"id\":\"355\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"3\"},\"JEWELDRAGONS\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1931.jpg\",\"assetName\":\"JEWELDRAGONS\",\"id\":\"354\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"14\"},\"WATERANGEL\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1921.jpg\",\"assetName\":\"WATERANGEL\",\"id\":\"353\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"16\"},\"FIREANGEL\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1922.jpg\",\"assetName\":\"FIREANGEL\",\"id\":\"352\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"13\"},\"A9298018348897857870\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1944.jpg\",\"assetName\":\"A9298018348897857870\",\"id\":\"348\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"10\"},\"ROOSTERYEAR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1920.jpg\",\"assetName\":\"ROOSTERYEAR\",\"id\":\"346\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"7\"},\"BTCCCOINCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1917.jpg\",\"assetName\":\"BTCCCOINCARD\",\"id\":\"345\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"8\"},\"BTCCFORGECD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1918.jpg\",\"assetName\":\"BTCCFORGECD\",\"id\":\"344\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"18\"},\"KARMACARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1916.jpg\",\"assetName\":\"KARMACARD\",\"id\":\"343\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"11\"},\"LAMUSECARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1926.jpg\",\"assetName\":\"LAMUSECARD\",\"id\":\"342\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"16\"},\"TATIANACARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1908.jpg\",\"assetName\":\"TATIANACARD\",\"id\":\"341\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"8\"},\"COINPORTALCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1915.jpg\",\"assetName\":\"COINPORTALCD\",\"id\":\"340\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"7\"},\"KINGREINDEER\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1925.jpg\",\"assetName\":\"KINGREINDEER\",\"id\":\"339\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"16\"},\"PIXIECARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1912.jpg\",\"assetName\":\"PIXIECARD\",\"id\":\"338\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"11\"},\"WAARTHCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1910.jpg\",\"assetName\":\"WAARTHCARD\",\"id\":\"337\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"10\"},\"VICTORIACARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1909.jpg\",\"assetName\":\"VICTORIACARD\",\"id\":\"336\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"14\"},\"BITCOINMAGCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1914.jpg\",\"assetName\":\"BITCOINMAGCD\",\"id\":\"335\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"8\"},\"EMERALDETHER\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1913.jpg\",\"assetName\":\"EMERALDETHER\",\"id\":\"334\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"13\"},\"CROWCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1911.jpg\",\"assetName\":\"CROWCARD\",\"id\":\"333\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"17\"},\"MAMAGRUN\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1906.jpg\",\"assetName\":\"MAMAGRUN\",\"id\":\"332\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"12\"},\"KAYLAGRUN\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1905.jpg\",\"assetName\":\"KAYLAGRUN\",\"id\":\"331\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"15\"},\"GASTADGRUN\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1904.jpg\",\"assetName\":\"GASTADGRUN\",\"id\":\"330\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"16\"},\"TINYGRUN\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1907.jpg\",\"assetName\":\"TINYGRUN\",\"id\":\"329\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"12\"},\"TROYGRUN\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1903.jpg\",\"assetName\":\"TROYGRUN\",\"id\":\"328\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"27\"},\"HUNTERCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1902.jpg\",\"assetName\":\"HUNTERCARD\",\"id\":\"327\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"14\"},\"WATERSCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1901.jpg\",\"assetName\":\"WATERSCARD\",\"id\":\"326\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"29\"},\"GOLEMCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1900.jpg\",\"assetName\":\"GOLEMCARD\",\"id\":\"325\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"23\"},\"SCARECROWCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1499.jpg\",\"assetName\":\"SCARECROWCD\",\"id\":\"324\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"DARK\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"11\"},\"BITCOINISTCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1498.jpg\",\"assetName\":\"BITCOINISTCD\",\"id\":\"323\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"7\"},\"BARDCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1497.jpg\",\"assetName\":\"BARDCARD\",\"id\":\"322\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"10\"},\"BITCOINCOMCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1496.jpg\",\"assetName\":\"BITCOINCOMCD\",\"id\":\"321\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"14\"},\"PEACOCKCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1495.jpg\",\"assetName\":\"PEACOCKCARD\",\"id\":\"320\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"9\"},\"WAVESCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1494.jpg\",\"assetName\":\"WAVESCARD\",\"id\":\"319\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"15\"},\"SLACKCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1493.jpg\",\"assetName\":\"SLACKCARD\",\"id\":\"318\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"25\"},\"TREZORCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1491.jpg\",\"assetName\":\"TREZORCD\",\"id\":\"317\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"11\"},\"HARPIESCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1492.jpg\",\"assetName\":\"HARPIESCARD\",\"id\":\"313\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"7\"},\"SORCERESSCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1490.jpg\",\"assetName\":\"SORCERESSCD\",\"id\":\"312\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"9\"},\"NEMCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1489.jpg\",\"assetName\":\"NEMCARD\",\"id\":\"311\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"5\"},\"WEASELSCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1488.jpg\",\"assetName\":\"WEASELSCARD\",\"id\":\"310\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"7\"},\"KRAKENCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1487.jpg\",\"assetName\":\"KRAKENCARD\",\"id\":\"309\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"22\"},\"TROLLSCLUBCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1486.jpg\",\"assetName\":\"TROLLSCLUBCD\",\"id\":\"308\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"12\"},\"VANBEXCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1485.jpg\",\"assetName\":\"VANBEXCARD\",\"id\":\"304\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"\",\"speed\":\"2\",\"health\":\"14\"},\"EDSCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1484.jpg\",\"assetName\":\"EDSCARD\",\"id\":\"303\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"27\"},\"WATERSCOURT\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1483.jpg\",\"assetName\":\"WATERSCOURT\",\"id\":\"302\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"1\",\"health\":\"16\"},\"GNOMECARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1482.jpg\",\"assetName\":\"GNOMECARD\",\"id\":\"301\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"LIGHT\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"10\"},\"DAOSOGCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1481.jpg\",\"assetName\":\"DAOSOGCARD\",\"id\":\"300\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"\",\"speed\":\"0\",\"health\":\"25\"},\"FLYINGBLAZE\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1478.jpg\",\"assetName\":\"FLYINGBLAZE\",\"id\":\"298\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"\",\"speed\":\"3\",\"health\":\"5\"},\"CCMCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1475.jpg\",\"assetName\":\"CCMCARD\",\"id\":\"94\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"DARK\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"13\"},\"DASHCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1477.jpg\",\"assetName\":\"DASHCD\",\"id\":\"93\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"14\"},\"SADICARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1476.jpg\",\"assetName\":\"SADICARD\",\"id\":\"92\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"16\"},\"KEEPKEYCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1474.jpg\",\"assetName\":\"KEEPKEYCARD\",\"id\":\"91\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"30\"},\"SGDARKNESS\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1741.jpg\",\"assetName\":\"SGDARKNESS\",\"id\":\"87\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"19\"},\"BITSHARESCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1472.jpg\",\"assetName\":\"BITSHARESCD\",\"id\":\"86\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"14\"},\"FOOTSOLDIER\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1471.jpg\",\"assetName\":\"FOOTSOLDIER\",\"id\":\"85\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"8\"},\"SHOPKEEPERCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1467.jpg\",\"assetName\":\"SHOPKEEPERCD\",\"id\":\"84\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"11\"},\"MAIDSAFECD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1463.jpg\",\"assetName\":\"MAIDSAFECD\",\"id\":\"83\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"21\"},\"COINOFLITECD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1462.jpg\",\"assetName\":\"COINOFLITECD\",\"id\":\"82\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"4\"},\"SHIELDWALLCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1461.jpg\",\"assetName\":\"SHIELDWALLCD\",\"id\":\"81\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"18\"},\"SARUTOBICARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1456.jpg\",\"assetName\":\"SARUTOBICARD\",\"id\":\"77\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"9\"},\"DARYENCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1455.jpg\",\"assetName\":\"DARYENCARD\",\"id\":\"76\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"24\"},\"SAYOSIATAX\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1454.jpg\",\"assetName\":\"SAYOSIATAX\",\"id\":\"75\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"11\"},\"SATOSHILITE\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1453.jpg\",\"assetName\":\"SATOSHILITE\",\"id\":\"74\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"24\"},\"GOBLINCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1452.jpg\",\"assetName\":\"GOBLINCARD\",\"id\":\"73\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"21\"},\"WHEREBCYCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1451.jpg\",\"assetName\":\"WHEREBCYCARD\",\"id\":\"72\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"13\"},\"CARDAMBER\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1450.jpg\",\"assetName\":\"CARDAMBER\",\"id\":\"44\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"25\"},\"EMERALDCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1449.jpg\",\"assetName\":\"EMERALDCARD\",\"id\":\"43\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"19\"},\"WAGATECARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1448.jpg\",\"assetName\":\"WAGATECARD\",\"id\":\"42\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"8\"},\"BLOCKTRAILCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1447.jpg\",\"assetName\":\"BLOCKTRAILCD\",\"id\":\"41\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"19\"},\"RUBYCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1446.jpg\",\"assetName\":\"RUBYCARD\",\"id\":\"40\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"9\"},\"SAPPHIRECARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1445.jpg\",\"assetName\":\"SAPPHIRECARD\",\"id\":\"39\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"12\"},\"DOGECOINCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1444.jpg\",\"assetName\":\"DOGECOINCARD\",\"id\":\"38\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"16\"},\"BCYDRAGON\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1426.jpg\",\"assetName\":\"BCYDRAGON\",\"id\":\"37\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"ICE\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"19\"},\"CARDAIRBITZ\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1443.jpg\",\"assetName\":\"CARDAIRBITZ\",\"id\":\"36\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"27\"},\"CARDASTEMA\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1432.jpg\",\"assetName\":\"CARDASTEMA\",\"id\":\"35\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"16\"},\"CARDAUGUR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1442.jpg\",\"assetName\":\"CARDAUGUR\",\"id\":\"34\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"DARK\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"19\"},\"MINERCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1441.jpg\",\"assetName\":\"MINERCARD\",\"id\":\"33\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"20\"},\"XAJIBESAAR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1438.jpg\",\"assetName\":\"XAJIBESAAR\",\"id\":\"32\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"17\"},\"XAJIYEREMAAR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1437.jpg\",\"assetName\":\"XAJIYEREMAAR\",\"id\":\"30\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"9\"},\"GOXCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1406.jpg\",\"assetName\":\"GOXCARD\",\"id\":\"29\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"18\"},\"ZAIFCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1431.jpg\",\"assetName\":\"ZAIFCARD\",\"id\":\"28\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"20\"},\"LTBCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1433.jpg\",\"assetName\":\"LTBCARD\",\"id\":\"27\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"22\"},\"BEARWHALECD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1425.jpg\",\"assetName\":\"BEARWHALECD\",\"id\":\"26\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"21\"},\"ETHXCPCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1430.jpg\",\"assetName\":\"ETHXCPCARD\",\"id\":\"25\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"12\"},\"BLOCKSIZECD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1429.jpg\",\"assetName\":\"BLOCKSIZECD\",\"id\":\"24\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"19\"},\"RIPPLECARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1428.jpg\",\"assetName\":\"RIPPLECARD\",\"id\":\"23\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"LEGENDARY\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"22\"},\"CNPCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1427.jpg\",\"assetName\":\"CNPCARD\",\"id\":\"22\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"RARE\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"7\"},\"SHUMAICARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1423.jpg\",\"assetName\":\"SHUMAICARD\",\"id\":\"21\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"16\"},\"CLEFCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1421.jpg\",\"assetName\":\"CLEFCARD\",\"id\":\"20\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"EPIC\",\"element\":\"LIGHT\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"18\"},\"SATOSHICARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1400.jpg\",\"assetName\":\"SATOSHICARD\",\"id\":\"19\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"LEGENDARY\",\"element\":\"DARK\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"26\"},\"SWARMCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1418.jpg\",\"assetName\":\"SWARMCD\",\"id\":\"18\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"14\"},\"XCPCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1419.jpg\",\"assetName\":\"XCPCARD\",\"id\":\"17\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"9\"},\"GEMZCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1417.jpg\",\"assetName\":\"GEMZCARD\",\"id\":\"16\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"EPIC\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"13\"},\"FDCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1401.jpg\",\"assetName\":\"FDCARD\",\"id\":\"15\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"LEGENDARY\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"10\"},\"XAJIARKETAAR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1436.jpg\",\"assetName\":\"XAJIARKETAAR\",\"id\":\"14\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"12\"},\"XAJIJASPAAR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1435.jpg\",\"assetName\":\"XAJIJASPAAR\",\"id\":\"13\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"20\"},\"XAJIBASILAAR\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1434.jpg\",\"assetName\":\"XAJIBASILAAR\",\"id\":\"12\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"10\"},\"BAZAARCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1440.jpg\",\"assetName\":\"BAZAARCARD\",\"id\":\"11\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"2\",\"health\":\"17\"},\"ETHEREUMCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1420.jpg\",\"assetName\":\"ETHEREUMCARD\",\"id\":\"10\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"19\"},\"SJCXCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1416.jpg\",\"assetName\":\"SJCXCARD\",\"id\":\"9\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"26\"},\"XAJIBOSS\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1439.jpg\",\"assetName\":\"XAJIBOSS\",\"id\":\"8\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"32\"},\"BTCDRAGONCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1607.jpg\",\"assetName\":\"BTCDRAGONCD\",\"id\":\"4\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"RARE\",\"element\":\"FIRE\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"24\"},\"GENESISCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1424.jpg\",\"assetName\":\"GENESISCARD\",\"id\":\"3\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"1\",\"health\":\"24\"},\"LTCDRAGON\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1457.jpg\",\"assetName\":\"LTCDRAGON\",\"id\":\"2\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"EPIC\",\"element\":\"ICE\",\"expansion\":\"35243\",\"speed\":\"0\",\"health\":\"22\"},\"TALISMANCARD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1610.jpg\",\"assetName\":\"TALISMANCARD\",\"id\":\"1\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":0,\"rarity\":\"LEGENDARY\",\"element\":\"EARTH\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"19\"},\"SHAPESHIFTCD\":{\"image\":\"http:\\\/\\\/api.moonga.com\\\/RCT\\\/cp\\\/cards\\\/view\\\/normal\\\/large\\\/en\\\/1422.jpg\",\"assetName\":\"SHAPESHIFTCD\",\"id\":\"0\",\"localisedText\":{\"en\":\"placeholder text\",\"fr\":\"Texte placeholder\"},\"Divisible\":\"1\",\"rarity\":\"EPIC\",\"element\":\"WATER\",\"expansion\":\"35243\",\"speed\":\"3\",\"health\":\"11\"}}}}}";
      var envObject = JSON.parse(resString);

       this.continueLoad(envObject);
console.log("error balance");
 this.dataService.maincontroller.loading  = false;
      },
     () => {});
 

  
 

  }
  continueLoad(data:any){


 this.dataService.maincontroller.loading = false;
this.dataService.maincontroller.ownedOrbsEnv = new Array<any>();
var currentData = data["Environements"][this.dataService.maincontroller.currentBundleId];
if(currentData != null){
     var definition = currentData.Definition;

     if(definition.assetOrientation == "landscape"){
this.dataService.landscape = true;
 this.defaultImage = this.dataService.getImage('cardbackLandscape');
 }else{
this.dataService.landscape = false;
this.defaultImage = this.dataService.getImage('cardback');

 }
    this.setWidths();

 this.dataService.maincontroller.currentCurrency = definition.MasterCurrency;

 this.dataService.maincontroller.getPriceForCurrency(this.dataService.maincontroller.currentCurrency);
  this.dataService.maincontroller.currentAbrev = definition.ticker;
   this.dataService.maincontroller.currentCurrencyImg = "";
 
      this.dataService.maincontroller.currentOrbs = data["Environements"][this.dataService.maincontroller.currentBundleId].Assets;
       
       this.dataService.maincontroller.allOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);

       if(this.dataService.market != null){
      this.dataService.market.setMarketData();
      }

        for(var i = 0; i < this.dataService.maincontroller.userBalance.length; i++){

          let anOwnedToken = this.dataService.maincontroller.userBalance[i];
          if(this.dataService.maincontroller.currentOrbs[anOwnedToken.token]){
          this.dataService.maincontroller.ownedOrbsEnv[anOwnedToken.token]=this.dataService.maincontroller.currentOrbs[anOwnedToken.token];
          }
          
      }
     
     if(this.allOrbs == false){
      this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.ownedOrbsEnv);

     }else{
      this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
     }


          

             if(this.dataService.maincontroller.currentAddress == "empty"){
           this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
         
          
      this.allOrbs = true;
      this.allOwnImage = this.dataService.getImage('rightOptionSeg');

    }
}
var tmpthis = this;
 setTimeout(function () {
tmpthis.addPull();
}, 1000);

  }
  getImgSource(img:string){
   return img;
 

  }
  getImage(obj:any){

    return obj.image;
  }
   
  showORB(selectedOrb:any,selectedKey:string){
        
    this.dataService.maincontroller.currentBalance =  this.dataService.maincontroller.getUserBalance(selectedKey);
    this.dataService.maincontroller.selectedOrb = selectedOrb;
    this.dataService.maincontroller.selectedKey = selectedKey;
    this.dataService.maincontroller.reloadViews(); 
    this.dataService.maincontroller.showSelected = true; 

    
  }
  showNoOrbs(){
    if(this.dataService.maincontroller.loading ){
      return false;
    }
    if(this.dataService.maincontroller.currentOrbsKeys){
       if(this.dataService.maincontroller.currentOrbsKeys.length == 0){


        return true;
       }
       else{
           return false;
       }
    }
    else{
      return true;
    }
  }
  selectOwn(){
 this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.ownedOrbsEnv);
        
      this.allOrbs = false;
      this.allOwnImage =this.dataService.getImage('leftOptionSeg');
  }
  selectAll(){
      this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
          
      this.allOrbs = true;
      this.allOwnImage = this.dataService.getImage('rightOptionSeg');
  }
  selectAllOwn(){
    if(this.allOrbs == true){
      this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.ownedOrbsEnv);
        
      this.allOrbs = false;
      this.allOwnImage =this.dataService.getImage('leftOptionSeg');
    }
    else{
   

       this.dataService.maincontroller.currentOrbsKeys = Object.keys(this.dataService.maincontroller.currentOrbs);
          
      this.allOrbs = true;
      this.allOwnImage = this.dataService.getImage('rightOptionSeg');
    }
  }



}
