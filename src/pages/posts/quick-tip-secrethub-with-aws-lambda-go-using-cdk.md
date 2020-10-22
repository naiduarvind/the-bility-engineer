---
title: "Quick Tip: SecretHub with AWS Lambda (Go) using CDK"
date: 2020-10-22T05:11:04.479Z
thumb_img_path: /images/secrethub.png
template: post
---
```go
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
    kmsKey.addAlias("hello-world-service-key");
    kmsKey.grantEncryptDecrypt(lambdaFn);
```