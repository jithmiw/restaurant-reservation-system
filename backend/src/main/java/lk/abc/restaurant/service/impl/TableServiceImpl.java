package lk.abc.restaurant.service.impl;

import lk.abc.restaurant.dto.TableDTO;
import lk.abc.restaurant.entity.Table;
import lk.abc.restaurant.repo.TableRepo;
import lk.abc.restaurant.service.TableService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TableServiceImpl implements TableService {

    @Autowired
    private TableRepo tableRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public void saveTable(TableDTO dto) {
        if (tableRepo.existsById(dto.getTable_id())) {
            throw new RuntimeException("Table already registered");
        }
        switch (dto.getStatus()) {
            case "1":
                dto.setStatus("Available");
                break;
            case "2":
                dto.setStatus("Not Available");
                break;
            case "3":
                dto.setStatus("Reserved");
                break;
        }
        tableRepo.save(mapper.map(dto, Table.class));
    }

    @Override
    public void updateTable(TableDTO dto) {
        if (!tableRepo.existsById(dto.getTable_id())) {
            throw new RuntimeException("No such a table, Please enter valid table id");
        }
        switch (dto.getStatus()) {
            case "1":
                dto.setStatus("Available");
                break;
            case "2":
                dto.setStatus("Not Available");
                break;
            case "3":
                dto.setStatus("Reserved");
                break;
        }
        tableRepo.save(mapper.map(dto, Table.class));
    }

    @Override
    public void deleteTable(String table_id) {
        if (!tableRepo.existsById(table_id)) {
            throw new RuntimeException("No such a table, Please enter valid table id");
        }
        tableRepo.deleteById(table_id);
    }

    @Override
    public ArrayList<TableDTO> getAllTables() {
        List<Table> all = tableRepo.findAll();
        return mapper.map(all, new TypeToken<ArrayList<TableDTO>>() {
        }.getType());
    }

    @Override
    public TableDTO findTableByTableId(String table_id) {
        Table table = tableRepo.findById(table_id).get();
        return mapper.map(table, TableDTO.class);
    }
}
