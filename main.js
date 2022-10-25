/*
name: must be more than 5 char and contains only letter or spacce
username: more than 5 char
email: valid
phone: bangladeshi
slug: underscore, hyphen, letter, number
generate password(strong): input field and password generation+coppy button
password and validation (strong)
web address or facebook link: valid
submit
*/
const form = document.querySelector("form");
const showingDiv = document.querySelector(".showProfile");
const submitBtn = document.querySelector("#signUpBtn");
const nameField = document.querySelector("#name");
const nameMsg = document.querySelector("#nameMsg");
const usernameField = document.querySelector("#username");
const usernameMsg = document.querySelector("#usernameMsg");
const emailField = document.querySelector("#email");
const emailMsg = document.querySelector("#emailMsg");
const phoneField = document.querySelector("#phone");
const phoneMsg = document.querySelector("#phoneMsg");
const weblinkField = document.querySelector("#weblink");
const weblinkMsg = document.querySelector("#weblinkMsg");
const generatPassParent = document.querySelector(".passwordGenerator");
const passwordGenerateField = document.querySelector("#generated");
const passGenMsg = document.querySelector("#generateMsg");
const passwordField = document.querySelector("#password");
const passwordMsg = document.querySelector("#passwordMsg");
const confirmPassField = document.querySelector("#confirm");
const conPassMsg = document.querySelector("#confirmMsg");
const successMsg = document.querySelector(".successMsg");
let validity = true;
// common functions
function showMessage(msg = "Somthing is wrong", color = "red", target) {
  target.style.color = color;
  target.textContent = msg;
}
function receiveInputs() {
  const name = nameField.value;
  const username = usernameField.value;
  const email = emailField.value;
  const phone = phoneField.value;
  const weblink = weblinkField.value;
  const password = passwordField.value;
  const confirmPassword = confirmPassField.value;
  const inputsObj = {
    name,
    username,
    email,
    phone,
    weblink,
    password,
    confirmPassword,
  };
  return inputsObj;
}
function resetInputs() {
  nameField.value = "";
  usernameField.value = "";
  emailField.value = "";
  phoneField.value = "";
  weblinkField.value = "";
  passwordGenerateField.value = "";
  passwordField.value = "";
  confirmPassField.value = "";
}
function clearMessage() {
  successMsg.textContent = "";
}
function showSccessMessage(msg, action = "success") {
  const message = `<div class="alert alert-${action}" role="alert">
${msg}
</div>`;
  successMsg.insertAdjacentHTML("afterBegin", message);
  setTimeout(() => {
    clearMessage();
  }, 2000);
}
// functions for generating and copying password
function createPassword(len = 12) {
  const chars =
    "abcdefghijklmnopqrstuvwxyz123456789001234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!§$%&/?#+-_@(){}[]:;<>*";
  const arr = new Uint32Array(len);
  const maxRange = Math.pow(2, 32);
  let passwd = "";
  window.crypto.getRandomValues(arr);

  for (let i = 0; i < len; i++) {
    let c = Math.floor((arr[i] / maxRange) * chars.length + 1);
    passwd += chars.charAt(c);
  }
  return passwd;
}
function generatePassword() {
  passwordGenerateField.value = createPassword();
  showMessage("Pasword generated", "green", passGenMsg);
}
function copyPassword() {
  if (passwordGenerateField.value) {
    passwordGenerateField.select();
    passwordGenerateField.setSelectionRange(0, 99);
    document.execCommand("copy");
    showMessage("Pasword copied", "green", passGenMsg);
    passwordGenerateField.value = "";
  } else {
    showMessage("Nothing found to copy", "red", passGenMsg);
  }
}
// functions for validating input-data
function validateName(name) {
  const rxName = /^[a-z]{3,15}\s?[a-z\s]+$/i;
  if (!rxName.test(name)) {
    showMessage("Please insert a valid name.", "red", nameMsg);
    validity = false;
  } else {
    showMessage("Ex: Mustakim Al Mobin", "black", nameMsg);
  }
}
function validateUserName(username) {
  const rxUserName = /^[a-z]{3,}[_\.]?[a-z0-9]+$|^[a-z]+[_\.]?[a-z0-9]{3,}$/i;
  if (!rxUserName.test(username)) {
    showMessage("Please insert a valid username", "red", usernameMsg);
    validity = false;
  } else {
    showMessage("Ex: mobin_505", "black", usernameMsg);
  }
}
function validateEmail(email) {
  const rxEmail = /^[a-z][a-z0-9._]+@([a-z0-9-]+\.)+([a-z]{2,4})$/i;
  if (!rxEmail.test(email)) {
    showMessage("Please insert a valid email", "red", emailMsg);
    validity = false;
  } else {
    showMessage("Ex: abcdefg@gmail.com", "black", emailMsg);
  }
}
function validatePhoneNumber(phone) {
  const rxPhone = /\+?(88)?01[3-9]\d{2}\-?\d{6}\b/;
  if (!rxPhone.test(phone)) {
    showMessage(
      "please, insert a valid bangladeshi phone number in the specific format (+8801222222222, 01222222222, 01222-222222)",
      "red",
      phoneMsg
    );
    validity = false;
  } else {
    showMessage("Ex: +8801722-222222", "black", phoneMsg);
  }
}
function validateFacebookSlug(slug) {
  const rxSlug = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/i;
  if (!rxSlug.test(slug)) {
    showMessage(
      "please, insert your valid facebook profile slug",
      "red",
      weblinkMsg
    );
    validity = false;
  } else {
    showMessage("Ex: mustakim.mobin.123", "black", weblinkMsg);
  }
}
function validatePassword(password, confirmPassword) {
  const rxPassword =
    /^(?=.*\d)(?=.*[!§$%&\/\?#\+\-_@\(\)\{\}\[\]\:\;\<\>\*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!rxPassword.test(password)) {
    showMessage(
      "please, insert a strong password more than 8 charecter.",
      "red",
      passwordMsg
    );
    validity = false;
  } else if (password !== confirmPassword) {
    showMessage("Password didn't match", "red", passwordMsg);
    validity = false;
  } else {
    showMessage("Letters-numbers-sign", "black", passwordMsg);
    showMessage("Generate Strong Password", "black", passGenMsg);
  }
}
function validateInputs(inputs) {
  const { name, username, email, phone, weblink, password, confirmPassword } =
    inputs;
  validateName(name);
  validateUserName(username);
  validateEmail(email);
  validatePhoneNumber(phone);
  validateFacebookSlug(weblink);
  validatePassword(password, confirmPassword);
  return validity;
}
// functions for showing profile to ui
function showProfileToUI(inputs) {
  const { name, username, email, phone, weblink, password, confirmPassword } =
    inputs;
  const table = `<h3><u>My profile</u></h3><table>
    <tr>
      <td>Name</td>
      <td>${name}</td>
    </tr>
    <tr>
      <td>User Name</td>
      <td>${username}</td>
    </tr>
    <tr>
      <td>Email</td>
      <td>${email}</td>
    </tr>
    <tr>
      <td>Phone</td>
      <td>${phone}</td>
    </tr>
    <tr>
      <td>Facebook</td>
      <td>
        <a href="https://www.facebook.com/${weblink}"
          >www.facebook.com/${weblink}</a
        >
      </td>
    </tr>
    <tr>
      <td>Password</td>
      <td>**********</td>
    </tr>
  </table>`;
  showingDiv.insertAdjacentHTML("beforeend", table);
}
// functions for handling events
function handleForm(evt) {
  evt.preventDefault();
  const receivedData = receiveInputs();
  const isValid = validateInputs(receivedData);
  console.log(isValid);
  if (!isValid) {
    validity = true;
    return;
  }
  resetInputs();
  showProfileToUI(receivedData);
  showSccessMessage("Profile created successfully!");
  console.table(receivedData);
}
function generateAndCopyPassword(evt) {
  if (evt.target.classList.contains("generate")) {
    generatePassword();
  }
  if (evt.target.classList.contains("copy")) {
    copyPassword();
  }
}
function init() {
  form.addEventListener("submit", handleForm);
  generatPassParent.addEventListener("click", generateAndCopyPassword);
}
init();
