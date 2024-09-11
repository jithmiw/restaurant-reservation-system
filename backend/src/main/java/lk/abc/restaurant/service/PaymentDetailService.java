package lk.abc.restaurant.service;

import lk.abc.restaurant.dto.PaymentDetailDTO;

import java.util.ArrayList;

public interface PaymentDetailService {
    void savePaymentDetail(PaymentDetailDTO dto);

    String generateNewPaymentId();

    ArrayList<PaymentDetailDTO> getAllPaymentDetails();
}
