import { FunctionComponent } from 'react';

import { SeparatorBorder } from './Separator.styles';
import { SeparatorProps } from './Separator.types';

const Separator: FunctionComponent<SeparatorProps> = (props) => {
    return (
        <SeparatorBorder {...props} />
    );
};

export default Separator;
