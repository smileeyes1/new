import os
import sys

def to_eastern_arabic_nums(text):
    western = '0123456789'
    eastern = '٠١٢٣٤٥٦٧٨٩'
    translation_table = str.maketrans(western, eastern)
    return str(text).translate(translation_table)

def generate_math_content(lesson_id):
    title = ""
    content = ""
    
    if lesson_id == "p1_numbers_to_5":
        title = "الأعداد من (١) إلى (٥)"
        content += '<div class="question-box"><h3>السؤال الأول: أعدّ العناصر وأكتب العدد المناسب في الفراغ:</h3>'
        content += '<div style="font-size: 20pt; margin: 15px 0;">🍎 🍎 🍎 👈 العدد: <span class="clean-input"></span></div>'
        content += '<div style="font-size: 20pt; margin: 15px 0;">🎈 🎈 🎈 🎈 🎈 👈 العدد: <span class="clean-input"></span></div>'
        content += '</div>'
        content += '<div class="question-box"><h3>السؤال الثاني: أرسم دوائر داخل الصندوق بحسب العدد المطلوب:</h3>'
        content += '<p> العدد (٤): [ .................................... ] </p>'
        content += '<p> العدد (٢): [ .................................... ] </p>'
        content += '</div>'

    elif lesson_id == "p1_components_to_9":
        title = "مكونات الأعداد ضمن العدد ٩"
        content += '<div class="question-box"><h3>السؤال الأول: ألاحظ الأشكال الملونة ثم أكمل مكونات العدد ٥:</h3>'
        content += '<div style="font-size: 20pt; margin: 10px 0;">🔴 🔴 | 🔵 🔵 🔵</div>'
        content += '<p>العدد ٥ يتكون من: ٢ و <span class="clean-input"></span></p>'
        content += '</div>'
        content += '<div class="question-box"><h3>السؤال الثاني: حل المسألة اللفظية التالية:</h3>'
        content += '<p>في الحديقة ٦ عصافير، طار منها عصفوران. كم عصفوراً بقي على الشجرة؟</p>'
        content += '<p>الحل: ٦ يتكون من ٢ و <span class="clean-input"></span></p>'
        content += '</div>'

    elif lesson_id == "p1_addition_to_9":
        title = "الجمع ضمن العدد ٩"
        content += '<div class="question-box"><h3>السؤال الأول: أجد ناتج الجمع مستعيناً بالرسومات:</h3>'
        content += '<div style="font-size: 18pt; margin: 10px 0;">(⭐ ⭐ ⭐) + (⭐ ⭐) = <span class="clean-input"></span></div>'
        content += '</div>'
        content += '<div class="question-box"><h3>السؤال الثاني: كم يصبح المجموع الكلي؟</h3>'
        content += '<p>مع الفارس كرم ٤ قلمات، وأعطاه والده ٣ قلمات أخرى. كم قلماً أصبح معه؟</p>'
        content += '<p>الحل: ٤ + ٣ = <span class="clean-input"></span> قلمات.</p>'
        content += '</div>'

    elif lesson_id == "p1_subtraction_to_9":
        title = "الطرح ضمن العدد ٩"
        content += '<div class="question-box"><h3>السؤال الأول: أعدّ العناصر المتبقية بعد الشطب وأكتب الناتج:</h3>'
        content += '<div style="font-size: 18pt; margin: 10px 0;">🍎 🍎 🍎 <span style="text-decoration: line-through; color: red;">🍎 🍎</span> 👈 ٣ - ٢ = <span class="clean-input"></span></div>'
        content += '</div>'

    elif lesson_id == "p1_addition_10":
        title = "الجمع بالإكمال إلى العدد ١٠"
        content += '<div class="question-box"><h3>السؤال الأول: ألاحظ إطارات العشرة ثم أكمل الفراغ برسم العناصر المتبقية:</h3>'
        content += '<p>المسألة: ٩ + ٦ = <span class="clean-input"></span></p>'
        content += '<div class="ten-frame-container">'
        content += '<div class="ten-frame">'
        for _ in range(9): content += '<div class="cell">🍎</div>'
        content += '<div class="cell" style="background:#f9f9f9;"></div></div>'
        content += '<div class="ten-frame">'
        for _ in range(6): content += '<div class="cell"></div>'
        content += '</div></div></div>'

    elif lesson_id == "p2_numbers_to_99":
        title = "الأعداد ضمن العدد ٩٩ (الآحاد والعشرات)"
        content += '<div class="question-box"><h3>السؤال الأول: أكتب عدد الآحاد وعدد العشرات ممثلة بلوحة المنازل:</h3>'
        content += '<p> [ 🪵 🪵 🪵 ]  [ 📦 📦 ] 👈 الآحاد: <span class="clean-input"></span> العشرات: <span class="clean-input"></span></p>'
        content += '</div>'

    elif lesson_id == "p2_addition_with_carrying":
        title = "الجمع مع إعادة التجميع (الحمل)"
        content += '<div class="question-box"><h3>السؤال الأول: أحل المسألة العمودية التالية مع توضيح الحمل:</h3>'
        content += '<p style="font-size: 16pt; letter-spacing: 5px;">  (١)<br>  ٤ ٦<br>+ ٢ ٥<br>-------<br>  <span class="clean-input"></span></p>'
        content += '</div>'

    elif lesson_id == "p2_subtraction_with_borrowing":
        title = "الطرح مع الاستلاف ضمن العدد ٩٩"
        content += '<div class="question-box"><h3>السؤال الأول: أجد ناتج الطرح العمودي بعد الاستلاف:</h3>'
        content += '<p style="font-size: 16pt; letter-spacing: 5px;">  (١٢) (٤)<br>   ٥  ٢<br>-  ٢  ٤<br>-------<br>   <span class="clean-input"></span></p>'
        content += '</div>'

    elif lesson_id == "p2_multiplication":
        title = "مفهوم الضرب وجداول الضرب"
        content += '<div class="question-box"><h3>السؤال الأول: أحول الجمع المتكرر إلى عملية ضرب مستعيناً بالمجموعات:</h3>'
        content += '<div style="font-size: 18pt; margin: 10px 0;">(🍒 🍒) + (🍒 🍒) + (🍒 🍒)</div>'
        content += '<p>عدد المجموعات: <span class="clean-input"></span> × عدد العناصر: <span class="clean-input"></span> = <span class="clean-input"></span></p>'
        content += '</div>'

    else:
        title = "مراجعة شاملة"
        content = '<div class="question-box"><p> اختر درساً من القائمة لتوليد الأسئلة. </p></div>'

    return title, content

def main():
    with open("template.html", "r", encoding="utf-8") as f:
        template_html = f.read()
    lesson = os.environ.get("LESSON_TYPE", "p1_addition_10")
    title, content = generate_math_content(lesson)
    final_title = to_eastern_arabic_nums(title)
    final_content = to_eastern_arabic_nums(content)
    output_html = template_html.replace("{{ title }}", final_title).replace("{{ content }}", final_content)
    os.makedirs("dist", exist_ok=True)
    with open("dist/index.html", "w", encoding="utf-8") as f:
        f.write(output_html)

if __name__ == "__main__":
    main()
