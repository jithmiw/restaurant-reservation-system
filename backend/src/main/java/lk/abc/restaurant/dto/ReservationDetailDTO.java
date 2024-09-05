package lk.abc.restaurant.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class ReservationDetailDTO {

    private String reservation_id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reservation_date;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime arrival_time;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime departure_time;
    private int no_of_guests;
    private String reservation_status;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reserved_date;

    private String customer_id;
    private String table_id;
}
