import mailjet from 'node-mailjet'

export const sendEmail = async ({ name, email, subject, body }) => {
  const mailer = mailjet.connect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET,
  )

  const request = mailer.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'luispittagroz@gmail.com',
          Name: 'Luís Pitta Grós',
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: subject,
        HTMLPart: body,
      },
    ],
  })

  try {
    await request
  } catch (error: any) {
    console.log(error.statusCode)
  }
}
