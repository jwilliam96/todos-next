"use client"

import { logout } from '@/actions'
import React from 'react'
import { RiLogoutBoxLine } from 'react-icons/ri'

export function LogoutButton() {
    return (
        <div onClick={() => logout()} className="bg-dark-Fondo-gradient py-1 px-4 rounded-xl flex max-w-max gap-2 cursor-pointer">
            <RiLogoutBoxLine size={30} />
            <button className="font-bold" >Logout</button>
        </div>
    )
}