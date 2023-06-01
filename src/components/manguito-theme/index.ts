import GenerateMCLClass from './theme'
import type { ClassType, InputType } from './theme'

const generateClass = (type: ClassType, value: InputType): string => {
  const mclGenerate = new GenerateMCLClass(type, value)

  return mclGenerate.generateClassName()
}

export default generateClass
