import GenerateMCLClass from './theme/generateClass'
import type { ClassType, InputType } from './theme/generateClass'

const generateClass = (type: ClassType, value: InputType): string => {
  const mclGenerate = new GenerateMCLClass(type, value)

  return mclGenerate.generateClassName()
}

export default generateClass
