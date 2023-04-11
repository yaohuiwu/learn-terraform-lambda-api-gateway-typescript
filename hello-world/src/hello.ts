import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    let responseMessage = "Hello, World!";
    if (event.queryStringParameters && event.queryStringParameters["Name"]) {
        responseMessage = "Hello," + event.queryStringParameters["Name"];
    }

    return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: responseMessage,
        }),
    };
};