package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentDetailRepo extends JpaRepository<PaymentDetail, String> {

    @Query(value = "SELECT payment_id FROM PaymentDetail ORDER BY payment_id DESC LIMIT 1", nativeQuery = true)
    String getLastPaymentId();
}
