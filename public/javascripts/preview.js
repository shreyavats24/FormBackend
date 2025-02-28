const profile= document.getElementById("profile");
const Msg = document.getElementById("Msg");
profile.addEventListener("change",(e)=>{
    const files = e.target.files;
    if(files.length ==1){
        const file = files[0];
        // const reader = new FileReader();
        // reader.onload = (e)=>{
            const previewHolder = document.getElementById("profileImg");
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            const fileName = document.createElement('span');
            fileName.innerText = file.name;
            previewHolder.appendChild(img);
            previewHolder.appendChild(fileName);
        // }
    // reader.readAsDataURL(file);
    };
})

// file field 
const markesheets = document.getElementById("markesheets");
markesheets.addEventListener('change',(e)=>{
    const files = e.target.files;
    if(files.length>0){
        previewImages(e,files);
    }
})
function previewImages(e,files){
    // const files = e.target.files;
    console.log(files);
    if(files.length>0 && files.length<6){
        Array.from(files).forEach((file)=>{
            // const reader = new FileReader();
            const MarksheetsCont = document.getElementById("marksheetContainer");
            // reader.onload = (e)=>{
                const  previewHolder = document.createElement("div");
                previewHolder.classList.add("marksheet")
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                const fileName = document.createElement('span');
                fileName.innerText = file.name;
                previewHolder.appendChild(img);
                previewHolder.appendChild(fileName);
                // console.log(URL.createObjectURL(file));
                MarksheetsCont.appendChild(previewHolder);
                // previewHolder.style.display ='block';
            // }
            // reader.readAsDataURL(file);
        });    
    }
    else if(files.length>5){
        alert("you can only upload 5 images!!!");
        e.target.value="";
    }
}

const form = document.getElementById("submitForm");
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    // console.log(form);
    const formData = new FormData(form);
    console.log(formData);
    try {
        fetch("/submitForm", {
            method: "POST",
            body: formData
        })
        .then((res) => {
                if (!res.ok) {
                    throw new Error("Sorry! you can't upload more than 5 marksheets" );
                }
                return res.json(); // Parse JSON only if response is OK
            })
        .then((response) => {
            if(response.success){
                Msg.innerText = response.success || "Form submitted successfully!";
            }
            else
            Msg.innerText = response.error;
            })
        .catch((error) => {
                console.error("Fetch error:", error);
                Msg.innerText = "Error: " + error.message;
            });
        }catch(err){
            console.log("Err",err);
            Msg.innerText = "Error: " + err.message;
        }
})
// function sendDatatoBackend(){    

// }