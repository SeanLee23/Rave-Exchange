function closeMessageBox() {
    const messageBox = document.querySelector('.message-box');
    messageBox.style.display = 'none';
}

const addButton = document.getElementById('addButton');
const friendNameInput = document.getElementById('friendName');
const friendList = document.getElementById('friendList');

addButton.addEventListener('click', function() {
    const friendName = friendNameInput.value;
    if (friendName.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${friendName}</span>
            <button class="removeButton">Remove</button>
        `;
        friendList.appendChild(li);
        friendNameInput.value = '';
    }
});

friendList.addEventListener('click', function(event) {
    if (event.target.classList.contains('removeButton')) {
        const listItem = event.target.parentElement;
        friendList.removeChild(listItem);
    }
});
