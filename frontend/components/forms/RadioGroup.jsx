import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import tw from 'twin.macro';

function Radios({ options, name, setInputs, inputs, label }) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: selected,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div>
      <RadioGroup value={selected} onChange={setSelected} name={name}>
        <RadioGroup.Label>Choose {label}</RadioGroup.Label>
        <div tw="grid grid-cols-3 gap-3 sm:grid-cols-6 p-2 bg-primary-light/25 rounded-md mt-2 mb-6">
          {options.map((option) => (
            <RadioGroup.Option key={option} value={option}>
              {({ active, checked }) => (
                <span
                  css={[
                    active ? tw`ring-2 ring-offset-1 ring-primary-dark` : '',
                    checked
                      ? tw`bg-primary/80 border-transparent text-white hover:bg-primary-dark`
                      : tw`bg-primary/10 border-primary-dark/10 text-gray-900 hover:bg-primary/40`,
                    tw`cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1`,
                  ]}
                >
                  {option}
                </span>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

Radios.propTypes = {
  inputs: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.shape({
    map: PropTypes.func,
  }),
  setInputs: PropTypes.func,
};

export default Radios;
