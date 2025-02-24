import { Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { join } from 'path'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

interface LambdaStackProps extends StackProps{
    spacesTable: ITable;
    todosTable: ITable;
}

export class LambdaStack extends Stack {

    public readonly spacesLambdaIntegration: LambdaIntegration;
    public readonly todoLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id:string, props: LambdaStackProps){
        super(scope,id,props);

        //navigate to hello.main by ../../
        const spacesLambda = new NodejsFunction(this, 'SpacesLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..', '..', 'services', 'spaces', 'handler.ts')),
            environment: {
                TABLE_NAME: props.spacesTable.tableName
            }
        });

        const todoLambda = new NodejsFunction(this, 'TodoLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..', '..', 'services', 'todo.ts')),
            environment: {
                TABLE_NAME: props.todosTable.tableName
            }
        });

        this.spacesLambdaIntegration = new LambdaIntegration(spacesLambda);
        this.todoLambdaIntegration = new LambdaIntegration(todoLambda);
    }
}