package lk.abc.restaurant.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class StaffDTO {
    private String staff_id;
    private String member_name;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate reg_date;
}

