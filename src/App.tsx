import { Card, CardBody } from "@heroui/react"
import ThemeToggle from "./components/ThemeToggle"

const App = () => {
  return (
    <div>
      <ThemeToggle />
      <Card className="max-w-[500px]">
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
      </Card>
    </div>
  )
}

export default App
