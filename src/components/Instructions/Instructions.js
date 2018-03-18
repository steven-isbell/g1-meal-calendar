import React, { Fragment } from "react";

import legend from "./legend";
import { ListTitle, ListItem, FlexedContainer } from "../../styledComponents";

const mapped = legend.map((val, idx) => (
  <Fragment key={`${val}${idx}`}>
    <ListTitle>{val.title}</ListTitle>
    {val.actions.map(item => <ListItem key={`${item}${idx}`}>{item}</ListItem>)}
  </Fragment>
));

const Instructions = () => (
  <FlexedContainer>
    <ul id="instructions">{mapped}</ul>
  </FlexedContainer>
);

export default Instructions;
