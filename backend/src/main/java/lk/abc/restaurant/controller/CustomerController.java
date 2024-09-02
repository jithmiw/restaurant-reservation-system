package lk.abc.restaurant.controller;


import lk.abc.restaurant.dto.CustomerDTO;
import lk.abc.restaurant.service.CustomerService;
import lk.abc.restaurant.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto) {
        customerService.saveCustomer(dto);
        return new ResponseUtil(200, "Customer added successfully", null);
    }

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto) {
        customerService.updateCustomer(dto);
        return new ResponseUtil(200, "Customer id: " + dto.getCustomer_id() + " customer updated successfully", null);
    }

    @DeleteMapping(params = {"customer_id"})
    public ResponseUtil deleteCustomer(@RequestParam String customer_id) {
        customerService.deleteCustomer(customer_id);
        return new ResponseUtil(200, "Customer id: " + customer_id + " customer deleted successfully", null);
    }

    @GetMapping(path = "/generateCustomerId")
    public ResponseUtil generateCustomerId() {
        return new ResponseUtil(200, "Customer id generated", customerService.generateNewCustomerId());
    }

    @GetMapping(path = "/{customer_id}")
    public ResponseUtil getCustomerByCustomerId(@PathVariable String customer_id) {
        CustomerDTO customerDTO = customerService.getCustomerByCustomerId(customer_id);
        return new ResponseUtil(200, "Customer exists", customerDTO);
    }

    @GetMapping
    public ResponseUtil getAllCustomers() {
        return new ResponseUtil(200, "Loaded successfully", customerService.getAllCustomers());
    }
}
