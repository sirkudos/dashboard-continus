import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { StyledDivFlex } from "../../components/common/Basics/DivFlex";
import { StyledImage } from "../../components/common/Basics/StyledImage";
import { StyledTextHeading } from "../../components/common/Basics/Heading";
import { StyledInput, StyledLabel } from "../../components/common/Input";
import { StyledForm } from "../../components/common/Form/style";
import { StyledButton } from "../../components/common/Button/style";
import { StyledText } from "../../components/common/Basics/StyledText";
import { Theme } from "../../Theme";
import { StyledBox } from "../../components/common/Basics/DivBox";
import { StyledSpinning } from "../../components/common/SpinningLoader/style";
import { StyledTextArea } from "../../components/common/Basics/TextArea";

const ContactAdmin = () => {
  //   const navigate = useNavigate();

  //   const { error, data, forgetPassword, isLoading } = useForgetPassword();
  //   const [forgetPasswordData, setForgetPasswordData] = useState({});

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setForgetPasswordData({ ...forgetPasswordData, [name]: value });
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const data = { ...forgetPasswordData, guard: "admin" };
  //     forgetPassword(data);

  //     navigate("/");
  //   };
  return (
    <StyledDivFlex>
      <StyledDivFlex
        flexDirection="column"
        background={Theme.colors.neutralColor}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flex="40%"
        backgroundImage={`url('/assets/lift.png')`}
        backgroundSize="cover"
        backgroundPosition="center center"
        backgroundRepeat="no-repeat"
      >
        <StyledImage src="/assets/bisedge-logo1.png" alt="bisedge logo" />
      </StyledDivFlex>
      <StyledDivFlex flex="60%" alignItems="center" justifyContent="center">
        <StyledDivFlex
          flexDirection="column"
          width="70%"
          borderRadius="1rem"
          background={Theme.colors.primaryColor}
          padding="4rem 6rem 6rem 6rem"
        >
          <StyledTextHeading
            textAlign="center"
            fontSize="3.6rem"
            fontWeight="400"
            color="#F3EFE9"
          >
            Contact Administrator
          </StyledTextHeading>
          <StyledText textAlign="center" fontSize="1.3rem">
            You can reachout to administrator below
          </StyledText>
          <StyledForm>
            <StyledDivFlex
              flexDirection="column"
              gap="1.5rem"
              justifyContent="center"
              marginTop="2rem"
              padding="0rem 4rem 0rem 4rem"
            >
              <StyledDivFlex flexDirection="column" gap="1rem">
                {/* <StyledLabel>Email</StyledLabel> */}
                <StyledTextArea
                  type="text"
                  placeholder="Type in your message here"
                  required
                  padding="2.3rem"
                  fontSize="2.3rem"
                  name="email"
                  //   value={forgetPasswordData.email}
                  //   onChange={handleChange}
                />
              </StyledDivFlex>

              <StyledButton
                padding="1.5rem"
                marginTop="2rem"
                borderRadius="5rem"
                fontSize="2.4rem"
              >
                Contact Admin
              </StyledButton>
            </StyledDivFlex>
          </StyledForm>
        </StyledDivFlex>
      </StyledDivFlex>
    </StyledDivFlex>
  );
};

export default ContactAdmin;