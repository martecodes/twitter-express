const heart = document.getElementsByClassName("fa-heart");
const retweet = document.getElementsByClassName("fa-retweet");
const trash = document.getElementsByClassName("fa-trash");
const li = document.getElementsByClassName('message')

//heart 
Array.from(heart).forEach(function (element) {
    element.addEventListener('click', function () {
        const tweet = this.parentNode.parentNode.childNodes[1].innerText
        const heart = parseFloat(this.parentNode.parentNode.childNodes[1].innerText)
        fetch('loves', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'tweet': tweet,
                'heart': heart
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                window.location.reload(true)
            })
    });
});

//retweet
Array.from(retweet).forEach(function (element) {
    element.addEventListener('click', function () {
        const tweet = this.parentNode.parentNode.childNodes[1].innerText
        const retweet = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        
        fetch('retweets', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'tweet': tweet,
                'retweet': retweet
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                window.location.reload(true)
            })
    });
});


// event listener for deleting when clicking trash can
Array.from(trash).forEach(function (element) {
    element.addEventListener('click', function () {
        const tweet = this.parentNode.parentNode.childNodes[1].innerText 
        fetch('tweets', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'tweet': tweet,
            })
        }).then(function (response) {
            window.location.reload()
        })
    });
});