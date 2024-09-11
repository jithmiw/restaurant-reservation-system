package lk.abc.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity
public class PaymentDetail {
    @Id
    private String payment_id;
    @CreationTimestamp
    private LocalDate payment_date;
    private BigDecimal reservation_fee;
    private BigDecimal total_payment;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rental_id")
    private ReservationDetail reservationDetail;

    public PaymentDetail(String payment_id, BigDecimal reservation_fee, BigDecimal total_payment, ReservationDetail reservationDetail) {
        this.payment_id = payment_id;
        this.total_payment = total_payment;
        this.reservationDetail = reservationDetail;
    }
}
