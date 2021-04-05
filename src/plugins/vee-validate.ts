import { extend, setInteractionMode } from 'vee-validate';
import { between, email, min, required } from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('email', {
    ...email,
    message: 'This email is invalid',
})

// Override the default message.
extend('required', {
    ...required,
    message: (fieldName, placeholders) => `The ${fieldName} field is required`,
})

extend('min', {
    ...min,
    message: (fieldName, placeholders) =>
        `The ${fieldName} field must have at least ${placeholders.length} characters`,
})

extend('between', {
    ...between,
    message: (fieldName, placeholders) =>
        `The ${fieldName} field must be between ${placeholders.min} and ${placeholders.max}`,
})