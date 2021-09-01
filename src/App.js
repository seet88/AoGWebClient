import "./App.css";
import { Fragment } from "react";
import Layout from "./components/Layout.js/Layout";
import Notification from "./components/Layout.js/Notification";

function App() {
  console.log("app");

  return (
    <Fragment>
      {false && <Notification />}
      <Layout></Layout>
    </Fragment>
  );
}

export default App;
