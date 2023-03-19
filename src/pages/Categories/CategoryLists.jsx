import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../querys/categoriesQuery.js";
import { MdModeEditOutline, MdOutlineDeleteForever } from "react-icons/md";

const CategoryLists = () => {
  const { data: catData } = useQuery(["ctgs"], getCategories, { refetchOnWindowFocus: false });

  return (
    <section className='grid row-gap'>
      {catData?.map((cat) => (
        <div className='card column-2' key={cat._id}>
          <div className='card_category'>
            <div className='label'>Category name</div>
            <div className='category'>{cat.name}</div>
          </div>
          <div className='card_btns'>
            <button className='btn-edit'>
              <MdModeEditOutline />
            </button>
            <div className='btn-delete ml-sm-1'>
              <MdOutlineDeleteForever />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CategoryLists;
