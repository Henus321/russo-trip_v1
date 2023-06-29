import { useState, useContext } from 'react';
import { CompanyContext } from '../../contexts/company';

import Loader from '../loader/Loader';
import { FaAngleDown, FaAngleUp, FaPlus, FaMinus } from 'react-icons/fa';
import './accordion.scss';

const Accordion = () => {
  const { faq } = useContext(CompanyContext);

  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (i: number | null) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <div className="accordion">
      {faq.length > 0 ? (
        faq.map((item, i) => (
          <div className="accordion__item-container" key={i}>
            <div className="accordion__item" onClick={() => toggle(i)}>
              <div className="accordion__question">
                <span className="accordion__arrow">
                  {selected === i ? (
                    <FaAngleUp className="accordion__icon" />
                  ) : (
                    <FaAngleDown className="accordion__icon" />
                  )}
                </span>
                <h3 className="accordion__title">{item.question}</h3>
              </div>
              <span>
                {selected === i ? (
                  <FaMinus className="accordion__icon" />
                ) : (
                  <FaPlus className="accordion__icon" />
                )}
              </span>
            </div>
            <div
              className={
                selected === i
                  ? 'accordion__content-show'
                  : 'accordion__content'
              }
            >
              {item.answer}
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Accordion;
