#!/bin/bash

# Step 1: Install requirements
echo "Setting up virtual environment and installing requirements..."
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Step 2: Create .env file
echo "Creating .env file..."
echo "FLASK_SECRET_KEY = \"$(python3 -c 'import secrets; print(secrets.token_hex())')\"" > .env

# Step 3: Create the 'test_db' database
read -p "Enter your MySQL username: " mysql_username

echo "Creating 'test_db' database..."
mysql -u $mysql_username -p -e "DROP DATABASE IF EXISTS test_db; CREATE DATABASE test_db;"

echo "Populating the database..."
cd database
mysql -u $mysql_username -p test_db < create.sql
mysql -u $mysql_username -p test_db < insert.sql
cd ..

# Step 4: Connect to the MySQL database
echo "Configuring MySQL connection..."
read -p "Enter your MySQL username: " mysql_username
read -sp "Enter your MySQL password: " mysql_password
sed -i.bak "s/user='project'/user='$mysql_username'/; s/password='project'/password='$mysql_password'/" server.py
rm server.py.bak

# Step 5: Run the project
echo "Launching the project..."
python3 server.py

echo "Installation complete."
