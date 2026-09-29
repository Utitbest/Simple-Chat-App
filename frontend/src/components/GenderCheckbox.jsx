import React, { useState } from 'react'

const GenderCheckbox = ({onCheckboxChange, seletedGender}) => {
    const [gender, setGender] = useState()


  return (
    <div className='flex my-1.5 gap-2'>
        <div className='form-control'>
            <label htmlFor="" className={`label gap-2 cursor-pointer ${seletedGender === "male" ? "selected" : ""}`}>
                <span className='label-text'>Male</span>
                <input type="checkbox" checked={seletedGender === "male"} onChange={() => onCheckboxChange("male")} className='checkbox border-slate-900' />
            </label>
        </div>
        <div className='form-control'>
            <label htmlFor="" className={`label gap-2 cursor-pointer ${seletedGender === "female" ? "selected" : ""}`}>
                <span className='label-text'>Female</span>
                <input type="checkbox" checked={seletedGender === "female"} onChange={() => onCheckboxChange("female")} className='checkbox border-slate-900' />
            </label> 
        </div>
    </div>
  )
}

export default GenderCheckbox