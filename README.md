
# Fullstack Assignment

**Note:** Please wait for a minute or two after starting the backend server, as it is deployed on Render's free-tier machine and may take some time to start up.

<h2>[Live Link](https://assignmentfullstack.vercel.app/)</h2>
<h2>[Live Link - Admin Panel](https://assignmentfullstack.vercel.app/admin)</h2>
<h3>Note: Default username and password for the admin panel - "admin"</h3>

## Description

A fullstack application featuring a landing page and an admin panel/dashboard for managing clients, projects, newsletter subscriptions, and contact form details, all while providing a robust user interface.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Approach](#approach)

## Installation

### Prerequisites

- Node.js
- Account on Cloudinary
- Browser

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd your-repo
   ```

3. **Install Dependencies for the Backend**

   ```bash
   cd backend
   npm install
   ```

4. **Install Dependencies for the Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Configuration**

   - Create a `.env` file in both the `frontend` and `backend` directories and add the necessary environment variables.
   - Example `.env` for backend:
     ```env
     MONGO_URI=your-mongo-uri
     PORT=5000
     CLOUDINARY_NAME=your-cloudinary-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_SECRET=your-cloudinary-secret
     ```
   - Example `.env` for frontend:
     ```env
     VITE_BACKEND_URL=https://example.com/api/v1  # Make sure to include 'api/v1' after your backend URL
     ```

6. **Run the Project**

   - **Start the Backend**

     ```bash
     cd ../backend
     npm run dev
     ```

   - **Start the Frontend**

     ```bash
     cd ../frontend
     npm run dev
     ```

   - For development and testing scripts, refer to the respective directories' `package.json` files.

## About the Project
### Approach

Completed all the challenges, including the bonus challenge of cropping images to a specific aspect ratio before uploading them to Cloudinary. I considered two solutions for the cropping challenge: using Sharp or Cloudinary's built-in crop function. I chose Cloudinary's solution since I was already using Cloudinary to store images.

### Key Components

- **Language**: TypeScript
- **Frontend**: React, React Query, React Router, and other frontend libraries
- **Backend**: Node.js, Express, Cloudinary (for storing images)
- **Database**: MongoDB with Mongoose
  
### Features and Usage

- **User-Specific Functionalities**: 
  - Send contact information.
  - Subscribe to the newsletter.
  - View projects and clients.

- **Admin-Specific Functionalities**: 
  - Perform CRUD operations on clients and projects.
  - View and remove emails subscribed to the newsletter.
  - View contact information gathered from the contact form.
  - Change admin credentials.



