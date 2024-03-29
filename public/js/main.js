async function getPosts() {
    return await fetch('/posts')
        .then((response) => response.json())
        .then((data) => data);
}

document.addEventListener('DOMContentLoaded', async function() {
    let posts = await getPosts();
    let articles = document.querySelector('.landmarks');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `  
        <div class="col">
        <div class="card">
            <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.description}</p>
                <a href="/landmark?id=${post.id}" class="btn btn-primary">Details</a>
            </div>
        </div>
    </div>
    `;
    articles.insertAdjacentHTML('beforeend', postHTML);
    })
})

let callMeForm = document.querySelector('.call-me-form');

callMeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let phoneInput = document.querySelector('input');
    fetch('/callback-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           phoneNumber: phoneInput.value 
        })
    }).then((response) => response.text()).then(() => alert('We will call you back as soon as possible'));
})

let emailRequestForm = document.querySelector('.email-request-form');

emailRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            email:document.querySelector('#email').value,
            text: document.querySelector('#message').value
        })
    }).then((response) => response.text()).then((data) => console.log(data));
})