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

    public readonly helloLambdaIntegration: LambdaIntegration;
    public readonly todoLambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id:string, props: LambdaStackProps){
        super(scope,id,props);

        //navigate to hello.main by ../../
        const helloLambda = new NodejsFunction(this, 'HelloLambda', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..', '..', 'services', 'hello.ts')),
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

        this.helloLambdaIntegration = new LambdaIntegration(helloLambda);
        this.todoLambdaIntegration = new LambdaIntegration(todoLambda);
    }
}