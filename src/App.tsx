import React, {useEffect, useState} from 'react'
import './App.scss'
import GSheetIcon from "./assets/icons/GSheetIcon";
import TrashIcon from "./assets/icons/TrashIcon";
import GIcon from "./assets/icons/GIcon";
import {CustomContextType, initializeContext} from "./utils/types";
import DBIcon from "./assets/icons/DBIcon";
import CloseIcon from "./assets/icons/CloseIcon";
import {Select, Tooltip} from "antd";
import SearchIcon from "./assets/icons/SearchIcon";
import CheckMarkIcon from "./assets/icons/CheckMarkIcon";
import ChevronDownIcon from "./assets/icons/ChevronDownIcon";
import {CUSTOM_CONTEXT_KEY, PAGE_STATE} from "./utils/const";

function switchPage(
    context: CustomContextType,
    setPageState: (value: (((prevState: number) => number) | number)) => void
) {
    // debugger;
    if (context.User.id == 0) {
        setPageState(PAGE_STATE.NOT_LOGGED_IN)
        return
    }

    if (context.FlowNode.id == 0) {
        setPageState(PAGE_STATE.NOT_CONNECTED)
        return;
    }

    setPageState(PAGE_STATE.SUCCESS)
}

function renderLoginPage(
    setContextState: (value: (((prevState: CustomContextType) => CustomContextType) | CustomContextType)) => void
) {
    function onConnectClicked() {
        setContextState(prevContext => {
            const newContext = {
                ...prevContext,
                User: {
                    id: 1,
                    email: "johnDoe@gmail.com",
                    name: "John Doe"
                }
            }
            return newContext
        })
    }

    return (
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
                <button onClick={onConnectClicked}
                        className="Primary px-2.5 py-1">
                    Connect
                </button>
            </div>
        </div>
    )
}

function renderConnectFlowNodePage(
    setContextState: (value: (((prevState: CustomContextType) => CustomContextType) | CustomContextType)) => void
) {
    function onConnectClicked() {
        setContextState(prevContext => {
            const newContext = {
                ...prevContext,
                FlowNode: {
                    id: 1,
                }
            }
            return newContext
        })
    }

    return (
        <button onClick={onConnectClicked}
                className="flex space-x-1 items-center  bg-[#F5F5F5] rounded-full text-[11px] text-[#262626] font-medium w-full h-8">
            <DBIcon/>
            <span>Connect Flow Node to Import to Google Sheets</span>
        </button>
    )
}

function renderExportFilePage(
    contextState: CustomContextType,
    setContextState: (value: (((prevState: CustomContextType) => CustomContextType) | CustomContextType)) => void
) {
    function onExportClicked() {
        setContextState(prevContext => {
            const prevSheet = prevContext.SelectedSheet

            return {
                ...prevContext,
                SelectedSheet: {
                    ...prevSheet,
                    LastExportDate: new Date()
                }
            }
        })
    }

    function onTabChange(idx: number, item: string) {
        setContextState(prevContext => {
            return {
                ...prevContext,
                SelectedSheet: {
                    id: idx,
                    label: item,
                }
            }
        })
    }

    const items = ['Tab 1', 'Tab 2', 'Tab 3'];

    const TabSelectionList = (
        <div className="w-[154px] flex flex-col">
            <div className="flex align-middle px-2 py-1.5 border-[1px] rounded-[5px]">
                <SearchIcon/>
                <input
                    placeholder="Search"
                    className="w-full h-4 ml-1 outline-none text-black text-[10px]"
                />
            </div>
            {items.map((item, idx) => (
                <button key={item}
                        className="w-full flex text-black px-1 py-1.5 items-center text-left"
                        onClick={() => {
                            onTabChange(idx, item)
                        }}
                >
                    <span className="ml-2 flex-grow text-[11px]">{item}</span>
                    {idx === contextState.SelectedSheet.id && <CheckMarkIcon/>}
                </button>
            ))}
        </div>
    )

    return (
        <div className="space-y-3">
            <div className="flex flex-col space-y-2">
                <div className="font-semibold text-[11px]">
                    Google Account
                </div>
                <div>
                    <Select
                        defaultValue="John"
                        style={{width: '100%'}}
                        options={[
                            {value: 'John', label: 'John Doe'},
                        ]}
                    />
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="font-semibold text-[11px]">
                    File
                </div>
                <div>
                    <div className="w-full flex items-center p-2 pl-2.5 border-[1px] rounded-[5px] space-x-2">
                        <span className="flex flex-grow items-center space-x-2">
                             <GSheetIcon width={20}/>
                            <span className="font-medium text-[11px]">SheetName</span>
                        </span>
                        <Tooltip title={TabSelectionList} arrow={false} color="#FFFFFF" trigger="click"
                                 placement="bottomLeft">
                            <button
                                className="px-1.5 py-1 space-x-1 flex items-center bg-[#F5F5F5] text-[#848484] rounded-full">
                                <span className="font-semibold text-[10px] ml-1.5">
                                    {contextState.SelectedSheet.label ? contextState.SelectedSheet.label : "Select Tab"}
                                </span>
                                <span className="w-4"><ChevronDownIcon/></span>
                            </button>
                        </Tooltip>
                        <span onClick={() => {
                            onTabChange(-1, "")
                        }}>
                            <CloseIcon/>
                        </span>

                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <button onClick={onExportClicked}
                        className="Primary w-full p-2.5 disabled:opacity-40"
                        disabled={contextState.SelectedSheet.id == -1}
                >
                    <span>Export</span>
                </button>
                {null != contextState.SelectedSheet.LastExportDate &&
                    <div className="flex justify-center">
                        <span className="text-[#848484] text-medium text-[10px]">Last export 14h ago</span>
                    </div>
                }
            </div>
        </div>
    )
}


function App() {
    const [pageState, setPageState] = useState(PAGE_STATE.LOADING);
    const [contextState, setContextState] = useState<CustomContextType>(() => {
        const localContextText = localStorage.getItem(CUSTOM_CONTEXT_KEY);
        //Note JSON.parse(localContext) doesn't have type safety checking
        return localContextText ? JSON.parse(localContextText) : initializeContext();
    });

    useEffect(() => {
        if (contextState) {
            switchPage(contextState, setPageState)
        }
        localStorage.setItem(CUSTOM_CONTEXT_KEY, JSON.stringify(contextState));
    }, [contextState]);

    let PageContent = null
    switch (pageState) {
        case PAGE_STATE.LOADING:
            PageContent = (<h1 className="font-semibold text-[13px]">Loading, Please Wait</h1>);
            break;
        case PAGE_STATE.NOT_LOGGED_IN:
            PageContent = renderLoginPage(setContextState);
            break;
        case PAGE_STATE.NOT_CONNECTED:
            PageContent = renderConnectFlowNodePage(setContextState);
            break;
        case PAGE_STATE.SUCCESS:
            PageContent = renderExportFilePage(contextState, setContextState);
            break;
    }

    function resetPage() {
        localStorage.removeItem(CUSTOM_CONTEXT_KEY);
        setContextState(initializeContext())
    }

    return (
        <div className="bg-blue-50 p-5 min-h-screen">
            <div className="w-[354px] flex flex-col bg-white border-[1px] rounded-[8px] p-4 space-y-3">
                <div className="w-full flex items-center">
                    <div className="p-2 rounded-[5px] bg-[#ebf7f2]">
                        <GSheetIcon/>
                    </div>
                    <div className="ml-3 font-semibold text-[13px]">
                        Export to Google Sheets
                    </div>
                    <div className="flex-grow"></div>
                    <div>
                        <button onClick={resetPage} className="p-1 rounded-[4px] bg-[#F0F0F0]">
                            <TrashIcon/>
                        </button>
                    </div>
                </div>
                {PageContent}
            </div>
        </div>
    )
}

export default App
