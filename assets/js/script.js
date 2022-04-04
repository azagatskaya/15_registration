let formInputs = document.querySelectorAll(".reg-form__input");

formInputs.forEach((e) => {
  e.addEventListener("focusout", check);
});

document.querySelector("#submit-button").addEventListener("click", regResult);

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
      reg = /[@\.]/; // /@+[\w]+\./; ///[@\.]/;
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
