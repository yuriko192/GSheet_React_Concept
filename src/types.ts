export interface CustomContextType{
    User: UserType;
    FlowNode: FlowNodeType;
    SelectedSheet: SheetNodeType;
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
        SelectedSheet: {
            id:-1,
            label: "",
        }
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

export interface SheetNodeType {
    id : number;
    label: string;
    LastExportDate?: Date;
}