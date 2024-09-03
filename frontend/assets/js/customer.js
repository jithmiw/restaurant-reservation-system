let baseUrl = "http://localhost:8080/abc_restaurant/";

$(document).ready(function () {
    $("#home").click();
});

$("#home").click(function () {
    $('#customer-home').css('display', 'block');
    $('#reservations').css('display', 'none');
});

$("#my-reservations").click(function () {
    $('#reservations').css('display', 'block');
    $('#customer-home').css('display', 'none');
    getAllReservations();
});

$("#toggleUpdatePassword").click(function () {
    togglePassword($("#updatePassword"));
});

function togglePassword(value) {
    const type = value.attr("type") === "password" ? "text" : "password";
    value.prop("type", type);
    $('#toggleUpdatePassword').toggleClass("bi bi-eye");
}

let customerId = localStorage.getItem("customerIdValue");

$('#my-profile').click(function () {
    $.ajax({
        url: baseUrl + "customer/" + customerId,
        success: function (res) {
            $("#updateCustomerId").val(res.data.customer_id);
            $("#updateName").val(res.data.customer_name);
            $("#updateContactNo").val(res.data.contact_no);
            $("#updateEmail").val(res.data.email);
            $("#updateUsername").val(res.data.username);
            $("#updatePassword").val(res.data.password);
            $("#updateRegDate").val(res.data.reg_date);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// update customer
$('#updateCustomer').click(function () {
    let customerId = $('#updateCustomerId').val();

    $.ajax({
        url: baseUrl + "ReservationDetail/countRequests?customer_id=" + customerId,
        success: function (res) {
            if (res.data === 0) {
                if (confirm('Are sure you want to update your profile?')) {
                    let name = $('#updateName').val();
                    let contactNo = $('#updateContactNo').val();
                    let email = $('#updateEmail').val();
                    let username = $('#updateUsername').val();
                    let password = $('#updatePassword').val();
                    let regDate = $('#updateRegDate').val();

                    var customerDTO = {
                        customer_id: customerId,
                        driver_name: name,
                        contact_no: contactNo,
                        email: email,
                        username: username,
                        password: password,
                        reg_date: regDate,
                    }
                    $.ajax({
                        url: baseUrl + "customer",
                        method: "put",
                        contentType: "application/json",
                        dataType: "json",
                        data: JSON.stringify(customerDTO),
                        success: function (res) {
                            alert(res.message);
                        },
                        error: function (error) {
                            alert(JSON.parse(error.responseText).message);
                        }
                    });
                }
            } else {
                alert('Sorry, you are not allowed to update your profile while there is an ongoing reservation');
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// log out
$("#logOut").click(function () {
    if (confirm('Are sure you want to logout?')) {
        window.location.href = "index.html";
        disableBackButton();
    }
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