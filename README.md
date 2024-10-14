# Vue 3 + TypeScript + Vite
Installation: Need to run command: "npm install" followed by "npm run dev" to run the server locally

I used Vite for the setup with Vue 3 and TypeScript

I used Vue Router to manage routes inside of Vue

Since I wanted to create a quick app, I used createWebHashHistory

I used Sass for the styling and Bootstrap too

I may have overdone it with the services and composables for an app this small

Same goes for the Sass files

# The tracktik-app:
The app has three views:

The list of all clients (Default page)

Filtering by tags
Filtering by order and sort
Pagination with a limit of 6
If a client is clicked, navigate to the page listing all sites of the client
The list of all sites

Filtering by tags
Filtering by order and sort
Pagination with a limit of 18
If this page is opened with a clientId (showing client sites), pagination is disabled
Page detail sites

A page displaying site details
If incorrect information is provided in the query, it redirects back to the "All Sites" page
The navigation bar is sticky at the top with two links: one to "All Clients" and one to "All Sites"

If the page is active, the corresponding element will also be active
