package lk.abc.restaurant.service.impl;

import lk.abc.restaurant.dto.PaymentDetailDTO;
import lk.abc.restaurant.entity.PaymentDetail;
import lk.abc.restaurant.entity.ReservationDetail;
import lk.abc.restaurant.repo.PaymentDetailRepo;
import lk.abc.restaurant.repo.ReservationDetailRepo;
import lk.abc.restaurant.service.PaymentDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PaymentDetailServiceImpl implements PaymentDetailService {

    @Autowired
    private PaymentDetailRepo paymentDetailRepo;

    @Autowired
    private ReservationDetailRepo rentalDetailRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void savePaymentDetail(PaymentDetailDTO dto) {
        ReservationDetail reservationDetail = rentalDetailRepo.findById(dto.getRental_id()).get();
        PaymentDetail paymentDetail = new PaymentDetail(dto.getPayment_id(), dto.getReservation_fee(), dto.getTotal_payment(), reservationDetail);
        if (paymentDetailRepo.existsById(paymentDetail.getPayment_id())) {
            throw new RuntimeException("Payment " + paymentDetail.getPayment_id() + " already added");
        }
        paymentDetailRepo.save(paymentDetail);

        // update reservation status
        paymentDetail.getReservationDetail().setReservation_status("Closed");
        rentalDetailRepo.save(reservationDetail);
    }

    @Override
    public String generateNewPaymentId() {
        String payment_id = "";
        payment_id = paymentDetailRepo.getLastPaymentId();
        if (payment_id != null) {
            int newPaymentId = Integer.parseInt(payment_id.replace("PID-", "")) + 1;
            return String.format("PID-%03d", newPaymentId);
        }
        return "PID-001";
    }

    @Override
    public ArrayList<PaymentDetailDTO> getAllPaymentDetails() {
        List<PaymentDetail> all = paymentDetailRepo.findAll();
        ArrayList<PaymentDetailDTO> payments = new ArrayList<>();
        if (all.size() != 0) {
            for (PaymentDetail detail : all) {
                payments.add(new PaymentDetailDTO(detail.getPayment_id(), detail.getPayment_date(), detail.getReservation_fee(),
                        detail.getTotal_payment(), detail.getReservationDetail().getReservation_id()));
            }
            return payments;
        }
        return null;
    }
}
