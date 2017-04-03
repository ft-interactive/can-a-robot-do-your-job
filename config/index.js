import * as bertha from 'bertha-client'; // or const bertha = require('bertha-client');
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

export default async () => {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();

  const text = await bertha.get('1KL8AB3kN98lYz6MYHd6ILJ_iBWMq0crc7Yx6B5d6LY8', ['storytext|object']).then((data) => {
    return data.storytext;
  });

  return {
    ...d,
    flags,
    onwardJourney,
    text,
  };
};
