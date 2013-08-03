/*
	Author: Charles McKelvey
	Description: Javascript Form Validation

	The regular expressions represent most of the criteria needed for each input element.
	Email must have a word followed by the @ symbol followed by a word followed by a period followed by one last word. There can be no whitespace of any kind.
	Names must be at least 2 characters long and contain no numbers.
	Phone Numbers must be all digits and be in my compiled list of valid North American area codes.
	The other expressions are for finding uppercase, lowercase, numbers, and symbols individually which is used to validate passwords amd update the form while typing.
*/

var myConsole = {};
var consolePadding = '200px';

var emailCriteria1 = /\s/;
var emailCriteria2 = /\w+[@]\w+[.]\w+/;
var nameCriteria = /^\D{2,}$/;
var phoneCriteria = /^\d+$/;
var passwordCriteria = /\d+/;
var upperCriteria = /[A-Z]+/;
var lowerCriteria = /[a-z]+/;
var numberCriteria = /[0-9]+/;
var symbolCriteria = /[@,#,$,%,^,&,_]/;
var validAreaCodes = 
/[2-4][0][1-9]|[2][1][0-9]|[2][2][4-9]|[2][3][{1,4,6,9}]|[2][4][{0,2,6,8,9}]|[2][5][{0-4,6}]|[2][6][{0,2,4,7-9}]|[2][7][{0,2,4,6}]|[2][8][{1,4,9}]|[3][2][{0,1,3,5}]|[3][3][{0,1,4,6,7,9}]|[3][4][{0,3,5,7}]|[3][5][1-2]|[3][6][{0,1,4,5}]|[3][8][5-6]|[4][1][0-9]|[4][2][3-5]|[4][3][{0-2,4,5,7,8}]|[4][4][{0-3,5,7}]|[4][5][{0,6,8}]|[4][6][{4,9}]|[4][7][{0,3,5,8,9}]|[4][8][{0,4}]|[5][0-2][0-9]|[5][3][{4,8,9}]|[5][4][{0-5,7,9}]|[5][5][{1-4,6,9}]|[5][6][{1-4,6,7,9}]|[5][7][{1,3-5,7-9}]|[5][8][{1,5-9}]|[6][0-1][0-9]|[6][2][{0,3,6,8}]|[6][3][{0,1,6}]|[6][4][{1,6,7,9}]|[6][5][{0,1,7,9}]|[6][6][{0-2,4,7,9}]|[6][7][{0-2,8,9}]|[6][8][{1,2,4}]|[7][0-1][0-9]|[7][2][{1,4,5,7}]|[7][3][{0-2,4,7}]|[7][4][{0,7}]|[7][5][{4,7,8}]|[7][6][{0,2,3,5,7,9}]|[7][7][{0,2-5,8,9}]|[7][8][{0-2,4-7}]|[8][0][1-9]|[8][1][0-9]|[8][2][8-9]|[8][3][0-2]|[8][4][{3,5,7-9}]|[8][5][{0,6-9}]|[8][6][{0,2-5,7-9}]|[8][7][{0,2,6,8}]|[9][0][1-9]|[9][1][0-9]|[9][2][{0,5,8,9}]|[9][3][6-9]|[9][4][{1,7,9}]|[9][5][{1,2,4,6,9}]|[9][7][{0-3,8,9}]|[9][8][{0,4,5,9}]/;


//This removes the default text in the "console" which is there in case javascript is disabled.
//Gives focus to the first name field.
window.onload = function() {
	myConsole = document.getElementById('outputConsole');
	myConsole.style.top = consolePadding;
	myConsole.innerHTML = 'Please fill in the required information.';
	document.getElementById('firstNameInput').focus();
};

//When typing a name, display a short message.
function NameFocus() {
	myConsole.innerHTML = 'Your first and last names are always nice to have.';
	myConsole.style.top = consolePadding; 
}

//The feedback which will be displayed depends on whether or not the email field is already incorrect or not.
function EmailFocus() {
	if ('NOGO.png' == document.getElementById('emailIcon').src.substr(-8)) {
		myConsole.innerHTML = 'Please enter a valid email address.';
		myConsole.style.top = consolePadding;
	}
	else {
		myConsole.innerHTML = 'Email is our main method of communication with you and it also doubles as an easy to remember username.';
		myConsole.style.top = consolePadding;
	}
}

//The feedback which will be displayed depends on whether or not the cellPhone(1)/homePhone(2) field is already incorrect or not.
function NumberFocus(obj) {
	var icon = {};
	(1 == obj) ? icon = document.getElementById('cellPhoneIcon') : icon = document.getElementById('homePhoneIcon');

	if ('NOGO.png' == icon.src.substr(-8)) {
		myConsole.innerHTML = 'Please enter a valid phone number.';  
	}
	else {
		myConsole.innerHTML = 'Phone Numbers are used for urgent communication needs.<br />For instance, if a bank detects that your debit card is \
		                       being used unlawfully, they will want to contact you directly as soon as possible.';  
	}
	myConsole.style.top = consolePadding;
}

//A short list of requirements which must be met for passwords. The script will alter the <li> as a user types.
function passwordFocus() { 
	myConsole.innerHTML = 'Your password must be 8-14 characters long and include the following:<br /> \
				<ul id="reqList"> \
					<li id="pwdReq1">1 Symbol &nbsp;&nbsp; @, #, $, %, ^, &, _ </li> \
                                	<li id="pwdReq2">1 Number</li> \
                               		<li id="pwdReq3">1 Uppercase Letter</li> \
                               		<li id="pwdReq4">1 Lowercase Letter</li> \
				</ul>';
	myConsole.style.top = '150px';
}

//This checks both the first and last name fields. If the fields are empty then the icon displayed will be blank.
//If the name matches the criteria however, the icon becomes the green check, or the red x if it fails.
function NameBlur(obj) {
    	var output = {};
    	('firstNameInput' == obj.id) ? output = document.getElementById('firstNameIcon') : output = document.getElementById('lastNameIcon');

    	if ('' == obj.value) { output.src = 'icon_BLANK.png'; }
    	else if (obj.value.match(nameCriteria)) { output.src = 'icon_GO.png'; }
    	else { output.src = 'icon_NOGO.png'; }
}

//If the email matches both of the predefined criteria, it gets a green check. All other cases produce a red x.
function EmailBlur() {
    	var input = document.getElementById('emailInput').value;
    	if (!(input.match(emailCriteria1)) && input.match(emailCriteria2)) { document.getElementById('emailIcon').src = 'icon_GO.png'; }
    	else { document.getElementById('emailIcon').src = 'icon_NOGO.png'; }
}

//To validate the phone numbers first make sure the first 2 fields each have 3 digits entered and the last field has 4 digits entered.
//If this is not the case the user is not finished and so the icon becomes blank.
//If it does meet the requirements then the area code is validated via areaCodeCheck() below.
function NumberBlur(obj) {
	var output = {}, loc1 = {},  loc2 = {},  loc3 = {}, areaCode = 0;
	if (1 == obj) {
		loc1 = document.getElementById('cellPhoneInput1').value.length;
		loc2 = document.getElementById('cellPhoneInput2').value.length;
		loc3 = document.getElementById('cellPhoneInput3').value.length;
		output = document.getElementById('cellPhoneIcon');
		areaCode = document.getElementById('cellPhoneInput3');
	}
	else {
		loc1 = document.getElementById('homePhoneInput1').value.length;
		loc2 = document.getElementById('homePhoneInput2').value.length;
		loc3 = document.getElementById('homePhoneInput3').value.length;
		output = document.getElementById('homePhoneIcon');
		areaCode = document.getElementById('homePhoneInput3');
	}
	if ((2 >= loc1) || (2 >= loc2) || (3 >= loc3)) { output.src = 'icon_BLANK.png'; }
	else { areaCodeCheck(areaCode); }
}

//Validating the area code is done in 3 steps:
//	1. Make sure each field has only digits in it.
//	2. Revalidate the legths of the inputs.
//	3. Search for the area code in the list of valid area codes.
//Only if all 3 steps are completed successfully will the icon become the green check. In all other cases it produces a red x.
function areaCodeCheck(obj) {
    	var output = {}, caller = {}, aux1 = {}, aux2 = {};
    	if ('homePhoneInput3' == obj.id) {
		output = document.getElementById('homePhoneIcon');
		caller = document.getElementById('homePhoneInput1');
		aux1 = document.getElementById('homePhoneInput2');
		aux2 = document.getElementById('homePhoneInput3');
    	}
    	else {
		output = document.getElementById('cellPhoneIcon');
		caller = document.getElementById('cellPhoneInput1');
		aux1 = document.getElementById('cellPhoneInput2');
		aux2 = document.getElementById('cellPhoneInput3');
    	}
    	if ((caller.value.match(phoneCriteria)) && (aux1.value.match(phoneCriteria)) && (aux2.value.match(phoneCriteria))) {
		if ((3 == caller.value.length) && (3 == aux1.value.length) && (4 == aux2.value.length)) {
			if (caller.value.match(validAreaCodes)) { output.src = 'icon_GO.png'; }
			else { output.src = 'icon_NOGO.png'; }
		}
    	}
}

//This function is called on every keyup() event that occurs when a phone number field is focused.
//If the current entry field is at it's maximum amount of digits then pass the focus to the next field.
//This makes typing and formatting phone numbers much easier.
function checkLength(obj) {
    if ('homePhoneInput1' == obj.id) {
	if (3 == obj.value.length) {
		document.getElementById('homePhoneInput2').focus();
	}
    }
    else if ('homePhoneInput2' == obj.id) {
	if (3 == obj.value.length) {
		document.getElementById('homePhoneInput3').focus();
	}
    }
    else if ('homePhoneInput3' == obj.id) {
	if (4 == obj.value.length) {
		document.getElementById('passwordInput').focus();
		areaCodeCheck(obj);
	}
    }
    else if ('cellPhoneInput1' == obj.id) {
	if (3 == obj.value.length) {
		document.getElementById('cellPhoneInput2').focus();
	}
    }
    else if ('cellPhoneInput2' == obj.id) {
	if (3 == obj.value.length) {
		document.getElementById('cellPhoneInput3').focus();
	}
    }
    else if ('cellPhoneInput3' == obj.id) {
	if (4 == obj.value.length) {
		document.getElementById('homePhoneInput1').focus();
		areaCodeCheck(obj);
	}
    }
}

//First, check to see if each requirement has been met.
//Next, update the page to provide some feedback about what the user has entered and still needs to enter.
//Last, change icons. If empty, then blank icon. If passed all tests, green check. Otherwise, red x.
function ValidatePassword(obj) {
	var enteredPassword = obj.value;

	(enteredPassword.match(upperCriteria)) ? hasUpper = true : hasUpper = false;
	(enteredPassword.match(lowerCriteria)) ? hasLower = true : hasLower = false;
	(enteredPassword.match(numberCriteria)) ? hasNumber = true : hasNumber = false;
	(enteredPassword.match(symbolCriteria)) ? hasSymbol = true : hasSymbol = false;

	(hasUpper) ? document.getElementById('pwdReq3').style.textDecoration = 'line-through' : document.getElementById('pwdReq3').style.textDecoration = 'none';
	(hasLower) ? document.getElementById('pwdReq4').style.textDecoration = 'line-through' : document.getElementById('pwdReq4').style.textDecoration = 'none';
	(hasSymbol) ? document.getElementById('pwdReq1').style.textDecoration = 'line-through' : document.getElementById('pwdReq1').style.textDecoration = 'none';
	(hasNumber) ? document.getElementById('pwdReq2').style.textDecoration = 'line-through' : document.getElementById('pwdReq2').style.textDecoration = 'none';

	if ('passwordInput' == obj.id) {
		if ('' == enteredPassword) { document.getElementById('passwordIcon').src = 'icon_BLANK.png'; }
		else {
			(hasUpper && hasLower && hasSymbol && hasNumber) ? document.getElementById('passwordIcon').src = 'icon_GO.png' : document.getElementById('passwordIcon').src = 'icon_NOGO.png';
		}
	}
	else {
		if ('' == enteredPassword) { document.getElementById('passwordConfirmIcon').src = 'icon_BLANK.png'; }
		else {
			passwordsMatch = (enteredPassword === document.getElementById('passwordInput').value);
			(hasUpper && hasLower && hasSymbol && hasNumber && passwordsMatch) ? document.getElementById('passwordConfirmIcon').src = 'icon_GO.png' : document.getElementById('passwordConfirmIcon').src = 'icon_NOGO.png';
		}
	}	
}

//Checks each icon and tells the user what, if anything, needs to be fixed in the form.
function validateClick() {
console.log('ValidateClick()');
	var icon1 = document.getElementById('firstNameIcon');
	var icon2 = document.getElementById('lastNameIcon');
	var icon3 = document.getElementById('emailIcon');
	var icon4 = document.getElementById('cellPhoneIcon');
	var icon5 = document.getElementById('homePhoneIcon');
	var icon6 = document.getElementById('passwordIcon');
	var icon7 = document.getElementById('passwordConfirmIcon');
	var feedback = '';

	if ('GO.png' != icon1.src.substr(-6)) { console.log('\tFirstName:\t\t NOGO'); feedback += 'There\'s something wrong with your first name.<br />'; } else { console.log('\tFirstName:\t\t GO'); }
	if ('GO.png' != icon2.src.substr(-6)) { console.log('\tLastName:\t\t NOGO'); feedback += 'There\'s something wrong with your last name.<br />'; } else { console.log('\tLastName:\t\t GO'); }
	if ('GO.png' != icon3.src.substr(-6)) { console.log('\tEmail:\t\t\t NOGO'); feedback += 'There\'s something wrong with your email address.<br />'; } else { console.log('\tEmail:\t\t\t GO'); }
	if ('GO.png' != icon4.src.substr(-6)) { console.log('\tCellPhone:\t\t NOGO'); feedback += 'There\'s something wrong with your cell number.<br />'; } else { console.log('\tCellPhone:\t\t GO'); }
	if ('GO.png' != icon5.src.substr(-6)) { console.log('\tHomePhone:\t\t NOGO'); feedback += 'There\'s something wrong with your home number.<br />'; } else { console.log('\tHomePhone:\t\t GO'); }
	if ('GO.png' != icon6.src.substr(-6)) { console.log('\tPassword:\t\t NOGO'); feedback += 'There\'s something wrong with your password.<br />'; } else { console.log('\tPassword:\t\t GO'); }
	if ('GO.png' != icon7.src.substr(-6)) { console.log('\tPasswordConfirm: NOGO'); feedback += 'There\'s something wrong with your password confirmation.<br />'; } else { console.log('\tPasswordConfirm: GO'); }

	if ('' == feedback) {  console.log('ValidateClick() - Feedback was empty so all had GO so form is validated.'); feedback = 'Everything Loooks Good!'; }
	myConsole.innerHTML = feedback;
}

