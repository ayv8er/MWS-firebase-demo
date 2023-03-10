# ReactJS Demo - Magic Wallet Services + Firebase Auth

Deployed URL: [https://mws-firebase-demo.vercel.app/](https://mws-firebase-demo.vercel.app/)

ReactJS, Magic Web SDK and Firebase Auth
Use Firebase Auth for user authentication, and Magic for wallet creation and key management.

## Prerequisites

A. Firebase

1. Create a [Firebase account](https://firebase.google.com/).
2. Go to the [console](https://console.firebase.google.com/) and create a project by clicking "Add project."
3. In the "Project Overview" page, add a Web app to get started and register your app by giving it a nickname.
4. Add a Firebase SDK (via npm or script tag) and retain your app's Firebase configuration held in `firebaseConfig`.
5. Click on "Project settings" under the settings of "Project Overview," and retain the `Project ID`.
6. In the Project Overview page, choose the Authentication product to add to your application.
7. Click "Get Started" and under the "Sign-in method" tab, enable "Email/Password" under "Native providers".
8. Link to [Firebase Auth JavaScript Web API documentation](https://firebase.google.com/docs/reference/js/auth.md?authuser=0&hl=en#auth_package)

B. Magic

1. Create a [Magic account](https://magic.link/).
2. Create a Magic Auth application and retain the `Publishable API Key`.
3. Link to [Magic Web API docs](https://magic.link/docs/auth/api-reference/client-side-sdks/web).

C. Magic MWS Setup

1. Contact Magic and provide the Firebase `Project ID` and Magic `Publishable API Key`.
2. Magic will return a `Provider ID`, please retain this.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

**Before you install:** please read the [prerequisites](#prerequisites)

Stary by cloning this repo on your local machine:

```bash
$ git clone https://github.com/ayv8er/MWS-firebase-demo.git
# or
$ cd PROJECT
```

To install and set up the library, run:

```bash
$ npm install
# or
$ yarn add
```

## Serving the app

```bash
$ npm run dev
# or
$ yarn dev
```

## Env setup

Insert the following values obtained in the [prerequisites](#prerequisites) section, into the `.env` file

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
REACT_APP_MAGIC_PUBLISHABLE_API_KEY=
REACT_APP_MAGIC_PROVIDER_ID=
```

## firebase.js

Pass the following values into the firebaseConfig object.

`REACT_APP_FIREBASE_API_KEY`
`REACT_APP_FIREBASE_AUTH_DOMAIN`
`REACT_APP_FIREBASE_PROJECT_ID`
`REACT_APP_FIREBASE_STORAGE_BUCKET`
`REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
`REACT_APP_FIREBASE_APP_ID`
`REACT_APP_FIREBASE_MEASUREMENT_ID`

## auth-context.js

Pass `REACT_APP_MAGIC_PUBLISHABLE_API_KEY` into the Magic constructor to create magic instance.
Pass `REACT_APP_MAGIC_PROVIDER_ID` into the `loginWithOIDC` method along with user's OIDC jwt to login user.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
