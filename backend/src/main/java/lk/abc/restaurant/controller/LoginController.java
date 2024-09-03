package lk.abc.restaurant.controller;

import lk.abc.restaurant.dto.AdminDTO;
import lk.abc.restaurant.dto.CustomerDTO;
import lk.abc.restaurant.dto.StaffDTO;
import lk.abc.restaurant.dto.UserDTO;
import lk.abc.restaurant.service.AdminService;
import lk.abc.restaurant.service.CustomerService;
import lk.abc.restaurant.service.StaffService;
import lk.abc.restaurant.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LoginController {

    @Autowired
    CustomerService customerService;

    @Autowired
    StaffService staffService;

    @Autowired
    AdminService adminService;

    @PostMapping
    public ResponseUtil verifyUser(@RequestBody UserDTO userDTO) {

        CustomerDTO customerDTO = customerService.verifyCustomer(userDTO.getUsername(), userDTO.getPassword());

        if (customerDTO == null) {
            AdminDTO adminDTO = adminService.verifyAdmin(userDTO.getUsername(), userDTO.getPassword());
            if (adminDTO == null) {
                StaffDTO staffDTO = staffService.verifyStaff(userDTO.getUsername(), userDTO.getPassword());
                if (!(staffDTO == null)) {
                    return new ResponseUtil(200, "Staff", staffDTO);
                } else {
                    throw new RuntimeException("You have entered an invalid username or password. Please try again.");
                }
            } else {
                return new ResponseUtil(200, "Admin", adminDTO);
            }
        } else {
            return new ResponseUtil(200, "Customer", customerDTO);
        }
    }
}
