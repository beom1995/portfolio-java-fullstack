import React from "react";

export default function Pagination({ projectInfo, handleProjectPageInfo }) {

    return (
        <div>
            {projectInfo.prev?
            (<li>
                <span onClick={() => handleProjectPageInfo(Math.min(...projectInfo.pageList) - 11)}>&lt;</span>
            </li>)
            :
            (<></>)
            }
            <div>
            {projectInfo.pageList && projectInfo.pageList.map((pageNumber) => (
                <li key={pageNumber}>
                    <span onClick={() => handleProjectPageInfo(pageNumber - 1)}>{pageNumber}</span>
                </li>
            ))}
            </div>
            {projectInfo.next?
            (<li>
                <span onClick={() => handleProjectPageInfo(Math.max(...projectInfo.pageList) + 1)}>&gt;</span>
            </li>)
            :
            (<></>)
            }
        </div>
    )
}