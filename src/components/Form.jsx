import { Form, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success,setSuccess] = useState("");
  const [msimageUrl,mssetImageUrl] = useState([]);
  const [imageUrl,setImageUrl] = useState({});
  const [isSelected,setIsSelected] = useState(false);
//   useEffect(()=>{
    // console.log(msimageUrl)
//   },[imageUrl])
  async function onSubmit (data) {
    // console.log(data);
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("email",data.email);
    formData.append("phone",data.phone);
    formData.append("profileImage",data.profileImage[0]);
    Array.from(data.marksheets).forEach((file)=>{
        formData.append("marksheets",file);
    })
    // console.log(formData)
    const response = await axios.post("http://localhost:8000/submitForm",formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    });
    // console.log(response);
    setSuccess(response.data.success);
  };
  const handleProfileChange =(e)=>{
    const file = e.target.files[0];
    // const file = URL.createObjectURL(ImageUrl);
    const reader = new FileReader();
        reader.onload = (e)=>{
            setImageUrl({fileName:file.name,url:e.target.result});
            setIsSelected(true);
        }
        reader.readAsDataURL(file);
    // console.log(url);
  }
  const handleMarksheetsPreview = (e)=>{
    const files = e.target.files;
    // console.log(files);
    // const file = URL.createObjectURL(ImageUrl);
    Array.from(files).forEach((file)=>{
        const reader = new FileReader();
        reader.onload = (e)=>{
            mssetImageUrl((prev)=>[...prev,{fileName:file.name,url:e.target.result}]);
            setIsSelected(true);
        }
        reader.readAsDataURL(file);
       })
    // console.log(url);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mt-12 mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4" encType="multipart/form-data">
      {/* Name Field */}
      <div>
        <label className="block text-gray-700 font-medium">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-gray-700 font-medium">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-gray-700 font-medium">Phone</label>
        <input
          type="tel"
          {...register("phone", { required: "Phone is required" })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      {/* Profile Upload Field */}
      <div>
        <label className="block text-gray-700 font-medium">Profile Picture</label>
        <input
          type="file"
          {...register("profileImage", { required: "ProfileImage is required" })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
           onChange={handleProfileChange} 
        />
        {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profile.message}</p>}
      </div>
      {isSelected?<><img src={imageUrl.url} alt="Profile Image" width={100} height={100}/> <p>{imageUrl.fileName}</p></>:""
      }

      <div>
        <label className="block text-gray-700 font-medium">Marksheets</label>
        <input
          type="file"
          {...register("marksheets", { required: "marksheets are required" })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        multiple
        onChange={handleMarksheetsPreview}
        />
        {errors.marksheets && <p className="text-red-500 text-sm mt-1">{errors.marksheets.message}</p>}
      </div>
      <div className="flex flex-wrap gap-4 ">
      {isSelected?
      msimageUrl.map((file,index)=>(
        <span key={index} className="w-100px">
            <img src={file.url} alt="Marksheet" width={100} height={100}/> 
            <span>{file.fileName}</span>
        </span>
      )):""}
      </div>
      {/* Submit Button */}
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Submit
      </button>

      <p>{success}</p>
    </form>
  );
}

export default MyForm;
