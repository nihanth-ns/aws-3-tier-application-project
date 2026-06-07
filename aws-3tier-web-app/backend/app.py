from flask import Flask, jsonify
import pymysql

app = Flask(__name__)

# Replace these with your actual RDS credentials
# In production, use AWS Secrets Manager or environment variables
DB_HOST = "RDS_db_mysql_endpoint_url"
DB_USER = "admin"
DB_PASSWORD = "password"
DB_NAME = "mydb"

@app.route('/')
def home():
    return "Backend Running"

@app.route('/health')
def health():
    return "healthy", 200

@app.route('/data/<id>')
def get_data(id):
    connection = pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    cursor = connection.cursor()
    query = "SELECT message FROM messages WHERE id=%s"
    cursor.execute(query, (id,))
    result = cursor.fetchone()
    connection.close()

    if result:
        return jsonify({
            "message": result[0]
        })
    return jsonify({
        "message": "No message found"
    })

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000
    )
