import InputField from '../InputField';
import { render } from '@testing-library/react';

describe('InputField', () => {
  it('InputField recieves placeholder', () => {
    const { queryByPlaceholderText } = render(
      <InputField
        placeholder="This is a placeholder"
        setter={function (val: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    const placeholder = queryByPlaceholderText('This is a placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('renders correctly', () => {
    const component = render(
      <InputField
        placeholder="Helloello"
        setter={function (val: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );

    expect(component.asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <input
          class="input-field"
          placeholder="Helloello"
          required=""
          type="text"
        />
      </DocumentFragment>
    `);
  });
});
