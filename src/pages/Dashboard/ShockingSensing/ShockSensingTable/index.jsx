import React, { useEffect, useState, useMemo } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { StyledBox } from "../../../../components/common/Basics/DivBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ColumnFilter } from "../../../../components/common/Basics/ColumnFilter";
import { StyledTable } from "../../../../components/common/Basics/StyledTable";
import { StyledTextHeading } from "../../../../components/common/Basics/Heading";

const ShockSensingTable = ({ data }) => {
  const [tableShockSensingData, setTableShockSensingData] = useState([]);

  useEffect(() => {
    if (data) {
      const newData = data.map((data) => {
        data.Truck = data.data.Truck;
        data["Truck chassis no"] = data.data["Truck chassis no."];
        data.Driver = data.data.Driver;
        data["Intensity (%)"] = data.data["Intensity [%]"];
        data["Shock threshold (%)"] = data.data["Shock threshold [%]"];

        return data;
      });

      setTableShockSensingData(newData);
    }
  }, [data]);

  const COLUMN = [
    // {
    //   Header: "Id",
    //   accessor: "id",
    //   Filter: ColumnFilter,
    //   disableFilters: true,
    // },
    { Header: "Truck", accessor: "Truck", Filter: ColumnFilter },
    {
      Header: "Truck chassis no",
      accessor: "Truck chassis no",
      Filter: ColumnFilter,
    },
    { Header: "Driver", accessor: "Driver", Filter: ColumnFilter },
    {
      Header: "Intensity (%)",
      accessor: "Intensity (%)",
      Filter: ColumnFilter,
    },
    {
      Header: "Shock threshold (%)",
      accessor: "Shock threshold (%)",
      Filter: ColumnFilter,
    },
  ];

  const columns = useMemo(() => COLUMN, []);
  const newShockingSensingTableData = useMemo(
    () => tableShockSensingData,
    [tableShockSensingData, data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data: newShockingSensingTableData,
        columns: columns,
      },

      useFilters,
      useSortBy
    );

  return (
    <StyledBox
      style={{ maxWidth: "100%", overflowX: " auto " }}
      padding="1rem 8rem"
    >
      {tableShockSensingData?.length ? (
        <StyledTable {...getTableProps()} width="100% !important">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDropDownIcon fontSize="large" />
                        ) : (
                          <ArrowDropUpIcon fontSize="large" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                    <div className="input-filter">
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      ) : (
        <StyledTextHeading
          color="grey"
          textAlign="center"
          fontSize="2rem"
          paddingTop="1rem"
        >
          No Result found
        </StyledTextHeading>
      )}
    </StyledBox>
  );
};

export default ShockSensingTable;
