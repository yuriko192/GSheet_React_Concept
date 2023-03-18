export interface CustomContextType{
    User: UserType;
    FlowNode: FlowNodeType;
}
export function initializeContext(): CustomContextType {
    return {
        User: {
            id: 0,
            name: "",
            email: "",
        },
        FlowNode: {
            id: 0,
            url: "",
        },
    };
}
export interface UserType {
    id : number;
    name: string;
    email: string;
}

export interface FlowNodeType {
    id : number;
    url: string;
}