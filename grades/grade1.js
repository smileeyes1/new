window.curriculumRepository = window.curriculumRepository || {};

window.curriculumRepository.grade1 = {
  name: "الصف الأول الأساسي",
  directorate: "مديرية التربية والتعليم - طوباس",
  units: [
    {
      unitName: "الوحدة الأولى: الأعداد ومقارنتها وترتيبها",
      items: [
        { id: "g١_u١_d١", type: "lesson", minVal: ١, maxVal: ١, title: "العدد واحد" },
        { id: "g١_u١_d٢", type: "lesson", minVal: ٢, maxVal: ٢, title: "العدد اثنان" },
        { id: "g١_u١_d٣", type: "lesson", minVal: ٣, maxVal: ٣, title: "العدد ثلاثة" },
        { id: "g١_u١_d٤", type: "lesson", minVal: ٤, maxVal: ٤, title: "العدد أربعة" },
        { id: "g١_u١_d٥", type: "lesson", minVal: ٥, maxVal: ٥, title: "العدد خمسة" },
        { id: "g١_u١_d٦", type: "lesson", minVal: ٦, maxVal: ٦, title: "العدد ستة" },
        { id: "g١_u١_d٧", type: "lesson", minVal: ٧, maxVal: ٧, title: "العدد سبعة" },
        { id: "g١_u١_d٨", type: "lesson", minVal: ٨, maxVal: ٨, title: "العدد ثمانية" },
        { id: "g١_u١_d٩", type: "lesson", minVal: ٩, maxVal: ٩, title: "العدد تسعة" },
        { id: "g١_u١_d١٠", type: "comparison", minVal: ١, maxVal: ٩, title: "مقارنة عددين" },
        { id: "g١_u١_d١١", type: "sort_asc", minVal: ١, maxVal: ٩, title: "الترتيب التصاعدي" },
        { id: "g١_u١_d١٢", type: "sort_desc", minVal: ١, maxVal: ٩, title: "الترتيب التنازلي" },
        { id: "g١_u١_d١٣", type: "next_num", minVal: ١, maxVal: ٨, title: "العدد التالي" },
        { id: "g١_u١_d١٤", type: "prev_num", minVal: ٢, maxVal: ٩, title: "العدد السابق" },
        { id: "g١_u١_d١٥", type: "ordinal", minVal: ١, maxVal: ٩, title: "الالعدد الترتيبي" }
      ]
    },
    {
      unitName: "الوحدة الثانية: العمليات والأعداد حتى ٢٠",
      items: [
        { id: "g١_u٢_d١", type: "lesson", minVal: ٠, maxVal: ٠, title: "العدد صفر (٠)" },
        { id: "g١_u٢_d٢", type: "components", minVal: ١, maxVal: ٥, title: "مكونات الأعداد (أحاد) أولاً" },
        { id: "g١_u٢_d٣", type: "components", minVal: ٦, maxVal: ٩, title: "مكونات الأعداد (أحاد) ثانياً" },
        { id: "g١_u٢_d٤", type: "operation_add", minVal: ٠, maxVal: ٩, title: "الجمع ضمن العدد ٩" },
        { id: "g١_u٢_d٥", type: "operation_sub", minVal: ٠, maxVal: ٩, title: "الطرح ضمن العدد ٩" },
        { id: "g١_u٢_d٦", type: "relation_add_sub", minVal: ٠, maxVal: ٩, title: "العلاقة بين الجمع والطرح" },
        { id: "g١_u٢_d٧", type: "components_١٠", minVal: ١٠, maxVal: ١٠, title: "العدد ١٠ وتكويناته" },
        { id: "g١_u٢_d٨", type: "lesson", minVal: ١١, maxVal: ١٩, title: "الأعداد من ١١ إلى ١٩" },
        { id: "g١_u٢_d٩", type: "components_٢٠", minVal: ٢٠, maxVal: ٢٠, title: "العدد ٢٠ وتكويناته" }
      ]
    },
    {
      unitName: "الوحدة الثالثة: المفاهيم والعمليات المتقدمة ضمن ١٨",
      items: [
        { id: "g١_u٣_d١", type: "next_num_adv", minVal: ١٠, maxVal: ١٩, title: "العدد التالي" },
        { id: "g١_u٣_d٢", type: "prev_num_adv", minVal: ١١, maxVal: ٢٠, title: "العدد السابق" },
        { id: "g١_u٣_d٣", type: "comparison_adv", minVal: ٠, maxVal: ٢٠, title: "المقارنة بين عددين" },
        { id: "g١_u٣_d٤", type: "sort_asc_adv", minVal: ٠, maxVal: ٢٠, title: "الترتيب التصاعدي" },
        { id: "g١_u٣_d٥", type: "sort_desc_adv", minVal: ٠, maxVal: ٢٠, title: "الترتيب التنازلي" },
        { id: "g١_u٣_d٦", type: "place_value", minVal: ١٠, maxVal: ٢٠, title: "القيمة المنزلية" },
        { id: "g١_u٣_d٧", type: "expanded_form", minVal: ١٠, maxVal: ٢٠, title: "الصورة الموسعة" },
        { id: "g١_u٣_d٨", type: "add_within_١٠", minVal: ٠, maxVal: ١٠, title: "الجمع ضمن العدد (١٠)" },
        { id: "g١_u٣_d٩", type: "add_within_١٨_١", minVal: ١٠, maxVal: ١٨, title: "الجمع ضمن العدد (١٨) أولاً" },
        { id: "g١_u٣_d١٠", type: "add_within_١٨_٢", minVal: ١٠, maxVal: ١٨, title: "الجمع ضمن العدد (١٨) ثانياً" }
      ]
    },
    {
      unitName: "الوحدة الرابعة: الطرح والأعداد حتى ٩٩ والهندسة",
      items: [
        { id: "g١_u٤_d١", type: "sub_within_١٠", minVal: ٠, maxVal: ١٠, title: "الطرح ضمن العدد (١٠)" },
        { id: "g١_u٤_d٢", type: "sub_within_١٨_١", minVal: ٠, maxVal: ١٨, title: "الطرح ضمن العدد (١٨) أولاً" },
        { id: "g١_u٤_d٣", type: "sub_within_١٨_٢", minVal: ٠, maxVal: ١٨, title: "الطرح ضمن العدد (١٨) ثانياً" },
        { id: "g١_u٤_d٤", type: "sub_within_١٨_٣", minVal: ٠, maxVal: ١٨, title: "الطرح ضمن العدد (١٨) ثالثاً" },
        { id: "g١_u٤_d٥", type: "lesson", minVal: ٢٠, maxVal: ٤٠, title: "الأعداد من ٢٠–٤٠" },
        { id: "g١_u٤_d٦", type: "representation", minVal: ٢٠, maxVal: ٤٠, title: "تمثيل الأعداد" },
        { id: "g١_u٤_d٧", type: "lesson", minVal: ٤٠, maxVal: ٩٩, title: "الأعداد من ٤٠–٩٩" },
        { id: "g١_u٤_d٨", type: "multiples_١٠", minVal: ١٠, maxVal: ٩٠, title: "مضاعفات العشرة" },
        { id: "g١_u٤_d٩", type: "borrowing_ones", minVal: ١٠, maxVal: ٩٩, title: "الاستلاف بالأحاد" },
        { id: "g١_u٤_d١٠", type: "shapes_٢d", title: "المربع – المستطيل – المثلث – الدائرة" },
        { id: "g١_u٤_d١١", type: "shapes_٣d", title: "متوازي المستطيلات – المكعب – الكرة" },
        { id: "g١_u٤_d١٢", type: "shape_parts", title: "أجزاء الشكل" }
      ]
    }
  ]
};
