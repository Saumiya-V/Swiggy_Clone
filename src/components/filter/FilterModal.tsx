import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { FilterIcon } from 'lucide-react';
import type { FilteredLabel } from '@/types';
import { useCallback, useState} from 'react';


const FilterModal = ({data,onApply,onClear}:
  {
   data:FilteredLabel,
   onApply:(filters:Record<string,string[]>)=>void,
   onClear:()=>void
  }) => {
   const [label,setLabel] = useState("")
   const [selectedFilters,setSelectdFilters]=useState<Record<string,string[]>>({})

   const handleSelect = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
     setLabel(e.currentTarget.textContent || "");
     console.log("label", e.currentTarget.textContent || "");
   }, []);

   const handleCheckboxChange = (label:string,value:string)=>{
       setSelectdFilters((prev)=>{
        const current = prev[label] || [];
        const exists = current.includes(value);
        return {
          ...prev,
          [label]:exists? current.filter((item)=>item!==value):[...current,value]
        }

       })
   }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-md bg-white text-black font-semibold flex border border-gray-300 rounded-full p-3 cursor-pointer mb-2 hover:bg-white">
          Filter <FilterIcon className="text-sm" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
            <div className="grid grid-cols-2">
              <div className="border-r flex flex-col  mt-5 text-md font-bold text-black">
                <ul className='flex flex-col gap-5'>
                  <li onClick={(e)=>handleSelect(e)} className="cursor-pointer hover:text-orange-500">Sort</li>
                  <li onClick={(e)=>handleSelect(e)} className="cursor-pointer hover:text-orange-500">Delivery Time</li>
                  <li onClick={(e)=>handleSelect(e)} className="cursor-pointer hover:text-orange-500">Cuisines</li>
                  <li onClick={(e)=>handleSelect(e)} className="cursor-pointer hover:text-orange-500">Explore</li>
                  <li onClick={(e)=>handleSelect(e)} className="cursor-pointer hover:text-orange-500">Ratings</li>
                  <li onClick={(e)=>handleSelect(e)} className="cursor-pointer hover:text-orange-500">Veg / Non-Veg</li>
                </ul>
              </div>
              <div className="mt-5 ml-12 overflow-y-auto pr-2 h-60">
                <h4 className='text-gray-400 mb-3'>Filter By</h4>
                {
                  label === 'Sort' &&
                  data?.sortByData.map((item) => (
                    <div key={item.title} className="flex items-center gap-2 mb-2">
                      <Checkbox 
                      id={item.title}
                      checked={selectedFilters['Sort']?.includes(item.title) || false}
                      onCheckedChange={()=>handleCheckboxChange('Sort',item.title)}
                       />
                      <label htmlFor={item.title}>{item.title}</label>
                    </div>
                  ))
                }
                {
                    label === 'Delivery Time' && (
                   <div className="flex items-center gap-2 mb-2">
                    <Checkbox /> 
                   <label>{ data?.categoryFilter[0]?.facetInfo[0]?.label}</label>
                   </div>
                  )
                }
                {
                  label === 'Cuisines' && (
                    data?.categoryFilter[1]?.facetInfo.map((item)=>{
                      return <div className="flex items-center gap-2 mb-2">
                        <Checkbox 
                        id={item.label}
                         checked={selectedFilters["Cuisines"]?.includes(item.label) || false}
                        onCheckedChange={()=>handleCheckboxChange('Cuisines',item.label)}
                        />
                        <label id={item.label}>{item.label}</label>
                      </div>
                    })
                  )
                }
                 {
                  label === 'Explore' && (
                    data?.categoryFilter[2]?.facetInfo.map((item)=>{
                      return <div className="flex items-center gap-2 mb-2">
                        <Checkbox 
                        id={item.label}
                        checked={selectedFilters["Explore"]?.includes(item.label) || false}
                        onCheckedChange={()=>handleCheckboxChange('Explore',item.label)}
                        />
                        <label id={item.label}>{item.label}</label>
                      </div>
                    })
                  )
                }
                  {
                  label === 'Ratings' && (
                    data?.categoryFilter[3]?.facetInfo.map((item)=>{
                      return <div className="flex items-center gap-2 mb-2">
                        <Checkbox 
                        id={item.label}
                        checked={selectedFilters["Ratings"]?.includes(item.label) || false}
                        onCheckedChange={()=>handleCheckboxChange('Ratings',item.label)}
                        />
                        <label id={item.label}>{item.label}</label>
                      </div>
                    })
                  )
                }
                 {
                  label === 'Veg / Non-Veg' && (
                    data?.categoryFilter[4]?.facetInfo.map((item)=>{
                      return <div className="flex items-center gap-2 mb-2">
                        <Checkbox 
                        id={item.label}
                        checked={selectedFilters["Veg / Non-Veg"]?.includes(item.label) || false}
                        onCheckedChange={()=>handleCheckboxChange('Veg / Non-Veg',item.label)}
                        />
                        <label id={item.label}>{item.label}</label>
                      </div>
                    })
                  )
                }
              </div>
            </div>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <DialogFooter>
         <div className='flex gap-10 items-center'>
          <p className='text-lg font-bold text-orange-500 cursor-pointer' onClick={onClear}>Clear Filters</p>
          <Button className='px-10 bg-orange-500 text-lg font-bold text-white' onClick={()=>onApply(selectedFilters)}>Apply</Button>
         </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
