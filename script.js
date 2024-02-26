document.addEventListener('DOMContentLoaded', () => {
    let serverURL = '';

    document.getElementById('urlButton').addEventListener('click', () => {
        const inputField = document.getElementById('urlInput');
        let urlInput = inputField.value.trim(); // Trim any whitespace from the input value

        if (urlInput !== '') {
            // Check if the last character of urlInput is a '/'
            if (urlInput.charAt(urlInput.length - 1) !== '/') {
                // If it's not '/', add it to the end of the string
                urlInput += '/';
            }
            serverURL = urlInput; // Update the serverURL variable with the new URL
            console.log('Server URL updated to: ' + serverURL);

            // Test the connection to the server
            testConnection(serverURL);
        } else {
            console.log('No URL provided.');
        }
    });

    document.getElementById('rollButton').addEventListener('click', () => {
        console.log('Fetching data from server...');

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

                dice1Img.querySelector('img').classList.add('roll-animation');
                dice2Img.querySelector('img').classList.add('roll-animation');

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

    function testConnection(url) {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    displayConnectionStatus('Connected successfully!', 'success');
                    console.log('Connection: Successful!');
                } else {
                    displayConnectionStatus('Failed to connect. Check console for details.', 'error');
                }
            })
            .catch(error => {
                console.error('Error testing connection:', error);
                displayConnectionStatus('Failed to connect. Check console for details.', 'error');
                console.log('Connection: Failed!');
            });
    }
    
    
    
      

    function displayConnectionStatus(message, status) {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.textContent = message;
        resultContainer.style.color = getColor(status);
    }

    function getColor(status) {
        switch (status) {
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            case 'notfound':
                return 'orange';
            default:
                return 'black';
        }
    }    
});
