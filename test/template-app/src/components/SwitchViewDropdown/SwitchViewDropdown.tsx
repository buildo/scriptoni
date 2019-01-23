/*

This components reuses two other "basic" components that we defined in our
app's `components` folder: View and Dropdown.

It also reads and updates the `CurrentView` data state we defined,
using the dedicated query, command, helpers and types defined respecitvely in
`queries`, `commands` and `model`.

*/

import * as React from "react";
import View from "components/View";
import Dropdown from "components/Dropdown";
import { declareQueries, declareCommands } from "@buildo/bento/data";
import { viewToLocation, CurrentView } from "model";
import { currentView } from "queries";
import { doUpdateLocation } from "commands";

const queries = declareQueries({ currentView });
const commands = declareCommands({ doUpdateLocation });

type Props = typeof queries.Props & typeof commands.Props;

const dropdownOptions = [
  {
    value: "home",
    label: "Home"
  },
  {
    value: "hello",
    label: "Hello"
  }
];

class SwitchViewDropdown extends React.Component<Props> {
  onChange = (value: CurrentView) => {
    this.props.doUpdateLocation(viewToLocation(value));
  };

  render() {
    const { currentView } = this.props;
    const value = currentView.ready ? currentView.value : undefined;
    return (
      <View className="switch-view-dropdown">
        <Dropdown
          options={dropdownOptions}
          value={value}
          onChange={this.onChange as any}
        />
      </View>
    );
  }
}

export default queries(commands(SwitchViewDropdown));
