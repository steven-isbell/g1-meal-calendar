import React, { Fragment } from 'react';

import { standardLegend, authedLegend } from './legend';
import { ListTitle, ListItem, FlexedContainer } from '../../styledComponents';

const Instructions = ({ isAuthenticated }) => {
  const listToMap = isAuthenticated ? authedLegend : standardLegend;

  const mapped = listToMap.map((val, idx) => (
    <Fragment key={`${val}${idx}`}>
      <ListTitle>{val.title}</ListTitle>
      {val.actions.map(item => (
        <ListItem key={`${item}${idx}`}>{item}</ListItem>
      ))}
    </Fragment>
  ));

  return (
    <FlexedContainer>
      <ul id="instructions">{mapped}</ul>
    </FlexedContainer>
  );
};

export default Instructions;
