import { Stack, StackProps} from 'aws-cdk-lib'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration,
    todoLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {

    constructor(scope: Construct, id:string, props: ApiStackProps){
        super(scope,id,props);

        const api = new RestApi(this, 'SpacesApi');
        const spacesResource = api.root.addResource('spaces');
        spacesResource.addMethod('GET', props.spacesLambdaIntegration);
        spacesResource.addMethod('POST', props.spacesLambdaIntegration);

        //create the todo API
        const todoApi = new RestApi(this, 'TodosApi');
        const todosResource = todoApi.root.addResource('todos');
        todosResource.addMethod('GET', props.todoLambdaIntegration);
    }
}