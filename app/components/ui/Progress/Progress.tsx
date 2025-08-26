import * as React from 'react';

import styles from './Progress.module.css';
import Slider from '../Slider';

function Progress() {
   const [progress, setProgress] = React.useState(13);

   return <Slider />;
}

export default Progress;
