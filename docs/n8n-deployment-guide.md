# n8n Automation Hub Deployment Guide

## Overview

This guide will help you deploy the n8n automation hub for The Vibe Launch platform. n8n will handle all automation workflows including content syndication, student onboarding, and social media posting.

## Prerequisites

- VPS with Docker and Docker Compose installed (DigitalOcean, AWS, etc.)
- Domain configured: `n8n.thevibelaunch.ai`
- SSL certificate (we'll use Caddy for automatic HTTPS)

## Deployment Steps

### 1. Initial Server Setup

```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Create n8n directory
mkdir -p /opt/thevibelaunch-n8n
cd /opt/thevibelaunch-n8n
```

### 2. Configure Environment Variables

Create `.env` file:

```bash
# n8n Configuration
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your-secure-password
N8N_HOST=n8n.thevibelaunch.ai
N8N_ENCRYPTION_KEY=your-32-char-encryption-key

# Database Configuration
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=your-db-password

# API Keys for Integrations
STRIPE_SECRET_KEY=your-stripe-key
CONVERTKIT_API_KEY=your-convertkit-key
TWITTER_API_KEY=your-twitter-key
TWITTER_API_SECRET=your-twitter-secret
LINKEDIN_CLIENT_ID=your-linkedin-id
LINKEDIN_CLIENT_SECRET=your-linkedin-secret
```

### 3. Deploy with Caddy for HTTPS

Create `docker-compose.yml` that includes Caddy:

```yaml
version: '3.8'

services:
  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - n8n-network

  # ... (n8n and other services from docker-compose.n8n.yml)
```

Create `Caddyfile`:

```
n8n.thevibelaunch.ai {
    reverse_proxy n8n:5678
}
```

### 4. Start the Services

```bash
# Copy the docker-compose files to your server
# Then start the services
docker-compose up -d

# Check logs
docker-compose logs -f n8n
```

### 5. Initial n8n Setup

1. Visit `https://n8n.thevibelaunch.ai`
2. Login with your basic auth credentials
3. Create your n8n account
4. Import the workflow templates from `/n8n/workflows/`

## Security Considerations

1. **Firewall Rules**
   ```bash
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw allow 22/tcp
   ufw enable
   ```

2. **Backup Strategy**
   - Daily backups of PostgreSQL database
   - Weekly backups of n8n workflows
   - Store backups off-site (S3, etc.)

3. **Monitoring**
   - Set up Uptime monitoring
   - Configure alerts for failed workflows
   - Monitor server resources

## Workflow Templates

The following workflows are included in `/n8n/workflows/`:

1. **Content Syndication** - Auto-post blog content to social media
2. **Student Onboarding** - Process new enrollments
3. **Email Automation** - Trigger ConvertKit sequences
4. **Payment Processing** - Handle Stripe webhooks
5. **Community Integration** - Sync with Skool platform

## Troubleshooting

### Common Issues

1. **n8n not accessible**
   - Check Caddy logs: `docker-compose logs caddy`
   - Verify DNS points to server
   - Check firewall rules

2. **Workflows failing**
   - Check n8n execution logs
   - Verify API credentials
   - Test webhook endpoints

3. **Database connection issues**
   - Check PostgreSQL is running
   - Verify connection string
   - Check network connectivity

## Maintenance

### Regular Tasks

- Weekly: Review failed executions
- Monthly: Update n8n to latest version
- Quarterly: Review and optimize workflows

### Updating n8n

```bash
cd /opt/thevibelaunch-n8n
docker-compose pull
docker-compose up -d
```

## Support

For issues specific to The Vibe Launch workflows, check:
- Workflow documentation in `/docs/n8n-workflows/`
- API endpoint documentation in `/docs/api/`
- Contact support@thevibelaunch.ai