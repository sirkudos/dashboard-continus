import React, { useState } from "react";
// import { Theme } from "../../Theme";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import MiniDropDown from "../MiniDropDown";
import { StyledText } from "../../common/Basics/StyledText";
import { StyledDivFlex } from "../../common/Basics/DivFlex";
import { Theme } from "../../../Theme";
import { StyledBox } from "../../common/Basics/DivBox";
import WidgetMenu from "../MiniDropDown";

const WidgetWithDropdown = ({
  width = "33.333%", //default width incase no width was passed
  label,
  count,
  onView,
  onRemove,
}) => {
  return (
    <StyledDivFlex
      background={Theme.colors.neutralColor}
      width={width}
      boxShadow="0px 4px 4px #F3EFE9"
      borderRadius="2rem"
      padding="6rem 4rem 4rem 4rem"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
    >
      <StyledDivFlex
        borderRadius="50%"
        height="11.4rem"
        width="11.4rem"
        background={Theme.colors.neutralColor5}
        justifyContent="center"
        alignItems="center"
        //   flex="1"
      >
        <StyledText
          fontSize="3.6rem"
          fontWeight="500"
          color={Theme.colors.primaryColor}
          //   textAlign="end"
        >
          {count}
        </StyledText>
      </StyledDivFlex>
      <StyledText
        fontSize="2.2rem"
        fontWeight="400"
        color={Theme.colors.primaryColor}
        width="40%"
        margin="0 1rem 0 0"
        textAlign="end"
        // padding="0rem 10rem 0rem 0rem"
      >
        {label}
      </StyledText>

      <StyledBox position="absolute" Bottom="1rem" Right="4rem">
        <StyledText
          fontSize="1.8rem"
          fontWeight="400"
          color="#5F8050"
          margin="0 1rem 0 0"
          cursor="pointer"
        >
          Download report
        </StyledText>
      </StyledBox>
      <StyledBox cursor="pointer" position="absolute" Top="2rem" Right="2rem">
        <WidgetMenu onRemove={onRemove} onView={onView} />
      </StyledBox>
    </StyledDivFlex>
  );
};

export default WidgetWithDropdown;