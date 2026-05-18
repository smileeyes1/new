/**
 * =========================================================================
 * المنظومة الرقمية لأتمتة أوراق العمل التكيفية - المحرك الموحد والمغلق كلياً
 * المطور: مدرسة عاطوف الأساسية - مديرية طوباس | محمد وجيه غنام
 * الإصدار الفولاذي المستقر والمدمج لعام ٢٠٢٦م
 * =========================================================================
 */

// ١. تأمين النطاق العالمي وتوحيد بيئة العمل الرقمية
window.curriculumRepository = window.curriculumRepository || {};
let innovationCounter = ١;
let creativityActive = false;

// ٢. نظام الأرقام المشرقية الآمن داخلياً
window.toEasternArabicDigits = function(num) {
    if (num === null || num === undefined) return '';
    const id = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().replace(/[0-9]/g, function(w){ return id[+w]; });
};

window.fromEasternArabicDigits = function(str) {
    if (!str) return "٥";
    return str.toString().replace(/[٠-٩]/g, function(d) {
        return d.charCodeAt(0) - 1632;
    });
};

window.formatEasternInput = function(element) {
    element.value = window.toEasternArabicDigits(element.value);
};

// ٣. دوال التوليد الرياضي العشوائي الثابت (Seeded Random) لمنع التبدد البصري
function seededRandom(seedStr) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
}

function getRandomIntSeeded(min = 1, max = 10, seed) {
    if (min >= max) return min;
    return min + Math.floor(seededRandom(seed) * (max - min + 1));
}

// ٤. المحرك الخوارزمي المطور لإنتاج الأسئلة (بديل math-engine المعطوب)
window.buildAlgorithmicQuestion = function(index, lesson, seed, levelMode) {
    const arabicIndex = window.toEasternArabicDigits(index);
    let title = `<span class="question-title-text">السؤال ${arabicIndex}:</span>`; 
    let body = "";
    
    let mode = index % 3;
    if (levelMode === "concrete") mode = 0;
    if (levelMode === "semi_concrete") mode = 2;
    if (levelMode === "abstract") mode = 1;

    // معالجة أمان الأرقام لضمان عدم تمرير قيم فارغة
    const minV = lesson.minVal !== undefined ? parseInt(lesson.minVal) : 1;
    const maxV = lesson.maxVal !== undefined ? parseInt(lesson.maxVal) : 9;

    switch(lesson.type) {
        case "diagnostic":
        case "review":
        case "worksheet":
            if (mode === 0) {
                const n1 = getRandomIntSeeded(minV, Math.floor(maxV / 2) + 1, seed);
                const n2 = getRandomIntSeeded(1, Math.max(1, maxV - n1), seed + "diag_a");
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الجَمْعِ الرِّيَاضِيَّةِ التَّالِيَةِ:`;
                body = `<div class="math-column-form" style="font-size:16pt; direction:rtl;">${window.toEasternArabicDigits(n1)} + ${window.toEasternArabicDigits(n2)} = <span class="blank-space"></span></div>`;
            } else if (mode === 1) {
                const v1 = getRandomIntSeeded(minV, maxV, seed);
                const v2 = getRandomIntSeeded(minV, maxV, seed + "diag_b");
                title += ` قَارِنْ بَيْنَ العَدَدَيْنِ بِوَضْعِ الإِشَارَةِ المُتَوَافِقَةِ ( > ، < ، = ) دَاخِلَ الفَرَاغِ:`;
                body = `<p style="text-align:center; font-size:16pt; direction:rtl;">${window.toEasternArabicDigits(v1)} <span class="blank-space"></span> ${window.toEasternArabicDigits(v2)}</p>`;
            } else {
                const start = getRandomIntSeeded(minV, Math.max(minV, maxV - 3), seed);
                title += ` تَتَبَّعِ التَّسَلْسُلَ العَدَدِيَّ المُنْتَظَمَ ثُمَّ اكْتُبِ الأَعْدَادَ Mَفْقُودَةَ:`;
                body = `<p style="text-align:center; font-size:16pt; direction:rtl;">${window.toEasternArabicDigits(start)} ، ${window.toEasternArabicDigits(start+1)} ، <span class="blank-space"></span> ، <span class="blank-space"></span></p>`;
            }
            break;

        case "lesson":
            const currentVal = getRandomIntSeeded(minV, maxV, seed);
            if (mode === 0 && lesson.shape && currentVal > 0) {
                title += ` عُدَّ الأَشْكَالَ البَصَرِيَّةَ المُرَتَّبَةَ ثُمَّ اكْتُبِ العَدَدَ المُنَاسِبَ دَاخِلَ الفَرَاغِ:`;
                body = `<div class="shapes-container" style="font-size:24pt; letter-spacing:5px; margin:10px 0;">${lesson.shape.repeat(currentVal)}</div> عَدَدُ العَنَاصِرِ الكُلِّيِّ = <span class="blank-space"></span>`;
            } else if (mode === 2) {
                title += ` ارْسُمْ عَنَاصِرَ هَنْدَسِيَّةً مُبَسَّطَةً تُمَثِّلُ القِيمَةَ العَدَدِيَّةَ تَمَاماً:`;
                body = `المَطْلُوبُ رَسْمُ مَا يُمَاثِلُ العَدَدَ [ <b>${window.toEasternArabicDigits(currentVal)}</b> ] دَاخِلَ الحَيِّزِ المَقَابِلِ: <br><br> [ ........................................................................................ ]`;
            } else {
                const finalVal = currentVal === 0 ? minV : currentVal;
                title += ` اكْتُبِ الرَّمْزَ العَدَدِيَّ الصَّحِيحَ لِلْعَدَدِ [ ${window.toEasternArabicDigits(finalVal)} ] بِخَطٍّ سَلِيمٍ وَمُكَرَّرٍ:`;
                body = `<p style="font-size:18pt; letter-spacing:40px; text-align:center; direction:rtl;">${window.toEasternArabicDigits(finalVal)} —— ${window.toEasternArabicDigits(finalVal)} —— ${window.toEasternArabicDigits(finalVal)}</p>`;
            }
            break;

        case "comparison":
            const c1 = getRandomIntSeeded(minV, maxV, seed);
            let c2 = getRandomIntSeeded(minV, maxV, seed + "comp");
            if (c1 === c2) c2 = (c2 === maxV) ? c2 - 1 : c2 + 1;
            title += ` قَارِنْ بَيْنَ المَقَادِيرِ وَالرُّمُوزِ العَدَدِيَّةِ بِوَضْعِ الإِشَارَةِ الصَّحِيحَةِ ( > ، < ، = ):`;
            body = `<p style="font-size:16pt; text-align:center; direction:rtl;">${window.toEasternArabicDigits(c1)} <span class="blank-space"></span> ${window.toEasternArabicDigits(c2)}</p>`;
            break;

        case "sorting":
            let arr = [];
            for(let i=0; i<3; i++) {
                let r = getRandomIntSeeded(minV, maxV, seed + i);
                if(!arr.includes(r)) arr.push(r);
            }
            if(arr.length < 2) arr.push(maxV);
            title += ` رَتِّبِ المَجْمُوعَةَ العَدَدِيَّةَ التَّالِيَةَ تَرْتِيباً صَحِيحاً دَاخِلَ الفَرَاغِ:`;
            body = `<p style="font-size:15pt; text-align:center; letter-spacing:12px; direction:rtl;">${arr.map(window.toEasternArabicDigits).join(' ، ')}</p> التَّرْتِيبُ المَطْلُوبُ: <span class="blank-space-long"></span>`;
            break;

        default:
            title += ` مَهَمَّةٌ تَعْلِيمِيَّةٌ وَتَطْبِيقٌ عَمَلِيٌّ لِدَرْسِ:`;
            body = `<div style="font-size:14pt; padding:10px; color:#333;">${lesson.title}</div> [ ........................................................................................ ]`;
            break;
    }

    return `<div class="question-block" style="direction:rtl; text-align:right;">
        <div class="question-title">
            ${title}
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body">${body}</div>
    </div>`;
};

// ٥. إدارة التزامن وتغذية القوائم المنسدلة (UI Logic)
function saveMetadata() {
    localStorage.setItem('math_schoolName', document.getElementById("schoolInput").value);
    localStorage.setItem('math_teacherName', document.getElementById("teacherInput").value);
    localStorage.setItem('math_modelLetter', document.getElementById("modelSelector").value);
}

function loadMetadata() {
    if(localStorage.getItem('math_schoolName') && document.getElementById("schoolInput")) 
        document.getElementById("schoolInput").value = localStorage.getItem('math_schoolName');
    if(localStorage.getItem('math_teacherName') && document.getElementById("teacherInput")) 
        document.getElementById("teacherInput").value = localStorage.getItem('math_teacherName');
    if(localStorage.getItem('math_modelLetter') && document.getElementById("modelSelector")) 
        document.getElementById("modelSelector").value = localStorage.getItem('math_modelLetter');
}

function populateLessons() {
    const gradeSelect = document.getElementById("gradeSelector");
    const lessonSelect = document.getElementById("lessonSelector");
    if (!gradeSelect || !lessonSelect) return;
    
    const grade = gradeSelect.value;
    lessonSelect.innerHTML = "";
    
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
    } else {
        const opt = document.createElement("option");
        opt.text = "⚠️ لم يتم العثور على ملفات المنهج";
        lessonSelect.appendChild(opt);
    }
}

function generateWorksheet() {
    creativityActive = false;
    const gradeKey = document.getElementById("gradeSelector").value;
    const lessonSelect = document.getElementById("lessonSelector");
    if (!lessonSelect || !lessonSelect.value) return;
    
    const lessonId = lessonSelect.value;
    const schoolName = document.getElementById("schoolInput").value;
    const teacherName = document.getElementById("teacherInput").value;
    const modelLetter = document.getElementById("modelSelector").value;
    
    let rawCount = document.getElementById("countInput").value;
    let parsedCount = parseInt(window.fromEasternArabicDigits(rawCount));
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
        htmlHTML += window.buildAlgorithmicQuestion(q, lessonObj, baseSeed + q, levelMode);
    }
    
    document.getElementById("sheetBody").innerHTML = htmlHTML;
    document.getElementById("sheetOutput").style.display = "block";
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
        title.innerText = `السؤال ${window.toEasternArabicDigits(idx + 1)}:`;
    });
}

function injectTeacherCustomIdea() {
    const rawIdea = document.getElementById("teacherCustomIdeaInput").value.trim();
    if (!rawIdea) return;
    
    const formattedIdea = window.toEasternArabicDigits(rawIdea);
    const bodyContainer = document.getElementById("sheetBody");
    
    if (!bodyContainer.innerHTML) generateWorksheet();

    const currentIdx = document.querySelectorAll('#sheetBody .question-block').length + 1;
    const qBlock = document.createElement("div");
    qBlock.className = "question-block";
    
    qBlock.innerHTML = `
        <div class="question-title">
            <span class="question-title-text">السؤال ${window.toEasternArabicDigits(currentIdx)}:</span>
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
    blocks.forEach((block) => {
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
    const bodyContainer = document.getElementById("sheetBody");
    if (!window.curriculumRepository || !window.curriculumRepository[gradeKey]) return;
    
    if (!bodyContainer.innerHTML) generateWorksheet();

    const currentIdx = document.querySelectorAll('#sheetBody .question-block').length + 1;
    const qBlock = document.createElement("div");
    qBlock.className = "question-block";
    qBlock.innerHTML = `
        <div class="question-title">
            <span class="question-title-text">السؤال ${window.toEasternArabicDigits(currentIdx)}:</span>
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body"><b>تَحَدٍّ إِبْدَاعِيٌّ فُجَائِيٌّ:</b> اكْتُبْ عَدَدًا مَفْقُودًا فِي الفَرَاغِ لِتَكُونَ الجُمْلَةُ الرِّيَاضِيَّةُ صَحِيحَةً تَمَامًا.</div>
    `;
    bodyContainer.appendChild(qBlock);
    renumberQuestions();
}

// ٦. إطلاق المنظومة بشكل متزامن وقاطع
document.addEventListener("DOMContentLoaded", function() {
    loadMetadata();
    populateLessons();
    
    document.getElementById("gradeSelector").addEventListener("change", function() {
        populateLessons();
        generateWorksheet();
    });
    document.getElementById("lessonSelector").addEventListener("change", generateWorksheet);
    
    if (document.getElementById("lessonSelector").options.length > 0) {
        generateWorksheet();
    }
});

window.onload = function() {
    populateLessons();
    generateWorksheet();
};
