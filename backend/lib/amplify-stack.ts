import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as amplify from '@aws-cdk/aws-amplify';

export class AmplifyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const amplifyApp = new amplify.App(this, 'AmplifyApp', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'Ross-White',
        repository: 'portfolio-2.0',
        oauthToken: cdk.SecretValue.secretsManager('github-token')
      })
    });

    const amplifyDeploymentRole = new iam.Role(this, 'AmplifyRoleWebApp', {
      assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
      description: 'Custom role permitting resources creation from Amplify',
    });
    amplifyDeploymentRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess'));
  }
}
