"use client";

import useLogin from '@/hooks/useLogin';
import { faBars, faBoxOpen, faEnvelope, faGear, faSignOutAlt, faStore, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function MenuLateral() {
    const pathname = usePathname();
    const { handleLogout } = useLogin();
    const [isPedidosOpen, setIsPedidosOpen] = useState(false);

    const togglePedidosMenu = () => {
        setIsPedidosOpen(!isPedidosOpen);
    };

    return (
        <div className='bg-white h-auto w-72 flex flex-col pt-10 pb-5'>
            <div className={`w-full flex justify-start mb-12 pl-12 ${pathname === '/configuracoes' ? 'border-r-4 border-mainColor' : ''}`}>
                <FontAwesomeIcon style={{ cursor: 'pointer' }} className="text-mainColor text-xl" icon={faBars} />
                <span className='text-mainColor font-semibold ml-4'>Menu</span>
            </div>

            <Link href="/perfil">
                <div className={`w-full flex justify-start pl-12 border-t border-mainColor/30 py-5 ${pathname === '/perfil' ? 'border-r-4 border-mainColor' : ''}`}>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} className="text-mainColor text-xl" icon={faUser} />
                    <span className='text-mainColor font-semibold ml-4 text-md'>Meu perfil</span>
                </div>
            </Link>

            <Link href="/loja">
                <div className={`w-full flex justify-start pl-12 border-t border-mainColor/30 py-5 ${pathname === '/loja' ? 'border-r-4 border-mainColor' : ''}`}>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} className="text-mainColor text-xl" icon={faStore} />
                    <span className='text-mainColor font-semibold ml-4'>Minha loja</span>
                </div>
            </Link>

            <Link href="/meusanuncios">
                <div className={`w-full flex justify-start pl-12 border-b border-t border-mainColor/30 py-5 ${pathname === '/meusanuncios' ? 'border-r-4 border-mainColor' : ''}`}>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} className="text-mainColor text-xl" icon={faBoxOpen} />
                    <span className='text-mainColor font-semibold ml-4'>Meus anúncios</span>
                </div>
            </Link>

            <div className="w-full flex flex-col border-b border-t border-mainColor/30">
                <div 
                    className={`flex justify-start pl-12 py-5`}
                    onClick={togglePedidosMenu}
                >
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} className="text-mainColor text-xl" icon={faEnvelope} />
                    <span className='text-mainColor font-semibold ml-4'>Meus pedidos</span>
                    <FontAwesomeIcon 
                        style={{ cursor: 'pointer' }} 
                        className={`ml-auto mr-4 text-mainColor transform ${isPedidosOpen ? 'rotate-180' : ''}`} 
                        icon={faChevronDown} 
                    />
                </div>
                {isPedidosOpen && (
                    <div className="flex flex-col pl-16">
                        <Link href="/meuspedidos/realizados">
                            <div className={`flex justify-start text-sm py-3 pl-4 rounded-l-md ${pathname === '/meuspedidos/realizados' ? 'bg-gray-100 border-r-2 border-mainColor' : ''}`}>
                                <span className='text-mainColor'>Pedidos Realizados</span>
                            </div>
                        </Link>
                        <Link href="/meuspedidos/recebidos">
                            <div className={`flex justify-start text-sm py-3 pl-4 rounded-l-md ${pathname === '/meuspedidos/recebidos' ? 'bg-gray-100 border-r-2 border-mainColor' : ''}`}>
                                <span className='text-mainColor'>Pedidos Recebidos</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

            <div className="flex-grow"></div>

            <button onClick={handleLogout} className="w-full flex pl-12 justify-start border-t border-mainColor/30 py-5">
                <FontAwesomeIcon style={{ cursor: 'pointer' }} className="text-secondaryColor text-xl" icon={faSignOutAlt} />
                <span className='text-secondaryColor font-semibold ml-4'>Sair</span>
            </button>
        </div>
    );
}
