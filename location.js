const form = document.getElementById('zipform');

form.addEventListener('submit', getUsLocation);

function getUsLocation(e) {

    const zipValue = document.querySelector('.zip-value').value;

    fetch(`https://api.zippopotam.us/us/${zipValue}`)
        .then(Response => {
            if (Response.status != 200) {

                document.getElementById('output').innerHTML =
                    `
                        <section class="message message-body has-text-white">
                           Zipcode is not valid,Try again!!!.
                            <span class="icon is-small">
                               <i class="fa fa-frown-o"></i>
                            </span>
                           <button class="delete cancel is-small pr-0"></button>
                        </section>
                    `;
                document.querySelector('.remove').style.display = 'inline-flex';
                throw Error(Response.statusText);

            } else {

                return Response.json();
            }
        })
        .then(data => {
            let output = '';

            data.places.forEach(place => {
                output += `
                    <article class="notification  has-background-grey-dark has-text-white">
                        <p class="has-text-centered is-capitalized has-text-weight-bold">location info</p>
                        <button class="delete is-right"></button>
                        <div class="has-text-centered has-text-white">
                            <ul>
                                <li><strong>Country: </strong>United states</li
                                <li><strong>City: </strong>${place['place name']}</li>
                                <li><strong>State: </strong>${place['state']}</li>
                                <li><strong>Longitude: </strong>${place['longitude']}</li>
                                <li><strong>Latitude: </strong>${place['latitude']}</li>
                                <li><strong>State abbreviation: </strong>${place['state abbreviation']}</li>
                            </ul>
                         </div>
                    </article>                                          
                `
            });
            document.querySelector('.check').style.display = 'inline-flex';
            document.getElementById('output').innerHTML = output;
        }).catch(err => {
            //console.log(err);
            document.getElementById('output').innerHTML =
                `<p class="has-text-centered is-capitalized has-text-weight-bold has-text-danger is-size-5">something went wrong,
                   kindly check your connection. <span><i class="fa fa-chain-broken"></i></span>
                </p>
                `;
        })
    e.preventDefault();
}


function showIcons(icon) {

    document.querySelector('.check').style.display = 'none';
    document.querySelector('.remove').style.display = 'none';
}


document.querySelector('body').addEventListener('click', removeLocation);

function removeLocation(e) {
    if (e.target.classList.contains('delete')) {
        document.querySelector('.notification').remove();
        document.querySelector('.zip-value').value = '';
        document.querySelector('.check').remove();
    }

}


document.querySelector('body').addEventListener('click', cancelInvalid);

function cancelInvalid(e) {
    if (e.target.classList.contains('cancel')) {
        document.querySelector('.message').remove();
        document.querySelector('.zip-value').value = '';
        document.querySelector('.remove').remove();
    }

}