'use client';

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export default function ChatNavbar() {
    return (
        <Link href="/chat" passHref>
            <div className="flex cursor-pointer">
                <FontAwesomeIcon
                    style={{ cursor: 'pointer' }}
                    className="text-secondaryColor text-xl"
                    icon={faComment}
                />
            </div>
        </Link>
    );
}
