package lk.abc.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerDTO {

    private String customer_id;
    private String customer_name;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    private Date register_date;
}