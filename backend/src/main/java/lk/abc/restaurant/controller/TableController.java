package lk.abc.restaurant.controller;

import lk.abc.restaurant.dto.TableDTO;
import lk.abc.restaurant.service.TableService;
import lk.abc.restaurant.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/table")
@CrossOrigin
public class TableController {

    @Autowired
    private TableService tableService;

    @PostMapping
    public ResponseUtil saveTable(@ModelAttribute TableDTO dto) {
        tableService.saveTable(dto);
        return new ResponseUtil(200, "Table added successfully", null);
    }

    @PutMapping
    public ResponseUtil updateTable(@RequestBody TableDTO dto) {
        tableService.updateTable(dto);
        return new ResponseUtil(200, "Table id: " + dto.getTable_id() + " table updated successfully", null);
    }

    @DeleteMapping(params = {"table_id"})
    public ResponseUtil deleteTable(@RequestParam String table_id) {
        tableService.deleteTable(table_id);
        return new ResponseUtil(200, "Table id: " + table_id + " table deleted successfully", null);
    }

    @GetMapping(params = {"table_id"})
    public ResponseUtil findTableByTableId(@RequestParam String table_id) {
        return new ResponseUtil(200, "Loaded successfully", tableService.findTableByTableId(table_id));
    }

    @GetMapping
    public ResponseUtil getAllTables() {
        return new ResponseUtil(200, "Loaded successfully", tableService.getAllTables());
    }
}
