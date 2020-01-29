fetch("https://randomuser.me/api/?nat=us&results=12")
.then(response => response.json())
.then(data => generateProfiles(data.results))

 let profiles;
 generateProfiles = (data) => {
     profiles = data.map(profile => {
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

     document.querySelector('#gallery').innerHTML += profileHtml;
     document.querySelectorAll('.card').forEach(card => {
       card.addEventListener('click', function(){
         const clickedUserEmail = this.childNodes[3].childNodes[3].innerText;

         data.forEach(profile => {
           if(clickedUserEmail === profile.email){
             const modalDiv = document.createElement('div')
             modalDiv.className = 'modal-container'

             const modalHTML = `
                 <div class="modal">
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
