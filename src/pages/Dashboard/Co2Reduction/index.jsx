import React, { useContext, useEffect, useState } from "react";
import { StyledDashboardContentWrapper } from "../../../components/common/Basics/DashboardContentWrapper";
import { StyledDivFlex } from "../../../components/common/Basics/DivFlex";
import { StyledPageHeaderButton } from "../../../components/common/Basics/PageHeaderButton";
import Dropdown from "../../../components/common/Dropdown";
import PageHeadingButtons from "../../../components/common/PageButton";

import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import PageHeaderLayout from "../../../components/Layouts/HeaderLayout";
import { locations, period, trucks } from "../../../DUMMYDATA";
import { Theme } from "../../../Theme";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SubHeaderLayout from "../../../components/Layouts/SubHeaderLayout";
import CardWidget from "../../../components/Widget";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { StyledDivGrid } from "../../../components/common/Basics/DivGrid";
import { StyledSpinning } from "../../../components/common/SpinningLoader/style";
import Droplet from "../../../Icons/Droplet";
import Cloud from "../../../Icons/Cloud";
import CloudGreen from "../../../Icons/CloudGreen";
import CloudBlue from "../../../Icons/CloudBlue";
import { Co2DataItem } from "../../../DUMMYDATA";
import { useGetCo2Reduction } from "./hooks/useGetCo2Reduction";
import { dropdownFilterContext } from "../../../Context/DropdownFiltersContext";
import { formatDate } from "../../../utils/FormatDate";
import PickDate from "../../../components/common/DatePicker";
import { getPreviousDate, getTodayDate } from "../../../utils/GetDate";
import { useFilterGraph } from "../../../hooks/useGraphFilter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetCSVExport } from "../../../hooks/useGetCSVExport";
import MapTokenToUser from "../../../Authorization/MapTokenToUser";

const Co2Reduction = () => {
  const [startDate, setStartDate] = useState(getPreviousDate(20));
  const [endDate, setEndDate] = useState(getTodayDate());
  const [truckDownload, setTruckDownload] = useState();
  const [locationDownload, setLocationDownload] = useState();

  const filter = `period[start]=${startDate}&period[end]=${endDate}`;
  const { getCSVExport, csvData, isDownloading, isExporting } =
    useGetCSVExport();

  const { data, getCo2Reduction, isLoading } = useGetCo2Reduction();
  const { truckDropdownData, locationsDropdownData } = useContext(
    dropdownFilterContext
  );

  const [dateFilter, setDateFilter] = useState(filter);
  const [dateRange, setDateRange] = useState([startDate, endDate]);
  const [truckFilter, setTruckFilter] = useState();
  const [locationFilter, setLocationFilter] = useState();

  useFilterGraph(
    truckFilter,
    locationFilter,
    dateFilter,
    null,
    null,
    getCo2Reduction
  );

  const widgetCardComponents = [
    {
      Component: (
        <CardWidget
          label="Disel saved (liters)"
          count={Math.round(data?.diesel_saved_in_litres).toLocaleString()}
          // background="#5899DA"
          icon={<Droplet />}
          width="100%"
        />
      ),
    },

    {
      Component: (
        <CardWidget
          label="Co2 Reduction (Kg)"
          count={Math.round(data?.co2_reduction_in_kg).toLocaleString()}
          // background="#5899DA"
          icon={<Cloud />}
          width="100%"
        />
      ),
    },

    {
      Component: (
        <CardWidget
          label="Co2 Reduction (tons)"
          count={Math.round(data?.co2_reduction_in_ton).toLocaleString()}
          // background="#5899DA"
          icon={<CloudBlue />}
          width="100%"
        />
      ),
    },

    {
      Component: (
        <CardWidget
          label="Total Active Usage"
          count={Math.round(data?.total_active_usage).toLocaleString()}
          // background="#5899DA"
          icon={<CloudGreen />}
          width="100%"
        />
      ),
    },
  ];

  console.log("date range", dateRange);
  return (
    <DashboardLayout>
      <StyledDashboardContentWrapper>
        <PageHeaderLayout>
          <StyledDivFlex gap="1rem">
            <StyledPageHeaderButton
              onClick={() => {
                const user = MapTokenToUser();
                console.log("user export", user.user.email);
                const data = {
                  export: {
                    entity: "co2_reduction",
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
              {isExporting ? "Sending..." : " Report Via Email"}
            </StyledPageHeaderButton>
            <StyledPageHeaderButton
              onClick={() => {
                const data = {
                  export: {
                    entity: "co2_reduction",
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
              {isDownloading ? "DownLoading" : "Download Report"}
            </StyledPageHeaderButton>
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
              const filter = location && `location=${location}`;
              setLocationFilter(filter);
              setLocationDownload(location);
            }}
            data={locationsDropdownData}
            gap="2rem"
            minWidth="20rem"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
            // multiSelect={true}
          />
          <PickDate
            onChange={(date) => {
              const filter =
                date &&
                `period[start]=${
                  formatDate(date[0])["yyyy-mm-dd"]
                }&period[end]=${formatDate(date[1])["yyyy-mm-dd"]} 
               `;
              setDateFilter(filter);
              // console.log("date", date);
              setDateRange(date);
              setStartDate(formatDate(date[0])["yyyy-mm-dd"]);
              setEndDate(formatDate(date[1])["yyyy-mm-dd"]);
            }}
          />

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
            minWidth="20rem"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
            // multiSelect={true} not working on this page.
          />
        </StyledDivFlex>

        <SubHeaderLayout
          text="C02 Reduction for the period:"
          dateRange={dateRange}
          count={data?.length}
        />

        <StyledDivGrid
          padding="1rem 8rem"
          marginTop="3rem"
          gap="2rem"
          width="100%"
          // flexWrap="wrap"
        >
          {/* <CardWidget
            label="Disel saved (liters)"
            count={Math.round(data?.diesel_saved_in_litres)}
            // background="#5899DA"
            icon={<Droplet />}
            width="100%"
          /> */}

          {/* <CardWidget
            label="Co2 Reduction (Kg)"
            count={Math.round(data?.co2_reduction_in_kg)}
            // background="#5899DA"
            icon={<Cloud />}
            width="100%"
          /> */}

          {/* <CardWidget
            label="Co2 Reduction (tons)"
            count={Math.round(data?.co2_reduction_in_ton)}
            // background="#5899DA"
            icon={<CloudBlue />}
            width="100%"
          /> */}

          {/* <CardWidget
            label="Total Active Usage"
            count={Math.round(data?.total_active_usage)}
            // background="#5899DA"
            icon={<CloudGreen />}
            width="100%"
          /> */}

          {data &&
            widgetCardComponents.map((item) => {
              return item.Component;
            })}

          {isLoading &&
            Array.from(Array(3).keys()).map((item) => (
              <Skeleton
                style={{
                  height: "25rem",
                  width: "100%",
                  borderRadius: "2rem",
                }}
              />
            ))}
        </StyledDivGrid>
      </StyledDashboardContentWrapper>
    </DashboardLayout>
  );
};

export default Co2Reduction;
