import tw, { styled } from 'twin.macro';

export const FilterStyles = styled.div(tw`bg-white z-0`);
export const FiltersContainer = styled.div(
  tw`flex justify-between space-x-4 max-w-7xl mx-auto pb-4 pt-6 px-5`
);

export const ActiveFilters = styled.div(tw`flex bg-primary-dark/30 px-5`);
export const ActiveFiltersContainer = styled.div(
  tw`w-full max-w-7xl mx-auto py-4 px-5 sm:flex sm:items-center`
);
export const ActiveFiltersHeader = styled.h2(
  tw`flex items-center text-sm font-normal uppercase tracking-wide py-1 mr-4 text-gray-900`
);
