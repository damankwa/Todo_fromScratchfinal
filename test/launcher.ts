import { handler } from "../src/services/spaces/handler";

//process.env.AWS_REGION = "ca-central-1";
//process.env.TABLE_NAME = "SpaceTable-0ea62545d61f"

handler({
    httpMethod: 'POST',
    body: JSON.stringify({
        location: 'Tokyo'
    })
} as any, {} as any);