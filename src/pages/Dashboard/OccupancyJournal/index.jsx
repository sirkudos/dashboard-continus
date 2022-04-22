import React, { useEffect, useState, useContext } from "react";
import { StyledDashboardContentWrapper } from "../../../components/common/Basics/DashboardContentWrapper";
import { StyledDivFlex } from "../../../components/common/Basics/DivFlex";
import { StyledPageHeaderButton } from "../../../components/common/Basics/PageHeaderButton";
import Dropdown from "../../../components/common/Dropdown";
import PageHeadingButtons from "../../../components/common/PageButton";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import PageHeaderLayout from "../../../components/Layouts/HeaderLayout";
import { Theme } from "../../../Theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { locations, period, trucks } from "../../../DUMMYDATA";
import { StyledBox } from "../../../components/common/Basics/DivBox";
import SubHeaderLayout from "../../../components/Layouts/SubHeaderLayout";
import { useOccupancyJournal } from "./hooks/useGetOccupancyJournal";
import JournalTable from "./JournalTable";
import Paginations from "../../../components/common/Paginations";
import { removeDuplicate } from "../../../components/common/RemoveDuplicate";
import { dropdownFilterContext } from "../../../Context/DropdownFiltersContext";

const OccupancyJournal = () => {
  const { getOccupancyJournal, error, isLoading, data, totalPages } =
    useOccupancyJournal();
  const [locationData, setLocationData] = useState([]);
  const [truckData, setTruckData] = useState([]);
  console.log("data journal", data);

  const { truckDropdownData, locationsDropdownData } = useContext(
    dropdownFilterContext
  );

  console.log("truckdropDown", truckDropdownData);
  console.log("locationdropDown", locationsDropdownData);

  useEffect(() => {
    getOccupancyJournal();
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     const locationDropdownData = removeDuplicate(
  //       data,
  //       (allData) => allData.City
  //     );
  //     const truckDropdownData = removeDuplicate(
  //       data,
  //       (allData) => allData.Truck
  //     );
  //     if (!locationData.length) {
  //       setLocationData(locationDropdownData);
  //       setTruckData(truckDropdownData);
  //     }
  //   }
  // }, [data]);

  return (
    <DashboardLayout>
      <StyledDashboardContentWrapper>
        <PageHeaderLayout>
          <StyledDivFlex gap="1rem">
            <StyledPageHeaderButton>Report Via Email</StyledPageHeaderButton>
            <StyledPageHeaderButton>Download Report</StyledPageHeaderButton>
          </StyledDivFlex>
        </PageHeaderLayout>

        <StyledDivFlex
          // background={Theme.colors.neutralColor}
          padding="1rem 8rem"
          // marginTop="2rem"
          justifyContent="flex-end"
          gap="4rem"
          alignItems="center"
        >
          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="location"
            label="Location"
            onChange={(data) => {
              console.log("user selection", data);
              const { location } = data;
              const filter = `?where=data.City:=:${location}`;
              getOccupancyJournal(filter);
              console.log("filter", filter);
            }}
            data={locationsDropdownData}
            gap="2rem"
            minWidth="22rem"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
          />
          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="period"
            label="Time Period"
            onChange={(data) => console.log("user selection", data)}
            data={period}
            gap="2rem"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
          />

          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="truck"
            label="Filter Truck"
            onChange={(data) => {
              console.log("user selection", data);
              const { truck } = data;
              console.log("truck", truck);
              const filter = `?where=data.Truck:=:${truck}`;
              getOccupancyJournal(filter);
            }}
            data={truckDropdownData}
            gap="2rem"
            minWidth="20rem"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
          />
        </StyledDivFlex>
        <StyledBox background={Theme.colors.neutralColor}>
          {/* <SpinningLoader /> */}
          <SubHeaderLayout
            text="Occupancy Journal for the period:"
            date="1 Feb, 2022 - 28th Feb, 2022"
          />
        </StyledBox>
        <StyledBox>
          <JournalTable data={data} />
          {data && (
            <Paginations
              totalPages={totalPages}
              getData={getOccupancyJournal}
            />
          )}
        </StyledBox>
      </StyledDashboardContentWrapper>
    </DashboardLayout>
  );
};

export default OccupancyJournal;
