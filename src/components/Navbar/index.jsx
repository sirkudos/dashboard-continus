import React, { useState } from "react";
import { StyledDivFlex } from "../common/Basics/DivFlex";
import { StyledTextHeading } from "../common/Basics/Heading";
import { StyledImage } from "../common/Basics/StyledImage";
import { StyledText } from "../common/Basics/StyledText";
import { Theme } from "../../Theme";
import MapTokenToUser from "../../Authorization/MapTokenToUser";
import Profile from "../Profile/Profile";
import Companies from "../Company";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledBox } from "../common/Basics/DivBox";
import { useDropDown } from "../../hooks/useHideDropDown";

const Navbar = () => {
  const [showCompany, setShowCompany] = useState(false);
  const user = MapTokenToUser();

  return (
    <StyledDivFlex
      justifyContent="flex-end"
      background={Theme.colors.neutralColor}
      gap="20rem"
      gapSd="0"
      paddingSd="0 1rem !important"
      alignItems="center"
      padding="1rem  8rem "
      justifyContentS="center"
      paddingS="0"
      gapS="0rem"
    >
      <StyledTextHeading
        textTransform="uppercase"
        color={Theme.colors.primaryColor}
        fontWeight="600"
        fontSize="calc(1rem + 1.63vw)"
        lineHeight="5.4rem"
        whiteSpace="nowrap"
        // whiteSpaceT="normal"
      >
        FLEET MANAGEMENT SYSTEM
      </StyledTextHeading>
      <StyledDivFlex gap="1.5rem">
        <StyledImage
          src={
            user?.user?.data?.avatar
              ? user?.user?.Company?.data?.picture
              : "/assets/7Up-logo.jpg"
          }
          height="7.2rem"
          width="7.2rem"
          borderRadius="50%"
          position="relative"
          displayM="none"
        />
        <StyledDivFlex
          alignItems="start"
          flexDirection="column"
          justifyContent="center"
          displayM="none"
        >
          <StyledText
            color={Theme.colors.neutralColor2}
            fontSize="1.8rem"
            fontWeight="500"
            lineHeight="2.7rem"
          >
            {user?.user?.data?.firstname}
          </StyledText>
          <StyledText
            color={Theme.colors.neutralColor2}
            fontSize="1.8rem"
            fontWeight="400"
            lineHeight="2.7rem"
            whiteSpace="noWrap"
          >
            {/* Bisedge personnel */}{" "}
            {user?.user?.data?.role === "personnel" ||
            user?.user?.data?.role === "admin"
              ? user?.user?.data?.role === "personnel"
                ? "Bisedge Personnel"
                : "Admin"
              : user?.user?.Company?.data?.official_name}
          </StyledText>
        </StyledDivFlex>
        <StyledBox
          position="absolute"
          Top="9rem"
          zIndex="5"
          minWidth="12%"
          Right="10rem"
          widthS="50%"
          display={
            user?.user?.data?.role === "personnel" && showCompany
              ? "block"
              : "none"
          }
        >
          <Companies />
        </StyledBox>

        {/* <StyledImage /> */}
        {user?.user?.data?.role === "personnel" ? (
          <StyledDivFlex
            onClick={() => setShowCompany(!showCompany)}
            position="absolute"
            Right="4rem"
            Top="2rem"
            cursor="pointer"
          >
            <MenuIcon fontSize="large" />
          </StyledDivFlex>
        ) : (
          ""
        )}
      </StyledDivFlex>
    </StyledDivFlex>
  );
};

export default Navbar;
