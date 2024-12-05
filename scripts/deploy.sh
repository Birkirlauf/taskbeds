#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Run database migrations
echo "Running database migrations..."
npx prisma db push

# Seed the database if needed
echo "Seeding the database..."
npx prisma db seed

# Start the application
echo "Starting the application..."
npm start 