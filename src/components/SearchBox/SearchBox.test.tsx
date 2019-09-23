import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from '.';

it('Should match shapshot', () => {
  const { asFragment } = render(<SearchBox onQuery={() => {}} />)

  expect(asFragment()).toMatchSnapshot()
})


it('Should fire onQuery with the value of the input', () => {
  const onQuery = jest.fn() // spy

  const { container } = render(<SearchBox onQuery={onQuery} />)
  const input = container.querySelector('input')
  input.value = 'Test'

  fireEvent.change(input)
  const button = container.querySelector('button')
  fireEvent.click(button)

  expect(onQuery).toBeCalledWith('Test')
})
