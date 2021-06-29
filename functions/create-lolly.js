const sendQuery = require('./utils/send-query');

const CREATE_LOLLY = `
    mutation(
        $sender: String!,
        $receiver: String!,
        $message: String!,
        $color1: String!,
        $color2: String!,
        $color3: String!,
        $slug: String!,
    ) 
        {
            createLolly(
                data: {
                    sender: $sender,
                    receiver: $receiver,
                    message: $message,
                    color1: $color1,
                    color2: $color2,
                    color3: $color3,
                    slug: $slug,
                }
            )
            {
                sender
                receiver
                message
                color1
                color2
                color3
                slug
            }
        }
`

exports.handler = async event => {
    const { sender, receiver, message, color1, color2, color3, slug } = JSON.parse(event.body);
    const { data, errors } = await sendQuery(CREATE_LOLLY, { sender, receiver, message, color1, color2, color3, slug });
    console.log("data: ", data, "error: ", errors);

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ newLolly: data.createLolly })
    }
}