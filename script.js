const form = document.querySelector('form');
const isDesktop = window.matchMedia('(min-width: 768px)').matches;
const mobilePhoneInput = document.querySelectorAll('.input__phone input[type="tel"]');
const desktopPhoneInputs = document.querySelectorAll('.input__phone input[type="text"]');


const addPhoneRequired = () => {
  const inputs = isDesktop ? desktopPhoneInputs : mobilePhoneInput;

  inputs.forEach((input) => {
    input.setAttribute('required', true);
  });
}

const addRequiredToLabel = () => {
  const required = document.querySelectorAll('[required]');

  required.forEach((input) => {
    const field = input.closest('.input');
    field.classList.add('input--required');
  });
}

const switchZipCodeType = () => {
  const zipCode = document.querySelector('[name="zipcode"]');

  if (isDesktop) {
    zipCode.setAttribute('type', 'text');
  }
}

const showError = (input, message = null) => {
  const field = input.closest('.input');

  field.classList.remove('input--success');
  field.classList.add('input--error');
  field.querySelector('[aria-hidden]').setAttribute('aria-hidden', 'false');
  
  if (message) {
    field.querySelector('.input__error-message').innerHTML = message;
  }
};

const validateLength = (input) => {
  const min = parseInt(input.dataset.minlength);
  const max = parseInt(input.dataset.maxlength);

  if (min && input.value.length < min) {
    showError(input, `Cannot be less than ${min} characters`);
    return false;
  }

  if (max && input.value.length > max) {
    showError(input, `Cannot be greater than ${max} characters.`);
    return false;
  }
  
  return true;
}

const validateRequired = () => {
  const required = document.querySelectorAll('[required]');
  const passedValidation = [];

  required.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, 'Field is required.');
      passedValidation.push(false);
    } else {
      validateLength(input);
      passedValidation.push(validateLength(input));
    }
  });

  return !passedValidation.includes(false);
};

const validateEmail = () => {
  const email = document.querySelector('[type="email"]');
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEx.test(email.value.trim())) {
    return true;
  }

  showError(email, 'Please enter a valid email address');
  return false;
}

const validatePhone = () => {
  const passedValidation = [];
  const phoneInputs = isDesktop ? desktopPhoneInputs : mobilePhoneInput;

  phoneInputs.forEach((input) => {
    const pattern = new RegExp(input.getAttribute('pattern'));

    if (pattern.test(input.value.trim())) {
      passedValidation.push(true);
    } else {
      showError(input, 'Please enter a valid number.')
      passedValidation.push(false);
    }
  });

  return !passedValidation.includes(false);
}

const validateZipCode = () => {
  const zipCode = document.querySelector('[name="zipcode"]');
  const pattern = new RegExp(zipCode.getAttribute('pattern'));

  if (pattern.test(zipCode.value.trim())) {
    return true;
  }

  showError(zipCode, 'Please enter a valid ZipCode.');
  return false;
}

const resetErrors = () => {
  const errorFields = document.querySelectorAll('.input--error');

  errorFields.forEach((field) => {
    field.classList.remove('input--error');
  });
}

const buildPayload = () => {
  const payload = {
    billing: {},
    payment: {}
  };

  const billingInputs = document.querySelectorAll('.checkout-form__billing input, .checkout-form__billing select');
  const paymentInputs = document.querySelectorAll('.checkout-form__payment input');

  billingInputs.forEach((input) => {
    const name = input.getAttribute('name');
    const type = input.getAttribute('type');

    // skip phone number & checkboxes
    if (name.indexOf('phone') < 0 &&  type !== 'checkbox') {
      payload.billing[name] = input.value;
    }

    if (type === 'checkbox') {
      payload.billing[name] = input.checked;
    }
  });

  // add phone manually based on screen
  if (isDesktop) {
    const phoneNumbers = [];
    
    desktopPhoneInputs.forEach((input) => {
      phoneNumbers.push(input.value);
    });

    payload.billing.phone = phoneNumbers.join('');
  } else {
    payload.billing.phone = mobilePhoneInput[0].value.replace(/[^\d]/g, "");
  }

  paymentInputs.forEach((input) => {
    const name = input.getAttribute('name');
    const type = input.getAttribute('type');

    // handle inputs that are not radio inputs
    if (type !== 'radio') {
      payload.payment[name] = input.value;
    }

    // if it is a radio input pick on the checked
    if (type === 'radio' && input.checked) {
      payload.payment[name] = input.value;
    }
  });

  return payload;
};

const handleSubmit = (event) => {
  event.preventDefault();

  const payload = buildPayload();
  const formMessage = document.querySelector('.checkout-form__message');

  console.log(payload);

  resetErrors();
  validateRequired();
  validateEmail();
  validatePhone();
  validateZipCode();

  if (
    validateRequired() &&
    validateEmail() &&
    validatePhone() &&
    validateZipCode()
  ) {
    formMessage.classList.remove('checkout-form__message--error');
    formMessage.classList.add('checkout-form__message--success');
    formMessage.innerHTML = 'The Contract Created/Registered Successfully.';

    // some logic that sends the payload
  } else {
    formMessage.classList.add('checkout-form__message--error');
    formMessage.innerHTML = 'Please check the form for errors.';
  }
};

addPhoneRequired();
addRequiredToLabel();
switchZipCodeType();

// autoTab on desktop phone field
desktopPhoneInputs.forEach((input) => {
  const maxLength = parseInt(input.getAttribute('maxlength'));

  input.addEventListener('keyup', () => {
    // if it's greater than maxlength & there is a next input element
    if (input.value.length >= maxLength && input.nextElementSibling) {
      input.nextElementSibling.focus();
    }
  });
});

form.addEventListener('submit', handleSubmit);

// 2ndpage form
const onSubmit = (values) => window.alert(JSON.stringify(values, undefined, 2));

const drugform = createForm({
  onSubmit,
  validate: (values) => {
    const errors = {};
    if (!values.test1) {
      errors.test1 = "Required";
    }
    if (!values.test2) {
      errors.test2 = "Required";
    }
    return errors;
  },
});
document.getElementById("drugform").addEventListener("submit", (event) => {
  event.preventDefault();
  drugform.submit();
});
function registerField(input) {
  const { name } = input;
  drugform.registerField(
    name,
    (fieldState) => {
      const { blur, change, error, focus, touched, value } = fieldState;
      const errorElement = document.getElementById(name + "_error");
      if (!registered[name]) {
        // first time, register event listeners
        input.addEventListener("blur", () => blur());
        input.addEventListener("input", (event) =>
          change(
            input.type === "checkbox"
              ? event.target.checked
              : event.target.value,
          ),
        );
        input.addEventListener("focus", () => focus());
        registered[name] = true;
      }

      // update value
      if (input.type === "checkbox") {
        input.checked = value;
      } else {
        input.value = value === undefined ? "" : value;
      }

      // show/hide errors
      if (errorElement) {
        if (touched && error) {
          errorElement.innerHTML = error;
          errorElement.style.display = "block";
        } else {
          errorElement.innerHTML = "";
          errorElement.style.display = "none";
        }
      }
    },
    {
      value: true,
      error: true,
      touched: true,
    },
  );
}
[...document.drugform[0]].forEach((input) => {
  if (input.name) {
    registerField(input);
  }
});