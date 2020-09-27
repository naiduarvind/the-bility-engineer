---
title: "Implementation: Bazel as a Build System (WIP)"
date: 2020-08-17T19:42:30.799Z
thumb_img_path: /images/bazel.png
content_img_path: ""
excerpt: Peeking under the covers of Bazel -- the CI system that claims {Cheap,
  Fast} - choose two.
canonical_url: ""
template: post
---
```
project-name
└── packages
    ├──getting-started
    │  ├── main.go
    │  ├── BUILD.bazel
    │  ├── ext
    │  │  ├── counting.go
├──WORKSPACE
├──BUILD.bazel
```

```shell
# General Rules
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
```

```shell
# Go Rules
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "2697f6bc7c529ee5e6a2d9799870b9ec9eaeb3ee7d70ed50b87a2c2c97e13d9e",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.23.8/rules_go-v0.23.8.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.23.8/rules_go-v0.23.8.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains()
```

```shell
# Gazelle Rules
http_archive(
    name = "bazel_gazelle",
    sha256 = "cdb02a887a7187ea4d5a27452311a75ed8637379a1287d8eeb952138ea485f7d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.21.1/bazel-gazelle-v0.21.1.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.21.1/bazel-gazelle-v0.21.1.tar.gz",
    ],
)

load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

gazelle_dependencies()
```

```shell
# Docker Rules
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "4521794f0fba2e20f3bf15846ab5e01d5332e587e9ce81629c7f96c793bb7036",
    strip_prefix = "rules_docker-0.14.4",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.14.4/rules_docker-v0.14.4.tar.gz"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

load("@io_bazel_rules_docker//repositories:pip_repositories.bzl", "pip_deps")

pip_deps()

load(
    "@io_bazel_rules_docker//container:container.bzl",
    "container_pull",
)

container_pull(
    name = "alpine_linux_amd64",
    registry = "index.docker.io",
    repository = "library/alpine",
    tag = "3.8",
)
```

```shell
# General Rules
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Go Rules
http_archive(
    name = "io_bazel_rules_go",
    sha256 = "2697f6bc7c529ee5e6a2d9799870b9ec9eaeb3ee7d70ed50b87a2c2c97e13d9e",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.23.8/rules_go-v0.23.8.tar.gz",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.23.8/rules_go-v0.23.8.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_rules_dependencies", "go_register_toolchains")

go_rules_dependencies()

go_register_toolchains()

# Gazelle
http_archive(
    name = "bazel_gazelle",
    sha256 = "cdb02a887a7187ea4d5a27452311a75ed8637379a1287d8eeb952138ea485f7d",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.21.1/bazel-gazelle-v0.21.1.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.21.1/bazel-gazelle-v0.21.1.tar.gz",
    ],
)

load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

gazelle_dependencies()

# Docker
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "4521794f0fba2e20f3bf15846ab5e01d5332e587e9ce81629c7f96c793bb7036",
    strip_prefix = "rules_docker-0.14.4",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.14.4/rules_docker-v0.14.4.tar.gz"],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

load("@io_bazel_rules_docker//repositories:pip_repositories.bzl", "pip_deps")

pip_deps()

load(
    "@io_bazel_rules_docker//container:container.bzl",
    "container_pull",
)

container_pull(
    name = "alpine_linux_amd64",
    registry = "index.docker.io",
    repository = "library/alpine",
    tag = "3.8",
)
```

```shell
load("@bazel_gazelle//:def.bzl", "gazelle")

# gazelle:prefix github.com/$USERNAME/$REPOSITORY
gazelle(name = "gazelle")

```

1. What am I really trying to say?

   The steep learning curve of Bazel comes into integrating Bazel and not getting started with it. How to easily get started with using Bazel for small to mid-sized projects. Getting Bazel ready for use in CI -- which is to be decided and shown how in another post.
2. Why should people care?

   To understand where and how Bazel shines and falls short. How easy is it to get started with Bazel and get going to produce necessary artifacts similar to industry usage (e.g. binary, docker image, etc)
3. What is the most important point?

   How to get started with Bazel, the key criterion on why one would use Bazel in a project / organization.
4. What is the easiest way to understand the most important point?

   Showcasing it with a project and drilled down explanation on each step to acquire the desired outcome whilst referencing to up to date components and their usages in the case this articles becomes outdated.
5. How do I want the reader to feel?

   Easy to follow through, full understanding on the fundamentals of Bazel and each component which is needed to perform what is required and exposure to what would ideally be the next steps of consideration of adoption.
6. What should the reader do next?

   Try out Bazel and get started with it in about 5-10 minutes in a new project and possibly reach out to me on potential use cases in production and other aspects that I have missed out.