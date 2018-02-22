
import { Injectable } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { CollectionComponent } from '../collection/collection.component';
import { MarketComponent } from '../market/market.component';
import { MainControllerComponent } from '../main-controller/main-controller.component';
import { HistoryComponent } from '../history/history.component';
import * as CryptoJS from 'crypto-js';
declare var Mnemonic: any;
declare var booTools: any;
declare var UI: any;
declare var en: any;
declare var ja: any;
declare var RBFTools: any;
declare var counterpartyParser: any;


declare var CURRENTDATA: any;
declare var CURRENTSIG: any;
declare var SIGNCALLBACK: any;
declare var CURRENTCALLER: any;
declare var SIGNERROR: any;

@Injectable()
export class DataService {
  bitcoin = booTools.bitcoin;
  bitcoinMessage = booTools.bitcoinJSMessage;
  basePath = 'm/0\'/0/';
  versionNumber: string;
  history: HistoryComponent;
  topbar: TopBarComponent;
  collection: CollectionComponent;
  maincontroller: MainControllerComponent;
  market: MarketComponent;
  currentTab: number;
  isMobile: boolean;
  viewMode: boolean;
  landscape: boolean;
  uiclass: any;
  langclass: any;
  showIntroScreen: boolean;
  dev: boolean;
  rbf_tools: any;
  cp_tools: any;

  signCaller: any;

  constructor() {
    this.versionNumber = "0.13";
    this.currentTab = 1;

    this.uiclass = new UI();

    this.langclass = new ja();
    var language = window.navigator.language;


    if (language == "ja-JP") {
      this.langclass = new ja();
    } else {
      this.langclass = new en();
    }



    this.showIntroScreen = true;


    this.rbf_tools = new RBFTools();


    this.cp_tools = new counterpartyParser();

  }

  checkMnemonicWord(word: string) {


    if (Mnemonic.words.indexOf(word) != -1) {
      console.log("legacy");
      return true;
    }

    if (booTools.bip39.wordlists.EN.indexOf(word) != -1) {
      console.log("en");
      return true;
    }

    if (booTools.bip39.wordlists.JA.indexOf(word) != -1) {
      console.log("ja");
      return true;
    }


    if (booTools.bip39.wordlists.french.indexOf(word) != -1) {
      console.log("french");
      return true;
    }


    if (booTools.bip39.wordlists.italian.indexOf(word) != -1) {
      console.log("italian");
      return true;
    }


    if (booTools.bip39.wordlists.spanish.indexOf(word) != -1) {
      console.log("spanish");
      return true;
    }

    /*
       if (booTools.bip39.wordlists.korean.indexOf(word) != -1) {
       console.log("korean");
       return true;
       }
     
     
      if (booTools.bip39.wordlists.chinese_simplified.indexOf(word) != -1) {
       console.log("cs");
       return true;
       }
     
     
       if (booTools.bip39.wordlists.chinese_traditional.indexOf(word) != -1) {
       console.log("ct");
       return true;
       }*/



    return false;


  }
  generateMnemonic() {

    var language = window.navigator.language;

    var languageISOObject = language.split("-");

    var languageISO = language;

    if (languageISOObject.length! > 1) {

      languageISO = languageISOObject[0];

    }

    var wordList = booTools.bip39.wordlists.EN;

    if (languageISO == "ja") {
      wordList = booTools.bip39.wordlists.JA;
    }
    else if (languageISO == "fr") {
      wordList = booTools.bip39.wordlists.french;
    }
    else if (languageISO == "it") {
      wordList = booTools.bip39.wordlists.italian;
    }
    else if (languageISO == "es") {
      wordList = booTools.bip39.wordlists.spanish;
    }
    else if (languageISO == "ko") {
      wordList = booTools.bip39.wordlists.korean;
    }
    else if (languageISO == "zh-Hans") {
      wordList = booTools.bip39.wordlists.chinese_simplified;
    }
    else if (languageISO == "zh-Hant") {
      wordList = booTools.bip39.wordlists.chinese_traditional;
    }

    var mnemonic = booTools.bip39.generateMnemonic(undefined, undefined, wordList)


    return mnemonic;


  }


  createAddressFromPassphrase(passphrase: string) {

    var seed = this.getSeedFromPassphrase(passphrase);

    var root = this.bitcoin.HDNode.fromSeedHex(seed);

    var d = this.basePath + '0';
    var masterderive = root.derivePath(d);

    return masterderive.getAddress();


  }
  checkIfLegacyMnemonic(passphrase) {

    try {
      var words = passphrase.split(' ');
      var m = new Mnemonic(words);
      alert("ok");
    }
    catch (e) {
      alert(e);
    }


  }
  getSeedFromPassphrase(passphrase) {

    try {
      var words = passphrase.split(' ');

      var m = new Mnemonic(words);

      var seed = m.toHex();

      console.log("is legacy");

      return seed;

    } catch (e) {

      try {

        var seed = booTools.bip39.mnemonicToSeedHex(passphrase);

        console.log("is bip39");

        return seed;

      } catch (e) {

        throw e;

      }


    }

  }
  signRawTransaction(params, callback) {

    var seed = this.getSeedFromPassphrase(params.passphrase);

    var root = this.bitcoin.HDNode.fromSeedHex(seed);
    var currentIndex = 0;
    if (this.maincontroller != undefined) {
      currentIndex = this.maincontroller.currentAddressIndex;
    }
    var d = this.basePath + currentIndex;
    var masterderive = root.derivePath(d);
    var changeAddress = masterderive.getAddress();

    var unsignedTx = params.unsigned_tx;



    unsignedTx = this.rbf_tools.setRBF(unsignedTx);

    if (params.token != "BTC") {

      var check = false;
      if (params.type == "send") {

        check = this.cp_tools.checkSendTransaction(unsignedTx, "na", params.destination, params.token, parseFloat(params.quantity), params.divisible);
      }
      else if (params.type == "cancel") {
        check = this.cp_tools.checkCancelTransaction(unsignedTx);
      }
      else if (params.type == "order") {
        check = this.cp_tools.checkOrderTransaction(unsignedTx, changeAddress, params.get_token, params.get_quantity, params.give_token, params.give_quantity, params.get_divisible, params.give_divisible);
      }
      if (check == false) {
        callback("xcp details do not match parameters", null);
        return;
      }
    }

    console.dir('unsigned_tx:' + unsignedTx);



    var txObj = this.bitcoin.Transaction.fromHex(unsignedTx);
    var tmpthis = this;
    var totalBTCSent = 0;
    var totalBTCCheck = 0;

    if (params.quantity != undefined) {

      if (params.token != "BTC") {

        totalBTCCheck = 0;

      } else {

        totalBTCCheck = parseFloat(params.quantity) * 100000000;

      }

    }
    var error = null;
    txObj.outs.forEach(function(output, idx) {

      var type = tmpthis.bitcoin.script.classifyOutput(output.script);
      console.log(type);
      if (type == 'pubkeyhash' || type == 'scripthash') {
        var add = tmpthis.bitcoin.address.fromOutputScript(output.script);
        console.log(add);
        if (add != params.destination && add != changeAddress) {
          error = "transaction address does not match parameters";


        }
        if (add != changeAddress) {
          console.log("ov " + output.value);
          totalBTCSent += output.value;
        }

      }

    });

    if (error != null) {
      callback(error, null);
      return;
    }
    console.log(totalBTCSent);
    console.log(totalBTCCheck);
    if (totalBTCSent != totalBTCCheck) {
      callback("transaction amounts do not match parameters", null);
      return;
    }



    console.log(totalBTCSent);


    txObj.ins.forEach(function(input, idx) {
      input["sequence"] = 4294967293;
    });




    var keyPair = masterderive.keyPair;

    var txb = this.bitcoin.TransactionBuilder.fromTransaction(txObj)



    txb.inputs.forEach(function(input, idx) {

      txb.inputs[idx] = {}; // small hack to undo the fact that CP sets the output script in the input script

      try {
        txb.sign(idx, keyPair);
      } catch (e) {
        callback(e, null);
        return;
      }



    });


    var signedHex = txb.build().toHex();

    console.log(signedHex);

    callback(null, signedHex);




  }

  addressIsValid(address: string) {

    try {
      this.bitcoin.address.fromBase58Check(address);
    }
    catch (e) {
      return false;
    }


    return true;

  }

  setCurrentSignData(signData: string, callback: any, errorCallback: any, caller: any) {

    CURRENTDATA = signData;
    SIGNERROR = errorCallback;
    SIGNCALLBACK = callback;
    CURRENTCALLER = caller;




  }

  setLang(locale: string) {



  }

  decryptPassphrase(userPassphrase, userPassword) {


    var bytes = CryptoJS.AES.decrypt(userPassphrase, userPassword);

    userPassphrase = bytes.toString(CryptoJS.enc.Utf8);


    this.getSeedFromPassphrase(userPassphrase);

    return userPassphrase;



  }


  resetHDAddresses(passphrase: string) {

    var currentAddsArray = [];


    var newIndex = 0;






    var m;
    try {

      var seed = this.getSeedFromPassphrase(passphrase);
      var root = this.bitcoin.HDNode.fromSeedHex(seed);
      var d = this.basePath + newIndex;
      var masterderive = root.derivePath(d);
      var newAddress = masterderive.getAddress();
      currentAddsArray.push({ "address": newAddress, "index": newIndex });
      this.maincontroller.setPersistance("HDaddressesV1", JSON.stringify(currentAddsArray));
      return true;
    }
    catch (e) {
      alert("reset hd error");
      return false;
    }

  }


  addAddressToHDList(passphrase: string) {

    var currentAdds = this.maincontroller.getPersistance("HDaddressesV1");
    var currentAddsArray = [];
    if (currentAdds != "") {
      currentAddsArray = JSON.parse(currentAdds);
    }


    var newIndex = currentAddsArray.length;




    var words = null;
    if (passphrase != null) words = passphrase.split(' ');


    var m;
    try {

      m = new Mnemonic(words);

      var seed = m.toHex();
      var root = this.bitcoin.HDNode.fromSeedHex(seed);
      var d = this.basePath + newIndex;
      var masterderive = root.derivePath(d);
      var newAddress = masterderive.getAddress();

      currentAddsArray.push({ "address": newAddress, "index": newIndex });

      this.maincontroller.setPersistance("HDaddressesV1", JSON.stringify(currentAddsArray));

    }
    catch (e) {
      alert("error");
    }




  }



  getRemoteImage(image: string) {

    if (image == undefined) {
      return "";
    }
    if (image.indexOf("http://") != -1) {
      image = image.replace("http:", '');

    }

    if (image.indexOf("https://") != -1) {
      image = image.replace("https:", '');

    }

    return image + "?v" + this.versionNumber;

  }

  getImage(image: string) {

    return this.uiclass.getImage(image);

  }


  getLang(trans: string, param1 = "", param2 = "", param3 = "", param4 = "", param5 = "") {

    var val = this.langclass.getTrans(trans);
    val = val.replace('$1$', param1);
    val = val.replace('$2$', param2);
    val = val.replace('$3$', param3);
    val = val.replace('$4$', param4);
    val = val.replace('$5$', param5);

    return val;

  }



}