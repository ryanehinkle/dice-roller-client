document.addEventListener('DOMContentLoaded', () => {
    const serverURL = 'https://dice-roller-server.azurewebsites.net/';
    console.log('Client connected to server successfully at ' + serverURL + '.');

    document.getElementById('rollButton').addEventListener('click', () => {
        console.log('Fetching data from server...');

        fetch(serverURL + 'roll-dice') // The + roll-dice is to call the roll-dice function from the base url
            .then(response => response.json())
            .then(data => {
                const dice1Img = document.getElementById('dice1');
                const dice2Img = document.getElementById('dice2');
                // Update the src attribute of the dice images
                dice1Img.querySelector('img').src = `${data.result1}.png`;
                dice2Img.querySelector('img').src = `${data.result2}.png`;

                // Update the alt attribute for accessibility
                dice1Img.querySelector('img').alt = `Dice ${data.result1}`;
                dice2Img.querySelector('img').alt = `Dice ${data.result2}`;

                const resultPrompt = document.getElementById('resultPrompt');
                resultPrompt.textContent = `You rolled ${data.sum}! (${data.result1} & ${data.result2})`;

                // Add roll animation class to dice images
                dice1Img.querySelector('img').classList.add('roll-animation');
                dice2Img.querySelector('img').classList.add('roll-animation');

                // Remove animation class after it completes so it can be repeated
                setTimeout(() => {
                    dice1Img.querySelector('img').classList.remove('roll-animation');
                    dice2Img.querySelector('img').classList.remove('roll-animation');
                }, 1000);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});