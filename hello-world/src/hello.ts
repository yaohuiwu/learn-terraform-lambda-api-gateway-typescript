import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

function createDdbClient(option: any): DynamoDBClient {
    return new DynamoDBClient(option)
}

function createDDBDocClient(ddbClient: DynamoDBClient):DynamoDBDocumentClient {
    const marshallOptions = {
        // Whether to automatically convert empty strings, blobs, and sets to `null`.
        convertEmptyValues: false, // false, by default.
        // Whether to remove undefined values while marshalling.
        removeUndefinedValues: false, // false, by default.
        // Whether to convert typeof object to map attribute.
        convertClassInstanceToMap: false, // false, by default.
    };
    
    const unmarshallOptions = {
        // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
        wrapNumbers: false, // false, by default.
    };
    
    const translateConfig = { marshallOptions, unmarshallOptions };
    
    // Create the DynamoDB Document client.
    return DynamoDBDocumentClient.from(ddbClient, translateConfig);
}


export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    let responseMessage = "Hello, World!";
    if (event.queryStringParameters && event.queryStringParameters["Name"] && event.queryStringParameters["SongTitle"]) {
        const artist = event.queryStringParameters["Name"];
        const songTitle = event.queryStringParameters["SongTitle"];
        
        const ddbClient = createDdbClient({region: "ap-northeast-2"});
        const ddbDocClient = createDDBDocClient(ddbClient);
        try {
            const data = await ddbDocClient.send(new GetCommand({
                TableName: "Music",
                Key: {
                    "Artist": artist,
                    "SongTitle": songTitle
                }
            }));
            console.log(" Success :", data.Item);
            responseMessage = JSON.stringify(data.Item);
        } catch (err) {
            console.log(" Error", err);
            throw err;
        } finally {
            ddbDocClient.destroy();
            ddbClient.destroy();
        }
    }

    return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: responseMessage
        }),
    };
};