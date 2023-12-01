export interface DropdownItem {
    title: string;
    [key: string]: string;
}
export interface ItemClickEvent {
    event: Event;
    item: DropdownItem;
}
