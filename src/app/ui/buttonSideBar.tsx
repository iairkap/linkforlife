import React, { ReactNode } from 'react';
import '../sass/components/buttonSideBar.scss';
import Link from 'next/link';

interface IconObject {
    src: string;
    height: string;
    width: string;
    blurWidth: string;
    blurHeight: string;
}

interface Props {
    icon: ReactNode | IconObject;
    Tooltip: string;
    Link: any;
    isActive?: boolean;
}

const ButtonSideBar = ({ icon, Tooltip, Link: linkPath, isActive }: Props) => {
    const iconElement = (typeof icon === 'object' && 'src' in icon)
        ? <img src={icon.src} height={icon.height} width={icon.width} style={{ filter: `blur(${icon.blurWidth}px ${icon.blurHeight}px)` }} />
        : icon;

    const buttonClass = isActive ? 'buttonactive' : 'button'; // Aplica la clase 'active' si el botón está activo

    return (
        <div>
            <Link href={linkPath}>
                <button className={buttonClass}>
                    {iconElement}
                    <span>{Tooltip}</span>
                </button>
            </Link>
        </div>
    );
};

export default ButtonSideBar;