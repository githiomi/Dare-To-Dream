// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

// For the Database
import { getDatabase, update, ref } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// For authentication
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth();

// Add event listener to the sign up button
const loginButton = document.getElementById('loginButton');
const toIndex = document.querySelector('.toIndex');
const errorContainer = document.querySelector('.error');

toIndex.addEventListener('click', (e) => {

    // What happens when the sign up button is clicked
    e.preventDefault();

    // Get user data
    let emailAddress = document.getElementById('emailAddress').value;
    let password = document.getElementById('password').value;

    console.log("Logging in...");
    // Login the Firebase user
    signInWithEmailAndPassword(auth, emailAddress, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            // Update the UI
            console.log(`${user} has been logged in`);

            // Update DB data
            const lastLoggedIn = new Date();
            update(ref(database, 'Dreamers/' + user.uid), {
                lastLoggedIn: lastLoggedIn
            });

            // If user is valid, log in
            if (user) {
                console.log(user);
                window.location.href = '/Dare-To-Dream/index.html';
            } else {
                errorContainer.innerHTML += `You could not be logged in. Try again shortly.`;
                errorContainer.classList.add('display');
                return;
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Update UI
            // Make error visible
            errorContainer.innerHTML += `Error: ${errorMessage}`;
            errorContainer.classList.add('display');
            // alert(`User could not be logged in! -----> Error code ${errorCode}`);
            console.log(`There has been an error logging in the user! \n-----> Error code: ${errorCode}\nError message: ${errorMessage}`);
        });
})