

var counterpartyParser = function() {
	var tools = foo;
var bitcoin = tools.bitcoin;
var crypto = bitcoin.crypto;
var txObject;
 var UTXOSs = [];
    var spentUTXOSs = [];
   var  inputAmount = 0;
     var  outputAmount = 0;
     var fee = 0;
     var increase = 0;
     var  includedInput;
     var includedInputAmount;
     var newInputAmount = 0;
     var newTx;
     var sourceAddress;
     var bumbFeeCallback;
 function counterpartyParser() {

 }
arc4 = function(key, data) {
	if(typeof key == 'string') key = tools.buffer(key, 'hex');
	if(typeof data == 'string') data = tools.buffer(data, 'hex');
	var S = [];
	for(var i=0; i<256; i++) {
		S[i] = i;
	}
	for(var i=0,j=0; i<256; i++) {
		j = (j + S[i] + key[i % key.length]) % 256;
		[S[i], S[j]] = [S[j], S[i]];
	}
	var ret = [];
	for(var x=0,i=0,j=0; x<data.length; x++) {
		i = (i + 1) % 256;
		j = (j + S[i]) % 256;
		[S[i], S[j]] = [S[j], S[i]];
		var K = S[(S[i] + S[j]) % 256];
		ret.push(data[x] ^ K);
	}
	return tools.buffer(ret);
};

	counterpartyParser.prototype.parse = function(rawtx) {

 
		var network = 'mainnet';
	var rawdata = [];
		var txObj = bitcoin.Transaction.fromHex(rawtx);

		 var destination = null;
	var rawdata = tools.buffer.alloc(0);

 		var key = tools.bufferReverse(txObj.ins[0].hash);
 		console.log(key);
 		txObj.outs.forEach(function (out, idx) {


		var type = bitcoin.script.classifyOutput(out.script);
		if(type == 'pubkeyhash') {
			if(!destination && rawdata.length===0) {
				destination = {
					address: bitcoin.address.toBase58Check(out.script.slice(3, 23), {mainnet: 0x00, testnet: 0x6f}[network]),
					amount: out.value,
				};
			}
		}
		if(type == 'nulldata') {
			rawdata = cplib.counterjs.util.arc4(key, bitcoin.script.decompile(out.script)[1]);
		}
		if(type == 'multisig') {
			var decrypted = cplib.counterjs.util.arc4(key, Buffer.concat([out.script.slice(3, 33), out.script.slice(36, 68)]));
			rawdata = Buffer.concat([rawdata, decrypted.slice(1, 1+decrypted[0])]);
		}

 		}); 

 			console.log(rawdata);

 			var message;
	try {
		message = cplib.counterjs.Message.fromSerialized(rawdata);
	} catch(e) {
		alert(e);
		// maybe non-Counterparty tx.
	}
 	 console.log(message);
 	  console.log(message.toJSON());

	}


 

 return counterpartyParser;

}();
 

 

