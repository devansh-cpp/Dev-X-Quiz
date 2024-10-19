import React from 'react'
import { FaLinkedinIn } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";

import { BsTwitterX } from "react-icons/bs";


import { Link } from 'react-router-dom';


function Footer() {
  return (
   <>
   <div className="flex justify-between bg-black  px-6 py-4 text-white">
    <h2>Created by DevXLoper</h2>
    <div className="social flex gap-2">
        <Link to={'https://www.linkedin.com/in/devanshcpp/'}>
      <FaLinkedinIn/>
        </Link>
        <Link to={'https://x.com/Devansh_py'}>
      <BsTwitterX/>
        </Link>
        <Link to={'https://github.com/devansh-cpp'}>
      <FiGithub />
        </Link>
        <Link to={'https://www.youtube.com/@MadhavasEducation'}>
      <FiYoutube />
        </Link>
    </div>
   </div>
   </>
  )
}

export default Footer