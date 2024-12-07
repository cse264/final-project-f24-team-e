# The Office Favourites

A web application that allows users to vote for their favorite characters from The Office TV Series. Users can authenticate through Google OAuth, and admins have special privileges to manage users and votes.

## Team Information

**Team Name:** team-e

### Team Members and Roles
- **Elif Ozturk**: Admin, Database Creation/Management
- **Norman Zvenyika**: Frontend Developer (all frontend functionality)
- **Emir Veziroglu**: Backend Developer

## Requirements Implementation

### 1. User Accounts and Roles
- Two distinct roles: User and Admin
- Admins have additional privileges for user management

### 2. Database
MongoDB implementation with two collections:
- Users Collection
  - _id
  - email
  - name
  - role
- Votes Collection
  - _id
  - userId
  - characterId

### 3. Interactive UI
- Built with ReactJS and Material UI
- Dynamic character cards
- Real-time vote tracking
- Responsive design for various screen sizes

### 4. New Framework/Library
- Google OAuth implementation for secure authentication

### 5. External REST API
- Integration with The Office API (https://theofficeapi.dev/characters)
- Used for retrieving detailed character information

## User Stories
1. As a User, I can login to ensure my vote is protected
2. As an Admin, I can manage users and assign roles to control access and permissions within the system

## Technical Stack
- **Frontend**: ReactJS
- **Backend**: Serverless Express.js
- **Database**: MongoDB
- **Authentication**: Google OAuth

## Running the Application

1. Clone the repository
2. Navigate to the frontend directory
3. Follow the instructions in the frontend README.md for detailed setup and running instructions

For more detailed instructions:
- For frontend setup and running: See [frontend/README.md](frontend/README.md)

## Contact
For any queries or issues, please contact any of the team members