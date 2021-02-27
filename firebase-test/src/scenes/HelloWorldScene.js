import Phaser from 'phaser'
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseConfig } from '../config/firebaseConfig.js';

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}

	preload() {

    }

    create() {
        var firebaseConfig = new FirebaseConfig()
        firebaseConfig.create()
        var firebaseApp = firebase.initializeApp(firebaseConfig.getConfig());
        var provider = new firebase.auth.GoogleAuthProvider();

        const googleButton = this.add.text(350, 300, 'Google login', { fill: '#0f0' });
        googleButton.setInteractive();
        googleButton.on('pointerdown', () => { 
            this.googleLogin(firebaseApp, provider); 
        });
    }

    googleLogin(firebaseApp, provider) {
        firebaseApp.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(user.displayName);
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
    }
}