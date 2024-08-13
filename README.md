# Notes Application

## Overview
This application allows users to create, view, and manage their notes. It supports authentication, validation of note content, and automated management of old notes.

## Technologies
- **Backend:** Java 8, Spring Boot, JPA, Spring Security
- **Frontend:** Angular
- **Database:** H2 (can be replaced with MySQL/PostgreSQL)

## Features
- **User Authentication:** Secure login for accessing notes.
- **CRUD Operations:** Create, Read, Update, and Delete notes.
- **Note Validation:** Only allows [@, ; & * + -] special characters and limits notes to 500 characters.
- **Auto Deletion:** Automatically deletes notes beyond the 10 most recent ones every hour.

## Setup Instructions

### Backend
1. Clone the repository.
2. Navigate to the backend directory.
3. Configure the application properties (database settings).
4. Run the application: `mvn spring-boot:run`.

### Frontend
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`.
3. Run the application: `ng serve`.
4. The frontend will be available at `http://localhost:4200`.

### Endpoints

- **POST /login:** User login.
- **GET /notes:** Retrieve the 10 most recent notes.
- **POST /notes:** Create a new note.
- **PUT /notes/{id}:** Update an existing note.
- **DELETE /notes/{id}:** Delete a note.

