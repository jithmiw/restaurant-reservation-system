let baseUrl = "http://localhost:8080/abc_restaurant/";

getAllTables();

function getAllTables() {
    let tableCount = 0;
    $.ajax({
        url: baseUrl + "table",
        success: function (res) {
            var card = $(".card").clone();
            $('#tableCards').empty();
            for (let c of res.data) {
                tableCount++;
                let tableNo = c.table_no;
                let tableType = c.table_type;
                let seatingCapacity = c.seating_capacity;
                let location = c.location;
                let reservationFee = c.reservation_fee;

                var newCard = card.clone();
                // loadImage(tableId, newCard);
                newCard.find('.card-header').text(tableType);
                newCard.find('.card-title').text(tableNo);
                newCard.find('#tableId' + tableCount).text(tableId);
                newCard.find('.seating-capacity').text("Seating Capacity : " + seatingCapacity);
                newCard.find('.location').text("Location : " + location);
                newCard.find('.reservation-fee').text("Reservation Fee(Rs.) : " + reservationFee);
                $('#tableCards').append(newCard);
            }
        },
        error: function (error) {
            alert(JSON.parse(error.responseText).message);
        }
    });
}

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