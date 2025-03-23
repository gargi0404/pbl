document.addEventListener('DOMContentLoaded', () => {
    const personDetails = document.getElementById('personDetails');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        personDetails.innerHTML = '<p class="error-message">No person ID provided.</p>';
        return;
    }

    async function loadPersonDetails() {
        try {
            const response = await fetch(`/api/persons/${id}`);
            const person = await response.json();

            if (!person) {
                personDetails.innerHTML = '<p class="error-message">Person not found.</p>';
                return;
            }

            // Debug information
            console.log('Person from database:', person);

            // Define person-specific information
            const personInfo = {
                // Criminals
                'Maithilee': {
                    type: 'Criminal',
                    status: 'In Custody',
                    caseNumber: 'CR-2024-101',
                    crime: 'Drug Trafficking',
                    description: 'Mastermind of international drug trafficking ring',
                    court: 'Mumbai Special Court',
                    nextHearing: '2024-05-10',
                    prisonCell: 'Block D, Cell 405',
                    arrestDate: '2024-02-15',
                    image_path: '/images/Maithilee.jpeg'
                },
                'Jui': {
                    type: 'Criminal',
                    status: 'In Custody',
                    caseNumber: 'CR-2024-107',
                    crime: 'Cybercrime',
                    description: 'Leader of international hacking syndicate',
                    court: 'Mumbai Cyber Court',
                    nextHearing: '2024-06-15',
                    prisonCell: 'Block A, Cell 201',
                    arrestDate: '2024-03-15',
                    image_path: '/images/Jui.jpeg'
                },
                'Juii': {
                    type: 'Criminal',
                    status: 'Under Trial',
                    caseNumber: 'CR-2024-108',
                    crime: 'Financial Fraud',
                    description: 'Orchestrated major investment scam',
                    court: 'Economic Offences Court, Mumbai',
                    nextHearing: '2024-06-20',
                    bailStatus: 'Under Review',
                    arrestDate: '2024-03-20',
                    image_path: '/images/juii.jpeg'
                },
                'Gargiii': {
                    type: 'Criminal',
                    status: 'In Custody',
                    caseNumber: 'CR-2024-103',
                    crime: 'Human Trafficking',
                    description: 'Key suspect in international human trafficking network',
                    court: 'Mumbai High Court',
                    nextHearing: '2024-05-20',
                    prisonCell: 'Block C, Cell 302',
                    arrestDate: '2024-02-25',
                    image_path: '/images/gaargi.jpeg'
                },
                'Gaargi': {
                    type: 'Criminal',
                    status: 'Under Trial',
                    caseNumber: 'CR-2024-104',
                    crime: 'Cybercrime',
                    description: 'Accused of major banking system hack',
                    court: 'Cyber Crime Court, Mumbai',
                    nextHearing: '2024-05-25',
                    bailStatus: 'Under Review',
                    arrestDate: '2024-03-01',
                    image_path: '/images/gaargii.jpeg'
                },
                'Yaamini': {
                    type: 'Criminal',
                    status: 'In Custody',
                    caseNumber: 'CR-2024-105',
                    crime: 'Armed Robbery',
                    description: 'Leader of organized bank robbery gang',
                    court: 'Mumbai Sessions Court',
                    nextHearing: '2024-06-01',
                    prisonCell: 'Block B, Cell 205',
                    arrestDate: '2024-03-05',
                    image_path: '/images/yaamini.jpeg'
                },
                'Yamminii': {
                    type: 'Criminal',
                    status: 'Under Trial',
                    caseNumber: 'CR-2024-106',
                    crime: 'Corporate Fraud',
                    description: 'Accused in major corporate embezzlement case',
                    court: 'Economic Offences Court, Mumbai',
                    nextHearing: '2024-06-05',
                    bailStatus: 'Granted with Conditions',
                    arrestDate: '2024-03-10',
                    image_path: '/images/yamminii.jpeg'
                },

                // Victims
                'Maithelee': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-201',
                    incidentType: 'Cyber Fraud',
                    description: 'Victim of major online investment fraud',
                    compensation: 'Approved - ₹500,000',
                    reportDate: '2024-02-10',
                    investigatingOfficer: 'Inspector Deshmukh',
                    caseStatus: 'Under Investigation',
                    image_path: '/images/maithelee.jpeg'
                },
                'Juui': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-207',
                    incidentType: 'Identity Theft',
                    description: 'Victim of sophisticated identity theft operation',
                    compensation: 'Processing - ₹400,000',
                    reportDate: '2024-03-15',
                    investigatingOfficer: 'Inspector Patil',
                    caseStatus: 'Under Investigation',
                    image_path: '/images/juui.jpeg'
                },
                'Jhui': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-208',
                    incidentType: 'Online Harassment',
                    description: 'Victim of severe cyberstalking case',
                    compensation: 'Approved - ₹250,000',
                    reportDate: '2024-03-20',
                    investigatingOfficer: 'Inspector Sharma',
                    caseStatus: 'Solved',
                    image_path: '/images/jhui.jpeg'
                },
                'Gargi': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-203',
                    incidentType: 'Identity Theft',
                    description: 'Victim of elaborate identity theft scheme',
                    compensation: 'Approved - ₹300,000',
                    reportDate: '2024-02-20',
                    investigatingOfficer: 'Inspector Singh',
                    caseStatus: 'Solved',
                    image_path: '/images/Gargi.jpeg'
                },
                'Gargii': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-204',
                    incidentType: 'Domestic Violence',
                    description: 'Victim of repeated domestic abuse',
                    compensation: 'Pending Review',
                    reportDate: '2024-02-25',
                    investigatingOfficer: 'Inspector Sharma',
                    caseStatus: 'Under Investigation',
                    image_path: '/images/gargii.jpeg'
                },
                'Yamini': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-205',
                    incidentType: 'Property Crime',
                    description: 'Victim of organized home invasion',
                    compensation: 'Approved - ₹200,000',
                    reportDate: '2024-03-01',
                    investigatingOfficer: 'Inspector Verma',
                    caseStatus: 'Solved',
                    image_path: '/images/Yamini.jpeg'
                },
                'Yaminii': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-206',
                    incidentType: 'Financial Fraud',
                    description: 'Victim of credit card fraud ring',
                    compensation: 'Processing',
                    reportDate: '2024-03-05',
                    investigatingOfficer: 'Inspector Patel',
                    caseStatus: 'Under Investigation',
                    image_path: '/images/yaminii.jpeg'
                },
                'Maithilii': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-209',
                    incidentType: 'Online Fraud',
                    description: 'Victim of online banking fraud',
                    compensation: 'Processing',
                    reportDate: '2024-03-25',
                    investigatingOfficer: 'Inspector Joshi',
                    caseStatus: 'Under Investigation',
                    image_path: '/images/maithilii.jpeg'
                },
                'Maethilee': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-210',
                    incidentType: 'Identity Theft',
                    description: 'Victim of social media identity theft',
                    compensation: 'Pending Review',
                    reportDate: '2024-03-30',
                    investigatingOfficer: 'Inspector Kulkarni',
                    caseStatus: 'Under Investigation',
                    image_path: '/images/maethilee.jpeg'
                }
            };

            const info = personInfo[person.name] || {
                type: 'Person of Interest',
                status: 'Under Investigation'
            };

            // Debug information
            console.log('Loading details for:', person.name);
            console.log('Person info:', info);
            console.log('Image path from personInfo:', info.image_path);
            console.log('Image path from database:', person.image_path);

            // Use image path from personInfo if available, otherwise use from database
            const imagePath = info.image_path || person.image_path;

            personDetails.innerHTML = `
                <div class="person-details-container">
                    <div class="person-image-container">
                        ${info && info.image_path ? 
                            `<img src="${info.image_path}" alt="${person.name}'s photo" class="person-photo" onerror="this.style.display='none'">` : 
                            '<div class="no-image">No Photo Available</div>'
                        }
                    </div>
                    <div class="person-info-container">
                        <h2>${person.name}</h2>
                        <div class="person-type ${info.type.toLowerCase()}">${info.type}</div>
                        
                        <!-- Basic Information -->
                        <div class="info-section">
                            <h3>Basic Information</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <label>Age:</label>
                                    <span>${person.age} years</span>
                                </div>
                                <div class="info-item">
                                    <label>Gender:</label>
                                    <span>${person.gender}</span>
                                </div>
                                <div class="info-item">
                                    <label>Phone:</label>
                                    <span>${person.phone}</span>
                                </div>
                                <div class="info-item">
                                    <label>Aadhaar Number:</label>
                                    <span>${person.aadhaar_number}</span>
                                </div>
                                <div class="info-item full-width">
                                    <label>Address:</label>
                                    <span>${person.address}</span>
                                </div>
                            </div>
                        </div>

                        ${info.type === 'Criminal' ? `
                        <!-- Criminal Information -->
                        <div class="info-section criminal-section">
                            <h3>Criminal Record</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <label>Status:</label>
                                    <span class="status-${info.status.toLowerCase().replace(/\s+/g, '-')}">${info.status}</span>
                                </div>
                                <div class="info-item">
                                    <label>Case Number:</label>
                                    <span>${info.caseNumber}</span>
                                </div>
                                <div class="info-item">
                                    <label>Crime Type:</label>
                                    <span>${info.crime}</span>
                                </div>
                                <div class="info-item">
                                    <label>Arrest Date:</label>
                                    <span>${info.arrestDate}</span>
                                </div>
                                <div class="info-item">
                                    <label>Court:</label>
                                    <span>${info.court}</span>
                                </div>
                                <div class="info-item">
                                    <label>Next Hearing:</label>
                                    <span>${info.nextHearing}</span>
                                </div>
                                ${info.prisonCell ? `
                                <div class="info-item">
                                    <label>Prison Cell:</label>
                                    <span>${info.prisonCell}</span>
                                </div>
                                ` : ''}
                                ${info.bailStatus ? `
                                <div class="info-item">
                                    <label>Bail Status:</label>
                                    <span>${info.bailStatus}</span>
                                </div>
                                ` : ''}
                                <div class="info-item full-width">
                                    <label>Case Description:</label>
                                    <span>${info.description}</span>
                                </div>
                            </div>
                        </div>
                        ` : info.type === 'Victim' ? `
                        <!-- Victim Information -->
                        <div class="info-section victim-section">
                            <h3>Incident Details</h3>
                            <div class="info-grid">
                                <div class="info-item">
                                    <label>Case Number:</label>
                                    <span>${info.caseNumber}</span>
                                </div>
                                <div class="info-item">
                                    <label>Incident Type:</label>
                                    <span>${info.incidentType}</span>
                                </div>
                                <div class="info-item">
                                    <label>Report Date:</label>
                                    <span>${info.reportDate}</span>
                                </div>
                                <div class="info-item">
                                    <label>Case Status:</label>
                                    <span>${info.caseStatus}</span>
                                </div>
                                <div class="info-item">
                                    <label>Investigating Officer:</label>
                                    <span>${info.investigatingOfficer}</span>
                                </div>
                                <div class="info-item">
                                    <label>Compensation Status:</label>
                                    <span>${info.compensation}</span>
                                </div>
                                <div class="info-item full-width">
                                    <label>Incident Description:</label>
                                    <span>${info.description}</span>
                                </div>
                            </div>
                        </div>
                        ` : ''}

                        <!-- Record Timeline -->
                        <div class="info-section">
                            <h3>Record Timeline</h3>
                            <div class="timeline">
                                <div class="timeline-item">
                                    <label>Created:</label>
                                    <span>${new Date(person.created_at).toLocaleString()}</span>
                                </div>
                                <div class="timeline-item">
                                    <label>Last Updated:</label>
                                    <span>${new Date(person.updated_at).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            personDetails.innerHTML = '<p class="error-message">Error loading person details. Please try again.</p>';
            console.error('Error:', error);
        }
    }

    loadPersonDetails();
}); 