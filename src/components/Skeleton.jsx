import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={0.5}
    width={600}
    height={34}
    viewBox="0 0 600 34"
    backgroundColor="#a9afc7"
    foregroundColor="#504e4e"
    {...props}>
    <rect x="24" y="7" rx="5" ry="5" width="360" height="24" />
    <rect x="3" y="11" rx="0" ry="0" width="16" height="16" />
    <rect x="493" y="7" rx="5" ry="5" width="100" height="24" />
    <rect x="390" y="7" rx="5" ry="5" width="100" height="24" />
  </ContentLoader>
);
export default Skeleton;
