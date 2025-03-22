document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = document.getElementById('searchQuery').value;

        try {
            const response = await fetch(`/api/persons/search?query=${encodeURIComponent(query)}`);
            const results = await response.json();

            resultsDiv.innerHTML = '';
            
            if (results.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
                return;
            }

            results.forEach(person => {
                const resultCard = document.createElement('div');
                resultCard.className = 'result-card';
                resultCard.innerHTML = `
                    <div class="result-content">
                        <div class="person-image">
                            ${person.image_path ? 
                                `<img src="${person.image_path}" alt="${person.name}'s photo">` : 
                                '<div class="no-image">No Photo Available</div>'
                            }
                        </div>
                        <div class="person-info">
                            <h3>${person.name}</h3>
                            <p>Age: ${person.age}</p>
                            <p>Gender: ${person.gender}</p>
                            <p>Address: ${person.address}</p>
                            <p>Phone: ${person.phone}</p>
                            <p>Aadhaar Number: ${person.aadhaar_number}</p>
                            <a href="/details?id=${person.id}" class="view-details">View Details</a>
                        </div>
                    </div>
                `;
                resultsDiv.appendChild(resultCard);
            });
        } catch (error) {
            resultsDiv.innerHTML = '<p>Error searching records. Please try again.</p>';
            console.error('Error:', error);
        }
    });
}); 