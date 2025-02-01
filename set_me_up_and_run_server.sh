#!/bin/bash

# Get the script's absolute path
script_path="$(realpath "$0" 2>/dev/null || echo "$(cd "$(dirname "$0")" && pwd)/$(basename "$0")")"

# Get the directory containing the script
script_dir="$(dirname "$script_path")"

# Deactivate any currently active virtual environment
if [[ -n "$VIRTUAL_ENV" ]]; then
    deactivate
fi

# Remove any existing venv directory
rm -rf "$script_dir/venv"

# Create a new Python virtual environment
python3 -m venv "$script_dir/venv"

# Upgrade pip
"$script_dir/venv/bin/pip" install --upgrade pip

# Install dependencies from requirements.txt (if the file exists)
if [[ -f "$script_dir/requirements.txt" ]]; then
    "$script_dir/venv/bin/pip" install -r "$script_dir/requirements.txt"
else
    echo "Warning: No requirements.txt found in $script_dir"
fi

# Activate the virtual environment
source "$script_dir/venv/bin/activate"

echo -e "\n\nVirtual environment successfully created and activated! You are ready to run the FaceMorph server\n\n"

# Prompt the user to run the server
read -p "Do you want to start the FaceMorph server now? (y/n): " run_server

# Convert input to lowercase for better handling
run_server=$(echo "$run_server" | tr '[:upper:]' '[:lower:]')

if [[ "$run_server" == "y" || "$run_server" == "yes" ]]; then
    "cd" "$script_dir/site/"
    echo "Starting FaceMorph server... Please wait for server to be ready, more will appear below when ready..."
    "$script_dir/venv/bin/python" "facemorph_server.py"
else
    echo -e "\n\nYou can start the server later by running:"
    echo "\"$script_dir/venv/bin/python $script_dir/site/facemorph_server.py\""
fi