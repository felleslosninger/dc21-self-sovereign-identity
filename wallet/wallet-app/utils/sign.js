import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { RSA, RSAKeychain } from 'react-native-rsa-native';

let secret = 'secret message';
let keyTag = 'com.domain.mykey';

export const signDemo = async () => {
    console.log('signDemo')
    const keys = await RSA.generate()
    const signature = await RSA.sign(secret, keys.private)
    console.log('signature', signature);
    const valid = await RSA.verify(signature, secret, keys.public)
    console.log('verified', valid);
  }