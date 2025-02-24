import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import { v4 } from 'uuid'

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>{

    let message: string;
    switch(event.httpMethod){
        case 'GET':
            message = 'Hello from GET';
            break;
        case 'POST':
            message = 'Hello from POST';
            break;
        default:
            break;
    }
    
    const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(message + ' ' + v4())
    }

    console.log(event);
    return response;
}

export {handler}