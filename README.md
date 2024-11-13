# Moodify

Moodify is a mood-based recommendation app that provides personalized recommendations for movies, books, and songs based on your current mood. The app leverages various APIs to fetch detailed information about the recommended items.

## Features

- **Mood-Based Recommendations**: Enter your current mood and get personalized recommendations for movies, books, and songs.

- **Detailed Information**: Fetches detailed information about each recommended item, including titles, authors, release dates, and more.

- **Responsive Design**: The app is designed to be responsive and works well on both desktop and mobile devices.

- **Smooth Animations**: Utilizes Framer Motion for smooth animations and transitions.

- **Error Handling**: Provides error messages if there are issues fetching recommendations.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.

- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

- **Framer Motion**: A library for animations and transitions in React.

- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

- **Lucide Icons**: A collection of simple and beautiful SVG icons.

- **Google Generative AI**: Used for generating mood-based recommendations.

- **The Movie Database (TMDB) API**: Used for fetching detailed movie information.

- **Google Books API**: Used for fetching detailed book information.

- **Last.fm API**: Used for fetching detailed song information.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

- npm or yarn

### Installation

1\. Clone the repository:

   ```bash

   git clone https://github.com/your-username/moodify.git

   cd modify
2. Install dependencies:
npm install

# or

yarn install

3. Create a `.env.local` file in the root directory and add your API keys:
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key

NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=your_google_books_api_key

NEXT_PUBLIC_LASTFM_API_KEY=your_lastfm_api_key

4. Run the development server:
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

1.  Open [http://localhost:3000](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) to automatically optimize and load [Geist](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html), a new font family for Vercel.

Learn More
----------

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) - learn about Next.js features and API.
-   [Learn Next.js](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) - an interactive Next.js tutorial.

Usage
-----

1.  Enter your current mood in the input field.
2.  Click the "Get Recommendations" button.
3.  View the recommended movies, books, and songs based on your mood.
4.  Click on any recommendation to search for more information on Google.

File Structure
--------------

-   `pages/`: Contains the main page of the application.
-   `components/`: Contains reusable UI components.
-   `public/`: Contains static assets such as images.
-   `styles/`: Contains global styles and Tailwind CSS configuration.
-   `next.config.js`: Next.js configuration file.
-   `api/`: Contains functions for fetching recommendations from various APIs.

Contributing
------------

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License
-------

This project is licensed under the MIT License. See the [LICENSE](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) file for details.

Acknowledgements
----------------

-   [Next.js](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [TypeScript](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [Framer Motion](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [Tailwind CSS](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [Lucide Icons](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [Google Generative AI](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [The Movie Database (TMDB) API](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [Google Books API](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)
-   [Last.fm API](vscode-file://vscode-app/c:/Users/mehul/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)