document.addEventListener('DOMContentLoaded', () => {
    const personDetails = document.getElementById('personDetails');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        personDetails.innerHTML = '<p>No person ID provided.</p>';
        return;
    }

    async function loadPersonDetails() {
        try {
            const response = await fetch(`/api/persons/${id}`);
            const person = await response.json();

            if (!person) {
                personDetails.innerHTML = '<p>Person not found.</p>';
                return;
            }

            personDetails.innerHTML = `
                <div class="person-info">
                    ${person.image_path ? `<img src="${person.image_path}" alt="${person.name}'s photo">` : ''}
                    <h3>${person.name}</h3>
                    <p><strong>Age:</strong> ${person.age}</p>
                    <p><strong>Gender:</strong> ${person.gender}</p>
                    <p><strong>Address:</strong> ${person.address}</p>
                    <p><strong>Phone:</strong> ${person.phone}</p>
                    <p><strong>Aadhaar Number:</strong> ${person.aadhaar_number}</p>
                    <p><strong>Last Updated:</strong> ${new Date(person.updated_at).toLocaleString()}</p>
                </div>
            `;
        } catch (error) {
            personDetails.innerHTML = '<p>Error loading person details. Please try again.</p>';
            console.error('Error:', error);
        }
    }

    loadPersonDetails();
}); 