# DashTag - Task Management Application

DashTag is a modern, intuitive task management application built with vanilla JavaScript. It provides a clean interface for organizing tasks into projects, with features like starring important tasks, marking tasks as complete, and filtering tasks based on their status.

## Features

- **Project-based Organization**: Create and manage multiple projects to categorize your tasks
- **Task Management**: Add, edit, and delete tasks with titles, descriptions, and due dates
- **Starred Tasks**: Mark important tasks for quick access
- **Task Completion**: Mark tasks as complete and view them in a dedicated section
- **Responsive Design**: Clean, modern UI that works across different device sizes
- **Persistent Storage**: All data is saved in the browser's localStorage

## Project Structure

```
src/
├── assets/
│   └── styles/
├── logic/
│   ├── project-service.js
│   ├── project.js
│   ├── storage.js
│   ├── task-service.js
│   └── task.js
├── ui/
│   ├── dialogs/
│   ├── project-section/
│   └── sidebar/
├── main.css
├── main.html
└── main.js
```

## Getting Started

1. Clone the repository
2. Open main.html in your browser
3. Start organizing your tasks!

No build process or external dependencies required - the application runs directly in the browser.

## Usage

### Creating a Project
1. Click on "Create new project" in the sidebar
2. Enter a project name in the dialog
3. Click "Done" to create the project

### Adding a Task
1. Select a project from the sidebar
2. Click "Add a task" in the main content area
3. Fill in the task details in the dialog:
   - Title (required)
   - Description (optional)
   - Due date (optional)
   - Star the task if important
4. Click "Save" to add the task

### Managing Tasks
- **Edit a task**: Click on any task to open the edit dialog
- **Mark complete**: Click the checkbox icon next to a task
- **Delete a task**: Hover over a task and click the delete icon
- **Star a task**: Toggle the star icon on a task

### Filtering Tasks
Use the filter sections in the sidebar to view:
- **Starred Tasks**: All tasks marked with a star
- **Completed Tasks**: All completed tasks

## Technical Details

### Core Components

- **Project Service**: Manages project creation, retrieval, and storage
- **Task Service**: Handles task operations and synchronization across projects
- **Storage**: Persists data using localStorage
- **UI Components**: Modular interface elements for sidebar, project section, and dialogs

### Data Model

- **Project**: Contains an ID, title, and array of tasks
- **Task**: Contains an ID, title, description, due date, starred status, and completion status

### Styling

The application uses CSS custom properties for theming and Tailwind CSS utility classes for layout and components.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is open source and available under the MIT License.