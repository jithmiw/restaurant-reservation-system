package lk.abc.restaurant.service;

import lk.abc.restaurant.dto.ReservationDetailDTO;
import lk.abc.restaurant.dto.TableDTO;

import java.util.ArrayList;

public interface ReservationDetailService {
    void saveReservationDetail(ReservationDetailDTO dto);

    void updateReservationDetail(ReservationDetailDTO dto);

    ArrayList<TableDTO> searchAvailableTablesForReservation(String reservation_date, String arrival_time, String departure_time);

    String generateNewReservationId();

    ReservationDetailDTO getReservationDetailByReservationId(String reservation_id);

    ArrayList<ReservationDetailDTO> getReservationRequests();

    ArrayList<ReservationDetailDTO> getReservationRequestsByCustomerId(String customer_id);

    int countReservationRequestsByCustomerId(String customer_id);
}
