'use client';

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useFavoritos from "@/hooks/useFavoritos";

export default function AnunciosFavoritos() {
    const { getQuantidadeItensFavoritos } = useFavoritos();
    const [number, setNumber] = useState(getQuantidadeItensFavoritos());

    useEffect(() => {
        setNumber(getQuantidadeItensFavoritos());
    }, [getQuantidadeItensFavoritos]);

    return (
        <Link href="/favoritos" passHref>
            <div className="flex cursor-pointer">
                <FontAwesomeIcon
                    style={{ cursor: 'pointer' }}
                    className="text-secondaryColor text-xl"
                    icon={faHeart}
                />
                <div className="rounded-xl bg-secondaryColor text-white w-5 flex items-center justify-center text-xs ml-1 font-bold">
                    {number}
                </div>
            </div>
        </Link>
    );
}
