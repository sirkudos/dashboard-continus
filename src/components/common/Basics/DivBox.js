import styled, { css } from "styled-components";
import { breakPoint } from "../../../constants/breakPoints";
import {
    largeDevice,
    mediumDevice,
    smallDevice,
    smallestDevice,
    veryLargeDevice,
} from "../../../constants/MediaQuery/MediaQuery";

export const StyledBox = styled.div `
  width: ${({ width }) => width};
  min-height: ${({ minHeight }) => minHeight};
  min-width: ${({ minWidth }) => minWidth};
  height: ${({ height }) => height};
  background-color: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  margin-top: ${({ marginTop }) => marginTop};
  box-shadow: ${({ boxShadow }) => boxShadow};
  border-radius: ${({ borderRadius }) => borderRadius};
  display: ${({ display }) => display};
  position: ${({ position }) => position};
  top: ${({ Top }) => Top};
  grid-column: ${({ gridColumn }) => gridColumn};
  bottom: ${({ Bottom }) => Bottom};
  right: ${({ Right }) => Right};
  left: ${({ Left }) => Left};
  border: ${({ border }) => border};
  z-index: ${({ zIndex }) => zIndex};
  cursor: ${({ cursor }) => cursor};
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-repeat: ${({ backgroundRepeat }) => backgroundRepeat};
  background-position: ${({ backgroundPosition }) => backgroundPosition};
  background-size: ${({ backgroundSize }) => backgroundSize};
  overflow: ${({ overFlow }) => overFlow};
  max-width: ${(maxWidth) => maxWidth};
  overflow-x: ${(overFlowX) => overFlowX};
  transition: ${(transition) => transition};

  ${veryLargeDevice}
  ${largeDevice}
  ${mediumDevice}
  ${smallDevice}
  ${smallestDevice}
`;