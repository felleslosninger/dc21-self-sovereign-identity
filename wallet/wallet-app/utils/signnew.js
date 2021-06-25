var rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);

// RSA signature generation
var sig = new KJUR.crypto.Signature({"alg": "SHA1withRSA"});
sig.init(prvKeyPEM);
sig.updateString('aaa');
var hSigVal = sig.sign();