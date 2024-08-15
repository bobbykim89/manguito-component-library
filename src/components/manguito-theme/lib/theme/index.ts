import { MclClass, type ClassType, type InputType } from './mcl-theme'

export const generateClass = <T extends ClassType>(
  type: T,
  value: InputType<T>
): string => {
  const mclGenerate = new MclClass(type, value)
  return mclGenerate.generateClass()
}
