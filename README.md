# Social Network Frontend

This is the frontend for the Social Network app, built using React and Vite.

## Features

### Authentication & User Management
- User registration and login
- Authentication with JWT
- Profile management (update avatar, bio, location, etc.)
- Follow and unfollow users
- View followers and following lists

### Posts Management
- Create and delete posts
- View all posts or posts from followed users
- Like and unlike posts

### Comments Management
- Add and delete comments on posts
- View comments for each post

### Navigation & UI
- UI designed with Hero UI
- Client-side routing with React Router
- Form handling with React Hook Form and validation with Yup

## Technologies Used
- React
- Vite
- Redux Toolkit (for state management and API interaction)
- Hero UI (for UI components)
- React Hook Form (for form handling)
- React Router Dom (for navigation)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/makstsar17/social-network-ui.git
   cd social-network-ui
   ```

2. Install dependencies using npm or yarn:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. Create a `.env` file in the root directory. You can use the provided `.env.example` file as a template:
   ```sh
   cp .env.example .env 
   ```
   Then, update the `.env` file with your configuration:
   ```env
   VITE_API_URL=your_backend_api_url
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

5. Locally preview the production build:
   ```sh
   npm run build
   npm run preview
   ```
   or with Yarn:
   ```sh
   yarn build
   yarn preview
   ```

## Demo

https://github.com/user-attachments/assets/42785fa4-dc22-4acc-b8fa-b10d83e512d7

## License

This project is licensed under the MIT License.
