import React, { useEffect, useRef, useState } from 'react';

import { useDidUpdate } from '~/hooks';

import CheckBox from '../CheckBox';

import FormInput from './FormInput';

function Form(props) {
  const { children, initialValues, onSubmit, className, validateSchema, submitRef = {}, cleanRef = {} } = props;

  const [values, setValues] = useState(initialValues);
  const [clean, setClean] = useState(false);

  useDidUpdate(() => {
    setValues({ ...initialValues });
  }, [clean]);

  useEffect(() => {
    cleanRef.current = () => setClean((prev) => !prev);
  }, [cleanRef]);

  const [errorValidations, setErrorValidations] = useState({});

  const validationRules = {
    required: (value, isRequired) => (isRequired ? (value ? '' : 'Required !!!') : ''),
    min: (value, min) => (value.length >= min ? '' : `At least ${min} characters !!!`),
    max: (value, max) => (value.length <= max ? '' : `Up to ${max} characters !!!`),
    email: (value, isEmail) => {
      if (!isEmail) return;
      const error = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
      return error ? 'Email is not valid !!!' : '';
    },
    confirm: (value, confirmValue) => (value === values[confirmValue] ? '' : 'Confirm password does not match !!!'),
  };

  const validate = (value, name) => {
    if (!validateSchema) return false;
    let error = false;
    const validator = validateSchema[name];
    for (let key in validator) {
      error = validationRules[key] ? validationRules[key](value, validator[key]) : false;
      if (error) return error;
    }
    return error;
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (child.type !== FormInput && child.type !== CheckBox) return child;

      return React.cloneElement(child, {
        value: values[child.props.name],
        errorValidation: errorValidations[child.props.name] ? errorValidations[child.props.name].errorMess : false,
        validate: (value) => validate(value, child.props.name),
        setValueForm: (value) => {
          setValues({
            ...values,
            [child.props.name]: value,
          });
        },
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isOnlyOneError = false;
    for (let key in values) {
      const errorMess = validate(values[key], key);

      if (!isOnlyOneError) isOnlyOneError = errorMess;

      setErrorValidations((prev) => ({
        ...prev,
        [key]: {
          errorMess,
        },
      }));
    }

    if (!isOnlyOneError) {
      onSubmit(values);
    }
  };

  const btnSubmitRef = useRef();

  useEffect(() => {
    submitRef.current = () => btnSubmitRef.current.click();
  });

  return (
    <form className={className} onSubmit={handleSubmit}>
      {renderChildren()}
      <button style={{ display: 'none' }} ref={btnSubmitRef} type="submit"></button>
    </form>
  );
}

export default Form;
