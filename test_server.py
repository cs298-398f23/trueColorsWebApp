import pytest
from server import create_app

def getId():
    # Define the logic to get the ID
    return '1234'

def test_create_app():
    app = create_app()
    assert app.secret_key == 'secret'
    
def test_getId():
    app = create_app()
    with app.test_client() as test:
        with test.session_transaction() as sess:
            sess['uuid'] = '1234'
        with app.app_context():
            assert getId() == '1234'
            
def test_get_questions():
    app = create_app()
