import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import instance from "../axios";
import { Navigate, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Register = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = (data) => {
    // console.log(data);
    (async () => {
      try {
        await instance.post(`/register`, data);
        if (
          confirm(
            "Hoan hô chúc mừng bạn đã đăng kí thành công! Bạn có muốn trở lại trang đăng nhập ko?"
          )
        ) {
          nav("/login");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data || "Dang ky that bai!");
      }
    })();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h1">Register</h1>
        <div className="bm-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input type="email" className="form-control" {...register("email")} />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="bm-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="bm-3">
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
