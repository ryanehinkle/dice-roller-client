// Wait for the content to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Variable to store the user's server URL
    let serverURL = '';

    // Event listener for the "Connect" button
    document.getElementById('urlButton').addEventListener('click', () => {
        // Get the value from the URL input field and trim any leading or trailing whitespace
        const inputField = document.getElementById('urlInput');
        let urlInput = inputField.value.trim();

        // Check if a URL is provided
        if (urlInput !== '') {
            // Ensure the URL ends with '/'
            if (urlInput.charAt(urlInput.length - 1) !== '/') {
                urlInput += '/';
            }
            // Update the serverURL variable
            serverURL = urlInput;
            console.log('Server URL updated to: ' + serverURL);

            // Test the connection to the server
            testConnection(serverURL);
        } else {
            displayConnectionStatus('Please provide a URL!', 'error');
            console.log('No URL provided.');
        }
    });

    // Event listener for the "Roll Dice" button
    document.getElementById('rollButton').addEventListener('click', () => {
        console.log('Fetching data from server...');

        // Fetch data (RNG) from the server and update the dice images
        fetch(serverURL + 'roll-dice')
            .then(response => response.json())
            .then(data => {
                const dice1Img = document.getElementById('dice1');
                const dice2Img = document.getElementById('dice2');

                dice1Img.querySelector('img').src = `${data.result1}.png`;
                dice2Img.querySelector('img').src = `${data.result2}.png`;

                dice1Img.querySelector('img').alt = `Dice ${data.result1}`;
                dice2Img.querySelector('img').alt = `Dice ${data.result2}`;

                const resultPrompt = document.getElementById('resultPrompt');
                resultPrompt.textContent = `You rolled ${data.sum}! (${data.result1} & ${data.result2})`;

                // Add animation class for rolling effect
                dice1Img.querySelector('img').classList.add('roll-animation');
                dice2Img.querySelector('img').classList.add('roll-animation');

                // Remove animation class after a delay (roll over)
                setTimeout(() => {
                    dice1Img.querySelector('img').classList.remove('roll-animation');
                    dice2Img.querySelector('img').classList.remove('roll-animation');
                }, 1000);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                displayConnectionStatus('Failed to fetch data.', 'error');
            });
    });

    // Function to test connection to the server
    function testConnection(url) {
        // Send a HEAD request to the server URL to check the connection status
        fetch(url, { method: 'HEAD' })
            .then(response => {
                // Check if the response status is OK
                if (response.ok) {
                    // If successful, display a success prompt and log
                    displayConnectionStatus('Connected successfully!', 'success');
                    console.log('Connection: Successful!');
                } else {
                    // If not successful, display an error prompt
                    displayConnectionStatus('Failed to connect. Check console for details.', 'error');
                }
            })
            .catch(error => {
                // If an error occurs during the fetch operation, log the error
                console.error('Error testing connection:', error);
                // Display an error prompt also indicating the failure
                displayConnectionStatus('Failed to connect. Check console for details.', 'error');
                console.log('Connection: Failed!');
            });
    } 

    // Function to display connection status message
    function displayConnectionStatus(message, status) {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.textContent = message;
        resultContainer.style.color = getColor(status);
    }

    // Function to get the color for connection result prompt
    function getColor(status) {
        switch (status) {
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            default:
                return 'black';
        }
    }    
});
