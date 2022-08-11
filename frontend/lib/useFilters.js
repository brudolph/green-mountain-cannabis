import { useEffect, useState } from 'react';

export default function useFilters(initial = {}) {
  const [filters, setFilters] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setFilters(initial);
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
    filters,
    setFilters,
  };
}
