package lk.abc.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Staff {
    @Id
    @Column(nullable = false)
    private String staff_id;
    private String member_name;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    @CreationTimestamp
    private LocalDate reg_date;
}
