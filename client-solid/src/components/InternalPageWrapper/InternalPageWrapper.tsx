import { Component } from 'solid-js';
import Header from '../Header/Header';

const InternalPageWrapper: Component = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default InternalPageWrapper;