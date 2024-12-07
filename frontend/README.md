# FrontEnd For The Office Favorites

## Setup and Installation

Before running the application, ensure you have:
1. The `.env` file in the root directory of the front end
2. The following environment variable defined:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=
   ```
   Email noz224@lehigh.edu if you need the client id key.

## Running the Application

To start the application:
1. Make sure you are in the frontend directory
2. Run: `npm install`
3. Run: `npm start server`

## Project Structure

```
frontend/
├── public/                     # Public assets
│   ├── images/
│   │   └── office-background.jpeg
│   └── index.html
├── src/
│   ├── components/            # Reusable components
│   │   ├── admin/            # Admin-specific components
│   │   │   └── adminTableCard.js
│   │   ├── auth/             # Authentication components
│   │   │   └── protectedRoute.js
│   │   ├── characters/       # Character-related components
│   │   │   ├── characterCard.js
│   │   │   └── characterDetails.js
│   │   ├── layout/          # Layout components
│   │   │   ├── footer.js
│   │   │   ├── header.js
│   │   │   ├── mainLayout.js
│   │   │   └── sidebar.js
│   │   └── vote/            # Voting components
│   │       ├── topCharactersCard.js
│   │       ├── totalVotesCard.js
│   │       ├── userVoteCard.js
│   │       └── voteCard.js
│   ├── context/             # React Context
│   │   └── authContext.js
│   ├── pages/              # Page components
│   │   ├── adminPage.js
│   │   ├── charactersPage.js
│   │   ├── homePage.js
│   │   ├── loginPage.js
│   │   └── votingPage.js
│   ├── services/           # Services and utilities
│   │   ├── api/           # API services
│   │   │   ├── characterService.js
│   │   │   ├── userService.js
│   │   │   └── voteService.js
│   │   ├── config.js
│   │   ├── errors.js
│   │   └── utils/
│   │       └── apiUtils.js
│   ├── App.js             # Main App component
│   └── index.js           # Application entry point
```