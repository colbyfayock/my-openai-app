import { POKEMON_TYPES, POKEMON_ATTRIBUTES }  from '@/data/pokemon';

import styles from './Card.module.scss';

const Card = ({ attributes: userAttributes, image: userImage, isLoading = false }) => {
  const isEmpty = !userAttributes && !userImage && !isLoading;

  const attributes = userAttributes || POKEMON_ATTRIBUTES;
  const image = userImage || {};

  const type = attributes.type?.toLowerCase();
  const weakness = attributes.weakness?.toLowerCase();
  const resistance = attributes.resistance?.toLowerCase();

  const { Icon: IconType, color: colorType } = POKEMON_TYPES[type] || POKEMON_TYPES['default'];
  const { Icon: IconWeakness, color: colorWeakness } = POKEMON_TYPES[weakness] || POKEMON_TYPES['default'];
  const { Icon: IconResistance, color: colorResistance } = POKEMON_TYPES[resistance] || POKEMON_TYPES['default'];

  return (
    <div className={styles.card} data-is-empty={isEmpty}>
      <span className={styles.cardContent} style={{ backgroundColor: colorType }}>
        <span className={styles.cardHead}>
          <span>
            <span className={styles.cardSubType}>Basic</span>
            <span className={styles.cardName}>{ attributes?.name }</span>
          </span>
          <span>
            <span className={styles.cardHp}>
              <span>HP</span>{ attributes?.hitPoints }
            </span>
            <span className={styles.cardType}>
              <span className="sr-only">{ attributes?.type }</span>
              <span className={styles.cardTypeIcon} style={{ backgroundColor: colorType }}>
                <IconType />
              </span>
            </span>
          </span>
        </span>
        <span className={styles.cardImage} data-is-loading={isLoading}>
          {image?.url && <img src={image.url} />}
        </span>
        <span className={styles.cardAttributes}>
          { attributes?.category } Pokemon. Ht: { attributes?.lengthInches }&quot;, WT: {attributes?.weightPounds?.toFixed(2)} lbs.
        </span>
        <span className={styles.cardPower}>
          <strong>{ attributes?.attack?.name }</strong> { attributes?.attack?.description }
        </span>
        <span className={styles.cardAttack}>
          <span><strong>{ attributes?.power?.name }</strong> { attributes?.power?.description }</span>
          <span className={styles.cardAttackHp}>{ attributes?.power?.hitPoints }</span>
        </span>
        <span className={styles.cardInteractions}>
          <span className={styles.cardWeakness}>
            <span className={styles.cardInteractionTitle}>Weakness</span>
            <span className={styles.cardWeaknessIcon} style={{ backgroundColor: colorWeakness }}>
              <span className="sr-only">{ attributes?.weakness }</span>
              <IconWeakness />
            </span>
          </span>
          <span className={styles.cardResistance}>
            <span className={styles.cardInteractionTitle}>Resistance</span>
            <span className={styles.cardResistanceIcon} style={{ backgroundColor: colorResistance }}>
              <span className="sr-only">{ attributes?.resistance }</span>
              <IconResistance />
            </span>
          </span>
          <span className={styles.cardRetreatCost}>
            <span className={styles.cardInteractionTitle}>Retreat Cost</span>
            <span className="sr-only">{ attributes?.retreatCost }</span>
            <div>
              { [...new Array(attributes?.retreatCost)].map((_, i) => {
                return (
                  <span key={i} className={styles.cardRetreatCostIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="156"
                      height="178"
                      fill="none"
                      viewBox="0 0 156 178"
                    >
                      <path
                        fill="#000"
                        d="M68.477 7.735c2.967-9.266 16.079-9.266 19.046 0l10.573 33.012a10 10 0 0011.644 6.723l33.876-7.35c9.508-2.063 16.064 9.292 9.523 16.495l-23.303 25.663a10 10 0 000 13.444l23.303 25.663c6.541 7.203-.015 18.558-9.523 16.495l-33.876-7.35a10 10 0 00-11.644 6.723l-10.573 33.012c-2.967 9.266-16.079 9.266-19.046 0l-10.573-33.012a10 10 0 00-11.644-6.723l-33.875 7.35c-9.51 2.063-16.065-9.292-9.524-16.495l23.303-25.663a10 10 0 000-13.444L2.86 56.615c-6.541-7.203.015-18.558 9.523-16.495l33.876 7.35a10 10 0 0011.644-6.723L68.476 7.735z"
                      ></path>
                    </svg>
                  </span>
                )
              }) }
            </div>
          </span>
        </span>
      </span>
    </div>
  );
};

export default Card;