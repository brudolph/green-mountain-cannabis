import { useEffect, useState } from 'react';

export default function useFilters(initial = {}) {
  const [checkboxfilters, setCheckboxFilters] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setCheckboxFilters(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return {
    checkboxfilters,
    setCheckboxFilters,
  };
}
