import React, { useState, useEffect } from "react";

function ErrorBoundary(props) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (hasError) {
            logErrorToMyService();
        }
    }, [hasError]);

    const componentDidCatch = (error, errorInfo) => {
        logErrorToMyService(error, errorInfo);
        setHasError(true);
    };

    if (hasError) {
        return <h1>Something went wrong.</h1>;
    }

    return (
        <React.Fragment>
            {React.Children.map(props.children, (child) => {
                return React.cloneElement(child, { componentDidCatch });
            })}
        </React.Fragment>
    );
}

export default React.memo(ErrorBoundary);