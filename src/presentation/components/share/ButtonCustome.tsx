import { ButtonProps } from './typeShare';
import { Box, styled } from '@mui/material';

interface SaveButtonProps {
    backgroundColor?: string;
    hoverColor?: string;
}
const SaveButton = styled(Box)<SaveButtonProps>(({ theme, backgroundColor, hoverColor }) => ({
    backgroundColor: backgroundColor || 'greenyellow',
    '&:hover': {
        backgroundColor: hoverColor || 'green',
    },
    padding: theme.spacing(1, 2), // Thêm padding xung quanh nút
    borderRadius: theme.shape.borderRadius, // Thêm bo góc
}));

const ButtonCustome = (props: ButtonProps) => {
    const { Title, onClick, BackgroundColor, HoverColor, Icon } = props;
    return (
        <>
            <SaveButton
                component="button"
                className="save-btn"
                onClick={onClick}
                backgroundColor={BackgroundColor}
                hoverColor={HoverColor}
            >
                {Icon && <i className={Icon} />}
                {/* fa-solid fa-plus
               fa-solid fa-pen-to-square */}

                <span className="m-3">{Title}</span>
            </SaveButton>
        </>
    );
};
export default ButtonCustome;
