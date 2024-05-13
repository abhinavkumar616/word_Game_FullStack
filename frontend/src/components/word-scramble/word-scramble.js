import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import "./word-scramble.sass";

const WordScramble = () => {
    // State variables
    const [isPlayOn, setIsPlayOn] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [correctWord, setCorrectWord] = useState("");
    const [wordgame, setWordgame] = useState("");
    const [message, setMessage] = useState("");
    const [gameData, setGameData] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [user, setUser] = useState(null);
    const [score, setScore] = useState(0); // State to track user's score
    const [attempts, setAttempts] = useState(0); // State to track user's attempts
    const [enterDisabled, setEnterDisabled] = useState(false); // State to track if the enter button should be disabled
    const navigate = useNavigate();

    // useEffect hook to fetch game data and retrieve user details
    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/getData");
                if (response.status === 201) {
                    const words = response.data.data.map((item) => item.words);
                    setGameData(words.filter(Boolean));
                }
            } catch (error) {
                console.error("Error fetching game data:", error);
            }
        };

        fetchGameData();

        const token = Cookies.get('token');
        if (token) {
            const decodedToken = decodeToken(token);
            setUser(decodedToken);
        } else {
            navigate('/');
        }
    }, [navigate]);

    // useEffect hook to set current word and scramble it
    useEffect(() => {
        if (gameData.length > 0 && isPlayOn) {
            setCorrectWord(gameData[currentWordIndex].toUpperCase());
            setWordgame(shuffleWord(gameData[currentWordIndex]).toUpperCase());
        }
    }, [gameData, currentWordIndex, isPlayOn]);

    // Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value.toUpperCase());
    };

    // Function to handle button click
    const handleButtonClick = () => {
        if (inputValue !== "") {
            if (correctWord === inputValue) {
                setMessage("Correct Answer");
                setScore(score + 1); // Increment score for correct answer
            } else {
                setMessage("Wrong Answer");
            }
            setInputValue("");
            setAttempts(attempts + 1);
            if (attempts >= 4) {
                setEnterDisabled(true); // Disable the enter button after 5 attempts
            }
            setTimeout(() => {
                setMessage("");
                setCurrentWordIndex((prevIndex) => (prevIndex + 1) % gameData.length);
            }, 1000);
        }
    };

    // Function to handle game start
    const handleStartGame = () => {
        setInputValue("");
        setMessage("");
        setIsPlayOn(true);
        setScore(0); // Reset score
        setAttempts(0); // Reset attempts
        setEnterDisabled(false); // Enable the enter button
    };

    // Function to shuffle word
    const shuffleWord = (word) => {
        const shuffledArray = word.split("").sort(() => Math.random() - 0.5);
        return shuffledArray.join("");
    };

    // Function to handle logout
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
    };

    // Function to submit score data to the backend API
    const submitScore = async () => {
        try {
            const token = Cookies.get('token');
            if (token) {
                const decodedToken = decodeToken(token);
                const { username, email } = decodedToken;
                // Send score data to the backend API
                await axios.post("http://localhost:3000/sqlscoreUser", {
                    username,
                    email,
                    total_score: score
                });
                 // Reset the wordgame state
                 setWordgame("");
                 // Reload the page after submitting score
                 window.location.reload();
            }
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    return (
        <div className="word_scramble">
            {!!message && (
                <div className="message">
                    <p> {message}</p>
                </div>
            )}

            <div className="header">
                <div className="words">
                    <h1>Word Game</h1>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="content">
                {isPlayOn ? (
                    <>
                        <div className="board">
                            {correctWord.split("").map((el, i) => (
                                <span key={`${el}_${i}`} className="square_bg">
                                    {inputValue[i]}
                                </span>
                            ))}
                        </div>
                        <p className="scrambled_word">{wordgame}</p>
                        <div className="field">
                            <input
                                type="text"
                                onChange={handleInputChange}
                                value={inputValue}
                                disabled={enterDisabled} // Disable the input field if enter button is disabled
                            />
                            <button
                                type="button"
                                onClick={handleButtonClick}
                                disabled={enterDisabled} // Disable the enter button if enter button is disabled
                            >
                                Enter
                            </button>
                        </div>
                    </>
                ) : (
                    <button
                        className="start_game"
                        type="button"
                        onClick={handleStartGame}
                    >
                        Start Game
                    </button>
                )}

                {isPlayOn && (
                    <button
                        className="start_game new"
                        type="button"
                        onClick={handleStartGame}
                    >
                        New Game
                    </button>
                )}

                {/* Display user information */}
                {user && (
                    <div className="user-info" style={{ color: 'blue' }}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Mobile: {user.mobile}</p>
                    </div>
                )}

                {/* Submit score button */}
                {isPlayOn && attempts === 5 && (
                    <div className="submit-score">
                        <button
                            className="blue-button"
                            onClick={submitScore}
                        >
                            Submit Score
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const decodeToken = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return {
        username: decodedToken.data.username,
        email: decodedToken.data.email,
        mobile: decodedToken.data.mobile
    };
};

export default WordScramble;


















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Cookies from 'js-cookie'; // Import the js-cookie library
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
// import "./word-scramble.sass";

// const WordScramble = () => {
//     const [isPlayOn, setIsPlayOn] = useState(false);
//     const [inputValue, setInputValue] = useState("");
//     const [correctWord, setCorrectWord] = useState("");
//     const [wordgame, setWordgame] = useState("");
//     const [message, setMessage] = useState("");
//     const [gameData, setGameData] = useState([]);
//     const [currentWordIndex, setCurrentWordIndex] = useState(0);
//     const [user, setUser] = useState(null); // State to store user information
//     const navigate = useNavigate(); // Initialize navigate for redirection

//     useEffect(() => {
//         // Function to fetch game data
//         const fetchGameData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:3000/getData");
//                 if (response.status === 201) {
//                     const words = response.data.data.map((item) => item.words);
//                     setGameData(words.filter(Boolean));
//                 }
//             } catch (error) {
//                 console.error("Error fetching game data:", error);
//             }
//         };

//         // Fetch game data when the component mounts
//         fetchGameData();

//         // Retrieve user details from token stored in cookies
//         const token = Cookies.get('token');
//         if (token) {
//             const decodedToken = decodeToken(token);
//             setUser(decodedToken);
//         } else {
//             // If no token is present, redirect to the login page
//             navigate('/'); // Redirect to the login page
//         }
//     }, [navigate]);

//     useEffect(() => {
//         if (gameData.length > 0 && isPlayOn) {
//             setCorrectWord(gameData[currentWordIndex].toUpperCase());
//             setWordgame(shuffleWord(gameData[currentWordIndex]).toUpperCase());
//         }
//     }, [gameData, currentWordIndex, isPlayOn]);

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value.toUpperCase());
//     };

//     const handleButtonClick = () => {
//         if (inputValue !== "") {
//             if (correctWord === inputValue) {
//                 setMessage("Correct Answer");
//                 setInputValue("");
//                 setTimeout(() => {
//                     setMessage(""); // Clear message after some time
//                     setCurrentWordIndex((prevIndex) => (prevIndex + 1) % gameData.length); // Move to the next word index or loop back to the beginning if reached the end
//                 }, 1000);
//             } else {
//                 setMessage("Wrong Answer");
//                 setInputValue("");
//                 setTimeout(() => {
//                     setMessage(""); // Clear message after 1 second
//                 }, 1000);
//             }
//         }
//     };


//     const handleStartGame = () => {
//         setInputValue("");
//         setMessage("");
//         setIsPlayOn(true); // Start the game
//     };

//     const shuffleWord = (word) => {
//         const shuffledArray = word.split("").sort(() => Math.random() - 0.5);
//         return shuffledArray.join("");
//     };

//     const handleLogout = () => {
//         // Remove token from cookies and redirect to the login page
//         Cookies.remove('token');
//         navigate('/'); // Redirect to the login page
//     };

//     return (
//         <div className="word_scramble">
//             {!!message && (
//                 <div className="message">
//                     <p> {message}</p>
//                 </div>
//             )}

//             <div className="header">
//                 <div className="words">
//                     <h1>Word Game</h1>
//                 </div>
//                 <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </div>
//             <div className="content">
//                 {isPlayOn ? (
//                     <>
//                         <div className="board">
//                             {correctWord.split("").map((el, i) => (
//                                 <span key={`${el}_${i}`} className="square_bg">
//                                     {inputValue[i]}
//                                 </span>
//                             ))}
//                         </div>
//                         <p className="scrambled_word">{wordgame}</p>
//                         <div className="field">
//                             <input
//                                 type="text"
//                                 onChange={handleInputChange}
//                                 value={inputValue}
//                             />
//                             <button type="button" onClick={handleButtonClick}>
//                                 Enter
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     <button
//                         className="start_game"
//                         type="button"
//                         onClick={handleStartGame}
//                     >
//                         Start Game
//                     </button>
//                 )}

//                 {/* {isPlayOn && (
//                     <button
//                         className="start_game new"
//                         type="button"
//                         onClick={handleStartGame}
//                     >
//                         New Game
//                     </button>
//                 )} */}

//                 {/* Display user information */}
//                 {user && (
//                     <div className="user-info" style={{ color: 'blue' }}>
//                         <p>Username: {user.username}</p>
//                         <p>Email: {user.email}</p>
//                         <p>Mobile: {user.mobile}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// // Function to decode the token and retrieve user information
// const decodeToken = (token) => {
//     // Decode the token here and extract user information
//     // Example: For JWT token, you can use libraries like jwt-decode
//     const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token payload
//     return {
//         username: decodedToken.data.username,
//         email: decodedToken.data.email,
//         mobile: decodedToken.data.mobile
//     };
// };

// export default WordScramble;
