package lk.abc.restaurant.service;

import lk.abc.restaurant.dto.CustomerDTO;

import java.util.ArrayList;

public interface CustomerService {
    void saveCustomer(CustomerDTO dto);

    void updateCustomer(CustomerDTO dto);

    void deleteCustomer(String customer_id);

    String generateNewCustomerId();

    CustomerDTO verifyCustomer(String username, String password);

    CustomerDTO getCustomerByCustomerId(String customer_id);

    ArrayList<CustomerDTO> getAllCustomers();
}
