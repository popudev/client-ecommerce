import React, { useState } from 'react';

import FormInput from './FormInput';

function Form(props) {
  const { children, initialValues, onSubmit, className, validateSchema } = props;

  const [values, setValues] = useState(initialValues);
  const [errorValidations, setErrorValidations] = useState({});

  const validation = {
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
    let error = false;
    const validator = validateSchema[name];
    for (let key in validator) {
      error = validation[key] ? validation[key](value, validator[key]) : false;
      if (error) return error;
    }
    return error;
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (child.type !== FormInput) return child;

      return React.cloneElement(child, {
        validate: (value) => validate(value, child.props.name),
        setValueForm: (value) => {
          setValues({
            ...values,
            [child.props.name]: value,
          });
        },
        errorValidation: errorValidations[child.props.name] ? errorValidations[child.props.name].errorMess : false,
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

  return (
    <form className={className} onSubmit={handleSubmit}>
      {renderChildren()}
    </form>
  );
}

export default Form;
