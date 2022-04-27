const inputsData = {
  email: {
    reg: /[@\.]/,
    label: 'Адрес электронной почты',
    posMsg: 'Вам будет отправлено электронное письмо с подтверждением',
    negMsg: 'Это недопустимый адрес электронной почты'
  },
  password1: {
    reg: /[a-zA-Z0-9]+\W+|\W+[a-zA-Z0-9]+/g,
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
  }
}

document.querySelector("#email").addEventListener('focusout', checkEmail);
document.querySelector("#password1").addEventListener('focusout', checkPassword1);
document.querySelector("#password2").addEventListener('focusout', checkPassword2);
document.querySelector("#countries").addEventListener('focusout', checkCountries);
document.querySelector("#firstname").addEventListener('focusout', checkFirstName);
document.querySelector("#familyname").addEventListener('focusout', checkFamilyName);

function checkEmail() {
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.email;
  console.log(reg, label, posMsg, negMsg);
  console.log(this.value);
  let regFlag = validateValue(reg, this.value);
  showMessage(this, regFlag, posMsg, negMsg, label);
}

function checkPassword1() {
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.password1;
  console.log(reg, label, posMsg, negMsg);
  console.log(this.value);
  let regFlag = (validateValue(reg, this.value) && this.value.length >= 8) ? true : false;
  showMessage(this, regFlag, posMsg, negMsg, label);
}

function checkPassword2() {
  const {
    label,
    posMsg,
    negMsg
  } = inputsData.password2;
  console.log(label, posMsg, negMsg);
  console.log(this.value);
  let regFlag =
    (this.value === document.querySelector('#password1').value) ? true : false;
  console.log(regFlag);
  showMessage(this, regFlag, posMsg, negMsg, label);
}

function checkCountries() {
  const {
    label,
    posMsg,
    negMsg
  } = inputsData.countries;
  console.log(label, posMsg, negMsg);
  console.log(this.value);
  let regFlag =
    (this.value !== '') ? true : false;
  console.log(regFlag);
  showMessage(this, regFlag, posMsg, negMsg, label);
}

function checkFirstName() {
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.firstName;
  console.log(label, posMsg, negMsg);
  console.log(this.value);
  let regFlag = validateValue(reg, this.value);
  showMessage(this, regFlag, posMsg, negMsg, label);
}

function checkFamilyName() {
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.familyName;
  console.log(label, posMsg, negMsg);
  console.log(this.value);
  let regFlag = validateValue(reg, this.value);
  showMessage(this, regFlag, posMsg, negMsg, label);
}



function showMessage(element, regFlag, posMsg, negMsg, label) {
  if (element.value != '') {
    if (regFlag === true) {
      setPositiveResult(element, posMsg);
    } else {
      setNegativeResult(element, negMsg);
    }
  } else {
    setNegativeResult(element, label);
  }
}

function setPositiveResult(element, msg) {
  removeIconClass(element, 'img--invalid');
  addIconClass(element, 'img--valid'); // размер иконки ширина высота
  if (isClassInList(element, 'input--invalid')) {
    element.classList.remove('input--invalid');
  }
  if (!isClassInList(element, 'input--valid')) {
    element.classList.add('input--valid'); // меняем цвет нижней границы
  }
  setPositiveIcon(element.id); // присваиваем нужную иконку (pos/neg)
  setStatusMsg(element.id, msg); // присваиваем текст сообщения
  displayImg(element.id); // показывает картинку ок/не ок
  displayStatusMsg(element.id); // показываем сообщение с резу
}

function setNegativeResult(element, msg) {
  removeIconClass(element, 'img--valid');
  addIconClass(element, 'img--invalid'); // размер иконки ширина высота
  if (isClassInList(element, 'input--valid')) {
    element.classList.remove('input--valid');
  }
  if (!isClassInList(element, 'input--invalid')) {
    element.classList.add('input--invalid');
  } // меняем цвет нижней границы
  setNegativeIcon(element.id); // присваиваем нужную иконку (pos/neg)
  setStatusMsg(element.id, msg); // присваиваем текст сообщения
  displayImg(element.id); // показывает картинку ок/не ок
  displayStatusMsg(element.id); // показываем сообщение с резу
}

function setPositiveIcon(elementId) {
  document.querySelector(`.${elementId}-status img`).src = './assets/images/checkcircle-s.svg'; // присваиваем нужную иконку (pos/neg)
}

function setNegativeIcon(elementId) {
  document.querySelector(`.${elementId}-status img`).src = './assets/images/error-s.svg'; // присваиваем нужную иконку (pos/neg)
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

function check() {
  switch (elementId) {
    case "first-name":
      reg = /[a-zA-Z][^0-9]/i;
      elementLabel = "Имя";
      textMsgPositive = "";
      textMsgNegative =
        "Используйте только буквы, апострофы, дефисы, запятые, пробелы и точки.";
      break;
    case "family-name":
      reg = /[a-zA-Z][^0-9]/i;
      elementLabel = "Фамилия";
      textMsgPositive = "";
      textMsgNegative =
        "Используйте только буквы, апострофы, дефисы, запятые, пробелы и точки.";
      break;
    case "position":
      elementLabel = "Наименование должности";
      textMsgPositive = "";
      textMsgNegative = "";
      break;
    case "tel":
      reg = /[^a-zA-Z][0-9]/;
      elementLabel = "Рабочий телефон";
      textMsgPositive = "";
      textMsgNegative = "Это недопустимый номер телефона";
      break;
    case "company":
      elementLabel = "Название компании";
      textMsgPositive = "";
      textMsgNegative = "";
      break;
    case "agreement":
  }
}

function validateValue(reg, val) {
  return reg.test(val);
}

document.querySelector("#submit-button").addEventListener("click", regResult);

function regResult() {
  let positiveFlags = document.querySelectorAll(".status-message img");
  console.log(positiveFlags);
  for (let element of positiveFlags) {
    if (element.src.split("/images")[1] == "/error-s.svg") {
      return alert("Какое-то из полей заполнено неверно.");
    }
  }
  alert("Добро пожаловать, " + document.querySelector("#email").value + "!");
}