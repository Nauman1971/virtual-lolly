const sendQuery = require("./utils/send-query")

const GET_ALL = `
    {   
        lollies {
            data {
                color1
                color2
                color3
                message
                receiver
                sender
                slug
            }
        }
    }
`

exports.handler = async () => {
    const { data, errors } = await sendQuery(GET_ALL);

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ lollies: data.lollies })
    }
}