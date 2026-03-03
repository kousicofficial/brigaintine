import os
import re

dir_path = 'd:/Brigaintine'
pattern = re.compile(r'<!--\s*SVG Divider\s*-->\s*<div class="section-divider divider-hero-bottom">.*?</div>', re.DOTALL)

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        if pattern.search(content):
            new_content = pattern.sub('', content)
            with open(filepath, 'w', encoding='utf-8', errors='ignore') as f:
                f.write(new_content)
            print(f'Removed SVG divider from {filename}')
