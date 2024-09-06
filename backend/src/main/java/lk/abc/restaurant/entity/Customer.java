package lk.abc.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class Customer {
    @Id
    @Column(nullable = false)
    private String customer_id;
    private String customer_name;
    private String contact_no;
    private String email;

    private String username;
    private String password;
    @CreationTimestamp
    private LocalDate reg_date;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationDetail> reservationDetails = new ArrayList<>();
}
