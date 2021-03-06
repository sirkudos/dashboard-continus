import styled from "styled-components";
import {
    largeDevice,
    mediumDevice,
    smallDevice,
    smallestDevice,
    veryLargeDevice,
} from "../../../constants/MediaQuery/MediaQuery";

export const StyledButton = styled.button `
  padding: ${({ padding }) => padding};
  margin-top: ${({ marginTop }) => marginTop};
  background-color: ${({ theme, background }) =>
    background || theme.colors.secondaryColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ theme, color }) => color || theme.colors.primaryColor};
  font-style: normal;
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  min-width: ${({ minWidth }) => minWidth};
  display: block;
  font-weight: ${({ fontWeight }) => fontWeight || "600"};
  cursor: pointer;
  border: ${({ border }) => border || "none"};
  outline: none;
  min-width: ${({ minWidth }) => minWidth};
  &:active {
    outline: none;
  }

  opacity: ${({ disabled }) => (disabled === true ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled === true ? "none" : "initial")};

  ${veryLargeDevice}
  ${largeDevice}
  ${mediumDevice}
  ${smallDevice}
  ${smallestDevice}
`;