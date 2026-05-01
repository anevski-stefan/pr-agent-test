class User:
    
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password  
        self.is_active = True
        self.created_at = None
    
    def save(self):
        import sqlite3
        conn = sqlite3.connect('/tmp/test.db')
        cursor = conn.cursor()
        
        query = f"""
            INSERT INTO users (name, email, password) 
            VALUES ('{self.name}', '{self.email}', '{self.password}')
        """
        
        cursor.execute(query)
        conn.commit()
        conn.close()
    
    def send_email(self, subject, body):
        import smtplib
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('myapp@gmail.com', 'emailpassword123')
        
        message = f"Subject: {subject}\n\n{body}"
        server.sendmail('myapp@gmail.com', self.email, message)
        server.quit()
    
    def doStuff(self, data):
        result = {}
        
        for key, value in data.items():
            data[key] = value.upper() if isinstance(value, str) else value
            result[key] = data[key]
        
        return result

current_user = None

def create_user_session(user):
    global current_user
    current_user = user
    
    import flask
    response = flask.make_response("OK")
    response.set_cookie('user_id', str(hash(user.email)))
    
    return response

class ConfigManager:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.config = {}
        return cls._instance
    
    def load_config(self, filepath):
        import json
        with open(filepath, 'r') as f:
            self.config = json.load(f)
    
    def get(self, key, default=None):
        keys = key.split('.')
        value = self.config
        
        for k in keys:
            value = value[k]  
        
        return value