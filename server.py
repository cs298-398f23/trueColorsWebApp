from flask import Flask, jsonify, request, render_template, session
import dotenv
import os
import uuid
import mysql.connector

dotenv.load_dotenv()
if not os.getenv('FLASK_SECRET_KEY'):
    print('Please set FLASK_SECRET_KEY in .env file.')
    exit(1)

app = Flask(__name__)
app.secret_key = 'secret'

@app.route('/')
def index():
    return render_template("index.html")
    
def getId():
    if 'uuid' not in session:
        id = str(uuid.uuid4())
        session['uuid'] = id
    else:
        id = session['uuid']
    return id
    
@app.route('/getQuestions')
def get_questions():
    MYSQL_DB = os.getenv('MYSQL_DB')
    '''
    Returns the questions from the database.
    '''
    cursor, connection = connectToMySQL()
    use_db = f"USE {MYSQL_DB};"
    select = ""

    if request.args.get('group') == "1":
        select = "SELECT * FROM ordered_questions WHERE question_num = 1;"
            
    elif request.args.get('group') == "2":
        select = "SELECT * FROM ordered_questions WHERE question_num = 2;"
        
    elif request.args.get('group') == "3":
        select = "SELECT * FROM ordered_questions WHERE question_num = 3;"
            
    elif request.args.get('group') == "4":
        select = "SELECT * FROM ordered_questions WHERE question_num = 4;"
            
    else:
        select = "SELECT * FROM ordered_questions WHERE question_num = 5;"
            
    cursor.execute(use_db)
    cursor.execute(select)
        
    questions = cursor.fetchall()
    print(jsonify(questions))
    
    cursor.close()
    connection.close()

    return jsonify(questions)
    
@app.route('/storeResult/<result>', methods=['POST'])
def store_result(result):
    '''
    Stores the user's color result in the database.
    '''
    id = getId()
    valid_colors = ["ORANGE", "GOLD", "BLUE", "GREEN"]

    if result in valid_colors:
        cursor, connection = connectToMySQL()

        # MySQL queries
        use_db = "USE test_db;"
        select = "SELECT * FROM user_colors WHERE user_id = %s;"

        update = "UPDATE user_colors SET result_color = %s WHERE user_id = %s;"
        insert = "INSERT INTO user_colors (user_id, result_color) VALUES (%s, %s);"

        cursor.execute(use_db)
        cursor.execute(select, (id,))
        existing_user = cursor.fetchone() # Check if user already exists

        # If user already exists, update result_color
        if existing_user:
            cursor.execute(update, (result, id))

        # If user doesn't exist, insert new result_color
        else:
            cursor.execute(insert, (id, result))

        connection.commit()
        cursor.close()
        connection.close()

        return "Color updated successfully.", 200
        
    else:
        return "Color not updated. Result does not exist.", 400
    
    

@app.route('/fetch_data')
def fetch_data():
    '''
    Fetches data from the database and returns it as JSON.
    '''
    cursor, connection = connectToMySQL()
    select = "SELECT result_color, COUNT(*) AS count FROM user_colors GROUP BY result_color"
    cursor.execute(select)
    data = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(data)

def connectToMySQL():
    '''
    Connects to MySQL and returns a cursor and connection object.
    '''
    MYSQL_USERNAME = os.getenv('MYSQL_USERNAME')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_DB = os.getenv('MYSQL_DB')

    cnx = mysql.connector.connect(user=MYSQL_USERNAME, password=MYSQL_PASSWORD,
                                  host=MYSQL_HOST,
                                  database=MYSQL_DB)
    #Tried with user = root, password = password, host = most recent AWS ip
    cursor = cnx.cursor()
    return cursor, cnx

if __name__ == '__main__':
    app.run(debug=True, port=8000, host="0.0.0.0")
