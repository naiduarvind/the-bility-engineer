---
title: "Quick Tip: SecretHub with AWS Lambda (Go) using CDK"
subtitle: ""
date: 2020-10-22T05:11:04.479Z
thumb_img_path: /images/secrethub.png
excerpt: Secrethub -- eliminates the heavyweight provisioning of secrets
  management tool with a seamless developer experience.
template: post
---
![](/images/screenshot-2020-10-23-at-2.01.35-pm.png "SecretHub")

The overhead cost of dealing with provisioning and maintenance of a secrets management tool has always been high -- especially for a platform team. [SecretHub](https://secrethub.io/) reduces the curve for adoption enabling platform teams to setup and manage secrets ultimately providing streamlined developer experience and a peace of mind for the security team.

I cannot say much for the Enterprise version as I have not used it but you can definitely [get more details here](https://secrethub.io/enterprise/) or [talk to the team](https://secrethub.io/enterprise/contact/) behind it. However, for personal projects -- SecretHub has made its way into my arsenal of tools especially after looking at the [vast set of integrations](https://secrethub.io/integrations/).

I have decided to write this post as I am working on a project that uses [Lambda](https://aws.amazon.com/lambda/) which is a [follow through of this document](https://secrethub.io/docs/guides/aws-lambda-go/) with the provisioning steps declared using [AWS CDK](https://aws.amazon.com/cdk/).

**Note**: The CDK described here is developed in TypeScript as [support for Go is unavailable](https://github.com/aws/aws-cdk/issues/547) as of the time of this writing (2020/10/23).

```typescript
...
import * as cdk from '@aws-cdk/core';
import * as kms from '@aws-cdk/aws-kms';
import * as lambda from '@aws-cdk/aws-lambda';
...
    
const lambdaFn = new lambda.Function(this, "LambdaFn", {
  code: lambda.Code.fromAsset('./../packages/hello-world', { exclude: ['*.go', '*.bazel', 'static/**'] }),
  runtime: lambda.Runtime.GO_1_X,
  handler: "main",
  environment: {
    SECRETHUB_IDENTITY_PROVIDER: "aws",
  }
});

const kmsKey = new kms.Key(this, "KMSKey", {
  description: "KMS Key used by Secret Hub for Hello World Lambda",
  removalPolicy: RemovalPolicy.DESTROY,
  trustAccountIdentities: true,
});
kmsKey.addAlias("<APP_NAME>-service-key");
kmsKey.grantEncryptDecrypt(lambdaFn);
```

To have SecretHub working with your Lambda, you will have to [add the environment variable to the Lambda function defined here](https://secrethub.io/docs/guides/aws-lambda-go/#deploy) and [create a KMS key](https://secrethub.io/docs/guides/aws-lambda-go/#create-kms-key) with the [execution role of the Lambda](https://secrethub.io/docs/guides/aws-lambda-go/#create-lambda-executing-role) associated to it. To do so with AWS CDK, the following has to be defined:

1. The required environment variable in the Lambda Function construct in your CDK stack.

   ```typescript
     environment: {
       SECRETHUB_IDENTITY_PROVIDER: "aws",
     }
   ```
2. Creation of a customer managed key using the KMS Key construct in your CDK stack.

   ```typescript
   const kmsKey = new kms.Key(this, "KMSKey", {
     description: "KMS Key used by Secret Hub for Hello World Lambda",
     removalPolicy: RemovalPolicy.DESTROY,
     trustAccountIdentities: true,
   });
   // REPLACE: `<APP_NAME>-service-key` with an appropriate alias. 
   kmsKey.addAlias("<APP_NAME>-service-key");
   ```
3. Associate the auto-generated Lambda execution role to the customer managed KMS key.

```typescript
kmsKey.grantEncryptDecrypt(lambdaFn);
```

In your Go program, simply add the following into your init function which will allow the Lambda function to acquire the KMS key via the execution role and pull the secrets required during execution.

```go
func init() {
	client := secrethub.Must(secrethub.NewClient())
	var err error
    // REPLACE: <NAMESPACE>/<REPO>/username with an appropriate path.
	username, err = client.Secrets().ReadString("<NAMESPACE>/<REPO>/username")
	if err != nil {
		panic(err)
	}
    // REPLACE: <NAMESPACE>/<REPO>/password with an appropriate path
	password, err = client.Secrets().ReadString("<NAMESPACE>/<REPO>/password")
	if err != nil {
		panic(err)
	}
}
```



```
secrethub service aws init <NAMESPACE>/<REPO> --permission read
```