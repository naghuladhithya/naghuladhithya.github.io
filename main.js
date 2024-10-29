// main.js

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Section Management
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');
    
    // Close mobile menu if open
    document.getElementById('mobileMenu').classList.add('hidden');
    
    // Load content based on section
    switch(sectionId) {
        case 'research':
            renderResearch();
            break;
        case 'projects':
            renderProjects();
            break;
        case 'achievements':
            renderAchievements();
            break;
        case 'experience':
            renderExperience();
            break;
    }
}

// Research Section Rendering
function renderResearch() {
    const container = document.getElementById('research');
    container.innerHTML = `
        <h2 class="text-3xl font-bold mb-8 text-center">Research Papers</h2>
        <div class="grid md:grid-cols-2 gap-6">
            ${researchData.papers.map((paper, index) => `
                <div class="card bg-dark-card p-6 rounded-lg cursor-pointer" 
                     onclick="showResearchDetail('${index}')"
                     data-aos="fade-up"
                     data-aos-delay="${index * 100}">
                    <h3 class="text-xl font-bold mb-3">${paper.title}</h3>
                    <p class="text-gray-300 mb-4">${paper.abstract.substring(0, 150)}...</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${paper.keywords.map(keyword => 
                            `<span class="bg-indigo-900 px-2 py-1 rounded-full text-xs">${keyword}</span>`
                        ).join('')}
                    </div>
                    <div class="flex justify-between items-center text-indigo-400">
                        <span>${paper.status}</span>
                        <span>${paper.date}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Research Detail Modal
function showResearchDetail(index) {
    const paper = researchData.papers[index];
    const modal = document.getElementById('researchModal');
    const content = document.getElementById('researchModalContent');
    
    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">${paper.title}</h2>
        <div class="bg-dark-hover p-4 rounded-lg mb-6">
            <h3 class="font-semibold mb-2">Abstract</h3>
            <p class="text-gray-300">${paper.abstract}</p>
        </div>
        <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
                <h3 class="font-semibold mb-2">Details</h3>
                <ul class="space-y-2 text-gray-300">
                    <li><span class="text-indigo-400">Field:</span> ${paper.field}</li>
                    <li><span class="text-indigo-400">Status:</span> ${paper.status}</li>
                    <li><span class="text-indigo-400">Date:</span> ${paper.date}</li>
                    ${paper.journal ? `<li><span class="text-indigo-400">Journal:</span> ${paper.journal}</li>` : ''}
                    ${paper.conference ? `<li><span class="text-indigo-400">Conference:</span> ${paper.conference}</li>` : ''}
                </ul>
            </div>
            <div>
                <h3 class="font-semibold mb-2">Impact</h3>
                <p class="text-gray-300">${paper.impact}</p>
            </div>
        </div>
        ${paper.link ? `
            <a href="${paper.link}" target="_blank" 
               class="inline-block bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                View Paper
            </a>
        ` : ''}
    `;
    
    modal.style.display = 'block';
}

// Projects Section Rendering
function renderProjects() {
    const container = document.getElementById('projects');
    container.innerHTML = `
        <h2 class="text-3xl font-bold mb-8 text-center">Projects & Applications</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${projectsData.applications.map((project, index) => `
                <div class="card bg-dark-card p-6 rounded-lg cursor-pointer"
                     onclick="showProjectDetail('${index}')"
                     data-aos="fade-up"
                     data-aos-delay="${index * 100}">
                    <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                    <p class="text-gray-300 mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.technologies.map(tech => 
                            `<span class="bg-indigo-900 px-2 py-1 rounded-full text-xs">${tech}</span>`
                        ).join('')}
                    </div>
                    ${project.screenshots && project.screenshots[0] ? `
                        <img src="${project.screenshots[0]}" 
                             alt="${project.title}" 
                             class="w-full h-48 object-cover rounded-lg mb-4">
                    ` : ''}
                    <span class="text-indigo-400">${project.status || 'View Details →'}</span>
                </div>
            `).join('')}
        </div>
        
        <h2 class="text-3xl font-bold my-8 text-center">Startups & Initiatives</h2>
        <div class="grid md:grid-cols-2 gap-6">
            ${projectsData.startups.map((startup, index) => `
                <div class="card bg-dark-card p-6 rounded-lg"
                     data-aos="fade-up"
                     data-aos-delay="${index * 100}">
                    <h3 class="text-xl font-bold mb-3">${startup.title}</h3>
                    <p class="text-gray-300 mb-4">${startup.description}</p>
                    <ul class="space-y-2 text-gray-300">
                        ${startup.features.map(feature => 
                            `<li>• ${feature}</li>`
                        ).join('')}
                    </ul>
                    <span class="inline-block mt-4 text-indigo-400">${startup.status}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Project Detail Modal
function showProjectDetail(index) {
    const project = projectsData.applications[index];
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('projectModalContent');
    
    content.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">${project.title}</h2>
        <p class="text-gray-300 mb-6">${project.description}</p>
        
        <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
                <h3 class="font-semibold mb-2">Technologies Used</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => 
                        `<span class="bg-indigo-900 px-3 py-1 rounded-full">${tech}</span>`
                    ).join('')}
                </div>
            </div>
            <div>
                <h3 class="font-semibold mb-2">Features</h3>
                <ul class="space-y-2 text-gray-300">
                    ${project.features.map(feature => 
                        `<li>• ${feature}</li>`
                    ).join('')}
                </ul>
            </div>
        </div>
        
        ${project.screenshots ? `
            <h3 class="font-semibold mb-4">Screenshots</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                ${project.screenshots.map(screenshot => `
                    <img src="${screenshot}" 
                         alt="${project.title}" 
                         class="w-full rounded-lg gallery-image">
                `).join('')}
            </div>
        ` : ''}
        
        ${project.impact ? `
            <div class="bg-dark-hover p-4 rounded-lg mb-6">
                <h3 class="font-semibold mb-2">Impact</h3>
                <p class="text-gray-300">${project.impact}</p>
            </div>
        ` : ''}
        
        ${project.github ? `
            <a href="${project.github}" target="_blank" 
               class="inline-block bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                View on GitHub
            </a>
        ` : ''}
    `;
    
    modal.style.display = 'block';
}

// Achievement Section Rendering
function renderAchievements() {
    const container = document.getElementById('achievements');
    container.innerHTML = `
        <h2 class="text-3xl font-bold mb-8 text-center">Achievements & Awards</h2>
        
        <!-- Academic Achievements -->
        <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">Academic Excellence</h3>
            <div class="grid md:grid-cols-2 gap-6">
                ${achievementsData.academic.map((achievement, index) => `
                    <div class="card bg-dark-card p-6 rounded-lg"
                         data-aos="fade-up"
                         data-aos-delay="${index * 100}">
                        <h4 class="text-xl font-bold mb-3">${achievement.title}</h4>
                        <p class="text-gray-300 mb-4">${achievement.description}</p>
                        ${achievement.scores ? `
                            <ul class="list-disc ml-4 text-gray-300">
                                ${achievement.scores.map(score => 
                                    `<li>${score}</li>`
                                ).join('')}
                            </ul>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Competitions -->
        <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">Competitions</h3>
            <div class="grid md:grid-cols-2 gap-6">
                ${achievementsData.competitions.map((comp, index) => `
                    <div class="card bg-dark-card p-6 rounded-lg"
                         data-aos="fade-up"
                         data-aos-delay="${index * 100}">
                        <h4 class="text-xl font-bold mb-3">${comp.title}</h4>
                        <p class="text-indigo-400 font-semibold mb-2">${comp.achievement}</p>
                        ${comp.rankings ? `
                            <ul class="text-gray-300 mb-2">
                                ${comp.rankings.map(rank => 
                                    `<li>${rank}</li>`
                                ).join('')}
                            </ul>
                        ` : ''}
                        ${comp.additional ? `
                            <p class="text-gray-300">${comp.additional}</p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Hackathons -->
        <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6">Hackathon Achievements</h3>
            <div class="bg-dark-card p-6 rounded-lg mb-6"
                 data-aos="fade-up">
                <div class="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                        <div class="text-3xl font-bold text-indigo-400">${achievementsData.hackathons.total}</div>
                        <div class="text-gray-300">Total Participations</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-indigo-400">${achievementsData.hackathons.wins}</div>
                        <div class="text-gray-300">Wins</div>
                    </div>
                    <div>
                        <div class="text-3xl font-bold text-indigo-400">${achievementsData.hackathons.finals}</div>
                        <div class="text-gray-300">Finals</div>
                    </div>
                </div>
                
                <h4 class="text-xl font-bold mb-4">Notable Achievements</h4>
                <div class="grid md:grid-cols-2 gap-4">
                    ${achievementsData.hackathons.notable.map(hack => `
                        <div class="bg-dark-hover p-4 rounded-lg">
                            <h5 class="font-semibold mb-2">${hack.name}</h5>
                            <p class="text-gray-300 mb-2">${hack.project}</p>
                            <span class="text-indigo-400">${hack.achievement}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}


// main.js - Experience Section and Modal Functions

function renderExperience() {
    const container = document.getElementById('experience');
    container.innerHTML = `
        <h2 class="text-3xl font-bold mb-8 text-center animate__animated animate__fadeIn">Professional Experience</h2>
        
        <!-- Research Positions -->
        <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6 text-indigo-400">Research Positions</h3>
            <div class="grid md:grid-cols-2 gap-6">
                ${experienceData.research.map((exp, index) => `
                    <div class="card bg-dark-card p-6 rounded-lg hover:bg-dark-hover transition-all duration-300"
                         data-aos="fade-up"
                         data-aos-delay="${index * 100}">
                        <div class="flex items-start justify-between">
                            <h4 class="text-xl font-bold mb-2">${exp.role}</h4>
                            <span class="text-sm bg-indigo-900 px-3 py-1 rounded-full">${exp.duration}</span>
                        </div>
                        <p class="text-indigo-400 mb-2">${exp.organization}</p>
                        <p class="text-gray-300 mb-4">${exp.description}</p>
                        <ul class="space-y-2 text-gray-300">
                            ${exp.achievements.map(achievement => `
                                <li class="flex items-start space-x-2">
                                    <span class="text-indigo-400 mt-1">•</span>
                                    <span>${achievement}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Internships -->
        <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6 text-indigo-400">Internships</h3>
            <div class="grid md:grid-cols-2 gap-6">
                ${experienceData.internships.map((intern, index) => `
                    <div class="card bg-dark-card p-6 rounded-lg hover:bg-dark-hover transition-all duration-300"
                         data-aos="fade-up"
                         data-aos-delay="${index * 100}">
                        <div class="flex items-start justify-between">
                            <h4 class="text-xl font-bold mb-2">${intern.role}</h4>
                            <span class="text-sm bg-indigo-900 px-3 py-1 rounded-full">${intern.duration}</span>
                        </div>
                        <p class="text-indigo-400 mb-2">${intern.organization}</p>
                        <p class="text-gray-300 mb-4">${intern.description}</p>
                        <div class="space-y-2">
                            ${intern.projects ? `
                                <h5 class="font-semibold mb-2">Key Projects:</h5>
                                <ul class="text-gray-300 space-y-2">
                                    ${intern.projects.map(project => `
                                        <li class="flex items-start space-x-2">
                                            <span class="text-indigo-400 mt-1">•</span>
                                            <span>${project}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                            ${intern.achievements ? `
                                <h5 class="font-semibold mb-2 mt-4">Achievements:</h5>
                                <ul class="text-gray-300 space-y-2">
                                    ${intern.achievements.map(achievement => `
                                        <li class="flex items-start space-x-2">
                                            <span class="text-indigo-400 mt-1">•</span>
                                            <span>${achievement}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Leadership -->
        <div class="mb-12">
            <h3 class="text-2xl font-bold mb-6 text-indigo-400">Leadership Roles</h3>
            <div class="grid md:grid-cols-2 gap-6">
                ${experienceData.leadership.map((role, index) => `
                    <div class="card bg-dark-card p-6 rounded-lg hover:bg-dark-hover transition-all duration-300"
                         data-aos="fade-up"
                         data-aos-delay="${index * 100}">
                        <div class="flex items-start justify-between">
                            <h4 class="text-xl font-bold mb-2">${role.role}</h4>
                            <span class="text-sm bg-indigo-900 px-3 py-1 rounded-full">${role.duration}</span>
                        </div>
                        ${role.organization ? `
                            <p class="text-indigo-400 mb-4">${role.organization}</p>
                        ` : ''}
                        <ul class="space-y-2 text-gray-300">
                            ${role.responsibilities ? role.responsibilities.map(resp => `
                                <li class="flex items-start space-x-2">
                                    <span class="text-indigo-400 mt-1">•</span>
                                    <span>${resp}</span>
                                </li>
                            `).join('') : ''}
                            ${role.achievements ? role.achievements.map(achievement => `
                                <li class="flex items-start space-x-2">
                                    <span class="text-indigo-400 mt-1">•</span>
                                    <span>${achievement}</span>
                                </li>
                            `).join('') : ''}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Volunteer Work -->
        <div>
            <h3 class="text-2xl font-bold mb-6 text-indigo-400">Volunteer Experience</h3>
            <div class="grid md:grid-cols-2 gap-6">
                ${experienceData.volunteer.map((vol, index) => `
                    <div class="card bg-dark-card p-6 rounded-lg hover:bg-dark-hover transition-all duration-300"
                         data-aos="fade-up"
                         data-aos-delay="${index * 100}">
                        <div class="flex items-start justify-between">
                            <h4 class="text-xl font-bold mb-2">${vol.role}</h4>
                            ${vol.duration ? `
                                <span class="text-sm bg-indigo-900 px-3 py-1 rounded-full">${vol.duration}</span>
                            ` : ''}
                        </div>
                        <p class="text-indigo-400 mb-4">${vol.organization}</p>
                        <ul class="space-y-2 text-gray-300">
                            ${vol.achievements.map(achievement => `
                                <li class="flex items-start space-x-2">
                                    <span class="text-indigo-400 mt-1">•</span>
                                    <span>${achievement}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Re-initialize AOS for newly added elements
    AOS.refresh();
}

// Modal Functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Initialize first section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('about');
    
    // Add escape key listener for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
});
