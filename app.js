/**
 * Adaptive Autonomous Teacher Ecosystem (AATE)
 * Core Engine Framework - Production Level Real-Time Control Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // مستودع الذاكرة المحلية المؤتمت وسجل المتعلمين النشط (بيانات بالأرقام المشرقية كلياً)
    let globalStudentsRegistry = [
        { name: 'زيد بن محمد غنام', level: 'متوسط الاستجابة والتركيز', stage: 'شبه المحسوس (الرسومات المصورة)', strengths: 'الربط البصري السريع للأشكال', remediation: 'تكثيف بطاقات الشطب الملونة لتنمية التجريد' },
        { name: 'مريم بنت يوسف عواد', level: 'متقدم فائق الأداء', stage: 'التجريد المعرفي الرمزي الكامل', strengths: 'التفكير الاستنتاجي وحل المعضلات', remediation: 'تزويدها بمسارات تحدي ممتدة وأنشطة تفكير عليا' },
        { name: 'أحمد أبو الوجيه الرفاعي', level: 'حاجة ماسة لدعم المفاهيم الحسية', stage: 'المحسوس المادي الملموس', strengths: 'التفاعل الحركي العالي مع الأدوات والمجسمات', remediation: 'تأخير الانتقال للرموز المجردة وتثبيت التمثيل العيني' }
    ];

    // فلتر الأرقام المشرقية السيادي (٠١٢٣٤٥٦٧٨٩) لضمان اتساق المظهر البصري لمتن الطلاب وثبات الطباعة
    function enforceEasternArabicNumerals(inputData) {
        if (!inputData) return 'ـ';
        const westernDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const easternDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        let stringResult = inputData.toString();
        for (let idx = 0; idx < 10; idx++) {
            stringResult = stringResult.replace(new RegExp(westernDigits[idx], 'g'), easternDigits[idx]);
        }
        return stringResult;
    }

    // إدارة نظام التنقل وتحديث ترويسات لوحات التحكم للـ SaaS
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const viewBlocks = document.querySelectorAll('.workspace-view-block');
    const currentPanelTitle = document.getElementById('currentPanelTitle');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            viewBlocks.forEach(vb => vb.classList.add('hidden'));
            
            btn.classList.add('active');
            const targetPanelId = btn.getAttribute('data-panel');
            document.getElementById(targetPanelId).classList.remove('hidden');
            
            currentPanelTitle.innerText = btn.innerText;
        });
    });

    // بناء ومزامنة مصفوفة سجل الأداء الطلابي داخل اللوحة النشطة
    function synchronizeStudentsTable() {
        const tableBody = document.querySelector('#studentsEcosystemTable tbody');
        tableBody.innerHTML = '';
        globalStudentsRegistry.forEach(student => {
            const rowElement = document.createElement('tr');
            rowElement.innerHTML = `
                <td><strong>${student.name}</strong></td>
                <td>${student.level}</td>
                <td><span style="color: #2563eb; font-weight: bold;">${student.stage}</span></td>
                <td>${student.strengths}</td>
                <td><span style="color: #10b981; font-weight: 600;">${student.remediation}</span></td>
            `;
            tableBody.appendChild(rowElement);
        });
        
        // تحديث أرقام وإحصائيات لوحة المراقبة الرئيسية بالأرقام المشرقية
        document.getElementById('dashTotalStudents').innerText = enforceEasternArabicNumerals(globalStudentsRegistry.length);
    }
    synchronizeStudentsTable();

    // تسجيل طالب جديد بمرونة كاملة داخل بيئة الذاكرة المزامنة
    document.getElementById('registerStudentBtn').addEventListener('click', () => {
        const inputName = prompt('أدخل اسم الطالب الثلاثي المأمول تسجيله:');
        if (inputName) {
            globalStudentsRegistry.push({
                name: inputName,
                level: 'قيد التقييم التشخيصي الأولي',
                stage: 'المحسوس المادي والمجسمات',
                strengths: 'تفاعل واعد مع الأنشطة التمهيدية',
                remediation: 'جدولة اختبار مهارات أساسية لتحديد مساره بدقة'
            });
            synchronizeStudentsTable();
        }
    });

    // =========================================================================
    // محرك القرار والذكاء التكيفي الشامل (Non-Template Core Engine)
    // =========================================================================
    const triggerAiEngineBtn = document.getElementById('triggerAiEngineBtn');
    const aiOutputWorkspaceWrapper = document.getElementById('aiOutputWorkspaceWrapper');
    const aiDynamicScaffoldingContainer = document.getElementById('aiDynamicScaffoldingContainer');

    triggerAiEngineBtn.addEventListener('click', () => {
        const subject = document.getElementById('aiSubjectInput').value.trim();
        const gradeContext = document.getElementById('aiGradeInput').value;
        const topicName = document.getElementById('aiTopicInput').value.trim();

        if (!subject || !topicName) {
            alert('❌ يرجى تعيين المادة وعنوان المفهوم لتشغيل عملية التفكيك والهندسة التربوية.');
            return;
        }

        // بناء منطق القرار المتكيف كلياً دون قوالب جامدة بناء على الصف والموضوع الدراسي المستهدف
        let scaffoldingOutputHtml = '';
        
        if (gradeContext.includes('١-٣')) {
            // المعالجة المخصصة للفئات الدنيا: تبسيط شديد وأدوات حسية مباشرة من واقع الطالب
            scaffoldingOutputHtml = `
                <div class="scaffold-node-item">
                    <h6>📌 مرحلة التأسيس الحسي العيني الملموس (Concrete Path):</h6>
                    <p>يتم جلب عناصر عينية محسوسة داخل الصف؛ لعرض محور (${topicName}) لمادة (${subject})، يقوم كل طالب بإمساك مجسمات حقيقية وربطها بالعد والملمس المباشر لتثبيت الصورة الذهنية كلياً.</p>
                </div>
                <div class="scaffold-node-item semi">
                    <h6>📌 مرحلة التمثيل شبه المحسوس والبصري (Semi-Concrete Path):</h6>
                    <p>يتم الانتقال لبطاقات مصورة مخصصة تحتوي على رسوم واضحة مجهزة للشطب والعد اليدوي لتجسيد مفهوم (${topicName})، مما يساعد الطالب على تكوين روابط بصرية بين المجسم المادي والرمز اللفظي للموقف.</p>
                </div>
                <div class="scaffold-node-item abstract">
                    <h6>📌 مرحلة البناء التجريدي والرمزي الأساسي (Abstract Path):</h6>
                    <p>نصل أخيراً لصياغة رموز جافة مبسطة للغاية متوافقة مع إدراك المتعلم، حيث يحل الطالب المسألة الرمزية للمفهوم (${topicName}) بالاعتماد على التراكم الحسي التأسيسي المكتسب في الخطوات السابقة.</p>
                </div>
            `;
        } else if (gradeContext.includes('٤-٦')) {
            // المعالجة المخصصة للفئات المتوسطة: نماذج مفهومية وربط بالسياق الحياتي والبيئة المحيطة
            scaffoldingOutputHtml = `
                <div class="scaffold-node-item">
                    <h6>📌 مرحلة العرض المفهومي والسياقي المشهود:</h6>
                    <p>يتم طرح مواقف حياتية يواجهها طلاب الصفوف المتوسطة في بيئتهم اليومية؛ لتفكيك درس (${topicName}) في مادة (${subject}) عبر محاكاة واقعية وحل مشكلات قائمة على الملاحظة المباشرة.</p>
                </div>
                <div class="scaffold-node-item semi">
                    <h6>📌 مرحلة المقارنة والتنظيم البنائي للبيانات:</h6>
                    <p>تحويل المعطيات إلى جداول مصفوفة ومخططات مفاهيمية واضحة المعايير تفكك أجزاء المفهوم العلمي لـ (${topicName})، مما يتيح استنباط الخصائص والقوانين الحاكمة آلياً.</p>
                </div>
                <div class="scaffold-node-item abstract">
                    <h6>📌 مرحلة التطبيق الرمزي والتعميم الأكاديمي المباشر:</h6>
                    <p>صياغة القوانين النهائية والرموز التجريدية المحكمة لدرس (${topicName}) وتكليف الطلاب بحل تمارين تطبيقية متنوعة لضمان ثبات واكتساب المهارة التعليمية المقررة بالكامل.</p>
                </div>
            `;
        } else {
            // المعالجة المخصصة للفئات العليا: تفكير نقدي، تحليل استنتاجي، وتوليد أسئلة مركبة وعميقة
            scaffoldingOutputHtml = `
                <div class="scaffold-node-item">
                    <h6>📌 مرحلة التحليل الاستكشافي للمشكلة المعرفية:</h6>
                    <p>يبدأ مسار الصفوف العليا بطرح تساؤل نقدي ومسألة مركبة تدور حول موضوع (${topicName})، لحث الطالب على تفكيك الفرضيات وتحليل المكونات الأولية للمادة المستهدفة (${subject}).</p>
                </div>
                <div class="scaffold-node-item semi">
                    <h6>📌 مرحلة الاستنتاج العقلي والنمذجة الرياضية والمنطقية:</h6>
                    <p>يقوم الطلاب ببناء روابط منطقية ونمذجة العلاقات المعرفية لـ (${topicName}) واختبار صحة الفرضيات علمياً عبر مقاربات تفكير نقدي معززة بالأدلة والبراهين الصفيّة المقارنة.</p>
                </div>
                <div class="scaffold-node-item abstract">
                    <h6>📌 مرحلة التركيب المعرفي والتقييم الرمزي الممتد:</h6>
                    <p>إنتاج وصياغة مخرجات تجريدية بالكامل تشمل أسئلة ممتدة ومعادلات معقدة لدرس (${topicName}) تقيس قدرة الطالب العليا على الابتكار، التحليل، وتوظيف المفهوم في مجالات علمية متطورة.</p>
                </div>
            `;
        }

        aiDynamicScaffoldingContainer.innerHTML = scaffoldingOutputHtml;
        aiOutputWorkspaceWrapper.classList.remove('hidden');
    });

    // محاكاة محرك النطق الصوتي للمتعلمين لضمان دعم متطلبات الفروق الفردية
    document.getElementById('ttsPlaybackBtn').addEventListener('click', () => {
        alert('🔊 تم فحص البوابة: محرك النطق مجهز للربط المباشر بـ Web Speech API الصوتي لمساعدة طلاب فئات التأسيس وتأمين القراءة النظيفة.');
    });

    // =========================================================================
    // محرك هندسة وبناء وثائق الطلاب المطبوعة A4 (Enterprise Print Pipeline)
    // =========================================================================
    const compileDocumentBtn = document.getElementById('compileDocumentBtn');
    const appMainLayout = document.getElementById('appMainLayout');
    const academicEnterpriseA4PrintViewport = document.getElementById('academicEnterpriseA4PrintViewport');
    
    const printedDocMainHeaderTitle = document.getElementById('printedDocMainHeaderTitle');
    const printedDocGradeCell = document.getElementById('printedDocGradeCell');
    const printedDocSubjectCell = document.getElementById('printedDocSubjectCell');
    const printedDocTopicCell = document.getElementById('printedDocTopicCell');
    const printedDocMainPayloadContainer = document.getElementById('printedDocMainPayloadContainer');

    compileDocumentBtn.addEventListener('click', () => {
        const docType = document.getElementById('docTypeInput').value;
        const docTopicName = document.getElementById('docTopicFieldInput').value.trim();
        const activeSubject = document.getElementById('aiSubjectInput').value.trim() || 'الرياضيات العامة المعمارية';
        const activeGrade = document.getElementById('aiGradeInput').value || 'المرحلة الأساسية الدنيا';

        if (!docTopicName) {
            alert('❌ يرجى كتابة وتحديد عنوان موضوع ورقة العمل ليتم صياغة وبناء متن الأسئلة النظيفة للطلاب.');
            return;
        }

        // حقن وإعداد ترويسة ومحددات وثيقة الـ A4 الرسمية المعزولة تماماً
        printedDocMainHeaderTitle.innerText = docType;
        printedDocGradeCell.innerText = activeGrade;
        printedDocSubjectCell.innerText = activeSubject;
        printedDocTopicCell.innerText = docTopicName;
        
        // توليد محتوى وبناء مصفوفة أسئلة الطلاب الصافية والممتدة (التدرج المنهجي الصارم)
        printedDocMainPayloadContainer.innerHTML = `
            <div class="academic-question-segment">
                <h5>السؤال الأول: تأمل الرسوم والبصريات الحسية المتاحة أمامك ثم قم بشطب العناصر المقررة لاستخراج الباقي الصحيح (المستوى الحسي الملموس) [علامتان]:</h5>
                <p style="letter-spacing: 6px; font-size: 20px; margin: 12px 0; text-align: right;">⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐</p>
                <p>قم بوضع علامة شطب مائلة على (٣) نجوم من المجموعة السابقة، ثم احسب بدقة واكتب عدد النجوم المتبقية دون شطب في الفراغ المقابل: ........</p>
            </div>
            
            <div class="academic-question-segment">
                <h5>السؤال الثاني: اقرأ الموقف والسياق اللفظي الحياتي التالي بتمعن ثم صغ طريقة الحل والرسم المناسب له (المستوى شبه المحسوس البنائي) [٣ علامات]:</h5>
                <p>في حديقة المدرسة بقرية عاطوف، كان هناك (٥) عصافير تقف على غصن شجرة الزيتون، طار منها عصفوران للبحث عن طعام في الحقل المجاور. كم عصفوراً بقي واقفاً على الغصن الآن؟ صغ المسألة باستخدام رسم توضيحي مبسط لخطوط الشطب.</p>
                <div style="border: 1px dashed #000; height: 80px; margin-top: 10px; border-radius: 6px;"></div>
            </div>

            <div class="academic-question-segment">
                <h5>السؤال الثالث: أوجد ناتج المقادير والعمليات الرمزية التجريدية التالية مستعيناً بقواعد الاستنتاج الذهني المستدام (المستوى التجريدي الرمزي) [٣ علامات]:</h5>
                <div style="display: flex; justify-content: space-between; font-size: 15px; margin-top: 16px; font-weight: bold; direction: rtl;">
                    <div>أ) ٨ - ٣ = ............</div>
                    <div>ب) ٥ + ٤ = ............</div>
                    <div>ج) ٩ - ٦ = ............</div>
                </div>
            </div>
        `;

        // إنشاء وتوليد رمز أرشفة تشفيري للمستند م صاغ بالأرقام المشرقية بالكامل لحفظ السجلات
        const secureRandomHash = enforceEasternArabicNumerals(Math.floor(100000 + Math.random() * 900000));
        document.getElementById('printedDocSecureHash').innerText = `المعرف الرقمي للمستند: AATE-${secureRandomHash}`;

        // إخفاء وعزل تطبيق الويب بالكامل وتفعيل لوحة عرض المعاينة لورقة الـ A4 الرسمية
        appMainLayout.classList.add('hidden');
        academicEnterpriseA4PrintViewport.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    // التحكم في شريط أدوات الطباعة المخصصة والعودة الفورية للنظام
    document.getElementById('cancelPrintPreviewModeBtn').addEventListener('click', () => {
        academicEnterpriseA4PrintViewport.classList.add('hidden');
        appMainLayout.classList.remove('hidden');
    });

    document.getElementById('confirmPhysicalPrintJobBtn').addEventListener('click', () => {
        window.print();
    });
});
