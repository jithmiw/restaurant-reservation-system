package lk.abc.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class MenuItem {

    @Id
    @Column(nullable = false)
    private String item_id;
    private String item_name;
    private String description;
    private BigDecimal price;
    private String status;
}
