import { useEffect, useState } from 'react';

export default function useFilters(initial = {}) {
  const [checkboxfilters, setCheckboxFilters] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setCheckboxFilters(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  // function handleChange(e) {
  //   console.log(e.target.value);
  //   let { value, name, type, checked } = e.target;
  //   if (type === 'checkbox') {
  //     if (!e.target.checked) {
  //       checked = '';
  //     }
  //   } else {
  //     setInputs({
  //       // copy the existing state
  //       ...inputs,
  //       [name]: value,
  //     });
  //   }
  // }

  return {
    checkboxfilters,
    setCheckboxFilters,
  };
}
