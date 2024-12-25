import Board from "@/widgets/board/ui/board.tsx";

function StartPage() {

    return (
        <>
            <div className="flex-colomn h-screen bg-slate-300">
                <div className="flex bg-red-900 items-center justify-center">
                    <h1 className="p-2 text-4xl text-white">
                        BUSCAMINAS DE MIGUEL
                    </h1>
                </div>
                <Board/>
            </div>
        </>
    )
}

export default StartPage