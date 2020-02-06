
document.querySelector('#gallery').innerText = 'Data loading.....';

//Requesting a random urers from the random user api using a get fetch request.

fetch("https://randomuser.me/api/?nat=us&results=12")
.then(response => {
  if(response.ok){
    return response
  } else {
    console.log(response.status);
    let err = 'not working'
    let error = new Error(err)
    throw(error)
  }
})
.then(response => response.json())
.then(data => generateProfiles(data.results))
.catch(error => { console.error(error)});


/**
* This function render all the cards onto the browser
* @param {array} data - Array of employee info
* @return nothing
**/

 generateProfiles = (data) => {
   document.querySelector('#gallery').innerText = '';
     profiles = data.map(profile => {

    // create each employee card
     var profileHtml = `<div class="card">
     <div class="card-img-container">
     <img class="card-img" src="${profile.picture.large}" alt="profile picture">
     </div>
     <div class="card-info-container">
     <h3 id="name" class="card-name cap">${profile.name.first} ${profile.name.last}</h3>
     <p class="card-text">${profile.email}</p>
     <p class="card-text cap">${profile.location.city}, ${profile.location.state}</p>
     </div>
     </div>`;

     // add each employee card to the browser
     document.querySelector('#gallery').innerHTML += profileHtml;

     //add a click eventlistener to each card to get added to the DOM
     document.querySelectorAll('.card').forEach(card => {
       card.addEventListener('click', function(){

    // retreive email from the clicked employee card
         const clickedUserEmail = this.childNodes[3].childNodes[3].innerText;

         data.forEach(profile => {
    // itirate over the employee data array, find the click employee card profile in the array
    // render modal
           if(clickedUserEmail === profile.email){
             const modalDiv = document.createElement('div')
             modalDiv.className = 'modal-container'

             const modalHTML =  generateModal(profile)

             modalDiv.innerHTML = modalHTML;
             const body = document.querySelector('body');
             const script = document.querySelector('script');
             body.insertBefore(modalDiv, script);
             document.querySelector('#modal-close-btn').addEventListener('click', () => {
               document.querySelector('.modal-container').remove()
            })
           }
         })
       })
     })
   })
 };

 const search = document.querySelector('.search-container')

 /**
 * This function displays the search bar
 * @return {html}
 **/
// search function not fully functional but will be soon updated
 generateSearch = () => {
   return  `<form action="#" method="get">
             <input type="search" id="search-input" class="search-input" placeholder="Search...">
             <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
            </form>`
 }

 search.innerHTML = generateSearch();

 /**
 * This function render the modal for the employee card when clicked
 * @param {object} profile - employee of object
 * @return {html}
 **/

 generateModal = (profile) => {
  return `<div class="modal">
             <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
             <div class="modal-info-container">
                 <img class="modal-img" src="${profile.picture.large}" alt="profile picture">
                 <h3 id="name" class="modal-name cap">${profile.name.first} ${profile.name.last}</h3>
                 <p class="modal-text">${profile.email}</p>
                 <p class="modal-text cap">${profile.location.city}</p>
                 <hr>
                 <p class="modal-text">${profile.cell}</p>
                 <p class="modal-text">${profile.location.street.number} ${profile.location.street.name}, ${profile.location.city}, ${profile.location.state} ${profile.location.postcode}</p>
                 <p class="modal-text">Birthday: ${new Date(profile.dob.date).getMonth()}/${new Date(profile.dob.date).getDay()}/${new Date(profile.dob.date).getFullYear()}</p>
             </div>
         </div>`
 }
