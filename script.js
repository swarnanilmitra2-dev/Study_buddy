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




// const API_KEY = "";

async function generateRoadmap() {

    const domain = document.getElementById("domain").value;
    const timeline = document.getElementById("timeline").value;
    const output = document.getElementById("output");

    output.innerHTML = "Generating AI Roadmap...";

    const prompt = `
Create a detailed roadmap for learning ${domain} in ${timeline}.

Include:
1. Week-wise timeline
2. Topics to learn
3. Free study materials
4. YouTube channels[link]
5. Practice projects
6. Interview preparation
7.WS3 School Material

Format nicely with headings and bullet points.
`;

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if (data.choices && data.choices.length > 0) {

            output.innerHTML =
                data.choices[0].message.content
                .replace(/\n/g, "<br>");

        } else {

            output.innerHTML =
                "Failed to generate roadmap.<br><pre>" +
                JSON.stringify(data, null, 2) +
                "</pre>";

        }

    } catch (error) {

        console.error(error);
        output.innerHTML = "Network Error";

    }
}

