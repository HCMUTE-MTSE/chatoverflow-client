import * as React from 'react';
import { Slider as PrimitiveSlider } from 'radix-ui';

import styles from './Slider.module.css';

interface SliderProps {
   className?: string;
   defaultValue?: number[];
   currentValue?: number;
   max?: number;
   step?: number;
}

function Slider({
   className,
   defaultValue,
   currentValue,
   max,
   step,
}: SliderProps) {
   return (
      <form>
         <PrimitiveSlider.Root
            className={`${className} ${styles.root}`}
            defaultValue={defaultValue || [50]}
            value={[currentValue || 0]}
            max={max || 100}
            step={step || 1}
         >
            <PrimitiveSlider.Track className={styles.track}>
               <PrimitiveSlider.Range className={styles.range} />
            </PrimitiveSlider.Track>
         </PrimitiveSlider.Root>
      </form>
   );
}

export default Slider;
