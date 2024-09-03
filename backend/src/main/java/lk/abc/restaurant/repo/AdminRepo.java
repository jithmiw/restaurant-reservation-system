package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, String> {

    Admin findAdminByUsernameAndPassword(String username, String password);
}
