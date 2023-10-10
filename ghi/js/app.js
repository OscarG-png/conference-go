function createCard(name, description, pictureUrl, locationName, starts, ends) {
    return `
        <div class="card">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
                <p class="card-text">${description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${starts} - ${ends}</li>
            </ul>
        </div>
    `;
}
function displayAlert(message) {
    return `
    <div class="alert alert-primary" role="alert">
    ${message}
    </div>
    `;
}
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
        const alert = displayAlert("Response failed");
        } else {
        const data = await response.json();

        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const starts = new Date(details.conference.starts);
                const ends = new Date(details.conference.ends);
                const newStarts = `${starts.getMonth() + 1}/${starts.getDate()}/${starts.getFullYear()}`
                const newEnds = `${ends.getMonth() + 1}/${ends.getDate()}/${ends.getFullYear()}`
                const locationName = details.conference.location.name;
                const html = createCard(title, description, pictureUrl, locationName, newStarts, newEnds);
                const column = document.querySelector('.col');
                column.innerHTML += html;
            }
        }
        }
    } catch (e) {
        console.error(e);
        const alert = displayAlert(e);
    }

});
