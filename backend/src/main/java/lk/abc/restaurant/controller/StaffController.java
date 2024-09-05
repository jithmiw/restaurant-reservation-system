package lk.abc.restaurant.controller;

import lk.abc.restaurant.dto.StaffDTO;
import lk.abc.restaurant.service.StaffService;
import lk.abc.restaurant.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/staff")
@CrossOrigin
public class StaffController {

    @Autowired
    private StaffService staffService;

    @PostMapping
    public ResponseUtil saveStaff(@ModelAttribute StaffDTO dto) {
        staffService.saveStaff(dto);
        return new ResponseUtil(200, "Staff member added successfully", null);
    }

    @PutMapping
    public ResponseUtil updateStaff(@RequestBody StaffDTO dto) {
        staffService.updateStaff(dto);
        return new ResponseUtil(200, "Staff id: " + dto.getStaff_id() + " staff member updated successfully", null);
    }

//    @PutMapping(params = {"reservation_id", "staff_id"})
//    public ResponseUtil changeStaff(@RequestParam String reservation_id, @RequestParam String staff_id) {
//        staffService.changeStaff(reservation_id, staff_id);
//        return new ResponseUtil(200, "Reservation id: " + reservation_id + " staff member changed successfully", null);
//    }

    @DeleteMapping(params = {"staff_id"})
    public ResponseUtil deleteStaff(@RequestParam String staff_id) {
        staffService.deleteStaff(staff_id);
        return new ResponseUtil(200, "Staff id: " + staff_id + " staff member deleted successfully", null);
    }

    @GetMapping(path = "/{staff_id}")
    public ResponseUtil getStaffByStaffId(@PathVariable String staff_id) {
        StaffDTO staffDTO = staffService.getStaffByStaffId(staff_id);
        return new ResponseUtil(200, "Staff member exists", staffDTO);
    }

    @GetMapping(path = "/generateStaffId")
    public ResponseUtil generateStaffId() {
        return new ResponseUtil(200, "Staff id generated", staffService.generateNewStaffId());
    }

//    @GetMapping(params = {"staff_id"})
//    public ResponseUtil getStaffSchedulesByStaffId(@RequestParam String staff_id) {
//        return new ResponseUtil(200, "Successfully Loaded", staffService.getStaffSchedulesByStaffId(staff_id));
//    }

//    @GetMapping(path = "/reservationId/{reservation_id}")
//    public ResponseUtil getStaffIdByReservationId(@PathVariable String reservation_id) {
//        String staffId = staffService.getStaffIdByReservationId(reservation_id);
//        return new ResponseUtil(200, "Done", staffId);
//    }

    @GetMapping(path = "/getAllStaffsId")
    public ResponseUtil getAllStaffsId() {
        return new ResponseUtil(200, "Loaded successfully", staffService.getAllStaffsId());
    }

    @GetMapping
    public ResponseUtil getAllStaffs() {
        return new ResponseUtil(200, "Loaded successfully", staffService.getAllStaffs());
    }
}
