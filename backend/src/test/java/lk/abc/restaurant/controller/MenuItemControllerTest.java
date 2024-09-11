package lk.abc.restaurant.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Collection;

import lk.abc.restaurant.dto.MenuItemDTO;
import lk.abc.restaurant.service.MenuItemService;
import lk.abc.restaurant.util.ResponseUtil;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class MenuItemControllerTest {
    @Test
    void testSaveItem() {
        MenuItemService menuItemService = mock(MenuItemService.class);
        doNothing().when(menuItemService).saveItem((MenuItemDTO) any());
        MenuItemController menuItemController = new MenuItemController();
        ReflectionTestUtils.setField(menuItemController, "itemService", menuItemService);
        ResponseUtil actualSaveItemResult = menuItemController.saveItem(new MenuItemDTO());
        assertNull(actualSaveItemResult.getData());
        assertEquals(200, actualSaveItemResult.getStatus());
        assertEquals("Item added successfully", actualSaveItemResult.getMessage());
        verify(menuItemService).saveItem((MenuItemDTO) any());
    }

    @Test
    void testUpdateMenuItem() {
        MenuItemService menuItemService = mock(MenuItemService.class);
        doNothing().when(menuItemService).updateItem((MenuItemDTO) any());
        MenuItemController menuItemController = new MenuItemController();
        ReflectionTestUtils.setField(menuItemController, "itemService", menuItemService);
        ResponseUtil actualUpdateMenuItemResult = menuItemController.updateMenuItem(new MenuItemDTO());
        assertNull(actualUpdateMenuItemResult.getData());
        assertEquals(200, actualUpdateMenuItemResult.getStatus());
        assertEquals("Item id: null item updated successfully", actualUpdateMenuItemResult.getMessage());
        verify(menuItemService).updateItem((MenuItemDTO) any());
    }

    @Test
    void testDeleteItem() {
        MenuItemService menuItemService = mock(MenuItemService.class);
        doNothing().when(menuItemService).deleteItem((String) any());
        MenuItemController menuItemController = new MenuItemController();
        ReflectionTestUtils.setField(menuItemController, "itemService", menuItemService);
        ResponseUtil actualDeleteItemResult = menuItemController.deleteItem("Item id");
        assertNull(actualDeleteItemResult.getData());
        assertEquals(200, actualDeleteItemResult.getStatus());
        assertEquals("Item id: Item id item deleted successfully", actualDeleteItemResult.getMessage());
        verify(menuItemService).deleteItem((String) any());
    }

    @Test
    void testGenerateItemId() {
        MenuItemService menuItemService = mock(MenuItemService.class);
        when(menuItemService.generateNewItemId()).thenReturn("42");
        MenuItemController menuItemController = new MenuItemController();
        ReflectionTestUtils.setField(menuItemController, "itemService", menuItemService);
        ResponseUtil actualGenerateItemIdResult = menuItemController.generateItemId();
        assertEquals("42", actualGenerateItemIdResult.getData());
        assertEquals(200, actualGenerateItemIdResult.getStatus());
        assertEquals("Item id generated", actualGenerateItemIdResult.getMessage());
        verify(menuItemService).generateNewItemId();
    }

    @Test
    void testFindItemByItemId() {
        MenuItemService menuItemService = mock(MenuItemService.class);
        when(menuItemService.findItemByItemId((String) any())).thenReturn(new MenuItemDTO());
        MenuItemController menuItemController = new MenuItemController();
        ReflectionTestUtils.setField(menuItemController, "itemService", menuItemService);
        ResponseUtil actualFindItemByItemIdResult = menuItemController.findItemByItemId("Item id");
        assertEquals("ResponseUtil(status=200, message=Loaded successfully, data=MenuItemDTO(item_id=null, item_name=null,"
                + " description=null, price=null, status=null))", actualFindItemByItemIdResult.toString());
        assertEquals(200, actualFindItemByItemIdResult.getStatus());
        assertEquals("Loaded successfully", actualFindItemByItemIdResult.getMessage());
        verify(menuItemService).findItemByItemId((String) any());
    }

    @Test
    void testGetAllItems() {
        MenuItemService menuItemService = mock(MenuItemService.class);
        when(menuItemService.getAllItems()).thenReturn(new ArrayList<>());
        MenuItemController menuItemController = new MenuItemController();
        ReflectionTestUtils.setField(menuItemController, "itemService", menuItemService);
        ResponseUtil actualAllItems = menuItemController.getAllItems();
        assertTrue(((Collection<Object>) actualAllItems.getData()).isEmpty());
        assertEquals(200, actualAllItems.getStatus());
        assertEquals("Loaded successfully", actualAllItems.getMessage());
        verify(menuItemService).getAllItems();
    }
}

