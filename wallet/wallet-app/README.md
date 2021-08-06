# Wallet

## Starting the application

NB. The set-up should be done on a computer that can connect to a wireless LAN to work on mobile

Communication with issuer and verifier requires that these servers are running. See own README-files. The IP-adress of the computer host is updated in `util/httpRequests.js`

1. Download [Node](https://nodejs.org/en/), if not installed
2. Install expo with the command line `npm install --global expo-cli`
3. Navigate to the wallet/wallet-app folder
4. Run the command line `npm install`, which will install dependencies
5. Run the command line `expo start` or `npm start`.  
   This will start the application and open the user interface for Expo in the browser.

### Run on web

1. Execute the steps from 'Starting the application'
2. To open on web, press "Open in web browser"

### Run on mobile

1. Execute the steps from 'Starting the application'
2. Download the Expo Go app on your phone
3. Check that the computer and phone is connected to the same LAN
4. Check that 'LAN' is selected in the Expo user interface
5. Scan the QR-code with the phone camera. Close app on phone and try scanning again if the app doesn't load correctly.

## Structure

-   components
    -   frames
    -   views
    -   other
-   redux
-   utils
-   App.js
-   AppWrapper.js

## Configuration

This React Native project is set up with settings for VSCode:

-   ESLint
-   Prettier - Code formatter

To enable these, install the extensions in VSCode.
