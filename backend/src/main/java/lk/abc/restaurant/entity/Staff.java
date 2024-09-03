package lk.abc.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
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

//    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<StaffSchedule> staffSchedules = new ArrayList<>();
}
