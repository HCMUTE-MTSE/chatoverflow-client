const profile = {
  // Page title and headers
  title: 'Edit Profile',
  pageDescription: 'Update your personal information and preferences',

  // Section headers
  basicInfo: 'Basic Information',
  personalInfo: 'Personal Information',
  addressInfo: 'Address Information',

  // Form labels
  labels: {
    fullName: 'Full Name',
    nickname: 'Nickname',
    email: 'Email',
    bio: 'Bio',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    province: 'Province/City',
    ward: 'District/Ward',
    street: 'Detailed Address',
  },

  // Form placeholders
  placeholders: {
    fullName: 'Enter your full name',
    nickname: 'Enter your preferred nickname',
    email: 'example@email.com',
    bio: 'Tell us about yourself...',
    dateOfBirth: 'Select your date of birth',
    gender: 'Select gender',
    province: 'Select province/city',
    ward: 'Select district/ward',
    street: 'Enter house number, street name, area...',
  },

  // Form hints
  hints: {
    fullName: 'Enter your full legal name.',
    nickname: 'Enter your preferred display name.',
    email: '🔒 Email cannot be changed after account creation.',
    bio: 'Write a brief description about yourself, your expertise, and interests.',
    dateOfBirth: 'Select your date of birth.',
    gender: 'Select your gender.',
    province: 'Select the province or city where you live.',
    ward: 'Select district, ward or commune.',
    street:
      'Enter house number, street name and other detailed address information.',
  },

  // Gender options
  genderOptions: {
    male: 'Male',
    female: 'Female',
    other: 'Other',
    preferNotToSay: 'Prefer not to say',
  },

  // Loading states
  loading: {
    userInfo: 'Loading user information...',
    provinces: 'Loading...',
    wards: 'Loading...',
    saving: '🔄 Saving...',
  },

  // Button text
  buttons: {
    save: '💾 Save Information',
    saving: '🔄 Saving...',
  },

  // Success and error messages
  messages: {
    success: 'Profile updated successfully!',
    errorLoadingUser: 'Unable to load user information',
    errorLoadingProvinces: 'Error loading provinces',
    errorLoadingWards: 'Error loading wards',
    errorLoadingWardsForUser: 'Error loading wards for user data',
    errorUpdating: 'An error occurred while updating',
    updateFailed: 'Update failed',
    requiredFields: 'Please fill in all required fields',
    invalidEmail: 'Please enter a valid email address',
    invalidDate: 'Please select a valid date',
  },

  // Form validation
  validation: {
    required: 'This field is required',
    emailFormat: 'Please enter a valid email address',
    dateFormat: 'Please select a valid date',
    minLength: 'Must be at least {min} characters',
    maxLength: 'Must be no more than {max} characters',
  },

  // Accessibility
  accessibility: {
    fullNameInput: 'Enter your full legal name',
    nicknameInput: 'Enter your preferred display name',
    emailInput: 'Email address (cannot be changed)',
    dateInput: 'Select your date of birth',
    genderSelect: 'Select your gender',
    provinceSelect: 'Select your province or city',
    wardSelect: 'Select your district or ward',
    streetTextarea: 'Enter detailed address information',
    saveButton: 'Save profile changes',
    lockIcon: 'Field is locked and cannot be edited',
  },

  // Address loading states
  addressLoading: {
    loadingProvinces: 'Loading provinces...',
    loadingWards: 'Loading wards...',
    selectProvince: 'Select province/city',
    selectWard: 'Select district/ward',
  },
};

export default profile;
