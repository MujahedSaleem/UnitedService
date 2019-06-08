importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: 'AIzaSyAlaq-morkILkm2NsnGgDs2mHiFDREW9Fc',
    authDomain: 'freeworker-5517f.firebaseapp.com',
    databaseURL: 'https://freeworker-5517f.firebaseio.com',
    projectId: 'freeworker-5517f',
    storageBucket: 'freeworker-5517f.appspot.com',
    messagingSenderId: '665869299509'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();