import React from 'react'
import { Select ,SelectTrigger,SelectValue,SelectContent,SelectLabel,SelectItem,SelectGroup } from './ui/select'
const Selectcomp = ({selectLable,selectItems,selectvalue,field}) => {
  return (
    <>
         <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={selectvalue} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{ selectLable}</SelectLabel>
                      {
                        selectItems.length>0?selectItems.map((items)=>(
                            <SelectItem key={items} value={items}>{String(items).toUpperCase()}</SelectItem>

                        )):<SelectItem disabled value="no-items">No items available</SelectItem>
                      }
                     
                    </SelectGroup>
                  </SelectContent>
                </Select>
      
    </>
  )
}

export default Selectcomp
