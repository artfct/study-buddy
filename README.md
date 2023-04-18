# Study Buddy

Study Buddy is a web application that helps students find their perfect study partner based on shared courses, interests, and study goals. By uploading their course schedules, students can connect with others who have similar academic interests and collaborate effectively.

## Features

- User authentication and registration
- Upload and display personal course schedule
- Search for study buddies based on shared courses, interests, and study goals
- View study buddy profiles, including their bio and profile picture
- Edit personal profile information

## Getting Started

These instructions will help you set up and run the Study Buddy application on your local machine for development and testing purposes.

### Prerequisites

To run Study Buddy, you'll need the following software installed:

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/study-buddy.git
   ```

2. Change to the project directory:

   ```
   cd study-buddy
   ```

3. Install project dependencies:

   ```
   yarn install
   ```

4. Create a `.env` file in the root directory of the project with the following Firebase configuration variables [Optional]:
 

   ```
   REACT_APP_API_KEY=your-api-key
   REACT_APP_AUTH_DOMAIN=your-auth-domain
   REACT_APP_PROJECT_ID=your-project-id
   REACT_APP_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_APP_ID=your-app-id
   REACT_APP_MEASUREMENT_ID=your-measurement-id
   ```

5. Start the development server:

   ```
   yarn start
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Firebase](https://firebase.google.com/) - Backend-as-a-Service for authentication, database, and storage
- [React Router](https://reactrouter.com/) - A collection of navigational components for React applications


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
