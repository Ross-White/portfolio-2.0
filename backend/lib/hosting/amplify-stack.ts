import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as amplify from '@aws-cdk/aws-amplify-alpha'

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const role = new iam.Role(this, 'AmplifyRoleWebApp', {
    //   assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
    //   description: 'Custom role permitting resources creation from Amplify',
    //   managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify')],
    // });
    // role.addToPolicy(new iam.PolicyStatement({
    //   actions: ['sts:AssumeRole'],
    //   effect: iam.Effect.ALLOW,
    //   resources: ['*'],
    // }))

    const sourceCodeProvider = new amplify.GitHubSourceCodeProvider({
      owner: 'Ross-White',
      repository: 'portfolio-2.0',
      oauthToken: cdk.SecretValue.secretsManager('github-token')
    })

    const amplifyApp = new amplify.App(this, 'Portfolio-2.0', {
      appName: 'Portfolio2.0',
      sourceCodeProvider
    });

    amplifyApp.addBranch('master', {
      stage: 'prod',
    });
  }
}
