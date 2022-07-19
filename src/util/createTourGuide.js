import TourGuide from '../images/tour_guide.png'

export default function createTourGuide(title = 'Title', description = 'description') {
    return (
        <div className="w-full flex gap-x-3 items-start">
            <div className="w-[30%] h-[100px]">
                <img className='block w-full h-full object-cover' src={TourGuide} alt="" />
            </div>
            <div className="w-[70%] flex flex-col gap-y-2">
                <h4 className="text-[16px] text-primary font-semibold uppercase">{title}</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}