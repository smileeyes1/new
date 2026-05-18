/**
 * =========================================================================
 * المنظومة الرقمية لأتمتة أوراق العمل التكيفية - المحرك المركزي المشترك (Core)
 * =========================================================================
 */

// --- المتغيرات وحالات النظام العامة ---
let innovationCounter = 1;
let creativityActive = false;

// --- أدوات التهيئة والمعالجة النصية والنص المشرقي ---

/**
 * حماية النصوص وتطهيرها من أكواد HTML الخبيثة
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, function(tag) {
        const chars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' };
        return chars[tag] || tag;
    });
}

/**
 * تحويل الأرقام القياسية إلى أرقام مشرقية (عربية أصيلة)
 */
function toEasternArabicDigits(num) {
    if (num === null || num === undefined) return '';
    const id = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().replace(/[0-9]/g, function(w){ return id[+w]; });
}

/**
 * تحويل الأرقام المشرقية إلى أرقام قياسية صالحة للعمليات الحسابية
 */
function fromEasternArabicDigits(str) {
    if (!str) return "5";
    let converted = str.replace(/[٠-٩]/g, function(d) {
        return d.charCodeAt(0) - 1632;
    });
    return converted;
}

/**
 * منسق الإدخال الفوري للأرقام المشرقية في حقول لوحة التحكم
 */
function formatEasternInput(element) {
    element.value = toEasternArabicDigits(element.value);
}

// --- الخوارزميات الرياضية وعشوائية النماذج ---

/**
 * المولد العشوائي المعتمد على Seed ثابت لثبات النماذج الامتحانية (أ، ب، ج، د)
 */
function seededRandom(seedStr) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
}

/**
 * استخراج رقم عشوائي ضمن نطاق محدد مبني على ميزة الـ Seed
 */
function getRandomIntSeeded(min = 1, max = 10, seed) {
    if (min >= max) return min;
    return min + Math.floor(seededRandom(seed) * (max - min + 1));
}

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

// --- واجهة المستخدم وإدارة القوائم المنسدلة ---

/**
 * تفكيك وتوزيع الدروس بناءً على الصف المختار من المستودع التراكمي
 */
function populateLessons() {
    const grade = document.getElementById("gradeSelector").value;
    const lessonSelect = document.getElementById("lessonSelector");
    if (!lessonSelect) return;
    
    lessonSelect.innerHTML = "";
    
    // التحقق من وجود الصف المختار في المستودع الكلي المشترك
    if (window.curriculumRepository && window.curriculumRepository[grade]) {
        window.curriculumRepository[grade].items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.text = (item.type.includes("diag") ? "🔍 " : item.type.includes("review") ? "🏆 " : "📝 ") + item.title;
            lessonSelect.appendChild(opt);
        });
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

// --- محرك التوليد الرياضي الرئيسي وأزرار الابتكار والإبداع ---

/**
 * دالة التوليد الكلية للمتن التعليمي النظيف
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
    const lessonObj = gradeData.items.find(i => i.id === lessonId);
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
 * زر التفعيل الذكي لطور الإبداع التكاملي لمهارات التفكير العليا
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
    const lessonObj = gradeData.items.find(i => i.id === lessonId);
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
        case "unit_review":
        case "operation_mixed":
            body = `<b>تحدّي الذكاء:</b> أَنا عَدَدٌ أَكْبَرُ مِنْ المِقْدَارِ [ ${toEasternArabicDigits(lessonObj.minVal ? lessonObj.minVal + 2 : 2)} ] وَأَصْغَرُ مِنْ [ ${toEasternArabicDigits(lessonObj.maxVal ? lessonObj.maxVal : 9)} ]، إِذَا جَمَعْتَ لِي النَّاتِجَ صِفْرًا أَبْقَى كَمَا أَنَا. فَمَنْ أَكُون...؟ <br>العَدَدُ الذَّكِيُّ هُوَ: <span class="blank-space"></span>`;
            break;
        case "lesson":
            const v = getRandomIntSeeded(lessonObj.minVal || 1, lessonObj.maxVal || 20, seed);
            body = `<b>سُؤالُ الِابْتِكاَرِ:</b> اكْتُبْ كَلِمَةً أَوْ ارْسُمْ رَسْمَةً مَبْنِيَّةً عَلَى خَيَالِكَ التَّامِّ تُعَبِّرُ عَنْ تَمْثِيلِ العَدَدِ المُنْضَبِطِ [ <b>${toEasternArabicDigits(v)}</b> ]: <br><br> [ ........................................................................................ ]`;
            break;
        case "comparison":
            body = `<b>فَكِّرْ ثُمَّ أَجِبْ:</b> اكْتُبْ عَدَدًا مَفْقُودًا فِي الفَرَاغِ لِتَكُونَ الجُمْلَةُ الرِّيَاضِيَّةُ صَحِيحَةً تَمَامًا: <br><p style="text-align:center; font-size:15pt;"><span class="blank-space"></span> &gt; ${toEasternArabicDigits((lessonObj.minVal || 0) + 1)}</p>`;
            break;
        case "ordering":
            body = `<b>تحدّي التَّرْتِيبِ:</b> اكْتُبْ ثَلَاثَةَ أَعْدَادٍ مُخْتَلِفَةٍ مِنْ عِنْدِكَ تَقَعُ تَمَامًا بَيْنَ العَدَدِ [ ${toEasternArabicDigits(lessonObj.minVal || 0)} ] وَالعَدَدِ [ ${toEasternArabicDigits(lessonObj.maxVal || 10)} ] مُرَتَّبَةً تَصَاعُدِيًّا: <br><br> <span class="blank-space"></span> ، <span class="blank-space"></span> ، <span class="blank-space"></span>`;
            break;
        case "operation_add":
        case "operation_add_carry":
            const targetAdd = getRandomIntSeeded((lessonObj.minVal || 0) + 3, lessonObj.maxVal || 20, seed);
            body = `<b>مَحْفِلُ التَّفْكِيرِ:</b> جِدْ عَدَدَيْنِ مُخْتَلِفَيْنِ إِذَا قُمْنَا بِجَمْعِهِمَا مَعًا كَانَ النَّاتِجُ يُسَاوِي تَمَامًا العَدَدَ [ <b>${toEasternArabicDigits(targetAdd)}</b> ]: <br><br> <span class="blank-space"></span> + <span class="blank-space"></span> = ${toEasternArabicDigits(targetAdd)}`;
            break;
        case "operation_sub":
        case "operation_sub_borrow":
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
        case "mul_concept":
        case "mul_table":
            const fact = lessonObj.factor ? lessonObj.factor : 2;
            body = `<b>التَّحَدِّي الرَّقْمِيُّ للضَّرْبِ:</b> ارْسَمْ شَبَكَةً مَبْنِيَّةً عَلَى مَصْفُوفَاتِ البَصَرِيَّةِ تُوَضِّحُ حَقِيقَةَ جُمْلَةِ الضَّرْبِ التَّالِيَةِ: [ <b>${toEasternArabicDigits(3)} × ${toEasternArabicDigits(fact)}</b> ] <br><br> [ ........................................................................................ ]`;
            break;
        case "geometry":
            body = `<b>الِابْتِكَارُ الهَنْدَسِيُّ:</b> ارْسُمْ شَكْلاً هَنْدَسِيّاً مَحْسُوساً يَمْتَلِكُ أَقَلَّ عَدَدٍ مِنَ الأَضْلَاعِ، ثُمَّ حَدِّدِ اسْمَهُ وَعَدَدَ رُؤُوسِهِ: <br><br> اِسْمُ الشَّكْلِ: <span class="blank-space"></span> ، عَدَدُ رُؤُوسِهِ: <span class="blank-space"></span>`;
            break;
        case "division":
            body = `<b>تَحَدِّي التَّوْزِيعِ التَّكَيُّفِيِّ:</b> إِذَا كَانَ لَدَيْكَ [ <b>${toEasternArabicDigits(12)}</b> ] تُفَّاحَةً، كَيْفَ تُقَسِّمُهَا بِالتَّسَاوِي عَلَى ثَلَاثَةِ صِحَانٍ؟ مَثِّلْ ذَلِكَ بِرَسْمَةٍ ثُمَّ اكْتُبْ عَدَدَ التُّفَّاحَاتِ فِي الكُلِّ صَحْنٍ: <br><br> العَدَدُ فِي الكُلِّ صَحْنٍ = <span class="blank-space"></span> تُفَّاحَاتٍ.`;
            break;
        case "fraction":
            body = `<b>التَّفْكِيرُ النَّقْدِيُّ لِلْكُسُورِ:</b> ارْسَمْ مُسْتَطِيلًا كَامِلًا وَقَسِّمْهُ لِيُمَثِّلَ كَسْرَ الرُّبُعِ الحِسَابِيَّ [ <b>١/٤</b> ] مَعَ تَلْوِينِ الجُزْءِ المُعَبِّرِ عَنْهُ بَصارِيًّا: <br><br> [ ........................................................................................ ]`;
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

/**
 * دالة البناء الخوارزمي التراكمي لكتل الأسئلة الرياضية
 */
function buildAlgorithmicQuestion(index, lesson, seed, levelMode) {
    const arabicIndex = toEasternArabicDigits(index);
    let title = `<span class="question-title-text">السؤال ${arabicIndex}:</span>`; 
    let body = "";
    
    let mode = index % 3;
    if (levelMode === "concrete") mode = 0;
    if (levelMode === "semi_concrete") mode = 2;
    if (levelMode === "abstract") mode = 1;

    switch(lesson.type) {
        case "diagnostic":
        case "unit_review":
            if (mode === 0) {
                const n1 = getRandomIntSeeded(lesson.minVal, Math.floor(lesson.maxVal / 2), seed);
                const n2 = getRandomIntSeeded(1, lesson.maxVal - n1, seed + "diag_a");
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الجَمْعِ الرِّيَاضِيَّةِ التَّالِيَةِ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(n1)} + ${toEasternArabicDigits(n2)} = <span class="blank-space"></span></div>`;
            } else if (mode === 1) {
                const v1 = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed);
                const v2 = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed + "diag_b");
                title += ` قَارِنْ بَيْنَ العَدَدَيْنِ بِوَضْعِ الإِشَارَةِ Mُنَاسِبَةِ ( > ، < ، = ) دَاخِلَ الفَرَاغِ:`;
                body = `<p style="text-align:center; font-size:15pt;">${toEasternArabicDigits(v1)} <span class="blank-space"></span> ${toEasternArabicDigits(v2)}</p>`;
            } else {
                const start = getRandomIntSeeded(lesson.minVal, lesson.maxVal - 3, seed);
                title += ` تَتَبَّعِ التَّسَلْسُلَ العَدَدِيَّ المُنْتَظَمَ ثُمَّ اكْتُبِ الأَعْدَادَ Mَفْقُودَةَ:`;
                body = `<p style="text-align:center; font-size:15pt;">${toEasternArabicDigits(start)} ، ${toEasternArabicDigits(start+1)} ، <span class="blank-space"></span> ، <span class="blank-space"></span></p>`;
            }
            break;

        case "lesson":
            const currentVal = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed);
            if (mode === 0 && lesson.shape && currentVal > 0) {
                title += ` عُدَّ الأَشْكَالَ البَصَرِيَّةَ المُرَتَّبَةَ ثُمَّ اكْتُبِ العَدَدَ المُنَاسِبَ دَاخِلَ الفَرَاغِ:`;
                body = `<div class="shapes-container">${lesson.shape.repeat(currentVal)}</div> عَدَدُ العَنَاصِرِ الكُلِّيِّ = <span class="blank-space"></span>`;
            } else if (mode === 2 && currentVal > 0) {
                title += ` ارْسُمْ عَنَاصِرَ هَنْدَسِيَّةً مُبَسَّطَةً (دَوَائِرَ أَوْ نِقَاطاً) تُمَثِّلُ القِيمَةَ العَدَدِيَّةَ تَمَاماً:`;
                body = `المَطْلُوبُ رَسْمُ مَا يُمَاثِلُ العَدَدَ [ <b>${toEasternArabicDigits(currentVal)}</b> ] دَاخِلَ الحَيِّزِ المَقَابِلِ: <br><br> [ ........................................................................................ ]`;
            } else {
                const finalVal = currentVal === 0 ? lesson.minVal : currentVal;
                title += ` اكْتُبِ الرَّمْزَ العَدَدِيَّ الصَّحِيحَ لِلْعَدَدِ [ ${toEasternArabicDigits(finalVal)} ] بِخَطٍّ سَلِيمٍ وَمُكَرَّرٍ:`;
                body = `<p style="font-size:18pt; letter-spacing:40px; text-align:center;">${toEasternArabicDigits(finalVal)} —— ${toEasternArabicDigits(finalVal)} —— ${toEasternArabicDigits(finalVal)}</p>`;
            }
            break;

        case "comparison":
            const c1 = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed);
            let c2 = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed + "comp");
            if (c1 === c2) c2 = (c2 === lesson.maxVal) ? c2 - 1 : c2 + 1;
            title += ` قَارِنْ بَيْنَ المَقَادِيرِ وَالرُّمُوزِ العَدَدِيَّةِ المُرَتَّبَةِ بِوَضْعِ الإِشَارَةِ الصَّحِيحَةِ ( > ، < ، = ):`;
            body = `<p style="font-size:16pt; text-align:center;">${toEasternArabicDigits(c1)} <span class="blank-space"></span> ${toEasternArabicDigits(c2)}</p>`;
            break;

        case "ordering":
            let arr = [];
            let attempts = 0;
            while(arr.length < 3 && attempts < 20) {
                let r = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed + attempts);
                if(!arr.includes(r)) arr.push(r);
                attempts++;
            }
            while(arr.length < 3) arr.push(arr.length + 1);
            
            if (mode === 0 || mode === 2) {
                title += ` رَتِّبِ Mَجْمُوعَةَ العَدَدِيَّةَ التَّالِيَةَ تَرْتِيباً تَصَاعُدِيًّا صَحِيحاً (مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ):`;
                body = `<p style="font-size:15pt; text-align:center; letter-spacing:12px;">${arr.map(toEasternArabicDigits).join(' ، ')}</p> التَّرْتِيبُ التَّصَاعُدِيُّ الصَّحِيحُ: <span class="blank-space-long"></span>`;
            } else {
                title += ` رَتِّبِ Mَجْمُوعَةَ العَدَدِيَّةَ التَّالِيَةَ تَرْتِيباً تَنَازُلِيًّا صَحِيحاً (مِنَ الأَكْبَرِ إِلَى الأَصْغَرِ):`;
                body = `<p style="font-size:15pt; text-align:center; letter-spacing:12px;">${arr.map(toEasternArabicDigits).join(' ، ')}</p> التَّرْتِيبُ التَّنَازُلِيُّ الصَّحِيحُ: <span class="blank-space-long"></span>`;
            }
            break;

        case "operation_add":
        case "operation_add_carry":
            const totalMax = lesson.maxVal;
            const a1 = getRandomIntSeeded(lesson.minVal, totalMax - 1, seed);
            const a2 = getRandomIntSeeded(0, totalMax - a1, seed + "add_c");
            if (mode === 0) {
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الجَمْعِ الأُفُقِيِّ الصَّافِيَةِ التَّالِيَةِ بِدِقَّةٍ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(a1)} + ${toEasternArabicDigits(a2)} = <span class="blank-space"></span></div>`;
            } else if (mode === 1) {
                title += ` أَوْجِدِ Mَجْمُوعَ الحِسَابِيَّ مِنْ خِلالِ عَمَلِيَّةِ الجَمْعِ العَمُودِيِّ Mُنَظَّمَةِ:`;
                body = `<div style="font-size:16pt; text-align:center; width:90px; margin:15px auto; border:2px solid #000; padding:12px; line-height:1.6;">${toEasternArabicDigits(a1)}<br>+<br>${toEasternArabicDigits(a2)}<br><hr style="border-top:2px solid #000;"></div>`;
            } else {
                title += ` حُلَّ Mَسْأَلَةَ اللَّفْظِيَّةَ وَالسِّيَاقِيَّةَ التَّالِيَةَ لِمَفْهُومِ الجَمْعِ Mُنْضَبِطِ:`;
                body = ` مَعَ طَالِبٍ [ ${toEasternArabicDigits(a1)} ] قِطَعٍ، وَأَعْطَاهُ وَالِدُهُ [ ${toEasternArabicDigits(a2)} ] قِطَعٍ إِضَافِيَّةٍ. كَمْ قِطْعَةً أَصْبَحَتْ مَعَهُ؟ <br> Mَجْمُوعُ Mُنْضَبِطُ = <span class="blank-space"></span> قِطَعٍ.`;
            }
            break;

        case "operation_sub":
        case "operation_sub_borrow":
            const s1 = getRandomIntSeeded(Math.floor((lesson.maxVal + lesson.minVal) / 2), lesson.maxVal, seed);
            const s2 = getRandomIntSeeded(lesson.minVal, s1, seed + "sub_c");
            if (mode === 0) {
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الطَّرْحِ الأُفُقِيِّ الصَّافِيَةِ التَّالِيَةِ بِدِقَّةٍ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(s1)} - ${toEasternArabicDigits(s2)} = <span class="blank-space"></span></div>`;
            } else if (mode === 1) {
                title += ` أَوْجِدِ البَاقِي الحِسَابِيَّ مِنْ خِلَالِ دَالَّةِ الطَّرْحِ العَمُودِيِّ Mُنَسَّقَةِ:`;
                body = `<div style="font-size:16pt; text-align:center; width:90px; margin:15px auto; border:2px solid #000; padding:12px; line-height:1.6;">${toEasternArabicDigits(s1)}<br>-<br>${toEasternArabicDigits(s2)}<br><hr style="border-top:2px solid #000;"></div>`;
            } else {
                title += ` اقْرَأِ Mَسْأَلَةَ اللَّفْظِيَّةَ الحَيَاتِيَّةَ التَّالِيَةَ ثُمَّ أَوْجِدْ نَاتِجَ الطَّرْحِ (البَاقِي):`;
                body = ` كَانَ فِي Mَزْرَعَةِ [ ${toEasternArabicDigits(s1)} ] خِرَافٍ، خَرَجَ مِنْهَا [ ${toEasternArabicDigits(s2)} ] خِرَافٍ. كَمْ خَرُوفاً بَقِيَ فِي Mَزْرَعَةِ؟ <br> البَاقِي الفِعْلِيُّ = <span class="blank-space"></span> خِرَافٍ.`;
            }
            break;

        case "components":
            const compNum = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed);
            const part1 = getRandomIntSeeded(0, compNum, seed + "comp_p");
            title += ` حَلِّلِ Mِقْدَارَ العَدَدِ المَذْكُورَ لِإِيجَادِ مُكَوِّنَاتِ الأَعْدَادِ Mَفْقُودَةِ:`;
            body = `مِنْ مُكَوِّنَاتِ العَدَدِ Mُنْضَبِطِ [ <b>${toEasternArabicDigits(compNum)}</b> ] هُوَ العَدَدُ ${toEasternArabicDigits(part1)} وَالعَدَدُ <span class="blank-space"></span>`;
            break;

        case "operation_mixed":
            const m1 = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed);
            if (mode === 0) {
                const m2 = getRandomIntSeeded(0, lesson.maxVal - m1, seed + "mix_add");
                title += ` أَوْجِدِ Mَجْمُوعَ الدَّقِيقَ الحِسَابِيَّ لِلْعَمَلِيَّةِ Mُرَتَّبَةِ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(m1)} + ${toEasternArabicDigits(m2)} = <span class="blank-space"></span></div>`;
            } else {
                const m2 = getRandomIntSeeded(0, m1, seed + "mix_sub");
                title += ` أَوْجِدِ البَاقِي الدَّقِيقَ الحِسَابِيَّ لِلْعَمَلِيَّةِ Mُرَتَّبَةِ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(m1)} - ${toEasternArabicDigits(m2)} = <span class="blank-space"></span></div>`;
            }
            break;

        case "pattern":
            const pNum = getRandomIntSeeded(lesson.minVal, lesson.maxVal, seed);
            if (mode === 0) {
                title += ` حَدِّدْ تَصْنِيفَ القِيمَةِ Mَنْزِلِيَّةِ العَدَدِيَّةِ Mَذْكُورَةِ (زَوْجِيّ أَمْ فَرْدِيّ):`;
                body = `العَدَدُ [ <b>${toEasternArabicDigits(pNum)}</b> ] يُعْتَبَرُ عَدَداً: <span class="blank-space"></span> (اكتب: زَوْجِيّ أوْ فَرْدِيّ)`;
            } else {
                title += ` تَتَبَّعْ قِيَمَ النَّمَطِ العَدَدِيِّ الرِّيَاضِيِّ Mُرَتَّبِ بانتِظَامٍ ثُمَّ أَكْمِلْ الفَرَاغَاتِ:`;
                body = `<p style="text-align:center; font-size:15pt;">${toEasternArabicDigits(pNum)} ، ${toEasternArabicDigits(pNum+2)} ، ${toEasternArabicDigits(pNum+4)} ، <span class="blank-space"></span></p>`;
            }
            break;

        case "mul_concept":
            const grp = getRandomIntSeeded(2, 5, seed);
            const ele = getRandomIntSeeded(2, 5, seed + "mul_c");
            title += ` حَوِّلْ جُمْلَةَ الجَمْعِ المُتَكَرِّرِ وَالMَجْمُوعَاتِ المُتَسَاوِيَةِ إِلَى جُمْلَةِ ضَرْبٍ Mُنْضَبِطَةٍ:`;
            let repArr = Array(grp).fill(toEasternArabicDigits(ele)).join(" + ");
            body = `<p style="text-align:center; font-size:15pt;">${repArr} = <span class="blank-space"></span> × <span class="blank-space"></span> = <span class="blank-space"></span></p>`;
            break;

        case "mul_table":
            const multi = getRandomIntSeeded(1, 10, seed);
            if (mode === 0) {
                title += ` أَوْجِدْ حَقِيقَةَ الحِسَابِ الصَّافِيَةِ وَالMُبَاشِرَةِ لِجَدْوَلِ العَدَدِ (${toEasternArabicDigits(lesson.factor)}):`;
                body = `<div class="math-column-form">${toEasternArabicDigits(multi)} × ${toEasternArabicDigits(lesson.factor)} = <span class="blank-space"></span></div>`;
            } else {
                title += ` حُلَّ Mَسْأَلَةَ اللَّفْظِيَّةَ Mَبْنِيَّةَ عَلَى سِيَاقِ حَقَائِقِ جَدْوَلِ الضَّرْبِ لِلْعَدَدِ (${toEasternArabicDigits(lesson.factor)}):`;
                body = `يُوجَدُ لَدَى المُعَلِّمِ [ ${toEasternArabicDigits(multi)} ] صَفَافِيحَ، فِي كُلِّ صَفِيحَةٍ [ ${toEasternArabicDigits(lesson.factor)} ] أَقْلَامٍ. مَا عَدَدُ الأَقْلَامِ الكُلِّي؟ <br> الحَلُّ Mَعْيَارِيُّ: <span class="blank-space"></span> × <span class="blank-space"></span> = <span class="blank-space"></span> قَلَماً.`;
            }
            break;

        case "geometry":
            if (mode === 0) {
                title += ` مَيِّزِ الشَّكْلَ الهَنْدَسِيَّ Mُرْسُومَ أَمَامَكَ ثُمَّ اكْتُبْ اسْمَهُ الصَّحِيحَ:`;
                body = `<div style="font-size:24pt; padding:10px;">${lesson.shape || '🔺'}</div> اِسْمُ الشَّكْلِ Mَشْهُودِ = <span class="blank-space"></span>`;
            } else if (mode === 1) {
                title += ` حَدِّدْ خَصَائِصَ الشَّكْلِ الهَنْدَسِيِّ Mَطْلُوبِ عِلْمِيّاً:`;
                body = `المُثَلَّثُ لَهُ عَدَدُ <span class="blank-space"></span> أَضْلَاعٍ، وَعَدَدُ <span class="blank-space"></span> رُؤُوسٍ ثَابِتَةٍ.`;
            } else {
                title += ` ارْسُمْ شَكْلاً هَنْدَسِيّاً سَلِيماً حَسَبَ التَّعْلِيمَاتِ:`;
                body = `المَطْلُوبُ رَسْمُ (مُرَبَّعٍ) مُنْتَظَمٍ وَاضِحِ الأَعْمِدَةِ دَاخِلَ Mِسَاحَةِ: <br><br> [ ........................................................................................ ]`;
            }
            break;

        case "division":
            const div1 = getRandomIntSeeded(2, 5, seed) * 2;
            if (mode === 2) {
                title += ` حُلَّ Mَسْأَلَةَ اللَّفْظِيَّةَ التَّالِيَةَ لِمَفْهُومِ التَّوْزِيعِ بِالتَّسَاوِي:`;
                body = `وَزَّعَتْ أُمٌّ [ ${toEasternArabicDigits(div1)} ] قِطَعِ حَلْوَى عَلَى اِثْنَيْنِ مِنْ أَبْنَائِهَا بِالتَّسَاوِي. كَمْ قِطْعَةً أَخَذَ كُلُّ وَاحِدٍ؟ <br> نَصِيبُ الكُلِّ وَاحِدٍ = <span class="blank-space"></span> قِطَعٍ.`;
            } else {
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ القِسْمَةِ الحِسَابِيَّةِ Mُرَتَّبَةِ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(div1)} ÷ ٢ = <span class="blank-space"></span></div>`;
            }
            break;

        case "fraction":
            if (mode === 0) {
                title += ` اقْرَأِ الكَسْرَ البَصَرِيَّ ثُمَّ اكْتُبِ الرَّمْزَ العَدَدِيَّ Mُنَاسِبَ لَهُ:`;
                body = `جُزْءٌ وَاحِدٌ مُظَلَّلٌ مِنْ بَيْنِ ثَلَاثَةِ أَجْزَاءٍ مُتَسَاوِيَةٍ يُعَبِّرُ عَنِ الكَسْرِ: <span class="blank-space"></span>`;
            } else {
                title += ` اكْتُبِ الكَسْرَ الرِّيَاضِيَّ بِالرُّمُوزِ Mُنْضَبِطَةِ:`;
                body = `النِّصْفُ يُكْتَبُ بِالرُّمُوزِ الرِّيَاضِيَّةِ عَلَى صُورَةِ: <span class="blank-space"></span>`;
            }
            break;
    }

    return `<div class="question-block">
        <div class="question-title">
            ${title}
            <button class="delete-action no-print" onclick="removeQuestion(this)">❌ استبعاد</button>
        </div>
        <div class="question-body">${body}</div>
    </div>`;
}

// --- أحداث الإطلاق البدئية للمنظومة عند تحميل المتصفح ---
window.onload = function() { 
    loadMetadata();
    populateLessons(); 
    generateWorksheet(); 
};
