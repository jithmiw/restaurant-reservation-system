package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuItemRepo extends JpaRepository<MenuItem, String> {

    List<MenuItem> findItemByStatus(String status);

    @Query(value = "SELECT item_id FROM MenuItem ORDER BY item_id DESC LIMIT 1", nativeQuery = true)
    String getLastItemId();
}
