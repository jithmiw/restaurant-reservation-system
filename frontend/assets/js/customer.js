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
                        customer_name: name,
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

// get reservations
function getAllReservations() {
    $('#tblReservations').empty();
    $.ajax({
        url: baseUrl + "reservationDetail/?customer_id=" + customerId,
        success: function (res) {
            if (res.data != null) {
                for (let r of res.data) {
                    let reservationId = r.reservation_id;
                    let tableId = r.table_id;
                    let reservationDate = r.reservation_date;
                    let arrivalTime = r.arrival_time;
                    let departureTime = r.departure_time;
                    let noOfGuests = r.no_of_guests;
                    let reservationStatus = r.reservation_status;
                    let reservedDate = r.reserved_date;

                    let button = ``;
                    if (reservationStatus === "Reserved") {
                        button = `<button type='button' class='btn btn-outline-secondary'>Cancel Request</button>`;
                    }
                    let row = "<tr><td>" + reservationId + "</td><td>" + tableId + "</td><td>" + reservationDate + "</td>" +
                        "<td>" + arrivalTime + "</td><td>" + departureTime + "</td><td>" + noOfGuests + "</td>" +
                        "<td>" + reservationStatus + "</td><td>" + reservedDate + "</td><td>" + button + "</td></tr>";
                    $('#tblReservations').append(row);
                }
            }
            bindEventsToRows();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the table rows
function bindEventsToRows() {
    $('#tblReservations > tr > td:nth-child(6) > button').on('click', function () {
        let reservationId = $(this).parent().parent().children(':eq(0)').text();

        if (confirm('Are sure you want to cancel the reservation in ' + reservationId + '?')) {
            $.ajax({
                url: baseUrl + "reservationDetail/cancelRequest?reservation_id=" + reservationId,
                method: "put",
                success: function (res) {
                    alert(res.message);
                    getAllReservations();
                },
                error: function (error) {
                    alert(JSON.parse(error.responseText).message);
                }
            });
        }
    });
}

let tableCards = $("#tableCards");
$('#searchTable').click(function () {
    let reservationDate = $("#search-reservation-date").val();
    let arrivalTime = $("#search-arrival-time").val();
    let departureTime = $("#search-departure-time").val();
    let tableCount = 0;
    $.ajax({
        url: baseUrl + "reservationDetail?reservation_date=" + reservationDate + "&arrival_time=" + arrivalTime + "&departure_time=" + departureTime,
        success: function (res) {
            if (res.data != null) {
                tableCards.removeClass("d-none");
                tableCards.addClass("d-block");
                var card = $("#tableCards > div:nth-child(1)").clone();
                tableCards.empty();
                for (let c of res.data) {
                    tableCount++;
                    let tableId = c.table_id;
                    let tableNo = c.table_no;
                    let tableType = c.table_type;
                    let seatingCapacity = c.seating_capacity;
                    let location = c.location;
                    let reservationFee = c.reservation_fee;

                    var newCard = card.clone();
                    newCard.find('.table-id').attr("id", "tableId" + tableCount);
                    newCard.find('.reservation-modal').attr("id", "reservationModal" + tableCount);
                    newCard.find('.btn-reservation').attr("data-bs-target", "#reservationModal" + tableCount);
                    // loadImage(tableId, newCard);
                    newCard.find('.card-header').text(tableType);
                    newCard.find('.card-title').text(tableNo);
                    newCard.find('#tableId' + tableCount).text(tableId);
                    newCard.find('.seating-capacity').text("Seating Capacity : " + seatingCapacity);
                    newCard.find('.location').text("Location : " + location);
                    newCard.find('.reservation-fee').text("Reservation Fee(Rs.) : " + reservationFee);
                    newCard.find('#reservationForm').attr("id", "#reservationForm" + tableCount);
                    tableCards.append(newCard);
                }
                bindClickEventsToButtons();
            } else {
                tableCards.removeClass("d-block");
                tableCards.addClass("d-none");
                alert("No tables available for the time duration you searched for");
            }
        },
        error: function () {
            tableCards.removeClass("d-block");
            tableCards.addClass("d-none");
            alert("No tables available for the time duration you searched for");
        }
    });
});

// function loadImage(table_id, newCard) {
//     $.ajax({
//         url: baseUrl + "tableImageDetail/" + table_id,
//         success: function (res) {
//             newCard.find('.card-img-top').attr("src", baseUrl + res.data.image);
//         },
//         error: function (error) {
//             alert(JSON.parse(error.responseText).message);
//         }
//     });
// }

$(document).on('show.bs.modal', '.reservationModal', function (e) {
    let reservationModalId = '#' + $(this).attr("id");
    generateNewId(reservationModalId);

    let num = reservationModalId.slice(17);
    let tableId = $('#tableId' + num).text();
    $(reservationModalId + ' .table-id').val(tableId);
    $(reservationModalId + ' .customer-id').val(customerId);
    $(reservationModalId + ' .reservation-date').val($("#search-reservation-date").val());
    $(reservationModalId + ' .arrival-time').val($("#search-arrival-time").val());
    $(reservationModalId + ' .departure-time').val($("#search-departure-time").val());
});

function generateNewId(reservationModalId) {
    $.ajax({
        url: baseUrl + "reservationDetail/generateReservationId",
        success: function (res) {
            $(reservationModalId + ' .reservation-id').val(res.data);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

function bindClickEventsToButtons() {
    $('.reserveTable').on('click', function () {
        let reservationId;
        let reservationDTO = {};
        let dataArray = $(this).closest("form").serializeArray();
        for (let i in dataArray) {
            reservationDTO[dataArray[i].name] = dataArray[i].value;
            if (dataArray[i].name === "reservation_id") {
                reservationId = dataArray[i].value;
            }
        }
        $.ajax({
            url: baseUrl + "reservationDetail",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(reservationDTO),
            success: function (res) {
                if (res.status === 200) {
                    let data = new FormData();
                    data.append("reservationId", reservationId);
                    clearReservationForm();
                }
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    });
}

function clearReservationForm() {
    location.reload();
    disableBackButton();
}

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