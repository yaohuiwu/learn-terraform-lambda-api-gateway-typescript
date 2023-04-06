import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';

export const handler = (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): void => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    let responseMessage = "Hello, World!";
    if (event.queryStringParameters && event.queryStringParameters["Name"]) {
        responseMessage = "Hello," + event.queryStringParameters["Name"];
    }

    callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: responseMessage,
        }),
    });
};