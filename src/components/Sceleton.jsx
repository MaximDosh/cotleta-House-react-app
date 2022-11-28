import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = () => (
  <ContentLoader
    className="burger-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="136" r="125" />
    <rect x="0" y="287" rx="5" ry="5" width="280" height="20" />
    <rect x="0" y="316" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="422" rx="5" ry="5" width="95" height="30" />
    <rect x="125" y="413" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Sceleton;
