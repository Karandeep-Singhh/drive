# Environment Configuration

This project uses environment variables to configure the API base URL for different environments.

## Environment Files

- `.env.example` - Template with all required environment variables
- `.env.local` - Local development environment (used by `pnpm dev`)
- `.env.production` - Production environment (used in production builds)

## Setup

1. **For Local Development:**
   - The `.env.local` file is already configured for local development
   - When you run `pnpm dev`, it will use `http://localhost:8080/drive-clone`

2. **For Production:**
   - Update the `.env.production` file with your actual production API URL
   - Replace `https://your-production-api.com/drive-clone` with your real production URL
   - When you run `next start` in production, it will use your production URL

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - The base URL for your API endpoints

## Usage

The HTTP client automatically selects the correct base URL based on the environment:
- Development: Uses `.env.local` or defaults to `http://localhost:8080/drive-clone`
- Production: Uses `.env.production` or your specified production URL
