import { KEYUTIL } from 'jsrsasign';
import { KJUR } from 'jsrsasign';

export const sign = async () => {
  var rsaKeypair = KEYUTIL.generateKeypair('RSA', 2048);

  // RSA signature generation
  var sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
  console.log(sig);

  var publicKey = rsaKeypair.pubKeyObj;
  console.log(publicKey);
  var privateKey = rsaKeypair.prvKeyObj;
  console.log(privateKey);

  sig.init(privateKey);
  sig.updateString('hallo');
  var signature = sig.sign();
  console.log(signature);

  // DSA signature validation
  var sig2 = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
  sig2.init(publicKey);
  sig2.updateString('hallo');
  var isValid = sig2.verify(signature);
  console.log(isValid);
};
