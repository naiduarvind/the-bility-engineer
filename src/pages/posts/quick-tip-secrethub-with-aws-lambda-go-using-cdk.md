---
title: "Quick Tip: SecretHub with AWS Lambda (Go) using CDK"
subtitle: Secrethub -- eliminates the heavyweight provisioning of secrets
  management tool and provides a seamless developer experience.
date: 2020-10-22T05:11:04.479Z
thumb_img_path: /images/secrethub.png
template: post
---
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
kmsKey.addAlias("hello-service-key");
kmsKey.grantEncryptDecrypt(lambdaFn);
```

```go
func init() {
	client := secrethub.Must(secrethub.NewClient())
	var err error
	username, err = client.Secrets().ReadString("naiduarvind/helloworld/username")
	if err != nil {
		panic(err)
	}
	password, err = client.Secrets().ReadString("naiduarvind/helloworld/password")
	if err != nil {
		panic(err)
	}
}
```