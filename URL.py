# Import necessary module
import re

# Define the path to your file
file_path = '/Users/paxton/Desktop/AWS爬蟲/SaaContentLinks.txt'

# Function to read the file and extract URLs
def extract_urls(file_path):
    urls = []
    with open(file_path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            if 'URL:' in line:
                url = line.split('URL:')[1].strip()
                full_url = f"https://www.examtopics.com{url}"
                urls.append(full_url)
    return urls

# Function to format the URLs into JavaScript array format
def format_urls_as_js_array(urls):
    formatted_urls = ',\n    '.join([f'"{url}"' for url in urls])
    js_array = f"const targetUrl = [\n    {formatted_urls}\n];"
    return js_array

# Extract URLs from the file
urls = extract_urls(file_path)

# Format URLs into JavaScript array
js_array = format_urls_as_js_array(urls)

# Print the JavaScript array
print(js_array)

# Optionally, save the output to a new file
output_file_path = '/Users/paxton/Desktop/AWS爬蟲'
with open(output_file_path, 'w') as output_file:
    output_file.write(js_array)

print(f"Formatted URLs have been saved to {output_file_path}")
