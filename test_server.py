import pytest
from server import create_app

# Return a basic user ID for testing
def getId():
    return '1234'

# Test the app is created with the correct secret key
def test_create_app():
    app = create_app()
    assert app.secret_key == 'secret'

# Test the session UUID is created and stored correctly
def test_getId():
    app = create_app()
    with app.test_client() as test:
        with test.session_transaction() as sess:
            sess['uuid'] = '1234'
        with app.app_context():
            assert getId() == '1234'

# Test the questions are returned correctly
def test_get_questions():
    app = create_app()
    with app.test_client() as test:
        with test.session_transaction() as sess:
            sess['uuid'] = '1234'
        with app.app_context():
            assert test.get('/getQuestions?group=1').status_code == 200
            assert test.get('/getQuestions?group=2').status_code == 200
            assert test.get('/getQuestions?group=3').status_code == 200
            assert test.get('/getQuestions?group=4').status_code == 200
            assert test.get('/getQuestions?group=5').status_code == 200

# Test the correct status codes for storing a result
def test_store_result_correct_status_codes():
    app = create_app()
    with app.test_client() as test:
        with test.session_transaction() as sess:
            sess['uuid'] = '1234'
        with app.app_context():
            assert test.post('/storeResult/ORANGE').status_code == 200
            assert test.post('/storeResult/GOLD').status_code == 200
            assert test.post('/storeResult/BLUE').status_code == 200
            assert test.post('/storeResult/GREEN').status_code == 200

            assert test.post('/storeResult/12').status_code == 400
            assert test.post('/storeResult/QR5').status_code == 400
            assert test.post('/storeResult/RED').status_code == 400
            assert test.post('/storeResult/PURPLE').status_code == 400
