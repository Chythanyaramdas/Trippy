
import React from 'react';

function AdventureComponent({ adventure, onChangeAdventure, index, imageChange, formValues }) {
  return (
    <div className="flex">
      <div className="">
        <label htmlFor="">Name <span className="text-red-600">*</span></label>
        <input
          type="text"
          name="name"
          onChange={(e) => onChangeAdventure(e, index)}
          className="border-2 p-1 mb-2 "
          value={adventure.name}
        />
      </div>

      <div className="">
        <label htmlFor="">Description <span className="text-red-600">*</span></label>
        <input
          type="text"
          name="description"
          onChange={(e) => onChangeAdventure(e, index)}
          className="border-2 p-1 mb-2"
          value={adventure.description}
        />
      </div>
      <div className="">
        <label htmlFor="">Time <span className="text-red-600">*</span></label>
        <input
          type="number"
          name="time"
          onChange={(e) => onChangeAdventure(e, index)}
          className="border-2 p-1 mb-2"
          value={adventure.time}
        />
      </div>

      <div className="rounded-full overflow-hidden relative h-60 w-auto flex justify-center">
        <img
          src={formValues.image ? URL.createObjectURL(formValues.image) : ""}
          alt=""
          className="h-full  rounded-full w-full"
        />
        <div className="absolute bottom-0 left-10 rounded-full overflow-hidden">
          <input className="bg-amber-200 " name="image" onChange={imageChange} type="file" />
        </div>
      </div>
    </div>
  );
}

export default AdventureComponent;
