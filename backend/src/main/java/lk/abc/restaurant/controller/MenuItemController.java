package lk.abc.restaurant.controller;

import lk.abc.restaurant.dto.MenuItemDTO;
import lk.abc.restaurant.service.MenuItemService;
import lk.abc.restaurant.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/item")
@CrossOrigin
public class MenuItemController {

    @Autowired
    private MenuItemService itemService;

    @PostMapping
    public ResponseUtil saveItem(@ModelAttribute MenuItemDTO dto) {
        itemService.saveItem(dto);
        return new ResponseUtil(200, "Item added successfully", null);
    }

    @PutMapping
    public ResponseUtil updateMenuItem(@RequestBody MenuItemDTO dto) {
        itemService.updateItem(dto);
        return new ResponseUtil(200, "Item id: " + dto.getItem_id() + " item updated successfully", null);
    }

    @DeleteMapping(params = {"item_id"})
    public ResponseUtil deleteItem(@RequestParam String item_id) {
        itemService.deleteItem(item_id);
        return new ResponseUtil(200, "Item id: " + item_id + " item deleted successfully", null);
    }

    @GetMapping(path = "/generateItemId")
    public ResponseUtil generateItemId() {
        return new ResponseUtil(200, "Item id generated", itemService.generateNewItemId());
    }

    @GetMapping(params = {"item_id"})
    public ResponseUtil findItemByItemId(@RequestParam String item_id) {
        return new ResponseUtil(200, "Loaded successfully", itemService.findItemByItemId(item_id));
    }

    @GetMapping
    public ResponseUtil getAllItems() {
        return new ResponseUtil(200, "Loaded successfully", itemService.getAllItems());
    }
}
