import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

/** 要素中央よせ・レスポンシブに対応するコンポーネント */
const Container: FunctionComponent = ({ children }: Props) => {
  return <div className="container mx-auto px-5">{children}</div>
}

export default Container
