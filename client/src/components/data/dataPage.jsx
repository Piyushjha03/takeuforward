import { Suspense, useEffect, useState } from "react";
import styles from "./dataPage.module.css";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getData } from "../../../api";
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";


export const DataPage = () => {
  const [allData, setAllData] = useState([]);
  const [metadata, setMetadata] = useState();
  const [currPage, setCurrPage] = useState(2);
  const nav=useNavigate()
  useEffect(() => {
    async function x() {
      const res = await getData(currPage);
      if (res.data) {
        console.log(res);
        setAllData(res.data);
        setMetadata(res.metadata);
      }
    }
    x();
  }, [currPage]);
  return (
    <>
  
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">UserName</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Stdin</TableHead>
            <TableHead>timestamp</TableHead>
            <TableHead className="text-right">Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allData.map((eachSubmission) => (
            <TableRow
              key={eachSubmission.id}
              className=" h-[120px] hover:bg-gray-800 cursor-pointer"
            >
              <TableCell className="font-medium">
                {eachSubmission.username}
              </TableCell>
              <TableCell>{eachSubmission.language}</TableCell>
              <TableCell>{eachSubmission.stdin}</TableCell>
              <TableCell>{eachSubmission.created_at}</TableCell>
              <TableCell className="text-right">
                {eachSubmission.code.slice(0, 99)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="absolute bottom-10 ">
        <PaginationContent>
          {metadata?.page > 1 && (
            <PaginationItem>
              <PaginationPrevious className="cursor-pointer" onClick={()=>{
                setCurrPage(metadata.page-1)
              }} />
            </PaginationItem>
          )}

          {metadata?.totalPage > 3 ? (
            <>
              {Array(3)
                .fill()
                .map((_, index) => {
                  const isactive = metadata?.page === index + 1 ? true : false;
                  return (
                    <PaginationItem key={index + 1}>
                      <PaginationLink isActive={isactive} className="cursor-pointer" onClick={()=>{
                        setCurrPage(index+1)
                      }}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          ) : (
            <>
              {Array(metadata?.totalPage)
                .fill()
                .map((_, index) => {
                  const isactive = metadata?.page === index + 1 ? true : false;
                  return (
                    <PaginationItem key={index + 1}>
                      <PaginationLink isActive={isactive} className="cursor-pointer" onClick={()=>{
                        setCurrPage(index+1)
                      }}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
            </>
          )}
          {metadata?.page < metadata?.totalPage && (
            <PaginationItem>
              <PaginationNext className="cursor-pointer" onClick={()=>{
                setCurrPage(metadata.page+1)
              }}
                />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <Button variant="outline" className="absolute bottom-10" onClick={()=>{
        nav('/')
      }}>Back to Home</Button>
    </>
  );
};
