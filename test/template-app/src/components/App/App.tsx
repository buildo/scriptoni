/*

This component is the entry point for our app.
It must be named exactly `App` and live in the `components/App` folder.
Typical tasks performed in this component are:
- general app layout
- choosing the correct component to render based on the current view

In this simple example it does a bit of both.

*/

import * as React from "react";
import View from "View";
import SwitchViewDropdown from "SwitchViewDropdown";
import Hello from "Hello";
import { declareQueries } from "@buildo/bento/data";
import { currentView } from "queries";

import "./app.scss";

const queries = declareQueries({ currentView });

class App extends React.Component<typeof queries.Props> {
  render() {
    const { currentView } = this.props;
    return (
      <View column className="app">
        <h1>Bento App</h1>
        <SwitchViewDropdown />
        {currentView.ready && currentView.value === "hello" && <Hello />}
      </View>
    );
  }
}

export default queries(App);
