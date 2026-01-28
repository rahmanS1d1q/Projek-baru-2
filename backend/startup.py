#!/usr/bin/env python3
"""
Startup script to ensure all dependencies are ready before starting the FastAPI app.
"""

import os
import sys
import nltk

def setup_nltk():
    """Setup NLTK data directory and download required resources"""
    
    # Set NLTK data path
    nltk_data_paths = [
        '/opt/render/nltk_data',  # Render.com path
        '/tmp/nltk_data',         # Temporary path
        os.path.expanduser('~/nltk_data')  # User home path
    ]
    
    # Create directories and add to NLTK path
    for path in nltk_data_paths:
        try:
            os.makedirs(path, exist_ok=True)
            if path not in nltk.data.path:
                nltk.data.path.append(path)
        except Exception as e:
            print(f"Could not create/add NLTK path {path}: {e}")
    
    # Download required resources
    resources = ['punkt', 'punkt_tab', 'stopwords']
    
    for resource in resources:
        for data_path in nltk_data_paths:
            try:
                print(f"Attempting to download {resource} to {data_path}")
                nltk.download(resource, download_dir=data_path, quiet=True)
                print(f"✓ Downloaded {resource}")
                break
            except Exception as e:
                print(f"Failed to download {resource} to {data_path}: {e}")
                continue

def main():
    """Main startup function"""
    print("Starting application setup...")
    
    # Setup NLTK
    setup_nltk()
    
    print("Setup completed!")

if __name__ == "__main__":
    main()