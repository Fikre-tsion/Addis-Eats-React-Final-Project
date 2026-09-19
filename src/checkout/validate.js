export function validateCheckout(values) {
  const errors = {};

  if (!values.fullName?.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Please use a valid email address.';
  }

  if (!values.address?.trim()) {
    errors.address = 'Street address is required.';
  }

  if (!values.phone?.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Phone number must contain at least 10 digits.';
  }

  return errors;
}
