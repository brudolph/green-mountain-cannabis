import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const StyledTransition = styled(Transition)`
  &.enter {
    ${tw`transition duration-100 ease-out`}
  }
  &.enterFrom {
    ${tw`opacity-0`}
  }
  &.enterTo {
    ${tw`opacity-100`}
  }
  &.leave {
    ${tw`transition ease-in duration-100`}
  }
  &.leaveFrom {
    ${tw`opacity-100`}
  }
  &.leaveTo {
    ${tw`opacity-0`}
  }
`;

function Selectbox({ options, name, setInputs, inputs }) {
  const [selectedItem, setSelectedItem] = useState(options[0]);

  useEffect(() => {
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: selectedItem,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  return (
    <Listbox value={selectedItem} onChange={setSelectedItem} name={name}>
      {({ open }) => (
        <>
          <Listbox.Label tw="block font-medium text-gray-700">
            Select {name[0].toUpperCase() + name.slice(1).toLowerCase()}
          </Listbox.Label>
          <div tw="mt-1 relative">
            <Listbox.Button tw="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
              <span tw="block truncate">
                {selectedItem.replace(/([A-Z][a-z]+)([A-Z][a-z]+)/g, '$1 $2')}
              </span>
              <span tw="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon tw="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <StyledTransition
              show={open}
              as={Fragment}
              enter="enter"
              enterFrom="enterFrom"
              enterTo="enterTo"
              leave="leave"
              leaveFrom="leaveFrom"
              leaveTo="leaveTo"
            >
              <Listbox.Options tw="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option key={option} as={Fragment} value={option}>
                    {({ selected, active }) => (
                      <li
                        css={[
                          active
                            ? tw`text-white bg-accent-light`
                            : tw`text-gray-900`,
                          tw`cursor-default select-none relative py-2 pl-8 pr-4`,
                        ]}
                      >
                        <span
                          css={[
                            tw`block truncate`,
                            selected ? tw`font-semibold` : tw`font-normal`,
                          ]}
                        >
                          {option.replace(
                            /([A-Z][a-z]+)([A-Z][a-z]+)/g,
                            '$1 $2'
                          )}
                        </span>

                        {selected ? (
                          <span
                            css={[
                              tw`absolute inset-y-0 left-0 flex items-center pl-1.5`,
                              active ? tw`text-white` : tw`text-accent-dark`,
                            ]}
                          >
                            <CheckIcon tw="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </StyledTransition>
          </div>
        </>
      )}
    </Listbox>
  );
}

Selectbox.propTypes = {
  inputs: PropTypes.object,
  name: PropTypes.shape({
    slice: PropTypes.func,
  }),
  options: PropTypes.shape({
    map: PropTypes.func,
  }),
  setInputs: PropTypes.func,
};

export default Selectbox;
