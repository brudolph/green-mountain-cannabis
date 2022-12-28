import PropTypes from 'prop-types';
import 'twin.macro';
import { Popover } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import useFilters from '../lib/useFilters';
import Checkbox from './forms/Checkbox';
import {
  strainList,
  environmentList,
  potencyList,
  oilTypeList,
  solventList,
  trimList,
  concentrateTypeList,
  prerollTypeList,
  tubeList,
  priceList,
} from './config/filters';
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
  const [oilTypes, setOilTypes] = useState([]);
  const [solventTypes, setSolventTypes] = useState([]);
  // const [trimMethods, setTrimMethods] = useState([]);
  // const [concentrateTypes, setConcentrateTypes] = useState([]);
  // const [prerollTypes, setPrerollTypes] = useState([]);
  // const [tube, setTube] = useState([]);
  // const [prices, setPrices] = useState([]);
  const [category, setCategory] = useState([]);
  const { checkboxfilters, setCheckboxFilters } = useFilters([
    ...strainList,
    ...environmentList,
    ...potencyList,
    ...oilTypeList,
    ...solventList,
    ...trimList,
    ...concentrateTypeList,
    ...prerollTypeList,
    ...tubeList,
    ...priceList,
  ]);

  const filterStrain = (filteredProducts) => {
    if (strains.length !== 0) {
      return filteredProducts.filter((product) => {
        const productStrain = product?.[category]?.strain;
        return strains.some((strain) => strain === productStrain);
      });
    }
    return filteredProducts;
  };

  const filterEnvironment = (filteredProducts) => {
    if (environments.length !== 0) {
      return filteredProducts.filter((product) => {
        const productEnvironment = product?.[category]?.environment;
        return environments.some(
          (environment) => environment === productEnvironment
        );
      });
    }
    return filteredProducts;
  };

  const filterPotency = (filteredProducts) => {
    if (potencies.length !== 0) {
      if (potencies[0].slice(0, 1) === '>') {
        console.log('greater than', checkboxfilters);
        return filteredProducts.filter((product) =>
          potencies.some(() => [product?.[category]?.potency] > 25.0)
        );
      }
      if (potencies[0].slice(0, 1) === '<') {
        return filteredProducts.filter((product) =>
          potencies.some(() => [product?.[category]?.potency] < 25.0)
        );
      }
    }
    return filteredProducts;
  };

  const filterOilType = (filteredProducts) => {
    if (oilTypes.length !== 0) {
      return filteredProducts.filter((product) => {
        const productOilType = product?.[category]?.oilType;
        return oilTypes.some((oiltype) => oiltype === productOilType);
      });
    }
    return filteredProducts;
  };

  const filterSolventType = (filteredProducts) => {
    if (solventTypes.length !== 0) {
      return filteredProducts.filter((product) => {
        const productOilType = product?.[category]?.solventUsed;
        return solventTypes.some(
          (solventtype) => solventtype === productOilType
        );
      });
    }
    return filteredProducts;
  };

  const updateCheckboxFilters = (index) => {
    setCheckboxFilters(
      checkboxfilters.map((filter, currentIndex) =>
        currentIndex === index
          ? {
              ...filter,
              checked: !filter.checked,
            }
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

    const updateOilTypeFilters = oilTypes.filter(
      (oilType) => oilType !== removefilter
    );

    setOilTypes(updateOilTypeFilters);

    const updateSolventTypeFilters = solventTypes.filter(
      (solventtype) => solventtype !== removefilter
    );

    setOilTypes(updateSolventTypeFilters);
  };

  const handleStrainCheck = (e, index) => {
    if (e.target.checked) {
      setStrains([...strains, e.target.value]);
    } else {
      setStrains(strains.filter((id) => id !== e.target.value));
    }
    updateCheckboxFilters(index);
  };

  const handleEnvironmentCheck = (e, index) => {
    if (e.target.checked) {
      setEnvironments([...environments, e.target.value]);
    } else {
      setEnvironments(environments.filter((id) => id !== e.target.value));
    }
    updateCheckboxFilters(index);
  };

  const handlePotencyCheck = (e, index) => {
    if (e.target.checked) {
      setPotencies([...potencies, e.target.value]);
    } else {
      setPotencies(potencies.filter((id) => id !== e.target.value));
    }
    updateCheckboxFilters(index);
  };

  const handleOilTypeCheck = (e, index) => {
    if (e.target.checked) {
      setOilTypes([...oilTypes, e.target.value]);
    } else {
      setOilTypes(oilTypes.filter((id) => id !== e.target.value));
    }
    updateCheckboxFilters(index);
  };

  const handleSolventTypeCheck = (e, index) => {
    if (e.target.checked) {
      setSolventTypes([...solventTypes, e.target.value]);
    } else {
      setSolventTypes(solventTypes.filter((id) => id !== e.target.value));
    }
    updateCheckboxFilters(index);
  };

  useEffect(() => {
    if (loading) return;
    let filteredProducts = products;
    filteredProducts = filterStrain(filteredProducts);
    filteredProducts = filterEnvironment(filteredProducts);
    filteredProducts = filterPotency(filteredProducts);
    filteredProducts = filterOilType(filteredProducts);
    filteredProducts = filterSolventType(filteredProducts);
    setFilteredData(filteredProducts);

    if (products[0]?.category.slug === 'fresh-frozen') {
      return setCategory('flower');
    }

    if (products[0]?.category.slug === 'trim') {
      return setCategory('flower');
    }

    if (products[0]?.category.slug === 'equipment') {
      return setCategory('machine');
    }

    setCategory(products[0]?.category.slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strains, environments, potencies, oilTypes, solventTypes]);

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
          <Popover.Panel tw="absolute left-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10" />
        </Popover>
        <div tw="flex space-x-4">
          {category !== 'machine' || category !== 'license' ? (
            <Popover tw="relative">
              <Popover.Button tw="text-sm flex">
                Strains{' '}
                <ChevronDownIcon
                  tw="ml-2 h-4 w-4  text-accent"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
                {strainList?.map((filter) => {
                  const checkedIndex = checkboxfilters.findIndex(
                    (check) => check.name === filter.name
                  );
                  return (
                    <Checkbox
                      key={`strain-${checkedIndex}`}
                      isChecked={checkboxfilters[checkedIndex].checked}
                      checkHandler={(e) => handleStrainCheck(e, checkedIndex)}
                      label={filter.name}
                      value={filter.name}
                      index={checkedIndex}
                    />
                  );
                })}
              </Popover.Panel>
            </Popover>
          ) : null}
          {category === 'flower' && (
            <Popover tw="relative">
              <Popover.Button tw="text-sm flex">
                Environments{' '}
                <ChevronDownIcon
                  tw="ml-2 h-4 w-4  text-accent"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
                {environmentList.map((filter) => {
                  const checkedIndex = checkboxfilters.findIndex(
                    (check) => check.name === filter.name
                  );
                  return (
                    <Checkbox
                      key={`environment-${checkedIndex}`}
                      isChecked={checkboxfilters[checkedIndex].checked}
                      checkHandler={(e) =>
                        handleEnvironmentCheck(e, checkedIndex)
                      }
                      label={filter.name}
                      value={filter.name}
                      index={checkedIndex}
                    />
                  );
                })}
              </Popover.Panel>
            </Popover>
          )}
          {category === 'flower' ||
          category === 'oil' ||
          category === 'concentrate' ? (
            <Popover tw="relative">
              <Popover.Button tw="text-sm flex">
                Potency{' '}
                <ChevronDownIcon
                  tw="ml-2 h-4 w-4  text-accent"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
                {potencyList.map((filter) => {
                  const checkedIndex = checkboxfilters.findIndex(
                    (check) => check.name === filter.name
                  );
                  return (
                    <Checkbox
                      key={`potency-${checkedIndex}`}
                      isChecked={checkboxfilters[checkedIndex].checked}
                      checkHandler={(e) => handlePotencyCheck(e, checkedIndex)}
                      label={filter.name.slice(2)}
                      value={filter.name}
                      index={checkedIndex}
                    />
                  );
                })}
              </Popover.Panel>
            </Popover>
          ) : null}
          {category === 'oil' && (
            <Popover tw="relative">
              <Popover.Button tw="text-sm flex">
                Oil Type{' '}
                <ChevronDownIcon
                  tw="ml-2 h-4 w-4  text-accent"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
                {oilTypeList.map((filter) => {
                  const checkedIndex = checkboxfilters.findIndex(
                    (check) => check.name === filter.name
                  );
                  return (
                    <Checkbox
                      key={`oiltype-${checkedIndex}`}
                      isChecked={filter.checked}
                      checkHandler={(e) => handleOilTypeCheck(e, checkedIndex)}
                      label={filter.name}
                      value={filter.name}
                      index={checkedIndex}
                    />
                  );
                })}
              </Popover.Panel>
            </Popover>
          )}
          {category === 'oil' && (
            <Popover tw="relative">
              <Popover.Button tw="text-sm flex">
                Solvent Used{' '}
                <ChevronDownIcon
                  tw="ml-2 h-4 w-4  text-accent"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Popover.Panel tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 p-2 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
                {solventList.map((filter) => {
                  const checkedIndex = checkboxfilters.findIndex(
                    (check) => check.name === filter.name
                  );
                  return (
                    <Checkbox
                      key={`solvent-${checkedIndex}`}
                      isChecked={filter.checked}
                      checkHandler={(e) =>
                        handleSolventTypeCheck(e, checkedIndex)
                      }
                      label={filter.name}
                      value={filter.name}
                      index={checkedIndex}
                    />
                  );
                })}
              </Popover.Panel>
            </Popover>
          )}
        </div>
      </FiltersContainer>
      <ActiveFilters>
        <ActiveFiltersContainer>
          <ActiveFiltersHeader>Applied Filters:</ActiveFiltersHeader>
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
            {oilTypes.map((oiltype, index) => (
              <button
                key={index}
                type="button"
                tw="flex items-center text-sm bg-white rounded-full px-4 py-1 mr-2"
                onClick={() => handleRemoveFilter(oiltype)}
              >
                {oiltype} <XIcon tw="w-4 h-4 ml-2 text-accent" />
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
  loading: PropTypes.any,
  products: PropTypes.any,
  setFilteredData: PropTypes.func,
};

export default Filters;
