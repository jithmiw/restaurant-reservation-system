package lk.abc.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Table {
    @Id
    @Column(nullable = false)
    private String table_id;
    private String table_no;
    private String table_type;
    private int seating_capacity;
    private String location;
    private String status;

//    @OneToMany(mappedBy = "table", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<ReservationDetail> reservationDetails = new ArrayList<>();
}
