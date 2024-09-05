package lk.abc.restaurant.controller;

import lk.abc.restaurant.dto.TableDTO;
import lk.abc.restaurant.dto.ReservationDetailDTO;
import lk.abc.restaurant.service.ReservationDetailService;
import lk.abc.restaurant.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/reservationDetail")
@CrossOrigin
public class ReservationDetailController {

    @Autowired
    private ReservationDetailService reservationDetailService;

    @GetMapping(path = "/generateReservationId")
    public ResponseUtil generateReservationId() {
        return new ResponseUtil(200, "Reservation id generated", reservationDetailService.generateNewReservationId());
    }

    @GetMapping(params = {"reservation_date", "arrival_time", "departure_time"})
    public ResponseUtil searchAvailableTablesForReservation(@RequestParam String reservation_date, @RequestParam String arrival_time, @RequestParam String departure_time) {
        ArrayList<TableDTO> availableTables = reservationDetailService.searchAvailableTablesForReservation(reservation_date, arrival_time, departure_time);
        return new ResponseUtil(200, "Loaded successfully", availableTables);
    }

    @GetMapping(path = "/getReservationRequests")
    public ResponseUtil getReservationRequests() {
        return new ResponseUtil(200, "Successfully Loaded", reservationDetailService.getReservationRequests());
    }

    @GetMapping(params = {"customer_id"})
    public ResponseUtil getReservationRequestsByCustomerId(@RequestParam String customer_id) {
        return new ResponseUtil(200, "Successfully Loaded", reservationDetailService.getReservationRequestsByCustomerId(customer_id));
    }

    @GetMapping(path = "/countRequests", params = {"customer_id"})
    public ResponseUtil countReservationRequestsByCustomerId(@RequestParam String customer_id) {
        return new ResponseUtil(200, "Successful", reservationDetailService.countReservationRequestsByCustomerId(customer_id));
    }

    @PutMapping(path = "/cancelRequest", params = {"reservation_id"})
    public ResponseUtil cancelReservationRequest(@RequestParam String reservation_id) {
        ReservationDetailDTO reservation = reservationDetailService.getReservationDetailByReservationId(reservation_id);
        reservation.setReservation_status("Cancelled");
        reservationDetailService.updateReservationDetail(reservation);
        return new ResponseUtil(200, "Reservation request " + reservation_id + " cancelled", null);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil makeReservation(@RequestBody ReservationDetailDTO dto) {
        reservationDetailService.saveReservationDetail(dto);
        return new ResponseUtil(200, "Reservation Request sent successfully", null);
    }
}
