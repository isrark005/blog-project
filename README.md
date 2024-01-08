# Blog Project README

## Overview

This repository contains the source code for a blog project implemented using React. The project includes features like user authentication, post creation, editing, and viewing. It utilizes React Router for navigation and Redux for state management.

## Project Structure

- **src/components**: Contains reusable React components.
- **src/pages**: Includes individual pages/components for different routes.
- **src/store**: Manages the Redux store configuration.
- **src/App.jsx**: Main component rendering the application layout.
- **src/index.css**: Stylesheet for the application.
- **src/main.jsx**: Entry point of the application.

## Routes

- **/home**: Landing page displaying the blog's home content.
- **/login**: Login page for user authentication.
- **/create-account**: Page for creating a new user account.
- **/blogs**: View all blog posts (protected route, requires authentication).
- **/post/:slug**: View a specific blog post (protected route).
- **/add-post**: Create a new blog post (protected route).
- **/edit-post/:slug**: Edit an existing blog post (protected route).
- **/user/:userID**: View user profile page (protected route).

## Dependencies

- React: JavaScript library for building user interfaces.
- Redux: State management library.
- React Router: Declarative routing for React.js.
- react-dom/client: ReactDOM package for client-side rendering.
- react-redux: Official Redux bindings for React.
- react-router-dom: DOM bindings for React Router.
- react-hook-form: Handle the inputs

