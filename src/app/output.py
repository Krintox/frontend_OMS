import os

# Define the allowed extensions and target directories
allowed_extensions = {'.tsx', '.ts', '.js', '.jsx', '.html', '.css'}
target_dirs = {'app', 'components', 'lib', 'public','context','hooks','interfaces','pages','services','styles','utils'}
excluded_dirs = {'.next', 'node_modules'}
output_file = 'output.txt'

# Function to log files from the target directories
def log_files(parent_dir):
    with open(output_file, 'w', encoding='utf-8') as f:  # Explicitly specify encoding='utf-8'
        for root, dirs, files in os.walk(parent_dir):
            # Skip the excluded directories
            dirs[:] = [d for d in dirs if d not in excluded_dirs]
            
            # Check if the current folder is one of the target directories
            if any(target_dir in root for target_dir in target_dirs):
                for file in files:
                    # Check the file extension
                    if any(file.endswith(ext) for ext in allowed_extensions):
                        file_path = os.path.join(root, file)
                        f.write(f'File: {file_path}\n')
                        # Read and write the content of the file
                        try:
                            with open(file_path, 'r', encoding='utf-8', errors='ignore') as file_content:
                                f.write(file_content.read())
                        except UnicodeDecodeError:
                            f.write(f'Error reading file {file_path}\n')
                        f.write('\n\n')

# Call the function with the parent directory path
parent_directory = 'E:/Bunny/Spring_boot/todo/frontend/src/app'  # Replace with the path to your parent directory if necessary
log_files(parent_directory)
