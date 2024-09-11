package lk.abc.restaurant.service.impl;

import lk.abc.restaurant.dto.MenuItemDTO;
import lk.abc.restaurant.entity.MenuItem;
import lk.abc.restaurant.repo.MenuItemRepo;
import lk.abc.restaurant.service.MenuItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class MenuItemServiceImpl implements MenuItemService {

    @Autowired
    private MenuItemRepo itemRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveItem(MenuItemDTO dto) {
        if (itemRepo.existsById(dto.getItem_id())) {
            throw new RuntimeException("Menu Item already registered");
        }
        switch (dto.getStatus()) {
            case "1":
                dto.setStatus("Available");
                break;
            case "2":
                dto.setStatus("Not Available");
                break;
        }
        itemRepo.save(mapper.map(dto, MenuItem.class));
    }

    @Override
    public void updateItem(MenuItemDTO dto) {
        if (!itemRepo.existsById(dto.getItem_id())) {
            throw new RuntimeException("No such a menu item, Please enter valid item id");
        }
        switch (dto.getStatus()) {
            case "1":
                dto.setStatus("Available");
                break;
            case "2":
                dto.setStatus("Not Available");
                break;
        }
        itemRepo.save(mapper.map(dto, MenuItem.class));
    }

    @Override
    public void deleteItem(String item_id) {
        if (!itemRepo.existsById(item_id)) {
            throw new RuntimeException("No such a menu item, Please enter valid item id");
        }
        itemRepo.deleteById(item_id);
    }

    @Override
    public String generateNewItemId() {
        String item_id = "";
        item_id = itemRepo.getLastItemId();
        if (item_id != null) {
            int newItemId = Integer.parseInt(item_id.replace("MID-", "")) + 1;
            return String.format("MID-%03d", newItemId);
        }
        return "MID-001";
    }

    @Override
    public ArrayList<MenuItemDTO> getAllItems() {
        List<MenuItem> all = itemRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<MenuItemDTO>>() {
        }.getType());
    }

    @Override
    public MenuItemDTO findItemByItemId(String item_id) {
        MenuItem menuItem = itemRepo.findById(item_id).get();
        return mapper.map(menuItem, MenuItemDTO.class);
    }
}
