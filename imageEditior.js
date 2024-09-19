// const container=document.querySelector('.container');
// container.addEventListener('dragover',function(e){
//     e.preventDefault();
//     container.style.background='rgba(255, 255, 255, 0.351)';
// })
// container.addEventListener('dragleave',function(){
//     container.style.background='transparent';
// })
// container.addEventListener('drop',function(e){
//     e.preventDefault();
//     container.innerHTML='';
//     let files = e.dataTransfer.files;
//     let reader = new FileReader();
//     reader.onload = function(event){
//         let img = document.createElement('img');
//         img.src = event.target.result;
//         container.appendChild(img);
//     }
//     reader.readAsDataURL(files[0]);
// })

let ubload = document.getElementById("ubload");
let img = document.getElementById("img");
let imageBox = document.querySelector(".image");

let satorate = document.getElementById("satorate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let download = document.getElementById("download");
let reset = document.querySelector(".filtersSide ul li span");

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d"); //2d cuz its an image

const dropImgaes = document.querySelector(".dropImgaes");
dropImgaes.addEventListener("dragover", function (e) {
  e.preventDefault();
  dropImgaes.style.background = "rgba(255, 255, 255, 0.285)";
});
dropImgaes.addEventListener("dragleave", function () {
  dropImgaes.style.background = "transparent";
});
dropImgaes.addEventListener("drop", function (e) {
  e.preventDefault();
  let files = e.dataTransfer.files; //بتخزم داخلها مصفوفة الملفات الي تم نقلها
  let reader = new FileReader(); //مسؤول عن قراءة الملفات
  reader.readAsDataURL(files[0]); //بحكيلو يقرا الصورة الي انا عملتلهها ددروب
  reader.onload = function (event) {
    //بعد ما يكتمل تحميل الصورة
    dropImgaes.style.display = "none";
    document.querySelector(".container").style.display = "grid";
    img.src = reader.result;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = "none";
      };
  };
});

function resetFilters() {
  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  satorate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0"; //جايب عليها خط لانه في فنكشن باللغة بنفس الاسم بس الجافا سكريبت ذكية لحتى تقدر تميز بينهن وبين الي انا عاملها هون
  hueRotate.value = "0";
}

// window.onload = function () {
//   dragDrop();
// };

  ubload.addEventListener("change", function () {
  document.querySelector(".container").style.display = "grid";
  document.querySelector(".dropImgaes").style.display = "none";

  resetFilters(); //هاي حطيتها هون عشان اذا رفعت صورة جديدة يرجع كل القيم للديفولت ويقيم الفلاتر عن الصورة

  /*
    الانبوت الي من نوع فايل بدخل البيانات الي انا بختارها داخل مصفوفة من الملفات فانا بحكيله لما البيانات المخزنة بالمصفوفة هاي تتغير وانا اضيف فيها بيانات نفذلي هاد الكود
    */
  //   imageBox.style.display = "block";
  //   download.style.display = "block";
  //   reset.style.display = "block";

  let file = new FileReader();
  file.readAsDataURL(ubload.files[0]);
  file.onload = () => {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    //بدي الصورة المرسومة تيجي بابعاد الصورة الاصلية فخليت ابعاد الكانفاس زي ابعادها
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
  };
});
let filters = document.querySelectorAll(".filtersSide li input");
filters.forEach((filter) => {
  filter.addEventListener("input", () => {
    ctx.filter = `
            contrast(${contrast.value}%)
            saturate(${satorate.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
            `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    /*
            الي عملته هون اني خزنت كل الفلاتر الانبوت تاعهن داخل مصفوفة ومشيت عليهن بلوب وكل ما اغير على وحدة من الفلاتر بجيب القيم 
            تاعت باقي الفلاتر وبطبقهن برضو لانو لو عملت لكل فلتر ايفنت لحال رح يطبق الفلتر ويلغي قيمة باقي الفلاتر
            */
  });
});
download.onclick = function () {
    download.href=canvas.toDataURL();
  /*
  download.href = img.src;
هاي الطريقة ما بتزبط ورح يحمل الصورة مثل ما هي دون فلاتر لانه اللغة بتدعمش تحميل الصورة مع فلاتر والحل بكل بساطة اني استخدم الكانفاس
والكانفاس وضيفته اني اعمل داخله نسخة من الصورة او بمعنى اخر ارسم الصورة المعددلة داخله وبعدها احملها 
بنفذ هاي العملية من خلال اني بروح على الملف ومع تاج الصورة بحط تاج كانفاس وبعدها بالجافا بنادي على الكانفاس والرسمة تاعتي برسمها داخل الكونتكست والي بكون موجود داخل الكانفاس وهو نفسه المقصود فيه
محتوى الكانفاس وبناديه برضو وبعدها بعد ما الصورة تحمل بروح بنسخها داخل الكونتكست او الي هو برسمها داخله من خلال ميثود بتوخذ الصورة والبوزشن تاعها بالكونتكس على المحورين والطول والعرض تاعها
وبعدها بخفي الصورة الاصلية عاساس انه استبدلها بالكانفاس وبعدها كل ما اعمل فلتر جديد عشان يشتغل لازم مع كل فلتر بعمله انسخ الصورة مرا ثانية وطبعا الفلاتر بطبقها على الكونتكس بعدها
وبعدها وقت لما اضغط على تحميل الصورة  بستعمل ميثود معينة مع الكانفاس والي بتجبلي الصورة المنسوخة وبتحولها لرابط عشان اقدر احطها بالرابط تاع كبسة التحميل وداخل الفنكشن هاي بحدد امتداد الصورة الي بدي اياه والي بالافتراضي بكون بي ان جي
*/
};
