import { jsx } from '@keystone-ui/core';

function CustomLogo () {
    return <h3 css={{
        color: '#2b511b'
    }}>Green Mountain Cannabis</h3>
}

export const components = {
    Logo: CustomLogo
}