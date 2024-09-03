package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.Table;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TableRepo extends JpaRepository<Table, String> {

    List<Table> findTableByStatus(String status);
}
