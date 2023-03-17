import {useState} from 'react'
import './App.scss'
import GSheetIcon from "./assets/icons/GSheetIcon";
import TrashIcon from "./assets/icons/TrashIcon";
import GIcon from "./assets/icons/GIcon";

function App() {
    return (
        <div className="bg-blue-50 p-5 min-h-screen">
            <div className="w-[354px] bg-white border-[1px] rounded-[8px] p-4 flex flex-col space-y-3">
                <div className="flex w-full items-center">
                    <div className="p-2 rounded-[5px] bg-[#ebf7f2]">
                        <div className="w-4">
                            <GSheetIcon/>
                        </div>
                    </div>
                    <div className="ml-3 font-semibold text-[13px]">
                        Export to Google Sheets
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <div className="p-1 rounded-[4px] bg-[#F0F0F0]">
                            <div className="w-4">
                                <TrashIcon/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="p-3 space-y-3">
                    <div className="flex space-x-3">
                        <div className="w-9">
                            <GIcon/>
                        </div>
                        <div className="flex flex-col">
                            <div className="font-semibold text-[13px]">
                                Connect Google Account
                            </div>
                            <div className="font-medium text-[11px]">
                                Please connect Google Account to use this block
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="bg-[#2483F3] rounded-[4px] px-2.5 py-[0.40625rem] text-white font-semibold text-[10px]">
                            Connect
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
