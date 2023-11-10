from flask import Flask, jsonify, request

app = Flask(__name__)

# TEMPORARY ROUTE for receiving each score from the assessment.
@app.route('/saveScore/<score1>/<score2>/<score3>/<score4>', methods=['POST'])
def saveScore(score1, score2, score3, score4):
    return jsonify({'score1': score1,
                    'score2': score2,
                    'score3': score3,
                    'score4': score4})

if __name__ == '__main__':
    app.run(port=8000)
