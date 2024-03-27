import React, { useState } from 'react';
import Image from 'next/image';
import "../sass/layout/invitationCard.scss"
import type { InvitationCard } from "../../../types/types"
import Link from 'next/link';
import { downloadImage } from '../helpers/download';


function InvitationCard({ image, name, favorite, toggleFavorite, id, url, t }: InvitationCard) {


    const [hover, setHover] = useState(false);

    return (
        <div className='card-container-invitation-card'>
            <div className='image-containerCard'>
                <Link href={`invitation/${id}`}>
                    <Image src={image ?? ''} alt="Invitation Card" className='image' width={250} height={250} />
                </Link>
                <button
                    onClick={toggleFavorite}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className='buttonLike'
                >
                    {favorite || hover ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
                            <path d="M14.5802 0.355713C12.6747 0.355713 11.0465 1.71389 10.152 2.65026C9.25744 1.71389 7.6329 0.355713 5.72835 0.355713C2.44563 0.355713 0.153809 2.64389 0.153809 5.91935C0.153809 9.52844 3.00017 11.8612 5.75381 14.1175C7.05381 15.1839 8.39926 16.2857 9.43108 17.5075C9.60472 17.7121 9.85926 17.8303 10.1265 17.8303H10.1793C10.4474 17.8303 10.7011 17.7112 10.8738 17.5075C11.9074 16.2857 13.252 15.183 14.5529 14.1175C17.3056 11.8621 20.1538 9.52935 20.1538 5.91935C20.1538 2.64389 17.862 0.355713 14.5802 0.355713Z" fill="#818369" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 20 18" fill="none">
                            <path d="M9.27511 2.98532L9.99818 3.74219L10.7212 2.98532C11.588 2.07809 12.9619 1 14.4264 1C15.8288 1 16.9596 1.48483 17.7374 2.26124C18.515 3.03753 19 4.16543 19 5.56364C19 7.07727 18.4114 8.34886 17.4518 9.54489C16.4731 10.7648 15.1596 11.8459 13.7655 12.9882C13.7654 12.9882 13.7654 12.9883 13.7653 12.9883L13.743 13.0066C12.4796 14.0413 11.0895 15.1798 9.99867 16.4564C8.9186 15.1904 7.54133 14.0608 6.28883 13.0335L6.23421 12.9887L6.23381 12.9883C4.83924 11.8456 3.52592 10.7643 2.54747 9.54433C1.58822 8.34833 1 7.07692 1 5.56364C1 4.16543 1.48499 3.03756 2.2627 2.26128C3.04054 1.48488 4.17156 1 5.57454 1C7.03755 1 8.40761 2.07726 9.27511 2.98532Z" stroke="#818369" stroke-width="2" />
                        </svg>
                    }
                </button>
            </div>
            <p className='name-style-card'>{name}</p>
            <section className='button-container-card'>
                <span className='free-label'>{t("free")}</span>
                <button className='buttonA'>{t("edit")}</button>
            </section>
        </div>
    );
}

export default InvitationCard;