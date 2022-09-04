import Link from 'next/link';
import Odds from '../components/Odds';

const ListItem = ({id, creater, dateRange, ante, challengeAmount, goals, odds}) => {
    return (
        <Link href={`${process.env.NEXT_PUBLIC_NEXT_URL}/c/${id}`}>
            <div className={`flex flex-row bg-gray-200 border-2 rounded-xl cursor-pointer border-gray-400 hover:border-gray-600 text-gray-400 hover:text-gray-600 rounded-lg px-2 py-1 w-full hover:brightness-125  h-full items-center justify-between`}>
                <div className="flex items-center justify-center w-1/6 border-r-1 border-gray-400 h-max items-center"><span className='flex text-center'>{id}</span></div>
                <div className="flex flex-col items-center justify-center w-1/6 border-r-1 border-gray-400 h-max">
                    <div className="space-y-2 flex flex-col items-center py-2">
                        <span className="w-12 h-12 rounded-full bg-black border-1 border-white"></span>
                        <span>{creater.username}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2  border-gray-400 h-max">
                    <div className="flex flex-row w-full h-max items-center justify-center">
                        <span className="w-1/2 h-full flex flex-row justify-center items-center border-r-1 border-gray-400">
                            <span className="w-1/2 flex flex-col justify-center items-center">
                                <span>{dateRange.start}</span>
                                <span> - </span>
                                <span>{dateRange.end}</span>
                            </span>
                            <span className="w-1/2 flex flex-col justify-center items-center">
                                <span>{dateRange.remaining}</span>
                                <span>Days Left</span>
                            </span>
                        </span>
                        <span className="w-1/6 h-full flex flex-col justify-center items-center border-r-1 border-gray-400 text-sm">
                            <div className='flex flex-col space-y-2'>
                                <div className='flex flex-col items-center'>
                                <span>${ante}</span><span>Bet</span>
                                </div>
                                <div className='flex flex-col items-center'>
                                <span>${challengeAmount}</span><span> Pool</span>
                                </div>
                            </div>  
                        </span>
                        <span className="w-1/3 h-full flex flex-row justify-center items-center border-r-1 border-gray-400">
                            <span className="w-1/2 flex flex-col justify-center items-center">
                                <span>{goals.start}</span>
                                <span> - </span>
                                <span>{goals.end}</span>
                            </span>
                            <span className="w-1/2 flex flex-col justify-center items-center">
                                <span>{goals.start - goals.current}</span>
                                <span>LBs Left</span>
                            </span>
                        </span>
                    </div>
                </div>
                <span className="w-1/6 h-max flex flex-col justify-center items-center border-r-1 border-gray-400">
                    <span className="w-full flex flex-col justify-center items-center">
                        <Odds {...odds} />
                    </span>
                </span>
            </div>
        </Link>
    );

}

const ListBody = ({list}) => {

    return (    
        <div className="w-3/4 lg:w-2/3 2xl:w-1/2 flex flex-col justify-center items-center space-y-4 border-2 rounded-xl border-gray-400 bg-gray-100 p-4">
            {list.map((item, index) => {
                return(<ListItem key={index} {...item} />)
            })}
        </div>  
    )
}

export default ListBody;