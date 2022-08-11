import PropTypes from 'prop-types';
import 'twin.macro';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import useFilters from '../lib/useFilters';
import { strainList, environmentList } from './config/filters';
import Checkbox from './forms/Checkbox';
import {
  FilterStyles,
  FiltersContainer,
  ActiveFilters,
  ActiveFiltersContainer,
  ActiveFiltersHeader,
} from './styles/FilterStyles';

const updateCheckboxes = (index, filters, setFilters) => {
  setFilters(
    filters.map((filter, currentIndex) =>
      currentIndex === index ? { ...filter, checked: !filter.checked } : filter
    )
  );
};

function Filters({ loading, products, setFilteredData }) {
  const [strains, setStrains] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const { filters, setFilters } = useFilters([
    { name: 'Indica', checked: false },
    { name: 'Hybrid Indica', checked: false },
    { name: 'Sativa', checked: false },
    { name: 'Hybrid Sativa', checked: false },
    { name: 'Hybrid', checked: false },
    { name: 'Indoor', checked: false },
    { name: 'Outdoor', checked: false },
    { name: 'Greenhouse', checked: false },
  ]);

  const handleActiveChange = (e, index) => {
    if (e.target.checked) {
      setStrains([...strains, e.target.value]);
    } else {
      setStrains(strains.filter((id) => id !== e.target.value));
    }
    updateCheckboxes(index, filters, setFilters);
  };

  const handleStrainChange = (e, index) => {
    if (e.target.checked) {
      setStrains([...strains, e.target.value]);
    } else {
      setStrains(strains.filter((id) => id !== e.target.value));
    }
    updateCheckboxes(index, filters, setFilters);
  };

  const handleEnvironmentChange = (e, index) => {
    if (e.target.checked) {
      setEnvironments([...environments, e.target.value]);
    } else {
      setEnvironments(environments.filter((id) => id !== e.target.value));
    }
    updateCheckboxes(index, filters, setFilters);
  };

  useEffect(() => {
    if (loading) return;
    if (strains.length === 0) {
      setFilteredData(products.products);
    } else {
      setFilteredData(
        products.products.filter((product) =>
          strains.some((category) => [product.strain].includes(category))
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strains]);

  useEffect(() => {
    if (loading) return;
    if (environments.length === 0) {
      setFilteredData(products.products);
    } else {
      setFilteredData(
        products.products.filter((product) =>
          environments.some((category) =>
            [product.environment].includes(category)
          )
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environments]);

  return (
    <FilterStyles>
      <FiltersContainer>
        <Popover tw="relative">
          <Popover.Button tw="text-sm flex">
            Sort{' '}
            <ChevronDownIcon
              tw="ml-2 h-4 w-4  text-accent"
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Panel tw="absolute left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
            {strainList.map((filter, index) => (
              <Checkbox
                key={index}
                isChecked={filters[index].checked}
                checkHandler={(e) => handleStrainChange(e, index)}
                label={filter}
                value={filter}
                index={index}
              />
            ))}
          </Popover.Panel>
        </Popover>
        <div tw="flex space-x-4">
          <Popover tw="relative">
            <Popover.Button tw="text-sm flex">
              Strains{' '}
              <ChevronDownIcon
                tw="ml-2 h-4 w-4  text-accent"
                aria-hidden="true"
              />
            </Popover.Button>
            <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
              {strainList.map((filter, index) => (
                <Checkbox
                  key={index}
                  isChecked={filters[index].checked}
                  checkHandler={(e) => handleStrainChange(e, index)}
                  label={filter}
                  value={filter}
                  index={index}
                />
              ))}
            </Popover.Panel>
          </Popover>
          <Popover tw="relative">
            <Popover.Button tw="text-sm flex">
              Environments{' '}
              <ChevronDownIcon
                tw="ml-2 h-4 w-4  text-accent"
                aria-hidden="true"
              />
            </Popover.Button>
            <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
              {environmentList.map((filter, index) => (
                <Checkbox
                  key={index}
                  isChecked={filters[index].checked}
                  checkHandler={(e) => handleEnvironmentChange(e, index)}
                  label={filter}
                  value={filter}
                  index={index}
                />
              ))}
            </Popover.Panel>
          </Popover>
        </div>
      </FiltersContainer>
      <ActiveFilters>
        <ActiveFiltersContainer>
          <ActiveFiltersHeader>Filters:</ActiveFiltersHeader>
          <div tw="flex">
            {strains.map((strain, index) => (
              <button
                key={index}
                type="button"
                tw="flex items-center text-sm bg-white rounded-full px-4 py-1"
                onClick={(e) => handleActiveChange(e, strain)}
              >
                {strain} <XIcon tw="w-4 h-4 ml-2 text-accent" />
                <span tw="sr-only">Click to remove</span>
              </button>
            ))}
          </div>
        </ActiveFiltersContainer>
      </ActiveFilters>
    </FilterStyles>
  );
}

Filters.propTypes = {
  loading: PropTypes.string,
  products: PropTypes.shape({
    products: PropTypes.shape({
      filter: PropTypes.func,
    }),
  }),
  setFilteredData: PropTypes.func,
};

export default Filters;
