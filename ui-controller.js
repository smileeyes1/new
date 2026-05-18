/**
 * =========================================================================
 * المنظومة الرقمية لأتمتة أوراق العمل التكيفية - المحرك الموحد والمغلق كلياً
 * المطور: مدرسة عاطوف الأساسية - مديرية طوباس | محمد وجيه غنام
 * الإصدار الفولاذي الشامل والمستقر لعام ٢٠٢٦م - إغلاق كامل لثغرات التزامن والتكرار اللانهائي
 * =========================================================================
 */

window.curriculumRepository = window.curriculumRepository || {};
let innovationCounter = 1;
let creativityActive = false;

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

// حل ثغرة الحساب الذهني دون تجميع أو استلاف للصف الثاني الأساسي
function generateNoCarryAddition(minV, maxV, seed) {
    let n1, n2, attempts = 0;
    do {
        n1 = getRandomIntSeeded(minV, maxV - 1, seed + attempts);
        n2 = getRandomIntSeeded(1, maxV - n1, seed + "n2_" + attempts);
        attempts++;
        if (attempts > 50) break;
    } while ((n1 % 10 + n2 % 10 >= 10) || (Math.floor(n1 / 10) + Math.floor(n2 / 10) >= 10));
    return { n1, n2 };
}

function generateNoBorrowSubtraction(minV, maxV, seed) {
    let sub1, sub2, attempts = 0;
    do {
        sub1 = getRandomIntSeeded(minV + 1, maxV, seed + attempts);
        sub2 = getRandomIntSeeded(minV, sub1, seed + "sub_" + attempts);
        attempts++;
        if (attempts > 50) break;
    } while ((sub1 % 10 < sub2 % 10) || (Math.floor(sub1 / 10) < Math.floor(sub2 / 10)));
    return { sub1, sub2 };
}

window.buildAlgorithmicQuestion = function(index, lesson, seed, levelMode) {
    const arabicIndex = window.toEasternArabicDigits(index);
    let title = `<span class="question-title-text">السؤال ${arabicIndex}:</span>`; 
    let body = "";
    
    let mode = index % 3; 
    if (levelMode === "concrete") mode = 0;
    if (levelMode === "abstract") mode = 1;
    if (levelMode === "semi_concrete") mode = 2;

    const minV = lesson.minVal !== undefined ? parseInt(lesson.minVal) : 1;
    const maxV = lesson.maxVal !== undefined ? parseInt(lesson.maxVal) : 9;

    if (lesson.type === "comparison") {
        const c1 = getRandomIntSeeded(minV, maxV, seed);
        let c2 = getRandomIntSeeded(minV, maxV, seed + "comp");
        if (c1 === c2) c2 = (c2 === maxV) ? c2 - 1 : c2 + 1;
        
        if (mode === 0 && lesson.shape) {
            title += ` عُدَّ العَنَاصِرَ فِي كُلِّ مَجْمُوعَةٍ، ثُمَّ ضَعِ الإِشَارَةَ المُنَاسِبَةَ ( > ، < ، = ):`;
            body = `<div style="display:flex; justify-content:center; align-items:center; gap:30px; font-size:20pt;">
                <div>${lesson.shape.repeat(c1)} (<span style="font-size:12pt; color:#666;">${window.toEasternArabicDigits(c1)}</span>)</div>
                <div class="blank-space" style="width:50px;"></div>
                <div>${lesson.shape.repeat(c2)} (<span style="font-size:12pt; color:#666;">${window.toEasternArabicDigits(c2)}</span>)</div>
            </div>`;
        } else if (mode === 2) {
            title += ` اقْرَأْ المَسْأَلَةَ الحَيَاتِيَّةَ ثُمَّ قَارِنْ بِوَضْعِ الإِشَارَةِ المُنَاسِبَةِ ( > ، < ، = ):`;
            body = `<p style="font-size:14pt; line-height:2;">مَعَ أَحْمَدَ <b>${window.toEasternArabicDigits(c1)}</b> بَرْتُقَالِاتٍ، وَمَعَ سَارَةَ <b>${window.toEasternArabicDigits(c2)}</b> بَرْتُقَالِاتٍ. أَيُّهُمَا يَمْلِكُ المِقْدَارَ الأَكْبَرَ؟<br>
            <div style="text-align:center; font-size:16pt; margin-top:10px;">${window.toEasternArabicDigits(c1)} <span class="blank-space"></span> ${window.toEasternArabicDigits(c2)}</div></p>`;
        } else {
            title += ` قَارِنْ بَيْنَ الأَعْدَادِ التَّالِيَةِ بِوَضْعِ الإِشَارَةِ الصَّحِيحَةِ ( > ، < ، = ) دَاخِلَ الفَرَاغِ:`;
            body = `<p style="font-size:18pt; text-align:center; direction:rtl; letter-spacing:5px;">${window.toEasternArabicDigits(c1)} <span class="blank-space"></span> ${window.toEasternArabicDigits(c2)}</p>`;
        }
    } 
    else if (lesson.type === "sorting") {
        let arr = [];
        let range = maxV - minV + 1;
        let desiredLength = Math.min(3, range);
        let loopAttempts = 0;
        
        while(arr.length < desiredLength && loopAttempts < 100) {
            let r = getRandomIntSeeded(minV, maxV, seed + arr.length + "_" + loopAttempts);
            if(!arr.includes(r)) arr.push(r);
            loopAttempts++;
        }
        
        const isAscending = (index % 2 === 0);
        const directionText = isAscending ? "تَصَاعُدِيّاً (مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ)" : "تَنَازُلِيّاً (مِنَ الأَكْبَرِ إِلَى الأَصْغَرِ)";
        
        title += ` رَتِّبِ المَجْمُوعَةَ العَدَدِيَّةَ الآتِيَةَ تَرْتِيباً ${directionText}:`;
        body = `<p style="font-size:18pt; text-align:center; letter-spacing:15px; margin:15px 0;">${arr.map(window.toEasternArabicDigits).join(' ، ')}</p>
        <div style="text-align:center;">التَّرْتِيبُ الصَّحِيحُ: <span class="blank-space-long"></span></div>`;
    } 
    else if (lesson.type === "diagnostic" || lesson.type === "review" || lesson.type === "worksheet") {
        const isAddition = (index % 2 === 0);
        
        if (isAddition) {
            const { n1, n2 } = generateNoCarryAddition(minV, maxV, seed);
            if (mode === 0 && lesson.shape) {
                title += ` جِدْ نَاتِجَ الجَمْعِ بِالاسْتِعَانَةِ بِالأَشْكَالِ البَصَرِيَّةِ المُمَثَّلَةِ:`;
                body = `<div style="font-size:20pt; text-align:center; margin:10px 0;">
                    ${lesson.shape.repeat(Math.min(n1, 10))} + ${lesson.shape.repeat(Math.min(n2, 10))} = <span class="blank-space"></span>
                </div>`;
            } else if (mode === 2) {
                title += ` حُلَّ المَسْأَلَةَ اللَّفْظِيَّةَ التَّالِيَةَ ثُمَّ اكْتُبِ النَّاتِجَ دَاخِلَ الفَرَاغِ:`;
                body = `<p style="font-size:13pt; line-height:2;">فِي الحَقْلِ <b>${window.toEasternArabicDigits(n1)}</b> مِنَ الطُّيُورِ، طَارَ إِلَيْهَا <b>${window.toEasternArabicDigits(n2)}</b> عَصَافِيرَ أُخْرَى. كَمْ عَصْفُوراً أَصْبَحَ فِي الحَقْلِ؟<br>
                <div style="text-align:center; font-size:16pt; margin-top:10px;">${window.toEasternArabicDigits(n1)} + ${window.toEasternArabicDigits(n2)} = <span class="blank-space"></span></div></p>`;
            } else {
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الجَمْعِ الرِّيَاضِيَّةِ التَّالِيَةِ بِدقَّةٍ:`;
                body = `<div class="math-column-form" style="font-size:18pt; text-align:center; letter-spacing:2px;">${window.toEasternArabicDigits(n1)} + ${window.toEasternArabicDigits(n2)} = <span class="blank-space"></span></div>`;
            }
        } else {
            const { sub1, sub2 } = generateNoBorrowSubtraction(minV, maxV, seed);
            if (mode === 0 && lesson.shape) {
                title += ` اشْطُبْ مِنَ الأَشْكَالِ لِتَجِدَ نَاتِجَ عَمَلِيَّةِ الطَّرْحِ المَطْلُوبَةِ:`;
                body = `<div style="font-size:20pt; text-align:center; margin:10px 0;">
                    ${lesson.shape.repeat(Math.min(sub1, 10))} (اشْطُبْ مِنْهَا ${window.toEasternArabicDigits(sub2)}) | النَّاتِجُ = <span class="blank-space"></span>
                </div>`;
            } else if (mode === 2) {
                title += ` حُلَّ المَسْأَلَةَ الكَلَامِيَّةَ التَّالِيَةَ وَاكْتُبْ جُمْلَةَ الطَّرْحِ:`;
                body = `<p style="font-size:13pt; line-height:2;">كَانَ مَعَ جَنَى <b>${window.toEasternArabicDigits(sub1)}</b> دَنَانِيرَ، أَعْطَتْ أَخَاهَا الصَّغِيرَ <b>${window.toEasternArabicDigits(sub2)}</b> دَنَانِيرَ. كَمْ دِينَاراً بَقِيَ مَعَهَا؟<br>
                <div style="text-align:center; font-size:16pt; margin-top:10px;">${window.toEasternArabicDigits(sub1)} - ${window.toEasternArabicDigits(sub2)} = <span class="blank-space"></span></div></p>`;
            } else {
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الطَّرْحِ العَدَدِيَّةِ التَّالِيَةِ:`;
                body = `<div class="math-column-form" style="font-size:18pt; text-align:center; letter-spacing:2px;">${window.toEasternArabicDigits(sub1)} - ${window.toEasternArabicDigits(sub2)} = <span class="blank-space"></span></div>`;
            }
        }
    } 
    else {
        const currentVal = getRandomIntSeeded(minV, maxV, seed);
        if (mode === 0 && lesson.shape && currentVal > 0) {
            title += ` عُدَّ الأَشْكَالَ البَصَرِيَّةَ المُرَتَّبَةَ ثُمَّ اكْتُبِ العَدَدَ المُنَاسِبَ دَاخِلَ الفَرَاغِ:`;
            body = `<div class="shapes-container" style="text-align:center; margin:15px 0;">${lesson.shape.repeat(Math.min(currentVal, 10))}</div><div style="text-align:center;">عَدَدُ العَنَاصِرِ الكُلِّيِّ = <span class="blank-space"></span></div>`;
        } else if (mode === 2) {
            title += ` ارْسُمْ عَنَاصِرَ هَنْدَسِيَّةً أَوْ رُسُومَاتٍ بَصَرِيَّةً مُبَسَّطَةً تُمَثِّلُ القِيمَةَ العَدَدِيَّةَ:`;
            body = `<div style="font-size:13pt; margin-bottom:10px;">المَطْلُوبُ رَسْمُ مَا يُمَاثِلُ العَدَدَ [ <b>${window.toEasternArabicDigits(currentVal)}</b> ] دَاخِلَ الصُّنْدُوقِ المَقَابِلِ:</div>
            <div style="border:1px dashed #000; width:100%; height:80px; border-radius:4px;"></div>`;
        } else {
            const finalVal = currentVal === 0 ? minV : currentVal;
            title += ` اكْتُبِ الرَّمْزَ العَدَدِيَّ الصَّحِيحَ لِلْعَدَدِ [ ${window.toEasternArabicDigits(finalVal)} ] بِخَطٍّ سَلِيمٍ وَمُكَرَّرٍ:`;
            body = `<p style="font-size:18pt; letter-spacing:40px; text-align:center; direction:rtl; margin:15px 0;">${window.toEasternArabicDigits(finalVal)} —— ${window.toEasternArabicDigits(finalVal)} —— ${window.toEasternArabicDigits(finalVal)}</p>`;
        }
    }

    return `<div class="question-block">
        <div class="question-title">
            ${title}
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body">${body}</div>
    </div>`;
};

function saveMetadata() {
    if(document.getElementById("schoolInput")) localStorage.setItem('math_schoolName', document.getElementById("schoolInput").value);
    if(document.getElementById("teacherInput")) localStorage.setItem('math_teacherName', document.getElementById("teacherInput").value);
    if(document.getElementById("modelSelector")) localStorage.setItem('math_modelLetter', document.getElementById("modelSelector").value);
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
        opt.text = "⚠️ لم يتم تحميل ملف المنهج المخصص بعد";
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
        <div class="question-body"><b>تَحَدٍّ إِبْدَاعِيٌّ فُجَائِيٌّ (${window.toEasternArabicDigits(innovationCounter++)}):</b> اكْتُبْ عَدَدًا مَفْقُودًا فِي الفَرَاغِ لِتَكُونَ الجُمْلَةُ الرِّيَاضِيَّةُ صَحِيحَةً تَمَامًا وَفْقَ نَمَطِ التَّفْكِيرِ العُلْيَا.</div>
    `;
    bodyContainer.appendChild(qBlock);
    renumberQuestions();
}

// توحيد دورة حياة التحميل لمنع التكرار والصراعات الصامتة للـ DOM
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
