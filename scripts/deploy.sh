#!/usr/bin/env bash
# Deploy jessetree to Cloud Run in europe-west1.
# Defaults to data source = overlay (overlay.peck.to; no GCP DB access required).
# There is no Cloud Build trigger: merging to main does NOT deploy. Run this
# script from an up-to-date main after merge, then check https://jessetree.xyz.
set -euo pipefail

PROJECT="${GCP_PROJECT:-gen-lang-client-0447933194}"
REGION="${GCP_REGION:-europe-west1}"
SERVICE="${SERVICE:-jessetree}"
DATA_SOURCE="${JESSETREE_DATA_SOURCE:-overlay}"
PECK_READER_URL="${PECK_READER_URL:-https://overlay.peck.to}"

echo "Deploying ${SERVICE} to ${PROJECT} / ${REGION}"
echo "  data source: ${DATA_SOURCE}"

gcloud run deploy "${SERVICE}" \
  --project "${PROJECT}" \
  --region "${REGION}" \
  --source . \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "JESSETREE_DATA_SOURCE=${DATA_SOURCE},PECK_READER_URL=${PECK_READER_URL},PUBLIC_SITE_URL=https://jessetree.xyz"

echo ""
echo "After first deploy, map the domain:"
echo "  gcloud beta run domain-mappings create \\"
echo "    --service=${SERVICE} --domain=jessetree.xyz --region=${REGION} --project=${PROJECT}"
