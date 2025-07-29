import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Game from './components/Game';
import MainScreen from './components/MainScreen'


// Main App Component
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthenticated = () => {
        setIsAuthenticated(true);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <MainScreen onAuthenticated={handleAuthenticated} />
            ) : (
                <Game />
            )}
        </div>
    );
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(<App />); 