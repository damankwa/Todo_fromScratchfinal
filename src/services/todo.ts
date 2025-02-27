import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';

async function handler(event: APIGatewayProxyEvent, context: Context){
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda, this is the todo:')
    }

    console.log(event);
    return response;
}

export {handler}