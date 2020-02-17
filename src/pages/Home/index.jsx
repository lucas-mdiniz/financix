import React from 'react';
import FlexRow from '../../containers/FlexRow';
import ShowValue from '../../components/ShowValue';
import PageTitle from '../../components/PageTitle';

const Home = () => {
  return (
    <>
      <PageTitle>Home</PageTitle>
      <FlexRow>
        <ShowValue color="#00b300" value="999,00" title="Balance" />
        <ShowValue color="#00b300" value="999,00" title="Income" />
        <ShowValue color="#e00000" value="999,00" title="Outcome" />
      </FlexRow>
    </>
  );
};

export default Home;