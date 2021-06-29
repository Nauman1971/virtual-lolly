const sendQuery = require('./utils/send-query');

const GETBY_SLUG = `
    query MyQuery($slug: String!){
        getBySlug(slug: $slug) {
            color1
            color2
            color3
            receiver
            message
            sender
            slug
        }
    }
`

exports.handler = async event => {
    const { slug } = JSON.parse(event.body);
    const { data, errors } = await sendQuery(GETBY_SLUG, { slug });
    console.log("data: ", data, "Errors", errors)
    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors)
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ newLolly: data.getBySlug })
    }
}