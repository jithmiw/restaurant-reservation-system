package lk.abc.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class ReservationDetail {
    @Id
    @Column(nullable = false)
    private String reservation_id;
    private LocalDate reservation_date;
    private LocalTime arrival_time;
    private LocalTime departure_time;
    private int no_of_guests;
    private String reservation_status;
    @CreationTimestamp
    private LocalDate reserved_date;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "table_id", nullable = false)
    private RestaurantTable table;

    public ReservationDetail(String reservation_id, LocalDate reservation_date, LocalTime arrival_time, LocalTime departure_time, int no_of_guests, String reservation_status, Customer customer, RestaurantTable table) {
        this.reservation_id = reservation_id;
        this.reservation_date = reservation_date;
        this.arrival_time = arrival_time;
        this.departure_time = departure_time;
        this.no_of_guests = no_of_guests;
        this.reservation_status = reservation_status;
        this.customer = customer;
        this.table = table;
    }
}
