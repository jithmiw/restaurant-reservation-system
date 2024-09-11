package lk.abc.restaurant.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class PaymentDetailDTO {

    private String payment_id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate payment_date;
    private BigDecimal reservation_fee;
    private BigDecimal total_payment;

    private String rental_id;
}
