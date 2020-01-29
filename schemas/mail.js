const mailSchema = {
    to: value => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value),
    from: value => /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value),
    subject: value => /^[A-Z]/.test(value),
    text: value => /^[A-Z]/.test(value)
}

exports.validate = (object) => Object
    .keys(mailSchema)
    .filter(key => !mailSchema[key](object[key]))
    .map(key => new Error(`${key} is invalid.`))