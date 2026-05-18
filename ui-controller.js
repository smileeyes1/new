/**
 * =========================================================================
 * المنظومة الرقمية لأتمتة أوراق العمل التكيفية - واجهة المستخدم وإدارة الأحداث
 * المطور: مدرسة عاطوف الأساسية - مديرية طوباس
 * =========================================================================
 */

// --- مزامنة البيانات وإدارة الذاكرة المحلية (LocalStorage) ---
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

/**
 * تفكيك وتوزيع الدروس بناءً على الصف المختار من المستودع التراكمي المحدث
 */
function populateLessons() {
    const grade = document.getElementById("gradeSelector").value;
    const lessonSelect = document.getElementById("lessonSelector");
    if (!lessonSelect) return;
    
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
                    opt.text = (item.type.includes("diag") ? "🔍 " : item.type.includes("review") ? "🏆 " : item.type.includes("worksheet") ? "📄 " : "📝 ") + item.title;
                    optGroup.appendChild(opt);
                });
                lessonSelect.appendChild(optGroup);
            });
        } else if (gradeData.items && Array.isArray(gradeData.items)) {
            gradeData.items.forEach(item => {
                const opt = document.createElement("option");
                opt.value = item.id;
                opt.text = (item.type.includes("diag") ? "🔍 " : item.type.includes("review") ? "🏆 " : "📝 ") + item.title;
                lessonSelect.appendChild(opt);
            });
        }
    }
}

/**
 * تفعيل وإلغاء الثيم الجمالي المتقدم لورقة العمل
 */
function toggleBeautyTheme() {
    const sheet = document.getElementById("sheetOutput");
    if (sheet) sheet.classList.toggle("enhanced-beauty");
}

/**
 * حذف واستبعاد سؤال محدد مع إعادة جدولة الترقيم الحسابي تلقائياً
 */
function removeQuestion(btn) {
    const block = btn.closest('.question-block');
    if (block) {
        block.remove();
        renumberQuestions();
    }
}

/**
 * إعادة صياغة مسميات الأسئلة تسلسلياً بالترقيم المشرقي بعد عمليات الاستبعاد
 */
function renumberQuestions() {
    const titles = document.querySelectorAll('#sheetBody .question-title-text');
    titles.forEach((title, idx) => {
        title.innerText = `السؤال ${toEasternArabicDigits(idx + 1)}:`;
    });
}

/**
 * دالة التوليد الكلية للمتن التعليمي النظيف للطلاب
 */
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
    } else if (gradeData.items && Array.isArray(gradeData.items)) {
        lessonObj = gradeData.items.find(i => i.id === lessonId);
    }
    
    if (!lessonObj) return;
    
    document.title = "ورقة عمل - " + lessonObj.title;

    document.getElementById("outSchool").innerText = "مدرسة: " + schoolName;
    document.getElementById("outTeacher").innerText = "المعلم: " + teacherName;
    document.getElementById("outGrade").innerText = "الصف: " + gradeData.name;
    document.getElementById("outDirectorate").innerText = gradeData.directorate;
    document.getElementById("outModel").innerText = "نموذج: " + modelLetter;
    document.getElementById("outLessonTitle").innerText = lessonObj.title;
    
    const runTimestamp = Math.floor(Math.random() * 999999);
    const baseSeed = lessonId + "_" + modelLetter + "_" + runTimestamp + "_";
    
    let htmlHTML = "";
    for (let q = 1; q <= questionsCount; q++) {
        htmlHTML += buildAlgorithmicQuestion(q, lessonObj, baseSeed + q, levelMode);
    }
    
    document.getElementById("sheetBody").innerHTML = htmlHTML;
    document.getElementById("sheetOutput").style.display = "block";
    innovationCounter = questionsCount + 1;
}

/**
 * زر إدراج فكرة المعلم التربوية الحرة بداخل المتن النشط فوراً
 */
function injectTeacherCustomIdea() {
    const rawIdea = document.getElementById("teacherCustomIdeaInput").value.trim();
    if (!rawIdea) {
        alert("يرجى كتابة الفكرة التربوية أو نص السؤال في الحقل المخصص أولاً.");
        return;
    }
    
    const formattedIdea = toEasternArabicDigits(escapeHTML(rawIdea));
    const bodyContainer = document.getElementById("sheetBody");
    
    if (!bodyContainer.innerHTML) {
        generateWorksheet();
    }

    const currentIdx = document.querySelectorAll('#sheetBody .question-block').length + 1;
    const qBlock = document.createElement("div");
    qBlock.className = "question-block";
    
    let writingLines = `<div class="custom-writing-area">الإِجَابَةُ المُنْضَبِطَة...:<br>........................................................................................................................................<br>........................................................................................................................................</div>`;

    qBlock.innerHTML = `
        <div class="question-title">
            <span class="question-title-text">السؤال ${toEasternArabicDigits(currentIdx)}:</span>
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body">
            <b>فِكْرَةُ المُعَلِّمِ المُنْفَذَةُ:</b> ${formattedIdea}
            ${writingLines}
        </div>
    `;

    const masterBox = document.getElementById("masterCreativeBox");
    if (masterBox) {
        bodyContainer.insertBefore(qBlock, masterBox);
    } else {
        bodyContainer.appendChild(qBlock);
    }

    if (creativityActive) {
        const creativePrompt = document.createElement("div");
        creativePrompt.className = "creative-addition";
        creativePrompt.innerText = "🎨 ارسُمْ رَسْمَةً صَغِيرَةً فِي جَانِبِ الصَّفْحَةِ تُعَبِّرُ عَنْ حَلِّكَ الذَّكِيِّ.";
        qBlock.appendChild(creativePrompt);
    }

    renumberQuestions();
    document.getElementById("sheetOutput").style.display = "block";
    document.getElementById("teacherCustomIdeaInput").value = ""; 
}

/**
 * زر التفعيل الذكي لطور الإبداع التكاملي لمهارات التفكير العليا (مشروع زيتونة)
 */
function activateCreativityMode() {
    if (!document.getElementById("sheetBody").innerHTML) return;
    creativityActive = true;
    
    const blocks = document.querySelectorAll('#sheetBody .question-block');
    blocks.forEach((block, idx) => {
        if (block.querySelector('.creative-addition')) return;
        
        const creativePrompt = document.createElement("div");
        creativePrompt.className = "creative-addition";
        
        const prompts = [
            "🎨 ارسُمْ رَسْمَةً صَغِيرَةً بَيَانِيَّةً تُعَبِّرُ عَنْ حَلِّكَ الذَّكِيِّ السَّلِيمِ.",
            "🧠 كَيْفَ تَحْقَّقْتَ مِنْ صِحَّةِ هَذَا الحَلِّ؟ اشْرَحْ لِصَدِيقِكَ بِالْكَلِمَاتِ.",
            "🌟 إِذَا كَانَتْ إِجَابَتُكَ صَحِيحَةً، ضَعْ لِنَفْسِكَ نَجْمَةً كَبِيرَةً وَلَوِّنْهَا.",
            "🔍 اكْتُبْ مَسْأَلَةً جَدِيدَةً تُشْبِهُ هَذِهِ المَسْأَلَةَ تَمَاماً مِنْ عَقْلِكَ."
        ];
        
        creativePrompt.innerText = prompts[idx % prompts.length];
        block.appendChild(creativePrompt);
    });

    if (!document.getElementById("masterCreativeBox")) {
        const masterBox = document.createElement("div");
        masterBox.id = "masterCreativeBox";
        masterBox.className = "creative-box";
        masterBox.innerHTML = `
            <div class="creative-box-title">🏆 صُنْدُوقُ العَبَاقِرَةِ الأذْكِيَاءِ (مَشْرُوعُ زَيْتُونَةَ التَّكَيُّفِيِّ)</div>
            <div style="font-size:13pt; line-height:2; color:#000;">
                فَكِّرْ ثُمَّ تَخَيَّلْ: إِذَا زَارَنَا طَالِبٌ جَدِيدٌ فِي الصَّفِّ وَلَا يَعْرِفُ مَوْضُوعَ اليَوْمِ، كَيْفَ تُسَاعِدُهُ بِرَسْمَةٍ وَاحِدَةٍ لِيَفْهَمَ هَذَا الدَّرْسَ تَمَاماً؟
                <br><br>[ ........................................................................................................................................ ]
            </div>
        `;
        document.getElementById("sheetBody").appendChild(masterBox);
    }
}

/**
 * زر الابتكار لإنتاج أنماط معالجة فجائية تعتمد على نمط الدرس المفتوح حالياً
 */
function injectInnovativeQuestion() {
    const gradeKey = document.getElementById("gradeSelector").value;
    const lessonId = document.getElementById("lessonSelector").value;
    if (!window.curriculumRepository || !window.curriculumRepository[gradeKey]) return;
    
    const gradeData = window.curriculumRepository[gradeKey];
    let lessonObj = null;
    
    if (gradeData.units && Array.isArray(gradeData.units)) {
        for (let unit of gradeData.units) {
            lessonObj = unit.items.find(i => i.id === lessonId);
            if (lessonObj) break;
        }
    } else if (gradeData.items && Array.isArray(gradeData.items)) {
        lessonObj = gradeData.items.find(i => i.id === lessonId);
    }
    
    const bodyContainer = document.getElementById("sheetBody");
    if (!lessonObj) return;
    if (!bodyContainer.innerHTML) {
        generateWorksheet();
    }

    const currentIdx = document.querySelectorAll('#sheetBody .question-block').length + 1;
    const seed = "innovative_" + currentIdx + "_" + Math.random();
    let title = `<span class="question-title-text">السؤال ${toEasternArabicDigits(currentIdx)}:</span>`;
    let body = "";
    
    switch(lessonObj.type) {
        case "diagnostic":
        case "review":
        case "worksheet":
            body = `<b>تحدّي الذكاء:</b> أَنا عَدَدٌ أَكْبَرُ مِنْ المِقْدَارِ [ ${toEasternArabicDigits(lessonObj.minVal ? lessonObj.minVal + 2 : 2)} ] وَأَصْغَرُ مِنْ [ ${toEasternArabicDigits(lessonObj.maxVal ? lessonObj.maxVal : 9)} ]، إِذَا جَمَعْتَ لِي النَّاتِجَ صِفْرًا أَبْقَى كَمَا أَنَا. فَمَنْ أَكُون...؟ <br>العَدَدُ الذَّكِيُّ هُوَ: <span class="blank-space"></span>`;
            break;
        case "lesson":
            const v = getRandomIntSeeded(lessonObj.minVal || 1, lessonObj.maxVal || 20, seed);
            body = `<b>سُؤالُ الِابْتِكاَرِ:</b> اكْتُبْ كَلِمَةً أَوْ ارْسُمْ رَسْمَةً مَبْنِيَّةً عَلَى خَيَالِكَ التَّامِّ تُعَبِّرُ عَنْ تَمْثِيلِ العَدَدِ المُنْضَبِطِ [ <b>${toEasternArabicDigits(v)}</b> ]: <br><br> [ ........................................................................................ ]`;
            break;
        case "comparison":
        case "comparison_adv":
            body = `<b>فَكِّرْ ثُمَّ أَجِبْ:</b> اكْتُبْ عَدَدًا مَفْقُودًا فِي الفَرَاغِ لِتَكُونَ الجُمْلَةُ الرِّيَاضِيَّةُ صَحِيحَةً تَمَامًا: <br><p style="text-align:center; font-size:15pt;"><span class="blank-space"></span> &gt; ${toEasternArabicDigits((lessonObj.minVal || 0) + 1)}</p>`;
            break;
        case "sorting":
        case "sorting_adv":
            body = `<b>تحدّي التَّرْتِيبِ:</b> اكْتُبْ ثَلَاثَةَ أَعْدَادٍ مُخْتَلِفَةٍ مِنْ عِنْدِكَ تَقَعُ تَمَامًا بَيْنَ العَدَدِ [ ${toEasternArabicDigits(lessonObj.minVal || 0)} ] وَالعَدَدِ [ ${toEasternArabicDigits(lessonObj.maxVal || 10)} ] مُرَتَّبَةً تَصَاعُدِيًّا: <br><br> <span class="blank-space"></span> ، <span class="blank-space"></span> ، <span class="blank-space"></span>`;
            break;
        case "operation_add":
        case "add_carry":
            const targetAdd = getRandomIntSeeded((lessonObj.minVal || 0) + 3, lessonObj.maxVal || 20, seed);
            body = `<b>مَحْفِلُ التَّفْكِيرِ:</b> جِدْ عَدَدَيْنِ مُخْتَلِفَيْنِ إِذَا قُمْنَا بِجَمْعِهِمَا مَعًا كَانَ النَّاتِجُ يُسَاوِي تَمَامًا العَدَدَ [ <b>${toEasternArabicDigits(targetAdd)}</b> ]: <br><br> <span class="blank-space"></span> + <span class="blank-space"></span> = ${toEasternArabicDigits(targetAdd)}`;
            break;
        case "operation_sub":
        case "sub_borrow":
            const targetSub = getRandomIntSeeded(lessonObj.minVal || 1, Math.floor((lessonObj.maxVal || 20) / 2), seed);
            body = `<b>مَحْفِلُ التَّفْكِيرِ:</b> جِدْ عَدَدَيْنِ مُخْتَلِفَيْنِ إِذَا طَرَحْنَا أَحَدَهُمَا مِنْ الآخَرِ بَقِيَ مَعَنَا تَمَامًا العَدَدُ [ <b>${toEasternArabicDigits(targetSub)}</b> ]: <br><br> <span class="blank-space"></span> - <span class="blank-space"></span> = ${toEasternArabicDigits(targetSub)}`;
            break;
        case "components":
            const compVal = getRandomIntSeeded((lessonObj.minVal || 2) + 1, lessonObj.maxVal || 9, seed);
            body = `<b>التَّحْلِيلُ الِابْتِكَارِيُّ:</b> اكْتُبْ طَرِيقَتَيْنِ مُخْتَلِفَتَيْنِ لِتَحْلِيلِ العَدَدِ [ <b>${toEasternArabicDigits(compVal)}</b> ] إِلَى مُكَوِّنَاتِهِ الأَسَاسِيَّةِ: <br>الطَّرِيقَةُ الأولى: <span class="blank-space"></span> وَ <span class="blank-space"></span> <br>الطَّرِيقَةُ الثَّانِيَةُ: <span class="blank-space"></span> وَ <span class="blank-space"></span>`;
            break;
        case "pattern":
            body = `<b>أَكْمِلْ النَّمَطَ الذَّكِيَّ:</b> اكْتُبْ النَّمَطَ النَّاشِئَ عَنْ قَفْزِ الأَعْدَادِ بِشَكْلٍ مَعْكُوسٍ: <br><p style="text-align:center; font-size:15pt;">${toEasternArabicDigits(lessonObj.maxVal || 99)} ، ${toEasternArabicDigits((lessonObj.maxVal || 99) - 2)} ، <span class="blank-space"></span> ، <span class="blank-space"></span></p>`;
            break;
        default:
            body = `<b>تَحَدٍّ إِضَافِيٌّ لِدَرْسِ ( ${lessonObj.title} ):</b> فَكِّرْ عَمِيقاً ثُمَّ عَبِّرْ عَنْ فَهْمِكَ لِهَذَا العُنْوَانِ بِرَسْمَةٍ أَوْ عِبَارَةٍ دَقِيقَةٍ: <br><br> [ ........................................................................................ ]`;
            break;
    }

    const qBlock = document.createElement("div");
    qBlock.className = "question-block";
    qBlock.innerHTML = `
        <div class="question-title">
            ${title}
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body">${body}</div>
    `;
    
    const masterBox = document.getElementById("masterCreativeBox");
    if (masterBox) {
        bodyContainer.insertBefore(qBlock, masterBox);
    } else {
        bodyContainer.appendChild(qBlock);
    }
    
    if (creativityActive) {
        const creativePrompt = document.createElement("div");
        creativePrompt.className = "creative-addition";
        creativePrompt.innerText = "🎨 ارسُمْ رَسْمَةً صَغِيرَةً فِي جَانِبِ الصَّفْحَةِ تُعَبِّرُ عَنْ حَلِّكَ الذَّكِيِّ.";
        qBlock.appendChild(creativePrompt);
    }
    
    renumberQuestions();
    document.getElementById("sheetOutput").style.display = "block";
}

// --- أحداث الإطلاق البدئية للمنظومة عند تحميل المتصفح ---
window.onload = function() { 
    loadMetadata();
    populateLessons(); 
    generateWorksheet(); 
};
