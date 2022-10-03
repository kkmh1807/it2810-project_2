import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Selector from '../Selector';

const mockValues = ['option1', 'option2', 'option3', 'option4', 'option5'];
const mockSetter = jest.fn();

describe('Selector', () => {
  it('calls the setter when clicked', () => {
    const { getByTestId } = render(<Selector value={'option1'} setValue={mockSetter} values={mockValues} />);

    userEvent.selectOptions(getByTestId('selector'), 'option2');
    expect(mockSetter).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const component = render(<Selector value={'option1'} setValue={mockSetter} values={mockValues} />);

    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <select
          class="select"
          data-testid="selector"
        >
          <option
            value="option1"
          >
            option1
          </option>
          <option
            value="option2"
          >
            option2
          </option>
          <option
            value="option3"
          >
            option3
          </option>
          <option
            value="option4"
          >
            option4
          </option>
          <option
            value="option5"
          >
            option5
          </option>
        </select>
      </DocumentFragment>
    `);
  });
});
