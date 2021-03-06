import { Component, OnInit } from '@angular/core';
import { HTTPService } from "../services/http.service";

import { PersistenceService, StorageType } from 'angular-persistence'
import * as CryptoJS from 'crypto-js';
import { DataService } from '../services/data.service';;
declare var Mnemonic: any;
declare var booTools: any;
declare var IndieSquare: any;
declare var QRious: any;
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  providers: [HTTPService],
  styleUrls: ['./intro.component.css']

})
export class IntroComponent implements OnInit {
  bitcoin = booTools.bitcoin;
  currentField = 0;
  passphraseFull = "";
  showIntroButtons = true;
  showPasswordDecryptField = false;
  showPassphraseField = false;
  showPasswordField = false;
  passphraseStatus = "";
  showNewPassphrase = false;
  decryptStatus = "";
  passphrase = "";
  password = "";
  confPassword = "";
  userAgent = "";
  testObj: any;
  linkText = "";
  isIndiesquare = false;
  qrUrl = "";
  wordCheck = " ";
  showNewAccountNext = false;
  wordValid = false;
  cipherText = "";
  word1 = "";
  word2 = "";
  word3 = "";
  word4 = "";
  word5 = "";
  word6 = "";
  word7 = "";
  word8 = "";
  word9 = "";
  word10 = "";
  word11 = "";
  word12 = "";


  constructor(public dataService: DataService, private httpService: HTTPService, private persistenceService: PersistenceService) {


  }
  checkWord(val: string) {

    if (this.dataService.checkMnemonicWord(val) == true) {
      this.wordValid = true;
      this.wordCheck = "Valid!";


    } else {
      this.wordValid = false;
      this.wordCheck = this.currentField + "/12";
    }
  }
  nextWord() {


    if (this.passphraseFull.length > 0) {



      this.passphrase = this.passphraseFull;


      try {


        this.dataService.maincontroller.currentAddress = this.dataService.createAddressFromPassphrase(this.passphrase);
        this.showIntroButtons = false;
        this.showPassphraseField = false;
        this.showPasswordField = true;
        this.passphraseStatus = "";
        this.cipherText = "";

      }
      catch (e) {
        alert("error creating passphrase");

      }




      return;
    }

    this.wordCheck = this.currentField + "/12";
    if (this.currentField == 12) {

      this.passphrase = this.word1 + " " + this.word2 + " " + this.word3 + " " + this.word4 + " " + this.word5 + " " + this.word6 + " " + this.word7 + " " + this.word8 + " " + this.word9 + " " + this.word10 + " " + this.word11 + " " + this.word12;
      this.showPassphraseField = false;
      this.showPasswordField = true;
      return;

    }
    if (this.wordValid) {
      this.currentField++;
    } else {
      alert("word not valid");
      return;
    }

    this.wordValid = false;
    if (this.currentField == 12) {
      this.checkWord(this.word12);
    }
    else if (this.currentField == 11) {
      this.checkWord(this.word11);
    }
    else if (this.currentField == 10) {
      this.checkWord(this.word10);
    }
    else if (this.currentField == 9) {
      this.checkWord(this.word9);
    }
    else if (this.currentField == 8) {
      this.checkWord(this.word8);
    }
    else if (this.currentField == 7) {
      this.checkWord(this.word7);
    }
    else if (this.currentField == 6) {
      this.checkWord(this.word6);
    }
    else if (this.currentField == 5) {
      this.checkWord(this.word5);
    }
    else if (this.currentField == 4) {
      this.checkWord(this.word4);
    }
    else if (this.currentField == 3) {
      this.checkWord(this.word3);
    }
    else if (this.currentField == 2) {
      this.checkWord(this.word2);
    }
    else if (this.currentField == 1) {
      this.checkWord(this.word1);
    }


  }
  prevWord() {
    this.currentField--;
    if (this.currentField == 0) {
      this.backToStart();
      return;
    }

    if (this.currentField == 12) {
      this.checkWord(this.word12);
    }
    else if (this.currentField == 11) {
      this.checkWord(this.word11);
    }
    else if (this.currentField == 10) {
      this.checkWord(this.word10);
    }
    else if (this.currentField == 9) {
      this.checkWord(this.word9);
    }
    else if (this.currentField == 8) {
      this.checkWord(this.word8);
    }
    else if (this.currentField == 7) {
      this.checkWord(this.word7);
    }
    else if (this.currentField == 6) {
      this.checkWord(this.word6);
    }
    else if (this.currentField == 5) {
      this.checkWord(this.word5);
    }
    else if (this.currentField == 4) {
      this.checkWord(this.word4);
    }
    else if (this.currentField == 3) {
      this.checkWord(this.word3);
    }
    else if (this.currentField == 2) {
      this.checkWord(this.word2);
    }
    else if (this.currentField == 1) {
      this.checkWord(this.word1);
    }


  }
  showLinkageIcon() {
    if (this.dataService.isMobile == true) {
      return false;
    }

    if (this.qrUrl != "") {
      return true;
    }
    return false;

  }
  getXPosForField(field: number) {
    var fieldWidth = document.getElementById("word1").clientWidth / 2;

    if (this.currentField == field) {


      return ((document.documentElement.clientWidth / 2) - fieldWidth) + "px";
    }
    else if (field < this.currentField) {
      return ((fieldWidth * -1) * 3) + "px";
    }
    else {
      return "100vw";
    }
  }
  showEnterPassphrase() {
    this.showIntroButtons = false;
    this.showPassphraseField = true;
    this.currentField = 1;
    this.wordCheck = this.currentField + "/12";
  }
  linkIndieSquare() {

    this.linkText = "linking with IndieSquare...";
    var tempThis = this;

    this.isIndiesquare = true;
    var indiesquare = new IndieSquare({
      'apikey': this.httpService.apiKey
    });

    indiesquare.getAddress('Book of Orbs', function(url, urlScheme, error) {
      if (error) {
        console.log("error" + error);

        return;
      } else {

        if (tempThis.dataService.isMobile == false) {
          tempThis.linkText = "scan the qrcode with your IndieSquare Wallet's linking button";
          console.log("went here" + url);
          tempThis.qrUrl = url;
          //show qrcode here;
          var qr = new QRious({
            element: document.getElementById('qr1'),
            value: tempThis.qrUrl,
            size: 250
          });

        }
      }







    }, function(result, error) {
      tempThis.qrUrl = "";
      if (error) {
        tempThis.isIndiesquare = false;
        console.error(error);
        alert("error please try again");
        return;
      } else {

        var addressObject = { "address": result.address, "index": 0 };
        tempThis.persistenceService.set('userAddress', JSON.stringify(addressObject), { type: StorageType.LOCAL });

        tempThis.persistenceService.set('linkType', "indiesquare", { type: StorageType.LOCAL });

        tempThis.dataService.maincontroller.currentAddress = result.address;
        tempThis.dataService.maincontroller.linkType = "indiesquare";
        tempThis.continueLogin();

      }


    });





  }

  getWord(word: number) {

    var word_tmp = this.passphrase.trim().split(/\s+/)[word - 1];

    return word_tmp;

  }

  getMessage() {

    return this.dataService.getLang("enter_a_secure_password");

  }
  ngOnInit() {

    if (document != undefined) {
      if (document.querySelector('input') != undefined) {
        document.querySelector('input').addEventListener('keydown', function(e) {
          if (e.which == 9) {
            e.preventDefault();
          }
        });
      }
    }


    if (this.dataService.dev == true) {

    }
    this.isIndiesquare = false;

    this.testObj = [];



  }

  linkIndiesquare() {


    this.testObj["userAgent"] = navigator.userAgent;

    if (this.testObj["userAgent"].indexOf("IndieSquare") != -1) {
      var tempDataService = this.dataService;
      var tempThis = this;

      this.isIndiesquare = true;
      var indiesquare = new IndieSquare({
        'apikey': this.httpService.apiKey
      });

      indiesquare.getAddress('Book of Orbs', function(url, urlScheme, error) {
        if (error) {
          alert("er " + error);
          console.log("error" + error);

          return;
        } else {
          console.log("went here" + url);
        }




      }, function(result, error) {

        if (error) {
          alert("er " + error);
          console.error(error);
          return;
        } else {


          tempDataService.maincontroller.currentAddress = result.address;
          tempDataService.maincontroller.linkType = "indiesquare";
          tempDataService.maincontroller.loading = true;
          tempDataService.maincontroller.currentOrbs = [];
          tempDataService.maincontroller.currentOrbsKeys = [];
          tempThis.continueLogin();


        }


      });
    }

  }

  goToIndieSquare() {

    var isIphone = /iPhone/i.test(window.navigator.userAgent);
    var isAndroid = /Android/i.test(window.navigator.userAgent);
    if (isIphone) {
      window.location.href = "https://itunes.apple.com/app/kauntao-cai-bu/id977972108";
    }
    else if (isAndroid) {
      window.location.href = "https://play.google.com/store/apps/details?id=inc.lireneosoft.counterparty";

    }
    else {
      window.location.href = "https://wallet.indiesquare.me/";
    }

  }
  backToStart() {
    this.passphrase = "";
    this.showNewPassphrase = false;
    this.showIntroButtons = true;
    this.showPassphraseField = false;
  }

  createNewAccount() {

    this.showNewAccountNext = false;

    this.showNewPassphrase = true;
    this.showPassphraseField = false;

    this.passphrase = this.dataService.generateMnemonic();

    var tmpthis = this;
    this.dataService.maincontroller.currentAddress = this.dataService.createAddressFromPassphrase(this.passphrase);
    setTimeout(function() {
      tmpthis.showNewAccountNext = true;
    }, 3000);


  }


  continueLogin() {

    this.dataService.maincontroller.showTopBar = true;
    this.dataService.maincontroller.showBottomBar = true;
    this.dataService.maincontroller.showCollection = true;
    this.dataService.currentTab = 1;
    this.dataService.maincontroller.showIntro = false;
    var tmpdata = this.dataService;
    setTimeout(function() {
      tmpdata.maincontroller.loadEnvironments();
    }, 500);

  }
  enterPassphrase() {
    this.showIntroButtons = false;
    this.showPassphraseField = true;
  }


  checkPassphrase() {
    this.showNewPassphrase = false;

    this.passphraseStatus = "";


		try {

      this.dataService.maincontroller.currentAddress = this.dataService.createAddressFromPassphrase(this.passphrase);
      this.showIntroButtons = false;
      this.showPassphraseField = false;
      this.showPasswordField = true;
      this.passphraseStatus = "";
      this.cipherText = "";

		}
		catch (e) {

      this.passphraseStatus = e;

    }


  }


  updatePhraseEnter(val: string) {

    this.checkWord(val);



  }

  encryptPassphrase() {

    if (this.password.length < 7) {

      alert(this.dataService.getLang("password_please_enter"));
      return;
    }
    if (this.password != this.confPassword) {

      alert(this.dataService.getLang("password_dontmatch"));
      return;
    }

    this.cipherText = CryptoJS.AES.encrypt(this.passphrase, this.password).toString();



    try {



      this.dataService.maincontroller.currentAddress = this.dataService.createAddressFromPassphrase(this.passphrase);

      if (this.dataService.resetHDAddresses(this.passphrase) == true) {
        this.dataService.maincontroller.currentAddressIndex = 0;

        this.persistenceService.set('userPassphrase', this.cipherText, { type: StorageType.LOCAL });

        var addressObject = { "address": this.dataService.maincontroller.currentAddress, "index": 0 };

        this.persistenceService.set('userAddress', JSON.stringify(addressObject), { type: StorageType.LOCAL });

        this.persistenceService.set('linkType', "passphrase", { type: StorageType.LOCAL });

        this.dataService.maincontroller.linkType = "passphrase";

        this.continueLogin();
      }

    }
    catch (e) {

      alert("error creating wallet");
      return;
    }
  }
  copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);

  }
}
