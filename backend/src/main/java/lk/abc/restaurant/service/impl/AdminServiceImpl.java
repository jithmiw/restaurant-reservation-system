package lk.abc.restaurant.service.impl;

import lk.abc.restaurant .dto.AdminDTO;
import lk.abc.restaurant .entity.Admin;
import lk.abc.restaurant .repo.AdminRepo;
import lk.abc.restaurant .service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public AdminDTO verifyAdmin(String username, String password) {
        Admin admin = adminRepo.findAdminByUsernameAndPassword(username, password);
        if (!(admin == null)) {
            return mapper.map(admin, AdminDTO.class);
        } else {
            return null;
        }
    }
}
