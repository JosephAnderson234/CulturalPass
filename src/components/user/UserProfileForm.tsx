"use client";
import { useState } from "react";
import { UserResponse } from "@src/interfaces/user/user";
//this is a basic implementation due to, the user will be able to edit his profile in future updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useForm, SubmitHandler } from "react-hook-form"

export const ProfileForm = ({ data }: { data: UserResponse }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isEditing, setIsEditing] = useState(false);
    return (
        <form className="w-1/2 p-5">
            <h1 className="text-center my-2">Perfil de Usuario</h1>
            <div>
                <label htmlFor="">Nombres: </label>
                <input type="text" defaultValue={data.firstName}  disabled={!isEditing}/>
            </div>
            <div>
                <label htmlFor="">Apellidos: </label>
                <input type="text" defaultValue={data.lastName} disabled={!isEditing} />
            </div>
            <div>
                <label htmlFor="">Correo: </label>
                <input type="email" defaultValue={data.email} disabled={!isEditing} />
            </div>
            <div>
                <label htmlFor="">Teléfono: </label>
                <input type="text" defaultValue={data.cellphone || ''} disabled={!isEditing} />
            </div>
            
        </form>
    );
}