Task Manager

This App lets you manage your tasks seamlessly.

Features:
- View tasks
- Add or Delete tasks
- update task status

Installation:
1. clone this repository in your local
    > git clone https://github.com/Sparshsing/todo_app.git
2. install python dependencies
    ensure python is installed
    (optional) create virtual environment and activate
    Go to todo_backend folder and enter below command
    > pip install -r requirements.txt
3. install node dependencies
    ensure node is installed
    Go to todo_frontend folder and enter below command
    > npm install
4. run backend (from todo_backend folder)
    > python manage.py runserver
5. run frontend (from todo_frontend folder)
    > npm start

Technical Details:
- This app is built using React for frontend and Django for backend.
- Material UI is used as the UI library for React, for a consistent and responsive design.
- Best Coding practices have been followed for for error handling, User experience and security.
- Steps for setting up and developing the project have been added in steps.txt file.

Assumptions/Future Work:
- Currently we are using Sqlite database due to its simplicity and samll scale of the application.
  In future it can be easily swapped with powerfull databases like PostgreSQL.
- CORS has been set to allow requests from any origin for development phase.
- User login functionality is not implemented yet.
