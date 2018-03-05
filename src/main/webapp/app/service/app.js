// var config = {
//     apiKey: "AIzaSyDunyQ1AW80_soQd2clJ3WKJse-tIvVg9s",
//     authDomain: "wsregistration.statnlp.tk",
//     databaseURL: "https://statnlp-annotation-image.firebaseio.com",
//     projectId: "statnlp-annotation-image",
//     storageBucket: "statnlp-annotation-image.appspot.com",
//     messagingSenderId: "443173965425"
// };

// firebase.initializeApp(config);

// var globalDatabase = firebase.database();

// var globalUser = {
//     user_name: null,
//     user_email: null,
//     created_time: null,
//     annotations: []
// };

// var googleProvider = new firebase.auth.GoogleAuthProvider;
// var facebookProvider = new firebase.auth.FacebookAuthProvider();
// var twitterProvider = new firebase.auth.TwitterAuthProvider();

// // firebase.auth().onAuthStateChanged(function (t) {
// //     t ? globalLoadUserSignIn(t) : globalLoadUserSingOut();
// // });

// function globalLoadUserSignIn(user) {
//     globalUser = user;
//     $('.m-login').hide();
//     $('.m-main').show();
// }

// function globalLoadUserSingOut() {
//     $('.m-main').hide();
//     $('.m-login').show();
// }

// function globalSignOut() {
//     firebase.auth().signOut().then(function () {
//         globalLoadUserSingOut();
//     }).catch(function (t) {
//         console.log(t);
//     })
// }

// function globalSignInWithGoogle() {
//     firebase.auth().signInWithPopup(googleProvider).then(function (t) {
//         t.credential.accessToken;
//     }).catch(function (t) {
//         console.log(t);
//     })
// }

// function globalSignInWithTwitter() {
//     firebase.auth().signInWithPopup(twitterProvider).then(function (t) {
//         t.credential.accessToken;
//     }).catch(function (t) {
//         console.log(t);
//     })
// }

// function globalSignInWithFacebook() {
//     firebase.auth().signInWithPopup(facebookProvider).then(function (t) {
//         t.credential.accessToken;
//     }).catch(function (t) {
//         console.log(t);
//     })
// }

// $(document).ready(function () {

//     $('#btn-signin-google').click(globalSignInWithGoogle);
//     $('#btn-signin-facebook').click(globalSignInWithFacebook);
//     $('#btn-signin-twitter').click(globalSignInWithTwitter);
    
// });
