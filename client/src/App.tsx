import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
    const [ user, setUser ] = useState<any>();
    useEffect(() => {
        axios.post('/api/users/add', { name: 'Mik' })
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            });
    }, []);
    return (
        <div>
          Hello
            {user}
        </div>
    );
};

export default App;
