# Vue 3 + TypeScript + Vite

- Installation:
  Need to run command: "**npm i**" followed by "**npm run dev**" to run the server locally

- I used vite for the setup with vue 3 and ts
- I used vue router to manage routes inside of vue
- Since i wanted to create a quick app, i used createWebHashHistory
- I used sass for the styling and bootstrap too
- I may have overdid it with the services and composables for an app this small
- Same goes for the sass files

# The tracktik-app:

- The app has three views:

  - The list of all clients (Default page)

    - Filtering by tags
    - Filtering by order and sort
    - Pagination with a 6 limit
    - If a client is clicked, go to page list all sites of the client

  - The list of all sites

    - Filtering by tags
    - Filtering by order and sort
    - Pagination with a 18 limit
    - If this pages is opened with a clientId (Showcase client sites), we won't have pagination

  - Page detail sites
    - Page with sites details
    - If put wrong info into query, it will go back to all sites page

- Navigation bar is sticky at the top with two links to all clients or all sites
  - If page is active, the element will be active as well
