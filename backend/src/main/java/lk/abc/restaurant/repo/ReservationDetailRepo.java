package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.ReservationDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationDetailRepo extends JpaRepository<ReservationDetail, String> {

    @Query(value = "SELECT * FROM ReservationDetail WHERE table_id=?1 && reservation_status=?2 OR reservation_status=?3", nativeQuery = true)
    List<ReservationDetail> findReservationDetailByTableIdAndReservation_status(String table_id, String reservation_status);

    @Query(value = "SELECT reservation_id FROM ReservationDetail ORDER BY reservation_id DESC LIMIT 1", nativeQuery = true)
    String getLastReservationId();

    @Query(value = "SELECT * FROM ReservationDetail WHERE reservation_id=?1", nativeQuery = true)
    ReservationDetail findReservationDetailByReservationId(String reservation_id);

    @Query(value = "SELECT * FROM ReservationDetail WHERE customer_id=?1 && reservation_status!=2", nativeQuery = true)
    List<ReservationDetail> findReservationDetailByCustomerId(String customer_id, String reservation_status);

    @Query(value = "SELECT COUNT(*) FROM ReservationDetail WHERE customer_id=?1 && reservation_status!=2", nativeQuery = true)
    int countReservationDetailByCustomerId(String customer_id, String reservation_status);
}
