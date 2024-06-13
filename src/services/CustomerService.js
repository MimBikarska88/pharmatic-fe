const { Customer } = require("../models/Customer");

const MAX_LENGTH_FIRST_NAME = 50;
const MAX_LENGTH_LAST_NAME = 50;
const MAX_LENGTH_SURNAME = 50;
const EMPTY_SURNAME = "Surname is required";
const SURNAME_TOO_LONG = "Surname exceeds 50symbols";
const PHONE_NUMBER_REGEX = /^\+[1-9]{3}[0-9]{6,15}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const EMPTY_FIRST_NAME = "First name is required";
const FIRST_NAME_TOO_LONG = "First name exceeds 50 symbols";
const EMPTY_LAST_NAME = "Last name is required";
const LAST_NAME_TOO_LONG = "Last name exceeds 50 symbols";
const EMPTY_BIRTHDATE = "Birthdate is required";
const FUTURE_BIRTHDATE = "Birth date cannot be future date.";
const UNDERAGE_BIRTHDATE = "Must be at least 18.";
const EMPTY_PHONE_NUMBER = "Phone number is required";
const INVALID_PHONE_NUMBER = "Format is incorrect";
const EMPTY_EMAIL = "Email is required";
const INVALID_EMAIL = "Format is incorrect";
const EMPTY_PASSWORD = "Password is required";

const validateContactFields = (data) => {
  const Errors = {};

  if (!data.firstName) {
    Errors["firstName"] = EMPTY_FIRST_NAME;
  } else if (data.firstName.length > MAX_LENGTH_FIRST_NAME) {
    Errors["firstName"] = FIRST_NAME_TOO_LONG;
  }

  if (!data.lastName) {
    Errors["lastName"] = EMPTY_LAST_NAME;
  } else if (data.lastName.length > MAX_LENGTH_LAST_NAME) {
    Errors["lastName"] = LAST_NAME_TOO_LONG;
  }
  if (!data.surname) {
    Errors["surname"] = EMPTY_SURNAME;
  } else if (data.surname.length > MAX_LENGTH_SURNAME) {
    Errors["surname"] = SURNAME_TOO_LONG;
  }
  if (!data.birthDate) {
    Errors["birthDate"] = EMPTY_BIRTHDATE;
  } else {
    const date = new Date(data.birthDate);
    const currentDate = new Date();
    const minimumYear = currentDate.getFullYear() - 18;

    if (date > currentDate) {
      Errors["birthDate"] = FUTURE_BIRTHDATE;
    } else if (date.getFullYear() > minimumYear) {
      Errors["birthDate"] = UNDERAGE_BIRTHDATE;
    }
  }

  if (!data.phoneNumber) {
    Errors["phoneNumber"] = EMPTY_PHONE_NUMBER;
  } else if (!PHONE_NUMBER_REGEX.test(data.phoneNumber)) {
    Errors["phoneNumber"] = INVALID_PHONE_NUMBER;
  }

  if (!data.email) {
    Errors["email"] = EMPTY_EMAIL;
  } else if (!EMAIL_REGEX.test(data.email)) {
    Errors["email"] = INVALID_EMAIL;
  }
  if (!data.password || !data.confirmPassword) {
    Errors["password"] = EMPTY_PASSWORD;
  }
  return Errors;
};

const EMPTY_DETAILED_ADDRESS = "Detailed address is required";
const EMPTY_COUNTRY = "Country is required";
const EMPTY_CITY = "City is required";
const EMPTY_ZIP_CODE = "Zip code is required";

const validateAddressFields = (data) => {
  const Errors = {};

  if (!data.detailedAddress) {
    Errors["detailedAddress"] = EMPTY_DETAILED_ADDRESS;
  }

  if (!data.country) {
    Errors["country"] = EMPTY_COUNTRY;
  }

  if (!data.city) {
    Errors["city"] = EMPTY_CITY;
  }

  if (!data.postcode) {
    Errors["postcode"] = EMPTY_ZIP_CODE;
  }

  if (!data.detailedAddress) {
    Errors["detailedAddress"] = EMPTY_DETAILED_ADDRESS;
  }

  return Errors;
};

const mapToMovie = (data) => {
  const Customer = new Customer({
    firstName: data.firstName,
    lastName: data.lastName,
    surname: data.surname,
    birthDate: new Date(birthDate),
    phoneNumber: data.phoneNumber,
    // must be encrypted
    password: data.password,
    detailedAddress: data.detailedAddress,
    country: data.country,
    city: data.city,
    postcode: data.postcode,
    street: data.street,
    medicalRecords: data.medicalRecords || [],
    medications: data.medicalRecords || [],
    generalPractitioner: data.generalPractitioner,
    // latestMedicalCheckup: data.latestMedicalCheckup,
    allergicSymptoms: data.allergicSymptoms,
    allergicTriggers: data.allergicSymptoms,
  });
  return Customer;
};
const create = async (data) => {
  await Customer.save(data);
};

module.exports = {
  create,
  validateContactFields,
  validateAddressFields,
};
