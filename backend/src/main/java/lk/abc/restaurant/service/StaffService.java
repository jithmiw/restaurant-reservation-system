package lk.abc.restaurant.service;

import lk.abc.restaurant.dto.StaffDTO;
//import lk.abc.restaurant.dto.StaffScheduleDTO;

import java.util.ArrayList;

public interface StaffService {

    void saveStaff(StaffDTO dto);

    void updateStaff(StaffDTO dto);

    void deleteStaff(String staff_id);

    StaffDTO verifyStaff(String username, String password);

    StaffDTO getStaffByStaffId(String staff_id);

//    String getStaffIdByReservationId(String reservation_id);

    ArrayList<String> getAllStaffsId();

//    void changeStaff(String reservation_id, String staff_id);

//    ArrayList<StaffScheduleDTO> getStaffSchedulesByStaffId(String staff_id);

    ArrayList<StaffDTO> getAllStaffs();
}
