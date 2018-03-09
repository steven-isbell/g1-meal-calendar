import React, { Fragment } from "react";
import styled from "styled-components";

const FlexedContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
const ListItem = styled.li`
  line-height: 1.2;
  max-width: 500px;
  text-align: center;
  list-style: none;
`;
const ListTitle = styled.h1`
  text-decoration: underline;
  font-size: 18px;
  font-weight: 700;
`;
const legend = [
  {
    title: "Signing Up",
    actions: [
      "Select a Date.",
      "Insert the Appropriate Information.",
      "Click Submit"
    ]
  },
  {
    title: "Making Changes",
    actions: [
      "To Make Changes, Select Your Name, Then Select Edit Meal.",
      "Update the Appropriate Fields and Click Submit",
      "If it is Less Than 24 Hours Notice, Please Inform the Missionaries or WML Directly."
    ]
  },
  {
    title: "Cancelling",
    actions: [
      "To Cancel, Select Your Name, The Select Cancel Meal.",
      "If it is Less Than 24 Hours Notice, Please Inform the Missionaries or WML Directly."
    ]
  }
];
const Instructions = () => (
  <FlexedContainer>
    <ul id="instructions">
      {legend.map((val, idx) => (
        <Fragment key={`${val}${idx}`}>
          <ListTitle>{val.title}</ListTitle>
          {val.actions.map(item => (
            <ListItem key={`${item}${idx}`}>{item}</ListItem>
          ))}
        </Fragment>
      ))}
    </ul>
  </FlexedContainer>
);

export default Instructions;
