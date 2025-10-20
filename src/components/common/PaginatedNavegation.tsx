"use client";

import { useSearchParams } from "next/navigation";

export const PaginatedNavegation = ({page, totalPages, totalElements, size} : {page: number, totalPages: number, totalElements: number, size: number}) => {

    const params = useSearchParams();
    const realPage = page+1

    return (
        <div>
            <div className="flex flex-row">
                <div>
                    <button disabled={realPage <= 1}>
                        Anterior
                    </button>
                </div>

                <div className="px-3">
                    Página {realPage} de {totalPages} - Total de elementos {totalElements}
                </div>

                <div>
                    <button disabled={realPage >= totalPages}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    )
}