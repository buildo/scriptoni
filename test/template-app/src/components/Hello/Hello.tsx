import * as React from 'react';
import View from 'View';
import { FormattedMessage } from 'react-intl';
import { declareQueries } from '@buildo/bento/data';
import { randomName } from 'queries';

import './hello.scss';

/*

We define a simple `HelloName` component that, once wrapped
in a query declaration for the `randomName` query, will receive its input params
as props (`length: number`) and pass to the wrapped component the `randomName` value,
result of fetching the declared query.

Updating the `length` prop will cause the query to refetch with the
updated params. Initially and in general while refetching, the `randomName`
value will thus be undefined.

*/

const queries = declareQueries({ randomName });

const HelloName = queries(({ randomName }: typeof queries.Props) =>
  !randomName.ready ? (
    <View>...</View>
  ) : (
    <FormattedMessage id="Hello.hello" values={{ name: randomName.value }} />
  )
);

/*

The hello component instead holds some control state, handled with React state.
This means it will be reinitialized to `10` every time the component
is unmounted and re-mounted.
On the contrary, the `randomName` data state obtained via the query, has a lifecycle
that is unrelated to the react component one: dependeing on its `cacheStrategy`,
it could be available indefinitely.

*/

type State = {
  value: string;
  length: number;
  showError: boolean;
};

export default class Hello extends React.Component<{}, State> {
  state = {
    value: '10',
    length: 10,
    showError: false
  };

  onLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value);

    const betweenSixAndFifty = !isNaN(parsedValue) && parsedValue >= 6 && parsedValue <= 50;

    if (!value) {
      this.setState({ value: '' });
    } else if (betweenSixAndFifty) {
      this.setState({ value, length: parsedValue, showError: false });
    } else {
      this.setState({ value, showError: true });
    }
  };

  render() {
    const {
      state: { length, value, showError },
      onLengthChange
    } = this;

    return (
      <View column className="hello">
        <View vAlignContent="center">
          <View className="label">length:</View>
          <input type="number" value={value} onChange={onLengthChange} />
          {showError && (
            <span className="warning">
              <FormattedMessage id="Hello.warningLength" />
            </span>
          )}
        </View>
        <HelloName length={length} />
      </View>
    );
  }
}
