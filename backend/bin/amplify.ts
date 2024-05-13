#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AmplifyStack } from '../lib/amplify-stack';

const app = new cdk.App();
new AmplifyStack(app, 'BackendStack', {
  description: 'Personal portfolio deployed with Amplify'
});