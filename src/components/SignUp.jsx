import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../contexts/authContext";
const SignUp = () => {

  const{signUp}=useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleSignUp = (data) => {
    signUp(data);
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="form">
        <div className="userNameField">
          <label htmlFor="adSoyad">UserName</label>
          <input
            type="text"
            name=""
            id="adSoyad"
            {...register("name", { required: "Bu Alan Zorunludur" })}
          />
        </div>
        
        <span>
            {errors.adSoyad && errors.adSoyad.message.toString()}
        </span>



        <div className="userNick">
          <label htmlFor="nick">Kullanıcı Adı</label>
          <input
            type="text"
            name=""
            id="nick"
            {...register("username", { required: "Bu Alan Zorunludur" })}
          />
        </div>
        
        <span>
            {errors.nick && errors.nick.message.toString()}
        </span>




        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name=""
            id="email"
            {...register("email", { required: "Bu Alan Zorunludur" })}
          />
        </div>
        
        <span>
            {errors.email && errors.email.message.toString()}
        </span>


        
        <div className="sifre">
          <label htmlFor="sifre">Sifre</label>
          <input
            type="password"
            name=""
            id="sifre"
            {...register("password", { required: "Bu Alan Zorunludur" })}
          />
        </div>
        
        <span>
            {errors.sifre && errors.sifre.message.toString()}
        </span>

    <button type="submit">Kayit Ol</button>


      </div>
    </form>
  );
};

export default SignUp;
