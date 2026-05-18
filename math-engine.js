/**
 * =========================================================================
 * المنظومة الرقمية لأتمتة أوراق العمل التكيفية - محرك التوليد الرياضي
 * المطور: مدرسة عاطوف الأساسية - مديرية طوباس
 * =========================================================================
 */

/**
 * دالة البناء الخوارزمي التراكمي لكتل الأسئلة الرياضية المتوافقة مع هيكلية المناهج
 */
function buildAlgorithmicQuestion(index, lesson, seed, levelMode) {
    const arabicIndex = toEasternArabicDigits(index);
    let title = `<span class="question-title-text">السؤال ${arabicIndex}:</span>`; 
    let body = "";
    
    let mode = index % 3;
    if (levelMode === "concrete") mode = 0;
    if (levelMode === "semi_concrete") mode = 2;
    if (levelMode === "abstract") mode = 1;

    const minV = lesson.minVal !== undefined ? lesson.minVal : 1;
    const maxV = lesson.maxVal !== undefined ? lesson.maxVal : 99;

    switch(lesson.type) {
        case "diagnostic":
        case "review":
        case "worksheet":
            if (mode === 0) {
                const n1 = getRandomIntSeeded(minV, Math.floor(maxV / 2), seed);
                const n2 = getRandomIntSeeded(1, maxV - n1, seed + "diag_a");
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الجَمْعِ الرِّيَاضِيَّةِ التَّالِيَةِ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(n1)} + ${toEasternArabicDigits(n2)} = <span class="blank-space"></span></div>`;
            } else if (mode === 1) {
                const v1 = getRandomIntSeeded(minV, maxV, seed);
                const v2 = getRandomIntSeeded(minV, maxV, seed + "diag_b");
                title += ` قَارِنْ بَيْنَ العَدَدَيْنِ بِوَضْعِ الإِشَارَةِ المُنَاسِبَةِ ( > ، < ، = ) دَاخِلَ الفَرَاغِ:`;
                body = `<p style="text-align:center; font-size:15pt;">${toEasternArabicDigits(v1)} <span class="blank-space"></span> ${toEasternArabicDigits(v2)}</p>`;
            } else {
                const start = getRandomIntSeeded(minV, maxV - 3, seed);
                title += ` تَتَبَّعِ التَّسَلْسُلَ العَدَدِيَّ مُنْتَظَمَ ثُمَّ اكْتُبِ الأَعْدَادَ المَفْقُودَةَ:`;
                body = `<p style="text-align:center; font-size:15pt;">${toEasternArabicDigits(start)} ، ${toEasternArabicDigits(start+1)} ، <span class="blank-space"></span> ، <span class="blank-space"></span></p>`;
            }
            break;

        case "lesson":
            const currentVal = getRandomIntSeeded(minV, maxV, seed);
            if (mode === 0 && lesson.shape && currentVal > 0) {
                title += ` عُدَّ الأَشْكَالَ البَصَرِيَّةَ المُرَتَّبَةَ ثُمَّ اكْتُبِ العَدَدَ المُنَاسِبَ دَاخِلَ الفَرَاغِ:`;
                body = `<div class="shapes-container">${lesson.shape.repeat(currentVal)}</div> عَدَدُ العَنَاصِرِ الكُلِّيِّ = <span class="blank-space"></span>`;
            } else if (mode === 2 && currentVal > 0) {
                title += ` ارْسُمْ عَنَاصِرَ هَنْدَسِيَّةً مُبَسَّطَةً (دَوَائِرَ أَوْ نِقَاطاً) تُمَثِّلُ القِيمَةَ العَدَدِيَّةَ تَمَاماً:`;
                body = `المَطْلُوبُ رَسْمُ مَا يُمَاثِلُ العَدَدَ [ <b>${toEasternArabicDigits(currentVal)}</b> ] دَاخِلَ الحَيِّزِ المَقَابِلِ: <br><br> [ ........................................................................................ ]`;
            } else {
                const finalVal = currentVal === 0 ? minV : currentVal;
                title += ` اكْتُبِ الرَّمْزَ العَدَدِيَّ الصَّحِيحَ لِلْعَدَدِ [ ${toEasternArabicDigits(finalVal)} ] بِخَطٍّ سَلِيمٍ وَمُكَرَّرٍ:`;
                body = `<p style="font-size:18pt; letter-spacing:40px; text-align:center;">${toEasternArabicDigits(finalVal)} —— ${toEasternArabicDigits(finalVal)} —— ${toEasternArabicDigits(finalVal)}</p>`;
            }
            break;

        case "comparison":
        case "comparison_adv":
            const c1 = getRandomIntSeeded(minV, maxV, seed);
            let c2 = getRandomIntSeeded(minV, maxV, seed + "comp");
            if (c1 === c2) c2 = (c2 === maxV) ? c2 - 1 : c2 + 1;
            title += ` قَارِنْ بَيْنَ المَقَادِيرِ وَالرُّمُوزِ العَدَدِيَّةِ مُرَتَّبَةِ بِوَضْعِ الإِشَارَةِ الصَّحِيحَةِ ( > ، < ، = ):`;
            body = `<p style="font-size:16pt; text-align:center;">${toEasternArabicDigits(c1)} <span class="blank-space"></span> ${toEasternArabicDigits(c2)}</p>`;
            break;

        case "sorting":
        case "sorting_adv":
            let arr = [];
            let attempts = 0;
            while(arr.length < 3 && attempts < 20) {
                let r = getRandomIntSeeded(minV, maxV, seed + attempts);
                if(!arr.includes(r)) arr.push(r);
                attempts++;
            }
            while(arr.length < 3) arr.push(arr.length + 1);
            
            if (mode === 0 || mode === 2) {
                title += ` رَتِّبِ المَجْمُوعَةَ العَدَدِيَّةَ التَّالِيَةَ تَرْتِيباً تَصَاعُدِيًّا صَحِيحاً (مِنَ الأَصْغَرِ إِلَى الأَكْبَرِ):`;
                body = `<p style="font-size:15pt; text-align:center; letter-spacing:12px;">${arr.map(toEasternArabicDigits).join(' ، ')}</p> التَّرْتِيبُ التَّصَاعُدِيُّ الصَّحِيحُ: <span class="blank-space-long"></span>`;
            } else {
                title += ` رَتِّبِ المَجْمُوعَةَ العَدَدِيَّةَ التَّالِيَةَ تَرْتِيباً تَنَازُلِيًّا صَحِيحاً (مِنَ الأَكْبَرِ إِلَى الأَصْغَرِ):`;
                body = `<p style="font-size:15pt; text-align:center; letter-spacing:12px;">${arr.map(toEasternArabicDigits).join(' ، ')}</p> التَّرْتِيبُ التَّنَازُلِيُّ الصَّحِيحُ: <span class="blank-space-long"></span>`;
            }
            break;

        case "operation_add":
        case "add_carry":
            const a1 = getRandomIntSeeded(minV, Math.floor(maxV / 2), seed);
            const a2 = getRandomIntSeeded(0, maxV - a1, seed + "add_c");
            if (mode === 0) {
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الجَمْعِ الأُفُقِيِّ الصَّافِيَةِ التَّالِيَةِ بِدِقَّةٍ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(a1)} + ${toEasternArabicDigits(a2)} = <span class="blank-space"></span></div>`;
            } else if (mode === 1) {
                title += ` أَوْجِدِ مَجْمُوعَ الحِسَابِيَّ مِنْ خِلالِ عَمَلِيَّةِ الجَمْعِ العَمُودِيِّ مُنَظَّمَةِ:`;
                body = `<div style="font-size:16pt; text-align:center; width:90px; margin:15px auto; border:2px solid #000; padding:12px; line-height:1.6;">${toEasternArabicDigits(a1)}<br>+<br>${toEasternArabicDigits(a2)}<br><hr style="border-top:2px solid #000;"></div>`;
            } else {
                title += ` حُلَّ مَسْأَلَةَ اللَّفْظِيَّةَ وَالسِّيَاقِيَّةَ التَّالِيَةَ لِمَفْهُومِ الجَمْعِ مُنْضَبِطِ:`;
                body = ` مَعَ طَالِبٍ [ ${toEasternArabicDigits(a1)} ] قِطَعٍ، وَأَعْطَاهُ وَالِدُهُ [ ${toEasternArabicDigits(a2)} ] قِطَعٍ إِضَافِيَّةٍ. كَمْ قِطْعَةً أَصْبَحَتْ مَعَهُ؟ <br> مَجْمُوعُ مُنْضَبِطُ = <span class="blank-space"></span> قِطَعٍ.`;
            }
            break;

        case "operation_sub":
        case "sub_borrow":
            const s1 = getRandomIntSeeded(Math.floor((maxV + minV) / 2), maxV, seed);
            const s2 = getRandomIntSeeded(minV, s1, seed + "sub_c");
            if (mode === 0) {
                title += ` جِدْ نَاتِجَ عَمَلِيَّةِ الطَّرْحِ الأُفُقِيِّ الصَّافِيَةِ التَّالِيَةِ بِدِقَّةٍ:`;
                body = `<div class="math-column-form">${toEasternArabicDigits(s1)} - ${toEasternArabicDigits(s2)} = <span class="blank-space"></span></div>`;
            } else if (mode === 1) {
                title += ` أَوْجِدِ البَاقِي الحِسَابِيَّ مِنْ خِلَالِ دَالَّةِ الطَّرْحِ العَمُودِيِّ مُنَسَّقَةِ:`;
                body = `<div style="font-size:16pt; text-align:center; width:90px; margin:15px auto; border:2px solid #000; padding:12px; line-height:1.6;">${toEasternArabicDigits(s1)}<br>-<br>${toEasternArabicDigits(s2)}<br><hr style="border-top:2px solid #000;"></div>`;
            } else {
                title += ` اقْرَأِ مَسْأَلَةَ اللَّفْظِيَّةَ الحَيَاتِيَّةَ التَّالِيَةَ ثُمَّ أَوْجِدْ نَاتِجَ الطَّرْحِ (البَاقِي):`;
                body = ` كَانَ فِي مَزْرَعَةِ [ ${toEasternArabicDigits(s1)} ] خِرَافٍ، خَرَجَ مِنْهَا [ ${toEasternArabicDigits(s2)} ] خِرَافٍ. كَمْ خَرُوفاً بَقِيَ فِي مَزْرَعَةِ؟ <br> البَاقِي الفِعْلِيُّ = <span class="blank-space"></span> خِرَافٍ.`;
            }
            break;

        case "place_value":
        case "place_value_adv":
            const pvNum = getRandomIntSeeded(minV, maxV, seed);
            const pvDigits = pvNum.toString().split('').reverse();
            const ones = pvDigits[0] ? parseInt(pvDigits[0]) : 0;
            const tens = pvDigits[1] ? parseInt(pvDigits[1]) : 0;
            title += ` حَدِّدِ القِيمَةَ Mَنْزِلِيَّةَ لِلْأَعْدَادِ Mُرَتَّبَةِ:`;
            body = `فِي العَدَدِ [ <b>${toEasternArabicDigits(pvNum)}</b> ]، القِيمَةُ المَنْزِلِيَّةُ لِلرَّقْمِ ( ${toEasternArabicDigits(ones)} ) فِي مَنْزِلَةِ الآحَادِ هِيَ <span class="blank-space"></span>، وَلِلرَّقْمِ ( ${toEasternArabicDigits(tens)} ) فِي مَنْزِلَةِ العَشَرَاتِ هِيَ <span class="blank-space"></span>`;
            break;

        case "even_odd":
        case "even_odd_adv":
            const eoNum = getRandomIntSeeded(minV, maxV, seed);
            title += ` حَدِّدْ نَوْعَ العَدَدِ المَذْكُورِ (زَوْجِيّ أَمْ فَرْدِيّ):`;
            body = `العَدَدُ [ <b>${toEasternArabicDigits(eoNum)}</b> ] يُعْتَبَرُ عَدَداً: <span class="blank-space"></span> (اكتب: زَوْجِيّ أوْ فَرْدِيّ)`;
            break;

        default:
            title += ` مَهَمَّةٌ تَعْلِيمِيَّةٌ وَتَطْبِيقٌ عَمَلِيٌّ لِدَرْسِ:`;
            body = `<div style="font-size:14pt; padding:10px; color:#333;">${lesson.title}</div> [ ........................................................................................ ]`;
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
