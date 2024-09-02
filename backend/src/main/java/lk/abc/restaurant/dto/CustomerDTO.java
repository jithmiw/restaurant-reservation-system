package lk.abc.restaurant.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

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
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reg_date;
}