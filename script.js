
        // Engineering fields data
    
        const engineeringFields = [
            {
                id: 1,
                name: "Computer Science & Engineering",
                icon: "💻",
                description: "Software development, AI, algorithms, and system design.",
                salary: "High",
                demand: "Very High",
                skills: "Programming, Logic, Creativity",
                future: "Excellent - AI & Tech boom",
                materials :  ["McGrawHill", "(https://www.mheducation.co.in/computer-science-engineering)"]
                 
            
            },
            {
                id: 2,
                name: "Mechanical Engineering",
                icon: "⚙️",
                description: "Design, manufacturing, robotics, and thermal systems.",
                salary: "Medium-High",
                demand: "High",
                skills: "Problem-solving, Physics, Design",
                future: "Strong - Automation & EV",
                materials: ["McGrawHill", "(https://www.mheducation.co.in/engineering/mechanical-engineering)"]
            },
            {
                id: 3,
                name: "Electrical & Electronics",
                icon: "⚡",
                description: "Circuits, power systems, embedded systems, and IoT.",
                salary: "High",
                demand: "High",
                skills: "Mathematics, Circuits, Innovation",
                future: "Excellent - Renewable Energy",
                materials: ["McGrawHill","(http://mheducation.co.in/engineering/electrical-engineering)"]
            },
            {
                id: 4,
                name: "Civil Engineering",
                icon: "🏗️",
                description: "Infrastructure, construction, urban planning.",
                salary: "Medium",
                demand: "Steady",
                skills: "Project management, Design, Geology",
                future: "Good - Smart Cities",
                materials: ["TestBook","(https://testbook.com/civil-engineering)"]
            },
            {
                id: 5,
                name: "Chemical Engineering",
                icon: "🧪",
                description: "Process engineering, materials, pharmaceuticals.",
                salary: "High",
                demand: "Medium-High",
                skills: "Chemistry, Analysis, Safety",
                future: "Strong - Sustainability",
                materials: ["McGrawHill",]
            },
            {
                id: 6,
                name: "Aerospace Engineering",
                icon: "✈️",
                description: "Aircraft, spacecraft, propulsion systems.",
                salary: "Very High",
                demand: "High",
                skills: "Aerodynamics, Physics, Precision",
                future: "Excellent - Space industry",
                materials: ["McGrawHill"]
            }
        ];

        // Render fields
        function renderFields() {
            const grid = document.getElementById('fields-grid');
            grid.innerHTML = '';
            
            engineeringFields.forEach(field => {
                const card = document.createElement('div');
                card.className = 'field-card';
                card.innerHTML = `
                    <div class="field-icon">${field.icon}</div>
                    <h3>${field.name}</h3>
                    <p>${field.description}</p>
                    <div class="field-meta">
                        <span>Salary: ${field.salary}</span>
                        <span>Demand: ${field.demand}</span>
                    </div>
                    <button onclick="showFieldDetail(${field.id})" class="btn-small">Learn More</button>
                `;
                grid.appendChild(card);
            });
        }

        // Simple quiz questions
        const quizQuestions = [
            {
                q: "What do you enjoy most?",
                options: [
                    {text: "Building and coding software", score: [1]},
                    {text: "Designing physical machines", score: [2]},
                    {text: "Working with electronics & circuits", score: [3]},
                    {text: "Building structures and cities", score: [4]},
                    {text: "Chemistry and processes", score: [5]},
                    {text: "Aircrafts and space technology", score: [6]}
                ]
            },
            {
                q: "Which skill are you strongest in?",
                options: [
                    {text: "Mathematics & Algorithms", score: [1,3]},
                    {text: "Physics & Mechanics", score: [2,6]},
                    {text: "Creative Design", score: [2,4]},
                    {text: "Problem Analysis", score: [1,5]}
                ]
            },
            {
                q: "What kind of future excites you?",
                options: [
                    {text: "AI, Tech Startups & Innovation", score: [1]},
                    {text: "Renewable Energy & Sustainability", score: [3,5]},
                    {text: "Space Exploration", score: [6]},
                    {text: "Infrastructure Development", score: [4]}
                ]
            }
        ];

        let currentQuestion = 0;
        let scores = {};

        function startQuiz() {
            currentQuestion = 0;
            scores = {};
            document.getElementById('quiz-container').classList.remove('hidden');
            document.getElementById('results').classList.add('hidden');
            renderQuestion();
        }

        function renderQuestion() {
            const container = document.getElementById('quiz-container');
            const q = quizQuestions[currentQuestion];
            
            let html = `
                <div class="question">
                    <h3>Question ${currentQuestion + 1} of ${quizQuestions.length}</h3>
                    <p>${q.q}</p>
                    <div class="options">
            `;
            
            q.options.forEach((option, index) => {
                html += `
                    <button onclick="selectAnswer(${index})" class="option-btn">
                        ${option.text}
                    </button>
                `;
            });
            
            html += `</div></div>`;
            container.innerHTML = html;
        }

        function selectAnswer(optionIndex) {
            const q = quizQuestions[currentQuestion];
            const selected = q.options[optionIndex];
            
            selected.score.forEach(fieldId => {
                scores[fieldId] = (scores[fieldId] || 0) + 1;
            });
            
            currentQuestion++;
            
            if (currentQuestion < quizQuestions.length) {
                renderQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            document.getElementById('quiz-container').classList.add('hidden');
            const resultsDiv = document.getElementById('results');
            resultsDiv.classList.remove('hidden');
            
            // Sort fields by score
            const sortedFields = Object.keys(scores)
                .sort((a,b) => scores[b] - scores[a])
                .map(id => engineeringFields.find(f => f.id == id))
                .filter(Boolean);
            
            let html = `<div class="recommendation-grid">`;
            
            sortedFields.slice(0, 3).forEach(field => {
                html += `
                    <div class="rec-card">
                        <div class="field-icon">${field.icon}</div>
                        <h4>${field.name}</h4>
                        <p>${field.future}</p>
                        <small>Match Score: ${scores[field.id] * 33}%</small>
                    </div>
                `;
            });
            
            html += `</div>`;
            document.getElementById('recommendations').innerHTML = html;
        }

        function restartQuiz() {
            startQuiz();
        }

    function showFieldDetail(id) {
            const field = engineeringFields.find(f => f.id === id);
            if (!field) return;
            
            alert(`
 _____________________________________
|                                     
|  ${field.name}                      
|_____________________________________

${field.description}


Expected Salary: ${field.salary}
-----------------

Market Demand: ${field.demand}
------------------

Key Skills: ${field.skills}
----------

Future Outlook: ${field.future}
-----------------

Study Materials:-
-----------------
${field.materials}

            `);
        }

        function compareFields() {
            const f1 = document.getElementById('field1').value;
            const f2 = document.getElementById('field2').value;
            
            if (!f1 || !f2) return;
            
            const field1 = engineeringFields.find(f => f.id == f1);
            const field2 = engineeringFields.find(f => f.id == f2);
            
            const result = document.getElementById('comparison-result');
            result.innerHTML = `
                <div class="compare-cards">
                    <div class="compare-card">
                        <h4>${field1.name}</h4>
                        <p><strong>Salary:</strong> ${field1.salary}</p>
                        <p><strong>Demand:</strong> ${field1.demand}</p>
                        <p><strong>Future:</strong> ${field1.future}</p>
                    </div>
                    <div class="compare-card">
                        <h4>${field2.name}</h4>
                        <p><strong>Salary:</strong> ${field2.salary}</p>
                        <p><strong>Demand:</strong> ${field2.demand}</p>
                        <p><strong>Future:</strong> ${field2.future}</p>
                    </div>
                </div>
            `;
        }

        // Populate select options
        function populateSelects() {
            const select1 = document.getElementById('field1');
            const select2 = document.getElementById('field2');
            
            engineeringFields.forEach(field => {
                const opt1 = document.createElement('option');
                opt1.value = field.id;
                opt1.textContent = field.name;
                select1.appendChild(opt1);
                
                const opt2 = document.createElement('option');
                opt2.value = field.id;
                opt2.textContent = field.name;
                select2.appendChild(opt2);
            });
        }

        // Initialize everything
        window.onload = function() {
            renderFields();
            populateSelects();
            // Auto start quiz hint
        };