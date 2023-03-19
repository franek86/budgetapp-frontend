import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../../components/FormInput/FormInput.jsx";
import Title from "../../components/Title/Title";
import { createCategory } from "../../querys/categoriesQuery.js";

const CreateCategory = () => {
  const [catValues, setCatValues] = useState({
    catName: "",
    catSlug: "",
    catColor: "#81bcb5",
  });

  const handleChange = (e) => {
    setCatValues({ ...catValues, [e.target.name]: e.target.value });
  };

  const createCat = (e) => {
    e.preventDefault();
    mutateAsync({ name: catValues.catName, slug: catValues.catSlug, legendColor: catValues.catColor });
  };

  const { mutateAsync, isLoading } = useMutation(createCategory, {
    onSuccess: () => {
      toast("Succesfully created new category!");
    },
    onError: () => {
      toast("Something went wrong!");
    },
  });

  return (
    <div>
      <Title>Create category</Title>
      <form className='form_wrapper' onSubmit={createCat}>
        <FormInput type='text' id='catName' name='catName' label='Category name' value={catValues.catName} onChange={handleChange} required />
        <FormInput type='text' id='catSlug' name='catSlug' label='Category slug' value={catValues.catSlug} onChange={handleChange} required />
        <FormInput type='color' id='catColor' name='catColor' label='Category legend color' value={catValues.catColor} placeholder='Category legend color' onChange={handleChange} required />
        {isLoading ? (
          "Loading ..."
        ) : (
          <div className='form_group'>
            <button className='form_btn' type='submit'>
              Create category
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCategory;
