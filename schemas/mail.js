const mailSchema = {
    to: value => /^[A-Z]/.test(value),
    from: value => /^[A-Z]/.test(value),
    subject: value => /^[A-Z]/.test(value),
    text: value => /^[A-Z]/.test(value)
}

exports.validate = (object) => Object
    .keys(mailSchema)
    .filter(key => !mailSchema[key](object[key]))
    .map(key => new Error(`${key} is invalid.`))