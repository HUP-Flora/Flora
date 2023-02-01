import React from "react";
import styled from "styled-components";
import {MyMessageTime} from "../MessageStyle";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 16px;
  margin-bottom: 0;
  width: 232px;
  height: 222px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
`;

export const FormTitle = styled.p`
  font-size: 19px;
  margin: 16px 0 24px 0;
`;

export const SubmitButton = styled.button`
  width: 168px;
  height: 44px;
  background: #FFEAF5;  
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const ButtonImage = styled.img`
  width: 19px;
  height: 19px;
`;

export const FormText = styled.p`
  font-size: 16px;
  color: #000000;
`;

export const FormTime = styled(MyMessageTime)`
  margin: 8px auto 13px 16px;
`;