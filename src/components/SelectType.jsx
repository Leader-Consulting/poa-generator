"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SelectType = ({ setType }) => {
  return (
    <motion.div
      className="text-center mb-4 w-full flex justify-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={() => setType('company')}
        className="bg-[#307ab9] text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Company POA
      </Button>
      <Button
        onClick={() => setType('personal')}
        className="bg-[#6d6e71] text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Personal POA
      </Button>
    </motion.div>
  );
};

export default SelectType;