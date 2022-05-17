import { rem } from 'utils/font';
import { styled } from 'solid-styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: ${rem(20)};
    min-height: ${rem(20)};
    height: ${rem(20)};
    background-color: #492173;
    box-shadow: 0 0 10px 0 rgba(66, 68, 90, 1);
`;
