# Google Cloud Run Example

This example shows how to deploy a simplified GraphQL API to
[Google Cloud Run](https://cloud.google.com/run).

## Prerequisites

Check out the
[Get started](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service)
guide on Google Cloud to set up the project.

## Deploy

```bash
gcloud run deploy example \
  --source . \
  --project=zentered \
  --region=us-central1 \
  --memory=256Mi \
  --platform=managed \
  --allow-unauthenticated \
  --use-http2 \
  --set-env-vars=VERSION=1.0.0
```

You can set environment variables for the Docker container with
`--set-env-vars`, `VERSION` is used as an example here.

## Next Steps

- Instead of building from source, you can use
  [Cloud Build](https://cloud.google.com/build) for continous deployment from a
  Git respository
- Cloud Build can create and push Docker images to
  [Artifact Registry](https://cloud.google.com/artifact-registry)
