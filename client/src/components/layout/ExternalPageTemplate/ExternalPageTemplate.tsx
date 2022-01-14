import { Button, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

import { Separator } from '@components/Separator';
import If from '@components/utils';

import { ButtonWrapper, ContentWrapper, Form, Title } from './ExternalPageTemplate.styles';

interface ExternalPageTemplateProps {
    title: string;
    onButtonClick: () => void;
    footer?: ReactNode;
}

const ExternalPageTemplate: FC<ExternalPageTemplateProps> = ({ children, title, onButtonClick, footer }) => (
    <ContentWrapper>
        <Title variant={'h3'}>{title}</Title>
        <Form>
            {children}
        </Form>
        <ButtonWrapper>
            <Button onClick={onButtonClick} fullWidth variant={'contained'}>
                <Typography variant={'button'}>{title}</Typography>
            </Button>
        </ButtonWrapper>
        <If condition={!!footer}>
            <Separator orientation={'horizontal'} />
            {footer}
        </If>
    </ContentWrapper>
);

export default ExternalPageTemplate;
