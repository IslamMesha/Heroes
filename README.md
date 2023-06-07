# Heroes

Heroes is a web application that allows users to view and manage a database of heroes. The application is built using a combination of Django on the backend and Angular on the frontend.

## Installation

To run the Heroes application, you will need to have the following software installed on your system:

- Python 3.9 or later
- Node.js 12.0 or later
- Angular CLI 12.0 or later

Once you have installed these dependencies, follow these steps to install and run the application:

1. Clone the Heroes repository:

   ```
   git clone https://github.com/IslamMesha/heroes.git
   ````

2. Install the backend dependencies:

   ```
   cd heroes/backend
   pip install -r requirements.txt
   ````

3. Set up the database:

   ```
   python manage.py migrate
   ````

4. Install the frontend dependencies:

   ```
   cd ../frontend
   npm install
   ````

5. Build the frontend:

   ```
   ng build --prod
   ````

6. Start the backend server:

   ```
   cd ../backend
   python manage.py runserver
   ````

7. Open the application in your web browser:

   ```
   http://localhost:8000/
   ````

## Usage

The Heroes application allows users to view and manage a database of heroes. Users can perform the following actions:

- View a list of all heroes
- View details for a specific hero
- Add a new hero
- Edit an existing hero
- Delete a hero

## Contributing

If you would like to contribute to the Heroes project, please follow these steps:

1. Fork the repository on GitHub.

2. Clone your fork locally:

   ```
   git clone https://github.com/IslamMesha/heroes.git
   ````

3. Create a new branch for your feature or bug fix:

   ```
   git checkout -b [branch-name]
   ````

4. Make your changes and commit them:

   ```
   git commit -m "[commit-message]"
   ````

5. Push your changes to your fork:

   ```
   git push origin [branch-name]
   ````

6. Submit a pull request on GitHub.

## License

Heroes app is released under the MIT. See LICENSE for more information.

## Credits

Heroes was created by IslamMesha.