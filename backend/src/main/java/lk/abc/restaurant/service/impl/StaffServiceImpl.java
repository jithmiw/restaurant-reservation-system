package lk.abc.restaurant.service.impl;

import lk.abc.restaurant.dto.StaffDTO;
import lk.abc.restaurant.entity.Staff;
import lk.abc.restaurant.repo.StaffRepo;
import lk.abc.restaurant.service.StaffService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StaffRepo staffRepo;

//    @Autowired
//    private StaffScheduleRepo staffScheduleRepo;

    @Autowired
    private ModelMapper mapper;


    @Override
    public void saveStaff(StaffDTO dto) {
        if (staffRepo.existsById(dto.getStaff_id())) {
            throw new RuntimeException("Staff member already registered");
        }
        Staff staff = mapper.map(dto, Staff.class);
        staffRepo.save(staff);
    }

    @Override
    public void updateStaff(StaffDTO dto) {
        if (!staffRepo.existsById(dto.getStaff_id())) {
            throw new RuntimeException("No such a staff member, Please enter valid staff id");
        }
        staffRepo.save(mapper.map(dto, Staff.class));
    }

//    @Override
//    public void changeStaff(String reservation_id, String staff_id) {
//        StaffSchedule staffSchedule = staffScheduleRepo.getStaffScheduleByReservationId(reservation_id);
//        if (staffSchedule == null) {
//            throw new RuntimeException("No such a reservation, Please enter valid reservation id");
//        }
//        staffSchedule.setStaff(staffRepo.findStaffByStaffId(staff_id));
//        staffScheduleRepo.save(staffSchedule);
//    }

    @Override
    public void deleteStaff(String staff_id) {
        if (!staffRepo.existsById(staff_id)) {
            throw new RuntimeException("No such a staff member, Please enter valid staff_id");
        }
        staffRepo.deleteById(staff_id);
    }

    @Override
    public String generateNewStaffId() {
        String staff_id = "";
        staff_id = staffRepo.getLastStaffId();
        if (staff_id != null) {
            int newStaffId = Integer.parseInt(staff_id.replace("SID-", "")) + 1;
            return String.format("SID-%03d", newStaffId);
        }
        return "SID-001";
    }

    @Override
    public StaffDTO getStaffByStaffId(String staff_id) {
        Staff staff = staffRepo.findStaffByStaffId(staff_id);
        if (staff != null) {
            return mapper.map(staff, StaffDTO.class);
        }
        return null;
    }

    @Override
    public StaffDTO verifyStaff(String username, String password) {
        Staff staff = staffRepo.findStaffByUsernameAndPassword(username, password);
        if (!(staff == null)) {
            return mapper.map(staff, StaffDTO.class);
        } else {
            return null;
        }
    }

//    @Override
//    public String getStaffIdByReservationId(String reservation_id) {
//        return staffScheduleRepo.getStaffIdByReservationId(reservation_id);
//    }

    @Override
    public ArrayList<String> getAllStaffsId() {
        List<Staff> all = staffRepo.findAll();
        ArrayList<String> staffs = new ArrayList<>();
        for (Staff staff : all) {
            staffs.add(staff.getStaff_id());
        }
        return staffs;
    }

//    @Override
//    public ArrayList<StaffScheduleDTO> getStaffSchedulesByStaffId(String staff_id) {
//
//    }

    @Override
    public ArrayList<StaffDTO> getAllStaffs() {
        List<Staff> all = staffRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<StaffDTO>>() {
        }.getType());
    }
}
