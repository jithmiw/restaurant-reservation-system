package lk.abc.restaurant.service.impl;

import lk.abc.restaurant.dto.ReservationDetailDTO;
import lk.abc.restaurant.dto.TableDTO;
import lk.abc.restaurant.entity.Customer;
import lk.abc.restaurant.entity.ReservationDetail;
import lk.abc.restaurant.entity.RestaurantTable;
import lk.abc.restaurant.repo.CustomerRepo;
import lk.abc.restaurant.repo.ReservationDetailRepo;
import lk.abc.restaurant.repo.TableRepo;
import lk.abc.restaurant.service.ReservationDetailService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationDetailServiceImpl implements ReservationDetailService {

    @Autowired
    private ReservationDetailRepo reservationDetailRepo;

    @Autowired
    private CustomerRepo customerRepo;

//    @Autowired
//    private StaffRepo staffRepo;

    @Autowired
    private TableRepo tableRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveReservationDetail(ReservationDetailDTO dto) {
        Customer customer = customerRepo.findById(dto.getCustomer_id()).get();
        RestaurantTable table = tableRepo.findById(dto.getTable_id()).get();
        ReservationDetail reservationDetail = new ReservationDetail(dto.getReservation_id(), dto.getReservation_date(), dto.getArrival_time(),
                dto.getDeparture_time(), dto.getNo_of_guests(), "Reserved", customer, table);
        if (reservationDetailRepo.existsById(reservationDetail.getReservation_id())) {
            throw new RuntimeException("Reservation " + reservationDetail.getReservation_id() + " already added");
        }
        reservationDetailRepo.save(reservationDetail);

        // update table status
        reservationDetail.getTable().setStatus("Reserved");
        tableRepo.save(table);
    }

    @Override
    public void updateReservationDetail(ReservationDetailDTO dto) {
        if (!reservationDetailRepo.existsById(dto.getReservation_id())) {
            throw new RuntimeException("No such a reservation, Please enter valid reservation id");
        }
        Customer customer = customerRepo.findById(dto.getCustomer_id()).get();
        RestaurantTable table = tableRepo.findById(dto.getTable_id()).get();
        ReservationDetail reservationDetail = new ReservationDetail(dto.getReservation_id(), dto.getReservation_date(), dto.getArrival_time(),
                dto.getDeparture_time(), dto.getNo_of_guests(), dto.getReservation_status(), dto.getReserved_date(), customer, table);
        reservationDetailRepo.save(reservationDetail);
    }

    @Override
    public ArrayList<TableDTO> searchAvailableTablesForReservation(String reservation_date, String arrival_time, String departure_time) {
        List<RestaurantTable> availableTables = tableRepo.findTableByStatus("Available");
        List<RestaurantTable> reservedTables = tableRepo.findTableByStatus("Reserved");

        for (RestaurantTable table : reservedTables) {
            List<ReservationDetail> reservationDetails = reservationDetailRepo.findReservationDetailByTableIdAndReservation_status(table.getTable_id(), "Reserved");
            for (ReservationDetail detail : reservationDetails) {
                if (detail.getReservation_date().equals(LocalDate.parse(reservation_date))) {
                    if (!(detail.getArrival_time().isAfter(LocalTime.parse(departure_time)) ||
                            detail.getDeparture_time().isBefore(LocalTime.parse(arrival_time)))) {
                        reservedTables.remove(detail.getTable());
                    }
                }
            }
        }
        availableTables.addAll(reservedTables);
        availableTables = availableTables.stream().distinct().collect(Collectors.toList());
        if (availableTables.size() != 0) {
            return mapper.map(availableTables, new TypeToken<ArrayList<TableDTO>>() {
            }.getType());
        }
        return null;
    }

    @Override
    public String generateNewReservationId() {
        String reservation_id = "";
        reservation_id = reservationDetailRepo.getLastReservationId();
        if (reservation_id != null) {
            int newReservationId = Integer.parseInt(reservation_id.replace("RID-", "")) + 1;
            return String.format("RID-%03d", newReservationId);
        }
        return "RID-001";
    }

    @Override
    public ReservationDetailDTO getReservationDetailByReservationId(String reservation_id) {
        ReservationDetail reservation = reservationDetailRepo.findReservationDetailByReservationId(reservation_id);
        return new ReservationDetailDTO(reservation.getReservation_id(), reservation.getReservation_date(),
                reservation.getArrival_time(), reservation.getDeparture_time(), reservation.getNo_of_guests(), reservation.getReservation_status(),
                reservation.getReserved_date(), reservation.getCustomer().getCustomer_id(), reservation.getTable().getTable_id());
    }

    @Override
    public ArrayList<ReservationDetailDTO> getReservationRequests() {
        List<ReservationDetail> requests = reservationDetailRepo.findAll();
        ArrayList<ReservationDetailDTO> reservationRequests = new ArrayList<>();
        if (requests.size() != 0) {
            for (ReservationDetail reservation : requests) {
                reservationRequests.add(new ReservationDetailDTO(reservation.getReservation_id(), reservation.getReservation_date(),
                        reservation.getArrival_time(), reservation.getDeparture_time(), reservation.getNo_of_guests(), reservation.getReservation_status(),
                        reservation.getReserved_date(), reservation.getCustomer().getCustomer_id(), reservation.getTable().getTable_id()));
            }
            return reservationRequests;
        }
        return null;
    }

    @Override
    public ArrayList<ReservationDetailDTO> getReservationRequestsByCustomerId(String customer_id) {
        List<ReservationDetail> requests = reservationDetailRepo.findReservationDetailByCustomerId(customer_id, "Closed");
        ArrayList<ReservationDetailDTO> reservations = new ArrayList<>();
        if (requests.size() != 0) {
            for (ReservationDetail reservation : requests) {
                if (reservation.getReservation_status().equals("Closed") || reservation.getReservation_status().equals("Cancelled")) {
                    continue;
                }
                reservations.add(new ReservationDetailDTO(reservation.getReservation_id(), reservation.getReservation_date(),
                        reservation.getArrival_time(), reservation.getDeparture_time(), reservation.getNo_of_guests(), reservation.getReservation_status(),
                        reservation.getReserved_date(), reservation.getCustomer().getCustomer_id(), reservation.getTable().getTable_id()));
            }
            return reservations;
        }
        return null;
    }

    @Override
    public int countReservationRequestsByCustomerId(String customer_id) {
        return reservationDetailRepo.countReservationDetailByCustomerId(customer_id, "Reserved");
    }
}
