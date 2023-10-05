interface CollapseItem {
  open: boolean
}

export interface CollapseState {
  [id: string]: CollapseItem
}
