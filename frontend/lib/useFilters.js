import { useEffect, useState } from 'react';

export default function useFilters(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    console.log(e.target.value);
    const { value, name, type } = e.target;
    if (type === 'checkbox') {
      if (!e.target.checked) {
        setInputs({
          // copy the existing state
          ...inputs,
          [name]: '',
        });
      } else {
        setInputs({
          // copy the existing state
          ...inputs,
          [name]: value,
        });
      }
    }
  }

  return {
    inputs,
    handleChange,
    setInputs,
  };
}
