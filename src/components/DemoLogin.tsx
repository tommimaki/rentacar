import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const DemoLogin = () => {
    const navigate = useNavigate();
    const { setLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const loginDemoAdmin = async () => {
            try {
                const response = await fetch('https://carback.fly.dev/api/demo-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Demo admin logged in:', data);

                    // Save the user's credentials in the sessionStorage and context
                    sessionStorage.setItem('userToken', data.token);
                    sessionStorage.setItem('userId', data.userId);
                    setLoggedIn(true, data.isAdmin, data.userId);

                    navigate('/');
                } else {
                    const error = await response.json();
                    console.error('Error logging in demo admin:', error);
                }
            } catch (error) {
                console.error('Error logging in demo admin:', error);
            }
        };

        loginDemoAdmin();
    }, [navigate, setLoggedIn]);

    return null;
};

export default DemoLogin;
