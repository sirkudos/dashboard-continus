import React, { useContext, useEffect, useState } from "react";
import { StyledDashboardContentWrapper } from "../../../components/common/Basics/DashboardContentWrapper";
import { StyledDivFlex } from "../../../components/common/Basics/DivFlex";
import { StyledPageHeaderButton } from "../../../components/common/Basics/PageHeaderButton";
import Dropdown from "../../../components/common/Dropdown";
import PageHeadingButtons from "../../../components/common/PageButton";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import PageHeaderLayout from "../../../components/Layouts/HeaderLayout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Theme } from "../../../Theme";
import { period, locations, trucks } from "../../../DUMMYDATA";
import SubHeaderLayout from "../../../components/Layouts/SubHeaderLayout";
import SpinningLoader from "../../../components/common/SpinningLoader";
import { StyledText } from "../../../components/common/Basics/StyledText";
import { StyledBox } from "../../../components/common/Basics/DivBox";
import { dummyDataChart } from "../../../DUMMYDATACHART.js";
import { useMonthlyAvaliablity } from "./hooks/useMonthlyAvaliablity";
import AvaliablityGraph from "./Graph";
import { dropdownFilterContext } from "../../../Context/DropdownFiltersContext";
import { useFilterGraph } from "../../../hooks/useGraphFilter";
import PickDate from "../../../components/common/DatePicker";
import { formatDate } from "../../../utils/FormatDate";
import { useGetCSVExport } from "../../../hooks/useGetCSVExport";
import { getPreviousDate, getTodayDate } from "../../../utils/GetDate";
import DailyRating from "./DailyRatings";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { StyledDivGrid } from "../../../components/common/Basics/DivGrid";
import MapTokenToUser from "../../../Authorization/MapTokenToUser";
import { monthLookUp, months, quarter, quarterLookUp } from "../../../constants/DropDownData";
import { getYears } from "../../../utils/GetYears";
import { StyledButton } from "../../../components/common/Button/style";

const MonthlyAvaliablity = () => {
  const { getMonthlyAvaliablity, data, error, isLoading, summary } =
    useMonthlyAvaliablity();

  const [startDate, setStartDate] = useState(getPreviousDate(31));
  const [endDate, setEndDate] = useState(getTodayDate());
  const [truckDownload, setTruckDownload] = useState();
  const [locationDownload, setLocationDownload] = useState();
  

  const filter = `period[start]=${startDate}&period[end]=${endDate}`;
  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [truckFilter, setTruckFilter] = useState();
  const [locationFilter, setLocationFilter] = useState();
  const [dateFilter, setDateFilter] = useState(filter);
  const { getCSVExport, csvData, isDownloading, isExporting } =
    useGetCSVExport();

  const { truckDropdownData, locationsDropdownData } = useContext(
    dropdownFilterContext
  );

  const startYear = 2010
  const endYear = new Date().getFullYear()

  const filterByDate = (start, end) => {
    const filter =
    start && end &&
    `period[start]=${
      formatDate(start)["yyyy-mm-dd"]
    }&period[end]=${formatDate(end)["yyyy-mm-dd"]} 
   `;
  setDateFilter(filter);
  setDateRange([start, end]);
  setStartDate(formatDate(start)["yyyy-mm-dd"]);
  setEndDate(formatDate(end)["yyyy-mm-dd"]);
  }

  useFilterGraph({
    truckFilter,
    locationFilter,
    dateFilter,
    getData: getMonthlyAvaliablity,
  });

  // useEffect(() => {
  //   getMonthlyAvaliablity(
  //     "?period[start]=2022-03-01&truck=BIS/NB/002&period[end]=2022-04-01"
  //   );
  // }, []);
  return (
    <DashboardLayout>
      <StyledDashboardContentWrapper>
        <PageHeaderLayout>
          <StyledDivFlex
            gap="1rem"
            flexDirectionSd="column"
            widthSd="100%"
            paddingS="2rem"
          >
            <StyledPageHeaderButton
              fontSizeSd="1.2rem"
              onClick={() => {
                const user = MapTokenToUser();

                const data = {
                  export: {
                    entity: "monthly_availability",
                    query: {
                      period: {
                        start: startDate,
                        end: endDate,
                      },
                      truck: truckDownload,
                      location: locationDownload,
                    },
                    as: "email",
                    recipients: [user.user.email],
                  },
                };

                getCSVExport(data);
              }}
            >
              {isExporting ? "Sending......" : " Report Via Email"}
            </StyledPageHeaderButton>
            <StyledPageHeaderButton
              fontSizeSd="1.2rem"
              onClick={() => {
                const data = {
                  export: {
                    entity: "monthly_availability",
                    query: {
                      period: {
                        start: startDate,
                        end: endDate,
                      },
                      truck: truckDownload,
                      location: locationDownload,
                    },
                    as: "download",
                  },
                };

                getCSVExport(data);
              }}
            >
              {" "}
              {isDownloading ? "Downloading" : "Download Report"}
            </StyledPageHeaderButton>
          </StyledDivFlex>
        </PageHeaderLayout>
        <StyledDivFlex
          // background={Theme.colors.neutralColor}
          padding="1rem 8rem"
          // marginTop="1rem"
          justifyContent="flex-end"
          gap="2rem"
          alignItems="center"
          paddingM="1rem 0"
          gapM="1.5rem"
          justifyContentM="center"
          flexDirectionS="column"
        >
          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="truck"
            label="Filter Truck"
            onChange={(data) => {
              const { truck } = data;
              const filter = truck && `truck=${truck}`;
              setTruckFilter(filter);
              setTruckDownload(truck);
            }}
            data={truckDropdownData}
            gap="2rem"
            minWidth="16%"
            widthS="90%"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
            // multiSelect={true}
          />

          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="location"
            label="Location"
            onChange={(data) => {
              const { location } = data;
              const filter = location && `location=${location}`;
              setLocationFilter(filter);
              setLocationDownload(location);
            }}
            data={locationsDropdownData}
            gap="2rem"
            minWidth="8%"
            widthS="90%"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
            // multiSelect={true}
          />
         

          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="month"
            label="Months"
            onChange={(data) => {
              const { month } = data;
              const {start, end} = monthLookUp[month]
              filterByDate(start, end)
            }}
            data={months}
            gap="2rem"
            minWidth="3%"
            widthS="90%"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
            // multiSelect={true}
          />

          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="quarter"
            label="Quarter"
            onChange={(data) => {
              const { quarter } = data;
              const {start, end} = quarterLookUp[quarter]
              filterByDate(start, end)
            }}
            data={quarter}
            gap="2rem"
            minWidth="20%"
            widthS="90%"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
            // multiSelect={true}
          />

          <Dropdown
            // background={Theme.colors.secondaryColor}
            name="year"
            label="Year"
            onChange={(data) => {
              const { year } = data;
              const start = `${year}-01-01`
              const end = `${year}-12-31`
              filterByDate(start, end)
            }}
            data={getYears(startYear, endYear)}
            gap="2rem"
            minWidth="5%"
            widthS="90%"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
            // multiSelect={true}
          />

          <StyledButton
            background={Theme.colors.primaryColor}
            color={Theme.colors.secondaryColor}
            padding="1rem"
            borderRadius="1rem"
            widthS="90%"
            minWidth="5%"
            onClick={() => {
              const start = `${startYear}-01-01`
              const end = `${endYear}-12-31`
              filterByDate(start, end)
            }}
          >
            All
          </StyledButton>
        </StyledDivFlex>

        <StyledBox background={Theme.colors.neutralColor}>
          {/* <SpinningLoader /> */}
          <SubHeaderLayout
            text="Monthly Availability for the period:"
            dateRange={dateRange}
            count={data?.length}
          />
          <StyledDivGrid
            width="100%"
            gap="5rem"
            gapSd="2rem"
            padding="1rem 8rem"
            paddingSd="1rem !important"
          >
            {isLoading &&
              Array.from(Array(3).keys()).map((item) => (
                <Skeleton
                  style={{
                    height: "15rem",
                    width: "100%",
                    marginTop: "5rem",
                  }}
                />
              ))}
          </StyledDivGrid>
          <>
            {data && !isLoading && (
              <StyledDivFlex
                padding="1rem  8rem 1rem 10rem"
                marginTop="2rem"
                gap="4rem"
                justifyContentS="space-between"
                paddingS="1rem 3rem 1rem 1rem"
                flexDirectionSd="column"
                paddingSd="2rem"
                gapS="2rem"
              >
                <DailyRating
                  label="Uptime"
                  count={`${
                    summary?.total_days
                      ? summary?.total_days.toLocaleString()
                      : 0
                  } days   (${
                    summary?.total_uptime_hours
                      ? summary?.total_uptime_hours.toLocaleString()
                      : 0
                  } Hours)`}
                />
                <DailyRating
                  label=" Availability"
                  count={`${
                    summary?.avg_availability
                      ? summary?.avg_availability?.toFixed()
                      : 0
                  }%`}
                />
              </StyledDivFlex>
            )}

            {/* BARCHART STARTS FROM HERE  */}
            <AvaliablityGraph data={data} isLoading={isLoading} />
          </>
          {/* BARCHART ENDS HERE */}
        </StyledBox>
      </StyledDashboardContentWrapper>
    </DashboardLayout>
  );
};

export default MonthlyAvaliablity;
