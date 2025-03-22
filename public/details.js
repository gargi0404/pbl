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
                    arrestDate: '2024-02-15'
                },
                'Maithilii': {
                    type: 'Criminal',
                    status: 'Under Trial',
                    caseNumber: 'CR-2024-102',
                    crime: 'Money Laundering',
                    description: 'Involved in large-scale money laundering operation',
                    court: 'Economic Offences Court, Mumbai',
                    nextHearing: '2024-05-15',
                    bailStatus: 'Denied',
                    arrestDate: '2024-02-20'
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
                    arrestDate: '2024-02-25'
                },
                'Gaargii': {
                    type: 'Criminal',
                    status: 'Under Trial',
                    caseNumber: 'CR-2024-104',
                    crime: 'Cybercrime',
                    description: 'Accused of major banking system hack',
                    court: 'Cyber Crime Court, Mumbai',
                    nextHearing: '2024-05-25',
                    bailStatus: 'Under Review',
                    arrestDate: '2024-03-01'
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
                    arrestDate: '2024-03-05'
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
                    arrestDate: '2024-03-10'
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
                    caseStatus: 'Under Investigation'
                },
                'Maethilee': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-202',
                    incidentType: 'Physical Assault',
                    description: 'Victim of workplace violence',
                    compensation: 'Processing',
                    reportDate: '2024-02-15',
                    investigatingOfficer: 'Inspector Kumar',
                    caseStatus: 'Solved'
                },
                'Gargi': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-203',
                    incidentType: 'Identity Theft',
                    description: 'Victim of elaborate identity theft scheme',
                    compensation: 'Approved - ₹300,000',
                    reportDate: '2024-02-20',
                    investigatingOfficer: 'Inspector Singh',
                    caseStatus: 'Solved'
                },
                'Gargii': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-204',
                    incidentType: 'Domestic Violence',
                    description: 'Victim of repeated domestic abuse',
                    compensation: 'Pending Review',
                    reportDate: '2024-02-25',
                    investigatingOfficer: 'Inspector Sharma',
                    caseStatus: 'Under Investigation'
                },
                'Yamini': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-205',
                    incidentType: 'Property Crime',
                    description: 'Victim of organized home invasion',
                    compensation: 'Approved - ₹200,000',
                    reportDate: '2024-03-01',
                    investigatingOfficer: 'Inspector Verma',
                    caseStatus: 'Solved'
                },
                'Yaminii': {
                    type: 'Victim',
                    caseNumber: 'VC-2024-206',
                    incidentType: 'Financial Fraud',
                    description: 'Victim of credit card fraud ring',
                    compensation: 'Processing',
                    reportDate: '2024-03-05',
                    investigatingOfficer: 'Inspector Patel',
                    caseStatus: 'Under Investigation'
                }
            };

            const info = personInfo[person.name] || {
                type: 'Person of Interest',
                status: 'Under Investigation'
            };

            personDetails.innerHTML = `
                <div class="person-details-container">
                    <div class="person-image-container">
                        ${person.image_path ? 
                            `<img src="${person.image_path}" alt="${person.name}'s photo" class="person-photo">` : 
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