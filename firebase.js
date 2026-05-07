// Your web app's Firebase configuration
// IMPORTANT: Replace these placeholder values with your actual project details from the Firebase console.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrk2SY_W9tvSY_EQKK69vuM7YR49HXvqs",
  authDomain: "plant-shop-1.firebaseapp.com",
  databaseURL: "https://plant-shop-1-default-rtdb.firebaseio.com",
  projectId: "plant-shop-1",
  storageBucket: "plant-shop-1.firebasestorage.app",
  messagingSenderId: "698185340902",
  appId: "1:698185340902:web:d1b141d8ad5ef2358b2827",
  measurementId: "G-THDGJJP142"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Auth service and Google Auth Provider
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Get UI elements
// These must be retrieved AFTER the HTML elements are loaded.
// If your script is at the end of <body>, this is fine.
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const emailSignInBtn = document.getElementById('emailSignInBtn');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const messageDisplay = document.getElementById('message');
const authUiDiv = document.getElementById('auth-ui');
const userInfoDiv = document.getElementById('user-info');
const userEmailSpan = document.getElementById('userEmail');

// Function to display messages to the user
function showMessage(msg, type = 'info') {
    messageDisplay.textContent = msg;
    messageDisplay.className = ''; // Clear previous classes
    messageDisplay.classList.add(type);
    messageDisplay.style.display = 'block';
    setTimeout(() => {
        messageDisplay.style.display = 'none'; // Hide after 5 seconds
    }, 5000);
}

// Authentication state observer
// This function runs whenever the user's sign-in state changes (sign-in, sign-out, etc.)
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        authUiDiv.classList.add('hidden');
        userInfoDiv.classList.remove('hidden');
        userEmailSpan.textContent = user.email;
        showMessage(`Welcome, ${user.email}!`, 'success');
    } else {
        // User is signed out
        authUiDiv.classList.remove('hidden');
        userInfoDiv.classList.add('hidden');
        userEmailSpan.textContent = '';
        showMessage('No user signed in.', 'info');
    }
});

// Event listener for Email/Password Sign In button
emailSignInBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        showMessage("Please enter both email and password.", "error");
        return;
    }

    try {
        // Attempt to sign in an existing user
        await auth.signInWithEmailAndPassword(email, password);3
        // The onAuthStateChanged listener will update the UI automatically
    } catch (error) {
        // If sign-in fails, you might want to offer to create an account
        if (error.code === 'auth/user-not-found') {
            // Optionally, you could offer to sign up the user here:
            // await auth.createUserWithEmailAndPassword(email, password);
            showMessage("No account found with that email. You can try signing up, or check your credentials.", "error");
        } else if (error.code === 'auth/wrong-password') {
            showMessage("Incorrect password.", "error");
        } else if (error.code === 'auth/invalid-email') {
            showMessage("Invalid email address.", "error");
        } else {
            showMessage(`Error signing in: ${error.message}`, 'error');
        }
        console.error("Email sign-in error:", error);
    }
});

// Event listener for Google Sign In button
googleSignInBtn.addEventListener('click', async () => {
    try {
        await auth.signInWithPopup(googleProvider);
        // The onAuthStateChanged listener will update the UI automatically
    } catch (error) {
        // Handle different Google sign-in errors, e.g., pop-up closed, network issues
        if (error.code === 'auth/popup-closed-by-user') {
            showMessage("Google sign-in popup was closed.", "info");
        } else {
            showMessage(`Error with Google Sign In: ${error.message}`, 'error');
        }
        console.error("Google sign-in error:", error);
    }
});

// Event listener for Sign Out button
signOutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        // The onAuthStateChanged listener will update the UI automatically
    } catch (error) {
        showMessage(`Error signing out: ${error.message}`, 'error');
        console.error("Sign-out error:", error);
    }
});

// Initial hide for the message display
messageDisplay.style.display = 'none';