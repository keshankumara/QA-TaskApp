# QA Task App - Frontend

## Description
This frontend serves as the user interface for the QA Task App, allowing users to manage their tasks seamlessly.

## Setup and Installation
1. **Clone the repository:**  
   `git clone https://github.com/keshankumara/QA-TaskApp.git`  

2. **Navigate to the frontend directory:**  
   `cd QA-TaskApp/frontend`  

3. **Install dependencies:**  
   `npm install`  

## Running the Application
To start the development server:  
`npm start`  
The application will be available at `http://localhost:3000`.

## Testing
To run the tests, use:  
`npm test`  
Please ensure that the testing suite is properly configured in your package.json.

## Environment Variables
Make sure to set the following environment variables:  
- `REACT_APP_API_URL` - The base URL for the API used by the frontend.

## Project Structure
```
frontend/
├── public/                  # Static files
├── src/                     # Application source code
│   ├── components/          # Reusable components
│   ├── pages/               # Page Components
│   ├── hooks/               # Custom hooks
│   ├── services/            # API services
│   └── App.js               # Main application file
├── package.json             # npm configuration file
└── README.md                # This README file
```  

## Contributing
Feel free to contribute by opening issues or sending pull requests!  

## License
This project is licensed under the MIT License.