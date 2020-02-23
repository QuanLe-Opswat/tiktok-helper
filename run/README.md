## Checkout at:
https://cloud.google.com/run/docs/quickstarts/build-and-deploy

## gcloud init:
gcloud init

## Install the gcloud beta component:
gcloud components install beta

gcloud components update

## gcloud submit:
gcloud builds submit --tag gcr.io/nextmedia-home/tiktok

## Deploying to Cloud Run:
gcloud run deploy tiktok --image gcr.io/nextmedia-home/tiktok --platform managed --allow-unauthenticated

// Set region default:
gcloud config set run/region asia-east1
