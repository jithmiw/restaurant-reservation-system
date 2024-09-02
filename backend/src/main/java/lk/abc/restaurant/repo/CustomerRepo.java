package lk.abc.restaurant.repo;

import lk.abc.restaurant.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepo extends JpaRepository<Customer, String> {

    Customer findCustomerByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT * FROM Customer WHERE customer_id=?1", nativeQuery = true)
    Customer findCustomerByCustomer_id(String customer_id);

    @Query(value = "SELECT customer_id FROM Customer ORDER BY customer_id DESC LIMIT 1", nativeQuery = true)
    String getLastCustomerId();
}
