import React from "react";
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

const Co2Reduction = () => {
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
            onChange={(data) => console.log("user selection", data)}
            data={locations}
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
            onChange={(data) => console.log("user selection", data)}
            data={trucks}
            gap="2rem"
            icon={
              <KeyboardArrowDownIcon
                fontSize="large"
                style={{ color: "#606060" }}
              />
            }
          />
        </StyledDivFlex>

        <SubHeaderLayout
          text="C02 Reduction for the period:"
          date="1 Feb, 2022 - 28th Feb, 2022"
          count="25 Trucks"
        />

        <StyledDivGrid
          padding="1rem 8rem"
          marginTop="3rem"
          gap="2rem"
          width="100%"
          // flexWrap="wrap"
        >
          {Co2DataItem.map((item) => {
            return (
              <CardWidget
                label={item.title}
                count={item.count}
                // background="#5899DA"
                icon={item.icon}
                width="100%"
              />
            );
          })}
        </StyledDivGrid>
      </StyledDashboardContentWrapper>
    </DashboardLayout>
  );
};

export default Co2Reduction;
