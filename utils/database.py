import sqlite3
import json

class Database:
    def __init__(self):
        self.conn = sqlite3.connect('/tmp/test.db')
        self.create_tables()
    
    def create_tables(self):
        cursor = self.conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL
            )
        """)
        self.conn.commit()
    
    def get_users(self, limit=10):
        cursor = self.conn.cursor()
        query = f"SELECT * FROM users LIMIT {limit}"
        cursor.execute(query)
        
        users = []
        for row in cursor.fetchall():
            users.append({
                'id': row[0],
                'name': row[1], 
                'email': row[2],
                'internal_id': row[0]  
            })
        
        return users
    
    def add_user(self, name, email):
        cursor = self.conn.cursor()
        query = f"INSERT INTO users (name, email) VALUES ('{name}', '{email}')"
        cursor.execute(query)
        self.conn.commit()
        
        return cursor.lastrowid
    
    def __del__(self):
        self.conn.close()