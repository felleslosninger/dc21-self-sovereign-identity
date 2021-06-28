import { RSA } from 'react-native-digital-signature';
import { RSAKeychain } from 'react-native-digital-signature';


//export function encrypting() {
let message = "my secret message";

RSA.generateKeys(4096) // set key size
.then(keys => {
    console.log('4096 private:', keys.private); // the private key
    console.log('4096 public:', keys.public); // the public key
    RSA.encrypt(message, keys.public)
    .then(encodedMessage => {
        console.log(`the encoded message is ${encodedMessage}`);
        RSA.decrypt(encodedMessage, keys.private)
        .then(decryptedMessage => {
            console.log(`The original message was ${decryptedMessage}`);
        });
    });
});
//};

export function main() {
    let keyTag = 'com.domain.mykey';
    let message = "message to be verified";

    let publicKey = generateKeyPair(keyTag);
    // Share the generated public key with third parties as desired.

    let messageSignature = RSAKeychain.sign(message, keyTag);

    if (RSAKeychain.verify(messageSignature, message, keyTag)) {
        // The signature matches: trust this message.
    } else {
        // The signature does not match.
    }

    RSAKeychain.deletePrivateKey(keyTag);
}

export function generateKeyPair(keyTag) {
    let keys = RSAKeychain.generate(keyTag);
    return keys.public;
}

