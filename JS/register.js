// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

// For the Database
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

// For authentication
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

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
const signUpButton = document.getElementById('registerButton');
const errorContainer = document.querySelector('.error');

signUpButton.addEventListener('click', (e) => {

    // What happens when the sign up button is clicked
    e.preventDefault();

    // Get user data
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let username = document.getElementById('username').value;
    let emailAddress = document.getElementById('emailAddress').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert(`Passwords must match!`);
        return;
    }

    console.log("Creating user...");
    // Create new Firebase user
    createUserWithEmailAndPassword(auth, emailAddress, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // Update UI
            console.log(`Created user -----> ${user}`);

            // Add the new user's display name
            updateProfile(user, {
                displayName: username, 
                email: emailAddress
              }).then(() => {
                console.log(`${user} has been added successfully`)
              }).catch((error) => {
                console.log(`${user} has NOT been added successfully`)
              });

            // Saving user data to database
            const lastLoggedIn = new Date();
            set(ref(database, 'Dreamers/' + user.uid), {
                firstName: firstName,
                lastName: lastName,
                userName: username,
                email: emailAddress,
                lastLoggedIn : lastLoggedIn
            });

            console.log("Data saved to DB");

            // If user is created successfully, go to home page
            if (user) {
                console.log(user);
                e.preventDefault();
                window.location.href = '/Dare-To-Dream/index.html';
            } else {
                errorContainer.innerHTML += `You could not be signed up. Try again shortly.`;
                errorContainer.classList.add('display');
                return;
            }

        })
        .catch((error) => {
            // Not signed up
            const errorCode = error.code;
            const errorMessage = error.message;
            //Update UI
            // Make error visible
            errorContainer.innerHTML += `Error: ${errorMessage}`;
            errorContainer.classList.add('display');
            // alert(`User could not be created! -----> Error message: ${errorMessage}`);
            console.log(`There has been an error creating the user! \n-----> Error code: ${errorCode}\nError message: ${errorMessage}`);
        });

})