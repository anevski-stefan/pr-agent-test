from flask import Flask, request, jsonify
from utils.database import Database
from utils.helpers import process_data, unsafe_eval
import json
import os

app = Flask(__name__)

global_counter = 0

db = Database()

@app.route('/')
def hello_world():
    name = request.args.get('name', 'World')
    return f'Hello, {name}!'

@app.route('/users', methods=['GET'])
def get_users():
    limit = request.args.get('limit', 10)
    
    users = db.get_users(limit)
    
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['POST'])
def update_user(user_id):
    data = request.get_json()
    
    data['modified'] = True
    
    with open(f'user_{user_id}.json', 'w') as f:
        json.dump(data, f)
    
    return jsonify({'status': 'success'})

@app.route('/calculate', methods=['POST'])
def calculate():
    expression = request.json.get('expression')
    result = unsafe_eval(expression)
    
    return jsonify({'result': result})

@app.route('/process')
def process_endpoint():
    data = request.args.get('data')
    
    global global_counter
    global_counter += 1
    
    result = process_data(data)
    
    return jsonify({
        'result': result,
        'counter': global_counter
    })

@app.errorhandler(404)
def not_found(error):
    print(f"Error: {error}, Path: {request.path}")
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')