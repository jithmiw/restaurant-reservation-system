package lk.abc.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class TableDTO {

    private String table_id;
    private String table_no;
    private String table_type;
    private int seating_capacity;
    private String location;
    private BigDecimal reservation_fee;
    private String status;
}
