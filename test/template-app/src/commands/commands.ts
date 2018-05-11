/*

In this file we can define all the bento-data commands that are needed in our app.

A few basic ones come out of the box with bento-data: `doUpdateLocation` is re-exported
ready to be used by components of our app.

*/

import { Command, doUpdateLocation } from '@buildo/bento/data';
import { randomName } from 'queries';

export { doUpdateLocation };

export const doRefreshUsername = Command({
  // doesn't have any input param
  params: {},

  // when successful, should invaldiate this bento-data query
  invalidates: { randomName },

  // doesn't perform any operation: it exists only to refresh the `randomName` query
  run: Promise.resolve.bind(Promise)
});
