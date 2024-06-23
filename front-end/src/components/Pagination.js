import React from "react";

export default function Pagination({ pageInfo, handlePageInfo }) {

    return (
        <div>
            {pageInfo.prev?
            (<li>
                <span onClick={() => handlePageInfo(Math.min(...pageInfo.pageList) - 11)}>&lt;</span>
            </li>)
            :
            (<></>)
            }
            <div>
            {pageInfo.pageList && pageInfo.pageList.map((pageNumber) => (
                <li key={pageNumber}>
                    <span onClick={() => handlePageInfo(pageNumber - 1)}>{pageNumber}</span>
                </li>
            ))}
            </div>
            {pageInfo.next?
            (<li>
                <span onClick={() => handlePageInfo(Math.max(...pageInfo.pageList))}>&gt;</span>
            </li>)
            :
            (<></>)
            }
        </div>
    )
}