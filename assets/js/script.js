let formInputs = document.querySelectorAll(".reg-form__input");

formInputs.forEach((e) => {
  e.addEventListener("focusout", check);
});

function check() {
	let textMsg;
	let borderColor;
	let icon;
	let iconSize;
	let elementId = this.id;
	switch (elementId) {
		case "email":
			
			
			
	}
	if (this.value != "") {
		let reg = /[@\.]/;
		if (reg.test(this.value)) {
			textMsg = "Вам будет отправлено электронное письмо с подтверждением";
			borderColor = "#6A9D67";
			icon = './assets/images/checkcircle-s.svg';
			iconSize = '20px';
		} else {
			textMsg = "Это недопустимый адрес электронной почты";
			borderColor = "#C74634";
			icon = './assets/images/error-s.svg';
			iconSize = "16px";
		}
	} else {
		textMsg = "Требуется Адрес электронной почты";
		borderColor = "#C74634";
		icon = './assets/images/error-s.svg';
		iconSize = "16px";
	}
	document.querySelector(".status-message img").src = icon;
	this.style.borderBottomColor = borderColor;
	document.querySelector(".status-message__text").innerText = textMsg;
	document.querySelector(".status-message img").style.width = iconSize;
	document.querySelector(".status-message img").style.height = iconSize;
	document.querySelector(".status-message").style.display = "flex";
	document.querySelector(".status-message img").style.display = "block";
}

