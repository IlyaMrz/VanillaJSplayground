const imgs = document.querySelector('.imgs');
const APIKEY = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';

let newPhotosData = [];

function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

function displayImgs() {
    newPhotosData.forEach(e =>{
        const aImg = document.createElement('a');
        setAttributes(aImg, {
            href: e.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAttributes(img, {
            src: e.urls.regular,
            alt: "# "
        })
        aImg.appendChild(img);
        imgs.appendChild(aImg);
    })
}

async function getPhotos() {
    try {
        const ph = await fetch(`https://api.unsplash.com/photos/?client_id=${APIKEY}&count=5`)
        newPhotosData = await ph.json()
        console.log(newPhotosData)
        displayImgs()
    } catch(err) {
        console.log(err)
    }
}
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        getPhotos()
    }
});

getPhotos();
