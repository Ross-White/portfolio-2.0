import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as amplify from '@aws-cdk/aws-amplify-alpha'

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const role = new iam.Role(this, 'AmplifyDeploymentRole', {
      assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
      description: 'Custom role permitting resources creation from Amplify',
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify')],
    });
    const amplifyPolicy = new iam.Policy(this, 'AmplifyPolicy', {
      statements: [
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'amplify:CreateApp',
            'amplify:UpdateApp',
            'amplify:CreateBackendEnvironment',
            'sts:AssumeRole'
          ],
          resources: ['*']
        })
      ]
    })
    role.attachInlinePolicy(amplifyPolicy)

    const sourceCodeProvider = new amplify.GitHubSourceCodeProvider({
      owner: 'Ross-White',
      repository: 'portfolio-2.0',
      oauthToken: cdk.SecretValue.secretsManager('github-token')
    })

    const amplifyApp = new amplify.App(this, 'Portfolio-2.0', {
      appName: 'Portfolio2.0',
      autoBranchDeletion: true,
      sourceCodeProvider,
      role,
      // buildSpec: cdk.aws_codebuild.BuildSpec.fromObjectToYaml({
      //   version: 1,
      //   frontend: {
      //     phases: {
      //       preBuild: {
      //         commands: ['npm ci'],
      //       },
      //       build: {
      //         commands: ['npm run build'],
      //       },
      //     },
      //     artifacts: {
      //       baseDirectory: 'frontend/.next',
      //       files: ['**/*'],
      //     },
      //     cache: {
      //       paths: ['node_modules/**/*'],
      //     },
      //   },
      // })
    });

    amplifyApp.addBranch('master', {
      stage: 'PRODUCTION',
      autoBuild: true
    });
  }
}
