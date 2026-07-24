const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.getElementById('primary-navigation');

if (menuToggle && navPanel) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navPanel.classList.toggle('is-open');
        menuToggle.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-links a, .nav-cta').forEach((link) => {
        link.addEventListener('click', () => {
            navPanel.classList.remove('is-open');
            menuToggle.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function generateRoadmap() {
    const domain = document.getElementById('domain')?.value || 'Web Development';
    const timeline = document.getElementById('timeline')?.value || '1 Month';
    const output = document.getElementById('output');

    if (output) {
        output.innerHTML = `
            <div class="roadmap-card">
                <h3>${domain}</h3>
                <p><strong>Timeline:</strong> ${timeline}</p>
                <ul>
                    <li>Learn the core fundamentals first.</li>
                    <li>Build a small project to practice daily.</li>
                    <li>Review, debug, and improve your work weekly.</li>
                </ul>
            </div>
        `;
    }
}
