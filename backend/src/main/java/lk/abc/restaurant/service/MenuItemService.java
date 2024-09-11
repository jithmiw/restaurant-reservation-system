package lk.abc.restaurant.service;

import lk.abc.restaurant.dto.MenuItemDTO;

import java.util.ArrayList;

public interface MenuItemService {
    void saveItem(MenuItemDTO dto);

    void updateItem(MenuItemDTO dto);

    void deleteItem(String item_id);

    String generateNewItemId();

    ArrayList<MenuItemDTO> getAllItems();

    MenuItemDTO findItemByItemId(String item_id);
}
