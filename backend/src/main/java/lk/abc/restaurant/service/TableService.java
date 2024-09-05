package lk.abc.restaurant.service;

import lk.abc.restaurant.dto.TableDTO;

import java.util.ArrayList;

public interface TableService {
    void saveTable(TableDTO dto);

    void updateTable(TableDTO dto);

    void deleteTable(String table_id);

    String generateNewTableId();

    ArrayList<TableDTO> getAllTables();

    TableDTO findTableByTableId(String table_id);
}
