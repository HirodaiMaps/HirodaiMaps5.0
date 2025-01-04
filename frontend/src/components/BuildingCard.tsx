
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


interface BuildingCardProps {
    imageUrl: string;
    title: string;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ imageUrl, title }) => {
    return (
        <div style={{ marginTop: 8, marginBottom: 8}}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%">
                <Stack direction="row" spacing={1} alignItems="center">
                    <img width="60" height="40" style={{ objectFit: "cover" }} src={imageUrl} alt="building" />
                    <Typography sx={{ fontColor: '#000' }}>{title}</Typography>
                </Stack>
            </Stack>
        </div>
    );
}

export default BuildingCard;
