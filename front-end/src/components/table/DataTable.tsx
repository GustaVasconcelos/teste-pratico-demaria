import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel, IconButton, Tooltip, Chip } from "@mui/material";

interface DataTableProps<T> {
  rows: T[];
  columns: { id: string, label: string, isSortable?: boolean, isStatusColumn?: boolean }[];
  actions: Array<{
    label: string;
    onClick: (item: T) => void;
    icon: React.ReactNode;
    condition: (item: T) => boolean;
  }>;
  page: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const statusColors: Record<string, "success" | "error" | "warning" | "default" | "primary" | "secondary" | "info"> = {
  concluída: "success",
  inativo: "error",
  pendente: "warning",
};

const DataTable = <T extends { [key: string]: any }>({
  rows,
  columns,
  actions,
  page,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange
}: DataTableProps<T>) => {

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 3, overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#e3f2fd", 
                textAlign: "center",
                padding: "14px"
              }}>
                {column.isSortable ? (
                  <TableSortLabel>{column.label}</TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd", textAlign: "center" }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ textAlign: "center", padding: "12px" }}>
                  {column.id === "status" ? (
                    <Chip 
                      label={row[column.id]} 
                      color={statusColors[row[column.id]] || "default"} 
                    />
                  ) : (
                    row[column.id]
                  )}
                </TableCell>
              ))}
              <TableCell sx={{ textAlign: "center", padding: "12px" }}>
                {actions.map((action, actionIndex) => (
                  action.condition(row) && (
                    <Tooltip key={actionIndex} title={action.label} placement="top">
                      <IconButton onClick={() => action.onClick(row)} sx={{ margin: 0.5, color: "#1976d2" }}>
                        {action.icon}
                      </IconButton>
                    </Tooltip>
                  )
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems}  
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Linhas por página" 
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`} 
      />
    </TableContainer>
  );
};

export default DataTable;
