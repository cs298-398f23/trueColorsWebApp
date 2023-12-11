from flask import Flask, jsonify, request, render_template, session
import dotenv
import os
import uuid
import mysql.connector

def create_app():

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
        '''
        Returns the questions from the database.
        '''
        cursor, connection = connectToMySQL()
        use_db = "USE test_db;"
        select = ""

        if request.args.get('group') == "1":
            select = "SELECT * FROM q_group_1;"
            
        elif request.args.get('group') == "2":
            select = "SELECT * FROM q_group_2;"
        
        elif request.args.get('group') == "3":
            select = "SELECT * FROM q_group_3;"
            
        elif request.args.get('group') == "4":
            select = "SELECT * FROM q_group_4;"
            
        else:
            select = "SELECT * FROM q_group_5;"
            
        cursor.execute(use_db)
        cursor.execute(select)
        
        questions = cursor.fetchall()
    
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
    
    return app

def connectToMySQL():
    '''
    Connects to MySQL and returns a cursor and connection object.
    '''
    cnx = mysql.connector.connect(user='admin', password='truecolors',
                                  host='34.228.224.243',
                                  database='test_db')
    cursor = cnx.cursor()
    return cursor, cnx

if __name__ == '__main__':
    dotenv.load_dotenv()
    if not os.getenv('FLASK_SECRET_KEY'):
        print('Please set FLASK_SECRET_KEY in .env file')
        exit(1)

    app = create_app()
    app.run(debug=True, port=8000, host="0.0.0.0")
