import firebase from 'firebase/app'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCTRRq8FQ5iM4ypns9uCl8blzRTTu4HrsI',
  authDomain: 'sistemas-iot.firebaseapp.com',
  databaseURL: 'https://sistemas-iot-default-rtdb.firebaseio.com/',
  projectId: 'sistemas-iot',
  storageBucket: 'sistemas-iot.appspot.com',
  messagingSenderId: '207913298365',
  appId: '1:207913298365:web:cf53b5a17481d1a1710ad4',
  measurementId: 'G-9Y12RM4ERK'
}

firebase.initializeApp(config)