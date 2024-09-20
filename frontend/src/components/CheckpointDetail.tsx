
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { NavBar } from './Navbar';
import Box from '@mui/material/Box';
import Map from './Map';
import BottomNavCheckpointDetail from './BottomNavCheckpointDetail';
import checkpoints from './CheckpointData';

const CheckpointDetail = () => {
    const { checkpointId } = useParams();
    const checkpoint = checkpoints.find(c => c.checkpointId === checkpointId);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <NavBar checkpointId={checkpointId} />
                <Card sx={{ maxWidth: '90%', width: '100%', maxHeight: 290, margin: 'auto' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={`${checkpoint?.imageUrl}`}
                            alt={"ALT"}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {checkpoint?.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {checkpoint?.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box >
            <Box sx={{ width: '100%', maxWidth: '90%', aspectRatio: '1', margin: 'auto', mb: "100px" }}>
                <Map lat={`${checkpoint?.lat}`} lon={`${checkpoint?.lon}`} title={`${checkpoint?.title}`} />
            </Box>
            <BottomNavCheckpointDetail checkpointId={checkpointId} />
        </>
    );
}

export default CheckpointDetail;

