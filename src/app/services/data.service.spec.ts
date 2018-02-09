import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../services/data.service';

import { HttpModule } from '@angular/http';
import { HTTPService } from "../services/http.service";

declare var Mnemonic: any;

describe('DataService', () => {

  var passphrase = "guitar pay throughout blank enjoy relationship flame work smoke tease football inside";
  var unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000306a2e5e16fa2a3324e38f5d976207131b19c484b028a56427afaa7ef0aa139f960835306d8485b6cbf44676b907164669f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";
  var signedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000006b483045022100ed02b417825725ec9139b7cd418a99b35f2f69a4356ad9ed238116bd2a63305d02206280615f3647585414899ecf6e77f93250934e2aff233f178bb93b18cc81255e01210368ef609453c7eadaa90653f21a38620449d5b0c430ceb531112c3da95e8651adfdffffff020000000000000000306a2e5e16fa2a3324e38f5d976207131b19c484b028a56427afaa7ef0aa139f960835306d8485b6cbf44676b907164669f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

  it(`test correct send token transaction`, async(() => {
    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "12sWrxRY7E7Nhmuyjbz4TtGE9jRewGqEZD",
      "token": "SARUTOBICARD",
      "quantity": "1",
      "divisible": 1,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(signed_tx).toEqual(signedTx);

    });


  }));

  it(`test send token transaction with incorrect token`, async(() => {
    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "12sWrxRY7E7Nhmuyjbz4TtGE9jRewGqEZD",
      "token": "SATOSHICARD",
      "quantity": "1",
      "divisible": 1,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");

    });


  }));

  it(`test send token transaction with incorrect quantity`, async(() => {
    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "12sWrxRY7E7Nhmuyjbz4TtGE9jRewGqEZD",
      "token": "SARUTOBICARD",
      "quantity": "10",
      "divisible": 1,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");

    });


  }));

  it(`test send token transaction with incorrect address`, async(() => {
    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "14JRsWbBapWRC6HMDU2mx5XW9VL1rGtB6p",
      "token": "SARUTOBICARD",
      "quantity": "1",
      "divisible": 1,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");

    });


  }));

  it(`test send token transaction with incorrect divisible`, async(() => {
    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "12sWrxRY7E7Nhmuyjbz4TtGE9jRewGqEZD",
      "token": "SARUTOBICARD",
      "quantity": "1",
      "divisible": 0,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");


    });


  }));



  it(`test correct order transaction`, async(() => {
    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";
    signedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000006a47304402200a32ba33b4cc99fba5ef82ac720f2b2b4dd6b66318798048b78610f1360158b6022057ea502570399e602f40452f0cd0a82d263b7b182ae318566101ff958e3d35f001210368ef609453c7eadaa90653f21a38620449d5b0c430ceb531112c3da95e8651adfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "order",
      "get_token": "BITCRYSTALS",
      "get_quantity": 1,
      "give_token": "SARUTOBICARD",
      "give_quantity": 1,
      "get_divisible": true,
      "give_divisible": true,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(signed_tx).toEqual(signedTx);


    });


  }));


  it(`test order transaction with incorrect get_quantity`, async(() => {
    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "order",
      "get_token": "BITCRYSTALS",
      "get_quantity": 2,
      "give_token": "SARUTOBICARD",
      "give_quantity": 1,
      "get_divisible": true,
      "give_divisible": true,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");


    });


  }));

  it(`test order transaction with incorrect give_quantity`, async(() => {
    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "order",
      "get_token": "BITCRYSTALS",
      "get_quantity": 1,
      "give_token": "SARUTOBICARD",
      "give_quantity": 2,
      "get_divisible": true,
      "give_divisible": true,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");


    });


  }));

  it(`test order transaction with incorrect get_token`, async(() => {
    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "order",
      "get_token": "XCP",
      "get_quantity": 1,
      "give_token": "SARUTOBICARD",
      "give_quantity": 1,
      "get_divisible": true,
      "give_divisible": true,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");


    });


  }));

  it(`test order transaction with incorrect give_token`, async(() => {
    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "order",
      "get_token": "BITCRYSTALS",
      "get_quantity": 1,
      "give_token": "XCP",
      "give_quantity": 1,
      "get_divisible": true,
      "give_divisible": true,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");


    });


  }));

  it(`test order transaction with incorrect get divisible`, async(() => {
    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "order",
      "get_token": "BITCRYSTALS",
      "get_quantity": 1,
      "give_token": "SARUTOBICARD",
      "give_quantity": 1,
      "get_divisible": false,
      "give_divisible": true,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");


    });


  }));

  it(`test order transaction with incorrect give divisible`, async(() => {
    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var service = new DataService();

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "order",
      "get_token": "BITCRYSTALS",
      "get_quantity": 1,
      "give_token": "SARUTOBICARD",
      "give_quantity": 1,
      "get_divisible": true,
      "give_divisible": false,
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");


    });


  }));



  it(`test correct btc transaction`, async(() => {
    var service = new DataService();

    unsignedTx = "0100000001ff65dc103ac773f06ef674498c10c5fed3bd2d4782509f4148472f4858b78a9f000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff0210270000000000001976a9141485d9d03b41aaa9dca7d70d7f63ff4a0826100e88ac6fc20000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";
    signedTx = "0100000001ff65dc103ac773f06ef674498c10c5fed3bd2d4782509f4148472f4858b78a9f000000006b483045022100eb168f4d99650730f2ae3530bcbcc63e3dd2fa148a344f1bbcd054a9d8094bca0220589582bb5e9216fab0421f50ee810c618f5d0c366fb071733146e89a5e52302c01210368ef609453c7eadaa90653f21a38620449d5b0c430ceb531112c3da95e8651adfdffffff0210270000000000001976a9141485d9d03b41aaa9dca7d70d7f63ff4a0826100e88ac6fc20000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "12sWrxRY7E7Nhmuyjbz4TtGE9jRewGqEZD",
      "token": "BTC",
      "quantity": "0.0001",
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(signed_tx).toEqual(signedTx);

    });


  }));

  it(`test btc transaction with incorrect address`, async(() => {
    var service = new DataService();

    unsignedTx = "0100000001ff65dc103ac773f06ef674498c10c5fed3bd2d4782509f4148472f4858b78a9f000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff0210270000000000001976a9141485d9d03b41aaa9dca7d70d7f63ff4a0826100e88ac6fc20000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "14JRsWbBapWRC6HMDU2mx5XW9VL1rGtB6p",
      "token": "BTC",
      "quantity": "0.0001",
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("transaction address does not match parameters");

    });


  }));

  it(`test btc transaction with incorrect amount`, async(() => {
    var service = new DataService();

    unsignedTx = "0100000001ff65dc103ac773f06ef674498c10c5fed3bd2d4782509f4148472f4858b78a9f000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff0210270000000000001976a9141485d9d03b41aaa9dca7d70d7f63ff4a0826100e88ac6fc20000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "send",
      "destination": "12sWrxRY7E7Nhmuyjbz4TtGE9jRewGqEZD",
      "token": "BTC",
      "quantity": "0.1",
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("transaction amounts do not match parameters");

    });


  }));

  it(`test correct cancel transaction`, async(() => {
    var service = new DataService();

    unsignedTx = "0100000001e7aefb92d8c751751c5fb339f46a93c5ef90fb1e62f2da0700bdfd82b7831a8e010000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff0200000000000000002b6a2982e97512389b661003491c440baa1d0dc58630bed9dfaca171bae9086059d07d435e8cbcd1c1896e2b84a80000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";
    signedTx = "0100000001e7aefb92d8c751751c5fb339f46a93c5ef90fb1e62f2da0700bdfd82b7831a8e010000006a47304402202d6978fd0254eb45a2cd80e5b5cb4059bfed23e4d9065a9bf267c24bdac064570220163e989f9c402a6f88a5d170a97766cc223dab0e5599723df5734fd45506996001210368ef609453c7eadaa90653f21a38620449d5b0c430ceb531112c3da95e8651adfdffffff0200000000000000002b6a2982e97512389b661003491c440baa1d0dc58630bed9dfaca171bae9086059d07d435e8cbcd1c1896e2b84a80000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "cancel",
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(signed_tx).toEqual(signedTx);

    });


  }));


  it(`test incorrect cancel transaction`, async(() => {
    var service = new DataService();

    unsignedTx = "0100000001334cdceeef5d9b14be183e2e989265f206851f2787351125f5cde5add8e26a68000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888acfdffffff020000000000000000356a335e16fa2a3324e38f55976207131b19c484b028a56427afaa7ef0be3dc05fd16692c4582261c37ec489f36b3056674d7bf3daf5f7250000000000001976a914243435b90147bfd8f8992a4654022f83397b6f1888ac00000000";

    var params = {
      "unsigned_tx": unsignedTx,
      "type": "cancel",
      "passphrase": passphrase
    }

    var result = service.signRawTransaction(params, function(error, signed_tx) {

      expect(error).toEqual("xcp details do not match parameters");

    });


  }));



  it(`test decrypt passphrase bip39 fr`, async(() => {
    var service = new DataService();

    var encrypted = "U2FsdGVkX19TAT0XuqXCI3inQ6CLdcWGOB1AYqfPzu0EjtZzF8hQzciG+7OpDFO/AMxaBjFF/rBMPvROTtR165i6ItKXG6eAbIiFOlHrC9+iR8xTDQhEXtICbCwP24VafkE9kr8BYqSK/gWmGJ/HeQ==";


    var result = service.decryptPassphrase(encrypted, "password");

    expect(result).toEqual("prologue omettre vignette rituel minorer socle miracle effigie climat tiroir échelle pipette");



  }));


  it(`test decrypt passphrase bip39 ja`, async(() => {
    var service = new DataService();

    var encrypted = "U2FsdGVkX1+T7xValOHsMtqP10KLzlZYlJGP5o3TvIgNpLrWA03GYH/Hu02NMsGc/MLMy+o4RlAlhkmE2Ha/8vmi2J6FDSh8sV6xdMN6JZG4s4yqSY+o3AEkmcvTBQgUQNIxV/fiU1hyMtn9xcETxlsC+t1rvSG9laaOL4iQngwa+lTpvHCgUBscuyT5NzirtbwhDMOn6UwWe6HNKGcZ8Kem/bjqvnKnkC51KdBYd+MFbejJUl5Qy8+xn4fzsVdW";

    var result = service.decryptPassphrase(encrypted, "password");

    expect(result).toEqual("はけん　にあう　あずき　なまえ　いらい　みなと　ぎしき　りんご　にんち　むちゅう　そいとげる　かようび");



  }));


  it(`test get address from passphrase bip39 fr`, async(() => {
    var service = new DataService();

    var passphrase = "prologue omettre vignette rituel minorer socle miracle effigie climat tiroir échelle pipette";

    var result = service.createAddressFromPassphrase(passphrase);

    expect(result).toEqual("15iMXe3irDmNzHfdP7skU6SDzYppWoYvJ1");



  }));


  it(`test get address from passphrase bip39 ja`, async(() => {
    var service = new DataService();

    var passphrase = "はけん　にあう　あずき　なまえ　いらい　みなと　ぎしき　りんご　にんち　むちゅう　そいとげる　かようび";

    var result = service.createAddressFromPassphrase(passphrase);

    expect(result).toEqual("1Mw1ASK8nfLzEGbKuD3FJ9y7A3qHDGA75e");



  }));

  it(`test get address from passphrase bip39 en`, async(() => {

    var service = new DataService();

    var passphrase = "pioneer acid organ walk panda female purity ecology gadget blind opinion range";

    var result = service.createAddressFromPassphrase(passphrase);

    expect(result).toEqual("1GT8u3CSqnNvi9xyBtwLWgyc7fz5JYopeL");


  }));


  it(`test get address from passphrase legacy en`, async(() => {

    var service = new DataService();

    var passphrase = "guitar pay throughout blank enjoy relationship flame work smoke tease football inside";

    var result = service.createAddressFromPassphrase(passphrase);

    expect(result).toEqual("14JRsWbBapWRC6HMDU2mx5XW9VL1rGtB6p");


  }));


  it(`test get address from 2 passphrases doest get same address `, async(() => {

    var service = new DataService();

    var passphrase = "pioneer acid organ walk panda female purity ecology gadget blind opinion range";

    var result = service.createAddressFromPassphrase(passphrase);

    var passphrase2 = "はけん　にあう　あずき　なまえ　いらい　みなと　ぎしき　りんご　にんち　むちゅう　そいとげる　かようび";

    var result2 = service.createAddressFromPassphrase(passphrase2);


    expect(result).not.toEqual(result2);


  }));










});



