import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const ProductAdd = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });
  // const onSubmit = (data) => {
  //   console.log(data);
  //   onAdd(data);
  // };
  return (
    <div>
      <form onSubmit={handleSubmit((data) => onAdd(data))}>
        <h1 className="h1">Product Add</h1>
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
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
