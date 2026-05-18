function saveMetadata() {
    localStorage.setItem('math_schoolName', document.getElementById("schoolInput").value);
    localStorage.setItem('math_teacherName', document.getElementById("teacherInput").value);
    localStorage.setItem('math_modelLetter', document.getElementById("modelSelector").value);
}

function loadMetadata() {
    if(localStorage.getItem('math_schoolName')) document.getElementById("schoolInput").value = localStorage.getItem('math_schoolName');
    if(localStorage.getItem('math_teacherName')) document.getElementById("teacherInput").value = localStorage.getItem('math_teacherName');
    if(localStorage.getItem('math_modelLetter')) document.getElementById("modelSelector").value = localStorage.getItem('math_modelLetter');
}

// إغلاق ثغرة تجميد القوائم وتوحيد قراءة الكائن التراكمي الشامل للمناهج
function populateLessons() {
    const grade = document.getElementById("gradeSelector").value;
    const lessonSelect = document.getElementById("lessonSelector");
    if (!lessonSelect) return;
    
    lessonSelect.innerHTML = "";
    
    // فحص شامل وتأمين الاتصال بالمستودع
    if (window.curriculumRepository && window.curriculumRepository[grade]) {
        const gradeData = window.curriculumRepository[grade];
        
        if (gradeData.units && Array.isArray(gradeData.units)) {
            gradeData.units.forEach(unit => {
                const optGroup = document.createElement("optgroup");
                optGroup.label = unit.unitName;
                
                unit.items.forEach(item => {
                    const opt = document.createElement("option");
                    opt.value = item.id;
                    opt.text = (item.type.includes("diag") ? "🔍 " : item.type.includes("review") ? "🏆 " : "📝 ") + item.title;
                    optGroup.appendChild(opt);
                });
                lessonSelect.appendChild(optGroup);
            });
        }
    }
}

function toggleBeautyTheme() {
    const sheet = document.getElementById("sheetOutput");
    if (sheet) sheet.classList.toggle("enhanced-beauty");
}

function removeQuestion(btn) {
    const block = btn.closest('.question-block');
    if (block) {
        block.remove();
        renumberQuestions();
    }
}

function renumberQuestions() {
    const titles = document.querySelectorAll('#sheetBody .question-title-text');
    titles.forEach((title, idx) => {
        title.innerText = `السؤال ${toEasternArabicDigits(idx + 1)}:`;
    });
}

function generateWorksheet() {
    creativityActive = false;
    const gradeKey = document.getElementById("gradeSelector").value;
    const lessonId = document.getElementById("lessonSelector").value;
    const schoolName = document.getElementById("schoolInput").value;
    const teacherName = document.getElementById("teacherInput").value;
    const modelLetter = document.getElementById("modelSelector").value;
    
    let rawCount = document.getElementById("countInput").value;
    let parsedCount = parseInt(fromEasternArabicDigits(rawCount));
    let questionsCount = isNaN(parsedCount) ? 5 : parsedCount;
    
    const levelMode = document.getElementById("levelSelector").value;
    
    if (!window.curriculumRepository || !window.curriculumRepository[gradeKey]) return;
    
    const gradeData = window.curriculumRepository[gradeKey];
    let lessonObj = null;
    
    if (gradeData.units && Array.isArray(gradeData.units)) {
        for (let unit of gradeData.units) {
            lessonObj = unit.items.find(i => i.id === lessonId);
            if (lessonObj) break;
        }
    }
    
    if (!lessonObj) return;
    
    document.title = "ورقة عمل - " + lessonObj.title;

    document.getElementById("outSchool").innerText = "مدرسة: " + schoolName;
    document.getElementById("outTeacher").innerText = "المعلم: " + teacherName;
    document.getElementById("outGrade").innerText = "الصف: " + gradeData.name;
    document.getElementById("outDirectorate").innerText = gradeData.directorate;
    document.getElementById("outModel").innerText = "نموذج: " + modelLetter;
    document.getElementById("outLessonTitle").innerText = lessonObj.title;
    
    const baseSeed = lessonId + "_" + modelLetter + "_" + Math.floor(Math.random() * 1000) + "_";
    
    let htmlHTML = "";
    for (let q = 1; q <= questionsCount; q++) {
        htmlHTML += buildAlgorithmicQuestion(q, lessonObj, baseSeed + q, levelMode);
    }
    
    document.getElementById("sheetBody").innerHTML = htmlHTML;
    document.getElementById("sheetOutput").style.display = "block";
}

function injectTeacherCustomIdea() {
    const rawIdea = document.getElementById("teacherCustomIdeaInput").value.trim();
    if (!rawIdea) return;
    
    const formattedIdea = toEasternArabicDigits(escapeHTML(rawIdea));
    const bodyContainer = document.getElementById("sheetBody");
    
    if (!bodyContainer.innerHTML) generateWorksheet();

    const currentIdx = document.querySelectorAll('#sheetBody .question-block').length + 1;
    const qBlock = document.createElement("div");
    qBlock.className = "question-block";
    
    qBlock.innerHTML = `
        <div class="question-title">
            <span class="question-title-text">السؤال ${toEasternArabicDigits(currentIdx)}:</span>
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body">
            <b>فِكْرَةُ مُعَلِّمٍ مُنْفَذَةٌ:</b> ${formattedIdea}
            <div class="custom-writing-area">الإِجَابَةُ...:<br>........................................................................................................................................</div>
        </div>
    `;

    bodyContainer.appendChild(qBlock);
    renumberQuestions();
    document.getElementById("teacherCustomIdeaInput").value = ""; 
}

function activateCreativityMode() {
    if (!document.getElementById("sheetBody").innerHTML) return;
    creativityActive = true;
    
    const blocks = document.querySelectorAll('#sheetBody .question-block');
    blocks.forEach((block, idx) => {
        if (block.querySelector('.creative-addition')) return;
        const creativePrompt = document.createElement("div");
        creativePrompt.className = "creative-addition";
        creativePrompt.innerText = "🎨 ارسُمْ رَسْمَةً صَغِيرَةً بَيَانِيَّةً تُعَبِّرُ عَنْ حَلِّكَ الذَّكِيِّ السَّلِيمِ.";
        block.appendChild(creativePrompt);
    });

    if (!document.getElementById("masterCreativeBox")) {
        const masterBox = document.createElement("div");
        masterBox.id = "masterCreativeBox";
        masterBox.className = "creative-box";
        masterBox.innerHTML = `
            <div class="creative-box-title">🏆 صُنْدُوقُ العَبَاقِرَةِ الأذْكِيَاءِ (مَشْرُوعُ زَيْتُونَةَ التَّكَيُّفِيِّ)</div>
            <div style="font-size:13pt; line-height:2; color:#000;">
                فَكِّرْ ثُمَّ تَخَيَّلْ: كَيْفَ تُسَاعِدُ صَدِيقَكَ بِرَسْمَةٍ مُبَسَّطَةٍ لِيَفْهَمَ هَذَا الدَّرسَ تَمَاماً؟
                <br><br>[ ........................................................................................................................................ ]
            </div>
        `;
        document.getElementById("sheetBody").appendChild(masterBox);
    }
}

function injectInnovativeQuestion() {
    const gradeKey = document.getElementById("gradeSelector").value;
    const lessonId = document.getElementById("lessonSelector").value;
    const bodyContainer = document.getElementById("sheetBody");
    if (!window.curriculumRepository || !window.curriculumRepository[gradeKey]) return;
    
    if (!bodyContainer.innerHTML) generateWorksheet();

    const currentIdx = document.querySelectorAll('#sheetBody .question-block').length + 1;
    const qBlock = document.createElement("div");
    qBlock.className = "question-block";
    qBlock.innerHTML = `
        <div class="question-title">
            <span class="question-title-text">السؤال ${toEasternArabicDigits(currentIdx)}:</span>
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body"><b>تَحَدٍّ إِبْدَاعِيٌّ فُجَائِيٌّ:</b> اكْتُبْ عَدَدًا مَفْقُودًا فِي الفَرَاغِ لِتَكُونَ الجُمْلَةُ الرِّيَاضِيَّةُ صَحِيحَةً تَمَامًا.</div>
    `;
    bodyContainer.appendChild(qBlock);
    renumberQuestions();
}

window.onload = function() { 
    loadMetadata();
    populateLessons(); 
    generateWorksheet(); 
};
