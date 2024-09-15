import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import { Link } from "react-router-dom";

export const HoverEffect1 = ({
  items,
  className,
}: {
  items: {
    id:number,
  name:string,
  mode:number,
  turfId:number,
  duration:number,
  price:number,
  images:string[]

  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if(items.length==0){
    return(
      <div
      className={cn(
        "flex justify-center items-center mt-48 h-60",
        className
      )}
    >
     
        <Link
          to=""
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === 1 && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="text-lg italic">None</CardTitle>
            <CardDescription>
              NO Slots Booked 
              
              
              
              
              
          </CardDescription>

          </Card>
        </Link>
      
    </div>
    )

  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 gap-10 mt-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to=""
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="text-lg italic">{item.turfName}</CardTitle>
            <CardDescription>
              {  item.slots.map((data,id)=>{

                return<div className="flex flex-col mt-6 w-full">
                <div className="flex items-center justify-between">
                <span className="text-sm text-[#b3b3b3]">Slot Time</span>
                <span className="text-sm font-medium">{data}</span>
              </div>

              <div className="flex items-center justify-between">
              <span className="text-sm text-[#b3b3b3]">Date</span>
              <span className="text-sm font-medium">{item.date[id]}</span>
              </div>
              <div className="flex items-center justify-between">
              <span className="text-sm text-[#b3b3b3]">Price</span>
              <span className="text-sm font-medium">{item.price[id]}</span>
              </div> 
              </div >

              })}
              
              
              
              
              
          </CardDescription>

          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-slate-900 border  border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
