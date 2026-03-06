# Vercel Operations & Debugging Guide

This document outlines the essential commands for managing and debugging Vercel deployments directly from the command line.

## Prerequisites
Ensure you are logged in to the Vercel CLI:
```bash
npx vercel login
```

## 1. Check Deployment Status
List all recent deployments to see their status (Ready, Error, Building) and get their unique URLs.

```bash
npx vercel list
```
**Output Example:**
```
  Age     Project             Deployment                                    Status      Environment
  20m     academy.dodave      https://academydodave-xyz.vercel.app          ● Ready     Production
  25m     academy.dodave      https://academydodave-abc.vercel.app          ● Error     Production
```

## 2. Inspect Deployment Details
Get detailed information about a specific deployment, including build ID, commit info, and configuration.

```bash
npx vercel inspect <deployment-url>
```
**Example:**
```bash
npx vercel inspect https://academydodave-ogaik0mch-his-majesty-king-davids-projects.vercel.app
```

## 3. View Build Logs
Retrieve runtime or build logs for a specific deployment. Note that for free tier accounts, historical log access via CLI may be limited.

```bash
# View recent logs
npx vercel logs <deployment-url>

# Follow logs in real-time (for running builds)
npx vercel logs <deployment-url> --follow
```

## 4. Local Build Verification
Before pushing, you can simulate a Vercel build locally to catch errors early.

```bash
npx vercel build
```

## 5. Deploy to Production
Manually trigger a production deployment from your local machine.

```bash
npx vercel --prod
```
