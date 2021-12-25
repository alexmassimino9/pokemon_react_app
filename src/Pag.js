import React from 'react'

export default function Pag({gotoNextPage, gotoPrevPage}){
  return(
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous Page</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next Page</button>}
    </div>
  )
}
