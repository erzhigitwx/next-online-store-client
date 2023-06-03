import dynamic from 'next/dynamic';
import React from 'react';

const AuthorizationNoSSR = dynamic(
    () => import('./AuthorizationContent'),
    { ssr: false }
);

export default React.memo(AuthorizationNoSSR);