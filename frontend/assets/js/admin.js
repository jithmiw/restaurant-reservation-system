let baseUrl = "http://localhost:8080/abc_restaurant/";

$(document).ready(function () {
    $('#home').click();
});

$("#generateItemId").click(function () {
    $.ajax({
        url: baseUrl + "item/generateItemId",
        method: "get",
        dataType: "json",
        success: function (res) {
            if (res.status === 200 && res.data) {
                $('#inputItemId').val(res.data);
            } else {
                console.error("Failed to generate item ID:", res.message);
                alert("Failed to generate item ID. Please try again.");
            }
        },
        error: function (error) {
            console.error("Error fetching item ID:", error);
            alert("Error fetching item ID. Please try again.");
        }
    });
    $('#inputItemName, #inputDesc, #inputPrice, #inputAvailability, #inputItemImage').val("");
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
    $('#inputType, #inputTableNo, #inputCapacity, #inputLocation, #inputReservationFee, #inputStatus, #inputTableImage').val("");
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
    $('#reservations, #tables, #customers, #staff, #payments, #items').css('display', 'none');
    setDashboard();
});

$('#manage-reservations').click(function () {
    $('#reservations').css('display', 'block');
    $('#dashboard, #tables, #customers, #payments, #staff, #items').css('display', 'none');
    getReservationRequests();
    $('#btnReserved').click();

});

$('#manage-items').click(function () {
    $('#items').css('display', 'block');
    $('#dashboard, #customers, #staff, #payments, #reservations, #tables').css('display', 'none');
    getReservationRequests();
    $('#btnReserved').click();
});

$('#manage-tables').click(function () {
    $('#tables').css('display', 'block');
    $('#dashboard, #customers, #staff, #payments, #reservations, #items').css('display', 'none');
    getReservationRequests();
    $('#btnReserved').click();
});

$('#manage-staff').click(function () {
    $('#staff').css('display', 'block');
    $('#dashboard, #tables, #customers, #reservations, #payments, #items').css('display', 'none');
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
    // getAllItems();
    getReservationRequests();
    getAllPayments();
}

let reserved = [];
let closed = [];
let cancelled = [];

// get reservation requests
function getReservationRequests() {
    let todayBookings = 0;
    reserved = [];
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
                        reserved.push(r);
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

$('#btnReserved').click(function () {
    setTableRows(reserved);
});

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
        let noOfGuests = r.no_of_guests;
        let reservationStatus = r.reservation_status;
        let reservedDate = r.reserved_date;

        let row = "<tr><td>" + reservationId + "</td><td>" + customerId + "</td><td>" + tableId + "</td>" +
            "<td>" + reservationDate + "</td><td>" + arrivalTime + "</td><td>" + departureTime + "</td><td>" + noOfGuests + "</td><td>" + reservationStatus + "</td>" +
            "<td>" + reservedDate + "</td>";
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
        let noOfGuests = $(this).children(':eq(6)').text();
        let reservationStatus = $(this).children(':eq(7)').text();
        let reservedDate = $(this).children(':eq(8)').text();

        $('#reservation-id').val(reservationId);
        $('#table-id').val(tableId);
        $('#customer-id').val(customerId);
        $('#reservation-date').val(reservationDate);
        $('#arrival-time').val(arrivalTime);
        $('#departure-time').val(departureTime);
        $('#no-of-guests').val(noOfGuests);
        $('#reservation-status').val(reservationStatus);
        $('#reserved-date').val(reservedDate);
        clearPaymentForm();

        if (reservationStatus !== "Reserved" && reservationStatus !== "Cancelled" && reservationStatus !== "Closed") {
            $('#reservation-status').val(reservationStatus);
            $('#reservation-status-hd').text('(Denied)');
        } else {
            $('#reservation-status').val('');
            $('#reservation-status-hd').text('(' + reservationStatus + ')');
        }
        // if (staffStatus === "Yes") {
        //     $("#selectStaffId").empty();
        //     $.ajax({
        //         url: baseUrl + "staff/reservationId/" + reservationId,
        //         success: function (res) {
        //             let staffId = res.data;
        //             $("#selectStaffId").append(`<option selected value="${staffId}">${staffId}</option>`);
        //             loadAllStaff(staffId);
        //         },
        //         error: function (error) {
        //             console.log(JSON.parse(error.responseText).message);
        //         }
        //     });
        // } else {
        //     $("#selectStaffId").empty();
        //     $("#selectStaffId").append(`<option selected value="No">No</option>`);
        // }
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
        $('#inputTableImage').val(image);

        $('#inputStatus option').each(function () {
            if (status === "Available") {
                $("#inputStatus option[value=1]").attr('selected', 'selected');
            } else if (status === "Not Available") {
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
                $('#btnCancelled').click();
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

// add item
$("#saveItem").click(function () {
    let formData = $('#itemForm').serialize();
    $.ajax({
        url: baseUrl + "item",
        method: "post",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.status === 200) {
                getAllItems();
            }
            alert(res.message);
        },
        error: function (error) {
            console.log(JSON.parse(error.responseText));
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// update item
$('#updateItem').click(function () {
    let itemId = $('#inputItemId').val();

    if (confirm('Are sure you want to update the item in ' + itemId + '?')) {
        let itemName = $('#inputItemName').val();
        let desc = $('#inputDesc').val();
        let price = $('#inputPrice').val();
        let availablility = $('#inputAvailability').val();

        var itemOb = {
            item_id: itemId,
            item_name: itemName,
            description: desc,
            price: price,
            status: availablility
        }
        $.ajax({
            url: baseUrl + "item",
            method: "put",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(itemOb),
            success: function (res) {
                if (res.status === 200) {
                    getAllItems();
                    $('#inputAvailability').val('');
                }
                alert(res.message);
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// delete item
$('#deleteItem').click(function () {
    let itemId = $('#inputItemId').val();

    if (confirm('Are sure you want to delete the item in ' + itemId + '?')) {
        $.ajax({
            url: baseUrl + "item?item_id=" + itemId,
            method: "delete",
            success: function (res) {
                alert(res.message);
                getAllItems();
                $('#inputAvailability').val('');
            },
            error: function (error) {
                alert(JSON.parse(error.responseText).message);
            }
        });
    }
});

// get items
function getAllItems() {
    $('#tblItems').empty();
    $.ajax({
        url: baseUrl + "item",
        success: function (res) {
            if (res.data != null) {
                for (let c of res.data) {
                    let itemId = c.item_id;
                    let itemName = c.item_name;
                    let description = c.description;
                    let price = c.price;
                    let status = c.status;

                    let row = "<tr><td>" + itemId + "</td><td>" + itemName + "</td><td>" + description + "</td>" +
                        "<td>" + price + "</td><td>" + status + "</td></tr>";
                    $('#tblItems').append(row);
                }
                bindClickEventsToItemRows();
            }
            clearManageItemsForm();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

// bind events for the item rows
function bindClickEventsToItemRows() {
    $('#tblItems > tr').on('click', function () {
        let itemId = $(this).children(':eq(0)').text();
        let itemName = $(this).children(':eq(1)').text();
        let description = $(this).children(':eq(2)').text();
        let price = $(this).children(':eq(3)').text();
        let status = $(this).children(':eq(4)').text();
        let image = $(this).children(':eq(5)').text();

        $('#inputItemId').val(itemId);
        $('#inputItemName').val(itemName);
        $('#inputDesc').val(description);
        $('#inputPrice').val(price);
        $('#inputTableImage').val(image);

        $('#inputAvailability option').each(function () {
            if (status === "Available") {
                $("#inputAvailability option[value=1]").attr('selected', 'selected');
            } else if (status === "Not Available") {
                $("#inputAvailability option[value=2]").attr('selected', 'selected');
            } else {
                $("#inputAvailability option[value=3]").attr('selected', 'selected');
            }
        });
    });
}

function clearManageItemsForm() {
    $('#inputItemId, #inputItemName, #inputDesc, #inputPrice, #inputAvailability, #inputItemImage').val("");
    $('#inputAvailability option[value=0]').attr('selected', 'selected');
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
//     let image = $("#inputTableImage")[0].files[0];
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
    $('#inputTableId, #inputType, #inputTableNo, #inputCapacity, #inputLocation, #inputReservationFee, #inputStatus, #inputTableImage').val("");
    $('#inputStatus option[value=0]').attr('selected', 'selected');
}

$(document).on('show.bs.modal', '#calculatePaymentModal', function (e) {
    generateNewId();
    calculateRates();
    $('#payment-reservation-id').val($('#reservation-id').val());
});

function generateNewId() {
    $.ajax({
        url: baseUrl + "paymentDetail/generatePaymentId",
        success: function (res) {
            $('#payment-id').val(res.data);
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

function calculateRates() {
    let tableId = $('#table-id').val();
    $.ajax({
        url: baseUrl + "table?table_id=" + tableId,
        success: function (res) {
            let reservationFee = res.data.reservation_fee;

            if ($('#reservation-status-hd').text() === '(Denied)' || $('#reservation-status-hd').text() === '(Cancelled)') {
                $('#reservation-fee, #total-payment').val(0);
            } else {
                $('#rental-fee').val(reservationFee);
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

function clearPaymentForm() {
    $('#reservation-status-hd, #reservation-fee,  #total-payment').val('');
    $("#calculatePaymentModal .btn-close").click();
}

// add payment detail
$("#btnPay").click(function () {
    let paymentDTO = {};
    let dataArray = $('#paymentForm').serializeArray();
    for (let i in dataArray) {
        paymentDTO[dataArray[i].name] = dataArray[i].value;
    }
    $.ajax({
        url: baseUrl + "paymentDetail",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(paymentDTO),
        success: function (res) {
            alert(res.message);
            clearPaymentForm();
            $('#payment-id').val('');
            $('#payment-reservation-id').val('');
            getReservationRequests();
            $('#btnClosed').click();
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
});

// get payments
function getAllPayments() {
    let dailyIncome = 0;
    $('#tblPayments').empty();
    $.ajax({
        url: baseUrl + "paymentDetail",
        success: function (res) {
            if (res.data != null) {
                for (let p of res.data) {
                    let payDate = new Date(p.payment_date);
                    let currDate = new Date();

                    if (payDate.setHours(0, 0, 0, 0) ===
                        currDate.setHours(0, 0, 0, 0)) {
                        dailyIncome += p.total_payment;
                    }

                    let paymentId = p.payment_id;
                    let reservationId = p.reservation_id;
                    let reservationFee = p.reservation_fee;
                    let totalPayment = p.total_payment;
                    let paymentDate = p.payment_date;

                    let row = "<tr><td>" + paymentId + "</td><td>" + reservationId + "</td><td>" + reservationFee + "</td>" +
                        "<td>" + totalPayment + "</td><td>" + paymentDate + "</td></tr>";
                    $('#tblPayments').append(row);
                }
                $('#dailyIncome').text(dailyIncome);
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
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

