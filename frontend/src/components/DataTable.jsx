import React from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow,TableCell } from './ui/table'
import { getHeaders } from '@/utils/getheader'
const DataTable = ({data,tablecaption="table"}) => {
    const tableheader=getHeaders(data)
  return (
    <div>
        <Table>
            <TableCaption>{tablecaption}</TableCaption>
            <TableHeader>
                <TableRow>
                    {tableheader?.map((header)=>(
                        <>
                        <TableHead key={header}>{header}</TableHead>
                        </>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
            {data?.map((row) => (
          <TableRow key={row._id}>
            {tableheader?.map((header) => {
              const keys = header.split(".");
              let value = row;
              keys.forEach((key) => {
                value = value ? value[key] : null;
              });
              return <TableCell key={header}>{value || "-"}</TableCell>;
            })}
          </TableRow>
        ))}
            </TableBody>
        </Table>
      
    </div>
  )
}

export default DataTable
