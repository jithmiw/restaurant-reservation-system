package lk.abc.restaurant.controller;


import lk.abc.restaurant.dto.CustomerDTO;
import lk.abc.restaurant.util.ResponseUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {

    @PostMapping
    public ResponseUtil saveCustomer(@ModelAttribute CustomerDTO dto) {
        System.out.println(dto.toString());
        return new ResponseUtil(200, "Customer added successfully", null);
    }
}
