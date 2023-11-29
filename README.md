# True Colors Web Application
An online/web version of the _True Colors_ personality assessment typically completed on pencil-and-paper. Final project designed for _CSCI 298/398_.

**Project Members**
- Jack Drabic
- Rafael Garcia Jr.
- Madison Meyers
- Michael Romero

**EC2 Instance Steps**

- ssh -i ~/.ssh/labsuser.pem ec2-user@<IPv4 addrress or DNS>

- sudo yum install -y git

- git clone <repo>

- cd trueColorsWebApp

- python3 -m venv .venv
- source .venv/bin/activate
- pip install -r requirements.txt

- sudo /home/ec2-user/trueColorsWebApp/.venv/bin/gunicorn -w4 --bind 0.0.0.0:80 --chdir /home/ec2-user/trueColorsWebApp "server:create_app()"

