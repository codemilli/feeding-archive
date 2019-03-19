import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase/app';
import App from './containers/App';
import 'firebase/auth';
import './style.scss';

firebase.initializeApp({
  apiKey: "AIzaSyDdeg2ga2gD508X3kzAxtZROIXc-bX-mL4",
  authDomain: "feeding-archive.firebaseapp.com",
  databaseURL: "https://feeding-archive.firebaseio.com",
  projectId: "feeding-archive",
  storageBucket: "feeding-archive.appspot.com",
  messagingSenderId: "217801729531"
});

render(<App />, document.getElementById('root'));
