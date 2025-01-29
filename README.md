# **To-Do List App**

## Description

This is a simple **To-Do List** application built using **React.js** with support for adding, editing, deleting, and marking tasks as completed. It also includes **local storage support**, a **dark mode toggle**, and a **modal-based task input form.**

## Features

- Add, edit, delete tasks
- Mark tasks as completed
- Tasks grouped by date
- Local storage support (Tasks persist even after page refresh)
- Dark mode toggle
- Bootstrap styling for a responsive UI
- Floating button for quick task addition

## Technologies Used

- React.js
- Bootstrap 5
- React Icons
- CSS for additional styling

## Installation & Setup

Follow these steps to run the project locally:

### Prerequisites

Make sure you have the following installed:

- Node.js (>= 14.0)
- npm or yarn
- Git

## Steps
1. Clone the Repository
   ```bash
   git clone <repository-url>
   cd todo-app
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
4. Start the Development Server 
   ```bash
   npm start
   ```
   The app should now be running on http://localhost:3000/.

## File Structure
```bash
/todo-app
│── public/            # Static assets
│── src/               # Main application source code
│   │── components/    # React components
│   │── App.js         # Main App component
│   │── index.js       # Entry point
│   │── App.css        # Styling file
│── .gitignore         # Ignoring unnecessary files
│── package.json       # Project metadata and dependencies
│── README.md          # Project documentation
```
## Usage
- Click on the + button to add a new task.
- Fill in the task details (text, date, duration) and save.
- Click on the Edit button to modify a task.
- Click on the Delete button to remove a task.
- Click on the Complete button to mark a task as done.
- Use the dark mode toggle button to switch themes.

## GitHub Integration
To push this project to your GitHub repository:
1. Initialize Git (if not already initialized)
   ```bash
   git init
   ```
2. Add a Remote Repository
   ```bash
   git remote add origin <your-github-repository-url>
   ```
3. Stage and Commit Changes
   ```bash
   git add .
   git commit -m "Initial commit"
   ```
4. Push to GitHub
   ```bash
   git branch -M main
   git push -u origin main
   ```

