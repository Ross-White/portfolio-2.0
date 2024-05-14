#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/hosting/amplify-stack';

const app = new cdk.App();
new AmplifyStack(app, 'BackendStack', {
  description: 'Personal portfolio deployed with Amplify'
});