export function validate(schema) {

  return (req, res, next) => {

    try {

      schema.parse(req.body)

      next()

    } catch(error) {

      const errors = error.issues?.map(
        err => err.message
      )

      res.status(400).json({
        errors
      })

    }

  }

}