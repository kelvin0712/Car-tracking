import React from 'react';
import { render } from '@testing-library/react';
import ResultList from '.';

it('Should match shapshot', () => {
  const { asFragment } = render(<ResultList historyRecords={[
    { firstName: 'Test' }
  ]} />)

  expect(asFragment()).toMatchSnapshot()
})

