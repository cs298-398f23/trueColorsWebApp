# True Colors Web Application
An online/web version of the _True Colors_ personality assessment typically completed on pencil-and-paper. Final project designed for _CSCI 298/398_.

**Project Members**
- Jack Drabic
- Rafael Garcia Jr.
- Madison Meyers
- Michael Romero

# Creating A Virtual Environment

- python3 -m venv .venv

- source .venv/bin/activate

- pip install -r requirements.txt


# Creating A Secret Value For .env File

- create a .env file with the only thing in being `FLASK_SECRET_KEY =""`

- `python3`

- `import secrets`

- `print(secrets.token_hex())`

- Copy + paste the value that was printed in-between the `""` in the `.env` file

# Creating An EC2 Instance

Name: TrueColorsWebApp

AMI: Amazon Linux 2 AMI (HVM)

Instance Type: t2.micro

Key Pair (Login): vockey

Network Settings: Allow SSH traffic from anywhere, allow HTTP traffic from the internet

- `ssh -i ~/.ssh/labsuser.pem ec2-user@<IPv4 addrress or DNS>` (without `<>` characters)

- `sudo yum install -y git`

- `git clone <repo>` (without `<>` characters)

- `cd trueColorsWebApp`

- `python3 -m venv .venv`

- `source .venv/bin/activate`

- `pip install -r requirements.txt`

- `sudo /home/ec2-user/trueColorsWebApp/.venv/bin/gunicorn -w4 --bind 0.0.0.0:80 --chdir /home/ec2-user/trueColorsWebApp "server:create_app()"`


- `sudo amazon-linux-extras install mariadb10.5`

- `sudo systemctl start mariadb`

- `sudo mysql_secure_installation`

- `sudo yum install -y git`

**Connecting Database To EC2 Instance**

- sudo yum -y install mariadb-server
- sudo service mariadb start

**Creating an RDS instance for mySQL on AWS**

- search in the bar rd, and go to RDS and Create a database

- Database Creation Method: Standard create

- Engine Options: MySQL

- Templates: Free Tier

- Settings: Create a master password

- Instance Configuration: Make it a db.t2.micro

- Storage: -- Storage autoscaling, turn off

- Connectivity: Connect to an EC2 Compute Resource -- Ec2 Instance: TrueColorsWebApp

- Advanced options: test_db for the name
