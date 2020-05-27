const contactSchema = require('../models/contactSchema');
const axios = require("axios");

exports.contact = (req,res,next) => {
  console.log(req.body.name);
  name = req.body.name;
  email = req.body.email;
  message = req.body.message;

  const contact = new contactSchema({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });
  contact.save()
  .then((result) => {
    console.log(result);
    const obj = {
      subject:  'Contact Mail',
      heading: "Welcome to Medico24/7",
      description: result.message,
      email: email
    };



    let htmlTemplate = `
        <!DOCTYPE html>
          <html>
            <body>
              <h1>${obj.heading}</h1>
              <br>
              <strong><p>User Message: ${obj.description}</p></strong>
              <br>
              <p>EmailId: ${obj.email}</p>
            </body>
          </html>
          `;

      const callMethod = () => {
        axios({
          method: "post",
          url: "https://api.sendgrid.com/v3/mail/send",
          headers: {
            Authorization:
              "Bearer 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"
          },
          data: {
              personalizations: [
                  {
                    to: [
                      {
                        email: "debankurdas2013.dd@gmail.com"
                      }
                    ],
                    subject: `${obj.subject}`
                  }
                ],
                from: {
                  email: "debankurdas2013.dd@gmail.com",
                  name: "Debankur Das"
                },
                content: [{ type: "text/html", value: htmlTemplate }]
              }
            });
          };

      callMethod();
      return res.status(200).json({
        status: 'Success',
        data: result
      })
  })
  .catch((error) => {
    res.status(400).json({
      status: 'Failed',
      message: error
    })
  })
}
