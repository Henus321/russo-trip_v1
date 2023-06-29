import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, DocumentData } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase';
import { toast } from 'react-toastify';

import Loader from '../loader/Loader';
import Button from '../button/Button';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './pathway.scss';

const PathwaysItem: React.FC = () => {
  const [pathwaysItem, setPathwaysItem] = useState<DocumentData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const minLimit = 1;
  const maxLimit = 10;

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, 'pathways', params.pathwayId!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPathwaysItem(docSnap.data());
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchListing();
  }, [navigate, params.pathwayId]);

  const cityWithCapitalizedFirstLetter =
    params.cityName!.charAt(0).toUpperCase() + params.cityName!.slice(1);

  const backHandler = () => {
    navigate(`/city/${params.cityName}`);
    window.scrollTo(0, 0);
  };

  const onQuantityChange = (number: number) => {
    setTotal((quantity + number) * pathwaysItem!.price);
    setQuantity(quantity + number);
    return;
  };

  const onSetDefault = () => {
    setTotal(1 * pathwaysItem!.price);
    setQuantity(1);
  };

  const onBuyItem = () => {
    // Payment service should be here
    toast.error('The purchase is temporarily unavailable');
    console.log({ ...pathwaysItem, quantity: quantity });
  };

  return (
    <main className="pathway">
      {pathwaysItem ? (
        <>
          <h2 className="pathway__title">{pathwaysItem.name}</h2>
          <span className="pathway__under-title">
            {cityWithCapitalizedFirstLetter}
          </span>
          <p className="pathway__paragraph">
            <img
              className="pathway__img"
              src={pathwaysItem.imgUrls}
              alt={pathwaysItem.name}
            />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            omnis voluptates doloremque nobis cumque tempore assumenda, quasi
            minima unde consequatur voluptatum, tenetur commodi rerum deleniti
            ex reiciendis molestias alias sequi. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Obcaecati quo debitis vel officiis
            eaque error provident quis odit harum est ab veniam dolore, neque
            saepe libero nesciunt doloremque nobis cum. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Nemo voluptas possimus, maxime
            perspiciatis iste laboriosam saepe ipsam fuga deserunt. Dolore
            voluptatum nisi vel, saepe praesentium optio tempora deserunt illo
            eligendi. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Nobis quos officia doloremque iste doloribus necessitatibus tempora
            velit esse officiis ipsa vel sunt quam, porro quidem deleniti
            aliquam a quisquam! Quisquam. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Quibusdam eos sint rem fugiat
            asperiores, nobis molestias fuga numquam debitis itaque laborum eum
            at laudantium culpa? Quas consectetur perferendis eos doloremque.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
            ipsam? Debitis tempora sequi repudiandae, itaque perferendis vel
            iste quae. Repellendus asperiores cupiditate in consequuntur fugiat
            deleniti sunt reiciendis voluptas adipisci? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Quidem odio praesentium non
            rerum deleniti facilis voluptatibus excepturi soluta, sit, illo
            corrupti placeat veritatis, sint et! Ea dicta ipsam sit vitae.
          </p>
          <div className="pathway__cart">
            <div className="pathway__cart-row">
              <span className="pathway__cart-item">Name</span>
              <span className="pathway__cart-item">Type</span>
              <span className="pathway__cart-item">Price</span>
              <span className="pathway__cart-item">Quantity</span>
              <span className="pathway__cart-item">Total</span>
              <span className="pathway__cart-item"></span>
            </div>
            <div className="pathway__cart-row">
              <span className="pathway__cart-item">{pathwaysItem.name}</span>
              <span className="pathway__cart-item">{pathwaysItem.type}</span>
              <span className="pathway__cart-item">{pathwaysItem.price}$</span>
              <span className="pathway__cart-item">
                <button
                  className="pathway__decrement-btn"
                  onClick={() => onQuantityChange(-1)}
                  disabled={quantity === minLimit}
                >
                  <FaMinus className="pathway__icon" />
                </button>

                <span>{quantity}</span>
                <button
                  className="pathway__increment-btn"
                  onClick={() => onQuantityChange(1)}
                  disabled={quantity === maxLimit}
                >
                  <FaPlus className="pathway__icon" />
                </button>
              </span>
              <span className="pathway__cart-item">
                {total ? total : pathwaysItem.price}$
              </span>
              <span
                className="pathway__cart-item pathway__x"
                onClick={onSetDefault}
              >
                X
              </span>
            </div>
          </div>
          <div className="pathway__buttons-container">
            <Button
              handler={backHandler}
              buttonType="btn__line pathway__btn"
              buttonText="&larr;&nbsp;&nbsp;Back to City"
            />
            <Button
              buttonType="btn__primary"
              buttonText="Buy Tour"
              handler={onBuyItem}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default PathwaysItem;
