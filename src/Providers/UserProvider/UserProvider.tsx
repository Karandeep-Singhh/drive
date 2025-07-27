"use client"
import { createContext, useContext, useState, type Dispatch, type FC, type PropsWithChildren, type SetStateAction } from "react"

import type { User } from "~/service/types"



type TUserContext = {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
}

const Context = createContext<TUserContext>({} as TUserContext)

export const UserProvider: FC<PropsWithChildren<{ user: User | null }>> = ({ children, user: initialUser }) => {
    const [user, setUser] = useState<User | null>(initialUser)

    return <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
}


export const useUser = () => useContext(Context)