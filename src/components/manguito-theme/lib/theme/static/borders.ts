import type { Range } from './theme.types'

export type BorderWidth = {
  [key in Range<1, 12>]: string
}

export class MclBorderWidthClass {
  // Border width class
  public borderWidth: BorderWidth = {
    1: 'border-[1px]',
    2: 'border-[2px]',
    3: 'border-[3px]',
    4: 'border-[4px]',
    5: 'border-[5px]',
    6: 'border-[6px]',
    7: 'border-[7px]',
    8: 'border-[8px]',
    9: 'border-[9px]',
    10: 'border-[10px]',
    11: 'border-[11px]',
    12: 'border-[12px]',
  }
  public borderXWidth: BorderWidth = {
    1: 'border-x-[1px]',
    2: 'border-x-[2px]',
    3: 'border-x-[3px]',
    4: 'border-x-[4px]',
    5: 'border-x-[5px]',
    6: 'border-x-[6px]',
    7: 'border-x-[7px]',
    8: 'border-x-[8px]',
    9: 'border-x-[9px]',
    10: 'border-x-[10px]',
    11: 'border-x-[11px]',
    12: 'border-x-[12px]',
  }
  public borderYWidth: BorderWidth = {
    1: 'border-y-[1px]',
    2: 'border-y-[2px]',
    3: 'border-y-[3px]',
    4: 'border-y-[4px]',
    5: 'border-y-[5px]',
    6: 'border-y-[6px]',
    7: 'border-y-[7px]',
    8: 'border-y-[8px]',
    9: 'border-y-[9px]',
    10: 'border-y-[10px]',
    11: 'border-y-[11px]',
    12: 'border-y-[12px]',
  }
  public borderTopWidth: BorderWidth = {
    1: 'border-t-[1px]',
    2: 'border-t-[2px]',
    3: 'border-t-[3px]',
    4: 'border-t-[4px]',
    5: 'border-t-[5px]',
    6: 'border-t-[6px]',
    7: 'border-t-[7px]',
    8: 'border-t-[8px]',
    9: 'border-t-[9px]',
    10: 'border-t-[10px]',
    11: 'border-t-[11px]',
    12: 'border-t-[12px]',
  }
  public borderBottomWidth: BorderWidth = {
    1: 'border-b-[1px]',
    2: 'border-b-[2px]',
    3: 'border-b-[3px]',
    4: 'border-b-[4px]',
    5: 'border-b-[5px]',
    6: 'border-b-[6px]',
    7: 'border-b-[7px]',
    8: 'border-b-[8px]',
    9: 'border-b-[9px]',
    10: 'border-b-[10px]',
    11: 'border-b-[11px]',
    12: 'border-b-[12px]',
  }
  public borderLeftWidth: BorderWidth = {
    1: 'border-l-[1px]',
    2: 'border-l-[2px]',
    3: 'border-l-[3px]',
    4: 'border-l-[4px]',
    5: 'border-l-[5px]',
    6: 'border-l-[6px]',
    7: 'border-l-[7px]',
    8: 'border-l-[8px]',
    9: 'border-l-[9px]',
    10: 'border-l-[10px]',
    11: 'border-l-[11px]',
    12: 'border-l-[12px]',
  }
  public borderRightWidth: BorderWidth = {
    1: 'border-r-[1px]',
    2: 'border-r-[2px]',
    3: 'border-r-[3px]',
    4: 'border-r-[4px]',
    5: 'border-r-[5px]',
    6: 'border-r-[6px]',
    7: 'border-r-[7px]',
    8: 'border-r-[8px]',
    9: 'border-r-[9px]',
    10: 'border-r-[10px]',
    11: 'border-r-[11px]',
    12: 'border-r-[12px]',
  }
}
