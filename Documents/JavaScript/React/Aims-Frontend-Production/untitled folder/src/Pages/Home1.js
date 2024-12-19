import React from 'react';

const Home = (props) => {
    return (
        <div>
            <h1 className='text-5xl text-black'>jjjjjjjj</h1>
            {props.name ? 'Hi ' + props.name : 'You are not logged in'}
        </div>
    );
};

export default Home;
