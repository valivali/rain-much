import Text from "@/components/UI/Text/Text"
import "./Header.scss"

export interface IHeaderProps {
  title: string
}

function Header({ title }: IHeaderProps) {
  return (
    <header className="header">
      <Text variant="title" size="medium" color="light" className="header__title">
        {title}
      </Text>
    </header>
  )
}

export default Header

