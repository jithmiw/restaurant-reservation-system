package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.RestaurantTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TableRepo extends JpaRepository<RestaurantTable, String> {

    List<RestaurantTable> findTableByStatus(String status);

    @Query(value = "SELECT table_id FROM RestaurantTable ORDER BY table_id DESC LIMIT 1", nativeQuery = true)
    String getLastTableId();
}
