import React from "react";
import { styled } from "styled-components";

const PageList = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
`;  

const PageNumber = styled.li`
  padding: 10px 18px;
  background-color: #FF4646;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 5px;
  cursor: pointer;

  &:nth-child(3n - 1) {
    background-color: orange;
  }

  &:nth-child(3n) {
    background-color: gold;
  }
`

const PagePrevNext = styled.li`
  padding: 10px 18px;
  margin: 0 5px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-size: 14px;
  background-color: #969696;
  &:hover {
    background-color: #6e6e6e;
  }
`;

export default function SearchPagination({ keyword, pageInfo, handlePageInfo}) {

    return (
        <div>
            <PageList>
            {pageInfo.prev?
            (<PagePrevNext onClick={() => handlePageInfo(keyword, Math.min(...pageInfo.pageList) - 11)}>&lt;</PagePrevNext>)
            :
            (<></>)
            }
            {pageInfo.pageList && pageInfo.pageList.map((pageNumber) => (
                <PageNumber key={pageNumber} onClick={() => handlePageInfo(keyword, pageNumber - 1)}>{pageNumber}</PageNumber>
            ))}
            {pageInfo.next?
            (<PagePrevNext onClick={() => handlePageInfo(keyword, Math.max(...pageInfo.pageList))}>&gt;</PagePrevNext>)
            :
            (<></>)
            }
            </PageList>
        </div>
    )
}