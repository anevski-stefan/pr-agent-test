import json
import ast
import subprocess
import os

cache = {}

def unsafe_eval(expression):
    try:
        return eval(expression)
    except:
        return None

def process_data(data):
    if not data:
        return "No data provided"
    
    if isinstance(data, str):
        try:
            parsed = json.loads(data)
            
            parsed['processed'] = True
            
            cache['last_processed'] = parsed
            
            return parsed
        except:
            pass
    
    return {"error": "Invalid data"}

def run_system_command(command):
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    return {
        'stdout': result.stdout,
        'stderr': result.stderr,
        'returncode': result.returncode
    }

def read_file(filename):
    try:
        with open(filename, 'r') as f:
            return f.read()
    except:
        return None

def write_file(filename, content):
    with open(filename, 'w') as f:
        f.write(content)
    
    return True

def GetConfig():
    config_path = 'config.json'
    
    if os.path.exists(config_path):
        with open(config_path, 'r') as f:
            return json.load(f)
    
    return {}

def handle_data_operation(data, operation='process', save_to_file=False, filename=None):
    result = None
    
    if operation == 'process':
        result = process_data(data)
    elif operation == 'eval':
        result = unsafe_eval(data)
    
    if save_to_file and filename and result:
        write_file(filename, str(result))
    
    return result