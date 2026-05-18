/**
 * =========================================================================
 * مستودع مناهج الرياضيات - الصف الأول الأساسي (المنهاج الفلسطيني المحدث)
 * المطور: مدرسة عاطوف الأساسية - مديرية طوباس
 * =========================================================================
 */
window.curriculumRepository = window.curriculumRepository || {};

window.curriculumRepository["grade1"] = {
    name: "الصف الأول الأساسي",
    directorate: "مديرية التربية والتعليم - طوباس",
    units: [
        {
            unitName: "الوحدة الأولى: الأعداد ضمن العدد ٩",
            items: [
                { id: "g1_u1_l1", title: "الأعداد (١ ، ٢ ، ٣)", type: "lesson", minVal: 1, maxVal: 3, shape: "🍏" },
                { id: "g1_u1_l2", title: "الأعداد (٤ ، ٥ ، ٦)", type: "lesson", minVal: 4, maxVal: 6, shape: "⭐" },
                { id: "g1_u1_l3", title: "الأعداد (٧ ، ٨ ، ٩)", type: "lesson", minVal: 7, maxVal: 9, shape: "🎈" },
                { id: "g1_u1_l4", title: "مقارنة الأعداد ضمن العدد ٩", type: "comparison", minVal: 1, maxVal: 9, shape: "❤️" },
                { id: "g1_u1_l5", title: "ترتيب الأعداد تصاعدياً وتنازلياً", type: "sorting", minVal: 1, maxVal: 9 }
            ]
        },
        {
            unitName: "الوحدة الثانية: الجمع والطرح ضمن العدد ٩",
            items: [
                { id: "g1_u2_l1", title: "مفهوم عملية الجمع وعناصرها", type: "worksheet", minVal: 1, maxVal: 9, shape: "🌸" },
                { id: "g1_u2_l2", title: "مكونات الأعداد ضمن العدد ٩", type: "worksheet", minVal: 1, maxVal: 9, shape: "✏️" },
                { id: "g1_u2_l3", title: "الامتحان التشخيصي الفتري الأول", type: "diagnostic", minVal: 1, maxVal: 9, shape: "🔍" }
            ]
        }
    ]
};
