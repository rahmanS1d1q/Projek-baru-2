#!/bin/bash

# Build script for Render.com deployment

echo "Starting build process for Render.com..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create NLTK data directory
echo "Setting up NLTK data directory..."
mkdir -p /opt/render/nltk_data

# Download NLTK data
echo "Downloading NLTK data..."
python download_nltk_data.py

echo "Build completed successfully for Render.com!"