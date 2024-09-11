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

import lk.abc.restaurant.dto.TableDTO;
import lk.abc.restaurant.service.TableService;
import lk.abc.restaurant.util.ResponseUtil;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class TableControllerTest {
    @Test
    void testSaveTable() {
        TableService tableService = mock(TableService.class);
        doNothing().when(tableService).saveTable((TableDTO) any());
        TableController tableController = new TableController();
        ReflectionTestUtils.setField(tableController, "tableService", tableService);
        ResponseUtil actualSaveTableResult = tableController.saveTable(new TableDTO());
        assertNull(actualSaveTableResult.getData());
        assertEquals(200, actualSaveTableResult.getStatus());
        assertEquals("Table added successfully", actualSaveTableResult.getMessage());
        verify(tableService).saveTable((TableDTO) any());
    }

    @Test
    void testUpdateTable() {
        TableService tableService = mock(TableService.class);
        doNothing().when(tableService).updateTable((TableDTO) any());
        TableController tableController = new TableController();
        ReflectionTestUtils.setField(tableController, "tableService", tableService);
        ResponseUtil actualUpdateTableResult = tableController.updateTable(new TableDTO());
        assertNull(actualUpdateTableResult.getData());
        assertEquals(200, actualUpdateTableResult.getStatus());
        assertEquals("Table id: null table updated successfully", actualUpdateTableResult.getMessage());
        verify(tableService).updateTable((TableDTO) any());
    }

    @Test
    void testDeleteTable() {
        TableService tableService = mock(TableService.class);
        doNothing().when(tableService).deleteTable((String) any());
        TableController tableController = new TableController();
        ReflectionTestUtils.setField(tableController, "tableService", tableService);
        ResponseUtil actualDeleteTableResult = tableController.deleteTable("Table id");
        assertNull(actualDeleteTableResult.getData());
        assertEquals(200, actualDeleteTableResult.getStatus());
        assertEquals("Table id: Table id table deleted successfully", actualDeleteTableResult.getMessage());
        verify(tableService).deleteTable((String) any());
    }

    @Test
    void testGenerateTableId() {
        TableService tableService = mock(TableService.class);
        when(tableService.generateNewTableId()).thenReturn("42");
        TableController tableController = new TableController();
        ReflectionTestUtils.setField(tableController, "tableService", tableService);
        ResponseUtil actualGenerateTableIdResult = tableController.generateTableId();
        assertEquals("42", actualGenerateTableIdResult.getData());
        assertEquals(200, actualGenerateTableIdResult.getStatus());
        assertEquals("Table id generated", actualGenerateTableIdResult.getMessage());
        verify(tableService).generateNewTableId();
    }

    @Test
    void testFindTableByTableId() {
        TableService tableService = mock(TableService.class);
        when(tableService.findTableByTableId((String) any())).thenReturn(new TableDTO());
        TableController tableController = new TableController();
        ReflectionTestUtils.setField(tableController, "tableService", tableService);
        ResponseUtil actualFindTableByTableIdResult = tableController.findTableByTableId("Table id");
        assertEquals(
                "ResponseUtil(status=200, message=Loaded successfully, data=TableDTO(table_id=null, table_no=null,"
                        + " table_type=null, seating_capacity=0, location=null, reservation_fee=null, status=null))",
                actualFindTableByTableIdResult.toString());
        assertEquals(200, actualFindTableByTableIdResult.getStatus());
        assertEquals("Loaded successfully", actualFindTableByTableIdResult.getMessage());
        verify(tableService).findTableByTableId((String) any());
    }

    @Test
    void testGetAllTables() {
        TableService tableService = mock(TableService.class);
        when(tableService.getAllTables()).thenReturn(new ArrayList<>());
        TableController tableController = new TableController();
        ReflectionTestUtils.setField(tableController, "tableService", tableService);
        ResponseUtil actualAllTables = tableController.getAllTables();
        assertTrue(((Collection<Object>) actualAllTables.getData()).isEmpty());
        assertEquals(200, actualAllTables.getStatus());
        assertEquals("Loaded successfully", actualAllTables.getMessage());
        verify(tableService).getAllTables();
    }
}

