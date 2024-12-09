'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faChevronDown, faBoxOpen, faStore, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/store/store';
import useLogin from '@/hooks/useLogin';

export default function UserDropdown() {
  const { userInfo } = useAppSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPedidosOpen, setIsPedidosOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const togglePedidos = () => {
    setIsPedidosOpen(!isPedidosOpen);
  };

  const { handleLogout } = useLogin();

  useEffect(() => {
    console.log("Imagem no redux", userInfo?.imagem);
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
        setIsPedidosOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative flex items-center gap-2">
      <span className="text-white">{userInfo?.name?.split(' ')[0]}</span>

      <div
        className="relative flex items-center cursor-pointer user-dropdown"
        onClick={toggleDropdown}
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {typeof userInfo?.imagem === "string" && userInfo?.imagem && userInfo?.imagem !== "undefined" ? (
            <img
              src={userInfo?.imagem}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
          ) : (
            <FontAwesomeIcon
              className="text-mainColor text-3xl"
              icon={faUserCircle}
            />
          )}
        </div>
        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-white text-xs" />
      </div>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 user-dropdown"
          style={{ top: '100%', right: '0' }}
        >
          <div className="p-2 border-b border-gray-200 hover:bg-gray-100 rounded-md">
            <Link href="/perfil">
              <button className="w-full flex items-center text-left text-gray-700 p-2 rounded-md">
                <FontAwesomeIcon icon={faUserCircle} size="lg" className="mr-2 text-mainColor text-1xl" />
                Perfil
              </button>
            </Link>
          </div>
          <div className="p-2 border-b border-gray-200 hover:bg-gray-100">
            <Link href="/loja">
              <button className="w-full flex items-center text-left text-gray-700 p-2 rounded-md">
                <FontAwesomeIcon icon={faStore} size="lg" className="mr-2 text-mainColor text-1xl" />
                Loja
              </button>
            </Link>
          </div>
          <div className="p-2 border-b border-gray-200 hover:bg-gray-100">
            <Link href="/meusanuncios">
              <button className="w-full flex items-center text-left text-gray-700 p-2 rounded-md">
                <FontAwesomeIcon icon={faBoxOpen} size="lg" className="mr-2 text-mainColor text-1xl" />
                Meus anúncios
              </button>
            </Link>
          </div>
          <div className="p-2 border-b border-gray-200 hover:bg-gray-100">
            <button
              onClick={togglePedidos}
              className="w-full flex items-center justify-between text-left text-gray-700 p-2 rounded-md"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} size="lg" className="mr-2 text-mainColor text-1xl" />
                Meus pedidos
              </div>
              <FontAwesomeIcon icon={faChevronRight} className={`transform ${isPedidosOpen ? 'rotate-90' : ''}`} />
            </button>
            {isPedidosOpen && (
              <div className="ml-4 mt-2 border-l border-gray-200 pl-2">
                <Link href="/meuspedidos/realizados">
                  <button className="w-full flex items-center text-left text-sm text-gray-700 p-1 hover:bg-gray-200 rounded-md">
                    Pedidos Realizados
                  </button>
                </Link>
                <Link href="/meuspedidos/recebidos">
                  <button className="w-full flex items-center text-left text-sm text-gray-700 p-1 hover:bg-gray-200 rounded-md">
                    Pedidos Recebidos
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-md">
            <button
              onClick={handleLogout}
              className="w-full flex items-center text-left text-secondaryColor p-2 rounded-md"
            >
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2 text-secondaryColor" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
