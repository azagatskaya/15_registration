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


// const user = {
// 	email: '',
// 	password: '',
// 	country: '',
// 	firstName: '',
// 	familyName: '',
// 	position: '',
// 	tel: '',
// 	company: ''
// }

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