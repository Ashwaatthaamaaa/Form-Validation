import './style.css';
import { countries } from 'countries-list';
import {validate} from './pincode-regex.js';

var passwordValidator = require('password-validator');
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Password', 'Password123']); // Blacklist these values



function app(){
    populateCountry();
    document.addEventListener('DOMContentLoaded',()=>{
        const form = document.querySelector('#form');
        const email = document.querySelector('#email');
        const country = document.querySelector('#country');
        const zipCode = document.querySelector('#zip');
        const password = document.querySelector('#password');
        const passwordConfirm = document.querySelector('#passwordConfirm');



        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            if(form.reportValidity()){
                alert('Form is Perfect!!!!!');
                form.reset();
            }
            
        })

        email.addEventListener('blur',()=>validateEmail());
        country.addEventListener('blur',validateCountry);
        zipCode.addEventListener('blur',validateZipCode);
        password.addEventListener('blur',validatePassword);
        passwordConfirm.addEventListener('blur',()=>validateConfirmPassword());




    })

}

function populateCountry(){
    const selectList = document.querySelector('#country');
    for(const key in countries){
        const option = document.createElement('option');
        option.textContent = countries[key].name;
        option.setAttribute('value',key);
        selectList.appendChild(option);
    }    
}


function validateEmail() {
    const emailInput = document.querySelector('#email');
    const emailError = document.querySelector('#emailError');


    if (emailInput.validity.typeMismatch) {
        emailInput.classList.add('err');
        emailError.textContent = 'Please enter the email correctly';
    } else if (emailInput.validity.valueMissing && emailInput.value.trim() === '') {
        emailInput.classList.add('err');
        emailError.textContent = 'Please enter the email';
    } else {
        emailInput.classList.remove('err');
        emailError.textContent = '';
    }
}

function validateCountry(){
    const countryInput = document.querySelector('#country');
    const countryError = document.querySelector('#countryError');

    if(countryInput.validity.valueMissing){
        countryInput.classList.add('err');
        countryError.textContent = 'Please select a option';
    }else{
        countryInput.classList.remove('err');
        countryError.textContent='';
    }
}


function validateZipCode(){
    const zipCodeInput = document.querySelector('#zip');
    const zipError = document.querySelector('#zipError');


    if(zipCodeInput.validity.valueMissing){
        zipCodeInput.classList.add('err');
        zipError.textContent = 'Please Enter ZipCode';
    }else if(!validate(zipCodeInput.value)){
        zipCodeInput.classList.add('err');
        zipError.textContent = 'Please enter a valid pincode';
    }else{
        zipCodeInput.classList.remove('err');
        zipError.textContent = '';
    }
}


function validatePassword(){
    const password = document.querySelector('#password');
    const passwordError = document.querySelector('#passwordError');

    if(password.validity.valueMissing){
        password.classList.add('err');
        passwordError.textContent = 'Please Enter Password';
    }else if(!schema.validate(password.value)){
        password.classList.add('err');
        passwordError.textContent = 'Please Enter a Valid Password';
    }else{
        password.classList.remove('err');
        passwordError.textContent = '';
    }
}

function validateConfirmPassword(){
    const passwordConfirm = document.querySelector('#passwordConfirm');
    const passwordConfirmError = document.querySelector('#passwordConfirmError');
    const password = document.querySelector('#password');

    console.log('cdfv')
    if(passwordConfirm.validity.valueMissing){
        passwordConfirm.classList.add('err');

        passwordConfirmError.textContent = 'please enter the password';
        // passwordConfirmError.textContent = 'please enter the password';
    }else if(!(passwordConfirm.value === password.value)){
        passwordConfirm.classList.add('err');

        passwordConfirmError.textContent = 'passwords do not match';
    }else{
        passwordConfirm.classList.remove('err');
        passwordConfirmError.textContent ='';
    }
}
app();