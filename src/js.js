
const btnMenu = document.querySelector("#btnMenu");
const divMenu = document.querySelector("#navbar-default");
const foodReviewer = document.querySelector("#FoodReviewer");
const clothes = document.querySelector("#clothes");
const technology = document.querySelector("#Technology");
const tripsAndTravel = document.querySelector("#tripsAndTravel");
const survivalMethods = document.querySelector("#survivalMethods");
const cooking = document.querySelector("#Cooking");
const doctors = document.querySelector("#doctors");
const searchDropdown = document.getElementById('search-dropdown')
const resultsContainer = document.getElementById('results');
const  hiddenDevDetails=document.createElement("div");
const  hiddenDevData=document.createElement("div");
  
let storage =[]
function getFirst10Words(text) {
    const words = text.trim().split(/\s+/); 
    const first = words.slice(0, 10);     
    return first.join(' '); }
  

btnMenu.addEventListener("click", () => {
    divMenu.classList.toggle("hidden");
});

    
async function getJson(element, jsonObject) {
    let response = await fetch(jsonObject);
    let data = await response.json();


    data?.forEach((ele,index) => {



    const divCategory = document.createElement("div");
    divCategory.classList.add("main-div-categories", "bg-white", "border", "border-gray-200", "rounded-lg", "shadow-sm" );

    
    const img = document.createElement("img");
    img.classList.add("w-full", "rounded-t-lg"  , "img-categ");
    img.src = ele.image;
    img.alt = "";
    divCategory.appendChild(img);

    
    const divContent = document.createElement("div");

    const title = document.createElement("h5");
    title.classList.add("mb-2", "text-2xl", "font-bold", "tracking-tight", "text-gray-900");
    title.textContent = ele.name;
    divContent.appendChild(title);

    const description = document.createElement("p");
    description.classList.add("mb-2", "font-normal", "text-gray-700");
    description.textContent = getFirst10Words(ele.des);
    divContent.appendChild(description);

    
    const button = document.createElement("button");
    button.classList.add("flex", "items-center", "px-3", "py-2", "text-sm", "font-extralight", "text-center", "relative", "text-black", "underline-before2");
    button.textContent = "Read more";


    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "rtl:rotate-180 ms-2");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 14 10");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "M1 5h12m0 0L9 1m4 4L9 9");
    svg.appendChild(path);
    button.appendChild(svg);
    divContent.appendChild(button);
    divCategory.appendChild(divContent);
    element.appendChild(divCategory);



   
   
   hiddenDevDetails.classList.add("remove","hiddenDevDetails")
   

    document.body.appendChild(hiddenDevDetails)

  
    hiddenDevData.classList.add("remove","hiddenDevData")
   
    document.body.appendChild(hiddenDevData)
    
    
    
    button.addEventListener("click", (e) => {


        
    console.log(hiddenDevDetails, index);
   
    hiddenDevDetails.classList.remove("remove") 
    hiddenDevData.classList.remove("remove") 

    console.log(ele.image);
    hiddenDevData.innerHTML=`
    
    
   <div class="card">
  <img class="card-img" src="${ele.image}" alt="${ele.name}" />
  <div class="card-content">
    <h5 class="card-title">${ele.name}</h5>
    <p class="card-description">${ele.des}</p>
    <div class="card-info">
      <span>👥 <strong>Follow:</strong> ${ele.follow}</span>
      <span>⭐ <strong>Rate:</strong> ${ele.rate}</span>
    </div>
    <div class="card-social">
      <a href="${ele.links.facebook}" class="${ele.links.facebook!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="${ele.links.x}" class="${ele.links.x!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-twitter"></i></a>
      <a href="${ele.links.ensta}" class="${ele.links.ensta!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
      <a href="${ele.links.tiktok}" class="${ele.links.tiktok!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
      <a href="${ele.links.yut}" class="${ele.links.yut!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-youtube"></i></a>
    </div>
  </div>
</div>


    
    
    `





    });

});



}

async function fetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error fetching ${url}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return []; // رجع مصفوفة فاضية في حال فشل التحميل
  }
}

async function getData() {
  const files = [
    "./foodRiv.json",
    "./technology.json",
    "./cooking.json",
    "./clothes.json",
    "./survivalMethods.json",
    "./data.json",
    "./travele.json"
  ];

  let allData = [];

  for (const file of files) {
    const data = await fetchJson(file);
    allData.push(...data); // دمج جميع البيانات في مصفوفة واحدة
  }

   allData; // حفظ في المتغير العالمي
  console.log("📦 Data Loaded into 'storage':", allData);






// شغّل التحميل بعد فتح الصفحة


hiddenDevDetails.classList.add("remove","hiddenDevDetails")
hiddenDevDetails.addEventListener("click", (e) => { hiddenDevDetails.classList.add("remove"); hiddenDevData.classList.add("remove") })
searchDropdown.addEventListener('input', function(element) {
  const searchValue = this.value.toLowerCase();
  const filtered = allData.filter(item => item.name.toLowerCase().includes(searchValue));

  // عرض النتائج

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
  filtered.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item.name;
  li.style.cursor = 'pointer';
  li.addEventListener("click", (e) => { 
    
          hiddenDevDetails.classList.remove("remove") 
          hiddenDevData.classList.remove("remove") 
          hiddenDevData.innerHTML=`
      
     
<div class="card">
<img class="card-img" src="${item.image}" alt="${item.name}" />
<div class="card-content">
<h5 class="card-title">${item.name}</h5>
<p class="card-description">${item.des}</p>
<div class="card-info">
<span>👥 <strong>Follow:</strong> ${item.follow}</span>
<span>⭐ <strong>Rate:</strong> ${item.rate}</span>
</div>
<div class="card-social">
      <a href="${item.links.facebook}" class="${item.links.facebook!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="${item.links.x}" class="${item.links.x!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-twitter"></i></a>
      <a href="${item.links.ensta}" class="${item.links.ensta!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-instagram"></i></a>
      <a href="${item.links.tiktok}" class="${item.links.tiktok!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
      <a href="${item.links.yut}" class="${item.links.yut!=""?"":"hidden"}" target="_blank"><i class="fa-brands fa-youtube"></i></a>
</div>
</div>
</div>

      `;
      
          
  });
  console.log(element.target.value);
  element.target.value?resultsContainer.appendChild(li):resultsContainer.innerHTML=""
  
  });
});
}
getData()





getJson(foodReviewer, "./foodRiv.json");
getJson(clothes, "./clothes.json");
getJson(technology, "./technology.json");
getJson(cooking, "./cooking.json");
getJson(survivalMethods, "./survivalMethods.json");
getJson(doctors, "./doctor.json");
getJson(tripsAndTravel, "./travele.json");




// send data Us contact api 
 
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    name: this.name.value,
    email: this.email.value,
    subject: this.subject.value,
    message: this.message.value
  };

  fetch('http://localhost:4000/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message || 'تم الإرسال');
    this.reset();
  })
  .catch(err => {
    alert('حدث خطأ أثناء الإرسال: ' + err.message);
  });
});
