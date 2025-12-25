#!/bin/bash

# Sync static assets to S3 bucket
# This uploads the entire static/ folder to your S3 bucket

# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

BUCKET="${S3_BUCKET}"
REGION="${S3_REGION}"
STATIC_DIR="./static/blob"

if [ -z "$BUCKET" ] || [ -z "$REGION" ]; then
    echo "❌ Error: S3_BUCKET and S3_REGION must be set in .env file"
    exit 1
fi

echo "🚀 Syncing static assets to S3..."
echo "Bucket: s3://$BUCKET"
echo "Region: $REGION"
echo ""

# Sync files to S3
# --delete: Remove files in S3 that don't exist locally
# --cache-control: Set cache headers for better performance
aws s3 sync "$STATIC_DIR/" "s3://$BUCKET/blob" \
  --region "$REGION" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.DS_Store"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Sync complete!"
    echo "Assets are now available at:"
    echo "https://$BUCKET.s3.$REGION.amazonaws.com/"
else
    echo ""
    echo "❌ Sync failed. Please check your AWS credentials and permissions."
    exit 1
fi
