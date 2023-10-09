import React, { useCallback, useState } from 'react';

interface StateType {
  [index: string]: any;
}

const useForm = <T extends StateType>(initialStateObject: T) => {
  const [obj, setObj] = useState<T>(initialStateObject);

  const formHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newObj = { ...obj, [event.target.id]: event.target.value };
      setObj((prev: T) => newObj);
    },
    [obj],
  );

  const selectOneHandler = useCallback(
    (event: React.MouseEvent<HTMLElement>, value: any) => {
      console.log(event.currentTarget.id, value);
      const newObj = { ...obj, [event.currentTarget.id]: value };
      setObj((prev: T) => newObj);
    },
    [obj],
  );

  const toggleHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newObj = { ...obj, [event.target.id]: !obj[event.target.id] };
      setObj((prev: T) => newObj);
    },
    [obj],
  );

  return { obj, formHandler, toggleHandler, selectOneHandler };
};

export default useForm;
