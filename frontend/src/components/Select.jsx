import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectGroup,
} from './ui/select';

const Selectcomp = ({ selectLable, selectItems, selectvalue, field }) => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={selectvalue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLable}</SelectLabel>
          {selectItems?.length > 0 ? (
            selectItems.map((item, index) => {
              // Check if the item is an object or a string
              const value = typeof item === 'object' ? item.id : item;
              const label = typeof item === 'object' ? item.name : item;
              return (
                <SelectItem key={value || index} value={value}>
                  {label}
                </SelectItem>
              );
            })
          ) : (
            <SelectItem disabled value="no-items">
              No items available
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Selectcomp;
