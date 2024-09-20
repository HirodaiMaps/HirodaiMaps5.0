import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


interface BuildingCardProps {
    imageUrl: string;
    title: string;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ imageUrl, title }) => {
    return (
        <div style={{ margin: '0 1%' }}>
            <Card sx={{
                width: '100%',
                height: "90px",
                display: 'flex',
                alignItems: 'center',
                margin: '0.5% auto',
                borderRadius: "10px",
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        width: 100,
                        height: 75,
                        padding: '2%',
                        alignSelf: 'center',
                        borderRadius: '20%',
                    }}
                    image={imageUrl}
                    alt="Building Image"
                />
                <CardContent sx={{ flex: 1 }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        {title}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default BuildingCard;
