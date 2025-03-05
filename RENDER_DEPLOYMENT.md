# Deploying to Render

This guide explains how to deploy "The Way Forward" application to Render using Docker.

## Prerequisites

- A Render account (https://render.com)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

1. **Connect your repository to Render**:

   - Log in to your Render dashboard
   - Click "New" and select "Blueprint" (to use the render.yaml configuration)
   - Connect your Git repository
   - Select the repository containing your application

2. **Configure your service**:

   - Render will automatically detect the `render.yaml` file
   - Review the configuration and make any necessary adjustments
   - Click "Apply"

3. **Environment Variables**:

   - Add any additional environment variables needed for your application
   - These can be added through the Render dashboard or in the `render.yaml` file

4. **Database Configuration (if needed)**:
   - If your application uses a database, you'll need to create a database service on Render
   - Update your environment variables to include the database connection details

## How It Works

The deployment uses Docker Compose to build and run both the frontend and backend services:

- **Frontend**: React/TypeScript application served by Nginx
- **Backend**: FastAPI Python application
- **Nginx Configuration**: Routes API requests to the backend and serves the frontend for all other requests

## Troubleshooting

- **Build Failures**: Check the build logs in the Render dashboard
- **Runtime Errors**: Check the service logs in the Render dashboard
- **Networking Issues**: Ensure your services are properly configured to communicate with each other

## Scaling

To scale your application:

- Increase the `numInstances` in your `render.yaml` file
- Upgrade to a higher plan in the Render dashboard

## Monitoring

Render provides basic monitoring for your services. For more advanced monitoring, consider integrating with a third-party monitoring service.
