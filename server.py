from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template("index.html")


    # TEMPORARY ROUTE for receiving each score from the assessment.
    @app.route("/quiz.php", methods=['GET', 'POST'])
    def simpleSaveScore():
        return "score saved"


    # TEMPORARY ROUTE for receiving each score from the assessment.
    @app.route('/saveScore/<score1>/<score2>/<score3>/<score4>', methods=['POST'])
    def saveScore(score1, score2, score3, score4):
        return jsonify({'score1': score1,
                        'score2': score2,
                        'score3': score3,
                        'score4': score4})
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=8000, host="0.0.0.0") #Using the debugging development server for now but we can switch to GUnicorn later

