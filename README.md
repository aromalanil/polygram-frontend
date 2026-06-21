<div align="center">
  <img width="70" src="https://user-images.githubusercontent.com/49222186/134722810-b295aca2-2544-4cd1-b388-17b5320d8fea.png" alt="logo"/>
  <h3>Polygram</h3>
  <p><b>A modern social platform exclusively for creating, viewing, and discussing polls.</b></p>

  <a href="https://github.com/aromalanil/polygram-frontend/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/aromalanil/polygram-frontend"></a>&nbsp;&nbsp;
  <a href="https://github.com/aromalanil/polygram-frontend/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/aromalanil/polygram-frontend"></a>&nbsp;&nbsp;
  <a href="https://github.com/aromalanil/polygram-frontend/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/aromalanil/polygram-frontend"></a>&nbsp;&nbsp;
  <a href="https://app.netlify.com/sites/polygram/deploys"><img alt="Netlify Build" src="https://api.netlify.com/api/v1/badges/f27790f0-71f5-4754-97a3-c62112d67271/deploy-status"></a>

  <br />
  <img width="600" src="https://user-images.githubusercontent.com/49222186/134717245-702d61a7-7b5d-4e6e-9289-e76ef2fe5b8f.png" alt="Polygram Screenshot" />
</div>

<br />

**Polygram** provides a clean, responsive, and intuitive way to seek, share, and ask opinions. The platform focuses on delivering a seamless user experience for community-driven decision making.

---

## 🚀 Key Features

- **Progressive Web App (PWA)**: Installable on desktop and mobile devices with caching strategies powered by Workbox for offline resilience.
- **Custom UI & Theming**: Built with fully custom components from scratch using Sass (with minimal reliance on third-party UI libraries) to ensure optimal performance. Includes full native dark and light mode support.
- **Optimistic UI Updates**: Interactions (like voting) are reflected instantly on the client side before the server responds, ensuring a snappy, lag-free experience.
- **Real-time Push Notifications**: Leverages Service Workers to deliver native push notifications for account events.
- **Secure Authentication**: Implements JWT and Google OAuth flows for seamless onboarding.

## 🛠 Tech Stack & Architecture

- **Framework**: [React.js](https://reactjs.org/) (bootstrapped with Vite for fast HMR and optimized builds)
- **State Management**: [React Rhino](https://github.com/aromalanil/react-rhino) — A lightweight, simple state management library designed exclusively for React.
- **Styling**: Vanilla SCSS/Sass with custom-designed components.
- **Routing**: React Router
- **Tooling**: ESLint, Prettier, and GitHub Actions for CI.

> **Note on UI Architecture**: To maintain complete architectural control over the design system and minimize bundle size, all components are custom-built with zero reliance on third-party UI frameworks.

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [Git](https://git-scm.com/)

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aromalanil/polygram-frontend.git
   cd polygram-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the required environment variables (see below).

4. Start the development server:
   ```bash
   npm start
   ```
   The app will be running at [http://localhost:3000](http://localhost:3000) (or the port specified by Vite).

## ⚙️ Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the Vite development server with Hot Module Replacement. |
| `npm run build` | Compiles and minifies the application for production into the `dist` or `build` directory. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Runs ESLint across all source files. |
| `npm run lint:fix` | Automatically fixes stylistic and formatting errors via ESLint. |

## 🔑 Environment Variables

To run the project locally, create a `.env` file with the following variables:

| Variable | Description |
|---|---|
| `REACT_APP_API_ORIGIN` | Base URL of the Polygram REST API (e.g., `http://localhost:5000`) |
| `REACT_APP_GOOGLE_CLIENT_ID` | Client ID received from Google Cloud Console for OAuth |
| `REACT_APP_PUBLIC_VAPID_KEY` | Public VAPID key from the backend for web push notifications |

## 📜 License

This project is licensed under the [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) - see the [LICENSE](LICENSE) file for details.
