import React, { useCallback, useState } from 'react';

interface StateType {
  [index: string]: any;
}

const useForm = (initialStateObject: StateType) => {
  const [obj, setObj] = useState<StateType>(initialStateObject);

  const formHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newObj = { ...obj, [event.target.id]: event.target.value };
      setObj((prev: StateType) => newObj);
    },
    [obj],
  );

  const toggleHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newObj = { ...obj, [event.target.id]: !obj[event.target.id] };
      setObj((prev: StateType) => newObj);
    },
    [obj],
  );

  return { obj, formHandler, toggleHandler };
};

export default useForm;
