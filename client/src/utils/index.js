import * as Yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const ContactValidation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Name is not valid!')
    .min(2, 'Name is not valid!')
    .max(20, 'Name is not valid!')
    .required('Name is Required'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is Required'),
});