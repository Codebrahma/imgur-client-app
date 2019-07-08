import React from 'react';
import CardRenderer from '../CardRenderer';

const Home = () => (<CardRenderer
// https://api.imgur.com/3/gallery/{{section}}/{{sort}}/{{window}}/{{page}}
//            ?showViral={{showViral}}&mature={{showMature}}&album_previews={{albumPreviews}}
  generateUrl={currentPage => `https://api.imgur.com/3/gallery/hot/viral/all/${currentPage}/`}
  params={{
    showViral: true,
    mature: true,
    album_previews: true,
  }}
/>);

export default Home;
