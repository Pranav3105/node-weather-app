const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const place = document.querySelector('#place')
const summary = document.querySelector('#summary')
const temperature = document.querySelector('#temp')
const precip = document.querySelector('#precip')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    document.getElementById('details').style.visibility = 'visible'
    place.textContent = 'Loading..'
    summary.textContent = ''
    temperature.textContent = ''
    precip.textContent = ''
    const location = search.value
    fetch('/weather?address=' + location).then(res => {
        res.json().then((data) => {
            if (data.error) {
                return place.textContent = 'Error: ' + data.error;
            }
            place.textContent = 'Place: ' + data.place;
            summary.textContent = 'Summary: ' + data.summary
            temperature.textContent = 'Temperature: ' + data.temperature;
            precip.textContent = 'Precipitation Probability: ' + data.precipitation
        })
    })
})