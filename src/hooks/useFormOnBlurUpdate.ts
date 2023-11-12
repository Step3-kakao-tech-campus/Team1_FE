import React, { useState } from 'react';

interface StringIndex {
  [index: string]: string;
}

const useFormOnBlurUpdate = <T extends StringIndex>(
  initial: T,
  afterBlurUpdater: (value: string, id: string) => void,
  validator?: (prev: string) => string,
) => {
  const [val, setVal] = useState(initial);

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setVal((prev) => {
      if (validator === undefined) {
        return prev;
      }
      return { ...prev, [event.target.id]: validator(event.target.value) };
    });

    afterBlurUpdater(event.target.value, event.target.id);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  return { val, onBlurHandler, onChangeHandler };
};

export default useFormOnBlurUpdate;
