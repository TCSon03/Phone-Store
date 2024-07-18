import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import instance from "../../axios/index";

const productSchema = z.object({
  title: z
    .string()
    .min(6, { message: "San pham phai co it nhat 6 ki tu" })
    .max(150),
  price: z
    .number()
    .min(0, { message: "Gia san pham phai lon hon hoac bang 0" }),
  description: z.string().optional(),
});

const ProductForm = ({ handleProduct }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(productSchema) });
  //   const onSubmit = (data) => {
  //     // console.log(data);
  //   };
  if (id) {
    useEffect(() => {
      (async () => {
        const res = await instance.get(`/products/${id}`);
        reset(res.data);
        //   console.log(res);
      })();
    }, []);
  }
  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleProduct({ ...data, id }))}>
        <h1 className="h1">{id ? "Edit" : "Add"} product</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { require: true })}
          />
          {errors.title?.message && (
            <p className="text-danger">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input
            type="text"
            className="form-control"
            {...register("price", { require: true, valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-danger">{errors.price?.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary w-100">
            {id ? "Edit" : "Add"} product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
