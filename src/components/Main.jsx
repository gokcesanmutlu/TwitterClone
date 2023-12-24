import Form from "./Form"

const Main = ({user}) => {
    return (
        <main className="border border-gray-900 overflow-y-auto ">
        <header className="font-bold p-4 border-b-[0.5px] border-gray-900">
          Home
        </header>

        <Form user={user}/>

        {/* twitleri liste */}
        </main>
  
    )
}

export default Main;