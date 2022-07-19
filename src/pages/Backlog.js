import React, { useRef, useState } from 'react'
import MemberComponent from '../components/board/MemberComponent'
import HeaderPlanComponent from '../components/headerPlanning/HeaderPlanComponent'
import '../../src/index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSquareCheck, faTimes, faAngleRight, faFlag, faBolt, faCheck, faLock, faEye, faThumbsUp, faTimeline, faPaperclip, faLink, faPlus, faArrowDownShortWide, faArrowDownWideShort } from '@fortawesome/free-solid-svg-icons'
import OptionComponent from '../components/option/OptionComponent'
import CreateComponent from '../components/CreateComponent'
import OptionHeaderBacklogComponent from '../components/option/OptionHeaderBacklogComponent'
import OptionItemBacklogComponent from '../components/option/OptionItemBacklogComponent'
import ButtonBacklogComponent from '../components/backlog/ButtonBacklogComponent'

export default function Backlog() {
    const [showFlag, setShowFlag] = useState(false)

    const ref = useRef(null)

    const handleClickAddFlag = function () {
        if (!showFlag) {
            setShowFlag(true)
            ref.current.style.backgroundColor = "#ffbdad"
        } else {
            setShowFlag(false)
            ref.current.style.backgroundColor = "#fff"
        }
    }

    const editHTMLAddFlag = () => {
        if (showFlag)
            return "Remove flag"
        else
            return "Add flag"
    }

    return (
        <>
            <div className='wrap-backlog w-screen h-screen flex flex-col'>
                <HeaderPlanComponent memberComponent={<MemberComponent />} />
                <div className='w-full flex-1 flex-col'>
                    <div className='flex flex-row  w-full flex-[3]'>
                        <div className='p-2 flex-1 h-full mx-4 min-h-[10rem] bg-[#f4f5f7] rounded-[5px] flex items-center flex-col '>
                            <div className='flex justify-between w-full px-4 py-2'>
                                <span>Epic</span>
                                <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faTimes} />
                            </div>
                            <div className='w-full p-3 m-[0.2rem] min-h-[3rem] h-fit bg-white flex items-center shadow-md rounded-[5px]'>
                                issues without epic
                            </div>
                            <div className='w-full p-3 m-[0.2rem] min-h-[3rem] h-fit bg-white flex flex-col justify-center shadow-md rounded-[5px]'>
                                <div className='flex items-center'>
                                    <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleRight} />
                                    <div className='h-5 w-5 inline-block bg-[#d0c6ff] rounded-[5px] mx-2'></div>
                                    issues without epic
                                </div>
                                <div className='h-2 w-full bg-[#ddd] rounded-[5px] my-2 relative'>
                                    <div className='absolute top-0 left-0  bottom-0 bg-blue-600 rounded-[10px]' style={{ width: "40%" }}>

                                    </div>
                                </div>
                            </div>
                            <CreateComponent createWhat={"epic"} />
                        </div>
                        <div className='main-backlog overflow-auto flex-[3] w-full h-fit  flex justify-center mb-10'>
                            <div className='backlog-item py-2 flex-1 mx-4 min-h-[10rem] bg-[#f4f5f7] rounded-[5px] flex items-center flex-col '>
                                <div className='header-backlog-item w-[98%] py-3 flex justify-between items-center'>
                                    <div className='header-right'>
                                        <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleDown} />
                                        <div className='name-sprint inline-block'>
                                            <span className='name font-medium pr-2'>MPM Sprint 1</span>
                                        </div>
                                        <div className='create-day inline-block font-light pl-2'>
                                            <span className='day pr-1'>19 Apr - 17 May</span>
                                            <span> (5 issues) </span>
                                        </div>
                                    </div>
                                    <div className='header-left flex items-center h-9'>
                                        <div className='state-sprint'>
                                            <div className='rounded-full  inline-flex w-5 h-5 text-xs bg-[#dfe1e6] mx-[0.2rem]'>
                                                <span className='m-auto'>4</span>
                                            </div>
                                            <div className='rounded-full  inline-flex w-5 h-5 text-xs bg-[#0052cc]  mx-[0.2rem] text-white'>
                                                <span className='m-auto'>4</span>
                                            </div>
                                            <div className='rounded-full  inline-flex w-5 h-5 text-xs bg-[#00875a]  mx-[0.2rem] text-white'>
                                                <span className='m-auto'>4</span>
                                            </div>
                                        </div>
                                        {/* <div className='btn-main rounded-[5px] py-1 px-2  w-fit h-full mx-4 border-solid border-[#000] border-[1px]'>
                                        <span>Complete sprint</span>
                                    </div> */}
                                        <ButtonBacklogComponent text={"Complete sprint"} />
                                        <OptionComponent child={<OptionHeaderBacklogComponent />} />
                                    </div>
                                </div>
                                <div className='main w-[98%] h-fit min-h-[5rem]'>
                                    <div ref={ref} className='item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] flex justify-between items-center'>
                                        <div className='left-item h-full flex items-center'>
                                            <div className='icon mx-1 inline-block'>
                                                <FontAwesomeIcon size='1x' className='text-[#4bade8]' icon={faSquareCheck} />
                                            </div>
                                            <div className='mx-1 inline-block text-[#acacac]'>
                                                <span>MPM-2</span>
                                            </div>
                                            <div className='mx-1 inline-block'>
                                                <span>Name</span>
                                            </div>
                                            <div className='parent bg-[#eae6ff] uppercase inline-block px-1 mx-1 rounded-[2px] font-medium'>
                                                <span>parent</span>
                                            </div>
                                        </div>
                                        <div className='right-item h-full w-fit flex items-center'>
                                            <div className='rounded-full  inline-flex w-5 h-5 text-xs bg-[#dfe1e6] mx-[0.2rem]'>
                                                <span className='m-auto'>4</span>
                                            </div>
                                            {showFlag && <FontAwesomeIcon color='#EF0000' className='mx-2' icon={faFlag} />}
                                            <div className='h-4 w-auto uppercase text-xs font-bold  mx-2 border-solid border-[0.5px] border-[#ccc] flex justify-center items-center py-3 px-2 bg-[#ccc]'>
                                                to do
                                                <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleDown} />
                                            </div>
                                            <MemberComponent />
                                            <OptionComponent child={<OptionItemBacklogComponent editHTMLAddFlag={editHTMLAddFlag} handleClickAddFlag={handleClickAddFlag} />} />
                                        </div>
                                    </div>
                                    {/* <div ref={ref[2]} className='item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] flex justify-between items-center'>
                                    <div className='left-item h-full'>
                                        <div className='icon mx-1 inline-block'>
                                            <FontAwesomeIcon size='1x' className='text-[#4bade8]' icon={faSquareCheck} />
                                        </div>
                                        <div className='mx-1 inline-block text-[#acacac]'>
                                            <span>MPM-2</span>
                                        </div>
                                        <div className='mx-1 inline-block'>
                                            <span>Name</span>
                                        </div>
                                        <div className='parent bg-[#eae6ff] uppercase inline-block px-1 mx-1 rounded-[2px] font-medium'>
                                            <span>parent</span>
                                        </div>
                                    </div>
                                    <div className='right-item h-full w-fit flex items-center'>
                                        <div className='rounded-full  inline-flex w-5 h-5 text-xs bg-[#dfe1e6] mx-[0.2rem]'>
                                            <span className='m-auto'>4</span>
                                        </div>
                                        {showFlag && <FontAwesomeIcon color='#EF0000' className='mx-2' icon={faFlag} />}
                                        <div className='h-4 w-auto uppercase text-xs font-bold  mx-2 border-solid border-[0.5px] border-[#ccc] flex justify-center items-center py-3 px-2 bg-[#ccc]'>
                                            to do
                                            <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleDown} />
                                        </div>
                                        <MemberComponent />
                                        <OptionComponent child={<OptionItemBacklogComponent editHTMLAddFlag={editHTMLAddFlag} handleClickAddFlag={handleClickAddFlag} />} />
                                    </div>
                                </div> */}
                                    <CreateComponent createWhat={"issues"} />
                                </div>
                            </div>
                        </div>
                        <div className='overflow-auto flex flex-col flex-[2] h-full mx-4 relative p-2'>
                            <div className='flex justify-between sticky'>
                                <div className='flex items-center'>
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon size='1x' className='mx-1 p-[0.2rem] text-white text-[10px] inline-block bg-[#904ee2]' icon={faBolt} />
                                        Tên epic
                                    </div>
                                    <span className='mx-2'> / </span>
                                    <div className='flex items-center'>
                                        <FontAwesomeIcon size='1x' className='text-[#4bade8]' icon={faSquareCheck} />
                                        Tên task
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faLock} />
                                    <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faEye} />
                                    <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faThumbsUp} />
                                    <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faTimeline} />
                                    <OptionComponent />
                                    <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faTimes} />
                                </div>
                            </div>
                            <div className='text-[2rem]'>
                                Tên task
                            </div>
                            <div className='flex items-center'>
                                <ButtonBacklogComponent icon={<FontAwesomeIcon size='2x' className='m-1 text-[1.5rem]' icon={faPaperclip} />} text={"Attach"} />
                                <ButtonBacklogComponent icon={<FontAwesomeIcon size='2x' className='m-1 text-[1.5rem]' icon={faTimeline} />} text={"Add a child issue"} />
                                <ButtonBacklogComponent icon={<FontAwesomeIcon size='2x' className='m-1 text-[1.5rem]' icon={faLink} />} text={"Link issue"} />
                            </div>
                            <div className='flex items-center'>
                                <div className='inline-flex flex-col my-4 w-fit'>
                                    <div className='uppercase flex items-center p-2 bg-[#ccc] w-fit rounded-[5px] mx-4'>
                                        to do
                                        <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleDown} />
                                    </div>
                                </div>
                                <div className='inline-flex w-fit'>
                                    <FontAwesomeIcon color='#EF0000' className='mx-2' icon={faFlag} />
                                    Flagged
                                </div>
                            </div>
                            <div className='font-bold m-1'>
                                Description
                            </div>
                            <div className='m-1'>
                                Add a description...
                            </div>
                            <div className='child-isue'>
                                <div className='flex justify-between w-full h-11 items-center my-2'>
                                    <div className='font-bold m-1'>
                                        Child issue
                                    </div>
                                    <div className='flex h-full w-fit items-center'>
                                        <div className='uppercase flex items-center p-2 bg-[#ccc] w-fit rounded-[5px] mx-4'>
                                            to do
                                            <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleDown} />
                                        </div>
                                        <OptionComponent />
                                        <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faPlus} />
                                    </div>
                                </div>
                                <div className='item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] flex justify-between items-center'>
                                    <div className='left-item h-full flex items-center'>
                                        <div className='icon mx-1 inline-block'>
                                            <FontAwesomeIcon size='1x' className='text-[#4bade8]' icon={faSquareCheck} />
                                        </div>
                                        <div className='mx-1 inline-block text-[#acacac]'>
                                            <span>MPM-2</span>
                                        </div>
                                        <div className='mx-1 inline-block'>
                                            <span>Name</span>
                                        </div>
                                    </div>
                                    <div className='right-item h-full w-fit flex items-center'>
                                        <div className='rounded-full  inline-flex w-5 h-5 text-xs bg-[#dfe1e6] mx-[0.2rem]'>
                                            <span className='m-auto'>4</span>
                                        </div>
                                        {showFlag && <FontAwesomeIcon color='#EF0000' className='mx-2' icon={faFlag} />}
                                        <div className='h-4 w-auto uppercase text-xs font-bold  mx-2 border-solid border-[0.5px] border-[#ccc] flex justify-center items-center py-3 px-2 bg-[#ccc]'>
                                            to do
                                            <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleDown} />
                                        </div>
                                        <MemberComponent />
                                    </div>
                                </div>
                            </div>
                            <div className='link-issue mb-6'>
                                <div className='flex justify-between w-full h-11 items-center my-2'>
                                    <div className='font-bold m-1'>
                                        Link issue
                                    </div>
                                    <div className='flex h-full w-fit items-center'>
                                        <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faPlus} />
                                    </div>
                                </div>
                                <div className='item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] flex justify-between items-center'>
                                    <div className='left-item h-full flex items-center'>
                                        <div className='icon mx-1 inline-block'>
                                            <FontAwesomeIcon size='1x' className='text-[#4bade8]' icon={faSquareCheck} />
                                        </div>
                                        <div className='mx-1 inline-block text-[#acacac]'>
                                            <span>MPM-2</span>
                                        </div>
                                        <div className='mx-1 inline-block'>
                                            <span>Name</span>
                                        </div>
                                    </div>
                                    <div className='right-item h-full w-fit flex items-center'>
                                        <div className='rounded-full  inline-flex w-5 h-5 text-xs bg-[#dfe1e6] mx-[0.2rem]'>
                                            <span className='m-auto'>4</span>
                                        </div>
                                        {showFlag && <FontAwesomeIcon color='#EF0000' className='mx-2' icon={faFlag} />}
                                        <div className='h-4 w-auto uppercase text-xs font-bold  mx-2 border-solid border-[0.5px] border-[#ccc] flex justify-center items-center py-3 px-2 bg-[#ccc]'>
                                            to do
                                            <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faAngleDown} />
                                        </div>
                                        <MemberComponent />
                                        <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faTimes} />
                                    </div>
                                </div>
                            </div>
                            <div className='detail'>
                                <div className='item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] border-b-0 flex justify-between items-center'>
                                    <div className='flex justify-between w-full h-8 items-center my-2'>
                                        <div className='font-bold m-1'>
                                            Link issue
                                        </div>
                                        <div className='flex h-full w-fit items-center'>
                                            <FontAwesomeIcon size='2x' className='mx-4 text-[1.5rem]' icon={faAngleDown} />
                                        </div>
                                    </div>
                                </div>
                                <div className='item w-full h-13 p-1 bg-white px-4 mt-[-1px] border-solid border-[1px] border-[#ccc] flex justify-between items-center flex-wrap'>
                                    <div className='w-[40%] h-13 my-4'>
                                        Assignee
                                    </div>
                                    <div className='w-[60%]'>
                                        <MemberComponent />
                                    </div>
                                    <div className='w-[40%] h-13 my-4'>
                                        Labels
                                    </div>
                                    <div className='w-[60%]'>
                                        None
                                    </div>
                                    <div className='w-[40%] h-13 my-4'>
                                        Sprint

                                    </div>
                                    <div className='w-[60%]'>

                                        MPM Sprint 1
                                    </div>
                                    <div className='w-[40%] h-13 my-4'>
                                        Story point estimate
                                    </div>
                                    <div className='w-[60%]'>
                                        none
                                    </div>
                                    <div className='w-[40%] h-13 my-4'>
                                        Reporter
                                    </div>
                                    <div className='w-[60%]'>
                                        <MemberComponent />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between my-4 text-[#a1a1a1]'>
                                <span>Created 16 hours ago</span>
                                <span>Updated 7 hours ago</span>
                            </div>
                            <div className='flex flex-col'>
                                <div className='font-bold'>
                                    Activity
                                </div>
                                <div className='flex justify-between'>
                                    <div>
                                        <span>Show: </span>
                                        <div className='w-fit h-5  p-2 bg-[#ccc] inline-flex justify-center items-center mx-2'>All</div>
                                        <div className='w-fit h-5  p-2 bg-[#ccc] inline-flex justify-center items-center mx-2'>Comments</div>
                                        <div className='w-fit h-5  p-2 bg-[#ccc] inline-flex justify-center items-center mx-2'>History</div>
                                    </div>
                                    <div className='w-fit h-5  p-2 inline-flex justify-center items-center mx-2'>Newest first
                                        <FontAwesomeIcon size='1x' className='px-2 inline-block' icon={faArrowDownWideShort} />
                                    </div>
                                </div>
                            </div>
                            <div className='my-5 flex items-center'>
                                <MemberComponent />
                                <div className='p-4 border-solid border-[1px] border-[#ccc] flex-1'>
                                    Add a comments...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
