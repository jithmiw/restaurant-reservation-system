package lk.abc.restaurant.service;

import lk.abc.restaurant.dto.AdminDTO;

public interface AdminService {

    AdminDTO verifyAdmin(String username, String password);
}
