let baseUrl = "http://localhost:8080/abc_restaurant/";

$(document).ready(function () {
    $('#home').click();
});

$('#home').click(function () {
    $('#dashboard').css('display', 'block');
    $('#reservations, #tables, #customers, #staff, #payments').css('display', 'none');
    setDashboard();
});

$('#manage-reservations').click(function () {
    $('#reservations').css('display', 'block');
    $('#dashboard, #tables, #customers, #payments, #staff').css('display', 'none');
    // getReservationRequests();
    $('#btnReserved').click();

});

$('#manage-tables').click(function () {
    $('#tables').css('display', 'block');
    $('#dashboard, #customers, #staff, #payments, #reservations').css('display', 'none');
    // getReservationRequests();
    $('#btnReserved').click();
});

$('#manage-staff').click(function () {
    $('#staff').css('display', 'block');
    $('#dashboard, #tables, #customers, #reservations, #payments').css('display', 'none');
    getAllStaff();
});

$('#view-customers').click(function () {
    $('#customers').css('display', 'block');
    $('#dashboard, #reservations, #tables, #staff, #payments').css('display', 'none');
    getAllCustomers();
});

$('#view-payments').click(function () {
    $('#payments').css('display', 'block');
    $('#dashboard, #reservations, #tables, #staff, #customers').css('display', 'none');
    getAllPayments();
});

function setDashboard() {
    getAllCustomers();
    getAllTables();
    // getReservationRequests();
    getAllPayments();
}

let reservation = [];
let closed = [];
let cancelled = [];

// get reservation requests
function getReservationRequests() {
    let todayBookings = 0;
    reservation = [];
    closed = [];
    cancelled = [];
    $.ajax({
        url: baseUrl + "reservationDetail/getReservationRequests",
        success: function (res) {
            if (res.data != null) {
                for (let r of res.data) {
                    let resDate = new Date(r.reserved_date);
                    let currDate = new Date();

                    if (resDate.setHours(0, 0, 0, 0) ===
                        currDate.setHours(0, 0, 0, 0)) {
                        todayBookings++;
                    }
                    let reservationStatus = r.reservation_status;

                    if (reservationStatus === "Reserved") {
                        reservation.push(r);
                    } else if (reservationStatus === "Closed") {
                        closed.push(r);
                    } else {
                        cancelled.push(r);
                    }
                }
                $('#todayBookings').text(todayBookings);
            }
            clearForm();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

$('#btnCancelled').click(function () {
    setTableRows(cancelled);
});

$('#btnClosed').click(function () {
    setTableRows(closed);
});

// set table rows
function setTableRows(array) {
    $('#tblReservations').empty();
    array.forEach(function (r) {
        let reservationId = r.reservation_id;
        let customerId = r.customer_id;
        let tableId = r.table_id;
        let reservationDate = r.reservation_date;
        let arrivalTime = r.arrival_time;
        let departureTime = r.departure_time;
        // let staffStatus = r.staff_status;
        let reservationStatus = r.reservation_status;
        let reservedDate = r.reserved_date;

        let row = "<tr><td>" + reservationId + "</td><td>" + customerId + "</td><td>" + tableId + "</td>" +
            "<td>" + reservationDate + "</td><td>" + arrivalTime + "</td><td>" + departureTime + "</td><td>" + reservationStatus + "</td>" +
            "<td>" + reservedDate + "</td><td class='d-none'>";
        $('#tblReservations').append(row);
    });
    bindClickEventsToRows();
}

// bind events for the table rows
function bindClickEventsToRows() {
    $('#tblReservations > tr').on('click', function () {
        let reservationId = $(this).children(':eq(0)').text();
        let customerId = $(this).children(':eq(1)').text();
        let tableId = $(this).children(':eq(2)').text();
        let reservationDate = $(this).children(':eq(3)').text();
        let arrivalTime = $(this).children(':eq(4)').text();
        let departureTime = $(this).children(':eq(5)').text();
        let reservationStatus = $(this).children(':eq(6)').text();
        let reservedDate = $(this).children(':eq(7)').text();

        $('#reservation-id').val(reservationId);
        $('#table-id').val(tableId);
        $('#cus-id').val(customerId);
        $('#reservation-date').val(reservationDate);
        $('#arrival-time').val(arrivalTime);
        $('#departure-time').val(departureTime);
        $('#reservation-status').val(reservationStatus);
        $('#reserved-date').val(reservedDate);
        clearPaymentForm();

        // if (reservationStatus !== "Reserved" && reservationStatus !== "Cancelled" && reservationStatus !== "Closed") {
        //     $('#reservation-status').val(reservationStatus);
        //     $('#reservation-status-hd').text('(Denied)');
        // } else {
        //     $('#reservation-status').val('');
        //     $('#reservation-status-hd').text('(' + reservationStatus + ')');
        // }
        if (staffStatus === "Yes") {
            $("#selectStaffId").empty();
            $.ajax({
                url: baseUrl + "staff/reservationId/" + reservationId,
                success: function (res) {
                    let staffId = res.data;
                    $("#selectStaffId").append(`<option selected value="${staffId}">${staffId}</option>`);
                    loadAllStaff(staffId);
                },
                error: function (error) {
                    console.log(JSON.parse(error.responseText).message);
                }
            });
        } else {
            $("#selectStaffId").empty();
            $("#selectStaffId").append(`<option selected value="No">No</option>`);
        }
    });
}

