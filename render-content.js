// render-content.js

function renderResearch() {
    const container = document.querySelector('#research .grid');
    container.innerHTML = researchData.papers.map(paper => `
        <div class="card p-6 rounded-lg cursor-pointer" onclick="showResearchDetail('${paper.title}')">
            <h3 class="text-xl font-semibold mb-4">${paper.title}</h3>
            <p class="text-gray-300 mb-4">${paper.abstract.substring(0, 150)}...</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${paper.keywords?.map(keyword => 
                    `<span class="px-2 py-1 bg-indigo-900 rounded-full text-sm">${keyword}</span>`
                ).join('')}
            </div>
            <div class="text-indigo-400">
                <span class="mr-4">${paper.status}</span>
                ${paper.impact ? `<span>Impact: ${paper.impact}</span>` : ''}
            </div>
        </div>
    `).join('');
}

function renderProjects() {
    const container = document.querySelector('#projects .grid');
    container.innerHTML = projectsData.applications.map(project => `
        <div class="card p-6 rounded-lg cursor-pointer" onclick="showProjectDetail('${project.title}')">
            <h3 class="text-xl font-semibold mb-4">${project.title}</h3>
            <p class="text-gray-300 mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.technologies.map(tech => 
                    `<span class="px-2 py-1 bg-indigo-900 rounded-full text-sm">${tech}</span>`
                ).join('')}
            </div>
            ${project.screenshot ? `
                <img src="${project.screenshot}" alt="${project.title}" class="w-full rounded-lg mb-4">
            ` : ''}
            ${project.github ? `
                <a href="${project.github}" target="_blank" class="text-indigo-400 hover:text-indigo-300">
                    View on GitHub <i class="fab fa-github ml-1"></i>
                </a>
            ` : ''}
        </div>
    `).join('');
}

function renderAchievements() {
    const container = document.querySelector('#achievements .grid');
    
    const academicHTML = achievementsData.academic.map(achievement => `
        <div class="card p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">${achievement.title}</h3>
            <p class="text-gray-300 mb-4">${achievement.description}</p>
            ${achievement.scores ? `
                <ul class="list-disc ml-4">
                    ${achievement.scores.map(score => `<li>${score}</li>`).join('')}
                </ul>
            ` : ''}
            <span class="text-indigo-400">${achievement.year || achievement.years}</span>
        </div>
    `).join('');

    const competitionsHTML = achievementsData.competitions.map(comp => `
        <div class="card p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">${comp.title}</h3>
            <div class="mb-4">
                <span class="text-indigo-400 font-semibold">${comp.achievement}</span>
                ${comp.rankings ? `
                    <ul class="mt-2">
                        ${comp.rankings.map(rank => `<li>${rank}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
            ${comp.additional ? `<p class="text-gray-300">${comp.additional}</p>` : ''}
        </div>
    `).join('');

    container.innerHTML = academicHTML + competitionsHTML;
}

function renderExperience() {
    const container = document.querySelector('#experience .grid');
    
    const experienceHTML = Object.entries(experienceData).map(([category, items]) => `
        <div class="card p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-6 capitalize">${category}</h3>
            ${items.map(item => `
                <div class="mb-4 pb-4 border-b border-gray-700">
                    <h4 class="font-semibold text-lg mb-2">${item.role}</h4>
                    ${item.organization ? `<p class="text-indigo-400 mb-2">${item.organization}</p>` : ''}
                    ${item.duration ? `<p class="text-gray-400 mb-2">${item.duration}</p>` : ''}
                    <p class="text-gray-300 mb-2">${item.description || ''}</p>
                    ${item.achievements ? `
                        <ul class="list-disc ml-4">
                            ${item.achievements.map(achievement => `
                                <li class="text-gray-300">${achievement}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    `).join('');

    container.innerHTML = experienceHTML;
}

// Initialize content
document.addEventListener('DOMContentLoaded', () => {
    renderResearch();
    renderProjects();
    renderAchievements();
    renderExperience();
});
