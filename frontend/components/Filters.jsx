import PropTypes from 'prop-types';
import 'twin.macro';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { AdjustmentsIcon, XIcon } from '@heroicons/react/solid';
import useFilters from '../lib/useFilters';
import { strainList, environmentList, potencyList } from './config/filters';
import Checkbox from './forms/Checkbox';
import {
  FilterStyles,
  FiltersContainer,
  ActiveFilters,
  ActiveFiltersContainer,
  ActiveFiltersHeader,
} from '../styles/FilterStyles';

function Filters({ loading, products, setFilteredData }) {
  const [strains, setStrains] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [potencies, setPotencies] = useState([]);
  const { checkboxfilters, setCheckboxFilters } = useFilters([
    { name: 'Indica', checked: false },
    { name: 'Hybrid Indica', checked: false },
    { name: 'Sativa', checked: false },
    { name: 'Hybrid Sativa', checked: false },
    { name: 'Hybrid', checked: false },
    { name: 'Indoor', checked: false },
    { name: 'Outdoor', checked: false },
    { name: 'Greenhouse', checked: false },
    { name: '< Less than: 25%', checked: false },
    { name: '> Greater than: 25%', checked: false },
  ]);

  const filterStrain = (filteredProducts) => {
    if (strains.length !== 0) {
      return filteredProducts.filter((product) =>
        strains.some((strain) => [product.strain].includes(strain))
      );
    }
    return filteredProducts;
  };

  const filterEnvironment = (filteredProducts) => {
    if (environments.length !== 0) {
      return filteredProducts.filter((product) =>
        environments.some((environment) =>
          [product.environment].includes(environment)
        )
      );
    }
    return filteredProducts;
  };

  const filterPotency = (filteredProducts) => {
    if (potencies.length !== 0) {
      if (potencies[0].slice(0, 1) === '>') {
        return filteredProducts.filter((product) =>
          potencies.some(() => [product.potency] > 25.0)
        );
      }
      if (potencies[0].slice(0, 1) === '<') {
        return filteredProducts.filter((product) =>
          potencies.some(() => [product.potency] < 25.0)
        );
      }
    }
    return filteredProducts;
  };

  const updateCheckboxFilters = (value) => {
    const filterIndex = checkboxfilters.findIndex(
      (filter) => filter.name === value
    );

    setCheckboxFilters(
      checkboxfilters.map((filter, currentIndex) =>
        currentIndex === filterIndex
          ? { ...filter, checked: !filter.checked }
          : filter
      )
    );
  };

  const handleRemoveFilter = (removefilter) => {
    const filterIndex = checkboxfilters.findIndex(
      (filter) => filter.name === removefilter
    );

    setCheckboxFilters(
      checkboxfilters.map((filter, currentIndex) =>
        currentIndex === filterIndex
          ? { ...filter, checked: !filter.checked }
          : filter
      )
    );

    const updateStrainFilters = strains.filter(
      (strain) => strain !== removefilter
    );

    setStrains(updateStrainFilters);

    const updateEnvironmentFilters = environments.filter(
      (environment) => environment !== removefilter
    );

    setEnvironments(updateEnvironmentFilters);

    const updatePotencyFilters = potencies.filter(
      (potency) => potency !== removefilter
    );

    setPotencies(updatePotencyFilters);
  };

  const handleStrainCheck = (e) => {
    if (e.target.checked) {
      setStrains([...strains, e.target.value]);
    } else {
      setStrains(strains.filter((id) => id !== e.target.value));
    }

    updateCheckboxFilters(e.target.value, checkboxfilters, setCheckboxFilters);
  };

  const handleEnvironmentCheck = (e) => {
    if (e.target.checked) {
      setEnvironments([...environments, e.target.value]);
    } else {
      setEnvironments(environments.filter((id) => id !== e.target.value));
    }
    updateCheckboxFilters(e.target.value, checkboxfilters, setCheckboxFilters);
  };

  const handlePotencyCheck = (e) => {
    if (e.target.checked) {
      setPotencies([...potencies, e.target.value]);
    } else {
      setPotencies(potencies.filter((id) => id !== e.target.value));
    }
    updateCheckboxFilters(e.target.value, checkboxfilters, setCheckboxFilters);
  };

  useEffect(() => {
    if (loading) return;
    let filteredProducts = products;
    filteredProducts = filterStrain(filteredProducts);
    filteredProducts = filterEnvironment(filteredProducts);
    filteredProducts = filterPotency(filteredProducts);
    setFilteredData(filteredProducts);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strains, environments, potencies]);

  // eslint-disable-next-line no-unused-vars
  let filterTypes;

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
                isChecked={checkboxfilters[index].checked}
                checkHandler={(e) => handleStrainCheck(e, index)}
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
                  key={`strain-${index}`}
                  isChecked={checkboxfilters[index].checked}
                  checkHandler={(e) => handleStrainCheck(e, index)}
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
                  key={`environment-${index}`}
                  isChecked={checkboxfilters[index + 5]?.checked}
                  checkHandler={(e) => handleEnvironmentCheck(e, index)}
                  label={filter}
                  value={filter}
                  index={index}
                />
              ))}
            </Popover.Panel>
          </Popover>
          <Popover tw="relative">
            <Popover.Button tw="text-sm flex">
              Potency{' '}
              <ChevronDownIcon
                tw="ml-2 h-4 w-4  text-accent"
                aria-hidden="true"
              />
            </Popover.Button>
            <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
              {potencyList.map((filter, index) => (
                <Checkbox
                  key={`potency-${index}`}
                  isChecked={checkboxfilters[index + 8]?.checked}
                  checkHandler={(e) => handlePotencyCheck(e, index)}
                  label={filter.slice(2)}
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
          <ActiveFiltersHeader>
            <AdjustmentsIcon tw="w-5 h-5 mr-2 text-gray-600" /> Filters:
          </ActiveFiltersHeader>
          <div tw="flex">
            {strains.map((strain, index) => (
              <button
                key={index}
                type="button"
                tw="flex items-center text-sm bg-white rounded-full px-4 py-1 mr-2"
                onClick={() => handleRemoveFilter(strain)}
              >
                {strain} <XIcon tw="w-4 h-4 ml-2 text-accent" />
                <span tw="sr-only">Click to remove</span>
              </button>
            ))}
            {environments.map((environment, index) => (
              <button
                key={index}
                type="button"
                tw="flex items-center text-sm bg-white rounded-full px-4 py-1 mr-2"
                onClick={() => handleRemoveFilter(environment)}
              >
                {environment} <XIcon tw="w-4 h-4 ml-2 text-accent" />
                <span tw="sr-only">Click to remove</span>
              </button>
            ))}
            {potencies.map((potency, index) => (
              <button
                key={index}
                type="button"
                tw="flex items-center text-sm bg-white rounded-full px-4 py-1 mr-2"
                onClick={() => handleRemoveFilter(potency)}
              >
                {potency.slice(2)} <XIcon tw="w-4 h-4 ml-2 text-accent" />
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
  loading: PropTypes.bool,
  products: PropTypes.array,
  setFilteredData: PropTypes.func,
};

export default Filters;
