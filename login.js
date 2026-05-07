const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const emailSignInBtn = document.getElementById("emailSignInBtn");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const message = document.getElementById("message");

// Show / Hide password
function togglePassword() {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
}

// Email + Password login
emailSignInBtn.onclick = async () => {
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(
      emailInput.value,
      passwordInput.value
    );

    if (!res.user.emailVerified) {
      message.innerText =
        "⚠️ Please verify your email before logging in.";
      await firebase.auth().signOut();
      return;
    }

    window.location.href = "index.html";

  } catch (err) {
    message.innerText = err.message;
  }
};

// Google login
googleSignInBtn.onclick = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    window.location.href = "index.html";
  } catch (err) {
    message.innerText = err.message;
  }
};

// Forgot password
function forgotPassword() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Enter your registered email first");
    return;
  }

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset link sent. Check your email.");
    })
    .catch(error => {
      alert(error.message);
    });
}
firebase.auth().fetchSignInMethodsForEmail(email)
  .then(methods => {
    if (methods.includes("google.com")) {
      alert("This account uses Google Sign-In. Please login with Google.");
      return;
    }
    return firebase.auth().sendPasswordResetEmail(email);
  });

