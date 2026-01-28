#!/usr/bin/env python3
"""
Script to download required NLTK data for Render.com deployment.
"""

import nltk
import os

def download_nltk_data():
    """Download all required NLTK data for Render.com"""
    
    # Set NLTK data path for Render.com
    nltk_data_dir = '/opt/render/nltk_data'
    
    # Fallback paths if the primary doesn't work
    fallback_paths = [
        '/tmp/nltk_data',
        os.path.expanduser('~/nltk_data')
    ]
    
    # Try to create the primary directory
    try:
        os.makedirs(nltk_data_dir, exist_ok=True)
        print(f"Created NLTK data directory: {nltk_data_dir}")
    except Exception as e:
        print(f"Could not create primary directory {nltk_data_dir}: {e}")
        # Try fallback paths
        for path in fallback_paths:
            try:
                os.makedirs(path, exist_ok=True)
                nltk_data_dir = path
                print(f"Using fallback directory: {nltk_data_dir}")
                break
            except Exception as e2:
                print(f"Could not create fallback directory {path}: {e2}")
                continue
    
    # Add to NLTK path
    if nltk_data_dir not in nltk.data.path:
        nltk.data.path.append(nltk_data_dir)
    
    # List of required NLTK resources
    resources = [
        'punkt',
        'punkt_tab', 
        'stopwords'
    ]
    
    print("Downloading NLTK resources for Render.com...")
    
    for resource in resources:
        try:
            print(f"Downloading {resource}...")
            nltk.download(resource, download_dir=nltk_data_dir, quiet=False)
            print(f"✓ {resource} downloaded successfully")
        except Exception as e:
            print(f"✗ Failed to download {resource}: {e}")
            # Try without specifying download_dir
            try:
                print(f"Retrying {resource} without specific directory...")
                nltk.download(resource, quiet=False)
                print(f"✓ {resource} downloaded successfully (default location)")
            except Exception as e2:
                print(f"✗ Failed to download {resource} (retry): {e2}")
    
    print("NLTK data download completed for Render.com!")
    
    # Verify downloads
    print("\nVerifying downloads...")
    for resource in resources:
        try:
            if resource == 'punkt':
                nltk.data.find('tokenizers/punkt')
            elif resource == 'punkt_tab':
                nltk.data.find('tokenizers/punkt_tab')
            elif resource == 'stopwords':
                nltk.data.find('corpora/stopwords')
            print(f"✓ {resource} verified")
        except Exception as e:
            print(f"✗ {resource} not found: {e}")

if __name__ == "__main__":
    download_nltk_data()