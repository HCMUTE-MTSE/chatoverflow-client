import * as React from 'react';
import { RadioGroup as PrimitiveRadioGroup } from 'radix-ui';

import styles from './RadioGroup.module.css';
function RadioGroup() {
   return (
      <form>
         <PrimitiveRadioGroup.Root
            className={styles.Root}
            defaultValue="default"
            aria-label="View density"
            orientation="vertical"
         >
            <div style={{ display: 'flex', alignItems: 'center' }}>
               <PrimitiveRadioGroup.Item
                  className={styles.Item}
                  value="1"
                  id="r1"
               >
                  <PrimitiveRadioGroup.Indicator
                     className={styles.Indicator}
                  />
               </PrimitiveRadioGroup.Item>
               <label className={styles.Label} htmlFor="r1"></label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
               <PrimitiveRadioGroup.Item
                  className={styles.Item}
                  value="2"
                  id="r2"
               >
                  <PrimitiveRadioGroup.Indicator
                     className={styles.Indicator}
                  />
               </PrimitiveRadioGroup.Item>
               <label className={styles.Label} htmlFor="r2"></label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
               <PrimitiveRadioGroup.Item
                  className={styles.Item}
                  value="3"
                  id="r3"
               >
                  <PrimitiveRadioGroup.Indicator
                     className={styles.Indicator}
                  />
               </PrimitiveRadioGroup.Item>
               <label className={styles.Label} htmlFor="r3"></label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
               <PrimitiveRadioGroup.Item
                  className={styles.Item}
                  value="4"
                  id="r4"
               >
                  <PrimitiveRadioGroup.Indicator
                     className={styles.Indicator}
                  />
               </PrimitiveRadioGroup.Item>
               <label className={styles.Label} htmlFor="r4"></label>
            </div>
         </PrimitiveRadioGroup.Root>
      </form>
   );
}

export default RadioGroup;
