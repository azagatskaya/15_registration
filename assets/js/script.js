const inputsData = {
  email: {
    reg: /[@\.]/,
    label: 'Адрес электронной почты',
    posMsg: 'Вам будет отправлено электронное письмо с подтверждением',
    negMsg: 'Это недопустимый адрес электронной почты'
  },
  password1: {
    reg: /[a-zA-Z0-9\W]/ig, //+\W+|\W+[a-zA-Z0-9]+/g,
    label: 'Пароль',
    posMsg: 'Пароль соответствует требованиям',
    negMsg: 'Пароль не соответствует требованиям безопасности'
  },
  password2: {
    label: 'Введите пароль еще раз',
    posMsg: '',
    negMsg: 'Пароли не совпадают'
  },
  countries: {
    label: 'Страна',
    posMsg: '',
    negMsg: ''
  },
  firstName: {
    reg: /[a-zA-Z][^0-9]/i,
    label: 'Имя',
    posMsg: '',
    negMsg: 'Используйте только буквы, апострофы, дефисы, запятые, пробелы и точки.'
  },
  familyName: {
    reg: /[a-zA-Z][^0-9]/i,
    label: 'Фамилия',
    posMsg: '',
    negMsg: 'Используйте только буквы, апострофы, дефисы, запятые, пробелы и точки.'
  },
  position: {
    label: 'Наименование должности',
    posMsg: '',
    negMsg: ''
  },
  tel: {
    reg: /[0-9]/,
    label: 'Рабочий телефон',
    posMsg: '',
    negMsg: 'Это недопустимый номер телефона'
  },
  company: {
    label: 'Название компании',
    posMsg: '',
    negMsg: ''
  }
}

const email = document.querySelector("#email");
getFromLocalStorage(email);
email.addEventListener('focusout', checkEmail);

const password1 = document.querySelector("#password1");
// getFromLocalStorage(password1);
password1.addEventListener('focusout', checkPassword1);

const password2 = document.querySelector("#password2");
// getFromLocalStorage(password2);
password2.addEventListener('focusout', checkPassword2);

const country = document.querySelector("#countries");
getFromLocalStorage(country);
country.addEventListener('focusout', checkCountries);

const firstName = document.querySelector("#firstname");
getFromLocalStorage(firstName);
firstName.addEventListener('input', checkFirstName);

const familyName = document.querySelector("#familyname");
getFromLocalStorage(familyName);
familyName.addEventListener('input', checkFamilyName);

const position = document.querySelector("#position");
getFromLocalStorage(position);
position.addEventListener('input', checkPosition);

const tel = document.querySelector("#tel");
getFromLocalStorage(tel);
tel.addEventListener('focusout', checkTelephone);
tel.addEventListener('input', handleTelChange);

const company = document.querySelector("#company");
getFromLocalStorage(company);
company.addEventListener('focusout', checkCompany);


function getFromLocalStorage(element) {
  element.value = localStorage.getItem(`${element.id}`) || '';
}

function checkEmail(event) {
  const el = event.target ? event.target : event;
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.email;
  let regFlag = validateValue(reg, el.value);
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function checkPassword1(event) {
  const el = event.target ? event.target : event;
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.password1;
  let regFlag = (validateValue(reg, el.value) && el.value.length >= 8) ? true : false;
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function checkPassword2(event) {
  const el = event.target ? event.target : event;
  const {
    label,
    posMsg,
    negMsg
  } = inputsData.password2;
  let regFlag =
    (el.value === document.querySelector('#password1').value) ? true : false;
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function checkCountries(event) {
  const el = event.target ? event.target : event;
  const {
    label,
    posMsg,
    negMsg
  } = inputsData.countries;
  let regFlag = isValueEmpty(el.value);
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function checkFirstName(event) {
  const el = event.target ? event.target : event;
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.firstName;
  let regFlag = validateValue(reg, el.value);
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function checkFamilyName(event) {
  const el = event.target ? event.target : event;
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.familyName;
  let regFlag = validateValue(reg, el.value);
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function checkPosition(event) {
  const el = event.target ? event.target : event;
  const {
    label,
    posMsg,
    negMsg
  } = inputsData.position;
  let regFlag = isValueEmpty(el.value);
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function checkTelephone(event) {
  const el = event.target ? event.target : event;
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.tel;
  let regFlag = validateValue(reg, el.value);
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function handleTelChange(event) {
  let telValue = event.target.value;
  console.log(telValue);
  event.target.value = telValue.replace(/[^0-9+]/g, '');
}

function checkCompany(event) {
  const el = event.target ? event.target : event;
  const {
    label,
    posMsg,
    negMsg
  } = inputsData.company;
  let regFlag = isValueEmpty(el.value);
  return showMessage(el, regFlag, posMsg, negMsg, label);
}

function validateValue(reg, val) {
  return reg.test(val);
}

function isValueEmpty(value) {
  return (value !== '') ? true : false;
}

function showMessage(element, regFlag, posMsg, negMsg, label) {
  if (element.value != '') {
    if (element.id !== 'password1' && element.id !== 'password2') {
      localStorage.setItem(element.id, element.value);
    }
    if (regFlag === true) {
      setPositiveResult(element, posMsg);
      return true;
    } else {
      setNegativeResult(element, negMsg);
      return false;
    }
  } else {
    setNegativeResult(element, label);
    return false;
  }
}

function setPositiveResult(element, msg) {
  removeIconClass(element, 'img--invalid');
  addIconClass(element, 'img--valid');
  if (isClassInList(element, 'input--invalid')) {
    element.classList.remove('input--invalid');
  }
  if (!isClassInList(element, 'input--valid')) {
    element.classList.add('input--valid');
  }
  setPositiveIcon(element.id);
  setStatusMsg(element.id, msg);
  displayImg(element.id);
  displayStatusMsg(element.id);
}

function setNegativeResult(element, msg) {
  removeIconClass(element, 'img--valid');
  addIconClass(element, 'img--invalid');
  if (isClassInList(element, 'input--valid')) {
    element.classList.remove('input--valid');
  }
  if (!isClassInList(element, 'input--invalid')) {
    element.classList.add('input--invalid');
  }
  setNegativeIcon(element.id);
  setStatusMsg(element.id, msg);
  displayImg(element.id);
  displayStatusMsg(element.id);
}

function setPositiveIcon(elementId) {
  document.querySelector(`.${elementId}-status img`).src = './assets/images/checkcircle-s.svg';
}

function setNegativeIcon(elementId) {
  document.querySelector(`.${elementId}-status img`).src = './assets/images/error-s.svg';
}

function isClassInList(element, className) {
  res = false;
  element.classList.forEach(el => {
    if (el === className) {
      res = true;
    }
  });
  return res;
}

function addIconClass(element, className) {
  const icon = document.querySelector(`.${element.id}-status img`);
  if (!isClassInList(icon, className)) {
    icon.classList.add(className);
  }
}

function removeIconClass(element, className) {
  const icon = document.querySelector(`.${element.id}-status img`);
  if (isClassInList(icon, className)) {
    icon.classList.remove(className);
  }
}

function setStatusMsg(elementId, message) {
  document.querySelector(`.${elementId}-status .status-message__text`).innerText = message;
}

function displayImg(elementId) {
  document.querySelector(".input-" + elementId + " .status-message img").style.display = "block";
}

function displayStatusMsg(elementId) {
  document.querySelector(".input-" + elementId + " .status-message").style.display = "flex";
}

//submission

document.querySelector("#submit-button").addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let errorMessage = 'Необходимо заполнить все поля';
  checkAllFields() ? alert(`Добро пожаловать, ${email.value}!`) : alert(errorMessage);
}

const functions = [checkEmail(email), checkPassword1(password1), checkPassword2(password2), checkCountries(country), checkFirstName(firstName), checkFamilyName(familyName), checkPosition(position), checkTelephone(tel), checkCompany(company), checkAgreement()]

function checkAllFields() {
  let res = true;
  functions.forEach(foo => {
    if (!foo) {
      res = false;
    }
  });
  return res;
}

function checkAgreement() {
  const agreementCheckbox = document.querySelector('.agreement__checkbox');
  const agreementText = document.querySelector('.agreement__text');
  let textRedColor = isClassInList(agreementText, 'agreement--notagreed');
  if (!agreementCheckbox.checked && !textRedColor) {
    agreementText.classList.add('agreement--notagreed');
  } else if (agreementCheckbox.checked && textRedColor) {
    agreementText.classList.remove('agreement--notagreed');
  }
  return agreementCheckbox.checked;
}