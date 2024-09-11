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
public class MenuItemDTO {

    private String item_id;
    private String item_name;
    private String description;
    private BigDecimal price;
    private String status;
}
