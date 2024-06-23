import React from "react";

export default function SearchPagination({ keyword, pageInfo, handlePageInfo}) {

    return (
        <div>
            {pageInfo.prev?
            (<li>
                <span onClick={() => handlePageInfo(keyword, Math.min(...pageInfo.pageList) - 11)}>&lt;</span>
            </li>)
            :
            (<></>)
            }
            {pageInfo.pageList && pageInfo.pageList.map((pageNumber) => (
                <li key={pageNumber}>
                <span onClick={() => handlePageInfo(keyword, pageNumber - 1)}>{pageNumber}</span>
                </li>
            ))}
            {pageInfo.next?
            (<li>
                <span onClick={() => handlePageInfo(keyword, Math.max(...pageInfo.pageList))}>&gt;</span>
            </li>)
            :
            (<></>)
            }
        </div>
    )
}