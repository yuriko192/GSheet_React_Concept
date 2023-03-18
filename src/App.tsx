import {useEffect, useState} from 'react'
import './App.scss'
import GSheetIcon from "./assets/icons/GSheetIcon";
import TrashIcon from "./assets/icons/TrashIcon";
import GIcon from "./assets/icons/GIcon";
import {CustomContextType, initializeContext, UserType} from "./types";
import DBIcon from "./assets/icons/DBIcon";

const PAGE_STATE = {
    LOADING: 0,
    NOT_LOGGED_IN: 1,
    NOT_CONNECTED: 2,
    SUCCESS: 3,
}
const CUSTOM_CONTEXT_KEY = "CustomContext"

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
                        className="bg-[#2483F3] rounded-[4px] px-2.5 py-[0.40625rem] text-white font-semibold text-[10px]">
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
                    url: "http://google.com",
                }
            }
            return newContext
        })
    }

    return (
        <button onClick={onConnectClicked}
                className="flex space-x-1 justify-center items-center  bg-[#F5F5F5] rounded-full connectFlowConnectButton w-full h-8">
            <span className="w-4"><DBIcon/> </span>
            <span>Connect Flow Node to Import to Google Sheets</span>
        </button>
    )
}

function renderExportFilePage(
    setContextState: (value: (((prevState: CustomContextType) => CustomContextType) | CustomContextType)) => void
) {
    function onConnectClicked() {
        setContextState(prevContext => {
            const newContext = {
                ...prevContext,
                FlowNode: {
                    id: 1,
                    url: "http://google.com",
                }
            }
            return newContext
        })
    }

    return (
        <div className="p-3 space-y-3">
            <div>
                <div>Google Account</div>
                <div>Account Name</div>
            </div>
            <div>
                <div>File</div>
                <div>SheetName</div>
            </div>
            <button onClick={onConnectClicked}
                    className="flex justify-center items-center bg-[#2483F3] w-full text-white p-2.5 text-[11px] font-semibold rounded-[5px]">
                <span>Export</span>
            </button>
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
            PageContent = renderExportFilePage(setContextState);
            break;

    }

    function resetPage() {
        localStorage.removeItem(CUSTOM_CONTEXT_KEY);
        setContextState(initializeContext())
    }

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
                        <button onClick={resetPage} className="p-1 rounded-[4px] bg-[#F0F0F0]">
                            <div className="w-4">
                                <TrashIcon/>
                            </div>
                        </button>
                    </div>
                </div>
                {PageContent}
            </div>
        </div>
    )
}

export default App
