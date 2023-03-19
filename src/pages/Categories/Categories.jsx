import React from "react";
import CategoryLists from "./CategoryLists.jsx";
import CreateCategory from "./CreateCategory.jsx";

const Categories = () => {
  return (
    <div className='grid column-2 column-gap'>
      <CategoryLists />

      <CreateCategory />
    </div>
  );
};

export default Categories;
