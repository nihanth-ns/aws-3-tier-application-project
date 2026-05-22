from flask import Flask, render_template_string
import requests

app = Flask(__name__)

HTML_PAGE = """
<!DOCTYPE html>
<html>
<head>
    <title>3 Tier Application</title>
    <style>
        body {
            text-align: center;
            margin-top: 100px;
            font-family: Arial;
        }
        button {
            padding: 12px 25px;
            margin: 10px;
            font-size: 18px;
            cursor: pointer;
        }
        #result {
            margin-top: 30px;
            font-size: 24px;
            color: green;
        }
    </style>
</head>
<body>
    <h1>Frontend Flask Server</h1>
    <button onclick="getMessage(1)">
        Message 1
    </button>
    <button onclick="getMessage(2)">
        Message 2
    </button>
    <div id="result"></div>
    <script>
        async function getMessage(id) {
            const response =
                await fetch(`/message/${id}`);
            const data =
                await response.json();
            document.getElementById("result")
                .innerHTML = data.message;
        }
    </script>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(HTML_PAGE)

@app.route('/message/<id>')
def get_message(id):
    # Replace with your actual Internal ALB DNS name
    backend_url = f"http://internal-backend-alb.amazonaws.com/data/{id}"
    response = requests.get(backend_url)
    return response.text

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000
    )
