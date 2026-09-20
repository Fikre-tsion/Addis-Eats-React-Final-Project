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
  } else {
    const phone = values.phone.replace(/[\s-]/g, '');
    const isValidPhone = /^(?:0|\+251)9(?!0{8}$)\d{8}$/.test(phone);

    if (!isValidPhone) {
      errors.phone = 'Use 09xxxxxxxx or +2519xxxxxxxx with exactly 8 following digits.';
    }
  }

  return errors;
}
