package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StaffRepo extends JpaRepository<Staff, String> {

    Staff findStaffByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT * FROM Staff WHERE staff_id=?1", nativeQuery = true)
    Staff findStaffByStaffId(String staff_id);

    @Query(value = "SELECT staff_id FROM Staff ORDER BY staff_id DESC LIMIT 1", nativeQuery = true)
    String getLastStaffId();
}
