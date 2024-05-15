# True Colors Web Application
An online/web version of the _[True Colors](https://www.truecolorsintl.com/about)_ personality assessment typically completed using pencil and paper in _CSCI 243.2: Preparing For A Computing Career_.

Final project designed for _CSCI 298/398: Web Programming_.

### Contributers
- [Jack Drabic](https://github.com/JackJack7890)
- [Rafael Garcia Jr.](https://github.com/RGJ-713)
- [Madison Meyers](https://github.com/20madi)
- [Michael Romero](https://github.com/MichaelRomero1)

### Prerequisites:

- MySQL | ([Download](https://dev.mysql.com/downloads/mysql/), [Set-Up Tutorial](https://dev.mysql.com/doc/mysql-getting-started/en/))

# Installation

### 1. Clone the repository

Once you are all set up, press the green `<> Code` button to gain a link to clone the repository.

Then, open your preferred [IDE](https://aws.amazon.com/what-is/ide/) and clone the repository.

### 2. Install 'requirements.txt' file

Once the repo has been cloned through your preferred IDE, run the following commands in your IDE's terminal:

```
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Create a .env file

Within the IDE, create a file in the project simply called `.env` and create a line that has `FLASK_SECRET_KEY =""`.

Next, go into the terminal and run the following commands:

```
python3
import secrets
print(secrets.token_hex())
```

A string of text should have been generated after the `print` command was used. Copy and paste the generated value in-between the `""` quotes in the `.env` file.

After this, also create four new lines in the .env file as follows:
MYSQL_HOST = ""
MYSQL_USERNAME = ""
MYSQL_PASSWORD = ""
MYSQL_DB = ""

The MYSQL_HOST will be localhost if running locally, or the IP address on Ec2
The MYSQL_USERNAME and MYSQL_PASSWORD are whatever username and password you are using for the database
The MYSQL_DB is the name of the database you are using. This will likely be trivia_db

### 4. Creating the 'test_db' database

Open up the [Terminal](https://support.apple.com/guide/terminal/welcome/mac) and log in to your MySQL account.

Once you've logged in, run the following command:

```
CREATE DATABASE test_db;
```

Next, open the [Finder](https://support.apple.com/guide/mac-help/organize-your-files-in-the-finder-mchlp2605/mac) and locate the folder called `trueColorsWebApp`.

Open the folder, right-click the subfolder called `database`, and select the `New Terminal at Folder` option.

In the newly opened Terminal, run the following command (be sure to replace `YOUR_NAME` with the name of your MySQL user account):

```
mysql -u YOUR_NAME -p test_db < create.sql
```

You will then be prompted to enter your password.

After doing this, run the following command, once again replacing `YOUR_NAME` with the name of your MySQL user account:

```
mysql -u YOUR_NAME -p test_db < insert.sql
```

You will once again be prompted to enter your password.

At this point, the database should have successfully been populated.

In order to ensure this, it is suggested to go back into the Terminal that the database was created in and run the following commands:

```
USE test_db;
SHOW TABLES;
SELECT * FROM q_group_1;
```

If 6 tables are listed and `q_group_1` contains 1 row of information, the database was successfully populated.

### 5. Connecting to the MySQL database

Go back into the IDE with the opened project. Go to the `server.py` file.

Go to `Line 103` in the file and locate the following code:

```
cnx = mysql.connector.connect(user='project', password='project',
```

Replace the first `project` with the name of your MySQL user account, and replace the second `project` with the password to that account.

This will allow the project to connect to your MySQL database in order to load each question of the personality test, as well as store user results in the `user_colors` table of the database.

### 6. Running the project

You are now ready to launch the project locally.

In your IDE, run the `server.py` file.

Once the server is running, open a new tab. In your browser's search bar, type in `localhost:8000` and hit `enter`.

The True Colors Personality Test should successfully be running. As you progress through the test, each set of questions should be loading in, as well.

**It is important to note that the project will be running on a development server. This should NOT be the case in a production deployment.**

# Creating an EC2 instance

In AWS EC2, click `Create Instance`.

-- Select Name as: TrueColorsWebApp

-- Select Image as: AMI: Amazon Linux 2 AMI (HVM)

-- Select Instance Type as: `t2.micro`

-- Select Key Pair (Login) as: `vockey`

-- Network Settings: Allow SSH traffic from anywhere, Allow HTTP traffic from the internet

-- Click `Create Instance`

In a new Terminal window, run the following commands (replacing anything with `<>` characters and excluding those characters):

```
ssh -i ~/.ssh/labsuser.pem ec2-user@<YOUR IPv4 ADDRESS OR DNS>
sudo yum install -y git
git clone <YOUR_REPO>
cd trueColorsWebApp
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Now, open a new Terminal window (do not delete the old one) and run the following commands:

```
sudo amazon-linux-extras install mariadb10.5
sudo systemctl start mariadb
sudo mysql_secure_installation
```

After running this command, it will prompt you to hit `return` if you do not already have a previous password. Simply hit `return`.

After that, you will be asked a series of Y/N questions. For the first one, enter `N`.

For the rest, enter `Y`. You will be prompted after the first `Y` to create a password and confirm the password.

Once a password has been created, run the following command (replacing `YOUR_NAME` with the name of your MySQL user account):
    
```
mariadb -u YOUR_NAME -p
```

You will be prompted to enter your password. This is the same password you created in the previous step. Enter the password and hit `return`.
 
Run the `create.sql` and `insert.sql` commands from the previous step, as well.
 
Once you finish running these commands, go back to the previous Terminal window where you cloned the GitHub repo and enter the following:

```
sudo /home/ec2-user/trueColorsWebApp/.venv/bin/gunicorn -w4 --bind 0.0.0.0:80 --chdir /home/ec2-user/trueColorsWebApp "server:create_app()"
```

If successful, you should be able to enter the IP address of the EC2 instance in your browser's search bar and access the functioning True Colors personality test.





