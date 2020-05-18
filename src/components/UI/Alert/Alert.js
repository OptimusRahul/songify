import React from 'react';

import { Alert } from 'react-bootstrap';

const alert = props => {
 
    return (
        <Alert variant="danger" >
            <Alert.Heading>{props.value=== 'favorite' ? 
                            `You haven't marked any song as favorite.` : 
                            `You haven't played any song yet.`}
            </Alert.Heading>
        </Alert>
    );
};

export default alert;