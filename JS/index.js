// Parallax Effect and Navbar Trigger
const moon = document.querySelector('.moon');
const leftCloud = document.querySelector('.cloud1');
const rightCloud = document.querySelector('.cloud2');

window.addEventListener('scroll', () => {

    if (window.scrollY > 100) {
        let value = window.scrollY;

        leftCloud.style.left = value * -1 + 'px';
        rightCloud.style.right = value * -1 + 'px';

        moon.classList.add('toLeft');
    } else {
        moon.classList.remove('toLeft');
    }

})

// Display the dream response
const interpreteBtn = document.getElementById('interpret');
const dreamResponse = document.getElementById('dreamResponse');
var input = document.getElementById('dreamTextArea').value;

interpreteBtn.addEventListener('click', (e) => {

    e.preventDefault();
    alert(`Your dream: ${input}`);

    // Show the dream response
    dreamResponse.classList.add('show');

});


// Firebase user authentication
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

// For authentication
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzsjVYb3ZW1Vxgqnp_FhN8WdNAHXe9mtw",
    authDomain: "dare-dreamer.firebaseapp.com",
    projectId: "dare-dreamer",
    storageBucket: "dare-dreamer.appspot.com",
    messagingSenderId: "984520186998",
    appId: "1:984520186998:web:8bcda2cadb5ff1c1b69357",
    measurementId: "G-L4VHEZVS05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// UI
const username = document.querySelector('.username');
const logout = document.querySelector('.logout');

// Observes if the user is signed in or not
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        // If the user is signed in
        // Get the name of the user
        const name = user.displayName;
        console.log(uid + " Name: " + name);

        // Update UI with data
        username.innerHTML = name;

    } else {
        // If the user is not signed in
        // Re-route to login page
        window.location.href = "/Dare-To-Dream/HTML/login.html"
    }
});

// Add an click event listener to the logout button
logout.addEventListener('click', (e) => {

    signOut (auth)
        .then( () => {
            console.log("User logged out!");
        })
        .catch( (e) => {
            console.log("User NOT logged out!");
        });

});