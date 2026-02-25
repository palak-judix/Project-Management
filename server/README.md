📌 Day 1

Created two main folders: client and server to separate frontend and backend.

Inside the server folder, created a structured src directory for organized backend development.

Created a routes folder inside src to manage API routes.

Implemented a GET /health route to verify server functionality as required.

Created db.js inside the config folder to establish a connection with MongoDB Atlas.

Successfully configured environment variables for secure database connection.

📌 Day 2

Created a user.js file inside the models folder to define the User schema using Mongoose.

Implemented an authController.js file to handle authentication logic, including:

User Registration

User Login

Created authRoutes.js inside the routes folder to define authentication endpoints.

Connected the authentication routes to the Express application.

📌 Day 3

Created Project.js and Task.js models inside the models folder to define project and task schemas using Mongoose.

Established relationships:

Projects belong to Users.

Tasks belong to Projects.

Implemented full CRUD API functionality inside projectController.js, including:

Creating a new Project

Fetching all Projects linked to the authenticated user

Adding a Task to a specific Project

Deleting a Task

Marking a Task as completed

Created projectRoutes.js to define project and task-related API endpoints.

Integrated authentication middleware to ensure all project routes are protected and accessible only to logged-in users.

Tested all APIs using Postman to verify correct functionality.

📌 Day 4

Initialized a new Next.js application inside the client folder for frontend development.

Set up basic folder structure using the App Router.

Created Login and Register pages with clean form UI.

Integrated frontend with backend authentication APIs using fetch.

Configured cookie-based authentication using:

credentials: "include"

HTTP-only JWT cookies from backend

Ensured that upon successful login, JWT token is stored securely in cookies.

Verified authentication flow end-to-end:

Register → Login → Token stored → Protected routes accessible.

📌 Day 5

Built the Dashboard page to display user-specific projects.

Fetched projects from backend using protected API endpoint.

Displayed each project as a modern UI card.

Ensured that only projects linked to the authenticated user are visible.


📌 Day 6

Created a dynamic route using - /project/[id]

Added functionality to:

Create new tasks from the UI

Delete tasks instantly

Implemented smooth state management so tasks update instantly without page refresh.

Enabled delete functionality for projects directly from dashboard.

Ensured real-time UI updates using React state instead of reloading.

📌 Day 7

Improved application stability and production readiness.

Added proper error handling using try/catch blocks for all API calls.

Implemented a reusable Toast notification component to display:

Success messages

Error messages

Handled empty states properly:

Displayed a helpful "Create your first project" message when no projects exist.

Removed unnecessary console.log statements and debug comments.

Cleaned up unused imports and redundant code.

Ensured consistent UI styling and polished visual design.

Finalized application structure for maintainability and scalability.
