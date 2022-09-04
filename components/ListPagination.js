import {useState} from 'react';


const ListPagination = ({setPage, maxPage, page}) => {
    const [selectedPage, setSelectedPage] = useState(page);
    
    const limitLeft = () => (page - 1 === 0);

    const limitRight = () => (page + 1 > maxPage);

    return (
        <div className="w-3/4 lg:w-2/3 2xl:w-1/2 flex flex-row flex-wrap justify-center items-center py-4">
            <div className={`h-max w-24 items-center justify-center flex flex-col space-y-2 ${limitLeft() ? 'invisible' : ''}`}>
                <span>{page - 1}</span>
                <button className="bg-gray-200 border-2 border-gray-400 text-gray-400 rounded-lg px-2 py-1 hover:brightness-125" onClick={() => setPage((prev) => (prev - 1))}>{"<"}</button>
            </div>
         
            <div className="h-max w-24 items-center justify-center flex flex-col space-y-2 -mb-[76px]">
                <input placeholder={`${page}`} className="w-12 bg-gray-200 border-2 placeholder-black text-center border-gray-400 text-gray-400 rounded-lg px-2 py-1 hover:brightness-125" onChange={(e) => e.target > 0 && e.target <= maxPage ? setSelectedPage(e.event.target) : ''} />
                <button  className=" bg-gray-200 border-2 border-gray-400 text-gray-400 rounded-lg px-2 py-1 hover:brightness-125" onClick={() => selectedPage !== page ? setPage(selectedPage) : ''}>GO</button>
            </div>
  
            <div className={`h-max w-24 items-center justify-center flex flex-col space-y-2 ${limitRight() ? 'invisible' : ''}`}>
                <span>{page + 1}</span>
                <button className="bg-gray-200 border-2 border-gray-400 text-gray-400 rounded-lg px-2 py-1 hover:brightness-125" onClick={() => setPage((prev) => (prev + 1))}>{">"}</button>
            </div>
        </div>
    )
}

export default ListPagination;