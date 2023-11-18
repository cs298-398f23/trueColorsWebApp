from flask import Flask, jsonify, request, render_template
from flaskext.mysql import MySQL

app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'project'
app.config['MYSQL_DATABASE_PASSWORD'] = 'project'
app.config['MYSQL_DATABASE_DB'] = 'true_colors_assessment'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        try:
            cursor = mysql.get_db().cursor()
        
            cursor.execute("SELECT * FROM users")
            cursor.execute("SELECT * FROM answers_group_1")
            cursor.execute("SELECT * FROM answers_group_2")
            cursor.execute("SELECT * FROM answers_group_3")
            cursor.execute("SELECT * FROM answers_group_4")
            cursor.execute("SELECT * FROM answers_group_5")
            
             # Fetch all of the data from the tables
            data = cursor.fetchall()
            
        finally:
            cursor.close()
        return render_template("index.html", data=data)


    # TEMPORARY ROUTE for receiving each score from the assessment.
    @app.route("/quiz", methods=['GET', 'POST'])
    def saveScore():
        return "score saved"


    # TEMPORARY ROUTE for receiving each score from the assessment.
    @app.route('/saveScore/<score1>/<score2>/<score3>/<score4>', methods=['POST'])
    def postScore(score1, score2, score3, score4):
        return jsonify({'score1': score1,
                        'score2': score2,
                        'score3': score3,
                        'score4': score4})
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8000, host="0.0.0.0") #Using the debugging development server for now but we can switch to GUnicorn later

