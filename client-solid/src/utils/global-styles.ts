import { createGlobalStyles } from 'solid-styled-components';

const GlobalStyles = createGlobalStyles`
    * {
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        font-family: Roboto, sans-serif;
        font-size: 1rem;
        line-height: 1.5;
        color: #333;
    }
    
    body, #root {
        display: flex;
        flex-direction: column;
    }

    #root {
        flex-grow: 1;
    }
`;

export default GlobalStyles;
