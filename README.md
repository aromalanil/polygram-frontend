<div align="center">
<img width="70" src="https://user-images.githubusercontent.com/49222186/134722810-b295aca2-2544-4cd1-b388-17b5320d8fea.png" alt="logo"/>
<h3>Polygram</h2/>
<p><b>Social media exclusive for creating & viewing polls</b></p>

<a href="https://github.com/aromalanil/polygram-frontend/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/aromalanil/polygram-frontend"></a>&nbsp;&nbsp;
<a href="https://github.com/aromalanil/polygram-frontend/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/aromalanil/polygram-frontend"></a>&nbsp;&nbsp;
<a href="https://github.com/aromalanil/polygram-frontend/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/aromalanil/polygram-frontend"></a>&nbsp;&nbsp;
<a href="https://github.com/aromalanil/polygram-frontend"><img alt="GitHub stars" src="https://img.shields.io/github/repo-size/aromalanil/polygram-frontend"></a>&nbsp;&nbsp;
<a href="https://github.com/aromalanil/polygram-frontend/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/aromalanil/polygram-frontend"></a><br/>
<a href="https://app.netlify.com/sites/polygram/deploys"><img alt="Netlify Build" src="https://api.netlify.com/api/v1/badges/281d5586-42a8-4ddf-8daf-50279fcd9148/deploy-status"></a>

<img width="500" src="https://user-images.githubusercontent.com/49222186/134717245-702d61a7-7b5d-4e6e-9289-e76ef2fe5b8f.png" /><br/>

<p>A simple, convenient & efficient way to seek, share & ask opinions, views & questions with society for better decision making<p/><br/>
</div>

## Features

- 🔥 **PWA** : Install as a [PWA](https://developers.google.com/web/progressive-web-apps) on your device.
- 🌓 **Theme Support** : Supports Dark & Light Mode
- 🔐 **Authentication** : Uses JWT & OAuth for authentication
- 🔔 **Push Notification** : Receive push notifications for events in your account

## Built With

- [React](https://reactjs.org)
- [React Rhino](https://www.npmjs.com/package/react-rhino) (State Managment)
- [Sass](https://sass-lang.com/) (Styling)

## Setup

### Requirements

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Installation

Clone the repo locally then install all the dependencies using [NPM](https://npmjs.org/)

```bash
git clone https://github.com/aromalanil/polygram-frontend.git
cd polygram-frontend
npm install
```

### Local Development

1. Create a `.env` file in the project root and add all the envrionment variables mentioned [here](#environment-variables)
2. Execute the following command.

```bash
npm start
```

This will create a local development server at [http://localhost:3000](http://localhost:3000)

### Generate Production Build

1. Create a `.env` file in the project root and add all the envrionment variables mentioned [here](#environment-variables)
2. Execute the following command.

```bash
npm run build
```

This will generate a production ready build in `build` folder.

## Environment Variables

| Variable                     | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| `REACT_APP_API_ORIGIN`       | Base URL of the REST api                         |
| `REACT_APP_GOOGLE_CLIENT_ID` | Client ID received from google for OAuth         |
| `REACT_APP_PUBLIC_VAPID_KEY` | Public vapid key of server for push notification |

## License

This project is licensed under [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) - see the [`LICENSE`](https://github.com/aromalanil/polygram-frontend/blob/main/LICENSE) file for details.
