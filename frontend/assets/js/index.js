let baseUrl = "http://localhost:8080/abc_restaurant/";

$(document).ready(function () {
    $("#signUpButton").click(function () {
        $.ajax({
            url: baseUrl + "customer/generateCustomerId",
            method: "get",
            dataType: "json",
            success: function (res) {
                if (res.status === 200 && res.data) {
                    $('#customerId').val(res.data);
                } else {
                    console.error("Failed to generate customer ID:", res.message);
                    alert("Failed to generate customer ID. Please try again.");
                }
            },
            error: function (error) {
                console.error("Error fetching customer ID:", error);
                alert("Error fetching customer ID. Please try again.");
            }
        });
    });
});

// validations

// regular expressions
const usernameRegEx = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusEmailRegEx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const cusContactNoRegEx = /^(?:7|0|(?:\+94))[0-9]{9,10}$/;

// disable tab key of all text fields
$('#enterUsername, #enterPassword, #inputName, #inputEmail, #inputContactNo, #inputUsername, #inputPassword').on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

// login validations
let loginValidations = [];
loginValidations.push({
    reg: usernameRegEx,
    field: $('#enterUsername'),
    error: 'Wrong username pattern'
});
loginValidations.push({
    reg: passwordRegEx,
    field: $('#enterPassword'),
    error: 'Wrong password pattern'
});

$('#enterUsername, #enterPassword').on('keyup', function (event) {
    checkValidity(loginValidations, '#loginUser');
});

$('#enterUsername').on('keydown', function (event) {
    if (event.key === "Enter" && check(usernameRegEx, $('#enterUsername'))) {
        $('#enterPassword').focus();
    } else {
        focusText($('#enterUsername'));
    }
});

$('#enterPassword').on('keydown', function (event) {
    if (event.key === "Enter" && check(passwordRegEx, $('#enterPassword'))) {
        $('#loginUser').click();
    }
});

// customer validations
let customerValidations = [];
customerValidations.push({
    reg: cusNameRegEx,
    field: $('#inputName'),
    error: 'Wrong name pattern'
});
customerValidations.push({
    reg: cusEmailRegEx,
    field: $('#inputEmail'),
    error: 'Wrong email pattern'
});
customerValidations.push({
    reg: cusContactNoRegEx,
    field: $('#inputContactNo'),
    error: 'Wrong contact no pattern'
});
customerValidations.push({
    reg: usernameRegEx,
    field: $('#inputUsername'),
    error: 'Wrong username pattern'
});
customerValidations.push({
    reg: passwordRegEx,
    field: $('#inputPassword'),
    error: 'Wrong password pattern'
});

$('#inputName, #inputEmail, #inputContactNo, #inputUsername, #inputPassword').on('keyup', function (event) {
    checkValidity(customerValidations, '#saveCustomer');
});

$('#inputName').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusNameRegEx, $('#inputName'))) {
        $('#inputContactNo').focus();
    } else {
        focusText($('#inputName'));
    }
});

$('#inputContactNo').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusContactNoRegEx, $('#inputContactNo'))) {
        $('#inputEmail').focus();
    } else {
        focusText($('#inputContactNo'));
    }
});

$('#inputEmail').on('keydown', function (event) {
    if (event.key === "Enter" && check(cusEmailRegEx, $('#inputEmail'))) {
        $('#inputUsername').focus();
    } else {
        focusText($('#inputEmail'));
    }
});

$('#inputUsername').on('keydown', function (event) {
    if (event.key === "Enter" && check(usernameRegEx, $('#inputUsername'))) {
        $('#inputPassword').focus();
    } else {
        focusText($('#inputUsername'));
    }
});

$('#inputPassword').on('keydown', function (event) {
    if (!(event.key === "Enter" && check(passwordRegEx, $('#inputPassword')))) {
        focusText($('#inputPassword'));
    }
});

//
$("#toggleSignupPassword").click(function () {
    togglePassword($("#inputPassword"));
});

$("#toggleLoginPassword").click(function () {
    togglePassword($("#enterPassword"));
});

function togglePassword(value) {
    const type = value.attr("type") === "password" ? "text" : "password";
    value.prop("type", type);
    $('#toggleSignupPassword').toggleClass("bi bi-eye");
}

// login user
$("#loginUser").click(function () {
    let userDTO = {
        username: $("#enterUsername").val(),
        password: $("#enterPassword").val()
    }

    $.ajax({
        url: baseUrl + "login",
        method: "post",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(userDTO),
        success: function (res) {
            if (res.status === 200) {
                if (res.message === "Customer") {
                    loginCustomer(res.data.customer_id);
                } else if (res.message === "Staff") {
                    loginStaff(res.data.staff_id);
                } else if (res.message === "Admin") {
                    loginAdmin();
                }
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// add customer
$("#saveCustomer").click(function () {
    let formData = $('#customerForm').serialize();
    $.ajax({
        url: baseUrl + "customer",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.status === 200) {
                openCustomerHome();
                clearSignUpForm();
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

function disableBackButton() {
    function disableBack() {
        window.history.forward()
    }

    window.onload = disableBack();
    window.onpageshow = function (e) {
        if (e.persisted)
            disableBack();
    }
}

function loginCustomer(customer_id) {
    localStorage.setItem("customerIdValue", customer_id);
    window.location.href = "customer.html";
    disableBackButton();
}

function loginStaff(staff_id) {
    localStorage.setItem("staffIdValue", staff_id);
    window.location.href = "staff.html";
    disableBackButton();
}

function loginAdmin() {
    window.location.href = "admin.html";
    disableBackButton();
}

function openCustomerHome() {
    localStorage.setItem("customerIdValue", $('#customerId').val());
    window.location.href = "customer.html";
    disableBackButton();
}

function clearSignUpForm() {
    $('#inputName, #inputContactNo, #inputEmail, #inputUsername, #inputPassword').val("");
}