// let formInputs = document.querySelectorAll(".reg-form__input");

// formInputs.forEach((e) => {
//   e.addEventListener("focusout", check);
// });

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
  }
}

document.querySelector("#email").addEventListener('focusout', checkEmail);

function checkEmail() {
  const {
    reg,
    label,
    posMsg,
    negMsg
  } = inputsData.email;
  console.log(label);
  elementLabel = "Адрес электронной почты";
  textMsgPositive =
    "Вам будет отправлено электронное письмо с подтверждением";
  textMsgNegative = "Это недопустимый адрес электронной почты";

  if (this.value != "") {
    if (reg === true) {
      setPositiveResult(this, posMsg);
    } else {
      setNegativeResult(this, negMsg);
    }
  } else {
    setNegativeResult(this, label);
  }

  // document.querySelector(".email-status > img").src =
  //   icon; // присваиваем нужную иконку (pos/neg)
  // this.style.borderBottomColor = borderColor; // меняем цвет нижней границы
  // document.querySelector(
  //   ".input-" + elementId + " .status-message__text"
  // ).innerText = textMsg; // присваиваем текст сообщения
  // document.querySelector(
  //   ".input-" + elementId + " .status-message img"
  // ).style.width = iconSize; // размер иконки ширина
  // document.querySelector(
  //   ".input-" + elementId + " .status-message img"
  // ).style.height = iconSize; // размер иконки высота
  // document.querySelector(
  //   ".input-" + elementId + " .status-message"
  // ).style.display = "flex"; // показываем сообщение с результатом
  // document.querySelector(
  //   ".input-" + elementId + " .status-message img"
  // ).style.display = "block"; // показывает картинку ок/не ок
}

function setPositiveResult(element, msg) {
  removeIconClass(element, 'img--invalid');
  if (isClassInList(element, 'input--invalid')) {
    element.classList.remove('input--invalid');
  }
  element.classList.add('input--valid'); // меняем цвет нижней границы
  addIconClass(element, 'img--valid'); // размер иконки ширина высота
  setPositiveIcon(element.id); // присваиваем нужную иконку (pos/neg)
  setStatusMsg(element.id, msg); // присваиваем текст сообщения
  displayImg(element.id); // показывает картинку ок/не ок
  displayStatusMsg(element.id); // показываем сообщение с резу
}

function setNegativeResult(element, msg) {
  removeIconClass(element, 'img--valid');
  if (isClassInList(element, 'input--valid')) {
    element.classList.remove('input--valid');
  }
  element.classList.add('input--invalid'); // меняем цвет нижней границы
  addIconClass(element, 'img--invalid'); // размер иконки ширина высота
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
  element.classList.forEach(el => {
    if (el === className) {
      return true;
    }
  });
}

function addIconClass(element, className) {
  document.querySelector(`.${element.id}-status img`).classList.add(className);
}

function removeIconClass(element, className) {
  if (isClassInList(element, 'img--invalid')) {
    document.querySelector(`.${element.id}-status img`).classList.remove(className);
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
  let textMsg;
  let borderColor;
  let icon;
  let iconSize;
  let elementId = this.id;
  let reg;
  let elementLabel;
  let textMsgPositive;
  let textMsgNegative;
  switch (elementId) {
    case "email":
      reg = /[@\.]/;
      reg = validateValue(reg, this.value);
      elementLabel = "Адрес электронной почты";
      textMsgPositive =
        "Вам будет отправлено электронное письмо с подтверждением";
      textMsgNegative = "Это недопустимый адрес электронной почты";
      break;
    case "password1":
      reg = /[a-zA-Z0-9]+\W+|\W+[a-zA-Z0-9]+/g;
      if (validateValue(reg, this.value) && this.value.length >= 8) {
        reg = true;
      } else {
        reg = false;
      }
      elementLabel = "Пароль";
      textMsgPositive = "Пароль соответствует требованиям";
      textMsgNegative = "Пароль не соответствует требованиям безопасности";
      break;
    case "password2":
      reg =
        this.value == document.querySelector("#password1").value ? true : false;
      console.log(reg);
      elementLabel = "Введите пароль еще раз";
      textMsgPositive = "";
      textMsgNegative = "Пароли не совпадают";
      break;
    case "countries":
      elementLabel = "Страна";
      textMsgPositive = "";
      textMsgNegative = "";
      break;
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
      //
      break;
    default:
      //
  }
  if (this.value != "") {
    if (reg === true) {
      textMsg = textMsgPositive;
      borderColor = "#6A9D67";
      icon = "./assets/images/checkcircle-s.svg";
      iconSize = "20px";
    } else {
      textMsg = textMsgNegative;
      borderColor = "#C74634";
      icon = "./assets/images/error-s.svg";
      iconSize = "16px";
    }
  } else {
    textMsg = "Требуется " + elementLabel;
    borderColor = "#C74634";
    icon = "./assets/images/error-s.svg";
    iconSize = "16px";
  }
  document.querySelector(".input-" + elementId + " .status-message img").src =
    icon;
  this.style.borderBottomColor = borderColor;
  document.querySelector(
    ".input-" + elementId + " .status-message__text"
  ).innerText = textMsg;
  document.querySelector(
    ".input-" + elementId + " .status-message img"
  ).style.width = iconSize;
  document.querySelector(
    ".input-" + elementId + " .status-message img"
  ).style.height = iconSize;
  document.querySelector(
    ".input-" + elementId + " .status-message"
  ).style.display = "flex";
  document.querySelector(
    ".input-" + elementId + " .status-message img"
  ).style.display = "block";
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