import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
}

/** 要素中央よせ・レスポンシブに対応するコンポーネント */
const Container: FunctionComponent = ({ children }: Props) => {
  return <div className="wi-fit pb-24 md:pb-0 px-2 md:px-12">{children}</div>
}

export default Container
