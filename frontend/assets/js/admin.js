let baseUrl = "http://localhost:8080/abc_restaurant/";

$(document).ready(function () {
    $('#home').click();
});

$("#generateTableId").click(function () {
    $.ajax({
        url: baseUrl + "table/generateTableId",
        method: "get",
        dataType: "json",
        success: function (res) {
            if (res.status === 200 && res.data) {
                $('#inputTableId').val(res.data);
            } else {
                console.error("Failed to generate table ID:", res.message);
                alert("Failed to generate table ID. Please try again.");
            }
        },
        error: function (error) {
            console.error("Error fetching table ID:", error);
            alert("Error fetching table ID. Please try again.");
        }
    });
    $('#inputType, #inputTableNo, #inputCapacity, #inputLocation, #inputReservationFee, #inputStatus, #inputImage').val("");
});

$("#generateStaffId").click(function () {
    $.ajax({
        url: baseUrl + "staff/generateStaffId",
        method: "get",
        dataType: "json",
        success: function (res) {
            if (res.status === 200 && res.data) {
                $('#inputStaffId').val(res.data);
            } else {
                console.error("Failed to generate staff ID:", res.message);
                alert("Failed to generate staff ID. Please try again.");
            }
        },
        error: function (error) {
            console.error("Error fetching staff ID:", error);
            alert("Error fetching staff ID. Please try again.");
        }
    });
    $('#inputName, #inputEmail, #inputContactNo, #inputUsername, #inputPassword').val("");
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

function loadAllStaff(staffId) {
    $.ajax({
        url: baseUrl + "staff/getAllStaffsId",
        success: function (res) {
            for (let n of res.data) {
                let staff_Id = n;
                if (staff_Id === staffId) {
                    continue;
                }
                $("#selectStaffId").append(`<option value="${staff_Id}">${staff_Id}</option>`);
            }
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText).message);
        }
    });
}

$('#viewTables').click(function () {
    getAllTables();
    $('#inputStatus').val('');
});

// get tables
function getAllTables() {
    let availableTables = 0;
    let reservedTables = 0;
    $('#tblTables').empty();
    $.ajax({
        url: baseUrl + "table",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    let tableId = c.table_id;
                    let tableNo = c.table_no;
                    let tableType = c.table_type;
                    let seatingCapacity = c.seating_capacity;
                    let location = c.location;
                    let reservationFee = c.reservation_fee;
                    let status = c.status;

                    if (status === "Available") {
                        availableTables++;
                    } else if (status === "Reserved") {
                        reservedTables++;
                    }

                    let row = "<tr><td>" + tableId + "</td><td>" + tableNo + "</td><td>" + tableType + "</td>" +
                        "<td>" + seatingCapacity + "</td><td>" + location + "</td><td>" + reservationFee + "</td>" +
                        "<td>" + status + "</td></tr>";
                    $('#tblTables').append(row);
                }
                bindClickEventsToTableRows();
            }
            clearManageTablesForm();
            $('#availableTables').text(availableTables);
            $('#reservedTables').text(reservedTables);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the table rows
function bindClickEventsToTableRows() {
    $('#tblTables > tr').on('click', function () {
        let tableId = $(this).children(':eq(0)').text();
        let tableNo = $(this).children(':eq(1)').text();
        let tableType = $(this).children(':eq(2)').text();
        let seatingCapacity = $(this).children(':eq(3)').text();
        let location = $(this).children(':eq(4)').text();
        let reservation_fee = $(this).children(':eq(5)').text();
        let status = $(this).children(':eq(6)').text();
        let image = $(this).children(':eq(7)').text();

        $('#inputTableId').val(tableId);
        $('#inputTableNo').val(tableNo);
        $('#inputType').val(tableType);
        $('#inputCapacity').val(seatingCapacity);
        $('#inputLocation').val(location);
        $('#inputReservationFee').val(reservation_fee);
        $('#inputImage').val(image);

        $('#inputStatus option').each(function () {
            if (status === "Available") {
                $("#inputStatus option[value=1]").attr('selected', 'selected');
            }
            else if (status === "Not Available") {
                $("#inputStatus option[value=2]").attr('selected', 'selected');
            } else {
                $("#inputStatus option[value=3]").attr('selected', 'selected');
            }
        });
    });
}

// get customers
function getAllCustomers() {
    $('#tblCustomers').empty();
    let registeredUsers = 0;
    $.ajax({
        url: baseUrl + "customer",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    registeredUsers++;
                    let customerId = c.customer_id;
                    let customerName = c.customer_name;
                    let contactNo = c.contact_no;
                    let email = c.email;
                    let regDate = c.reg_date;

                    let row = "<tr><td>" + customerId + "</td><td>" + customerName + "</td><td>" + contactNo + "</td>" +
                        "<td>" + email + "</td><td>" + regDate + "</td></tr>";
                    $('#tblCustomers').append(row);
                }
                bindClickEventsToCustomerRows();
            }
            $('#registeredUsers').text(registeredUsers);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the customer table rows
function bindClickEventsToCustomerRows() {
    $('#tblCustomers > tr').on('click', function () {
        let customerId = $(this).children(':eq(0)').text();
        let customerName = $(this).children(':eq(1)').text();
        let contactNo = $(this).children(':eq(2)').text();
        let email = $(this).children(':eq(3)').text();
        let regDate = $(this).children(':eq(4)').text();

        $('#cus-id').val(customerId);
        $('#customer-name').val(customerName);
        $('#contact-no').val(contactNo);
        $('#email').val(email);
        $('#registered-date').val(regDate);
    });
}

// // change staff
// $("#changeStaff").click(function () {
//     let reservationId = $('#reservation-id').val();
//     let staffId = $('#selectStaffId').val();
//     if (confirm('Are you sure you want to change the staff assigned in reservation id : ' + reservationId + '?')) {
//         $.ajax({
//             url: baseUrl + "staff?reservation_id=" + reservationId + "&staff_id=" + staffId,
//             method: "put",
//             success: function (res) {
//                 alert(res.message);
//             },
//             error: function (error) {
//                 alert(JSON.parse(error.responseText).message);
//             }
//         });
//     }
// });

// cancel request
$("#cancelRequest").click(function () {
    let reservationId = $('#reservation-id').val();
    let reservationStatus = $('#reservation-status').val();
    if (confirm('Are you sure you want to cancel this request in reservation id : ' + reservationId + '?')) {
        $.ajax({
            url: baseUrl + "reservationDetail?reservation_id=" + reservationId + "&reason=" + reservationStatus,
            method: "put",
            success: function (res) {
                alert(res.message);
                getReservationRequests();
                clearForm();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

function clearForm() {
    $('#reservation-id, #table-id, #cus-id, #reservation-date, #arrival-time, #departure-time, ' +
        '#reservation-status, #reserved-date').val("");
    $("#selectStaffId").empty();
}

// add staff
$("#saveStaff").click(function () {
    let formData = $('#staffForm').serialize();
    $.ajax({
        url: baseUrl + "staff",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            alert(res.message);
            getAllStaff();
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// update staff
$('#updateStaff').click(function () {
    let staffId = $('#inputStaffId').val();

    if (confirm('Are sure you want to update the staff member in ' + staffId + '?')) {
        let name = $('#inputName').val();
        let contactNo = $('#inputContactNo').val();
        let email = $('#inputEmail').val();
        let username = $('#inputUsername').val();
        let password = $('#inputPassword').val();
        let regDate = $('#regDate').val();

        var staffDTO = {
            staff_id: staffId,
            member_name: name,
            contact_no: contactNo,
            email: email,
            username: username,
            password: password,
            reg_date: regDate,
        }
        $.ajax({
            url: baseUrl + "staff",
            method: "put",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(staffDTO),
            success: function (res) {
                alert(res.message);
                getAllStaff();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// delete staff
$('#deleteStaff').click(function () {
    let staffId = $('#inputStaffId').val();

    if (confirm('Are sure you want to delete the staff member in ' + staffId + '?')) {
        $.ajax({
            url: baseUrl + "staff?staff_id=" + staffId,
            method: "delete",
            success: function (res) {
                alert(res.message);
                getAllStaff();
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

function clearManageStaffForm() {
    $('#inputName, #inputEmail, #inputContactNo, #inputStaffId, #inputUsername , #inputPassword').val("");
}

// get staff
function getAllStaff() {
    $('#tblStaff').empty();
    $.ajax({
        url: baseUrl + "staff",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    let staffId = c.staff_id;
                    let memberName = c.member_name;
                    let contactNo = c.contact_no;
                    let email = c.email;
                    let username = c.username;
                    let password = c.password;
                    let regDate = c.reg_date;

                    let row = "<tr><td>" + staffId + "</td><td>" + memberName + "</td><td>" + contactNo + "</td>" +
                        "<td>" + email + "</td><td class='d-none'>" + username + "</td>" +
                        "<td class='d-none'>" + password + "</td><td>" + regDate + "</td></tr>";
                    $('#tblStaff').append(row);
                }
                bindClickEventsToStaffRows();
            }
            clearManageStaffForm();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the staff table rows
function bindClickEventsToStaffRows() {
    $('#tblStaff > tr').on('click', function () {
        let staffId = $(this).children(':eq(0)').text();
        let memberName = $(this).children(':eq(1)').text();
        let contactNo = $(this).children(':eq(2)').text();
        let email = $(this).children(':eq(3)').text();
        let username = $(this).children(':eq(4)').text();
        let password = $(this).children(':eq(5)').text();
        let regDate = $(this).children(':eq(6)').text();

        $('#inputStaffId').val(staffId);
        $('#inputName').val(memberName);
        $('#inputContactNo').val(contactNo);
        $('#inputEmail').val(email);
        $('#inputUsername').val(username);
        $('#inputPassword').val(password);
        $('#regDate').val(regDate);
    });
}

// add table
$("#saveTable").click(function () {
    let formData = $('#tableForm').serialize();
    $.ajax({
        url: baseUrl + "table",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.status === 200) {
                // uploadTableImage();
                getAllTables();
            }
            alert(res.message);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// function uploadTableImage() {
//     let data = new FormData();
//     let image = $("#inputImage")[0].files[0];
//     let tableId = $("#inputTableId").val();
//
//     data.append("image", image, image.name);
//     data.append("tableId", tableId);
//
//     $.ajax({
//         url: baseUrl + "files/upload/tableImages",
//         method: "post",
//         async: true,
//         contentType: false,
//         processData: false,
//         data: data,
//         success: function (res) {
//             console.log(res.message);
//         },
//         error: function (err) {
//             console.log(err);
//         }
//     });
// }

// update table
$('#updateTable').click(function () {
    let tableId = $('#inputTableId').val();

    if (confirm('Are sure you want to update the table in ' + tableId + '?')) {
        let tableNo = $('#inputTableNo').val();
        let type = $('#inputType').val();
        let capacity = $('#inputCapacity').val();
        let location = $('#inputLocation').val();
        let reservationFee = $('#inputReservationFee').val();
        let status = $('#inputStatus').val();

        var tableOb = {
            table_id: tableId,
            table_no: tableNo,
            table_type: type,
            seating_capacity: capacity,
            location: location,
            reservation_fee: reservationFee,
            status: status
        }
        $.ajax({
            url: baseUrl + "table",
            method: "put",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(tableOb),
            success: function (res) {
                if (res.status === 200) {
                    // uploadTableImage();
                    getAllTables();
                    $('#inputStatus').val('');
                }
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// delete table
$('#deleteTable').click(function () {
    let tableId = $('#inputTableId').val();

    if (confirm('Are sure you want to delete the table in ' + tableId + '?')) {
        $.ajax({
            url: baseUrl + "table?table_id=" + tableId,
            method: "delete",
            success: function (res) {
                alert(res.message);
                getAllTables();
                $('#inputStatus').val('');
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

function clearManageTablesForm() {
    $('#inputTableId, #inputType, #inputTableNo, #inputCapacity, #inputLocation, #inputReservationFee, #inputStatus, #inputImage').val("");
    $('#inputStatus option[value=0]').attr('selected', 'selected');
}

// log out
$("#logOut").click(function () {
    if (confirm('Are sure you want to logout?')) {
        window.location.href = "index.html";

        function disableBack() {
            window.history.forward()
        }

        window.onload = disableBack();
        window.onpageshow = function (e) {
            if (e.persisted)
                disableBack();
        }
    }
});

