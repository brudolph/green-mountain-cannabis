import tw, { css } from 'twin.macro';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useFilters from '../lib/useFilters';
import { Input, Label } from './styles/Form';

export default function Filters({ handleChange }) {
  const { inputs, setInputs } = useFilters();

  const filterProducts = (e) => {
    handleChange(e);
  };
  return (
    <div tw="flex justify-start space-x-4">
      <Popover tw="relative">
        <Popover.Button tw="text-sm flex">
          Strains{' '}
          <ChevronDownIcon tw="ml-2 h-4 w-4  text-accent" aria-hidden="true" />
        </Popover.Button>
        <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
          <Label>
            Hybrid
            <Input
              type="checkbox"
              id="strain1"
              name="strain1"
              value="Hybrid"
              onChange={(e) => filterProducts(e)}
              tw="w-2 h-2"
              checked={inputs.strain1}
            />
          </Label>
          <Label>
            Hybrid Sativa
            <Input
              type="checkbox"
              id="strain2"
              name="strain2"
              value="Hybrid Sativa"
              onChange={(e) => filterProducts(e)}
              tw="w-2 h-2"
            />
          </Label>
        </Popover.Panel>
      </Popover>
    </div>
  );
}
