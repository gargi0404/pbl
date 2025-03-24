document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');

    // Define person-specific information (same as in details.js)
    const personInfo = {
        // Criminals
        'Maithilee': {
            type: 'Criminal',
            image_path: '/images/Maithilee.jpeg'
        },
        'Jui': {
            type: 'Criminal',
            image_path: '/images/Jui.jpeg'
        },
        'Juii': {
            type: 'Criminal',
            image_path: '/images/juii.jpeg'
        },
        'Gargiii': {
            type: 'Criminal',
            image_path: '/images/gaargi.jpeg'
        },
        'Gaargi': {
            type: 'Criminal',
            image_path: '/images/gaargii.jpeg'
        },
        'Yaamini': {
            type: 'Criminal',
            image_path: '/images/yaamini.jpeg'
        },
        'Yamminii': {
            type: 'Criminal',
            image_path: '/images/yamminii.jpeg'
        },
        // Victims
        'Maithelee': {
            type: 'Victim',
            image_path: '/images/maithelee.jpeg'
        },
        'Juui': {
            type: 'Victim',
            image_path: '/images/juui.jpeg'
        },
        'Jhui': {
            type: 'Victim',
            image_path: '/images/jhui.jpeg'
        },
        'Gargi': {
            type: 'Victim',
            image_path: '/images/Gargi.jpeg'
        },
        'Gargii': {
            type: 'Victim',
            image_path: '/images/gargii.jpeg'
        },
        'Yamini': {
            type: 'Victim',
            image_path: '/images/Yamini.jpeg'
        },
        'Yaminii': {
            type: 'Victim',
            image_path: '/images/yaminii.jpeg'
        },
        'Maithilii': {
            type: 'Victim',
            image_path: '/images/maithilii.jpeg'
        },
        'Maethilee': {
            type: 'Victim',
            image_path: '/images/maethilee.jpeg'
        }
    };

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
                // Get person info from our mapping
                const info = personInfo[person.name] || {};
                const imagePath = info.image_path;

                const resultCard = document.createElement('div');
                resultCard.className = 'result-card';
                resultCard.innerHTML = `
                    <div class="result-content">
                        <div class="person-image">
                            ${imagePath ? 
                                `<img src="${imagePath}" alt="${person.name}'s photo" onerror="this.src='/images/${person.name}.jpeg'">` : 
                                '<div class="no-image">No Photo Available</div>'
                            }
                        </div>
                        <div class="person-info">
                            <h3>${person.name}</h3>
                            <div class="person-type ${(info.type || '').toLowerCase()}">${info.type || 'Person'}</div>
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