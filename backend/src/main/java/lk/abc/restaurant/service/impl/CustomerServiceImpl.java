package lk.abc.restaurant.service.impl;

import lk.abc.restaurant.dto.CustomerDTO;
import lk.abc.restaurant.entity.Customer;
import lk.abc.restaurant.repo.CustomerRepo;
import lk.abc.restaurant.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getCustomer_id())) {
            throw new RuntimeException("Customer already registered");
        }
        Customer customer = mapper.map(dto, Customer.class);
        customerRepo.save(customer);
    }

    @Override
    public void updateCustomer(CustomerDTO dto) {
        if (!customerRepo.existsById(dto.getCustomer_id())) {
            throw new RuntimeException("No such a customer, Please enter valid customer id");
        }
        customerRepo.save(mapper.map(dto, Customer.class));
    }

    @Override
    public void deleteCustomer(String customer_id) {
        if (!customerRepo.existsById(customer_id)) {
            throw new RuntimeException("No such a customer, Please enter valid customer id");
        }
        customerRepo.deleteById(customer_id);
    }

    @Override
    public String generateNewCustomerId() {
        String customer_id = "";
        customer_id = customerRepo.getLastCustomerId();
        if (customer_id != null) {
            int newCustomerId = Integer.parseInt(customer_id.replace("CID-", "")) + 1;
            return String.format("CID-%03d", newCustomerId);
        }
        return "CID-001";
    }

    @Override
    public CustomerDTO getCustomerByCustomerId(String customer_id) {
        Customer customer = customerRepo.findCustomerByCustomer_id(customer_id);
        if (customer != null) {
            return mapper.map(customer, CustomerDTO.class);
        }
        return null;
    }

    @Override
    public CustomerDTO verifyCustomer(String username, String password) {
        Customer customer = customerRepo.findCustomerByUsernameAndPassword(username, password);
        if (!(customer == null)) {
            return mapper.map(customer, CustomerDTO.class);
        }
        return null;
    }

    @Override
    public ArrayList<CustomerDTO> getAllCustomers() {
        List<Customer> all = customerRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<CustomerDTO>>() {
        }.getType());
    }
}
